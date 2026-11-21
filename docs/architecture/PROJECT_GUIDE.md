# Guide projet : comment MSK Création est construit

Mode d’emploi technique du dépôt. Complète le [README racine](../../README.md) et l’[index docs](../README.md).

**Public :** développeurs humains et agents Cursor.  
**Objectif :** savoir où toucher, comment renommer, comment changer une image, sans casser SSR, i18n ou SEO.

---

## Table des matières

1. [Principes](#1-principes)
2. [Arborescence](#2-arborescence)
3. [Routing](#3-routing)
4. [Gestion des pages](#4-gestion-des-pages)
5. [Content & i18n](#5-content--i18n)
6. [Data structurée](#6-data-structurée)
7. [Composants](#7-composants)
8. [Assets & images](#8-assets--images)
9. [Renommer (fichiers, dossiers, slugs, composants)](#9-renommer-fichiers-dossiers-slugs-composants)
10. [Styles & tokens](#10-styles--tokens)
11. [SEO](#11-seo)
12. [Serveur (contact, loaders)](#12-serveur-contact-loaders)
13. [Scripts & qualité](#13-scripts--qualité)
14. [Workflows courants](#14-workflows-courants)
15. [Checklist avant commit](#15-checklist-avant-commit)

---

## 1. Principes

### 1.1 Séparation des responsabilités

```
UI  ≠  content  ≠  data  ≠  traductions
```

| Couche | Responsabilité | Interdit |
|--------|----------------|----------|
| **UI** (`app/components`) | Layout, interaction, accessibilité | Textes marketing hardcodés, chemins CDN hardcodés |
| **Content** (`app/content/fr\|en`) | Copy, meta, alts, labels | Chemins assets « inventés », logique métier |
| **Data** (`app/data`) | Slugs, chemins fichiers, ordre, filtres, styles panel | Phrases UI localisées |
| **Server** (`app/server`) | Loaders, actions, email, rate-limit | JSX de présentation |
| **Lib** (`app/lib`) | SEO helpers, `assetUrl`, validation, utils | Fetch métier côté client |

### 1.2 Sources de vérité

1. **Figma** Desktop : composition, copy, photos, interactions.  
2. **Charte v3** (`docs/brand/`) : couleurs marque, logos, familles typo.  
3. **Décisions écrites** : `docs/design/DESIGN_DECISIONS.md`, `docs/validation/FIGMA_OPEN_QUESTIONS.md`.

Si ambigu → documenter → valider → **ensuite** coder. Ne jamais inventer.

### 1.3 SSR vs CSR

| SSR (défaut) | CSR accepté |
|--------------|-------------|
| Contenu des sections | Intro curtain |
| Meta / JSON-LD | Filtres Travaux |
| Structure sémantique | Overlays / animations Reveal |
| Sitemap / robots | Formulaire contact (soumission) |

Config : `react-router.config.ts` → `ssr: true`.

### 1.4 Locales

- `fr` (défaut), `en`
- Paths : `/fr`, `/en`
- Fiches : `/fr/travaux/:slug`, `/en/projects/:slug`
- Copy **jamais** mélangée dans un même fichier

---

## 2. Arborescence

```
site_web_msk/
├── README.md                 # Carte d’entrée brandée
├── AGENTS.md                 # Règles contributeurs / agents
├── CONSTRAINTS.md            # Barre qualité
├── .env.example
├── package.json
├── react-router.config.ts    # ssr: true
├── vite.config.ts
├── app/
│   ├── root.tsx              # Document HTML, fonts, favicons
│   ├── routes.ts             # Déclaration des routes
│   ├── routes/               # Modules route (loaders, UI page)
│   ├── components/
│   │   ├── layout/           # Header, footer, intro, chrome
│   │   ├── sections/         # Blocs page (hero, works, …)
│   │   └── ui/               # Primitives réutilisables
│   ├── content/
│   │   ├── fr/ · en/         # Copy par locale
│   │   ├── index.ts          # getLocaleContent()
│   │   └── types.ts
│   ├── data/                 # projects.ts, team.ts
│   ├── i18n/                 # locales, paths, messages erreur
│   ├── lib/
│   │   ├── assets/           # assetUrl, modern-formats
│   │   ├── seo/              # meta, JSON-LD, sitemap, origin
│   │   ├── validation/       # contact schema
│   │   ├── security/         # headers
│   │   └── utils/
│   ├── server/
│   │   ├── api/              # Intégrations externes (*.server.ts)
│   │   ├── email/
│   │   └── site/             # loaders, contact-action, rate-limit
│   └── styles/ / app.css     # Tailwind v4 + thème daisyUI msk
├── public/
│   ├── assets/               # Médias runtime
│   │   ├── logo/
│   │   ├── hero/
│   │   ├── works/{slug}/
│   │   ├── projects/{slug}/
│   │   ├── team/
│   │   ├── approach/
│   │   ├── cta/
│   │   └── contact/
│   ├── favicon.* · site.webmanifest
├── docs/                     # Toute la documentation
└── scripts/                  # check-*, compress, mockup, stamp-meta
```

Alias TypeScript : `~/…` → `app/…` (voir `tsconfig`).

---

## 3. Routing

### 3.1 Déclaration unique

Fichier : [`app/routes.ts`](../../app/routes.ts)

```ts
index("routes/_index.tsx")                    // / → redirect /fr
route("robots.txt", "routes/robots.ts")
route("sitemap.xml", "routes/sitemap.ts")
route(":lang", "routes/locale-layout.tsx", [
  index("routes/home.tsx"),                   // /fr · /en
  route("travaux/:slug", "routes/project.tsx", { id: "project-travaux" }),
  route("projects/:slug", "routes/project.tsx", { id: "project-projects" }),
])
```

Même module `project.tsx` pour FR et EN, avec **deux ids** de route distincts.

### 3.2 Layout locale

[`app/routes/locale-layout.tsx`](../../app/routes/locale-layout.tsx) :

- valide `params.lang` (`isLocale`) ;
- charge le shell (nav, footer, contact) via `loadLocaleShell` ;
- enveloppe `<SiteLayout>` + `<Outlet />` ;
- masque le chrome site sur les fiches (`/travaux/` ou `/projects/`).

### 3.3 Helpers de path

[`app/i18n/paths.ts`](../../app/i18n/paths.ts) :

| Fonction | Exemple |
|----------|---------|
| `homePath("fr")` | `/fr` |
| `projectPath("fr", "prosperity")` | `/fr/travaux/prosperity` |
| `projectPath("en", "prosperity")` | `/en/projects/prosperity` |
| `alternateHomePath` / `alternateProjectPath` | Bascule langue |

**Toujours** construire les liens via ces helpers (LanguageSwitcher, cartes Travaux, « projet suivant »).

### 3.4 Ajouter une route

1. Déclarer dans `app/routes.ts`.  
2. Créer `app/routes/<name>.tsx` (ou `.ts` pour réponses non-HTML).  
3. Loader pour les lectures ; action pour les mutations.  
4. `meta` depuis `app/content` (pas d’invention marketing).  
5. Mettre à jour sitemap (`app/lib/seo/sitemap.ts`) si page indexable.  
6. Documenter dans ce guide + README si route publique.

### 3.5 Routes archivées

La page dédiée `/equipe` / `/team` est archivée sur la branche `archive/equipe-page`.  
L’équipe vit en **section** de la home (`#equipe`).

---

## 4. Gestion des pages

### 4.1 Home (`/fr`, `/en`)

| Élément | Fichier |
|---------|---------|
| Route | `app/routes/home.tsx` |
| Loader | `app/server/site/loaders/home.server.ts` → `loadHomePage` |
| Action | `handleContactAction` (formulaire brief) |
| Meta / JSON-LD | `homeMeta` + `buildHomeJsonLd` |

Ordre des sections (Figma) :

1. `HeroSection`
2. `WorksSection` (stack Travaux)
3. `ProjectCtaSection`
4. `ApproachSection`
5. `ServicesSection`
6. `TeamSection`
7. `ContactSection`

Le contenu arrive **uniquement** via `loaderData` (props typées).

### 4.2 Fiche projet

| Élément | Fichier |
|---------|---------|
| Route | `app/routes/project.tsx` |
| Loader | `app/server/site/loaders/project.server.ts` |
| UI | `ProjectSheetView` (+ sections associées) |

Le slug vient de l’URL. Le loader :

1. résout le projet dans `app/data/projects.ts` ;
2. joint la copy `app/content/{locale}/projects.ts` ;
3. filtre les assets absents / inutilisables ;
4. prépare prev/next via `nextSlug`.

### 4.3 Flux de données (schéma)

```
URL /:lang[/travaux|projects/:slug]
        │
        ▼
  routes/*.tsx  ──loader──►  server/site/loaders/*.server.ts
                                    │
                    ┌───────────────┼───────────────┐
                    ▼               ▼               ▼
              getLocaleContent   getProjectBySlug  isUsableAsset
              (content/fr|en)    (data/projects)   (server assets)
                    │               │               │
                    └───────────────┴───────────────┘
                                    │
                                    ▼
                         loaderData → Sections UI
```

**Règle :** pas de `fetch` métier dans un composant de présentation.

---

## 5. Content & i18n

### 5.1 Organisation

```
app/content/
  fr/   home.ts  nav.ts  footer.ts  contact.ts  projects.ts  team.ts
  en/   (mêmes fichiers, copy EN)
  index.ts      → getLocaleContent(locale)
  types.ts      → contrats TypeScript partagés
```

### 5.2 Modifier un texte

1. Éditer **les deux** locales si le message existe des deux côtés.  
2. Respecter la ponctuation : **interdit** `—` et `–` (`npm run check:copy`).  
3. Préférer `.` `,` `:` ou `·` comme séparateurs.  
4. Ne pas inventer de claim marketing hors Figma / validation.

### 5.3 Ajouter une clé de copy

1. Étendre le type dans `app/content/types.ts` si besoin.  
2. Ajouter la valeur dans `fr/` **et** `en/`.  
3. Brancher via le loader / props (pas d’import direct dans un composant « profond » si le loader peut le fournir).

### 5.4 Switcher de langue

`LanguageSwitcher` utilise `alternateHomePath` / `alternateProjectPath` pour rester sur la même page logique.

---

## 6. Data structurée

### 6.1 Projets : `app/data/projects.ts`

Locale-agnostic. Contient notamment :

| Champ | Rôle |
|-------|------|
| `slug` | Identifiant URL + dossiers assets |
| `year`, `panel`, `expertises` | Carte / fiche |
| `inWorksGrid` | Présence dans le stack Travaux |
| `worksCover` / `cover` | Chemins images |
| `gallery` + `galleryLayout` | Galerie fiche (`full` \| `half`) |
| `before` / `after` | Avant-après (ex. Koundji) |
| `nextSlug` | Chaîne « projet suivant » |
| `filters` | `web` \| `branding` \| `app` |

Helpers : `getWorksGridProjects()`, `getProjectBySlug()`, `getProjectIndex()`.

Copy titre / catégorie / alts : **`app/content/*/projects.ts`**, clé = `slug`.

### 6.2 Équipe : `app/data/team.ts`

| Champ | Rôle |
|-------|------|
| `slug` | Nom fichier photo |
| `photoSrc` | `/assets/team/{slug}.png` |
| `contentKey` | Clé dans `content/*/team.ts` (name, role) |

Ordre du tableau = ordre Figma / validation client (grille 5+5).

### 6.3 Deck Travaux V1 (7)

Ordre Figma :

1. `prosperity`  
2. `thoy-art`  
3. `koundji-services`  
4. `bomoyi`  
5. `ecosol`  
6. `elvi-creation`  
7. `akwaba` → boucle vers Prosperity via `nextSlug`

Inventaire détaillé : [`docs/design/ASSETS_INVENTORY.md`](../design/ASSETS_INVENTORY.md).

---

## 7. Composants

### 7.1 Couches

| Dossier | Rôle | Exemples |
|---------|------|----------|
| `components/layout` | Chrome site | `SiteHeader`, `SiteFooter`, `IntroCurtain`, `SiteLayout` |
| `components/sections` | Blocs de page Figma | `HeroSection`, `WorksSection`, `ContactSection` |
| `components/ui` | Primitives | `OptimizedImg`, `MskLogo`, `WorksFilter`, `TeamCard` |

Barrels : `index.ts` par dossier (exports publics).

### 7.2 Conventions de nommage

| Type | Convention | Exemple |
|------|------------|---------|
| Fichier | `kebab-case.tsx` | `works-stack-card.tsx` |
| Composant | `PascalCase` | `WorksStackCard` |
| Section page | `*-section.tsx` | `hero-section.tsx` |
| Server-only | `*.server.ts` | `contact.server.ts` |

### 7.3 Props

- Contenu éditorial passé en props (depuis loader).  
- Images : chemin logique `/assets/...` ; affichage via `assetUrl()` / `OptimizedImg`.  
- Pas d’URL CDN en dur.

### 7.4 Images UI

Toujours préférer `OptimizedImg` pour les rasters :

- `<picture>` AVIF → WebP → PNG ;  
- dimensions réservées (CLS) ;  
- `alt` depuis content.

Logos SVG : `MskLogo` / `assetUrl("/assets/logo/...")`.

---

## 8. Assets & images

### 8.1 Pipeline

```
Figma (ou pack charte)
  → public/assets/...
  → assetUrl() / OptimizedImg
  → (plus tard) CDN via VITE_ASSET_BASE_URL
```

**Jamais** Unsplash, placeholder stock, ou image « similaire ».  
Si manquant : signaler explicitement (*Asset X présent dans Figma mais source non disponible*).

### 8.2 Convention de chemins

```
public/assets/
  logo/msk-creation.svg          # signature intercalée (nav, fiche, footer)
  logo/msk-mark.svg              # signe seul
  hero/slide-01.png · slide-02.png
  cta/teaser-poster.png
  contact/background.png
  approach/gallery-0N.png
  works/{slug}/cover.png         # stack Travaux
  projects/{slug}/cover.png
  projects/{slug}/gallery-NN.png # NN = 01, 02, …
  projects/{slug}/before.png · after.png
  team/{slug}.png
```

Dérivés (générés) : même chemin avec extension `.webp` / `.avif`.  
Manifest : `public/assets/.derivatives-manifest.json`.  
Logos SVG exclus de la compression.

### 8.3 `assetUrl()`

[`app/lib/assets/asset-url.ts`](../../app/lib/assets/asset-url.ts) :

```ts
assetUrl("/assets/hero/slide-01.png")
// local  → /assets/hero/slide-01.png
// CDN    → https://cdn…/assets/hero/slide-01.png  (si VITE_ASSET_BASE_URL)
```

Changer de CDN = **une variable d’env**, pas un find/replace dans les composants.

### 8.4 Remplacer une image (même nom)

1. Exporter depuis Figma (vérifier `file chemin.png` → `PNG image data`).  
2. Écraser le fichier source sous `public/assets/...`.  
3. Régénérer les dérivés :

```bash
npm run assets:compress -- --only=hero          # ou works, projects, team, …
# ou priorité above-the-fold :
npm run assets:compress:priority
```

4. QA visuelle Desktop 1440 vs Figma.  
5. Committer **source + webp + avif** (+ manifest si modifié).

Détail encodeur / budgets : [`docs/quality/IMAGE_PIPELINE.md`](../quality/IMAGE_PIPELINE.md).

### 8.5 Ajouter une nouvelle image

1. Placer le PNG au bon chemin (naming cohérent).  
2. Référencer le chemin dans `app/data` et/ou `app/content`.  
3. Optionnel : `npm run assets:stamp-meta -- --manifest=…`  
4. `npm run assets:compress -- --only=<dossier>`  
5. Brancher via `OptimizedImg` + alt content.  
6. Mettre à jour `ASSETS_INVENTORY.md`.

### 8.6 Mockups device (captures UI clients)

```bash
npm run assets:mockup -- --manifest=scripts/mockup-jobs.<scope>.json
# puis stamp-meta + compress
```

Ne pas double-cadrer une capture déjà mockupée.

### 8.7 Changer le logo runtime

| Fichier runtime | Usage |
|-----------------|-------|
| `public/assets/logo/msk-creation.svg` | Nav, fiche, intro, footer |
| `public/assets/logo/msk-mark.svg` | Watermark / petite taille |

Sources charte : `docs/brand/logos/`. Après remplacement SVG, vérifier contraste (souvent blanc sur Encre). Favicons : `public/favicon.*` + `root.tsx`.

---

## 9. Renommer (fichiers, dossiers, slugs, composants)

Renommer mal = 404 assets, liens cassés, SEO incohérent. Suivre la checklist adaptée.

### 9.1 Renommer un **slug projet**

Le slug couple URL, data, content et dossiers assets.

1. **Data** : `slug` + chemins `cover` / `worksCover` / `gallery` / `before` / `after` dans `app/data/projects.ts`.  
2. **Content** : clé objet dans `app/content/fr/projects.ts` **et** `en/projects.ts`.  
3. **Dossiers** :
   - `public/assets/works/{ancien}` → `{nouveau}`  
   - `public/assets/projects/{ancien}` → `{nouveau}`  
4. **Chaîne** : mettre à jour `nextSlug` des projets voisins.  
5. **Dérivés** : recompresser le dossier (ou renommer aussi `.webp` / `.avif`).  
6. **Sitemap** : régénéré dynamiquement depuis data (vérifier au runtime).  
7. `npm run typecheck` + parcours manuel `/fr/travaux/{slug}` et `/en/projects/{slug}`.  
8. Doc : `ASSETS_INVENTORY.md`, ce guide si le deck change.

### 9.2 Renommer un **membre d’équipe**

1. `slug` + `photoSrc` + `contentKey` dans `app/data/team.ts`.  
2. Clés dans `app/content/fr/team.ts` et `en/team.ts`.  
3. Fichiers `public/assets/team/{slug}.png` (+ webp/avif).  
4. Vérifier l’ordre de la grille (commentaire en tête de `team.ts`).

### 9.3 Renommer un **fichier image** (sans changer le slug)

1. Renommer sous `public/assets/...` (png + webp + avif).  
2. Mettre à jour **toutes** les références dans `app/data` et `app/content`.  
3. Grep de sécurité :

```bash
rg "ancien-nom" app public docs
```

4. Recompresser si seul le PNG source a été renommé sans dérivés.

### 9.4 Renommer un **dossier** sous `public/assets`

Ex. `works` → autre nom : **déconseillé** sans migration complète.

À synchroniser :

- tous les `src` dans data/content ;  
- scripts `assets:compress` (`--only=…`) ;  
- docs inventaire / pipeline ;  
- éventuels README locaux (`public/assets/*/README.md`).

### 9.5 Renommer un **composant**

1. Renommer le fichier `kebab-case.tsx`.  
2. Renommer l’export `PascalCase`.  
3. Mettre à jour le barrel `index.ts` du dossier.  
4. Mettre à jour tous les imports (`rg AncienNom`).  
5. `npm run typecheck`.

Ne pas laisser d’exports morts dans les barrels.

### 9.6 Renommer une **route** (segment URL)

1. `app/routes.ts` (segment path).  
2. Helpers `app/i18n/paths.ts`.  
3. Conditions chrome (`locale-layout` : détection `/travaux/` / `/projects/`).  
4. Liens content (nav, CTA, footer) si hardcodés (préférer helpers).  
5. Sitemap + canonical / hreflang (`app/lib/seo`).  
6. Redirects éventuels (ancienne URL → nouvelle) côté hébergeur.  
7. Doc README + ce guide.

### 9.7 Renommer un fichier sous `app/content` ou `app/data`

1. Mettre à jour les imports dans `app/content/index.ts` / `app/data/index.ts`.  
2. Grep global.  
3. Typecheck.

### 9.8 Commandes utiles après renommage

```bash
rg "ancien-slug|AncienNom|ancien-fichier" app public docs scripts
npm run typecheck
npm run check
npm run check:images
```

---

## 10. Styles & tokens

| Élément | Emplacement |
|---------|-------------|
| Tailwind v4 + daisyUI | `app/app.css` (`@import "tailwindcss"`, `@plugin "daisyui"`, thème `msk`) |
| Tokens couleur MSK | `--color-msk-*` (Encre, bleu `#1D73BC`, corail, …) |
| Charte | `docs/brand/` + `docs/design/DESIGN_TOKENS.md` |

Règles :

- tokens MSK > defaults daisyUI / Tailwind ;  
- pas de couleurs / rayons daisyUI qui contredisent la charte ou le layout Figma ;  
- Desktop 1440 = source actuelle ;  
- **pas** d’UI mobile inventée → `docs/design/MOBILE_BRIEF.md`.

Utilitaire classes : `cn()` dans `app/lib/utils/cn.ts`.

---

## 11. SEO

| Concern | Où |
|---------|-----|
| Meta title / description | `app/content/*/home.ts`, `projects.ts`, … via helpers `app/lib/seo` |
| Canonical + hreflang | `VITE_SITE_ORIGIN` + builders meta |
| JSON-LD | `app/lib/seo/json-ld.ts` (home + fiches) |
| Sitemap | `app/routes/sitemap.ts` ← `app/lib/seo/sitemap.ts` |
| Robots | `app/routes/robots.ts` |
| Alt images | content (jamais générique inventé) |

Détail : [`docs/design/SEO_STRUCTURED_DATA.md`](../design/SEO_STRUCTURED_DATA.md).  
Gate origin : `npm run check:origin` (strict en prod).

---

## 12. Serveur (contact, loaders)

```
app/server/
  api/contact.server.ts          # envoi Resend
  email/contact-brief-email.ts   # template mail
  site/
    loaders/home.server.ts
    loaders/project.server.ts
    contact-action.server.ts     # action formulaire
    rate-limit.server.ts
    assets.server.ts             # isUsableAsset (SSR)
```

- Loaders = lectures. Actions = mutations.  
- Contact désactivé sans `CONTACT_EMAIL_ENABLED=1` (stub honnête).  
- Doc ops : [`CONTACT_BACKEND.md`](../design/CONTACT_BACKEND.md).

Sécurité formulaires : validation `app/lib/validation/contact.ts`, rate-limit, headers `app/lib/security/headers.ts`.

---

## 13. Scripts & qualité

| Script | Rôle |
|--------|------|
| `npm run check` | typecheck + copy dashes + origin (soft) |
| `npm run check:copy` | Interdit `—` / `–` dans content/data |
| `npm run check:origin` | Valide `VITE_SITE_ORIGIN` ; `--strict` en prod |
| `npm run check:images` | Liste rasters lourds |
| `npm run assets:compress` | WebP + AVIF |
| `npm run assets:compress:priority` | Sous-ensemble LCP |
| `npm run assets:mockup` | Compose mockups device |
| `npm run assets:stamp-meta` | EXIF / IPTC / XMP |

Barre projet : [`CONSTRAINTS.md`](../../CONSTRAINTS.md).

---

## 14. Workflows courants

### 14.1 Nouvelle section UI (Desktop Figma)

```
Figma → inventaire → tokens → assets → composant section
  → content FR/EN → loader → comparaison visuelle Desktop
```

Une section à la fois. Skill : `msk-figma-implementation`.

### 14.2 Nouveau projet dans le deck

1. Ajouter l’entrée dans `app/data/projects.ts` (slug, panel, gallery count, nextSlug, …).  
2. Copy FR + EN dans `projects.ts` content.  
3. Déposer `works/{slug}/cover.png` et `projects/{slug}/…`.  
4. Compress + QA.  
5. Vérifier chaîne `nextSlug` du deck.  
6. Inventaire assets.

### 14.3 Changer uniquement le texte d’une section

1. `app/content/fr/<fichier>.ts` + `en/`.  
2. `npm run check:copy`.  
3. Recharger `/fr` et `/en`.

### 14.4 Activer l’email contact en local

1. Copier `.env.example` → `.env`.  
2. Renseigner `RESEND_API_KEY`, `CONTACT_EMAIL_*`.  
3. `CONTACT_EMAIL_ENABLED=1`.  
4. Relancer `npm run dev`.  
5. Suivre `CONTACT_BACKEND.md`.

### 14.5 Préparer un déploiement

Voir [`docs/ops/PROD_GO_LIVE_CHECKLIST.md`](../ops/PROD_GO_LIVE_CHECKLIST.md)  
et [`docs/ops/VERCEL_PREVIEW.md`](../ops/VERCEL_PREVIEW.md).

---

## 15. Checklist avant commit

- [ ] Rien d’inventé hors Figma / charte / décisions documentées  
- [ ] Copy FR **et** EN alignées si texte touché  
- [ ] Pas de `—` / `–` dans content/data  
- [ ] Images via `assetUrl` / `OptimizedImg` ; dérivés à jour  
- [ ] Slugs / chemins cohérents (data ↔ dossiers ↔ content)  
- [ ] `npm run check` vert  
- [ ] Parcours manuel de la page touchée (`/fr` et `/en` si i18n)  
- [ ] Inventaire / décisions mis à jour si changement structurel  

---

## Voir aussi

| Doc | Sujet |
|-----|--------|
| [README racine](../../README.md) | Entrée projet |
| [Index docs](../README.md) | Carte documentation |
| [AGENTS.md](../../AGENTS.md) | Règles agents |
| [CURSOR_GOVERNANCE.md](./CURSOR_GOVERNANCE.md) | Skills Cursor |
| [ASSETS_INVENTORY.md](../design/ASSETS_INVENTORY.md) | État médias |
| [IMAGE_PIPELINE.md](../quality/IMAGE_PIPELINE.md) | Compression |
| [DESIGN_DECISIONS.md](../design/DESIGN_DECISIONS.md) | Décisions validées |
| [FIGMA_OPEN_QUESTIONS.md](../validation/FIGMA_OPEN_QUESTIONS.md) | Questions ouvertes |

---

*Dernière révision structurelle : 2026-11-20 · aligné sur React Router 8 SSR, deck Travaux 7, équipe en section home.*
