import { OptimizedImg } from "~/components/ui/optimized-img";
import { assetUrl } from "~/lib/assets";
import { cn } from "~/lib/utils";
import { Reveal } from "~/components/ui";
import type { CtaContent } from "~/content/types";

type ProjectCtaSectionProps = {
  content: CtaContent;
  className?: string;
};

/**
 * CTA vidéo — marquee full-bleed, média full-bleed, copy calée sur `msk-page-x`.
 * Règle rythme : fond/média → bord à bord ; textes / CTA → gutter page.
 */
export function ProjectCtaSection({
  content,
  className,
}: ProjectCtaSectionProps) {
  const clientsLoop = [...content.clients, ...content.clients];

  return (
    <section
      id="cta"
      className={cn("scroll-mt-msk-nav w-full bg-msk-black", className)}
      aria-label={content.ariaLabel}
    >
      <div className="msk-marquee-rail">
        <div className="msk-marquee flex w-max gap-10 whitespace-nowrap will-change-transform">
          {clientsLoop.map((client, index) => (
            <span
              key={`${client}-${index}`}
              className="msk-ticker inline-flex items-center gap-10 text-msk-text"
            >
              {client}
              <span className="text-msk-text-subtle" aria-hidden>
                ·
              </span>
            </span>
          ))}
        </div>
      </div>

      <div className="relative w-full">
        {/* Média full-bleed (hors gutter) */}
        <div className="absolute inset-0 overflow-hidden" aria-hidden>
          <OptimizedImg
            src={content.posterSrc}
            alt=""
            loading="lazy"
            decoding="async"
            pictureClassName="absolute inset-0 size-full"
            className="size-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-r from-msk-ink/85 via-msk-ink/45 to-msk-ink/65" />
          {/* Charte v3 — filigrane discret, hors zone CTA */}
          <img
            src={assetUrl("/assets/logo/msk-mark.svg")}
            alt=""
            loading="lazy"
            decoding="async"
            className="msk-logo-watermark pointer-events-none absolute top-1/2 right-[max(1.25rem,var(--msk-page-px))] hidden h-28 w-auto -translate-y-1/2 opacity-[0.08] lg:block"
          />
        </div>

        <div className="msk-page-x relative z-10 mx-auto flex min-h-0 w-full max-w-msk flex-col justify-center py-20 sm:min-h-msk-cta sm:py-28 lg:py-32">
          <Reveal className="relative z-10 flex w-full flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <h2 className="flex max-w-msk-cta-title flex-col text-msk-text">
              <span className="msk-cta-title">{content.titleLine1}</span>
              <span className="msk-cta-accent text-msk-blue">
                {content.titleAccent}
              </span>
            </h2>

            <div className="flex w-full min-w-0 flex-col items-start gap-msk-cta-gap sm:w-auto lg:items-end">
              <a
                href="#contact"
                className="msk-btn-label inline-flex h-msk-cta-btn w-auto max-w-full items-center justify-center rounded-msk-pill bg-msk-blue px-msk-btn-px text-msk-text transition-colors duration-msk ease-out hover:bg-msk-blue-hover"
              >
                {content.ctaLabel}
              </a>
              <a
                href={content.emailHref}
                className="font-sans text-xs text-msk-text transition-colors hover:text-msk-blue"
              >
                {content.email}
              </a>
            </div>
          </Reveal>

          <nav
            aria-label={content.ariaLabel}
            className="relative z-10 mt-10 hidden items-center justify-end gap-6 sm:flex"
          >
            {content.mediaTabs.map((tab, index) => (
              <span
                key={tab}
                className={cn(
                  "font-sans text-msk-2xs font-medium tracking-msk-wide uppercase",
                  index === content.mediaTabs.length - 1
                    ? "border-b border-msk-text pb-1 text-msk-text"
                    : "text-white/55",
                )}
              >
                {tab}
              </span>
            ))}
          </nav>
        </div>
      </div>
    </section>
  );
}
