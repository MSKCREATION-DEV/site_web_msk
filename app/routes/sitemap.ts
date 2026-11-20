import type { Route } from "./+types/sitemap";
import { buildSitemapEntries, renderSitemapXml } from "~/lib/seo";

/** Resource route — /sitemap.xml */
export function loader({ request }: Route.LoaderArgs) {
  const body = renderSitemapXml(buildSitemapEntries(request));
  return new Response(body, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
