export type PageMetaContent = {
  title: string;
  description: string;
};

export type NavLinkContent = {
  href: string;
  label: string;
};

export type NavContent = {
  links: NavLinkContent[];
  /** Lisez-moi Figma — scroll vers contact / brief */
  ctaBrief: string;
  /** Lisez-moi Figma — scroll vers travaux */
  ctaWorks: string;
  languageSwitchLabel: string;
};

export type FooterContent = {
  /**
   * Contenu footer complet = PENDING pixels Figma.
   * WhatsApp repris du contact (confirmé).
   */
  pendingNote: string;
};

export type HeroSlideContent = {
  src: string;
  alt: string;
};

export type HeroContent = {
  slides: HeroSlideContent[];
  /**
   * Titre autour du mot rotatif.
   * Exact wording Figma = PENDING (MCP) — coller depuis Desktop 02 Hero.
   */
  titleBefore: string;
  rotatingWords: string[];
  titleAfter: string;
  /** Intervalle mot bleu — Lisez-moi : 3 s */
  rotateMs: number;
  /** Lisez-moi prototype */
  ctaStart: string;
};

export type HomeContent = {
  meta: PageMetaContent;
  brandName: string;
  hero: HeroContent;
};

export type ContactContent = {
  whatsappDisplay: string;
  whatsappHref: string;
};

export type ProjectCopy = {
  title: string;
  description: string;
  expertiseLabel: string;
  beforeAfterEyebrow?: string;
  beforeAfterSubtitle?: string;
  closeLabel: string;
  nextLabel: string;
  backToWorksLabel: string;
};

export type LocaleContent = {
  home: HomeContent;
  nav: NavContent;
  footer: FooterContent;
  contact: ContactContent;
  projectSheet: Omit<ProjectCopy, "title" | "description">;
  projects: Record<string, Pick<ProjectCopy, "title" | "description">>;
  team: Record<string, { name: string; role: string }>;
};
