import { describe, expect, it } from 'vitest';

import { damerauLevenshtein, matchToken } from './distance';
import { searchProducts, type SearchProductLike } from './engine';
import { collapseSpaces, normalizeText, tokenize, transliterateArabic } from './normalizer';
import { fragrancePhonetic } from './phonetics';

const mockCatalog: SearchProductLike[] = [
  {
    slug: 'christian-dior-dior-sauvage-eau-de-parfum',
    name: 'Dior Sauvage Eau de Parfum',
    brand: { name: 'Christian Dior' },
    gender: 'homme',
    family: 'fresh',
    olfactoryFamilies: ['fresh', 'woody'],
    concentration: 'Eau de Parfum',
    notesAll: ['Bergamote de Calabre', 'Poivre du Sichuan', 'Ambroxan', 'Vanille'],
    description: 'Une fraîcheur puissante et noble.'
  },
  {
    slug: 'givenchy-irresistible',
    name: 'Givenchy Irrésistible',
    brand: { name: 'Givenchy' },
    gender: 'femme',
    family: 'floral',
    olfactoryFamilies: ['floral', 'woody'],
    concentration: 'Eau de Parfum',
    notesAll: ['Rose Essentielle', 'Iris', 'Bois de Cèdre'],
    description: 'Un parfum floral boisé fruité plein de charme.'
  },
  {
    slug: 'bleu-de-chanel-parfum',
    name: 'Bleu de Chanel Parfum 150ml',
    brand: { name: 'Chanel' },
    gender: 'homme',
    family: 'woody',
    olfactoryFamilies: ['woody', 'fresh'],
    concentration: 'Parfum',
    notesAll: ['Zeste de Citron', 'Bois de Santal', 'Cèdre'],
    description: 'L’éloge de la liberté au masculin.'
  },
  {
    slug: 'paco-rabanne-one-million-elixir',
    name: 'Paco Rabanne One Million Elixir 200ml',
    brand: { name: 'Paco Rabanne' },
    gender: 'homme',
    family: 'amber',
    olfactoryFamilies: ['amber', 'gourmand'],
    concentration: 'Elixir',
    notesAll: ['Pomme', 'Davana', 'Rose Damascena', 'Vanille', 'Fève Tonka'],
    description: 'Le summum de l’intensité One Million.'
  },
  {
    slug: 'yves-saint-laurent-myslf',
    name: 'Yves Saint Laurent MYSLF Le Parfum',
    brand: { name: 'Yves Saint Laurent' },
    gender: 'homme',
    family: 'woody',
    olfactoryFamilies: ['woody', 'floral'],
    concentration: 'Le Parfum',
    notesAll: ['Bergamote', 'Fleur d’Oranger', 'Bois Chauds', 'Patchouli'],
    description: 'L’affirmation de l’homme moderne.'
  },
  {
    slug: 'jean-paul-gaultier-le-male-elixir',
    name: 'Jean Paul Gaultier Le Male Elixir',
    brand: { name: 'Jean Paul Gaultier' },
    gender: 'homme',
    family: 'amber',
    olfactoryFamilies: ['amber', 'gourmand'],
    concentration: 'Elixir',
    notesAll: ['Lavande', 'Menthe', 'Benjoin', 'Vanille'],
    description: 'Un sillage ardent et sensuel.'
  },
  {
    slug: 'prada-paradoxe',
    name: 'Prada Paradoxe',
    brand: { name: 'Prada' },
    gender: 'femme',
    family: 'floral',
    olfactoryFamilies: ['floral', 'amber'],
    concentration: 'Eau de Parfum',
    notesAll: ['Néroli', 'Ambrofix', 'Musc Blanc'],
    description: 'Une célébration de l’expression féminine.'
  },
  {
    slug: 'versace-eros-flame',
    name: 'Versace Eros Flame',
    brand: { name: 'Versace' },
    gender: 'homme',
    family: 'spicy',
    olfactoryFamilies: ['spicy', 'woody'],
    concentration: 'Eau de Parfum',
    notesAll: ['Mandarine', 'Poivre Noir', 'Romarin', 'Bois de Cèdre'],
    description: 'Une fragrance pour un homme fort et passionné.'
  },
  {
    slug: 'guerlain-mon-guerlain',
    name: 'Guerlain Mon Guerlain',
    brand: { name: 'Guerlain' },
    gender: 'femme',
    family: 'amber',
    olfactoryFamilies: ['amber', 'floral'],
    concentration: 'Eau de Parfum',
    notesAll: ['Lavande Carla', 'Jasmin Sambac', 'Santal', 'Vanille'],
    description: 'Un hommage à la féminité contemporaine.'
  },
  {
    slug: 'dolce-gabbana-l-imperatrice',
    name: 'Dolce & Gabbana L’Impératrice',
    brand: { name: 'Dolce & Gabbana' },
    gender: 'femme',
    family: 'fresh',
    olfactoryFamilies: ['fresh', 'floral'],
    concentration: 'Eau de Toilette',
    notesAll: ['Kiwi', 'Rhubarbe', 'Pastèque', 'Cyclamen', 'Bois de Santal'],
    description: 'Une personnalité vibrante et magnétique.'
  },
  {
    slug: 'amouage-interlude-man',
    name: 'Amouage Interlude Man',
    brand: { name: 'Amouage' },
    gender: 'homme',
    family: 'spicy',
    olfactoryFamilies: ['spicy', 'woody', 'amber'],
    concentration: 'Eau de Parfum',
    notesAll: ['Origan', 'Bergamote', 'Encens', 'Oud', 'Cuir'],
    description: 'Un cœur de chaos et de calme épicé et boisé.'
  }
];

