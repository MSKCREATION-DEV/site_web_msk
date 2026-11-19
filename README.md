# MSK Création — Site web

Site vitrine SSR — React Router Framework Mode, Tailwind CSS v4, daisyUI v5.

## Stack (Phase 1)

- React Router **8.4** — SSR
- React 19 + TypeScript
- Tailwind CSS **v4** + daisyUI **v5** (thème `msk`)
- Lucide React
- Assets locaux → bascule R2 via `VITE_ASSET_BASE_URL`

## Scripts

```bash
npm run dev           # serveur de développement
npm run build         # build SSR
npm run typecheck     # typegen + tsc
npm run check:copy    # pas de tirets cadratin/demi dans content/data
npm run check:origin  # VITE_SITE_ORIGIN (warning local ; --strict en prod)
npm run check:images  # liste images public/ > 500 Ko
npm run assets:compress:priority  # WebP+AVIF hero/works/team/…
npm run assets:compress           # tous les raster sous public/assets
npm run check         # typecheck + check:copy + check:origin
npm start             # servir le build
```

## Variables d’environnement

Voir [`.env.example`](./.env.example).

| Variable | Rôle |
|----------|------|
| `VITE_SITE_ORIGIN` | **Obligatoire en prod** — origine absolue pour canonical, hreflang, `og:image`, JSON-LD, sitemap (ex. `https://www.mskcreation.net`). Local : `http://localhost:5173`. |
| `VITE_ASSET_BASE_URL` | Préfixe CDN assets (vide = `/public`). |
| `CONTACT_EMAIL_ENABLED` | `1` seulement après Q23 + provider branché. Absent = stub honnête (pas d’envoi). |

Sans `VITE_SITE_ORIGIN` https prod, les URL absolues SEO restent sur localhost.

**Gate origin :** `npm run check:origin` (warning local) ; en prod / CI : `npm run check:origin -- --strict` ou `VERCEL_ENV=production` / `MSK_REQUIRE_PROD_ORIGIN=1` (échec si localhost). Intégré à `npm run check` en mode soft.

**Contact prod :** voir [`docs/design/CONTACT_BACKEND.md`](./docs/design/CONTACT_BACKEND.md).

## Documentation

- [AGENTS.md](./AGENTS.md) — instructions agents
- [Plan complet](./MSK_CREATION_SITE_REACT_ROUTER_V8_PLAN_COMPLET.md)
- [Gouvernance Cursor](./docs/architecture/CURSOR_GOVERNANCE.md)
- [Inventaire Figma](./docs/design/FIGMA_INVENTORY.md)
- [Tokens](./docs/design/DESIGN_TOKENS.md)
- [Décisions](./docs/design/DESIGN_DECISIONS.md)
- [Inventaire assets](./docs/design/ASSETS_INVENTORY.md)
- [Brief mobile](./docs/design/MOBILE_BRIEF.md)
- [Questions ouvertes](./docs/validation/FIGMA_OPEN_QUESTIONS.md)

## Routes (Phase 3)

| Path | Rôle |
|------|------|
| `/` | Redirect → `/fr` |
| `/fr`, `/en` | Home (shell i18n) |
| `/fr/travaux/:slug` | Fiche projet FR |
| `/en/projects/:slug` | Fiche projet EN |
| `/robots.txt` | Crawl rules + lien sitemap |
| `/sitemap.xml` | Home + fiches FR/EN (deck 7) |

Grille projets : `app/data/projects.ts` (vide jusqu’à validation Q01).

## Règle Figma

Le design Figma est la source de vérité visuelle. Ne rien inventer sans validation documentée.
