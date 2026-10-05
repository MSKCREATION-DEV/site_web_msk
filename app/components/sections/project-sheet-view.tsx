import { useEffect, type CSSProperties } from "react";
import { Link, useNavigate } from "react-router";
import { MskLogo, Reveal } from "~/components/ui";
import type { GallerySlot, ProjectPanelStyle } from "~/data/projects";
import { assetUrl } from "~/lib/assets";
import { homePath } from "~/i18n";

type ProjectSheetCopy = {
  title: string;
  description: string;
  category: string;
  eyebrow?: string;
  sheetTags?: string;
  galleryNote?: string;
  nextProjectBracketLabel: string;
  beforeAfterEyebrow?: string;
  beforeAfterSubtitle?: string;
  closeLabel: string;
  backToWorksLabel: string;
};

type ProjectSheetNavItem = {
  href: string;
  title: string;
  panel?: ProjectPanelStyle;
};

type GalleryItem = {
  src: string;
  alt: string;
  slot: GallerySlot;
};

type ProjectSheetViewProps = {
  locale: "fr" | "en";
  copy: ProjectSheetCopy;
  counter: { current: number; total: number };
  coverSrc: string;
  coverAlt: string;
  panel: ProjectPanelStyle;
  gallery: GalleryItem[];
  beforeAfter?: {
    beforeSrc: string;
    afterSrc: string;
    beforeLabel: string;
    afterLabel: string;
  } | null;
  next: ProjectSheetNavItem | null;
};

type GalleryRow =
  | { kind: "full"; item: GalleryItem }
  | { kind: "pair"; left: GalleryItem; right: GalleryItem };

function buildGalleryRows(items: GalleryItem[]): GalleryRow[] {
  const rows: GalleryRow[] = [];
  let i = 0;
  while (i < items.length) {
    const item = items[i];
    if (item.slot === "half" && items[i + 1]?.slot === "half") {
      rows.push({ kind: "pair", left: item, right: items[i + 1] });
      i += 2;
      continue;
    }
    rows.push({ kind: "full", item });
    i += 1;
  }
  return rows;
}

function titlePaint(panel: ProjectPanelStyle): CSSProperties {
  if (panel.titleGradient) {
    return {
      backgroundImage: panel.titleGradient,
      WebkitBackgroundClip: "text",
      backgroundClip: "text",
      color: "transparent",
    };
  }
  return { color: panel.titleColor };
}

/**
 * Fiche projet — template Figma :
 * Barre fixe → Ouverture · deux moitiés → Intro → (Avant/Après) → Galerie → Projet suivant → Retour
 */
