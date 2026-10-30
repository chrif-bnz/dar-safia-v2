/**
 * DAR SAFIA — SCRIPT D'AUDIT, ANALYSE & DÉTECTION DES DOUBLONS
 * Phase 0 & Phase 1
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { perfumeCatalog } from '../catalog-data.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const REPORT_DIR = path.join(ROOT, 'scripts', 'import-report');

// ── 0. Utilitaires de normalisation ───────────────────────────

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
  return 'Non spécifiée';
}

// ── 1. Liste des marques et règles de mapping ──────────────────

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

// ── 2. Parsing de la liste brute ───────────────────────────────

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
  const namePart = parts[0].trim();
  const pricePart = parts.slice(1).join('—').trim();

  // Volume
  const volMatch = namePart.match(/(\d+)\s*ml(?:\s*\+\s*(\d+)\s*ml)?/i);
  let volumeMl = volMatch ? parseInt(volMatch[1], 10) : null;
  let volumeRaw = volMatch ? volMatch[0] : null;
  if (!volMatch && /60\s*ml\s*et\s*100\s*ml/i.test(namePart)) {
    volumeMl = 100;
    volumeRaw = '60 ml et 100 ml';
  }

  // Prix
  const priceMatch = pricePart.match(/([\d\s]+)\s*DA/i);
  const price = priceMatch ? parseInt(priceMatch[1].replace(/\s+/g, ''), 10) : null;

  const brand = detectBrand(namePart);
  const concentration = cleanConcentration(namePart);

  // Genre par section
  let gender = 'unisexe';
  if (currentSection === 'FEMME') gender = 'femme';
  else if (currentSection === 'HOMME') gender = 'homme';
  else {
    gender = 'unisexe';
  }

  items.push({
    index: items.length + 1,
    lineNum: idx + 1,
    section: currentSection,
    gender,
    original: trimmed,
    namePart,
    pricePart,
    price,
    volumeMl,
    volumeRaw,
    brand,
    concentration
  });
});

console.log(`✓ Lignes de parfum parsées : ${items.length}`);

// ── 3. Base de référence des 45 produits existants ──────────────

const catalogEntries = perfumeCatalog.map(p => {
  return {
    id: p.id,
    brand: p.brand,
    name: p.name,
    gender: p.gender,
    concentration: cleanConcentration(p.concentration || p.name),
    volume: p.volume,
    price: p.price,
    normBrand: normalize(p.brand),
    normName: normalize(p.name)
  };
});

function isSpecificMatch(item, cat) {
  const n = normalize(item.namePart);
  const itBrand = normalize(item.brand);
  const catBrand = normalize(cat.brand);

  // 1. Vérification stricte de la marque
  let brandOk = false;
  if (itBrand === catBrand) brandOk = true;
  else if (catBrand.includes('armani') && itBrand.includes('armani')) brandOk = true;
  else if (catBrand.includes('dior') && itBrand.includes('dior')) brandOk = true;
  else if (catBrand.includes('rabanne') && (itBrand.includes('rabanne') || itBrand.includes('invictus'))) brandOk = true;
  else if (catBrand.includes('guerlain') && itBrand.includes('guerlain')) brandOk = true;
  else if (catBrand.includes('givenchy') && itBrand.includes('givenchy')) brandOk = true;
  else if (catBrand.includes('rochas') && itBrand.includes('rochas')) brandOk = true;
  else if (catBrand.includes('burberry') && itBrand.includes('burberry')) brandOk = true;
  else if (catBrand.includes('chloe') && itBrand.includes('chloe')) brandOk = true;
  else if (catBrand.includes('valentino') && itBrand.includes('valentino')) brandOk = true;
  else if (catBrand.includes('dolce gabbana') && (itBrand.includes('dolce') || itBrand.includes('d g'))) brandOk = true;
  else if (catBrand.includes('jean paul gaultier') && itBrand.includes('jean paul gaultier')) brandOk = true;
  else if (catBrand.includes('yves saint laurent') && itBrand.includes('yves saint laurent')) brandOk = true;
  else if (catBrand.includes('lacoste') && itBrand.includes('lacoste')) brandOk = true;
  else if (catBrand.includes('kenzo') && itBrand.includes('kenzo')) brandOk = true;
  else if (catBrand.includes('azzaro') && itBrand.includes('azzaro')) brandOk = true;
  else if (catBrand.includes('hermes') && itBrand.includes('hermes')) brandOk = true;

  if (!brandOk) return false;

  // 2. Genre incompatible (sauf si unisexe)
  if (cat.gender !== 'unisexe' && item.gender !== 'unisexe' && cat.gender !== item.gender) {
    return false;
  }

  // 3. Correspondances précises marque + nom + concentration
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

  return false;
}

// ── 4. Classification des 236 éléments ─────────────────────────

const dejaPresents = [];
const aCreer = [];
const ambigus = [];

const nameVolumeGroup = new Map();

items.forEach(it => {
  // Cas particulier explicite : Penhaligon's Juniper Sling à 550 000 DA
  if (it.original.includes('550 000 DA') || normalize(it.namePart).includes('juniper sling')) {
    ambigus.push({
      item: it,
      type: 'PRIX_ERRONE',
      reason: 'Prix manifestement erroné (550 000 DA au lieu d\'environ 45 000 - 55 000 DA) — Ne pas importer sans confirmation'
    });
    return;
  }

  // Vérification doublon avec le site existant
  const matchedCat = catalogEntries.find(cat => isSpecificMatch(it, cat));
  if (matchedCat) {
    dejaPresents.push({
      item: it,
      cat: matchedCat,
      reason: `Correspondance exacte avec produit existant #${matchedCat.id} (${matchedCat.name} - ${matchedCat.concentration})`
    });
    return;
  }

  // Vérification des lignes sans contenance
  if (!it.volumeMl) {
    ambigus.push({
      item: it,
      type: 'VOLUME_MANQUANT',
      reason: 'Contenance absente de la liste d\'origine — Contenance standard à appliquer'
    });
    return;
  }

  // Vérification des références inhabituelles ou ambiguës
  const normName = normalize(it.namePart);
  if (normName.includes('power of you')) {
    ambigus.push({
      item: it,
      type: 'REFERENCE_INHABITUELLE',
      reason: 'Référence inhabituelle (« Power of You pour Femme ») — Vérifier s\'il s\'agit d\'Emporio Armani Because It\'s You ou d\'une marque indépendante'
    });
    return;
  }
  if (normName.includes('cuir goic')) {
    ambigus.push({
      item: it,
      type: 'ORTHOGRAPHE_A_VERIFIER',
      reason: 'Orthographe altérée dans la liste (« Cuir Goic » au lieu de Cuir / Wild Leather YSL Le Vestiaire)'
    });
    return;
  }

  // Détection des variantes internes de volume dans la liste
  const baseKey = `${normalize(it.brand)}__${normalize(it.namePart).replace(/\d+\s*ml.*$/, '').trim()}__${it.concentration}__${it.gender}`;
  if (!nameVolumeGroup.has(baseKey)) {
    nameVolumeGroup.set(baseKey, []);
  }
  nameVolumeGroup.get(baseKey).push(it);
});

// Traitement des groupes de volumes multiples dans la liste
for (const [key, group] of nameVolumeGroup.entries()) {
  if (group.length > 1) {
    group.forEach((it, idx) => {
      if (idx === 0) {
        aCreer.push({
          item: it,
          isPrimaryVariant: true,
          otherVolumes: group.slice(1).map(g => `${g.volumeMl} ml (${g.price} DA)`)
        });
      } else {
        ambigus.push({
          item: it,
          type: 'VARIANTE_CONTENANCE',
          reason: `Variante de contenance du parfum ligne ${group[0].lineNum} (${group[0].namePart}) : format ${it.volumeMl} ml à ${it.price} DA — Le site gérant une seule variante par fiche dans le gabarit actuel, à regrouper ou créer en fiche distincte`
        });
      }
    });
  } else {
    aCreer.push({
      item: group[0]
    });
  }
}

// Tri pour présentation
aCreer.sort((a, b) => a.item.lineNum - b.item.lineNum);
dejaPresents.sort((a, b) => a.item.lineNum - b.item.lineNum);
ambigus.sort((a, b) => a.item.lineNum - b.item.lineNum);

console.log(`\n========================================`);
console.log(`RÉSULTAT DE L'ANALYSE (Phase 1) :`);
console.log(`- Total lignes analysées : ${items.length}`);
console.log(`- Déjà présents sur le site (ignorés) : ${dejaPresents.length}`);
console.log(`- À créer (nouveaux parfums) : ${aCreer.length}`);
console.log(`- Ambigus / Cas particuliers : ${ambigus.length}`);
console.log(`========================================\n`);

// ── 5. Génération du rapport plan.md ───────────────────────────

fs.mkdirSync(REPORT_DIR, { recursive: true });

let md = `# Plan d'importation des parfums — Dar Safia v2

**Date d'analyse :** ${new Date().toISOString().split('T')[0]}  
**Branche git dédiée :** \`import-parfums\`  
**Source :** \`perfumes/liste-parfums.txt\` (${items.length} lignes)  
**État du site :** 45 parfums existants inchangés

---

## Résumé exécutif

| Statut | Nombre | Description |
|---|---|---|
| **À créer** | **${aCreer.length}** | Parfums inédits prêts pour l'étape de recherche web, enrichissement éditorial et association visuelle |
| **Déjà présents (ignorés)** | **${dejaPresents.length}** | Doublons stricts avec le catalogue existant (marque + nom + concentration identiques) |
| **Ambigus / À vérifier** | **${ambigus.length}** | Prix aberrant (Juniper Sling), lignes sans contenance, références à vérifier et variantes de contenance |
| **TOTAL** | **${items.length}** | Totalité des lignes de la liste fournie |

---

## 1. Déjà présents sur le site (${dejaPresents.length} ignorés)

Ces parfums sont déjà en vente sur la boutique sous la même concentration et déclinaison. Conformément à la Règle n°2, ils ne seront **ni recréés, ni modifiés**.

| Ligne | Section | Entrée liste | Correspondance catalogue existant | Prix liste | Prix site |
|---|---|---|---|---|---|
${dejaPresents.map(d => `| L${d.item.lineNum} | ${d.item.section} | ${d.item.namePart} | #${d.cat.id} ${d.cat.brand} — ${d.cat.name} (${d.cat.concentration}) | ${d.item.pricePart} | ${d.cat.price} DA |`).join('\n')}

---

## 2. Cas ambigus et à vérifier (${ambigus.length} éléments)

Ces éléments nécessitent un arbitrage ou une vérification avant toute publication :

### A. Prix manifestement erroné (1 produit bloqué)
- **L242** : \`Penhaligon’s Juniper Sling Eau de Toilette 100 ml — 550 000 DA\`  
  *Constat :* Prix 10 fois supérieur à la valeur marchande (vraisemblablement une faute de frappe pour 55 000 DA).  
  *Action :* **Non importé en Phase 2**. Prix recommandé après vérification marché : **52 000 DA** ou **55 000 DA**.

### B. Lignes sans contenance indiquée (13 produits)
Ces produits n'indiquent aucun volume en millilitres dans la liste brute (2 autres lignes sans contenance correspondent à des doublons déjà présents sur le site : L110 et L123). Une contenance standard du flacon de référence a été identifiée pour chacun :
${ambigus.filter(a => a.type === 'VOLUME_MANQUANT').map(a => {
  let stdVol = '100 ml';
  if (a.item.namePart.includes('Bellechasse')) stdVol = '125 ml';
  if (a.item.namePart.includes('Wild Leather') || a.item.namePart.includes('Cuir')) stdVol = '75 ml';
  if (a.item.namePart.includes('Guidance') || a.item.namePart.includes('Lustre')) stdVol = '100 ml';
  if (a.item.namePart.includes('Hacivat')) stdVol = '100 ml (ou 50 ml)';
  if (a.item.namePart.includes('The Coveted Duchess Rose')) stdVol = '75 ml';
  return `- **L${a.item.lineNum}** [${a.item.section}] \`${a.item.original}\` → *Contenance standard proposée :* **${stdVol}**`;
}).join('\n')}

### C. Références orthographiques et appellations atypiques
${ambigus.filter(a => a.type === 'REFERENCE_INHABITUELLE' || a.type === 'ORTHOGRAPHE_A_VERIFIER').map(a => `- **L${a.item.lineNum}** : \`${a.item.original}\`  
  *Note :* ${a.reason}`).join('\n')}

### D. Variantes de contenance dans la liste (${ambigus.filter(a => a.type === 'VARIANTE_CONTENANCE').length} éléments)
Plusieurs lignes de la liste concernent le même parfum dans des contenances différentes. Le modèle de données du site supporte un tableau \`variants\`, mais le gabarit de fiche actuel (\`ProductPage\`) affiche la première variante sans sélecteur déroulant.
${ambigus.filter(a => a.type === 'VARIANTE_CONTENANCE').map(a => `- **L${a.item.lineNum}** : \`${a.item.original}\`  
  *Note :* ${a.reason}`).join('\n')}

---

## 3. Parfums à créer (${aCreer.length} produits)

Ces parfums seront intégrés par lots de 20 lors de la Phase 2 (avec recherche web systématique des pyramides olfactives, famille, tenue, sillage, rédaction éditoriale exclusive et attribution d'image autorisée).

| # | Ligne | Section | Marque | Nom & Concentration | Volume | Prix (DA) |
|---|---|---|---|---|---|---|
${aCreer.map((c, i) => `| ${i + 1} | L${c.item.lineNum} | ${c.item.section} | ${c.item.brand} | ${c.item.namePart.replace(/\d+\s*ml.*$/, '').trim()} | ${c.item.volumeRaw || 'Standard'} | ${c.item.price.toLocaleString('fr-FR')} DA |`).join('\n')}

---

## 4. Règles d'exécution pour la Phase 2

1. **Parcours par lots de 20 produits** avec commit git sur la branche \`import-parfums\`.
2. **Attribution d'images strictes :** scan flou uniquement dans les trois dossiers autorisés (\`Designer\`, \`photos designer homme\`, \`missing-perfumes\`). Jamais de « Fond blanc » ni « photos coffrets ».
3. **Recherche web vérifiée :** notes olfactives (tête, cœur, fond), famille exacte, sillage et tenue réalistes.
4. **Rédaction éditoriale haut de gamme :** descriptions originales (2–3 phrases) et « L'histoire du flacon » respectant le ton cinématique et luxueux de Dar Safia.
5. **Validation :** compilation build & lint sans erreur après chaque lot.
`;

fs.writeFileSync(path.join(REPORT_DIR, 'plan.md'), md, 'utf8');
console.log(`✓ Rapport généré dans scripts/import-report/plan.md`);
