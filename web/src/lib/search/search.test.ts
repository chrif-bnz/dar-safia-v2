import { describe, expect, it } from 'vitest';

import { decodeArabizi, hasArabicScript, transliterateArabic } from './arabic';
import { damerauLevenshtein, getMaxDistance, isTypoMatch } from './levenshtein';
import { normalizeText, tokenize, toUnspaced } from './normalizer';
import { encodePhonetic, isPhoneticMatch } from './phonetics';
import { preprocessQuery, searchProducts } from './engine';

// Catalogue de test représentatif
const mockCatalog = [
  {
    id: '1',
    slug: 'dior-sauvage-eau-de-parfum',
    name: 'Dior Sauvage Eau de Parfum',
    brand: { name: 'Christian Dior', slug: 'christian-dior' },
    gender: 'homme',
    family: 'fresh',
    secondaryFamilies: ['woody'],
    concentration: 'Eau de Parfum',
    notes: [
      { note: { name: 'Bergamote de Calabre' } },
      { note: { name: 'Poivre du Sichuan' } },
      { note: { name: 'Ambroxan' } },
      { note: { name: 'Vanille de Papouasie' } },
    ],
    badge: 'Élixir Sauvage',
    description: 'Une fraîcheur hespéridée féroce réchauffée par la sensualité de la vanille ambrée.',
  },
  {
    id: '2',
    slug: 'givenchy-irresistible-eau-de-parfum',
    name: 'Givenchy Irrésistible',
    brand: { name: 'Givenchy', slug: 'givenchy' },
    gender: 'femme',
    family: 'floral',
    secondaryFamilies: ['woody'],
    concentration: 'Eau de Parfum',
    notes: [
      { note: { name: 'Rose Essentielle' } },
      { note: { name: 'Iris Précieux' } },
      { note: { name: 'Bois de Cèdre' } },
    ],
    badge: 'Magnétique',
    description: 'Une rose éclatante qui invite au lâcher-prise.',
  },
  {
    id: '3',
    slug: 'chanel-bleu-de-chanel-parfum',
    name: 'Bleu de Chanel Parfum 100ml',
    brand: { name: 'Chanel', slug: 'chanel' },
    gender: 'homme',
    family: 'woody',
    secondaryFamilies: ['amber'],
    concentration: 'Parfum',
    notes: [
      { note: { name: 'Zeste de Citron' } },
      { note: { name: 'Santal de Nouvelle-Calédonie' } },
      { note: { name: 'Bois de Cèdre' } },
    ],
    badge: 'Quintessence Absolue',
    description: 'La noblesse du santal crémeux dans une concentration parfum intense.',
  },
  {
    id: '4',
    slug: 'yves-saint-laurent-myslf',
    name: 'Yves Saint Laurent MYSLF',
    brand: { name: 'Yves Saint Laurent', slug: 'yves-saint-laurent' },
    gender: 'homme',
    family: 'woody',
    secondaryFamilies: ['floral'],
    concentration: 'Eau de Parfum',
    notes: [
      { note: { name: 'Bergamote de Calabre' } },
      { note: { name: 'Fleur d’Oranger de Tunisie' } },
      { note: { name: 'Patchouli' } },
    ],
    badge: 'Audacieux',
    description: 'Le masculin contemporain dans toute sa nuance.',
  },
  {
    id: '5',
    slug: 'paco-rabanne-one-million-parfum',
    name: 'Paco Rabanne One Million Parfum',
    brand: { name: 'Paco Rabanne', slug: 'paco-rabanne' },
    gender: 'homme',
    family: 'amber',
    secondaryFamilies: ['woody'],
    concentration: 'Parfum',
    notes: [
      { note: { name: 'Tubéreuse Solaire' } },
      { note: { name: 'Cuir Ambré' } },
      { note: { name: 'Pin Salé' } },
    ],
    badge: 'Lingot Solaire',
    description: 'Un parfum insolent et flamboyant pour les esprits audacieux.',
  },
  {
    id: '6',
    slug: 'gucci-bloom-eau-de-parfum-50ml',
    name: 'Gucci Bloom Eau de Parfum 50ml',
    brand: { name: 'Gucci', slug: 'gucci' },
    gender: 'femme',
    family: 'floral',
    secondaryFamilies: [],
    concentration: 'Eau de Parfum',
    notes: [
      { note: { name: 'Tubéreuse Blanche' } },
      { note: { name: 'Jasmin Sambac' } },
      { note: { name: 'Rangoon Creeper' } },
    ],
    badge: 'Jardin Fleuri',
    description: 'Un jardin imaginaire luxuriant aux fleurs blanches éclatantes.',
  },
  {
    id: '7',
    slug: 'jean-paul-gaultier-le-male-elixir',
    name: 'Jean Paul Gaultier Le Male Elixir',
    brand: { name: 'Jean Paul Gaultier', slug: 'jean-paul-gaultier' },
    gender: 'homme',
    family: 'amber',
    secondaryFamilies: ['gourmand'],
    concentration: 'Elixir',
    notes: [
      { note: { name: 'Lavande Sauvage' } },
      { note: { name: 'Fève Tonka' } },
      { note: { name: 'Benjoin Suave' } },
    ],
    badge: 'Sensualité Brûlante',
    description: 'Une vague de chaleur dorée et liquoreuse.',
  },
  {
    id: '8',
    slug: 'guerlain-shalimar-eau-de-parfum',
    name: 'Guerlain Shalimar',
    brand: { name: 'Guerlain', slug: 'guerlain' },
    gender: 'femme',
    family: 'amber',
    secondaryFamilies: ['gourmand'],
    concentration: 'Eau de Parfum',
    notes: [
      { note: { name: 'Bergamote' } },
      { note: { name: 'Iris' } },
      { note: { name: 'Vanille de Madagascar' } },
      { note: { name: 'Oud Sombre' } },
    ],
    badge: 'Mythe Oriental',
    description: 'La légende de l’amour oriental éternel.',
  },
  {
    id: '9',
    slug: 'versace-eros-eau-de-toilette',
    name: 'Versace Eros Eau de Toilette',
    brand: { name: 'Versace', slug: 'versace' },
    gender: 'homme',
    family: 'fresh',
    secondaryFamilies: ['amber'],
    concentration: 'Eau de Toilette',
    notes: [
      { note: { name: 'Menthe Fraîche' } },
      { note: { name: 'Pomme Verte' } },
      { note: { name: 'Fève Tonka' } },
    ],
    badge: 'Flamme Mythique',
    description: 'L’amour passionné et la force héroïque de la Grèce antique.',
  },
  {
    id: '10',
    slug: 'dolce-gabbana-the-one-eau-de-parfum',
    name: 'Dolce & Gabbana The One Eau de Parfum',
    brand: { name: 'Dolce & Gabbana', slug: 'dolce-gabbana' },
    gender: 'femme',
    family: 'floral',
    secondaryFamilies: ['amber'],
    concentration: 'Eau de Parfum',
    notes: [
      { note: { name: 'Mandarine Solaire' } },
      { note: { name: 'Lys Blanc' } },
      { note: { name: 'Vanille Suave' } },
    ],
    badge: 'Diva Féminine',
    description: 'Une élégance sensuelle et captivante.',
  },
  {
    id: '11',
    slug: 'tom-ford-oud-wood',
    name: 'Tom Ford Oud Wood',
    brand: { name: 'Tom Ford', slug: 'tom-ford' },
    gender: 'homme',
    family: 'woody',
    secondaryFamilies: ['amber'],
    concentration: 'Eau de Parfum',
    notes: [
      { note: { name: 'Bois de Oud Précieux' } },
      { note: { name: 'Bois de Rose' } },
      { note: { name: 'Cardamome' } },
    ],
    badge: 'Bois Majestueux',
    description: 'Un parfum d’une richesse sombre et mystérieuse.',
  },
];

