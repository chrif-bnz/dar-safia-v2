import fs from 'fs';

const targets = JSON.parse(fs.readFileSync('scripts/target-perfumes.json', 'utf8'));
const authorized = JSON.parse(fs.readFileSync('scripts/authorized-images.json', 'utf8'));

function normalize(str) {
  return (str || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[’']/g, ' ')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

const matches = [];
const missing = [];

for (const p of targets) {
  const normOriginal = normalize(p.original);
  const normName = normalize(p.namePart);

  let bestImg = null;

  // Manual explicit mappings for known typos/variations in repository files
  if (normOriginal.includes('power of you')) {
    bestImg = authorized.find(img => img.includes('Power of you E.P pour femme 90ml.jfif'));
  } else if (normOriginal.includes('37 rue de bellechasse')) {
    bestImg = authorized.find(img => img.includes('37 rue de BELLECHASSE OUD-ÉLEMI YSL.png'));
  } else if (normOriginal.includes('lavalliere')) {
    bestImg = authorized.find(img => img.includes('Lavallière accord figue-rose YSL E.P 125ml.png'));
  } else if (normOriginal.includes('wild leather')) {
    bestImg = authorized.find(img => img.includes('Wild leather accord cuir goic E.P YSL  125ml.jpg'));
  } else if (normOriginal.includes('exquisite embroidery')) {
    bestImg = authorized.find(img => img.includes('Exquisite embroidery accord rose ambre gris YSL E.P 125ml.jpg'));
  } else if (normOriginal.includes('hacivat')) {
    bestImg = authorized.find(img => img.includes('Hacivat nishane extrait parfum.png'));
  } else if (normOriginal.includes('duchess rose')) {
    bestImg = authorized.find(img => img.includes('Penhaligon’s the coveted duchess rose.jpg'));
  } else if (normOriginal.includes('juniper sling')) {
    bestImg = authorized.find(img => img.includes('Penhaligon’s london juniper sling E.T 100m.png'));
  } else if (normOriginal.includes('solaris')) {
    bestImg = authorized.find(img => img.includes('Penhaligon’s london solaris E.P 100ml.png'));
  } else if (normOriginal.includes('legacy of petra')) {
    bestImg = authorized.find(img => img.includes('Penhaligon’s legacy of petra E.P 100ml.png'));
  } else if (normOriginal.includes('constantinople')) {
    bestImg = authorized.find(img => img.includes('Penhaligon’s Constantinople E.P 100ml.png'));
  } else if (normOriginal.includes('endymion')) {
    bestImg = authorized.find(img => img.includes('Penhaligon’s endymion Cologne E. Cologne 100ml.png'));
  } else if (normOriginal.includes('babylon')) {
    bestImg = authorized.find(img => img.includes('Penhaligon’s babylon E.P 100ml..png'));
  } else if (normOriginal.includes('deep amber')) {
    bestImg = authorized.find(img => img.includes('Roméo bejar deep Amber extrait de parfum 100ml.png'));
  } else if (normOriginal.includes('black stone')) {
    bestImg = authorized.find(img => img.includes('Roméo bejar black stone extrait de parfum 100ml.png'));
  } else if (normOriginal.includes('anima viva')) {
    bestImg = authorized.find(img => img.includes('Ramon bejar anima viva extrait de parfum.png'));
  } else if (normOriginal.includes('ocean the rive')) {
    bestImg = authorized.find(img => img.includes('Unique ´ e luxury océan the rive.png'));
  } else if (normOriginal.includes('crush on me')) {
    bestImg = authorized.find(img => img.includes('Unique luxury crush on me extrait de parfum 100ml.png'));
  } else if (normOriginal.includes('akdeniz')) {
    bestImg = authorized.find(img => img.includes('Unique luxury AKDENIZ extrait de parfum 100ml.png'));
  } else if (normOriginal.includes('fleur de mate')) {
    bestImg = authorized.find(img => img.includes('Atelier Versace fleur de mate E.P 100ml.png'));
  } else if (normOriginal.includes('iris d elite')) {
    bestImg = authorized.find(img => img.includes('Atelier Versace iris d’élite E.P 100ml.png'));
  } else if (normOriginal.includes('dubai meydan')) {
    bestImg = authorized.find(img => img.includes('Dubai meydan E.P.png'));
  } else if (normOriginal.includes('gris charnel')) {
    bestImg = authorized.find(img => img.includes('Bdk parfum Paris gris charnel extrait de parfum 100ml.png'));
  } else if (normOriginal.includes('rosendo mateu')) {
    bestImg = authorized.find(img => img.includes('Rosendo mateu olfactive expression Barcelona E.P 100ml.png'));
  } else if (normOriginal.includes('vertus chaos')) {
    bestImg = authorized.find(img => img.includes('Vertus chaos E.P 100ml.png'));
  } else if (normOriginal.includes('erba gold')) {
    bestImg = authorized.find(img => img.includes('Xerjoff erba gold E.P 100ml.jpg'));
  } else if (normOriginal.includes('erba pura')) {
    bestImg = authorized.find(img => img.includes('Xerjoff erba pura E.P 100ml.jpg'));
  } else if (normOriginal.includes('mefisto')) {
    bestImg = authorized.find(img => img.includes('Casamorati 1888 mefisto E.P 100ml.jpg'));
  } else if (normOriginal.includes('guidance')) {
    bestImg = authorized.find(img => img.includes('Amouage guidance.jpg'));
  } else if (normOriginal.includes('lustre')) {
    bestImg = authorized.find(img => img.includes('Amouage lustre.jpg'));
  } else if (normOriginal.includes('khanjar')) {
    bestImg = authorized.find(img => img.includes('Oman luxury khanjar E.P 100ml.jpg'));
  } else if (normOriginal.includes('idole travel exclusive')) {
    bestImg = authorized.find(img => img.includes('Idole travel exclusive E.P 100ml/Idole travel exclusive E.P 100ml.png'));
  } else if (normOriginal.includes('flowers edition')) {
    bestImg = authorized.find(img => img.includes('jean paul gaultierle beau flawors édition 125ml/jean paul gaultierle beau flawors édition 125ml.jfif'));
  } else if (normOriginal.includes('paradise garden')) {
    bestImg = authorized.find(img => img.includes('jean paul gaultierle beau paradis garden Ep 125/jean paul gaultierle beau paradis garden Ep 125.jfif'));
  } else if (normOriginal.includes('le beau in blue')) {
    bestImg = authorized.find(img => img.includes('jean paul gaultierin blue Ep 125/jean paul gaultierin blue Ep 125.jfif'));
  } else if (normOriginal.includes('le beau narcisse')) {
    bestImg = authorized.find(img => img.includes('jean paul gaultierle beau narcis Ep 125/jean paul gaultierle beau narcis Ep 125.jfif'));
  } else if (normOriginal.includes('le male elixir')) {
    bestImg = authorized.find(img => img.includes('jean paul gaultierle mal élixir 125ml/jean paul gaultierle mal élixir 125ml.jfif'));
  } else if (normOriginal.includes('le male le parfum')) {
    bestImg = authorized.find(img => img.includes('jean paul gaultierle mal le parfum 125ml/jean paul gaultierle mal le parfum 125ml.jfif'));
  } else if (normOriginal.includes('scandal absolu') && p.price === 31000) {
    bestImg = authorized.find(img => img.includes('scandale absolue 150ml/jean paul gaultier scandale absolue 150ml.jfif'));
  } else if (normOriginal.includes('scandal absolu')) {
    bestImg = authorized.find(img => img.includes('scandale absolue 100mll/jean paul gaultier scandale absolue 100mll.jfif'));
  } else if (normOriginal.includes('scandal elixir')) {
    bestImg = authorized.find(img => img.includes('scandale élixir 100ml/jean paul gaultier scandale élixir 100ml.jfif'));
  } else if (normOriginal.includes('scandal intense') && p.section === 'HOMME' && p.price === 29000) {
    bestImg = authorized.find(img => img.includes('rscandale intense 150 ml/jean paul gaultie rscandale intense 150 ml.jfif'));
  } else if (normOriginal.includes('scandal intense') && p.section === 'HOMME') {
    bestImg = authorized.find(img => img.includes('scandale intense 100 ml/jean paul gaultier scandale intense 100 ml.jfif'));
  } else if (normOriginal.includes('scandal intense') && p.section === 'FEMME') {
    bestImg = authorized.find(img => img.includes('Scandal intense E.P 80ml/Scandal intense E.P 80ml.png'));
  } else if (normOriginal.includes('scandal eau de toilette') && p.section === 'HOMME') {
    bestImg = authorized.find(img => img.includes('scandale Eau Toilette 150ml/jean paul gaultier scandale Eau Toilette 150ml.jfif'));
  } else if (normOriginal.includes('dark leather')) {
    bestImg = authorized.find(img => img.includes('Spice bomb dark leaders EP 90ml/Spice bomb dark leaders EP 90ml.jpg'));
  } else if (normOriginal.includes('metallic musk')) {
    bestImg = authorized.find(img => img.includes('Spice bomb metallic musc EP 90ml/Spice bomb metallic musc EP 90ml.jpg'));
  } else if (normOriginal.includes('spicebomb extreme')) {
    bestImg = authorized.find(img => img.includes('Spice bomb extrême EP 90ml/Spice bomb extrême EP 90ml.jpg'));
  } else if (normOriginal.includes('ultra blue')) {
    bestImg = authorized.find(img => img.includes('Mb explorer ultra bleu EP 100/Mb explorer ultra bleu EP 100.png'));
  } else if (normOriginal.includes('explorer extreme')) {
    bestImg = authorized.find(img => img.includes('Mb explorer extrême P 100/Mb explorer extrême P 100.png'));
  } else if (normOriginal.includes('explorer eau de parfum')) {
    bestImg = authorized.find(img => img.includes('Moncblanc explorer EP 100/Moncblanc explorer EP 100.png'));
  } else if (normOriginal.includes('legend elixir')) {
    bestImg = authorized.find(img => img.includes('Mb legend élixir parfum 100/Mb legend élixir parfum 100.jpg'));
  } else if (normOriginal.includes('legend red')) {
    bestImg = authorized.find(img => img.includes('Mb legend red EP 100ml/Mb legend red EP 100ml.jpg'));
  } else if (normOriginal.includes('l homme ideal intense')) {
    bestImg = authorized.find(img => img.includes('L’homme idéal intense EP 100/L’homme idéal intense EP 100.jfif'));
  } else if (normOriginal.includes('habit rouge')) {
    bestImg = authorized.find(img => img.includes('Habille rouge EP 100 ml/Habille rouge EP 100 ml.jfif'));
  } else if (normOriginal.includes('epices exquises')) {
    bestImg = authorized.find(img => img.includes('Épicé exquises EP 125 ml/Épicé exquises EP 125 ml.jpg'));
  } else if (normOriginal.includes('oud essentiel')) {
    bestImg = authorized.find(img => img.includes('Oud essentiel guerlaîn EP 125/Oud essentiel guerlaîn EP 125.jpg'));
  } else if (normOriginal.includes('patchouli ardent')) {
    bestImg = authorized.find(img => img.includes('Patchouli ardent EP 125 ml/Patchouli ardent EP 125 ml.jpg'));
  } else if (normOriginal.includes('cuir intense')) {
    bestImg = authorized.find(img => img.includes('Cuir intense EP 125 ml/Cuir intense EP 125 ml.jpg'));
  } else if (normOriginal.includes('l instant de guerlain') && p.section === 'HOMME') {
    bestImg = authorized.find(img => img.includes('L’instant de guerlaîn EP 100ml/L’instant de guerlaîn EP 100ml.jfif'));
  } else if (normOriginal.includes('l instant de guerlain') && p.section === 'FEMME') {
    bestImg = authorized.find(img => img.includes('L’instant de guerlaîn E.P 75m/L’instant de guerlaîn E.P 75m.png'));
  } else if (normOriginal.includes('edition blanche')) {
    bestImg = authorized.find(img => img.includes('Édition blanche EP 150/Édition blanche EP 150.jpg')) ||
              authorized.find(img => img.includes('Édition blanche EP 100/Édition blanche EP 100.jpg'));
  } else if (normOriginal.includes('allure homme sport superleggera')) {
    bestImg = authorized.find(img => img.includes('Allure sport superleggera EP 100/Allure sport superleggera EP 100.jpg'));
  } else if (normOriginal.includes('allure homme sport eau de toilette')) {
    bestImg = authorized.find(img => img.includes('Allure sport ET 100/Allure sport ET 100.jpg'));
  } else if (normOriginal.includes('bleu de chanel exclusive parfum')) {
    bestImg = authorized.find(img => img.includes('Bleu Chanel exclusive parfum 100ml/Bleu Chanel exclusive parfum 100ml.jpg'));
  } else if (normOriginal.includes('bleu de chanel parfum') && p.price === 46000) {
    bestImg = authorized.find(img => img.includes('Bleu de Chanel parfum 150/Bleu de Chanel parfum 150.jpg'));
  } else if (normOriginal.includes('bleu de chanel parfum')) {
    bestImg = authorized.find(img => img.includes('Bleu de Chanel parfum 100/Bleu de Chanel parfum 100.jpg'));
  } else if (normOriginal.includes('bleu de chanel eau de parfum') && p.price === 42000) {
    bestImg = authorized.find(img => img.includes('Bleu de Chanel EP 150/Bleu de Chanel EP 150.jpg'));
  } else if (normOriginal.includes('bleu de chanel eau de parfum')) {
    bestImg = authorized.find(img => img.includes('Bleu de Chanel EP 100/Bleu de Chanel EP 100.jpg'));
  } else if (normOriginal.includes('dior homme cologne')) {
    bestImg = authorized.find(img => img.includes('Dior homme Cologne 200ml/Dior homme Cologne 200ml.jpg'));
  } else if (normOriginal.includes('dior homme intense') && p.price === 36000) {
    bestImg = authorized.find(img => img.includes('Dior intense EP 150/Dior intense EP 150.jpg'));
  } else if (normOriginal.includes('dior homme intense')) {
    bestImg = authorized.find(img => img.includes('Dior intense EP 100/Dior intense EP 100.jpg'));
  } else if (normOriginal.includes('dior homme parfum')) {
    bestImg = authorized.find(img => img.includes('Dior homme parfum 75ml/Dior homme parfum 75ml.jpg'));
  } else if (normOriginal.includes('sauvage eau forte')) {
    bestImg = authorized.find(img => img.includes('Dior sauvage eau forte 100ml/Dior sauvage eau forte 100ml.jpg'));
  } else if (normOriginal.includes('sauvage elixir')) {
    bestImg = authorized.find(img => img.includes('Dior sauvage élixir 60 et 100ml/Dior sauvage élixir 60 et 100ml.jpg')) ||
              authorized.find(img => img.includes('Dior Sauvage Elixir 100ml.jpg'));
  } else if (normOriginal.includes('sauvage parfum')) {
    bestImg = authorized.find(img => img.includes('Dior sauvage Parfum 100ml/Dior sauvage Parfum 100ml.jpg'));
  } else if (normOriginal.includes('sauvage eau de parfum')) {
    bestImg = authorized.find(img => img.includes('Dior sauvage eP 100ml/Dior sauvage eP 100ml.jpg'));
  } else if (normOriginal.includes('sauvage eau de toilette')) {
    bestImg = authorized.find(img => img.includes('Dior sauvage eT 100ml/Dior sauvage eT 100ml.jpg'));
  } else if (normOriginal.includes('tobacco intense')) {
    bestImg = authorized.find(img => img.includes('Monsera tobacco intense Ep 120/Monsera tobacco intense Ep 120.jpg'));
  } else if (normOriginal.includes('red tobacco')) {
    bestImg = authorized.find(img => img.includes('Monsera red tobacco Ep 120/Monsera red tobacco Ep 120.jpg'));
  } else if (normOriginal.includes('kenzo homme indigo')) {
    bestImg = authorized.find(img => img.includes('Kenzo homme indigo EP 110 ml/Kenzo homme indigo EP 110 ml.jpg'));
  } else if (normOriginal.includes('kenzo homme eau de parfum')) {
    bestImg = authorized.find(img => img.includes('Kenzo homme EP 110/Kenzo homme EP 110.jpg'));
  } else if (normOriginal.includes('kenzo homme eau de toilette')) {
    bestImg = authorized.find(img => img.includes('Kenzo homme ET 110 ml/Kenzo homme ET 110 ml.jpg'));
  } else if (normOriginal.includes('ck one')) {
    bestImg = authorized.find(img => img.includes('CK one ET 200ml/CK one ET 200ml.jpg'));
  } else if (normOriginal.includes('212 mtv')) {
    bestImg = authorized.find(img => img.includes('212 mtv ET 100ml/212 mtv ET 100ml.jpg'));
  } else if (normOriginal.includes('chic men')) {
    bestImg = authorized.find(img => img.includes('Chic men carolina Herrera ET 100/Chic men carolina Herrera ET 100.jfif'));
  } else if (normOriginal.includes('carolina herrera 212')) {
    bestImg = authorized.find(img => img.includes('212 ET 100ml/212 ET 100ml.jpg'));
  } else if (normOriginal.includes('paradigme')) {
    bestImg = authorized.find(img => img.includes('Prada paradigme Ep 100ml/Prada paradigme Ep 100ml.jfif'));
  } else if (normOriginal.includes('toy boy')) {
    bestImg = authorized.find(img => img.includes('Moschino top boy Eparfum 100ml/Moschino top boy Eparfum 100ml.jfif'));
  } else if (normOriginal.includes('one million oud dahabi')) {
    bestImg = authorized.find(img => img.includes('One million oud dahabi parfum 100/One million oud dahabi parfum 100.jpg'));
  } else if (normOriginal.includes('one million royal')) {
    bestImg = authorized.find(img => img.includes('One million royal Parfum100/One million royal Parfum100.jpg'));
  } else if (normOriginal.includes('one million elixir')) {
    bestImg = authorized.find(img => img.includes('One million élixir parfum intense 200ml/One million élixir parfum intense 200ml.jfif'));
  } else if (normOriginal.includes('one million parfum') && p.price === 28500) {
    bestImg = authorized.find(img => img.includes('One million parfum 200ml/One million parfum 200ml.jfif'));
  } else if (normOriginal.includes('one million parfum')) {
    bestImg = authorized.find(img => img.includes('One million parfum 100ml/One million parfum 100ml.jfif'));
  } else if (normOriginal.includes('one million eau de toilette')) {
    bestImg = authorized.find(img => img.includes('One million ET 200ml/One million ET 200ml.jfif'));
  } else if (normOriginal.includes('lacoste l 12 12 rose') || normOriginal.includes('rose eau intense')) {
    bestImg = authorized.find(img => img.includes('Lacoste rose eau intense 100/Lacoste rose eau intense 100.jfif'));
  } else if (normOriginal.includes('lacoste blanc intense')) {
    bestImg = authorized.find(img => img.includes('Lacoste blanc intense 100/Lacoste blanc intense 100.jfif'));
  } else if (normOriginal.includes('lacoste booster')) {
    bestImg = authorized.find(img => img.includes('Lacoste booster ET 125/Lacoste booster ET 125.jfif')) ||
              authorized.find(img => img.includes('Lacoste Booster.jpg'));
  } else if (normOriginal.includes('lacoste blanc eau de parfum')) {
    bestImg = authorized.find(img => img.includes('Lacoste blanc eP 100ml/Lacoste blanc eP 100ml.jfif'));
  } else if (normOriginal.includes('lacoste blanc eau de toilette')) {
    bestImg = authorized.find(img => img.includes('Lacoste blanc ET 100/Lacoste blanc ET 100.jfif'));
  } else if (normOriginal.includes('lacoste silver grey')) {
    bestImg = authorized.find(img => img.includes('Lacoste silver grey EP 100 ml/Lacoste silver grey EP 100 ml.jpg'));
  } else if (normOriginal.includes('lacoste original aqua')) {
    bestImg = authorized.find(img => img.includes('Lacoste original aqua EP 100ml/Lacoste original aqua EP 100ml.jfif'));
  } else if (normOriginal.includes('lacoste original')) {
    bestImg = authorized.find(img => img.includes('Lacoste original EP 100 pl/Lacoste original EP 100 pl.jfif'));
  } else if (normOriginal.includes('bottled night')) {
    bestImg = authorized.find(img => img.includes('Boss bootled night ET 100ml/Boss bootled night ET 100ml.jfif'));
  } else if (normOriginal.includes('bottled unlimited')) {
    bestImg = authorized.find(img => img.includes('Boss bootled un limited ET 100/Boss bootled un limited ET 100.jfif'));
  } else if (normOriginal.includes('bottled absolu')) {
    bestImg = authorized.find(img => img.includes('Boss boutled absolu parfum intense 100ml/Boss boutled absolu parfum intense 100ml.jpg'));
  } else if (normOriginal.includes('triumph elixir')) {
    bestImg = authorized.find(img => img.includes('Boss bottled triumph élixir parfum intense 100/Boss bottled triumph élixir parfum intense 100.jpg'));
  } else if (normOriginal.includes('boss man eau de toilette')) {
    bestImg = authorized.find(img => img.includes('Boss man ET 100ml/Boss man ET 100ml.jfif'));
  } else if (normOriginal.includes('hugo man extreme')) {
    bestImg = authorized.find(img => img.includes('Hugo man extrême EP 75ml/Hugo man extrême EP 75ml.jfif'));
  } else if (normOriginal.includes('hugo just different')) {
    bestImg = authorized.find(img => img.includes('Hugo just différente ET 75ml/Hugo just différente ET 75ml.jfif'));
  } else if (normOriginal.includes('hugo energise')) {
    bestImg = authorized.find(img => img.includes('Hugo énergise ET 75ml/Hugo énergise ET 75ml.jpg'));
  } else if (normOriginal.includes('hugo dark blue')) {
    bestImg = authorized.find(img => img.includes('Hugo dark blue ET 75ml/Hugo dark blue ET 75ml.jpg'));
  } else if (normOriginal.includes('hugo man eau de toilette') && p.price === 17000) {
    bestImg = authorized.find(img => img.includes('Hugo man ET 200ml/Hugo man ET 200ml.jfif'));
  } else if (normOriginal.includes('hugo man eau de toilette')) {
    bestImg = authorized.find(img => img.includes('Hugo man ET 100ml/Hugo man ET 100ml.jfif'));
  } else if (normOriginal.includes('burberry hero eau de parfum') && p.price === 24000) {
    bestImg = authorized.find(img => img.includes('Burberry hero EP 150ml/Burberry hero EP 150ml.jfif'));
  } else if (normOriginal.includes('burberry hero eau de parfum')) {
    bestImg = authorized.find(img => img.includes('Burberry hero EP 100ml/Burberry hero EP 100ml.jfif'));
  } else if (normOriginal.includes('burberry hero eau de toilette') && p.price === 19800) {
    bestImg = authorized.find(img => img.includes('Burberry hero ET 150/Burberry hero ET 150.jfif'));
  } else if (normOriginal.includes('burberry hero eau de toilette')) {
    bestImg = authorized.find(img => img.includes('Burberry hero ET 100/Burberry hero ET 100.jfif'));
  } else if (normOriginal.includes('azzaro chrome')) {
    bestImg = authorized.find(img => img.includes('Azzaro chrome ET 100ml/Azzaro chrome ET 100ml.jfif'));
  } else if (normOriginal.includes('cerruti 1881') && p.section === 'HOMME') {
    bestImg = authorized.find(img => img.includes('Cerruti 1881 home ET 100/Cerruti 1881 home ET 100.jfif'));
  } else if (normOriginal.includes('cerruti 1881') && p.section === 'FEMME') {
    bestImg = authorized.find(img => img.includes('1881 cerruti E.T pour femme 100ml/1881 cerruti E.T pour femme 100ml.png')) ||
              authorized.find(img => img.includes('1881 cerruti E.T pour femme 100ml.png'));
  } else if (normOriginal.includes('boucheron singulier')) {
    bestImg = authorized.find(img => img.includes('Boucheron singulier 100/Boucheron singulier 100.png'));
  } else if (normOriginal.includes('oud noir')) {
    bestImg = authorized.find(img => img.includes('Versace oud noir ep 100/Versace oud noir ep 100.png'));
  } else if (normOriginal.includes('versace eros parfum')) {
    bestImg = authorized.find(img => img.includes('Versace eros P 100/Versace eros P 100.png'));
  } else if (normOriginal.includes('versace eros eau de parfum')) {
    bestImg = authorized.find(img => img.includes('Versace heros ep 200/Versace heros ep 200.png'));
  } else if (normOriginal.includes('myslf le parfum')) {
    bestImg = authorized.find(img => img.includes('My self le parfum 100/My self le parfum 100.png')) ||
              authorized.find(img => img.includes('Yves Saint Laurent MYSLF Le Parfum.jpg'));
  } else if (normOriginal.includes('myslf eau de parfum')) {
    bestImg = authorized.find(img => img.includes('My self ep 100/My self ep 100.jfif')) ||
              authorized.find(img => img.includes('Yves Saint Laurent MYSLF Eau de Parfum.jpg'));
  } else if (normOriginal.includes('la nuit de l homme le parfum')) {
    bestImg = authorized.find(img => img.includes('La nuit de l’homme le parfum/La nuit de l’homme le parfum.jfif'));
  } else if (normOriginal.includes('la nuit de l homme eau de parfum')) {
    bestImg = authorized.find(img => img.includes('La nuit de l’homme ep/La nuit de l’homme ep.jfif')) ||
              authorized.find(img => img.includes('Yves Saint Laurent La Nuit de L\'Homme Eau de Parfum.jpg'));
  } else if (normOriginal.includes('gentleman reserve privee')) {
    if (p.price === 29800) {
      bestImg = authorized.find(img => img.includes('Givenchy gentleman réserve privé 200ml/Givenchy gentleman réserve privé 200ml.jfif'));
    } else {
      bestImg = authorized.find(img => img.includes('Givenchy gentleman réservé privée EP100/Givenchy gentleman réservé privée EP100.jfif'));
    }
  } else if (normOriginal.includes('gentleman society extreme')) {
    bestImg = authorized.find(img => img.includes('Givenchy gentleman society extreme  Ep 100/Givenchy gentleman society extreme  Ep 100.jfif'));
  } else if (normOriginal.includes('gentleman society ambree')) {
    bestImg = authorized.find(img => img.includes('Givenchy sociéty ambre EP100/Givenchy sociéty ambre EP100.jfif'));
  } else if (normOriginal.includes('gentleman society eau de parfum')) {
    bestImg = authorized.find(img => img.includes('Givenchy society EP 200/Givenchy society EP 200.jfif'));
  } else if (normOriginal.includes('gentleman eau de parfum boisee')) {
    bestImg = authorized.find(img => img.includes('Givenchy gentleman EP boisé 100/Givenchy gentleman EP boisé 100.jfif'));
  } else if (normOriginal.includes('gentleman eau de parfum')) {
    bestImg = authorized.find(img => img.includes('Givenchy gentleman EP 100/Givenchy gentleman EP 100.jfif'));
  } else if (normOriginal.includes('gentleman eau de toilette')) {
    bestImg = authorized.find(img => img.includes('Givenchy pour homme ET 100/Givenchy pour homme ET 100.jfif')) ||
              authorized.find(img => img.includes('Givenchy gentleman EP 100/Givenchy gentleman EP 100.jfif'));
  } else if (normOriginal.includes('stronger with you absolutely')) {
    bestImg = authorized.find(img => img.includes('You absolutly Ep100/You absolutly Ep100.jfif'));
  } else if (normOriginal.includes('stronger with you intensely')) {
    bestImg = authorized.find(img => img.includes('You intensly Ep 100/You intensly Ep 100.jfif'));
  } else if (normOriginal.includes('stronger with you parfum')) {
    bestImg = authorized.find(img => img.includes('You parfum 100/You parfum 100.jfif'));
  } else if (normOriginal.includes('stronger with you powerfully')) {
    bestImg = authorized.find(img => img.includes('You powerfully Ep 100/You powerfully Ep 100.jfif'));
  } else if (normOriginal.includes('acqua di gio')) {
    bestImg = authorized.find(img => img.includes('Acqua di gio EDP/Acqua di gio EDP.jfif')) ||
              authorized.find(img => img.includes('Giorgio Armani Acqua Di Giò Eau de Parfum.webp'));
  } else if (normOriginal.includes('gucci oud intense')) {
    bestImg = authorized.find(img => img.includes('Gucci oud intense EP 100/Gucci oud intense EP 100.jfif'));
  } else if (normOriginal.includes('terre d hermes') || normOriginal.includes('terre dhermes')) {
    bestImg = authorized.find(img => img.includes('Terre dhermes Ep intense 100/Terre dhermes Ep intense 100.jfif'));
  } else if (normOriginal.includes('y le parfum')) {
    bestImg = authorized.find(img => img.includes('Yves saint Laurent Y le p 100.jfif'));
  } else if (normOriginal.includes('invictus victory absolu')) {
    bestImg = authorized.find(img => img.includes('Invectus Victory absolue pi  100/Invectus Victory absolue pi  100.png'));
  } else if (normOriginal.includes('invictus victory elixir')) {
    bestImg = authorized.find(img => img.includes('Invictus victory élixir pi 100/Invictus victory élixir pi 100.png'));
  } else if (normOriginal.includes('invictus elixir')) {
    bestImg = authorized.find(img => img.includes('Invictus élixir ep 100/Invictus élixir ep 100.png'));
  } else if (normOriginal.includes('hermes h24 herbes vives')) {
    bestImg = authorized.find(img => img.includes('Hermès h24 herbes vives 100/Hermès h24 herbes vives 100.png'));
  } else if (normOriginal.includes('hermes h24 eau de parfum')) {
    bestImg = authorized.find(img => img.includes('Hermès h24 ep 100/Hermès h24 ep 100.png'));
  } else if (normOriginal.includes('hermes h24 eau de toilette')) {
    bestImg = authorized.find(img => img.includes('Hermès h24 eT100/Hermès h24 eT100.png'));
  } else if (normOriginal.includes('born in roma extra dose')) {
    bestImg = authorized.find(img => img.includes('Valentina umo born in Roma extra dose/Valentina umo born in Roma extra dose.png'));
  } else if (normOriginal.includes('cartier declaration parfum')) {
    bestImg = authorized.find(img => img.includes('cartier déclaration parfum 100/cartier déclaration parfum 100.png'));
  } else if (normOriginal.includes('cartier declaration eau de parfum')) {
    bestImg = authorized.find(img => img.includes('Cartier déclaration ep 100/Cartier déclaration ep 100.png'));
  } else if (normOriginal.includes('wanted forever elixir') || normOriginal.includes('wanted for ever')) {
    bestImg = authorized.find(img => img.includes('Azzaro wanted for ever élixir 100/Azzaro wanted for ever élixir 100.png'));
  } else if (normOriginal.includes('wanted by night')) {
    bestImg = authorized.find(img => img.includes('Azzaro wanted bu night ep 100/Azzaro wanted by night ep 100.png'));
  } else if (normOriginal.includes('the most wanted parfum')) {
    bestImg = authorized.find(img => img.includes('Azzaro the most wanted parfum 100/Azzaro the most wanted parfum 100.png'));
  } else if (normOriginal.includes('the most wanted eau de parfum intense')) {
    bestImg = authorized.find(img => img.includes('Azzaro the  most wanted  epi 100/Azzaro the  most wanted  epi 100.png'));
  } else if (normOriginal.includes('devotion parfum') && p.section === 'HOMME') {
    bestImg = authorized.find(img => img.includes('DG devotion parfum 100/DG devotion parfum 100.png'));
  } else if (normOriginal.includes('devotion eau de parfum') && p.section === 'HOMME') {
    bestImg = authorized.find(img => img.includes('DG dévotion ep 100/DG dévotion ep 100.png'));
  } else if (normOriginal.includes('devotion eau de parfum') && p.section === 'FEMME') {
    bestImg = authorized.find(img => img.includes('Devotion Dolce&Gabbana pour femme/Devotion Dolce&Gabbana pour femme.png')) ||
              authorized.find(img => img.includes('Devotion Dolce&Gabbana pour femme.png'));
  } else if (normOriginal.includes('the one le parfum')) {
    bestImg = authorized.find(img => img.includes('DG the one le parfum 100/DG the one le parfum 100.png'));
  } else if (normOriginal.includes('the one eau de parfum intense')) {
    bestImg = authorized.find(img => img.includes('DG thé one ep intense 100/DG thé one ep intense 100.png')) ||
              authorized.find(img => img.includes('Dolce & Gabbana The One Eau de Parfum Intense.jpg'));
  } else if (normOriginal.includes('the one eau de parfum') && p.price === 25000) {
    bestImg = authorized.find(img => img.includes('DG the one EP 150ml/DG the one EP 150ml.jpg'));
  } else if (normOriginal.includes('the one eau de parfum')) {
    bestImg = authorized.find(img => img.includes('DG the one ep 100ml/DG the one ep 100ml.png'));
  } else if (normOriginal.includes('intenso eau de parfum')) {
    bestImg = authorized.find(img => img.includes('DG intenso ep 125ml/DG intenso ep 125ml.png'));
  } else if (normOriginal.includes('king eau de parfum intense')) {
    bestImg = authorized.find(img => img.includes('DG King epi 100ml/DG King epi 100ml.png'));
  } else if (normOriginal.includes('king parfum')) {
    bestImg = authorized.find(img => img.includes('DG King parfum 100ml/DG King parfum 100ml.png'));
  } else if (normOriginal.includes('king eau de parfum')) {
    bestImg = authorized.find(img => img.includes('DG King ep 100ml/DG King ep 100ml.png')) ||
              authorized.find(img => img.includes('Dolce & Gabbana K (King) 200ml Eau de Parfum.jpg'));
  } else if (normOriginal.includes('pure musc')) {
    bestImg = authorized.find(img => img.includes('Pure musc narciso rodriguez for her eau de parfum 100ml/Pure musc narciso rodriguez for her eau de parfum 100ml.png'));
  } else if (normOriginal.includes('hugo woman')) {
    bestImg = authorized.find(img => img.includes('XHugoX woman E.T 100ml/XHugoX woman E.T 100ml.png'));
  } else if (normOriginal.includes('si eau de parfum intense')) {
    bestImg = authorized.find(img => img.includes('Armani SI eau de parfum intense 100ml/Armani SI eau de parfum intense 100ml.png')) ||
              authorized.find(img => img.includes('Armani SI eau de parfum intense 100ml.png'));
  } else if (normOriginal.includes('si passione')) {
    bestImg = authorized.find(img => img.includes('Armani Si passionné E.P 100ml.png')) ||
              authorized.find(img => img.includes('Armani Si passionné E.P 100ml/Armani Si passionné E.P 100ml.png'));
  } else if (normOriginal.includes('miss dior parfum')) {
    bestImg = authorized.find(img => img.includes('Miss Dior parfum 50 ml/miss dior.png'));
  } else if (normOriginal.includes('ange ou demon')) {
    bestImg = authorized.find(img => img.includes('Ange ou démon le secret E.P 100ml.png')) ||
              authorized.find(img => img.includes('Ange ou démon le secret E.P 100ml/Ange ou démon le secret E.P 100ml.png'));
  } else if (normOriginal.includes('l imperatrice')) {
    bestImg = authorized.find(img => img.includes('L’impératrice D.G E.T 100ml/L’impératrice D.G E.T 100ml.png'));
  } else if (normOriginal.includes('peach n roses')) {
    bestImg = authorized.find(img => img.includes('idole peach n roses E.P fruité 100ml.png')) ||
              authorized.find(img => img.includes('idole peach n roses E.P fruité 100ml/idole peach n roses E.P fruité 100ml.png'));
  } else if (normOriginal.includes('narciso rodriguez poudree')) {
    bestImg = authorized.find(img => img.includes('Narciso poudrée E.P 90ml/Narciso poudrée E.P 90ml.png'));
  } else if (normOriginal.includes('fame in love')) {
    bestImg = authorized.find(img => img.includes('Fame In Love Paco Rabanne/Fame In Love Paco Rabanne.png'));
  } else if (normOriginal.includes('j adore intense')) {
    bestImg = authorized.find(img => img.includes('J’adore intense parfum 100ml/J’adore intense parfum 100ml.png')) ||
              authorized.find(img => img.includes('J’adore intense parfum 100ml.png'));
  } else if (normOriginal.includes('j adore l or')) {
    bestImg = authorized.find(img => img.includes('J’adore l’or Essence de parfum Dior 50ml/J_adore l_or Essence de parfum Dior 50ml.png'));
  } else if (normOriginal.includes('love story')) {
    bestImg = authorized.find(img => img.includes('Love story Chloé E.P 75ml/Love story Chloé E.P 75ml.png'));
  } else if (normOriginal.includes('l interdit rouge ultime')) {
    bestImg = authorized.find(img => img.includes('L_Interdit Rouge Ultime Givenchy/L_Interdit Rouge Ultime Givenchy.png'));
  } else if (normOriginal.includes('l interdit rouge')) {
    bestImg = authorized.find(img => img.includes('L_Interdit Eau de Parfum Rouge Givenchy/L_Interdit Eau de Parfum Rouge Givenchy.png'));
  } else if (normOriginal.includes('l interdit parfum 80 ml')) {
    bestImg = authorized.find(img => img.includes('L_Interdit Eau de Parfum Givenchy pour femme/L’interdit parfum givenchy 80ml.png'));
  } else if (normOriginal.includes('l interdit')) {
    bestImg = authorized.find(img => img.includes('Interdit givenchy E.P 125ml/Interdit givenchy E.D.P 125ml.png'));
  } else if (normOriginal.includes('narciso rodriguez for her')) {
    bestImg = authorized.find(img => img.includes('Narciso Rodriguez for her E.D.P 100ml/Narciso Rodriguez for her E.D.P 100ml.png'));
  } else if (normOriginal.includes('daisy')) {
    bestImg = authorized.find(img => img.includes('Daisy Marc Jacob E.T 100ml.png')) ||
              authorized.find(img => img.includes('Daisy Marc Jacob E.T 100ml/Daisy Marc Jacob E.T 100ml.png'));
  } else if (normOriginal.includes('gorgeous gardenia')) {
    bestImg = authorized.find(img => img.includes('Gucci Flora georgeous gardénia E.P 50ml/Gucci Flora georgeous gardénia E.P 50ml.png'));
  } else if (normOriginal.includes('bloom eau de parfum intense')) {
    bestImg = authorized.find(img => img.includes('Gucci bloom E.P intense 50ml/Gucci bloom E.P intense 50ml.png'));
  } else if (normOriginal.includes('bloom eau de parfum')) {
    bestImg = authorized.find(img => img.includes('Gucci Bloom E.P 100ml/Gucci Bloom E.P1000ml.png'));
  } else if (normOriginal.includes('bloom eau de toilette')) {
    bestImg = authorized.find(img => img.includes('gucci bloom rose/gucci bloom rose.png'));
  } else if (normOriginal.includes('gucci bloom ambrosia')) {
    bestImg = authorized.find(img => img.includes('gucci bloom ambrosia/gucci bloom ambrosia.png'));
  } else if (normOriginal.includes('bamboo')) {
    bestImg = authorized.find(img => img.includes('Gucci bamboo E.P 50 ml/Gucci bamboo E.P 50 ml.png'));
  } else if (normOriginal.includes('boss femme')) {
    bestImg = authorized.find(img => img.includes('Boss femme E.P 75ml.png')) ||
              authorized.find(img => img.includes('Boss femme E.P 75ml/Boss femme E.P 75ml.png'));
  } else if (normOriginal.includes('boss ma vie')) {
    bestImg = authorized.find(img => img.includes('Boss ma vie E.P 75ml.png')) ||
              authorized.find(img => img.includes('Boss ma vie E.P 75ml/Boss ma vie E.P 75ml.png'));
  } else if (normOriginal.includes('bright crystal absolu')) {
    bestImg = authorized.find(img => img.includes('Versace bright Crystal absolu pour femme E.D.P 90ml/Gemini_Generated_Image_mk0b3mmk0b3mmk0b.jfif'));
  } else if (normOriginal.includes('crystal noir')) {
    bestImg = authorized.find(img => img.includes('Versace Crystal noir pour femme E.P 90ml/Versace Crystal noir pour femme E.P 90ml.png'));
  } else if (normOriginal.includes('paradiso')) {
    bestImg = authorized.find(img => img.includes('Roberto cavailli paradise E.P 75ml/Gemini_Generated_Image_7fy6oq7fy6oq7fy6.jfif'));
  } else if (normOriginal.includes('florence')) {
    bestImg = authorized.find(img => img.includes('Roberto carralie Florence E.P 75ml/Roberto carralie Florence E.P 75ml.png')) ||
              authorized.find(img => img.includes('Roberto carralie Florence E.P 75ml/Gemini_Generated_Image_z4108qz4108qz410.jfif'));
  } else if (normOriginal.includes('le parfum royal')) {
    bestImg = authorized.find(img => img.includes('Elie saab le parfum royal E.P 90ml/Elie saab le parfum royal E.P 90ml.jfif'));
  } else if (normOriginal.includes('le parfum essentiel')) {
    bestImg = authorized.find(img => img.includes('elie saab le parfum essentiel eau de parfum 90ml/Gemini_Generated_Image_sab92dsab92dsab9.jfif'));
  } else if (normOriginal.includes('girl of now')) {
    bestImg = authorized.find(img => img.includes('Girl of new elie saab E.P 90ml fond blanc/Girl of new elie saab E.P 90ml fond blanc.png'));
  } else if (normOriginal.includes('elie saab eau de parfum')) {
    bestImg = authorized.find(img => img.includes('Le Parfum Elie Saab/Le Parfum Elie Saab.png'));
  } else if (normOriginal.includes('donna born in roma intense')) {
    bestImg = authorized.find(img => img.includes('Valentino donna born in Roma intense E.D.P intense 100ml.png'));
  } else if (normOriginal.includes('donna born in roma')) {
    bestImg = authorized.find(img => img.includes('Valentino donna born in Roma E.D.P 100ml/Valentino donna born in Roma E.D.P 100ml.png'));
  } else if (normOriginal.includes('chloe nomade')) {
    bestImg = authorized.find(img => img.includes('Nomade Chloé E.P 50 ml/Nomade Chloé E.P 50 ml.jfif'));
  } else if (normOriginal.includes('chloe rose naturelle')) {
    bestImg = authorized.find(img => img.includes('Chloé rose naturelle E.P 50ml/Gemini_Generated_Image_8knq28knq28knq28.jfif'));
  } else if (normOriginal.includes('chloe rose tangerine')) {
    bestImg = authorized.find(img => img.includes('Chloé rose tangerine Eae de Toilette 75ml.png')) ||
              authorized.find(img => img.includes('Chloé rose tangerine Eae de Toilette 75ml/Chloé rose tangerine Eae de Toilette 75ml.png'));
  } else if (normOriginal.includes('la belle')) {
    bestImg = authorized.find(img => img.includes('La belle Edp 100ml/La belle Edp 100ml.png'));
  } else if (normOriginal.includes('divine couture')) {
    bestImg = authorized.find(img => img.includes('Gaultier divine couture E.P 100ml.png')) ||
              authorized.find(img => img.includes('Gaultier divine couture E.P 100ml/Gaultier divine couture E.P 100ml.png'));
  } else if (normOriginal.includes('irresistible nude velvet')) {
    bestImg = authorized.find(img => img.includes('Irresistible nude velvet 80ml/Irresistible nude velvet 80ml.png'));
  } else if (normOriginal.includes('irresistible nectar')) {
    bestImg = authorized.find(img => img.includes('Irrésistible nectar E.P 80ml/Irrésistible nectar E.P 80ml.png'));
  } else if (normOriginal.includes('irresistible rose velvet')) {
    bestImg = authorized.find(img => img.includes('Irrésistible givenchy E.P rose velvet 80ml/Irrésistible givenchy E.P rose velvet 80ml.png'));
  } else if (normOriginal.includes('premier jour')) {
    bestImg = authorized.find(img => img.includes('nina ricci premier jour eau de parfum 100ml/nina ricci premier jour eau de parfum 100ml.png'));
  } else if (normOriginal.includes('mon guerlain')) {
    bestImg = authorized.find(img => img.includes('Mon guerlaîn 100m/Mon guerlaîn 100m.png'));
  } else if (normOriginal.includes('eclat d arpege')) {
    bestImg = authorized.find(img => img.includes('Eclat d’arpège lanvin E.P 100ml femme.png')) ||
              authorized.find(img => img.includes('Eclat d’arpège lanvin E.P 100ml femme/Eclat d’arpège lanvin E.P 100ml femme.png'));
  } else if (normOriginal.includes('dark cherry')) {
    bestImg = authorized.find(img => img.includes('D.G dark cherry héliotrope Amber E.P intense 100ml.png')) ||
              authorized.find(img => img.includes('D.G dark cherry héliotrope Amber E.P intense 100ml/D.G dark cherry héliotrope Amber E.P intense 100ml.png'));
  } else if (normOriginal.includes('candied cherry')) {
    bestImg = authorized.find(img => img.includes('D.G candied cherry Jasmine vanille parfum 100ml.png')) ||
              authorized.find(img => img.includes('D.G candied cherry Jasmine vanille parfum 100ml/D.G candied cherry Jasmine vanille parfum 100ml.png'));
  } else if (normOriginal.includes('alien')) {
    bestImg = authorized.find(img => img.includes('Alien mugler E.P 90ml.png')) ||
              authorized.find(img => img.includes('Alien mugler E.P 90ml/Alien mugler E.P 90ml.png'));
  } else if (normOriginal.includes('private accord')) {
    bestImg = authorized.find(img => img.includes('The scent private accord boss E.P 100ml/The scent private accord boss E.P 100ml.png'));
  } else if (normOriginal.includes('signature eau de parfum')) {
    bestImg = authorized.find(img => img.includes('Signature montblanc E.P 90ml/Signature montblanc E.P 90ml.png'));
  } else if (normOriginal.includes('my burberry blush')) {
    bestImg = authorized.find(img => img.includes('Burberry blush.png')) ||
              authorized.find(img => img.includes('Burberry blush/burberry blush.png'));
  } else if (normOriginal.includes('jour d hermes')) {
    bestImg = authorized.find(img => img.includes('Jour d’Hermes absolu E.P 85ml/Jour d’Hermes absolu E.P 85ml.png'));
  } else if (normOriginal.includes('my burberry black parfum')) {
    bestImg = authorized.find(img => img.includes('my burberry black parfum 90ml/my burberry black parfum 90ml.png')) ||
              authorized.find(img => img.includes('My burberry black parfum 50ml/My burberry black parfum 50ml.png'));
  } else if (normOriginal.includes('my burberry black eau de parfum')) {
    bestImg = authorized.find(img => img.includes('burberry my burberry black eau de parfum 90ml spray/Copy of Editing Images_Gemini 3.1 Flash (Nano Banana 2)_2026-09-06_13-20-30.png'));
  } else if (normOriginal.includes('fame intense')) {
    bestImg = authorized.find(img => img.includes('Fame intense rabanne E.P intense 80ml.png')) ||
              authorized.find(img => img.includes('Fame intense rabanne E.P intense 80ml/Fame intense rabanne E.P intense 80ml.png'));
  } else if (normOriginal.includes('mademoiselle rochas')) {
    bestImg = authorized.find(img => img.includes('Mademoiselle rocha E.P 90ml/Mademoiselle rocha E.P 90ml.png')) ||
              authorized.find(img => img.includes('mademoiselle-rochas-in-paris.jpg'));
  } else if (normOriginal.includes('rochas audace')) {
    bestImg = authorized.find(img => img.includes('Rochas audace E.P 90ml/Rochas audace E.P 90ml.png'));
  }

  if (bestImg) {
    matches.push({
      perfume: p,
      imagePath: bestImg,
      publicUrl: '/' + bestImg.replace(/\\/g, '/'),
    });
  } else {
    missing.push({
      perfume: p,
      reason: 'Aucun visuel correspondant dans les dossiers autorisés'
    });
  }
}

console.log('Total matched:', matches.length);
console.log('Total missing images:', missing.length);
fs.writeFileSync('scripts/perfect-matches.json', JSON.stringify(matches, null, 2));
fs.writeFileSync('scripts/perfect-missing.json', JSON.stringify(missing, null, 2));
