import { useId, useRef, useState } from "react";
import { OptimizedImg } from "~/components/ui/optimized-img";
import type { TeamTier } from "~/data/team";
import { cn } from "~/lib/utils";

export type TeamFlipCardLabels = {
  presentationLabel: string;
  expertiseLabel: string;
  contributionLabel: string;
  impactLabel: string;
  focusLabel: string;
  serviceLabel: string;
  emailLabel: string;
  /** Libellé : révéler le portrait */
  revealLabel: string;
  /** Libellé : revenir à la photo */
  hideLabel: string;
};

export type TeamFlipCardProps = {
  name: string;
  role: string;
  photoSrc: string;
  photoAlt: string;
  indexLabel: string;
  /** Niveau éditorial (ERP) → variante visuelle. */
  tier: TeamTier;
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

const TEAM_PHOTO_SIZES_BY_TIER: Record<TeamTier, string> = {
  founder:
    "(min-width: 1024px) min(50vw, 720px), (min-width: 640px) 50vw, 100vw",
  cadre:
    "(min-width: 1024px) min(33vw, 480px), (min-width: 640px) 50vw, 100vw",
  collaborator:
    "(min-width: 1024px) min(33vw, 480px), (min-width: 640px) 50vw, 100vw",
};

/**
 * Plaque éditoriale page Équipe (remplace l’ancienne flip card overlay).
 * Photo pleine chroma + légende sous le portrait + panneau Encre au reveal.
 * Variantes `tier` : founder / cadre / collaborator.
 */
export function TeamFlipCard({
  name,
  role,
  photoSrc,
  photoAlt,
  indexLabel,
  tier,
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
  const panelId = useId();
  const [open, setOpen] = useState(false);
  const frontToggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const setOpenState = (next: boolean) => {
    setOpen(next);
    queueMicrotask(() => {
      if (next) {
        const target = panelRef.current?.querySelector<HTMLElement>(
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
      className={cn(
        "msk-team-plate h-full",
        `msk-team-plate--${tier}`,
        open && "is-open",
        className,
      )}
      data-open={open ? "true" : "false"}
      data-tier={tier}
    >
      <div className="msk-team-plate__media">
        <OptimizedImg
          src={photoSrc}
          alt={photoAlt}
          width={TEAM_PHOTO_WIDTH}
          height={TEAM_PHOTO_HEIGHT}
          sizes={TEAM_PHOTO_SIZES_BY_TIER[tier]}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding="async"
          pictureClassName="msk-team-plate__picture"
          className="msk-team-plate__img"
        />

        <div
          id={panelId}
          ref={panelRef}
          className="msk-team-plate__panel"
          aria-hidden={!open}
        >
          <div className="msk-team-plate__panel-inner">
            <div className="msk-team-plate__panel-copy">
              <p className="msk-team-plate__panel-name">{name}</p>
              <p className="msk-team-plate__panel-role">{role}</p>

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
                <p className="msk-team-plate__signature">{signature}</p>
              ) : null}

              {service ? (
                <p className="msk-team-plate__service">
                  <span className="msk-team-plate__service-label">
                    {labels.serviceLabel}
                  </span>
                  <span className="msk-team-plate__service-sep" aria-hidden>
                    ·
                  </span>
                  {service}
                </p>
              ) : null}

              {!body ? (
                <span className="msk-team-plate__rule" aria-hidden />
              ) : null}
            </div>

            <div className="msk-team-plate__panel-actions">
              {email ? (
                <a
                  href={`mailto:${email}`}
                  className="msk-team-plate__email"
                  tabIndex={open ? 0 : -1}
                  onClick={(e) => e.stopPropagation()}
                >
                  <span className="sr-only">{labels.emailLabel} : </span>
                  {email}
                </a>
              ) : (
                <span className="msk-team-plate__rule" aria-hidden />
              )}
              <button
                type="button"
                className="msk-team-plate__close"
                onClick={() => setOpenState(false)}
                tabIndex={open ? 0 : -1}
              >
                {labels.hideLabel}
              </button>
            </div>
          </div>
        </div>

        <button
          ref={frontToggleRef}
          type="button"
          className="msk-team-plate__toggle"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpenState(!open)}
        >
          <span className="sr-only">
            {open
              ? `${labels.hideLabel} : ${name}`
              : `${labels.revealLabel} : ${name}`}
          </span>
        </button>
      </div>

      <div className="msk-team-plate__caption">
        <div className="msk-team-plate__caption-top">
          <span className="msk-team-plate__index" aria-hidden>
            {indexLabel}
          </span>
          <span className="msk-team-plate__accent" aria-hidden />
        </div>
        <h3 className="msk-team-plate__name">{name}</h3>
        <p className="msk-team-plate__role">{role}</p>
        <p className="msk-team-plate__invite" aria-hidden="true">
          {labels.revealLabel}
        </p>
      </div>
    </article>
  );
}

function PortraitBlock({ label, text }: { label: string; text: string }) {
  return (
    <p className="msk-team-plate__block">
      <span className="msk-team-plate__block-label">{label}</span>
      {text}
    </p>
  );
}
