# Plan d'importation des parfums — Dar Safia v2

**Date d'analyse :** 2026-10-14  
**Branche git dédiée :** `import-parfums`  
**Source :** `perfumes/liste-parfums.txt` (236 lignes)  
**État du site :** 45 parfums existants inchangés

---

## Résumé exécutif

| Statut | Nombre | Description |
|---|---|---|
| **À créer** | **177** | Parfums inédits prêts pour l'étape de recherche web, enrichissement éditorial et association visuelle |
| **Déjà présents (ignorés)** | **32** | Doublons stricts avec le catalogue existant (marque + nom + concentration identiques) |
| **Ambigus / À vérifier** | **27** | Prix aberrant (Juniper Sling), lignes sans contenance, références à vérifier et variantes de contenance |
| **TOTAL** | **236** | Totalité des lignes de la liste fournie |

---

## 1. Déjà présents sur le site (32 ignorés)

Ces parfums sont déjà en vente sur la boutique sous la même concentration et déclinaison. Conformément à la Règle n°2, ils ne seront **ni recréés, ni modifiés**.

| Ligne | Section | Entrée liste | Correspondance catalogue existant | Prix liste | Prix site |
|---|---|---|---|---|---|
| L7 | FEMME | My Burberry Blush Eau de Parfum 90 ml | #11 Burberry — My Burberry Blush (Eau de Parfum) | 21 000 DA | 15500 DA |
| L12 | FEMME | Mademoiselle Rochas Eau de Parfum 90 ml | #20 Rochas — Mademoiselle Rochas (Eau de Parfum) | 15 500 DA | 9800 DA |
| L33 | FEMME | Jean Paul Gaultier Divine Couture Eau de Parfum 100 ml | #17 Jean Paul Gaultier — Jean Paul Gaultier Divine Couture (Eau de Parfum) | 29 000 DA | 23800 DA |
| L37 | FEMME | Valentino Donna Born in Roma Eau de Parfum 100 ml | #3 Valentino — Valentino Donna Born In Roma (Eau de Parfum) | 28 500 DA | 24800 DA |
| L38 | FEMME | Valentino Donna Born in Roma Intense Eau de Parfum 100 ml | #4 Valentino — Valentino Donna Born In Roma Intense (Eau de Parfum Intense) | 29 900 DA | 26800 DA |
| L43 | FEMME | D&G Devotion Eau de Parfum 100 ml | #9 Dolce & Gabbana — Dolce & Gabbana Devotion (Femme) (Eau de Parfum) | 27 000 DA | 13900 DA |
| L53 | FEMME | Givenchy L’Interdit Rouge Eau de Parfum 80 ml | #13 Givenchy — Givenchy L'Interdit Rouge (Eau de Parfum) | 27 000 DA | 21000 DA |
| L54 | FEMME | Givenchy L’Interdit Rouge Ultime Eau de Parfum 80 ml | #14 Givenchy — Givenchy L'Interdit Rouge Ultime (Eau de Parfum) | 28 500 DA | 22500 DA |
| L57 | FEMME | Guerlain L’Instant de Guerlain Eau de Parfum 75 ml | #18 Guerlain — L'Instant de Guerlain Femme (Eau de Parfum) | 21 000 DA | 13900 DA |
| L62 | FEMME | Rabanne Fame in Love Parfum Elixir 80 ml | #5 Paco Rabanne — Rabanne Fame In Love (Parfum) | 30 000 DA | 22800 DA |
| L64 | FEMME | Lancôme Idôle Peach ‘n Roses Eau de Parfum Fruité 100 ml | #6 Lancôme — Lancôme Idôle Peach & Rose (Eau de Parfum) | 30 000 DA | 22800 DA |
| L66 | FEMME | D&G L’Impératrice Eau de Toilette 100 ml | #19 Dolce & Gabbana — Dolce & Gabbana L'Impératrice (Eau de Toilette) | 12 500 DA | 9800 DA |
| L72 | FEMME | Rochas Audace Eau de Parfum 90 ml | #8 Rochas — Rochas Audace (Eau de Parfum) | 18 000 DA | 12800 DA |
| L76 | HOMME | D&G King Eau de Parfum 200 ml | #40 Dolce & Gabbana — Dolce & Gabbana K (King) 200ml Eau de Parfum (Eau de Parfum) | 25 000 DA | 18500 DA |
| L81 | HOMME | D&G The One Eau de Parfum Intense 100 ml | #42 Dolce & Gabbana — Dolce & Gabbana The One Eau de Parfum Intense (Eau de Parfum Intense) | 21 000 DA | 14500 DA |
| L87 | HOMME | Azzaro Wanted by Night Eau de Parfum 100 ml | #45 Azzaro — Azzaro Wanted by Night (Eau de Parfum) | 19 500 DA | 14800 DA |
| L102 | HOMME | Invictus Victory Elixir 100 ml | #31 Paco Rabanne — Paco Rabanne Invictus Victory Elixir (Eau de Parfum Intense) | 25 000 DA | 22800 DA |
| L108 | HOMME | Yves Saint Laurent MYSLF Le Parfum 100 ml | #32 Yves Saint Laurent — Yves Saint Laurent MYSLF Le Parfum (Parfum) | 29 800 DA | 23800 DA |
| L109 | HOMME | Yves Saint Laurent MYSLF Eau de Parfum 100 ml | #33 Yves Saint Laurent — Yves Saint Laurent MYSLF Eau de Parfum (Eau de Parfum) | 24 800 DA | 20500 DA |
| L110 | HOMME | Yves Saint Laurent La Nuit de L’Homme Eau de Parfum | #34 Yves Saint Laurent — Yves Saint Laurent La Nuit de L'Homme Eau de Parfum (Eau de Parfum) | 26 000 DA | 21000 DA |
| L113 | HOMME | Givenchy Gentleman Eau de Parfum 100 ml | #29 Givenchy — Givenchy Gentleman Eau de Parfum (Eau de Parfum) | 20 500 DA | 16200 DA |
| L116 | HOMME | Givenchy Gentleman Society Ambrée Eau de Parfum 100 ml | #23 Givenchy — Givenchy Gentleman Society Ambrée (Eau de Parfum) | 27 500 DA | 20500 DA |
| L122 | HOMME | Emporio Armani Stronger With You Powerfully Eau de Parfum 100 ml | #22 Giorgio Armani — Emporio Armani Stronger With You (You Powerfully) (Eau de Parfum) | 26 800 DA | 21000 DA |
| L123 | HOMME | Giorgio Armani Acqua di Giò Eau de Parfum | #28 Giorgio Armani — Giorgio Armani Acqua Di Giò Eau de Parfum (Eau de Parfum) | 25 000 DA | 18800 DA |
| L125 | HOMME | Terre d’Hermès Eau de Parfum Intense 100 ml | #27 Hermès — Hermès Terre d'Hermès Intense (Non spécifiée) | 25 800 DA | 18800 DA |
| L137 | HOMME | Jean Paul Gaultier Scandal Intense 150 ml | #44 Jean Paul Gaultier — Jean Paul Gaultier Scandal Intense 150ml (Eau de Parfum Intense) | 29 000 DA | 24800 DA |
| L138 | HOMME | Jean Paul Gaultier Scandal Absolu 100 ml | #43 Jean Paul Gaultier — Jean Paul Gaultier Scandal Absolu (Parfum) | 26 500 DA | 20500 DA |
| L140 | HOMME | Jean Paul Gaultier Scandal Elixir 100 ml | #24 Jean Paul Gaultier — Jean Paul Gaultier Scandal Pour Homme Elixir (Parfum) | 31 000 DA | 23500 DA |
| L163 | HOMME | Lacoste Booster Eau de Toilette 125 ml | #41 Lacoste — Lacoste Booster (Eau de Toilette) | 13 000 DA | 9200 DA |
| L190 | HOMME | Dior Sauvage Parfum 100 ml | #38 Christian Dior — Dior Sauvage Le Parfum (Parfum) | 31 000 DA | 25800 DA |
| L191 | HOMME | Dior Sauvage Elixir 60 ml et 100 ml | #39 Christian Dior — Dior Sauvage Elixir 100ml (Elixir) | 32 500 DA | 39000 DA |
| L216 | HOMME | Kenzo Homme Indigo Eau de Parfum 110 ml | #37 Kenzo — Kenzo Homme Indigo / Santal Marin (Eau de Parfum) | 22 000 DA | 12800 DA |

