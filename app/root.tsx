import {
  isRouteErrorResponse,
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useParams,
} from "react-router";

import type { Route } from "./+types/root";
import { MskLogo } from "~/components/ui";
import { homePath, isLocale, parseLocale } from "~/i18n";
import { errorMessages } from "~/i18n/error-messages";
import { securityHeaders } from "~/lib/security/headers";
import "./app.css";

export function headers(_: Route.HeadersArgs) {
  return securityHeaders();
}

/*
 * Charte v3 (PDF §03) — Jost / Bricolage ExtraBold / Instrument Serif Italic.
 * Sources locales : docs/brand/fonts/ — runtime Google Fonts (mêmes familles, LCP).
 * Poids strictement utilisés.
 */
const FONTS_CSS =
  "https://fonts.googleapis.com/css2?" +
  "family=Bricolage+Grotesque:opsz,wght@12..96,800&" +
  "family=Instrument+Serif:ital@1&" +
  "family=Jost:wght@300;400;500;600&" +
  "display=swap";

export const links: Route.LinksFunction = () => [
  { rel: "icon", href: "/favicon.ico", sizes: "32x32" },
  {
    rel: "icon",
    href: "/favicon.svg",
    type: "image/svg+xml",
  },
  {
    rel: "icon",
    href: "/favicon-32.png",
    type: "image/png",
    sizes: "32x32",
  },
  {
    rel: "icon",
    href: "/favicon-16.png",
    type: "image/png",
    sizes: "16x16",
  },
  { rel: "apple-touch-icon", href: "/apple-touch-icon.png", sizes: "180x180" },
  { rel: "manifest", href: "/site.webmanifest" },
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  { rel: "stylesheet", href: FONTS_CSS },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const params = useParams();
  const lang = isLocale(params.lang) ? params.lang : "fr";

  return (
    <html lang={lang}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Charte v3 — Encre #0D1330 (ancien Figma #080808) */}
        <meta name="theme-color" content="#0D1330" />
        <meta name="color-scheme" content="dark" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const params = useParams();
  const locale = isLocale(params.lang) ? parseLocale(params.lang) : "fr";
  const copy = errorMessages(locale);
  const home = homePath(locale);
  const contactHref = `${home}#contact`;

  const is404 = isRouteErrorResponse(error) && error.status === 404;
  let title = copy.title;
  let details = copy.unexpected;
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    title = is404 ? copy.notFoundTitle : copy.title;
    details = is404
      ? copy.notFoundBody
      : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="relative flex min-h-svh flex-col bg-msk-ink text-msk-text">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(29,115,188,0.18),_transparent_55%)]"
        aria-hidden
      />
      <div className="msk-page-x relative z-10 mx-auto flex w-full max-w-msk flex-1 flex-col py-10 sm:py-14">
        <Link
          to={home}
          aria-label="MSK Création"
          className="w-fit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-msk-blue focus-visible:ring-offset-2 focus-visible:ring-offset-msk-ink"
        >
          <MskLogo variant="header" />
        </Link>

        <div className="flex flex-1 flex-col justify-center py-16 sm:py-24">
          <p className="msk-eyebrow text-msk-blue">
            {is404 ? copy.notFoundEyebrow : copy.title}
          </p>
          <h1 className="mt-4 max-w-2xl font-sans text-4xl font-semibold tracking-tight text-msk-text sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="msk-body-sm mt-6 max-w-xl text-msk-text-secondary">
            {details}
          </p>

          <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <Link
              to={home}
              className="msk-btn-label inline-flex h-msk-cta-btn items-center justify-center rounded-msk-pill bg-msk-blue px-msk-btn-px text-msk-text transition-colors duration-msk ease-out hover:bg-msk-blue-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-msk-blue focus-visible:ring-offset-2 focus-visible:ring-offset-msk-ink"
            >
              {copy.homeCta}
            </Link>
            {is404 ? (
              <a
                href={contactHref}
                className="msk-btn-label inline-flex h-msk-cta-btn items-center justify-center rounded-msk-pill border border-white/35 px-msk-btn-px text-msk-text transition-colors duration-msk ease-out hover:border-msk-text hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-msk-blue focus-visible:ring-offset-2 focus-visible:ring-offset-msk-ink"
              >
                {copy.contactCta}
              </a>
            ) : null}
          </div>
        </div>

        {stack ? (
          <pre className="mb-8 w-full overflow-x-auto rounded-lg border border-msk-border bg-msk-black/60 p-4 text-xs text-msk-text-muted">
            <code>{stack}</code>
          </pre>
        ) : null}
      </div>
    </main>
  );
}
