import { Link, redirect } from "react-router";
import type { Route } from "./+types/team";
import { Reveal } from "~/components/ui/reveal";
import { TeamFlipCard } from "~/components/ui/team-flip-card";
import { homePath, isLocale, parseLocale, teamPath } from "~/i18n";
import { securityHeaders } from "~/lib/security/headers";
import { buildTeamJsonLd, teamMeta } from "~/lib/seo";
import { cn } from "~/lib/utils";
import { loadTeamPage } from "~/server/site/loaders/team.server";

/**
 * Pathname app (sans trailing slash).
 * Utiliser `url` (LoaderArgs) — déjà sans suffixe `.data` / params RR —
 * et non `request.url` brut (sinon nav CSR `/fr/equipe.data` → redirect
 * vers `/fr/equipe` en boucle = barre progress infinie).
 */
function normalizedPathname(url: URL): string {
  const raw = url.pathname;
  if (raw.length > 1 && raw.endsWith("/")) return raw.slice(0, -1);
  return raw;
}

/**
 * HTML quasi-statique (content + data in-memory). CDN edge cache.
 * Pas de Runtime Cache `@vercel/functions` getCache : le loader n’a pas d’I/O
 * externe ; un cache régionnel ajouterait une dep + hop pour un gain nul.
 * Hobby : Runtime Cache / tag purge peuvent être limités — préférer s-maxage.
 */
export function headers(_: Route.HeadersArgs) {
  return {
    ...securityHeaders(),
    "Cache-Control": "public, s-maxage=300, stale-while-revalidate=86400",
  };
}

