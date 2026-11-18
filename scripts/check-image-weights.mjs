#!/usr/bin/env node
/**
 * Liste les images sous public/ dépassant un seuil (défaut 500 Ko).
 * N’échoue pas par défaut (warn) — passer --fail pour exit 1 si dépassement.
 *
 * Usage:
 *   node scripts/check-image-weights.mjs
 *   node scripts/check-image-weights.mjs --max-kb=1024 --fail
 */

import { readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const root = join(process.cwd(), "public");
const args = process.argv.slice(2);
const maxKbArg = args.find((a) => a.startsWith("--max-kb="));
const maxKb = maxKbArg ? Number(maxKbArg.split("=")[1]) : 500;
const fail = args.includes("--fail");
const maxBytes = maxKb * 1024;

const IMAGE_RE = /\.(png|jpe?g|webp|gif|svg|ico)$/i;

/** @type {Array<{ path: string; bytes: number }>} */
const heavy = [];

/**
 * @param {string} dir
 */
function walk(dir) {
  for (const name of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, name.name);
    if (name.isDirectory()) {
      walk(full);
      continue;
    }
    if (!IMAGE_RE.test(name.name)) continue;
    const { size } = statSync(full);
    if (size > maxBytes) {
      heavy.push({ path: relative(process.cwd(), full), bytes: size });
    }
  }
}

walk(root);
heavy.sort((a, b) => b.bytes - a.bytes);

if (heavy.length === 0) {
  console.log(`OK — aucune image > ${maxKb} Ko sous public/`);
  process.exit(0);
}

console.log(`Images > ${maxKb} Ko (${heavy.length}) :\n`);
for (const item of heavy) {
  const mb = (item.bytes / (1024 * 1024)).toFixed(2);
  console.log(`  ${mb.padStart(6)} Mo  ${item.path}`);
}
console.log(
  `\nNote : générer les dérivés avec \`npm run assets:compress\` (voir docs/quality/IMAGE_PIPELINE.md).`,
);

if (fail) {
  process.exit(1);
}
process.exit(0);
