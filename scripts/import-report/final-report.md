# Rapport Final d'Importation du Catalogue Parfums — Dar Safia v2

**Date d'exécution :** 15 octobre 2026  
**Branche Git :** `import-parfums`  
**Statut global :** SUCCÈS COMPLET (10 lots / 10 exécutés, vérifiés et commités)

---

## 1. Résumé Exécutif

L'opération d'importation massive des nouveaux parfums issus du fichier `perfumes/liste-parfums.txt` dans la plateforme e-commerce haut de gamme **Dar Safia v2** a été menée à terme selon la méthodologie rigoureuse prescrite par le document directeur `perfumes/prompt-antigravity-import-parfums.md`.

Chaque lot de 20 parfums a fait l'objet d'un processus automatisé complet :
1. Enrichissement du fichier source unifié `catalog-data.js` (IDs séquentiels 46 à 234).
2. Ajout des métadonnées luxueuses complètes (notes de tête, cœur, fond, longévité, sillage, storytelling, badge, avis).
3. Injection des traductions trilingues (Français, Anglais, Arabe) dans `scripts/catalog-translations.json`.
4. Exécution de `npm run prepare-assets` (optimisation WebP/AVIF responsive, génération des métadonnées olfactives dans `web/src/data/catalog.json`).
5. Contrôle qualité par `npm run lint` (ESLint 0 erreur, 0 avertissement).
6. Compilation de production Next.js 16 Turbopack (`npm run build`), générant **730 pages statiques** sans aucune régression.
7. Commit atomique git dédié pour chaque lot.

### Métriques clés de l'importation

| Indicateur | Valeur |
|---|---|
| **Lignes brutes analysées** | 236 |
| **Doublons stricts ignorés** (déjà présents dans le catalogue initial) | 32 |
| **Variantes de volume fusionnées** (prix le plus élevé conservé) | 11 |
| **Produits exclus pour absence d'image fiable** (consignés dans `missing-images.md`) | 4 |
| **Nouveaux parfums créés et importés** | **189** |
| **Produits initiaux du catalogue** (IDs 1 à 45, 100% préservés) | 45 |
| **Total des parfums dans le catalogue final** | **234** |
| **Marques référencées dans le catalogue** | 50 |
| **Notes olfactives répertoriées** | 985 |
| **Pages statiques compilées (`next build`)** | **730** |
| **Commits git créés sur `import-parfums`** | 11 (1 initial + 10 lots) |

---

## 2. Décisions & Arbitrages Appliqués

Conformément aux instructions et validations explicites de l'utilisateur :

### 2.1 Règle des variantes de volume et prix multiples (Décision #1)
Lorsqu'un même parfum apparaissait avec deux volumes et deux prix distincts, **une seule fiche produit a été créée**, retenant systématiquement **le prix le plus élevé et le volume correspondant**.
- *Gucci Bloom EDP* → 100 ml / 20 500 DA (variante 50 ml / 17 500 DA fusionnée)
- *Burberry Hero EDT* → 150 ml / 19 800 DA (variante 100 ml / 18 000 DA fusionnée)
- *Bleu de Chanel EDP* → 150 ml / 42 000 DA (variante 100 ml / 37 000 DA fusionnée)
- *Bleu de Chanel Parfum* → 150 ml / 46 000 DA (variante 100 ml / 43 000 DA fusionnée)
- *Dior Homme Intense EDP* → 150 ml / 36 000 DA (variante 100 ml / 29 500 DA fusionnée)
- *Dior Homme Édition Blanche EDP* → 150 ml / 41 000 DA (variante 100 ml / 34 000 DA fusionnée)
- *Burberry Hero EDP* → 150 ml / 24 000 DA (variante 100 ml / 21 000 DA fusionnée)
- *Guerlain Mon Guerlain EDP* → 100 ml / 22 000 DA (variante 50 ml / 17 000 DA fusionnée)
- *Hugo Boss Alive Parfum* → 80 ml / 19 500 DA (variante 50 ml / 16 500 DA fusionnée)
- *Hugo Boss Alive EDP* → 80 ml / 19 000 DA (variante 50 ml / 16 000 DA fusionnée)
- *Hugo Man EDT* → 200 ml / 14 500 DA (variante 125 ml / 11 500 DA fusionnée)

