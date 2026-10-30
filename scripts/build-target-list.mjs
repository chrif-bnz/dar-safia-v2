import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { perfumeCatalog } from '../catalog-data.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

function normalize(str) {
  return String(str || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[’']/g, ' ')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function cleanConcentration(str) {
  const n = normalize(str);
  if (/eau de parfum intense|edp intense|parfum intense/i.test(n)) return 'Eau de Parfum Intense';
  if (/eau de parfum fruite|edp fruite/i.test(n)) return 'Eau de Parfum Fruité';
  if (/eau de parfum boisee|edp boisee/i.test(n)) return 'Eau de Parfum Boisée';
  if (/eau de parfum|edp/i.test(n)) return 'Eau de Parfum';
  if (/eau de toilette intense|edt intense/i.test(n)) return 'Eau de Toilette Intense';
  if (/eau de toilette haute/i.test(n)) return 'Eau de Toilette';
  if (/eau de toilette|edt/i.test(n)) return 'Eau de Toilette';
  if (/extrait de parfum|extrait/i.test(n)) return 'Extrait de Parfum';
  if (/parfum elixir|elixir concentre|elixir/i.test(n)) return 'Elixir';
  if (/le parfum|parfum concentre|concentre absolu|parfum/i.test(n)) return 'Parfum';
  if (/cologne/i.test(n)) return 'Cologne';
  return 'Eau de Parfum'; // défaut raisonnable si absent
}

const BRAND_MAPPINGS = [
  { triggers: ['elie saab', 'girl of now'], brand: 'Elie Saab' },
  { triggers: ['gucci'], brand: 'Gucci' },
  { triggers: ['burberry', 'my burberry'], brand: 'Burberry' },
  { triggers: ['jour d hermes', 'terre d hermes', 'hermes'], brand: 'Hermès' },
  { triggers: ['fame', 'rabanne', 'paco rabanne', 'invictus', 'one million', 'olympea'], brand: 'Paco Rabanne' },
  { triggers: ['mademoiselle rochas', 'rochas'], brand: 'Rochas' },
  { triggers: ['givenchy'], brand: 'Givenchy' },
  { triggers: ['chloe'], brand: 'Chloé' },
  { triggers: ['montblanc', 'mont blanc'], brand: 'Montblanc' },
  { triggers: ['emporio armani', 'giorgio armani', 'armani'], brand: 'Giorgio Armani' },
  { triggers: ['azzaro'], brand: 'Azzaro' },
  { triggers: ['d g', 'dolce gabbana', 'dolce & gabbana'], brand: 'Dolce & Gabbana' },
  { triggers: ['hugo boss', 'boss', 'hugo'], brand: 'Hugo Boss' },
  { triggers: ['mugler', 'thierry mugler'], brand: 'Mugler' },
  { triggers: ['scandal', 'jean paul gaultier', 'le male', 'le beau'], brand: 'Jean Paul Gaultier' },
  { triggers: ['atelier versace', 'versace'], brand: 'Versace' },
  { triggers: ['cerruti'], brand: 'Cerruti' },
  { triggers: ['lanvin'], brand: 'Lanvin' },
  { triggers: ['guerlain', 'habit rouge', 'l instant de guerlain'], brand: 'Guerlain' },
  { triggers: ['nina ricci'], brand: 'Nina Ricci' },
  { triggers: ['roberto cavalli'], brand: 'Roberto Cavalli' },
  { triggers: ['valentino', 'born in roma'], brand: 'Valentino' },
  { triggers: ['power of you'], brand: 'Power of You' },
  { triggers: ['marc jacobs'], brand: 'Marc Jacobs' },
  { triggers: ['narciso rodriguez'], brand: 'Narciso Rodriguez' },
  { triggers: ['christian dior', 'dior', 'sauvage', 'j adore', 'miss dior'], brand: 'Christian Dior' },
  { triggers: ['lancome'], brand: 'Lancôme' },
  { triggers: ['cartier', 'declaration'], brand: 'Cartier' },
  { triggers: ['boucheron'], brand: 'Boucheron' },
  { triggers: ['yves saint laurent', 'ysl', 'myslf', 'la nuit de l homme'], brand: 'Yves Saint Laurent' },
  { triggers: ['carolina herrera', '212'], brand: 'Carolina Herrera' },
  { triggers: ['prada'], brand: 'Prada' },
  { triggers: ['moschino', 'toy boy'], brand: 'Moschino' },
  { triggers: ['lacoste'], brand: 'Lacoste' },
  { triggers: ['viktor & rolf', 'viktor&rolf', 'spicebomb', 'flowerbomb'], brand: 'Viktor & Rolf' },
  { triggers: ['chanel', 'bleu de chanel', 'allure homme'], brand: 'Chanel' },
  { triggers: ['calvin klein', 'ck'], brand: 'Calvin Klein' },
  { triggers: ['mancera'], brand: 'Mancera' },
  { triggers: ['kenzo'], brand: 'Kenzo' },
  { triggers: ['vertus'], brand: 'Vertus' },
  { triggers: ['nishane'], brand: 'Nishane' },
  { triggers: ['romeo bejar', 'my univers prive'], brand: 'Roméo Bejar' },
  { triggers: ['unique e luxury', "unique'e luxury"], brand: "Unique'e Luxury" },
  { triggers: ['louboutin'], brand: 'Christian Louboutin' },
  { triggers: ['dubai meydan'], brand: 'The Spirit of Dubai' },
  { triggers: ['bdk parfums', 'bdk'], brand: 'BDK Parfums Paris' },
  { triggers: ['rosendo mateu'], brand: 'Rosendo Mateu' },
  { triggers: ['penhaligon'], brand: "Penhaligon's" },
  { triggers: ['casamorati', 'xerjoff'], brand: 'Xerjoff' },
  { triggers: ['amouage'], brand: 'Amouage' },
  { triggers: ['omanluxury'], brand: 'Omanluxury' }
];

function detectBrand(namePart) {
  const normName = normalize(namePart);
  for (const b of BRAND_MAPPINGS) {
    if (b.triggers.some(t => normName.includes(normalize(t)))) {
      return b.brand;
    }
  }
  return 'Inconnue';
}

const listPath = path.join(ROOT, 'perfumes', 'liste-parfums.txt');
const rawText = fs.readFileSync(listPath, 'utf8');
const lines = rawText.split(/\r?\n/);

let currentSection = 'UNKNOWN';
const items = [];

lines.forEach((line, idx) => {
  const trimmed = line.trim();
  if (!trimmed) return;
  if (trimmed.startsWith('FEMME')) { currentSection = 'FEMME'; return; }
  if (trimmed.startsWith('HOMME')) { currentSection = 'HOMME'; return; }
  if (trimmed.startsWith('PARFUMS DE NICHE')) { currentSection = 'NICHE'; return; }
  if (trimmed.startsWith('À VÉRIFIER AVANT IMPORT') || trimmed.startsWith('LISTE DES') || trimmed.startsWith('Prix en DA') || trimmed.startsWith('- ')) return;

  const parts = trimmed.split(/—|-{2,}/);
  let namePart = parts[0].trim();
  const pricePart = parts.slice(1).join('—').trim();

  // Décision 3 : Juniper Sling à 55 000 DA
  let price = null;
  if (namePart.includes('Juniper Sling')) {
    price = 55000;
  } else {
    const priceMatch = pricePart.match(/([\d\s]+)\s*DA/i);
    price = priceMatch ? parseInt(priceMatch[1].replace(/\s+/g, ''), 10) : null;
  }

  // Décision 5 : Correction orthographique YSL Cuir
  if (namePart.includes('Cuir Goic')) {
    namePart = namePart.replace('Accord Cuir Goic', 'Cuir');
  }

  // Volume
  const volMatch = namePart.match(/(\d+)\s*ml(?:\s*\+\s*(\d+)\s*ml)?/i);
  let volumeMl = volMatch ? parseInt(volMatch[1], 10) : null;
  let volumeRaw = volMatch ? volMatch[0] : null;
  if (!volMatch && /60\s*ml\s*et\s*100\s*ml/i.test(namePart)) {
    volumeMl = 100;
    volumeRaw = '100 ml';
  }

  // Décision 4 : Volumes standards pour contenances manquantes
  let volumeEstimated = false;
  if (!volumeMl) {
    volumeEstimated = true;
    if (namePart.includes('Bellechasse')) { volumeMl = 125; volumeRaw = '125 ml'; }
    else if (namePart.includes('The Coveted Duchess Rose')) { volumeMl = 75; volumeRaw = '75 ml'; }
    else if (namePart.includes('Wild Leather') || namePart.includes('Cuir')) { volumeMl = 75; volumeRaw = '75 ml'; }
    else { volumeMl = 100; volumeRaw = '100 ml'; }
  }

  const brand = detectBrand(namePart);
  const concentration = cleanConcentration(namePart);

  let gender = 'unisexe';
  if (currentSection === 'FEMME') gender = 'femme';
  else if (currentSection === 'HOMME') gender = 'homme';
  else {
    // Parfums de niche : déduction du genre
    const n = normalize(namePart);
    if (n.includes('duchess rose') || n.includes('solaris') || n.includes('guidance') || n.includes('fleur de mate') || n.includes('iris d elite') || n.includes('crush on me')) {
      gender = 'femme';
    } else if (n.includes('endymion') || n.includes('mefisto') || n.includes('khanjar') || n.includes('dubai meydan') || n.includes('hacivat') || n.includes('chaos')) {
      gender = 'homme';
    } else {
      gender = 'unisexe';
    }
  }

  items.push({
    lineNum: idx + 1,
    section: currentSection,
    gender,
    original: trimmed,
    namePart,
    price,
    volumeMl,
    volumeRaw,
    volumeEstimated,
    brand,
    concentration
  });
});

console.log(`Parsed total raw items: ${items.length}`);

// Vérifier les doublons contre les 45 du catalogue
const catalogEntries = perfumeCatalog.map(p => ({
  id: p.id,
  brand: p.brand,
  name: p.name,
  gender: p.gender,
  concentration: cleanConcentration(p.concentration || p.name),
  normBrand: normalize(p.brand),
  normName: normalize(p.name)
}));

function isCatalogDuplicate(item) {
  const n = normalize(item.namePart);
  const itBrand = normalize(item.brand);
  for (const cat of catalogEntries) {
    let brandOk = (itBrand === cat.normBrand) ||
      (cat.normBrand.includes('armani') && itBrand.includes('armani')) ||
      (cat.normBrand.includes('dior') && itBrand.includes('dior')) ||
      (cat.normBrand.includes('rabanne') && (itBrand.includes('rabanne') || itBrand.includes('invictus'))) ||
      (cat.normBrand.includes('guerlain') && itBrand.includes('guerlain')) ||
      (cat.normBrand.includes('givenchy') && itBrand.includes('givenchy')) ||
      (cat.normBrand.includes('rochas') && itBrand.includes('rochas')) ||
      (cat.normBrand.includes('burberry') && itBrand.includes('burberry')) ||
      (cat.normBrand.includes('chloe') && itBrand.includes('chloe')) ||
      (cat.normBrand.includes('valentino') && itBrand.includes('valentino')) ||
      (cat.normBrand.includes('dolce gabbana') && (itBrand.includes('dolce') || itBrand.includes('d g'))) ||
      (cat.normBrand.includes('jean paul gaultier') && itBrand.includes('jean paul gaultier')) ||
      (cat.normBrand.includes('yves saint laurent') && itBrand.includes('yves saint laurent')) ||
      (cat.normBrand.includes('lacoste') && itBrand.includes('lacoste')) ||
      (cat.normBrand.includes('kenzo') && itBrand.includes('kenzo')) ||
      (cat.normBrand.includes('azzaro') && itBrand.includes('azzaro')) ||
      (cat.normBrand.includes('hermes') && itBrand.includes('hermes'));

    if (!brandOk) continue;
    if (cat.gender !== 'unisexe' && item.gender !== 'unisexe' && cat.gender !== item.gender) continue;

    // Matches stricts
    if (cat.id === 3 && n.includes('born in roma') && !n.includes('intense')) return true;
    if (cat.id === 4 && n.includes('born in roma') && n.includes('intense')) return true;
    if (cat.id === 5 && n.includes('fame in love')) return true;
    if (cat.id === 6 && n.includes('idole') && (n.includes('peach') || n.includes('rose'))) return true;
    if (cat.id === 8 && n.includes('audace')) return true;
    if (cat.id === 9 && n.includes('devotion') && item.section === 'FEMME') return true;
    if (cat.id === 11 && n.includes('my burberry blush')) return true;
    if (cat.id === 13 && n.includes('interdit rouge') && !n.includes('ultime')) return true;
    if (cat.id === 14 && n.includes('interdit rouge ultime')) return true;
    if (cat.id === 17 && n.includes('divine couture')) return true;
    if (cat.id === 18 && n.includes('instant de guerlain') && item.section === 'FEMME') return true;
    if (cat.id === 19 && n.includes('imperatrice')) return true;
    if (cat.id === 20 && n.includes('mademoiselle rochas')) return true;
    if (cat.id === 22 && n.includes('stronger with you') && n.includes('powerfully')) return true;
    if (cat.id === 23 && n.includes('gentleman society ambree')) return true;
    if (cat.id === 24 && n.includes('scandal') && n.includes('elixir')) return true;
    if (cat.id === 27 && n.includes('terre d hermes')) return true;
    if (cat.id === 28 && n.includes('acqua di gio')) return true;
    if (cat.id === 29 && n.includes('gentleman') && !n.includes('society') && !n.includes('reserve') && !n.includes('boisee') && item.concentration === 'Eau de Parfum') return true;
    if (cat.id === 31 && n.includes('invictus victory elixir')) return true;
    if (cat.id === 32 && n.includes('myslf') && (item.concentration === 'Parfum' || n.includes('le parfum'))) return true;
    if (cat.id === 33 && n.includes('myslf') && (item.concentration === 'Eau de Parfum' && !n.includes('le parfum'))) return true;
    if (cat.id === 34 && n.includes('la nuit de l homme') && item.concentration === 'Eau de Parfum') return true;
    if (cat.id === 37 && n.includes('kenzo homme indigo')) return true;
    if (cat.id === 38 && n.includes('sauvage') && (item.concentration === 'Parfum' && !n.includes('elixir'))) return true;
    if (cat.id === 39 && n.includes('sauvage elixir')) return true;
    if (cat.id === 40 && (n.includes('king') || n.includes('k ')) && (item.volumeMl === 200 || n.includes('200'))) return true;
    if (cat.id === 41 && n.includes('booster')) return true;
    if (cat.id === 42 && n.includes('the one') && item.concentration === 'Eau de Parfum Intense') return true;
    if (cat.id === 43 && n.includes('scandal absolu') && (item.volumeMl === 100 || !item.volumeMl)) return true;
    if (cat.id === 44 && n.includes('scandal intense') && (item.volumeMl === 150 || n.includes('150'))) return true;
    if (cat.id === 45 && n.includes('wanted by night')) return true;
  }
  return false;
}

// Filtrer les doublons du catalogue
const nonCatalogDuplicates = items.filter(it => !isCatalogDuplicate(it));
console.log(`Items after removing ${items.length - nonCatalogDuplicates.length} catalog duplicates: ${nonCatalogDuplicates.length}`);

// Décision 1 : Fusion des variantes de volume d'un même parfum en gardant le prix le plus élevé et son volume
// Clé unique : Marque + Nom épuré + Concentration + Genre
function makePerfumeKey(item) {
  let cleanName = normalize(item.namePart);
  // Retirer les indications de contenance, prix, etc.
  cleanName = cleanName.replace(/\d+\s*ml.*$/, '');
  cleanName = cleanName.replace(/\b(100|150|200|50|75|80|90|125|110|120)\s*ml\b/g, '');
  cleanName = cleanName.trim();
  return `${normalize(item.brand)}__${cleanName}__${item.concentration}__${item.gender}`;
}

const grouped = new Map();
nonCatalogDuplicates.forEach(it => {
  const key = makePerfumeKey(it);
  if (!grouped.has(key)) {
    grouped.set(key, []);
  }
  grouped.get(key).push(it);
});

console.log(`Unique perfume groups: ${grouped.size}`);

const mergedTargets = [];
for (const [key, group] of grouped.entries()) {
  // Trier par prix décroissant (Décision 1 : garder le prix le plus élevé et son volume)
  group.sort((a, b) => b.price - a.price);
  const best = group[0];
  const mergedVolumes = group.map(g => `${g.volumeMl}ml (${g.price} DA)`);
  mergedTargets.push({
    ...best,
    mergedCount: group.length,
    allVariantsListed: mergedVolumes
  });
}

// Trier par ligne d'origine
mergedTargets.sort((a, b) => a.lineNum - b.lineNum);
console.log(`Total target perfumes to create: ${mergedTargets.length}`);

fs.writeFileSync(path.join(ROOT, 'scripts', 'target-perfumes.json'), JSON.stringify(mergedTargets, null, 2), 'utf8');
console.log(`Saved target-perfumes.json`);
