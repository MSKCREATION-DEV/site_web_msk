/**
 * Helpers SEO — meta descriptors React Router.
 * Contenu title/description depuis app/content uniquement (pas d’invention marketing).
 */

export type PageMetaInput = {
  title: string;
  description: string;
  canonical: string;
  locale: "fr" | "en";
  /** URLs absolues FR + EN pour hreflang */
  alternateLocales: Array<{ locale: "fr" | "en"; href: string }>;
  /** open graph type */
  ogType?: "website" | "article";
  /** Nom de marque pour og:site_name */
  siteName?: string;
  /** URL absolue og:image / twitter:image */
  imageUrl?: string;
  /** JSON-LD (script:ld+json) — objet ou graphe */
  jsonLd?: Record<string, unknown> | Array<Record<string, unknown>>;
};

type MetaDescriptor =
  | { title: string }
  | { name: string; content: string }
  | { property: string; content: string }
  | {
      tagName: "link";
      rel: string;
      href: string;
      hrefLang?: string;
    }
  | { "script:ld+json": Record<string, unknown> | Array<Record<string, unknown>> };

const OG_LOCALE: Record<"fr" | "en", string> = {
  fr: "fr_FR",
  en: "en_US",
};

export function buildPageMeta(input: PageMetaInput): MetaDescriptor[] {
  const ogType = input.ogType ?? "website";
  const siteName = input.siteName ?? "MSK Création";
  const meta: MetaDescriptor[] = [
    { title: input.title },
    { name: "description", content: input.description },
    { property: "og:type", content: ogType },
    { property: "og:site_name", content: siteName },
    { property: "og:title", content: input.title },
    { property: "og:description", content: input.description },
    { property: "og:url", content: input.canonical },
    { property: "og:locale", content: OG_LOCALE[input.locale] },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: input.title },
    { name: "twitter:description", content: input.description },
    { tagName: "link", rel: "canonical", href: input.canonical },
  ];

  if (input.imageUrl) {
    meta.push(
      { property: "og:image", content: input.imageUrl },
      { name: "twitter:image", content: input.imageUrl },
    );
  }

  for (const alt of input.alternateLocales) {
    meta.push({
      tagName: "link",
      rel: "alternate",
      hrefLang: alt.locale,
      href: alt.href,
    });
    if (alt.locale !== input.locale) {
      meta.push({
        property: "og:locale:alternate",
        content: OG_LOCALE[alt.locale],
      });
    }
  }

  const defaultHref =
    input.alternateLocales.find((a) => a.locale === "fr")?.href ??
    input.canonical;
  meta.push({
    tagName: "link",
    rel: "alternate",
    hrefLang: "x-default",
    href: defaultHref,
  });

  if (input.jsonLd) {
    meta.push({ "script:ld+json": input.jsonLd });
  }

  return meta;
}
