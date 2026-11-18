const SITE_ORIGIN = (
  import.meta.env.VITE_SITE_ORIGIN ?? "http://localhost:5173"
).replace(/\/$/, "");

export function absoluteUrl(path: string) {
  return `${SITE_ORIGIN}${path.startsWith("/") ? path : `/${path}`}`;
}

export function siteOrigin() {
  return SITE_ORIGIN;
}
