/**
 * Importe le catalogue actuel du site (marques, notes, parfums) dans Strapi.
 * Source : web/src/data/*.json, générés par scripts/migrate-catalog.mjs à
 * partir de catalog-data.js (lancer `npm run prepare-assets` dans web/ avant).
 *
 * Langues : le français est la langue par défaut de Strapi (contenu source) ;
 * l'anglais et l'arabe sont des LOCALISATIONS des mêmes entrées. Prix, formats,
 * photos, notes, marque… sont communs aux trois langues (champs non
 * localisés) ; seuls description, récit, badge, format et nom des notes sont
 * traduits. Traductions : web/src/data/translations.json (généré depuis
 * scripts/catalog-translations.json — assistées, à faire relire).
 *
 * Idempotent : une entrée déjà présente (même slug) est laissée telle quelle,
 * on peut donc relancer sans doublon ni écrasement des retouches faites dans
 * l'admin ; une langue manquante est ajoutée.
 *
 * Images : les photos sont lues dans perfumes/Photos site web/ (masters
 * versionnés). Un parfum DÉJÀ présent mais sans image en reçoit au passage ;
 * s'il en a déjà, rien n'est touché. Une image introuvable est signalée ;
 * ajoutez-la depuis l'admin (Content Manager → Parfum).
 */
const fs = require('node:fs');
const path = require('node:path');
const { boot } = require('./_boot');

const DATA = path.resolve(__dirname, '../../web/src/data');
const MASTERS = path.resolve(__dirname, '../../perfumes');
const read = (f) => JSON.parse(fs.readFileSync(path.join(DATA, f), 'utf8'));

const SOURCE = 'fr';
const LOCALES = [
  { code: 'fr', name: 'Français (fr)' },
  { code: 'en', name: 'English (en)' },
  { code: 'ar', name: 'العربية (ar)' },
];
const TRANSLATED = LOCALES.map((l) => l.code).filter((c) => c !== SOURCE);

/** Crée fr / en / ar et fait du français la langue par défaut. */
async function ensureLocales(app) {
  const service = app.plugin('i18n').service('locales');
  const existing = new Set((await service.find()).map((l) => l.code));
  for (const { code, name } of LOCALES) {
    if (!existing.has(code)) await service.create({ code, name, isDefault: false });
  }
  const current = await service.getDefaultLocale();
  if (current !== SOURCE) await service.setDefaultLocale({ code: SOURCE });
}

/** Ajoute une localisation à une entrée ; sans effet si elle existe déjà. */
async function addLocale(app, uid, documentId, locale, data) {
  const present = await app.documents(uid).findOne({ documentId, locale });
  if (present) return false;
  await app.documents(uid).update({ documentId, locale, data, status: 'published' });
  return true;
}

async function ensure(app, uid, slug, data) {
  const [existing] = await app
    .documents(uid)
    .findMany({ filters: { slug }, locale: SOURCE, limit: 1 });
  if (existing) return { doc: existing, created: false };
  const doc = await app.documents(uid).create({ data, locale: SOURCE, status: 'published' });
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

/** Données complètes d'un parfum (la version française, qui sert de base aux autres langues). */
function productData(p, brandDoc, noteDoc, imageIds) {
  return {
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
  };
}

/**
 * Ajoute les versions EN / AR d'un parfum. Strapi valide les champs requis
 * communs (slug, famille, formats…) à la création d'une langue : on repasse donc
 * la fiche complète, dont seuls les textes changent.
 */
async function localizeProduct(app, documentId, p, base, translations) {
  let added = 0;
  for (const lang of TRANSLATED) {
    const t = translations[lang]?.products?.[p.slug];
    const description = t?.description || p.description;
    const data = {
      ...base,
      description,
      story: t?.story || p.story,
      badge: t?.badge || p.badge,
      concentration: t?.concentration || p.concentration,
      seo: p.seo
        ? { metaTitle: (p.seo.title ?? '').slice(0, 70), metaDescription: description.slice(0, 200) }
        : undefined,
    };
    if (await addLocale(app, 'api::product.product', documentId, lang, data)) added++;
  }
  return added;
}

async function main() {
  const app = await boot();
  await ensureLocales(app);
  const brands = read('brands.json');
  const translations = read('translations.json');
  let nLocalized = 0;
  const notes = read('notes.json');
  const products = read('products.json');

  const brandDoc = new Map();
  const noteDoc = new Map();
  let nBrand = 0;
  let nNote = 0;
  let nProduct = 0;
  let nPatched = 0;
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
    for (const lang of TRANSLATED) {
      if (await addLocale(app, 'api::brand.brand', doc.documentId, lang, { name: b.name, slug: b.slug, description: b.description, country: b.country })) nLocalized++;
    }
  }
  for (const n of notes) {
    const { doc, created } = await ensure(app, 'api::fragrance-note.fragrance-note', n.slug, {
      name: n.name,
      slug: n.slug,
      description: n.description,
    });
    noteDoc.set(n.slug, doc.documentId);
    if (created) nNote++;
    for (const lang of TRANSLATED) {
      const name = translations[lang]?.notes?.[n.slug] ?? n.name;
      if (await addLocale(app, 'api::fragrance-note.fragrance-note', doc.documentId, lang, { name, slug: n.slug, description: n.description })) nLocalized++;
    }
  }

  for (const p of products) {
    const [existing] = await app
      .documents('api::product.product')
      .findMany({ filters: { slug: p.slug }, locale: SOURCE, limit: 1 });

    let documentId;
    let imageIds = [];
    if (existing) {
      documentId = existing.documentId;
      // Reprise : un parfum importé avant l'arrivée des photos les reçoit ici.
      const full = await app
        .documents('api::product.product')
        .findOne({ documentId, locale: SOURCE, populate: ['images'] });
      imageIds = (full?.images ?? []).map((img) => img.id);
      if (imageIds.length === 0) {
        for (const img of p.images ?? []) {
          const id = await uploadImage(app, img, img.alt);
          if (id) imageIds.push(id);
        }
        if (imageIds.length) {
          await app
            .documents('api::product.product')
            .update({ documentId, locale: SOURCE, data: { images: imageIds }, status: 'published' });
          nPatched++;
        }
      }
    } else {
      for (const img of p.images ?? []) {
        const id = await uploadImage(app, img, img.alt);
        if (id) imageIds.push(id);
        else skippedImages++;
      }
      const created = await app.documents('api::product.product').create({
        status: 'published',
        locale: SOURCE,
        data: productData(p, brandDoc, noteDoc, imageIds),
      });
      documentId = created.documentId;
      nProduct++;
    }
    nLocalized += await localizeProduct(
      app,
      documentId,
      p,
      productData(p, brandDoc, noteDoc, imageIds),
      translations
    );
  }

  console.log(
    `Importé : ${nBrand} marques, ${nNote} notes, ${nProduct} parfums ` +
      `(${nPatched} existants complétés en images, ${nLocalized} localisations EN/AR ajoutées). ` +
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
