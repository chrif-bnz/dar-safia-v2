import aliasesData from './aliases.json' with { type: 'json' };

const ARABIC_CHAR_MAP: Record<string, string> = {
  'ا': 'a', 'أ': 'a', 'إ': 'i', 'آ': 'a', 'ء': 'a',
  'ب': 'b', 'ت': 't', 'ث': 'th', 'ج': 'j', 'ح': 'h', 'خ': 'kh',
  'د': 'd', 'ذ': 'dh', 'ر': 'r', 'ز': 'z', 'س': 's', 'ش': 'ch',
  'ص': 's', 'ض': 'd', 'ط': 't', 'ظ': 'z', 'ع': 'a', 'غ': 'gh',
  'ف': 'f', 'ق': 'k', 'ك': 'k', 'ل': 'l', 'م': 'm', 'ن': 'n',
  'ه': 'h', 'و': 'ou', 'ي': 'i', 'ى': 'a', 'ة': 'e', 'ئ': 'i', 'ؤ': 'u',
  'پ': 'p', 'چ': 'ch', 'ڤ': 'v', 'گ': 'g'
};

const ARABIZI_MAP: Record<string, string> = {
  '3': 'a',
  '7': 'h',
  '9': 'q',
  '5': 'kh',
  '2': 'a'
};

/**
 * Translittération de l'arabe (mots clés + caractères individuels) et de l'arabizi.
 */
export function transliterateArabic(text: string): string {
  if (!text) return '';

  let s = text.trim();

  // 1. Remplacement des expressions et mots arabes connus via le dictionnaire
  const arabicDict = aliasesData.arabicToLatin as Record<string, string>;
  for (const [ar, lat] of Object.entries(arabicDict)) {
    if (s.includes(ar)) {
      s = s.replaceAll(ar, ` ${lat} `);
    }
  }

  // 2. Translittération caractère par caractère pour les caractères arabes restants
  let out = '';
  for (const ch of s) {
    if (ARABIC_CHAR_MAP[ch]) {
      out += ARABIC_CHAR_MAP[ch];
    } else {
      out += ch;
    }
  }
  s = out;

  // 3. Gestion de l'Arabizi (chiffres au sein de mots : ex "3oud" -> "aoud", "7lou" -> "hlou")
  s = s.replace(/([a-zA-Z]*)([23579])([a-zA-Z]+)/g, (_, pre: string, num: string, post: string) => {
    return `${pre}${ARABIZI_MAP[num] || num}${post}`;
  });

  return s;
}

/**
 * Normalisation standard :
 * - Translittération arabe / arabizi
 * - Minuscules
 * - Suppression des accents et diacritiques (NFD)
 * - Traitement des chiffres ("one million" / "1 million", "1million")
 * - Remplacement de la ponctuation par des espaces
 * - Remplacement de '&' par 'et'
 * - Élimination des espaces multiples
 */
export function normalizeText(raw: string): string {
  if (!raw) return '';

  // 1. Translittération arabe préalable
  let s = transliterateArabic(raw);

  // 2. Décomposition diacritiques & minuscules
  s = s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

  // 3. Cas '&' -> 'et'
  s = s.replace(/&/g, ' et ');

  // 4. Mots liés avec chiffres : "1million" -> "1 million", "one million" -> "1 million"
  s = s.replace(/1\s*million\b/g, 'one million');
  s = s.replace(/1\s*mil\b/g, 'one million');

  // 5. Remplacement des apostrophes et ponctuations diverses
  // Note : "L'Interdit", "linterdit", "l interdit", "l-interdit"
  s = s.replace(/['’`"«»“”]/g, ' ');
  s = s.replace(/[-_.,;:!?()/[\]{}\\]/g, ' ');

  // 6. Espaces multiples en espace unique
  s = s.replace(/\s+/g, ' ').trim();

  return s;
}

/**
 * Chaîne sans aucun espace pour comparaison de mots collés/coupés
 * ex: "bleu de chanel" -> "bleudechanel"
 */
export function collapseSpaces(text: string): string {
  return normalizeText(text).replace(/\s+/g, '');
}

/**
 * Découpe une chaîne en tokens uniques signifiants.
 */
export function tokenize(text: string): string[] {
  const norm = normalizeText(text);
  if (!norm) return [];
  return norm.split(/\s+/).filter(Boolean);
}

/**
 * Résout les alias et acronymes dans le texte de la requête avant tokenisation.
 * Exemple : "d&g" -> "dolce gabbana", "ysl" -> "yves saint laurent", "edp" -> "eau de parfum"
 */
export function canonicalizeQuery(raw: string): { normalized: string; tokens: string[] } {
  let s = normalizeText(raw);
  if (!s) return { normalized: '', tokens: [] };

  const allAliases: Record<string, string> = {
    ...(aliasesData.popularNames as Record<string, string>),
    ...(aliasesData.brands as Record<string, string>),
    ...(aliasesData.concentrations as Record<string, string>),
    ...(aliasesData.genders as Record<string, string>)
  };

  // Trier les clés par longueur décroissante pour matcher les expressions longues d'abord
  const keys = Object.keys(allAliases).sort((a, b) => b.length - a.length);

  for (const key of keys) {
    const normKey = normalizeText(key);
    if (!normKey) continue;

    // Correspondance mot entier ou expression exacte
    const regex = new RegExp(`(^|\\s)${normKey.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&')}(\\s|$)`, 'gi');
    if (regex.test(s)) {
      const replacement = normalizeText(allAliases[key]);
      s = s.replace(regex, `$1${replacement}$2`);
    }
  }

  s = s.replace(/\s+/g, ' ').trim();
  const tokens = tokenize(s);

  return { normalized: s, tokens };
}

/**
 * Résolution des alias / synonymes connus pour une requête.
 * Permet d'étendre la requête avec les termes cibles correspondants.
 */
export function expandAliases(tokens: string[]): string[] {
  const canonical = canonicalizeQuery(tokens.join(' '));
  const expanded: string[] = [...canonical.tokens];

  for (const token of tokens) {
    if (!expanded.includes(token)) expanded.push(token);
  }

  return expanded;
}

