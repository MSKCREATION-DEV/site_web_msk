export { buildPageMeta } from "./meta";
export type { PageMetaInput } from "./meta";
export {
  homeMeta,
  projectMeta,
  absoluteUrl,
  siteOrigin,
} from "./page-meta";
export {
  DEFAULT_OG_IMAGE_PATH,
  ORGANIZATION_LOGO_PATH,
  absoluteAssetUrl,
  defaultOgImageUrl,
} from "./assets";
export {
  buildHomeJsonLd,
  buildProjectJsonLd,
  teamPhotoAlt,
} from "./json-ld";
export type { JsonLdHomeInput, JsonLdPersonInput, JsonLdProjectInput } from "./json-ld";
export {
  buildSitemapEntries,
  renderSitemapXml,
  renderRobotsTxt,
} from "./sitemap";
