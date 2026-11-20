/**
 * Scroll vers une ancre calibré sur le header fixed H96.
 *
 * Calcul manuel (pas `scrollIntoView`) : Chromium ignore parfois
 * `scroll-margin` sur les cibles en `overflow: hidden` (ex. `#contact`).
 */
export function scrollToAnchor(
  hash: string,
  behavior: ScrollBehavior = "smooth",
): boolean {
  const id = hash.startsWith("#") ? hash.slice(1) : hash;
  if (!id) return false;
  const el = document.getElementById(id);
  if (!el) return false;

  const rootStyles = getComputedStyle(document.documentElement);
  const navFromToken = parseFloat(rootStyles.getPropertyValue("--msk-nav-height"));
  const marginFromEl = parseFloat(getComputedStyle(el).scrollMarginTop);
  const offset =
    (Number.isFinite(marginFromEl) && marginFromEl > 0
      ? marginFromEl
      : Number.isFinite(navFromToken) && navFromToken > 0
        ? navFromToken
        : 0);

  const top = window.scrollY + el.getBoundingClientRect().top - offset;
  window.scrollTo({ top: Math.max(0, top), behavior });
  return true;
}

/** Prefers-reduced-motion → instantané. */
export function preferredScrollBehavior(): ScrollBehavior {
  if (typeof window === "undefined") return "auto";
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ? "auto"
    : "smooth";
}

/**
 * Après reveal du smart-header : attendre 2 frames pour que
 * `translateY(0)` soit appliqué avant le calcul d’offset.
 */
export function scrollToAnchorAfterHeaderReveal(hash: string): void {
  const behavior = preferredScrollBehavior();
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      scrollToAnchor(hash, behavior);
      if (hash.startsWith("#")) {
        history.pushState(null, "", hash);
      }
    });
  });
}
