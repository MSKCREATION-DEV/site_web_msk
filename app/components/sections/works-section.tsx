import { useMemo, useState } from "react";
import {
  ProjectCard,
  Reveal,
  WorksFilter,
  type ProjectCardHeight,
  type WorksFilterValue,
} from "~/components/ui";
import type { WorksContent } from "~/content/types";
import type { Locale } from "~/i18n";
import { projectPath } from "~/i18n";
import type { ProjectFilter } from "~/data";
import { cn } from "~/lib/utils";

const LEFT_COLUMN_SLUGS = [
  "koundji-services",
  "ecosol",
  "akwaba",
] as const;

const RIGHT_COLUMN_SLUGS = [
  "thoy-art",
  "bomoyi",
  "elvi-creation",
] as const;

export type WorksGridItem = {
  slug: string;
  title: string;
  category: string;
  year: string;
  accentColor?: string;
  imageSrc: string;
  imageAlt: string;
  height: ProjectCardHeight;
  filters: ProjectFilter[];
};

type WorksSectionProps = {
  locale: Locale;
  content: WorksContent;
  projects: WorksGridItem[];
  className?: string;
};

function pickColumn(
  projects: WorksGridItem[],
  slugs: readonly string[],
): WorksGridItem[] {
  const bySlug = new Map(projects.map((project) => [project.slug, project]));
  return slugs
    .map((slug) => bySlug.get(slug))
    .filter((project): project is WorksGridItem => Boolean(project));
}

/**
 * Travaux — pt 80, cols 592 + gap 32, filtres CSR, CTA 297×56.
 */
export function WorksSection({
  locale,
  content,
  projects,
  className,
}: WorksSectionProps) {
  const [filter, setFilter] = useState<WorksFilterValue>("all");

  const visible = useMemo(() => {
    if (filter === "all") return projects;
    return projects.filter((project) => project.filters.includes(filter));
  }, [filter, projects]);

  const left = pickColumn(visible, LEFT_COLUMN_SLUGS);
  const right = pickColumn(visible, RIGHT_COLUMN_SLUGS);

  return (
    <section
      id="travaux"
      className={cn("scroll-mt-24 bg-msk-page", className)}
      aria-labelledby="travaux-heading"
    >
      <div className="msk-page-x mx-auto w-full max-w-msk pt-20 pb-24">
        <Reveal>
          <div className="mb-10 flex flex-col gap-4">
            <h2 id="travaux-heading" className="msk-eyebrow text-msk-text-muted">
              {content.title}
            </h2>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
              <WorksFilter
                value={filter}
                onChange={setFilter}
                labels={content.filters}
                ariaLabel={content.filterAriaLabel}
              />
              <p className="shrink-0 font-sans text-msk-xs text-msk-text-muted">
                {content.counterLabel}
              </p>
            </div>
          </div>
        </Reveal>

        <div className="flex flex-col gap-10 lg:flex-row lg:gap-8">
          <ul className="flex w-full min-w-0 flex-1 flex-col gap-10 lg:gap-8">
            {left.map((project, i) => (
              <li key={project.slug}>
                <Reveal delayMs={i * 80}>
                  <ProjectCard
                    title={project.title}
                    category={project.category}
                    year={project.year}
                    seeProjectLabel={content.seeProjectLabel}
                    accentColor={project.accentColor}
                    href={projectPath(locale, project.slug)}
                    imageSrc={project.imageSrc}
                    imageAlt={project.imageAlt}
                    height={project.height}
                  />
                </Reveal>
              </li>
            ))}
          </ul>
          <ul className="flex w-full min-w-0 flex-1 flex-col gap-10 lg:gap-8">
            {right.map((project, i) => (
              <li key={project.slug}>
                <Reveal delayMs={i * 80 + 40}>
                  <ProjectCard
                    title={project.title}
                    category={project.category}
                    year={project.year}
                    seeProjectLabel={content.seeProjectLabel}
                    accentColor={project.accentColor}
                    href={projectPath(locale, project.slug)}
                    imageSrc={project.imageSrc}
                    imageAlt={project.imageAlt}
                    height={project.height}
                  />
                </Reveal>
              </li>
            ))}
          </ul>
        </div>

        <Reveal>
          <div className="mt-12 flex justify-center sm:mt-14">
            <button
              type="button"
              onClick={() => setFilter("all")}
              className="msk-btn-label-sm inline-flex h-msk-cta-btn w-auto max-w-full cursor-pointer items-center justify-center rounded-msk-pill border border-white/35 px-msk-btn-px text-center text-msk-text transition-colors hover:border-msk-text hover:bg-white/5 sm:min-w-msk-btn-see-all"
            >
              {content.seeAllLabel}
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
