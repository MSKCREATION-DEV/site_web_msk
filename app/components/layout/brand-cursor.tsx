import { useEffect, useRef, useState } from "react";

/**
 * Curseur marque MSK (dot + ring) — Desktop fine pointer uniquement.
 * Absent de Figma : décision minimale documentée (DESIGN_DECISIONS / Q30).
 * Position via rAF + transform ; pas de layout thrashing.
 */

const ENABLE_MQ = "(hover: hover) and (pointer: fine)";
const REDUCE_MOTION_MQ = "(prefers-reduced-motion: reduce)";
const FORCED_COLORS_MQ = "(forced-colors: active)";

const INTERACTIVE_SELECTOR = [
  "a",
  "button",
  "[role='button']",
  "input",
  "textarea",
  "select",
  "summary",
  "label[for]",
].join(", ");

function canUseBrandCursor() {
  return (
    window.matchMedia(ENABLE_MQ).matches &&
    !window.matchMedia(REDUCE_MOTION_MQ).matches &&
    !window.matchMedia(FORCED_COLORS_MQ).matches
  );
}

export function BrandCursor() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia(ENABLE_MQ);
    const reduceMotion = window.matchMedia(REDUCE_MOTION_MQ);
    const forcedColors = window.matchMedia(FORCED_COLORS_MQ);

    const syncEnabled = () => {
      setEnabled(canUseBrandCursor());
    };

    syncEnabled();
    fine.addEventListener("change", syncEnabled);
    reduceMotion.addEventListener("change", syncEnabled);
    forcedColors.addEventListener("change", syncEnabled);

    return () => {
      fine.removeEventListener("change", syncEnabled);
      reduceMotion.removeEventListener("change", syncEnabled);
      forcedColors.removeEventListener("change", syncEnabled);
    };
  }, []);

  useEffect(() => {
    if (!enabled) {
      document.documentElement.classList.remove("msk-brand-pointer");
      return;
    }

    const root = rootRef.current;
    if (!root) return;

    document.documentElement.classList.add("msk-brand-pointer");

    let x = 0;
    let y = 0;
    let rafId = 0;
    let scheduled = false;
    let visible = false;

    const paint = () => {
      scheduled = false;
      root.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };

    const schedulePaint = () => {
      if (scheduled) return;
      scheduled = true;
      rafId = window.requestAnimationFrame(paint);
    };

    const setVisible = (next: boolean) => {
      if (visible === next) return;
      visible = next;
      root.classList.toggle("is-visible", next);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      x = event.clientX;
      y = event.clientY;
      schedulePaint();
      setVisible(true);

      const target = event.target;
      const interactive =
        target instanceof Element && Boolean(target.closest(INTERACTIVE_SELECTOR));
      root.classList.toggle("is-interactive", interactive);
    };

    const onPointerLeave = () => {
      setVisible(false);
      root.classList.remove("is-interactive");
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onPointerLeave);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("pointerleave", onPointerLeave);
      document.documentElement.classList.remove("msk-brand-pointer");
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={rootRef}
      className="msk-brand-cursor"
      aria-hidden="true"
    >
      <span className="msk-brand-cursor__ring" />
      <span className="msk-brand-cursor__dot" />
    </div>
  );
}
