import type { TeamPageContent } from "../types";

/**
 * Dedicated team page — talent magazine (2026-11-20).
 * Outside one-page Figma; direction in docs/design/TEAM_PAGE.md.
 */
export const teamPage: TeamPageContent = {
  meta: {
    title: "Team | MSK Creation",
    description:
      "Behind every idea, talents. The 10 MSK Creation experts in Bamako: strategy, design, video, development and community.",
  },
  eyebrow: "MSK talents",
  titleBefore: "Behind every idea,",
  titleAccent: "talents…",
  intro:
    "Ten faces, one standard. Strategy, design, engineering and content under the same roof in Bamako. Zero outsourcing.",
  collectif: {
    eyebrow: "The collective",
    title: "One agency, many crafts, a single line.",
    body: "Trained across France, Morocco, Mali, Senegal and Togo, we work side by side. What you brief here is designed, produced and shipped by the people on this page.",
  },
  gallery: {
    eyebrow: "Portraits",
    title: "A magazine of talents",
    inviteHint: "Hover or tap to read the portrait",
  },
  poles: {
    eyebrow: "Complementarity",
    title: "Four practices, one project.",
    items: [
      {
        label: "Direction & projects",
        description:
          "Vision, decisions and steering from brief to delivery.",
      },
      {
        label: "Design & image",
        description:
          "Identities, assets and visual direction for the brand.",
      },
      {
        label: "Engineering",
        description:
          "Sites, apps and clean architectures built to evolve.",
      },
      {
        label: "Content & growth",
        description:
          "Video, community and commercial development on the ground.",
      },
    ],
  },
  closing: {
    title: "Your next project already has a team.",
    body: "Tell us about the brief. The talents above are the ones who will own it.",
    ctaLabel: "Brief a project",
  },
  presentationLabel: "About",
  expertiseLabel: "Expertise",
  contributionLabel: "Contribution",
  impactLabel: "Impact",
  emailLabel: "Email",
  serviceLabel: "Practice",
  focusLabel: "What they do",
  backHomeLabel: "Back to home",
  flipRevealLabel: "Read portrait",
  flipHideLabel: "Back to photo",
};
