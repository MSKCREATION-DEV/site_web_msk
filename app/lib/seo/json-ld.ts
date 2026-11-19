/**
 * Helpers JSON-LD SSR — contenu dérivé de app/content + app/data uniquement.
 * Pas de sameAs / bios inventés (Q20–Q21).
 */

import {
  absoluteAssetUrl,
  ORGANIZATION_LOGO_PATH,
} from "./assets";
import { absoluteUrl, siteOrigin } from "./origin";
import { homePath, projectPath, type Locale } from "~/i18n";

const ORG_ID = "#organization";

export type JsonLdPersonInput = {
  name: string;
  role: string;
};

export type JsonLdHomeInput = {
  locale: Locale;
  brandName: string;
  description: string;
  email: string;
  /** Localité connue content (ex. Bamako) */
  addressLocality: string;
  /** Quartier / zone (ex. ACI 2000) */
  addressRegion?: string;
  addressCountry: string;
  team: JsonLdPersonInput[];
  /**
   * Profils sociaux déjà présents dans content footer/contact (Figma).
   * Pas d’URL inventée.
   */
  sameAs?: string[];
};

export type JsonLdProjectImage = {
  path: string;
  caption?: string;
};

export type JsonLdProjectInput = {
  locale: Locale;
  slug: string;
  brandName: string;
  title: string;
  description: string;
  /** Cover fiche (ImageObject principal). */
  imagePath: string;
  /** Galerie (+ cover) pour ImageObject associés. */
  images?: JsonLdProjectImage[];
};

function organizationNode(input: {
  brandName: string;
  email: string;
  addressLocality: string;
  addressRegion?: string;
  addressCountry: string;
  sameAs?: string[];
}) {
  const sameAs = (input.sameAs ?? []).filter((href) =>
    /^https?:\/\//i.test(href),
  );

  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: input.brandName,
    url: siteOrigin(),
    logo: absoluteAssetUrl(ORGANIZATION_LOGO_PATH),
    email: input.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: input.addressLocality,
      ...(input.addressRegion
        ? { addressRegion: input.addressRegion }
        : {}),
      addressCountry: input.addressCountry,
    },
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };
}

/** Graphe home : Organization + WebSite + Person (équipe). */
export function buildHomeJsonLd(input: JsonLdHomeInput) {
  const pageUrl = absoluteUrl(homePath(input.locale));
  const people = input.team
    .filter((m) => m.name.trim().length > 0)
    .map((member) => ({
      "@type": "Person",
      name: member.name,
      ...(member.role.trim()
        ? { jobTitle: member.role }
        : {}),
      worksFor: { "@id": ORG_ID },
    }));

  return {
    "@context": "https://schema.org",
    "@graph": [
      organizationNode(input),
      {
        "@type": "WebSite",
        "@id": "#website",
        name: input.brandName,
        url: siteOrigin(),
        description: input.description,
        inLanguage: input.locale === "fr" ? "fr-FR" : "en-US",
        publisher: { "@id": ORG_ID },
        potentialAction: {
          "@type": "ReadAction",
          target: pageUrl,
        },
      },
      ...people,
    ],
  };
}

/** CreativeWork fiche projet (+ ImageObject cover / galerie). */
export function buildProjectJsonLd(input: JsonLdProjectInput) {
  const url = absoluteUrl(projectPath(input.locale, input.slug));
  const description =
    input.description.trim().length > 0
      ? input.description.trim()
      : undefined;

  const seen = new Set<string>();
  const imageNodes: Array<{
    "@type": "ImageObject";
    url: string;
    caption?: string;
    creator: { "@type": "Organization"; name: string; url: string };
  }> = [];

  for (const entry of [
    { path: input.imagePath, caption: input.title },
    ...(input.images ?? []),
  ]) {
    if (!entry.path || seen.has(entry.path)) continue;
    seen.add(entry.path);
    imageNodes.push({
      "@type": "ImageObject",
      url: absoluteAssetUrl(entry.path),
      ...(entry.caption?.trim()
        ? { caption: entry.caption.trim() }
        : {}),
      creator: {
        "@type": "Organization",
        name: input.brandName,
        url: siteOrigin(),
      },
    });
  }

  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: input.title,
    ...(description ? { description } : {}),
    url,
    inLanguage: input.locale === "fr" ? "fr-FR" : "en-US",
    image:
      imageNodes.length === 1
        ? imageNodes[0]
        : imageNodes.length > 1
          ? imageNodes
          : {
              "@type": "ImageObject",
              url: absoluteAssetUrl(input.imagePath),
            },
    creator: {
      "@type": "Organization",
      name: input.brandName,
      url: siteOrigin(),
    },
  };
}

/** Alt portrait équipe — pattern spec SEO. */
export function teamPhotoAlt(
  name: string,
  role: string,
  brandName: string,
): string {
  const base = role.trim() ? `${name}, ${role}` : name;
  return `${base} · ${brandName}`;
}
