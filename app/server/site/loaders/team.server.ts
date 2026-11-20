import { getLocaleContent } from "~/content";
import type { Locale } from "~/i18n";
import { teamMembers } from "~/data";
import { postalAddressFromContactRows, teamPhotoAlt } from "~/lib/seo";

/**
 * Assemblage synchrone content + data (pas d’API).
 * Cache CDN via `headers` route (`s-maxage`) — pas de getCache Runtime Cache
 * (coût / complexité sans I/O à amortir ; limites Hobby possibles).
 */
export function loadTeamPage(locale: Locale) {
  const content = getLocaleContent(locale);

  const team = teamMembers.map((member, index) => {
    const copy = content.team[member.contentKey];
    const name = copy?.name ?? member.slug;
    const role = copy?.role ?? "";
    return {
      slug: member.slug,
      layout: member.layout,
      indexLabel: String(index + 1).padStart(2, "0"),
      name,
      role,
      focus: copy?.focus,
      email: copy?.email,
      service: copy?.service,
      presentation: copy?.presentation,
      expertise: copy?.expertise,
      contribution: copy?.contribution,
      impact: copy?.impact,
      signature: copy?.signature,
      photoSrc: member.photoSrc,
      photoAlt: teamPhotoAlt(name, role, content.home.brandName),
    };
  });

  const postalAddress =
    postalAddressFromContactRows(content.home.contactSection.rows) ?? {
      addressLocality: "Bamako",
      addressRegion: "ACI 2000",
      addressCountry: "ML",
    };

  return {
    locale,
    brandName: content.home.brandName,
    teamPage: content.teamPage,
    team,
    nav: content.nav,
    footer: content.footer,
    contact: content.contact,
    /** Adresse Organization JSON-LD (même source que home). */
    postalAddress,
  };
}
