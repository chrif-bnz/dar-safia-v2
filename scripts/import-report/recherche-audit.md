# Audit de la Recherche de Parfums — Dar Safia v2

**Date d'audit :** 1 novembre 2026  
**Branche d'audit :** `recherche-intelligente`  
**Objet :** Analyse exhaustive de l'architecture et de la logique de recherche actuelle du site, identification des limites et spécifications techniques du nouveau moteur de recherche intelligent.

---

## 1. Fonctionnement Actuel de la Recherche

### 1.1 Composants et Arborescence
La recherche de parfums est intégrée à la page catalogue `/fr/parfums` (et ses variantes localisées `/ar/parfums`, `/en/parfums`) via l'arborescence de composants suivante :
- **`CatalogPage` (`web/src/app/[locale]/parfums/page.tsx`)** :
  - Page Server Component (SSG avec `generateStaticParams`).
  - Charge l'ensemble du catalogue côté serveur via `catalog.listProducts({ locale })`.
  - Projette chaque entité `Product` vers une version allégée `ShopProduct` via `toShopProduct()`.
  - Transmet cette liste statique au client via `<ShopExperience products={products} locale={locale} dict={dict} />`.
- **`ShopExperience` (`web/src/app/[locale]/parfums/ShopExperience.tsx`)** :
  - Client Component (`'use client'`).
  - Gère l'état des filtres (`filters`, de type `ShopFilters`, initialisé à `EMPTY_FILTERS`).
  - Orchestre le mélange aléatoire persistant (`shuffleWithSeed` via `useSyncExternalStore`), le filtrage mémoire (`filtered`), la pagination (12 par page) et la synchronisation du paramètre d'URL `?page=`.
- **`FilterSidebar` (`web/src/app/[locale]/parfums/FilterSidebar.tsx`)** :
  - Présente le champ de recherche `<SearchField>` en tête de la colonne latérale sur desktop (dans un conteneur `<div role="search">`), et au-dessus du tiroir modal sur mobile.
  - Champ de type `<input type="search">` avec icône loupe, placeholder internationalisé (`c.filters.searchPlaceholder`), et bouton croix d'effacement conditionnel (`clearLabel`).
  - Appelle directement `onToggle('query', value)` à chaque frappe clavier (`onChange`).
- **`filters.ts` (`web/src/app/[locale]/parfums/filters.ts`)** :
  - Contient la fonction `matchesFilters(product: ShopProduct, filters: ShopFilters): boolean`.
  - Filtre la chaîne de recherche saisie via une fonction locale `normalizeStr()`.

### 1.2 Logique de Filtrage Côté Serveur / Repository
En parallèle du composant client, le repository statique (`web/src/lib/catalog/static-repository.ts`) et la couche Strapi (`strapi-repository.ts`) partagent la logique de `queryProducts` dans `web/src/lib/catalog/query.ts` :
- `matchesSearch(product: Product, term: string): boolean`
  - Normalise via `.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()`.
  - Concatène `product.name`, `product.brand.name`, `product.description`, `product.story` et les noms de notes.
  - Découpe la requête en mots (`split(/\s+/)`) et vérifie que chaque mot est une sous-chaîne (`haystack.includes(word)`).

### 1.3 Sources de Données
- Données brutes : `web/src/data/products.json`, `brands.json`, `notes.json`, `translations.json`.
- Hydratation : `static-repository.ts` hydrate les références de marque et de notes pour former le modèle de domaine `Product`.
- Projections client : `toShopProduct` réduit `Product` en `ShopProduct`.

### 1.4 Debounce, Paramètres d'URL et Interactions
- **Debounce :** Absent. Chaque événement `onChange` de l'input déclenche immédiatement une mise à jour d'état React `setFilters` et un recalcul synchrone du `useMemo` de filtrage.
- **Paramètres d'URL :** Seul le numéro de page (`?page=...`) est reflété dans l'URL. La recherche et les facettes (genre, famille, notes, intensité, saison, humeur) résident dans l'état local du composant `ShopExperience`. Tout changement de recherche ou de filtre réinitialise la pagination à la page 1 via `resetPage()`.
- **Bouton « Mélanger » :** Fonctionne indépendamment via un store externe (`lib/shuffle.ts`). La liste complète est mélangée avant l'application du filtre de recherche, ce qui préserve l'aléa sans remélanger lors de la frappe.

---

## 2. Champs Interrogeables d'un Produit

Actuellement, les champs disponibles dans le modèle de domaine (`Product`) vs la version envoyée au client (`ShopProduct`) se répartissent ainsi :

