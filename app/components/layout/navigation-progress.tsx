import { useEffect, useState } from "react";
import { useNavigation } from "react-router";
import { cn } from "~/lib/utils";

/** Délai avant affichage : évite un flash sur navigations très rapides. */
const SHOW_DELAY_MS = 120;
/** Durée du fill 100 % + fondu à la fin de navigation. */
const FINISH_MS = 280;

type NavigationProgressProps = {
  /** Libellé a11y (content FR/EN). */
  label: string;
  className?: string;
};

type Phase = "hidden" | "running" | "finishing";

/**
 * Barre de progression top — feedback navigation React Router.
 * Pattern web standard (type NProgress) : aucun loader Figma maquetté (voir DESIGN_DECISIONS).
 * Couleur charte : bleu `#1D73BC`. Respecte prefers-reduced-motion.
 */
export function NavigationProgress({
  label,
  className,
}: NavigationProgressProps) {
  const navigation = useNavigation();
  const isPending = navigation.state !== "idle";
  const [phase, setPhase] = useState<Phase>("hidden");

  useEffect(() => {
    if (isPending) {
      const showTimer = window.setTimeout(() => {
        setPhase("running");
      }, SHOW_DELAY_MS);
      return () => window.clearTimeout(showTimer);
    }

    setPhase((current) =>
      current === "hidden" ? "hidden" : "finishing",
    );
  }, [isPending]);

  useEffect(() => {
    if (phase !== "finishing") return;
    const hideTimer = window.setTimeout(() => {
      setPhase("hidden");
    }, FINISH_MS);
    return () => window.clearTimeout(hideTimer);
  }, [phase]);

  if (phase === "hidden") return null;

  return (
    <div
      className={cn(
        "pointer-events-none fixed inset-x-0 top-0 z-msk-progress",
        className,
      )}
      role="status"
      aria-live="polite"
      aria-busy={phase === "running" || undefined}
      aria-label={label}
    >
      <div
        className={cn(
          "h-0.5 origin-left bg-msk-blue",
          phase === "running" && "msk-nav-progress-run",
          phase === "finishing" && "msk-nav-progress-finish",
        )}
      />
    </div>
  );
}
