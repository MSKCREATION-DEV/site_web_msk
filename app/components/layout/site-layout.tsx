import type { ReactNode } from "react";
import type { ContactContent, FooterContent, NavContent } from "~/content/types";
import type { Locale } from "~/i18n";
import { BackToTopControl } from "./back-to-top-control";
import { BrandCursor } from "./brand-cursor";
import { HashAnchorSync } from "./hash-anchor-sync";
import { IntroCurtain } from "./intro-curtain";
import { NavigationProgress } from "./navigation-progress";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

type SiteLayoutProps = {
  locale: Locale;
  nav: NavContent;
  footer: FooterContent;
  contact: ContactContent;
  children: ReactNode;
  /** Masquer chrome site (fiches projet overlay). */
  hideChrome?: boolean;
  showIntro?: boolean;
  showBackToTop?: boolean;
};

export function SiteLayout({
  locale,
  nav,
  footer,
  contact,
  children,
  hideChrome = false,
  showIntro = true,
  showBackToTop = true,
}: SiteLayoutProps) {
  return (
    <>
      <NavigationProgress label={nav.pageLoadingLabel} />
      {!hideChrome ? <HashAnchorSync /> : null}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-msk-overlay focus:rounded-md focus:bg-msk-blue focus:px-4 focus:py-2 focus:text-sm focus:text-msk-text"
      >
        {nav.skipToContentLabel}
      </a>
      {showIntro && !hideChrome ? (
        <IntroCurtain ariaLabel={nav.introAriaLabel} />
      ) : null}
      {!hideChrome ? <SiteHeader locale={locale} nav={nav} /> : null}
      {/* Pas d’overflow-x ici : clip casse position:sticky (stack Travaux). */}
      <main id="main" className="scroll-mt-msk-nav w-full max-w-full">
        {children}
      </main>
      {!hideChrome ? (
        <SiteFooter
          locale={locale}
          footer={footer}
          contact={contact}
          languageSwitchLabel={nav.languageSwitchLabel}
          languageSwitchAriaLabel={nav.languageSwitchAriaLabel}
        />
      ) : null}
      {showBackToTop && !hideChrome ? <BackToTopControl /> : null}
      <BrandCursor />
    </>
  );
}
