import { Reveal } from "~/components/ui";
import type { ServicesContent } from "~/content/types";
import { cn } from "~/lib/utils";

type ServicesSectionProps = {
  content: ServicesContent;
  className?: string;
};

/** Services — Charte v3 : dégradé Encre → ink-deep, desc 320 px à droite. */
export function ServicesSection({ content, className }: ServicesSectionProps) {
  return (
    <section
      id="services"
      className={cn(
        "scroll-mt-msk-nav bg-linear-to-b from-msk-page to-msk-ink-deep",
        className,
      )}
      aria-labelledby="services-heading"
    >
      <div className="msk-page-x mx-auto flex w-full max-w-msk flex-col gap-20 py-msk-x">
        <Reveal>
          <div className="grid grid-cols-1 items-end gap-10 lg:grid-cols-msk-split lg:gap-0">
            <div>
              <p className="msk-eyebrow mb-6 text-msk-text-muted">{content.eyebrow}</p>
              <h2 id="services-heading" className="flex flex-col text-msk-text">
                <span className="msk-section-title">{content.titleLine1}</span>
                <span className="msk-section-accent text-msk-blue">
                  {content.titleAccent}
                </span>
              </h2>
            </div>
            <div className="hidden lg:block" aria-hidden />
            <p className="msk-body self-end text-msk-text-secondary">{content.intro}</p>
          </div>
        </Reveal>

        <ul className="w-full">
          {content.items.map((item, i) => (
            <li key={item.index}>
              <Reveal delayMs={i * 60}>
                <div className="grid grid-cols-1 items-start gap-6 border-t border-msk-border py-8 last:border-b lg:grid-cols-msk-services lg:gap-12">
                  <span className="font-sans text-xs font-medium tracking-msk text-msk-text-muted">
                    {item.index}
                  </span>
                  <h3 className="font-sans text-2xl font-semibold leading-msk-snug text-msk-text uppercase">
                    {item.title}
                  </h3>
                  <p className="msk-body-xs text-msk-text-secondary lg:text-right">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
