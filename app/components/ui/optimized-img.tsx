import type { ImgHTMLAttributes } from "react";
import {
  assetUrl,
  isRasterAssetPath,
  toAvifPath,
  toWebpPath,
} from "~/lib/assets";
import { cn } from "~/lib/utils";

export type OptimizedImgProps = Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  "src"
> & {
  /** Chemin source PNG/JPEG sous `/assets/...` (originaux Figma). */
  src: string;
  /** Classes sur `<picture>` (positionnement absolute / size-full). */
  pictureClassName?: string;
  /** Inclure source AVIF (défaut true). */
  preferAvif?: boolean;
};

/**
 * `<picture>` AVIF → WebP → PNG/JPEG fallback.
 * Nécessite les dérivés générés par `npm run assets:compress`.
 * Logos SVG : passez par `<img>` / `MskLogo` (pas ce composant).
 */
export function OptimizedImg({
  src,
  alt = "",
  className,
  pictureClassName,
  preferAvif = true,
  ...imgProps
}: OptimizedImgProps) {
  const fallbackSrc = assetUrl(src);

  if (!isRasterAssetPath(src)) {
    return (
      <img src={fallbackSrc} alt={alt} className={className} {...imgProps} />
    );
  }

  return (
    <picture className={cn(pictureClassName)}>
      {preferAvif ? (
        <source srcSet={assetUrl(toAvifPath(src))} type="image/avif" />
      ) : null}
      <source srcSet={assetUrl(toWebpPath(src))} type="image/webp" />
      <img src={fallbackSrc} alt={alt} className={className} {...imgProps} />
    </picture>
  );
}
