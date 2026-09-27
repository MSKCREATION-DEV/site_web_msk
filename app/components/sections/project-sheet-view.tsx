import { useEffect } from "react";
import { useNavigate } from "react-router";
import {
  AccentRule,
  BackToWorksLink,
  CloseLink,
  MskLogo,
  NextProjectLink,
} from "~/components/ui";
import { assetUrl } from "~/lib/assets";
import { homePath } from "~/i18n";

type ProjectSheetCopy = {
  title: string;
  description: string;
  expertiseLabel: string;
  beforeAfterEyebrow?: string;
  beforeAfterSubtitle?: string;
  closeLabel: string;
  nextLabel: string;
  prevLabel: string;
  backToWorksLabel: string;
};

type ProjectSheetNavItem = {
  href: string;
  title: string;
  subtitle?: string;
};

type ProjectSheetViewProps = {
  locale: "fr" | "en";
  copy: ProjectSheetCopy;
  year: string;
  expertises: string[];
  counter: { current: number; total: number };
  coverSrc: string;
  coverAlt: string;
  gallery: Array<{ src: string; alt: string }>;
  beforeAfter?: {
    beforeSrc: string;
    afterSrc: string;
    beforeLabel: string;
    afterLabel: string;
  } | null;
  next: ProjectSheetNavItem | null;
  prev: ProjectSheetNavItem | null;
};

/**
 * Fiche projet — typo audit KOUNDJI (2026-09-25).
 * Compteur V1 = taille grille Travaux (pas 01/10 designer).
 */
export function ProjectSheetView({
  locale,
  copy,
  year,
  expertises,
  counter,
  coverSrc,
  coverAlt,
  gallery,
  beforeAfter,
  next,
  prev,
}: ProjectSheetViewProps) {
  const navigate = useNavigate();
  const worksHref = `${homePath(locale)}#travaux`;

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        navigate(worksHref);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [navigate, worksHref]);

  return (
    <div className="min-h-dvh bg-msk-black text-msk-text">
      <header className="sticky top-0 z-40 flex h-msk-sheet-nav items-center justify-between border-b border-msk-border bg-msk-black/95 px-8 backdrop-blur-sm">
        <CloseLink to={worksHref} label={copy.closeLabel} />
        <MskLogo variant="fiche" />
        <span className="font-sans text-xs font-medium text-msk-text-subtle">
          {String(counter.current).padStart(2, "0")} /{" "}
          {String(counter.total).padStart(2, "0")}
        </span>
      </header>

      <div className="relative aspect-msk-hero-cover w-full bg-msk-placeholder">
        <img
          src={assetUrl(coverSrc)}
          alt={coverAlt}
          fetchPriority="high"
          decoding="sync"
          className="absolute inset-0 size-full object-cover"
        />
      </div>

      <section className="mx-auto flex w-full max-w-msk flex-col items-center px-8 py-20 text-center">
        <p className="font-sans text-msk-2xs leading-none tracking-msk-widest text-msk-text-muted uppercase">
          {year}
        </p>
        <h1 className="msk-sheet-title mt-6">{copy.title}</h1>
        <p className="mt-8 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 uppercase">
          <span className="font-sans text-msk-2xs font-medium tracking-msk-wider text-msk-text-muted">
            {copy.expertiseLabel}
          </span>
          {expertises.map((tag, index) => (
            <span key={tag} className="inline-flex items-center gap-3">
              {index > 0 ? (
                <span className="text-msk-text-subtle" aria-hidden>
                  ·
                </span>
              ) : null}
              <span className="font-sans text-msk-xs tracking-msk text-msk-text">
                {tag}
              </span>
            </span>
          ))}
        </p>
        <AccentRule className="mt-10" />
        {copy.description ? (
          <p className="mt-10 max-w-msk-desc font-sans text-lg leading-msk-loose text-msk-text">
            {copy.description}
          </p>
        ) : null}
      </section>

      {beforeAfter ? (
        <section className="w-full bg-msk-page py-24" aria-labelledby="before-after-heading">
          <div className="mx-auto flex max-w-msk flex-col items-center px-8 text-center">
            <p
              id="before-after-heading"
              className="font-sans text-msk-2xs font-medium tracking-msk-wider text-msk-text-muted"
            >
              {copy.beforeAfterEyebrow}
            </p>
            <AccentRule className="mt-4" />
            {copy.beforeAfterSubtitle ? (
              <p className="mt-4 max-w-md font-sans text-sm text-msk-text-muted">
                {copy.beforeAfterSubtitle}
              </p>
            ) : null}
          </div>
          <div className="mt-12 grid grid-cols-2">
            <figure className="relative aspect-msk-ba bg-msk-placeholder">
              <img
                src={assetUrl(beforeAfter.beforeSrc)}
                alt=""
                loading="lazy"
                decoding="async"
                className="absolute inset-0 size-full object-contain p-10"
              />
              <figcaption className="absolute top-6 left-6 font-sans text-msk-2xs font-medium tracking-msk-wide text-msk-text-muted">
                {beforeAfter.beforeLabel}
              </figcaption>
            </figure>
            <figure className="relative aspect-msk-ba bg-msk-placeholder">
              <img
                src={assetUrl(beforeAfter.afterSrc)}
                alt=""
                loading="lazy"
                decoding="async"
                className="absolute inset-0 size-full object-cover p-10"
              />
              <figcaption className="absolute top-6 left-6 font-sans text-msk-2xs font-medium tracking-msk-wide text-msk-text-muted">
                {beforeAfter.afterLabel}
              </figcaption>
            </figure>
          </div>
        </section>
      ) : null}

      {gallery.length > 0 ? (
        <section className="flex w-full flex-col" aria-label="Galerie">
          {gallery.map((image) => (
            <div
              key={image.src}
              className="relative aspect-msk-gallery w-full bg-msk-placeholder"
            >
              <img
                src={assetUrl(image.src)}
                alt={image.alt}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 size-full object-cover"
              />
            </div>
          ))}
        </section>
      ) : null}

      <nav
        aria-label="Navigation projets"
        className="grid grid-cols-2 border-y border-msk-border"
      >
        {prev ? (
          <NextProjectLink
            to={prev.href}
            nextLabel={copy.prevLabel}
            title={prev.title}
            subtitle={prev.subtitle}
            align="start"
          />
        ) : (
          <div />
        )}
        {next ? (
          <NextProjectLink
            to={next.href}
            nextLabel={copy.nextLabel}
            title={next.title}
            subtitle={next.subtitle}
          />
        ) : (
          <div />
        )}
      </nav>

      <BackToWorksLink to={worksHref} label={copy.backToWorksLabel} />
    </div>
  );
}
