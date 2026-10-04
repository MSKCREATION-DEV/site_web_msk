import { useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react";
import { MskLogo, Reveal } from "~/components/ui";
import { assetUrl } from "~/lib/assets";
import { homePath } from "~/i18n";
import { cn } from "~/lib/utils";

type ProjectSheetCopy = {
  title: string;
  description: string;
  category: string;
  expertiseLabel: string;
  realizationsLabel: string;
  approachLabel: string;
  nextProjectBracketLabel: string;
  prevProjectBracketLabel: string;
  worksNavLabel: string;
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

function PillLink({
  to,
  children,
  className,
}: {
  to: string;
  children: string;
  className?: string;
}) {
  return (
    <Link
      to={to}
      className={cn(
        "inline-flex h-9 items-center justify-center rounded-msk-pill border border-msk-ink/25 bg-msk-chalk px-4 font-sans text-xs tracking-msk-wide text-msk-ink uppercase transition-colors hover:border-msk-ink hover:bg-msk-ink hover:text-msk-text",
        className,
      )}
    >
      {children}
    </Link>
  );
}

/**
 * Fiche projet — case study split (inspiré Dagobert, chrome MSK).
 */
export function ProjectSheetView({
  locale,
  copy,
  year,
  expertises,
  coverSrc,
  coverAlt,
  gallery,
  beforeAfter,
  next,
  prev,
  counter,
}: ProjectSheetViewProps) {
  const navigate = useNavigate();
  const homeHref = homePath(locale);
  const worksHref = `${homeHref}#travaux`;
  const hasDescription = Boolean(copy.description?.trim());
  const clientTag =
    expertises[0] ??
    copy.category
      .split("·")
      .map((part) => part.trim())
      .filter(Boolean)[0] ??
    year;

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
    <div className="min-h-dvh bg-msk-chalk text-msk-ink">
      <header className="sticky top-0 z-40 grid grid-cols-[1fr_auto_1fr] items-center gap-3 border-b border-msk-ink/5 bg-msk-chalk/95 px-4 py-3 backdrop-blur-sm md:px-8 md:py-4">
        <div className="justify-self-start">
          <Link
            to={worksHref}
            className="inline-flex items-center gap-2 font-sans text-xs tracking-msk-wide text-msk-ink/70 uppercase transition-colors hover:text-msk-ink"
          >
            <ArrowLeft className="size-4" aria-hidden strokeWidth={1.5} />
            {copy.closeLabel}
          </Link>
        </div>
        <Link
          to={homeHref}
          aria-label="MSK Création"
          className="justify-self-center"
        >
          <MskLogo variant="fiche" className="brightness-0" />
        </Link>
        <div className="flex items-center justify-end gap-3 justify-self-end">
          <span className="hidden font-mono-msk text-[0.65rem] tracking-msk-wider text-msk-ink/45 uppercase sm:inline">
            [ {String(counter.current).padStart(2, "0")} /{" "}
            {String(counter.total).padStart(2, "0")} ]
          </span>
          <PillLink to={worksHref}>{copy.worksNavLabel}</PillLink>
        </div>
      </header>

      <section className="grid min-h-[calc(100svh-4.5rem)] grid-cols-1 md:grid-cols-2">
        <div className="flex flex-col items-center justify-center gap-8 bg-msk-chalk px-6 py-16 text-center md:order-1 md:px-12 md:py-20">
          <p className="font-mono-msk text-xs tracking-msk-wider uppercase opacity-70">
            [ {clientTag} ]
          </p>
          <h1 className="max-w-xl font-display text-4xl leading-[1.05] font-extrabold tracking-msk-tight text-balance uppercase md:text-5xl lg:text-6xl">
            {copy.title}
          </h1>
          <p className="font-mono-msk text-xs tracking-msk-wider text-msk-ink/45 uppercase">
            [ {year} ]
          </p>
        </div>

        <div className="relative min-h-[50svh] bg-msk-placeholder md:order-2 md:min-h-full">
          <img
            src={assetUrl(coverSrc)}
            alt={coverAlt}
            fetchPriority="high"
            decoding="sync"
            className="absolute inset-0 size-full object-cover"
          />
        </div>
      </section>

      {(expertises.length > 0 || hasDescription) && (
        <section className="mx-auto flex w-full max-w-2xl flex-col gap-20 px-6 py-20 md:px-8 md:py-28">
          {expertises.length > 0 ? (
            <Reveal>
              <div className="flex flex-col gap-8 text-center">
                <h2 className="font-mono-msk text-xs tracking-msk-wider uppercase opacity-70">
                  [ {copy.realizationsLabel} ]
                </h2>
                <ul className="flex flex-col gap-3">
                  {expertises.map((item) => (
                    <li
                      key={item}
                      className="font-sans text-lg text-msk-ink md:text-xl"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ) : null}

          {hasDescription ? (
            <Reveal delayMs={80}>
              <div className="flex flex-col gap-8 text-center">
                <h2 className="font-mono-msk text-xs tracking-msk-wider uppercase opacity-70">
                  [ {copy.approachLabel} ]
                </h2>
                <p className="font-sans text-base leading-relaxed text-msk-ink/85 md:text-lg md:leading-msk-loose">
                  {copy.description}
                </p>
              </div>
            </Reveal>
          ) : null}
        </section>
      )}

      {beforeAfter ? (
        <section
          className="w-full bg-msk-ink py-20 text-msk-text md:py-24"
          aria-labelledby="before-after-heading"
        >
          <Reveal>
            <div className="mx-auto flex max-w-msk flex-col items-center px-6 text-center md:px-8">
              <p
                id="before-after-heading"
                className="font-mono-msk text-xs tracking-msk-wider text-msk-text-muted uppercase"
              >
                [ {copy.beforeAfterEyebrow} ]
              </p>
              {copy.beforeAfterSubtitle ? (
                <p className="mt-4 max-w-md font-sans text-sm text-msk-text-muted">
                  {copy.beforeAfterSubtitle}
                </p>
              ) : null}
            </div>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2">
            <figure className="relative aspect-msk-ba bg-msk-placeholder">
              <img
                src={assetUrl(beforeAfter.beforeSrc)}
                alt=""
                loading="lazy"
                decoding="async"
                className="absolute inset-0 size-full object-contain p-8 md:p-10"
              />
              <figcaption className="absolute top-6 left-6 font-mono-msk text-xs tracking-msk-wide text-msk-text-muted uppercase">
                [ {beforeAfter.beforeLabel} ]
              </figcaption>
            </figure>
            <figure className="relative aspect-msk-ba bg-msk-placeholder">
              <img
                src={assetUrl(beforeAfter.afterSrc)}
                alt=""
                loading="lazy"
                decoding="async"
                className="absolute inset-0 size-full object-cover p-8 md:p-10"
              />
              <figcaption className="absolute top-6 left-6 font-mono-msk text-xs tracking-msk-wide text-msk-text-muted uppercase">
                [ {beforeAfter.afterLabel} ]
              </figcaption>
            </figure>
          </div>
        </section>
      ) : null}

      {gallery.length > 0 ? (
        <section
          className="flex w-full flex-col gap-3 bg-msk-ink px-3 py-3 md:gap-4 md:px-4 md:py-4"
          aria-label="Galerie"
        >
          {gallery.map((image, index) => (
            <Reveal key={image.src} delayMs={Math.min(index * 40, 160)}>
              <div className="relative aspect-msk-gallery w-full overflow-hidden rounded-2xl bg-msk-placeholder">
                <img
                  src={assetUrl(image.src)}
                  alt={image.alt}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 size-full object-cover"
                />
              </div>
            </Reveal>
          ))}
        </section>
      ) : null}

      <nav
        aria-label="Navigation projets"
        className="grid grid-cols-1 border-t border-msk-ink/10 bg-msk-chalk md:grid-cols-2"
      >
        {prev ? (
          <Link
            to={prev.href}
            className="flex flex-col items-start gap-2 border-b border-msk-ink/10 px-6 py-12 text-left transition-colors hover:bg-black/3 md:border-r md:border-b-0 md:px-10"
          >
            <span className="font-mono-msk text-xs tracking-msk-wider text-msk-ink/55 uppercase">
              [ {copy.prevProjectBracketLabel} ]
            </span>
            <span className="font-display text-xl font-extrabold tracking-msk-tight uppercase md:text-2xl">
              {prev.title}
            </span>
            {prev.subtitle ? (
              <span className="font-sans text-sm text-msk-ink/50">
                {prev.subtitle}
              </span>
            ) : null}
          </Link>
        ) : (
          <div className="hidden md:block" />
        )}

        {next ? (
          <Link
            to={next.href}
            className="flex flex-col items-end gap-2 px-6 py-12 text-right transition-colors hover:bg-black/3 md:px-10"
          >
            <span className="font-mono-msk text-xs tracking-msk-wider text-msk-ink/55 uppercase">
              [ {copy.nextProjectBracketLabel} ]
            </span>
            <span className="font-display text-xl font-extrabold tracking-msk-tight uppercase md:text-2xl">
              {next.title}
            </span>
            {next.subtitle ? (
              <span className="font-sans text-sm text-msk-ink/50">
                {next.subtitle}
              </span>
            ) : null}
          </Link>
        ) : (
          <div className="hidden md:block" />
        )}
      </nav>

      <div className="flex justify-center bg-msk-chalk px-6 py-10 md:px-8">
        <PillLink to={worksHref}>{copy.backToWorksLabel}</PillLink>
      </div>
    </div>
  );
}
