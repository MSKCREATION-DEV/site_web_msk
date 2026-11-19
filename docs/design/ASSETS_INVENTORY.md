# Inventaire assets — MSK Création

Pipeline : **Figma → `public/assets/` → `assetUrl()` → (plus tard) R2**.  
Brand / logos v3 : **Charte PDF → `docs/brand/` → `public/assets/logo/`**.

**Dernière màj :** 2026-11-19 · audit usage + purge `_legacy` (~123 Mo) ; Q26 mockups conservés.

---

## Statut

| Asset | Local | Note |
|-------|-------|------|
| Logo signature intercalée | OK `logo/msk-creation.svg` | Nav / fiche / intro / footer géant |
| Logo bloc gauche | OK `logo/msk-creation-block.svg` | Archive (non branché UI) |
| Signe seul | OK `logo/msk-mark.svg` | Watermark + favicon source |
| Favicon | OK `/favicon.svg` + PNG + `site.webmanifest` | Encre `#0D1330` · KEEP SYSTEM |
| Pack brand | OK `docs/brand/` | PDF + logos + fonts (dossier `charte graphique New` retiré) |
| Hero slides | OK | |
| CTA poster | OK | Pas de vidéo Figma |
| Fond Contact | OK | |
| Approche galerie ×6 | OK | |
| Works covers (7) | OK | `works/{slug}/cover.png` — **USED** via `worksCover` (stack Travaux) |
| Covers fiches (7) | OK | `projects/{slug}/cover.png` |
| Galeries fiches | OK deck V1 | Prosperity **6** · Thòy **3** (Q24) · Koundji **5** · Bomoyi **6** · Ecosol **6** · Elvi **13** · Akwaba **9** · Q25/Q26 |
| Avant/Après Koundji | OK | Layout `msk-page-x` + alts (2026-11-19) |
| Équipe (10) | OK | Grille 5+5 · `team/*.png` (+ WebP/AVIF) |
| Options Service / Budget | **PENDING** | Q03 |
| Projets hors deck | Conservés (à valider) | `beaute-divine`, `delmorian`, `genesis-sarl`, `melya-beauty` · hors routes V1 · covers réels + gallery placeholders 149 o |
| `_legacy/` galeries | **PURGÉ** 2026-11-19 | Anciennes galeries Q25 · 150 fichiers · ~122,8 Mo |

---

## Deck Travaux V1 (7) — ordre Figma

1. `prosperity` → 2. `thoy-art` → 3. `koundji-services` → 4. `bomoyi` → 5. `ecosol` → 6. `elvi-creation` → 7. `akwaba` → Prosperity

Checklist historique : [`ASSETS_DOWNLOAD_WORKS_SHEETS.md`](../validation/ASSETS_DOWNLOAD_WORKS_SHEETS.md) (**livré**).

---

## Convention chemins

```
public/assets/
  logo/msk-creation.svg
  logo/msk-creation-block.svg
  logo/msk-mark.svg
  hero/slide-01.png | slide-02.png
  cta/teaser-poster.png
  contact/background.png
  approach/gallery-0N.png
  works/{slug}/cover.png
  projects/{slug}/cover.png | gallery-NN.png | before.png | after.png
  team/{slug}.png

docs/brand/
```

**Note export Figma :** un fichier nommé `.png` peut être un ZIP. Vérifier avec `file chemin.png` → `PNG image data`.

## Dérivés perf

Après export Figma, lancer `npm run assets:compress` (détail : [`docs/quality/IMAGE_PIPELINE.md`](../quality/IMAGE_PIPELINE.md)).  
Captures UI brutes → `npm run assets:mockup` puis stamp + compress.  
Les PNG sources restent la source de vérité ; `.webp` / `.avif` sont des dérivés runtime via `OptimizedImg`.  
Manifest : `public/assets/.derivatives-manifest.json` (reconstruit après purge orphan 2026-11-19).

## Audit usage (2026-11-19)

Croisement `public/assets/**` ↔ `app/data` + `app/content` + favicons `root.tsx`.

| Classe | Action |
|--------|--------|
| **USED** | Deck V1 projects/works/team/hero/approach/cta/contact/logo branchés |
| **ORPHAN** | `projects/{slug}/_legacy/**` → **supprimé** |
| **KEEP SYSTEM** | Favicons + `site.webmanifest` + manifest dérivés |
| **À valider humain** | Projets hors deck + `logo/msk-creation-block.svg` (archive) |
