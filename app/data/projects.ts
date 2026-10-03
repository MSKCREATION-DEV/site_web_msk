/**
 * Projets structurés (locale-agnostic).
 * Grille V1 = APERÇU Travaux Figma.
 * Comptes galerie = inventaire Figma AI 2026-09-25 (PNG 2× à re-exporter).
 */

export type ProjectAsset = {
  src: string;
  altKey?: string;
};

export type ProjectFilter = "web" | "branding" | "app";

export type ProjectCardHeight = "short" | "tall";

export type Project = {
  slug: string;
  year: string;
  /** Couleur hover titre carte (hors collection MSK, audit Figma). */
  accentColor?: string;
  expertises: string[];
  inWorksGrid: boolean;
  hasBeforeAfter: boolean;
  worksCardHeight: ProjectCardHeight;
  cover: ProjectAsset;
  worksCover: ProjectAsset;
  gallery: ProjectAsset[];
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
 * Ordre tableau = chaîne Suivant fiches.
 * Colonnes grille : voir WorksSection LEFT/RIGHT_COLUMN_SLUGS.
 */
export const projects: Project[] = [
  {
    slug: "koundji-services",
    year: "2025",
    accentColor: "#E87B1A",
    expertises: ["Site Web", "Branding", "Logo"],
    inWorksGrid: true,
    hasBeforeAfter: true,
    worksCardHeight: "short",
    cover: { src: "/assets/projects/koundji-services/cover.png" },
    worksCover: { src: "/assets/works/koundji-services/cover.png" },
    gallery: gallery("koundji-services", 8),
    before: { src: "/assets/projects/koundji-services/before.png" },
    after: { src: "/assets/projects/koundji-services/after.png" },
    nextSlug: "thoy-art",
    filters: ["web", "branding"],
  },
  {
    slug: "thoy-art",
    year: "2024",
    accentColor: "#CC2200",
    expertises: ["Site Web", "App Mobile", "Branding"],
    inWorksGrid: true,
    hasBeforeAfter: false,
    worksCardHeight: "short",
    cover: { src: "/assets/projects/thoy-art/cover.png" },
    worksCover: { src: "/assets/works/thoy-art/cover.png" },
    gallery: gallery("thoy-art", 5),
    nextSlug: "ecosol",
    filters: ["web", "app", "branding"],
  },
  {
    slug: "ecosol",
    year: "2025",
    accentColor: "#F0A020",
    expertises: ["Branding", "Logo", "Identité visuelle"],
    inWorksGrid: true,
    hasBeforeAfter: false,
    worksCardHeight: "short",
    cover: { src: "/assets/projects/ecosol/cover.png" },
    worksCover: { src: "/assets/works/ecosol/cover.png" },
    gallery: gallery("ecosol", 5),
    nextSlug: "bomoyi",
    filters: ["branding"],
  },
  {
    slug: "bomoyi",
    year: "2025",
    /* Charte v3 — bleu de référence (ancien Figma #137DC5) */
    accentColor: "#1D73BC",
    expertises: ["App Mobile", "UX/UI"],
    inWorksGrid: true,
    hasBeforeAfter: false,
    worksCardHeight: "short",
    cover: { src: "/assets/projects/bomoyi/cover.png" },
    worksCover: { src: "/assets/works/bomoyi/cover.png" },
    gallery: gallery("bomoyi", 4),
    nextSlug: "akwaba",
    filters: ["app"],
  },
  {
    slug: "akwaba",
    year: "2024",
    accentColor: "#8FB8D8",
    expertises: ["Site Web", "Charte graphique"],
    inWorksGrid: true,
    hasBeforeAfter: false,
    worksCardHeight: "tall",
    cover: { src: "/assets/projects/akwaba/cover.png" },
    worksCover: { src: "/assets/works/akwaba/cover.png" },
    gallery: gallery("akwaba", 7),
    nextSlug: "elvi-creation",
    filters: ["web", "branding"],
  },
  {
    slug: "elvi-creation",
    year: "2025",
    accentColor: "#C9A84C",
    expertises: ["E-commerce", "Identité visuelle", "Logo"],
    inWorksGrid: true,
    hasBeforeAfter: false,
    worksCardHeight: "tall",
    cover: { src: "/assets/projects/elvi-creation/cover.png" },
    worksCover: { src: "/assets/works/elvi-creation/cover.png" },
    gallery: gallery("elvi-creation", 6),
    nextSlug: null,
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
