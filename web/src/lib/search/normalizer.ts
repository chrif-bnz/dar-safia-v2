/**
 * Normalisation de texte pour le moteur de recherche
 */

/**
 * Supprime les diacritiques (accents, cédilles, etc.)
 */
export function stripAccents(str: string): string {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

/**
 * Normalise une chaîne brute :
 * - minuscules
 * - suppression des accents
 * - remplacement de & et + par 'et'
 * - remplacement de la ponctuation et caractères spéciaux par des espaces
 * - normalisation des chiffres populaires (1 million <-> one million)
 * - réduction des espaces multiples
 */
export function normalizeText(text: string): string {
  if (!text) return '';

  let res = text.toLowerCase();

  // Remplacement de & et + par 'et'
  res = res.replace(/[&+]/g, ' et ');

  // Remplacement des chiffres / mots clés fréquents en parfumerie
  res = res.replace(/\b1\s*million\b/gi, 'one million');
  res = res.replace(/\b1million\b/gi, 'one million');

  // Diacritiques
  res = stripAccents(res);

  // Remplacement de tout caractère non alphanumérique par un espace (support unicode)
  res = res.replace(/[^\p{L}\p{N}\s]/gu, ' ');

  // Réduction des espaces
  res = res.replace(/\s+/g, ' ').trim();

  return res;
}

/**
 * Renvoie une version entièrement « dé-espacée » pour détecter les mots collés ou coupés
 * ex: "Bleu de Chanel" -> "bleudechanel"
 * ex: "sau vage" -> "sauvage"
 */
export function toUnspaced(text: string): string {
  return normalizeText(text).replace(/\s+/g, '');
}

/**
 * Découpe une chaîne en tokens de recherche uniques et non vides
 */
export function tokenize(text: string): string[] {
  const normalized = normalizeText(text);
  if (!normalized) return [];
  return normalized.split(/\s+/).filter(Boolean);
}
