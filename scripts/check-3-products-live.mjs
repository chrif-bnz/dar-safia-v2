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

const prods = [
  { name: 'Dior Sauvage Elixir', slug: 'christian-dior-dior-sauvage-elixir-100ml', target: 32500 },
  { name: 'Kenzo Homme Indigo', slug: 'kenzo-homme-indigo-santal-marin', target: 22000 },
  { name: 'Hugo Dark Blue', slug: 'hugo-boss-hugo-dark-blue', target: 10000 },
];

async function check3() {
  console.log('=== VERIFICATION DIRECTE DES 3 PRODUITS SUR STRAPI LIVE ===\n');

  for (const p of prods) {
    console.log(`\n======================================================`);
    console.log(`PRODUIT : ${p.name} (cible: ${p.target} DA)`);
    console.log(`======================================================`);

    for (const loc of ['fr', 'en', 'ar']) {
      for (const st of ['draft', 'published']) {
        const url = `${STRAPI_URL}/api/products?filters[slug][$eq]=${p.slug}&populate[variants][populate]=*&status=${st}&locale=${loc}`;
        const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
        const json = await res.json();
        const item = json.data?.[0];

        if (!item) {
          console.log(`[${loc.toUpperCase()} | ${st.toUpperCase()}] ❌ Non trouvé`);
        } else {
          const v = item.variants?.[0];
          const amount = v?.price?.amount;
          const currency = v?.price?.currency;
          const vol = v?.volumeMl;
          const match = amount === p.target;
          console.log(`[${loc.toUpperCase()} | ${st.toUpperCase().padEnd(9)}] ${match ? '✅' : '❌'} docId: ${item.documentId} | vol: ${vol}ml | price: ${amount} ${currency} (pubAt: ${item.publishedAt ? 'oui' : 'null (draft)'})`);
        }
      }
    }
  }
}

check3();

