const DEFAULT_LOCAL_ORIGIN = "http://localhost:5173";

const CONFIGURED_ORIGIN_RAW = (
  import.meta.env.VITE_SITE_ORIGIN ?? ""
).replace(/\/$/, "");

/**
 * Parse une origine http(s) absolue. Rejette placeholders (`xxxxxx`) et
 * valeurs sans schéma (qui produisaient `Sitemap: xxxxxx/sitemap.xml`).
 */
function parseHttpOrigin(value: string): string | null {
  if (!value) return null;
  try {
    const url = new URL(value);
    if (url.protocol !== "http:" && url.protocol !== "https:") return null;
    return url.origin;
  } catch {
    return null;
  }
}

function isLocalOrigin(origin: string): boolean {
  return (
    /localhost|127\.0\.0\.1|0\.0\.0\.0/i.test(origin) ||
    origin.startsWith("http://127.")
  );
}

const CONFIGURED_ORIGIN = parseHttpOrigin(CONFIGURED_ORIGIN_RAW);

const IS_LOCAL_CONFIGURED =
  !CONFIGURED_ORIGIN || isLocalOrigin(CONFIGURED_ORIGIN);

/**
 * En build prod, un origin localhost / manquant casse canonical / og / JSON-LD.
 * Soft warning runtime ; gate dure = `npm run check:origin -- --strict`
 * (voir README + scripts/check-site-origin.mjs).
 */
if (import.meta.env.PROD && IS_LOCAL_CONFIGURED) {
  const shown = CONFIGURED_ORIGIN_RAW || "(manquant)";
  console.warn(
    `[seo] VITE_SITE_ORIGIN invalide ou local (${shown}). ` +
      "En déploiement prod, définir https://www.mskcreation.net (ou domaine réel). " +
      "robots/sitemap peuvent retomber sur l’origine de request.url.",
  );
}

if (
  import.meta.env.PROD &&
  CONFIGURED_ORIGIN_RAW &&
  !CONFIGURED_ORIGIN
) {
  console.warn(
    `[seo] VITE_SITE_ORIGIN n’est pas une URL http(s) absolue (${CONFIGURED_ORIGIN_RAW}). Ignoré.`,
  );
}

/**
 * Priorité d’origine SEO (robots + sitemap + absoluteUrl avec request) :
 * 1. `VITE_SITE_ORIGIN` si URL http(s) absolue valide et **non locale** (prod)
 * 2. `new URL(request.url).origin` si Request fourni (Preview Vercel / VITE
 *    manquant, local, ou placeholder)
 * 3. `VITE_SITE_ORIGIN` local valide, sinon `http://localhost:5173`
 *
 * Meta / JSON-LD page appellent sans Request → priorité 1 puis 3 (build-time).
 * Resource routes robots/sitemap passent toujours `request` pour rester alignées.
 */
export function resolveSiteOrigin(request?: Request): string {
  if (CONFIGURED_ORIGIN && !isLocalOrigin(CONFIGURED_ORIGIN)) {
    return CONFIGURED_ORIGIN;
  }

  if (request) {
    try {
      return new URL(request.url).origin;
    } catch {
      // fall through
    }
  }

  return CONFIGURED_ORIGIN ?? DEFAULT_LOCAL_ORIGIN;
}

export function absoluteUrl(path: string, request?: Request) {
  const origin = resolveSiteOrigin(request);
  return `${origin}${path.startsWith("/") ? path : `/${path}`}`;
}

export function siteOrigin(request?: Request) {
  return resolveSiteOrigin(request);
}

export function isLocalSiteOrigin(request?: Request) {
  return isLocalOrigin(resolveSiteOrigin(request));
}
