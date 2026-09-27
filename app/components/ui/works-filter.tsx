import { cn } from "~/lib/utils";

export type WorksFilterValue = "all" | "web" | "branding" | "app";

type WorksFilterProps = {
  value: WorksFilterValue;
  onChange: (value: WorksFilterValue) => void;
  labels: Record<WorksFilterValue, string>;
  ariaLabel: string;
  className?: string;
};

const ORDER: WorksFilterValue[] = ["all", "web", "branding", "app"];

/**
 * Filtres Travaux — Figma Tout / Web / Branding / App.
 */
export function WorksFilter({
  value,
  onChange,
  labels,
  ariaLabel,
  className,
}: WorksFilterProps) {
  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className={cn("flex flex-wrap items-center gap-x-5 gap-y-3 sm:gap-6", className)}
    >
      {ORDER.map((key) => {
        const selected = value === key;
        return (
          <button
            key={key}
            type="button"
            role="tab"
            aria-selected={selected}
            onClick={() => onChange(key)}
            className={cn(
              "msk-nav-label cursor-pointer transition-colors",
              selected
                ? "text-msk-text"
                : "text-msk-text-subtle hover:text-msk-text-muted",
            )}
          >
            {labels[key]}
          </button>
        );
      })}
    </div>
  );
}
