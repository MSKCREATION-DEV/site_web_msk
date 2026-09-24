/**
 * Helpers SEO — meta descriptors React Router.
 * Contenu title/description depuis app/content uniquement.
 */

export type PageMetaInput = {
  title: string;
  description: string;
  canonical?: string;
  locale?: "fr" | "en";
  alternateLocales?: Array<{ locale: "fr" | "en"; href: string }>;
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
    };

export function buildPageMeta(input: PageMetaInput): MetaDescriptor[] {
  const meta: MetaDescriptor[] = [
    { title: input.title },
    { name: "description", content: input.description },
    { property: "og:title", content: input.title },
    { property: "og:description", content: input.description },
  ];

  if (input.locale) {
    meta.push({ property: "og:locale", content: input.locale });
  }

  if (input.canonical) {
    meta.push({ tagName: "link", rel: "canonical", href: input.canonical });
  }

  for (const alt of input.alternateLocales ?? []) {
    meta.push({
      tagName: "link",
      rel: "alternate",
      hrefLang: alt.locale,
      href: alt.href,
    });
  }

  return meta;
}
