# Gouvernance Cursor — MSK

## Présent

| Élément | Chemin |
|---------|--------|
| Agents | [`AGENTS.md`](../../AGENTS.md) |
| Rules | [`.cursor/rules/*.mdc`](../rules/) |
| Skills | [`.cursor/skills/*/SKILL.md`](../skills/) |
| MCP intent | [`.cursor/mcp.json`](../mcp.json) |

## MCP

Les serveurs Figma / Playwright se configurent dans **Cursor Settings → MCP** (credentials utilisateur).  
`.cursor/mcp.json` documente l’intention ; adapter selon le format MCP local de l’équipe.

## Skills à invoquer

| Tâche | Skill |
|-------|-------|
| UI depuis Figma | `msk-figma-implementation` |
| Routes / loaders | `react-router-ssr` |
| Meta / SEO | `seo-review` |
| Mobile | `responsive-qa` |
| Comparaison visuelle | `visual-regression` |
