/**
 * Résout une URL d’asset.
 * V1 : fichiers locaux sous /public (chemins /assets/...).
 * Plus tard : préfixe R2/CDN via VITE_ASSET_BASE_URL — sans changer les composants.
 *
 * @example assetUrl("/assets/logo/msk.svg")
 */
export function assetUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  const base = (import.meta.env.VITE_ASSET_BASE_URL ?? "").replace(/\/$/, "");
  return `${base}${normalized}`;
}
