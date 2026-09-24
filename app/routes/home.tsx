import type { Route } from "./+types/home";
import { Link } from "react-router";
import { loadHomePage } from "~/server/site/loaders/home.server";
import { homeMeta } from "~/lib/seo";
import { alternateHomePath, isLocale, parseLocale } from "~/i18n";

export function loader({ params }: Route.LoaderArgs) {
  const locale = parseLocale(params.lang);
  if (!isLocale(params.lang)) {
    throw new Response("Not Found", { status: 404 });
  }
  return loadHomePage(locale);
}

export function meta({ loaderData }: Route.MetaArgs) {
  if (!loaderData) {
    return [{ title: "MSK Création" }];
  }
  return homeMeta(
    loaderData.locale,
    loaderData.home.meta.title,
    loaderData.home.meta.description,
  );
}

/**
 * Placeholder home — UI Figma Phase 6–7.
 * Vérifie loaders + i18n + switch de langue.
 */
export default function Home({ loaderData }: Route.ComponentProps) {
  const { home, locale, worksCount } = loaderData;
  const otherLocale = locale === "fr" ? "en" : "fr";

  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-6 px-6">
      <p className="font-mono-msk text-[10px] tracking-[2px] text-msk-text-muted uppercase">
        Phase 3 — {locale.toUpperCase()}
      </p>
      <h1 className="font-display text-center text-4xl font-extrabold tracking-tight uppercase md:text-5xl">
        {home.brandName}
      </h1>
      <p className="max-w-md text-center text-sm leading-relaxed text-msk-text-muted">
        {home.bootstrapNote}
      </p>
      <p className="font-mono-msk text-[10px] text-msk-text-subtle tracking-[1px]">
        Works grid: {worksCount} (PENDING Q01)
      </p>
      <div className="h-px w-12 bg-msk-blue" aria-hidden />
      <Link
        to={alternateHomePath(locale)}
        className="text-sm text-msk-blue underline-offset-4 hover:underline"
      >
        {otherLocale === "en" ? "English" : "Français"}
      </Link>
    </main>
  );
}