### 2.2 Exception de genre maintenue (Décision #2)
Les parfums partageant un intitulé similaire mais destinés à des genres différents ont été maintenus comme deux produits distincts :
- `Dolce & Gabbana Devotion Eau de Parfum 100 ml` (Femme — 24 000 DA, ID 121)
- `Dolce & Gabbana Devotion for Men Eau de Parfum 100 ml` (Homme — 24 000 DA, ID 142)

### 2.3 Correction de prix Penhaligon's Juniper Sling (Décision #3)
Le prix erroné dans la liste brute (550 000 DA) a été rectifié et importé au tarif officiel de **55 000 DA** (ID 225).

### 2.4 Contenances estimées (Décision #4)
Pour les références dépourvues de contenance explicite dans la liste source, les volumes standards du marché ont été appliqués et sont consignés comme « **données estimées** » :
- *YSL 37 Rue de Bellechasse Oud-Élémi* : **125 ml** (flaconnage officiel Le Vestiaire des Parfums)
- *Penhaligon's The Coveted Duchess Rose* : **75 ml** (flaconnage officiel Portraits Collection)
- *Nishane Hacivat Extrait de Parfum* : **100 ml** (standard Nishane)
- *Amouage Guidance* : **100 ml** (standard Amouage)
- *Amouage Lustre* : **100 ml** (standard Amouage Essences)
- *The Spirit of Dubai Meydan Eau de Parfum* : **100 ml** (standard Spirit of Dubai)
- *Unique'e Luxury Ocean the Rive* : **100 ml** (standard Unique'e Luxury)
- *Ramón Béjar Anima Viva Extrait de Parfum* : **100 ml** (standard Ramón Béjar)
- *Prada Luna Rossa Black Eau de Parfum* : **100 ml**
- *YSL Libre Berry Eau de Parfum* : **90 ml**

### 2.5 Rectification des appellations (Décision #5)
- « *Power of You pour Femme* » : conservé fidèlement.
- « *YSL Wild Leather Accord Cuir Goic* » : normalisé en **YSL Wild Leather Accord Cuir Eau de Parfum** conformément au nom officiel de la collection Le Vestiaire des Parfums.

---

## 3. Détail des 10 Lots Importés

### Lot 1 (IDs 46 à 65) — 20 Parfums
- **Commit :** `6e62b07` — `feat(import): lot 1/10 - importation de 20 parfums`
- **Produits :**
  1. ID 46 : *Lancôme La Nuit Trésor Le Parfum 50ml* — 16 000 DA
  2. ID 47 : *Lancôme Idôle L'Extrait de Parfum 75ml* — 20 000 DA
  3. ID 48 : *Lancôme Idôle Now Eau de Parfum Florale 100ml* — 21 000 DA
  4. ID 49 : *Lancôme La Vie Est Belle L'Extrait de Parfum 50ml* — 19 000 DA
  5. ID 50 : *Lancôme La Vie Est Belle Iris Absolu 100ml* — 22 500 DA
  6. ID 51 : *Lancôme La Vie Est Belle L'Élixir 100ml* — 23 000 DA
  7. ID 52 : *Lancôme La Vie Est Belle Rose Extraordinaire 100ml* — 22 000 DA
  8. ID 53 : *Guerlain Aqua Allegoria Florabloom Forte 125ml* — 21 500 DA
  9. ID 54 : *Guerlain Aqua Allegoria Florabloom EDT 125ml* — 21 500 DA
  10. ID 55 : *Guerlain Aqua Allegoria Rosa Palissandro Forte 125ml* — 21 500 DA
  11. ID 56 : *Guerlain Aqua Allegoria Bosca Vanilla Forte 125ml* — 21 500 DA
  12. ID 57 : *Guerlain Aqua Allegoria Forte Nerolia Vetiver 125ml* — 21 500 DA
  13. ID 58 : *Guerlain Aqua Allegoria Forte Mandarine Basilic 125ml* — 21 500 DA
  14. ID 59 : *Guerlain Mon Guerlain Eau de Parfum 100ml* — 22 000 DA (variante 50ml fusionnée)
  15. ID 60 : *Guerlain Mon Guerlain Eau de Parfum Intense 100ml* — 23 500 DA
  16. ID 61 : *Guerlain La Petite Robe Noire Rose Noire 100ml* — 23 000 DA
  17. ID 62 : *Guerlain La Petite Robe Noire Eau de Parfum Absolue 100ml* — 23 000 DA
  18. ID 63 : *Guerlain La Petite Robe Noire Eau de Parfum 100ml* — 21 500 DA
  19. ID 64 : *Guerlain La Petite Robe Noire Eau de Toilette 100ml* — 19 000 DA
  20. ID 65 : *Guerlain Shalimar L'Essence Eau de Parfum 50ml* — 17 000 DA

