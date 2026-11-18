#!/usr/bin/env node
/**
 * Pipeline compression / dérivés MSK.
 * Conserve les PNG/JPEG sources ; écrit WebP (+ AVIF) à côté.
 *
 * Usage :
 *   npm run assets:compress
 *   npm run assets:compress -- --only=hero,works,team
 *   npm run assets:compress -- --dry-run
 *   npm run assets:compress -- --skip-avif
 *   npm run assets:compress -- --max-width=2880
 *
 * Priorité perf : hero → works covers → projects covers → team → reste.
 */

import { createHash } from "node:crypto";
import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { dirname, extname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const assetsRoot = join(root, "public", "assets");
const manifestPath = join(root, "public", "assets", ".derivatives-manifest.json");

const SOURCE_RE = /\.(png|jpe?g)$/i;
const SKIP_DIRS = new Set(["logo"]);

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const skipAvif = args.includes("--skip-avif");
const onlyArg = args.find((a) => a.startsWith("--only="));
const only = onlyArg
  ? onlyArg
      .slice("--only=".length)
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
  : null;
const maxWidthArg = args.find((a) => a.startsWith("--max-width="));
const maxWidth = maxWidthArg ? Number(maxWidthArg.split("=")[1]) : 2880;

const WEBP_QUALITY = 82;
const AVIF_QUALITY = 55;

/** @param {number} bytes */
function fmtMb(bytes) {
  return `${(bytes / (1024 * 1024)).toFixed(2)} Mo`;
}

/**
 * @param {string} dir
 * @param {string[]} out
 */
function walkSources(dir, out = []) {
  for (const name of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, name.name);
    if (name.isDirectory()) {
      if (SKIP_DIRS.has(name.name)) continue;
      walkSources(full, out);
      continue;
    }
    if (!SOURCE_RE.test(name.name)) continue;
    out.push(full);
  }
  return out;
}

/**
 * @param {string} abs
 */
function shouldInclude(abs) {
  if (!only) return true;
  const rel = relative(assetsRoot, abs).replaceAll("\\", "/");
  return only.some(
    (bucket) => rel === bucket || rel.startsWith(`${bucket}/`),
  );
}

/**
 * @param {string} sourcePath
 * @param {string} ext
 */
function derivativePath(sourcePath, ext) {
  return sourcePath.replace(SOURCE_RE, `.${ext}`);
}

/**
 * @param {Buffer} buf
 */
function hashBuf(buf) {
  return createHash("sha1").update(buf).digest("hex").slice(0, 12);
}

/**
 * @param {string} sourcePath
 */
async function processOne(sourcePath) {
  const sourceStat = statSync(sourcePath);
  const sourceBytes = sourceStat.size;
  if (sourceBytes < 1024) {
    return {
      source: relative(root, sourcePath).replaceAll("\\", "/"),
      sourceBytes,
      webp: null,
      webpBytes: null,
      avif: null,
      avifBytes: null,
      bestBytes: sourceBytes,
      savedBytes: 0,
      sourceHash: "skip-tiny",
      skipped: true,
    };
  }
  const input = readFileSync(sourcePath);
  const sourceHash = hashBuf(input);

  let pipeline = sharp(input, { failOn: "none" }).rotate();
  const meta = await pipeline.metadata();
  const width = meta.width ?? 0;
  if (maxWidth > 0 && width > maxWidth) {
    pipeline = pipeline.resize({
      width: maxWidth,
      withoutEnlargement: true,
    });
  }

  const webpPath = derivativePath(sourcePath, "webp");
  const avifPath = skipAvif ? null : derivativePath(sourcePath, "avif");

  /** @type {{ webp?: number; avif?: number }} */
  const outSizes = {};

  if (!dryRun) {
    const webpBuf = await pipeline
      .clone()
      .webp({ quality: WEBP_QUALITY, effort: 4 })
      .toBuffer();
    writeFileSync(webpPath, webpBuf);
    outSizes.webp = webpBuf.length;

    if (avifPath) {
      const avifBuf = await pipeline
        .clone()
        .avif({ quality: AVIF_QUALITY, effort: 4 })
        .toBuffer();
      writeFileSync(avifPath, avifBuf);
      outSizes.avif = avifBuf.length;
    }
  } else {
    // Estimation via encode en mémoire sans écrire
    const webpBuf = await pipeline
      .clone()
      .webp({ quality: WEBP_QUALITY, effort: 4 })
      .toBuffer();
    outSizes.webp = webpBuf.length;
    if (avifPath) {
      const avifBuf = await pipeline
        .clone()
        .avif({ quality: AVIF_QUALITY, effort: 4 })
        .toBuffer();
      outSizes.avif = avifBuf.length;
    }
  }

  const best = outSizes.avif ?? outSizes.webp ?? sourceBytes;
  return {
    source: relative(root, sourcePath).replaceAll("\\", "/"),
    sourceBytes,
    webp: outSizes.webp
      ? relative(root, webpPath).replaceAll("\\", "/")
      : null,
    webpBytes: outSizes.webp ?? null,
    avif: outSizes.avif && avifPath
      ? relative(root, avifPath).replaceAll("\\", "/")
      : null,
    avifBytes: outSizes.avif ?? null,
    bestBytes: best,
    savedBytes: sourceBytes - best,
    sourceHash,
  };
}

