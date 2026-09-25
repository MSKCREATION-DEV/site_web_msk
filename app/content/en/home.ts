import type { HomeContent } from "../types";

export const home: HomeContent = {
  meta: {
    title: "MSK Creation",
    description:
      "Digital agency in Bamako, ACI 2000 — also in Lomé and Lyon.",
  },
  brandName: "MSK Creation",
  hero: {
    slides: [
      {
        src: "/assets/hero/slide-01.png",
        alt: "MSK Creation — hero visual 1",
      },
      {
        src: "/assets/hero/slide-02.png",
        alt: "MSK Creation — hero visual 2",
      },
    ],
    titleLine1: "We create",
    rotatingWords: [
      "websites",
      "mobile apps",
      "branding",
      "campaigns",
      "solutions",
    ],
    titleLine3: "that convert.",
    subtitle:
      "Digital agency in Bamako, ACI 2000 — also present in Lomé and Lyon. Brand image, digital presence and growth — no outsourcing, by a team of 10 experts trained in France, Morocco and Mali.",
    tickerItems: [
      "Websites",
      "Mobile apps",
      "Branding",
      "E-commerce",
      "Visual identity",
      "UX/UI design",
      "Digital marketing",
      "Solutions",
    ],
    rotateMs: 3000,
  },
};
