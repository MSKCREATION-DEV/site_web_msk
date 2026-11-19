#!/usr/bin/env node
/**
 * Stamp EXIF (+ IPTC/XMP si exiftool dispo) sur PNG/JPEG touchés.
 *
 * Usage :
 *   node scripts/stamp-image-metadata.mjs --manifest=scripts/image-metadata.prosperity-thoy.json
 *   node scripts/stamp-image-metadata.mjs --file=public/assets/projects/prosperity/gallery-01.png \
 *     --description="..." --keywords="Prosperity,MSK Création,Bamako"
 *
 * Champs écrits :
 *   Creator / Artist / Copyright = MSK Création
 *   Description / ImageDescription / Caption-Abstract = alt
 *   Keywords (IPTC/XMP via exiftool si présent)
 */

import { spawnSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const CREATOR = "MSK Création";
const COPYRIGHT = "MSK Création";
const CREDIT = "MSK Création";

const args = process.argv.slice(2);

function argValue(name) {
  const hit = args.find((a) => a.startsWith(`${name}=`));
  return hit ? hit.slice(name.length + 1) : null;
}

function hasFlag(name) {
  return args.includes(name);
}

function resolveExiftool() {
  const candidates = ["exiftool", "/opt/homebrew/bin/exiftool", "/usr/local/bin/exiftool"];
  for (const bin of candidates) {
    const probe = spawnSync(bin, ["-ver"], { encoding: "utf8" });
    if (probe.status === 0) return bin;
  }
  return null;
}

/**
 * @param {string} absPath
 * @param {{ description: string; keywords: string[] }} meta
 */
async function stampWithSharp(absPath, meta) {
  const input = readFileSync(absPath);
  const image = sharp(input, { unlimited: true });
  const info = await image.metadata();
  const buffer = await sharp(input, { unlimited: true })
    .withMetadata({
      density: info.density ?? 72,
      exif: {
        IFD0: {
          Copyright: COPYRIGHT,
          Artist: CREATOR,
          ImageDescription: meta.description,
          Software: "MSK Création image pipeline",
        },
      },
    })
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toBuffer();
  writeFileSync(absPath, buffer);
}

/**
 * @param {string} bin
 * @param {string} absPath
 * @param {{ description: string; keywords: string[] }} meta
 */
function stampWithExiftool(bin, absPath, meta) {
  const keywordArgs = meta.keywords.flatMap((kw) => [`-Keywords=${kw}`]);
  const subjectArgs = meta.keywords.flatMap((kw) => [`-Subject=${kw}`]);
  const result = spawnSync(
    bin,
    [
      "-overwrite_original",
      "-Artist=" + CREATOR,
      "-Creator=" + CREATOR,
      "-Copyright=" + COPYRIGHT,
      "-Credit=" + CREDIT,
      "-ImageDescription=" + meta.description,
      "-Description=" + meta.description,
      "-Caption-Abstract=" + meta.description,
      "-XPComment=" + meta.description,
      ...keywordArgs,
      ...subjectArgs,
      absPath,
    ],
    { encoding: "utf8" },
  );
  if (result.status !== 0) {
    throw new Error(result.stderr || result.stdout || "exiftool failed");
  }
}

/**
 * @returns {Array<{ file: string; description: string; keywords: string[] }>}
 */
function loadJobs() {
  const manifestRel = argValue("--manifest");
  if (manifestRel) {
    const abs = resolve(root, manifestRel);
    const data = JSON.parse(readFileSync(abs, "utf8"));
    if (!Array.isArray(data.assets)) {
      throw new Error("manifest.assets must be an array");
    }
    return data.assets.map((item) => ({
      file: item.file,
      description: item.description,
      keywords: item.keywords ?? data.defaultKeywords ?? [],
    }));
  }

  const file = argValue("--file");
  const description = argValue("--description");
  if (!file || !description) {
    throw new Error("Need --manifest=... or --file=... --description=...");
  }
  const keywordsRaw = argValue("--keywords") ?? "";
  return [
    {
      file,
      description,
      keywords: keywordsRaw
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    },
  ];
}

async function main() {
  const dryRun = hasFlag("--dry-run");
  const jobs = loadJobs();
  const exiftool = resolveExiftool();
  console.log(
    exiftool
      ? `exiftool: ${exiftool} (EXIF + IPTC/XMP)`
      : "exiftool: absent → EXIF via sharp seulement",
  );

  for (const job of jobs) {
    const abs = resolve(root, job.file);
    const rel = relative(root, abs);
    if (!existsSync(abs)) {
      console.error(`MISSING ${rel}`);
      process.exitCode = 1;
      continue;
    }
    console.log(`${dryRun ? "DRY " : "STAMP "} ${rel}`);
    console.log(`  desc: ${job.description}`);
    console.log(`  keys: ${job.keywords.join(" · ")}`);
    if (dryRun) continue;

    if (exiftool) {
      stampWithExiftool(exiftool, abs, job);
    } else {
      console.warn('  sharp re-encode (exiftool absent)');
      await stampWithSharp(abs, job);
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
