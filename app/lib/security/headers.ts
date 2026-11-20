/**
 * Headers de sécurité HTTP — baseline MSK.
 * CSP permissive pour Google Fonts + styles inline existants (Tailwind runtime).
 * Serrer CSP après self-host fonts (P2).
 *
 * Preview Vercel : autoriser uniquement `vercel.live` (toolbar Comments /
 * feedback.js). Prod reste fermée. Alternative : désactiver la toolbar
 * (Deployment → Settings → Vercel Toolbar) si on veut zéro exception CSP.
 */

function isVercelPreviewRuntime(): boolean {
  return process.env.VERCEL_ENV === "preview";
}

export function securityHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    "X-Frame-Options": "DENY",
    "X-Content-Type-Options": "nosniff",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
  };

  // HSTS uniquement si HTTPS (prod). Ne pas forcer en local http.
  if (import.meta.env.PROD) {
    const previewLive = isVercelPreviewRuntime();
    const scriptSrc = previewLive
      ? "script-src 'self' 'unsafe-inline' https://vercel.live"
      : "script-src 'self' 'unsafe-inline'";
    const connectSrc = previewLive
      ? "connect-src 'self' https://vercel.live wss://vercel.live"
      : "connect-src 'self'";

    headers["Strict-Transport-Security"] =
      "max-age=31536000; includeSubDomains";
    headers["Content-Security-Policy"] = [
      "default-src 'self'",
      "base-uri 'self'",
      "frame-ancestors 'none'",
      "form-action 'self'",
      "img-src 'self' data: https:",
      "font-src 'self' https://fonts.gstatic.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      scriptSrc,
      connectSrc,
    ].join("; ");
  }

  return headers;
}
