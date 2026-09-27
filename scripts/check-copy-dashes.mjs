#!/usr/bin/env node
/**
 * Interdit le tiret cadratin (—) et le tiret demi-cadratin (–)
 * dans le copy UI (`app/content`, `app/data`).
 * Remplacer par : point, virgule, deux-points, ou séparateur ·.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = process.cwd();
const TARGETS = ["app/content", "app/data"];
const FORBIDDEN = /[—–]/;

function walk(dir) {
  /** @type {string[]} */
  const files = [];
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    const st = statSync(path);
    if (st.isDirectory()) files.push(...walk(path));
    else if (/\.(ts|tsx|js|jsx|md)$/.test(name) && !name.endsWith(".gitkeep")) {
      files.push(path);
    }
  }
  return files;
}

/** Ne scanner que les littéraux de string (pas les commentaires). */
function stringLiterals(source) {
  /** @type {Array<{ text: string; line: number }>} */
  const out = [];
  const re =
    /(?<!\\)(`(?:\\[\s\S]|[^`])*`|'(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*")/g;
  let match;
  while ((match = re.exec(source))) {
    const text = match[1];
    const before = source.slice(0, match.index);
    const line = before.split("\n").length;
    out.push({ text, line });
  }
  return out;
}

let failed = false;

for (const target of TARGETS) {
  const abs = join(ROOT, target);
  let files;
  try {
    files = walk(abs);
  } catch {
    continue;
  }

  for (const file of files) {
    const source = readFileSync(file, "utf8");
    for (const { text, line } of stringLiterals(source)) {
      if (!FORBIDDEN.test(text)) continue;
      failed = true;
      const rel = relative(ROOT, file);
      console.error(
        `${rel}:${line}: tiret cadratin/demi-cadratin interdit dans le copy UI.\n  → ${text.slice(0, 120)}`,
      );
    }
  }
}

if (failed) {
  console.error(
    "\nRemplacer — / – par un point, une virgule, un deux-points, ou · (voir DESIGN_DECISIONS).",
  );
  process.exit(1);
}

console.log("check:copy-dashes OK (aucun — / – dans app/content|data).");
