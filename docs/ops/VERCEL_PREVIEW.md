# Preview Vercel — branche `dev`

Guide opérationnel pour le premier déploiement preview MSK. L’humain exécute login / push / secrets.

## Prérequis

- Repo Git distant accessible
- Compte Vercel
- Compte Resend : domaine `mskcreation.net` Verified
- Branche locale `dev` avec le commit Resend

## 1. Clé Resend dédiée

1. [Resend Dashboard](https://resend.com/api-keys) → **Create API Key**
2. Nom : `site-web-msk-dev`
3. Permission : **Sending access**
4. Stocker la valeur hors chat / hors git (presse-papiers → Vercel Env ensuite)

## 2. Push branche `dev`

```bash
cd /Users/pro.asguiro/Desktop/PRO/MSK/labs/site_web_msk
git push -u origin dev
```

## 3. Projet Vercel

### Option A — Dashboard

1. [vercel.com/new](https://vercel.com/new) → Import le repo
2. Framework : **React Router** (auto-detect)
3. Root : `.` · Build : `npm run build` (défaut)
4. Production Branch : laisser `main` (ou configurer plus tard)
5. **Deploy** une première fois (Preview sur `dev` après le push)

### Option B — CLI

```bash
npm i -g vercel
vercel login
cd /Users/pro.asguiro/Desktop/PRO/MSK/labs/site_web_msk
vercel link
vercel
```

Ne pas utiliser `vercel --prod` pour ce premier go-live preview.

## 4. Variables d’environnement (Preview)

Dashboard → Project → **Settings → Environment Variables** → scope **Preview** :

| Name | Value | Notes |
|------|--------|-------|
| `VITE_SITE_ORIGIN` | `https://<deployment>.vercel.app` | Remplacer par l’URL preview réelle après 1er deploy ; ou domaine preview custom |
| `CONTACT_EMAIL_ENABLED` | `1` | Active l’envoi |
| `RESEND_API_KEY` | *(clé dédiée)* | Jamais dans git |
| `CONTACT_EMAIL_FROM` | `MSK Création <noreply@mskcreation.net>` | Domaine Verified |
| `CONTACT_EMAIL_TO` | `contact@mskcreation.net` | Aligné footer |

`VITE_*` est injecté au **build** : après modification, **Redeploy** obligatoire.

`robots.txt` / `sitemap.xml` : si `VITE_SITE_ORIGIN` est manquant, local ou invalide (placeholder sans `https://`), l’origine est dérivée de `request.url` (host Preview). Prod : garder `VITE_SITE_ORIGIN=https://www.mskcreation.net`.

### Astuce URL preview

1. Premier deploy sans `VITE_SITE_ORIGIN` (éviter un placeholder non-URL type `xxxxxx`)
2. Noter l’URL `*.vercel.app`
3. Poser `VITE_SITE_ORIGIN=https://…` (sans slash final) pour meta/canonical/OG stables
4. Redeploy
5. Vérifier : `curl -sS "$ORIGIN/robots.txt"` et `curl -sS "$ORIGIN/sitemap.xml" | head` → même host

Pour Production plus tard : même jeu de variables en scope **Production**, avec `VITE_SITE_ORIGIN=https://www.mskcreation.net` (ou domaine final).

## 5. Vérifications

```bash
# Local (avant push) — déjà fait côté agent si clean
npm run check

# Sur l’URL preview
# - /fr et /en chargent
# - Formulaire contact : succès → message Figma « Brief reçu »
# - E-mail reçu sur CONTACT_EMAIL_TO (Reply-To = visiteur)
# - Honeypot / rate-limit inchangés
```

Gate origin en strict (prod) :

```bash
VITE_SITE_ORIGIN=https://www.mskcreation.net npm run check:origin -- --strict
```

## 6. Rollback contact

Retirer `CONTACT_EMAIL_ENABLED` (ou mettre autre chose que `1`) + Redeploy → UI `unavailable*` à nouveau, sans faux succès.

## Notes techniques

- Pas de `vercel.json` requis pour le MVP (auto-detect React Router).
- `@vercel/react-router` non installé : peer `@react-router/dev@7` incompatible avec RR **8.x** du projet. À réévaluer quand Vercel publie un peer RR8.
- Rate-limit = mémoire process (OK preview mono-instance ; Upstash avant scale).
