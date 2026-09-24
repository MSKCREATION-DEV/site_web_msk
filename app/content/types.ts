export type PageMetaContent = {
  title: string;
  description: string;
};

export type HomeContent = {
  meta: PageMetaContent;
  brandName: string;
  /** Placeholder bootstrap — sections Figma branchées en Phase 7. */
  bootstrapNote: string;
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
  contact: ContactContent;
  projectSheet: Omit<ProjectCopy, "title" | "description">;
  projects: Record<string, Pick<ProjectCopy, "title" | "description">>;
};
