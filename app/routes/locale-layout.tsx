import { Outlet, data } from "react-router";
import type { Route } from "./+types/locale-layout";
import { isLocale } from "~/i18n";

export function loader({ params }: Route.LoaderArgs) {
  if (!isLocale(params.lang)) {
    throw data(null, { status: 404 });
  }

  return { locale: params.lang };
}

/**
 * Layout locale — chrome site (Header/Footer) en Phase 6.
 */
export default function LocaleLayout({ loaderData }: Route.ComponentProps) {
  return (
    <div data-locale={loaderData.locale}>
      <Outlet />
    </div>
  );
}
