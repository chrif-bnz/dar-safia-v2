import fs from 'fs';
import path from 'path';
import { perfumeCatalog } from './catalog-data.js';

const rootImgDir = path.join(process.cwd(), 'public/img/perfumes/Photos site web');
const forbiddenDir = 'Fond blanc';

const priorityHomme = [
  'photos designer homme',
  'missing-perfumes',
  'photos coffrets'
];

const priorityFemme = [
  'Designer',
  'missing-perfumes',
  'photos coffrets'
];

function getAllFiles(dirPath, arrayOfFiles = []) {
  if (!fs.existsSync(dirPath)) return arrayOfFiles;
  const files = fs.readdirSync(dirPath);

  files.forEach(function (file) {
    if (fs.statSync(dirPath + '/' + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + '/' + file, arrayOfFiles);
    } else {
      arrayOfFiles.push(path.join(dirPath, '/', file));
    }
  });

  return arrayOfFiles;
}

const allFiles = getAllFiles(rootImgDir);
const validFiles = allFiles.filter(f => !f.includes(path.sep + forbiddenDir + path.sep));

const imageList = validFiles.map(fullPath => {
  const relPath = path.relative(rootImgDir, fullPath).replace(/\\/g, '/');
  const dirName = path.dirname(relPath);
  const fileName = path.basename(relPath);
  const topFolder = relPath.split('/')[0];
  return {
    fullPath,
    relPath,
    dirName,
    fileName,
    topFolder,
    nameWithoutExt: path.parse(fileName).name,
    searchString: `${dirName}/${fileName}`.toLowerCase()
  };
});

function normalizeName(name) {
  return name.toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]/g, '');
}

const manualMap = {
  "Rabanne Fame In Love": "Designer/Fame in love rabanne parfum élixir 80ml/Fame in love rabanne parfum élixir 80ml.png",
  "Lancôme Idôle Peach & Rose": "Designer/idole peach n roses E.P fruité 100ml/idole peach n roses E.P fruité 100ml.png",
  "Dolce & Gabbana Devotion (Femme)": "Designer/Devotion Dolce&Gabbana pour femme/Devotion Dolce&Gabbana pour femme.png",
  "My Burberry Blush": "missing-perfumes/Burberry blush.png",
  "Givenchy L'Interdit Rouge": "Designer/L_Interdit Eau de Parfum Rouge Givenchy/L_Interdit Eau de Parfum Rouge Givenchy.png",
  "Givenchy L'Interdit Rouge Ultime": "Designer/Interdit rouge ultime E.P 80ml/Interdit rouge ultime E.P 80ml.png",
  "Givenchy Irrésistible": "Designer/Irresistible nude velvet 80ml/Irresistible nude velvet 80ml.png",
  "Dior J'adore Intense": "Designer/J’adore intense parfum 100ml/J’adore intense parfum 100ml.png",
  "Jean Paul Gaultier Divine Couture": "Designer/Gaultier divine couture E.P 100ml/Gaultier divine couture E.P 100ml.png",
  "L'Instant de Guerlain Femme": "Designer/L’instant de guerlaîn E.P 75m/L’instant de guerlaîn E.P 75m.png",
  "Dolce & Gabbana L'Impératrice": "Designer/L’impératrice D.G E.T 100ml/L’impératrice D.G E.T 100ml.png",
  "Emporio Armani Stronger With You (You Powerfully)": "photos designer homme/You powerfully Ep 100/You powerfully Ep 100.jfif",
  "Givenchy Gentleman Society Ambrée": "photos designer homme/Givenchy sociéty ambre EP100/Givenchy sociéty ambre EP100.jfif",
  "Jean Paul Gaultier Scandal Pour Homme Elixir": "photos designer homme/jean paul gaultier scandale élixir 100ml/jean paul gaultier scandale élixir 100ml.jfif",
  "Prada Paradigme / L'Homme": "photos designer homme/Prada paradigme Ep 100ml/Prada paradigme Ep 100ml.jfif",
  "Montblanc Explorer Platinum / Extrême": "photos designer homme/Mb explorer extrême P 100/Mb explorer extrême P 100.png",
  "Hermès Terre d'Hermès Intense": "photos designer homme/Terre dhermes Ep intense 100/Terre dhermes Ep intense 100.jfif",
  "Givenchy Gentleman Eau de Parfum": "photos designer homme/Givenchy gentleman EP 100/Givenchy gentleman EP 100.jfif",
  "Jean Paul Gaultier Le Beau Narcisse / Le Parfum": "photos designer homme/jean paul gaultierle beau narcis Ep 125/jean paul gaultierle beau narcis Ep 125.jfif",
  "Paco Rabanne Invictus Victory Elixir": "photos designer homme/Invictus victory élixir pi 100/Invictus victory élixir pi 100.png",
  "Montblanc Legend Elixir / Red": "photos designer homme/Mb legend élixir parfum 100/Mb legend élixir parfum 100.jpg",
  "Lacoste L.12.12 Original Aqua": "photos designer homme/Lacoste original aqua EP 100ml/Lacoste original aqua EP 100ml.jfif",
  "Kenzo Homme Indigo / Santal Marin": "photos designer homme/Kenzo homme indigo EP 110 ml/Kenzo homme indigo EP 110 ml.jpg",
  "Dior Sauvage Le Parfum": "photos designer homme/Dior sauvage Parfum 100ml/Dior sauvage Parfum 100ml.jpg",
  "Jean Paul Gaultier Scandal Absolu": "photos designer homme/jean paul gaultier scandale absolue 100mll/jean paul gaultier scandale absolue 100mll.jfif",
  "Jean Paul Gaultier Scandal Intense 150ml": "photos designer homme/jean paul gaultie rscandale intense 150 ml/jean paul gaultie rscandale intense 150 ml.jfif"
};

