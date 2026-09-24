import { Link } from "react-router";
import { MskLogo } from "~/components/ui";
import type { NavContent } from "~/content/types";
import type { Locale } from "~/i18n";
import { alternateHomePath, homePath } from "~/i18n";
import { cn } from "~/lib/utils";

type SiteHeaderProps = {
  locale: Locale;
  nav: NavContent;
  className?: string;
};

/**
 * Navigation Desktop — structure d’après Lisez-moi (menu → sections, CTAs).
 * Composition / spacing exacts = PENDING MCP (Q06).
 */
export function SiteHeader({ locale, nav, className }: SiteHeaderProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b border-msk-border bg-msk-page/95 backdrop-blur-sm",
        className,
      )}
    >
      <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between gap-6 px-8 py-5">
        <Link to={homePath(locale)} aria-label="MSK Création" className="shrink-0">
          <MskLogo variant="header" />
        </Link>

        <nav aria-label="Principal" className="hidden items-center gap-8 lg:flex">
          {nav.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[11px] tracking-[2px] text-msk-text-muted uppercase transition-colors hover:text-msk-text"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <a
            href="#travaux"
            className="hidden text-[11px] tracking-[2px] text-msk-text-secondary uppercase transition-colors hover:text-msk-text md:inline"
          >
            {nav.ctaWorks}
          </a>
          <a
            href="#contact"
            className="rounded-[999px] bg-msk-blue px-5 py-2.5 text-[11px] tracking-[2px] text-msk-text uppercase transition-colors hover:bg-msk-blue-hover"
          >
            {nav.ctaBrief}
          </a>
          <Link
            to={alternateHomePath(locale)}
            className="font-mono-msk text-[10px] tracking-[2px] text-msk-text-subtle uppercase hover:text-msk-text"
          >
            {nav.languageSwitchLabel}
          </Link>
        </div>
      </div>
    </header>
  );
}
