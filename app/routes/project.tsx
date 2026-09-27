import type { Route } from "./+types/project";
import { ProjectSheetView } from "~/components/sections/project-sheet-view";
import { loadProjectPage } from "~/server/site/loaders/project.server";
import { projectMeta } from "~/lib/seo";
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
  return projectMeta(
    loaderData.locale,
    loaderData.project.slug,
    loaderData.copy.title,
    loaderData.copy.description,
    loaderData.brandName,
  );
}

/**
 * Fiche projet — template Figma (Phase 8).
 */
export default function ProjectPage({ loaderData }: Route.ComponentProps) {
  const {
    copy,
    counter,
    locale,
    next,
    prev,
    project,
    coverSrc,
    gallery,
    beforeAfter,
  } = loaderData;

  return (
    <ProjectSheetView
      locale={locale}
      copy={copy}
      year={project.year}
      expertises={project.expertises}
      counter={counter}
      coverSrc={coverSrc}
      coverAlt={copy.title}
      gallery={gallery}
      beforeAfter={beforeAfter}
      next={next}
      prev={prev}
    />
  );
}
