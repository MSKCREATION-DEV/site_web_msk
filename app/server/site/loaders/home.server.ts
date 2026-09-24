import { getLocaleContent } from "~/content";
import type { Locale } from "~/i18n";
import { getWorksGridProjects } from "~/data";

export function loadHomePage(locale: Locale) {
  const content = getLocaleContent(locale);
  return {
    locale,
    home: content.home,
    nav: content.nav,
    footer: content.footer,
    contact: content.contact,
    worksCount: getWorksGridProjects().length,
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
