import { ArrowLeft, ArrowRight, ArrowUp } from "lucide-react";
import type { ComponentProps } from "react";
import { Link } from "react-router";
import { cn } from "~/lib/utils";

type TextLinkProps = {
  to: string;
  label: string;
  className?: string;
} & Omit<ComponentProps<typeof Link>, "to" | "children" | "className">;

/** Fermer / retour — Lucide ArrowLeft + label (Figma barre fiche). */
export function CloseLink({ to, label, className, ...props }: TextLinkProps) {
  return (
    <Link
      {...props}
      to={to}
      className={cn(
        "inline-flex items-center gap-3 font-sans text-msk-xs tracking-msk-wide text-msk-text-secondary uppercase",
        "hover:text-msk-text",
        className,
      )}
    >
      <ArrowLeft className="size-5" aria-hidden strokeWidth={1.5} />
      {label}
    </Link>
  );
}

type NextProjectLinkProps = {
  to: string;
  nextLabel: string;
  title: string;
  subtitle?: string;
  align?: "start" | "end";
  className?: string;
};

export function NextProjectLink({
  to,
  nextLabel,
  title,
  subtitle,
  align = "end",
  className,
}: NextProjectLinkProps) {
  const Icon = align === "start" ? ArrowLeft : ArrowRight;
  return (
    <Link
      to={to}
      className={cn(
        "flex flex-col gap-3 px-10 py-12 uppercase hover:bg-white/2",
        align === "start" ? "items-start text-left" : "items-end text-right",
        className,
      )}
    >
      <span className="inline-flex items-center gap-2 text-msk-2xs tracking-msk-px text-msk-text">
        {align === "start" ? (
          <>
            <Icon className="size-3.5" aria-hidden strokeWidth={1.75} />
            {nextLabel}
          </>
        ) : (
          <>
            {nextLabel}
            <Icon className="size-3.5" aria-hidden strokeWidth={1.75} />
          </>
        )}
      </span>
      <span className="font-display text-lg font-semibold text-msk-text">
        {title}
      </span>
      {subtitle ? (
        <span className="text-xs tracking-wide text-msk-text-muted normal-case">
          {subtitle}
        </span>
      ) : null}
    </Link>
  );
}

type BackToWorksLinkProps = {
  to: string;
  label: string;
  className?: string;
};

export function BackToWorksLink({
  to,
  label,
  className,
}: BackToWorksLinkProps) {
  return (
    <Link
      to={to}
      className={cn(
        "inline-flex items-center justify-center gap-2 py-10 msk-btn-label tracking-msk-sheet text-msk-text",
        "hover:text-msk-blue",
        className,
      )}
    >
      <ArrowUp className="size-3.5" aria-hidden strokeWidth={1.75} />
      {label}
    </Link>
  );
}
