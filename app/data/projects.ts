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
    gallery: gallery("prosperity", 9),
    galleryLayout: [
      "full",
      "half",
      "half",
      "half",
      "half",
      "full",
      "half",
      "half",
      "full",
    ],
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
    gallery: gallery("thoy-art", 8),
    galleryLayout: [
      "full",
      "half",
      "half",
      "full",
      "full",
      "full",
      "full",
      "full",
    ],
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
    gallery: gallery("koundji-services", 12),
    galleryLayout: [
      "full",
      "half",
      "half",
      "full",
      "full",
      "full",
      "full",
      "full",
      "full",
      "full",
      "full",
      "full",
    ],
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
    expertises: ["App mobile", "UX/UI", "Logo"],
    inWorksGrid: true,
    hasBeforeAfter: false,
    worksCardHeight: "short",
    cover: { src: "/assets/projects/bomoyi/cover.png" },
    worksCover: { src: "/assets/works/bomoyi/cover.png" },
    gallery: gallery("bomoyi", 8),
    galleryLayout: [
      "full",
      "half",
      "half",
      "full",
      "full",
      "full",
      "full",
      "full",
    ],
    nextSlug: "ecosol",
    filters: ["web", "app"],
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
    gallery: gallery("ecosol", 9),
    galleryLayout: [
      "full",
      "half",
      "half",
      "full",
      "full",
      "half",
      "half",
      "full",
      "full",
    ],
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
    expertises: ["E-commerce", "Identité visuelle", "Logo"],
    inWorksGrid: true,
    hasBeforeAfter: false,
    worksCardHeight: "short",
    cover: { src: "/assets/projects/elvi-creation/cover.png" },
    worksCover: { src: "/assets/works/elvi-creation/cover.png" },
    gallery: gallery("elvi-creation", 10),
    galleryLayout: [
      "full",
      "half",
      "half",
      "full",
      "full",
      "full",
      "full",
      "full",
      "full",
      "full",
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
    gallery: gallery("akwaba", 11),
    galleryLayout: [
      "full",
      "half",
      "half",
      "full",
      "full",
      "full",
      "full",
      "full",
      "full",
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
