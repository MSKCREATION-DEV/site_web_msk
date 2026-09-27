# Inventaire assets — MSK Création

Pipeline : **Figma → `public/assets/` → `assetUrl()` → (plus tard) R2**.

**Dernière màj :** 2026-09-25 — exports manuels validés.

---

## Statut

| Asset | Local | Note |
|-------|-------|------|
| Logo MSK | OK `logo/msk-creation.svg` | |
| Favicon | OK `/favicon.svg` | Symbole MSK (export logo) |
| Hero slides | OK `hero/slide-01.png`, `slide-02.png` | |
| CTA poster | OK `cta/teaser-poster.png` | Aussi réutilisé temporairement bandeau bureau équipe |
| CTA vidéo | **Absente Figma** | Poster seul en V1 |
| Fond Contact | **PENDING export** | Section Contact sans photo dédiée (Q12) |
| Works covers (grille 6) | OK | koundji, thoy-art, ecosol, bomoyi, akwaba, elvi-creation |
| Galeries fiches | **PLACEHOLDERS 1×1** | Re-exporter PNG Figma (Q13) |
| Avant/Après Koundji | **PLACEHOLDERS 1×1** | Re-exporter before/after (Q13) |
| Équipe (10) | OK | Portrait Issiaka re-exporté OK |

---

## Grille Travaux V1 (Q01 fermée)

Ordre Figma (colonnes APERÇU) :

**Gauche :** `koundji-services` → `ecosol` → `akwaba`  
**Droite :** `thoy-art` → `bomoyi` → `elvi-creation`

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
