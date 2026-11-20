import { getWorksGridProjects } from "~/data";
import { homePath, projectPath, teamPath } from "~/i18n";
import { absoluteUrl } from "./origin";

export type SitemapEntry = {
  loc: string;
  /** Priorité indicative 0–1 */
  priority: string;
  /**
   * Date W3C (YYYY-MM-DD) si connue.
   * Une seule révision content indexable (pas de dates inventées par URL).
   */
  lastmod?: string;
};

/**
 * Révision content des URLs indexables.
 * Mettre à jour quand home / équipe / fiches deck changent de façon crawlable.
 * Pas de lastmod fake par URL sans source data.
 */
export const SITEMAP_CONTENT_LASTMOD = "2026-11-20";

/**
 * URLs indexables V1 — home FR/EN + équipe + deck Travaux 7 × 2 locales.
 * Passer `request` (resource route) pour la même origine que `/robots.txt`.
 */
export function buildSitemapEntries(request?: Request): SitemapEntry[] {
  const abs = (path: string) => absoluteUrl(path, request);
  const lastmod = SITEMAP_CONTENT_LASTMOD;
  const entries: SitemapEntry[] = [
    { loc: abs(homePath("fr")), priority: "1.0", lastmod },
    { loc: abs(homePath("en")), priority: "0.9", lastmod },
    { loc: abs(teamPath("fr")), priority: "0.85", lastmod },
    { loc: abs(teamPath("en")), priority: "0.8", lastmod },
  ];

  for (const project of getWorksGridProjects()) {
    entries.push(
      {
        loc: abs(projectPath("fr", project.slug)),
        priority: "0.8",
        lastmod,
      },
      {
        loc: abs(projectPath("en", project.slug)),
        priority: "0.8",
        lastmod,
      },
    );
  }

  return entries;
}

export function renderSitemapXml(entries: SitemapEntry[]): string {
  const urls = entries
    .map((e) => {
      const lastmodLine = e.lastmod
        ? `\n    <lastmod>${escapeXml(e.lastmod)}</lastmod>`
        : "";
      return `  <url>
    <loc>${escapeXml(e.loc)}</loc>${lastmodLine}
    <priority>${e.priority}</priority>
  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

export function renderRobotsTxt(sitemapUrl: string): string {
  return `User-agent: *
Allow: /

Sitemap: ${sitemapUrl}
`;
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
