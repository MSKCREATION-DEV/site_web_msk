import {
  absoluteUrl,
  renderRobotsTxt,
} from "~/lib/seo";

/** Resource route — /robots.txt */
export function loader() {
  const body = renderRobotsTxt(absoluteUrl("/sitemap.xml"));
  return new Response(body, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