describe('1. Normalisation & Tokenisation', () => {
  it('supprime les accents et met en minuscules', () => {
    expect(normalizeText('Irrésistible')).toBe('irresistible');
    expect(normalizeText('CHLOÉ LE PARFUM')).toBe('chloe le parfum');
    expect(normalizeText('Hermès')).toBe('hermes');
  });

  it('gère les apostrophes diverses et tirets de la même façon', () => {
    expect(normalizeText("L'Interdit")).toBe('l interdit');
    expect(normalizeText('L’Interdit')).toBe('l interdit');
    expect(normalizeText('l-interdit')).toBe('l interdit');
    expect(collapseSpaces("L'Interdit")).toBe('linterdit');
    expect(collapseSpaces('l-interdit')).toBe('linterdit');
    expect(collapseSpaces('l interdit')).toBe('linterdit');
  });

  it('remplace le symbole & par et', () => {
    expect(normalizeText('Dolce & Gabbana')).toBe('dolce et gabbana');
    expect(normalizeText('Peach & Rose')).toBe('peach et rose');
  });

  it('unifie les chiffres et mots de chiffres (1 million / one million)', () => {
    expect(normalizeText('1 million')).toBe('one million');
    expect(normalizeText('1million')).toBe('one million');
    expect(normalizeText('1 mil')).toBe('one million');
  });

  it('nettoie les espaces multiples et la ponctuation', () => {
    expect(normalizeText('  sauvage...   dior!  ')).toBe('sauvage dior');
    expect(tokenize('  sauvage, dior ; elixir ')).toEqual(['sauvage', 'dior', 'elixir']);
  });
});

describe('2. Ordre libre et mots coupés/collés', () => {
  it('trouve le parfum peu importe l’ordre des mots (nom + marque)', () => {
    const res1 = searchProducts(mockCatalog, 'irresistible givenchy');
    expect(res1.results[0]?.name).toBe('Givenchy Irrésistible');

    const res2 = searchProducts(mockCatalog, 'givenchy irresistible');
    expect(res2.results[0]?.name).toBe('Givenchy Irrésistible');
  });

  it('trouve avec 3 mots dans le désordre', () => {
    const res = searchProducts(mockCatalog, 'parfum sauv dior');
    expect(res.results.length).toBeGreaterThan(0);
    expect(res.results[0]?.name).toContain('Dior Sauvage');
  });

  it('reconnaît les mots collés (bleudechanel -> Bleu de Chanel)', () => {
    const res = searchProducts(mockCatalog, 'bleudechanel');
    expect(res.results[0]?.name).toContain('Bleu de Chanel');
  });

  it('reconnaît les mots collés (onemillion)', () => {
    const res = searchProducts(mockCatalog, 'onemillion');
    expect(res.results[0]?.name).toContain('One Million');
  });

  it('reconnaît les mots coupés (sau vage -> sauvage)', () => {
    const res = searchProducts(mockCatalog, 'sau vage');
    expect(res.results[0]?.name).toContain('Sauvage');
  });
});

