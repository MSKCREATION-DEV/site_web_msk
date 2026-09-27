import { buildPageMeta } from "./meta";
import {
  homePath,
  projectPath,
  type Locale,
} from "~/i18n";

const SITE_ORIGIN = (
  import.meta.env.VITE_SITE_ORIGIN ?? "http://localhost:5173"
).replace(/\/$/, "");

export function absoluteUrl(path: string) {
  return `${SITE_ORIGIN}${path.startsWith("/") ? path : `/${path}`}`;
}

export function siteOrigin() {
  return SITE_ORIGIN;
}

export function homeMeta(locale: Locale, title: string, description: string) {
  return buildPageMeta({
    title,
    description,
    locale,
    ogType: "website",
    canonical: absoluteUrl(homePath(locale)),
    alternateLocales: [
      { locale: "fr", href: absoluteUrl(homePath("fr")) },
      { locale: "en", href: absoluteUrl(homePath("en")) },
    ],
  });
}

/**
 * Meta fiche projet. Description = copy Figma si présente,
 * sinon titre + marque (pas d’invention marketing).
 */
export function projectMeta(
  locale: Locale,
  slug: string,
  title: string,
  description: string,
  brandName: string,
) {
  const pageTitle = `${title} | ${brandName}`;
  const pageDescription =
    description.trim().length > 0 ? description.trim() : `${title}. ${brandName}`;

  return buildPageMeta({
    title: pageTitle,
    description: pageDescription,
    locale,
    ogType: "article",
    canonical: absoluteUrl(projectPath(locale, slug)),
    alternateLocales: [
      { locale: "fr", href: absoluteUrl(projectPath("fr", slug)) },
      { locale: "en", href: absoluteUrl(projectPath("en", slug)) },
    ],
  });
}
