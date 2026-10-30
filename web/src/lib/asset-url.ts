/**
 * Encode un chemin d'actif public hérité du catalogue (espaces, `&`, parenthèses…).
 *
 * `encodeURI` laisse passer `& # ? +`, des caractères réservés qui cassent le
 * chemin : un fichier « Viktor & Rolf … » renvoyait 404 alors qu'il existe.
 */
export function encodeAssetPath(path: string): string {
  return encodeURI(path).replace(
    /[&#?+]/g,
    (char) => `%${char.charCodeAt(0).toString(16).toUpperCase()}`
  );
}
