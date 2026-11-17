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

async function fetchAll(locale, status) {
  const all = [];
  let page = 1;
  let totalPages = 1;

  while (page <= totalPages) {
    const res = await fetch(
      `${STRAPI_URL}/api/products?pagination[page]=${page}&pagination[pageSize]=100&populate[variants][populate]=*&status=${status}&locale=${locale}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    if (!res.ok) throw new Error(`GET failed (${res.status}): ${await res.text()}`);
    const json = await res.json();
    all.push(...(json.data || []));
    totalPages = json.meta?.pagination?.pageCount || 1;
    page++;
  }
  return all;
}

async function audit() {
  console.log('Fetching ALL products from Strapi...');
  const locales = ['fr', 'en', 'ar'];
  const fullDump = {};

  for (const loc of locales) {
    for (const st of ['draft', 'published']) {
      const key = `${loc}_${st}`;
      console.log(`Fetching ${key}...`);
      fullDump[key] = await fetchAll(loc, st);
      console.log(`  -> ${fullDump[key].length} products`);
    }
  }

  // Check Sauvage or Dior across the dump
  console.log('\n=== RECHERCHE DE TOUTES LES ENTRÉES AVEC "Sauvage" OU "Elixir" ===');
  for (const loc of locales) {
    for (const st of ['draft', 'published']) {
      const key = `${loc}_${st}`;
      const list = fullDump[key];
      const matches = list.filter(p => 
        (p.name && /sauvage|elixir/i.test(p.name)) || 
        (p.slug && /sauvage|elixir/i.test(p.slug))
      );
      console.log(`\n--- ${key} (${matches.length} matches) ---`);
      for (const m of matches) {
        console.log(`[docId: ${m.documentId} | id: ${m.id} | slug: ${m.slug}] "${m.name}"`);
        console.log(`  PublishedAt: ${m.publishedAt}`);
        console.log(`  Variants:`, JSON.stringify(m.variants?.map(v => ({ id: v.id, sku: v.sku, vol: v.volumeMl, price: v.price?.amount })), null, 2));
      }
    }
  }

  fs.writeFileSync(path.resolve(__dirname, 'strapi-full-dump.json'), JSON.stringify(fullDump, null, 2), 'utf8');
  console.log('\nDump written to scripts/strapi-full-dump.json');
}

audit().catch(console.error);

