import type { Locale } from "~/i18n";
import type { LocaleContent } from "./types";
import { home as homeFr } from "./fr/home";
import { home as homeEn } from "./en/home";
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

const catalog: Record<Locale, LocaleContent> = {
  fr: {
    home: homeFr,
    contact: contactFr,
    projectSheet: projectSheetFr,
    projects: projectsFr,
  },
  en: {
    home: homeEn,
    contact: contactEn,
    projectSheet: projectSheetEn,
    projects: projectsEn,
  },
};

export function getLocaleContent(locale: Locale): LocaleContent {
  return catalog[locale];
}
