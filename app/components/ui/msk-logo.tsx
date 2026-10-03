import type { ComponentProps } from "react";
import { assetUrl } from "~/lib/assets";
import { cn } from "~/lib/utils";

export type MskLogoVariant = "intro" | "header" | "fiche";

type MskLogoProps = {
  variant?: MskLogoVariant;
  className?: string;
  alt?: string;
} & Omit<ComponentProps<"img">, "src" | "alt" | "width" | "height">;

/**
 * Logo MSK CREATION — Charte v3 (PDF 2026-09-25).
 *
 * - intro  : verrouillage intercalé (MSK · signe · CREATION), réservé blanc.
 * - header / fiche : composition bloc à gauche (en-têtes / bandeaux).
 *
 * Une seule dimension CSS contrainte (hauteur ou max-width) pour respecter
 * l’aspect ratio SVG. Fond Encre → jamais dégradé ni #0000FF.
 */
export function MskLogo({
  variant = "header",
  className,
  alt = "MSK Création",
  ...imgProps
}: MskLogoProps) {
  /** Charte v3 — intercalé pour grands formats centrés (footer / intro). */
  if (variant === "intro") {
    return (
      <img
        {...imgProps}
        alt={alt}
        src={assetUrl("/assets/logo/msk-creation.svg")}
        className={cn(
          "mx-auto block h-auto w-full max-w-msk-footer-logo object-contain object-center",
          className,
        )}
      />
    );
  }

  /** Charte v3 — bloc à gauche ; hauteur seule (w auto) pour AR correct. */
  return (
    <img
      {...imgProps}
      alt={alt}
      src={assetUrl("/assets/logo/msk-creation-block.svg")}
      className={cn(
        "block h-msk-logo w-auto max-w-msk-logo shrink-0 object-contain object-left",
        className,
      )}
    />
  );
}
