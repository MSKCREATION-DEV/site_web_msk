import { ArrowUp } from "lucide-react";
import { cn } from "~/lib/utils";

type BackToTopProps = {
  onClick?: () => void;
  className?: string;
  label?: string;
};

/**
 * Retour en haut — 40×40, bordure blanc 20 %, fixed 32 px bas/droite.
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
        "fixed right-5 bottom-5 z-50 flex size-10 cursor-pointer items-center justify-center sm:right-8 sm:bottom-8",
        "rounded-none border border-white/20 bg-transparent text-msk-text",
        "transition-colors duration-350 hover:border-msk-blue hover:text-msk-blue",
        className,
      )}
    >
      <ArrowUp className="size-4" aria-hidden strokeWidth={1.5} />
    </button>
  );
}
