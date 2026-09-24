export const locales = ["fr", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "fr";

export function isLocale(value: unknown): value is Locale {
  return value === "fr" || value === "en";
}

export function parseLocale(value: unknown): Locale {
  if (isLocale(value)) return value;
  return defaultLocale;
}
