import type { WorksContent } from "~/content/types";
import type { Locale } from "~/i18n";
import { projectPath } from "~/i18n";
import { cn } from "~/lib/utils";
import { WorksStack } from "./works-stack";
import type { WorksStackCardData } from "./works-stack-card";

export type WorksGridItem = Omit<WorksStackCardData, "href">;

type WorksSectionProps = {
  locale: Locale;
  content: WorksContent;
  projects: WorksGridItem[];
  className?: string;
};

/** Section `#travaux` — stack scroll (pattern Dagobert, tokens MSK). */
export function WorksSection({
  locale,
  content,
  projects,
  className,
}: WorksSectionProps) {
  const stackProjects: WorksStackCardData[] = projects.map((project) => ({
    ...project,
    href: projectPath(locale, project.slug),
  }));

  return (
    <section
      id="travaux"
      className={cn("scroll-mt-msk-nav", className)}
      aria-labelledby="travaux-heading"
    >
      <WorksStack
        title={content.title}
        seeProjectLabel={content.seeProjectLabel}
        counterAriaLabel={content.counterAriaLabel}
        projects={stackProjects}
      />
    </section>
  );
}
