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
 * Logo MSK CREATION — asset Figma uniquement.
 * intro  : géant centré (footer / rideau), max 730 design.
 * header : nav / barre footer — ancré à gauche, taille chrome.
 */
export function MskLogo({
  variant = "header",
  className,
  alt = "MSK Création",
  ...imgProps
}: MskLogoProps) {
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

  return (
    <img
      {...imgProps}
      alt={alt}
      src={assetUrl("/assets/logo/msk-creation.svg")}
      className={cn(
        "block h-msk-logo w-msk-logo max-w-full shrink-0 object-contain object-left",
        className,
      )}
    />
  );
}
