import { LoadingMark } from '@/components/LoadingMark';

/**
 * État de chargement entre deux pages. Affiché par Next le temps que la
 * page suivante arrive (rendu dynamique, jeu de données lent) : le
 * monogramme de la maison respire, un filet d'or glisse dessous.
 */
export default function Loading() {
  return (
    <main id="contenu" className="flex min-h-svh items-center justify-center bg-noir">
      <LoadingMark />
    </main>
  );
}
