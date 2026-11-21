/**
 * Scroll vers une ancre.
 *
 * Calcul manuel (pas `scrollIntoView`) : Chromium ignore parfois
 * `scroll-margin` sur les cibles en `overflow: hidden` (ex. `#contact`).
 *
 * On aligne le **landmark** (eyebrow / titre), pas le bord de `<section>`,
 * pour éviter la bande vide du `py-msk-x`.
 *
 * Clic nav : header **reste visible** (repère de navigation). Le smart-header
 * ne se masque qu’au scroll manuel vers le bas.
 */

/** Air sous le header une fois le landmark cadré (évite le chevauchement eyebrow). */
const FRAME_GAP_PX = 28;

/** Fenêtre pendant laquelle le smart-header ignore le scroll (évite le jitter). */
let programmaticScrollUntil = 0;
/** Évite que HashAnchorSync re-scrolle après un clic nav (pushState). */
let skipHashSyncUntil = 0;

export function isProgrammaticScroll(): boolean {
  return performance.now() < programmaticScrollUntil;
}

export function shouldSkipHashAnchorSync(): boolean {
  return performance.now() < skipHashSyncUntil;
}

function markProgrammaticScroll(durationMs: number): void {
  programmaticScrollUntil = performance.now() + durationMs;
}

function suppressHashAnchorSync(durationMs = 1200): void {
  skipHashSyncUntil = performance.now() + durationMs;
}

function readPx(value: string): number {
  const n = Number.parseFloat(value);
  return Number.isFinite(n) ? n : 0;
}

export function resolveNavHeight(): number {
  // Hauteur layout réelle (offsetHeight ignore le translate du smart-header).
  const bar = document.querySelector<HTMLElement>("header .h-msk-nav");
  if (bar) {
    const measured = bar.offsetHeight;
    if (measured > 0) return measured;
  }

  const raw = getComputedStyle(document.documentElement).getPropertyValue(
    "--msk-nav-height",
  );
  const n = readPx(raw);
  return n > 0 ? n : 96;
}

/**
 * Élément à cadrer dans le viewport : eyebrow, titre section, ou header Travaux.
 */
function resolveAnchorLandmark(section: HTMLElement): HTMLElement {
  const landmark = section.querySelector<HTMLElement>(
    ":scope .msk-eyebrow, :scope h2[id], :scope [id$='-heading'], :scope .msk-works-header",
  );
  return landmark ?? section;
}

export type ScrollToAnchorOptions = {
  behavior?: ScrollBehavior;
};

export function scrollToAnchor(
  hash: string,
  behaviorOrOptions: ScrollBehavior | ScrollToAnchorOptions = "smooth",
): boolean {
  const options: ScrollToAnchorOptions =
    typeof behaviorOrOptions === "string"
      ? { behavior: behaviorOrOptions }
      : behaviorOrOptions;

  const behavior = options.behavior ?? "smooth";

  const id = hash.startsWith("#") ? hash.slice(1) : hash;
  if (!id) return false;
  const section = document.getElementById(id);
  if (!section) return false;

  const landmark = resolveAnchorLandmark(section);
  const topOffset = resolveNavHeight() + FRAME_GAP_PX;

  const top =
    window.scrollY + landmark.getBoundingClientRect().top - topOffset;

  markProgrammaticScroll(behavior === "smooth" ? 900 : 100);
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
 * Clic nav / CTA : header visible + cadrage sous la barre.
 * Supprime le re-scroll HashAnchorSync déclenché par pushState.
 */
export function scrollToAnchorFromNav(hash: string): void {
  const behavior = preferredScrollBehavior();
  suppressHashAnchorSync(behavior === "smooth" ? 1200 : 400);
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      scrollToAnchor(hash, { behavior });
      if (hash.startsWith("#")) {
        history.pushState(null, "", hash);
      }
    });
  });
}

/** Load / i18n / intro : même cadrage (header visible). */
export function scrollToAnchorAfterHeaderReveal(hash: string): void {
  scrollToAnchorFromNav(hash);
}
