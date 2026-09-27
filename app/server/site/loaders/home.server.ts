import { existsSync, statSync } from "node:fs";
import path from "node:path";
import { getLocaleContent } from "~/content";
import type { Locale } from "~/i18n";
import { getWorksGridProjects, teamMembers } from "~/data";

function isUsableAsset(publicPath: string): boolean {
  const absolute = path.join(process.cwd(), "public", publicPath.replace(/^\//, ""));
  if (!existsSync(absolute)) return false;
  try {
    return statSync(absolute).size > 1024;
  } catch {
    return false;
  }
}

export function loadHomePage(locale: Locale) {
  const content = getLocaleContent(locale);
  const worksProjects = getWorksGridProjects().map((project) => {
    const copy = content.projects[project.slug];
    const title = copy?.title ?? project.slug;
    return {
      slug: project.slug,
      title,
      category: copy?.category ?? "",
      year: project.year,
      accentColor: project.accentColor,
      imageSrc: project.worksCover.src,
      imageAlt: title,
      height: project.worksCardHeight,
      filters: project.filters,
    };
  });

  const team = teamMembers.map((member) => {
    const copy = content.team[member.contentKey];
    return {
      slug: member.slug,
      name: copy?.name ?? member.slug,
      role: copy?.role ?? "",
      photoSrc: member.photoSrc,
    };
  });

  const approachGallery = content.home.approach.gallery.filter((image) =>
    isUsableAsset(image.src),
  );

  return {
    locale,
    home: content.home,
    nav: content.nav,
    footer: content.footer,
    contact: content.contact,
    worksProjects,
    team,
    approachGallery,
  };
}

export function loadLocaleShell(locale: Locale) {
  const content = getLocaleContent(locale);
  return {
    locale,
    nav: content.nav,
    footer: content.footer,
    contact: content.contact,
  };
}
