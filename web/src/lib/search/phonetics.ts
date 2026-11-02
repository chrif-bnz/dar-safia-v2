/**
 * Moteur phonétique adapté au français et à l'anglais pour la parfumerie
 */

export function encodePhonetic(raw: string): string {
  if (!raw) return '';
  let s = raw.toLowerCase().trim();

  // 1. Remplacements spécifiques aux termes de parfumerie fréquents
  s = s.replace(/guerlain/g, 'gerlan');
  s = s.replace(/gerlin/g, 'gerlan');
  s = s.replace(/versace/g, 'versas');
  s = s.replace(/versasse/g, 'versas');
  s = s.replace(/irresistible/g, 'irezistibl');
  s = s.replace(/irresistibl/g, 'irezistibl');
  s = s.replace(/irezistibl/g, 'irezistibl');

  // 2. ph -> f
  s = s.replace(/ph/g, 'f');

  // 3. eau, au, aux, aud -> o
  s = s.replace(/eau[xt]?/g, 'o');
  s = s.replace(/au[xt]?/g, 'o');

  // 4. ai, ei, ay, ey -> e
  s = s.replace(/(ai|ei|ay|ey)/g, 'e');

  // 5. ou, oo -> u
  s = s.replace(/(ou|oo)/g, 'u');

  // 6. Nasales françaises simplifiées
  s = s.replace(/(en|an|em|am)(?=[bcdfghjklmnpqrstvwxz]|$)/g, 'an');
  s = s.replace(/(in|ain|ein)(?=[bcdfghjklmnpqrstvwxz]|$)/g, 'in');
  s = s.replace(/(on|om)(?=[bcdfghjklmnpqrstvwxz]|$)/g, 'on');

  // 7. gu + e/i -> g
  s = s.replace(/gu(?=[ei])/g, 'g');

  // 8. g + e/i/y -> j
  s = s.replace(/g(?=[eiy])/g, 'j');

  // 9. c + e/i/y -> s, sinon c/qu/ck/k -> k
  s = s.replace(/c(?=[eiy])/g, 's');
  s = s.replace(/ç/g, 's');
  s = s.replace(/(qu|ck|k|c)/g, 'k');

  // 10. ch, sh -> ch
  s = s.replace(/(ch|sh)/g, 'ch');

  // 11. z -> s
  s = s.replace(/z/g, 's');

  // 12. y -> i
  s = s.replace(/y/g, 'i');

  // 13. w -> v
  s = s.replace(/w/g, 'v');

  // 14. Déduplication des consonnes doublées (ll->l, mm->m, etc.)
  s = s.replace(/([bdfgklmnprstvz])\1+/g, '$1');

  // 15. Suppression des lettres muettes finales fréquentes en français (e, es, s, t, d, x)
  s = s.replace(/e[stx]?$/g, '');
  s = s.replace(/[stxd]$/g, '');

  return s;
}

/**
 * Compare deux mots sur le plan phonétique
 */
export function isPhoneticMatch(wordA: string, wordB: string): boolean {
  if (!wordA || !wordB) return false;
  // Ne pas appliquer la phonétique aux mots très courts (<= 3 lettres)
  if (wordA.length <= 3 && wordB.length <= 3) return false;

  const codeA = encodePhonetic(wordA);
  const codeB = encodePhonetic(wordB);

  return codeA.length > 2 && codeA === codeB;
}