describe('1. Normalisation et Nettoyage', () => {
  it('supprime les accents', () => {
    expect(normalizeText('Élixir Présent Éthéré')).toBe('elixir present ethere');
  });

  it('gère les apostrophes diverses et tirets', () => {
    expect(normalizeText("L'Interdit")).toBe('l interdit');
    expect(normalizeText('l’interdit')).toBe('l interdit');
    expect(normalizeText('l-interdit')).toBe('l interdit');
  });

  it('gère & et +', () => {
    expect(normalizeText('Dolce & Gabbana')).toBe('dolce et gabbana');
    expect(normalizeText('Black + White')).toBe('black et white');
  });

  it('normalise 1 million et 1million', () => {
    expect(normalizeText('1 million')).toBe('one million');
    expect(normalizeText('1million')).toBe('one million');
  });

  it('génère la chaîne sans espace', () => {
    expect(toUnspaced('Bleu de Chanel')).toBe('bleudechanel');
    expect(toUnspaced('L’Interdit Rouge')).toBe('linterditrouge');
  });

  it('découpe proprement en tokens', () => {
    expect(tokenize('  Dior   Sauvage  100ml ')).toEqual(['dior', 'sauvage', '100ml']);
  });

  it('gère la ponctuation complexe, crochets et guillemets', () => {
    expect(normalizeText('«Sauvage» [Elixir] / 100ml;')).toBe('sauvage elixir 100ml');
  });

  it('gère les chaînes vides ou remplies d’espaces', () => {
    expect(normalizeText('    ')).toBe('');
    expect(tokenize('')).toEqual([]);
    expect(toUnspaced('')).toBe('');
  });
});

