# MISSION
Tu travailles sur le projet « dar-safia-v2 » (boutique de parfums, site Next.js dans /web, routes dans web/src/app/[locale], dossier /cms, dossier /scripts). Ajoute au site les parfums de la LISTE ci-dessous qui n'y figurent pas encore, avec pour chacun une page produit identique en structure, design et données à celles des produits existants. Ne modifie pas les produits existants.

# ÉTAPE 0 — ENREGISTRER LA LISTE
Avant toute chose, crée le fichier perfumes/liste-parfums.txt et colle-y EXACTEMENT le contenu de la section « LISTE DES PARFUMS » située en bas de ce prompt (sans la modifier). Ce fichier sert de source pour tous les scripts. Ne retape jamais la liste à la main ailleurs : parse toujours ce fichier.

# FICHIERS D'ENTRÉE
- Liste : perfumes/liste-parfums.txt (environ 237 lignes, format « Nom complet + contenance — Prix DA »). Elle est divisée en sections (FEMME, HOMME, NICHE / LUXE), ce qui donne le genre (Pour femme / Pour lui). Pour la section NICHE, déduis le genre par recherche (ou « Mixte » si le site le prévoit).
- Images AUTORISÉES : perfumes/Photos site web/Designer, perfumes/Photos site web/photos designer homme, perfumes/Photos site web/missing-perfumes.
- Dossiers INTERDITS : « Fond blanc » (ne jamais l'utiliser, même en dernier recours) et « photos coffrets » (coffrets, pas des flacons seuls).

# PHASE 0 — AUDIT (ne rien écrire avant de l'avoir terminé)
1. Trouve comment les produits sont stockés (fichier de données, CMS, base de données, JSON, etc.) et comment la page produit est générée (ex. /fr/parfums/givenchy-irresistible). Liste les fichiers concernés.
2. Ouvre 3 produits existants (1 femme, 1 homme, 1 niche) et relève la structure complète des champs : marque, genre (POUR FEMME / POUR LUI), concentration (Eau de Parfum, EDT, Parfum, Extrait…), nom, slug, prix en DZD, volume (ex. « 80 ml »), mention « Sur commande — délai confirmé par la conciergerie », description courte (texte éditorial en français), tenue (ex. « 36 H »), sillage (ex. « Modéré »), famille olfactive (Floral, Boisé, Ambré, Frais…), pyramide olfactive (notes de tête, de cœur, de fond, 2 notes par niveau), « L'histoire du flacon », badge de carte (ex. « Sensualité brûlante », « Coup de cœur », « Intense », « Ultime réserve »), accroche de la carte (ex. « Ambré · Orange Sanguine de Sicile »), mention « Authentique », image, et traductions éventuelles pour les autres locales ([locale]).
3. Comprends aussi : comment « Dans la même famille » est calculé, comment les images sont référencées (chemin, nom, format, dossier public/), comment le slug est formé, si le site gère les variantes de volume ou de concentration, si c'est un seul produit avec plusieurs volumes ou des produits distincts.
4. Résume ces constats en un court rapport (schéma des champs + conventions) avant de continuer. Si une information est ambiguë, applique la convention déjà utilisée par les produits existants, et ne m'interroge qu'en cas de blocage réel.

# PHASE 1 — ANALYSE DE LA LISTE ET DÉTECTION DES DOUBLONS
1. Parse perfumes/liste-parfums.txt en un tableau structuré : marque, nom, concentration, volume, prix, section/genre, ligne d'origine.
2. Compare avec les produits déjà présents sur le site (environ 45). Normalise avant de comparer : minuscules, sans accents ni ponctuation, « EDP » = « Eau de Parfum », « EDT » = « Eau de Toilette », ordre marque/nom indifférent. Un parfum est un DOUBLON si marque + nom + concentration correspondent. Dans ce cas, passe au suivant sans rien créer ni modifier.
3. Une concentration différente (ex. Bloom EDT vs Bloom EDP vs Bloom Intense) est un parfum différent. Une contenance différente du même parfum (ex. Gucci Bloom EDP 50 ml et 100 ml) est une variante : utilise le mécanisme de variantes du site s'il existe. Sinon, regroupe-les selon la convention existante ou signale-le dans le rapport au lieu de créer un doublon.
4. Une même ligne peut apparaître plusieurs fois dans la liste (ex. « D&G Devotion Eau de Parfum 100 ml » en FEMME à 27 000 DA et en HOMME à 22 000 DA ; « Guerlain L'Instant de Guerlain » en 75 ml côté femme et 100 ml côté homme ; « D&G The One » en plusieurs contenances). Détecte-les et signale-les au lieu d'écraser silencieusement : un même nom avec un genre différent = produits distincts (slug avec suffixe de genre si collision).
5. Produis un fichier de rapport scripts/import-report/plan.md avec trois listes : « À créer », « Déjà présents (ignorés) » et « Ambigus ».
6. ARRÊTE-TOI ICI et attends ma validation de plan.md avant la Phase 2.

# PHASE 2 — CRÉATION DES PRODUITS (par lots de 20)
Pour chaque parfum « À créer » :

A. IMAGE
- Cherche dans les 3 dossiers autorisés (sous-dossiers inclus) l'image dont le nom de fichier correspond au parfum. Fais une correspondance floue sur le nom normalisé : ignore la casse, les accents, les tirets, les underscores, les chiffres de contenance et les mots « eau de parfum », « edp », etc. Privilégie marque + nom exact. Calcule un score et choisis la meilleure correspondance uniquement si elle est fiable.
- Attention aux faux amis : « Bloom » ≠ « Bloom Ambrosia d'Or », « Sauvage EDT » ≠ « Sauvage Elixir », « L'Interdit » ≠ « L'Interdit Rouge ». Une concentration ou une variante différente ne doit pas se voir attribuer l'image d'une autre. S'il n'y a qu'une image pour plusieurs variantes, signale-le.
- Copie l'image vers le dossier public du site en suivant EXACTEMENT la convention des images existantes (même dossier, même nommage, même format). Ne déplace jamais les fichiers sources. N'utilise jamais le dossier « Fond blanc ».
- Si aucune image fiable n'existe : NE publie PAS le produit, ne mets jamais une image au hasard, et ajoute-le à scripts/import-report/missing-images.md.

B. DONNÉES (recherche web obligatoire)
Pour chaque parfum, fais une recherche web pour obtenir des informations exactes : Fragrantica, le site de la marque, Parfumo, Basenotes (jamais de valeur inventée) :
- notes de tête, de cœur, de fond (2 notes principales par niveau, formulées en français avec le style des produits existants, ex. « Poire Sucrée », « Bois de Cèdre de Virginie »)
- famille olfactive, parmi les familles du site (Floral, Boisé, Ambré, Frais…, vérifie la liste exacte)
- tenue et sillage réalistes, dans le même format que les produits existants
- année, créateur et inspiration si utile pour l'histoire du flacon
- Si une information est introuvable, mets une valeur prudente cohérente avec la concentration et signale-la dans le rapport (« données estimées »).

C. TEXTES
- Écris en français une description courte (2 à 3 phrases) et un texte « L'histoire du flacon » (1 à 2 phrases) dans le même ton éditorial, luxueux et sensoriel que les produits existants. Ils doivent être originaux : ne copie jamais les descriptions du site de la marque ou d'un autre site.
- Génère le badge et l'accroche de carte selon la même logique que les produits existants.
- Si le site est multilingue, fournis toutes les locales exigées par la structure existante.

D. PRIX ET CHAMPS
- Prix exactement comme dans la liste (DZD, même format d'affichage que les produits existants). Volume tel qu'indiqué ; si la contenance est absente de la liste, recherche la contenance standard et signale-la.
- Slug : minuscules, sans accents, tirets, sans la contenance, cohérent avec « givenchy-irresistible ». Vérifie l'absence de collision.
- Concentration et genre corrects. Mention « Authentique » et « Sur commande » comme sur les produits existants.

E. VÉRIFICATION APRÈS CHAQUE LOT
- Lance le build et le lint, et corrige toute erreur.
- Lance le site en local et ouvre 2 ou 3 pages créées. Compare-les visuellement à /fr/parfums/givenchy-irresistible : mise en page, formulaire de commande (nom, prénom, téléphone, wilaya, commune, livraison, Commander / Ajouter au panier), pyramide olfactive, « Dans la même famille » et pied de page doivent être identiques.
- Vérifie qu'aucune image ne provient du dossier « Fond blanc », qu'aucun lien d'image n'est cassé, que les slugs sont uniques et que les produits existants sont inchangés (compare avec git diff).

# CAS PARTICULIERS
- « Penhaligon's Juniper Sling Eau de Toilette 100 ml — 550 000 DA » : prix très probablement erroné (erreur de saisie possible). NE PAS importer ce produit, mais le lister dans le rapport sous « À vérifier » avec une proposition de prix après recherche.
- Lignes sans contenance (ex. « D&G King Eau de Parfum Intense », « Azzaro The Most Wanted Eau de Parfum Intense », « Giorgio Armani Acqua di Giò Eau de Parfum », « YSL La Nuit de L'Homme », « Valentino Uomo Born in Roma Extra Dose », « Nishane Hacivat », « Amouage Guidance », « Amouage Lustre », « Dubai Meydan », « Louboutin Hiristan »…) : recherche la contenance standard, applique-la et signale-la.
- Noms normalisés dans la liste : si le nom exact officiel diffère, utilise le nom officiel vérifié sur le site de la marque. Vérifie notamment les références inhabituelles (ex. « Power of You pour Femme », « Cuir Goic », « Unique'e Luxury Ocean the Rive »).
- Parfums de niche : même gabarit de page, mais vérifie la marque, la concentration (Extrait de Parfum, etc.) et le genre.

# CONTRAINTES
- N'écrase jamais un produit existant. Aucun doublon.
- Fais tout via un script idempotent dans /scripts (relancer le script ne doit pas dupliquer les produits) et fais un commit git par lot sur une branche dédiée « import-parfums », jamais directement sur main.
- Ne modifie ni le design, ni le code des composants, ni la structure des pages. Seules les données et les images changent.
- Travaille de façon autonome et ne me pose pas de question sauf blocage réel (sauf l'arrêt de validation après la Phase 1).

# LIVRABLES FINAUX
Un rapport scripts/import-report/final-report.md contenant : nombre total de lignes de la liste ; nombre de doublons ignorés ; nombre de produits créés ; produits sans image (non publiés) ; produits avec données estimées ; cas ambigus et prix à vérifier ; liste des fichiers modifiés. Termine par un résumé court dans le chat.

---

# LISTE DES PARFUMS (à enregistrer telle quelle dans perfumes/liste-parfums.txt)

LISTE DES PARFUMS ET DES PRIX
Prix en DA. Les noms ont été légèrement normalisés pour faciliter la lecture. Les références et prix inhabituels sont conservés pour vérification.

FEMME — PREMIÈRE LISTE
Elie Saab Eau de Parfum 90 ml — 22 900 DA
Gucci Bloom Ambrosia d’Or Eau de Parfum 100 ml — 26 500 DA
My Burberry Blush Eau de Parfum 90 ml — 21 000 DA
Jour d’Hermès Absolu Eau de Parfum 85 ml — 21 000 DA
Gucci Bloom Eau de Toilette 100 ml — 19 000 DA
My Burberry Black Parfum 90 ml — 21 000 DA
Fame Intense Rabanne Eau de Parfum Intense 80 ml — 28 000 DA
Mademoiselle Rochas Eau de Parfum 90 ml — 15 500 DA
My Burberry Black Eau de Parfum 90 ml — 23 000 DA
Givenchy Irrésistible Rose Velvet Eau de Parfum 80 ml — 23 500 DA
Chloé Rose Tangerine Eau de Toilette 75 ml — 18 500 DA
Girl of Now Elie Saab Eau de Parfum 90 ml — 19 800 DA
Montblanc Signature Eau de Parfum 90 ml — 14 000 DA
Armani Sì Passione Eau de Parfum 100 ml — 26 000 DA
D&G Candied Cherry Jasmine Vanilla Parfum 100 ml — 24 000 DA
Boss The Scent Private Accord Eau de Parfum 100 ml — 14 000 DA
Mugler Alien Eau de Parfum 90 ml — 24 000 DA
Scandal Intense Eau de Parfum 80 ml — 28 500 DA
Versace Crystal Noir pour Femme Eau de Parfum 90 ml — 20 500 DA
Givenchy Irrésistible Nectar Eau de Parfum 80 ml — 25 000 DA
D&G Dark Cherry Heliotrope Amber Eau de Parfum Intense 100 ml — 25 000 DA
Cerruti 1881 pour Femme Eau de Toilette 100 ml — 10 000 DA
Lanvin Éclat d’Arpège Eau de Parfum 100 ml — 13 000 DA
Guerlain Mon Guerlain Eau de Parfum 100 ml — 24 800 DA
Elie Saab Le Parfum Essentiel Eau de Parfum 90 ml — 20 000 DA
Nina Ricci Premier Jour Eau de Parfum 100 ml — 13 000 DA
Roberto Cavalli Paradiso Eau de Parfum 75 ml — 11 000 DA
Givenchy Irrésistible Nude Velvet 80 ml — 24 500 DA
Jean Paul Gaultier Divine Couture Eau de Parfum 100 ml — 29 000 DA
Jean Paul Gaultier La Belle Eau de Parfum 100 ml — 26 000 DA
Chloé Rose Naturelle Eau de Parfum 50 ml — 15 500 DA
Chloé Nomade Eau de Parfum 50 ml — 15 500 DA
Valentino Donna Born in Roma Eau de Parfum 100 ml — 28 500 DA
Valentino Donna Born in Roma Intense Eau de Parfum 100 ml — 29 900 DA
Elie Saab Le Parfum Royal Eau de Parfum 90 ml — 17 000 DA
Roberto Cavalli Florence Eau de Parfum 75 ml — 12 800 DA
Power of You pour Femme Eau de Parfum 90 ml — 29 000 DA
Versace Bright Crystal Absolu pour Femme Eau de Parfum 90 ml — 20 000 DA
D&G Devotion Eau de Parfum 100 ml — 27 000 DA
Boss Ma Vie Eau de Parfum 75 ml — 13 000 DA
Boss Femme Eau de Parfum 75 ml — 13 000 DA
Gucci Bamboo Eau de Parfum 50 ml — 15 500 DA
Gucci Bloom Eau de Parfum 50 ml — 15 800 DA
Gucci Bloom Eau de Parfum Intense 50 ml — 15 800 DA
Gucci Flora Gorgeous Gardenia Eau de Parfum 50 ml — 16 000 DA
Gucci Bloom Eau de Parfum 100 ml — 20 500 DA
Givenchy L’Interdit Parfum 80 ml — 26 800 DA
Paco Rabanne Olympéa Flora Eau de Parfum Intense 80 ml — 23 000 DA
Givenchy L’Interdit Rouge Eau de Parfum 80 ml — 27 000 DA
Givenchy L’Interdit Rouge Ultime Eau de Parfum 80 ml — 28 500 DA
Marc Jacobs Daisy Eau de Toilette 100 ml — 17 000 DA
Narciso Rodriguez For Her Eau de Parfum 100 ml — 24 000 DA
Guerlain L’Instant de Guerlain Eau de Parfum 75 ml — 21 000 DA
Givenchy L’Interdit Eau de Parfum 125 ml — 29 000 DA
Chloé Love Story Eau de Parfum 75 ml — 20 500 DA
Dior J’adore L’Or Essence de Parfum 50 ml — 34 000 DA
Dior J’adore Intense Parfum 100 ml — 38 000 DA
Rabanne Fame in Love Parfum Elixir 80 ml — 30 000 DA
Narciso Rodriguez Poudrée Eau de Parfum 90 ml — 23 000 DA
Lancôme Idôle Peach ‘n Roses Eau de Parfum Fruité 100 ml — 30 000 DA
Lancôme Idôle Travel Exclusive Eau de Parfum 100 ml + 10 ml — 28 500 DA
D&G L’Impératrice Eau de Toilette 100 ml — 12 500 DA
Givenchy Ange ou Démon Le Secret Eau de Parfum 100 ml — 25 800 DA
Miss Dior Parfum 50 ml — 25 000 DA
My Burberry Black Parfum 50 ml — 15 800 DA
Armani Sì Eau de Parfum Intense 100 ml — 29 500 DA
Hugo Woman Eau de Toilette 100 ml — 11 800 DA
Rochas Audace Eau de Parfum 90 ml — 18 000 DA
Narciso Rodriguez For Her Pure Musc Eau de Parfum 100 ml — 24 000 DA

HOMME — D&G, AZZARO, CARTIER, VALENTINO
D&G King Eau de Parfum 200 ml — 25 000 DA
D&G King Parfum 100 ml — 22 000 DA
D&G King Eau de Parfum Intense — 20 500 DA
D&G Intenso Eau de Parfum 125 ml — 19 800 DA
D&G The One Eau de Parfum 100 ml — 19 500 DA
D&G The One Eau de Parfum Intense 100 ml — 21 000 DA
D&G The One Le Parfum 100 ml — 24 000 DA
D&G Devotion Eau de Parfum 100 ml — 22 000 DA
D&G Devotion Parfum 100 ml — 24 000 DA
Azzaro The Most Wanted Eau de Parfum Intense — 19 800 DA
Azzaro The Most Wanted Parfum 100 ml — 20 500 DA
Azzaro Wanted by Night Eau de Parfum 100 ml — 19 500 DA
Azzaro Wanted Forever Elixir 100 ml — 20 000 DA
Cartier Déclaration Parfum 100 ml — 25 500 DA
Cartier Déclaration Eau de Parfum 100 ml — 26 500 DA
Valentino Uomo Born in Roma Intense 100 ml — 27 800 DA
Valentino Uomo Born in Roma Extra Dose — 29 800 DA

HOMME — HERMÈS, MONTBLANC, INVICTUS, VERSACE
Hermès H24 Eau de Toilette 100 ml — 16 800 DA
Hermès H24 Eau de Parfum 100 ml — 19 000 DA
Hermès H24 Herbes Vives 100 ml — 23 000 DA
Montblanc Explorer Eau de Parfum 100 ml — 14 000 DA
Montblanc Explorer Ultra Blue Eau de Parfum 100 ml — 14 000 DA
Montblanc Explorer Extrême Parfum 100 ml — 16 800 DA
Invictus Elixir 100 ml — 27 900 DA
Invictus Victory Elixir 100 ml — 25 000 DA
Invictus Victory Absolu 100 ml — 26 000 DA
Boucheron Singulier 100 ml — 12 000 DA
Versace Oud Noir Eau de Parfum 100 ml — 19 800 DA
Versace Eros Parfum 100 ml — 21 000 DA
Versace Eros Eau de Parfum 200 ml — 25 000 DA
Yves Saint Laurent MYSLF Le Parfum 100 ml — 29 800 DA
Yves Saint Laurent MYSLF Eau de Parfum 100 ml — 24 800 DA
Yves Saint Laurent La Nuit de L’Homme Eau de Parfum — 26 000 DA
Yves Saint Laurent La Nuit de L’Homme Le Parfum — 28 000 DA
Givenchy Gentleman Eau de Toilette 100 ml — 22 500 DA
Givenchy Gentleman Eau de Parfum 100 ml — 20 500 DA
Givenchy Gentleman Eau de Parfum Boisée 100 ml — 20 500 DA
Givenchy Gentleman Réserve Privée Eau de Parfum 100 ml — 22 800 DA
Givenchy Gentleman Society Ambrée Eau de Parfum 100 ml — 27 500 DA
Givenchy Gentleman Society Eau de Parfum 200 ml — 28 500 DA
Givenchy Gentleman Réserve Privée 200 ml — 29 800 DA
Emporio Armani Stronger With You Absolutely Eau de Parfum 100 ml — 23 000 DA
Emporio Armani Stronger With You Intensely 100 ml — 26 000 DA
Emporio Armani Stronger With You Parfum 100 ml — 27 000 DA
Emporio Armani Stronger With You Powerfully Eau de Parfum 100 ml — 26 800 DA
Giorgio Armani Acqua di Giò Eau de Parfum — 25 000 DA
Gucci Oud Intense Eau de Parfum 100 ml — 27 500 DA
Terre d’Hermès Eau de Parfum Intense 100 ml — 25 800 DA
Yves Saint Laurent Y Le Parfum 100 ml — 28 500 DA

HOMME — JEAN PAUL GAULTIER, BURBERRY, AZZARO, PRADA
Carolina Herrera Chic Men Eau de Toilette 100 ml — 15 880 DA
Givenchy Gentleman Society Extrême Eau de Parfum 100 ml — 23 800 DA
Jean Paul Gaultier Le Beau In Blue Eau de Parfum 125 ml — 29 000 DA
Jean Paul Gaultier Le Beau Paradise Garden Eau de Parfum 125 ml — 29 000 DA
Jean Paul Gaultier Le Beau Narcisse Eau de Parfum 125 ml — 29 000 DA
Jean Paul Gaultier Le Male Elixir 125 ml — 29 000 DA
Jean Paul Gaultier Le Male Le Parfum 125 ml — 30 000 DA
Jean Paul Gaultier Scandal Intense 100 ml — 27 000 DA
Jean Paul Gaultier Scandal Intense 150 ml — 29 000 DA
Jean Paul Gaultier Scandal Absolu 100 ml — 26 500 DA
Jean Paul Gaultier Scandal Absolu 150 ml — 31 000 DA
Jean Paul Gaultier Scandal Elixir 100 ml — 31 000 DA
Jean Paul Gaultier Le Beau Flowers Edition 125 ml — 29 000 DA
Jean Paul Gaultier Scandal Eau de Toilette 150 ml — 24 000 DA
Burberry Hero Eau de Toilette 100 ml — 16 500 DA
Burberry Hero Eau de Toilette 150 ml — 19 800 DA
Burberry Hero Eau de Parfum 100 ml — 19 800 DA
Burberry Hero Eau de Parfum 150 ml — 24 000 DA
Azzaro Chrome Eau de Toilette 100 ml — 12 900 DA
Cerruti 1881 Homme Eau de Toilette 100 ml — 9 800 DA
Guerlain L’Homme Idéal Intense Eau de Parfum 100 ml — 21 000 DA
Guerlain Habit Rouge Eau de Parfum 100 ml — 22 000 DA
Guerlain L’Instant de Guerlain Eau de Parfum 100 ml — 21 800 DA
Prada Paradigme Eau de Parfum 100 ml — 28 000 DA
Paco Rabanne One Million Elixir Parfum Intense 200 ml — 29 000 DA
Paco Rabanne One Million Eau de Toilette 200 ml — 22 000 DA
Paco Rabanne One Million Parfum 100 ml — 24 000 DA
Moschino Toy Boy Eau de Parfum 100 ml — 17 000 DA
Paco Rabanne One Million Parfum 200 ml — 28 500 DA

HOMME — LACOSTE, HUGO BOSS, MONTBLANC, VIKTOR&ROLF
Lacoste Blanc Eau de Toilette 100 ml — 14 000 DA
Lacoste L.12.12 Rose Eau Intense 100 ml — 15 000 DA
Lacoste Blanc Intense 100 ml — 16 000 DA
Lacoste Booster Eau de Toilette 125 ml — 13 000 DA
Lacoste Blanc Eau de Parfum 100 ml — 14 000 DA
Lacoste Silver Grey Eau de Parfum 100 ml — 15 000 DA
Lacoste Original Eau de Parfum 100 ml — 15 500 DA
Lacoste Original Aqua Eau de Parfum 100 ml — 16 000 DA
Hugo Boss Bottled Night Eau de Toilette 100 ml — 14 500 DA
Hugo Boss Bottled Unlimited Eau de Toilette 100 ml — 14 500 DA
Hugo Man Eau de Toilette 125 ml — 14 800 DA
Hugo Man Eau de Toilette 200 ml — 17 000 DA
Boss Man Eau de Toilette 100 ml — 14 000 DA
Hugo Man Extreme Eau de Parfum 75 ml — 11 500 DA
Hugo Just Different Eau de Toilette 75 ml — 10 800 DA
Hugo Energise Eau de Toilette 75 ml — 10 800 DA
Hugo Dark Blue Eau de Toilette 75 ml — 10 000 DA
Boss Bottled Absolu Parfum Intense 100 ml — 25 000 DA
Boss Bottled Triumph Elixir Parfum Intense 100 ml — 25 000 DA
Montblanc Legend Elixir Parfum 100 ml — 16 800 DA
Montblanc Legend Red Eau de Parfum 100 ml — 13 000 DA
Viktor&Rolf Spicebomb Extreme Eau de Parfum 90 ml — 22 000 DA
Viktor&Rolf Spicebomb Dark Leather Eau de Parfum 90 ml — 23 000 DA
Viktor&Rolf Spicebomb Metallic Musk Eau de Parfum 90 ml — 22 000 DA
Paco Rabanne One Million Royal Parfum 100 ml — 23 000 DA
Paco Rabanne One Million Oud Dahabi Parfum 100 ml — 27 000 DA

HOMME — DIOR, CHANEL, GUERLAIN, KENZO
Dior Sauvage Eau de Toilette 100 ml — 27 000 DA
Dior Sauvage Eau de Parfum 100 ml — 29 000 DA
Dior Sauvage Parfum 100 ml — 31 000 DA
Dior Sauvage Elixir 60 ml et 100 ml — 32 500 DA
Dior Sauvage Eau Forte 100 ml — 28 500 DA
Dior Homme Intense Eau de Parfum 100 ml — 29 500 DA
Dior Homme Intense Eau de Parfum 150 ml — 36 000 DA
Dior Homme Parfum 75 ml — 35 000 DA
Bleu de Chanel Eau de Parfum 150 ml — 42 000 DA
Bleu de Chanel Eau de Parfum 100 ml — 39 000 DA
Bleu de Chanel Parfum 100 ml — 43 000 DA
Bleu de Chanel Parfum 150 ml — 46 000 DA
Dior Homme Édition Blanche Eau de Parfum 100 ml — 34 000 DA
Dior Homme Édition Blanche Eau de Parfum 150 ml — 41 000 DA
Chanel Allure Homme Sport Superleggera Eau de Parfum 100 ml — 37 000 DA
Chanel Allure Homme Sport Eau de Toilette 100 ml — 36 000 DA
Dior Homme Cologne 200 ml — 38 000 DA
Bleu de Chanel Exclusive Parfum 100 ml — 55 000 DA
CK One Eau de Toilette 200 ml — 12 000 DA
Carolina Herrera 212 MTV Eau de Toilette 100 ml — 19 900 DA
Carolina Herrera 212 Eau de Toilette 100 ml — 19 000 DA
Guerlain Oud Essentiel Eau de Parfum 125 ml — 30 000 DA
Guerlain Épices Exquises Eau de Parfum 125 ml — 30 000 DA
Guerlain Patchouli Ardent Eau de Parfum 125 ml — 30 000 DA
Guerlain Cuir Intense Eau de Parfum 125 ml — 30 000 DA
D&G The One Eau de Parfum 150 ml — 25 000 DA
Mancera Red Tobacco Eau de Parfum 120 ml — 21 000 DA
Mancera Tobacco Intense Eau de Parfum 120 ml — 26 000 DA
Kenzo Homme Indigo Eau de Parfum 110 ml — 22 000 DA
Kenzo Homme Eau de Toilette 110 ml — 21 000 DA
Kenzo Homme Eau de Parfum 110 ml — 23 000 DA

PARFUMS DE NICHE / LUXE
YSL 37 Rue de Bellechasse Oud-Élémi — 85 000 DA
YSL Lavallière Accord Figue-Rose Eau de Parfum 125 ml — 58 000 DA
Vertus Chaos Eau de Parfum 100 ml — 38 500 DA
Nishane Hacivat Extrait de Parfum — 49 000 DA
My Univers Privé Roméo Bejar Deep Amber Extrait de Parfum 100 ml — 70 000 DA
My Univers Privé Roméo Bejar Black Stone Extrait de Parfum 100 ml — 70 000 DA
Roméo Bejar Anima Viva Extrait de Parfum — 150 000 DA
Unique’e Luxury Ocean the Rive — 55 000 DA
Louboutin Hiristan — 45 000 DA
Atelier Versace Fleur de Maté Eau de Parfum 100 ml — 46 000 DA
Atelier Versace Iris d’Élite Eau de Parfum 100 ml — 46 000 DA
Dubai Meydan Eau de Parfum — 46 000 DA
BDK Parfums Paris Gris Charnel Extrait de Parfum 100 ml — 54 000 DA
Rosendo Mateu Olfactive Expression Barcelona Eau de Parfum 100 ml — 33 000 DA
Unique’e Luxury Crush on Me Extrait de Parfum 100 ml — 50 000 DA
Unique’e Luxury Akdeniz Extrait de Parfum 100 ml — 40 000 DA
Penhaligon’s Babylon Eau de Parfum 100 ml — 55 000 DA
Penhaligon’s Endymion Cologne 100 ml — 53 000 DA
Penhaligon’s Constantinople Eau de Parfum 100 ml — 62 000 DA
Penhaligon’s Legacy of Petra Eau de Parfum 100 ml — 60 000 DA
Penhaligon’s Solaris Eau de Parfum 100 ml — 50 000 DA
Penhaligon’s Juniper Sling Eau de Toilette 100 ml — 550 000 DA [PRIX À VÉRIFIER]
Xerjoff Casamorati 1888 Italica Eau de Parfum 100 ml — 50 000 DA
Amouage Guidance — 85 000 DA
Omanluxury Khanjar Eau de Parfum 100 ml — 56 000 DA
Amouage Lustre — 78 000 DA
Xerjoff Casamorati 1888 Mefisto Eau de Parfum 100 ml — 50 000 DA
Xerjoff Erba Gold Eau de Parfum 100 ml — 52 000 DA
Xerjoff Erba Pura Eau de Parfum 100 ml — 45 000 DA
Penhaligon’s The Coveted Duchess Rose — 42 000 DA
YSL Exquisite Embroidery Accord Rose Ambre Gris Eau de Parfum 125 ml — 75 000 DA
YSL Wild Leather Accord Cuir Goic Eau de Parfum 75 ml — 42 000 DA

À VÉRIFIER AVANT IMPORT
- Penhaligon’s Juniper Sling Eau de Toilette 100 ml : prix fourni = 550 000 DA (possibilité d’une erreur de saisie).
- Quelques noms ont été normalisés à partir de l’orthographe fournie. Vérifier les références exactes avant publication.
- Certains prix n’ont pas de contenance indiquée dans la liste d’origine ; ils ont été conservés tels quels.
