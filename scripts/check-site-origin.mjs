#!/usr/bin/env node
/**
 * Gate VITE_SITE_ORIGIN — évite un deploy SEO avec localhost.
 *
 * Soft (défaut, `npm run check`) : warning si manquant / localhost.
 * Strict (prod) : exit 1 si manquant / localhost.
 *
 * Strict si :
 *   - --strict
 *   - MSK_REQUIRE_PROD_ORIGIN=1
 *   - VERCEL_ENV=production
 */
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

function loadDotEnv() {
  const path = resolve(process.cwd(), ".env");
  if (!existsSync(path)) return;
  const text = readFileSync(path, "utf8");
  for (const line of text.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq < 0) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (process.env[key] === undefined) {
      process.env[key] = value;
    }
  }
}

loadDotEnv();

const raw = (process.env.VITE_SITE_ORIGIN ?? "").replace(/\/$/, "");

function parseHttpOrigin(value) {
  if (!value) return null;
  try {
    const url = new URL(value);
    if (url.protocol !== "http:" && url.protocol !== "https:") return null;
    return url.origin;
  } catch {
    return null;
  }
}

const origin = parseHttpOrigin(raw);
const isLocal =
  !origin ||
  /localhost|127\.0\.0\.1|0\.0\.0\.0/i.test(origin) ||
  origin.startsWith("http://127.");

const strict =
  process.argv.includes("--strict") ||
  process.env.MSK_REQUIRE_PROD_ORIGIN === "1" ||
  process.env.VERCEL_ENV === "production";

const hint =
  "Définir VITE_SITE_ORIGIN=https://www.mskcreation.net (ou domaine réel) " +
  "dans l’env de build prod. Local OK : http://localhost:5173. " +
  "Pas de placeholder (ex. xxxxxx). Voir README et .env.example.";

if (raw && !origin) {
  const msg = `[check:origin] VITE_SITE_ORIGIN n’est pas une URL http(s) absolue (${raw}). ${hint}`;
  if (strict) {
    console.error(msg);
    process.exit(1);
  }
  console.warn(msg);
  console.warn(
    "[check:origin] Warning seulement en local. robots/sitemap retombent sur request.url si dispo.",
  );
  process.exit(0);
}

if (isLocal) {
  const msg = origin
    ? `[check:origin] VITE_SITE_ORIGIN pointe vers un host local (${origin}). ${hint}`
    : `[check:origin] VITE_SITE_ORIGIN manquant. ${hint}`;

  if (strict) {
    console.error(msg);
    console.error(
      "[check:origin] Mode strict (prod / --strict / MSK_REQUIRE_PROD_ORIGIN=1) : échec.",
    );
    process.exit(1);
  }

  console.warn(msg);
  console.warn(
    "[check:origin] Warning seulement en local. En prod : npm run check:origin -- --strict",
  );
  process.exit(0);
}

if (!/^https:\/\//i.test(origin) && strict) {
  console.error(
    `[check:origin] En prod, VITE_SITE_ORIGIN doit être https (reçu : ${origin}).`,
  );
  process.exit(1);
}

console.log(`[check:origin] OK — ${origin}`);
