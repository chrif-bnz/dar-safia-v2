import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

function slugify(value) {
  return String(value)
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[’']/g, ' ')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function productSlug(name, brand) {
  const nameSlug = slugify(name);
  const brandSlug = slugify(brand);
  return nameSlug.startsWith(brandSlug) ? nameSlug : `${brandSlug}-${nameSlug}`;
}

export function importLot(lotNumber, products) {
  console.log(`\n══════════════════════════════════════════════════════════════`);
  console.log(`  IMPORT DU LOT ${lotNumber}/10 (${products.length} parfums)`);
  console.log(`══════════════════════════════════════════════════════════════\n`);

  // 1. Lire catalog-data.js
  const catalogPath = path.join(ROOT, 'catalog-data.js');
  let catalogSource = fs.readFileSync(catalogPath, 'utf8');

  // Trouver tous les IDs existants
  const idRegex = /id:\s*(\d+)/g;
  let match;
  let maxId = 45;
  const existingNames = new Set();
  const nameRegex = /name:\s*['"]([^'"]+)['"]/g;
  while ((match = idRegex.exec(catalogSource)) !== null) {
    const id = parseInt(match[1], 10);
    if (id > maxId) maxId = id;
  }
  while ((match = nameRegex.exec(catalogSource)) !== null) {
    existingNames.add(match[1].toLowerCase());
  }

  // 2. Filtrer et assigner les IDs
  const toAdd = [];
  let nextId = maxId + 1;
  for (const p of products) {
    if (existingNames.has(p.name.toLowerCase())) {
      console.log(`  ! Déjà dans le catalogue : ${p.name} (ignoré)`);
      continue;
    }
    const productWithId = {
      id: nextId++,
      ...p,
    };
    toAdd.push(productWithId);
  }

  if (toAdd.length === 0) {
    console.log(`  Tous les parfums de ce lot sont déjà importés.`);
    return;
  }

  // 3. Formater les nouveaux produits pour catalog-data.js
  const formattedItems = toAdd.map(p => {
    const { translations, ...fields } = p;
    return `  {\n` +
      `    id: ${fields.id},\n` +
      `    name: ${JSON.stringify(fields.name)},\n` +
      `    brand: ${JSON.stringify(fields.brand)},\n` +
      `    gender: ${JSON.stringify(fields.gender)},\n` +
      `    category: ${JSON.stringify(fields.category)},\n` +
      `    catLabels: ${JSON.stringify(fields.catLabels)},\n` +
      `    price: ${fields.price},\n` +
      `    priceFormatted: ${JSON.stringify(fields.priceFormatted)},\n` +
      `    volume: ${JSON.stringify(fields.volume)},\n` +
      `    badge: ${JSON.stringify(fields.badge)},\n` +
      `    rating: ${JSON.stringify(fields.rating || '4.9')},\n` +
      `    reviewsCount: ${fields.reviewsCount || 120},\n` +
      `    desc: ${JSON.stringify(fields.desc)},\n` +
      `    story: ${JSON.stringify(fields.story)},\n` +
      `    img: ${JSON.stringify(fields.img)},\n` +
      `    top: ${JSON.stringify(fields.top)},\n` +
      `    heart: ${JSON.stringify(fields.heart)},\n` +
      `    base: ${JSON.stringify(fields.base)},\n` +
      `    longevity: ${JSON.stringify(fields.longevity)},\n` +
      `    sillage: ${JSON.stringify(fields.sillage)},\n` +
      `    concentration: ${JSON.stringify(fields.concentration)}\n` +
      `  }`;
  }).join(',\n');

  // Insérer avant le dernier "];"
  const lastBracketIndex = catalogSource.lastIndexOf('];');
  if (lastBracketIndex === -1) {
    throw new Error("Impossible de trouver '];' dans catalog-data.js");
  }

  const updatedCatalog =
    catalogSource.slice(0, lastBracketIndex).trimEnd() +
    ',\n  // ─── LOT ' + lotNumber + ' ───\n' +
    formattedItems +
    '\n];\n';

  fs.writeFileSync(catalogPath, updatedCatalog, 'utf8');
  console.log(`  ✓ ${toAdd.length} produits ajoutés à catalog-data.js (IDs ${toAdd[0].id} à ${toAdd[toAdd.length - 1].id})`);

  // 4. Mettre à jour scripts/catalog-translations.json
  const transPath = path.join(ROOT, 'scripts', 'catalog-translations.json');
  const transData = JSON.parse(fs.readFileSync(transPath, 'utf8'));
  for (const p of toAdd) {
    const slug = productSlug(p.name, p.brand);
    if (p.translations) {
      if (p.translations.en) {
        transData.en = transData.en || { products: {}, notes: {} };
        transData.en.products = transData.en.products || {};
        transData.en.products[slug] = p.translations.en;
      }
      if (p.translations.ar) {
        transData.ar = transData.ar || { products: {}, notes: {} };
        transData.ar.products = transData.ar.products || {};
        transData.ar.products[slug] = p.translations.ar;
      }
    }
  }
  fs.writeFileSync(transPath, JSON.stringify(transData, null, 1) + '\n', 'utf8');
  console.log(`  ✓ Traductions EN et AR enregistrées pour le lot ${lotNumber}`);

  // 5. Exécuter prepare-assets
  console.log(`\n  Exécution de prepare-assets...`);
  execSync('npm run prepare-assets', { stdio: 'inherit', cwd: ROOT });

  // 6. Exécuter lint
  console.log(`\n  Exécution de lint...`);
  execSync('npm run lint', { stdio: 'inherit', cwd: ROOT });

  // 7. Exécuter build
  console.log(`\n  Exécution de build...`);
  execSync('npm run build', { stdio: 'inherit', cwd: ROOT });

  console.log(`\n✓ Lot ${lotNumber} importé et vérifié avec succès !`);
}
