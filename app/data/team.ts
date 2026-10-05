/**
 * Équipe — ordre Figma `05 · Équipe` (2:19) : rangée 1 (5) puis rangée 2 (6).
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
    slug: "yahe-bah",
    photoSrc: "/assets/team/yaye-bah.png",
    contentKey: "yahe-bah",
  },
  {
    slug: "amadou-samba-guiro",
    photoSrc: "/assets/team/amadou-samba-guiro.png",
    contentKey: "amadou-samba-guiro",
  },
  {
    slug: "fatimatou-diallo",
    photoSrc: "/assets/team/fatimatou-diallo.png",
    contentKey: "fatimatou-diallo",
  },
  {
    slug: "lidaou-espoir-awesso",
    photoSrc: "/assets/team/lidaou-espoir-awesso.png",
    contentKey: "lidaou-espoir-awesso",
  },
  {
    slug: "ismael-oussi",
    photoSrc: "/assets/team/ismael-oussi.png",
    contentKey: "ismael-oussi",
  },
  {
    slug: "djoulede-keita",
    photoSrc: "/assets/team/djoulede-keita.png",
    contentKey: "djoulede-keita",
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
];
