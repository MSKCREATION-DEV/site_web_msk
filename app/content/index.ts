import type { Locale } from "~/i18n";
import type { LocaleContent } from "./types";
import { home as homeFr } from "./fr/home";
import { home as homeEn } from "./en/home";
import { nav as navFr } from "./fr/nav";
import { nav as navEn } from "./en/nav";
import { footer as footerFr } from "./fr/footer";
import { footer as footerEn } from "./en/footer";
import { contact as contactFr } from "./fr/contact";
import { contact as contactEn } from "./en/contact";
import {
  projectSheet as projectSheetFr,
  projects as projectsFr,
} from "./fr/projects";
import {
  projectSheet as projectSheetEn,
  projects as projectsEn,
} from "./en/projects";
import { team as teamFr } from "./fr/team";
import { team as teamEn } from "./en/team";
import { teamPage as teamPageFr } from "./fr/team-page";
import { teamPage as teamPageEn } from "./en/team-page";

const catalog: Record<Locale, LocaleContent> = {
  fr: {
    home: homeFr,
    nav: navFr,
    footer: footerFr,
    contact: contactFr,
    projectSheet: projectSheetFr,
    projects: projectsFr,
    team: teamFr,
    teamPage: teamPageFr,
  },
  en: {
    home: homeEn,
    nav: navEn,
    footer: footerEn,
    contact: contactEn,
    projectSheet: projectSheetEn,
    projects: projectsEn,
    team: teamEn,
    teamPage: teamPageEn,
  },
};

export function getLocaleContent(locale: Locale): LocaleContent {
  return catalog[locale];
}
