# Questions ouvertes Figma / produit — MSK

Suivi des ambiguïtés. Les items **fermés** restent pour historique.

---

## Ouvertes

| ID | Question | Impact | Statut |
|----|----------|--------|--------|
| Q01 | Liste exacte des projets de la grille Travaux (APERÇU 6) | Data + routes fiches | **FERMÉE** — Koundji, Thòy ’Art, Ecosol, Bomoyi, Akwaba, Elvi Creation |
| Q02 | Hex final `Accent/Ocre` (variable Figma) | Tokens CSS | **SUPERSÉDÉE** — Charte v3 : Corail `#FF5A3C` remplace ocre (2026-10-03) |
| Q03 | Options listes Service / Budget | Formulaire Contact | **PENDING** — selects vides ; options NON TROUVÉ |
| Q12 | Fond Contact + bureau équipe | Assets | **PARTIEL** — Contact `background.png` OK ; office équipe NON TROUVÉ |
| Q13 | Galeries + Avant/Après | Fiches | **PRESQUE FERMÉE** — grille + before/after OK ; `akwaba/gallery-06` encore 1×1 |
| Q14 | Hero « Dernièrement » | Hero | **FERMÉE** — Koundji, Ecosol, Beauté Divine (sans lien) |
| Q15 | Couleur hover Bomoyi | Travaux | **FERMÉE** — `#1D73BC` (charte v3 ; était `#137DC5`) |
| Q16 | Galerie Approche | Approche | **FERMÉE** — `approach/gallery-01…06` branchés |
| Q17 | Resync Figma couleurs vs Charte v3 | Design system Figma | **OUVERTE** — code aligné PDF (Encre / `#1D73BC` / Corail) ; fichier Figma encore sur ancien dark `#080808` + ocre |
| Q18 | Travaux / fiches hors maquette Figma | Layout + motion | **FERMÉE (client)** — pattern Dagobert adapté (stack + case study), couleurs MSK ; voir DESIGN_DECISIONS 2026-10-04 |

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
