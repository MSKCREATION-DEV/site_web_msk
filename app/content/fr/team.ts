export type TeamMemberCopy = {
  name: string;
  role: string;
};

/** Noms + rôles = Figma « 05 - Équipe » (screenshot 2026-09-25). */
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
    role: "Responsable opérations",
  },
  "yahe-bah": {
    name: "Yahe Bah",
    role: "Commerciale",
  },
  "amadou-samba-guiro": {
    name: "Amadou Samba Guiro",
    role: "Lead développeur",
  },
  "fatimatou-diallo": {
    name: "Fatimatou Diallo",
    role: "Graphiste",
  },
  "lidaou-espoir-awesso": {
    name: "Lidaou Espoir Awesso",
    role: "Vidéaste & graphiste",
  },
  "assetou-mangara": {
    name: "Assetou Mangara",
    role: "Community manager",
  },
  "madina-tall": {
    name: "Madina Tall",
    role: "Assistante de direction",
  },
  "issiaka-yacouba-traore": {
    name: "Issiaka Yacouba Traoré",
    role: "Comptable",
  },
};
