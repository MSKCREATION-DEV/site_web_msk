# Patterns UI équipe / portrait (recherche 2024–2026)

**Date** : 2026-11-20  
**Objectif** : choisir une interaction radicalement différente de l’ancienne card (gradient + coin corail + « Lire le portrait » overlay).

## Références consultées

| Source | Lien | Signal utile |
|--------|------|--------------|
| Awwwards · ELEF Meet the Team | [inspiration/meet-the-team-elef](https://www.awwwards.com/inspiration/meet-the-team-elef) | Cards humaines, hover + micro-interactions |
| Awwwards · Mandelo team hover | [inspiration/team-member-hover-mandelo](https://www.awwwards.com/inspiration/team-member-hover-mandelo) | Image-first, reveal au survol |
| Awwwards · SOMA interactive grid | [inspiration/interactive-team-grid-…](https://www.awwwards.com/inspiration/interactive-team-grid-hover-reveal-for-team-photos-soma-maison-de-production) | Grille photo, reveal sans card générique |
| Awwwards · Studio Morfar / ALET / Monopo | [Morfar](https://www.awwwards.com/inspiration/our-team-studio-studio-morfar), [ALET](https://www.awwwards.com/inspiration/alet-agency-folio-about-page), [Monopo](https://www.awwwards.com/inspiration/monopo-saigon-team-photo-aesthetic) | Photo studio nette, composition éditoriale |
| Design Lounge · Halden portrait grid | [designlounge.live/p/team-hover-portrait-grid](https://www.designlounge.live/p/team-hover-portrait-grid) | Nom au repos, reveal focus/hover, reduced-motion |
| HTMLburger · Meet the Team 2024 | [18 examples](https://htmlburger.com/blog/meet-the-team-website-examples/) | Zoocha (photo nette + rôle au hover), Ogilvy (détail in-place) |
| Framer · Editorial Team Grid | [marketplace](https://www.framer.com/marketplace/components/editorial-team-grid/) | Grille magazine, portraits traités, hover bloom |
| Flip grids (Redesignee / Etchedy) | Flip bio grids | Flip 3D bio : utile comme contraste, **rejeté** ici (déjà trop proche de l’ancien) |

## 5 patterns retenus

1. **Photo-first / légende hors image** (Zoocha, Morfar, magazine)  
   Portrait pleine chroma ; nom + rôle **sous** la photo, pas dans un voile sombre.

2. **Reveal panneau solide** (Halden veil → adapté MSK Encre)  
   Au hover / focus / tap, un panneau opaque glisse sur la photo (contenu verso). Pas de gradient qui mange le visage au repos.

3. **Hiérarchie de densités** (éditorial agency)  
   Fondateurs plus grands, cadres en triptyque, collaborateurs plus denses. Le layout porte le `tier`, pas un badge inventé.

4. **Accent de marque discret** (ALET / charte MSK)  
   Filet bleu, trait corail horizontal, typo display/serif : signaux MSK sans « coin décoratif » ni pastille générique.

5. **A11y interaction unique** (Halden + APG)  
   Même reveal pour hover (pointeur fin), tap (`.is-open`), clavier (`aria-expanded`), `prefers-reduced-motion` = fade.

## Pattern rejeté (ancien)

Flip 3D + scrim bas + coin corail + invitation overlay « Lire le portrait » sur la photo.

## Concept retenu pour MSK

**Plaque éditoriale** (`TeamFlipCard` / classes `.msk-team-plate`) : fond papier sous photo, légende magazine, slide Encre depuis le bas. Détail dans `TEAM_PAGE.md`.
