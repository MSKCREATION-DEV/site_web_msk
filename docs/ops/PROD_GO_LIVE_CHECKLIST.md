# Checklist go-live production — MSK Création

Mémoire opérationnelle pour ne rien oublier **juste avant** / **au cutover** / **juste après** la mise en prod.  
Pas d’implémentation RGPD / captcha / cookies dans ce fichier : uniquement le suivi.

**Branche cible prod :** `main` (Production Branch Vercel)  
**Preview :** `dev`  
**Domaine attendu :** `https://www.mskcreation.net` (ajuster si le domaine final change)

Références croisées :

- Contact / Resend : [`docs/design/CONTACT_BACKEND.md`](../design/CONTACT_BACKEND.md)
- Preview Vercel : [`docs/ops/VERCEL_PREVIEW.md`](./VERCEL_PREVIEW.md)
- Search Console : [`docs/ops/GOOGLE_SEARCH_CONSOLE.md`](./GOOGLE_SEARCH_CONSOLE.md)
- SEO / OG : [`docs/design/SEO_STRUCTURED_DATA.md`](../design/SEO_STRUCTURED_DATA.md)
- Questions ouvertes : [`docs/validation/FIGMA_OPEN_QUESTIONS.md`](../validation/FIGMA_OPEN_QUESTIONS.md)
- Décisions : [`docs/design/DESIGN_DECISIONS.md`](../design/DESIGN_DECISIONS.md)

Légende **statut** : `à faire` · `fait` · `N/A` (non applicable tant que condition non remplie) · `partiel`

---

## 1. Avant prod (bloquant)

| Item | Pourquoi | Quand | Statut |
|------|----------|-------|--------|
| **Env Production Vercel** : `CONTACT_EMAIL_ENABLED=1`, `RESEND_API_KEY` (clé dédiée `site-web-msk-prod`), `CONTACT_EMAIL_FROM`, `CONTACT_EMAIL_TO` | Sans ça le formulaire reste en stub « bientôt disponible » (Q23 runbook) | Avant 1er deploy prod | **à faire** |
| **`VITE_SITE_ORIGIN=https://www.mskcreation.net`** (sans `/` final) en scope **Production** + Redeploy | Canonical, hreflang, OG, JSON-LD, `Sitemap:` robots ; gate `npm run check:origin -- --strict` | Avant cutover / build prod | **à faire** |
| Smoke contact Preview OK (FR + EN → e-mail réel + message Figma « Brief reçu ») | Valider Resend / Reply-To / honeypot avant d’exposer le domaine public | Avant cutover | **à faire** (Preview) |
| `npm run check` + `npm run build` verts sur la révision à merger | Évite un deploy cassé (typecheck, copy, origin) | Avant merge `dev` → `main` | **à faire** à chaque cutover |
| Merge / promote **`dev` → `main`** uniquement avec révision validée | Production Branch = `main` ; Preview = `dev` | Avant cutover DNS | **à faire** |
| DNS + SSL domaine (`www` / apex) pointant vers Vercel | Site public HTTPS indexable | Avant GSC / annonces | **à faire** |

## 2. Avant prod (recommandé, non bloquant UI)

| Item | Pourquoi | Quand | Statut |
|------|----------|-------|--------|
| **Page confidentialité RGPD (Q29)** + liens footer / formulaire contact | Formulaire collecte nom + e-mail + message ; obligation d’informer (finalité brief, durée, destinataire MSK, provider Resend). Absente du Figma footer → **validation copy produit** avant code | Avant ou au plus tard juste après go-live public | **à faire** (Q29 PENDING) |
| **Photos Visuel HQ Mathieu / Isdalinia** à re-déposer (`Visuel (1).png` / `Visuel.png`) puis réintégrer (resize 352×470, stamp, WebP/AVIF, home + page équipe) | Intégration précédente = mêmes pixels que les anciens portraits ; sources HQ effacées après tentative | Avant go-live si portraits fondateurs doivent changer | **à faire** (attente re-dépôt humain) |
| QA Desktop vs Figma (home + fiches Q24/Q25 + page équipe hors Figma) | Dette visuelle documentée ; go-live possible mais écarts possibles | Avant annonce large | **à faire** / partiel |
| Valider Q03 options Service / Budget vs frame Contact | Options factuelles livrées ; designer peut ajuster libellés | Avant go-live si Contact critique | **partiel** (intermédiaire) |
| Confirmer Production Branch = **`main`**, Preview = **`dev`** dans Vercel Settings | Évite de publier `dev` en prod par erreur | Config projet (une fois) | **à faire** (vérifier au cutover) |

---

## 3. Au moment du cutover prod

| Item | Pourquoi | Quand | Statut |
|------|----------|-------|--------|
| Poser / vérifier toutes les env **Production** (tableau §1) puis **Redeploy** | `VITE_*` injecté au build | Cutover | **à faire** |
| Déployer depuis **`main`** (pas `vercel --prod` depuis un checkout `dev` non mergé) | Alignement git ↔ prod | Cutover | **à faire** |
| Vérifier live : `/fr`, `/en`, `/fr#equipe`, 1 fiche, formulaire contact réel | Smoke fonctionnel domaine final | Immédiatement après deploy | **à faire** |
| `curl` robots + sitemap sur origine prod | Même host que `VITE_SITE_ORIGIN` ; 16 URLs (home×2 + équipe×2 + 7×2 fiches) | Immédiatement après deploy | **à faire** |
| Rollback contact prêt : retirer `CONTACT_EMAIL_ENABLED` + Redeploy | Stoppe l’envoi sans faux succès UI | Connu avant cutover | **fait** (procédure doc) |

