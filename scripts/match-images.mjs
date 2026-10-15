import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const ALLOWED_DIRS = [
  'perfumes/Photos site web/Designer',
  'perfumes/Photos site web/photos designer homme',
  'perfumes/Photos site web/missing-perfumes'
];

function scanFiles(dir) {
  let res = [];
  const fullDir = path.join(ROOT, dir);
  if (!fs.existsSync(fullDir)) return res;
  const entries = fs.readdirSync(fullDir, { withFileTypes: true });
  for (const ent of entries) {
    const rel = path.join(dir, ent.name).replace(/\\/g, '/');
    if (ent.isDirectory()) {
      res = res.concat(scanFiles(rel));
    } else if (/\.(jpe?g|png|webp|jfif)$/i.test(ent.name)) {
      res.push(rel);
    }
  }
  return res;
}

const allImages = [];
for (const d of ALLOWED_DIRS) {
  allImages.push(...scanFiles(d));
}

console.log(`Total authorized images: ${allImages.length}`);
fs.writeFileSync(path.join(ROOT, 'scripts', 'authorized-images.json'), JSON.stringify(allImages, null, 2), 'utf8');