---

## 2. Cas ambigus et à vérifier (27 éléments)

Ces éléments nécessitent un arbitrage ou une vérification avant toute publication :

### A. Prix manifestement erroné (1 produit bloqué)
- **L242** : `Penhaligon’s Juniper Sling Eau de Toilette 100 ml — 550 000 DA`  
  *Constat :* Prix 10 fois supérieur à la valeur marchande (vraisemblablement une faute de frappe pour 55 000 DA).  
  *Action :* **Non importé en Phase 2**. Prix recommandé après vérification marché : **52 000 DA** ou **55 000 DA**.

### B. Lignes sans contenance indiquée (13 produits)
Ces produits n'indiquent aucun volume en millilitres dans la liste brute (2 autres lignes sans contenance correspondent à des doublons déjà présents sur le site : L110 et L123). Une contenance standard du flacon de référence a été identifiée pour chacun :
- **L78** [HOMME] `D&G King Eau de Parfum Intense — 20 500 DA` → *Contenance standard proposée :* **100 ml**
- **L85** [HOMME] `Azzaro The Most Wanted Eau de Parfum Intense — 19 800 DA` → *Contenance standard proposée :* **100 ml**
- **L92** [HOMME] `Valentino Uomo Born in Roma Extra Dose — 29 800 DA` → *Contenance standard proposée :* **100 ml**
- **L111** [HOMME] `Yves Saint Laurent La Nuit de L’Homme Le Parfum — 28 000 DA` → *Contenance standard proposée :* **100 ml**
- **L221** [NICHE] `YSL 37 Rue de Bellechasse Oud-Élémi — 85 000 DA` → *Contenance standard proposée :* **125 ml**
- **L224** [NICHE] `Nishane Hacivat Extrait de Parfum — 49 000 DA` → *Contenance standard proposée :* **100 ml (ou 50 ml)**
- **L227** [NICHE] `Roméo Bejar Anima Viva Extrait de Parfum — 150 000 DA` → *Contenance standard proposée :* **100 ml**
- **L228** [NICHE] `Unique’e Luxury Ocean the Rive — 55 000 DA` → *Contenance standard proposée :* **100 ml**
- **L229** [NICHE] `Louboutin Hiristan — 45 000 DA` → *Contenance standard proposée :* **100 ml**
- **L232** [NICHE] `Dubai Meydan Eau de Parfum — 46 000 DA` → *Contenance standard proposée :* **100 ml**
- **L244** [NICHE] `Amouage Guidance — 85 000 DA` → *Contenance standard proposée :* **100 ml**
- **L246** [NICHE] `Amouage Lustre — 78 000 DA` → *Contenance standard proposée :* **100 ml**
- **L250** [NICHE] `Penhaligon’s The Coveted Duchess Rose — 42 000 DA` → *Contenance standard proposée :* **75 ml**