describe('3. Distance Damerau-Levenshtein & Tolérance aux fautes', () => {
  it('calcule correctement la distance Damerau-Levenshtein', () => {
    // Transposition adjacente = 1
    expect(damerauLevenshtein('sauvgae', 'sauvage')).toBe(1);
    expect(damerauLevenshtein('diro', 'dior')).toBe(1);
    // Substitution = 1
    expect(damerauLevenshtein('sauvege', 'sauvage')).toBe(1);
    // Insertion / suppression = 1
    expect(damerauLevenshtein('sauvge', 'sauvage')).toBe(1);
  });

  it('tolère 1 faute sur les mots moyens (4 à 6 lettres) mais refuse 2 fautes', () => {
    // 1 à 3 lettres : 0 faute (sauf préfixe)
    expect(matchToken('eax', 'eau').matched).toBe(false);
    // 4 à 6 lettres : 1 faute acceptée, 2 fautes refusées
    expect(matchToken('chanell', 'chanel').matched).toBe(true); // distance 1
    expect(matchToken('diorex', 'dior').matched).toBe(false); // distance 2
    expect(matchToken('sauvge', 'sauvage').matched).toBe(true); // distance 1
  });

  it('tolère 2 fautes sur les longs mots (7+ lettres)', () => {
    expect(matchToken('sauvgeee', 'sauvage').matched).toBe(false); // 3 fautes
    expect(matchToken('iresistible', 'irresistible').matched).toBe(true); // 1 faute
    expect(matchToken('irezistible', 'irresistible').matched).toBe(true); // 2 fautes
  });

  it('trouve le parfum malgré des fautes de frappe', () => {
    const res1 = searchProducts(mockCatalog, 'sauvgae');
    expect(res1.results[0]?.name).toContain('Sauvage');

    const res2 = searchProducts(mockCatalog, 'one milion');
    expect(res2.results[0]?.name).toContain('One Million');

    const res3 = searchProducts(mockCatalog, 'paco rabane');
    expect(res3.results[0]?.name).toContain('One Million');
  });
});

describe('4. Phonétique bilingue (Français & Anglais)', () => {
  it('encode phonétiquement selon les règles de la maison', () => {
    expect(fragrancePhonetic('sovage')).toBe(fragrancePhonetic('sauvage'));
    expect(fragrancePhonetic('chanelle')).toBe(fragrancePhonetic('chanel'));
    expect(fragrancePhonetic('givanchi')).toBe(fragrancePhonetic('givenchy'));
    expect(fragrancePhonetic('versasse')).toBe(fragrancePhonetic('versace'));
    expect(fragrancePhonetic('gerlin')).toBe(fragrancePhonetic('guerlain'));
  });

  it('trouve le produit par phonétique', () => {
    const res1 = searchProducts(mockCatalog, 'sovage dior');
    expect(res1.results[0]?.name).toContain('Sauvage');

    const res2 = searchProducts(mockCatalog, 'givanchi irezistibl');
    expect(res2.results[0]?.name).toBe('Givenchy Irrésistible');

    const res3 = searchProducts(mockCatalog, 'gerlin');
    expect(res3.results[0]?.name).toContain('Guerlain');

    const res4 = searchProducts(mockCatalog, 'versasse');
    expect(res4.results[0]?.name).toContain('Versace');
  });
});

describe('5. Synonymes et Alias (Marques, Concentrations, Genres)', () => {
  it('étend les acronymes de marques (YSL, JPG, D&G, PR)', () => {
    const resYsl = searchProducts(mockCatalog, 'ysl myslf');
    expect(resYsl.results[0]?.name).toContain('MYSLF');

    const resJpg = searchProducts(mockCatalog, 'jpg le male');
    expect(resJpg.results[0]?.name).toContain('Le Male');

    const resDg = searchProducts(mockCatalog, 'd&g imperatrice');
    expect(resDg.results[0]?.name).toContain('L’Impératrice');
  });

  it('reconnaît les abréviations de concentration (EDP, EDT, Elixir)', () => {
    const resEdp = searchProducts(mockCatalog, 'sauvage edp');
    expect(resEdp.results[0]?.name).toBe('Dior Sauvage Eau de Parfum');

    const resElixir = searchProducts(mockCatalog, 'le male elixir');
    expect(resElixir.results[0]?.name).toBe('Jean Paul Gaultier Le Male Elixir');
  });

  it('gère les filtres de genre textuels (homme, femme, pour elle, pour lui)', () => {
    const resFemme = searchProducts(mockCatalog, 'parfum femme floral');
    expect(resFemme.results.every((p) => p.gender === 'femme')).toBe(true);

    const resHomme = searchProducts(mockCatalog, 'oud homme');
    expect(resHomme.results[0]?.name).toBe('Amouage Interlude Man');
  });
});

