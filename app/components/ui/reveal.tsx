import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "~/lib/utils";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Délai ms (stagger). */
  delayMs?: number;
};

/**
 * Apparition progressive au scroll — respecte prefers-reduced-motion.
 */
export function Reveal({ children, className, delayMs = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      node.classList.add("is-visible");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          node.classList.add("is-visible");
          observer.unobserve(node);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn("msk-reveal", className)}
      style={delayMs ? { transitionDelay: `${delayMs}ms` } : undefined}
    >
      {children}
    </div>
  );
}
