import { type Locale, defaultLocale } from "./locales";

/** Segment de path pour les fiches projet selon la locale. */
export function projectPathSegment(locale: Locale): "travaux" | "projects" {
  return locale === "en" ? "projects" : "travaux";
}

export function homePath(locale: Locale = defaultLocale): string {
  return `/${locale}`;
}

export function projectPath(locale: Locale, slug: string): string {
  return `/${locale}/${projectPathSegment(locale)}/${slug}`;
}

export function alternateProjectPath(locale: Locale, slug: string): string {
  const other: Locale = locale === "fr" ? "en" : "fr";
  return projectPath(other, slug);
}

export function alternateHomePath(locale: Locale): string {
  return homePath(locale === "fr" ? "en" : "fr");
}

/** Page équipe dédiée : `/fr/equipe` · `/en/team`. */
export function teamPath(locale: Locale): string {
  return locale === "en" ? "/en/team" : "/fr/equipe";
}

export function alternateTeamPath(locale: Locale): string {
  return teamPath(locale === "fr" ? "en" : "fr");
}
