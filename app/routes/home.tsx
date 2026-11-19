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
import { handleContactAction } from "~/server/site/contact-action.server";
import { loadHomePage } from "~/server/site/loaders/home.server";
import { buildHomeJsonLd, homeMeta, postalAddressFromContactRows } from "~/lib/seo";
import { isLocale, parseLocale } from "~/i18n";

export function loader({ params }: Route.LoaderArgs) {
  const locale = parseLocale(params.lang);
  if (!isLocale(params.lang)) {
    throw new Response("Not Found", { status: 404 });
  }
  return loadHomePage(locale);
}

export async function action({ request, params }: Route.ActionArgs) {
  if (!isLocale(params.lang)) {
    throw new Response("Not Found", { status: 404 });
  }
  const locale = parseLocale(params.lang);
  const formData = await request.formData();
  return handleContactAction(locale, formData);
}

export function meta({ loaderData }: Route.MetaArgs) {
  if (!loaderData) {
    return [{ title: "MSK Création" }];
  }

  const { locale, home, team, contact, footer } = loaderData;
  const address =
    postalAddressFromContactRows(home.contactSection.rows) ?? {
      addressLocality: "Bamako",
      addressRegion: "ACI 2000",
      addressCountry: "ML",
    };

  const jsonLd = buildHomeJsonLd({
    locale,
    brandName: home.brandName,
    description: home.meta.description,
    email: contact.email,
    addressLocality: address.addressLocality,
    addressRegion: address.addressRegion,
    addressCountry: address.addressCountry,
    team: team.map((m) => ({ name: m.name, role: m.role })),
    sameAs: footer.social.map((s) => s.href),
  });

  return homeMeta(locale, home.meta.title, home.meta.description, {
    siteName: home.brandName,
    jsonLd,
  });
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { home, nav, locale, worksProjects, team, contact, approachGallery } =
    loaderData;

  return (
    <>
      <HeroSection hero={home.hero} nav={nav} locale={locale} />

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
