import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const targets = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts', 'target-perfumes.json'), 'utf8'));
const images = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts', 'authorized-images.json'), 'utf8'));

function normalize(str) {
  return String(str || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[’']/g, ' ')
    .replace(/[^a-z0-9]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function canonicalizeText(str) {
  return normalize(str)
    .replace(/\bmb\b/g, 'montblanc')
    .replace(/\bmoncblanc\b/g, 'montblanc')
    .replace(/\bmonsera\b/g, 'mancera')
    .replace(/\broberto carralie\b/g, 'roberto cavalli')
    .replace(/\bmarc jacob\b/g, 'marc jacobs')
    .replace(/\bhome\b/g, 'homme')
    .replace(/\bbootled\b/g, 'bottled')
    .replace(/\bboutled\b/g, 'bottled')
    .replace(/\bpower of you\b/g, 'power of you')
    .replace(/\byou absolutly\b/g, 'stronger with you absolutely')
    .replace(/\byou intensly\b/g, 'stronger with you intensely')
    .replace(/\byou powerfully\b/g, 'stronger with you powerfully')
    .replace(/\byou parfum\b/g, 'stronger with you parfum')
    .replace(/\be\.?d?\.?p\.?i\b/g, ' intense ')
    .replace(/\be\.?d?\.?p\b/g, ' edp ')
    .replace(/\be\.?d?\.?t\b/g, ' edt ');
}

function getTokens(str) {
  const c = canonicalizeText(str);
  return c.split(' ').filter(t => !['eau', 'de', 'parfum', 'toilette', 'edp', 'edt', 'ep', 'et', 'epi', 'ml', 'pour', 'femme', 'homme', 'png', 'jpg', 'jpeg', 'jfif', 'webp', '100', '150', '200', '50', '75', '80', '90', '125', '110', '120'].includes(t) && t.length > 1);
}

const verifiedMap = [];
const missingImages = [];

for (const p of targets) {
  const pTokens = getTokens(p.namePart);
  const pBrandNorm = normalize(p.brand);
  const pNorm = canonicalizeText(p.namePart);

  let bestMatch = null;
  let bestScore = -1;

  for (const imgPath of images) {
    const parent = path.basename(path.dirname(imgPath));
    const file = path.basename(imgPath);
    const imgCanonical = canonicalizeText(`${parent} ${file}`);
    const imgTokens = getTokens(`${parent} ${file}`);

    // Brand check
    let brandOk = imgCanonical.includes(pBrandNorm) ||
      (pBrandNorm.includes('dolce gabbana') && (imgCanonical.includes('d&g') || imgCanonical.includes('dolce') || imgCanonical.includes('dg') || imgCanonical.includes('d g'))) ||
      (pBrandNorm.includes('yves saint laurent') && (imgCanonical.includes('ysl') || imgCanonical.includes('laurent') || imgCanonical.includes('bellechasse'))) ||
      (pBrandNorm.includes('christian dior') && (imgCanonical.includes('dior') || imgCanonical.includes('sauvage') || imgCanonical.includes('j adore') || imgCanonical.includes('miss dior'))) ||
      (pBrandNorm.includes('paco rabanne') && (imgCanonical.includes('rabanne') || imgCanonical.includes('invictus') || imgCanonical.includes('fame') || imgCanonical.includes('one million') || imgCanonical.includes('olympea'))) ||
      (pBrandNorm.includes('hugo boss') && (imgCanonical.includes('boss') || imgCanonical.includes('hugo'))) ||
      (pBrandNorm.includes('roberto cavalli') && (imgCanonical.includes('cavalli') || imgCanonical.includes('carralie'))) ||
      (pBrandNorm.includes('marc jacobs') && imgCanonical.includes('jacob')) ||
      (pBrandNorm.includes('armani') && (imgCanonical.includes('armani') || imgCanonical.includes('stronger with you'))) ||
      (pBrandNorm.includes('chanel') && (imgCanonical.includes('chanel') || imgCanonical.includes('allure'))) ||
      (pBrandNorm.includes('kenzo') && imgCanonical.includes('kenzo')) ||
      (pBrandNorm.includes('lacoste') && imgCanonical.includes('lacoste')) ||
      (pBrandNorm.includes('guerlain') && (imgCanonical.includes('guerlain') || imgCanonical.includes('cuir intense') || imgCanonical.includes('patchouli ardent') || imgCanonical.includes('oud essentiel') || imgCanonical.includes('epices exquises'))) ||
      (pBrandNorm.includes('chloe') && imgCanonical.includes('chloe')) ||
      (pBrandNorm.includes('givenchy') && (imgCanonical.includes('givenchy') || imgCanonical.includes('interdit') || imgCanonical.includes('irresistible') || imgCanonical.includes('ange ou demon'))) ||
      (pBrandNorm.includes('burberry') && imgCanonical.includes('burberry')) ||
      (pBrandNorm.includes('montblanc') && imgCanonical.includes('montblanc')) ||
      (pBrandNorm.includes('azzaro') && imgCanonical.includes('azzaro')) ||
      (pBrandNorm.includes('jean paul gaultier') && (imgCanonical.includes('gaultier') || imgCanonical.includes('scandal') || imgCanonical.includes('le beau') || imgCanonical.includes('le male'))) ||
      (pBrandNorm.includes('penhaligon') && imgCanonical.includes('penhaligon')) ||
      (pBrandNorm.includes('xerjoff') && (imgCanonical.includes('xerjoff') || imgCanonical.includes('casamorati') || imgCanonical.includes('erba') || imgCanonical.includes('italica') || imgCanonical.includes('mefisto'))) ||
      (pBrandNorm.includes('amouage') && imgCanonical.includes('amouage')) ||
      (pBrandNorm.includes('unique e luxury') && (imgCanonical.includes('unique') || imgCanonical.includes('akdeniz') || imgCanonical.includes('crush on me') || imgCanonical.includes('ocean'))) ||
      (pBrandNorm.includes('bdk') && (imgCanonical.includes('bdk') || imgCanonical.includes('gris charnel'))) ||
      (pBrandNorm.includes('louboutin') && imgCanonical.includes('louboutin')) ||
      (pBrandNorm.includes('nishane') && (imgCanonical.includes('nishane') || imgCanonical.includes('hacivat'))) ||
      (pBrandNorm.includes('omanluxury') && (imgCanonical.includes('oman') || imgCanonical.includes('khanjar'))) ||
      (pBrandNorm.includes('spirit of dubai') && imgCanonical.includes('meydan')) ||
      (pBrandNorm.includes('power of you') && imgCanonical.includes('power of you')) ||
      (pBrandNorm.includes('mancera') && imgCanonical.includes('mancera')) ||
      (pBrandNorm.includes('calvin klein') && imgCanonical.includes('ck one')) ||
      (pBrandNorm.includes('versace') && imgCanonical.includes('versace'));

    if (!brandOk) continue;

    // Faux amis stricts
    if (pNorm.includes('ambrosia') !== imgCanonical.includes('ambrosia')) continue;
    if (pNorm.includes('rouge ultime') && !imgCanonical.includes('ultime')) continue;
    if (!pNorm.includes('rouge ultime') && pNorm.includes('rouge') && imgCanonical.includes('ultime')) continue;
    if (pNorm.includes('rose velvet') && !imgCanonical.includes('velvet')) continue;
    if (pNorm.includes('nude velvet') && !imgCanonical.includes('nude')) continue;
    if (pNorm.includes('nectar') && !imgCanonical.includes('nectar')) continue;
    if (pNorm.includes('paradise garden') && !imgCanonical.includes('paradise')) continue;
    if (pNorm.includes('in blue') && !imgCanonical.includes('blue')) continue;
    if (pNorm.includes('ultra blue') && !imgCanonical.includes('blue')) continue;
    if (pNorm.includes('flowers edition') && !imgCanonical.includes('flower')) continue;

    const matchedTokens = pTokens.filter(t => imgTokens.includes(t));
    const score = matchedTokens.length / Math.max(1, pTokens.length);

    if (score > bestScore) {
      bestScore = score;
      bestMatch = imgPath;
    }
  }

  if (bestMatch && bestScore >= 0.4) {
    verifiedMap.push({
      perfume: p,
      imagePath: bestMatch,
      publicUrl: `/img/${bestMatch}`,
      score: bestScore
    });
  } else {
    missingImages.push({
      perfume: p,
      bestCandidate: bestMatch,
      score: bestScore,
      reason: bestMatch ? `Score insuffisant (${bestScore.toFixed(2)}) avec ${bestMatch}` : 'Aucun visuel correspondant dans les dossiers autorisés'
    });
  }
}

console.log(`Verified matches: ${verifiedMap.length}`);
console.log(`Missing images: ${missingImages.length}`);

fs.writeFileSync(path.join(ROOT, 'scripts', 'verified-image-map.json'), JSON.stringify(verifiedMap, null, 2), 'utf8');
fs.writeFileSync(path.join(ROOT, 'scripts', 'import-report', 'missing-images.md'), 
  `# Parfums non publiés — Absence d'image fiable (${missingImages.length} produits)

Conformément à la règle A (« Si aucune image fiable n'existe : NE publie PAS le produit, ne mets jamais une image au hasard, et ajoute-le à scripts/import-report/missing-images.md »), les produits suivants ne sont pas publiés tant qu'un visuel officiel conforme n'est pas fourni dans les dossiers autorisés.

| # | Ligne | Section | Marque | Parfum | Motif |
|---|---|---|---|---|---|
${missingImages.map((m, idx) => `| ${idx + 1} | L${m.perfume.lineNum} | ${m.perfume.section} | ${m.perfume.brand} | ${m.perfume.namePart} | ${m.reason} |`).join('\n')}
`, 'utf8');

console.log(`Updated verified-image-map.json and missing-images.md`);
