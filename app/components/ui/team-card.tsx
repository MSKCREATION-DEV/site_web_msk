import { OptimizedImg } from "~/components/ui/optimized-img";
import { cn } from "~/lib/utils";

type TeamCardProps = {
  name: string;
  role: string;
  photoSrc: string;
  photoAlt: string;
  className?: string;
};

/** Figma : prénom(s) / nom sur 2 lignes (dernier mot = nom). */
function splitDisplayName(name: string): { line1: string; line2: string } {
  const parts = name.trim().split(/\s+/);
  if (parts.length < 2) return { line1: name, line2: "" };
  return {
    line1: parts.slice(0, -1).join(" "),
    line2: parts[parts.length - 1] ?? "",
  };
}

/**
 * Carte équipe — Figma « Carte équipe » (58:46).
 * Portrait 176×235, gap 16, hover trait + nom bleu.
 */
export function TeamCard({
  name,
  role,
  photoSrc,
  photoAlt,
  className,
}: TeamCardProps) {
  const { line1, line2 } = splitDisplayName(name);

  return (
    <article
      className={cn(
        "group flex w-full max-w-msk-portrait flex-col gap-4",
        className,
      )}
    >
      <div className="relative h-msk-portrait w-full overflow-hidden bg-[#1D2B53]">
        <OptimizedImg
          src={photoSrc}
          alt={photoAlt}
          loading="lazy"
          decoding="async"
          pictureClassName="absolute inset-0 size-full"
          className="size-full object-cover object-top transition-transform duration-msk ease-out group-hover:scale-msk-portrait"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-black/18 transition-opacity duration-msk ease-out group-hover:opacity-0"
          aria-hidden
        />
      </div>

      <div className="flex min-h-20 flex-col gap-2.5 overflow-hidden">
        <span
          className="block h-px w-0 bg-msk-blue transition-all duration-msk ease-out group-hover:w-6"
          aria-hidden
        />
        <div className="flex flex-col gap-1 uppercase">
          <p className="font-sans text-msk-lg leading-[1.2] font-semibold tracking-[0.02em] text-msk-text transition-colors duration-msk ease-out group-hover:text-msk-blue">
            <span className="block">{line1}</span>
            {line2 ? <span className="block">{line2}</span> : null}
          </p>
          <p className="font-sans text-[0.6875rem] leading-[15px] tracking-[0.08em] text-white/75 transition-colors duration-msk ease-out group-hover:text-msk-blue">
            {role}
          </p>
        </div>
      </div>
    </article>
  );
}
