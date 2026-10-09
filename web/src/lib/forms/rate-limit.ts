/**
 * Limiteur à fenêtre glissante, en mémoire. Suffisant contre un script naïf
 * qui martèle les routes d'enregistrement ; pas une protection distribuée
 * (une instance = un compteur). Derrière plusieurs instances, déléguer à
 * l'infrastructure (WAF, Redis).
 */
export function createRateLimiter(limit: number, windowMs: number) {
  const hits = new Map<string, number[]>();

  return function allow(key: string, now: number = Date.now()): boolean {
    const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
    if (recent.length >= limit) {
      hits.set(key, recent);
      return false;
    }
    recent.push(now);
    hits.set(key, recent);

    // Évite que la table grossisse sans borne.
    if (hits.size > 5000) {
      for (const [k, v] of hits) {
        if (v.every((t) => now - t >= windowMs)) hits.delete(k);
      }
    }
    return true;
  };
}