### Lot 2 (IDs 66 à 85) — 20 Parfums
- **Commit :** `0ad4f31` — `feat(import): lot 2/10 - importation de 20 parfums`
- **Produits :**
  21. ID 66 : *Guerlain Shalimar Millésime Iris Eau de Parfum 50ml* — 17 000 DA
  22. ID 67 : *Guerlain Shalimar Eau de Parfum 90ml* — 22 000 DA
  23. ID 68 : *Guerlain Insolence Eau de Parfum 75ml* — 21 000 DA
  24. ID 69 : *Guerlain L'Instant Magic Eau de Parfum 75ml* — 21 000 DA
  25. ID 70 : *Guerlain Champs-Élysées Eau de Parfum 75ml* — 21 000 DA
  26. ID 71 : *Guerlain Idylle Eau de Parfum 75ml* — 21 000 DA
  27. ID 72 : *Mugler Alien Hypersense Eau de Parfum 90ml* — 22 000 DA
  28. ID 73 : *Mugler Alien Goddess Supra Florale 90ml* — 21 000 DA
  29. ID 74 : *Mugler Alien Goddess Intense 90ml* — 21 000 DA
  30. ID 75 : *Mugler Alien Goddess Eau de Parfum 90ml* — 21 000 DA
  31. ID 76 : *Mugler Alien Eau de Parfum 90ml* — 22 000 DA
  32. ID 77 : *Mugler Angel Fantasm Eau de Parfum Sensuelle 100ml* — 22 000 DA
  33. ID 78 : *Mugler Angel Elixir Eau de Parfum 100ml* — 22 000 DA
  34. ID 79 : *Mugler Angel Nova Eau de Parfum 100ml* — 21 000 DA
  35. ID 80 : *Mugler Angel Eau de Parfum 100ml* — 23 000 DA
  36. ID 81 : *Hugo Boss The Scent Elixir for Her 50ml* — 19 000 DA
  37. ID 82 : *Hugo Boss The Scent Magnetic for Her 50ml* — 16 000 DA
  38. ID 83 : *Hugo Boss The Scent for Her Le Parfum 50ml* — 16 000 DA
  39. ID 84 : *Hugo Boss Alive Absolu Parfum Intense 50ml* — 17 000 DA
  40. ID 85 : *Hugo Boss Alive Parfum 80ml* — 19 500 DA (variante 50ml fusionnée)

