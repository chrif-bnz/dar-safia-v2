/**
 * ══════════════════════════════════════════════════════════════
 *   MÉLANGE DE LA LISTE DES PARFUMS
 * ══════════════════════════════════════════════════════════════
 *
 * Le mélange ne touche qu'à l'ORDRE D'AFFICHAGE, jamais aux données.
 *
 * La graine vit dans un magasin externe (useSyncExternalStore) :
 *   - serveur et premier rendu client : `null` -> liste d'origine, donc
 *     aucune divergence d'hydratation ;
 *   - au montage, `subscribe` (appelé dans la phase d'effets) tire la graine
 *     avec crypto.getRandomValues : aucun hasard pendant le rendu ;
 *   - `reshuffle()` en tire une autre (bouton « Mélanger »).
 *
 * L'ordre étant une fonction pure (graine, liste), changer de filtre ne
 * remélange pas : on filtre la liste déjà mélangée.
 */

type Listener = () => void;

let seed: number | null = null;
const listeners = new Set<Listener>();

function draw(): number {
  const cryptoObj = typeof crypto !== 'undefined' ? crypto : undefined;
  if (cryptoObj?.getRandomValues) {
    const a = new Uint32Array(1);
    cryptoObj.getRandomValues(a);
    return a[0];
  }
  return (Date.now() ^ (performance.now() * 1000)) >>> 0;
}

export function subscribeShuffle(listener: Listener): () => void {
  listeners.add(listener);
  if (seed === null) {
    seed = draw();
    // La notification est émise dans la phase d'effets : React relit le snapshot.
    queueMicrotask(() => listeners.forEach((l) => l()));
  }
  return () => {
    listeners.delete(listener);
  };
}

export function getShuffleSeed(): number | null {
  return seed;
}

export function getServerShuffleSeed(): number | null {
  return null;
}

export function reshuffle(): void {
  let next = draw();
  while (next === seed) next = draw();
  seed = next;
  listeners.forEach((l) => l());
}

/** PRNG déterministe (mulberry32) : même graine, même ordre. */
function mulberry32(a: number): () => number {
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Fisher-Yates sur une copie : l'entrée n'est jamais modifiée. */
export function shuffleWithSeed<T>(items: readonly T[], seedValue: number): T[] {
  const out = items.slice();
  const rand = mulberry32(seedValue);
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}
