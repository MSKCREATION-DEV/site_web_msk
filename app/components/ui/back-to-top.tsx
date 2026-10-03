import { ArrowUp } from "lucide-react";
import { cn } from "~/lib/utils";

type BackToTopProps = {
  onClick?: () => void;
  className?: string;
  label?: string;
};

/**
 * Retour en haut — 40×40, aligné sur le gutter page (`--msk-page-px`).
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
        "fixed z-50 flex size-10 cursor-pointer items-center justify-center",
        "right-[max(1.25rem,var(--msk-page-px))] bottom-[max(1.25rem,var(--msk-page-px))]",
        "rounded-none border border-white/20 bg-transparent text-msk-text",
        "transition-colors duration-350 hover:border-msk-blue hover:text-msk-blue",
        className,
      )}
    >
      <ArrowUp className="size-4" aria-hidden strokeWidth={1.5} />
    </button>
  );
}
