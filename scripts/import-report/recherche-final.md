# Rapport Final — Moteur de Recherche Intelligente Dar Safia

Ce rapport documente la mise en place du moteur de recherche intelligente de **Dar Safia**, conçu pour corriger en temps réel les approximations, fautes de frappe, graphies phonétiques, abréviations, écritures arabes et translittérations arabizi des visiteurs.

---

## 1. Architecture de la Solution

Le moteur a été conçu sous forme d'un module TypeScript dédié, totalement isolé, sans dépendance externe lourde : `web/src/lib/search/`.

### Structure Modulaire

```
web/src/lib/search/
├── types.ts          # Interfaces, types de tokens, types de retours, pondérations
├── normalizer.ts     # Suppression diacritiques, casse, ponctuation, unspaced, chiffres
├── arabic.ts         # Détection alphabet arabe, translittération, décodage arabizi (3, 7, 9...)
├── levenshtein.ts    # Damerau-Levenshtein complet (transpositions) avec seuils adaptatifs
├── phonetics.ts      # Algorithme phonétique bilingue (français/anglais) pour la parfumerie
├── aliases.json      # Dictionnaire déclaratif (marques, concentrations, noms cultes, notes)
├── engine.ts         # Indexation en mémoire (WeakMap), tokenisation, scoring, suggestions
├── index.ts          # Façade d'exportation publique
├── search.test.ts    # 60 tests unitaires complets des modules élémentaires
└── real-queries.test.ts # 30 tests des requêtes réelles des clients
```

### Algorithmes & Principes Choisis

1. **Normalisation Unicode & Casse :**
   Décomposition NFD, suppression des diacritiques (`é` → `e`, `ô` → `o`), suppression de la ponctuation et caractères spéciaux (`' - . / &`), passage en minuscules. Les équivalences numériques sont normalisées (`1 million` ↔ `one million`).

2. **Damerau-Levenshtein avec seuil adaptatif de longueur :**
   - Mots de 1 à 3 lettres : distance 0 (exact ou préfixe uniquement, évitant les faux positifs sur les mots courts).
   - Mots de 4 à 6 lettres : distance max 1 (ex. `diore` → `dior`, `sauvgae` → `sauvage`).
   - Mots de 7 lettres et plus : distance max 2.
   Le seuil effectif est toujours borné par la longueur du mot le plus court pour éviter les faux positifs entre termes de longueurs très différentes.

3. **Phonétique adaptée à la parfumerie :**
   Gère les spécificités phonétiques françaises et anglaises : `ph` = `f`, `eau/au/o` = `o`, `ou/u` = `u`, `ai/ei/è/ê` = `e`, `c/s/ç/ss` = `s`, terminaisons muettes (`er`, `ier`, `et`, `s`, `x`, `d`, `t`), consonnes doubles (`nn` = `n`, `ll` = `l`), et les marques emblématiques (`guerlain`/`gerlin`, `givenchy`/`givanchi`, `versace`/`versasse`, `sauvage`/`sovage`).

4. **Transcription Arabe & Arabizi :**
   - Arabe scriptural : détection via plage Unicode `[\u0600-\u06FF]`, translittération phonétique standardisée, suppression des mots contextuels fréquents (`عطر` = parfum).
   - Arabizi : conversion des chiffres représentatifs des lettres arabes (`3` → `aa`/`a`, `7` → `h`, `9` → `q`, `5` → `kh`).

5. **Recherche sans espaces (Mots collés et découpés) :**
   Une version dénuée d'espaces du nom et de la marque (`toUnspaced`) permet de retrouver instantanément des requêtes collées (`bleudechanel`) ou scindées (`sau vage`).

6. **Pondération Multi-champs :**
   Chaque champ possède un poids hiérarchique :
   - Nom du parfum (`name`) : **100**
   - Marque (`brand`) : **100**
   - Concentration (`concentration`) : **50**
   - Famille olfactive (`family`) : **40**
   - Notes (`notes`) : **40**
   - Genre (`gender`) : **30**
   - Badge (`badge`) : **30**
   - Description / Accroche (`description`) : **10**
   
   La qualité de correspondance module le score du champ :
   - Exact : **× 1.0**
   - Préfixe : **× 0.8 à 0.9**
   - Faute d'orthographe (Levenshtein) : **× 0.75** (dégressif selon distance)
   - Phonétique : **× 0.6**
   - Bonus de co-occurrence marque + nom : **+ 100**
   - Bonus de phrase exacte : **+ 150**
   - Pour éviter les faux positifs dans les 254 notes olfactives et descriptions longues, le flou orthographique est réservé aux champs discriminants (nom, marque, famille, concentration, badge).

