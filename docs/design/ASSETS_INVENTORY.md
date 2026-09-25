# Inventaire assets — MSK Création

Pipeline : **Figma → `public/assets/` → `assetUrl()` → (plus tard) R2**.

**Dernière màj :** 2026-09-25 — exports manuels validés.

---

## Statut

| Asset | Local | Note |
|-------|-------|------|
| Logo MSK | OK `logo/msk-creation.svg` | |
| Hero slides | OK `hero/slide-01.png`, `slide-02.png` | |
| CTA poster | OK `cta/teaser-poster.png` | |
| CTA vidéo | **Absente Figma** | Poster seul en V1 |
| Works covers (grille 6) | OK | koundji, thoy-art, ecosol, bomoyi, akwaba, elvi-creation |
| Galeries fiches | OK (grille + extras designer) | Extras hors grille non exposés en routes |
| Avant/Après Koundji | OK before/after | |
| Équipe (10) | OK | Portrait Issiaka re-exporté OK |

---

## Grille Travaux V1 (Q01 fermée)

Ordre Figma :

1. `koundji-services` (2025)
2. `thoy-art` (2024)
3. `ecosol` (2025)
4. `bomoyi` (2025)
5. `akwaba` (2024)
6. `elvi-creation` (2025)

---

## Équipe (Figma 05)

1. Mathieu Diarra — Fondateur  
2. Isdalinia Boisseaux — Co-fondatrice  
3. Andile Boussari — Responsable opérations  
4. Yahe Bah — Commerciale (`yaye-bah.png`)  
5. Amadou Samba Guiro — Lead développeur  
6. Fatimatou Diallo — Graphiste  
7. Lidaou Espoir Awesso — Vidéaste & graphiste  
8. Assetou Mangara — Community manager  
9. Madina Tall — Assistante de direction  
10. Issiaka Yacouba Traoré — Comptable  

---

## Convention chemins

```
public/assets/
  logo/msk-creation.svg
  hero/slide-01.png | slide-02.png
  cta/teaser-poster.png
  works/{slug}/cover.png
  projects/{slug}/cover.png | gallery-NN.png | before.png | after.png
  team/{slug}.png
```
