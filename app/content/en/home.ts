import type { HomeContent } from "../types";

export const home: HomeContent = {
  meta: {
    title: "MSK Creation",
    description: "MSK Creation",
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
    titleBefore: "",
    rotatingWords: [],
    titleAfter: "",
    rotateMs: 3000,
    ctaStart: "Start",
  },
};
