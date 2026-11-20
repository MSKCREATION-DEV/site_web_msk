/**
 * Messages ErrorBoundary — génériques, pas de copy marketing Figma.
 * Alignés sur la locale de l’URL (`/:lang`).
 */

import type { Locale } from "./locales";

export type ErrorMessages = {
  title: string;
  unexpected: string;
  notFound: string;
  notFoundEyebrow: string;
  notFoundTitle: string;
  notFoundBody: string;
  homeCta: string;
  contactCta: string;
};

const MESSAGES: Record<Locale, ErrorMessages> = {
  fr: {
    title: "Erreur",
    unexpected: "Une erreur inattendue s’est produite.",
    notFound: "La page demandée est introuvable.",
    notFoundEyebrow: "404",
    notFoundTitle: "Page introuvable",
    notFoundBody:
      "Cette adresse n’existe pas ou a été déplacée. Revenez à l’accueil ou contactez l’équipe MSK.",
    homeCta: "Retour à l’accueil",
    contactCta: "Nous contacter",
  },
  en: {
    title: "Error",
    unexpected: "An unexpected error occurred.",
    notFound: "The requested page could not be found.",
    notFoundEyebrow: "404",
    notFoundTitle: "Page not found",
    notFoundBody:
      "This address does not exist or has moved. Head home or get in touch with the MSK team.",
    homeCta: "Back to home",
    contactCta: "Contact us",
  },
};

export function errorMessages(locale: Locale): ErrorMessages {
  return MESSAGES[locale];
}
