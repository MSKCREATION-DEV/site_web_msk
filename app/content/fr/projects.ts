import type { LocaleContent } from "../types";

export const projectSheet: LocaleContent["projectSheet"] = {
  expertiseLabel: "Expertise",
  beforeAfterEyebrow: "AVANT / APRÈS",
  closeLabel: "Fermer",
  nextLabel: "Suivant",
  backToWorksLabel: "Retour aux travaux",
};

/**
 * Titres = cartes Figma Travaux.
 * Descriptions fiches : Koundji depuis design context ; autres = PENDING copy Figma fiche.
 */
export const projects: LocaleContent["projects"] = {
  "koundji-services": {
    title: "Koundji Services",
    description:
      "Transformation complète de l’image de marque : site web moderne, nouvelle identité graphique, charte et logos pour cette agence immobilière de Bamako.",
  },
  "thoy-art": {
    title: "Thòy ’Art",
    description: "",
  },
  ecosol: {
    title: "Ecosol",
    description: "",
  },
  bomoyi: {
    title: "Bomoyi",
    description: "",
  },
  akwaba: {
    title: "Akwaba",
    description: "",
  },
  "elvi-creation": {
    title: "Elvi Creation",
    description: "",
  },
};
