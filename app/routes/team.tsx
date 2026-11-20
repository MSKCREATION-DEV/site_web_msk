import { Link, redirect } from "react-router";
import type { Route } from "./+types/team";
import { Reveal, TeamFlipCard } from "~/components/ui";
import { homePath, isLocale, parseLocale, teamPath } from "~/i18n";
import { buildTeamJsonLd, teamMeta } from "~/lib/seo";
import { loadTeamPage } from "~/server/site/loaders/team.server";

/** Normalise le pathname (trailing slash) pour comparer au canonical locale. */
function normalizedPathname(request: Request): string {
  const raw = new URL(request.url).pathname;
  if (raw.length > 1 && raw.endsWith("/")) return raw.slice(0, -1);
  return raw;
}

export function loader({ params, request }: Route.LoaderArgs) {
  if (!isLocale(params.lang)) {
    throw new Response("Not Found", { status: 404 });
  }

  const locale = parseLocale(params.lang);
  const pathname = normalizedPathname(request);
  const expected = teamPath(locale);

  /**
   * Les routes `equipe` et `team` partagent ce module (ids team-fr / team-en).
   * `/fr/team` ou `/en/equipe` matchent le mauvais segment : redirect canonical
   * plutôt que 404 brandée (évite la confusion Preview / liens croisés).
   */
  if (pathname !== expected) {
    throw redirect(expected);
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

  const flipLabels = {
    focusLabel: teamPage.focusLabel,
    serviceLabel: teamPage.serviceLabel,
    emailLabel: teamPage.emailLabel,
    revealLabel: teamPage.flipRevealLabel,
    hideLabel: teamPage.flipHideLabel,
  };

  return (
    <div className="min-h-svh bg-msk-ink">
      <section
        className="msk-page-x scroll-mt-msk-nav mx-auto w-full max-w-msk pt-[max(6rem,calc(var(--spacing-msk-nav)+2rem))] pb-msk-x"
        aria-labelledby="team-page-heading"
      >
        <Reveal>
          <div className="mb-14 flex max-w-3xl flex-col gap-6 sm:mb-16">
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

        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7 lg:grid-cols-3 lg:gap-8">
          {team.map((member, index) => (
            <li key={member.slug} className="min-h-0">
              <Reveal delayMs={(index % 6) * 40} className="h-full">
                <TeamFlipCard
                  name={member.name}
                  role={member.role}
                  photoSrc={member.photoSrc}
                  photoAlt={member.photoAlt}
                  focus={member.focus}
                  service={member.service}
                  email={member.email}
                  labels={flipLabels}
                />
              </Reveal>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
