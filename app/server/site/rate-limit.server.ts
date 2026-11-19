/**
 * Rate-limit IP en mémoire process — V1 contact (honeypot + limite).
 *
 * Limite documentée : 5 req / IP / 15 min (`CONTACT_BACKEND.md`).
 * Multi-instance / serverless : remplacer par store partagé (Upstash Redis)
 * — la Map locale ne partage pas les compteurs entre workers.
 */

export type RateLimitResult =
  | { ok: true; remaining: number }
  | { ok: false; retryAfterSec: number };

type Bucket = {
  count: number;
  resetAt: number;
};

const WINDOW_MS = 15 * 60 * 1000;
const MAX_HITS = 5;

/** Nettoyage opportuniste pour éviter une Map qui grossit sans borne. */
const MAX_KEYS = 5_000;

const buckets = new Map<string, Bucket>();

function prune(now: number) {
  if (buckets.size < MAX_KEYS) return;
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }
  if (buckets.size < MAX_KEYS) return;
  // Trop de clés actives : drop les plus anciennes (resetAt croissant).
  const ordered = [...buckets.entries()].sort(
    (a, b) => a[1].resetAt - b[1].resetAt,
  );
  const drop = Math.ceil(ordered.length / 5);
  for (let i = 0; i < drop; i++) {
    const key = ordered[i]?.[0];
    if (key) buckets.delete(key);
  }
}

/**
 * IP client derrière proxy (Vercel / CDN).
 * Fallback `unknown` : une seule file pour IPs non résolues (conservateur).
 */
export function clientIpFromRequest(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  const realIp = request.headers.get("x-real-ip")?.trim();
  if (realIp) return realIp;
  return "unknown";
}

/**
 * Enregistre un hit et indique si la requête est autorisée.
 * Préfixe `scope` pour isoler les endpoints (ex. `contact`).
 */
export function consumeRateLimit(
  scope: string,
  ip: string,
  options?: { max?: number; windowMs?: number },
): RateLimitResult {
  const max = options?.max ?? MAX_HITS;
  const windowMs = options?.windowMs ?? WINDOW_MS;
  const now = Date.now();
  prune(now);

  const key = `${scope}:${ip}`;
  const current = buckets.get(key);

  if (!current || current.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, remaining: max - 1 };
  }

  if (current.count >= max) {
    return {
      ok: false,
      retryAfterSec: Math.max(1, Math.ceil((current.resetAt - now) / 1000)),
    };
  }

  current.count += 1;
  return { ok: true, remaining: max - current.count };
}
