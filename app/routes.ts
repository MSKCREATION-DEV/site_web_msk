import type { RouteConfig } from "@react-router/dev/routes";
import { index, route } from "@react-router/dev/routes";

/**
 * / → /fr
 * /:lang → home
 * /fr/travaux/:slug | /en/projects/:slug → fiche projet
 */
export default [
  index("routes/_index.tsx"),
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
