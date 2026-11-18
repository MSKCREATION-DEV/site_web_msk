# Gouvernance Cursor — MSK

## Présent

| Élément | Chemin |
|---------|--------|
| Agents | [`AGENTS.md`](../../AGENTS.md) |
| Rules | [`.cursor/rules/*.mdc`](../../.cursor/rules/) |
| Skills MSK + Addy | [`.cursor/skills/*/SKILL.md`](../../.cursor/skills/) |
| References Addy (checklists) | [`.cursor/references/`](../../.cursor/references/) |
| Index qualité (pointeur) | [`docs/quality/README.md`](../quality/README.md) |
| Sync Addy | [`scripts/sync-agent-skills.sh`](../../scripts/sync-agent-skills.sh) |
| MCP intent | [`.cursor/mcp.json`](../../.cursor/mcp.json) |
| Rule routage skills | [`.cursor/rules/agent-skills.mdc`](../../.cursor/rules/agent-skills.mdc) |

## MCP

Les serveurs Figma / Playwright se configurent dans **Cursor Settings → MCP** (credentials utilisateur).  
`.cursor/mcp.json` documente l’intention ; adapter selon le format MCP local de l’équipe.

## Skills MSK (primaires)

| Tâche | Skill |
|-------|-------|
| UI depuis Figma | `msk-figma-implementation` |
| Routes / loaders | `react-router-ssr` |
| Meta / SEO route MSK | `seo-review` |
| Mobile / responsive | `responsive-qa` |
| Comparaison visuelle | `visual-regression` |

Ces skills **ne doivent jamais être écrasées** par un sync upstream.

## Skills Addy Osmani (complémentaires)

Source : [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills) (intégration sélective, pas monorepo entier).

| Skill | Priorité | Rôle MSK |
|-------|----------|----------|
| `using-agent-skills` | P0 | Méta-routage par phase (puis primauté MSK) |
| `performance-optimization` | P0 | Perf web / bundle / images (sans inventer UI) |
| `security-and-hardening` | P0 | Hardening formulaires, deps, headers |
| `frontend-ui-engineering` | P0 | Complément a11y / UI générique **après** Figma MSK |
| `shipping-and-launch` | P0 | Checklist avant mise en prod |
| `code-review-and-quality` | P1 | Revue qualité |
| `constraint-driven-development` | P1 | Barre qualité / floor guards |
| `browser-testing-with-devtools` | P1 | Vérif runtime navigateur |
| `incremental-implementation` | P1 | Livraison incrémentale (aligné workflow MSK) |
| `source-driven-development` | P1 | Code vérifié contre docs (Context7, etc.) |
| `ci-cd-and-automation` | P1 | CI / automation |

### Skipped (volontaire)

`idea-refine`, `interview-me`, `deprecation-and-migration`, `observability-and-instrumentation`, `test-driven-development`, `spec-driven-development`, et le reste du catalogue upstream : hors scope P0 MSK pour l’instant. Ajouter via `scripts/sync-agent-skills.sh` si besoin.

## Primauté et conflits

1. **Router** : `using-agent-skills` → puis table MSK / Addy ci-dessus + rule `agent-skills.mdc`.
2. **UI Figma / i18n / SEO produit MSK** : skills + rules MSK **primaires**.
3. **Conflit Figma vs best practice générique Addy** : Figma + [`FIGMA_OPEN_QUESTIONS.md`](../validation/FIGMA_OPEN_QUESTIONS.md) / [`DESIGN_DECISIONS.md`](../design/DESIGN_DECISIONS.md) gagnent. Documenter, valider, puis seulement coder.
4. Ne pas coller le contenu entier des skills dans les rules.

## References (checklists)

Installées sous **`.cursor/references/`** pour préserver les chemins relatifs des skills (`../../references/*.md` depuis `.cursor/skills/<name>/SKILL.md`).

Fichiers : `performance-checklist.md`, `accessibility-checklist.md`, `security-checklist.md`, `definition-of-done.md`, `testing-patterns.md`, `observability-checklist.md`, `orchestration-patterns.md`.

Upstream : les installs skill-by-skill peuvent perdre ces paths ([issue #361](https://github.com/addyosmani/agent-skills/issues/361)).

## Resync

```bash
./scripts/sync-agent-skills.sh
# ou avec un clone local déjà présent :
ADDY_SKILLS_SRC=/tmp/addyosmani-agent-skills ./scripts/sync-agent-skills.sh
```

Le script clone en shallow hors working tree si besoin, sync la whitelist, **ignore** toute skill déjà présente (protection MSK + pas d’écrasement local), et rafraîchit `.cursor/references/`.
