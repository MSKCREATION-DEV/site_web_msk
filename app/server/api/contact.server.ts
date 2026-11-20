/**
 * Provider e-mail contact — Resend (Q23).
 * Envoi réel seulement si CONTACT_EMAIL_ENABLED=1 + RESEND_API_KEY.
 * Pas de clé dans le bundle client (.server.ts uniquement).
 */

import { Resend } from "resend";
import { buildContactBriefEmail } from "~/server/email/contact-brief-email";

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

/**
 * Envoi via Resend quand activé.
 * Sinon : reason "disabled" (UI unavailable*).
 * Clé absente / erreur API : reason "provider_error" (UI errorGeneric).
 */
export async function sendContactEmail(
  payload: ContactSendPayload,
  request?: Request,
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
  const { subject, text, html } = buildContactBriefEmail(payload, request);

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to: [to],
      ...(replyTo ? { replyTo: [replyTo] } : {}),
      subject,
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
