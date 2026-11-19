import { useEffect, type CSSProperties } from "react";
import { Link, useNavigate } from "react-router";
import { MskLogo, OptimizedImg, Reveal } from "~/components/ui";
import type { GallerySlot, ProjectPanelStyle } from "~/data/projects";
import { homePath } from "~/i18n";

type ProjectSheetCopy = {
  title: string;
  description: string;
  category: string;
  eyebrow?: string;
  sheetTags?: string;
  galleryNote?: string;
  realizations?: string[];
  approach?: string;
  realizationsLabel?: string;
  approachLabel?: string;
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
  width?: number;
  height?: number;
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
    beforeAlt: string;
    afterAlt: string;
  } | null;
  next: ProjectSheetNavItem | null;
  /** Index galerie après lequel intercaler `[ APPROCHE ]` (défaut 0). */
  approachAfterIndex?: number;
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

function bracketLabel(raw: string | undefined, fallback: string): string {
  const base = (raw ?? fallback).trim();
  if (base.startsWith("[") && base.endsWith("]")) return base;
  return `[ ${base} ]`;
}

/**
 * Fiche projet — template Figma :
 * Barre → Ouverture · Intro (RÉALISATIONS) → (Avant/Après) → Galerie + APPROCHE → Suivant
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
  approachAfterIndex = 0,
}: ProjectSheetViewProps) {
  const navigate = useNavigate();
  const homeHref = homePath(locale);
  const worksHref = `${homeHref}#travaux`;
  const hasDescription = Boolean(copy.description?.trim());
  const realizations = copy.realizations?.filter((item) => item.trim()) ?? [];
  const hasRealizations = realizations.length > 0;
  const approachText = (copy.approach ?? copy.galleryNote)?.trim() ?? "";
  const hasApproach = approachText.length > 0;
  const metadata =
    !hasRealizations && (copy.sheetTags ?? copy.category)
      ? (copy.sheetTags ?? copy.category)
      : null;
  const galleryRows = buildGalleryRows(gallery);
  const hasIntro =
    hasRealizations ||
    hasDescription ||
    Boolean(metadata) ||
    (!hasApproach && Boolean(copy.galleryNote));

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") navigate(worksHref);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [navigate, worksHref]);

  type GalleryBlock =
    | { kind: "image"; row: GalleryRow; key: string }
    | { kind: "approach"; key: string };

  const galleryBlocks: GalleryBlock[] = [];
  let fullImageOrdinal = -1;
  for (let index = 0; index < galleryRows.length; index += 1) {
    const row = galleryRows[index];
    galleryBlocks.push({ kind: "image", row, key: `gallery-row-${index}` });
    if (row.kind === "full") {
      fullImageOrdinal += 1;
      if (hasApproach && fullImageOrdinal === approachAfterIndex) {
        galleryBlocks.push({
          kind: "approach",
          key: `gallery-approach-${index}`,
        });
      }
    }
  }

  return (
    <div className="min-h-dvh bg-msk-ink text-msk-text">
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
            <OptimizedImg
              src={coverSrc}
              alt={coverAlt}
              fetchPriority="high"
              decoding="sync"
              pictureClassName="absolute inset-0 size-full"
              className="size-full object-cover object-center"
            />
          </div>
        </section>
      </div>

      {hasIntro ? (
        <section className="msk-page-x mx-auto w-full max-w-msk pt-[max(4.5rem,calc(120*var(--msk-u)))] pb-[max(3rem,calc(80*var(--msk-u)))]">
          <Reveal>
            {hasRealizations ? (
              /* Figma 244:631 / 618:1298 : gutter 112, prose 790, justify-between */
              <div className="flex w-full flex-col gap-10 md:flex-row md:items-start md:justify-between md:gap-8">
                <div className="flex shrink-0 flex-col gap-5">
                  <p className="font-mono-msk text-base font-medium tracking-[0.06em] text-msk-blue-hover">
                    {bracketLabel(copy.realizationsLabel, "RÉALISATIONS")}
                  </p>
                  <ul className="flex flex-col gap-3">
                    {realizations.map((item) => (
                      <li
                        key={item}
                        className="font-sans text-base leading-relaxed font-light text-white/85"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                {hasDescription ? (
                  <p className="w-full font-sans text-[clamp(1.25rem,2vw,1.75rem)] leading-[1.4] font-light text-white md:w-[calc(790*var(--msk-u))] md:shrink-0">
                    {copy.description}
                  </p>
                ) : null}
              </div>
            ) : (
              <div className="flex w-full max-w-[calc(790*var(--msk-u))] flex-col gap-7">
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
                {!hasApproach && copy.galleryNote ? (
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
            )}
          </Reveal>
        </section>
      ) : null}

      {beforeAfter ? (
        <section className="w-full bg-msk-ink" aria-labelledby="before-after-heading">
          <Reveal>
            <div className="msk-page-x mx-auto flex w-full max-w-msk flex-col items-center gap-4 pt-24 pb-10 text-center">
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
          <div className="msk-page-x mx-auto grid w-full max-w-msk grid-cols-1 gap-5 pb-6 md:grid-cols-2">
            <figure className="relative flex aspect-[719.5/540] items-center justify-center overflow-hidden rounded-[10px] bg-white">
              <OptimizedImg
                src={beforeAfter.beforeSrc}
                alt={beforeAfter.beforeAlt}
                width={1040}
                height={780}
                loading="lazy"
                decoding="async"
                className="max-h-[78%] max-w-[78%] object-contain"
              />
              <figcaption className="absolute top-5 left-5 font-mono-msk text-xs tracking-[0.12em] text-msk-ink/55 uppercase">
                {beforeAfter.beforeLabel}
              </figcaption>
            </figure>
            <figure className="relative flex aspect-[719.5/540] items-center justify-center overflow-hidden rounded-[10px] bg-[#1D2B53]">
              <OptimizedImg
                src={beforeAfter.afterSrc}
                alt={beforeAfter.afterAlt}
                width={1040}
                height={780}
                loading="lazy"
                decoding="async"
                className="max-h-[78%] max-w-[78%] object-contain"
              />
              <figcaption className="absolute top-5 left-5 font-mono-msk text-xs tracking-[0.12em] text-white/70 uppercase">
                {beforeAfter.afterLabel}
              </figcaption>
            </figure>
          </div>
        </section>
      ) : null}

      {galleryBlocks.length > 0 ? (
        <section
          className="msk-page-x mx-auto flex w-full max-w-msk flex-col gap-5 pt-6 pb-[max(4rem,calc(120*var(--msk-u)))]"
          aria-label="Galerie"
        >
          {galleryBlocks.map((block, index) => (
            <Reveal key={block.key} delayMs={Math.min(index * 40, 160)}>
              {block.kind === "approach" ? (
                <div className="flex w-full flex-col gap-5 py-6 md:py-10">
                  <p className="font-mono-msk text-base font-medium tracking-[0.06em] text-msk-blue-hover">
                    {bracketLabel(copy.approachLabel, "APPROCHE")}
                  </p>
                  <p className="max-w-[calc(790*var(--msk-u))] font-sans text-[clamp(1.25rem,2vw,1.75rem)] leading-[1.4] font-light text-white">
                    {approachText}
                  </p>
                </div>
              ) : block.row.kind === "full" ? (
                <div className="w-full overflow-hidden rounded-[10px] bg-msk-placeholder">
                  <OptimizedImg
                    src={block.row.item.src}
                    alt={block.row.item.alt}
                    width={block.row.item.width}
                    height={block.row.item.height}
                    loading="lazy"
                    decoding="async"
                    className="block h-auto w-full object-cover"
                  />
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  {[block.row.left, block.row.right].map((item) => (
                    <div
                      key={item.src}
                      className="relative aspect-[598/640] w-full overflow-hidden rounded-[10px] bg-msk-placeholder"
                    >
                      <OptimizedImg
                        src={item.src}
                        alt={item.alt}
                        width={item.width}
                        height={item.height}
                        loading="lazy"
                        decoding="async"
                        pictureClassName="absolute inset-0 size-full"
                        className="size-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </Reveal>
          ))}
        </section>
      ) : null}

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