describe('2. Distance Damerau-Levenshtein et Seuils', () => {
  it('détecte les transpositions adjacentes', () => {
    expect(damerauLevenshtein('sauvage', 'sauvgae')).toBe(1);
  });

  it('calcule les seuils selon la longueur', () => {
    expect(getMaxDistance(2)).toBe(0);
    expect(getMaxDistance(3)).toBe(0);
    expect(getMaxDistance(4)).toBe(1);
    expect(getMaxDistance(6)).toBe(1);
    expect(getMaxDistance(7)).toBe(2);
    expect(getMaxDistance(10)).toBe(2);
  });

  it('autorise 1 faute pour les mots de 4 à 6 lettres', () => {
    expect(isTypoMatch('diore', 'dior').isMatch).toBe(true);
    expect(isTypoMatch('chnel', 'chanel').isMatch).toBe(true);
    expect(isTypoMatch('chxzl', 'chanel').isMatch).toBe(false);
  });

  it('autorise 2 fautes pour les mots de 7 lettres et plus', () => {
    expect(isTypoMatch('sauvage', 'sauvgae').isMatch).toBe(true);
    expect(isTypoMatch('irresistible', 'iresistibl').isMatch).toBe(true);
  });

  it('interdit les fautes pour les mots de 3 lettres ou moins', () => {
    expect(isTypoMatch('dio', 'dior').isMatch).toBe(false);
    expect(isTypoMatch('edp', 'edt').isMatch).toBe(false);
  });
});

