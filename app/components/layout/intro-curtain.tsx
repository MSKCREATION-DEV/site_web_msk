import { useEffect, useState } from "react";
import { MskLogo } from "~/components/ui";
import { cn } from "~/lib/utils";

const STORAGE_KEY = "msk-intro-seen";
const INTRO_MS = 1000;

type IntroCurtainProps = {
  /** aria-label depuis content (nav.introAriaLabel). */
  ariaLabel: string;
  className?: string;
};

/**
 * Intro rideau noir — Figma 9:45.
 * Max 1 s, uniquement 1re visite (sessionStorage). Annotation Figma.
 * Trait bas = indicateur de chargement (animation CSS, reduced-motion OK).
 */
export function IntroCurtain({ ariaLabel, className }: IntroCurtainProps) {
  const [phase, setPhase] = useState<"pending" | "show" | "done">("pending");

  useEffect(() => {
    try {
      if (sessionStorage.getItem(STORAGE_KEY)) {
        setPhase("done");
        return;
      }
    } catch {
      setPhase("done");
      return;
    }

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = reduced ? 400 : INTRO_MS;

    setPhase("show");
    const timer = window.setTimeout(() => {
      try {
        sessionStorage.setItem(STORAGE_KEY, "1");
      } catch {
        /* ignore */
      }
      setPhase("done");
    }, duration);

    return () => window.clearTimeout(timer);
  }, []);

  if (phase !== "show") return null;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      aria-label={ariaLabel}
      className={cn(
        "fixed inset-0 z-msk-overlay flex flex-col items-center justify-center bg-msk-black",
        className,
      )}
    >
      <MskLogo variant="intro" />
      <div
        className="absolute bottom-12 left-1/2 h-px w-16 -translate-x-1/2 overflow-hidden bg-msk-text/25"
        aria-hidden
      >
        <div className="msk-intro-progress h-px w-full origin-left bg-msk-text" />
      </div>
    </div>
  );
}
