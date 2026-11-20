import type { TeamMemberCopy } from "../fr/team";

/**
 * Same people as FR. Roles and portraits translated from FR labels.
 * Sources: site rôles + ERP org publics (docs/design/TEAM_PAGE.md).
 */
export const team: Record<string, TeamMemberCopy> = {
  "mathieu-diarra": {
    name: "Mathieu Diarra",
    role: "Founder",
    focus: "Agency leadership and strategic project steering.",
    presentation:
      "Carries the MSK Creation vision and aligns every project with client ambitions.",
    expertise: "Strategic steering, agency leadership, business decisions.",
    contribution:
      "Sets priorities, secures commitments and brand coherence.",
    impact: "An agency that moves without outsourcing, with a clear line.",
    signature: "Vision first. Execution next.",
  },
  "isdalinia-boisseaux": {
    name: "Isdalinia Boisseaux",
    role: "Co-founder",
    focus: "Co-leadership and client delivery coordination.",
    presentation:
      "Co-leads the agency and guards delivery quality day to day.",
    expertise: "Coordination, craft standards, client relationship.",
    contribution: "Connects creative intent with concrete delivery.",
    impact: "Projects that hold, details that matter.",
    signature: "Quality lives in the details.",
  },
  "andile-boussari": {
    name: "Andile Boussari",
    role: "Project lead",
    focus: "Scheduling, briefs and day-to-day client liaison.",
    presentation:
      "Orchestrates briefs, schedules and exchanges so every step moves.",
    expertise: "Project management, client follow-up, cross-practice coordination.",
    contribution: "Turns a brief into a clear roadmap.",
    impact: "Less friction, more clarity for teams and clients.",
    signature: "Projects move when everyone knows the path.",
  },
  "yahe-bah": {
    name: "Yaye Bah",
    role: "Sales",
    focus: "Business development and brief qualification.",
    presentation:
      "Grows the pipeline and qualifies needs from the first conversation.",
    expertise: "Prospecting, brief qualification, commercial relationship.",
    contribution: "Brings the right projects into the MSK pipeline.",
    impact: "Useful commercial conversations, without noise.",
    signature: "Listen first. Propose next.",
  },
  "amadou-samba-guiro": {
    name: "Amadou Samba Guiro",
    role: "Technical lead",
    focus: "Technical architecture and code delivery quality.",
    presentation:
      "Guarantees architecture and solidity of technical deliveries.",
    expertise: "Web architecture, quality standards, knowledge transfer.",
    contribution: "Sets foundations so code stays clean and take-over ready.",
    impact: "A clear, documented stack with no blind spots.",
    signature: "Engineering in service of the product.",
  },
  "fatimatou-diallo": {
    name: "Fatimatou Diallo",
    role: "Graphic designer",
    focus: "Visual identity, print and digital assets.",
    presentation:
      "Shapes the identity and assets that embody each brand.",
    expertise: "Visual identity, print, digital assets.",
    contribution: "Turns strategy into form, color and composition.",
    impact: "A coherent brand image across every support.",
    signature: "Every pixel counts.",
  },
  "lidaou-espoir-awesso": {
    name: "Lidaou Espoir Awesso",
    role: "Videographer & graphic designer",
    focus: "Video production and related graphic design.",
    presentation:
      "Produces motion imagery and the graphic assets that go with it.",
    expertise:
      "Video, editing, visual creation · Communication & Marketing practice.",
    contribution: "Gives brand stories a strong visual presence.",
    impact: "Content that sticks and spreads.",
    signature: "The image that carries the message.",
  },
  "ismael-oussi": {
    name: "Ismaël Oussi",
    role: "Lead developer",
    focus: "Front-end and back-end development for sites and apps.",
    presentation:
      "Builds and structures the sites and applications MSK ships.",
    expertise: "Front-end and back-end development, technical quality.",
    contribution:
      "Turns designs into robust, maintainable products.",
    impact: "Stable digital experiences, ready to evolve.",
    signature: "Code that holds the road.",
  },
  "djoulede-keita": {
    name: "Djouldé Keita",
    role: "Community intern",
    focus: "Social media publishing and community animation.",
    presentation: "Animates MSK and client presence on social channels.",
    expertise: "Publishing, community animation, editorial rhythm.",
    contribution: "Keeps the link between brand and audience alive.",
    impact: "A regular, readable, aligned presence.",
    signature: "Community grows post by post.",
  },
  "eric-golo": {
    name: "Eric Golo",
    role: "Video editor",
    focus: "Editing and finishing video content.",
    email: "e.golo@mskcreation.net",
    service: "Communication & Marketing",
    presentation: "Finishes edits so content is ready to publish.",
    expertise: "Editing, pacing, video finishing.",
    contribution: "Refines every sequence through to the final cut.",
    impact: "Clean, fluid videos ready for distribution.",
    signature: "Rhythm makes the story.",
  },
};
