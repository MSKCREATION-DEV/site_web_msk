import { Link } from "react-router";
import { assetUrl } from "~/lib/assets";
import { cn } from "~/lib/utils";

export type WorksStackCardData = {
  slug: string;
  title: string;
  category: string;
  year: string;
  accentColor?: string;
  imageSrc: string;
  imageAlt: string;
  href: string;
};

type WorksStackCardProps = {
  project: WorksStackCardData;
  seeProjectLabel: string;
  className?: string;
  priority?: boolean;
};

function categoryTags(category: string): string[] {
  return category
    .split("·")
    .map((part) => part.trim())
    .filter(Boolean);
}

/** Carte Travaux — split image / chalk (ombre pour peeks d’empilement). */
export function WorksStackCard({
  project,
  seeProjectLabel,
  className,
  priority = false,
}: WorksStackCardProps) {
  const tags = categoryTags(project.category);

  return (
    <article
      className={cn(
        "flex size-full flex-col overflow-hidden rounded-[var(--msk-works-stack-radius)] bg-msk-chalk text-msk-ink shadow-[0_12px_32px_rgb(0_0_0/0.22)] md:flex-row",
        className,
      )}
    >
      <div className="relative min-h-0 flex-[1.15] bg-msk-card md:flex-1">
        <img
          src={assetUrl(project.imageSrc)}
          alt={project.imageAlt}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding="async"
          className="absolute inset-0 size-full object-cover"
        />
      </div>

      <div className="relative flex min-h-[40%] flex-1 flex-col items-center justify-between gap-6 bg-msk-chalk px-6 py-8 md:min-h-0 md:px-10 md:py-12">
        <p className="font-mono-msk text-xs tracking-msk-wider text-msk-ink/70 uppercase md:text-sm">
          [ {project.year} ]
        </p>

        <div className="flex w-full flex-col items-center gap-4 text-center">
          <h3 className="font-display text-3xl leading-none font-extrabold tracking-msk-tight uppercase md:text-5xl lg:text-6xl">
            {project.title}
          </h3>
          {tags.length > 0 ? (
            <ul className="flex flex-wrap items-center justify-center gap-2">
              {tags.map((tag) => (
                <li
                  key={tag}
                  className="font-mono-msk text-[0.65rem] tracking-msk-wide text-msk-ink/55 uppercase md:text-xs"
                >
                  [ {tag} ]
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <Link
          to={project.href}
          className="relative z-10 inline-flex h-11 items-center justify-center rounded-msk-pill border border-msk-ink/40 bg-transparent px-6 text-sm font-medium text-msk-ink transition-colors hover:border-msk-ink hover:bg-msk-ink hover:text-msk-text"
        >
          {seeProjectLabel}
        </Link>
      </div>
    </article>
  );
}
