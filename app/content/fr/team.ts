export type TeamMemberCopy = {
  name: string;
  role: string;
};

/** Noms + rôles équipe (source produit / Figma). */
export const team: Record<string, TeamMemberCopy> = {
  "mathieu-diarra": {
    name: "Mathieu Diarra",
    role: "Fondateur",
  },
  "isdalinia-boisseaux": {
    name: "Isdalinia Boisseaux",
    role: "Co-fondatrice",
  },
  "andile-boussari": {
    name: "Andile Boussari",
    role: "Chef de projet",
  },
  "yahe-bah": {
    name: "Yaye Bah",
    role: "Commerciale",
  },
  "amadou-samba-guiro": {
    name: "Amadou Samba Guiro",
    role: "Responsable technique",
  },
  "fatimatou-diallo": {
    name: "Fatimatou Diallo",
    role: "Graphiste",
  },
  "lidaou-espoir-awesso": {
    name: "Lidaou Espoir Awesso",
    role: "Vidéaste & graphiste",
  },
  "ismael-oussi": {
    name: "Ismaël Oussi",
    role: "Lead développeur",
  },
  "djoulede-keita": {
    name: "Djouldé Keita",
    role: "Stagiaire community",
  },
  "eric-golo": {
    name: "Eric Golo",
    role: "Monteur Vidéo",
  },
};
