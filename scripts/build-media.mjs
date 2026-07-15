// Image pipeline: dedupes media-raw, converts to WebP/AVIF, emits lib/media.ts
import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

const RAW_DIR = 'public/media-raw';
// Approved ambience imagery, already slug-named. ambience-garage is excluded:
// its bin labels are gibberish and it never ships.
const AMBIENCE_DIR = 'public/media/ambience';
const AMBIENCE_SKIP = new Set(['ambience-garage']);
// Client project pairs. Only confirmed, renamed pairs (project-NN-before/
// -after) enter the pipeline; unconfirmed exports in the folder never ship.
const PROJECTS_DIR = 'public/media/projects';
const PROJECT_PATTERN = /^project-\d{2}-(before|after)$/;
// Before & After chapters. Each chapter folder holds a final before.webp and
// after.webp, already converted at this pipeline's quality, and they are served
// from where they sit. Registering them here means the manifest stays fully
// generated: nothing about these six entries is hand-written.
const CHAPTER_PATTERN = /^chapter-\d{2}-[a-z0-9-]+$/;
const CHAPTER_SIDES = ['before', 'after'];
const OUT_DIR = 'public/media';
const MANIFEST = 'lib/media.ts';
const TARGET_WIDTHS = [640, 960, 1280, 1920];

// WordPress appends -NNNxNNN or -e{timestamp} to thumbnail variants
function stripWpSuffix(stem) {
  return stem.replace(/-\d+x\d+$/, '').replace(/-e\d+$/, '');
}

function toSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

// Chapter pairs are finished files, not raw sources, so they skip the resize
// and re-encode entirely: re-compressing an already lossy webp only costs
// quality. next/image builds its own responsive srcset from the source and
// negotiates avif or webp per next.config, so a single width and no separate
// avif variant is all a chapter slot needs.
async function chapterEntries() {
  const entries = [];
  const dirs = await fs.readdir(PROJECTS_DIR, { withFileTypes: true });

  for (const dir of dirs.sort((a, b) => a.name.localeCompare(b.name))) {
    if (!dir.isDirectory() || !CHAPTER_PATTERN.test(dir.name)) continue;

    for (const side of CHAPTER_SIDES) {
      const file = path.join(PROJECTS_DIR, dir.name, `${side}.webp`);
      let meta;
      try {
        meta = await sharp(file).metadata();
      } catch {
        console.log(`  ${dir.name}-${side} ... SKIP (no ${side}.webp)`);
        continue;
      }

      const src = `/${path.relative('public', file).split(path.sep).join('/')}`;
      entries.push({
        slug: `${dir.name}-${side}`,
        width: meta.width,
        height: meta.height,
        slot: meta.width >= 1280 ? 'full' : meta.width >= 640 ? 'mid' : 'small',
        widths: [meta.width],
        srcWebp: src,
      });
      console.log(`  ${dir.name}-${side} ... ${meta.width}x${meta.height} (in place)`);
    }
  }

  return entries;
}

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true });
  await fs.mkdir('lib', { recursive: true });

  const entries = await fs.readdir(RAW_DIR);
  const imageExts = new Set(['.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif']);
  const images = entries.filter(f => imageExts.has(path.extname(f).toLowerCase()));

  // Group by base name; keep the file with the largest byte size per group
  const groups = new Map();
  for (const file of images) {
    const stem = path.parse(file).name;
    const base = stripWpSuffix(stem);
    const filePath = path.join(RAW_DIR, file);
    const { size } = await fs.stat(filePath);
    const existing = groups.get(base);
    if (!existing || size > existing.size) {
      groups.set(base, { file, size, filePath });
    }
  }

  // Ambience sources join the same pipeline; their stems are already slugs.
  for (const file of await fs.readdir(AMBIENCE_DIR)) {
    if (path.extname(file).toLowerCase() !== '.png') continue;
    const stem = path.parse(file).name;
    if (AMBIENCE_SKIP.has(stem)) continue;
    groups.set(stem, { file, filePath: path.join(AMBIENCE_DIR, file) });
  }

  // Confirmed project pairs. `exact` also emits the source width, so a
  // source between target sizes still ships at full resolution.
  for (const file of await fs.readdir(PROJECTS_DIR)) {
    if (path.extname(file).toLowerCase() !== '.png') continue;
    const stem = path.parse(file).name;
    if (!PROJECT_PATTERN.test(stem)) continue;
    groups.set(stem, { file, filePath: path.join(PROJECTS_DIR, file), exact: true });
  }

  console.log(`Unique sources: ${groups.size}`);

  const manifest = [];

  for (const [base, { file, filePath, exact }] of groups) {
    const slug = toSlug(base);
    process.stdout.write(`  ${slug} ... `);

    let meta;
    try {
      meta = await sharp(filePath).metadata();
    } catch (err) {
      console.log(`SKIP (${err.message})`);
      continue;
    }

    const srcW = meta.width;
    const srcH = meta.height;

    // Only generate sizes that do not require upscaling
    const widths = TARGET_WIDTHS.filter(w => w <= srcW);
    if (widths.length === 0) widths.push(srcW);
    else if (exact && widths[widths.length - 1] < srcW) widths.push(srcW);

    const slot = srcW >= 1280 ? 'full' : srcW >= 640 ? 'mid' : 'small';

    for (const w of widths) {
      const base64 = sharp(filePath).resize(w, null, { withoutEnlargement: true });

      await base64
        .clone()
        .webp({ quality: 82 })
        .toFile(path.join(OUT_DIR, `${slug}-${w}.webp`));

      await base64
        .clone()
        .avif({ quality: 60 })
        .toFile(path.join(OUT_DIR, `${slug}-${w}.avif`));
    }

    const largest = widths[widths.length - 1];

    manifest.push({
      slug,
      width: srcW,
      height: srcH,
      slot,
      widths,
      srcWebp: `/media/${slug}-${largest}.webp`,
      srcAvif: `/media/${slug}-${largest}.avif`,
    });

    console.log(`${widths.join('/')}px (${slot})`);
  }

  manifest.push(...(await chapterEntries()));

  manifest.sort((a, b) => a.slug.localeCompare(b.slug));

  const lines = [
    '// Generated by scripts/build-media.mjs — do not edit by hand.',
    '',
    "export type ImageSlot = 'full' | 'mid' | 'small';",
    '',
    'export interface MediaImage {',
    '  slug: string;',
    '  width: number;',
    '  height: number;',
    '  slot: ImageSlot;',
    '  widths: number[];',
    '  srcWebp: string;',
    '  /** Absent for in-place chapter pairs; next/image negotiates avif itself. */',
    '  srcAvif?: string;',
    '}',
    '',
    'export const images: Record<string, MediaImage> = {',
  ];

  for (const img of manifest) {
    lines.push(`  '${img.slug}': {`);
    lines.push(`    slug: '${img.slug}',`);
    lines.push(`    width: ${img.width},`);
    lines.push(`    height: ${img.height},`);
    lines.push(`    slot: '${img.slot}',`);
    lines.push(`    widths: [${img.widths.join(', ')}],`);
    lines.push(`    srcWebp: '${img.srcWebp}',`);
    if (img.srcAvif) lines.push(`    srcAvif: '${img.srcAvif}',`);
    lines.push(`  },`);
  }

  lines.push('};');
  lines.push('');

  await fs.writeFile(MANIFEST, lines.join('\n'));
  console.log(`\nWrote ${manifest.length} entries to ${MANIFEST}`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
