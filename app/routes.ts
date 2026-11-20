import type { RouteConfig } from "@react-router/dev/routes";
import { index, route } from "@react-router/dev/routes";

/**
 * / → /fr
 * /:lang → home
 * /fr/travaux/:slug | /en/projects/:slug → fiche projet
 *
 * Page `/equipe` / `/team` archivée sur branche `archive/equipe-page`.
 */
export default [
  index("routes/_index.tsx"),
  route("robots.txt", "routes/robots.ts"),
  route("sitemap.xml", "routes/sitemap.ts"),
  route(":lang", "routes/locale-layout.tsx", [
    index("routes/home.tsx"),
    route("travaux/:slug", "routes/project.tsx", {
      id: "project-travaux",
    }),
    route("projects/:slug", "routes/project.tsx", {
      id: "project-projects",
    }),
  ]),
] satisfies RouteConfig;
