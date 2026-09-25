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
  /** Lisez-moi / Hero Figma */
  ctaBrief: string;
  ctaWorks: string;
  languageSwitchLabel: string;
};

export type FooterContent = {
  pendingNote: string;
};

export type HeroSlideContent = {
  src: string;
  alt: string;
};

export type HeroContent = {
  slides: HeroSlideContent[];
  /** Figma Ligne 1 — Space Grotesk Light uppercase */
  titleLine1: string;
  /** Figma Ligne 2 — Instrument Serif italic bleu, rotation 3 s */
  rotatingWords: string[];
  /** Figma Ligne 3 — Space Grotesk bold uppercase */
  titleLine3: string;
  /** Accroche sous le H1 */
  subtitle: string;
  /** Bandeau bas hero */
  tickerItems: string[];
  rotateMs: number;
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
