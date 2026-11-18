import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useParams,
} from "react-router";

import type { Route } from "./+types/root";
import { isLocale } from "~/i18n";
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
  let message = "Erreur";
  let details = "Une erreur inattendue s’est produite.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Erreur";
    details =
      error.status === 404
        ? "La page demandée est introuvable."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="container mx-auto p-4 pt-16">
      <h1 className="font-display text-2xl">{message}</h1>
      <p className="text-msk-text-muted">{details}</p>
      {stack && (
        <pre className="w-full overflow-x-auto p-4">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