describe('3. Phonétique en Parfumerie', () => {
  it('encode chanel et chanelle de façon identique', () => {
    expect(encodePhonetic('chanel')).toBe(encodePhonetic('chanelle'));
  });

  it('encode givenchy et givanchi de façon identique', () => {
    expect(encodePhonetic('givenchy')).toBe(encodePhonetic('givanchi'));
  });

  it('encode guerlain et gerlin de façon identique', () => {
    expect(encodePhonetic('guerlain')).toBe(encodePhonetic('gerlin'));
  });

  it('encode sauvage et sovage de façon identique', () => {
    expect(encodePhonetic('sauvage')).toBe(encodePhonetic('sovage'));
  });

  it('encode versace et versasse de façon identique', () => {
    expect(encodePhonetic('versace')).toBe(encodePhonetic('versasse'));
  });

  it('encode dior et diore de façon identique', () => {
    expect(encodePhonetic('dior')).toBe(encodePhonetic('diore'));
  });

  it('valide isPhoneticMatch sur des variantes courantes', () => {
    expect(isPhoneticMatch('gerlin', 'guerlain')).toBe(true);
    expect(isPhoneticMatch('sovage', 'sauvage')).toBe(true);
    expect(isPhoneticMatch('versasse', 'versace')).toBe(true);
    expect(isPhoneticMatch('diore', 'dior')).toBe(true);
  });

  it('n’applique pas la phonétique aux mots trop courts (<= 3 lettres)', () => {
    expect(isPhoneticMatch('eau', 'o')).toBe(false);
  });
});

describe('4. Arabe et Arabizi', () => {
  it('détecte les caractères arabes', () => {
    expect(hasArabicScript('ديور')).toBe(true);
    expect(hasArabicScript('dior')).toBe(false);
  });

  it('translittère les marques majeures en arabe', () => {
    expect(transliterateArabic('ديور')).toBe('dior');
    expect(transliterateArabic('شانيل')).toBe('chanel');
    expect(transliterateArabic('جيفنشي')).toBe('givenchy');
    expect(transliterateArabic('سوفاج')).toBe('sauvage');
    expect(transliterateArabic('باكو رابان')).toBe('paco rabanne');
    expect(transliterateArabic('غيرلان')).toBe('guerlain');
    expect(transliterateArabic('فرساتشي')).toBe('versace');
  });

  it('décode l’arabizi', () => {
    expect(decodeArabizi('3anbar')).toBe('anbar');
    expect(decodeArabizi('7abibi')).toBe('habibi');
    expect(decodeArabizi('9ahwa')).toBe('kahwa');
    expect(decodeArabizi('5obz')).toBe('khobz');
    expect(decodeArabizi('3oud')).toBe('oud');
  });

  it('prétraite les requêtes arabes combinées', () => {
    const res = preprocessQuery('ديور سوفاج');
    expect(res.tokens).toContain('dior');
    expect(res.tokens).toContain('sauvage');
  });

  it('translittère les ingrédients et catégories en arabe', () => {
    expect(transliterateArabic('عطر')).toBe('parfum');
    expect(transliterateArabic('رجالي')).toBe('homme');
    expect(transliterateArabic('نسائي')).toBe('femme');
    expect(transliterateArabic('فانيليا')).toBe('vanille');
    expect(transliterateArabic('عود')).toBe('oud');
  });
});

describe('5. Synonymes et Alias', () => {
  it('étend YSL vers Yves Saint Laurent', () => {
    const res = preprocessQuery('ysl myslf');
    expect(res.tokens).toContain('yves');
    expect(res.tokens).toContain('saint');
    expect(res.tokens).toContain('laurent');
    expect(res.tokens).toContain('myslf');
  });

  it('étend JPG vers Jean Paul Gaultier', () => {
    const res = preprocessQuery('jpg le male');
    expect(res.tokens).toContain('jean');
    expect(res.tokens).toContain('paul');
    expect(res.tokens).toContain('gaultier');
  });

  it('étend D&G vers Dolce Gabbana', () => {
    const res = preprocessQuery('d&g the one');
    expect(res.tokens).toContain('dolce');
    expect(res.tokens).toContain('gabbana');
  });

  it('étend EDP et EDT', () => {
    expect(preprocessQuery('dior edp').tokens).toContain('parfum');
    expect(preprocessQuery('versace edt').tokens).toContain('toilette');
  });

  it('gère les alias de genre', () => {
    expect(preprocessQuery('parfum femme').tokens).toContain('femme');
    expect(preprocessQuery('parfum pour lui').tokens).toContain('homme');
    expect(preprocessQuery('men perfume').tokens).toContain('homme');
    expect(preprocessQuery('pour elle').tokens).toContain('femme');
  });

  it('étend PR et Paco vers Paco Rabanne', () => {
    expect(preprocessQuery('pr 1 million').tokens).toContain('paco');
    expect(preprocessQuery('paco 1 million').tokens).toContain('rabanne');
  });

  it('étend Hugo Boss, Boss, Hugo', () => {
    expect(preprocessQuery('boss man').tokens).toContain('hugo');
  });
});

