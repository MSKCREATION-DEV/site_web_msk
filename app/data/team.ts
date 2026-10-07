/**
 * Équipe — grille 5+6. Ordre validé client (écarts vs Figma 2:19) :
 * rangée 1 : Mathieu, Isdalinia, Andile, Ismaël, Amadou
 * rangée 2 : Madina, Issiaka, Lidaou, Fatimatou, Yaye, Djouldé
 */

export type TeamMember = {
  slug: string;
  photoSrc: string;
  /** Clé pour content FR/EN (name + role). */
  contentKey: string;
};

export const teamMembers: TeamMember[] = [
  {
    slug: "mathieu-diarra",
    photoSrc: "/assets/team/mathieu-diarra.png",
    contentKey: "mathieu-diarra",
  },
  {
    slug: "isdalinia-boisseaux",
    photoSrc: "/assets/team/isdalinia-boisseaux.png",
    contentKey: "isdalinia-boisseaux",
  },
  {
    slug: "andile-boussari",
    photoSrc: "/assets/team/andile-boussari.png",
    contentKey: "andile-boussari",
  },
  {
    slug: "ismael-oussi",
    photoSrc: "/assets/team/ismael-oussi.png",
    contentKey: "ismael-oussi",
  },
  {
    slug: "amadou-samba-guiro",
    photoSrc: "/assets/team/amadou-samba-guiro.png",
    contentKey: "amadou-samba-guiro",
  },
  {
    slug: "madina-tall",
    photoSrc: "/assets/team/madina-tall.png",
    contentKey: "madina-tall",
  },
  {
    slug: "issiaka-yacouba-traore",
    photoSrc: "/assets/team/issiaka-yacouba-traore.png",
    contentKey: "issiaka-yacouba-traore",
  },
  {
    slug: "lidaou-espoir-awesso",
    photoSrc: "/assets/team/lidaou-espoir-awesso.png",
    contentKey: "lidaou-espoir-awesso",
  },
  {
    slug: "fatimatou-diallo",
    photoSrc: "/assets/team/fatimatou-diallo.png",
    contentKey: "fatimatou-diallo",
  },
  {
    slug: "yahe-bah",
    photoSrc: "/assets/team/yaye-bah.png",
    contentKey: "yahe-bah",
  },
  {
    slug: "djoulede-keita",
    photoSrc: "/assets/team/djoulede-keita.png",
    contentKey: "djoulede-keita",
  },
];