export function ProjectSheetView({
  locale,
  copy,
  coverSrc,
  coverAlt,
  panel,
  gallery,
  beforeAfter,
  next,
  counter,
}: ProjectSheetViewProps) {
  const navigate = useNavigate();
  const homeHref = homePath(locale);
  const worksHref = `${homeHref}#travaux`;
  const hasDescription = Boolean(copy.description?.trim());
  const metadata = copy.sheetTags ?? copy.category;
  const galleryRows = buildGalleryRows(gallery);
  const hasIntro =
    Boolean(copy.eyebrow) || hasDescription || Boolean(copy.galleryNote) || Boolean(metadata);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") navigate(worksHref);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [navigate, worksHref]);

  return (
    <div className="min-h-dvh bg-msk-ink text-msk-text">
      {/*
        Barre + ouverture en colonne : la barre reste dans le flux
        (plus de sticky qui mange le haut de l’image / du titre).
        Figma : barre 84 + ouverture 768.
      */}
      <div className="flex min-h-dvh flex-col">
        <header className="sticky top-0 z-20 flex h-[5.25rem] shrink-0 items-center justify-between border-b border-white/[0.08] bg-msk-ink px-4 py-5 md:px-8">
          <Link
            to={worksHref}
            className="inline-flex items-center gap-3 text-white/78 transition-colors hover:text-white"
          >
            <span className="font-sans text-xl leading-none font-normal" aria-hidden>
              ←
            </span>
            <span className="font-sans text-[0.6875rem] leading-none font-normal tracking-[0.2em] uppercase">
              {copy.closeLabel}
            </span>
          </Link>

          <Link
            to={homeHref}
            aria-label="MSK Création"
            className="absolute left-1/2 -translate-x-1/2"
          >
            <MskLogo variant="fiche" />
          </Link>

          <span className="font-mono-msk text-xs leading-none font-medium text-white/45">
            {String(counter.current).padStart(2, "0")} /{" "}
            {String(counter.total).padStart(2, "0")}
          </span>
        </header>

        {/* Ouverture · deux moitiés — sous la barre, hauteur restante (max 768) */}
        <section className="grid min-h-0 flex-1 grid-cols-1 md:grid-cols-2 md:min-h-[min(48rem,calc(100svh-5.25rem))]">
          <div
            className="flex min-h-[50svh] flex-col items-center justify-center gap-5 px-6 py-16 text-center md:min-h-0 md:px-10"
            style={{ background: panel.background }}
          >
            {copy.eyebrow ? (
              <p
                className="font-mono-msk text-base font-medium tracking-[0.06em]"
                style={{ color: panel.yearColor }}
              >
                {copy.eyebrow}
              </p>
            ) : null}
            <h1
              className="max-w-[40rem] font-display text-[clamp(3rem,6.5vw,6rem)] leading-none font-extrabold tracking-[-0.01em] uppercase"
              style={titlePaint(panel)}
            >
              {copy.title}
            </h1>
          </div>

          <div className="relative min-h-[50svh] bg-msk-placeholder md:min-h-0">
            <img
              src={assetUrl(coverSrc)}
              alt={coverAlt}
              fetchPriority="high"
              decoding="sync"
              className="absolute inset-0 size-full object-cover object-center"
            />
          </div>
        </section>
      </div>

      {/* Intro — padding 120 / 112 / 80 / 112, gap 28, body 790 */}
      {hasIntro ? (
        <section className="px-[var(--msk-page-px)] pt-[max(4.5rem,calc(120*var(--msk-u)))] pb-[max(3rem,calc(80*var(--msk-u)))]">
          <Reveal>
            <div className="mx-auto flex w-full max-w-[790px] flex-col gap-7">
              {copy.eyebrow ? (
                <p className="font-mono-msk text-base font-medium tracking-[0.06em] text-msk-blue-hover">
                  {copy.eyebrow}
                </p>
              ) : null}
              {hasDescription ? (
                <p className="font-sans text-[clamp(1.25rem,2vw,1.75rem)] leading-[1.4] font-light text-white">
                  {copy.description}
                </p>
              ) : null}
              {/* Prosperity : paragraphe éditorial dans le bloc intro (hauteur Figma 491) */}
              {copy.galleryNote ? (
                <p className="font-sans text-[clamp(1.25rem,2vw,1.75rem)] leading-[1.4] font-light text-white">
                  {copy.galleryNote}
                </p>
              ) : null}
              {metadata ? (
                <p className="font-mono-msk text-xs font-medium tracking-[0.12em] text-msk-gray uppercase">
                  {metadata}
                </p>
              ) : null}
            </div>
          </Reveal>
        </section>
      ) : null}

      {/* Avant / Après — Koundji uniquement */}
      {beforeAfter ? (
        <section className="w-full bg-msk-ink" aria-labelledby="before-after-heading">
          <Reveal>
            <div className="flex flex-col items-center gap-4 px-6 pt-24 pb-12 text-center">
              <p
                id="before-after-heading"
                className="font-mono-msk text-base font-medium tracking-[0.06em] text-msk-blue"
              >
                {copy.beforeAfterEyebrow}
              </p>
              {copy.beforeAfterSubtitle ? (
                <p className="max-w-xl font-sans text-base leading-relaxed text-white/60">
                  {copy.beforeAfterSubtitle}
                </p>
              ) : null}
            </div>
          </Reveal>
          <div className="grid grid-cols-1 gap-px md:grid-cols-2">
            <figure className="relative flex aspect-[719.5/540] items-center justify-center bg-[#1D2B53]">
              <img
                src={assetUrl(beforeAfter.beforeSrc)}
                alt=""
                loading="lazy"
                decoding="async"
                className="max-h-[72%] max-w-[72%] object-contain"
              />
              <figcaption className="absolute top-6 left-6 font-mono-msk text-xs tracking-[0.12em] text-white/60 uppercase">
                {beforeAfter.beforeLabel}
              </figcaption>
            </figure>
            <figure className="relative flex aspect-[719.5/540] items-center justify-center bg-[#1D2B53]">
              <img
                src={assetUrl(beforeAfter.afterSrc)}
                alt=""
                loading="lazy"
                decoding="async"
                className="max-h-[72%] max-w-[72%] object-cover"
              />
              <figcaption className="absolute top-6 left-6 font-mono-msk text-xs tracking-[0.12em] text-white/60 uppercase">
                {beforeAfter.afterLabel}
              </figcaption>
            </figure>
          </div>
        </section>
      ) : null}

      {/* Galerie — col 1216, gap 20, radius 10, paires 598 */}
      {galleryRows.length > 0 ? (
        <section
          className="flex w-full flex-col gap-5 px-[var(--msk-page-px)] pt-6 pb-[max(4rem,calc(120*var(--msk-u)))]"
          aria-label="Galerie"
        >
          {galleryRows.map((row, index) => (
            <Reveal key={`gallery-row-${index}`} delayMs={Math.min(index * 40, 160)}>
              {row.kind === "full" ? (
                <div className="w-full overflow-hidden rounded-[10px] bg-msk-placeholder">
                  <img
                    src={assetUrl(row.item.src)}
                    alt={row.item.alt}
                    loading="lazy"
                    decoding="async"
                    className="block h-auto w-full object-cover"
                  />
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  {[row.left, row.right].map((item) => (
                    <div
                      key={item.src}
                      className="relative aspect-[598/640] w-full overflow-hidden rounded-[10px] bg-msk-placeholder"
                    >
                      <img
                        src={assetUrl(item.src)}
                        alt={item.alt}
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 size-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </Reveal>
          ))}
        </section>
      ) : null}

      {/* Projet suivant — 1440×325, padding 100, couleurs du projet cible */}
      {next ? (
        <nav aria-label="Projet suivant">
          <Link
            to={next.href}
            className="flex min-h-[20.3125rem] flex-col items-center justify-center gap-4 px-6 py-[6.25rem] text-center transition-opacity hover:opacity-90"
            style={{
              background: next.panel?.background ?? panel.background,
            }}
          >
            <span
              className="font-mono-msk text-base font-medium tracking-[0.06em]"
              style={{ color: next.panel?.yearColor ?? panel.yearColor }}
            >
              [ {copy.nextProjectBracketLabel} ]
            </span>
            <span
              className="font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-none font-extrabold tracking-[-0.01em] uppercase"
              style={titlePaint(next.panel ?? panel)}
            >
              {next.title}
            </span>
          </Link>
        </nav>
      ) : null}

      {/* ↑ Retour aux travaux — footer 91, border #FFFFFF14 */}
      <div className="flex justify-center border-t border-white/[0.08] px-6 py-10">
        <Link
          to={worksHref}
          className="font-sans text-[0.6875rem] leading-none font-normal tracking-[0.25em] text-white uppercase transition-opacity hover:opacity-80"
        >
          ↑ {copy.backToWorksLabel}
        </Link>
      </div>
    </div>
  );
}
