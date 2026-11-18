import { assetUrl } from "~/lib/assets";
import { absoluteUrl } from "./origin";

/**
 * Visuel partage social default — hero Figma Desktop.
 * Spec : docs/design/SEO_STRUCTURED_DATA.md
 */
export const DEFAULT_OG_IMAGE_PATH = "/assets/hero/slide-01.png";

export const ORGANIZATION_LOGO_PATH = "/assets/logo/msk-creation.svg";

/** URL absolue d’un asset (CDN si VITE_ASSET_BASE_URL, sinon origine site). */
export function absoluteAssetUrl(path: string): string {
  const resolved = assetUrl(path);
  if (/^https?:\/\//i.test(resolved)) {
    return resolved;
  }
  return absoluteUrl(resolved);
}

export function defaultOgImageUrl(): string {
  return absoluteAssetUrl(DEFAULT_OG_IMAGE_PATH);
}
