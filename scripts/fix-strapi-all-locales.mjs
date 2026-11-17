/**
 * scripts/fix-strapi-all-locales.mjs
 * 
 * 1. Lit les 44 prix de référence depuis web/src/data/products.json (source de vérité du site local)
 * 2. Scanne Strapi pour chaque produit dans TOUTES les locales ('fr', 'en', 'ar') en 'draft' et 'published'
 * 3. Sauvegarde l'état complet dans scripts/import-report/strapi-draft-backup.json
 * 4. Met à jour et publie chaque locale pour que draft et published aient exactement le prix du site
 * 5. Re-vérifie tous les prix en draft et published sur toutes les locales
 * 6. Écrit le rapport dans scripts/import-report/maj-prix-strapi.md
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, '..');

// Lire .env.local
function loadEnv() {
  const envPath = path.resolve(ROOT_DIR, '.env.local');
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

// 1. Charger la source de vérité : web/src/data/products.json
const productsJson = JSON.parse(
  fs.readFileSync(path.resolve(ROOT_DIR, 'web/src/data/products.json'), 'utf8')
);

// Charger les 44 slugs cibles depuis maj-prix-44.md
function loadTargetSlugs() {
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
      const localProduct = productsJson.find(p => p.slug === slug);
      const localPrice = localProduct?.variants?.[0]?.price?.amount;
      const localVolume = localProduct?.variants?.[0]?.volumeMl;
      targets.push({
        n,
        name,
        slug,
        expectedPrice: localPrice,
        volumeMl: localVolume
      });
    }
  }
  return targets;
}

const targets = loadTargetSlugs();
console.log(`44 cibles chargées depuis le site local (products.json).\n`);

// Locales à traiter
const LOCALES = ['fr', 'en', 'ar'];

// Fetch un produit par slug pour une locale et un status donnés
async function fetchProductLocale(slug, locale, status) {
  const url = `${STRAPI_URL}/api/products?filters[slug][$eq]=${slug}&populate[variants][populate]=*&status=${status}&locale=${locale}`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${STRAPI_API_TOKEN}` }
  });
  if (!res.ok) {
    throw new Error(`Erreur GET ${slug} (${locale}, ${status}): ${res.status}`);
  }
  const json = await res.json();
  return json.data?.[0] || null;
}

async function run() {
  console.log(`======================================================`);
  console.log(`  DIAGNOSTIC & SYNCHRONISATION MULTI-LOCALES (STRAPI)`);
  console.log(`  URL: ${STRAPI_URL}`);
  console.log(`======================================================\n`);

  console.log(`🔍 1. Lecture de l'état actuel de Strapi (draft & published pour fr, en, ar)...`);

  const initialScan = [];

  for (const t of targets) {
    const itemData = {
      n: t.n,
      name: t.name,
      slug: t.slug,
      sitePrice: t.expectedPrice,
      volumeMl: t.volumeMl,
      locales: {}
    };

    for (const loc of LOCALES) {
      const draft = await fetchProductLocale(t.slug, loc, 'draft');
      const pub = await fetchProductLocale(t.slug, loc, 'published');

      const draftPrice = draft?.variants?.[0]?.price?.amount ?? null;
      const pubPrice = pub?.variants?.[0]?.price?.amount ?? null;

      itemData.locales[loc] = {
        hasDraft: !!draft,
        hasPub: !!pub,
        documentId: draft?.documentId || pub?.documentId || null,
        draftId: draft?.id,
        pubId: pub?.id,
        draftPrice,
        pubPrice,
        draftVariants: draft?.variants,
        pubVariants: pub?.variants,
        draftMatches: draftPrice === t.expectedPrice,
        pubMatches: pubPrice === t.expectedPrice
      };
    }

    initialScan.push(itemData);
  }

  // Affichage du tableau d'audit initial
  console.log(`\n### TABLEAU D'AUDIT INITIAL (AVANT CORRECTION)`);
  console.log(`| n° | Produit | Site local | Strapi Draft (FR/EN/AR) | Strapi Published (FR/EN/AR) | Statut |`);
  console.log(`|---|---|---|---|---|---|`);

  let totalDraftDiscrepancies = 0;

  for (const item of initialScan) {
    const frD = item.locales.fr.draftPrice;
    const enD = item.locales.en.draftPrice;
    const arD = item.locales.ar.draftPrice;

    const frP = item.locales.fr.pubPrice;
    const enP = item.locales.en.pubPrice;
    const arP = item.locales.ar.pubPrice;

    const allDraftOk = (frD === item.sitePrice || frD === null) &&
                       (enD === item.sitePrice || enD === null) &&
                       (arD === item.sitePrice || arD === null);

    const allPubOk = (frP === item.sitePrice || frP === null) &&
                     (enP === item.sitePrice || enP === null) &&
                     (arP === item.sitePrice || arP === null);

    if (!allDraftOk || !allPubOk) totalDraftDiscrepancies++;

    const statusIcon = (allDraftOk && allPubOk) ? '✅ Conforme' : '❌ Écart détecté';

    console.log(`| ${item.n} | ${item.name} | ${item.sitePrice} DA | ${frD}/${enD}/${arD} | ${frP}/${enP}/${arP} | ${statusIcon} |`);
  }

  console.log(`\nNombre de produits présentant au moins un écart en brouillon/locale : ${totalDraftDiscrepancies} / 44.\n`);

  // 3. Sauvegarde de l'état actuel dans strapi-draft-backup.json
  console.log(`💾 2. Sauvegarde de l'état initial dans scripts/import-report/strapi-draft-backup.json...`);
  const backupPath = path.resolve(ROOT_DIR, 'scripts/import-report/strapi-draft-backup.json');
  fs.writeFileSync(backupPath, JSON.stringify({
    timestamp: new Date().toISOString(),
    initialScan
  }, null, 2), 'utf8');
  console.log(`✅ Sauvegarde enregistrée (${initialScan.length} produits).\n`);

  // 4. Correction : mettre à jour et publier chaque locale pour chaque produit
  console.log(`🚀 3. Mise à jour des brouillons et publication pour TOUTES les locales...`);
  let updatedCount = 0;
  let errorCount = 0;

  for (const item of initialScan) {
    const targetPrice = item.sitePrice;

    for (const loc of LOCALES) {
      const locData = item.locales[loc];
      if (!locData.hasDraft && !locData.hasPub) {
        // Cette locale n'existe pas pour ce produit, rien à faire
        continue;
      }

      const docId = locData.documentId;
      const existingVariants = locData.draftVariants || locData.pubVariants || [];

      // Vérifier si une mise à jour est nécessaire
      const needsUpdate = (locData.draftPrice !== targetPrice) || (locData.pubPrice !== targetPrice);

      if (!needsUpdate) {
        continue;
      }

      // Préparer les variantes sans les IDs internes de composants
      const updatedVariants = existingVariants.map(v => {
        const isMatch = (item.volumeMl && v.volumeMl === item.volumeMl) || existingVariants.length === 1;
        return {
          volumeMl: v.volumeMl,
          stock: v.stock ?? 0,
          sku: v.sku,
          compareAtPrice: v.compareAtPrice ? {
            amount: v.compareAtPrice.amount,
            currency: v.compareAtPrice.currency || 'DZD'
          } : null,
          price: {
            amount: isMatch ? targetPrice : v.price?.amount,
            currency: v.price?.currency || 'DZD'
          }
        };
      });

      try {
        // PUT avec locale et status=published met à jour le brouillon ET publie la locale
        const putUrl = `${STRAPI_URL}/api/products/${docId}?locale=${loc}&status=published`;
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
          console.error(`❌ Échec MAJ #${item.n} [${item.slug}] (locale: ${loc}): ${res.status} - ${errText}`);
          errorCount++;
        } else {
          updatedCount++;
          console.log(`✅ #${item.n} ${item.slug} (${loc.toUpperCase()}) : mis à jour et publié à ${targetPrice} DA`);
        }
      } catch (err) {
        console.error(`❌ Exception #${item.n} [${item.slug}] (${loc}):`, err.message);
        errorCount++;
      }
    }
  }

  console.log(`\nFin des écritures : ${updatedCount} locales mises à jour, ${errorCount} erreurs.\n`);

  // 5. Vérification finale
  console.log(`🔍 4. Vérification finale de TOUS les produits et locales...`);
  const finalCheck = [];
  let allPerfect = true;

  for (const t of targets) {
    const checkItem = {
      n: t.n,
      name: t.name,
      slug: t.slug,
      sitePrice: t.expectedPrice,
      locales: {}
    };

    let itemOk = true;

    for (const loc of LOCALES) {
      const draft = await fetchProductLocale(t.slug, loc, 'draft');
      const pub = await fetchProductLocale(t.slug, loc, 'published');

      const draftPrice = draft?.variants?.[0]?.price?.amount ?? null;
      const pubPrice = pub?.variants?.[0]?.price?.amount ?? null;

      const draftOk = !draft || draftPrice === t.expectedPrice;
      const pubOk = !pub || pubPrice === t.expectedPrice;

      if (!draftOk || !pubOk) {
        itemOk = false;
        allPerfect = false;
      }

      checkItem.locales[loc] = {
        draftPrice,
        pubPrice,
        draftOk,
        pubOk
      };
    }

    checkItem.allOk = itemOk;
    finalCheck.push(checkItem);
  }

  // Affichage du tableau final
  console.log(`\n### TABLEAU FINAL DE VÉRIFICATION`);
  console.log(`| n° | Produit | Site local | Strapi Draft (FR/EN/AR) | Strapi Published (FR/EN/AR) | Statut |`);
  console.log(`|---|---|---|---|---|---|`);
  for (const item of finalCheck) {
    const frD = item.locales.fr?.draftPrice ?? '—';
    const enD = item.locales.en?.draftPrice ?? '—';
    const arD = item.locales.ar?.draftPrice ?? '—';

    const frP = item.locales.fr?.pubPrice ?? '—';
    const enP = item.locales.en?.pubPrice ?? '—';
    const arP = item.locales.ar?.pubPrice ?? '—';

    const status = item.allOk ? '✅ 100% Conforme' : '❌ Écart';
    console.log(`| ${item.n} | ${item.name} | ${item.sitePrice} DA | ${frD}/${enD}/${arD} | ${frP}/${enP}/${arP} | ${status} |`);
  }

  // Focus spécial sur Dior Sauvage Elixir 100ml
  const dior = finalCheck.find(f => f.slug.includes('sauvage-elixir'));
  console.log(`\n--- Test spécifique Dior Sauvage Elixir 100 ml ---`);
  console.log(`Prix site : ${dior.sitePrice} DA`);
  console.log(`Draft FR : ${dior.locales.fr.draftPrice} DA | Published FR : ${dior.locales.fr.pubPrice} DA`);
  console.log(`Draft EN : ${dior.locales.en.draftPrice} DA | Published EN : ${dior.locales.en.pubPrice} DA`);
  console.log(`Draft AR : ${dior.locales.ar.draftPrice} DA | Published AR : ${dior.locales.ar.pubPrice} DA`);

  // 6. Écriture du rapport complet
  console.log(`\n📄 5. Écriture du rapport dans scripts/import-report/maj-prix-strapi.md...`);
  const reportPath = path.resolve(ROOT_DIR, 'scripts/import-report/maj-prix-strapi.md');
  let md = `# Rapport — Mise à jour des prix Strapi multi-locales (\`maj-prix-strapi\`)\n\n`;
  md += `**Date :** ${new Date().toISOString()}\n`;
  md += `**URL Strapi :** ${STRAPI_URL}\n`;
  md += `**Produits vérifiés :** ${targets.length}\n`;
  md += `**Statut global :** ${allPerfect ? '✅ 100% Conforme sur toutes les locales et statuts' : '⚠️ Des écarts subsistent'}\n\n`;

  md += `## Cause identifiée de l'écart initial\n\n`;
  md += `Dans Strapi 5 avec le plugin d'internationalisation (\`i18n\`), chaque langue (\`fr\`, \`en\`, \`ar\`) possède ses propres entités indépendantes de brouillon (\`draft\`) et de publication (\`published\`). L'écriture précédente sans paramètre \`locale\` n'avait ciblé que la langue par défaut (\`fr\`), laissant les brouillons anglophones (\`en\`) et arabophones (\`ar\`) avec les anciens prix lors de la consultation dans l'admin Strapi.\n\n`;

  md += `## Tableau comparatif complet (Site local vs Strapi draft & published)\n\n`;
  md += `| n° | Produit | Slug | Site local | Strapi Draft (FR / EN / AR) | Strapi Published (FR / EN / AR) | Statut |\n`;
  md += `|---|---|---|---|---|---|---|\n`;

  for (const item of finalCheck) {
    const frD = item.locales.fr?.draftPrice ? `${item.locales.fr.draftPrice.toLocaleString('fr-FR')} DA` : '—';
    const enD = item.locales.en?.draftPrice ? `${item.locales.en.draftPrice.toLocaleString('fr-FR')} DA` : '—';
    const arD = item.locales.ar?.draftPrice ? `${item.locales.ar.draftPrice.toLocaleString('fr-FR')} DA` : '—';

    const frP = item.locales.fr?.pubPrice ? `${item.locales.fr.pubPrice.toLocaleString('fr-FR')} DA` : '—';
    const enP = item.locales.en?.pubPrice ? `${item.locales.en.pubPrice.toLocaleString('fr-FR')} DA` : '—';
    const arP = item.locales.ar?.pubPrice ? `${item.locales.ar.pubPrice.toLocaleString('fr-FR')} DA` : '—';

    const status = item.allOk ? '✅ Conforme' : '❌ Écart';
    md += `| ${item.n} | ${item.name} | \`${item.slug}\` | **${item.sitePrice.toLocaleString('fr-FR')} DA** | ${frD} / ${enD} / ${arD} | ${frP} / ${enP} / ${arP} | ${status} |\n`;
  }

  fs.writeFileSync(reportPath, md, 'utf8');
  console.log(`✅ Rapport écrit dans ${reportPath}.`);
}

run().catch(err => {
  console.error('Erreur fatale :', err);
  process.exit(1);
});

