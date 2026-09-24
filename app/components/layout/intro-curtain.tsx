import { useEffect, useState } from "react";
import { MskLogo } from "~/components/ui";
import { cn } from "~/lib/utils";

const STORAGE_KEY = "msk-intro-seen";
const INTRO_MS = 1000;

type IntroCurtainProps = {
  className?: string;
};

/**
 * Intro rideau noir — Figma 9:45.
 * Max 1 s, uniquement 1re visite (sessionStorage). Annotation Figma.
 */
export function IntroCurtain({ className }: IntroCurtainProps) {
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

    setPhase("show");
    const timer = window.setTimeout(() => {
      try {
        sessionStorage.setItem(STORAGE_KEY, "1");
      } catch {
        /* ignore */
      }
      setPhase("done");
    }, INTRO_MS);

    return () => window.clearTimeout(timer);
  }, []);

  if (phase !== "show") return null;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="MSK Création"
      className={cn(
        "fixed inset-0 z-[100] flex flex-col items-center justify-center bg-msk-black",
        className,
      )}
    >
      <MskLogo variant="intro" />
      <div className="absolute bottom-12 left-1/2 flex h-px w-16 -translate-x-1/2 overflow-hidden bg-msk-text">
        <div className="h-px w-1/2 bg-msk-text" aria-hidden />
      </div>
    </div>
  );
}
