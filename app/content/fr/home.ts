import type { HomeContent } from "../types";

/**
 * Meta / hero FR.
 * rotatingWords + titleBefore/After : coller le texte exact Figma « 02 Hero »
 * (MCP bloqué — ne pas inventer de pitch).
 */
export const home: HomeContent = {
  meta: {
    title: "MSK Création",
    description: "MSK Création",
  },
  brandName: "MSK Création",
  hero: {
    slides: [
      {
        src: "/assets/hero/slide-01.png",
        alt: "MSK Création — visuel hero 1",
      },
      {
        src: "/assets/hero/slide-02.png",
        alt: "MSK Création — visuel hero 2",
      },
    ],
    titleBefore: "",
    rotatingWords: [],
    titleAfter: "",
    rotateMs: 3000,
    ctaStart: "Démarrer",
  },
};
