import { cn } from "~/lib/utils";

export type WorksFilterValue = "all" | "web" | "branding" | "app";

type WorksFilterProps = {
  value: WorksFilterValue;
  onChange: (value: WorksFilterValue) => void;
  labels: Record<WorksFilterValue, string>;
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
  className,
}: WorksFilterProps) {
  return (
    <div
      role="tablist"
      aria-label="Filtres travaux"
      className={cn("flex flex-wrap items-center gap-6", className)}
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
              "cursor-pointer text-[11px] tracking-[2px] uppercase transition-colors",
              selected
                ? "text-msk-text"
                : "text-msk-text-muted hover:text-msk-text-secondary",
            )}
          >
            {labels[key]}
          </button>
        );
      })}
    </div>
  );
}
