import { Link } from "react-router";
import type { Route } from "./+types/team";
import { OptimizedImg, Reveal } from "~/components/ui";
import { homePath, isLocale, parseLocale } from "~/i18n";
import { buildTeamJsonLd, teamMeta } from "~/lib/seo";
import { loadTeamPage } from "~/server/site/loaders/team.server";

export function loader({ params, request }: Route.LoaderArgs) {
  if (!isLocale(params.lang)) {
    throw new Response("Not Found", { status: 404 });
  }
  const locale = parseLocale(params.lang);
  const segment = new URL(request.url).pathname.split("/").filter(Boolean)[1];
  const expected = locale === "en" ? "team" : "equipe";
  if (segment !== expected) {
    throw new Response("Not Found", { status: 404 });
  }

  return loadTeamPage(locale);
}

export function meta({ loaderData }: Route.MetaArgs) {
  if (!loaderData) {
    return [{ title: "MSK Création" }];
  }

  const { locale, teamPage, brandName, team, contact, footer, postalAddress } =
    loaderData;

  const jsonLd = buildTeamJsonLd({
    locale,
    brandName,
    description: teamPage.meta.description,
    pageTitle: teamPage.meta.title,
    pageDescription: teamPage.meta.description,
    email: contact.email,
    addressLocality: postalAddress.addressLocality,
    addressRegion: postalAddress.addressRegion,
    addressCountry: postalAddress.addressCountry,
    team: team.map((m) => ({ name: m.name, role: m.role })),
    sameAs: footer.social.map((s) => s.href),
  });

  return teamMeta(locale, teamPage.meta.title, teamPage.meta.description, {
    siteName: brandName,
    jsonLd,
  });
}

export default function TeamPage({ loaderData }: Route.ComponentProps) {
  const { teamPage, team, locale } = loaderData;

  return (
    <div className="min-h-svh bg-msk-ink">
      <section
        className="msk-page-x scroll-mt-msk-nav mx-auto w-full max-w-msk py-msk-x"
        aria-labelledby="team-page-heading"
      >
        <Reveal>
          <div className="mb-16 flex max-w-3xl flex-col gap-6">
            <p className="msk-eyebrow text-msk-text-muted">{teamPage.eyebrow}</p>
            <h1
              id="team-page-heading"
              className="font-sans text-4xl font-semibold tracking-tight text-msk-text sm:text-5xl lg:text-6xl"
            >
              {teamPage.title}
            </h1>
            <p className="msk-body-sm max-w-xl text-msk-text-secondary">
              {teamPage.intro}
            </p>
            <Link
              to={homePath(locale)}
              className="msk-nav-label w-fit text-msk-blue transition-colors hover:text-msk-blue-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-msk-blue focus-visible:ring-offset-2 focus-visible:ring-offset-msk-ink"
            >
              ← {teamPage.backHomeLabel}
            </Link>
          </div>
        </Reveal>

        <ul className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((member, index) => (
            <li key={member.slug}>
              <Reveal delayMs={(index % 6) * 40}>
                <article className="group flex h-full flex-col gap-5 border-b border-msk-border pb-8">
                  <div className="relative aspect-3/4 w-full overflow-hidden bg-[#1D2B53]">
                    <OptimizedImg
                      src={member.photoSrc}
                      alt={member.photoAlt}
                      loading="lazy"
                      decoding="async"
                      pictureClassName="absolute inset-0 size-full"
                      className="size-full object-cover object-top transition-transform duration-msk ease-out group-hover:scale-msk-portrait"
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    <div>
                      <h2 className="font-sans text-xl font-semibold tracking-wide text-msk-text uppercase transition-colors group-hover:text-msk-blue">
                        {member.name}
                      </h2>
                      <p className="mt-1 font-sans text-xs tracking-msk-wide text-msk-text-muted uppercase">
                        {member.role}
                      </p>
                    </div>
                    {member.focus ? (
                      <p className="font-sans text-sm leading-msk-body text-msk-text-secondary">
                        <span className="sr-only">{teamPage.focusLabel} : </span>
                        {member.focus}
                      </p>
                    ) : null}
                    {member.service ? (
                      <p className="font-sans text-xs text-msk-text-muted">
                        <span className="tracking-msk uppercase">
                          {teamPage.serviceLabel}
                        </span>
                        <span className="mx-2 text-msk-text-subtle" aria-hidden>
                          ·
                        </span>
                        {member.service}
                      </p>
                    ) : null}
                    {member.email ? (
                      <a
                        href={`mailto:${member.email}`}
                        className="font-sans text-sm text-msk-blue transition-colors hover:text-msk-blue-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-msk-blue"
                      >
                        <span className="sr-only">{teamPage.emailLabel} : </span>
                        {member.email}
                      </a>
                    ) : null}
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
