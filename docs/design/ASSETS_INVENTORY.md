# Inventaire assets — MSK Création

Pipeline : **Figma → `public/assets/` → `assetUrl()` → (plus tard) R2**.  
Brand / logos v3 : **Charte PDF → `docs/brand/` → `public/assets/logo/`**.

**Dernière màj :** 2026-10-05 — deck Travaux 7 + fiches + covers branchés.

---

## Statut

| Asset | Local | Note |
|-------|-------|------|
| Logo signature intercalée | OK `logo/msk-creation.svg` | Nav / fiche / intro / footer géant |
| Logo bloc gauche | OK `logo/msk-creation-block.svg` | Archive |
| Signe seul | OK `logo/msk-mark.svg` | Watermark + favicon source |
| Favicon | OK `/favicon.svg` + PNG + `site.webmanifest` | Encre `#0D1330` |
| Pack brand | OK `docs/brand/` | PDF + logos + fonts (dossier `charte graphique New` retiré) |
| Hero slides | OK | |
| CTA poster | OK | Pas de vidéo Figma |
| Fond Contact | OK | |
| Approche galerie ×6 | OK | |
| Works covers (7) | OK | `works/{slug}/cover.png` — PNG réels (exports ZIP dézippés) |
| Covers fiches (7) | OK | `projects/{slug}/cover.png` |
| Galeries fiches | OK | Prosperity 9 · Thòy 8 · Koundji 12 · Bomoyi 8 · Ecosol 9 · Elvi 10 · Akwaba 11 |
| Avant/Après Koundji | OK | |
| Équipe (11) | OK | Ordre Figma 5+6 |
| Options Service / Budget | **PENDING** | Q03 |
| Projets hors deck | Présents, hors routes V1 | Beauté Divine, Delmorian, etc. |

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
