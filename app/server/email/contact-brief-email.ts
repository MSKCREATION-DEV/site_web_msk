/**
 * Template e-mail « Nouveau brief » (contact site).
 * Tables + CSS inline pour clients Outlook / Gmail.
 * Images = URL HTTPS absolues (jamais chemins relatifs).
 */

import { assetUrl } from "~/lib/assets";
import { absoluteUrl } from "~/lib/seo/origin";

export type ContactBriefPayload = Record<string, string>;

export type ContactBriefEmail = {
  subject: string;
  text: string;
  html: string;
};

/** PNG blanc (charte intercalée) : SVG souvent bloqué par Outlook. */
const LOGO_EMAIL_PATH = "/assets/logo/msk-creation-email.png";

const SITE_HOST = "mskcreation.net";
const SITE_URL = "https://www.mskcreation.net";

const BRAND = {
  ink: "#0D1330",
  blue: "#1D73BC",
  coral: "#FF5A3C",
  chalk: "#F5F3EF",
  paper: "#DCE0E8",
  muted: "#8A93A6",
  white: "#FFFFFF",
} as const;

const FIELD_ROWS: Array<{ key: string; label: string }> = [
  { key: "name", label: "Nom" },
  { key: "email", label: "Email" },
  { key: "company", label: "Entreprise" },
  { key: "service", label: "Service" },
  { key: "budget", label: "Budget" },
  { key: "message", label: "Message" },
];

export function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function displayValue(value: string | undefined): string {
  const trimmed = value?.trim() ?? "";
  return trimmed.length > 0 ? trimmed : "(vide)";
}

/** URL absolue logo pour clients mail (CDN si VITE_ASSET_BASE_URL, sinon origine site). */
export function resolveEmailLogoUrl(request?: Request): string {
  const resolved = assetUrl(LOGO_EMAIL_PATH);
  if (/^https?:\/\//i.test(resolved)) {
    return resolved;
  }
  return absoluteUrl(resolved, request);
}

export function buildContactBriefSubject(payload: ContactBriefPayload): string {
  const name = payload.name?.trim() || "Sans nom";
  return `[MSK] Brief - ${name}`;
}

export function buildContactBriefText(payload: ContactBriefPayload): string {
  const lines = FIELD_ROWS.map(
    ({ key, label }) => `${label}: ${displayValue(payload[key])}`,
  );

  return [
    "Nouveau brief",
    "MSK Création · formulaire site",
    "",
    ...lines,
    "",
    "---",
    `${SITE_HOST} · ne pas répondre à noreply (utiliser Reply / Reply-To)`,
    SITE_URL,
  ].join("\n");
}

function buildFieldRowsHtml(payload: ContactBriefPayload): string {
  return FIELD_ROWS.map(({ key, label }, index) => {
    const isLast = index === FIELD_ROWS.length - 1;
    const border = isLast ? "none" : `1px solid ${BRAND.paper}`;
    const valueStyle =
      key === "message"
        ? "font-size:15px;line-height:1.55;color:#0D1330;white-space:pre-wrap;word-break:break-word;"
        : "font-size:15px;line-height:1.45;color:#0D1330;word-break:break-word;";

    return `<tr>
  <td style="padding:14px 0;border-bottom:${border};vertical-align:top;width:120px;">
    <span style="font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:${BRAND.muted};font-family:Arial,Helvetica,sans-serif;">${escapeHtml(label)}</span>
  </td>
  <td style="padding:14px 0 14px 16px;border-bottom:${border};vertical-align:top;">
    <span style="font-family:Arial,Helvetica,sans-serif;${valueStyle}">${escapeHtml(displayValue(payload[key]))}</span>
  </td>
</tr>`;
  }).join("");
}

export function buildContactBriefHtml(
  payload: ContactBriefPayload,
  options?: { logoUrl?: string; request?: Request },
): string {
  const logoUrl = options?.logoUrl ?? resolveEmailLogoUrl(options?.request);
  const rowsHtml = buildFieldRowsHtml(payload);

  return `<!DOCTYPE html>
<html lang="fr">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="color-scheme" content="light" />
<title>Nouveau brief</title>
<!--[if mso]>
<style type="text/css">
  body, table, td { font-family: Arial, Helvetica, sans-serif !important; }
</style>
<![endif]-->
</head>
<body style="margin:0;padding:0;background-color:${BRAND.chalk};-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;">
  <div style="display:none;max-height:0;overflow:hidden;mso-hide:all;">
    Nouveau brief reçu via le formulaire du site MSK Création.
  </div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${BRAND.chalk};">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;background-color:${BRAND.white};border-radius:4px;overflow:hidden;">
          <!-- Header marque -->
          <tr>
            <td style="background-color:${BRAND.ink};padding:28px 32px 24px 32px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="left" style="padding-bottom:20px;">
                    <img src="${escapeHtml(logoUrl)}" width="168" height="36" alt="MSK Création" style="display:block;border:0;outline:none;text-decoration:none;height:auto;max-width:168px;" />
                  </td>
                </tr>
                <tr>
                  <td style="border-top:2px solid ${BRAND.blue};padding-top:18px;">
                    <p style="margin:0 0 6px 0;font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:${BRAND.blue};">
                      Formulaire site
                    </p>
                    <h1 style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:24px;line-height:1.25;font-weight:700;color:${BRAND.white};">
                      Nouveau brief
                    </h1>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Accent corail discret -->
          <tr>
            <td style="height:3px;line-height:3px;font-size:0;background-color:${BRAND.coral};">&nbsp;</td>
          </tr>
          <!-- Carte champs -->
          <tr>
            <td style="padding:28px 32px 8px 32px;">
              <p style="margin:0 0 20px 0;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.5;color:${BRAND.muted};">
                Un visiteur a soumis un brief depuis mskcreation.net. Répondre via Reply pour écrire directement à l’expéditeur.
              </p>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid ${BRAND.paper};border-radius:4px;">
                <tr>
                  <td style="padding:8px 24px 8px 24px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                      ${rowsHtml}
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding:28px 32px 32px 32px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="border-top:1px solid ${BRAND.paper};padding-top:20px;">
                    <p style="margin:0 0 6px 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.5;color:${BRAND.muted};">
                      <a href="${SITE_URL}" style="color:${BRAND.blue};text-decoration:none;">${SITE_HOST}</a>
                      &nbsp;·&nbsp;notification automatique, ne pas spammer
                    </p>
                    <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:11px;line-height:1.45;color:${BRAND.muted};">
                      MSK Création · Bamako
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function buildContactBriefEmail(
  payload: ContactBriefPayload,
  request?: Request,
): ContactBriefEmail {
  return {
    subject: buildContactBriefSubject(payload),
    text: buildContactBriefText(payload),
    html: buildContactBriefHtml(payload, { request }),
  };
}
