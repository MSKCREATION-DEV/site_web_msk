import { cn } from "~/lib/utils";

type AccentRuleProps = {
  className?: string;
};

/** Trait accent Figma — 48×1, bleu MSK. */
export function AccentRule({ className }: AccentRuleProps) {
  return (
    <div
      aria-hidden
      className={cn("h-px w-12 shrink-0 bg-msk-blue", className)}
    />
  );
}
