/** Types / constantes Contact partagés client + serveur (pas de .server). */

export const CONTACT_HONEYPOT_NAME = "website";

export type ContactActionResult =
  | { ok: true }
  | {
      ok: false;
      code: "validation" | "unavailable" | "error" | "rate_limited";
      fieldErrors?: Record<string, string>;
    };