### Lot 3 (IDs 86 à 105) — 20 Parfums
- **Commit :** `4ba8a83` — `feat(import): lot 3/10 - importation de 20 parfums`
- **Produits :**
  41. ID 86 : *Hugo Boss Alive Eau de Parfum 80ml* — 19 000 DA (variante 50ml fusionnée)
  42. ID 87 : *Hugo Boss Femme Eau de Parfum 75ml* — 12 500 DA
  43. ID 88 : *Givenchy L'Interdit Absolu Eau de Parfum 80ml* — 23 000 DA
  44. ID 89 : *Givenchy L'Interdit Tubéreuse Noire 50ml* — 19 000 DA
  45. ID 90 : *Givenchy L'Interdit Rouge Ultime 80ml* — 22 000 DA
  46. ID 91 : *Givenchy L'Interdit Rouge Eau de Parfum 80ml* — 22 000 DA
  47. ID 92 : *Givenchy L'Interdit Eau de Parfum Intense 80ml* — 22 000 DA
  48. ID 93 : *Givenchy L'Interdit Eau de Parfum 80ml* — 21 000 DA
  49. ID 94 : *Givenchy Irrésistible Very Floral 80ml* — 22 000 DA
  50. ID 95 : *Givenchy Irrésistible Eau de Parfum 80ml* — 21 000 DA
  51. ID 96 : *Gucci Flora Gorgeous Orchid 100ml* — 22 000 DA
  52. ID 97 : *Gucci Flora Gorgeous Magnolia 100ml* — 22 000 DA
  53. ID 98 : *Gucci Flora Gorgeous Jasmine 100ml* — 22 000 DA
  54. ID 99 : *Gucci Flora Gorgeous Gardenia 100ml* — 22 000 DA
  55. ID 100 : *Gucci Bloom Eau de Parfum 100ml* — 20 500 DA (variante 50ml fusionnée)
  56. ID 101 : *Gucci Guilty Elixir de Parfum Pour Femme 60ml* — 24 500 DA
  57. ID 102 : *Gucci Guilty Pour Femme Eau de Parfum 90ml* — 22 000 DA
  58. ID 103 : *Burberry Goddess Eau de Parfum Intense 100ml* — 24 000 DA
  59. ID 104 : *Burberry Goddess Eau de Parfum 100ml* — 23 000 DA
  60. ID 105 : *Burberry Her Elixir de Parfum 100ml* — 24 000 DA

### Lot 4 (IDs 106 à 125) — 20 Parfums
- **Commit :** `21089a0` — `feat(import): lot 4/10 - importation de 20 parfums`
- **Produits :**
  61. ID 106 : *Burberry Her Petals Édition Limitée 88ml* — 23 000 DA
  62. ID 107 : *Burberry Her Eau de Parfum 100ml* — 22 000 DA
  63. ID 108 : *Narciso Rodriguez All of Me Floral 90ml* — 21 000 DA
  64. ID 109 : *Narciso Rodriguez All of Me Eau de Parfum 90ml* — 21 000 DA
  65. ID 110 : *Narciso Rodriguez Musc Nude For Her 100ml* — 22 000 DA
  66. ID 111 : *Narciso Rodriguez For Her Fleur Musc 100ml* — 21 000 DA
  67. ID 112 : *Narciso Rodriguez For Her Musc Noir Rose 100ml* — 22 000 DA
  68. ID 113 : *Narciso Rodriguez For Her Musc Noir 100ml* — 21 000 DA
  69. ID 114 : *Narciso Rodriguez For Her Pure Musc 100ml* — 21 000 DA
  70. ID 115 : *Narciso Rodriguez For Her Eau de Parfum 100ml* — 21 000 DA
  71. ID 116 : *Narciso Rodriguez For Her Eau de Toilette 100ml* — 19 000 DA
  72. ID 117 : *Narciso Rodriguez Cristal Eau de Parfum 90ml* — 21 000 DA
  73. ID 118 : *Narciso Rodriguez Poudrée Eau de Parfum 90ml* — 21 000 DA
  74. ID 119 : *Narciso Rodriguez Rouge Eau de Parfum 90ml* — 21 000 DA
  75. ID 120 : *D&G Devotion Intense Eau de Parfum 100ml* — 24 500 DA
  76. ID 121 : *D&G Devotion Eau de Parfum 100ml* — 24 000 DA
  77. ID 122 : *D&G Q by Dolce & Gabbana Eau de Parfum Intense 100ml* — 23 000 DA
  78. ID 123 : *D&G Q by Dolce & Gabbana Eau de Parfum 100ml* — 22 000 DA
  79. ID 124 : *D&G The Only One Eau de Parfum Intense 100ml* — 21 000 DA
  80. ID 125 : *D&G The Only One Eau de Parfum 100ml* — 21 000 DA

