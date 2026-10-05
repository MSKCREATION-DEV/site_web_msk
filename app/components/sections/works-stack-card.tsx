import { Link } from "react-router";
import type { ProjectPanelStyle } from "~/data/projects";
import { assetUrl } from "~/lib/assets";
import { cn } from "~/lib/utils";

export type WorksStackCardData = {
  slug: string;
  title: string;
  category: string;
  year: string;
  panel: ProjectPanelStyle;
  imageSrc: string;
  imageAlt: string;
  href: string;
};

type WorksStackCardProps = {
  project: WorksStackCardData;
  seeProjectLabel: string;
  className?: string;
  priority?: boolean;
};

/**
 * Carte Travaux — split 560/656, radius 16, panneau Figma (audit 2026-10-04).
 * CTA outline 230×72 ; libellé hors Figma text (frame « Voir le projet »).
 */
export function WorksStackCard({
  project,
  seeProjectLabel,
  className,
  priority = false,
}: WorksStackCardProps) {
  const { panel } = project;
  const yearLabel = `[ ${project.year} ]`;
  const titleStyle = panel.titleGradient
    ? {
        backgroundImage: panel.titleGradient,
        WebkitBackgroundClip: "text" as const,
        backgroundClip: "text" as const,
        color: "transparent",
      }
    : { color: panel.titleColor };

  return (
    <article
      className={cn(
        "flex size-full flex-col overflow-hidden rounded-[var(--msk-works-stack-radius)] md:flex-row",
        className,
      )}
    >
      {/* Image 560 / panneau 656 ≈ 46% / 54% */}
      <div className="relative min-h-0 flex-[560] bg-msk-placeholder md:flex-[560]">
        <img
          src={assetUrl(project.imageSrc)}
          alt={project.imageAlt}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding="async"
          className="absolute inset-0 size-full object-cover"
        />
      </div>

      <div
        className="relative flex min-h-[42%] flex-[656] flex-col items-center justify-between px-6 py-8 md:min-h-0 md:px-12 md:py-12"
        style={{ background: panel.background }}
      >
        <p
          className="font-mono-msk text-center text-base font-medium tracking-[0.06em]"
          style={{ color: panel.yearColor }}
        >
          {yearLabel}
        </p>

        <div className="flex w-full flex-col items-center gap-4 text-center">
          <h3
            className="font-display text-[clamp(2.5rem,7vw,5.25rem)] leading-none font-extrabold tracking-[-0.01em] uppercase"
            style={titleStyle}
          >
            {project.title}
          </h3>
          {project.category.trim() ? (
            <p
              className="font-mono-msk max-w-md text-[0.9375rem] font-medium tracking-[0.4em] uppercase"
              style={{ color: panel.tagsColor }}
            >
              {project.category}
            </p>
          ) : null}

          <div className="h-2.5 w-6 shrink-0" aria-hidden />

          <Link
            to={project.href}
            className="relative z-10 inline-flex h-[4.5rem] min-w-[14.375rem] items-center justify-center rounded-full border-2 bg-transparent px-[3.25rem] py-[1.125rem] text-base font-medium transition-colors hover:bg-white/10"
            style={{
              borderColor: panel.ctaBorderColor,
              color: panel.ctaBorderColor,
            }}
          >
            {seeProjectLabel}
          </Link>
        </div>

        {/* Équilibrage Figma : année dupliquée opacité 0 */}
        <p
          className="pointer-events-none font-mono-msk text-base font-medium tracking-[0.06em] opacity-0 select-none"
          aria-hidden
        >
          {yearLabel}
        </p>
      </div>
    </article>
  );
}
