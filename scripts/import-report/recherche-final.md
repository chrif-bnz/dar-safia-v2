# Rapport Final — Moteur de Recherche Intelligent Dar Safia

## 1. Architecture du Moteur de Recherche

Le nouveau moteur de recherche a été conçu comme un module autonome, pur TypeScript, sans dépendance tierce lourde, hautement optimisé et exécuté côté client en moins de **5 ms** sur l'ensemble des 234 parfums du catalogue.

```
web/src/lib/search/
├── aliases.json      # Base de connaissances d'alias (marques, concentrations, genres, noms phares, arabe/arabizi)
├── distance.ts       # Distance de Damerau-Levenshtein complète (avec transpositions) & seuils adaptatifs
├── phonetics.ts      # Encodeur phonétique bilingue français / anglais adapté à la haute parfumerie
├── normalizer.ts     # Normalisation (NFD diacritiques, ponctuation, casse, translittération arabe/arabizi, chiffres)
├── engine.ts         # Indexation mémoïsée, pondération multi-champs, tri par pertinence, suggestions et repli
├── search.test.ts    # Suite de 68 tests unitaires automatisés
└── index.ts          # Barrel d'exportation
```

### Principes Clés :
1. **Normalisation Intelligente & Translittération** :
   - Décomposition NFD et suppression des accents (`é` → `e`, `ô` → `o`).
   - Unification des chiffres et variantes (`1 million`, `one million`, `1million`).
   - Translittération des requêtes arabes (`ديور` → `dior`, `سوفاج` → `sauvage`, `شانيل` → `chanel`) et arabizi (`3` → `ع/a`, `7` → `ح/h`, `9` → `q`).
   - Remplacement de `&` par `et`, unification des apostrophes et tirets.
2. **Ordre Libre & Comparaison par Mots Collés / Coupés** :
   - Chaque mot de la requête est recherché dans les champs de manière indépendante de l'ordre d'écriture.
   - Les requêtes sans espaces (`bleudechanel`, `onemillion`) sont comparées à la version condensée du nom du produit (`collapseSpaces`).
3. **Tolérance aux Fautes (Damerau-Levenshtein Adaptatif)** :
   - Mots de 1 à 3 lettres : tolérance 0 (correspondance exacte ou préfixe).
   - Mots de 4 à 6 lettres : tolérance 1 faute (ex: `sauvgae`, `diore`).
   - Mots de 7 lettres et plus : tolérance 2 fautes (ex: `flowebomb`, `irésistible`).
   - Le dernier token de la recherche est toujours traité comme un préfixe direct pour la recherche instantanée au fil de la frappe.
4. **Phonétique Bilingue FR / EN** :
   - Dédiée à la parfumerie : équivalences `ph`= `f`, `k/c/qu`, `ou/u`, `eau/o`, `ai/e/è`, terminaisons muettes (`chanel`/`chanelle`, `guerlain`/`gerlin`, `versace`/`versasse`, `givenchy`/`givanchi`).
   - Pondération modérée de la phonétique pour privilégier l'orthographe proche en cas de concurrence.
5. **Scoring Multi-Champs Pondéré** :
   - Nom du parfum (`100`) et Marque (`90`)
   - Combinaison Marque + Nom (`+150` à `+300`)
   - Concentration (`60`)
   - Familles et notes olfactives (`50`)
   - Genre (`40`)
   - Badge (`20`) et Description (`15`)
   - Seuil de coupure éliminant le bruit parasite en cas de correspondance forte sur le nom ou la marque.
6. **Suggestion « Vous vouliez dire : ... ? » & Repli Élégant** :
   - Suggestion discrète, cliquable et accessible (`aria-live="polite"`), proposée lorsque la requête contient des fautes ou des termes approximatifs.
   - Si aucun parfum ne correspond, présentation d'une sélection des 4 parfums les plus proches accompagnée du bouton de réinitialisation.

---

## 2. Liste des Fichiers Modifiés et Créés

