import { getLocaleContent } from "~/content";
import type { Locale } from "~/i18n";
import { getWorksGridProjects, teamMembers } from "~/data";
import { isUsableAsset } from "~/server/site/assets.server";

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
      panel: project.panel,
      imageSrc: project.worksCover.src,
      imageAlt: title,
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

  const contactBackground = content.home.contactSection.backgroundSrc;
  const contactSection = {
    ...content.home.contactSection,
    backgroundSrc:
      contactBackground && isUsableAsset(contactBackground)
        ? contactBackground
        : undefined,
  };

  return {
    locale,
    home: {
      ...content.home,
      contactSection,
    },
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