### C. Références orthographiques et appellations atypiques
- **L41** : `Power of You pour Femme Eau de Parfum 90 ml — 29 000 DA`  
  *Note :* Référence inhabituelle (« Power of You pour Femme ») — Vérifier s'il s'agit d'Emporio Armani Because It's You ou d'une marque indépendante
- **L252** : `YSL Wild Leather Accord Cuir Goic Eau de Parfum 75 ml — 42 000 DA`  
  *Note :* Orthographe altérée dans la liste (« Cuir Goic » au lieu de Cuir / Wild Leather YSL Le Vestiaire)

### D. Variantes de contenance dans la liste (11 éléments)
Plusieurs lignes de la liste concernent le même parfum dans des contenances différentes. Le modèle de données du site supporte un tableau `variants`, mais le gabarit de fiche actuel (`ProductPage`) affiche la première variante sans sélecteur déroulant.
- **L50** : `Gucci Bloom Eau de Parfum 100 ml — 20 500 DA`  
  *Note :* Variante de contenance du parfum ligne 47 (Gucci Bloom Eau de Parfum 50 ml) : format 100 ml à 20500 DA — Le site gérant une seule variante par fiche dans le gabarit actuel, à regrouper ou créer en fiche distincte
- **L69** : `My Burberry Black Parfum 50 ml — 15 800 DA`  
  *Note :* Variante de contenance du parfum ligne 10 (My Burberry Black Parfum 90 ml) : format 50 ml à 15800 DA — Le site gérant une seule variante par fiche dans le gabarit actuel, à regrouper ou créer en fiche distincte
- **L144** : `Burberry Hero Eau de Toilette 150 ml — 19 800 DA`  
  *Note :* Variante de contenance du parfum ligne 143 (Burberry Hero Eau de Toilette 100 ml) : format 150 ml à 19800 DA — Le site gérant une seule variante par fiche dans le gabarit actuel, à regrouper ou créer en fiche distincte
- **L146** : `Burberry Hero Eau de Parfum 150 ml — 24 000 DA`  
  *Note :* Variante de contenance du parfum ligne 145 (Burberry Hero Eau de Parfum 100 ml) : format 150 ml à 24000 DA — Le site gérant une seule variante par fiche dans le gabarit actuel, à regrouper ou créer en fiche distincte
- **L157** : `Paco Rabanne One Million Parfum 200 ml — 28 500 DA`  
  *Note :* Variante de contenance du parfum ligne 155 (Paco Rabanne One Million Parfum 100 ml) : format 200 ml à 28500 DA — Le site gérant une seule variante par fiche dans le gabarit actuel, à regrouper ou créer en fiche distincte
- **L171** : `Hugo Man Eau de Toilette 200 ml — 17 000 DA`  
  *Note :* Variante de contenance du parfum ligne 170 (Hugo Man Eau de Toilette 125 ml) : format 200 ml à 17000 DA — Le site gérant une seule variante par fiche dans le gabarit actuel, à regrouper ou créer en fiche distincte
- **L194** : `Dior Homme Intense Eau de Parfum 150 ml — 36 000 DA`  
  *Note :* Variante de contenance du parfum ligne 193 (Dior Homme Intense Eau de Parfum 100 ml) : format 150 ml à 36000 DA — Le site gérant une seule variante par fiche dans le gabarit actuel, à regrouper ou créer en fiche distincte
- **L197** : `Bleu de Chanel Eau de Parfum 100 ml — 39 000 DA`  
  *Note :* Variante de contenance du parfum ligne 196 (Bleu de Chanel Eau de Parfum 150 ml) : format 100 ml à 39000 DA — Le site gérant une seule variante par fiche dans le gabarit actuel, à regrouper ou créer en fiche distincte
- **L199** : `Bleu de Chanel Parfum 150 ml — 46 000 DA`  
  *Note :* Variante de contenance du parfum ligne 198 (Bleu de Chanel Parfum 100 ml) : format 150 ml à 46000 DA — Le site gérant une seule variante par fiche dans le gabarit actuel, à regrouper ou créer en fiche distincte
- **L201** : `Dior Homme Édition Blanche Eau de Parfum 150 ml — 41 000 DA`  
  *Note :* Variante de contenance du parfum ligne 200 (Dior Homme Édition Blanche Eau de Parfum 100 ml) : format 150 ml à 41000 DA — Le site gérant une seule variante par fiche dans le gabarit actuel, à regrouper ou créer en fiche distincte
