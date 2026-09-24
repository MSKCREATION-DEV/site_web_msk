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
        "flex w-full max-w-[568px] flex-col gap-4 border border-[color:var(--msk-success-border)] bg-[color:var(--msk-success-bg)] p-10",
        className,
      )}
    >
      <p className="font-mono-msk text-[10px] tracking-[2px] text-msk-blue uppercase">
        <Check className="mr-2 inline size-3.5" aria-hidden strokeWidth={2} />
        {eyebrow}
      </p>
      <p className="text-[22px] font-medium text-msk-text">{title}</p>
      <p className="text-sm leading-normal text-msk-text-secondary">{body}</p>
    </div>
  );
}
