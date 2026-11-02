/**
 * scripts/update-strapi-prices.mjs
 * 
 * Met à jour les prix des 44 parfums dans Strapi via l'API REST.
 * Modes :
 *   - node scripts/update-strapi-prices.mjs (ou --dry-run) : affichage seul
 *   - node scripts/update-strapi-prices.mjs --apply        : écriture + publication
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, '..');

// 1. Lire .env.local sans afficher les secrets
function loadEnv() {
  const envPath = path.resolve(ROOT_DIR, '.env.local');
  if (!fs.existsSync(envPath)) {
    throw new Error('Fichier .env.local introuvable à la racine du projet.');
  }
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

const env = loadEnv();
const STRAPI_URL = (env.STRAPI_URL || 'https://cms-dar.blu-path.com').replace(/\/+$/, '');
const STRAPI_API_TOKEN = env.STRAPI_API_TOKEN;

if (!STRAPI_API_TOKEN) {
  console.error("❌ ERREUR : STRAPI_API_TOKEN manquant dans .env.local.");
  process.exit(1);
}

const args = process.argv.slice(2);
const isApply = args.includes('--apply');
const isDryRun = !isApply;

// 2. Liste de référence des 44 parfums
// Parsée depuis scripts/import-report/maj-prix-44.md
function loadTargets() {
  const mdPath = path.resolve(ROOT_DIR, 'scripts/import-report/maj-prix-44.md');
  const content = fs.readFileSync(mdPath, 'utf8');
  const lines = content.split('\n');
  const targets = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed.startsWith('|') || !/\|\s*\d+\s*\|/.test(trimmed)) continue;
    const cols = trimmed.split('|').map(c => c.trim()).filter(Boolean);
    if (cols.length >= 5) {
      const n = parseInt(cols[0], 10);
      const name = cols[1];
      const slug = cols[2].replace(/`/g, '');
      const newPrice = parseInt(cols[4].replace(/\s/g, ''), 10);
      targets.push({ n, name, slug, newPrice });
    }
  }

  if (targets.length !== 44) {
    throw new Error(`Attendu 44 cibles dans maj-prix-44.md, trouvé ${targets.length}`);
  }
  return targets;
}

// 3. Récupérer tous les produits de Strapi
async function fetchAllStrapiProducts() {
  const all = [];
  let page = 1;
  let totalPages = 1;

  while (page <= totalPages) {
    const res = await fetch(
      `${STRAPI_URL}/api/products?pagination[page]=${page}&pagination[pageSize]=100&populate[variants][populate]=*&status=published`,
      {
        headers: { Authorization: `Bearer ${STRAPI_API_TOKEN}` }
      }
    );

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Erreur Strapi GET (${res.status} ${res.statusText}): ${errText}`);
    }

    const json = await res.json();
    all.push(...(json.data || []));
    totalPages = json.meta?.pagination?.pageCount || 1;
    page++;
  }
  return all;
}

// Normalisation pour recherche tolérante
function norm(str) {
  return String(str || '')
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/['’`]/g, '')
    .replace(/[&]/g, 'et')
    .replace(/\bedp\b|\bep\b/g, 'eau de parfum')
    .replace(/\bedt\b|\bet\b/g, 'eau de toilette')
    .replace(/[^a-z0-9]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// Recherche du produit Strapi
function findStrapiProduct(target, strapiProducts) {
  // 1. Recherche par slug exact
  let match = strapiProducts.find(p => p.slug === target.slug);
  if (match) return { product: match, matchType: 'slug' };

  // 2. Recherche par slug approximatif
  const targetSlugClean = target.slug.replace(/-\d+ml$/, '');
  match = strapiProducts.find(p => p.slug.replace(/-\d+ml$/, '') === targetSlugClean);
  if (match) return { product: match, matchType: 'slug_fuzzy' };

  // 3. Recherche par nom
  const targetNorm = norm(target.name);
  match = strapiProducts.find(p => norm(p.name) === targetNorm || norm(p.name).includes(targetNorm));
  if (match) return { product: match, matchType: 'name' };

  return { product: null, matchType: 'none' };
}

// Recherche de la variante correspondante
function findVariant(target, product) {
  const variants = product.variants || [];
  if (variants.length === 0) return null;

  // Extraire le volume cible si présent dans le nom (ex: "100ml", "90 ml")
  const volMatch = target.name.match(/(\d+)\s*ml/i);
  const targetVol = volMatch ? parseInt(volMatch[1], 10) : null;

  if (targetVol) {
    const v = variants.find(varItem => varItem.volumeMl === targetVol);
    if (v) return v;
  }

  // Fallback : première variante
  return variants[0];
}

async function main() {
  console.log(`\n======================================================`);
  console.log(`  MISE À JOUR DES PRIX STRAPI — DAR SAFIA`);
  console.log(`  Mode : ${isApply ? '🚀 APPLY (écriture en base)' : '🔍 DRY-RUN (lecture seule)'}`);
  console.log(`  URL  : ${STRAPI_URL}`);
  console.log(`======================================================\n`);

  const targets = loadTargets();
  console.log(`Chargement des produits Strapi...`);
  const strapiProducts = await fetchAllStrapiProducts();
  console.log(`${strapiProducts.length} produits trouvés dans Strapi.\n`);

  const reportItems = [];
  const backupData = [];

  for (const t of targets) {
    const { product, matchType } = findStrapiProduct(t, strapiProducts);

    if (!product) {
      reportItems.push({
        n: t.n,
        targetName: t.name,
        targetSlug: t.slug,
        strapiName: '—',
        volumeMl: '—',
        oldPrice: null,
        newPrice: t.newPrice,
        status: '❌ INTROUVABLE',
        product: null,
        variant: null
      });
      continue;
    }

    const variant = findVariant(t, product);
    if (!variant) {
      reportItems.push({
        n: t.n,
        targetName: t.name,
        targetSlug: t.slug,
        strapiName: product.name,
        volumeMl: 'Aucune',
        oldPrice: null,
        newPrice: t.newPrice,
        status: '❌ SANS VARIANTE',
        product,
        variant: null
      });
      continue;
    }

    const currentPrice = variant.price?.amount ?? null;
    const isSamePrice = currentPrice === t.newPrice;

    reportItems.push({
      n: t.n,
      targetName: t.name,
      targetSlug: t.slug,
      strapiName: product.name,
      documentId: product.documentId || product.id,
      volumeMl: variant.volumeMl ?? '—',
      variantId: variant.id,
      oldPrice: currentPrice,
      newPrice: t.newPrice,
      status: isSamePrice ? '✅ DÉJÀ OK' : '🔄 À METTRE À JOUR',
      product,
      variant
    });

    backupData.push({
      n: t.n,
      slug: t.slug,
      documentId: product.documentId || product.id,
      productName: product.name,
      variantId: variant.id,
      volumeMl: variant.volumeMl,
      oldPrice: currentPrice,
      newPrice: t.newPrice,
      variantsSnapshot: product.variants
    });
  }

  // Affichage du tableau formaté
  console.log(`| n° | Produit | Slug | Volume | Prix Strapi | Nouveau prix | Statut |`);
  console.log(`|---|---|---|---|---|---|---|`);
  for (const r of reportItems) {
    const oldP = r.oldPrice !== null ? `${r.oldPrice.toLocaleString('fr-FR')} DA` : 'null';
    const newP = `${r.newPrice.toLocaleString('fr-FR')} DA`;
    console.log(`| ${r.n} | ${r.targetName} | \`${r.targetSlug}\` | ${r.volumeMl}ml | ${oldP} | ${newP} | ${r.status} |`);
  }

  const toUpdate = reportItems.filter(r => r.status === '🔄 À METTRE À JOUR');
  const alreadyOk = reportItems.filter(r => r.status === '✅ DÉJÀ OK');
  const notFound = reportItems.filter(r => r.status.includes('INTROUVABLE'));

  console.log(`\n------------------------------------------------------`);
  console.log(`TOTAL           : ${targets.length}`);
  console.log(`DÉJÀ OK         : ${alreadyOk.length}`);
  console.log(`À METTRE À JOUR : ${toUpdate.length}`);
  console.log(`INTROUVABLES    : ${notFound.length}`);
  console.log(`------------------------------------------------------\n`);

  if (isDryRun) {
    console.log(`ℹ️  Mode DRY-RUN terminé. Aucune donnée n'a été modifiée.`);
    console.log(`ℹ️  Pour appliquer ces modifications, lancez : node scripts/update-strapi-prices.mjs --apply\n`);
    return;
  }

  // --- MODE APPLY ---
  console.log(`💾 Sauvegarde des anciens prix dans scripts/import-report/strapi-prices-backup.json...`);
  const backupPath = path.resolve(ROOT_DIR, 'scripts/import-report/strapi-prices-backup.json');
  fs.writeFileSync(backupPath, JSON.stringify({ timestamp: new Date().toISOString(), backupData }, null, 2), 'utf8');
  console.log(`✅ Sauvegarde créée avec succès (${backupData.length} entrées).\n`);

  console.log(`🚀 Application des modifications (${toUpdate.length} produits à mettre à jour)...`);
  let successCount = 0;
  let errorCount = 0;

  for (const item of toUpdate) {
    const docId = item.documentId;
    const existingVariants = item.product.variants || [];

    // Mettre à jour la variante ciblée en renvoyant le tableau complet des variantes
    // sans les IDs internes de composants (gérés automatiquement par Strapi 5)
    // pour préserver toutes les variantes, contenances, stocks et SKUs sans duplications.
    const updatedVariants = existingVariants.map(v => {
      const isTarget = v.id === item.variantId;
      return {
        volumeMl: v.volumeMl,
        stock: v.stock ?? 0,
        sku: v.sku,
        compareAtPrice: v.compareAtPrice ? {
          amount: v.compareAtPrice.amount,
          currency: v.compareAtPrice.currency || 'DZD'
        } : null,
        price: {
          amount: isTarget ? item.newPrice : v.price?.amount,
          currency: v.price?.currency || 'DZD'
        }
      };
    });

    try {
      // Dans Strapi 5, PUT avec ?status=published met à jour et publie la version live
      const putUrl = `${STRAPI_URL}/api/products/${docId}?status=published`;
      const res = await fetch(putUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${STRAPI_API_TOKEN}`
        },
        body: JSON.stringify({
          data: {
            variants: updatedVariants
          }
        })
      });

      if (!res.ok) {
        const errText = await res.text();
        console.error(`❌ Échec pour #${item.n} [${item.targetSlug}] (${res.status}): ${errText}`);
        errorCount++;
      } else {
        successCount++;
        console.log(`✅ [${successCount}/${toUpdate.length}] Mis à jour et publié : #${item.n} ${item.targetSlug} (${item.oldPrice} → ${item.newPrice} DA)`);
      }
    } catch (err) {
      console.error(`❌ Exception pour #${item.n} [${item.targetSlug}]:`, err.message);
      errorCount++;
    }
  }

  console.log(`\n------------------------------------------------------`);
  console.log(`Mises à jour réussies : ${successCount}`);
  console.log(`Erreurs               : ${errorCount}`);
  console.log(`------------------------------------------------------\n`);

  // Vérification post-écriture
  console.log(`🔍 Vérification finale via l'API Strapi (GET ?status=published)...`);
  const refreshedStrapi = await fetchAllStrapiProducts();
  let verifiedOk = 0;
  let verifyFail = 0;

  const finalReport = [];

  for (const t of targets) {
    const { product } = findStrapiProduct(t, refreshedStrapi);
    const variant = product ? findVariant(t, product) : null;
    const currentPrice = variant?.price?.amount ?? null;
    const isMatch = currentPrice === t.newPrice;

    if (isMatch) {
      verifiedOk++;
    } else {
      verifyFail++;
    }

    finalReport.push({
      n: t.n,
      name: t.name,
      slug: t.slug,
      oldPrice: reportItems.find(r => r.n === t.n)?.oldPrice,
      newPrice: t.newPrice,
      strapiPrice: currentPrice,
      status: isMatch ? '✅ Conforme' : '❌ Non conforme'
    });
  }

  console.log(`Vérification : ${verifiedOk} / ${targets.length} conformes.`);
  if (verifyFail > 0) {
    console.warn(`⚠️ Attention : ${verifyFail} produits ne sont pas au prix attendu.`);
  }

  // Écriture du rapport final
  const reportPath = path.resolve(ROOT_DIR, 'scripts/import-report/maj-prix-strapi.md');
  let mdOut = `# Rapport — Mise à jour des prix Strapi (\`maj-prix-strapi\`)\n\n`;
  mdOut += `**Date :** ${new Date().toISOString()}\n`;
  mdOut += `**URL Strapi :** ${STRAPI_URL}\n`;
  mdOut += `**Total cibles :** ${targets.length}\n`;
  mdOut += `**Conformes :** ${verifiedOk} / ${targets.length}\n\n`;
  mdOut += `| n° | Produit | Slug | Ancien prix Strapi | Nouveau prix | Prix Strapi après MAJ | Statut |\n`;
  mdOut += `|---|---|---|---|---|---|---|\n`;
  for (const item of finalReport) {
    const oldP = item.oldPrice !== null ? `${item.oldPrice.toLocaleString('fr-FR')} DA` : '—';
    const newP = `${item.newPrice.toLocaleString('fr-FR')} DA`;
    const strP = item.strapiPrice !== null ? `${item.strapiPrice.toLocaleString('fr-FR')} DA` : '—';
    mdOut += `| ${item.n} | ${item.name} | \`${item.slug}\` | ${oldP} | ${newP} | ${strP} | ${item.status} |\n`;
  }
  fs.writeFileSync(reportPath, mdOut, 'utf8');
  console.log(`\n📄 Rapport écrit dans scripts/import-report/maj-prix-strapi.md.`);
}

main().catch(err => {
  console.error('Erreur fatale :', err);
  process.exit(1);
});

