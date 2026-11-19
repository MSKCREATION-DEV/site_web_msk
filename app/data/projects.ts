/**
 * Projets structurés (locale-agnostic).
 * Deck Travaux 7 — audit Figma 2026-10-04 (FIGMA_PROMPT_WORKS_7).
 */

export type ProjectAsset = {
  src: string;
  altKey?: string;
};

export type ProjectFilter = "web" | "branding" | "app";

export type ProjectCardHeight = "short" | "tall";

/** Slot galerie Figma : pleine largeur 1216 ou demi 598 (paires). */
export type GallerySlot = "full" | "half";

/** Panneau droit carte / ouverture fiche — couleurs Figma par projet. */
export type ProjectPanelStyle = {
  background: string;
  yearColor: string;
  titleColor: string;
  titleGradient?: string;
  tagsColor: string;
  ctaBorderColor: string;
};

export type Project = {
  slug: string;
  year: string;
  panel: ProjectPanelStyle;
  /** @deprecated alias panel for loaders that still expect accentColor */
  accentColor?: string;
  expertises: string[];
  inWorksGrid: boolean;
  hasBeforeAfter: boolean;
  worksCardHeight: ProjectCardHeight;
  cover: ProjectAsset;
  worksCover: ProjectAsset;
  gallery: ProjectAsset[];
  /** Layout Figma par index galerie (full | half). */
  galleryLayout: GallerySlot[];
  before?: ProjectAsset;
  after?: ProjectAsset;
  nextSlug: string | null;
  filters: ProjectFilter[];
};

function gallery(slug: string, count: number): ProjectAsset[] {
  return Array.from({ length: count }, (_, i) => ({
    src: `/assets/projects/${slug}/gallery-${String(i + 1).padStart(2, "0")}.png`,
  }));
}

/**
 * Ordre = deck Travaux + chaîne Suivant fiches (audit Figma).
 */