describe('6. Translittération Arabe & Arabizi', () => {
  it('translittère les marques et noms écrits en arabe', () => {
    expect(transliterateArabic('ديور سوفاج').trim()).toContain('dior');
    expect(transliterateArabic('شانيل').trim()).toContain('chanel');
    expect(transliterateArabic('جيفنشي').trim()).toContain('givenchy');
  });

  it('trouve le parfum recherché en caractères arabes', () => {
    const res1 = searchProducts(mockCatalog, 'ديور سوفاج');
    expect(res1.results[0]?.name).toContain('Sauvage');

    const res2 = searchProducts(mockCatalog, 'شانيل');
    expect(res2.results[0]?.name).toContain('Chanel');

    const res3 = searchProducts(mockCatalog, 'جيفنشي');
    expect(res3.results[0]?.name).toContain('Givenchy');

    const res4 = searchProducts(mockCatalog, 'وان مليون');
    expect(res4.results[0]?.name).toContain('One Million');
  });

  it('gère les ingrédients et filtres en arabe', () => {
    const resOud = searchProducts(mockCatalog, 'عود');
    expect(resOud.results.length).toBeGreaterThan(0);
    expect(resOud.results[0]?.name).toBe('Amouage Interlude Man');
  });
});

describe('7. Recherche multi-champs et pondération', () => {
  it('cherche par ingrédient / note olfactive', () => {
    const res = searchProducts(mockCatalog, 'bergamote');
    expect(res.results.length).toBeGreaterThan(0);
    // Doit trouver les parfums qui ont la note bergamote
    expect(res.results.some((p) => p.notesAll?.some((n) => n.toLowerCase().includes('bergamote')))).toBe(true);
  });

  it('combine marque + note + genre (ex: "vanille homme")', () => {
    const res = searchProducts(mockCatalog, 'vanille homme');
    expect(res.results.length).toBeGreaterThan(0);
    expect(res.results[0]?.gender).toBe('homme');
  });

  it('donne un score supérieur à la marque et au nom par rapport à la description', () => {
    const res = searchProducts(mockCatalog, 'dior');
    // Le premier résultat doit avoir Dior dans son nom de marque
    expect(res.results[0]?.brand.name).toBe('Christian Dior');
  });
});

describe('8. Recherche par préfixe et en direct', () => {
  it('trouve avec un préfixe de nom (sauv -> Sauvage)', () => {
    const res = searchProducts(mockCatalog, 'sauv');
    expect(res.results[0]?.name).toContain('Sauvage');
  });

  it('trouve avec deux préfixes (gucc bl -> Gucci Bloom)', () => {
    const res = searchProducts(mockCatalog, 'chan ble');
    expect(res.results[0]?.name).toContain('Bleu de Chanel');
  });
});

describe('9. Classement par pertinence & stabilité', () => {
  it('classe la correspondance exacte avant la correspondance approchée', () => {
    const res = searchProducts(mockCatalog, 'Bleu de Chanel');
    expect(res.results[0]?.name).toContain('Bleu de Chanel');
  });

  it('préserve l’ordre original en cas d’égalité ou de requête vide', () => {
    const resEmpty = searchProducts(mockCatalog, '');
    expect(resEmpty.results.length).toBe(mockCatalog.length);
    expect(resEmpty.results[0]?.slug).toBe(mockCatalog[0].slug);
    expect(resEmpty.results[1]?.slug).toBe(mockCatalog[1].slug);
  });
});

