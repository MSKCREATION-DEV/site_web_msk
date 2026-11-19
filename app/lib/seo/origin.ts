const SITE_ORIGIN = (
  import.meta.env.VITE_SITE_ORIGIN ?? "http://localhost:5173"
).replace(/\/$/, "");

const IS_LOCAL_ORIGIN =
  /localhost|127\.0\.0\.1|0\.0\.0\.0/i.test(SITE_ORIGIN) ||
  SITE_ORIGIN.startsWith("http://127.");

/**
 * En build prod, un origin localhost casse canonical / og / JSON-LD.
 * Soft warning runtime ; gate dure = `npm run check:origin -- --strict`
 * (voir README + scripts/check-site-origin.mjs).
 */
if (import.meta.env.PROD && IS_LOCAL_ORIGIN) {
  console.warn(
    `[seo] VITE_SITE_ORIGIN est local (${SITE_ORIGIN}). ` +
      "En déploiement prod, définir https://www.mskcreation.net (ou domaine réel).",
  );
}

export function absoluteUrl(path: string) {
  return `${SITE_ORIGIN}${path.startsWith("/") ? path : `/${path}`}`;
}

export function siteOrigin() {
  return SITE_ORIGIN;
}

export function isLocalSiteOrigin() {
  return IS_LOCAL_ORIGIN;
}