let report = {
  total: perfumeCatalog.length,
  kept: 0,
  corrected: 0,
  foundInDesigner: 0,
  foundInHomme: 0,
  foundInMissing: 0,
  foundInCoffrets: 0,
  missing: []
};

let rawCatalog = fs.readFileSync('./catalog-data.js', 'utf8');

for (const product of perfumeCatalog) {
  let matchedImage = null;
  const gender = product.gender.toLowerCase();
  const folders = gender === 'homme' ? priorityHomme : priorityFemme;
  const pName = normalizeName(product.name);
  const pBrand = normalizeName(product.brand);
  
  if (manualMap[product.name]) {
     matchedImage = imageList.find(i => i.relPath === manualMap[product.name]);
  }
  
  if (!matchedImage) {
    for (const folder of folders) {
      const fImgs = imageList.filter(i => i.topFolder === folder);
      let found = fImgs.find(i => normalizeName(i.nameWithoutExt) === pName);
      if (!found) {
        found = fImgs.find(i => {
          const parts = i.dirName.split('/');
          return normalizeName(parts[parts.length - 1]) === pName;
        });
      }
      
      if (!found) {
        found = fImgs.find(i => {
          const fName = normalizeName(i.nameWithoutExt);
          const dName = normalizeName(i.dirName.split('/').pop());
          const pTokens = product.name.toLowerCase().split(/[\s-]+/);
          
          const variantKeywords = ['intense', 'elixir', 'parfum', 'absolu', 'platinum'];
          for (const kw of variantKeywords) {
            const pHasKw = pTokens.includes(kw);
            const fHasKw = fName.includes(kw) || dName.includes(kw);
            if (pHasKw !== fHasKw) return false;
          }
          
          const pCore = pName.replace(/(eaudeparfum|eaudetoilette|edp|edt)$/, '');
          const fCore = fName.replace(/(eaudeparfum|eaudetoilette|edp|edt)$/, '');
          const dCore = dName.replace(/(eaudeparfum|eaudetoilette|edp|edt)$/, '');
          
          return (fCore.includes(pCore) || dCore.includes(pCore)) && (fCore.startsWith(pBrand) || dCore.startsWith(pBrand) || fCore.startsWith(pCore) || dCore.startsWith(pCore));
        });
      }
      
      if (found) {
        matchedImage = found;
        break;
      }
    }
  }
  
  if (matchedImage) {
    const newPath = `/img/perfumes/Photos site web/${matchedImage.relPath}`;
    if (newPath === product.img) {
      report.kept++;
    } else {
      const regex = new RegExp(`(name:\\s*['"]${product.name.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')}['"][\\s\\S]*?img:\\s*['"])(.*?)(['"])`);
      rawCatalog = rawCatalog.replace(regex, `$1${newPath}$3`);
      report.corrected++;
    }
    
    if (matchedImage.topFolder === 'Designer') report.foundInDesigner++;
    if (matchedImage.topFolder === 'photos designer homme') report.foundInHomme++;
    if (matchedImage.topFolder === 'missing-perfumes') report.foundInMissing++;
    if (matchedImage.topFolder === 'photos coffrets') report.foundInCoffrets++;
  } else {
    report.missing.push(product.name);
    const currentIsAllowed = imageList.some(i => i.relPath === product.img.replace('/img/perfumes/Photos site web/', ''));
    if (currentIsAllowed) {
      report.kept++;
    }
  }
}

fs.writeFileSync('./catalog-data.js', rawCatalog);

console.log("=== RAPPORT FINAL ===");
console.log(`Cartes examinées : ${report.total}`);
console.log(`Images conservées (déjà correctes) : ${report.kept}`);
console.log(`Images corrigées : ${report.corrected}`);
console.log(`Images trouvées dans Designer : ${report.foundInDesigner}`);
console.log(`Images trouvées dans photos designer homme : ${report.foundInHomme}`);
console.log(`Images trouvées dans missing-perfumes : ${report.foundInMissing}`);
console.log(`Images trouvées dans photos coffrets : ${report.foundInCoffrets}`);
console.log(`\nProduits sans image fiable : ${report.missing.length}`);
report.missing.forEach(m => console.log(` - ${m}`));
