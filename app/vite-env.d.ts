/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ASSET_BASE_URL?: string;
  readonly VITE_SITE_ORIGIN?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
