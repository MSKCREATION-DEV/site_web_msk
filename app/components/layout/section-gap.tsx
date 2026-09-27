import { cn } from "~/lib/utils";

type SectionGapProps = {
  className?: string;
};

/** Bande 96 px dégradé sombre entre grandes sections (brief Desktop). */
export function SectionGap({ className }: SectionGapProps) {
  return <div className={cn("msk-section-gap", className)} aria-hidden />;
}
