#!/usr/bin/env node
/**
 * Compose des mockups device / browser premium à partir de captures UI.
 *
 * Usage :
 *   npm run assets:mockup
 *   npm run assets:mockup -- --manifest=scripts/mockup-jobs.q26-ui.json
 *   npm run assets:mockup -- --dry-run
 *
 * Cadres : Chrome-like épuré (sites) · iPhone Pro (mobile).
 * Fonds : couleurs panel projet (navy MSK / marque).
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");

function argValue(name) {
  const hit = args.find((a) => a.startsWith(`${name}=`));
  return hit ? hit.slice(name.length + 1) : null;
}

const manifestRel =
  argValue("--manifest") ?? "scripts/mockup-jobs.q26-ui.json";
const manifestPath = resolve(root, manifestRel);

if (!existsSync(manifestPath)) {
  console.error(`Manifest introuvable : ${manifestRel}`);
  process.exit(1);
}

/** @type {{ jobs: MockupJob[] }} */
const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));

/**
 * @typedef {{
 *   source: string;
 *   output: string;
 *   type: "browser" | "phone";
 *   background: string;
 *   label?: string;
 *   urlHint?: string;
 * }} MockupJob
 */

/**
 * Ombre douce sous le device (PNG RGBA).
 * @param {number} w
 * @param {number} h
 * @param {number} rx
 */
async function softShadow(w, h, rx) {
  const svg = Buffer.from(`
<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="blur" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="28"/>
    </filter>
  </defs>
  <rect x="24" y="36" width="${w - 48}" height="${h - 48}" rx="${rx}"
    fill="rgba(0,0,0,0.42)" filter="url(#blur)"/>
</svg>`);
  return sharp(svg).png().toBuffer();
}

/**
 * Chrome browser épuré (barre + traffic lights + URL).
 * @param {number} frameW
 * @param {number} chromeH
 * @param {string} urlHint
 */