7. **Suggestions et Repli :**
   - Si une requête présente une faute corrigée, une suggestion accessible `Vous vouliez dire : ... ?` est proposée.
   - En cas d'aucun résultat exact, les 4 produits les plus proches sont affichés en recommandation de repli, accompagnés d'un message d'accompagnement clair.

---

## 2. Fichiers Modifiés & Créés

### Nouveaux fichiers
- `web/src/lib/search/types.ts`
- `web/src/lib/search/normalizer.ts`
- `web/src/lib/search/arabic.ts`
- `web/src/lib/search/levenshtein.ts`
- `web/src/lib/search/phonetics.ts`
- `web/src/lib/search/aliases.json`
- `web/src/lib/search/engine.ts`
- `web/src/lib/search/index.ts`
- `web/src/lib/search/search.test.ts`
- `web/src/lib/search/real-queries.test.ts`
- `scripts/import-report/recherche-audit.md`
- `scripts/import-report/recherche-tests.md`
- `scripts/import-report/recherche-final.md`

### Fichiers existants adaptés avec soin
- `web/src/app/[locale]/parfums/shop-product.ts` : Transmission optionnelle de `concentration`, `description` et `notes` au composant client sans alourdir le bundle.
- `web/src/app/[locale]/parfums/filters.ts` : Séparation propre des facettes (genre, famille, notes, intensité, etc.) du moteur de recherche textuel.
- `web/src/app/[locale]/parfums/ShopExperience.tsx` : Intégration de `searchProducts`, bandeau suggestion accessible avec relance au clic, affichage bienveillant des recommandations en cas d'absence de résultat.
- `web/src/lib/catalog/query.ts` : Remplacement du matching naïf par `searchProducts`.
- `web/src/lib/i18n/dictionaries/fr.json`, `en.json`, `ar.json` : Ajout des clés i18n trilingues (`didYouMean`, `fallbackTitle`).

---

## 3. Résultats du Jeu de Test (30 Requêtes Réelles)

- **Taux de succès Top 3 :** **100 % (30 / 30)** *(objectif minimal fixé : 90 %)*
- **Taux de succès Rang 1 (Top 1) :** **100 % (30 / 30)**
- **Performance moyenne :** **< 15 ms** sur l'ensemble des 249 parfums du catalogue (grâce à l'indexation mémoïsée par `WeakMap`).
- **Tests unitaires et d'intégration :** **15 suites de test / 207 tests au vert (0 échec)**.

---

## 4. Limites Connues

1. **Requêtes en langage naturel complexe :** Les phrases composées comme *"quelque chose qui ressemble à un parfum d'été léger pour soirée"* ne sont pas analysées par un modèle sémantique de type NLP ; elles doivent être recherchées via les facettes (Saison = Été, Occasion = Soirée).
2. **Reconnaissance optique ou vocale :** Le moteur traite exclusivement le texte brut saisi au clavier.
3. **Mots vides très fréquents :** Les stop-words ("le", "la", "de", "pour") sont filtrés ou gérés dans les n-grams, mais des listes de stop-words très atypiques pourraient nécessiter un enrichissement.

---

## 5. Comment Enrichir Facilement le Dictionnaire

Le fichier `web/src/lib/search/aliases.json` est le cœur déclaratif du moteur. Aucune modification de code TypeScript n'est requise pour enrichir les alias.

### Structure de `aliases.json`

```json
{
  "brands": {
    "abréviation_ou_faute": "nom officiel normalisé"
  },
  "concentrations": {
    "edp": "eau de parfum"
  },
  "genders": {
    "homme": "homme",
    "men": "homme"
  },
  "popularNames": {
    "terme_populaire": "nom canonique du parfum"
  },
  "notesAndFamilies": {
    "synonyme_note": "nom officiel de la note"
  }
}
```

### Exemples d'ajouts futurs
- Pour ajouter une nouvelle marque (ex. *Maison Francis Kurkdjian*) :
  ```json
  "mfk": "maison francis kurkdjian",
  "kurkdjian": "maison francis kurkdjian"
  ```
- Pour ajouter un nouveau nom culte (ex. *Baccarat Rouge 540*) :
  ```json
  "br540": "baccarat rouge 540",
  "baccarat": "baccarat rouge 540"
  ```
- Pour ajouter un nom arabe ou une translittération :
  Ajouter l'entrée directement dans `popularNames` ou `brands`, le normaliseur se charge du reste.

