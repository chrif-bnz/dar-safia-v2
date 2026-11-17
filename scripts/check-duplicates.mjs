import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function getEnv() {
  const envPath = path.resolve(__dirname, '../.env.local');
  const lines = fs.readFileSync(envPath, 'utf8').split('\n');
  const env = {};
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const idx = trimmed.indexOf('=');
    if (idx !== -1) {
      env[trimmed.slice(0, idx).trim()] = trimmed.slice(idx + 1).trim();
    }
  }
  return env;
}

const env = getEnv();
const STRAPI_URL = (env.STRAPI_URL || 'https://cms-dar.blu-path.com').replace(/\/+$/, '');
const token = env.STRAPI_API_TOKEN;

const dump = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'strapi-full-dump.json'), 'utf8'));

// Check for duplicate names or slugs within fr_draft
const byName = new Map();
const bySlug = new Map();

for (const p of dump.fr_draft) {
  const n = p.name.trim().toLowerCase();
  const s = p.slug.trim().toLowerCase();

  if (!byName.has(n)) byName.set(n, []);
  byName.get(n).push(p);

  if (!bySlug.has(s)) bySlug.set(s, []);
  bySlug.get(s).push(p);
}

console.log('--- Duplicate Names in Strapi fr_draft ---');
for (const [name, prods] of byName.entries()) {
  if (prods.length > 1) {
    console.log(`Duplicate name: "${name}" (${prods.length} entries):`);
    prods.forEach(p => console.log(`   docId: ${p.documentId} | slug: ${p.slug} | var:`, p.variants?.map(v => `${v.volumeMl}ml:${v.price?.amount}`)));
  }
}

console.log('\n--- Duplicate Slugs in Strapi fr_draft ---');
for (const [slug, prods] of bySlug.entries()) {
  if (prods.length > 1) {
    console.log(`Duplicate slug: "${slug}" (${prods.length} entries):`);
    prods.forEach(p => console.log(`   docId: ${p.documentId} | name: ${p.name}`));
  }
}

