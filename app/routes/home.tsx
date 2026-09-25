import type { Route } from "./+types/home";
import { HeroSection } from "~/components/sections";
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

export default function Home({ loaderData }: Route.ComponentProps) {
  const { home, nav } = loaderData;

  return (
    <>
      <HeroSection hero={home.hero} nav={nav} />

      <div id="travaux" className="scroll-mt-24" />
      <div id="services" className="scroll-mt-24" />
      <div id="equipe" className="scroll-mt-24" />
      <div id="approche" className="scroll-mt-24" />
      <div id="contact" className="scroll-mt-24" />
    </>
  );
}
