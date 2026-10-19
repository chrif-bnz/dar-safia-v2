# Audit de la Recherche de Parfums — dar-safia-v2

Date : 19 octobre 2026  
Branche : `recherche-intelligente`  
Objectif : Évaluer le moteur de recherche existant, cartographier l'architecture et les données, identifier les limites et définir les spécifications du nouveau moteur intelligent.

---

## 1. Fonctionnement actuel de la recherche

### A. Composants et flux de données
- **Champ de recherche** :
  - Composant : `<input type="search">` situé dans `web/src/app/[locale]/parfums/FilterSidebar.tsx` (lignes 126–134).
  - Contrôle d'état : la valeur courante est stockée dans l'état local React de `ShopExperience.tsx` (`filters.query`).
  - Événement : `onChange={(e) => onToggle('query', e.target.value)}`. L'état est mis à jour à chaque frappe de touche.
  - **Debounce** : absent dans l'implémentation actuelle. Chaque caractère saisi déclenche immédiatement un re-filtrage synchrone.
- **Source de données et architecture** :
  - La page `CatalogPage` (`web/src/app/[locale]/parfums/page.tsx`) est un composant serveur statique (SSG).
  - Au build / rendu serveur, les 234 parfums sont récupérés via `catalog.listProducts({ locale })` (basé sur `products.json`, `brands.json`, `notes.json`, `translations.json`).
  - Chaque produit est transformé en forme légère `ShopProduct` via `toShopProduct(product)` dans `shop-product.ts`.
  - La liste complète des 234 `ShopProduct` est transmise au composant client `ShopExperience.tsx`.
  - **Exécution du filtrage** : 100 % côté client, en mémoire, dans un `useMemo` React réactif aux changements de `filters`.
  - En parallèle, un module serveur `web/src/lib/catalog/query.ts` (`matchesSearch`) existe pour les requêtes API/Strapi directes, mais il n'est pas utilisé par la boutique interactive côté client.

### B. Interaction avec les filtres, la pagination et le mélange
- **Combinaison des filtres** :
  - `matchesFilters(product, filters)` dans `filters.ts` applique une conjonction logique (ET) entre la recherche textuelle `query` et les facettes cochées (`gender`, `family`, `notes`, `intensity`, `season`, `mood`).
- **Pagination** :
  - `ShopExperience` pagine les produits filtrés par tranches de 12 (`PERFUMES_PER_PAGE`). Tout changement de filtre (y compris le texte de recherche) réinitialise la page courante à 1 (`resetPage()`), en synchronisation avec le paramètre d'URL `?page=...`.
- **Bouton « Mélanger »** :
  - Géré par `shuffleWithSeed` et `useSyncExternalStore` (`lib/shuffle.ts`). La graine de mélange ordonne la liste complète *avant* le filtrage.
- **Compteur de résultats** :
  - Affiche dynamiquement `{filtered.length} création(s)` via `pluralize(c.count, filtered.length)`.

---

## 2. Logique de filtrage textuel actuelle et limites constatées

Dans `web/src/app/[locale]/parfums/filters.ts` :
```typescript
function normalizeStr(str: string) {
  return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

if (query.trim().length > 0) {
  const q = normalizeStr(query);
  const n = normalizeStr(product.name);
  const b = normalizeStr(product.brand.name);
  if (!n.includes(q) && !b.includes(q)) return false;
}
```

### Limites majeures identifiées :
1. **Sensibilité extrême à l'orthographe (zéro tolérance aux fautes)** :
   - « sovage » ne trouve pas *Sauvage*.
   - « irezistibl » ou « givanchi » ne trouve pas *Givenchy Irrésistible*.
   - « one milion » ne trouve pas *One Million*.
2. **Ordre rigide et absence de tokenisation** :
   - « givenchy irresistible » ne trouve rien car la sous-chaîne exacte n'apparaît ni dans le nom (« Irrésistible ») ni dans la marque (« Givenchy »).
3. **Mots collés ou coupés non reconnus** :
   - « bleudechanel » ou « sau vage » échouent complètement.
4. **Abréviations et acronymes ignorés** :
   - « YSL », « JPG », « D&G », « CH », « PR », « EDP », « EDT » ne sont pas résolus vers leurs marques ou concentrations.
5. **Recherche arabe et arabizi absente** :
   - Les clients tapant en caractères arabes (« ديور », « شانيل », « سوفاج ») obtiennent 0 résultat. L'arabizi (« 3 », « 7 », « 9 ») n'est pas géré.
6. **Champs exclus de la recherche** :
   - Les concentrations (« Eau de Parfum », « Extrait »), les familles olfactives (« floral », « boisé »), les notes olfactives (« vanille », « oud », « bergamote ») et les descriptions ne sont pas interrogeables dans la boutique. Une requête comme « oud homme » ou « parfum vanille » renvoie 0 résultat.
7. **Absence de classement par pertinence (ranking)** :
   - Aucun calcul de score : le premier produit trouvé est simplement le premier selon l'ordre aléatoire ou d'origine.
8. **Aucune suggestion corrective (« Vous vouliez dire… »)** :
   - En cas d'erreur de frappe, l'utilisateur fait face à un écran vide sans aucune alternative ni proposition d'orientation.

---

## 3. Inventaire des champs interrogeables d'un parfum

| Champ de domaine | Présence dans `Product` | Présence dans `ShopProduct` (actuel) | Poids / Rôle dans la recherche intelligente |
| :--- | :--- | :--- | :--- |
| **Nom du parfum** (`name`) | Oui | Oui | **Poids 100** (Priorité maximale) |
| **Marque** (`brand.name`) | Oui | Oui | **Poids 90** (Priorité très forte) |
| **Concentration** (`concentration`) | Oui | À relayer depuis `Product` | **Poids 60** (Résolution des termes EDP, Extrait...) |
| **Famille olfactive** (`family`, `olfactoryFamilies`) | Oui | Oui | **Poids 50** (Recherche par type : boisé, ambré, floral...) |
| **Notes olfactives** (`notes`, `noteTags`, `headlineNote`) | Oui | Oui (`noteTags`, `headlineNote`) | **Poids 50** (Recherche par ingrédient : vanille, oud, rose...) |
| **Genre** (`gender`) | Oui | Oui | **Poids 40** (Filtre implicite : femme, homme, unisexe) |
| **Badge** (`badge`) | Oui | Oui | **Poids 20** (Coup de Cœur, Bestseller...) |
| **Description / Récit** (`description`, `story`) | Oui | À relayer succinctement si utile | **Poids 10** (Vocabulaire contextuel) |

---

## 4. Spécifications cibles de l'architecture

- **Conservation de l'architecture existante** :
  - Maintien du filtrage en mémoire côté client dans `ShopExperience.tsx`, garantissant un temps de réponse instantané (< 10 ms).
  - Maintien de l'interaction transparente avec les filtres à facettes et le bouton « Mélanger ».
- **Nouveau module isolé `web/src/lib/search/`** :
  - `normalizer.ts` : Normalisation Unicode NFKD, casse, ponctuation, chiffres, arabizi et translittération arabe.
  - `phonetics.ts` : Algorithme phonétique bilingue (français / anglais adapté aux noms de parfums).
  - `distance.ts` : Distance Damerau-Levenshtein pondérée par la longueur du mot.
  - `aliases.json` : Dictionnaire riche et extensible (marques, acronymes, concentrations, genres, équivalences arabes).
  - `engine.ts` : Indexation mémoire, recherche multi-termes, scoring de pertinence, suggestions orthographiques (« Vous vouliez dire : ... ») et sélection de repli.
