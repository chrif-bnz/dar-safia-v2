import fs from 'node:fs';
import { createRequire } from 'node:module';

// geoalgeria est publié en CommonJS uniquement.
const geo = createRequire(import.meta.url)('geoalgeria');

// Forme attendue par ProductOrderForm : { id, name, nameAr, communes: [{ id, name, nameAr }] }.
// `name` (français) part dans la commande ; `nameAr` n'est que de l'affichage.
const wilayas = geo.wilayas.map((w) => ({
  id: String(w.code),
  name: w.name_fr,
  nameAr: w.name_ar,
  communes: geo
    .getCommunesByWilaya(w.code)
    .map((c) => ({ id: String(c.code_commune), name: c.name_fr, nameAr: c.name_ar })),
}));

fs.mkdirSync('./src/data', { recursive: true });
fs.writeFileSync('./src/data/wilayas.json', JSON.stringify(wilayas));
console.log(`Wilayas écrites dans src/data/wilayas.json : ${wilayas.length}`);
