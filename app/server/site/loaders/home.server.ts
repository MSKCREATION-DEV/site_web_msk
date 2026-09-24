import { getLocaleContent } from "~/content";
import type { Locale } from "~/i18n";
import { getWorksGridProjects } from "~/data";

export function loadHomePage(locale: Locale) {
  const content = getLocaleContent(locale);
  return {
    locale,
    home: content.home,
    contact: content.contact,
    worksCount: getWorksGridProjects().length,
  };
}
