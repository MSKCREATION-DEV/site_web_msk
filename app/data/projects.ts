/**
 * Projets structurés (locale-agnostic).
 * Grille V1 figée depuis APERÇU Travaux Figma (screenshot 2026-09-24) :
 * Koundji → Thòy ’Art → Ecosol → Bomoyi → Akwaba → Elvi Creation
 */

export type ProjectAsset = {
  src: string;
  altKey?: string;
};

export type ProjectFilter = "web" | "branding" | "app";

export type Project = {
  slug: string;
  year: string;
  /** Tags affichés carte / fiche (libellés Figma). */
  expertises: string[];
  inWorksGrid: boolean;
  hasBeforeAfter: boolean;
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
 * Ordre = grille Travaux Figma (lecture gauche → droite, haut → bas).
 */
export const projects: Project[] = [
  {
    slug: "koundji-services",
    year: "2025",
    expertises: ["Site Web", "Branding", "Logo"],
    inWorksGrid: true,
    hasBeforeAfter: true,
    cover: { src: "/assets/projects/koundji-services/cover.png" },
    worksCover: { src: "/assets/works/koundji-services/cover.png" },
    gallery: gallery("koundji-services", 7),
    before: { src: "/assets/projects/koundji-services/before.png" },
    after: { src: "/assets/projects/koundji-services/after.png" },
    nextSlug: "thoy-art",
    filters: ["web", "branding"],
  },
  {
    slug: "thoy-art",
    year: "2024",
    expertises: ["Site Web", "App Mobile", "Branding"],
    inWorksGrid: true,
    hasBeforeAfter: false,
    cover: { src: "/assets/projects/thoy-art/cover.png" },
    worksCover: { src: "/assets/works/thoy-art/cover.png" },
    gallery: gallery("thoy-art", 3),
    nextSlug: "ecosol",
    filters: ["web", "app", "branding"],
  },
  {
    slug: "ecosol",
    year: "2025",
    expertises: ["Branding", "Logo", "Identité visuelle"],
    inWorksGrid: true,
    hasBeforeAfter: false,
    cover: { src: "/assets/projects/ecosol/cover.png" },
    worksCover: { src: "/assets/works/ecosol/cover.png" },
    gallery: gallery("ecosol", 4),
    nextSlug: "bomoyi",
    filters: ["branding"],
  },
  {
    slug: "bomoyi",
    year: "2025",
    expertises: ["App Mobile", "UX/UI"],
    inWorksGrid: true,
    hasBeforeAfter: false,
    cover: { src: "/assets/projects/bomoyi/cover.png" },
    worksCover: { src: "/assets/works/bomoyi/cover.png" },
    gallery: gallery("bomoyi", 3),
    nextSlug: "akwaba",
    filters: ["app"],
  },
  {
    slug: "akwaba",
    year: "2024",
    expertises: ["Site Web", "Charte graphique"],
    inWorksGrid: true,
    hasBeforeAfter: false,
    cover: { src: "/assets/projects/akwaba/cover.png" },
    worksCover: { src: "/assets/works/akwaba/cover.png" },
    gallery: gallery("akwaba", 6),
    nextSlug: "elvi-creation",
    filters: ["web", "branding"],
  },
  {
    slug: "elvi-creation",
    year: "2025",
    expertises: ["E-commerce", "Identité visuelle", "Logo"],
    inWorksGrid: true,
    hasBeforeAfter: false,
    cover: { src: "/assets/projects/elvi-creation/cover.png" },
    worksCover: { src: "/assets/works/elvi-creation/cover.png" },
    gallery: gallery("elvi-creation", 5),
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
