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
  ctaBrief: string;
  ctaWorks: string;
  languageSwitchLabel: string;
};

export type FooterContent = {
  copyright: string;
  addressLine: string;
  social: Array<{ label: string; href: string }>;
};

export type HeroSlideContent = {
  src: string;
  alt: string;
};

export type HeroRecentProject = {
  label: string;
  /** null = hors grille V1 (affichage seul, pas de lien). */
  slug: string | null;
};

export type HeroContent = {
  titleLine1: string;
  rotatingWords: string[];
  titleLine3: string;
  subtitle: string;
  /** Libellé italic « Dernièrement » */
  recentLabel: string;
  recentProjects: HeroRecentProject[];
  tickerItems: string[];
  rotateMs: number;
  slides: HeroSlideContent[];
};

export type WorksContent = {
  /** Surtitre « PROJETS SÉLECTIONNÉS » (sans brackets) */
  title: string;
  /** CTA carte stack */
  seeProjectLabel: string;
  /** Aria compteur : « Projet {current} sur {total} » */
  counterAriaLabel: string;
};

export type CtaContent = {
  ariaLabel: string;
  posterSrc: string;
  posterAlt: string;
  clients: string[];
  titleLine1: string;
  titleAccent: string;
  ctaLabel: string;
  email: string;
  emailHref: string;
  /** Libellés bas banner : Vidéo · Teaser 15 s · … */
  mediaTabs: string[];
};

export type ServiceItemContent = {
  index: string;
  title: string;
  description: string;
};

export type ServicesContent = {
  eyebrow: string;
  titleLine1: string;
  titleAccent: string;
  intro: string;
  items: ServiceItemContent[];
};

export type TeamSectionContent = {
  eyebrow: string;
  titleBefore: string;
  titleAccent: string;
  titleAfter: string;
  intro: string;
  officeSrc: string;
  officeAlt: string;
};

export type ApproachStepContent = {
  index: string;
  title: string;
  description: string;
};

export type ApproachContent = {
  eyebrow: string;
  titleLine1: string;
  titleAccent: string;
  titleLine3: string;
  body: string[];
  steps: ApproachStepContent[];
  /** Galerie bureaux — 6 images Figma (audit). */
  gallery: Array<{ src: string; alt: string; label?: string }>;
  galleryAriaLabel: string;
};

export type ContactRowContent = {
  label: string;
  value: string;
  href?: string;
  muted?: boolean;
};

export type ContactFormFieldContent = {
  name: string;
  label: string;
  placeholder: string;
  required?: boolean;
  type?: "text" | "email" | "textarea" | "select";
  options?: string[];
};

export type ContactSectionContent = {
  eyebrow: string;
  titleLine1: string;
  titleLine2: string;
  titleAccent: string;
  valuesTicker: string[];
  rows: ContactRowContent[];
  formNote: string;
  submitLabel: string;
  submitLoadingLabel: string;
  whatsappLabel: string;
  fields: ContactFormFieldContent[];
  successEyebrow: string;
  successTitle: string;
  successBody: string;
  errorRequired: string;
  errorEmail: string;
  /** Fond contact : PENDING export si absent */
  backgroundSrc?: string;
};

export type HomeContent = {
  meta: PageMetaContent;
  brandName: string;
  hero: HeroContent;
  works: WorksContent;
  cta: CtaContent;
  services: ServicesContent;
  teamSection: TeamSectionContent;
  approach: ApproachContent;
  contactSection: ContactSectionContent;
};

export type ContactContent = {
  whatsappDisplay: string;
  whatsappHref: string;
  email: string;
  emailHref: string;
};

export type ProjectCopy = {
  title: string;
  description: string;
  /** Légende carte Travaux (chaine ·). */
  category: string;
  /** Eyebrow ouverture fiche, avec crochets Figma. */
  eyebrow?: string;
  /** Métadonnées intro fiche (chaine ·), distincte de la carte. */
  sheetTags?: string;
  /** Paragraphe éditorial inséré dans / avant galerie (Prosperity). */
  galleryNote?: string;
  expertiseLabel: string;
  realizationsLabel: string;
  approachLabel: string;
  nextProjectBracketLabel: string;
  prevProjectBracketLabel: string;
  worksNavLabel: string;
  beforeAfterEyebrow?: string;
  beforeAfterSubtitle?: string;
  beforeLabel?: string;
  afterLabel?: string;
  closeLabel: string;
  nextLabel: string;
  prevLabel: string;
  backToWorksLabel: string;
};

export type LocaleContent = {
  home: HomeContent;
  nav: NavContent;
  footer: FooterContent;
  contact: ContactContent;
  projectSheet: Omit<
    ProjectCopy,
    "title" | "description" | "category" | "eyebrow" | "sheetTags" | "galleryNote"
  >;
  projects: Record<
    string,
    Pick<
      ProjectCopy,
      | "title"
      | "description"
      | "category"
      | "eyebrow"
      | "sheetTags"
      | "galleryNote"
    >
  >;
  team: Record<string, { name: string; role: string }>;
};