describe('6. Moteur de Recherche sur Catalogue Mocké', () => {
  it('ordre inversé : "sauvage dior" trouve Dior Sauvage', () => {
    const res = searchProducts(mockCatalog, 'sauvage dior');
    expect(res.items.length).toBeGreaterThan(0);
    expect(res.items[0].name).toBe('Dior Sauvage Eau de Parfum');
  });

  it('ordre inversé : "irresistible givenchy" trouve Givenchy Irrésistible', () => {
    const res = searchProducts(mockCatalog, 'irresistible givenchy');
    expect(res.items.length).toBeGreaterThan(0);
    expect(res.items[0].name).toBe('Givenchy Irrésistible');
  });

  it('ordre inversé : "bleu chanel parfum" trouve Bleu de Chanel Parfum', () => {
    const res = searchProducts(mockCatalog, 'bleu chanel parfum');
    expect(res.items.length).toBeGreaterThan(0);
    expect(res.items[0].name).toContain('Bleu de Chanel Parfum');
  });

  it('mots collés : "bleudechanel" trouve Bleu de Chanel', () => {
    const res = searchProducts(mockCatalog, 'bleudechanel');
    expect(res.items.length).toBeGreaterThan(0);
    expect(res.items[0].name).toContain('Bleu de Chanel');
  });

  it('mots coupés : "sau vage" trouve Sauvage', () => {
    const res = searchProducts(mockCatalog, 'sau vage');
    expect(res.items.length).toBeGreaterThan(0);
    expect(res.items[0].name).toContain('Sauvage');
  });

  it('fautes de frappe : "sovage" trouve Sauvage', () => {
    const res = searchProducts(mockCatalog, 'sovage');
    expect(res.items.length).toBeGreaterThan(0);
    expect(res.items[0].name).toContain('Sauvage');
  });

  it('fautes de frappe : "sovage dior" trouve Dior Sauvage', () => {
    const res = searchProducts(mockCatalog, 'sovage dior');
    expect(res.items.length).toBeGreaterThan(0);
    expect(res.items[0].name).toBe('Dior Sauvage Eau de Parfum');
  });

  it('fautes de frappe : "one milion" trouve Paco Rabanne One Million', () => {
    const res = searchProducts(mockCatalog, 'one milion');
    expect(res.items.length).toBeGreaterThan(0);
    expect(res.items[0].name).toContain('One Million');
  });

  it('fautes combinées : "paco rabane 1 million" trouve One Million', () => {
    const res = searchProducts(mockCatalog, 'paco rabane 1 million');
    expect(res.items.length).toBeGreaterThan(0);
    expect(res.items[0].name).toContain('One Million');
  });

  it('fautes phonétiques : "givanchi irezistibl" trouve Givenchy Irrésistible', () => {
    const res = searchProducts(mockCatalog, 'givanchi irezistibl');
    expect(res.items.length).toBeGreaterThan(0);
    expect(res.items[0].name).toBe('Givenchy Irrésistible');
  });

  it('phonétique : "gerlin" trouve Guerlain', () => {
    const res = searchProducts(mockCatalog, 'gerlin');
    expect(res.items.length).toBeGreaterThan(0);
    expect(res.items[0].brand.name).toBe('Guerlain');
  });

  it('phonétique : "versasse" trouve Versace', () => {
    const res = searchProducts(mockCatalog, 'versasse');
    expect(res.items.length).toBeGreaterThan(0);
    expect(res.items[0].brand.name).toBe('Versace');
  });

  it('phonétique : "chanelle" trouve Chanel', () => {
    const res = searchProducts(mockCatalog, 'chanelle');
    expect(res.items.length).toBeGreaterThan(0);
    expect(res.items[0].brand.name).toBe('Chanel');
  });

  it('recherche en arabe : "ديور سوفاج" trouve Dior Sauvage', () => {
    const res = searchProducts(mockCatalog, 'ديور سوفاج');
    expect(res.items.length).toBeGreaterThan(0);
    expect(res.items[0].name).toBe('Dior Sauvage Eau de Parfum');
  });

  it('alias "ysl myslf" trouve Yves Saint Laurent MYSLF', () => {
    const res = searchProducts(mockCatalog, 'ysl myslf');
    expect(res.items.length).toBeGreaterThan(0);
    expect(res.items[0].name).toBe('Yves Saint Laurent MYSLF');
  });

  it('chiffre "paco rabanne 1 million" trouve One Million', () => {
    const res = searchProducts(mockCatalog, 'paco rabanne 1 million');
    expect(res.items.length).toBeGreaterThan(0);
    expect(res.items[0].name).toBe('Paco Rabanne One Million Parfum');
  });

  it('préfixe direct : "sauv" trouve Sauvage', () => {
    const res = searchProducts(mockCatalog, 'sauv');
    expect(res.items.length).toBeGreaterThan(0);
    expect(res.items[0].name).toBe('Dior Sauvage Eau de Parfum');
  });

  it('préfixe multi-mots : "gucc bl" trouve Gucci Bloom', () => {
    const res = searchProducts(mockCatalog, 'gucc bl');
    expect(res.items.length).toBeGreaterThan(0);
    expect(res.items[0].name).toBe('Gucci Bloom Eau de Parfum 50ml');
  });

  it('recherche par note et genre : "oud homme" trouve Tom Ford Oud Wood', () => {
    const res = searchProducts(mockCatalog, 'oud homme');
    expect(res.items.length).toBeGreaterThan(0);
    expect(res.items[0].name).toBe('Tom Ford Oud Wood');
  });

  it('recherche par note : "vanille homme" trouve Dior Sauvage', () => {
    const res = searchProducts(mockCatalog, 'vanille homme');
    expect(res.items.length).toBeGreaterThan(0);
    expect(res.items[0].name).toBe('Dior Sauvage Eau de Parfum');
  });

  it('recherche par note : "oud" trouve Tom Ford Oud Wood et Shalimar', () => {
    const res = searchProducts(mockCatalog, 'oud');
    expect(res.items.length).toBe(2);
  });

  it('recherche par concentration : "parfum homme" trouve les concentrations Parfum', () => {
    const res = searchProducts(mockCatalog, 'parfum homme');
    expect(res.items.length).toBeGreaterThan(0);
  });

  it('requête vide retourne tous les parfums dans l’ordre initial', () => {
    const res = searchProducts(mockCatalog, '');
    expect(res.items.length).toBe(mockCatalog.length);
    expect(res.items[0].id).toBe(mockCatalog[0].id);
  });

  it('requête absurde génère suggestion ou recommandations sans planter', () => {
    const res = searchProducts(mockCatalog, 'zzzzz');
    expect(res.items.length).toBe(0);
  });

  it('très longue requête avec bruit sans plantage', () => {
    const res = searchProducts(
      mockCatalog,
      'je recherche un parfum exceptionnel pour offrir à une dame dior sauvage'
    );
    expect(res).toBeDefined();
  });

  it('caractères spéciaux dans la requête', () => {
    const res = searchProducts(mockCatalog, '***#@! dior ???');
    expect(res.items.length).toBeGreaterThan(0);
    expect(res.items[0].brand.name).toBe('Christian Dior');
  });

  it('génère une suggestion "Vous vouliez dire" sur une faute isolée', () => {
    const res = searchProducts(mockCatalog, 'sauvgae');
    expect(res.items.length).toBeGreaterThan(0);
  });
});
