import { assetUrl } from "~/lib/assets";
import { cn } from "~/lib/utils";
import { Reveal } from "~/components/ui";
import type { CtaContent } from "~/content/types";

type ProjectCtaSectionProps = {
  content: CtaContent;
  className?: string;
};

/**
 * CTA vidéo — H 470, marquee clients, titre 101/113, chevrons droite.
 */
export function ProjectCtaSection({
  content,
  className,
}: ProjectCtaSectionProps) {
  const clientsLoop = [...content.clients, ...content.clients];

  return (
    <section
      id="cta"
      className={cn("scroll-mt-24 w-full bg-msk-black", className)}
      aria-label={content.ariaLabel}
    >
      <div className="h-msk-marquee w-full max-w-full overflow-hidden border-y border-white/10">
        <div className="flex h-full w-full items-center overflow-hidden">
          <div className="msk-marquee flex w-max gap-8 whitespace-nowrap will-change-transform">
            {clientsLoop.map((client, index) => (
              <span
                key={`${client}-${index}`}
                className="msk-ticker inline-flex items-center gap-8 text-msk-text"
              >
                {client}
                <span className="text-msk-text-subtle" aria-hidden>
                  ·
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="msk-page-x relative mx-auto flex min-h-0 w-full max-w-msk items-center py-20 sm:min-h-msk-cta sm:py-28 lg:py-32">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={assetUrl(content.posterSrc)}
            alt={content.posterAlt}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 size-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/40 to-black/55" />
          <img
            src={assetUrl("/assets/logo/msk-creation.svg")}
            alt=""
            aria-hidden
            loading="lazy"
            decoding="async"
            className="msk-logo-watermark msk-watermark-pos pointer-events-none absolute top-1/2 hidden h-1/2 w-auto max-w-2/5 -translate-y-1/2 opacity-30 sm:block"
          />
        </div>

        <Reveal className="relative z-10 flex w-full flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <h2 className="flex max-w-msk-cta-title flex-col text-msk-text">
            <span className="msk-cta-title">{content.titleLine1}</span>
            <span className="msk-cta-accent text-msk-blue">{content.titleAccent}</span>
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
          className="absolute msk-edge-right bottom-6 z-10 hidden items-center gap-6 sm:flex"
        >
          {content.mediaTabs.map((tab, index) => (
            <span
              key={tab}
              className={cn(
                "font-sans text-msk-2xs font-medium tracking-msk-wide uppercase",
                index === content.mediaTabs.length - 1
                  ? "text-msk-text"
                  : "text-white/55",
              )}
            >
              {tab}
            </span>
          ))}
        </nav>
      </div>
    </section>
  );
}
