import { getLocaleContent } from "~/content";
import {
  getProjectBySlug,
  getProjectIndex,
  getWorksGridProjects,
} from "~/data";
import type { Locale } from "~/i18n";
import { projectPath } from "~/i18n";
import { isUsableAsset } from "~/server/site/assets.server";

/** Dimensions intrinsèques connues (exports Figma 2×) pour CLS. */
const GALLERY_INTRINSIC: Record<string, { width: number; height: number }> = {
  "/assets/projects/prosperity/gallery-01.png": { width: 2432, height: 1280 },
  "/assets/projects/prosperity/gallery-02.png": { width: 2432, height: 1280 },
  "/assets/projects/prosperity/gallery-03.png": { width: 2432, height: 1280 },
  "/assets/projects/prosperity/gallery-04.png": { width: 2432, height: 1280 },
  "/assets/projects/prosperity/gallery-05.png": { width: 2432, height: 1280 },
  "/assets/projects/prosperity/gallery-06.png": { width: 2432, height: 926 },
  "/assets/projects/thoy-art/gallery-01.png": { width: 2432, height: 1280 },
  "/assets/projects/thoy-art/gallery-02.png": { width: 2432, height: 1280 },
  "/assets/projects/thoy-art/gallery-03.png": { width: 2432, height: 1280 },
  "/assets/projects/koundji-services/gallery-01.png": { width: 2432, height: 1280 },
  "/assets/projects/koundji-services/gallery-02.png": { width: 2432, height: 1280 },
  "/assets/projects/koundji-services/gallery-03.png": { width: 2432, height: 1280 },
  "/assets/projects/koundji-services/gallery-04.png": { width: 2432, height: 1280 },
  "/assets/projects/koundji-services/gallery-05.png": { width: 2432, height: 1280 },
  "/assets/projects/bomoyi/gallery-01.png": { width: 2432, height: 1280 },
  "/assets/projects/bomoyi/gallery-02.png": { width: 2432, height: 1280 },
  "/assets/projects/bomoyi/gallery-03.png": { width: 2432, height: 1280 },
  "/assets/projects/bomoyi/gallery-04.png": { width: 1196, height: 1280 },
  "/assets/projects/bomoyi/gallery-05.png": { width: 1196, height: 1280 },
  "/assets/projects/bomoyi/gallery-06.png": { width: 2432, height: 1280 },
  "/assets/projects/ecosol/gallery-01.png": { width: 2432, height: 1280 },
  "/assets/projects/ecosol/gallery-02.png": { width: 2432, height: 1280 },
  "/assets/projects/ecosol/gallery-03.png": { width: 2432, height: 1280 },
  "/assets/projects/ecosol/gallery-04.png": { width: 1196, height: 1280 },
  "/assets/projects/ecosol/gallery-05.png": { width: 1196, height: 1280 },
  "/assets/projects/ecosol/gallery-06.png": { width: 2432, height: 1280 },
  "/assets/projects/elvi-creation/gallery-01.png": { width: 1216, height: 640 },
  "/assets/projects/elvi-creation/gallery-02.png": { width: 2432, height: 1280 },
  "/assets/projects/elvi-creation/gallery-03.png": { width: 2432, height: 1280 },
  "/assets/projects/elvi-creation/gallery-04.png": { width: 1196, height: 1280 },
  "/assets/projects/elvi-creation/gallery-05.png": { width: 1196, height: 1280 },
  "/assets/projects/elvi-creation/gallery-06.png": { width: 2432, height: 1280 },
  "/assets/projects/elvi-creation/gallery-07.png": { width: 2432, height: 1280 },
  "/assets/projects/elvi-creation/gallery-08.png": { width: 2432, height: 1280 },
  "/assets/projects/elvi-creation/gallery-09.png": { width: 2432, height: 1280 },
  "/assets/projects/elvi-creation/gallery-10.png": { width: 2432, height: 1280 },
  "/assets/projects/elvi-creation/gallery-11.png": { width: 2432, height: 1280 },
  "/assets/projects/elvi-creation/gallery-12.png": { width: 1196, height: 1280 },
  "/assets/projects/elvi-creation/gallery-13.png": { width: 1196, height: 1280 },
  "/assets/projects/akwaba/gallery-01.png": { width: 2432, height: 1280 },
  "/assets/projects/akwaba/gallery-02.png": { width: 1196, height: 1280 },
  "/assets/projects/akwaba/gallery-03.png": { width: 1196, height: 1280 },
  "/assets/projects/akwaba/gallery-04.png": { width: 2432, height: 1280 },
  "/assets/projects/akwaba/gallery-05.png": { width: 2432, height: 1280 },
  "/assets/projects/akwaba/gallery-06.png": { width: 1196, height: 1280 },
  "/assets/projects/akwaba/gallery-07.png": { width: 1196, height: 1280 },
  "/assets/projects/akwaba/gallery-08.png": { width: 2432, height: 1280 },
  "/assets/projects/akwaba/gallery-09.png": { width: 2432, height: 1280 },
};

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
    .map((asset, i) => {
      const intrinsic = GALLERY_INTRINSIC[asset.src];
      return {
        src: asset.src,
        alt: copy.galleryAlts?.[i] ?? `${copy.title} ${i + 1}`,
        slot: project.galleryLayout[i] ?? ("full" as const),
        width: intrinsic?.width,
        height: intrinsic?.height,
        usable: isUsableAsset(asset.src),
      };
    })
    .filter((item) => item.usable)
    .map(({ src, alt, slot, width, height }) => ({
      src,
      alt,
      slot,
      width,
      height,
    }));

  const beforeOk =
    project.hasBeforeAfter &&
    project.before &&
    isUsableAsset(project.before.src);
  const afterOk =
    project.hasBeforeAfter &&
    project.after &&
    isUsableAsset(project.after.src);

  const coverSrc = isUsableAsset(project.cover.src)
    ? project.cover.src
    : project.worksCover.src;

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
    coverSrc,
    coverAlt: copy.coverAlt ?? copy.title,
    gallery,
    approachAfterIndex: 0,
    panel: project.panel,
    beforeAfter:
      beforeOk && afterOk && project.before && project.after
        ? {
            beforeSrc: project.before.src,
            afterSrc: project.after.src,
            beforeLabel: content.projectSheet.beforeLabel ?? "Avant",
            afterLabel: content.projectSheet.afterLabel ?? "Après",
            beforeAlt: copy.beforeAlt ?? copy.title,
            afterAlt: copy.afterAlt ?? copy.title,
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
