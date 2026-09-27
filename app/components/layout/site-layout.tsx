import type { ReactNode } from "react";
import type { ContactContent, FooterContent, NavContent } from "~/content/types";
import type { Locale } from "~/i18n";
import { BackToTopControl } from "./back-to-top-control";
import { IntroCurtain } from "./intro-curtain";
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
  const skipLabel = locale === "en" ? "Skip to content" : "Aller au contenu";

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-msk-overlay focus:rounded-md focus:bg-msk-blue focus:px-4 focus:py-2 focus:text-sm focus:text-msk-text"
      >
        {skipLabel}
      </a>
      {showIntro && !hideChrome ? <IntroCurtain /> : null}
      {!hideChrome ? <SiteHeader locale={locale} nav={nav} /> : null}
      <main id="main" className="w-full max-w-full overflow-x-clip">
        {children}
      </main>
      {!hideChrome ? (
        <SiteFooter
          locale={locale}
          footer={footer}
          contact={contact}
          languageSwitchLabel={nav.languageSwitchLabel}
        />
      ) : null}
      {showBackToTop && !hideChrome ? <BackToTopControl /> : null}
    </>
  );
}
