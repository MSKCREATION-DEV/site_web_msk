import { Link } from "react-router";
import { assetUrl } from "~/lib/assets";
import { cn } from "~/lib/utils";

export type ProjectCardHeight = "short" | "tall";

type ProjectCardProps = {
  title: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
  height?: ProjectCardHeight;
  className?: string;
};

/**
 * Carte projet — variantes Figma Hauteur Courte/Haute + Survol.
 * Dimensions maquette Desktop : Courte ~592×489, Haute ~592×669.
 * Overlay survol : structure minimale (titre) — détail pixels PENDING MCP.
 */
export function ProjectCard({
  title,
  href,
  imageSrc,
  imageAlt,
  height = "short",
  className,
}: ProjectCardProps) {
  return (
    <Link
      to={href}
      className={cn(
        "group relative block w-full overflow-hidden bg-msk-placeholder",
        height === "tall" ? "aspect-[592/669]" : "aspect-[592/489]",
        className,
      )}
    >
      <img
        src={assetUrl(imageSrc)}
        alt={imageAlt}
        className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
      />
      <div
        className={cn(
          "absolute inset-0 flex items-end bg-gradient-to-t from-black/70 to-transparent p-6",
          "opacity-0 transition-opacity duration-300 group-hover:opacity-100",
        )}
      >
        <p className="font-display text-lg font-semibold tracking-tight text-msk-text uppercase">
          {title}
        </p>
      </div>
    </Link>
  );
}
