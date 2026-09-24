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
  return (
    <>
      {showIntro && !hideChrome ? <IntroCurtain /> : null}
      {!hideChrome ? <SiteHeader locale={locale} nav={nav} /> : null}
      <main id="main">{children}</main>
      {!hideChrome ? (
        <SiteFooter locale={locale} footer={footer} contact={contact} />
      ) : null}
      {showBackToTop && !hideChrome ? <BackToTopControl /> : null}
    </>
  );
}
