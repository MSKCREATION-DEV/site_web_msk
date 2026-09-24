import { getLocaleContent } from "~/content";
import {
  getProjectBySlug,
  getProjectIndex,
  getWorksGridProjects,
} from "~/data";
import type { Locale } from "~/i18n";
import { projectPath } from "~/i18n";

export function loadProjectPage(locale: Locale, slug: string) {
  const project = getProjectBySlug(slug);
  if (!project) return null;

  const content = getLocaleContent(locale);
  const copy = content.projects[slug];
  if (!copy) return null;

  const grid = getWorksGridProjects();
  const index = getProjectIndex(slug);
  const next = project.nextSlug
    ? getProjectBySlug(project.nextSlug)
    : undefined;

  return {
    locale,
    project,
    copy: {
      ...content.projectSheet,
      ...copy,
    },
    counter: {
      current: index + 1,
      total: grid.length,
    },
    next: next
      ? {
          slug: next.slug,
          href: projectPath(locale, next.slug),
          title: content.projects[next.slug]?.title ?? next.slug,
        }
      : null,
  };
}
