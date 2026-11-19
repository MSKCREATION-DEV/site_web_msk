# Contact — backend & runbook production (Q23)

**Statut :** architecture prête, **envoi réel désactivé** tant que Q23 n’est pas fermée.  
L’UI ne ment plus : soumettre le formulaire renvoie un état honnête « envoi bientôt disponible » (content FR/EN), pas un faux « message reçu ».

---

## 1. Ce que fait le code aujourd’hui

| Couche | Fichier | Rôle |
|--------|---------|------|
| UI | `app/components/sections/contact-section.tsx` | `useFetcher` + `fetcher.Form` → POST same-origin |
| Action | `app/routes/home.tsx` → `handleContactAction` | Rate-limit IP, honeypot, valide, provider |
| Rate-limit | `app/server/site/rate-limit.server.ts` | 5 req / IP / 15 min (mémoire process) |
| Validation | `app/lib/validation/contact.ts` | Champs requis + e-mail (client + serveur) |
| Provider | `app/server/api/contact.server.ts` | **Stub** : refuse l’envoi tant que `CONTACT_EMAIL_ENABLED≠1` |
| Messages | `app/content/{fr,en}/home.ts` (`contactSection`) | Succès Figma **et** `unavailable*` / `errorGeneric` |

Flux :

1. L’utilisateur soumet le formulaire (validation client d’abord).
2. L’`action` home : rate-limit IP → honeypot `website` → revalidation serveur.
3. `sendContactEmail` retourne `disabled` → code `unavailable`.
4. L’UI affiche `unavailableEyebrow` / `unavailableTitle` / `unavailableBody` (pas le succès Figma).
5. Dépassement rate-limit → code `rate_limited` (message = `errorGeneric`, pas de copy Figma dédiée).

WhatsApp + e-mail mailto restent les canaux réels en attendant.

---

## 2. Contact en production — comment faire (humain)

Suivre ces étapes **dans l’ordre** avant de publier un formulaire qui envoie vraiment.

### Étape 1 — Choisir le provider (Q23)

Décider un provider e-mail :

- **Resend** (recommandé pour Vercel / Node)  
- Postmark, SendGrid, SMTP transactionnel, Formspree, etc.

Documenter le choix ici et fermer Q23 dans `FIGMA_OPEN_QUESTIONS.md`.

### Étape 2 — Compte + domaine

1. Créer le compte provider.
2. Vérifier le domaine d’envoi (SPF / DKIM) pour `mskcreation.net` (ou sous-domaine `mail.`).
3. Définir l’adresse **From** (ex. `MSK Création <noreply@mskcreation.net>`).
4. Définir le **destinataire** (défaut content : `contact@mskcreation.net`).

### Étape 3 — Variables d’environnement (jamais dans git)

À poser dans l’env de **build/runtime prod** (Vercel / hôte) :

| Variable | Exemple | Obligatoire |
|----------|---------|-------------|
| `CONTACT_EMAIL_ENABLED` | `1` | Oui pour activer l’envoi |
| `RESEND_API_KEY` (ou équivalent) | `re_…` | Oui selon provider |
| `CONTACT_EMAIL_TO` | `contact@mskcreation.net` | Recommandé |
| `CONTACT_EMAIL_FROM` | `MSK Création <noreply@…>` | Recommandé |
| `VITE_SITE_ORIGIN` | `https://www.mskcreation.net` | **Oui** (SEO + liens absolus) |

Local : laisser `CONTACT_EMAIL_ENABLED` absent → stub honnête.

### Étape 4 — Brancher le provider dans le code

Fichier : `app/server/api/contact.server.ts`

1. Si `CONTACT_EMAIL_ENABLED !== "1"` → garder le retour `disabled` (déjà en place).
2. Sinon : appeler l’API provider avec le payload normalisé (`name`, `email`, `company`, `service`, `budget`, `message`, …).
3. Succès → `{ ok: true }` ; échec réseau/API → `{ ok: false, reason: "provider_error" }` (message générique UI, **pas** de stack).

Ne pas inventer de copy marketing : réutiliser `success*` Figma uniquement quand `ok: true`.

### Étape 5 — Anti-spam & abus

- [x] Honeypot champ `website` (caché)
- [x] Rate-limit IP mémoire process : **5 req / IP / 15 min** (`app/server/site/rate-limit.server.ts`)
- [ ] Store partagé multi-instance (Upstash Redis / `@upstash/ratelimit`) si >1 worker Vercel
- [ ] Option captcha **désactivée** tant que décision produit (voir ci-dessous)

Recommandation V1 prod : honeypot + rate-limit mémoire (OK mono-process). Avant scale-out : Upstash.

#### Option captcha (non branchée)

| Option | Notes | Statut |
|--------|-------|--------|
| Cloudflare Turnstile | Gratuit, CSP `challenges.cloudflare.com`, widget invisible/managed | **Pas activé** — attendre spam réel + validation produit |
| hCaptcha | Alternative ; privacy policy hCaptcha | **Pas activé** |

Ne pas ajouter de script tiers sans fermer la Q captcha + mise à jour CSP (`app/lib/security/headers.ts`).

### Étape 6 — GDPR / privacy (minimal)

1. Ne stocker le message **que** dans l’e-mail reçu (pas de DB) sauf besoin CRM validé.
2. Mentionner dans la politique de confidentialité : finalité (répondre au brief), durée, destinataire MSK.
3. Pas de transfert hors UE sans base légale si le provider l’exige (vérifier Resend / région).
4. **UI** : aucune mention « politique de confidentialité » / lien GDPR dans le footer Figma ni le content actuel (`app/content/{fr,en}/footer.ts`). Voir **Q29** (`FIGMA_OPEN_QUESTIONS.md`) avant d’inventer copy ou page.

### Étape 7 — Checklist go-live formulaire

- [ ] Q23 fermée (provider choisi)
- [ ] Domaine e-mail vérifié (SPF/DKIM)
- [ ] Env prod : `CONTACT_EMAIL_ENABLED=1` + clé API + From/To
- [ ] `VITE_SITE_ORIGIN` https prod (`npm run check:origin -- --strict` OK)
- [ ] Test manuel FR + EN : succès réel → message Figma « Brief reçu »
- [ ] Test : clé API absente → `errorGeneric` (pas de faux succès)
- [ ] WhatsApp / mailto toujours OK en secours
- [ ] CSP : `form-action 'self'` (déjà dans `app/lib/security/headers.ts`)

### Étape 8 — Options Service / Budget (Q03)

Les `<select>` restent vides jusqu’à validation éditoriale. Ne pas inventer d’options.

---

## 3. Décisions produit encore ouvertes

| Choix | Options | Bloquant |
|-------|---------|----------|
| Provider e-mail | Resend, Postmark, SMTP, … | **Oui (Q23)** |
| Destinataire | `contact@mskcreation.net` ou autre | Oui |
| Rate-limit store | mémoire process (fait) vs Upstash multi-instance | Recommandé avant scale |
| Captcha | aucun vs Turnstile vs hCaptcha | Non bloquant V1 ; activer si spam |
| Stockage | e-mail only vs CRM | Non |
| Copy erreurs serveur | déjà `errorGeneric` / `unavailable*` content | Fait (minimal) |

---

## 4. Lien SEO / sécu

- Headers : `app/lib/security/headers.ts` (`form-action 'self'`).
- L’action reste sur la route home same-origin (`/:lang`).
- Pas de clés API dans le bundle client (`.server.ts` seulement).
