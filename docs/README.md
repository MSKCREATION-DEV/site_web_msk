# Documentation : MSK Création

Point d’entrée de toute la doc du dépôt. Le README racine présente le projet ; ici on **oriente** vers le bon document.

---

## Par besoin

| Je veux… | Document |
|----------|----------|
| Comprendre **comment le site est construit** (routing, pages, assets, renommages) | [**Guide projet**](./architecture/PROJECT_GUIDE.md) |
| Contribuer / agent Cursor | [`AGENTS.md`](../AGENTS.md) + [`CONSTRAINTS.md`](../CONSTRAINTS.md) |
| Tokens couleur / typo / logo | [Brand](./brand/README.md) · [`DESIGN_TOKENS.md`](./design/DESIGN_TOKENS.md) |
| Inventaire Figma / assets | [`FIGMA_INVENTORY.md`](./design/FIGMA_INVENTORY.md) · [`ASSETS_INVENTORY.md`](./design/ASSETS_INVENTORY.md) |
| Compresser / remplacer une image | [`IMAGE_PIPELINE.md`](./quality/IMAGE_PIPELINE.md) + guide § Assets |
| Formulaire contact / Resend | [`CONTACT_BACKEND.md`](./design/CONTACT_BACKEND.md) |
| SEO (meta, JSON-LD, sitemap) | [`SEO_STRUCTURED_DATA.md`](./design/SEO_STRUCTURED_DATA.md) |
| Preview / prod Vercel | [`VERCEL_PREVIEW.md`](./ops/VERCEL_PREVIEW.md) · [`PROD_GO_LIVE_CHECKLIST.md`](./ops/PROD_GO_LIVE_CHECKLIST.md) |
| Mobile | [`MOBILE_BRIEF.md`](./design/MOBILE_BRIEF.md) (pas d’UI inventée) |
| Questions ouvertes Figma | [`FIGMA_OPEN_QUESTIONS.md`](./validation/FIGMA_OPEN_QUESTIONS.md) |
| Gouvernance Cursor / skills | [`CURSOR_GOVERNANCE.md`](./architecture/CURSOR_GOVERNANCE.md) |

---

## Arborescence `docs/`

```
docs/
├── README.md                 ← vous êtes ici
├── architecture/
│   ├── PROJECT_GUIDE.md      ← mode d’emploi technique complet
│   └── CURSOR_GOVERNANCE.md  ← skills / rules agents
├── brand/                    ← charte v3, logos, fonts
├── design/                   ← tokens, décisions, inventaires, contact, SEO
├── quality/                  ← pipeline images, checklists
├── ops/                      ← Vercel, go-live, Search Console
├── validation/               ← questions Figma, handoff, QA
└── decisions/                ← réservé ADR futurs
```

---

## Sources de vérité (ordre)

1. **Figma** Desktop : layout, copy, photos, interactions  
2. **Charte v3** (`docs/brand/`) : couleurs, logos, familles typo  
3. **Décisions documentées** (`DESIGN_DECISIONS.md`, `FIGMA_OPEN_QUESTIONS.md`)  
4. **Code** : reflet des trois précédents, jamais l’inverse pour le design

---

## Convention de maintenance doc

- Un sujet = un fichier (éviter les doublons de procédure).  
- Le guide projet **explique le comment** ; les inventaires listent **l’état**.  
- Après un changement structurel (route, slug, dossier assets) : mettre à jour le guide **et** l’inventaire concerné.  
- Pas de tiret cadratin / demi-cadratin dans `app/content` et `app/data` (`npm run check:copy`).
