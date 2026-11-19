import { Menu, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
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

/** Seuil bas de page : toujours afficher la barre. */
const TOP_REVEAL_PX = 8;
/** Delta minimal pour considérer un sens de scroll (évite le jitter). */
const SCROLL_DELTA_PX = 6;

/**
 * Nav Figma — bandeau Encre H96 (clamp 72–96).
 * Desktop : logo signature horizontale Charte v3 | liens centrés (gap 40) | Briefer + EN.
 * Mobile : logo | EN + burger → drawer (interim MOBILE_BRIEF).
 *
 * Scroll : smart header (hide down / show up). Figma ne spécifie pas de hide-on-scroll
 * → décision documentée DESIGN_DECISIONS + Q28.
 */
export function SiteHeader({ locale, nav, className }: SiteHeaderProps) {
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

      // Drawer ouvert ou reduced-motion : barre toujours accessible.
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

  return (
    <header
      ref={headerRef}
      className={cn(
        "fixed inset-x-0 top-0 z-40 h-msk-nav bg-msk-black",
        "transition-transform duration-msk ease-out motion-reduce:transition-none",
        hidden && !open ? "-translate-y-full" : "translate-y-0",
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
          {nav.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={reveal}
              className="msk-nav-label whitespace-nowrap text-msk-text-secondary transition-colors duration-msk ease-out hover:text-msk-text"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex shrink-0 items-center justify-end gap-msk-nav-actions justify-self-end">
          <a
            href="#contact"
            onClick={reveal}
            className="msk-nav-label hidden whitespace-nowrap text-msk-text-secondary transition-colors hover:text-msk-blue lg:inline-flex"
          >
            {nav.ctaBrief}
          </a>
          <Link
            to={alternateHomePath(locale)}
            hrefLang={locale === "fr" ? "en" : "fr"}
            lang={locale === "fr" ? "en" : "fr"}
            onClick={reveal}
            className="msk-nav-label shrink-0 whitespace-nowrap text-msk-text-secondary transition-colors hover:text-msk-text"
          >
            {nav.languageSwitchLabel}
          </Link>
          <button
            type="button"
            className="inline-flex size-11 shrink-0 items-center justify-center text-msk-text lg:hidden"
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

      <div
        id={panelId}
        className={cn(
          "fixed inset-0 z-50 flex flex-col bg-msk-black lg:hidden",
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
