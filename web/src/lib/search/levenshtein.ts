/**
 * Calcul de la distance de Damerau-Levenshtein
 * Prend en compte :
 * - Insertion
 * - Suppression
 * - Substitution
 * - Transposition de 2 caractères adjacents (ex: "sauvgae" -> "sauvage")
 */

export function damerauLevenshtein(a: string, b: string): number {
  if (a === b) return 0;
  if (!a) return b.length;
  if (!b) return a.length;

  const lenA = a.length;
  const lenB = b.length;

  // Matrice (lenA + 1) x (lenB + 1)
  const d: number[][] = Array.from({ length: lenA + 1 }, () =>
    new Array<number>(lenB + 1).fill(0)
  );

  for (let i = 0; i <= lenA; i++) d[i][0] = i;
  for (let j = 0; j <= lenB; j++) d[0][j] = j;

  for (let i = 1; i <= lenA; i++) {
    for (let j = 1; j <= lenB; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;

      // Minimum entre suppression, insertion et substitution
      d[i][j] = Math.min(
        d[i - 1][j] + 1,       // suppression
        d[i][j - 1] + 1,       // insertion
        d[i - 1][j - 1] + cost // substitution
      );

      // Transposition
      if (
        i > 1 &&
        j > 1 &&
        a[i - 1] === b[j - 2] &&
        a[i - 2] === b[j - 1]
      ) {
        d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
      }
    }
  }

  return d[lenA][lenB];
}

/**
 * Calcule le seuil maximal de fautes autorisé selon la longueur du mot :
 * - 1 à 3 lettres : 0 faute (exact ou préfixe uniquement)
 * - 4 à 6 lettres : 1 faute
 * - 7 lettres et plus : 2 fautes
 */
export function getMaxDistance(wordLength: number): number {
  if (wordLength <= 3) return 0;
  if (wordLength <= 6) return 1;
  return 2;
}

/**
 * Détermine si le mot source correspond au mot cible avec tolérance aux fautes
 */
export function isTypoMatch(
  queryWord: string,
  targetWord: string
): { isMatch: boolean; distance: number; scoreMultiplier: number } {
  if (queryWord === targetWord) {
    return { isMatch: true, distance: 0, scoreMultiplier: 1.0 };
  }

  // Mots de 1 à 3 lettres : aucune faute permise
  if (queryWord.length <= 3 || targetWord.length <= 3) {
    return { isMatch: false, distance: 999, scoreMultiplier: 0 };
  }

  const threshold = Math.min(getMaxDistance(queryWord.length), getMaxDistance(targetWord.length));
  if (threshold === 0) {
    return { isMatch: false, distance: 999, scoreMultiplier: 0 };
  }

  if (Math.abs(queryWord.length - targetWord.length) > threshold) {
    return { isMatch: false, distance: 999, scoreMultiplier: 0 };
  }

  const distance = damerauLevenshtein(queryWord, targetWord);

  if (distance <= threshold) {
    const maxLen = Math.max(queryWord.length, targetWord.length);
    const scoreMultiplier = Math.max(0.4, 1.0 - (distance / maxLen) * 0.5);
    return { isMatch: true, distance, scoreMultiplier };
  }

  return { isMatch: false, distance, scoreMultiplier: 0 };
}
