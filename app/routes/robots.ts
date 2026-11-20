import type { Route } from "./+types/robots";
import { absoluteUrl, renderRobotsTxt } from "~/lib/seo";

/** Resource route — /robots.txt */
export function loader({ request }: Route.LoaderArgs) {
  const body = renderRobotsTxt(absoluteUrl("/sitemap.xml", request));
  return new Response(body, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