- **L213** : `D&G The One Eau de Parfum 150 ml — 25 000 DA`  
  *Note :* Variante de contenance du parfum ligne 80 (D&G The One Eau de Parfum 100 ml) : format 150 ml à 25000 DA — Le site gérant une seule variante par fiche dans le gabarit actuel, à regrouper ou créer en fiche distincte

---

## 3. Parfums à créer (177 produits)

Ces parfums seront intégrés par lots de 20 lors de la Phase 2 (avec recherche web systématique des pyramides olfactives, famille, tenue, sillage, rédaction éditoriale exclusive et attribution d'image autorisée).

| # | Ligne | Section | Marque | Nom & Concentration | Volume | Prix (DA) |
|---|---|---|---|---|---|---|
| 1 | L5 | FEMME | Elie Saab | Elie Saab Eau de Parfum | 90 ml | 22 900 DA |
| 2 | L6 | FEMME | Gucci | Gucci Bloom Ambrosia d’Or Eau de Parfum | 100 ml | 26 500 DA |
| 3 | L8 | FEMME | Hermès | Jour d’Hermès Absolu Eau de Parfum | 85 ml | 21 000 DA |
| 4 | L9 | FEMME | Gucci | Gucci Bloom Eau de Toilette | 100 ml | 19 000 DA |
| 5 | L10 | FEMME | Burberry | My Burberry Black Parfum | 90 ml | 21 000 DA |
| 6 | L11 | FEMME | Paco Rabanne | Fame Intense Rabanne Eau de Parfum Intense | 80 ml | 28 000 DA |
| 7 | L13 | FEMME | Burberry | My Burberry Black Eau de Parfum | 90 ml | 23 000 DA |
| 8 | L14 | FEMME | Givenchy | Givenchy Irrésistible Rose Velvet Eau de Parfum | 80 ml | 23 500 DA |
| 9 | L15 | FEMME | Chloé | Chloé Rose Tangerine Eau de Toilette | 75 ml | 18 500 DA |
| 10 | L16 | FEMME | Elie Saab | Girl of Now Elie Saab Eau de Parfum | 90 ml | 19 800 DA |
| 11 | L17 | FEMME | Montblanc | Montblanc Signature Eau de Parfum | 90 ml | 14 000 DA |
| 12 | L18 | FEMME | Giorgio Armani | Armani Sì Passione Eau de Parfum | 100 ml | 26 000 DA |
| 13 | L19 | FEMME | Dolce & Gabbana | D&G Candied Cherry Jasmine Vanilla Parfum | 100 ml | 24 000 DA |
| 14 | L20 | FEMME | Hugo Boss | Boss The Scent Private Accord Eau de Parfum | 100 ml | 14 000 DA |
| 15 | L21 | FEMME | Mugler | Mugler Alien Eau de Parfum | 90 ml | 24 000 DA |
| 16 | L22 | FEMME | Jean Paul Gaultier | Scandal Intense Eau de Parfum | 80 ml | 28 500 DA |
| 17 | L23 | FEMME | Versace | Versace Crystal Noir pour Femme Eau de Parfum | 90 ml | 20 500 DA |
| 18 | L24 | FEMME | Givenchy | Givenchy Irrésistible Nectar Eau de Parfum | 80 ml | 25 000 DA |
| 19 | L25 | FEMME | Dolce & Gabbana | D&G Dark Cherry Heliotrope Amber Eau de Parfum Intense | 100 ml | 25 000 DA |
| 20 | L26 | FEMME | Cerruti | Cerruti 1881 pour Femme Eau de Toilette | 100 ml | 10 000 DA |
| 21 | L27 | FEMME | Lanvin | Lanvin Éclat d’Arpège Eau de Parfum | 100 ml | 13 000 DA |
| 22 | L28 | FEMME | Guerlain | Guerlain Mon Guerlain Eau de Parfum | 100 ml | 24 800 DA |
| 23 | L29 | FEMME | Elie Saab | Elie Saab Le Parfum Essentiel Eau de Parfum | 90 ml | 20 000 DA |
| 24 | L30 | FEMME | Nina Ricci | Nina Ricci Premier Jour Eau de Parfum | 100 ml | 13 000 DA |
| 25 | L31 | FEMME | Roberto Cavalli | Roberto Cavalli Paradiso Eau de Parfum | 75 ml | 11 000 DA |
| 26 | L32 | FEMME | Givenchy | Givenchy Irrésistible Nude Velvet | 80 ml | 24 500 DA |
| 27 | L34 | FEMME | Jean Paul Gaultier | Jean Paul Gaultier La Belle Eau de Parfum | 100 ml | 26 000 DA |
| 28 | L35 | FEMME | Chloé | Chloé Rose Naturelle Eau de Parfum | 50 ml | 15 500 DA |
| 29 | L36 | FEMME | Chloé | Chloé Nomade Eau de Parfum | 50 ml | 15 500 DA |
| 30 | L39 | FEMME | Elie Saab | Elie Saab Le Parfum Royal Eau de Parfum | 90 ml | 17 000 DA |
| 31 | L40 | FEMME | Roberto Cavalli | Roberto Cavalli Florence Eau de Parfum | 75 ml | 12 800 DA |
| 32 | L42 | FEMME | Versace | Versace Bright Crystal Absolu pour Femme Eau de Parfum | 90 ml | 20 000 DA |
| 33 | L44 | FEMME | Hugo Boss | Boss Ma Vie Eau de Parfum | 75 ml | 13 000 DA |
| 34 | L45 | FEMME | Hugo Boss | Boss Femme Eau de Parfum | 75 ml | 13 000 DA |
| 35 | L46 | FEMME | Gucci | Gucci Bamboo Eau de Parfum | 50 ml | 15 500 DA |
| 36 | L47 | FEMME | Gucci | Gucci Bloom Eau de Parfum | 50 ml | 15 800 DA |
| 37 | L48 | FEMME | Gucci | Gucci Bloom Eau de Parfum Intense | 50 ml | 15 800 DA |
| 38 | L49 | FEMME | Gucci | Gucci Flora Gorgeous Gardenia Eau de Parfum | 50 ml | 16 000 DA |
| 39 | L51 | FEMME | Givenchy | Givenchy L’Interdit Parfum | 80 ml | 26 800 DA |
| 40 | L52 | FEMME | Paco Rabanne | Paco Rabanne Olympéa Flora Eau de Parfum Intense | 80 ml | 23 000 DA |
| 41 | L55 | FEMME | Marc Jacobs | Marc Jacobs Daisy Eau de Toilette | 100 ml | 17 000 DA |
| 42 | L56 | FEMME | Narciso Rodriguez | Narciso Rodriguez For Her Eau de Parfum | 100 ml | 24 000 DA |
| 43 | L58 | FEMME | Givenchy | Givenchy L’Interdit Eau de Parfum | 125 ml | 29 000 DA |
| 44 | L59 | FEMME | Chloé | Chloé Love Story Eau de Parfum | 75 ml | 20 500 DA |
| 45 | L60 | FEMME | Christian Dior | Dior J’adore L’Or Essence de Parfum | 50 ml | 34 000 DA |
| 46 | L61 | FEMME | Christian Dior | Dior J’adore Intense Parfum | 100 ml | 38 000 DA |
| 47 | L63 | FEMME | Narciso Rodriguez | Narciso Rodriguez Poudrée Eau de Parfum | 90 ml | 23 000 DA |
| 48 | L65 | FEMME | Lancôme | Lancôme Idôle Travel Exclusive Eau de Parfum | 100 ml + 10 ml | 28 500 DA |
| 49 | L67 | FEMME | Givenchy | Givenchy Ange ou Démon Le Secret Eau de Parfum | 100 ml | 25 800 DA |
| 50 | L68 | FEMME | Christian Dior | Miss Dior Parfum | 50 ml | 25 000 DA |
| 51 | L70 | FEMME | Giorgio Armani | Armani Sì Eau de Parfum Intense | 100 ml | 29 500 DA |
| 52 | L71 | FEMME | Hugo Boss | Hugo Woman Eau de Toilette | 100 ml | 11 800 DA |
| 53 | L73 | FEMME | Narciso Rodriguez | Narciso Rodriguez For Her Pure Musc Eau de Parfum | 100 ml | 24 000 DA |
| 54 | L77 | HOMME | Dolce & Gabbana | D&G King Parfum | 100 ml | 22 000 DA |
| 55 | L79 | HOMME | Dolce & Gabbana | D&G Intenso Eau de Parfum | 125 ml | 19 800 DA |
| 56 | L80 | HOMME | Dolce & Gabbana | D&G The One Eau de Parfum | 100 ml | 19 500 DA |
| 57 | L82 | HOMME | Dolce & Gabbana | D&G The One Le Parfum | 100 ml | 24 000 DA |
| 58 | L83 | HOMME | Dolce & Gabbana | D&G Devotion Eau de Parfum | 100 ml | 22 000 DA |
| 59 | L84 | HOMME | Dolce & Gabbana | D&G Devotion Parfum | 100 ml | 24 000 DA |
| 60 | L86 | HOMME | Azzaro | Azzaro The Most Wanted Parfum | 100 ml | 20 500 DA |
| 61 | L88 | HOMME | Azzaro | Azzaro Wanted Forever Elixir | 100 ml | 20 000 DA |
| 62 | L89 | HOMME | Cartier | Cartier Déclaration Parfum | 100 ml | 25 500 DA |
| 63 | L90 | HOMME | Cartier | Cartier Déclaration Eau de Parfum | 100 ml | 26 500 DA |
| 64 | L91 | HOMME | Valentino | Valentino Uomo Born in Roma Intense | 100 ml | 27 800 DA |
| 65 | L95 | HOMME | Hermès | Hermès H24 Eau de Toilette | 100 ml | 16 800 DA |
| 66 | L96 | HOMME | Hermès | Hermès H24 Eau de Parfum | 100 ml | 19 000 DA |
| 67 | L97 | HOMME | Hermès | Hermès H24 Herbes Vives | 100 ml | 23 000 DA |
| 68 | L98 | HOMME | Montblanc | Montblanc Explorer Eau de Parfum | 100 ml | 14 000 DA |
| 69 | L99 | HOMME | Montblanc | Montblanc Explorer Ultra Blue Eau de Parfum | 100 ml | 14 000 DA |
| 70 | L100 | HOMME | Montblanc | Montblanc Explorer Extrême Parfum | 100 ml | 16 800 DA |
| 71 | L101 | HOMME | Paco Rabanne | Invictus Elixir | 100 ml | 27 900 DA |
| 72 | L103 | HOMME | Paco Rabanne | Invictus Victory Absolu | 100 ml | 26 000 DA |
| 73 | L104 | HOMME | Boucheron | Boucheron Singulier | 100 ml | 12 000 DA |
| 74 | L105 | HOMME | Versace | Versace Oud Noir Eau de Parfum | 100 ml | 19 800 DA |
| 75 | L106 | HOMME | Versace | Versace Eros Parfum | 100 ml | 21 000 DA |
| 76 | L107 | HOMME | Versace | Versace Eros Eau de Parfum | 200 ml | 25 000 DA |
| 77 | L112 | HOMME | Givenchy | Givenchy Gentleman Eau de Toilette | 100 ml | 22 500 DA |
| 78 | L114 | HOMME | Givenchy | Givenchy Gentleman Eau de Parfum Boisée | 100 ml | 20 500 DA |
| 79 | L115 | HOMME | Givenchy | Givenchy Gentleman Réserve Privée Eau de Parfum | 100 ml | 22 800 DA |
| 80 | L117 | HOMME | Givenchy | Givenchy Gentleman Society Eau de Parfum | 200 ml | 28 500 DA |
| 81 | L118 | HOMME | Givenchy | Givenchy Gentleman Réserve Privée | 200 ml | 29 800 DA |
| 82 | L119 | HOMME | Giorgio Armani | Emporio Armani Stronger With You Absolutely Eau de Parfum | 100 ml | 23 000 DA |
| 83 | L120 | HOMME | Giorgio Armani | Emporio Armani Stronger With You Intensely | 100 ml | 26 000 DA |
| 84 | L121 | HOMME | Giorgio Armani | Emporio Armani Stronger With You Parfum | 100 ml | 27 000 DA |
| 85 | L124 | HOMME | Gucci | Gucci Oud Intense Eau de Parfum | 100 ml | 27 500 DA |
| 86 | L126 | HOMME | Yves Saint Laurent | Yves Saint Laurent Y Le Parfum | 100 ml | 28 500 DA |
| 87 | L129 | HOMME | Carolina Herrera | Carolina Herrera Chic Men Eau de Toilette | 100 ml | 15 880 DA |
| 88 | L130 | HOMME | Givenchy | Givenchy Gentleman Society Extrême Eau de Parfum | 100 ml | 23 800 DA |
| 89 | L131 | HOMME | Jean Paul Gaultier | Jean Paul Gaultier Le Beau In Blue Eau de Parfum | 125 ml | 29 000 DA |
| 90 | L132 | HOMME | Jean Paul Gaultier | Jean Paul Gaultier Le Beau Paradise Garden Eau de Parfum | 125 ml | 29 000 DA |
| 91 | L133 | HOMME | Jean Paul Gaultier | Jean Paul Gaultier Le Beau Narcisse Eau de Parfum | 125 ml | 29 000 DA |
| 92 | L134 | HOMME | Jean Paul Gaultier | Jean Paul Gaultier Le Male Elixir | 125 ml | 29 000 DA |
| 93 | L135 | HOMME | Jean Paul Gaultier | Jean Paul Gaultier Le Male Le Parfum | 125 ml | 30 000 DA |
| 94 | L136 | HOMME | Jean Paul Gaultier | Jean Paul Gaultier Scandal Intense | 100 ml | 27 000 DA |
| 95 | L139 | HOMME | Jean Paul Gaultier | Jean Paul Gaultier Scandal Absolu | 150 ml | 31 000 DA |
| 96 | L141 | HOMME | Jean Paul Gaultier | Jean Paul Gaultier Le Beau Flowers Edition | 125 ml | 29 000 DA |
| 97 | L142 | HOMME | Jean Paul Gaultier | Jean Paul Gaultier Scandal Eau de Toilette | 150 ml | 24 000 DA |
| 98 | L143 | HOMME | Burberry | Burberry Hero Eau de Toilette | 100 ml | 16 500 DA |
| 99 | L145 | HOMME | Burberry | Burberry Hero Eau de Parfum | 100 ml | 19 800 DA |
| 100 | L147 | HOMME | Azzaro | Azzaro Chrome Eau de Toilette | 100 ml | 12 900 DA |
| 101 | L148 | HOMME | Cerruti | Cerruti 1881 Homme Eau de Toilette | 100 ml | 9 800 DA |
| 102 | L149 | HOMME | Guerlain | Guerlain L’Homme Idéal Intense Eau de Parfum | 100 ml | 21 000 DA |
| 103 | L150 | HOMME | Guerlain | Guerlain Habit Rouge Eau de Parfum | 100 ml | 22 000 DA |
| 104 | L151 | HOMME | Guerlain | Guerlain L’Instant de Guerlain Eau de Parfum | 100 ml | 21 800 DA |
| 105 | L152 | HOMME | Prada | Prada Paradigme Eau de Parfum | 100 ml | 28 000 DA |
| 106 | L153 | HOMME | Paco Rabanne | Paco Rabanne One Million Elixir Parfum Intense | 200 ml | 29 000 DA |
| 107 | L154 | HOMME | Paco Rabanne | Paco Rabanne One Million Eau de Toilette | 200 ml | 22 000 DA |
| 108 | L155 | HOMME | Paco Rabanne | Paco Rabanne One Million Parfum | 100 ml | 24 000 DA |
| 109 | L156 | HOMME | Moschino | Moschino Toy Boy Eau de Parfum | 100 ml | 17 000 DA |
| 110 | L160 | HOMME | Lacoste | Lacoste Blanc Eau de Toilette | 100 ml | 14 000 DA |
| 111 | L161 | HOMME | Lacoste | Lacoste L.12.12 Rose Eau Intense | 100 ml | 15 000 DA |
| 112 | L162 | HOMME | Lacoste | Lacoste Blanc Intense | 100 ml | 16 000 DA |
| 113 | L164 | HOMME | Lacoste | Lacoste Blanc Eau de Parfum | 100 ml | 14 000 DA |
| 114 | L165 | HOMME | Lacoste | Lacoste Silver Grey Eau de Parfum | 100 ml | 15 000 DA |
| 115 | L166 | HOMME | Lacoste | Lacoste Original Eau de Parfum | 100 ml | 15 500 DA |
| 116 | L167 | HOMME | Lacoste | Lacoste Original Aqua Eau de Parfum | 100 ml | 16 000 DA |
| 117 | L168 | HOMME | Hugo Boss | Hugo Boss Bottled Night Eau de Toilette | 100 ml | 14 500 DA |
| 118 | L169 | HOMME | Hugo Boss | Hugo Boss Bottled Unlimited Eau de Toilette | 100 ml | 14 500 DA |
| 119 | L170 | HOMME | Hugo Boss | Hugo Man Eau de Toilette | 125 ml | 14 800 DA |
| 120 | L172 | HOMME | Hugo Boss | Boss Man Eau de Toilette | 100 ml | 14 000 DA |
| 121 | L173 | HOMME | Hugo Boss | Hugo Man Extreme Eau de Parfum | 75 ml | 11 500 DA |
| 122 | L174 | HOMME | Hugo Boss | Hugo Just Different Eau de Toilette | 75 ml | 10 800 DA |
| 123 | L175 | HOMME | Hugo Boss | Hugo Energise Eau de Toilette | 75 ml | 10 800 DA |
| 124 | L176 | HOMME | Hugo Boss | Hugo Dark Blue Eau de Toilette | 75 ml | 10 000 DA |
| 125 | L177 | HOMME | Hugo Boss | Boss Bottled Absolu Parfum Intense | 100 ml | 25 000 DA |
| 126 | L178 | HOMME | Hugo Boss | Boss Bottled Triumph Elixir Parfum Intense | 100 ml | 25 000 DA |
| 127 | L179 | HOMME | Montblanc | Montblanc Legend Elixir Parfum | 100 ml | 16 800 DA |
| 128 | L180 | HOMME | Montblanc | Montblanc Legend Red Eau de Parfum | 100 ml | 13 000 DA |
| 129 | L181 | HOMME | Viktor & Rolf | Viktor&Rolf Spicebomb Extreme Eau de Parfum | 90 ml | 22 000 DA |
| 130 | L182 | HOMME | Viktor & Rolf | Viktor&Rolf Spicebomb Dark Leather Eau de Parfum | 90 ml | 23 000 DA |
| 131 | L183 | HOMME | Viktor & Rolf | Viktor&Rolf Spicebomb Metallic Musk Eau de Parfum | 90 ml | 22 000 DA |
| 132 | L184 | HOMME | Paco Rabanne | Paco Rabanne One Million Royal Parfum | 100 ml | 23 000 DA |
| 133 | L185 | HOMME | Paco Rabanne | Paco Rabanne One Million Oud Dahabi Parfum | 100 ml | 27 000 DA |
| 134 | L188 | HOMME | Christian Dior | Dior Sauvage Eau de Toilette | 100 ml | 27 000 DA |
| 135 | L189 | HOMME | Christian Dior | Dior Sauvage Eau de Parfum | 100 ml | 29 000 DA |
| 136 | L192 | HOMME | Christian Dior | Dior Sauvage Eau Forte | 100 ml | 28 500 DA |
| 137 | L193 | HOMME | Christian Dior | Dior Homme Intense Eau de Parfum | 100 ml | 29 500 DA |
| 138 | L195 | HOMME | Christian Dior | Dior Homme Parfum | 75 ml | 35 000 DA |
| 139 | L196 | HOMME | Chanel | Bleu de Chanel Eau de Parfum | 150 ml | 42 000 DA |
| 140 | L198 | HOMME | Chanel | Bleu de Chanel Parfum | 100 ml | 43 000 DA |
| 141 | L200 | HOMME | Christian Dior | Dior Homme Édition Blanche Eau de Parfum | 100 ml | 34 000 DA |
| 142 | L202 | HOMME | Chanel | Chanel Allure Homme Sport Superleggera Eau de Parfum | 100 ml | 37 000 DA |
| 143 | L203 | HOMME | Chanel | Chanel Allure Homme Sport Eau de Toilette | 100 ml | 36 000 DA |
| 144 | L204 | HOMME | Christian Dior | Dior Homme Cologne | 200 ml | 38 000 DA |
| 145 | L205 | HOMME | Chanel | Bleu de Chanel Exclusive Parfum | 100 ml | 55 000 DA |
| 146 | L206 | HOMME | Calvin Klein | CK One Eau de Toilette | 200 ml | 12 000 DA |
| 147 | L207 | HOMME | Carolina Herrera | Carolina Herrera 212 MTV Eau de Toilette | 100 ml | 19 900 DA |
| 148 | L208 | HOMME | Carolina Herrera | Carolina Herrera 212 Eau de Toilette | 100 ml | 19 000 DA |
| 149 | L209 | HOMME | Guerlain | Guerlain Oud Essentiel Eau de Parfum | 125 ml | 30 000 DA |
| 150 | L210 | HOMME | Guerlain | Guerlain Épices Exquises Eau de Parfum | 125 ml | 30 000 DA |
| 151 | L211 | HOMME | Guerlain | Guerlain Patchouli Ardent Eau de Parfum | 125 ml | 30 000 DA |
| 152 | L212 | HOMME | Guerlain | Guerlain Cuir Intense Eau de Parfum | 125 ml | 30 000 DA |
| 153 | L214 | HOMME | Mancera | Mancera Red Tobacco Eau de Parfum | 120 ml | 21 000 DA |
| 154 | L215 | HOMME | Mancera | Mancera Tobacco Intense Eau de Parfum | 120 ml | 26 000 DA |
| 155 | L217 | HOMME | Kenzo | Kenzo Homme Eau de Toilette | 110 ml | 21 000 DA |
| 156 | L218 | HOMME | Kenzo | Kenzo Homme Eau de Parfum | 110 ml | 23 000 DA |
| 157 | L222 | NICHE | Yves Saint Laurent | YSL Lavallière Accord Figue-Rose Eau de Parfum | 125 ml | 58 000 DA |
| 158 | L223 | NICHE | Vertus | Vertus Chaos Eau de Parfum | 100 ml | 38 500 DA |
| 159 | L225 | NICHE | Roméo Bejar | My Univers Privé Roméo Bejar Deep Amber Extrait de Parfum | 100 ml | 70 000 DA |
| 160 | L226 | NICHE | Calvin Klein | My Univers Privé Roméo Bejar Black Stone Extrait de Parfum | 100 ml | 70 000 DA |
| 161 | L230 | NICHE | Versace | Atelier Versace Fleur de Maté Eau de Parfum | 100 ml | 46 000 DA |
| 162 | L231 | NICHE | Versace | Atelier Versace Iris d’Élite Eau de Parfum | 100 ml | 46 000 DA |
| 163 | L233 | NICHE | BDK Parfums Paris | BDK Parfums Paris Gris Charnel Extrait de Parfum | 100 ml | 54 000 DA |
| 164 | L234 | NICHE | Rosendo Mateu | Rosendo Mateu Olfactive Expression Barcelona Eau de Parfum | 100 ml | 33 000 DA |
| 165 | L235 | NICHE | Unique'e Luxury | Unique’e Luxury Crush on Me Extrait de Parfum | 100 ml | 50 000 DA |
| 166 | L236 | NICHE | Unique'e Luxury | Unique’e Luxury Akdeniz Extrait de Parfum | 100 ml | 40 000 DA |
| 167 | L237 | NICHE | Penhaligon's | Penhaligon’s Babylon Eau de Parfum | 100 ml | 55 000 DA |
| 168 | L238 | NICHE | Penhaligon's | Penhaligon’s Endymion Cologne | 100 ml | 53 000 DA |
| 169 | L239 | NICHE | Penhaligon's | Penhaligon’s Constantinople Eau de Parfum | 100 ml | 62 000 DA |
| 170 | L240 | NICHE | Penhaligon's | Penhaligon’s Legacy of Petra Eau de Parfum | 100 ml | 60 000 DA |
| 171 | L241 | NICHE | Penhaligon's | Penhaligon’s Solaris Eau de Parfum | 100 ml | 50 000 DA |
| 172 | L243 | NICHE | Xerjoff | Xerjoff Casamorati 1888 Italica Eau de Parfum | 100 ml | 50 000 DA |
| 173 | L245 | NICHE | Omanluxury | Omanluxury Khanjar Eau de Parfum | 100 ml | 56 000 DA |
| 174 | L247 | NICHE | Xerjoff | Xerjoff Casamorati 1888 Mefisto Eau de Parfum | 100 ml | 50 000 DA |
| 175 | L248 | NICHE | Xerjoff | Xerjoff Erba Gold Eau de Parfum | 100 ml | 52 000 DA |
| 176 | L249 | NICHE | Xerjoff | Xerjoff Erba Pura Eau de Parfum | 100 ml | 45 000 DA |
| 177 | L251 | NICHE | Yves Saint Laurent | YSL Exquisite Embroidery Accord Rose Ambre Gris Eau de Parfum | 125 ml | 75 000 DA |

---

## 4. Règles d'exécution pour la Phase 2

1. **Parcours par lots de 20 produits** avec commit git sur la branche `import-parfums`.
2. **Attribution d'images strictes :** scan flou uniquement dans les trois dossiers autorisés (`Designer`, `photos designer homme`, `missing-perfumes`). Jamais de « Fond blanc » ni « photos coffrets ».
3. **Recherche web vérifiée :** notes olfactives (tête, cœur, fond), famille exacte, sillage et tenue réalistes.
4. **Rédaction éditoriale haut de gamme :** descriptions originales (2–3 phrases) et « L'histoire du flacon » respectant le ton cinématique et luxueux de Dar Safia.
5. **Validation :** compilation build & lint sans erreur après chaque lot.
