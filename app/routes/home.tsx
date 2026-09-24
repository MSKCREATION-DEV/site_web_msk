import type { Route } from "./+types/home";
import { AccentRule } from "~/components/ui";
import { loadHomePage } from "~/server/site/loaders/home.server";
import { homeMeta } from "~/lib/seo";
import { isLocale, parseLocale } from "~/i18n";

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
 * Home shell — sections Figma Phase 7+.
 * id="hero" pour Retour en haut / CTAs.
 */
export default function Home({ loaderData }: Route.ComponentProps) {
  const { home, worksCount } = loaderData;

  return (
    <div id="hero" className="flex min-h-[70dvh] flex-col items-center justify-center gap-6 px-6 py-24">
      <p className="font-mono-msk text-[10px] tracking-[2px] text-msk-text-muted uppercase">
        Phase 6 — Layout
      </p>
      <h1 className="font-display text-center text-4xl font-extrabold tracking-tight uppercase md:text-5xl">
        {home.brandName}
      </h1>
      <p className="max-w-md text-center text-sm leading-relaxed text-msk-text-muted">
        {home.bootstrapNote}
      </p>
      <p className="font-mono-msk text-[10px] tracking-[1px] text-msk-text-subtle">
        Works grid: {worksCount} (PENDING Q01)
      </p>
      <AccentRule />
      {/* Ancres sections — contenu Phase 7 */}
      <div id="travaux" className="sr-only" />
      <div id="services" className="sr-only" />
      <div id="equipe" className="sr-only" />
      <div id="approche" className="sr-only" />
      <div id="contact" className="sr-only" />
    </div>
  );
}
