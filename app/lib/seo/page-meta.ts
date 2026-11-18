import { buildPageMeta } from "./meta";
import { defaultOgImageUrl, absoluteAssetUrl } from "./assets";
import { absoluteUrl } from "./origin";
import {
  homePath,
  projectPath,
  type Locale,
} from "~/i18n";

export { absoluteUrl, siteOrigin } from "./origin";

export function homeMeta(
  locale: Locale,
  title: string,
  description: string,
  options?: {
    siteName?: string;
    imageUrl?: string;
    jsonLd?: Record<string, unknown> | Array<Record<string, unknown>>;
  },
) {
  return buildPageMeta({
    title,
    description,
    locale,
    ogType: "website",
    siteName: options?.siteName,
    imageUrl: options?.imageUrl ?? defaultOgImageUrl(),
    jsonLd: options?.jsonLd,
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
  options?: {
    imagePath?: string;
    jsonLd?: Record<string, unknown> | Array<Record<string, unknown>>;
  },
) {
  const pageTitle = `${title} | ${brandName}`;
  const pageDescription =
    description.trim().length > 0 ? description.trim() : `${title}. ${brandName}`;

  const imageUrl = options?.imagePath
    ? absoluteAssetUrl(options.imagePath)
    : defaultOgImageUrl();

  return buildPageMeta({
    title: pageTitle,
    description: pageDescription,
    locale,
    ogType: "article",
    siteName: brandName,
    imageUrl,
    jsonLd: options?.jsonLd,
    canonical: absoluteUrl(projectPath(locale, slug)),
    alternateLocales: [
      { locale: "fr", href: absoluteUrl(projectPath("fr", slug)) },
      { locale: "en", href: absoluteUrl(projectPath("en", slug)) },
    ],
  });
}
