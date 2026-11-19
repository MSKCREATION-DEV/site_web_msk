import { Menu, X } from "lucide-react";
import { useEffect, useId, useState } from "react";
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
 * Nav Figma — bandeau Encre H96 (plancher 72).
 * Desktop : logo signature horizontale Charte v3 | liens centrés (gap 40) | Briefer + EN.
 * Mobile : logo | EN + burger → drawer.
 */
export function SiteHeader({ locale, nav, className }: SiteHeaderProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const closeLabel = locale === "en" ? "Close menu" : "Fermer le menu";
  const openLabel = locale === "en" ? "Open menu" : "Ouvrir le menu";

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header
      className={cn(
        "absolute inset-x-0 top-0 z-40 h-msk-nav bg-msk-black",
        className,
      )}
    >
      <div
        className={cn(
          "msk-page-x mx-auto flex h-full w-full max-w-msk items-center",
          "lg:grid lg:grid-cols-msk-nav",
        )}
      >
        <Link
          to={homePath(locale)}
          aria-label="MSK Création"
          className="relative z-10 flex shrink-0 items-center justify-self-start"
          onClick={close}
        >
          <MskLogo variant="header" />
        </Link>

        <nav
          aria-label={nav.primaryNavAriaLabel}
          className="hidden items-center justify-center gap-msk-nav-links justify-self-center lg:flex"
        >
          {nav.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="msk-nav-label whitespace-nowrap text-msk-text-secondary transition-colors duration-msk ease-out hover:text-msk-text"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex shrink-0 items-center justify-end gap-msk-nav-actions justify-self-end">
          <a
            href="#contact"
            className="msk-nav-label hidden whitespace-nowrap text-msk-text-secondary transition-colors hover:text-msk-blue lg:inline-flex"
          >
            {nav.ctaBrief}
          </a>
          <Link
            to={alternateHomePath(locale)}
            hrefLang={locale === "fr" ? "en" : "fr"}
            lang={locale === "fr" ? "en" : "fr"}
            className="msk-nav-label shrink-0 whitespace-nowrap text-msk-text-secondary transition-colors hover:text-msk-text"
          >
            {nav.languageSwitchLabel}
          </Link>
          <button
            type="button"
            className="inline-flex size-11 shrink-0 items-center justify-center text-msk-text lg:hidden"
            aria-expanded={open}
            aria-controls={panelId}
            aria-label={open ? closeLabel : openLabel}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? (
              <X className="size-5" strokeWidth={1.5} aria-hidden />
            ) : (
              <Menu className="size-5" strokeWidth={1.5} aria-hidden />
            )}
          </button>
        </div>
      </div>

      <div
        id={panelId}
        className={cn(
          "fixed inset-0 z-50 flex flex-col bg-msk-black lg:hidden",
          "transition-[opacity,transform,visibility] duration-400 ease-out",
          open
            ? "visible translate-y-0 opacity-100"
            : "pointer-events-none invisible -translate-y-2 opacity-0",
        )}
        aria-hidden={!open}
      >
        <div className="msk-page-x flex h-msk-nav shrink-0 items-center justify-between border-b border-white/10">
          <Link
            to={homePath(locale)}
            aria-label="MSK Création"
            className="flex shrink-0 items-center"
            onClick={close}
          >
            <MskLogo variant="header" />
          </Link>
          <div className="flex shrink-0 items-center gap-msk-nav-actions">
            <Link
              to={alternateHomePath(locale)}
              hrefLang={locale === "fr" ? "en" : "fr"}
              lang={locale === "fr" ? "en" : "fr"}
              onClick={close}
              className="msk-nav-label whitespace-nowrap text-msk-text"
            >
              {nav.languageSwitchLabel}
            </Link>
            <button
              type="button"
              className="inline-flex size-11 items-center justify-center text-msk-text"
              aria-label={closeLabel}
              onClick={close}
            >
              <X className="size-5" strokeWidth={1.5} aria-hidden />
            </button>
          </div>
        </div>

        <nav
          aria-label={nav.mobileNavAriaLabel}
          className="msk-page-x flex flex-1 flex-col justify-center pb-msk-hero-pb"
        >
          {nav.links.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              onClick={close}
              className="group border-b border-white/10 py-msk-nav-py transition-colors"
              style={{ transitionDelay: open ? `${80 + index * 40}ms` : "0ms" }}
            >
              <span className="msk-drawer-link text-msk-text transition-colors group-hover:text-msk-blue">
                {link.label}
              </span>
            </a>
          ))}

          <a
            href="#contact"
            onClick={close}
            className="msk-btn-label mt-msk-hero-stack inline-flex h-msk-cta-btn w-full items-center justify-center rounded-msk-pill bg-msk-blue px-msk-btn-px text-msk-text transition-colors hover:bg-msk-blue-hover"
          >
            {nav.ctaBrief}
          </a>
        </nav>
      </div>
    </header>
  );
}