### Lot 5 (IDs 126 à 145) — 20 Parfums
- **Commit :** `09c5032` — `feat(import): lot 5/10 - importation de 20 parfums`
- **Produits :**
  81. ID 126 : *D&G The One Gold Eau de Parfum Intense 75ml* — 18 500 DA
  82. ID 127 : *D&G The One Eau de Parfum 75ml* — 18 000 DA
  83. ID 128 : *D&G Light Blue Eau Intense Pour Femme 100ml* — 19 000 DA
  84. ID 129 : *D&G Light Blue Eau de Toilette Pour Femme 100ml* — 17 500 DA
  85. ID 130 : *Valentino Donna Born in Roma Green Stravaganza 100ml* — 24 000 DA
  86. ID 131 : *Valentino Donna Born in Roma Coral Fantasy 100ml* — 24 000 DA
  87. ID 132 : *Valentino Donna Born in Roma Yellow Dream 100ml* — 24 000 DA
  88. ID 133 : *Valentino Voce Viva Intensa Eau de Parfum 100ml* — 24 000 DA
  89. ID 134 : *Valentino Voce Viva Eau de Parfum 100ml* — 23 000 DA
  90. ID 135 : *Carolina Herrera Good Girl Blush Elixir 80ml* — 24 000 DA
  91. ID 136 : *Carolina Herrera Very Good Girl Glam 80ml* — 23 000 DA
  92. ID 137 : *Carolina Herrera 212 VIP Rosé Elixir 80ml* — 21 000 DA
  93. ID 138 : *Carolina Herrera 212 Heroes For Her 80ml* — 19 500 DA
  94. ID 139 : *Jean Paul Gaultier Divine Le Parfum 100ml* — 24 000 DA
  95. ID 140 : *Jean Paul Gaultier Gaultier Divine 100ml* — 23 000 DA
  96. ID 141 : *Jean Paul Gaultier Scandal Absolu Pour Femme 80ml* — 23 500 DA
  97. ID 142 : *D&G Devotion for Men Eau de Parfum 100ml* — 24 000 DA
  98. ID 143 : *Burberry Hero Eau de Toilette 150ml* — 19 800 DA (variante 100ml fusionnée)
  99. ID 144 : *Prada Luna Rossa Ocean Le Parfum 100ml* — 25 500 DA
  100. ID 145 : *Prada Luna Rossa Black Eau de Parfum 100ml* — 23 000 DA

### Lot 6 (IDs 146 à 165) — 20 Parfums
- **Commit :** `612181e` — `feat(import): lot 6/10 - importation de 20 parfums`
- **Produits :**
  101. ID 146 : *Burberry Hero Eau de Parfum 150ml* — 24 000 DA (variante 100ml fusionnée)
  102. ID 147 : *Azzaro Chrome Eau de Toilette 100ml* — 12 900 DA
  103. ID 148 : *Azzaro The Most Wanted Parfum 100ml* — 21 000 DA
  104. ID 149 : *Azzaro Wanted Eau de Parfum 100ml* — 19 000 DA
  105. ID 150 : *Azzaro Wanted Eau de Toilette 100ml* — 17 500 DA
  106. ID 151 : *Paco Rabanne Invictus Parfum 100ml* — 22 500 DA
  107. ID 152 : *Paco Rabanne Invictus Victory Elixir 100ml* — 22 000 DA
  108. ID 153 : *Paco Rabanne Invictus Victory 100ml* — 21 000 DA
  109. ID 154 : *Paco Rabanne Phantom Parfum 100ml* — 21 000 DA
  110. ID 155 : *Paco Rabanne Phantom Eau de Toilette 100ml* — 19 500 DA
  111. ID 156 : *Givenchy Gentleman Society Eau de Parfum Extrême 100ml* — 22 000 DA
  112. ID 157 : *Givenchy Gentleman Society Eau de Parfum 100ml* — 21 000 DA
  113. ID 158 : *Givenchy Gentleman Réserve Privée 100ml* — 21 000 DA
  114. ID 159 : *Givenchy Gentleman Eau de Parfum Boisée 100ml* — 20 500 DA
  115. ID 160 : *Givenchy Gentleman Eau de Parfum 100ml* — 20 000 DA
  116. ID 161 : *Givenchy Gentleman Eau de Toilette Intense 100ml* — 19 000 DA
  117. ID 162 : *Givenchy Gentleman Eau de Toilette 100ml* — 18 000 DA
  118. ID 163 : *Boss Bottled Elixir Parfum Intense 100ml* — 21 000 DA
  119. ID 164 : *Boss Bottled Parfum 100ml* — 19 500 DA
  120. ID 165 : *Boss Bottled Eau de Parfum 100ml* — 18 500 DA

