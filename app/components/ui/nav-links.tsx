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
        "inline-flex items-center gap-3 text-[11px] tracking-[2.2px] text-msk-text-secondary uppercase",
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
  className?: string;
};

export function NextProjectLink({
  to,
  nextLabel,
  title,
  subtitle,
  className,
}: NextProjectLinkProps) {
  return (
    <Link
      to={to}
      className={cn(
        "flex flex-col items-end gap-3 px-10 py-12 text-right uppercase",
        "hover:bg-white/2",
        className,
      )}
    >
      <span className="inline-flex items-center gap-2 text-[10px] tracking-[2px] text-msk-text">
        {nextLabel}
        <ArrowRight className="size-3.5" aria-hidden strokeWidth={1.75} />
      </span>
      <span className="font-display text-lg font-semibold text-msk-text">
        {title}
      </span>
      {subtitle ? (
        <span className="text-xs tracking-[1.2px] text-msk-text-muted normal-case">
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
        "inline-flex items-center justify-center gap-2 py-10 text-[11px] tracking-[2.75px] text-msk-text uppercase",
        "hover:text-msk-blue",
        className,
      )}
    >
      <ArrowUp className="size-3.5" aria-hidden strokeWidth={1.75} />
      {label}
    </Link>
  );
}
