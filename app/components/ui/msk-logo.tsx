import type { ComponentProps } from "react";
import { assetUrl } from "~/lib/assets";
import { cn } from "~/lib/utils";

export type MskLogoVariant = "intro" | "header" | "fiche";

const variantClass: Record<MskLogoVariant, string> = {
  intro: "h-[172px] w-[492px]",
  header: "h-11 w-[126px]",
  fiche: "h-11 w-[126px]",
};

type MskLogoProps = {
  variant?: MskLogoVariant;
  className?: string;
  alt?: string;
} & Omit<ComponentProps<"img">, "src" | "alt" | "width" | "height">;

/**
 * Logo MSK CREATION — asset Figma uniquement.
 * Fichier attendu : /assets/logo/msk-creation.svg
 * Si absent : voir docs/design/ASSETS_INVENTORY.md
 */
export function MskLogo({
  variant = "header",
  className,
  alt = "MSK Création",
  ...imgProps
}: MskLogoProps) {
  return (
    <span
      className={cn(
        "relative inline-block overflow-hidden",
        variantClass[variant],
        className,
      )}
    >
      <img
        {...imgProps}
        alt={alt}
        src={assetUrl("/assets/logo/msk-creation.svg")}
        className="absolute inset-0 size-full max-w-none object-contain"
      />
    </span>
  );
}
