/**
 * Équipe — grille home 5+5. Ordre validé client (2026-11-18) :
 * rangée 1 : Mathieu, Isdalinia, Andile, Ismaël, Amadou
 * rangée 2 : Lidaou, Fatimatou, Yaye, Djouldé, Eric
 *
 * `tier` page Équipe (hiérarchie éditoriale, source ERP public) :
 *   founder       → L0 ERP (Mathieu, Isdalinia)
 *   cadre         → L1 + Responsable technique site (Andile, Ismaël, Amadou)
 *   collaborator  → L3–L4 (Espoir, Fatimatou, Yaye, Djouldé, Eric)
 *
 * Grille : fondateurs + cadres + collabs en paires span 6 (pas d’orphelin).
 * Voir docs/design/TEAM_PAGE.md § Niveaux visuels.
 */

/** Niveau éditorial page `/equipe` (pas un titre affiché). */
export type TeamTier = "founder" | "cadre" | "collaborator";

export type TeamMember = {
  slug: string;
  photoSrc: string;
  /** Clé pour content FR/EN (name + role). */
  contentKey: string;
  /**
   * Niveau hiérarchique éditorial (ERP public → UI).
   * Détermine variante de carte + span galerie.
   */
  tier: TeamTier;
};

export const teamMembers: TeamMember[] = [
  {
    slug: "mathieu-diarra",
    photoSrc: "/assets/team/mathieu-diarra.png",
    contentKey: "mathieu-diarra",
    tier: "founder",
  },
  {
    slug: "isdalinia-boisseaux",
    photoSrc: "/assets/team/isdalinia-boisseaux.png",
    contentKey: "isdalinia-boisseaux",
    tier: "founder",
  },
  {
    slug: "andile-boussari",
    photoSrc: "/assets/team/andile-boussari.png",
    contentKey: "andile-boussari",
    tier: "cadre",
  },
  {
    slug: "ismael-oussi",
    photoSrc: "/assets/team/ismael-oussi.png",
    contentKey: "ismael-oussi",
    tier: "cadre",
  },
  {
    slug: "amadou-samba-guiro",
    photoSrc: "/assets/team/amadou-samba-guiro.png",
    contentKey: "amadou-samba-guiro",
    tier: "cadre",
  },
  {
    slug: "lidaou-espoir-awesso",
    photoSrc: "/assets/team/lidaou-espoir-awesso.png",
    contentKey: "lidaou-espoir-awesso",
    tier: "collaborator",
  },
  {
    slug: "fatimatou-diallo",
    photoSrc: "/assets/team/fatimatou-diallo.png",
    contentKey: "fatimatou-diallo",
    tier: "collaborator",
  },
  {
    slug: "yahe-bah",
    photoSrc: "/assets/team/yaye-bah.png",
    contentKey: "yahe-bah",
    tier: "collaborator",
  },
  {
    slug: "djoulede-keita",
    photoSrc: "/assets/team/djoulede-keita.png",
    contentKey: "djoulede-keita",
    tier: "collaborator",
  },
  {
    slug: "eric-golo",
    photoSrc: "/assets/team/eric-golo.png",
    contentKey: "eric-golo",
    tier: "collaborator",
  },
];
