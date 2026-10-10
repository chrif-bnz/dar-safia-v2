/**
 * Importe le catalogue actuel du site (marques, notes, parfums) dans Strapi.
 * Source : web/src/data/*.json, générés par scripts/migrate-catalog.mjs à
 * partir de catalog-data.js (lancer `npm run prepare-assets` dans web/ avant).
 *
 * Idempotent : une entrée déjà présente (même slug) est laissée telle quelle,
 * on peut donc relancer sans doublon ni écrasement des retouches faites dans
 * l'admin.
 *
 * Images : les fichiers sources des 45 parfums ne sont pas dans ce dépôt
 * (seuls quelques visuels génériques le sont). Une image absente est ignorée
 * et signalée ; ajoutez-les ensuite depuis l'admin (Content Manager → Parfum).
 */
const fs = require('node:fs');
const path = require('node:path');
const { boot } = require('./_boot');

const DATA = path.resolve(__dirname, '../../web/src/data');
const MASTERS = path.resolve(__dirname, '../../perfumes');
const read = (f) => JSON.parse(fs.readFileSync(path.join(DATA, f), 'utf8'));

async function ensure(app, uid, slug, data) {
  const [existing] = await app.documents(uid).findMany({ filters: { slug }, limit: 1 });
  if (existing) return { doc: existing, created: false };
  const doc = await app.documents(uid).create({ data, status: 'published' });
  return { doc, created: true };
}

async function uploadImage(app, wireImage, alt) {
  // L'URL du site pointe un dérivé (`<photo>.jpg-800.webp`) ; le master est la
  // photo d'origine, dans perfumes/ ou, à défaut, dans web/public/img/perfumes/.
  const rel = decodeURI(wireImage.url)
    .replace(/^\/img\/perfumes\//, '')
    .replace(/-\d+\.webp$/, '');
  const file = [
    path.join(MASTERS, rel),
    path.resolve(__dirname, '../../web/public/img/perfumes', rel),
  ].find((f) => fs.existsSync(f));
  if (!file) return null;
  const stat = fs.statSync(file);
  const ext = path.extname(file).toLowerCase();
  const mime = ext === '.png' ? 'image/png' : ext === '.webp' ? 'image/webp' : 'image/jpeg';
  const [uploaded] = await app.plugin('upload').service('upload').upload({
    data: { fileInfo: { name: path.basename(file), alternativeText: alt, caption: alt } },
    files: { filepath: file, originalFilename: path.basename(file), mimetype: mime, size: stat.size },
  });
  return uploaded?.id ?? null;
}

async function main() {
  const app = await boot();
  const brands = read('brands.json');
  const notes = read('notes.json');
  const products = read('products.json');

  const brandDoc = new Map();
  const noteDoc = new Map();
  let nBrand = 0;
  let nNote = 0;
  let nProduct = 0;
  let skippedImages = 0;

  for (const b of brands) {
    const { doc, created } = await ensure(app, 'api::brand.brand', b.slug, {
      name: b.name,
      slug: b.slug,
      description: b.description,
      country: b.country,
    });
    brandDoc.set(b.slug, doc.documentId);
    if (created) nBrand++;
  }
  for (const n of notes) {
    const { doc, created } = await ensure(app, 'api::fragrance-note.fragrance-note', n.slug, {
      name: n.name,
      slug: n.slug,
      description: n.description,
    });
    noteDoc.set(n.slug, doc.documentId);
    if (created) nNote++;
  }

  for (const p of products) {
    const [existing] = await app
      .documents('api::product.product')
      .findMany({ filters: { slug: p.slug }, limit: 1 });
    if (existing) continue;

    const imageIds = [];
    for (const img of p.images ?? []) {
      const id = await uploadImage(app, img, img.alt);
      if (id) imageIds.push(id);
      else skippedImages++;
    }

    await app.documents('api::product.product').create({
      status: 'published',
      data: {
        name: p.name,
        slug: p.slug,
        brand: brandDoc.get(p.brandSlug),
        description: p.description,
        story: p.story,
        gender: p.gender,
        family: p.family,
        secondaryFamilies: p.secondaryFamilies ?? [],
        notes: (p.notes ?? [])
          .filter((n) => noteDoc.has(n.noteSlug))
          .map((n) => ({ layer: n.layer, position: n.position, note: noteDoc.get(n.noteSlug) })),
        variants: p.variants.map((v) => ({
          volumeMl: v.volumeMl,
          // Le site identifie un format par son SKU : on conserve l'id d'origine.
          sku: v.id,
          stock: v.stock ?? 0,
          price: { amount: v.price.amount, currency: 'DZD' },
          ...(v.compareAtPrice
            ? { compareAtPrice: { amount: v.compareAtPrice.amount, currency: 'DZD' } }
            : {}),
        })),
        images: imageIds,
        concentration: p.concentration,
        longevityHours: p.longevityHours,
        sillage: p.sillage,
        seasons: p.seasons ?? [],
        occasions: p.occasions ?? [],
        badge: p.badge,
        featured: Boolean(p.featured),
        newArrival: Boolean(p.newArrival),
        bestseller: Boolean(p.bestseller),
        seo: p.seo
          ? { metaTitle: (p.seo.title ?? '').slice(0, 70), metaDescription: (p.seo.description ?? '').slice(0, 200) }
          : undefined,
      },
    });
    nProduct++;
  }

  console.log(
    `Importé : ${nBrand} marques, ${nNote} notes, ${nProduct} parfums. ` +
      `Images absentes (à ajouter dans l'admin) : ${skippedImages}.`
  );
  await app.destroy();
}

main().then(
  () => process.exit(0),
  (error) => {
    console.error(error);
    process.exit(1);
  }
);
