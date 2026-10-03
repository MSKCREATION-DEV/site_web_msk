# Inventaire assets — MSK Création

Pipeline : **Figma → `public/assets/` → `assetUrl()` → (plus tard) R2**.  
Brand / logos v3 : **Charte PDF → `docs/brand/` → `public/assets/logo/`**.

**Dernière màj :** 2026-10-03 — Charte graphique v3 (logos + favicons Encre).

---

## Statut

| Asset | Local | Note |
|-------|-------|------|
| Logo intercalé | OK `logo/msk-creation.svg` | Charte v3 réservé blanc |
| Logo bloc gauche | OK `logo/msk-creation-block.svg` | Header / fiche |
| Signe seul | OK `logo/msk-mark.svg` | Watermark + source favicon |
| Favicon | OK `/favicon.svg` + PNG + `site.webmanifest` | Signe blanc sur Encre `#0D1330` |
| Pack brand | OK `docs/brand/` | PDF + compositions + fonts |
| Hero slides | OK `hero/slide-01.png`, `slide-02.png` | |
| CTA poster | OK `cta/teaser-poster.png` | Vidéo CTA absente Figma |
| Fond Contact | OK `contact/background.png` | |
| Approche galerie ×6 | OK `approach/gallery-01…06.png` | |
| Works covers (grille 6) | OK | |
| Galeries fiches grille | OK (filtre >1 Ko) | `akwaba/gallery-06` encore 1×1 → ignoré loader |
| Avant/Après Koundji | OK `before.png` / `after.png` | |
| Équipe (10) | OK | |
| Options Service / Budget | **PENDING** | Q03 — listes vides volontairement |
| Projets hors grille | Assets présents, hors V1 routes | Beauté Divine, Delmorian, etc. |

---

## Grille Travaux V1 (Q01 fermée)

**Gauche :** `koundji-services` → `ecosol` → `akwaba`  
**Droite :** `thoy-art` → `bomoyi` → `elvi-creation`

---

## Convention chemins

```
public/assets/
  logo/msk-creation.svg          # intercalé blanc
  logo/msk-creation-block.svg    # bloc à gauche (nav)
  logo/msk-mark.svg              # signe seul
  hero/slide-01.png | slide-02.png
  cta/teaser-poster.png
  contact/background.png
  approach/gallery-0N.png
  works/{slug}/cover.png
  projects/{slug}/cover.png | gallery-NN.png | before.png | after.png
  team/{slug}.png

docs/brand/                      # charte PDF + pack logos/fonts classés
```
