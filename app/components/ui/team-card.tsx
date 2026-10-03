import { assetUrl } from "~/lib/assets";
import { cn } from "~/lib/utils";

type TeamCardProps = {
  name: string;
  role: string;
  photoSrc: string;
  photoAlt: string;
  className?: string;
};

/**
 * Carte équipe — hover trait bleu + nom/rôle bleus.
 * Mobile : largeur fluide, portrait proportionnel.
 */
export function TeamCard({
  name,
  role,
  photoSrc,
  photoAlt,
  className,
}: TeamCardProps) {
  return (
    <article
      className={cn(
        "group flex w-full max-w-msk-portrait flex-col gap-3 sm:gap-4",
        className,
      )}
    >
      <div className="relative aspect-msk-portrait w-full overflow-hidden bg-msk-portrait-bg">
        <img
          src={assetUrl(photoSrc)}
          alt={photoAlt}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 size-full object-cover object-top transition-transform duration-msk ease-out group-hover:scale-msk-portrait"
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <span
          className="block h-px w-0 bg-msk-blue transition-all duration-msk ease-out group-hover:w-6"
          aria-hidden
        />
        <p className="font-sans text-sm font-semibold leading-msk-snug tracking-msk-tight text-msk-text uppercase transition-colors duration-msk ease-out group-hover:text-msk-blue sm:text-msk-lg">
          {name}
        </p>
        <p className="font-sans text-msk-xs leading-msk-xs tracking-msk-label text-msk-text-secondary uppercase transition-colors duration-msk ease-out group-hover:text-msk-blue">
          {role}
        </p>
      </div>
    </article>
  );
}