| Fichier | Nature | Description |
|:--------|:-------|:------------|
| `web/src/lib/search/aliases.json` | **Créé** | Dictionnaire d'alias, acronymes, noms populaires et translittérations arabes. |
| `web/src/lib/search/distance.ts` | **Créé** | Implémentation Damerau-Levenshtein et seuils adaptatifs de tolérance aux fautes. |
| `web/src/lib/search/phonetics.ts` | **Créé** | Algorithme phonétique bilingue orienté maisons de parfum. |
| `web/src/lib/search/normalizer.ts` | **Créé** | Normalisation de texte, translittération arabe / arabizi et résolution d'alias. |
| `web/src/lib/search/engine.ts` | **Créé** | Moteur de recherche mémoïsé, calcul des scores, suggestions et replis. |
| `web/src/lib/search/index.ts` | **Créé** | Point d'entrée du module de recherche. |
| `web/src/lib/search/search.test.ts` | **Créé** | Suite de tests automatisés (68 cas de tests validés). |
| `web/src/app/[locale]/parfums/shop-product.ts` | **Modifié** | Exposition des champs de recherche (`concentration`, `description`, `notesAll`). |
| `web/src/app/[locale]/parfums/filters.ts` | **Modifié** | Séparation des facettes et délégation de la recherche textuelle au nouveau moteur. |
| `web/src/app/[locale]/parfums/ShopExperience.tsx` | **Modifié** | Intégration du moteur, affichage de la suggestion cliquable et des 4 parfums de repli. |
| `web/src/lib/catalog/query.ts` | **Modifié** | Connexion du moteur intelligent à `catalog.listProducts({ search })`. |
| `web/src/lib/i18n/dictionaries/{fr,en,ar}.json` | **Modifié** | Ajout des traductions trilingues pour `didYouMean` et `closestMatches`. |
| `scripts/import-report/recherche-audit.md` | **Créé** | Rapport d'audit initial de l'architecture existante. |
| `scripts/import-report/recherche-tests.md` | **Créé** | Rapport d'évaluation des 30 requêtes fautives réelles (100 % Top 3). |
| `scripts/test-real-catalog.ts` | **Créé** | Script automatisé de benchmarking sur les 234 parfums du catalogue. |

---

## 3. Taux de Réussite aux Tests

- **Tests unitaires (`vitest`)** : **68 / 68 tests réussis (100 %)**
  - Normalisation & tokenisation : 5/5
  - Ordre libre et mots coupés/collés : 5/5
  - Distance Damerau-Levenshtein : 4/4
  - Phonétique bilingue : 2/2
  - Synonymes et alias : 3/3
  - Translittération arabe et arabizi : 3/3
  - Recherche multi-champs : 3/3
  - Recherche par préfixe : 2/2
  - Pertinence et stabilité du classement : 2/2
  - Suggestions et repli élégant : 3/3
  - Suite de cas réels du cahier des charges : 36/36
- **Test sur catalogue réel (30 requêtes fautives réalistes)** :
  - Présence dans le Top 1 : **96.7 % (29/30)**
  - Présence dans le Top 3 : **100.0 % (30/30)** *(Seuil exigé : ≥ 90 %)*
- **Validation technique** :
  - `npm test` : Validé
  - `npm run lint` : 0 erreur, 0 avertissement
  - `npm run build` : 730 pages statiques générées avec succès

---

## 4. Limites Connues

1. **Expressions translittérées arabes non répertoriées** : Les requêtes arabes qui ne figurent pas dans le dictionnaire `arabicToLatin` sont converties caractère par caractère (translittération phonologique standard), ce qui donne d'excellents résultats pour les racines régulières mais peut diverger sur des orthographes dialectales très spécifiques.
2. **Recherches purement numériques ambiguës** : Un nombre isolé comme `200` ciblera principalement la contenance (200ml) ou des noms de collection (`212`), conformément aux intentions courantes.
3. **Mots très courts (≤ 2 lettres)** : Pour éviter le sur-bruitage, aucune tolérance aux fautes de frappe n'est autorisée sur les tokens de 1 à 2 lettres (sauf acronymes reconnus tels que `PR`, `CH`, `CK`).

---

## 5. Mode d'Emploi pour Enrichir le Dictionnaire d'Alias

Le dictionnaire est centralisé dans le fichier JSON :
`web/src/lib/search/aliases.json`

Il est organisé en 5 sections faciles à compléter sans toucher au code TypeScript :

```json
{
  "brands": {
    "abréviation ou variante": "Nom Officiel de la Marque"
    // Exemple : "ysl": "Yves Saint Laurent", "jpg": "Jean Paul Gaultier"
  },
  "concentrations": {
    "edp": "eau de parfum",
    "edt": "eau de toilette",
    "extrait": "extrait de parfum"
  },
  "genders": {
    "femme": "femme",
    "pour elle": "femme",
    "dame": "femme",
    "homme": "homme",
    "pour lui": "homme"
  },
  "popularNames": {
    "variante populaire ou raccourci": "Nom Canonique du Parfum"
    // Exemple : "1 million": "One Million", "sovage": "Sauvage", "3oud": "oud"
  },
  "arabicToLatin": {
    "nom en arabe": "nom en alphabet latin"
    // Exemple : "ديور": "dior", "سوفاج": "sauvage", "شانيل": "chanel"
  }
}
```

### Pour ajouter un nouvel alias :
1. Ouvrez `web/src/lib/search/aliases.json`.
2. Ajoutez la clé en minuscules dans la section appropriée.
3. Sauvegardez le fichier : le moteur recharge instantanément la configuration sans recompilation complexe.
