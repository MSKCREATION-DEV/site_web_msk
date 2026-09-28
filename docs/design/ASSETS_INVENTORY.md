# Inventaire assets — MSK Création

Pipeline : **Figma → `public/assets/` → `assetUrl()` → (plus tard) R2**.

**Dernière màj :** 2026-09-27 — exports Approche / Contact / galeries grille.

---

## Statut

| Asset | Local | Note |
|-------|-------|------|
| Logo MSK | OK `logo/msk-creation.svg` | |
| Favicon | OK `/favicon.svg` + `site.webmanifest` | |
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
  logo/msk-creation.svg
  hero/slide-01.png | slide-02.png
  cta/teaser-poster.png
  contact/background.png
  approach/gallery-0N.png
  works/{slug}/cover.png
  projects/{slug}/cover.png | gallery-NN.png | before.png | after.png
  team/{slug}.png
```
