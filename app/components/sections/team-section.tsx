import { Reveal, TeamCard } from "~/components/ui";
import type { TeamSectionContent } from "~/content/types";
import { cn } from "~/lib/utils";

export type TeamGridItem = {
  slug: string;
  name: string;
  role: string;
  photoSrc: string;
};

type TeamSectionProps = {
  content: TeamSectionContent;
  members: TeamGridItem[];
  className?: string;
};

/**
 * Équipe — py 96 / px 112, grille 5×2, gap 48×40, portraits 176×235.
 */
export function TeamSection({
  content,
  members,
  className,
}: TeamSectionProps) {
  return (
    <section
      id="equipe"
      className={cn("scroll-mt-24 bg-msk-black", className)}
      aria-labelledby="equipe-heading"
    >
      <div className="msk-page-x mx-auto w-full max-w-msk py-24">
        <Reveal>
          <div className="mb-20 grid grid-cols-1 items-end gap-10 lg:grid-cols-msk-split lg:gap-0">
            <div>
              <p className="msk-eyebrow mb-6 text-msk-text-muted">{content.eyebrow}</p>
              <h2
                id="equipe-heading"
                className="flex flex-col text-msk-text"
              >
                <span className="msk-section-title">{content.titleBefore}</span>
                <span className="msk-section-accent text-msk-blue normal-case">
                  {content.titleAccent}
                </span>
                <span className="msk-section-title">{content.titleAfter}</span>
              </h2>
            </div>
            <div className="hidden lg:block" aria-hidden />
            <p className="msk-body-sm self-end text-msk-text-secondary">
              {content.intro}
            </p>
          </div>
        </Reveal>

        <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-8 sm:gap-y-10 lg:grid-cols-5 lg:gap-x-12">
          {members.map((member, i) => (
            <li key={member.slug} className="min-w-0">
              <Reveal delayMs={(i % 5) * 50}>
                <TeamCard
                  name={member.name}
                  role={member.role}
                  photoSrc={member.photoSrc}
                  photoAlt={member.name}
                  className="mx-auto max-w-none"
                />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
