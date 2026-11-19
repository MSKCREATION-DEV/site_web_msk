import type { Route } from "./+types/project";
import { ProjectSheetView } from "~/components/sections/project-sheet-view";
import { loadProjectPage } from "~/server/site/loaders/project.server";
import { buildProjectJsonLd, projectMeta } from "~/lib/seo";
import {
  isLocale,
  parseLocale,
  projectPathSegment,
} from "~/i18n";

function segmentFromRequest(request: Request): string {
  const { pathname } = new URL(request.url);
  const parts = pathname.split("/").filter(Boolean);
  return parts[1] ?? "";
}

export function loader({ params, request }: Route.LoaderArgs) {
  if (!isLocale(params.lang) || !params.slug) {
    throw new Response("Not Found", { status: 404 });
  }

  const locale = parseLocale(params.lang);
  const expected = projectPathSegment(locale);
  const actual = segmentFromRequest(request);

  if (actual !== expected) {
    throw new Response("Not Found", { status: 404 });
  }

  const page = loadProjectPage(locale, params.slug);
  if (!page) {
    throw new Response("Not Found", { status: 404 });
  }

  return page;
}

export function meta({ loaderData }: Route.MetaArgs) {
  if (!loaderData) {
    return [{ title: "MSK Création" }];
  }

  const { locale, project, copy, brandName, coverSrc, gallery } = loaderData;
  const jsonLd = buildProjectJsonLd({
    locale,
    slug: project.slug,
    brandName,
    title: copy.title,
    description: copy.description,
    imagePath: coverSrc,
    images: gallery.map((item) => ({
      path: item.src,
      caption: item.alt,
    })),
  });

  return projectMeta(
    locale,
    project.slug,
    copy.title,
    copy.description,
    brandName,
    { imagePath: coverSrc, jsonLd },
  );
}

/** Fiche projet — template Figma + Q24 Prosperity / Thòy. */
export default function ProjectPage({ loaderData }: Route.ComponentProps) {
  const {
    copy,
    counter,
    locale,
    next,
    coverSrc,
    coverAlt,
    gallery,
    beforeAfter,
    panel,
    approachAfterIndex,
  } = loaderData;

  return (
    <ProjectSheetView
      locale={locale}
      copy={copy}
      counter={counter}
      coverSrc={coverSrc}
      coverAlt={coverAlt}
      panel={panel}
      gallery={gallery}
      beforeAfter={beforeAfter}
      next={next}
      approachAfterIndex={approachAfterIndex}
    />
  );
}
