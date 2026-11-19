# Questions ouvertes Figma / produit — MSK

Suivi des ambiguïtés. Les items **fermés** restent pour historique.

---

## Ouvertes

| ID | Question | Impact | Statut |
|----|----------|--------|--------|
| Q03 | Options listes Service / Budget | Formulaire Contact | **PENDING** — selects vides ; options NON TROUVÉ |
| Q12 | Bureau équipe dédié | Asset | **PARTIEL** — Contact OK ; `team/office.png` NON TROUVÉ (section Équipe Figma 2:19 sans bandeau bureau) |
| Q17 | Resync Figma couleurs vs Charte v3 | Design system Figma | **OUVERTE** — code Encre / `#1D73BC` / Corail ; Figma peut encore mélanger anciens tokens |
| Q20 | Profils sociaux hors footer Figma | SEO Organization | **PARTIEL** — `sameAs` = Instagram / TikTok / LinkedIn déjà dans `footer.social` ; tout ajout = validation |
| Q21 | Bios / pages Person au-delà de name+role Figma | SEO Person | **PENDING** — roles content seulement |
| Q22 | Alts projets enrichis (marketing) | A11y / SEO images | **PENDING** — V1 = titre (+ index galerie) |
| Q23 | Backend contact (Resend / autre) + messages erreur serveur | Formulaire | **PENDING** — runbook `docs/design/CONTACT_BACKEND.md` ; action RR + stub désactivé ; UX honnête `unavailable*` (plus de faux succès). **Choix provider à valider humain.** |
| Q24 | Fiches Prosperity + Thòy : galerie Figma vs assets locaux | Fiches | **PARTIELLE** — 2026-11-18 : 8 assets racine intégrés (`prosperity` gallery-01…06 full, `thoy-art` gallery-01…03). Travel banner = pixels identiques à l’ancien `gallery-09` (slogan FR « Partir en toute sérénité », pas « Trust in the investment » board). Copy FR/EN eyebrows + RÉALISATIONS + APPROCHE + alts branchés ; UI intro 2 cols + APPROCHE intercalé. QA Desktop vs Figma encore due. Anciennes galeries filiales/mockups retirées des slots fiche. |
| Q25 | Fiches Koundji · Bomoyi · Ecosol · Elvi · Akwaba : galeries Figma vs locaux | Fiches | **PARTIELLE** — 2026-11-19 : assets branding racine intégrés. Puis **Q26** mockups UI sites/apps (13 captures) : Koundji **5** · Bomoyi **6** · Ecosol **6** · Elvi **13** · Akwaba **9**. Pipeline `assets:mockup`. **Reste** : QA Desktop vs Figma due (layouts Figma historiques + ajouts UI hors board). |

---

## Fermées récemment

| ID | Décision |
|----|----------|
| Q01 / C11 | Deck Travaux **7** : Prosperity → Thòy → Koundji → Bomoyi → Ecosol → Elvi → Akwaba (2026-10-04/05) |
| Q13 | Galeries + Avant/Après + Prosperity branchés (2026-10-05) |
| Q18 | Stack scroll Dagobert + fiches case study, couleurs projet Figma (2026-10-04) |
| Q19 | Covers works + fiches 7 livrés (2026-10-05) |
| Q02 / Q14 / Q15 / Q16 | Voir historique |

---

## Fermées (2026-09-24)

| ID | Question | Décision |
|----|----------|----------|
| C01 | RR 7 vs attendre v8 | **Latest** |
| C02 | Mobile | Brief séparé ; pas d’UI inventée |
| C03 | 6 vs 10 projets | Grille puis **deck 7** (MAJ 2026-10) |
| C04 | WhatsApp | Infos Figma |
| C05–C08 / C12 | CTA / Avant-Après / i18n / Lucide | Fermées |
| Q04–Q06 / Q09–Q11 | SEO / motion / pixels / copy | Fermées |

---

## Notes MCP

- Seat View : quotas limités. Specs Travaux/fiches récupérées via audit agent Figma + `get_design_context` ponctuel (Équipe `2:19`).
- Prompts historiques : `FIGMA_PROMPT_WORKS_7.md`, `FIGMA_PROMPT_REMAINING.md`, `FIGMA_HANDOFF_NEEDED.md`.
