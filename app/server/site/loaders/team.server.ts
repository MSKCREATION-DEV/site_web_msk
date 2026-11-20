import { getLocaleContent } from "~/content";
import type { Locale } from "~/i18n";
import { teamMembers } from "~/data";
import { teamPhotoAlt } from "~/lib/seo";

export function loadTeamPage(locale: Locale) {
  const content = getLocaleContent(locale);

  const team = teamMembers.map((member) => {
    const copy = content.team[member.contentKey];
    const name = copy?.name ?? member.slug;
    const role = copy?.role ?? "";
    return {
      slug: member.slug,
      name,
      role,
      focus: copy?.focus,
      email: copy?.email,
      service: copy?.service,
      photoSrc: member.photoSrc,
      photoAlt: teamPhotoAlt(name, role, content.home.brandName),
    };
  });

  return {
    locale,
    brandName: content.home.brandName,
    teamPage: content.teamPage,
    team,
    nav: content.nav,
    footer: content.footer,
    contact: content.contact,
  };
}
