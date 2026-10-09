import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const STRAPI_URL = (process.env.STRAPI_URL || 'http://localhost:1337').replace(/\/+$/, '');
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN || '';

const args = process.argv.slice(2);
const isDryRun = args.includes('--dry-run');
const isUpdatePrices = args.includes('--update-prices');

if (!STRAPI_API_TOKEN) {
  console.error("ERREUR : STRAPI_API_TOKEN manquant dans l'environnement.");
  process.exit(1);
}

// Parse products from the Next.js catalog
const catalogPath = path.resolve(__dirname, '../../web/src/data/products.json');
const rawCatalog = fs.readFileSync(catalogPath, 'utf8');
const catalogProducts = JSON.parse(rawCatalog);

async function fetchAllExistingProducts() {
  const existing = [];
  let page = 1;
  let totalPages = 1;

  while (page <= totalPages) {
    const res = await fetch(
      `${STRAPI_URL}/api/products?pagination[page]=${page}&pagination[pageSize]=100&populate[variants][populate]=*`,
      {
        headers: { Authorization: `Bearer ${STRAPI_API_TOKEN}` }
      }
    );

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Erreur de connexion à Strapi (${res.status}): ${errText}`);
    }

    const json = await res.json();
    const data = json.data || [];
    existing.push(...data);

    totalPages = json.meta?.pagination?.pageCount || 1;
    page++;
  }

  return existing;
}

async function run() {
  console.log(`[INFO] Connexion à Strapi (${STRAPI_URL})...`);
  const existingList = await fetchAllExistingProducts();
  const existingBySlug = new Map(existingList.map((item) => [item.slug, item]));
  console.log(`[INFO] Produits trouvés dans Strapi : ${existingList.length} (catalogue : ${catalogProducts.length} produits)\n`);

  if (isUpdatePrices) {
    console.log(`=== Mode : Mise à jour des prix et contenances${isDryRun ? ' [DRY-RUN]' : ''} ===\n`);
    let checkedCount = 0;
    let modifiedCount = 0;
    let unmodifiedCount = 0;
    let missingInStrapiCount = 0;

    for (const p of catalogProducts) {
      const existing = existingBySlug.get(p.slug);
      if (!existing) {
        missingInStrapiCount++;
        continue;
      }

      checkedCount++;
      const existingVariants = existing.variants || [];
      const variantChanges = [];

      for (let i = 0; i < p.variants.length; i++) {
        const catV = p.variants[i];
        // Match variant by SKU or index fallback
        let existingV = existingVariants.find((v) => v.sku === catV.id);
        if (!existingV && existingVariants.length > 0) {
          existingV = existingVariants.find((v, idx) => (v.sku ?? `${p.slug}-${idx}`) === catV.id);
          if (!existingV && existingVariants[i]) {
            existingV = existingVariants[i];
          }
        }

        const changes = [];
        const targetVolume = catV.volumeMl ?? 100;
        const targetAmount = catV.price.amount;
        const targetCurrency = catV.price.currency || 'DZD';

        if (!existingV) {
          changes.push({
            field: 'volumeMl',
            current: 'absent',
            target: `${targetVolume}ml`
          });
          changes.push({
            field: 'price',
            current: 'absent',
            target: `${targetAmount} ${targetCurrency}`
          });
        } else {
          const currentVolume = existingV.volumeMl;
          if (currentVolume === undefined || currentVolume === null || Number(currentVolume) !== Number(targetVolume)) {
            changes.push({
              field: 'volumeMl',
              current: currentVolume !== undefined && currentVolume !== null ? `${currentVolume}ml` : 'non défini',
              target: `${targetVolume}ml`
            });
          }

          const currentAmount = existingV.price?.amount;
          const currentCurrency = existingV.price?.currency || 'DZD';
          if (
            currentAmount === undefined ||
            currentAmount === null ||
            Number(currentAmount) !== Number(targetAmount) ||
            currentCurrency !== targetCurrency
          ) {
            changes.push({
              field: 'price',
              current: currentAmount !== undefined && currentAmount !== null ? `${currentAmount} ${currentCurrency}` : 'non défini',
              target: `${targetAmount} ${targetCurrency}`
            });
          }
        }

        if (changes.length > 0) {
          variantChanges.push({
            sku: catV.id,
            changes
          });
        }
      }

      if (variantChanges.length > 0) {
        modifiedCount++;
        console.log(`[CHANGEMENT DÉTECTÉ] ${p.name} (${p.slug}) :`);
        for (const vc of variantChanges) {
          console.log(`  Variante "${vc.sku}" :`);
          for (const c of vc.changes) {
            console.log(`    - ${c.field} : ${c.current} -> ${c.target}`);
          }
        }

        if (isDryRun) {
          console.log(`  -> [DRY-RUN] Aucune écriture effectuée.\n`);
        } else {
          // Prepare updated variants
          const updatedVariants = p.variants.map((v) => ({
            volumeMl: v.volumeMl || 100,
            price: { amount: v.price.amount, currency: v.price.currency || 'DZD' },
            sku: v.id,
            stock: v.stock ?? 0
          }));

          const targetId = existing.documentId || existing.id;
          const resUpdate = await fetch(`${STRAPI_URL}/api/products/${targetId}?status=published`, {
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

          if (!resUpdate.ok) {
            const errJson = await resUpdate.json().catch(() => ({}));
            console.error(`  -> [ERREUR] Échec de la mise à jour pour ${p.slug}:`, JSON.stringify(errJson));
          } else {
            console.log(`  -> [OK] Mis à jour avec succès.\n`);
          }
        }
      } else {
        unmodifiedCount++;
        console.log(`[CONFORME] ${p.name} (${p.slug}) : prix et volume conformes.`);
      }
    }

    console.log(`\n========================================`);
    console.log(`Résumé mode --update-prices${isDryRun ? ' [DRY-RUN]' : ''} :`);
    console.log(`- Produits existants examinés : ${checkedCount}`);
    console.log(`- Produits avec différences ${isDryRun ? '(à modifier)' : '(modifiés)'} : ${modifiedCount}`);
    console.log(`- Produits déjà conformes : ${unmodifiedCount}`);
    if (missingInStrapiCount > 0) {
      console.log(`- Produits du catalogue absents de Strapi : ${missingInStrapiCount} (non traités en mode --update-prices)`);
    }
    console.log(`========================================`);

  } else {
    // Mode Seeding classique
    console.log(`=== Mode : Seeding de produits manquants${isDryRun ? ' [DRY-RUN]' : ''} ===\n`);
    let created = 0;
    let incompleteCount = 0;
    let completedCount = 0;
    let skipped = 0;

    for (const p of catalogProducts) {
      const existing = existingBySlug.get(p.slug);
      const isExistingWithVariants = existing && existing.variants && existing.variants.length > 0;
      const isExistingIncomplete = existing && (!existing.variants || existing.variants.length === 0);

      if (isExistingWithVariants) {
        console.log(`[SKIP] ${p.slug} existe déjà (complet).`);
        skipped++;
        continue;
      }

      if (isExistingIncomplete) {
        if (isDryRun) {
          const v = p.variants[0];
          const volume = v.volumeMl || 100;
          const price = `${v.price.amount} ${v.price.currency || 'DZD'}`;
          console.log(`[DRY-RUN] Incomplet (0 variante) -> à compléter : ${p.slug} (${p.name}) | SKU: ${v.id} | ${volume}ml | ${price}`);
          incompleteCount++;
          continue;
        }

        // Live mode: update existing incomplete product via PUT
        const targetId = existing.documentId || existing.id;
        const payload = {
          data: {
            description: p.description || 'Description non disponible',
            gender: p.gender || 'unisexe',
            family: p.family || 'floral',
            variants: p.variants.map((v) => ({
              volumeMl: v.volumeMl || 100,
              price: { amount: v.price.amount, currency: v.price.currency || 'DZD' },
              sku: v.id,
              stock: v.stock ?? 0
            }))
          }
        };

        const resFill = await fetch(`${STRAPI_URL}/api/products/${targetId}?status=published`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${STRAPI_API_TOKEN}`
          },
          body: JSON.stringify(payload)
        });

        if (!resFill.ok) {
          const err = await resFill.json().catch(() => ({}));
          console.error(`[ERREUR] Impossible de compléter ${p.slug}:`, JSON.stringify(err.error || err));
        } else {
          console.log(`[OK] Complété : ${p.slug}`);
          completedCount++;
        }
        continue;
      }

      if (isDryRun) {
        const v = p.variants[0];
        const volume = v.volumeMl || 100;
        const price = `${v.price.amount} ${v.price.currency || 'DZD'}`;
        console.log(`[DRY-RUN] À créer : ${p.slug} (${p.name}) | SKU: ${v.id} | ${volume}ml | ${price}`);
        created++;
        continue;
      }

      const payload = {
        data: {
          name: p.name,
          slug: p.slug,
          description: p.description || 'Description non disponible',
          gender: p.gender || 'unisexe',
          family: p.family || 'floral',
          variants: p.variants.map((v) => ({
            volumeMl: v.volumeMl || 100,
            price: { amount: v.price.amount, currency: v.price.currency || 'DZD' },
            sku: v.id,
            stock: v.stock ?? 0
          }))
        }
      };

      const resCreate = await fetch(`${STRAPI_URL}/api/products?status=published`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${STRAPI_API_TOKEN}`
        },
        body: JSON.stringify(payload)
      });

      if (!resCreate.ok) {
        const err = await resCreate.json().catch(() => ({}));
        console.error(`[ERREUR] Impossible de créer ${p.slug}:`, JSON.stringify(err.error || err));
      } else {
        console.log(`[OK] Créé : ${p.slug}`);
        created++;
      }
    }

    console.log(`\n========================================`);
    console.log(`Résumé mode seeding${isDryRun ? ' [DRY-RUN]' : ''} :`);
    console.log(`- Produits ${isDryRun ? 'à créer' : 'créés'} : ${created}`);
    console.log(`- Produits incomplets ${isDryRun ? 'à compléter' : 'complétés'} : ${isDryRun ? incompleteCount : completedCount}`);
    console.log(`- Produits ignorés (déjà complets) : ${skipped}`);
    console.log(`========================================`);
  }
}

run().catch((err) => {
  console.error('[ERREUR CRITIQUE]:', err.message);
  process.exit(1);
});
