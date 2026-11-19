import { Reveal, TeamCard } from "~/components/ui";
import type { TeamSectionContent } from "~/content/types";
import { cn } from "~/lib/utils";

export type TeamGridItem = {
  slug: string;
  name: string;
  role: string;
  photoSrc: string;
  /** Pattern SEO : `{name}, {role} · {brand}` */
  photoAlt: string;
};

type TeamSectionProps = {
  content: TeamSectionContent;
  members: TeamGridItem[];
  className?: string;
};

/** Figma 2:19 — rangée 1 = 5, rangée 2 = reste. */
function splitRows(members: TeamGridItem[]) {
  const row1 = members.slice(0, 5);
  const row2 = members.slice(5);
  return [row1, row2].filter((row) => row.length > 0);
}

/**
 * Équipe — Figma `05 · Équipe` (2:19).
 * En-tête : titre gauche + intro 320px droite (items-end / justify-between).
 * Grille : 5 + reste, gap 32 / 40, portraits 176×235.
 */
export function TeamSection({
  content,
  members,
  className,
}: TeamSectionProps) {
  const rows = splitRows(members);

  return (
    <section
      id="equipe"
      className={cn("scroll-mt-msk-nav bg-msk-ink", className)}
      aria-labelledby="equipe-heading"
    >
      <div className="msk-page-x mx-auto flex w-full max-w-msk flex-col gap-20 py-24">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-10 overflow-hidden lg:flex-row lg:items-end">
            <div className="flex flex-col gap-4">
              <p className="msk-eyebrow text-msk-text-muted">{content.eyebrow}</p>
              <h2
                id="equipe-heading"
                className="flex flex-col items-start text-msk-text"
              >
                <span className="msk-section-title">{content.titleBefore}</span>
                <span className="msk-section-accent text-msk-blue">
                  {content.titleAccent}
                </span>
                <span className="msk-section-title">{content.titleAfter}</span>
              </h2>
            </div>

            <p className="msk-body-sm max-w-[20rem] text-left text-msk-text lg:shrink-0 lg:text-right">
              {content.intro}
            </p>
          </div>
        </Reveal>

        <div className="flex w-full flex-col gap-10">
          {rows.map((row, rowIndex) => (
            <ul
              key={`team-row-${rowIndex}`}
              className="flex flex-wrap items-start justify-center gap-x-8 gap-y-10"
            >
              {row.map((member, i) => (
                <li
                  key={member.slug}
                  className="w-[min(100%,var(--max-width-msk-portrait))] shrink-0"
                >
                  <Reveal delayMs={(i % 6) * 40}>
                    <TeamCard
                      name={member.name}
                      role={member.role}
                      photoSrc={member.photoSrc}
                      photoAlt={member.photoAlt}
                    />
                  </Reveal>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
