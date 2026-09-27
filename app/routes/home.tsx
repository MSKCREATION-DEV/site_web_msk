import type { Route } from "./+types/home";
import { SectionGap } from "~/components/layout/section-gap";
import {
  ApproachSection,
  ContactSection,
  HeroSection,
  ProjectCtaSection,
  ServicesSection,
  TeamSection,
  WorksSection,
} from "~/components/sections";
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
  const { home, nav, locale, worksProjects, team, contact, approachGallery } =
    loaderData;

  return (
    <>
      <HeroSection hero={home.hero} nav={nav} locale={locale} />

      <SectionGap />
      <WorksSection
        locale={locale}
        content={home.works}
        projects={worksProjects}
      />

      <SectionGap />
      <ProjectCtaSection content={home.cta} />

      <SectionGap />
      <ServicesSection content={home.services} />

      <SectionGap />
      <TeamSection content={home.teamSection} members={team} />

      <SectionGap />
      <ApproachSection
        content={home.approach}
        gallery={approachGallery}
        valuesTicker={home.contactSection.valuesTicker}
      />

      <SectionGap />
      <ContactSection content={home.contactSection} contact={contact} />
    </>
  );
}
