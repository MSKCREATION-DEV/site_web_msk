---
name: msk-figma-implementation
description: Implémenter une section ou un composant MSK depuis Figma avec fidélité stricte. Utiliser avant tout travail UI.
---

# MSK — Implémentation Figma

## Avant de coder

1. Identifier le node Figma (URL avec `node-id`).
2. Lire `docs/design/FIGMA_INVENTORY.md` et `DESIGN_TOKENS.md`.
3. Appeler Figma MCP `get_design_context` (skill figma-design-to-code d’abord).
4. Lister assets requis ; signaler les manquants.

## Pendant

- Adapter le code de référence MCP au stack MSK (pas de collage brut).
- Contenu via props / `app/content` — pas de strings inventées.
- Images via `assetUrl()`.
- Lucide pour flèches/icônes d’interaction seulement.

## Après

- Comparer au screenshot Figma.
- `npm run typecheck`.
- Noter ambiguïtés dans `FIGMA_OPEN_QUESTIONS.md`.