describe('10. Suggestions ("Vous vouliez dire...") & Repli élégant', () => {
  it('suggère le bon nom en cas de faute sur un parfum emblématique', () => {
    const res = searchProducts(mockCatalog, 'sovage');
    expect(res.suggestion).toBeTruthy();
    expect(res.suggestion?.toLowerCase()).toContain('sauvage');
  });

  it('fournit 4 parfums de repli si 0 résultat absolu', () => {
    const res = searchProducts(mockCatalog, 'zzzzzzzzxyz');
    expect(res.results).toHaveLength(0);
    expect(res.fallbackResults).toHaveLength(4);
  });

  it('gère les requêtes très longues et caractères spéciaux sans erreur', () => {
    const weird = '!@#$%^&*()_+{}[]|:;<>?,./~`';
    expect(() => searchProducts(mockCatalog, weird)).not.toThrow();

    const longQuery = 'un parfum extremement long avec beaucoup de mots sans fin qui ne veut rien dire';
    expect(() => searchProducts(mockCatalog, longQuery)).not.toThrow();
  });
});

describe('11. Suite exhaustive des cas du cahier des charges (> 60 tests au total)', () => {
  it('cas attendu : sovage dior -> Dior Sauvage', () => {
    const res = searchProducts(mockCatalog, 'sovage dior');
    expect(res.results[0]?.name).toContain('Dior Sauvage');
  });

  it('cas attendu : givanchi irezistibl -> Givenchy Irrésistible', () => {
    const res = searchProducts(mockCatalog, 'givanchi irezistibl');
    expect(res.results[0]?.name).toContain('Givenchy Irrésistible');
  });

  it('cas attendu : bleu chanel parfum -> Bleu de Chanel Parfum', () => {
    const res = searchProducts(mockCatalog, 'bleu chanel parfum');
    expect(res.results[0]?.name).toContain('Bleu de Chanel');
  });

  it('cas attendu : ysl myslf -> Yves Saint Laurent MYSLF', () => {
    const res = searchProducts(mockCatalog, 'ysl myslf');
    expect(res.results[0]?.name).toContain('MYSLF');
  });

  it('cas attendu : ديور سوفاج -> Dior Sauvage', () => {
    const res = searchProducts(mockCatalog, 'ديور سوفاج');
    expect(res.results[0]?.name).toContain('Dior Sauvage');
  });

  it('cas attendu : one milion -> Paco Rabanne One Million', () => {
    const res = searchProducts(mockCatalog, 'one milion');
    expect(res.results[0]?.name).toContain('One Million');
  });

  it('cas attendu : oud homme -> parfums oud pour homme', () => {
    const res = searchProducts(mockCatalog, 'oud homme');
    expect(res.results.length).toBeGreaterThan(0);
    expect(res.results[0]?.gender).toBe('homme');
    expect(res.results[0]?.notesAll).toContain('Oud');
  });

  it('cas attendu : paco rabane 1 million -> One Million', () => {
    const res = searchProducts(mockCatalog, 'paco rabane 1 million');
    expect(res.results[0]?.name).toContain('One Million');
  });

  it('variante phonétique : chanelle -> Chanel', () => {
    const res = searchProducts(mockCatalog, 'chanelle');
    expect(res.results[0]?.brand.name).toBe('Chanel');
  });

  it('variante phonétique : givanchi -> Givenchy', () => {
    const res = searchProducts(mockCatalog, 'givanchi');
    expect(res.results[0]?.brand.name).toBe('Givenchy');
  });

  it('variante phonétique : gerlin -> Guerlain', () => {
    const res = searchProducts(mockCatalog, 'gerlin');
    expect(res.results[0]?.brand.name).toBe('Guerlain');
  });

  it('variante phonétique : diore -> Christian Dior', () => {
    const res = searchProducts(mockCatalog, 'diore');
    expect(res.results[0]?.brand.name).toBe('Christian Dior');
  });

  it('variante phonétique : versasse -> Versace', () => {
    const res = searchProducts(mockCatalog, 'versasse');
    expect(res.results[0]?.brand.name).toBe('Versace');
  });

  it('inversion de lettres : sauvgae -> Sauvage', () => {
    const res = searchProducts(mockCatalog, 'sauvgae');
    expect(res.results[0]?.name).toContain('Sauvage');
  });

  it('ordre inversé : sauvage christian dior', () => {
    const res = searchProducts(mockCatalog, 'sauvage christian dior');
    expect(res.results[0]?.name).toContain('Dior Sauvage');
  });

  it('mot collé : bleudechanel -> Bleu de Chanel', () => {
    const res = searchProducts(mockCatalog, 'bleudechanel');
    expect(res.results[0]?.name).toContain('Bleu de Chanel');
  });

  it('mot collé : onemillion -> One Million', () => {
    const res = searchProducts(mockCatalog, 'onemillion');
    expect(res.results[0]?.name).toContain('One Million');
  });

  it('mot coupé : sau vage -> Sauvage', () => {
    const res = searchProducts(mockCatalog, 'sau vage');
    expect(res.results[0]?.name).toContain('Sauvage');
  });

  it('apostrophe et tiret : linterdit vs l-interdit', () => {
    expect(normalizeText("l'interdit")).toBe('l interdit');
    expect(normalizeText('l-interdit')).toBe('l interdit');
  });

  it('alias marque : ysl -> Yves Saint Laurent', () => {
    const res = searchProducts(mockCatalog, 'ysl');
    expect(res.results[0]?.brand.name).toBe('Yves Saint Laurent');
  });

  it('alias marque : jpg -> Jean Paul Gaultier', () => {
    const res = searchProducts(mockCatalog, 'jpg');
    expect(res.results[0]?.brand.name).toBe('Jean Paul Gaultier');
  });

  it('alias marque : d&g -> Dolce & Gabbana', () => {
    const res = searchProducts(mockCatalog, 'd&g');
    expect(res.results[0]?.brand.name).toBe('Dolce & Gabbana');
  });

  it('alias marque : pr -> Paco Rabanne', () => {
    const res = searchProducts(mockCatalog, 'pr');
    expect(res.results[0]?.brand.name).toBe('Paco Rabanne');
  });

  it('alias concentration : edp -> Eau de Parfum', () => {
    const res = searchProducts(mockCatalog, 'dior edp');
    expect(res.results.length).toBeGreaterThan(0);
    expect(res.results[0]?.concentration).toBe('Eau de Parfum');
  });

  it('alias genre : femme -> filtres féminins', () => {
    const res = searchProducts(mockCatalog, 'guerlain femme');
    expect(res.results[0]?.gender).toBe('femme');
  });

  it('alias genre : pour elle -> femme', () => {
    const res = searchProducts(mockCatalog, 'guerlain pour elle');
    expect(res.results[0]?.gender).toBe('femme');
  });

  it('alias genre : pour lui -> homme', () => {
    const res = searchProducts(mockCatalog, 'versace pour lui');
    expect(res.results[0]?.gender).toBe('homme');
  });

  it('translittération arabe : شانيل -> Chanel', () => {
    const res = searchProducts(mockCatalog, 'شانيل');
    expect(res.results[0]?.brand.name).toBe('Chanel');
  });

  it('translittération arabe : غيرلان -> Guerlain', () => {
    const res = searchProducts(mockCatalog, 'غيرلان');
    expect(res.results[0]?.brand.name).toBe('Guerlain');
  });

  it('translittération arabe : فرساتشي -> Versace', () => {
    const res = searchProducts(mockCatalog, 'فرساتشي');
    expect(res.results[0]?.brand.name).toBe('Versace');
  });

  it('translittération arabe : جيفنشي -> Givenchy', () => {
    const res = searchProducts(mockCatalog, 'جيفنشي');
    expect(res.results[0]?.brand.name).toBe('Givenchy');
  });

  it('translittération arabizi : 3oud -> oud', () => {
    expect(transliterateArabic('3oud')).toContain('aoud');
  });

  it('recherche par préfixe : chan -> Chanel', () => {
    const res = searchProducts(mockCatalog, 'chan');
    expect(res.results[0]?.brand.name).toBe('Chanel');
  });

  it('requête vide : renvoie tout le catalogue sans erreur', () => {
    const res = searchProducts(mockCatalog, '');
    expect(res.results).toHaveLength(mockCatalog.length);
    expect(res.suggestion).toBeNull();
  });

  it('requête avec uniquement des espaces : renvoie tout le catalogue', () => {
    const res = searchProducts(mockCatalog, '    ');
    expect(res.results).toHaveLength(mockCatalog.length);
    expect(res.suggestion).toBeNull();
  });

  it('requête inconnue sans match : 0 résultat et 4 suggestions de repli', () => {
    const res = searchProducts(mockCatalog, 'qxjzkwv999');
    expect(res.results).toHaveLength(0);
    expect(res.fallbackResults).toHaveLength(4);
  });
});
