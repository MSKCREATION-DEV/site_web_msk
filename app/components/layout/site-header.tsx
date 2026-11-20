import { Menu, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { Link, useLocation } from "react-router";
import { LanguageSwitcher, MskLogo } from "~/components/ui";
import type { NavContent } from "~/content/types";
import type { Locale } from "~/i18n";
import { homePath } from "~/i18n";
import { cn } from "~/lib/utils";

type SiteHeaderProps = {
  locale: Locale;
  nav: NavContent;
  className?: string;
};

/** Seuil bas de page : toujours afficher la barre. */
const TOP_REVEAL_PX = 8;
/** Delta minimal pour considérer un sens de scroll (évite le jitter). */
const SCROLL_DELTA_PX = 6;

function resolveNavHref(href: string, locale: Locale, pathname: string): string {
  if (!href.startsWith("#")) return href;
  const home = homePath(locale);
  const onHome = pathname === home || pathname === `${home}/`;
  return onHome ? href : `${home}${href}`;
}

/**
 * Nav Figma — bandeau Encre H96 (clamp 72–96).
 * Desktop : logo | liens centrés | Briefer (pill bleu) + langue.
 * Mobile : logo | langue + burger → drawer.
 */
export function SiteHeader({ locale, nav, className }: SiteHeaderProps) {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const panelId = useId();
  const headerRef = useRef<HTMLElement>(null);
  const lastY = useRef(0);
  const openRef = useRef(open);
  openRef.current = open;

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

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    lastY.current = window.scrollY;

    const applyScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY.current;
      lastY.current = y;

      if (openRef.current || media.matches) {
        setHidden(false);
        return;
      }

      if (y <= TOP_REVEAL_PX) {
        setHidden(false);
        return;
      }

      if (delta > SCROLL_DELTA_PX) {
        const active = document.activeElement;
        if (headerRef.current?.contains(active)) {
          setHidden(false);
          return;
        }
        setHidden(true);
        return;
      }

      if (delta < -SCROLL_DELTA_PX) {
        setHidden(false);
      }
    };

    const onScroll = () => {
      applyScroll();
    };

    const onMotionChange = () => {
      if (media.matches) setHidden(false);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    media.addEventListener("change", onMotionChange);
    return () => {
      window.removeEventListener("scroll", onScroll);
      media.removeEventListener("change", onMotionChange);
    };
  }, []);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const onFocusIn = () => setHidden(false);
    el.addEventListener("focusin", onFocusIn);
    return () => el.removeEventListener("focusin", onFocusIn);
  }, []);

  useEffect(() => {
    if (open) setHidden(false);
  }, [open]);

  const close = () => setOpen(false);
  const reveal = () => setHidden(false);

  const navLinkClass =
    "msk-nav-label whitespace-nowrap text-msk-text-secondary transition-colors duration-msk ease-out hover:text-msk-text focus-visible:outline-none focus-visible:text-msk-blue focus-visible:ring-2 focus-visible:ring-msk-blue focus-visible:ring-offset-2 focus-visible:ring-offset-msk-ink rounded-sm";

  return (
    <header
      ref={headerRef}
      className={cn(
        "fixed inset-x-0 top-0",
        open ? "z-msk-overlay" : "z-40",
        className,
      )}
    >
      <div
        className={cn(
          "h-msk-nav bg-msk-black",
          "transition-transform duration-msk ease-out motion-reduce:transition-none",
          hidden && !open ? "-translate-y-full" : "translate-y-0",
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
            className="relative z-10 flex shrink-0 items-center justify-self-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-msk-blue focus-visible:ring-offset-2 focus-visible:ring-offset-msk-ink"
            onClick={() => {
              reveal();
              close();
            }}
          >
            <MskLogo variant="header" />
          </Link>

          <nav
            aria-label={nav.primaryNavAriaLabel}
            className="hidden items-center justify-center gap-msk-nav-links justify-self-center lg:flex"
          >
            {nav.links.map((link) => {
              const href = resolveNavHref(link.href, locale, pathname);
              const isRoute = !href.startsWith("#") && !href.includes("#");
              if (isRoute) {
                return (
                  <Link
                    key={link.href}
                    to={href}
                    onClick={reveal}
                    className={navLinkClass}
                  >
                    {link.label}
                  </Link>
                );
              }
              return (
                <a
                  key={link.href}
                  href={href}
                  onClick={reveal}
                  className={navLinkClass}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          <div className="ml-auto flex shrink-0 items-center justify-end gap-msk-nav-actions justify-self-end">
            <a
              href={resolveNavHref("#contact", locale, pathname)}
              onClick={reveal}
              className="msk-btn-label-sm hidden h-9 items-center justify-center rounded-msk-pill bg-msk-blue px-4 text-msk-text transition-colors duration-msk ease-out hover:bg-msk-blue-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-msk-blue focus-visible:ring-offset-2 focus-visible:ring-offset-msk-ink lg:inline-flex"
            >
              {nav.ctaBrief}
            </a>
            <LanguageSwitcher
              locale={locale}
              label={nav.languageSwitchLabel}
              ariaLabel={nav.languageSwitchAriaLabel}
              onNavigate={reveal}
            />
            <button
              type="button"
              className="inline-flex size-11 shrink-0 items-center justify-center text-msk-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-msk-blue focus-visible:ring-offset-2 focus-visible:ring-offset-msk-ink lg:hidden"
              aria-expanded={open}
              aria-controls={panelId}
              aria-label={open ? nav.menuCloseLabel : nav.menuOpenLabel}
              onClick={() => {
                reveal();
                setOpen((value) => !value);
              }}
            >
              {open ? (
                <X className="size-5" strokeWidth={1.5} aria-hidden />
              ) : (
                <Menu className="size-5" strokeWidth={1.5} aria-hidden />
              )}
            </button>
          </div>
        </div>
      </div>

      <div
        id={panelId}
        className={cn(
          "fixed inset-0 z-msk-overlay flex flex-col bg-msk-black lg:hidden",
          "transition-[opacity,transform,visibility] duration-400 ease-out motion-reduce:transition-none",
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
            <LanguageSwitcher
              locale={locale}
              label={nav.languageSwitchLabel}
              ariaLabel={nav.languageSwitchAriaLabel}
              onNavigate={close}
            />
            <button
              type="button"
              className="inline-flex size-11 items-center justify-center text-msk-text"
              aria-label={nav.menuCloseLabel}
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
          {nav.links.map((link, index) => {
            const href = resolveNavHref(link.href, locale, pathname);
            const isRoute = !href.startsWith("#") && !href.includes("#");
            const className = "group border-b border-white/10 py-msk-nav-py transition-colors";
            const style = {
              transitionDelay: open ? `${80 + index * 40}ms` : "0ms",
            };
            const label = (
              <span className="msk-drawer-link text-msk-text transition-colors group-hover:text-msk-blue group-focus-visible:text-msk-blue">
                {link.label}
              </span>
            );
            if (isRoute) {
              return (
                <Link
                  key={link.href}
                  to={href}
                  onClick={close}
                  className={className}
                  style={style}
                >
                  {label}
                </Link>
              );
            }
            return (
              <a
                key={link.href}
                href={href}
                onClick={close}
                className={className}
                style={style}
              >
                {label}
              </a>
            );
          })}

          <a
            href={resolveNavHref("#contact", locale, pathname)}
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
