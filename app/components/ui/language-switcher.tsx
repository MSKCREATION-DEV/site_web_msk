import { Link, useLocation } from "react-router";
import type { Locale } from "~/i18n";
import {
  alternateHomePath,
  alternateProjectPath,
  alternateTeamPath,
  projectPathSegment,
} from "~/i18n";
import { cn } from "~/lib/utils";

type LanguageSwitcherProps = {
  locale: Locale;
  /** Libellé visible = langue cible (ex. EN sur page FR). */
  label: string;
  /** aria-label explicite (ex. « Passer en anglais »). */
  ariaLabel: string;
  className?: string;
  onNavigate?: () => void;
};

function alternatePathForLocation(locale: Locale, pathname: string): string {
  const teamMatch = pathname.match(/^\/(fr|en)\/(equipe|team)\/?$/);
  if (teamMatch) return alternateTeamPath(locale);

  const projectMatch = pathname.match(
    /^\/(fr|en)\/(travaux|projects)\/([^/]+)\/?$/,
  );
  if (projectMatch) {
    const slug = projectMatch[3];
    if (slug) return alternateProjectPath(locale, slug);
  }

  // Fallback home (évite un lien cassé si segment projet ≠ locale).
  if (
    pathname.includes(`/${projectPathSegment(locale)}/`) ||
    pathname.includes("/travaux/") ||
    pathname.includes("/projects/")
  ) {
    return alternateHomePath(locale);
  }

  return alternateHomePath(locale);
}

/** Bouton locale avec mini drapeau de la langue cible. */
export function LanguageSwitcher({
  locale,
  label,
  ariaLabel,
  className,
  onNavigate,
}: LanguageSwitcherProps) {
  const { pathname } = useLocation();
  const target: Locale = locale === "fr" ? "en" : "fr";
  const flag = target === "en" ? "🇬🇧" : "🇫🇷";
  const to = alternatePathForLocation(locale, pathname);

  return (
    <Link
      to={to}
      hrefLang={target}
      lang={target}
      aria-label={ariaLabel}
      onClick={onNavigate}
      className={cn(
        "inline-flex h-9 shrink-0 items-center gap-1.5 rounded-msk-pill border border-white/25 bg-white/5 px-3",
        "font-sans text-xs font-semibold tracking-msk-wide text-msk-text uppercase",
        "transition-colors duration-msk ease-out",
        "hover:border-msk-blue hover:bg-msk-blue/15 hover:text-msk-text",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-msk-blue focus-visible:ring-offset-2 focus-visible:ring-offset-msk-ink",
        className,
      )}
    >
      <span aria-hidden className="text-sm leading-none">
        {flag}
      </span>
      <span>{label}</span>
    </Link>
  );
}
