import { useId, useRef, useState } from "react";
import { OptimizedImg } from "~/components/ui/optimized-img";
import { cn } from "~/lib/utils";

export type TeamFlipCardLabels = {
  presentationLabel: string;
  expertiseLabel: string;
  contributionLabel: string;
  impactLabel: string;
  focusLabel: string;
  serviceLabel: string;
  emailLabel: string;
  /** Libellé bouton : révéler le verso */
  revealLabel: string;
  /** Libellé bouton : revenir au recto */
  hideLabel: string;
};

export type TeamFlipCardProps = {
  name: string;
  role: string;
  photoSrc: string;
  photoAlt: string;
  indexLabel: string;
  presentation?: string;
  expertise?: string;
  contribution?: string;
  impact?: string;
  signature?: string;
  focus?: string;
  service?: string;
  email?: string;
  labels: TeamFlipCardLabels;
  /**
   * 1–2 portraits lead above-the-fold max : eager + fetchPriority high.
   * Les autres restent lazy (évite 10 PNG/AVIF en LCP).
   */
  priority?: boolean;
  className?: string;
};

/** Dimensions intrinsèques portraits équipe (CLS) — majorité 352×470. */
const TEAM_PHOTO_WIDTH = 352;
const TEAM_PHOTO_HEIGHT = 470;
/** Grille magazine : ~50 % du conteneur max-w-msk (1440). */
const TEAM_PHOTO_SIZES =
  "(min-width: 1024px) min(50vw, 720px), (min-width: 640px) 50vw, 100vw";

/**
 * Portrait magazine page Équipe — flip 3D.
 * Recto : photo, nom, rôle, index graphique, invitation.
 * Verso : présentation / expertise / contribution / impact / signature.
 */
export function TeamFlipCard({
  name,
  role,
  photoSrc,
  photoAlt,
  indexLabel,
  presentation,
  expertise,
  contribution,
  impact,
  signature,
  focus,
  service,
  email,
  labels,
  priority = false,
  className,
}: TeamFlipCardProps) {
  const backId = useId();
  const [flipped, setFlipped] = useState(false);
  const frontToggleRef = useRef<HTMLButtonElement>(null);
  const backPanelRef = useRef<HTMLDivElement>(null);

  const setFlip = (next: boolean) => {
    setFlipped(next);
    queueMicrotask(() => {
      if (next) {
        const target = backPanelRef.current?.querySelector<HTMLElement>(
          "a[href], button",
        );
        target?.focus();
      } else {
        frontToggleRef.current?.focus();
      }
    });
  };

  const body =
    presentation ||
    expertise ||
    contribution ||
    impact ||
    signature ||
    focus ||
    service ||
    email;

  return (
    <article
      className={cn("msk-team-flip h-full", flipped && "is-flipped", className)}
      data-flipped={flipped ? "true" : "false"}
    >
      <div className="msk-team-flip__scene">
        <div className="msk-team-flip__inner">
          <div className="msk-team-flip__face msk-team-flip__face--front">
            <div className="msk-team-flip__photo">
              <OptimizedImg
                src={photoSrc}
                alt={photoAlt}
                width={TEAM_PHOTO_WIDTH}
                height={TEAM_PHOTO_HEIGHT}
                sizes={TEAM_PHOTO_SIZES}
                loading={priority ? "eager" : "lazy"}
                fetchPriority={priority ? "high" : "auto"}
                decoding="async"
                pictureClassName="absolute inset-0 size-full"
                className="size-full object-cover object-top"
              />
            </div>
            <div className="msk-team-flip__scrim" aria-hidden />
            <span className="msk-team-flip__index" aria-hidden>
              {indexLabel}
            </span>
            <span className="msk-team-flip__mark" aria-hidden />
            <div className="msk-team-flip__front-copy">
              <h3 className="font-sans text-xl font-semibold tracking-wide text-msk-text uppercase sm:text-2xl">
                {name}
              </h3>
              <p className="font-sans text-xs tracking-msk-wide text-msk-text-muted uppercase">
                {role}
              </p>
              <p className="msk-team-flip__invite font-serif-msk text-sm italic text-msk-blue">
                {labels.revealLabel}
              </p>
            </div>
            <button
              ref={frontToggleRef}
              type="button"
              className="msk-team-flip__toggle"
              aria-expanded={flipped}
              aria-controls={backId}
              onClick={() => setFlip(!flipped)}
            >
              <span className="sr-only">
                {flipped
                  ? `${labels.hideLabel} : ${name}`
                  : `${labels.revealLabel} : ${name}`}
              </span>
            </button>
          </div>

          <div
            id={backId}
            ref={backPanelRef}
            className="msk-team-flip__face msk-team-flip__face--back"
            aria-hidden={!flipped}
          >
            <div className="msk-team-flip__back-inner">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <p className="font-sans text-[0.6875rem] tracking-msk-wide text-msk-blue uppercase">
                    {name}
                  </p>
                  <p className="font-sans text-lg font-semibold tracking-wide text-msk-text uppercase">
                    {role}
                  </p>
                </div>

                {presentation ? (
                  <PortraitBlock
                    label={labels.presentationLabel}
                    text={presentation}
                  />
                ) : focus ? (
                  <PortraitBlock label={labels.focusLabel} text={focus} />
                ) : null}

                {expertise ? (
                  <PortraitBlock
                    label={labels.expertiseLabel}
                    text={expertise}
                  />
                ) : null}

                {contribution ? (
                  <PortraitBlock
                    label={labels.contributionLabel}
                    text={contribution}
                  />
                ) : null}

                {impact ? (
                  <PortraitBlock label={labels.impactLabel} text={impact} />
                ) : null}

                {signature ? (
                  <p className="font-serif-msk text-base italic leading-relaxed text-msk-chalk">
                    {signature}
                  </p>
                ) : null}

                {service ? (
                  <p className="font-sans text-xs text-msk-text-muted">
                    <span className="tracking-msk uppercase">
                      {labels.serviceLabel}
                    </span>
                    <span className="mx-2 text-msk-text-subtle" aria-hidden>
                      ·
                    </span>
                    {service}
                  </p>
                ) : null}

                {!body ? (
                  <span className="h-px w-10 bg-msk-coral/80" aria-hidden />
                ) : null}
              </div>

              <div className="flex flex-col gap-3">
                {email ? (
                  <a
                    href={`mailto:${email}`}
                    className="font-sans text-sm text-msk-blue transition-colors hover:text-msk-blue-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-msk-blue"
                    tabIndex={flipped ? 0 : -1}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span className="sr-only">{labels.emailLabel} : </span>
                    {email}
                  </a>
                ) : (
                  <span className="h-px w-10 bg-msk-coral/80" aria-hidden />
                )}
                <button
                  type="button"
                  className="msk-nav-label w-fit text-left text-msk-text-muted transition-colors hover:text-msk-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-msk-blue"
                  onClick={() => setFlip(false)}
                  tabIndex={flipped ? 0 : -1}
                >
                  {labels.hideLabel}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function PortraitBlock({ label, text }: { label: string; text: string }) {
  return (
    <p className="font-sans text-sm leading-msk-body text-msk-text-secondary">
      <span className="mb-1 block font-sans text-[0.625rem] tracking-msk-wide text-msk-text-muted uppercase">
        {label}
      </span>
      {text}
    </p>
  );
}
