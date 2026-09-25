import type { HomeContent } from "../types";

/** Copy Hero = captures Figma « 02 - Hero » (2026-09-25). */
export const home: HomeContent = {
  meta: {
    title: "MSK Création",
    description:
      "Agence digitale à Bamako, ACI 2000 — présente aussi à Lomé et Lyon.",
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
    titleLine1: "Nous créons",
    rotatingWords: [
      "sites web",
      "apps mobile",
      "branding",
      "campagnes",
      "solutions",
    ],
    titleLine3: "qui convertissent.",
    subtitle:
      "Agence digitale à Bamako, ACI 2000 — présente aussi à Lomé et Lyon. Image de marque, présence digitale et croissance — sans sous-traitance, par une équipe de 10 experts formés en France, au Maroc et au Mali.",
    tickerItems: [
      "Sites web",
      "Apps mobile",
      "Branding",
      "E-commerce",
      "Identité visuelle",
      "UX/UI design",
      "Marketing digital",
      "Solutions",
    ],
    rotateMs: 3000,
  },
};
