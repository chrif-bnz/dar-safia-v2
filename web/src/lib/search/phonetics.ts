/**
 * Moteur phonétique adapté à la parfumerie de luxe (français / anglais).
 * Rapproche les variantes orthographiques prononcées de manière similaire :
 * - "chanel" / "chanelle"
 * - "givenchy" / "givanchi"
 * - "irresistible" / "irezistibl"
 * - "guerlain" / "gerlin"
 * - "dior" / "diore"
 * - "versace" / "versasse"
 * - "sauvage" / "sovage"
 * - "ph" -> "f", "eau/au/o" -> "o", "k/c/qu" -> "k"
 */

export function fragrancePhonetic(raw: string): string {
  if (!raw) return '';

  // Nettoyage diacritiques et minuscules
  let s = raw
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/g, '');

  if (!s) return '';

  // Alias phonétiques spécifiques aux noms de parfums courants
  s = s.replace(/^gerlin\b/, 'guerlain');
  s = s.replace(/^jirlin\b/, 'guerlain');
  s = s.replace(/^givanchi\b/, 'givenchy');
  s = s.replace(/^givanchy\b/, 'givenchy');
  s = s.replace(/^irezistibl\b/, 'irresistible');
  s = s.replace(/^irrezistibl\b/, 'irresistible');
  s = s.replace(/^irezistible\b/, 'irresistible');
  s = s.replace(/^versasse\b/, 'versace');
  s = s.replace(/^sovage\b/, 'sauvage');

  // Remplacement ph -> f
  s = s.replace(/ph/g, 'f');

  // Détection des sons ch / sh
  s = s.replace(/ch|sh/g, 'X');

  // Simplification gu + e/i -> g
  s = s.replace(/gu([ei])/g, 'g$1');

  // g doux devant e, i, y -> j
  s = s.replace(/g([eiy])/g, 'j$1');

  // c doux devant e, i, y -> s ; sinon c/qu/k -> k
  s = s.replace(/c([eiy])/g, 's$1');
  s = s.replace(/qu|ck|k/g, 'k');
  s = s.replace(/c/g, 'k');

  // z -> s
  s = s.replace(/z/g, 's');

  // Sons voyelles unifiés :
  // eau, au -> o
  s = s.replace(/eau|eaux|au|aux/g, 'o');
  // ou, oo -> u
  s = s.replace(/ou|oo/g, 'u');
  // ai, ei, ay, ey -> e
  s = s.replace(/ai|ei|ay|ey/g, 'e');
  // y -> i
  s = s.replace(/y/g, 'i');

  // Nasales françaises uniquement suivies d'une consonne ou en fin de mot
  s = s.replace(/(ain|ein|in)(?=[^aeiou]|$)/g, '1');
  s = s.replace(/(an|en|am|em)(?=[^aeiou]|$)/g, '2');
  s = s.replace(/(on|om)(?=[^aeiou]|$)/g, '3');

  // Fusion des consonnes doubles (ex: rr -> r, ll -> l, ss -> s, tt -> t, nn -> n)
  s = s.replace(/([a-zA-Z0-9])\1+/g, '$1');

  // Suppression des lettres finales muettes (e, s, t, d, x, p)
  s = s.replace(/[estdxp]+$/, '');

  // Fusion finale des doublons résiduels
  s = s.replace(/([a-zA-Z0-9])\1+/g, '$1');

  return s;
}

/**
 * Calcule la similarité phonétique entre deux tokens.
 * Retourne true si les codes phonétiques sont identiques ou préfixes proches.
 */
export function matchPhonetic(queryToken: string, targetToken: string): boolean {
  if (queryToken.length < 3 || targetToken.length < 3) return false;

  const codeQ = fragrancePhonetic(queryToken);
  const codeT = fragrancePhonetic(targetToken);

  if (!codeQ || !codeT) return false;
  if (codeQ === codeT) return true;

  // Si l'un est préfixe phonétique de l'autre (au moins 3 caractères phonétiques)
  if (codeQ.length >= 3 && codeT.length >= 3) {
    if (codeT.startsWith(codeQ) || codeQ.startsWith(codeT)) {
      return true;
    }
  }

  return false;
}
