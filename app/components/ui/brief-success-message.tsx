import { Check } from "lucide-react";
import { cn } from "~/lib/utils";

type BriefSuccessMessageProps = {
  eyebrow?: string;
  title: string;
  body: string;
  className?: string;
};

/**
 * Message « Brief reçu » — remplace le formulaire (Figma 240:465).
 */
export function BriefSuccessMessage({
  eyebrow = "BRIEF REÇU",
  title,
  body,
  className,
}: BriefSuccessMessageProps) {
  return (
    <div
      role="status"
      className={cn(
        "flex w-full max-w-msk-col flex-col gap-4 border border-msk-success-border bg-msk-success-bg p-10",
        className,
      )}
    >
      <p className="font-mono-msk text-msk-2xs tracking-msk-px text-msk-blue uppercase">
        <Check className="mr-2 inline size-3.5" aria-hidden strokeWidth={2} />
        {eyebrow}
      </p>
      <p className="text-msk-success font-medium text-msk-text">{title}</p>
      <p className="text-sm leading-normal text-msk-text-secondary">{body}</p>
    </div>
  );
}
