import { ArrowUp } from "lucide-react";
import { cn } from "~/lib/utils";

type BackToTopProps = {
  onClick?: () => void;
  className?: string;
  label?: string;
};

/**
 * Bouton Retour en haut — Figma 9:54 (40×40, bas droite).
 * Lucide ArrowUp (décision projet) ; glyphe ↑ si designer demande retrait Lucide.
 */
export function BackToTop({
  onClick,
  className,
  label = "Retour en haut",
}: BackToTopProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={cn(
        "fixed right-6 bottom-6 z-50 flex size-10 cursor-pointer items-center justify-center",
        "border border-msk-border bg-msk-page text-msk-text",
        "transition-colors hover:border-msk-blue hover:text-msk-blue",
        className,
      )}
    >
      <ArrowUp className="size-4" aria-hidden strokeWidth={1.5} />
    </button>
  );
}
