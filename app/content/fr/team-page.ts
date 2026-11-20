import type { TeamPageContent } from "../types";

/**
 * Page équipe dédiée — magazine de talents (2026-11-20).
 * Hors one-page Figma ; direction dans docs/design/TEAM_PAGE.md.
 */
export const teamPage: TeamPageContent = {
  meta: {
    title: "Équipe | MSK Création",
    description:
      "Derrière chaque idée, des talents. Les 10 experts MSK Création à Bamako : stratégie, design, vidéo, développement et community.",
  },
  eyebrow: "Talents MSK",
  titleBefore: "Derrière chaque idée,",
  titleAccent: "des talents…",
  intro:
    "Dix visages, une même exigence. Stratégie, design, technique et contenus réunis sous le même toit à Bamako. Zéro sous-traitance.",
  collectif: {
    eyebrow: "Le collectif",
    title: "Une agence, plusieurs métiers, une seule ligne.",
    body: "Formés entre la France, le Maroc, le Mali, le Sénégal et le Togo, nous travaillons côte à côte. Ce que vous briefez ici est conçu, produit et livré par les personnes que vous croisez sur cette page.",
  },
  gallery: {
    eyebrow: "Portraits",
    title: "Le magazine des talents",
    inviteHint: "Survolez ou touchez pour lire le portrait",
  },
  poles: {
    eyebrow: "Complémentarité",
    title: "Quatre pôles, un même projet.",
    items: [
      {
        label: "Direction & projets",
        description:
          "Vision, arbitrages et pilotage du brief jusqu’à la livraison.",
      },
      {
        label: "Design & image",
        description:
          "Identités, supports et direction visuelle au service de la marque.",
      },
      {
        label: "Technique",
        description:
          "Sites, apps et architectures propres, documentées, évolutives.",
      },
      {
        label: "Contenu & croissance",
        description:
          "Vidéo, community et développement commercial au rythme du terrain.",
      },
    ],
  },
  closing: {
    title: "Votre prochain projet a déjà une équipe.",
    body: "Parlez-nous du brief. Les talents ci-dessus sont ceux qui le prendront en main.",
    ctaLabel: "Briefer un projet",
  },
  presentationLabel: "Présentation",
  expertiseLabel: "Expertise",
  contributionLabel: "Contribution",
  impactLabel: "Impact",
  emailLabel: "Email",
  serviceLabel: "Pôle",
  focusLabel: "Ce qu'ils font",
  backHomeLabel: "Retour à l'accueil",
  flipRevealLabel: "Lire le portrait",
  flipHideLabel: "Revenir à la photo",
};
