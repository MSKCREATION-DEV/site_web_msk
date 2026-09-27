import { Link } from "react-router";
import { MskLogo } from "~/components/ui";
import type { ContactContent, FooterContent, NavContent } from "~/content/types";
import type { Locale } from "~/i18n";
import { alternateHomePath, homePath } from "~/i18n";
import { cn } from "~/lib/utils";

type SiteFooterProps = {
  locale: Locale;
  footer: FooterContent;
  contact: ContactContent;
  languageSwitchLabel?: NavContent["languageSwitchLabel"];
  className?: string;
};

/**
 * Footer — logo géant centré + barre 3 zones alignées (même `msk-page-x` que le site).
 * Mobile : logo géant seul ; copyright + social empilés (petit logo Desktop only).
 */
export function SiteFooter({
  locale,
  footer,
  languageSwitchLabel,
  className,
}: SiteFooterProps) {
  return (
    <footer
      className={cn(
        "bg-linear-to-b from-msk-page to-msk-warm-footer",
        className,
      )}
    >
      <div className="msk-page-x mx-auto flex w-full max-w-msk flex-col gap-10 pt-16 pb-10 md:gap-14 md:pt-20">
        <Link
          to={homePath(locale)}
          aria-label="MSK Création"
          className="flex w-full justify-center"
        >
          <MskLogo variant="intro" />
        </Link>

        <div
          className={cn(
            "grid w-full items-center gap-5 border-t border-white/15 pt-5",
            "md:grid-cols-msk-footer md:gap-8 md:pt-0",
          )}
        >
          <Link
            to={homePath(locale)}
            aria-label="MSK Création"
            className="hidden items-center justify-self-start md:inline-flex"
          >
            <MskLogo variant="header" />
          </Link>

          <div className="flex min-w-0 flex-col items-center justify-center gap-1 text-center font-sans text-xs leading-msk-snug text-msk-text-muted">
            <p>{footer.copyright}</p>
            <p className="max-w-full break-words">{footer.addressLine}</p>
            {languageSwitchLabel ? (
              <Link
                to={alternateHomePath(locale)}
                hrefLang={locale === "fr" ? "en" : "fr"}
                lang={locale === "fr" ? "en" : "fr"}
                className="mt-2 text-msk-text-secondary transition-colors hover:text-msk-blue md:hidden"
              >
                {languageSwitchLabel}
              </Link>
            ) : null}
          </div>

          <nav
            aria-label="Réseaux"
            className="flex flex-wrap items-center justify-center gap-5 md:justify-end md:gap-6"
          >
            {footer.social.map((item) => (
              <a
                key={item.href}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                className="font-sans text-xs text-msk-text-muted transition-colors hover:text-msk-blue"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
