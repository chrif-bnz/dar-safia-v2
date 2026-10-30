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

function cleanTokens(str) {
  const n = normalize(str);
  return n.split(' ').filter(t => !['eau', 'de', 'parfum', 'toilette', 'edp', 'edt', 'ep', 'et', 'epi', 'ml', 'pour', 'femme', 'homme', 'png', 'jpg', 'jpeg', 'jfif', 'webp'].includes(t) && !/^\d+$/.test(t) && t.length > 1);
}

// Liste des index d'images
const imageIndex = images.map(img => {
  const filename = path.basename(img);
  const parent = path.basename(path.dirname(img));
  const fullNorm = normalize(`${parent} ${filename}`)
    .replace(/e\.?d?\.?p\.?i/g, ' edp intense ')
    .replace(/e\.?d?\.?p/g, ' edp ')
    .replace(/e\.?d?\.?t/g, ' edt ')
    .replace(/roberto carralie/g, 'roberto cavalli')
    .replace(/marc jacob\b/g, 'marc jacobs');

  return {
    path: img,
    fullNorm,
    tokens: cleanTokens(fullNorm)
  };
});

const matched = [];
const missing = [];

for (const p of targets) {
  const pNorm = normalize(p.namePart)
    .replace(/e\.?d?\.?p\.?i/g, ' edp intense ')
    .replace(/e\.?d?\.?p/g, ' edp ')
    .replace(/e\.?d?\.?t/g, ' edt ');

  const pTokens = cleanTokens(pNorm);
  const pBrandNorm = normalize(p.brand);

  let bestImg = null;
  let bestScore = 0;
  let bestConfidence = 'NONE';

  for (const img of imageIndex) {
    // Vérification de marque
    let brandOk = false;
    if (img.fullNorm.includes(pBrandNorm)) brandOk = true;
    else if (pBrandNorm.includes('dolce gabbana') && (img.fullNorm.includes('d&g') || img.fullNorm.includes('dolce') || img.fullNorm.includes('dg'))) brandOk = true;
    else if (pBrandNorm.includes('yves saint laurent') && (img.fullNorm.includes('ysl') || img.fullNorm.includes('laurent'))) brandOk = true;
    else if (pBrandNorm.includes('christian dior') && img.fullNorm.includes('dior')) brandOk = true;
    else if (pBrandNorm.includes('paco rabanne') && (img.fullNorm.includes('rabanne') || img.fullNorm.includes('invictus') || img.fullNorm.includes('fame') || img.fullNorm.includes('one million') || img.fullNorm.includes('olympea'))) brandOk = true;
    else if (pBrandNorm.includes('hugo boss') && (img.fullNorm.includes('boss') || img.fullNorm.includes('hugo'))) brandOk = true;
    else if (pBrandNorm.includes('roberto cavalli') && (img.fullNorm.includes('cavalli') || img.fullNorm.includes('carralie'))) brandOk = true;
    else if (pBrandNorm.includes('marc jacobs') && img.fullNorm.includes('jacob')) brandOk = true;
    else if (pBrandNorm.includes('armani') && img.fullNorm.includes('armani')) brandOk = true;
    else if (pBrandNorm.includes('chanel') && img.fullNorm.includes('chanel')) brandOk = true;
    else if (pBrandNorm.includes('kenzo') && img.fullNorm.includes('kenzo')) brandOk = true;
    else if (pBrandNorm.includes('lacoste') && img.fullNorm.includes('lacoste')) brandOk = true;
    else if (pBrandNorm.includes('guerlain') && img.fullNorm.includes('guerlain')) brandOk = true;
    else if (pBrandNorm.includes('chloe') && img.fullNorm.includes('chloe')) brandOk = true;
    else if (pBrandNorm.includes('givenchy') && img.fullNorm.includes('givenchy')) brandOk = true;
    else if (pBrandNorm.includes('burberry') && img.fullNorm.includes('burberry')) brandOk = true;
    else if (pBrandNorm.includes('montblanc') && img.fullNorm.includes('montblanc')) brandOk = true;
    else if (pBrandNorm.includes('azzaro') && img.fullNorm.includes('azzaro')) brandOk = true;
    else if (pBrandNorm.includes('jean paul gaultier') && (img.fullNorm.includes('gaultier') || img.fullNorm.includes('scandal') || img.fullNorm.includes('le beau') || img.fullNorm.includes('le male'))) brandOk = true;
    else if (pBrandNorm.includes('penhaligon') && img.fullNorm.includes('penhaligon')) brandOk = true;
    else if (pBrandNorm.includes('xerjoff') && (img.fullNorm.includes('xerjoff') || img.fullNorm.includes('casamorati') || img.fullNorm.includes('erba') || img.fullNorm.includes('italica') || img.fullNorm.includes('mefisto'))) brandOk = true;
    else if (pBrandNorm.includes('amouage') && img.fullNorm.includes('amouage')) brandOk = true;
    else if (pBrandNorm.includes('unique e luxury') && (img.fullNorm.includes('unique') || img.fullNorm.includes('akdeniz') || img.fullNorm.includes('crush on me') || img.fullNorm.includes('ocean'))) brandOk = true;
    else if (pBrandNorm.includes('bdk') && (img.fullNorm.includes('bdk') || img.fullNorm.includes('gris charnel'))) brandOk = true;
    else if (pBrandNorm.includes('louboutin') && img.fullNorm.includes('louboutin')) brandOk = true;
    else if (pBrandNorm.includes('nishane') && (img.fullNorm.includes('nishane') || img.fullNorm.includes('hacivat'))) brandOk = true;
    else if (pBrandNorm.includes('versace') && img.fullNorm.includes('versace')) brandOk = true;

    if (!brandOk) continue;

    // Tokens du parfum
    const matchedTokens = pTokens.filter(t => img.tokens.includes(t));
    const tokenRatio = matchedTokens.length / Math.max(1, pTokens.length);

    // Faux amis stricts
    if (pNorm.includes('ambrosia') !== img.fullNorm.includes('ambrosia')) continue;
    if (pNorm.includes('rouge ultime') && !img.fullNorm.includes('ultime')) continue;
    if (!pNorm.includes('rouge ultime') && pNorm.includes('rouge') && img.fullNorm.includes('ultime')) continue;
    if (pNorm.includes('rose velvet') && !img.fullNorm.includes('velvet')) continue;
    if (pNorm.includes('nude velvet') && !img.fullNorm.includes('nude')) continue;
    if (pNorm.includes('nectar') && !img.fullNorm.includes('nectar')) continue;
    if (pNorm.includes('paradise garden') && !img.fullNorm.includes('paradise')) continue;
    if (pNorm.includes('in blue') && !img.fullNorm.includes('blue')) continue;
    if (pNorm.includes('ultra blue') && !img.fullNorm.includes('blue')) continue;
    if (pNorm.includes('flowers edition') && !img.fullNorm.includes('flower')) continue;

    let score = tokenRatio;
    // Bonus correspondance concentration
    if ((p.concentration.includes('Intense') && img.fullNorm.includes('intense')) ||
        (!p.concentration.includes('Intense') && !img.fullNorm.includes('intense'))) {
      score += 0.3;
    }
    if ((p.concentration.includes('Toilette') && img.fullNorm.includes('edt')) ||
        (p.concentration.includes('Parfum') && (img.fullNorm.includes('edp') || img.fullNorm.includes('parfum')))) {
      score += 0.2;
    }

    if (score > bestScore) {
      bestScore = score;
      bestImg = img.path;
      bestConfidence = tokenRatio >= 0.5 ? 'HIGH' : tokenRatio >= 0.33 ? 'MEDIUM' : 'LOW';
    }
  }

  if (bestImg && bestConfidence !== 'LOW' && bestScore >= 0.7) {
    matched.push({
      perfume: p,
      image: bestImg,
      score: bestScore
    });
  } else {
    missing.push({
      perfume: p,
      bestCandidate: bestImg,
      score: bestScore
    });
  }
}

console.log(`Matched with reliable image: ${matched.length}`);
console.log(`Missing reliable image: ${missing.length}`);

fs.writeFileSync(path.join(ROOT, 'scripts', 'image-match-results.json'), JSON.stringify({ matched, missing }, null, 2), 'utf8');