async function main() {
  if (!existsSync(assetsRoot)) {
    console.error(`Dossier introuvable : ${assetsRoot}`);
    process.exit(1);
  }

  const sources = walkSources(assetsRoot).filter(shouldInclude);
  sources.sort((a, b) => {
    const pa = priorityScore(a);
    const pb = priorityScore(b);
    if (pa !== pb) return pa - pb;
    return statSync(b).size - statSync(a).size;
  });

  console.log(
    `Compression assets (${sources.length} sources)${dryRun ? " [dry-run]" : ""}${skipAvif ? " [skip-avif]" : ""}${only ? ` [only=${only.join(",")}]` : ""}`,
  );
  console.log(`Qualité WebP=${WEBP_QUALITY} AVIF=${AVIF_QUALITY} maxWidth=${maxWidth}`);

  /** @type {Awaited<ReturnType<typeof processOne>>[]} */
  const results = [];
  let i = 0;
  for (const src of sources) {
    i += 1;
    const rel = relative(root, src);
    process.stdout.write(`[${i}/${sources.length}] ${rel} … `);
    try {
      const row = await processOne(src);
      results.push(row);
      if (row.skipped) {
        console.log(`${fmtMb(row.sourceBytes)} (skip <1 Ko)`);
        continue;
      }
      const webp = row.webpBytes != null ? fmtMb(row.webpBytes) : "-";
      const avif = row.avifBytes != null ? fmtMb(row.avifBytes) : "-";
      console.log(
        `${fmtMb(row.sourceBytes)} → webp ${webp}` +
          (skipAvif ? "" : ` / avif ${avif}`) +
          ` (-${fmtMb(row.savedBytes)})`,
      );
    } catch (err) {
      console.log("ERREUR");
      console.error(err);
      process.exitCode = 1;
    }
  }

  const totalSource = results.reduce((s, r) => s + r.sourceBytes, 0);
  const totalBest = results.reduce((s, r) => s + r.bestBytes, 0);
  console.log("\n== Resume ==");
  console.log(`Sources : ${fmtMb(totalSource)}`);
  console.log(`Meilleur dérivé (AVIF ou WebP) : ${fmtMb(totalBest)}`);
  console.log(`Gain : ${fmtMb(totalSource - totalBest)}`);

  const top = [...results]
    .sort((a, b) => b.sourceBytes - a.sourceBytes)
    .slice(0, 12);
  console.log("\nTop sources :");
  for (const row of top) {
    console.log(
      `  ${fmtMb(row.sourceBytes).padStart(8)} → ${fmtMb(row.bestBytes).padStart(8)}  ${row.source}`,
    );
  }

  if (!dryRun) {
    mkdirSync(dirname(manifestPath), { recursive: true });
    const manifest = {
      generatedAt: new Date().toISOString(),
      webpQuality: WEBP_QUALITY,
      avifQuality: skipAvif ? null : AVIF_QUALITY,
      maxWidth,
      count: results.length,
      totalSourceBytes: totalSource,
      totalBestBytes: totalBest,
      items: results,
    };
    writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
    console.log(`\nManifest : ${relative(root, manifestPath)}`);
  }
}

/**
 * @param {string} abs
 */
function priorityScore(abs) {
  const rel = relative(assetsRoot, abs).replaceAll("\\", "/");
  if (rel.startsWith("hero/")) return 0;
  if (rel.startsWith("works/") && rel.endsWith("/cover.png")) return 1;
  if (rel.startsWith("projects/") && rel.endsWith("/cover.png")) return 2;
  if (rel.startsWith("team/")) return 3;
  if (rel.startsWith("cta/") || rel.startsWith("contact/") || rel.startsWith("approach/"))
    return 4;
  if (rel.startsWith("projects/")) return 5;
  return 6;
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