Commandes utiles :

```bash
ORIGIN=https://www.mskcreation.net
VITE_SITE_ORIGIN="$ORIGIN" npm run check:origin -- --strict
curl -sS "$ORIGIN/robots.txt"
curl -sS "$ORIGIN/sitemap.xml" | head -80
```

---

## 4. Juste après prod

| Item | Pourquoi | Quand | Statut |
|------|----------|-------|--------|
| **Google Search Console** : propriété domaine (ou préfixe URL) vérifiée | Indexation contrôlée | J0–J2 | **à faire** |
| Soumettre `sitemap.xml` sur la propriété **prod** (pas le preview) | Découverte URLs canoniques | Après vérif propriété | **à faire** |
| Inspection d’URL live `/fr` + `/en` (+ 1 fiche) | SSR meta / canonical / pas de `noindex` | J0 | **à faire** |
| Test partage social (LinkedIn / Slack / Facebook debugger) sur home | OG actuel = PNG hero ~8 Mo ; détecter casse / timeout | J0–J1 | **à faire** |
| Suivi couverture GSC (404, canonical croisés FR↔EN) | Corriger vite les exclusions | J+ quelques jours | **à faire** |

Détail pas à pas : [`GOOGLE_SEARCH_CONSOLE.md`](./GOOGLE_SEARCH_CONSOLE.md).

---

## 5. Plus tard / optionnel

| Item | Pourquoi | Quand | Statut |
|------|----------|-------|--------|
| **Bandeau cookies** type « Vos cookies, votre choix » | Consentement cookies non essentiels (mesure d’audience, campagnes). **Uniquement si** Analytics / Tag Manager / pixels pubs sont branchés. V1 MSK = hors scope Analytics → bandeau **N/A** tant que pas de tracking | Au moment d’activer Analytics/campagnes (idéalement **avec** la page confidentialité) | **N/A** (pas d’Analytics V1) |
| **Captcha** (Turnstile / hCaptcha) | Anti-bot UX ; **optionnel** si rate-limit (5/15 min) + honeypot suffisent. Nécessite CSP + validation produit | Si spam / bruit formulaire en prod | **à faire** seulement si besoin (non branché) |
| Rate-limit **Upstash** (store partagé) | Limite mémoire process OK mono-instance ; multi-worker Vercel peut sous-protéger | Avant scale / si abus | **à faire** si multi-instance |
| **OG dédiée 1200×630** export Figma | Remplacer `slide-01.png` ~8 Mo pour crawlers sociaux ; ne pas recompresser le PNG hero sans asset dédié | P2 post-launch | **à faire** (ouvert) |
| CDN R2 / `VITE_ASSET_BASE_URL` | Délester assets hors origine Vercel | Quand volume / perf le justifient | **à faire** (pipeline prêt) |
| Mobile Figma (Q31) + layouts inventés interdits | Responsive réel vs hotfix overflow actuel | Quand frames mobile livrés | **ouvert** |
| Enrichissements SEO Q20–Q22 (sameAs extra, bios Person, alts marketing) | Hors copy Figma actuelle | Validation éditoriale | **ouvert** / partiel |
| Lighthouse CI / Core Web Vitals suivi | Perf continue (équipe déjà ~0,75 local) | P2 | **à faire** optionnel |
| `@vercel/react-router` quand peer RR8 | Preset officiel ; non installé (peer RR7) | Quand Vercel publie peer RR8 | **reporté** |
| Gaps titres ERP page équipe (`TEAM_PAGE.md`) | Alignement copy rôles (ex. Isdalinia « Designer », second prénom Eric) | Validation produit | **ouvert** / partiel |

---

## 6. Déjà en place (ne pas refaire)

| Item | Statut |
|------|--------|
| Provider contact = **Resend** (Q23 fermée) | **fait** |
| Domaine e-mail `mskcreation.net` Verified + SPF/DKIM côté Resend | **fait** (compte) |
| Honeypot `website` + rate-limit IP mémoire 5 / 15 min | **fait** |
| UX contact honnête si env absente (`unavailable*`, pas de faux succès) | **fait** |
| robots.txt + sitemap.xml (home, équipe, deck 7×2) | **fait** (code) |
| Gate `check:origin` (+ strict prod) | **fait** |
| CSP `form-action 'self'` ; clés API hors bundle client | **fait** |
| Docs Preview + GSC + CONTACT_BACKEND | **fait** |

---

## 7. Ordre conseillé (résumé)

```text
1. Clés Resend prod + env Production + VITE_SITE_ORIGIN
2. Merge dev → main · Production Branch = main · Preview = dev
3. DNS / SSL · deploy · smoke contact + robots/sitemap
4. GSC vérif + sitemap + inspection URLs
5. (Recommandé bientôt) Page confidentialité Q29 + liens
6. (Si Analytics) Bandeau cookies en même temps que tracking
7. (Si spam) Captcha · (si scale) Upstash
8. (P2) OG 1200×630 · CDN R2 · mobile Figma
```

Mettre à jour les colonnes **Statut** de ce fichier au fur et à mesure (commit atomique doc OK).
