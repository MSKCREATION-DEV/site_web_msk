import { ArrowRight } from "lucide-react";
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
 * Bouton Envoyer pilule — états Figma :
 * Défaut #137dc5 / Survol #2994db / Chargement opacity 80% / Désactivé opacity 40%.
 */
export function SubmitButton({
  label = "Envoyer",
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
        "inline-flex cursor-pointer items-center justify-center rounded-[999px] px-8 py-4",
        "text-[11px] tracking-[2.2px] text-msk-text uppercase",
        "bg-msk-blue transition-colors",
        !isHoverForced && !isDisabled && "hover:bg-msk-blue-hover",
        isHoverForced && "bg-msk-blue-hover",
        isLoading && "cursor-wait opacity-80",
        visualState === "disabled" && "cursor-not-allowed opacity-40",
        disabled && visualState !== "disabled" && "cursor-not-allowed opacity-40",
        className,
      )}
    >
      {isLoading ? (
        loadingLabel
      ) : (
        <span className="inline-flex items-center gap-2">
          {label}
          <ArrowRight className="size-3.5" aria-hidden strokeWidth={1.75} />
        </span>
      )}
    </button>
  );
}
