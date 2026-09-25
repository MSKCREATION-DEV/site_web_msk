import { useEffect, useState } from "react";
import { assetUrl } from "~/lib/assets";
import { cn } from "~/lib/utils";
import type { HeroContent, NavContent } from "~/content/types";

type HeroSectionProps = {
  hero: HeroContent;
  nav: NavContent;
  className?: string;
};

/**
 * Hero « 02 - Hero » — Figma Desktop.
 * Overlay 55 %, diaporama, H1 3 lignes, accroche, 2 CTAs, bandeau bas.
 */
export function HeroSection({ hero, nav, className }: HeroSectionProps) {
  const [slideIndex, setSlideIndex] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    if (hero.slides.length < 2) return;
    const id = window.setInterval(() => {
      setSlideIndex((i) => (i + 1) % hero.slides.length);
    }, 5000);
    return () => window.clearInterval(id);
  }, [hero.slides.length]);

  useEffect(() => {
    if (hero.rotatingWords.length < 2) return;
    const id = window.setInterval(() => {
      setWordIndex((i) => (i + 1) % hero.rotatingWords.length);
    }, hero.rotateMs);
    return () => window.clearInterval(id);
  }, [hero.rotateMs, hero.rotatingWords.length]);

  const tickerLoop = [...hero.tickerItems, ...hero.tickerItems];

  return (
    <section
      id="hero"
      className={cn(
        "relative flex min-h-[min(900px,100dvh)] w-full flex-col overflow-hidden bg-msk-black",
        className,
      )}
    >
      {/* Diaporama + Overlay sombre 55% + dégradé bas */}
      <div className="absolute inset-0" aria-hidden>
        {hero.slides.map((slide, index) => (
          <img
            key={slide.src}
            src={assetUrl(slide.src)}
            alt=""
            className={cn(
              "absolute inset-0 size-full object-cover transition-opacity duration-1000",
              index === slideIndex ? "opacity-100" : "opacity-0",
            )}
          />
        ))}
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-msk-page to-transparent" />
      </div>

      <span className="sr-only">{hero.slides[slideIndex]?.alt}</span>

      <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-1 flex-col justify-end px-8 pb-28 pt-40">
        <h1 className="flex max-w-[720px] flex-col gap-1 text-msk-text">
          <span
            className="font-grotesk text-[clamp(2.5rem,6.5vw,5.5rem)] font-light uppercase leading-[1.1] tracking-[-0.02em]"
          >
            {hero.titleLine1}
          </span>
          <span
            className="font-serif-msk text-[clamp(2.75rem,7vw,5.75rem)] text-msk-blue italic leading-[1.1]"
            aria-live="polite"
          >
            {hero.rotatingWords[wordIndex]}
          </span>
          <span className="font-grotesk text-[clamp(2.5rem,6.5vw,5.5rem)] font-bold uppercase leading-[1.1] tracking-[-0.02em]">
            {hero.titleLine3}
          </span>
        </h1>

        <p className="mt-8 max-w-[540px] text-base leading-relaxed text-msk-text md:text-lg">
          {hero.subtitle}
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href="#contact"
            className="rounded-[999px] bg-msk-blue px-8 py-4 text-[11px] tracking-[2.2px] text-msk-text uppercase transition-colors hover:bg-msk-blue-hover"
          >
            {nav.ctaBrief}
          </a>
          <a
            href="#travaux"
            className="rounded-[999px] border border-white/80 px-8 py-4 text-[11px] tracking-[2.2px] text-msk-text uppercase transition-colors hover:border-msk-text hover:bg-white/5"
          >
            {nav.ctaWorks}
          </a>
        </div>
      </div>

      {/* Bandeau services */}
      <div className="relative z-10 border-t border-white/10 bg-black/40 backdrop-blur-sm">
        <div className="overflow-hidden py-4">
          <div className="msk-marquee flex w-max gap-8 whitespace-nowrap">
            {tickerLoop.map((item, index) => (
              <span
                key={`${item}-${index}`}
                className="inline-flex items-center gap-8 text-[11px] tracking-[2px] text-msk-text uppercase"
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
    </section>
  );
}
