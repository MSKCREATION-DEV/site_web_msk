/**
 * Projets structurés (locale-agnostic).
 * Seuls les projets `inWorksGrid: true` sont exposés sur le site (décision V1).
 *
 * Q01 : liste exacte de la grille Travaux / APERÇU 6 encore PENDING (MCP rate limit).
 * Ne pas publier de fiches designer-only.
 */

export type ProjectAsset = {
  /** Chemin relatif sous public, ex. /assets/projects/koundji/cover.webp */
  src: string;
  altKey?: string;
};

export type Project = {
  slug: string;
  year: string;
  expertises: string[];
  inWorksGrid: boolean;
  hasBeforeAfter: boolean;
  cover: ProjectAsset;
  gallery: ProjectAsset[];
  before?: ProjectAsset;
  after?: ProjectAsset;
  /** Slug suivant dans la chaîne grille (pas les fiches designer hors grille). */
  nextSlug: string | null;
  filters: Array<"web" | "branding" | "app">;
};

/**
 * Catalogue brut éventuel (référence). Filtrer via `getWorksGridProjects()`.
 * Laisser vide jusqu’à validation de la grille Figma.
 */
export const projects: Project[] = [];

export function getWorksGridProjects(): Project[] {
  return projects.filter((project) => project.inWorksGrid);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return getWorksGridProjects().find((project) => project.slug === slug);
}

export function getProjectIndex(slug: string): number {
  return getWorksGridProjects().findIndex((project) => project.slug === slug);
}
