/**
 * Équipe — grille home 5+5. Ordre validé client (2026-11-18) :
 * rangée 1 : Mathieu, Isdalinia, Andile, Ismaël, Amadou
 * rangée 2 : Lidaou, Fatimatou, Yaye, Djouldé, Eric
 *
 * `layout` : variante galerie page Équipe (magazine asymétrique).
 */

export type TeamGalleryLayout = "lead" | "feature" | "standard";

export type TeamMember = {
  slug: string;
  photoSrc: string;
  /** Clé pour content FR/EN (name + role). */
  contentKey: string;
  /** Composition galerie page Équipe. */
  layout: TeamGalleryLayout;
};

export const teamMembers: TeamMember[] = [
  {
    slug: "mathieu-diarra",
    photoSrc: "/assets/team/mathieu-diarra.png",
    contentKey: "mathieu-diarra",
    layout: "lead",
  },
  {
    slug: "isdalinia-boisseaux",
    photoSrc: "/assets/team/isdalinia-boisseaux.png",
    contentKey: "isdalinia-boisseaux",
    layout: "lead",
  },
  {
    slug: "andile-boussari",
    photoSrc: "/assets/team/andile-boussari.png",
    contentKey: "andile-boussari",
    layout: "feature",
  },
  {
    slug: "ismael-oussi",
    photoSrc: "/assets/team/ismael-oussi.png",
    contentKey: "ismael-oussi",
    layout: "feature",
  },
  {
    slug: "amadou-samba-guiro",
    photoSrc: "/assets/team/amadou-samba-guiro.png",
    contentKey: "amadou-samba-guiro",
    layout: "feature",
  },
  {
    slug: "lidaou-espoir-awesso",
    photoSrc: "/assets/team/lidaou-espoir-awesso.png",
    contentKey: "lidaou-espoir-awesso",
    layout: "standard",
  },
  {
    slug: "fatimatou-diallo",
    photoSrc: "/assets/team/fatimatou-diallo.png",
    contentKey: "fatimatou-diallo",
    layout: "standard",
  },
  {
    slug: "yahe-bah",
    photoSrc: "/assets/team/yaye-bah.png",
    contentKey: "yahe-bah",
    layout: "standard",
  },
  {
    slug: "djoulede-keita",
    photoSrc: "/assets/team/djoulede-keita.png",
    contentKey: "djoulede-keita",
    layout: "standard",
  },
  {
    slug: "eric-golo",
    photoSrc: "/assets/team/eric-golo.png",
    contentKey: "eric-golo",
    layout: "standard",
  },
];
