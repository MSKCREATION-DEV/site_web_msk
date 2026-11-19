/**
 * Provider e-mail contact — Resend (Q23).
 * Envoi réel seulement si CONTACT_EMAIL_ENABLED=1 + RESEND_API_KEY.
 * Pas de clé dans le bundle client (.server.ts uniquement).
 */

import { Resend } from "resend";

export type ContactSendPayload = Record<string, string>;

export type ContactSendResult =
  | { ok: true }
  | { ok: false; reason: "disabled" | "provider_error" };

const DEFAULT_FROM = "MSK Création <noreply@mskcreation.net>";
const DEFAULT_TO = "contact@mskcreation.net";

/**
 * True seulement si l’humain a explicitement activé l’envoi
 * (après choix provider + clés env).
 */
export function isContactEmailEnabled(): boolean {
  return process.env.CONTACT_EMAIL_ENABLED === "1";
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function buildEmailBodies(payload: ContactSendPayload): {
  text: string;
  html: string;
} {
  const rows: Array<[string, string]> = [
    ["Nom", payload.name ?? ""],
    ["Email", payload.email ?? ""],
    ["Entreprise", payload.company ?? ""],
    ["Service", payload.service ?? ""],
    ["Budget", payload.budget ?? ""],
    ["Message", payload.message ?? ""],
  ];

  const text = rows
    .map(([label, value]) => `${label}: ${value || "(vide)"}`)
    .join("\n");

  const htmlRows = rows
    .map(
      ([label, value]) =>
        `<tr><th align="left" style="padding:4px 12px 4px 0;vertical-align:top;">${escapeHtml(label)}</th><td style="padding:4px 0;white-space:pre-wrap;">${escapeHtml(value || "(vide)")}</td></tr>`,
    )
    .join("");

  const html = `<!DOCTYPE html><html><body style="font-family:system-ui,sans-serif;color:#0D1330;"><h1 style="font-size:18px;">Nouveau brief · site MSK</h1><table>${htmlRows}</table></body></html>`;

  return { text, html };
}

/**
 * Envoi via Resend quand activé.
 * Sinon : reason "disabled" (UI unavailable*).
 * Clé absente / erreur API : reason "provider_error" (UI errorGeneric).
 */
export async function sendContactEmail(
  payload: ContactSendPayload,
): Promise<ContactSendResult> {
  if (!isContactEmailEnabled()) {
    return { ok: false, reason: "disabled" };
  }

  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    console.error("[contact] CONTACT_EMAIL_ENABLED=1 but RESEND_API_KEY is missing");
    return { ok: false, reason: "provider_error" };
  }

  const from = process.env.CONTACT_EMAIL_FROM?.trim() || DEFAULT_FROM;
  const to = process.env.CONTACT_EMAIL_TO?.trim() || DEFAULT_TO;
  const replyTo = payload.email?.trim();
  const subjectName = payload.name?.trim() || "Sans nom";
  const { text, html } = buildEmailBodies(payload);

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to: [to],
      ...(replyTo ? { replyTo: [replyTo] } : {}),
      subject: `[MSK] Brief · ${subjectName}`,
      text,
      html,
    });

    if (error) {
      console.error("[contact] Resend error:", error.name, error.message);
      return { ok: false, reason: "provider_error" };
    }

    return { ok: true };
  } catch (err) {
    console.error("[contact] Resend unexpected error:", err);
    return { ok: false, reason: "provider_error" };
  }
}
