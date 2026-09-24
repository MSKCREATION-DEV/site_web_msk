import { Outlet, data, useLocation } from "react-router";
import type { Route } from "./+types/locale-layout";
import { SiteLayout } from "~/components/layout";
import { isLocale } from "~/i18n";
import { loadLocaleShell } from "~/server/site/loaders/home.server";

export function loader({ params }: Route.LoaderArgs) {
  if (!isLocale(params.lang)) {
    throw data(null, { status: 404 });
  }

  return loadLocaleShell(params.lang);
}

/**
 * Layout locale — chrome site (Header / Footer / Intro / BackToTop).
 * Fiches projet : chrome masqué (barre propre à la fiche).
 */
export default function LocaleLayout({ loaderData }: Route.ComponentProps) {
  const { pathname } = useLocation();
  const hideChrome =
    pathname.includes("/travaux/") || pathname.includes("/projects/");

  return (
    <SiteLayout
      locale={loaderData.locale}
      nav={loaderData.nav}
      footer={loaderData.footer}
      contact={loaderData.contact}
      hideChrome={hideChrome}
    >
      <Outlet />
    </SiteLayout>
  );
}
