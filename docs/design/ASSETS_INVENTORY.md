# Inventaire assets — MSK Création

Pipeline : **Figma → `public/assets/` → `assetUrl()` → (plus tard) R2**.

**Statut export MCP (2026-09-24) :** rate limit Figma MCP (seat View) — **aucun fichier binaire récupéré automatiquement**.  
Les chemins ci-dessous sont la convention cible. Remplir par export manuel Figma ou relance MCP.

---

## Convention de chemins

```
public/assets/
  logo/
    msk-creation.svg          # Logo vecteur MSK (intro / header / fiche)
  hero/
    slide-01.webp             # Diaporama hero Photo=1
    slide-02.webp             # Diaporama hero Photo=2
  works/                      # Vignettes grille Travaux (slugs grille uniquement)
    {slug}/cover.webp
  projects/                   # Galeries fiches
    {slug}/cover.webp
    {slug}/gallery-01.webp
    {slug}/before.webp        # si Avant/Après
    {slug}/after.webp
  team/
    {member-slug}.webp        # Portraits Recadrer
  cta/
    teaser-poster.webp        # Image de secours CTA
    teaser.mp4                # Vidéo si présente dans Figma
```

Tous les `src` dans le code passent par `assetUrl("/assets/...")`.

---

## Statut par asset

| Asset | Présent Figma | Source locale | Note |
|-------|---------------|---------------|------|
| Logo MSK vecteur | Oui | **ABSENTE** | `Asset logo MSK présent dans Figma mais source non disponible.` (MCP rate limit) |
| Hero slides | Oui | **ABSENTE** | Idem |
| Vignettes Travaux | Oui | **ABSENTE** | Attendre liste grille Q01 |
| Galeries projets | Oui | **ABSENTE** | Idem |
| Avant/Après KOUNDJI | Oui (fiche) | **ABSENTE** | Seulement si dans grille |
| Portraits équipe | Oui | **ABSENTE** | Mode Recadrer — ne pas re-cropper en « Remplir » |
| CTA vidéo | Intention Figma | **ABSENTE** | Prendre tout depuis Figma quand export possible |
| CTA poster / secours | Oui | **ABSENTE** | |

---

## Export manuel (en attendant MCP)

1. Figma → sélectionner calque `IMG · …` ou Logo vecteur.
2. Export SVG (logo) / WebP ou PNG (photos), 2× si besoin.
3. Placer dans le chemin convention ci-dessus **sans renommer le contenu visuel**.
4. Cocher la ligne dans ce tableau.
5. Commit assets séparément si volumineux.

### Nodes utiles

| Node | Contenu |
|------|---------|
| `24:8` / `25:36` | Logo intro |
| `24:6` | Logo fiche |
| `150:973` | Diaporama hero |
| `9:14` + galeries | Visuels projets |
| Grille Travaux | Covers cartes |

---

## Interdits

- Unsplash / images stock
- Images « similaires »
- Remplacer un asset manquant en silence

Signalement type :

> Asset X présent dans Figma mais source non disponible.
