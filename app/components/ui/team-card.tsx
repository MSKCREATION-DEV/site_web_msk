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
 * Carte équipe — Figma Défaut/Survol, portrait Recadrer.
 * Format maquette ~176×331. Survol : léger scale (détail overlay PENDING MCP).
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
        "group flex w-full max-w-[176px] flex-col gap-3",
        className,
      )}
    >
      <div className="relative aspect-[176/240] overflow-hidden bg-msk-placeholder">
        <img
          src={assetUrl(photoSrc)}
          alt={photoAlt}
          className="absolute inset-0 size-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium text-msk-text">{name}</p>
        <p className="text-xs text-msk-text-muted">{role}</p>
      </div>
    </article>
  );
}
