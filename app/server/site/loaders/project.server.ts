import { existsSync, statSync } from "node:fs";
import path from "node:path";
import { getLocaleContent } from "~/content";
import {
  getProjectBySlug,
  getProjectIndex,
  getWorksGridProjects,
} from "~/data";
import type { Locale } from "~/i18n";
import { projectPath } from "~/i18n";

/** Ignore exports 1×1 / vides (placeholders manuels invalidés). */
function isUsableAsset(publicPath: string): boolean {
  const absolute = path.join(process.cwd(), "public", publicPath.replace(/^\//, ""));
  if (!existsSync(absolute)) return false;
  try {
    return statSync(absolute).size > 1024;
  } catch {
    return false;
  }
}

export function loadProjectPage(locale: Locale, slug: string) {
  const project = getProjectBySlug(slug);
  if (!project) return null;

  const content = getLocaleContent(locale);
  const copy = content.projects[slug];
  if (!copy) return null;

  const grid = getWorksGridProjects();
  const index = getProjectIndex(slug);
  const prevProject = index > 0 ? grid[index - 1] : undefined;
  const nextProject = project.nextSlug
    ? getProjectBySlug(project.nextSlug)
    : index >= 0 && index < grid.length - 1
      ? grid[index + 1]
      : undefined;

  const gallery = project.gallery
    .filter((asset) => isUsableAsset(asset.src))
    .map((asset, i) => ({
      src: asset.src,
      alt: `${copy.title} ${i + 1}`,
    }));

  const beforeOk =
    project.hasBeforeAfter &&
    project.before &&
    isUsableAsset(project.before.src);
  const afterOk =
    project.hasBeforeAfter &&
    project.after &&
    isUsableAsset(project.after.src);

  return {
    locale,
    project,
    brandName: content.home.brandName,
    copy: {
      ...content.projectSheet,
      ...copy,
    },
    counter: {
      current: index + 1,
      total: grid.length,
    },
    coverSrc: isUsableAsset(project.cover.src)
      ? project.cover.src
      : project.worksCover.src,
    gallery,
    beforeAfter:
      beforeOk && afterOk && project.before && project.after
        ? {
            beforeSrc: project.before.src,
            afterSrc: project.after.src,
            beforeLabel: content.projectSheet.beforeLabel ?? "Avant",
            afterLabel: content.projectSheet.afterLabel ?? "Après",
          }
        : null,
    assetsMissing: {
      gallery: project.gallery.length > 0 && gallery.length === 0,
      beforeAfter: Boolean(project.hasBeforeAfter && !(beforeOk && afterOk)),
    },
    prev: prevProject
      ? {
          slug: prevProject.slug,
          href: projectPath(locale, prevProject.slug),
          title: content.projects[prevProject.slug]?.title ?? prevProject.slug,
          subtitle: prevProject.expertises.join(" · "),
        }
      : null,
    next: nextProject
      ? {
          slug: nextProject.slug,
          href: projectPath(locale, nextProject.slug),
          title: content.projects[nextProject.slug]?.title ?? nextProject.slug,
          subtitle: nextProject.expertises.join(" · "),
        }
      : null,
  };
}
