import type { ComponentProps } from "react";
import { cn } from "~/lib/utils";

export type SubmitButtonState =
  | "default"
  | "hover"
  | "loading"
  | "disabled";

type SubmitButtonProps = {
  label?: string;
  loadingLabel?: string;
  /** Force un état (réf. Figma 240:436). */
  visualState?: SubmitButtonState;
} & Omit<ComponentProps<"button">, "children">;

/**
 * Bouton Envoyer pilule — états Figma + Charte v3 :
 * Défaut #1D73BC / Survol #1384CB / Chargement opacity 80% / Désactivé opacity 40%.
 * Flèche = dans le label content (pas d’icône Lucide en double).
 */
export function SubmitButton({
  label = "Envoyer →",
  loadingLabel = "Envoi en cours…",
  visualState,
  disabled,
  className,
  type = "submit",
  ...buttonProps
}: SubmitButtonProps & { className?: string }) {
  const isLoading = visualState === "loading";
  const isDisabled =
    disabled || visualState === "disabled" || isLoading;
  const isHoverForced = visualState === "hover";

  return (
    <button
      {...buttonProps}
      type={type}
      disabled={isDisabled}
      aria-busy={isLoading || undefined}
      className={cn(
        "msk-btn-label inline-flex h-msk-btn-sm cursor-pointer items-center justify-center rounded-msk-pill px-msk-btn-px",
        "text-msk-text",
        "bg-msk-blue transition-colors",
        !isHoverForced && !isDisabled && "hover:bg-msk-blue-hover",
        isHoverForced && "bg-msk-blue-hover",
        isLoading && "cursor-wait opacity-80",
        visualState === "disabled" && "cursor-not-allowed opacity-40",
        disabled && visualState !== "disabled" && "cursor-not-allowed opacity-40",
        className,
      )}
    >
      {isLoading ? loadingLabel : label}
    </button>
  );
}
