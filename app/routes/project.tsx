import type { Route } from "./+types/project";
import { CloseLink, NextProjectLink, BackToWorksLink, AccentRule } from "~/components/ui";
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
 */
export default function ProjectPage({ loaderData }: Route.ComponentProps) {
  const { copy, counter, locale, next, project } = loaderData;

  return (
    <div className="mx-auto flex min-h-dvh max-w-3xl flex-col gap-8 px-6 py-16">
      <div className="flex items-center justify-between text-sm text-msk-text-muted">
        <CloseLink to={homePath(locale)} label={copy.closeLabel} />
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
        <AccentRule />
        <p className="text-sm leading-relaxed text-msk-text-secondary">
          {copy.description}
        </p>
      </header>

      {next ? (
        <NextProjectLink
          to={next.href}
          nextLabel={copy.nextLabel}
          title={next.title}
        />
      ) : null}

      <BackToWorksLink
        to={`${homePath(locale)}#travaux`}
        label={copy.backToWorksLabel}
      />
    </div>
  );
}
