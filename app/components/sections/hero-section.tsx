import { useEffect, useState } from "react";
import { OptimizedImg } from "~/components/ui/optimized-img";
import { cn } from "~/lib/utils";
import type { HeroContent, NavContent } from "~/content/types";
import type { Locale } from "~/i18n";

type HeroSectionProps = {
  hero: HeroContent;
  nav: NavContent;
  locale: Locale;
  className?: string;
};

/**
 * Hero — gabarit écran, intérieurs = N_design × --msk-u.
 * Indicateurs bas-droite au-dessus du marquee ; rail calculée (pas de pr matériel).
 */
export function HeroSection({
  hero,
  nav,
  className,
}: HeroSectionProps) {
  const [slideIndex, setSlideIndex] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const [wordVisible, setWordVisible] = useState(true);

  useEffect(() => {
    if (hero.slides.length < 2) return;
    const id = window.setInterval(() => {
      setSlideIndex((i) => (i + 1) % hero.slides.length);
    }, 5000);
    return () => window.clearInterval(id);
  }, [hero.slides.length]);

  useEffect(() => {
    if (hero.rotatingWords.length < 2) return;
    let fadeTimer: number | undefined;
    const id = window.setInterval(() => {
      setWordVisible(false);
      fadeTimer = window.setTimeout(() => {
        setWordIndex((i) => (i + 1) % hero.rotatingWords.length);
        setWordVisible(true);
      }, 400);
    }, hero.rotateMs);
    return () => {
      window.clearInterval(id);
      if (fadeTimer) window.clearTimeout(fadeTimer);
    };
  }, [hero.rotateMs, hero.rotatingWords.length]);

  const tickerLoop = [...hero.tickerItems, ...hero.tickerItems];
  const hasSlides = hero.slides.length > 1;

  return (
    <section
      id="hero"
      className={cn(
        "relative flex min-h-svh w-full max-w-full flex-col overflow-hidden bg-msk-black lg:h-msk-hero lg:min-h-0",
        className,
      )}
    >
      <div className="absolute inset-0 overflow-hidden" aria-hidden>
        {hero.slides.map((slide, index) => (
          <OptimizedImg
            key={slide.src}
            src={slide.src}
            alt=""
            width={1440}
            height={900}
            decoding={index === 0 ? "sync" : "async"}
            loading={index === 0 ? "eager" : "lazy"}
            fetchPriority={index === 0 ? "high" : "low"}
            pictureClassName={cn(
              "absolute inset-0 size-full transition-opacity duration-1000",
              index === slideIndex ? "opacity-100" : "opacity-0",
            )}
            className="size-full object-cover"
          />
        ))}
        <div className="absolute inset-0 bg-black/65" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-msk-page via-msk-page/50 to-transparent" />
      </div>

      <span className="sr-only">{hero.slides[slideIndex]?.alt}</span>

      <div
        className={cn(
          "msk-page-x relative z-10 mx-auto flex w-full max-w-msk min-w-0 flex-1 flex-col justify-end gap-msk-hero-stack pt-msk-nav pb-msk-hero-pb",
          hasSlides && "msk-hero-with-slides",
        )}
      >
        <h1 className="flex max-w-msk-hero-title flex-col wrap-break-word text-msk-text">
          <span className="msk-hero-line-1">{hero.titleLine1}</span>
          <span
            className={cn(
              "msk-hero-line-2 text-msk-blue transition-opacity duration-400 ease-in-out",
              wordVisible ? "opacity-100" : "opacity-0",
            )}
            aria-live="polite"
          >
            {hero.rotatingWords[wordIndex]}
          </span>
          <span className="msk-hero-line-3">{hero.titleLine3}</span>
        </h1>

        <p className="msk-body max-w-msk-hero-body text-pretty text-white/92">
          {hero.subtitle}
        </p>

        <div className="flex w-full min-w-0 flex-col items-start gap-msk-cta-gap sm:flex-row sm:items-center">
          <a
            href="#contact"
            className="msk-btn-label inline-flex h-msk-cta-btn w-auto max-w-full items-center justify-center rounded-msk-pill bg-msk-blue px-msk-btn-px text-center text-msk-text transition-colors duration-msk ease-out hover:bg-msk-blue-hover sm:min-w-msk-btn-primary"
          >
            {nav.ctaBrief}
          </a>
          <a
            href="#travaux"
            className="msk-btn-label inline-flex h-msk-cta-btn w-auto max-w-full items-center justify-center rounded-msk-pill border border-white/35 px-msk-btn-px text-center text-msk-text transition-colors duration-msk ease-out hover:border-msk-text hover:bg-white/5 sm:min-w-msk-btn-secondary"
          >
            {nav.ctaWorks}
          </a>
        </div>
      </div>

      {hasSlides ? (
        <div
          className="msk-slide-indicators absolute z-20 flex flex-col items-center gap-2"
          role="tablist"
          aria-label="Slides"
        >
          {hero.slides.map((slide, i) => (
            <button
              key={slide.src}
              type="button"
              role="tab"
              aria-selected={i === slideIndex}
              aria-label={`Slide ${i + 1}`}
              onClick={() => setSlideIndex(i)}
              className={cn(
                "w-msk-slide-dot shrink-0 cursor-pointer rounded-full transition-all duration-msk",
                i === slideIndex
                  ? "h-msk-slide-dot-active bg-msk-text"
                  : "h-msk-slide-dot bg-white/35 hover:bg-white/60",
              )}
            />
          ))}
        </div>
      ) : null}

      <div className="msk-marquee-rail relative z-10 shrink-0 border-t border-white/10 bg-black/50 backdrop-blur-sm">
        <div className="msk-marquee flex w-max max-w-none gap-10 whitespace-nowrap will-change-transform">
          {tickerLoop.map((item, index) => (
            <span
              key={`${item}-${index}`}
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
    </section>
  );
}
