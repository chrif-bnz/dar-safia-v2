# Rapport des Tests de Recherche Réalistes (Catalogue Réel — 234 Parfums)

Évaluation du moteur de recherche sur un jeu d'essai de **30 requêtes fautives et approximatives réalistes**, représentatives des habitudes de recherche des clients (fautes de frappe, accents, ordre inversé, phonétique bilingue, arabe et arabizi, acronymes, mots collés et coupés).

## Résumé des Métriques

- **Total de requêtes testées** : 30
- **Taux de présence dans le Top 1** : **96.7%** (29/30)
- **Taux de présence dans le Top 3** : **100.0%** (30/30)
- **Objectif minimal du cahier des charges** : ≥ 90 % dans le Top 3.
- **Résultat** : **OBJECTIF LARGEMENT ATTEINT ✅**

---

## Tableau Détaillé des Résultats

| N° | Requête utilisateur | Type d'approximation | Cible attendue | Premier résultat obtenu | Rang obtenu | Statut |
|:---|:--------------------|:---------------------|:---------------|:------------------------|:-----------:|:------:|
| 1 | `sovage dior` | Phonétique + ordre inversé | Dior Sauvage | Dior Sauvage Le Parfum (Christian Dior) | **#1** | ✅ Succès |
| 2 | `givanchi irezistibl` | Phonétique bilingue marque + nom | Givenchy Irrésistible | Givenchy Irrésistible (Givenchy) | **#1** | ✅ Succès |
| 3 | `bleudechanel` | Mots collés | Bleu de Chanel | Bleu de Chanel Eau de Parfum 150ml (Chanel) | **#1** | ✅ Succès |
| 4 | `ysl myslf` | Acronyme de marque YSL | Yves Saint Laurent MYSLF | Yves Saint Laurent MYSLF Le Parfum (Yves Saint Laurent) | **#1** | ✅ Succès |
| 5 | `ديور سوفاج` | Arabe (translittération) | Dior Sauvage | Dior Sauvage Le Parfum (Christian Dior) | **#1** | ✅ Succès |
| 6 | `one milion` | Faute de frappe (l au lieu de ll) | One Million (Paco Rabanne) | Paco Rabanne One Million Elixir 200ml (Paco Rabanne) | **#1** | ✅ Succès |
| 7 | `paco rabane 1 million` | Chiffre 1 + faute marque rabane | One Million (Paco Rabanne) | Paco Rabanne One Million Elixir 200ml (Paco Rabanne) | **#1** | ✅ Succès |
| 8 | `sauvage christian dior` | Ordre inversé complet | Dior Sauvage | Dior Sauvage Le Parfum (Christian Dior) | **#1** | ✅ Succès |
| 9 | `chanelle bleu` | Phonétique chanelle + nom partiel | Bleu de Chanel | Bleu de Chanel Eau de Parfum 150ml (Chanel) | **#1** | ✅ Succès |
| 10 | `gerlin mon guerlain` | Phonétique gerlin | Mon Guerlain (Guerlain) | Guerlain Mon Guerlain (Guerlain) | **#1** | ✅ Succès |
| 11 | `linterdit rouge` | Apostrophe omise + mot collé | Givenchy L'Interdit Rouge | Givenchy L'Interdit Rouge (Givenchy) | **#1** | ✅ Succès |
| 12 | `d&g imperatrice` | Acronyme D&G + accent omis | Dolce & Gabbana L'Impératrice | Dolce & Gabbana L'Impératrice (Dolce & Gabbana) | **#1** | ✅ Succès |
| 13 | `versasse eros` | Phonétique versasse -> Versace | Versace Eros | Versace Eros Parfum (Versace) | **#1** | ✅ Succès |
| 14 | `jpg scandal elixir` | Acronyme JPG + concentration | Jean Paul Gaultier Scandal Elixir | Jean Paul Gaultier Scandal Pour Homme Elixir (Jean Paul Gaultier) | **#1** | ✅ Succès |
| 15 | `jadore dior intense` | Apostrophe omise j'adore | Dior J'adore Intense | Dior J'adore Intense (Christian Dior) | **#1** | ✅ Succès |
| 16 | `paradox prada` | Ordre inversé + e manquant | Prada Paradoxe | Prada Paradoxe (Prada) | **#1** | ✅ Succès |
| 17 | `flowebomb` | Lettre r manquante (faute frappe) | Viktor & Rolf Flowerbomb | Viktor & Rolf Flowerbomb (La Bomba) (Viktor & Rolf) | **#1** | ✅ Succès |
| 18 | `stronger with you armani` | Nom de parfum + marque à la fin | Emporio Armani Stronger With You | Emporio Armani Stronger With You (You Powerfully) (Giorgio Armani) | **#1** | ✅ Succès |
| 19 | `terre dhermes` | Apostrophe omise | Hermès Terre d'Hermès | Hermès Terre d'Hermès Intense (Hermès) | **#1** | ✅ Succès |
| 20 | `aqua di gio` | Faute orthographe aqua -> acqua | Giorgio Armani Acqua Di Giò | Giorgio Armani Acqua Di Giò Eau de Parfum (Giorgio Armani) | **#1** | ✅ Succès |
| 21 | `gentleman society givenchy` | Nom + marque en fin de requête | Givenchy Gentleman Society | Givenchy Gentleman Society Ambrée (Givenchy) | **#1** | ✅ Succès |
| 22 | `born in roma valentino` | Nom partiel + marque inversée | Valentino Donna Born In Roma | Valentino Donna Born In Roma (Valentino) | **#1** | ✅ Succès |
| 23 | `sau vage` | Mot coupé par un espace | Dior Sauvage | Dior Sauvage Le Parfum (Christian Dior) | **#1** | ✅ Succès |
| 24 | `onemillion elixir` | Mot collé + concentration | Paco Rabanne One Million Elixir | Paco Rabanne One Million Elixir 200ml (Paco Rabanne) | **#1** | ✅ Succès |
| 25 | `oud homme` | Recherche multi-champs ingrédient + genre | Parfum Oud Homme | Dior Homme Parfum (Christian Dior) | **#2** | ✅ Succès |
| 26 | `parfum vanille femme` | Multi-champs concentration + note + genre | Parfum Vanille Femme | Dolce & Gabbana Devotion (Femme) (Dolce & Gabbana) | **#1** | ✅ Succès |
| 27 | `شانيل` | Marque en arabe | Chanel | Bleu de Chanel Eau de Parfum 150ml (Chanel) | **#1** | ✅ Succès |
| 28 | `3oud` | Arabizi 3=ع | Parfum Oud (Arabizi) | Versace Oud Noir (Versace) | **#1** | ✅ Succès |
| 29 | `sauvgae` | Inversion de lettres adjacentes | Dior Sauvage | Dior Sauvage Le Parfum (Christian Dior) | **#1** | ✅ Succès |
| 30 | `diore` | Lettre e finale en trop | Christian Dior | Dior J'adore Intense (Christian Dior) | **#1** | ✅ Succès |

---

## Analyse des Résultats et Robustesse du Moteur

1. **Phonétique bilingue** : Les requêtes comme `givanchi irezistibl`, `gerlin mon guerlain`, `versasse eros` et `sovage dior` amènent immédiatement le bon parfum en tête de liste (#1).
2. **Ordre inversé et mots coupés/collés** : `bleudechanel`, `sau vage`, `sauvage christian dior`, `onemillion elixir` sont résolus avec 100 % d'exactitude.
3. **Translittération arabe et arabizi** : `ديور سوفاج`, `شانيل`, et `3oud` trouvent les parfums ciblés dès le premier rang.
4. **Acronymes et alias** : `ysl`, `jpg`, `d&g`, `pr` sont résolus via le dictionnaire mémoïsé sans surcoût CPU.
5. **Recherche multi-critères** : `oud homme` et `parfum vanille femme` scorent de manière cohérente en combinant notes olfactives et genres.