export const projects: Project[] = [
  {
    slug: "prosperity",
    year: "2026",
    panel: {
      background: "linear-gradient(180deg, #24356A 0%, #0E132E 100%)",
      yearColor: "#D9B76A",
      titleColor: "#D9B76A",
      titleGradient:
        "linear-gradient(90deg, #B8893B 0%, #F3DA94 35%, #C9A04F 70%, #8C6A2E 100%)",
      tagsColor: "#D9B76A",
      ctaBorderColor: "#D9B76A",
    },
    accentColor: "#24356A",
    expertises: [
      "Identité visuelle",
      "Charte graphique",
      "Architecture de marque",
    ],
    inWorksGrid: true,
    hasBeforeAfter: false,
    worksCardHeight: "short",
    cover: { src: "/assets/projects/prosperity/cover.png" },
    worksCover: { src: "/assets/works/prosperity/cover.png" },
    /** Figma fiche 618:1298 : 6 images full 1216 (Q24). */
    gallery: gallery("prosperity", 6),
    galleryLayout: ["full", "full", "full", "full", "full", "full"],
    nextSlug: "thoy-art",
    filters: ["web", "branding"],
  },
  {
    slug: "thoy-art",
    year: "2026",
    panel: {
      background: "#D10300",
      yearColor: "#FFFFFF",
      titleColor: "#FFFFFF",
      tagsColor: "#FFFFFF",
      ctaBorderColor: "#FFFFFF",
    },
    accentColor: "#D10300",
    expertises: ["Site web", "App mobile", "Branding"],
    inWorksGrid: true,
    hasBeforeAfter: false,
    worksCardHeight: "short",
    cover: { src: "/assets/projects/thoy-art/cover.png" },
    worksCover: { src: "/assets/works/thoy-art/cover.png" },
    /** Figma fiche 244:631 : Conran A · Conran B · banner rue (Q24). */
    gallery: gallery("thoy-art", 3),
    galleryLayout: ["full", "full", "full"],
    nextSlug: "koundji-services",
    filters: ["web", "app", "branding"],
  },
  {
    slug: "koundji-services",
    year: "2026",
    panel: {
      background: "#0D1B4B",
      yearColor: "#E8860A",
      titleColor: "#FFFFFF",
      tagsColor: "#FFFFFF",
      ctaBorderColor: "#E8860A",
    },
    accentColor: "#0D1B4B",
    expertises: ["Site web", "Branding", "Logo"],
    inWorksGrid: true,
    hasBeforeAfter: true,
    worksCardHeight: "short",
    cover: { src: "/assets/projects/koundji-services/cover.png" },
    worksCover: { src: "/assets/works/koundji-services/cover.png" },
    /** Branding 3 + UI site mockups browser 2 (Q26). */
    gallery: gallery("koundji-services", 5),
    galleryLayout: ["full", "full", "full", "full", "full"],
    before: { src: "/assets/projects/koundji-services/before.png" },
    after: { src: "/assets/projects/koundji-services/after.png" },
    nextSlug: "bomoyi",
    filters: ["web", "branding"],
  },
  {
    slug: "bomoyi",
    year: "2026",
    panel: {
      background: "#0D685B",
      yearColor: "#FFFFFF",
      titleColor: "#FFFFFF",
      tagsColor: "#FFFFFF",
      ctaBorderColor: "#FFFFFF",
    },
    accentColor: "#0D685B",
    expertises: ["Site web", "UX/UI", "Communication"],
    inWorksGrid: true,
    hasBeforeAfter: false,
    worksCardHeight: "short",
    cover: { src: "/assets/projects/bomoyi/cover.png" },
    worksCover: { src: "/assets/works/bomoyi/cover.png" },
    /** Figma 244:826 : Conran A/B + groupe + half/half + enseigne. */
    gallery: gallery("bomoyi", 6),
    galleryLayout: ["full", "full", "full", "half", "half", "full"],
    nextSlug: "ecosol",
    filters: ["web", "branding"],
  },
  {
    slug: "ecosol",
    year: "2026",
    panel: {
      background: "#1B75BC",
      yearColor: "#FFFFFF",
      titleColor: "#FFFFFF",
      tagsColor: "#FFFFFF",
      ctaBorderColor: "#FFFFFF",
    },
    accentColor: "#1B75BC",
    expertises: ["Branding", "Logo", "Identité visuelle"],
    inWorksGrid: true,
    hasBeforeAfter: false,
    worksCardHeight: "short",
    cover: { src: "/assets/projects/ecosol/cover.png" },
    worksCover: { src: "/assets/works/ecosol/cover.png" },
    /** Figma 244:891 : Conran A/B + pick-up + half/half + enseigne. */
    gallery: gallery("ecosol", 6),
    galleryLayout: ["full", "full", "full", "half", "half", "full"],
    nextSlug: "elvi-creation",
    filters: ["branding"],
  },
  {
    slug: "elvi-creation",
    year: "2025",
    panel: {
      background: "#0A0A0A",
      yearColor: "#D4B66A",
      titleColor: "#D4B66A",
      tagsColor: "#D4B66A",
      ctaBorderColor: "#D4B66A",
    },
    accentColor: "#0A0A0A",
    expertises: ["E-commerce", "Identité visuelle", "Packaging"],
    inWorksGrid: true,
    hasBeforeAfter: false,
    worksCardHeight: "short",
    cover: { src: "/assets/projects/elvi-creation/cover.png" },
    worksCover: { src: "/assets/works/elvi-creation/cover.png" },
    /** Branding 6 + UI e-commerce : 5 browser + 2 mobile half (Q26). */
    gallery: gallery("elvi-creation", 13),
    galleryLayout: [
      "full",
      "full",
      "full",
      "full",
      "full",
      "full",
      "full",
      "full",
      "full",
      "full",
      "full",
      "half",
      "half",
    ],
    nextSlug: "akwaba",
    filters: ["web", "branding"],
  },
  {
    slug: "akwaba",
    year: "2026",
    panel: {
      background: "#0A0E1A",
      yearColor: "#DDB850",
      titleColor: "#FFFFFF",
      tagsColor: "#FFFFFF",
      ctaBorderColor: "#DDB850",
    },
    accentColor: "#0A0E1A",
    expertises: ["Site web", "Charte graphique", "Logo"],
    inWorksGrid: true,
    hasBeforeAfter: false,
    worksCardHeight: "short",
    cover: { src: "/assets/projects/akwaba/cover.png" },
    worksCover: { src: "/assets/works/akwaba/cover.png" },
    /** Branding 5 + UI site : 2 mobile half + 2 browser (Q26). */
    gallery: gallery("akwaba", 9),
    galleryLayout: [
      "full",
      "full",
      "full",
      "full",
      "full",
      "half",
      "half",
      "full",
      "full",
    ],
    nextSlug: "prosperity",
    filters: ["web", "branding"],
  },
];

export function getWorksGridProjects(): Project[] {
  return projects.filter((project) => project.inWorksGrid);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return getWorksGridProjects().find((project) => project.slug === slug);
}

export function getProjectIndex(slug: string): number {
  return getWorksGridProjects().findIndex((project) => project.slug === slug);
}
