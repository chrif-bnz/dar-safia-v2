import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const dump = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'strapi-full-dump.json'), 'utf8'));

// The 44 target items from user's prompt:
const targets = [
  { n: 1,  name: 'Elie Saab EDP', vol: 90, price: 22900, slugKeywords: ['elie-saab'] },
  { n: 2,  name: "Gucci Bloom Ambrosia d'Or EDP", vol: 100, price: 26500, slugKeywords: ['gucci-bloom-ambrosia'] },
  { n: 3,  name: 'My Burberry Blush EDP', vol: 90, price: 21000, slugKeywords: ['my-burberry-blush'] },
  { n: 4,  name: 'Mademoiselle Rochas EDP', vol: 90, price: 15500, slugKeywords: ['mademoiselle-rochas'] },
  { n: 5,  name: 'JPG Divine Couture EDP', vol: 100, price: 29000, slugKeywords: ['divine-couture'] },
  { n: 6,  name: 'Valentino Donna Born in Roma EDP', vol: 100, price: 28500, slugKeywords: ['valentino-donna-born-in-roma'], exclude: ['intense'] },
  { n: 7,  name: 'Valentino Donna Born in Roma Intense EDP', vol: 100, price: 29900, slugKeywords: ['valentino-donna-born-in-roma-intense'] },
  { n: 8,  name: 'D&G Devotion EDP (femme)', vol: 100, price: 27000, slugKeywords: ['devotion-femme'] },
  { n: 9,  name: "Givenchy L'Interdit Rouge EDP", vol: 80, price: 27000, slugKeywords: ['interdit-rouge'], exclude: ['ultime'] },
  { n: 10, name: "Givenchy L'Interdit Rouge Ultime EDP", vol: 80, price: 28500, slugKeywords: ['interdit-rouge-ultime'] },
  { n: 11, name: "Guerlain L'Instant de Guerlain EDP (femme)", vol: 75, price: 21000, slugKeywords: ['instant-de-guerlain-femme'] },
  { n: 12, name: "Dior J'adore Intense Parfum", vol: 100, price: 38000, slugKeywords: ['j-adore-intense-2'] },
  { n: 13, name: 'Rabanne Fame in Love Parfum Elixir', vol: 80, price: 30000, slugKeywords: ['fame-in-love'] },
  { n: 14, name: "Lancôme Idôle Peach 'n Roses EDP Fruité", vol: 100, price: 30000, slugKeywords: ['idole-peach'] },
  { n: 15, name: "D&G L'Impératrice EDT", vol: 100, price: 12500, slugKeywords: ['imperatrice'] },
  { n: 16, name: 'Rochas Audace EDP', vol: 90, price: 18000, slugKeywords: ['rochas-audace'] }, // note: 100ml in catalog
  { n: 17, name: 'D&G King EDP', vol: 200, price: 25000, slugKeywords: ['king-200ml'] },
  { n: 18, name: 'D&G The One EDP Intense', vol: 100, price: 21000, slugKeywords: ['the-one-eau-de-parfum-intense'] },
  { n: 19, name: 'Azzaro Wanted by Night EDP', vol: 100, price: 19500, slugKeywords: ['wanted-by-night'] },
  { n: 20, name: 'Valentino Uomo Born in Roma Intense', vol: 100, price: 27800, slugKeywords: ['valentino-uomo-born-in-roma'] },
  { n: 21, name: 'Invictus Victory Elixir', vol: 100, price: 25000, slugKeywords: ['invictus-victory-elixir'] },
  { n: 22, name: 'YSL MYSLF Le Parfum', vol: 100, price: 29800, slugKeywords: ['myslf-le-parfum'] },
  { n: 23, name: 'YSL MYSLF EDP', vol: 100, price: 24800, slugKeywords: ['myslf-eau-de-parfum'] },
  { n: 24, name: "YSL La Nuit de L'Homme EDP", vol: null, price: 26000, slugKeywords: ['nuit-de-l-homme-eau-de-parfum'] },
  { n: 25, name: 'Givenchy Gentleman EDP', vol: 100, price: 20500, slugKeywords: ['gentleman-eau-de-parfum'], exclude: ['society', 'boisee', 'reserve', 'toilette'] },
  { n: 26, name: 'Givenchy Gentleman Society Ambrée EDP', vol: 100, price: 27500, slugKeywords: ['gentleman-society-ambree'] },
  { n: 27, name: 'Emporio Armani Stronger With You Powerfully EDP', vol: 100, price: 26800, slugKeywords: ['stronger-with-you-you-powerfully'] },
  { n: 28, name: 'Giorgio Armani Acqua di Giò EDP', vol: null, price: 25000, slugKeywords: ['acqua-di-gio-eau-de-parfum'] },
  { n: 29, name: "Terre d'Hermès EDP Intense", vol: 100, price: 25800, slugKeywords: ['terre-d-hermes-intense'] },
  { n: 30, name: 'JPG Scandal Intense', vol: 150, price: 29000, slugKeywords: ['scandal-intense-150ml'] },
  { n: 31, name: 'JPG Scandal Elixir', vol: 100, price: 31000, slugKeywords: ['scandal-pour-homme-elixir'] },
  { n: 32, name: 'Lacoste Booster EDT', vol: 125, price: 13000, slugKeywords: ['lacoste-booster'] },
  { n: 33, name: 'Hugo Man EDT', vol: 200, price: 17000, slugKeywords: ['hugo-man-eau-de-toilette-200ml'] },
  { n: 34, name: 'Boss Man EDT', vol: 100, price: 14000, slugKeywords: ['boss-man-eau-de-toilette'] },
  { n: 35, name: 'Hugo Just Different EDT', vol: 75, price: 10800, slugKeywords: ['hugo-just-different'] },
  { n: 36, name: 'Hugo Energise EDT', vol: 75, price: 10800, slugKeywords: ['hugo-energise'] },
  { n: 37, name: 'Hugo Dark Blue EDT', vol: 75, price: 10000, slugKeywords: ['hugo-dark-blue'] },
  { n: 38, name: 'Boss Bottled Absolu Parfum Intense', vol: 100, price: 25000, slugKeywords: ['boss-bottled-absolu-parfum-intense'] },
  { n: 39, name: 'Boss Bottled Triumph Elixir Parfum Intense', vol: 100, price: 25000, slugKeywords: ['boss-bottled-triumph-elixir'] },
  { n: 40, name: 'Montblanc Legend Elixir Parfum', vol: 100, price: 16800, slugKeywords: ['montblanc-legend-elixir-parfum'] },
  { n: 41, name: 'Dior Sauvage Parfum', vol: 100, price: 31000, slugKeywords: ['dior-sauvage-le-parfum'] },
  { n: 42, name: 'Dior Sauvage Elixir', vol: 100, price: 32500, slugKeywords: ['dior-sauvage-elixir'] },
  { n: 43, name: 'Guerlain Oud Essentiel EDP', vol: 125, price: 30000, slugKeywords: ['oud-essentiel'] },
  { n: 44, name: 'Kenzo Homme Indigo EDP', vol: 110, price: 22000, slugKeywords: ['kenzo-homme-indigo'] },
];

