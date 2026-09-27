# Questions ouvertes Figma / produit — MSK

Suivi des ambiguïtés. Les items **fermés** restent pour historique.

---

## Ouvertes

| ID | Question | Impact | Statut |
|----|----------|--------|--------|
| Q01 | Liste exacte des projets de la grille Travaux (APERÇU 6) | Data + routes fiches | **FERMÉE** — Koundji, Thòy ’Art, Ecosol, Bomoyi, Akwaba, Elvi Creation |
| Q02 | Hex final `Accent/Ocre` (variable Figma) | Tokens CSS | **FERMÉE** — `#C8742A` (audit 2026-09-25) |
| Q03 | Options listes Service / Budget | Formulaire Contact | **PENDING** — placeholders OK ; options NON TROUVÉ |
| Q12 | Fond Contact + bureau équipe | Assets | **PARTIEL** — Contact = vidéo (pas de PNG) ; office équipe NON TROUVÉ |
| Q13 | Galeries + Avant/Après PNG 1×1 | Fiches | **PENDING export** — mapping prêt, voir `EXPORT_CHECKLIST.md` |
| Q14 | Hero « Dernièrement » | Hero | **FERMÉE** — Koundji, Ecosol, Beauté Divine (sans lien) |
| Q15 | Couleur hover Bomoyi | Travaux | **FERMÉE** — `#137DC5` |
| Q16 | Galerie Approche | Approche | **PARTIEL** — UI ×6 prête ; PNG à exporter (`approach/gallery-01…06`) |

---

## Fermées (2026-09-24)

| ID | Question | Décision |
|----|----------|----------|
| C01 | RR 7 vs attendre v8 | **Latest** (`create-react-router@latest`) |
| C02 | Mobile | Brief séparé ; pas d’UI inventée |
| C03 | 6 vs 10 projets | **Grille Travaux** ; fiches extras = designer |
| C04 | WhatsApp | Infos Figma bonnes |
| C05 | Vidéo CTA | Tout prendre sur Figma |
| C06 | Avant/Après | Exactement le design par fiche |
| C07 | Langues | FR + EN créés |
| C08 | Flèches | Lucide autorisé |
| C11 | Grille Travaux 6 projets | Koundji, Thòy ’Art, Ecosol, Bomoyi, Akwaba, Elvi Creation |
| C12 | CTA vidéo | Absente dans Figma — poster seul |
| Q04 | SEO meta | Home content Figma ; pas d’invention marketing |
| Q05 | Motion | Mot hero 400ms/3s ; hover 350ms |
| Q06 | Pixels Desktop | Audit 2026-09-25 appliqué |
| Q09–Q11 | Hero / Travaux / Services copy | Fermées via captures + audit |

---

## Blocage technique

- **Figma MCP rate limit** (seat View) au 2026-09-25 : toujours bloqué — `get_variable_defs`, `get_design_context`, `get_screenshot` refusés.
- Checklist détaillée + liens directs : [`FIGMA_HANDOFF_NEEDED.md`](./FIGMA_HANDOFF_NEEDED.md).
- Action : upgrade seat / attendre reset quota, **ou** fournir captures/exports listés dans le handoff.
