/**
 * Action Contact home — rate-limit IP, honeypot, validation, stub provider.
 * Retourne des codes stables pour l’UI (messages depuis content).
 */

import { getLocaleContent } from "~/content";
import type { Locale } from "~/i18n";
import {
  CONTACT_HONEYPOT_NAME,
  type ContactActionResult,
} from "~/lib/contact/types";
import {
  normalizeContactPayload,
  validateContactFields,
} from "~/lib/validation";
import { sendContactEmail } from "~/server/api/contact.server";
import {
  clientIpFromRequest,
  consumeRateLimit,
} from "~/server/site/rate-limit.server";

export type { ContactActionResult };

export async function handleContactAction(
  locale: Locale,
  formData: FormData,
  request: Request,
): Promise<ContactActionResult> {
  const content = getLocaleContent(locale);
  const fields = content.home.contactSection.fields;

  const ip = clientIpFromRequest(request);
  const limit = consumeRateLimit("contact", ip);
  if (!limit.ok) {
    return { ok: false, code: "rate_limited" };
  }

  // Honeypot : bots remplissent souvent les champs cachés.
  const honeypot = String(formData.get(CONTACT_HONEYPOT_NAME) ?? "").trim();
  if (honeypot) {
    // Réponse neutre (pas d’indice) — pas d’envoi.
    return { ok: false, code: "unavailable" };
  }

  const values: Record<string, string> = {};
  for (const field of fields) {
    values[field.name] = String(formData.get(field.name) ?? "");
  }

  const fieldErrors = validateContactFields(fields, values, {
    errorRequired: content.home.contactSection.errorRequired,
    errorEmail: content.home.contactSection.errorEmail,
  });

  if (Object.keys(fieldErrors).length > 0) {
    return { ok: false, code: "validation", fieldErrors };
  }

  const payload = normalizeContactPayload(fields, values);
  const result = await sendContactEmail(payload);

  if (result.ok) {
    return { ok: true };
  }

  if (result.reason === "disabled") {
    return { ok: false, code: "unavailable" };
  }

  return { ok: false, code: "error" };
}
