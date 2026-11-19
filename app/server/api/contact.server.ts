/**
 * Provider e-mail contact — stub jusqu’à Q23.
 * Ne pas appeler d’API réelle tant que CONTACT_EMAIL_ENABLED !== "1"
 * et qu’un provider n’est pas validé (voir docs/design/CONTACT_BACKEND.md).
 */

export type ContactSendPayload = Record<string, string>;

export type ContactSendResult =
  | { ok: true }
  | { ok: false; reason: "disabled" | "provider_error" };

/**
 * True seulement si l’humain a explicitement activé l’envoi
 * (après choix provider + clés env).
 */
export function isContactEmailEnabled(): boolean {
  return process.env.CONTACT_EMAIL_ENABLED === "1";
}

/**
 * Envoi réel : branché plus tard (Resend / Postmark / SMTP).
 * Aujourd’hui : toujours désactivé → reason "disabled".
 */
export async function sendContactEmail(
  _payload: ContactSendPayload,
): Promise<ContactSendResult> {
  if (!isContactEmailEnabled()) {
    return { ok: false, reason: "disabled" };
  }

  // Q23 : brancher le provider ici (ex. Resend).
  // Sans implémentation : ne jamais prétendre un succès.
  return { ok: false, reason: "provider_error" };
}
