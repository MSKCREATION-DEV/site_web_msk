# Pipeline images — compression / dérivés

Objectif : réduire le poids des assets lourds (LCP hero, covers, galeries) **sans remplacer** les PNG/JPEG Figma sources, et sans inventer d’UI mobile.

## Commandes

```bash
# Inventaire (> 500 Ko)
npm run check:images

# Priorité LCP / above-the-fold (hero, works, team, cta, contact, approach)
npm run assets:compress:priority

# Tout public/assets (hors logo/)
npm run assets:compress

# Options
npm run assets:compress -- --only=hero
npm run assets:compress -- --dry-run
npm run assets:compress -- --skip-avif
npm run assets:compress -- --max-width=2880
```

## Règles

| Règle | Détail |
|-------|--------|
| Sources | Conservées telles quelles sous `public/assets/**/*.png|jpg` |
| Dérivés | `même-chemin.webp` + `même-chemin.avif` à côté |
| Logos | Exclus (`logo/`) : SVG charte |
| Runtime | `OptimizedImg` → `<picture>` AVIF → WebP → PNG |
| CDN | Toujours via `assetUrl()` / `VITE_ASSET_BASE_URL` |
| Manifest | `public/assets/.derivatives-manifest.json` (tailles + hash) |

## Budgets (cibles produit)

| Zone | Budget cible (meilleur format) | Note |
|------|-------------------------------|------|
| Hero LCP (`slide-01`) | ≤ 250–400 Ko | Critique LCP ≤ 2.5 s |
| Cover Travaux / fiche | ≤ 200–350 Ko | Above-fold stack / sheet |
| Portrait équipe | ≤ 80–120 Ko | Below-fold lazy |
| Galerie fiche | ≤ 300 Ko | Lazy ; QA visuelle obligatoire |

Enforcement CI (`check:images --fail`) = P2.

## Qualités encodeur

- WebP quality **82**, effort 4
- AVIF quality **55**, effort 4
- Resize max width **2880** (hero Figma 2× déjà à 2880 ; pas d’agrandissement)

## QA visuelle requise (Desktop vs Figma)

Après compression / branchement `OptimizedImg`, comparer **Desktop 1440** :

1. Hero slides 01–02 (contraste, grain, netteté sous overlay)
2. Stack Travaux : covers 7 projets
3. Fiches : cover + 2–3 tuiles galerie + Avant/Après Koundji
4. Équipe : 2–3 portraits (dont Eric Golo)
5. Contact fond + CTA poster + Approche slide 1

Critères : pas de soft excessif, pas de banding, cadrage `object-*` inchangé, dimensions CSS / CLS inchangés (`width`/`height` ou aspect réservés).

Si doute qualité → baisser compression (augmenter quality) ou garder PNG pour l’asset concerné ; documenter dans `DESIGN_DECISIONS.md`.

## Mesure initiale (2026-11-18)

| Asset | PNG | WebP | AVIF |
|-------|-----|------|------|
| `hero/slide-01.png` | 8.08 Mo | 0.66 Mo | 0.36 Mo |
| `hero/slide-02.png` | 6.72 Mo | 0.40 Mo | 0.22 Mo |
| `works/*/cover.png` (7) | ~12 Mo | ~0.73 Mo | ~0.46 Mo |
| Total 120 sources | 222.97 Mo | (voir AVIF) | **8.64 Mo** best |

Gain agrégé best format : **~214 Mo** (fichiers dérivés ; PNG sources toujours présents pour fallback / OG).

## Workflow ajout d’asset

```
Figma export / dépôt racine validé
→ public/assets/.../file.png (naming cohérent)
→ npm run assets:stamp-meta -- --manifest=scripts/image-metadata.<scope>.json
→ npm run assets:compress -- --only=<dossier>
→ supprimer dépôts racine une fois intégrés
→ vérifier rendu Desktop → commit sources + dérivés + meta ensemble
```

Ne jamais inventer une image « similaire » ni Unsplash.

## Métadonnées EXIF / IPTC / XMP

Script : `scripts/stamp-image-metadata.mjs` (`npm run assets:stamp-meta`).

| Champ | Valeur |
|-------|--------|
| Artist / Creator / Copyright / Credit | `MSK Création` |
| ImageDescription / Description / Caption-Abstract | alt content (FR) |
| Keywords / Subject | projet · sujet · MSK Création · Bamako |

- **Préféré** : `exiftool` (Homebrew) : écrit EXIF + IPTC/XMP **sans** ré-encoder le PNG.
- **Fallback** : `sharp.withMetadata` (EXIF seulement ; ré-encode PNG → à éviter si exiftool dispo).

Manifests : `scripts/image-metadata.prosperity-thoy.json` (Q24) · `scripts/image-metadata.q25-five.json` (Koundji / Bomoyi / Ecosol / Elvi / Akwaba).

Côté HTML / SEO : alts FR/EN dans `app/content/*/projects.ts` (`coverAlt`, `galleryAlts`) ; `OptimizedImg` + `width`/`height` loader ; JSON-LD `CreativeWork.image` = cover + ImageObject galerie.
