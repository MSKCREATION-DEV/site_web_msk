import { getLocaleContent } from "~/content";
import {
  getProjectBySlug,
  getProjectIndex,
  getWorksGridProjects,
} from "~/data";
import type { Locale } from "~/i18n";
import { projectPath } from "~/i18n";
import { isUsableAsset } from "~/server/site/assets.server";

export function loadProjectPage(locale: Locale, slug: string) {
  const project = getProjectBySlug(slug);
  if (!project) return null;

  const content = getLocaleContent(locale);
  const copy = content.projects[slug];
  if (!copy) return null;

  const grid = getWorksGridProjects();
  const index = getProjectIndex(slug);
  /** Figma : prev NON TROUVÉ ; next = chaîne circulaire. */
  const nextProject = project.nextSlug
    ? getProjectBySlug(project.nextSlug)
    : undefined;

  const gallery = project.gallery
    .map((asset, i) => ({
      src: asset.src,
      alt: `${copy.title} ${i + 1}`,
      slot: project.galleryLayout[i] ?? ("full" as const),
      usable: isUsableAsset(asset.src),
    }))
    .filter((item) => item.usable)
    .map(({ src, alt, slot }) => ({ src, alt, slot }));

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
    panel: project.panel,
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
    next: nextProject
      ? {
          slug: nextProject.slug,
          href: projectPath(locale, nextProject.slug),
          title: content.projects[nextProject.slug]?.title ?? nextProject.slug,
          panel: nextProject.panel,
        }
      : null,
  };
}