console.log('=== AUDIT RAW DE TOUTES LES ENTREES ET LOCALES ===\n');

const locales = ['fr', 'en', 'ar'];
let totalEvaluations = 0;
let okEvaluations = 0;
let koEvaluations = 0;
let missingEntries = [];

for (const t of targets) {
  for (const loc of locales) {
    const draftList = dump[`${loc}_draft`];
    const pubList = dump[`${loc}_published`];

    // Find in draft
    const draftItem = draftList.find(p => {
      const matchSlug = t.slugKeywords.every(k => p.slug.includes(k));
      const notExcluded = !t.exclude || !t.exclude.some(ex => p.slug.includes(ex));
      return matchSlug && notExcluded;
    });

    // Find in pub
    const pubItem = pubList.find(p => {
      const matchSlug = t.slugKeywords.every(k => p.slug.includes(k));
      const notExcluded = !t.exclude || !t.exclude.some(ex => p.slug.includes(ex));
      return matchSlug && notExcluded;
    });

    if (!draftItem && !pubItem) {
      missingEntries.push({ n: t.n, name: t.name, loc, reason: 'ABSENT_DANS_LOCALE' });
      console.log(`⚠️ #${t.n} [${loc}] ${t.name}: ABSENT dans Strapi pour cette locale!`);
      continue;
    }

    const docId = draftItem?.documentId || pubItem?.documentId;
    const slug = draftItem?.slug || pubItem?.slug;
    
    // Check variants
    const dVar = draftItem?.variants?.[0];
    const pVar = pubItem?.variants?.[0];

    const dPrice = dVar?.price?.amount;
    const pPrice = pVar?.price?.amount;

    const dOk = dPrice === t.price;
    const pOk = pPrice === t.price;

    totalEvaluations++;
    if (dOk && pOk) {
      okEvaluations++;
    } else {
      koEvaluations++;
      console.log(`❌ KO #${t.n} [${loc}] ${t.name} (docId: ${docId})`);
      console.log(`   Attendu: ${t.price} DA | Draft: ${dPrice} DA | Published: ${pPrice} DA`);
    }
  }
}

console.log(`\n========================================`);
console.log(`Total évaluations (produit × locale) : ${totalEvaluations}`);
console.log(`OK : ${okEvaluations}`);
console.log(`KO : ${koEvaluations}`);
console.log(`Entrées manquantes (par locale) : ${missingEntries.length}`);
console.log(`========================================\n`);

if (missingEntries.length > 0) {
  console.log('Détail des entrées absentes par locale:');
  missingEntries.forEach(m => console.log(`  - #${m.n} ${m.name} (${m.loc})`));
}