export function loader({ params, url }: Route.LoaderArgs) {
  if (!isLocale(params.lang)) {
    throw new Response("Not Found", { status: 404 });
  }

  const locale = parseLocale(params.lang);
  const pathname = normalizedPathname(url);
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
  const contactHref = `${homePath(locale)}#contact`;

  const flipLabels = {
    presentationLabel: teamPage.presentationLabel,
    expertiseLabel: teamPage.expertiseLabel,
    contributionLabel: teamPage.contributionLabel,
    impactLabel: teamPage.impactLabel,
    focusLabel: teamPage.focusLabel,
    serviceLabel: teamPage.serviceLabel,
    emailLabel: teamPage.emailLabel,
    revealLabel: teamPage.flipRevealLabel,
    hideLabel: teamPage.flipHideLabel,
  };

  return (
    <div className="min-h-svh bg-msk-ink">
      {/* Intro */}
      <section
        className="msk-page-x scroll-mt-msk-nav mx-auto w-full max-w-msk pt-[max(6rem,calc(var(--spacing-msk-nav)+2.5rem))] pb-16 sm:pb-20"
        aria-labelledby="team-page-heading"
      >
        <Reveal immediate>
          <div className="flex max-w-4xl flex-col gap-8">
            <Link
              to={homePath(locale)}
              className="msk-nav-label w-fit text-msk-blue transition-colors hover:text-msk-blue-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-msk-blue focus-visible:ring-offset-2 focus-visible:ring-offset-msk-ink"
            >
              ← {teamPage.backHomeLabel}
            </Link>
            <p className="msk-eyebrow text-msk-text-muted">{teamPage.eyebrow}</p>
            <h1
              id="team-page-heading"
              className="flex flex-col gap-2 text-msk-text"
            >
              <span className="font-display text-[clamp(2.25rem,6vw,4.5rem)] leading-[1.05] font-extrabold tracking-tight">
                {teamPage.titleBefore}
              </span>
              <span className="font-serif-msk text-[clamp(2rem,5.5vw,3.75rem)] leading-[1.1] italic text-msk-blue">
                {teamPage.titleAccent}
              </span>
            </h1>
            <p className="msk-body-sm max-w-xl text-msk-text-secondary">
              {teamPage.intro}
            </p>
          </div>
        </Reveal>
      </section>

      {/* Collectif */}
      <section
        className="border-y border-msk-border bg-msk-ink-deep"
        aria-labelledby="team-collectif-heading"
      >
        <div className="msk-page-x mx-auto flex w-full max-w-msk flex-col gap-8 py-16 sm:flex-row sm:items-end sm:justify-between sm:gap-16 sm:py-20">
          <Reveal immediate className="max-w-xl">
            <p className="msk-eyebrow mb-4 text-msk-text-muted">
              {teamPage.collectif.eyebrow}
            </p>
            <h2
              id="team-collectif-heading"
              className="font-display text-[clamp(1.75rem,3.5vw,2.75rem)] leading-tight font-extrabold tracking-tight text-msk-text"
            >
              {teamPage.collectif.title}
            </h2>
          </Reveal>
          <Reveal immediate className="max-w-md">
            <p className="msk-body-sm text-msk-text-secondary">
              {teamPage.collectif.body}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Galerie éditoriale */}
      <section
        className="msk-page-x mx-auto w-full max-w-msk py-16 sm:py-24"
        aria-labelledby="team-gallery-heading"
      >
        <Reveal>
          <div className="mb-12 flex max-w-2xl flex-col gap-4 sm:mb-16">
            <p className="msk-eyebrow text-msk-text-muted">
              {teamPage.gallery.eyebrow}
            </p>
            <h2
              id="team-gallery-heading"
              className="font-display text-[clamp(1.75rem,3.5vw,2.75rem)] leading-tight font-extrabold tracking-tight text-msk-text"
            >
              {teamPage.gallery.title}
            </h2>
            <p className="font-serif-msk text-base italic text-msk-text-muted">
              {teamPage.gallery.inviteHint}
            </p>
          </div>
        </Reveal>

        <ul className="msk-team-gallery">
          {team.map((member, index) => (
            <li
              key={member.slug}
              className={cn(
                "min-h-0",
                member.layout === "lead" && "msk-team-gallery__item--lead",
                member.layout === "feature" &&
                  "msk-team-gallery__item--feature",
                member.layout === "standard" &&
                  "msk-team-gallery__item--standard",
              )}
            >
              <Reveal delayMs={(index % 5) * 50} className="h-full">
                <TeamFlipCard
                  name={member.name}
                  role={member.role}
                  photoSrc={member.photoSrc}
                  photoAlt={member.photoAlt}
                  indexLabel={member.indexLabel}
                  presentation={member.presentation}
                  expertise={member.expertise}
                  contribution={member.contribution}
                  impact={member.impact}
                  signature={member.signature}
                  focus={member.focus}
                  service={member.service}
                  email={member.email}
                  labels={flipLabels}
                  priority={index < 2}
                />
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      {/* Complémentarité */}
      <section
        className="border-t border-msk-border bg-msk-ink-contact"
        aria-labelledby="team-poles-heading"
      >
        <div className="msk-page-x mx-auto w-full max-w-msk py-16 sm:py-24">
          <Reveal>
            <div className="mb-12 max-w-2xl sm:mb-16">
              <p className="msk-eyebrow mb-4 text-msk-text-muted">
                {teamPage.poles.eyebrow}
              </p>
              <h2
                id="team-poles-heading"
                className="font-display text-[clamp(1.75rem,3.5vw,2.75rem)] leading-tight font-extrabold tracking-tight text-msk-text"
              >
                {teamPage.poles.title}
              </h2>
            </div>
          </Reveal>

          <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
            {teamPage.poles.items.map((pole, i) => (
              <li key={pole.label}>
                <Reveal delayMs={i * 60}>
                  <article className="flex flex-col gap-3 border-t border-msk-blue/40 pt-5">
                    <span
                      className="font-display text-xs font-extrabold tracking-msk-wide text-msk-coral"
                      aria-hidden
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-sans text-lg font-semibold tracking-wide text-msk-text">
                      {pole.label}
                    </h3>
                    <p className="msk-body-sm text-msk-text-secondary">
                      {pole.description}
                    </p>
                  </article>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Conclusion */}
      <section
        className="msk-page-x mx-auto w-full max-w-msk py-20 sm:py-28"
        aria-labelledby="team-closing-heading"
      >
        <Reveal>
          <div className="mx-auto flex max-w-3xl flex-col items-start gap-8 text-left sm:items-center sm:text-center">
            <h2
              id="team-closing-heading"
              className="font-display text-[clamp(1.85rem,4vw,3.25rem)] leading-tight font-extrabold tracking-tight text-msk-text"
            >
              {teamPage.closing.title}
            </h2>
            <p className="msk-body-sm max-w-xl text-msk-text-secondary">
              {teamPage.closing.body}
            </p>
            <Link
              to={contactHref}
              className="inline-flex items-center justify-center rounded-full bg-msk-blue px-8 py-3.5 font-sans text-sm font-medium tracking-wide text-white transition-colors hover:bg-msk-blue-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-msk-blue focus-visible:ring-offset-2 focus-visible:ring-offset-msk-ink"
            >
              {teamPage.closing.ctaLabel}
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
