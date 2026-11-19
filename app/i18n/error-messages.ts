/**
 * Messages ErrorBoundary — génériques, pas de copy marketing Figma.
 * Alignés sur la locale de l’URL (`/:lang`).
 */

import type { Locale } from "./locales";

export type ErrorMessages = {
  title: string;
  unexpected: string;
  notFound: string;
};

const MESSAGES: Record<Locale, ErrorMessages> = {
  fr: {
    title: "Erreur",
    unexpected: "Une erreur inattendue s’est produite.",
    notFound: "La page demandée est introuvable.",
  },
  en: {
    title: "Error",
    unexpected: "An unexpected error occurred.",
    notFound: "The requested page could not be found.",
  },
};

export function errorMessages(locale: Locale): ErrorMessages {
  return MESSAGES[locale];
}
