# AGENTS.md — MSK Création

Instructions pour tout agent (Cursor / humain) travaillant sur ce dépôt.

## Mission

Reproduire le site vitrine **MSK Création** à partir du Figma validé, avec React Router Framework Mode (SSR), TypeScript, Tailwind v4, daisyUI v5, Lucide.

Lire [`CONSTRAINTS.md`](./CONSTRAINTS.md) avant d’écrire du code. Ne pas l’affaiblir pour faire passer un changement.

## Sources de vérité

1. **Figma** — [MSK-MAQUETTE](https://www.figma.com/design/wn9ZMeW9YwaF3PE8Wqa2WS/MSK-MAQUETTE) : layout, copy Desktop, assets photo, interactions.
2. **Charte graphique v3** — [`docs/brand/`](docs/brand/) (PDF 2026-09-25) : couleurs, logos, typo familles, règles d’usage marque. **Prime sur les anciennes variables couleur Figma.**
3. **Plan** — `MSK_CREATION_SITE_REACT_ROUTER_V8_PLAN_COMPLET.md` + plan de suivi Cursor.
4. **Docs design** — `docs/design/*`, `docs/validation/FIGMA_OPEN_QUESTIONS.md`.

## Règles non négociables

- Ne **jamais** inventer section, texte, image, animation, couleur, espacement ou breakpoint absents de Figma / charte / décisions documentées.
- Tokens brand (Encre, bleu `#1D73BC`, corail, logos) : suivre `docs/brand/` + `DESIGN_TOKENS.md`.
- Si ambigu → documenter dans `FIGMA_OPEN_QUESTIONS.md` → demander validation → seulement ensuite coder.
- Assets photo : export Figma uniquement. Logos marque : pack charte `docs/brand/logos/`. Jamais Unsplash / image « similaire ». Signalement : `Asset X présent dans Figma mais source non disponible.`
- UI ≠ content ≠ data. Les composants reçoivent le contenu via props / loaders.
- Contenu principal en **SSR**. CSR seulement : intro, filtres, overlays, animations, formulaire.
- Mobile : **pas d’UI inventée** — voir `docs/design/MOBILE_BRIEF.md` jusqu’à Figma mobile.

## Stack (versions cibles)

- React Router **latest** Framework Mode (`ssr: true`) — actuellement 8.x
- Tailwind **v4** + daisyUI **v5** (thème `msk`)
- Lucide pour icônes d’interaction (retrait si designer demande glyphes Figma)
- i18n : **FR + EN** (`/fr`, `/en` ; projets `/fr/travaux/:slug`, `/en/projects/:slug`)
- Assets : `assetUrl()` + `VITE_ASSET_BASE_URL` (local → R2 plus tard)

## Structure app

```
app/
  components/{ui,layout,sections}/
  content/{fr,en}/
  data/
  i18n/
  lib/{seo,assets,utils,validation}/
  routes/
  server/
  styles/
```

## Workflow d’implémentation UI

```
Figma → inventaire → tokens → assets → composant → loader/content → comparaison visuelle
```

Une section / un composant à la fois. Pas de big-bang.

## SEO

Meta / titles / descriptions depuis `app/content` uniquement — pas d’invention marketing. Canonical + hreflang FR/EN.

## Commandes

```bash
npm run dev
npm run typecheck
npm run build
```

## Skills Cursor

Voir `.cursor/skills/*/SKILL.md` et la gouvernance [`docs/architecture/CURSOR_GOVERNANCE.md`](docs/architecture/CURSOR_GOVERNANCE.md) (MSK primaires + Addy complémentaires). Appliquer la skill pertinente avant d’agir ; rule `.cursor/rules/agent-skills.mdc`.
