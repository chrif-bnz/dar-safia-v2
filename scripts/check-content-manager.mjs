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

async function checkContentManager() {
  const slug = 'christian-dior-dior-sauvage-elixir-100ml';
  const docId = 'bo4isxf5wjdle1dt9743xewt';

  console.log('Testing /content-manager endpoints...');
  const res = await fetch(`${STRAPI_URL}/content-manager/collection-types/api::product.product/${docId}?locale=fr`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  console.log('Content-manager status:', res.status, res.statusText);
  if (res.ok) {
    const json = await res.json();
    console.log('Content-manager response variants:', JSON.stringify(json.variants, null, 2));
  } else {
    console.log('Content-manager error:', await res.text());
  }

  // Also check /api/products/:docId
  for (const loc of ['fr', 'en', 'ar']) {
    for (const status of ['draft', 'published']) {
      const r = await fetch(`${STRAPI_URL}/api/products/${docId}?locale=${loc}&status=${status}&populate[variants][populate]=*`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const d = await r.json();
      console.log(`API [${loc} | ${status}] -> price:`, d.data?.variants?.[0]?.price?.amount, 'publishedAt:', d.data?.publishedAt);
    }
  }
}

checkContentManager();

