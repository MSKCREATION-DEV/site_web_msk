import { useEffect, useState } from "react";
import { assetUrl } from "~/lib/assets";
import { cn } from "~/lib/utils";
import type { HeroContent } from "~/content/types";
import type { NavContent } from "~/content/types";

type HeroSectionProps = {
  hero: HeroContent;
  nav: NavContent;
  brandName: string;
  className?: string;
};

/**
 * Hero Desktop — comportements Figma Lisez-moi :
 * diaporama, mot bleu toutes les 3 s, CTAs scroll.
 * Composition / copy titre exact = PENDING (coller depuis Figma 02 Hero).
 */
export function HeroSection({
  hero,
  nav,
  brandName,
  className,
}: HeroSectionProps) {
  const [slideIndex, setSlideIndex] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const hasWords = hero.rotatingWords.length > 0;
  const hasTitleParts =
    hero.titleBefore.length > 0 ||
    hero.titleAfter.length > 0 ||
    hasWords;

  useEffect(() => {
    if (hero.slides.length < 2) return;
    const id = window.setInterval(() => {
      setSlideIndex((i) => (i + 1) % hero.slides.length);
    }, 5000);
    return () => window.clearInterval(id);
  }, [hero.slides.length]);

  useEffect(() => {
    if (!hasWords) return;
    const id = window.setInterval(() => {
      setWordIndex((i) => (i + 1) % hero.rotatingWords.length);
    }, hero.rotateMs);
    return () => window.clearInterval(id);
  }, [hasWords, hero.rotateMs, hero.rotatingWords.length]);

  return (
    <section
      id="hero"
      className={cn(
        "relative flex min-h-[min(900px,100dvh)] w-full flex-col justify-end overflow-hidden bg-msk-placeholder",
        className,
      )}
    >
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
        <div className="absolute inset-0 bg-gradient-to-t from-msk-page via-msk-page/50 to-transparent" />
      </div>

      {/* Slide actif pour accessibilité alt */}
      <span className="sr-only">{hero.slides[slideIndex]?.alt}</span>

      <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-col gap-10 px-8 pb-24 pt-40">
        <h1 className="font-display max-w-4xl text-4xl font-extrabold tracking-tight text-msk-text uppercase md:text-6xl lg:text-7xl">
          {hasTitleParts ? (
            <>
              {hero.titleBefore ? <span>{hero.titleBefore} </span> : null}
              {hasWords ? (
                <span className="text-msk-blue" aria-live="polite">
                  {hero.rotatingWords[wordIndex]}
                </span>
              ) : null}
              {hero.titleAfter ? <span> {hero.titleAfter}</span> : null}
            </>
          ) : (
            <span>{brandName}</span>
          )}
        </h1>

        {!hasTitleParts ? (
          <p className="max-w-xl text-sm text-msk-text-muted">
            Copy titre Hero Figma (mots bleus rotatifs) non encore collé —
            diaporama et CTAs actifs.
          </p>
        ) : null}

        <div className="flex flex-wrap items-center gap-4">
          <a
            href="#contact"
            className="rounded-[999px] bg-msk-blue px-8 py-4 text-[11px] tracking-[2.2px] text-msk-text uppercase transition-colors hover:bg-msk-blue-hover"
          >
            {nav.ctaBrief}
          </a>
          <a
            href="#travaux"
            className="rounded-[999px] border border-msk-border px-8 py-4 text-[11px] tracking-[2.2px] text-msk-text uppercase transition-colors hover:border-msk-text-muted"
          >
            {nav.ctaWorks}
          </a>
          <a
            href="#contact"
            className="text-[11px] tracking-[2.2px] text-msk-text-secondary uppercase transition-colors hover:text-msk-text"
          >
            {hero.ctaStart} →
          </a>
        </div>
      </div>
    </section>
  );
}
