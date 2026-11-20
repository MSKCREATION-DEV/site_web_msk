import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
} from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { OptimizedImg, Reveal } from "~/components/ui";
import type { ApproachContent } from "~/content/types";
import { assetUrl } from "~/lib/assets";
import { cn } from "~/lib/utils";

type ApproachSectionProps = {
  content: ApproachContent;
  gallery?: ApproachContent["gallery"];
  valuesTicker?: string[];
  className?: string;
};

/**
 * Approche — galerie full-bleed (1 slide = 100vw), process 4 cols, marquee valeurs.
 * Ancre `#approche` sur le bloc copy (pas la galerie) pour corriger le scroll nav.
 */
export function ApproachSection({
  content,
  gallery,
  valuesTicker = [],
  className,
}: ApproachSectionProps) {
  const slides = gallery ?? [];
  const [index, setIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{ startX: number; scrollLeft: number; active: boolean }>({
    startX: 0,
    scrollLeft: 0,
    active: false,
  });
  const prefersReducedMotion = useRef(false);

  useEffect(() => {
    prefersReducedMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
  }, []);

  const slideWidthOf = () => {
    const el = trackRef.current;
    if (!el) return 0;
    return el.clientWidth;
  };

  const syncIndexFromScroll = useCallback(() => {
    const el = trackRef.current;
    if (!el || slides.length === 0) return;
    const slideWidth = el.clientWidth || 1;
    const next = Math.round(el.scrollLeft / slideWidth);
    setIndex(Math.max(0, Math.min(slides.length - 1, next)));
  }, [slides.length]);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const onScroll = () => syncIndexFromScroll();
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [syncIndexFromScroll]);

  const goTo = useCallback(
    (i: number) => {
      const el = trackRef.current;
      if (!el || slides.length === 0) return;
      const next = Math.max(0, Math.min(slides.length - 1, i));
      const slideWidth = slideWidthOf();
      el.scrollTo({
        left: next * slideWidth,
        behavior: prefersReducedMotion.current ? "auto" : "smooth",
      });
      setIndex(next);
    },
    [slides.length],
  );

  const goPrev = useCallback(() => goTo(index - 1), [goTo, index]);
  const goNext = useCallback(() => goTo(index + 1), [goTo, index]);

  /** Au clic nav `#approche` : reset galerie au premier slide. */
  useEffect(() => {
    const resetIfApproche = () => {
      if (window.location.hash === "#approche") {
        goTo(0);
      }
    };
    resetIfApproche();
    window.addEventListener("hashchange", resetIfApproche);
    return () => window.removeEventListener("hashchange", resetIfApproche);
  }, [goTo]);

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    const el = trackRef.current;
    if (!el) return;
    drag.current = {
      startX: event.clientX,
      scrollLeft: el.scrollLeft,
      active: true,
    };
    el.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const el = trackRef.current;
    if (!el || !drag.current.active) return;
    const dx = event.clientX - drag.current.startX;
    el.scrollLeft = drag.current.scrollLeft - dx;
  };

  const onPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    const el = trackRef.current;
    if (!el) return;
    drag.current.active = false;
    try {
      el.releasePointerCapture(event.pointerId);
    } catch {
      /* ignore */
    }
    syncIndexFromScroll();
  };

  const onCarouselKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goPrev();
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      goNext();
    } else if (event.key === "Home") {
      event.preventDefault();
      goTo(0);
    } else if (event.key === "End") {
      event.preventDefault();
      goTo(slides.length - 1);
    }
  };

  const ticker = [...valuesTicker, ...valuesTicker];
  const canPrev = index > 0;
  const canNext = index < slides.length - 1;

  return (
    <section
      className={cn("bg-msk-black", className)}
      aria-labelledby="approche-heading"
    >
      {slides.length > 0 ? (
        <div
          className="relative w-full max-w-full overflow-hidden bg-msk-ink"
          aria-roledescription="carousel"
          aria-label={content.galleryAriaLabel}
          onKeyDown={onCarouselKeyDown}
        >
          <div
            ref={trackRef}
            className="msk-scrollbar-none flex h-msk-gallery w-full max-w-full cursor-grab snap-x snap-mandatory overflow-x-auto overscroll-x-contain active:cursor-grabbing"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            tabIndex={0}
            role="group"
            aria-label={content.galleryAriaLabel}
          >
            {slides.map((slide, i) => (
              <figure
                key={slide.src}
                className="msk-gallery-slide relative shrink-0 snap-start"
                aria-hidden={i !== index}
              >
                <OptimizedImg
                  src={slide.src}
                  alt={slide.alt}
                  draggable={false}
                  loading="lazy"
                  decoding="async"
                  pictureClassName="absolute inset-0 size-full"
                  className="size-full object-cover select-none"
                />
                {slide.label ? (
                  <figcaption className="msk-page-x absolute inset-x-0 bottom-6 font-sans text-msk-xs font-medium tracking-msk-wide text-msk-text uppercase drop-shadow-[0_1px_2px_rgb(0_0_0_/_0.8)]">
                    {slide.label}
                  </figcaption>
                ) : null}
              </figure>
            ))}
          </div>

          {/* Nav flèches : overlay latéral, tokens Encre / bleu / corail */}
          <div className="pointer-events-none absolute inset-y-0 right-0 left-0 flex items-center justify-between px-3 sm:px-5">
            <button
              type="button"
              onClick={goPrev}
              disabled={!canPrev}
              aria-label={content.galleryPrevLabel}
              className={cn(
                "pointer-events-auto inline-flex size-11 items-center justify-center rounded-full",
                "border border-white/30 bg-msk-ink/70 text-msk-text backdrop-blur-sm",
                "transition-colors duration-msk ease-out motion-reduce:transition-none",
                "hover:border-msk-blue hover:bg-msk-blue/90 hover:text-msk-text",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-msk-coral focus-visible:ring-offset-2 focus-visible:ring-offset-msk-ink",
                "disabled:pointer-events-none disabled:opacity-30",
              )}
            >
              <ChevronLeft className="size-5" strokeWidth={1.75} aria-hidden />
            </button>
            <button
              type="button"
              onClick={goNext}
              disabled={!canNext}
              aria-label={content.galleryNextLabel}
              className={cn(
                "pointer-events-auto inline-flex size-11 items-center justify-center rounded-full",
                "border border-white/30 bg-msk-ink/70 text-msk-text backdrop-blur-sm",
                "transition-colors duration-msk ease-out motion-reduce:transition-none",
                "hover:border-msk-blue hover:bg-msk-blue/90 hover:text-msk-text",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-msk-coral focus-visible:ring-offset-2 focus-visible:ring-offset-msk-ink",
                "disabled:pointer-events-none disabled:opacity-30",
              )}
            >
              <ChevronRight className="size-5" strokeWidth={1.75} aria-hidden />
            </button>
          </div>

          <div className="msk-page-x mx-auto flex w-full max-w-msk items-center justify-between gap-4 pt-5 pb-2">
            <div className="flex items-center gap-1.5" role="tablist" aria-label={content.galleryAriaLabel}>
              {slides.map((slide, i) => (
                <button
                  key={slide.src}
                  type="button"
                  role="tab"
                  aria-label={`${i + 1} / ${slides.length}`}
                  aria-selected={i === index}
                  onClick={() => goTo(i)}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-msk ease-out motion-reduce:transition-none",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-msk-blue focus-visible:ring-offset-2 focus-visible:ring-offset-msk-ink",
                    i === index
                      ? "w-8 bg-msk-blue"
                      : "w-1.5 bg-white/30 hover:bg-msk-coral/80",
                  )}
                />
              ))}
            </div>
            <p
              className="font-sans text-xs font-medium tabular-nums text-msk-text-secondary"
              aria-live="polite"
            >
              {String(index + 1).padStart(2, "0")} /{" "}
              {String(slides.length).padStart(2, "0")}
            </p>
          </div>
        </div>
      ) : null}

      {/* Ancre nav : copy Approche (évite d’atterrir sur une slide galerie). */}
      <div
        id="approche"
        className="msk-page-x scroll-mt-msk-nav mx-auto flex w-full max-w-msk flex-col gap-24 py-msk-x"
      >
        <Reveal>
          <div className="grid grid-cols-1 items-end gap-10 lg:grid-cols-msk-split lg:gap-0">
            <div>
              <p className="msk-eyebrow mb-6 text-msk-text-muted">{content.eyebrow}</p>
              <h2 id="approche-heading" className="flex flex-col text-msk-text">
                <span className="msk-section-title">{content.titleLine1}</span>
                <span className="msk-section-accent text-msk-blue">
                  {content.titleAccent}
                </span>
                <span className="msk-section-title">{content.titleLine3}</span>
              </h2>
            </div>
            <div className="hidden lg:block" aria-hidden />
            <div className="relative flex flex-col gap-6 self-end">
              <img
                src={assetUrl("/assets/logo/msk-mark.svg")}
                alt=""
                aria-hidden
                className="msk-logo-watermark pointer-events-none absolute -top-8 right-0 hidden h-32 w-auto max-w-2/5 opacity-10 sm:block"
              />
              {content.body.map((paragraph) => (
                <p
                  key={paragraph}
                  className="msk-body-sm relative text-msk-text-secondary"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </Reveal>

        <ol className="grid grid-cols-1 gap-0 sm:grid-cols-2 lg:grid-cols-4">
          {content.steps.map((step, i) => (
            <li key={step.index}>
              <Reveal delayMs={i * 70}>
                <div
                  className={cn(
                    "flex h-full flex-col gap-3 border-msk-border px-0 py-6 lg:px-8 lg:py-0",
                    i > 0 && "border-t lg:border-t-0 lg:border-l",
                  )}
                >
                  <span className="font-sans text-xs font-medium tracking-msk text-msk-text-muted">
                    {step.index}
                  </span>
                  <h3 className="font-sans text-lg font-semibold leading-msk-snug text-msk-text uppercase">
                    {step.title}
                  </h3>
                  <p className="font-sans text-sm leading-msk-body text-msk-text-secondary">
                    {step.description}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>

      {ticker.length > 0 ? (
        <div className="msk-marquee-rail">
          <div className="msk-marquee flex w-max gap-10 whitespace-nowrap will-change-transform">
            {ticker.map((item, i) => (
              <span
                key={`${item}-${i}`}
                className="msk-ticker inline-flex items-center gap-10 text-msk-text"
              >
                {item}
                <span className="text-msk-text-subtle" aria-hidden>
                  ·
                </span>
              </span>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}
