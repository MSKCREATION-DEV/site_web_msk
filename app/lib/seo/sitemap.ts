import { getWorksGridProjects } from "~/data";
import { homePath, projectPath, teamPath } from "~/i18n";
import { absoluteUrl } from "./origin";

export type SitemapEntry = {
  loc: string;
  /** Priorité indicative 0–1 */
  priority: string;
};

/** URLs indexables V1 — home FR/EN + équipe + deck Travaux 7 × 2 locales. */
export function buildSitemapEntries(): SitemapEntry[] {
  const entries: SitemapEntry[] = [
    { loc: absoluteUrl(homePath("fr")), priority: "1.0" },
    { loc: absoluteUrl(homePath("en")), priority: "0.9" },
    { loc: absoluteUrl(teamPath("fr")), priority: "0.85" },
    { loc: absoluteUrl(teamPath("en")), priority: "0.8" },
  ];

  for (const project of getWorksGridProjects()) {
    entries.push(
      {
        loc: absoluteUrl(projectPath("fr", project.slug)),
        priority: "0.8",
      },
      {
        loc: absoluteUrl(projectPath("en", project.slug)),
        priority: "0.8",
      },
    );
  }

  return entries;
}

export function renderSitemapXml(entries: SitemapEntry[]): string {
  const urls = entries
    .map(
      (e) => `  <url>
    <loc>${escapeXml(e.loc)}</loc>
    <priority>${e.priority}</priority>
  </url>`,
    )
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
