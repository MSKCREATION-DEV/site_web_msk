# Contact — backend & runbook production (Q23)

**Statut :** **Resend choisi** (Q23 fermée). Envoi réel si `CONTACT_EMAIL_ENABLED=1` + `RESEND_API_KEY`.  
Sans ces variables : état honnête « envoi bientôt disponible » (content FR/EN), pas de faux succès Figma.

---

## 1. Ce que fait le code aujourd’hui

| Couche | Fichier | Rôle |
|--------|---------|------|
| UI | `app/components/sections/contact-section.tsx` | `useFetcher` + `fetcher.Form` → POST same-origin |
| Action | `app/routes/home.tsx` → `handleContactAction` | Rate-limit IP, honeypot, valide, provider |
| Rate-limit | `app/server/site/rate-limit.server.ts` | 5 req / IP / 15 min (mémoire process) |
| Validation | `app/lib/validation/contact.ts` | Champs requis + e-mail (client + serveur) |
| Provider | `app/server/api/contact.server.ts` | **Resend** si activé ; sinon `disabled` / `provider_error` |
| Messages | `app/content/{fr,en}/home.ts` (`contactSection`) | Succès Figma **uniquement** si `ok: true` ; sinon `unavailable*` / `errorGeneric` |

Flux :

1. L’utilisateur soumet le formulaire (validation client d’abord).
2. L’`action` home : rate-limit IP → honeypot `website` → revalidation serveur.
3. `sendContactEmail` :
   - `CONTACT_EMAIL_ENABLED≠1` → `disabled` → UI `unavailable*`
   - activé + Resend OK → `{ ok: true }` → succès Figma (« Brief reçu »)
   - clé manquante / erreur API → `provider_error` → UI `errorGeneric`
4. Dépassement rate-limit → code `rate_limited` (message = `errorGeneric`).

WhatsApp + e-mail mailto restent des canaux de secours.

---

## 2. Décision provider (Q23)

| Choix | Valeur |
|-------|--------|
| Provider | **Resend** |
| Domaine | `mskcreation.net` (Verified dans le compte Resend) |
| From (défaut) | `MSK Création <noreply@mskcreation.net>` |
| To (défaut) | `contact@mskcreation.net` (aligné footer / content) |
| Reply-To | e-mail du visiteur (champ `email`) |

Clé API : **créer une clé dédiée** (ex. `site-web-msk-dev`, Sending access). Ne **jamais** réutiliser/copier une clé d’un autre projet dans le repo ou le chat.

---

## 3. Contact en preview / production — checklist humain

### Étape 1 — Resend

1. Compte Resend (`mskcreation`) : domaine `mskcreation.net` = Verified.
2. API Keys → Create → nom `site-web-msk-dev` (ou `-prod`) → **Sending access**.
3. Copier la clé **une seule fois** dans le gestionnaire de secrets (Vercel / 1Password), jamais dans git.

### Étape 2 — Variables d’environnement

| Variable | Exemple Preview | Obligatoire |
|----------|-----------------|-------------|
| `CONTACT_EMAIL_ENABLED` | `1` | Oui pour activer l’envoi |
| `RESEND_API_KEY` | `re_…` (clé dédiée) | Oui si enabled |
| `CONTACT_EMAIL_TO` | `contact@mskcreation.net` | Recommandé (sinon défaut code) |
| `CONTACT_EMAIL_FROM` | `MSK Création <noreply@mskcreation.net>` | Recommandé |
| `VITE_SITE_ORIGIN` | URL https du déploiement (preview ou domaine) | **Oui** (SEO + liens absolus) |

Local : laisser `CONTACT_EMAIL_ENABLED` absent → stub honnête.

### Étape 3 — Anti-spam & abus

- [x] Honeypot champ `website` (caché)
- [x] Rate-limit IP mémoire process : **5 req / IP / 15 min**
- [ ] Store partagé multi-instance (Upstash) si >1 worker Vercel
- [ ] Captcha : **pas activé** (voir option ci-dessous)

#### Option captcha (non branchée)

| Option | Notes | Statut |
|--------|-------|--------|
| Cloudflare Turnstile | Gratuit, CSP `challenges.cloudflare.com` | **Pas activé** |
| hCaptcha | Alternative | **Pas activé** |

Ne pas ajouter de script tiers sans fermer la Q captcha + CSP (`app/lib/security/headers.ts`).

### Étape 4 — GDPR / privacy (minimal)

1. Ne stocker le message **que** dans l’e-mail reçu (pas de DB).
2. Politique de confidentialité : **Q29** ouverte (pas de copy inventée).
3. Provider : Resend — vérifier région / base légale si besoin juridique.

### Étape 5 — Checklist go-live formulaire

- [x] Q23 fermée (Resend)
- [x] Domaine e-mail vérifié (SPF/DKIM côté Resend)
- [ ] Env Preview/Prod : `CONTACT_EMAIL_ENABLED=1` + clé + From/To
- [ ] `VITE_SITE_ORIGIN` = URL https du déploiement
- [ ] Test manuel FR + EN : succès réel → message Figma « Brief reçu »
- [ ] Test : clé absente → `errorGeneric` (pas de faux succès)
- [ ] WhatsApp / mailto toujours OK en secours
- [x] CSP : `form-action 'self'`

### Étape 6 — Options Service / Budget (Q03)

Les `<select>` restent vides jusqu’à validation éditoriale. Ne pas inventer d’options.

---

## 4. Preview Vercel (branche `dev`)

Voir aussi [`docs/ops/VERCEL_PREVIEW.md`](../ops/VERCEL_PREVIEW.md).

Points clés :

1. Push `dev` (humain).
2. Projet Vercel lié au repo ; Preview sur `dev`.
3. Env **Preview** : variables ci-dessus ; `VITE_SITE_ORIGIN` = URL preview (ou domaine preview custom).
4. Redeploy après ajout des env (build-time pour `VITE_*`).
5. Smoke contact FR `/fr` + EN `/en`.

**Note RR8 :** `@vercel/react-router` (peer `@react-router/dev@7`) n’est **pas** installé. Vercel détecte React Router Framework Mode ; le preset optionnel pourra être ajouté quand le peer RR8 sera publié.

---

## 5. Lien SEO / sécu

- Headers : `app/lib/security/headers.ts` (`form-action 'self'`).
- L’action reste sur la route home same-origin (`/:lang`).
- Pas de clés API dans le bundle client (`.server.ts` seulement).
