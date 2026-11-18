/**
 * Headers de sécurité HTTP — baseline MSK.
 * CSP permissive pour Google Fonts + styles inline existants (Tailwind runtime).
 * Serrer CSP après self-host fonts (P2).
 */

export function securityHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    "X-Frame-Options": "DENY",
    "X-Content-Type-Options": "nosniff",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
  };

  // HSTS uniquement si HTTPS (prod). Ne pas forcer en local http.
  if (import.meta.env.PROD) {
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
      "script-src 'self' 'unsafe-inline'",
      "connect-src 'self'",
    ].join("; ");
  }

  return headers;
}
