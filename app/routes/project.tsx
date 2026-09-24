import type { Route } from "./+types/project";
import { Link } from "react-router";
import { loadProjectPage } from "~/server/site/loaders/project.server";
import { projectMeta } from "~/lib/seo";
import {
  homePath,
  isLocale,
  parseLocale,
  projectPathSegment,
} from "~/i18n";

function segmentFromRequest(request: Request): string {
  const { pathname } = new URL(request.url);
  const parts = pathname.split("/").filter(Boolean);
  // /:lang/:segment/:slug
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
  );
}

/**
 * Shell fiche projet — UI Figma Phase 8.
 * Accessible dès qu’un projet `inWorksGrid` + copy locale existent.
 */
export default function ProjectPage({ loaderData }: Route.ComponentProps) {
  const { copy, counter, locale, next, project } = loaderData;

  return (
    <main className="mx-auto flex min-h-dvh max-w-3xl flex-col gap-8 px-6 py-16">
      <div className="flex items-center justify-between text-sm text-msk-text-muted">
        <Link to={homePath(locale)} className="hover:text-msk-text">
          ← {copy.closeLabel}
        </Link>
        <span className="font-mono-msk text-msk-text-subtle">
          {String(counter.current).padStart(2, "0")} /{" "}
          {String(counter.total).padStart(2, "0")}
        </span>
      </div>

      <header className="flex flex-col items-center gap-4 text-center">
        <p className="text-[10px] tracking-[3px] text-msk-text-muted uppercase">
          {project.year}
        </p>
        <h1 className="font-display text-4xl font-extrabold tracking-tight uppercase">
          {copy.title}
        </h1>
        <p className="text-sm leading-relaxed text-msk-text-secondary">
          {copy.description}
        </p>
      </header>

      <div className="h-px w-12 self-center bg-msk-blue" aria-hidden />

      {next ? (
        <Link
          to={next.href}
          className="self-end text-right text-sm text-msk-text hover:text-msk-blue"
        >
          <span className="block text-[10px] tracking-[2px] uppercase">
            {copy.nextLabel} →
          </span>
          <span className="font-display text-lg font-semibold uppercase">
            {next.title}
          </span>
        </Link>
      ) : null}

      <Link
        to={`${homePath(locale)}#travaux`}
        className="text-center text-[11px] tracking-[2.75px] text-msk-text uppercase"
      >
        ↑ {copy.backToWorksLabel}
      </Link>
    </main>
  );
}