### Lot 7 (IDs 166 à 185) — 20 Parfums
- **Commit :** `0a88031` — `feat(import): lot 7/10 - importation de 20 parfums`
- **Produits :**
  121. ID 166 : *Hugo Man Eau de Toilette 200ml* — 14 500 DA (variante 125ml fusionnée)
  122. ID 167 : *Boss Man Eau de Toilette 100ml* — 11 500 DA
  123. ID 168 : *Hugo Man Extreme Eau de Parfum 75ml* — 11 500 DA
  124. ID 169 : *Hugo Just Different Eau de Toilette 75ml* — 11 500 DA
  125. ID 170 : *Hugo Energise Eau de Toilette 75ml* — 11 500 DA
  126. ID 171 : *Hugo Dark Blue Eau de Toilette 75ml* — 11 500 DA
  127. ID 172 : *Boss Bottled Absolu Parfum Intense 100ml* — 23 000 DA
  128. ID 173 : *Boss Bottled Triumph Elixir Parfum Intense 100ml* — 21 000 DA
  129. ID 174 : *Montblanc Legend Elixir Parfum 100ml* — 18 500 DA
  130. ID 175 : *Montblanc Legend Red Eau de Parfum 100ml* — 13 000 DA
  131. ID 176 : *Viktor&Rolf Spicebomb Extreme Eau de Parfum 90ml* — 22 000 DA
  132. ID 177 : *Viktor&Rolf Spicebomb Dark Leather Eau de Parfum 90ml* — 23 000 DA
  133. ID 178 : *Viktor&Rolf Spicebomb Metallic Musk Eau de Parfum 90ml* — 22 000 DA
  134. ID 179 : *Paco Rabanne One Million Royal Parfum 100ml* — 23 000 DA
  135. ID 180 : *Paco Rabanne One Million Oud Dahabi Parfum 100ml* — 27 000 DA
  136. ID 181 : *Dior Sauvage Eau de Toilette 100ml* — 27 000 DA
  137. ID 182 : *Dior Sauvage Eau de Parfum 100ml* — 29 000 DA
  138. ID 183 : *Dior Sauvage Eau Forte 100ml* — 28 500 DA
  139. ID 184 : *Dior Homme Intense Eau de Parfum 150ml* — 36 000 DA (variante 100ml fusionnée)
  140. ID 185 : *Dior Homme Parfum 75ml* — 35 000 DA

### Lot 8 (IDs 186 à 205) — 20 Parfums
- **Commit :** `7989cf4` — `feat(import): lot 8/10 - importation de 20 parfums`
- **Produits :**
  141. ID 186 : *Bleu de Chanel Eau de Parfum 150ml* — 42 000 DA (variante 100ml fusionnée)
  142. ID 187 : *Bleu de Chanel Parfum 150ml* — 46 000 DA (variante 100ml fusionnée)
  143. ID 188 : *Dior Homme Édition Blanche Eau de Parfum 150ml* — 41 000 DA (variante 100ml fusionnée)
  144. ID 189 : *Chanel Allure Homme Sport Superleggera 100ml* — 37 000 DA
  145. ID 190 : *Chanel Allure Homme Sport Eau de Toilette 100ml* — 36 000 DA
  146. ID 191 : *Dior Homme Cologne 200ml* — 38 000 DA
  147. ID 192 : *Bleu de Chanel Exclusive Parfum 100ml* — 55 000 DA
  148. ID 193 : *CK One Eau de Toilette 200ml* — 12 000 DA
  149. ID 194 : *Carolina Herrera 212 Men MTV 100ml* — 19 900 DA
  150. ID 195 : *Carolina Herrera 212 Men NYC 100ml* — 19 000 DA
  151. ID 196 : *Guerlain Oud Essentiel Eau de Parfum 125ml* — 30 000 DA
  152. ID 197 : *Guerlain Épices Exquises Eau de Parfum 125ml* — 30 000 DA
  153. ID 198 : *Guerlain Patchouli Ardent Eau de Parfum 125ml* — 30 000 DA
  154. ID 199 : *Guerlain Cuir Intense Eau de Parfum 125ml* — 30 000 DA
  155. ID 200 : *D&G The One for Men Eau de Parfum 150ml* — 25 000 DA
  156. ID 201 : *Mancera Red Tobacco Eau de Parfum 120ml* — 21 000 DA
  157. ID 202 : *Mancera Tobacco Intense Eau de Parfum 120ml* — 26 000 DA
  158. ID 203 : *Kenzo Homme Eau de Toilette 110ml* — 21 000 DA
  159. ID 204 : *Kenzo Homme Eau de Parfum 110ml* — 23 000 DA
  160. ID 205 : *YSL 37 Rue de Bellechasse Oud-Élémi 125ml* — 85 000 DA (contenance estimée 125ml)

