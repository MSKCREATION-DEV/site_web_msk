/**
 * Validation formulaire Contact — client + action serveur (Resend).
 * Ne pas inventer d’options Service/Budget (Q03).
 */

export type ContactFieldDef = {
  name: string;
  type?: string;
  required?: boolean;
};

export type ContactValidationMessages = {
  errorRequired: string;
  errorEmail: string;
};

export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function validateContactFields(
  fields: ContactFieldDef[],
  values: Record<string, string>,
  messages: ContactValidationMessages,
): Record<string, string> {
  const errors: Record<string, string> = {};

  for (const field of fields) {
    const value = (values[field.name] ?? "").trim();
    if (field.required && !value) {
      errors[field.name] = messages.errorRequired;
      continue;
    }
    if (field.type === "email" && value && !isValidEmail(value)) {
      errors[field.name] = messages.errorEmail;
    }
  }

  return errors;
}

/** Payload normalisé pour l’action serveur / Resend. */
export function normalizeContactPayload(
  fields: ContactFieldDef[],
  values: Record<string, string>,
): Record<string, string> {
  const payload: Record<string, string> = {};
  for (const field of fields) {
    payload[field.name] = (values[field.name] ?? "").trim();
  }
  return payload;
}
