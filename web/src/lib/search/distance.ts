/**
 * Distance de Damerau-Levenshtein complète (avec transpositions adjacentes)
 * et règles de tolérance adaptatives selon la longueur des termes.
 */

export function damerauLevenshtein(a: string, b: string): number {
  if (a === b) return 0;
  const lenA = a.length;
  const lenB = b.length;
  if (lenA === 0) return lenB;
  if (lenB === 0) return lenA;

  // Matrice (lenA + 2) x (lenB + 2)
  const maxDist = lenA + lenB;
  const da: Record<string, number> = {};

  const h: number[][] = Array.from({ length: lenA + 2 }, () =>
    new Array(lenB + 2).fill(0)
  );

  h[0][0] = maxDist;
  for (let i = 0; i <= lenA; i++) {
    h[i + 1][0] = maxDist;
    h[i + 1][1] = i;
  }
  for (let j = 0; j <= lenB; j++) {
    h[0][j + 1] = maxDist;
    h[1][j + 1] = j;
  }

  for (let i = 1; i <= lenA; i++) {
    let db = 0;
    for (let j = 1; j <= lenB; j++) {
      const i1 = da[b[j - 1]] || 0;
      const j1 = db;
      let cost = 1;
      if (a[i - 1] === b[j - 1]) {
        cost = 0;
        db = j;
      }

      h[i + 1][j + 1] = Math.min(
        h[i][j + 1] + 1, // suppression
        h[i + 1][j] + 1, // insertion
        h[i][j] + cost, // substitution
        h[i1][j1] + (i - i1 - 1) + 1 + (j - j1 - 1) // transposition
      );
    }
    da[a[i - 1]] = i;
  }

  return h[lenA + 1][lenB + 1];
}

/**
 * Seuil de tolérance aux fautes selon la longueur du terme cible :
 * - 1 à 3 lettres : 0 faute (exact ou préfixe seulement)
 * - 4 à 6 lettres : 1 faute max
 * - 7 lettres et plus : 2 fautes max
 */
export function maxAllowedDistance(length: number): number {
  if (length <= 3) return 0;
  if (length <= 6) return 1;
  return 2;
}

export interface MatchResult {
  matched: boolean;
  score: number; // 0 à 100
  distance: number;
  isExact: boolean;
  isPrefix: boolean;
}

/**
 * Compare un token de requête à un token cible :
 * - Exact : score 100
 * - Préfixe : score 85 (si longueur >= 2)
 * - Damerau-Levenshtein à distance 1 : score 70
 * - Damerau-Levenshtein à distance 2 : score 55
 */
export function matchToken(queryToken: string, targetToken: string, isLastToken = false): MatchResult {
  if (!queryToken || !targetToken) {
    return { matched: false, score: 0, distance: 999, isExact: false, isPrefix: false };
  }

  if (queryToken === targetToken) {
    return { matched: true, score: 100, distance: 0, isExact: true, isPrefix: false };
  }

  // Si c'est le dernier mot de la requête ou un préfixe d'au moins 2 lettres
  if (targetToken.startsWith(queryToken) && queryToken.length >= 2) {
    const ratio = queryToken.length / targetToken.length;
    // Plus le préfixe couvre une grande part du mot cible, plus le score est élevé
    const prefixScore = Math.round(80 + ratio * 15);
    return { matched: true, score: prefixScore, distance: 0, isExact: false, isPrefix: true };
  }

  const dist = damerauLevenshtein(queryToken, targetToken);
  const allowed = maxAllowedDistance(Math.min(queryToken.length, targetToken.length));

  if (dist <= allowed) {
    const score = dist === 1 ? 70 : 55;
    return { matched: true, score, distance: dist, isExact: false, isPrefix: false };
  }

  // Préfixe tolérant aux fautes pour les mots de 5+ lettres : ex "sauvga" vs "sauvage"
  if (isLastToken && queryToken.length >= 4 && targetToken.length > queryToken.length) {
    const sub = targetToken.slice(0, queryToken.length);
    const subDist = damerauLevenshtein(queryToken, sub);
    if (subDist <= 1) {
      return { matched: true, score: 65, distance: subDist, isExact: false, isPrefix: true };
    }
  }

  return { matched: false, score: 0, distance: dist, isExact: false, isPrefix: false };
}
