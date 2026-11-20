import { useId, useRef, useState } from "react";
import { OptimizedImg } from "~/components/ui/optimized-img";
import { cn } from "~/lib/utils";

export type TeamFlipCardLabels = {
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
  focus?: string;
  service?: string;
  email?: string;
  labels: TeamFlipCardLabels;
  className?: string;
};

/**
 * Carte membre page Équipe — flip 3D (inspiration structurelle VdM).
 * Recto : photo full-bleed + nom + rôle.
 * Verso : focus factuel, pôle, email si data.
 * A11y : hover/focus desktop, tap/clavier toggle, reduced-motion = overlay.
 */
export function TeamFlipCard({
  name,
  role,
  photoSrc,
  photoAlt,
  focus,
  service,
  email,
  labels,
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
                loading="lazy"
                decoding="async"
                pictureClassName="absolute inset-0 size-full"
                className="size-full object-cover object-top"
              />
            </div>
            <div className="msk-team-flip__scrim" aria-hidden />
            <div className="msk-team-flip__front-copy">
              <h2 className="font-sans text-xl font-semibold tracking-wide text-msk-text uppercase">
                {name}
              </h2>
              <p className="font-sans text-xs tracking-msk-wide text-msk-text-muted uppercase">
                {role}
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
              <div className="flex flex-col gap-3">
                <p className="font-sans text-[0.6875rem] tracking-msk-wide text-msk-blue uppercase">
                  {name}
                </p>
                <p className="font-sans text-lg font-semibold tracking-wide text-msk-text uppercase">
                  {role}
                </p>
                {focus ? (
                  <p className="font-sans text-sm leading-msk-body text-msk-text-secondary">
                    <span className="sr-only">{labels.focusLabel} : </span>
                    {focus}
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
