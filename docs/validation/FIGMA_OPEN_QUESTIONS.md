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
| Q27 | Indicateur de chargement navigation (hors Intro `9:45`) | UX pending | **DÉCIDÉ (intermédiaire)** — 2026-11-19 : pas de frame Figma loader / barre / skeleton navigation. Implémenté barre top 2 px bleu `#1D73BC` (pattern standard documenté dans `DESIGN_DECISIONS`). À valider designer si un traitement Figma dédié est souhaité. |
| Q28 | Comportement nav au scroll (sticky fixe vs smart hide/show) | UX chrome | **DÉCIDÉ (intermédiaire)** — 2026-11-19 : Figma = barre H96 en haut d’artboard, pas de proto hide-on-scroll. Code : `fixed` + hide-on-scroll-down / show-on-scroll-up (smart header). `prefers-reduced-motion` = toujours visible. Hauteur clamp 72–96 px. À valider designer. |
| Q29 | Mention GDPR / politique de confidentialité (footer ou Contact) | Conformité | **PENDING** — absente du footer Figma et du content `footer.ts`. Pas de page / lien inventé. Proposition minimale si validation : lien footer « Politique de confidentialité » + page légale (finalité brief, durée, destinataire MSK, provider e-mail). Captcha tiers (Turnstile / hCaptcha) : option documentée dans `CONTACT_BACKEND.md`, **non activée**. |
| Q30 | Curseur custom + scrollbars marque (hors maquette) | UX chrome | **DÉCIDÉ (intermédiaire)** — 2026-11-19 : aucun frame / proto Figma ni règle charte v3 pour curseur ou scrollbar. Implémenté chrome minimal documenté dans `DESIGN_DECISIONS` (`brand-pointer.css` + `BrandCursor`). À valider designer (garder / retirer / ajuster couleurs). |

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