| Champ Produit | Présent dans `Product` (domaine/serveur) | Présent dans `ShopProduct` (client) | Rôle dans la recherche |
|---|:---:|:---:|---|
| **Nom du parfum** (`name`) | Oui | Oui | Axe prioritaire majeur (poids maximal) |
| **Marque** (`brand.name` / `brand.slug`) | Oui | Oui (`brand.name`) | Axe prioritaire majeur (poids maximal) |
| **Concentration** (`concentration`) | Oui | Non | Filtre et identification des variantes (EDP, EDT, Parfum, Extrait) |
| **Genre** (`gender`) | Oui | Oui | Requêtes transversales (« homme », « femme », « mixte ») |
| **Famille olfactive** (`family`, `secondaryFamilies`, `olfactoryFamilies`) | Oui | Oui | Requêtes génériques (« floral », « boisé », « ambré », etc.) |
| **Notes olfactives** (tête, cœur, fond) | Oui (`notes[].note.name`) | Partiel (`headlineNote`, `noteTags`) | Recherche par ingrédient (« vanille », « oud », « iris », etc.) |
| **Volume** (`variants[].volumeMl`) | Oui | Oui (`volumeMl`) | Identification des déclinaisons (« 50 ml », « 100 ml ») |
| **Badge** (`badge`) | Oui | Oui | Accroche d'édition (« Quintessence », « Fraîcheur ») |
| **Accroche / Headline note** | Oui | Oui (`headlineNote`) | Note dominante mise en avant sur la carte |
| **Description** (`description`) | Oui | Non | Vocabulaire évocateur, univers olfactif |
| **Histoire du flacon** (`story`) | Oui | Non | Storytelling, facettes luxueuses |

---

## 3. Limites du Système Actuel

1. **Tolérance zéro aux fautes de frappe :**
   - Une simple faute de frappe (« sovage », « givanchi », « guerlin », « chanelle », « irezistibl ») renvoie 0 résultat et affiche l'écran vide « Aucun parfum ne correspond ».
2. **Ordre strict et absence de découpage sur le client :**
   - Dans `filters.ts`, la condition `q = normalizeStr(query); if (!n.includes(q) && !b.includes(q)) return false;` exige que la chaîne complète soit une sous-chaîne contiguë du nom ou de la marque. Une recherche telle que « irresistible givenchy » échoue complètement parce que le nom du produit est « Givenchy Irrésistible » et non l'inverse !
3. **Mots collés et mots coupés :**
   - « bleudechanel » ne trouve pas « Bleu de Chanel » ; « sau vage » ne trouve pas « Sauvage ».
4. **Abréviations et acronymes non reconnus :**
   - Des recherches courantes telles que « YSL », « JPG », « D&G », « PR », « EDP », « EDT » ne retournent rien ou uniquement les produits contenant textuellement ces trois lettres.
5. **Absence totale de translittération Arabe & Arabizi :**
   - La clientèle algérienne cherchant en arabe (« ديور », « سوفاج », « شانيل ») ou en arabizi (« 3anbar », etc.) se heurte à un catalogue vide.
6. **Recherche client restreinte au nom et à la marque :**
   - Le composant client `ShopExperience` ne recherche actuellement ni dans les notes, ni dans les concentrations, ni dans les familles, ni dans les descriptions, car `toShopProduct` omettait ces champs et `matchesFilters` ne testait que `product.name` et `product.brand.name`.
7. **Absence de classement par pertinence (scoring) :**
   - Les résultats sont filtrés en binaire (oui/non), puis ordonnés selon le seed de mélange ou le tri sélectionné, sans valoriser les correspondances exactes par rapport aux correspondances partielles.
8. **Absence de suggestion « Vous vouliez dire… ? » :**
   - En cas de faute ou d'échec, aucun rattrapage n'est proposé à l'utilisateur.

---

## 4. Spécifications Cibles et Architecture du Nouveau Moteur

Pour préserver l'architecture existante (filtrage ultra-rapide côté client, rendu statique SSG, aucun appel API additionnel) :

1. **Nouveau module isolé `web/src/lib/search/` :**
   - `normalizer.ts` : minuscules, suppression des diacritiques, ligatures, ponctuation, unification des chiffres et symboles (« & » → « et », « 1 » ↔ « one »).
   - `arabic.ts` : translittération Arabe → Latin et décodage Arabizi vers latin normalisé.
   - `levenshtein.ts` : distance de Damerau-Levenshtein optimisée avec seuils dynamiques selon la taille du mot (1-3 lettres : exact/préfixe ; 4-6 lettres : 1 faute ; 7+ : 2 fautes).
   - `phonetics.ts` : algorithme phonétique adapté au français et à l'anglais pour la parfumerie (guerlain/gerlin, sauvage/sovage, givenchy/givanchi, etc.).
   - `aliases.json` : dictionnaire évolutif des marques, concentrations, genres, termes olfactifs et translittérations arabes.
   - `engine.ts` : moteur unifié de scoring multi-champs (Nom/Marque > Concentration > Famille/Notes > Genre > Badge/Description), détection de préfixe pour la frappe en direct, détection de mots collés/coupés, et algorithme de suggestion « Vous vouliez dire… ? ».
2. **Enrichissement transparent de `ShopProduct` :**
   - Ajout des champs utiles à la recherche (`concentration`, `description`, `notes: string[]`) dans `toShopProduct()` sans impacter l'affichage visuel des cartes.
3. **Mise à niveau de `matchesFilters` & `ShopExperience` :**
   - Intégration du moteur avec classement par score décroissant lorsque `query` est active.
   - Préservation de l'ordre aléatoire / tri lorsque `query` est vide.
   - Affichage de la ligne de suggestion accessible « Vous vouliez dire : ... ? » en cas d'approximation ou de 0 résultat direct avec fallback sur les 4 meilleurs candidats.
4. **Internationalisation :**
   - Clés de suggestion ajoutées dans `fr.json`, `en.json` et `ar.json` en stricte conformité avec `dictionaries.test.ts`.

