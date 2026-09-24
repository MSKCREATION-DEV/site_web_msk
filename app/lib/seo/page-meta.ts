import { buildPageMeta } from "./meta";
import {
  homePath,
  projectPath,
  type Locale,
} from "~/i18n";

const SITE_ORIGIN = (
  import.meta.env.VITE_SITE_ORIGIN ?? "http://localhost:5173"
).replace(/\/$/, "");

function absolute(path: string) {
  return `${SITE_ORIGIN}${path}`;
}

export function homeMeta(locale: Locale, title: string, description: string) {
  return buildPageMeta({
    title,
    description,
    locale,
    canonical: absolute(homePath(locale)),
    alternateLocales: [
      { locale: "fr", href: absolute(homePath("fr")) },
      { locale: "en", href: absolute(homePath("en")) },
    ],
  });
}

export function projectMeta(
  locale: Locale,
  slug: string,
  title: string,
  description: string,
) {
  return buildPageMeta({
    title,
    description,
    locale,
    canonical: absolute(projectPath(locale, slug)),
    alternateLocales: [
      { locale: "fr", href: absolute(projectPath("fr", slug)) },
      { locale: "en", href: absolute(projectPath("en", slug)) },
    ],
  });
}
