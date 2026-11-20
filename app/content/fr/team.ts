export type TeamMemberCopy = {
  name: string;
  role: string;
  /** Phrase courte factuelle dérivée du rôle (pas de bio marketing inventée). */
  focus?: string;
  email?: string;
  service?: string;
};

/** Noms + rôles équipe (source produit / Figma). */
export const team: Record<string, TeamMemberCopy> = {
  "mathieu-diarra": {
    name: "Mathieu Diarra",
    role: "Fondateur",
    focus: "Direction de l'agence et pilotage stratégique des projets.",
  },
  "isdalinia-boisseaux": {
    name: "Isdalinia Boisseaux",
    role: "Co-fondatrice",
    focus: "Co-direction et coordination des livrables client.",
  },
  "andile-boussari": {
    name: "Andile Boussari",
    role: "Chef de projet",
    focus: "Suivi de planning, brief et relation client au quotidien.",
  },
  "yahe-bah": {
    name: "Yaye Bah",
    role: "Commerciale",
    focus: "Développement commercial et qualification des briefs.",
  },
  "amadou-samba-guiro": {
    name: "Amadou Samba Guiro",
    role: "Responsable technique",
    focus: "Architecture technique et qualité des livrables code.",
  },
  "fatimatou-diallo": {
    name: "Fatimatou Diallo",
    role: "Graphiste",
    focus: "Identité visuelle, supports print et assets digitaux.",
  },
  "lidaou-espoir-awesso": {
    name: "Lidaou Espoir Awesso",
    role: "Vidéaste & graphiste",
    focus: "Production vidéo et création graphique associée.",
  },
  "ismael-oussi": {
    name: "Ismaël Oussi",
    role: "Lead développeur",
    focus: "Développement front et back des sites et applications.",
  },
  "djoulede-keita": {
    name: "Djouldé Keita",
    role: "Stagiaire community",
    focus: "Animation et publication sur les réseaux sociaux.",
  },
  "eric-golo": {
    name: "Eric Golo",
    role: "Monteur Vidéo",
    focus: "Montage et finalisation des contenus vidéo.",
    email: "e.golo@mskcreation.net",
    service: "Communication & Marketing",
  },
};
