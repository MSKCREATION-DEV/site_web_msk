import type { CSSProperties } from "react";
import { Link } from "react-router";
import { OptimizedImg } from "~/components/ui/optimized-img";
import { cn } from "~/lib/utils";

export type ProjectCardHeight = "short" | "tall";

type ProjectCardProps = {
  title: string;
  category: string;
  year: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
  seeProjectLabel: string;
  accentColor?: string;
  height?: ProjectCardHeight;
  className?: string;
};

/**
 * Carte projet — légende (titre | année + catégories + lien) puis image
 * short 400 / tall 580. Accent au survol sur titre + lien.
 */
export function ProjectCard({
  title,
  category,
  year,
  href,
  imageSrc,
  imageAlt,
  seeProjectLabel,
  accentColor,
  height = "short",
  className,
}: ProjectCardProps) {
  const style = accentColor
    ? ({ ["--msk-project-accent"]: accentColor } as CSSProperties)
    : undefined;

  return (
    <Link
      to={href}
      className={cn("group flex w-full flex-col gap-4", className)}
      style={style}
    >
      <div className="flex flex-col gap-1.5">
        <div className="flex items-start justify-between gap-4">
          <p
            className={cn(
              "min-w-0 font-sans text-xl font-semibold leading-msk-tight text-msk-text uppercase transition-colors duration-msk ease-out sm:text-2xl",
              accentColor && "group-hover:text-(--msk-project-accent)",
            )}
          >
            {title}
          </p>
          <span className="shrink-0 pt-1 font-sans text-msk-xs font-medium tracking-msk text-msk-text-subtle">
            {year}
          </span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <p className="font-sans text-msk-xs leading-none tracking-msk-wide text-msk-text-muted uppercase">
            {category}
          </p>
          <span
            className={cn(
              "shrink-0 font-sans text-xs font-medium tracking-msk-nav uppercase transition-colors duration-msk ease-out",
              "opacity-0 group-hover:opacity-100",
              accentColor
                ? "text-(--msk-project-accent)"
                : "text-msk-blue",
            )}
          >
            {seeProjectLabel}
          </span>
        </div>
      </div>

      <div
        className={cn(
          "relative w-full overflow-hidden bg-msk-placeholder",
          height === "tall"
            ? "aspect-4/5 lg:aspect-auto lg:h-msk-card-tall"
            : "aspect-3/2 lg:aspect-auto lg:h-msk-card-short",
        )}
      >
        <OptimizedImg
          src={imageSrc}
          alt={imageAlt}
          loading="lazy"
          decoding="async"
          pictureClassName="absolute inset-0 size-full"
          className="size-full object-cover transition-transform duration-msk ease-out group-hover:scale-msk-hover"
        />
      </div>
    </Link>
  );
}