function browserChromeSvg(frameW, chromeH, urlHint) {
  const pillX = 120;
  const pillW = Math.min(frameW - 240, 520);
  const pillY = Math.round((chromeH - 28) / 2);
  const safeUrl = (urlHint ?? "mskcreation.net").replace(/[<>&"]/g, "");
  return Buffer.from(`
<svg width="${frameW}" height="${chromeH}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${frameW}" height="${chromeH}" fill="#1C1C1E"/>
  <circle cx="28" cy="${chromeH / 2}" r="6" fill="#FF5F57"/>
  <circle cx="50" cy="${chromeH / 2}" r="6" fill="#FEBC2E"/>
  <circle cx="72" cy="${chromeH / 2}" r="6" fill="#28C840"/>
  <rect x="${pillX}" y="${pillY}" width="${pillW}" height="28" rx="14" fill="#2C2C2E"/>
  <text x="${pillX + pillW / 2}" y="${pillY + 19}" text-anchor="middle"
    font-family="system-ui, -apple-system, sans-serif" font-size="12"
    fill="#A1A1A6">${safeUrl}</text>
</svg>`);
}

/**
 * Coque iPhone Pro (bezel + dynamic island).
 * @param {number} outerW
 * @param {number} outerH
 * @param {number} bezel
 * @param {number} radius
 */
function phoneShellSvg(outerW, outerH, bezel, radius) {
  const islandW = Math.round(outerW * 0.28);
  const islandH = Math.round(bezel * 0.72);
  const islandX = Math.round((outerW - islandW) / 2);
  const islandY = Math.round(bezel * 0.22);
  return Buffer.from(`
<svg width="${outerW}" height="${outerH}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="shell" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#2A2A2E"/>
      <stop offset="50%" stop-color="#1A1A1C"/>
      <stop offset="100%" stop-color="#0E0E10"/>
    </linearGradient>
  </defs>
  <rect width="${outerW}" height="${outerH}" rx="${radius}" fill="url(#shell)"/>
  <rect x="1.5" y="1.5" width="${outerW - 3}" height="${outerH - 3}" rx="${radius - 1}"
    fill="none" stroke="rgba(255,255,255,0.12)" stroke-width="1.5"/>
  <rect x="${islandX}" y="${islandY}" width="${islandW}" height="${islandH}"
    rx="${islandH / 2}" fill="#050505"/>
</svg>`);
}

/**
 * @param {MockupJob} job
 */
async function composeBrowser(job) {
  const canvasW = 2432;
  const canvasH = 1280;
  const padX = 96;
  const padY = 72;
  const chromeH = 52;
  const radius = 18;
  const frameW = canvasW - padX * 2;
  const frameH = canvasH - padY * 2;
  const contentH = frameH - chromeH;
  const contentRadius = 4;

  const sourcePath = resolve(root, job.source);
  const content = await sharp(sourcePath, { unlimited: true })
    .resize(frameW, contentH, {
      fit: "cover",
      position: "top",
      kernel: sharp.kernel.lanczos3,
    })
    .png()
    .toBuffer();

  const roundedContent = await sharp(content)
    .composite([
      {
        input: Buffer.from(`
<svg width="${frameW}" height="${contentH}">
  <rect width="${frameW}" height="${contentH}" rx="${contentRadius}" fill="#fff"/>
</svg>`),
        blend: "dest-in",
      },
    ])
    .png()
    .toBuffer();

  const chrome = await sharp(
    browserChromeSvg(frameW, chromeH, job.urlHint ?? job.label),
  )
    .png()
    .toBuffer();

  const frameBody = await sharp({
    create: {
      width: frameW,
      height: frameH,
      channels: 4,
      background: { r: 28, g: 28, b: 30, alpha: 1 },
    },
  })
    .composite([
      { input: chrome, top: 0, left: 0 },
      { input: roundedContent, top: chromeH, left: 0 },
    ])
    .png()
    .toBuffer();

  const framed = await sharp(frameBody)
    .composite([
      {
        input: Buffer.from(`
<svg width="${frameW}" height="${frameH}">
  <rect width="${frameW}" height="${frameH}" rx="${radius}" fill="#fff"/>
</svg>`),
        blend: "dest-in",
      },
    ])
    .png()
    .toBuffer();

  const shadow = await softShadow(frameW + 48, frameH + 56, radius + 4);

  const canvas = sharp({
    create: {
      width: canvasW,
      height: canvasH,
      channels: 4,
      background: job.background,
    },
  });

  return canvas
    .composite([
      {
        input: shadow,
        top: padY - 8,
        left: padX - 24,
      },
      {
        input: framed,
        top: padY,
        left: padX,
      },
    ])
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toBuffer();
}

/**
 * @param {MockupJob} job
 */
async function composePhone(job) {
  const canvasW = 1196;
  const canvasH = 1280;
  const bezel = 18;
  const outerRadius = 56;
  const screenRadius = 42;

  // Hauteur max téléphone dans le canvas (marges haut/bas)
  const maxOuterH = canvasH - 96;
  const outerH = maxOuterH;
  const outerW = Math.round(outerH * (390 / 844));
  const screenW = outerW - bezel * 2;
  const screenH = outerH - bezel * 2;

  const sourcePath = resolve(root, job.source);
  const screen = await sharp(sourcePath, { unlimited: true })
    .resize(screenW, screenH, {
      fit: "cover",
      position: "top",
      kernel: sharp.kernel.lanczos3,
    })
    .png()
    .toBuffer();

  const roundedScreen = await sharp(screen)
    .composite([
      {
        input: Buffer.from(`
<svg width="${screenW}" height="${screenH}">
  <rect width="${screenW}" height="${screenH}" rx="${screenRadius}" fill="#fff"/>
</svg>`),
        blend: "dest-in",
      },
    ])
    .png()
    .toBuffer();

  const shell = await sharp(
    phoneShellSvg(outerW, outerH, bezel, outerRadius),
  )
    .png()
    .toBuffer();

  const device = await sharp(shell)
    .composite([{ input: roundedScreen, top: bezel, left: bezel }])
    .png()
    .toBuffer();

  const shadow = await softShadow(outerW + 64, outerH + 72, outerRadius + 8);
  const left = Math.round((canvasW - outerW) / 2);
  const top = Math.round((canvasH - outerH) / 2);

  return sharp({
    create: {
      width: canvasW,
      height: canvasH,
      channels: 4,
      background: job.background,
    },
  })
    .composite([
      { input: shadow, top: top - 4, left: left - 32 },
      { input: device, top, left },
    ])
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toBuffer();
}

async function main() {
  const jobs = manifest.jobs ?? [];
  if (!jobs.length) {
    console.error("Aucun job dans le manifest.");
    process.exit(1);
  }

  console.log(`Mockups : ${jobs.length} job(s) · ${manifestRel}`);
  let ok = 0;

  for (const job of jobs) {
    const src = resolve(root, job.source);
    const out = resolve(root, job.output);
    if (!existsSync(src)) {
      console.error(`  ✗ source absente : ${job.source}`);
      process.exitCode = 1;
      continue;
    }
    mkdirSync(dirname(out), { recursive: true });
    console.log(
      `  → ${job.type.padEnd(8)} ${job.source} → ${job.output}${dryRun ? " (dry)" : ""}`,
    );
    if (dryRun) {
      ok += 1;
      continue;
    }
    const buffer =
      job.type === "phone"
        ? await composePhone(job)
        : await composeBrowser(job);
    writeFileSync(out, buffer);
    const meta = await sharp(buffer).metadata();
    console.log(
      `     ${meta.width}×${meta.height} · ${(buffer.length / 1024).toFixed(0)} Ko`,
    );
    ok += 1;
  }

  console.log(`Terminé : ${ok}/${jobs.length}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
