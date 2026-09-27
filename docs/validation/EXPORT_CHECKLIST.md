# Checklist export PNG 2× — manquants MSK

Les chemins code sont prêts. Les fichiers locaux sont encore des **placeholders 1×1** (ou absents). Exporte depuis Figma → enregistre **exactement** sous ces noms.

Base Figma : [MSK-MAQUETTE](https://www.figma.com/design/wn9ZMeW9YwaF3PE8Wqa2WS/MSK-MAQUETTE)

## Priorité 1 — Approche (galerie bureaux ×6)

| Calque Figma | Fichier cible |
|--------------|---------------|
| IMG · Bureaux 01 · Entrée | `public/assets/approach/gallery-01.png` |
| IMG · Bureaux 02 · Hall d’accueil | `public/assets/approach/gallery-02.png` |
| IMG · Bureaux 03 · Bureau | `public/assets/approach/gallery-03.png` |
| IMG · Bureaux 04 · Espace de travail | `public/assets/approach/gallery-04.png` |
| IMG · Bureaux 05 · Open space | `public/assets/approach/gallery-05.png` |
| IMG · Bureaux 06 · Détail | `public/assets/approach/gallery-06.png` |

Section : [Desktop Approche](https://www.figma.com/design/wn9ZMeW9YwaF3PE8Wqa2WS/MSK-MAQUETTE?node-id=2-14)

## Priorité 2 — Koundji Avant / Après + galerie

| Calque | Fichier |
|--------|---------|
| Logo avant | `public/assets/projects/koundji-services/before.png` |
| Logo après | `public/assets/projects/koundji-services/after.png` |
| visuel principal → cover (déjà OK si cover.png valide) | optionnel : aussi `gallery-01.png` |
| visuels 02…07 | `gallery-02.png` … `gallery-08.png` |

Frame : [KOUNDJI](https://www.figma.com/design/wn9ZMeW9YwaF3PE8Wqa2WS/MSK-MAQUETTE?node-id=9-2)

## Priorité 3 — Galeries autres projets grille

| Projet | Fichiers |
|--------|----------|
| Thòy ’Art | `thoy-art/gallery-01` … `04` |
| Ecosol | `ecosol/gallery-01` … `05` |
| Bomoyi | `bomoyi/gallery-01` … `04` |
| Akwaba | `akwaba/gallery-01` … `07` |
| Elvi | `elvi-creation/gallery-01` … `06` |

Chemin : `public/assets/projects/{slug}/gallery-NN.png`

## Non exportable / hors scope code

| Item | Statut |
|------|--------|
| Options Service / Budget | **NON TROUVÉ** — à saisir manuellement dans Figma Dev annotations ou me donner la liste |
| Fond Contact PNG | Vidéo Figma seulement — pas d’image fill |
| `team/office.png` | **NON TROUVÉ** — on garde poster CTA temporaire |
| gallery-07/08 Approche | N’existent pas (6 images max) |

## Après export

1. Remplace les fichiers (taille > 1 Ko).  
2. Dis-moi « exports OK » → je vérifie le rendu (loader ignore déjà les 1×1).
