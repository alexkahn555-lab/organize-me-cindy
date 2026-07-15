// Media-integrity guard. `next build` passes even when images are missing,
// because Next does not validate public/ at build time. This script fails the
// build instead, catching both failure modes:
//   (a) a slug referenced in app/ or components/ that has no entry in
//       lib/media.ts (the never-generated / never-wired class), and
//   (b) a lib/media.ts entry whose srcWebp/srcAvif file is missing on disk
//       (the shipped-124-missing-images class).
// Runs via the `prebuild` hook, so `npm run build` cannot go green over
// missing images. Run alone with `npm run check:media`.

import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const MANIFEST = path.join(ROOT, 'lib', 'media.ts');
const SCAN_DIRS = ['app', 'components'];

// Slots that deliberately render PhotoFrame's placeholder plate, with no
// image on purpose. These pass check (a). Keep this list justified:
const ALLOWED_MISSING = new Set([]);

// Files excluded from the reference scan entirely. Not for placeholder slots:
// only for unmounted dead code whose slug list is stale by design.
//   components/Gallery.tsx — imported by no page, null-safe on every lookup,
//   scheduled for deletion; it still names retired WordPress-era slugs.
const SKIP_FILES = new Set([]);

// ---- parse the generated manifest (rigid machine-written format) ----------
const manifestSrc = fs.readFileSync(MANIFEST, 'utf8');
const images = new Map(); // slug -> { srcWebp, srcAvif? }
{
  let slug = null;
  for (const line of manifestSrc.split('\n')) {
    const open = line.match(/^  '([^']+)': \{$/);
    if (open) {
      slug = open[1];
      images.set(slug, {});
      continue;
    }
    if (!slug) continue;
    const src = line.match(/^    (srcWebp|srcAvif): '([^']+)',$/);
    if (src) images.get(slug)[src[1]] = src[2];
    if (line === '  },') slug = null;
  }
}
if (images.size === 0) {
  console.error('check:media FAILED — parsed 0 entries from lib/media.ts.');
  process.exit(1);
}

// ---- (a) every slug the code references must exist in the manifest --------
const SLUG_PROP = /\b(?:slug|beforeSlug|afterSlug)\s*[:=]\s*\{?\s*['"]([a-z0-9][a-z0-9-]*)['"]/g;
const missingFromManifest = []; // { slug, where }

function scan(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    const rel = path.relative(ROOT, full).split(path.sep).join('/');
    if (entry.isDirectory()) {
      scan(full);
      continue;
    }
    if (!/\.(ts|tsx)$/.test(entry.name) || SKIP_FILES.has(rel)) continue;
    const src = fs.readFileSync(full, 'utf8');
    for (const [i, line] of src.split('\n').entries()) {
      for (const m of line.matchAll(SLUG_PROP)) {
        const slug = m[1];
        if (!images.has(slug) && !ALLOWED_MISSING.has(slug)) {
          missingFromManifest.push({ slug, where: `${rel}:${i + 1}` });
        }
      }
    }
  }
}
for (const dir of SCAN_DIRS) scan(path.join(ROOT, dir));

// ---- (b) every manifest entry's files must exist on disk ------------------
const missingOnDisk = []; // { slug, file }
for (const [slug, entry] of images) {
  for (const key of ['srcWebp', 'srcAvif']) {
    const src = entry[key];
    if (!src) continue; // srcAvif is absent for in-place chapter pairs
    const file = path.join(ROOT, 'public', src);
    if (!fs.existsSync(file)) missingOnDisk.push({ slug, file: `public${src}` });
  }
}

// ---- housekeeping notice: allowlisted slug that now has an image ----------
for (const slug of ALLOWED_MISSING) {
  if (images.has(slug)) {
    console.log(
      `note: '${slug}' is in ALLOWED_MISSING but now exists in lib/media.ts; remove it from the allowlist.`
    );
  }
}

// ---- verdict ---------------------------------------------------------------
if (missingFromManifest.length > 0 || missingOnDisk.length > 0) {
  console.error('check:media FAILED\n');
  if (missingFromManifest.length > 0) {
    console.error('Slugs referenced by code but absent from lib/media.ts:');
    for (const { slug, where } of missingFromManifest) {
      console.error(`  ${slug}  (${where})`);
    }
    console.error('');
  }
  if (missingOnDisk.length > 0) {
    console.error('lib/media.ts entries whose files are missing on disk:');
    for (const { slug, file } of missingOnDisk) {
      console.error(`  ${slug}  -> ${file}`);
    }
    console.error('');
  }
  console.error(
    'Fix: regenerate with `npm run build:media`, restore the missing files, or repoint the slugs. Intentional placeholder slots belong in ALLOWED_MISSING in scripts/check-media.mjs.'
  );
  process.exit(1);
}

console.log(
  `check:media OK — ${images.size} manifest entries verified on disk; all code-referenced slugs resolve (${ALLOWED_MISSING.size} intentional placeholder slug allowed).`
);
