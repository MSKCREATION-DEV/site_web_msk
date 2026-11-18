/**
 * Chemins dérivés WebP / AVIF à côté des PNG/JPEG sources.
 * Les fichiers sont produits par `npm run assets:compress` (originaux conservés).
 */

const RASTER_EXT_RE = /\.(png|jpe?g)$/i;

/** Remplace l’extension raster par `.webp`. */
export function toWebpPath(path: string): string {
  if (!RASTER_EXT_RE.test(path)) return path;
  return path.replace(RASTER_EXT_RE, ".webp");
}

/** Remplace l’extension raster par `.avif`. */
export function toAvifPath(path: string): string {
  if (!RASTER_EXT_RE.test(path)) return path;
  return path.replace(RASTER_EXT_RE, ".avif");
}

/** True si le chemin pointe vers un PNG/JPEG compressible. */
export function isRasterAssetPath(path: string): boolean {
  return RASTER_EXT_RE.test(path);
}
