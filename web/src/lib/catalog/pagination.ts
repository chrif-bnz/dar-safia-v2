/**
 * ══════════════════════════════════════════════════════════════
 *   CATALOGUE — LOGIQUE DE PAGINATION
 * ══════════════════════════════════════════════════════════════
 *
 * Fonctions pures pour le découpage par page, la validation et le
 * serrage (clamping) du numéro de page, et la génération de la
 * plage de liens avec ellipses.
 */

export const PERFUMES_PER_PAGE = 12;

export type PaginationItem = number | 'ellipsis';

/**
 * Calcule le nombre total de pages pour une taille de page donnée.
 * Retourne au minimum 1 page même si la liste est vide.
 */
export function getTotalPages(
  totalItems: number,
  pageSize: number = PERFUMES_PER_PAGE
): number {
  if (totalItems <= 0) return 1;
  return Math.ceil(totalItems / pageSize);
}

/**
 * Lit et assainit le paramètre de page depuis l'URL.
 * - Valeur manquante, non-numérique ou < 1 -> 1
 * - Valeur supérieure à la dernière page -> dernière page
 */
export function parsePageParam(
  param: string | null | undefined,
  totalPages: number
): number {
  const maxPage = Math.max(1, totalPages);
  if (!param) return 1;

  const trimmed = param.trim();
  // Seuls les entiers stricts sont acceptés (pas de décimales, pas de texte)
  if (!/^-?\d+$/.test(trimmed)) return 1;

  const num = parseInt(trimmed, 10);
  if (isNaN(num) || num < 1) return 1;
  if (num > maxPage) return maxPage;

  return num;
}

/**
 * Découpe un tableau d'éléments pour la page et la taille demandées.
 */
export function paginateItems<T>(
  items: T[],
  page: number,
  pageSize: number = PERFUMES_PER_PAGE
): T[] {
  const safePage = Math.max(1, page);
  const startIndex = (safePage - 1) * pageSize;
  return items.slice(startIndex, startIndex + pageSize);
}

/**
 * Génère la liste des numéros de page et ellipses pour l'affichage.
 * Pour 12 pages avec page 5 : [1, 'ellipsis', 4, 5, 6, 'ellipsis', 12]
 */
export function getPaginationRange(
  currentPage: number,
  totalPages: number
): PaginationItem[] {
  if (totalPages <= 1) return [1];
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // Près du début
  if (currentPage <= 4) {
    return [1, 2, 3, 4, 5, 'ellipsis', totalPages];
  }

  // Près de la fin
  if (currentPage >= totalPages - 3) {
    return [
      1,
      'ellipsis',
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }

  // Au milieu : 1 ... (page - 1) page (page + 1) ... totalPages
  return [
    1,
    'ellipsis',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    'ellipsis',
    totalPages,
  ];
}

/**
 * Construit l'URL d'une page cible en conservant tous les autres
 * paramètres de recherche actifs.
 */
export function buildPageUrl(
  pathname: string,
  searchParams: { toString: () => string } | string,
  targetPage: number
): string {
  const query = typeof searchParams === 'string' ? searchParams : searchParams.toString();
  const params = new URLSearchParams(query);
  params.set('page', String(targetPage));
  const queryString = params.toString();
  return queryString ? `${pathname}?${queryString}` : pathname;
}