### Lot 9 (IDs 206 à 225) — 20 Parfums
- **Commit :** `bea2fee` — `feat(import): lot 9/10 - importation de 20 parfums`
- **Produits :**
  161. ID 206 : *YSL Lavallière Accord Figue-Rose 125ml* — 58 000 DA
  162. ID 207 : *Vertus Chaos Eau de Parfum 100ml* — 38 500 DA
  163. ID 208 : *Nishane Hacivat Extrait de Parfum 100ml* — 49 000 DA (contenance estimée 100ml)
  164. ID 209 : *My Univers Privé Ramón Béjar Deep Amber Extrait 100ml* — 70 000 DA
  165. ID 210 : *My Univers Privé Ramón Béjar Black Stone Extrait 100ml* — 70 000 DA
  166. ID 211 : *Ramón Béjar Anima Viva Extrait de Parfum 100ml* — 150 000 DA (contenance estimée 100ml)
  167. ID 212 : *Unique’e Luxury Ocean the Rive 100ml* — 55 000 DA (contenance estimée 100ml)
  168. ID 213 : *Atelier Versace Fleur de Maté Eau de Parfum 100ml* — 46 000 DA
  169. ID 214 : *Atelier Versace Iris d’Élite Eau de Parfum 100ml* — 46 000 DA
  170. ID 215 : *The Spirit of Dubai Meydan Eau de Parfum 100ml* — 46 000 DA (contenance estimée 100ml)
  171. ID 216 : *BDK Parfums Paris Gris Charnel Extrait 100ml* — 54 000 DA
  172. ID 217 : *Rosendo Mateu Olfactive Expressions Nº 5 100ml* — 33 000 DA
  173. ID 218 : *Unique’e Luxury Crush on Me Extrait 100ml* — 50 000 DA
  174. ID 219 : *Unique’e Luxury Akdeniz Extrait 100ml* — 40 000 DA
  175. ID 220 : *Penhaligon’s Babylon Eau de Parfum 100ml* — 55 000 DA
  176. ID 221 : *Penhaligon’s Endymion Cologne 100ml* — 53 000 DA
  177. ID 222 : *Penhaligon’s Constantinople Eau de Parfum 100ml* — 62 000 DA
  178. ID 223 : *Penhaligon’s Legacy of Petra Eau de Parfum 100ml* — 60 000 DA
  179. ID 224 : *Penhaligon’s Solaris Eau de Parfum 100ml* — 50 000 DA
  180. ID 225 : *Penhaligon’s Juniper Sling Eau de Toilette 100ml* — 55 000 DA (prix corrigé)

### Lot 10 (IDs 226 à 234) — 9 Parfums (Final)
- **Commit :** `b485b81` — `feat(import): lot 10/10 - importation de 9 parfums (fin de phase 2)`
- **Produits :**
  181. ID 226 : *Amouage Guidance 100ml* — 85 000 DA (contenance estimée 100ml)
  182. ID 227 : *Omanluxury Khanjar Eau de Parfum 100ml* — 56 000 DA
  183. ID 228 : *Amouage Lustre 100ml* — 78 000 DA (contenance estimée 100ml)
  184. ID 229 : *Xerjoff Casamorati 1888 Mefisto 100ml* — 50 000 DA
  185. ID 230 : *Xerjoff Erba Gold Eau de Parfum 100ml* — 52 000 DA
  186. ID 231 : *Xerjoff Erba Pura Eau de Parfum 100ml* — 45 000 DA
  187. ID 232 : *Penhaligon’s The Coveted Duchess Rose 75ml* — 42 000 DA (contenance estimée 75ml)
  188. ID 233 : *YSL Exquisite Embroidery Accord Rose Ambre Gris 125ml* — 75 000 DA
  189. ID 234 : *YSL Wild Leather Accord Cuir Eau de Parfum 75ml* — 42 000 DA

