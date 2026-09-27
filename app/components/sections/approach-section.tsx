import { useCallback, useEffect, useRef, useState, type PointerEvent } from "react";
import { Reveal } from "~/components/ui";
import type { ApproachContent } from "~/content/types";
import { assetUrl } from "~/lib/assets";
import { cn } from "~/lib/utils";

type ApproachSectionProps = {
  content: ApproachContent;
  gallery?: ApproachContent["gallery"];
  valuesTicker?: string[];
  className?: string;
};

const SLIDE_W = 1008;
const SLIDE_GAP = 1;

/**
 * Approche — galerie horizontale draggable 1008×558, process 4 cols, marquee valeurs.
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

  const syncIndexFromScroll = useCallback(() => {
    const el = trackRef.current;
    if (!el || slides.length === 0) return;
    const first = el.querySelector("figure");
    const slideWidth = first instanceof HTMLElement ? first.offsetWidth + SLIDE_GAP : SLIDE_W + SLIDE_GAP;
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

  const goTo = (i: number) => {
    const el = trackRef.current;
    if (!el) return;
    const first = el.querySelector("figure");
    const slideWidth = first instanceof HTMLElement ? first.offsetWidth + SLIDE_GAP : SLIDE_W + SLIDE_GAP;
    el.scrollTo({
      left: i * slideWidth,
      behavior: "smooth",
    });
    setIndex(i);
  };

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

  const ticker = [...valuesTicker, ...valuesTicker];

  return (
    <section
      id="approche"
      className={cn("scroll-mt-24 bg-msk-black", className)}
      aria-labelledby="approche-heading"
    >
      {slides.length > 0 ? (
        <div
          className="relative w-full max-w-full overflow-hidden bg-msk-placeholder"
          aria-roledescription="carousel"
          aria-label={content.galleryAriaLabel}
        >
          <div
            ref={trackRef}
            className="msk-scrollbar-none flex h-msk-gallery w-full max-w-full cursor-grab snap-x snap-mandatory overflow-x-auto overscroll-x-contain active:cursor-grabbing"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
          >
            {slides.map((slide) => (
              <figure
                key={slide.src}
                className="msk-gallery-slide relative shrink-0 snap-center self-center sm:snap-start"
                style={{ marginRight: SLIDE_GAP }}
              >
                <img
                  src={assetUrl(slide.src)}
                  alt={slide.alt}
                  draggable={false}
                  className="absolute inset-0 size-full object-cover select-none"
                />
                {slide.label ? (
                  <figcaption className="absolute bottom-6 left-8 font-sans text-msk-xs font-medium tracking-msk-wide text-white/80 uppercase">
                    {slide.label}
                  </figcaption>
                ) : null}
              </figure>
            ))}
          </div>

          <div className="msk-page-x mx-auto flex w-full max-w-msk items-center justify-between pt-5 pb-2">
            <div className="flex items-center gap-2" role="tablist">
              {slides.map((slide, i) => (
                <button
                  key={slide.src}
                  type="button"
                  role="tab"
                  aria-label={`${i + 1}`}
                  aria-selected={i === index}
                  onClick={() => goTo(i)}
                  className={cn(
                    "h-px transition-all duration-msk ease-out",
                    i === index ? "w-8 bg-msk-text" : "w-5 bg-white/25",
                  )}
                />
              ))}
            </div>
            <p className="font-sans text-xs font-medium text-msk-text-subtle">
              {String(index + 1).padStart(2, "0")} /{" "}
              {String(slides.length).padStart(2, "0")}
            </p>
          </div>
        </div>
      ) : null}

      <div className="msk-page-x mx-auto flex w-full max-w-msk flex-col gap-24 py-msk-x">
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
                src={assetUrl("/assets/logo/msk-creation.svg")}
                alt=""
                aria-hidden
                className="msk-logo-watermark pointer-events-none absolute -top-8 right-0 hidden h-32 w-auto max-w-2/5 opacity-8 sm:block"
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
        <div className="h-msk-marquee w-full max-w-full overflow-hidden border-y border-white/10">
          <div className="flex h-full w-full items-center overflow-hidden">
            <div className="msk-marquee flex w-max gap-8 whitespace-nowrap will-change-transform">
              {ticker.map((item, i) => (
                <span
                  key={`${item}-${i}`}
                  className="msk-ticker inline-flex items-center gap-8 text-msk-text"
                >
                  {item}
                  <span className="text-msk-text-subtle" aria-hidden>
                    ·
                  </span>
                </span>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