---

## 4. Audit des Visuels & Respect des Règles Absolues

1. **Zéro photo issue des dossiers interdits :**
   - Aucune image n'a été prélevée dans `Fond blanc` ni dans `photos coffrets`.
   - Tous les visuels proviennent exclusivement des répertoires autorisés :
     - `perfumes/Photos site web/Designer`
     - `perfumes/Photos site web/photos designer homme`
     - `perfumes/Photos site web/missing-perfumes`
2. **Unicité absolue des correspondances :**
   - Chacun des 189 parfums dispose d'un visuel unique et fidèle. Aucun visuel n'a été dupliqué ou attribué par approximation.
3. **Exclusion stricte des produits sans visuel (`missing-images.md`) :**
   - Exactement 4 produits pour lesquels aucun flacon fiable n'existait dans les dossiers autorisés ont été écartés de la publication et documentés dans `scripts/import-report/missing-images.md` :
     - *Paco Rabanne Olympéa Flora Eau de Parfum Intense 80 ml*
     - *Valentino Uomo Born in Roma Intense 100 ml*
     - *Christian Louboutin Louboutin Hiristan*
     - *Xerjoff Casamorati 1888 Italica Eau de Parfum 100 ml*
4. **Optimisation des dérivés WebP :**
   - Le pipeline `scripts/optimize-images.mjs` a généré les variantes optimisées et redimensionnées dans `public/img/perfumes/` et `web/public/img/perfumes/`, assurant un affichage instantané et fluide sur mobile et desktop.

---

## 5. Traduction et Internationalisation (i18n)

Chaque nouveau parfum bénéficie d'une fiche complète et personnalisée dans les 3 langues du site :
- **Français (FR) :** Description poétique riche, histoire de la création, pyramide olfactive complète (tête, cœur, fond), badges évocateurs, longévité et sillage.
- **Anglais (EN) :** Vocabulaire luxueux inspiré de la haute parfumerie internationale.
- **Arabe (AR) :** Style littéraire soutenu (*فصحى راقية*), avec terminologie olfactive adaptée et mise en valeur des accords orientaux, floraux et boisés.

Toutes les traductions sont stockées de façon pérenne dans `scripts/catalog-translations.json` et synchronisées avec `web/src/data/translations.json`.

---

## 6. Contrôle Qualité Technique

- **Préservation des 45 produits initiaux :** Les données des produits 1 à 45 n'ont subi aucune modification (ni dans leur typologie, ni dans leurs prix ou leurs visuels).
- **Architecture et Design :** Aucun composant React, layout, ni feuille de style CSS du site n'a été altéré.
- **ESLint :** Exécuté après chaque lot avec un résultat sans faille (0 erreur, 0 avertissement).
- **Next.js 16.3.4 Turbopack :** 730 pages statiques compilées avec succès, incluant l'ensemble des routes dynamiques `/[locale]/parfums/[slug]` en `fr`, `en` et `ar`.

---

## 7. Journal des Commits Git (`import-parfums`)

```
b485b81 feat(import): lot 10/10 - importation de 9 parfums (fin de phase 2)
bea2fee feat(import): lot 9/10 - importation de 20 parfums
7989cf4 feat(import): lot 8/10 - importation de 20 parfums
0a88031 feat(import): lot 7/10 - importation de 20 parfums
612181e feat(import): lot 6/10 - importation de 20 parfums
09c5032 feat(import): lot 5/10 - importation de 20 parfums
21089a0 feat(import): lot 4/10 - importation de 20 parfums
4ba8a83 feat(import): lot 3/10 - importation de 20 parfums
0ad4f31 feat(import): lot 2/10 - importation de 20 parfums
6e62b07 feat(import): lot 1/10 - importation de 20 parfums
8604e38 feat(import): etape 0, audit phase 0 et plan d import phase 1
```

---

*Mission d'importation accomplie avec succès et rigueur totale sur la branche `import-parfums`.*
