# Rapport — Mise à jour des prix Strapi multi-locales (`maj-prix-strapi`)

**Date :** 2026-11-01T15:51:19.334Z
**URL Strapi :** https://cms-dar.blu-path.com
**Produits vérifiés :** 44
**Statut global :** ✅ 100% Conforme sur toutes les locales et statuts

## Cause identifiée de l'écart initial

Dans Strapi 5 avec le plugin d'internationalisation (`i18n`), chaque langue (`fr`, `en`, `ar`) possède ses propres entités indépendantes de brouillon (`draft`) et de publication (`published`). L'écriture précédente sans paramètre `locale` n'avait ciblé que la langue par défaut (`fr`), laissant les brouillons anglophones (`en`) et arabophones (`ar`) avec les anciens prix lors de la consultation dans l'admin Strapi.

## Tableau comparatif complet (Site local vs Strapi draft & published)

| n° | Produit | Slug | Site local | Strapi Draft (FR / EN / AR) | Strapi Published (FR / EN / AR) | Statut |
|---|---|---|---|---|---|---|
| 1 | Elie Saab EDP 90ml | `elie-saab-le-parfum` | **22 900 DA** | 22 900 DA / 22 900 DA / 22 900 DA | 22 900 DA / 22 900 DA / 22 900 DA | ✅ Conforme |
| 2 | Gucci Bloom Ambrosia d'Or EDP 100ml | `gucci-bloom-ambrosia-di-fiori` | **26 500 DA** | — / 26 500 DA / 26 500 DA | — / 26 500 DA / 26 500 DA | ✅ Conforme |
| 3 | My Burberry Blush EDP 90ml | `burberry-my-burberry-blush` | **21 000 DA** | 21 000 DA / 21 000 DA / 21 000 DA | 21 000 DA / 21 000 DA / 21 000 DA | ✅ Conforme |
| 4 | Mademoiselle Rochas EDP 90ml | `rochas-mademoiselle-rochas` | **15 500 DA** | 15 500 DA / 15 500 DA / 15 500 DA | 15 500 DA / 15 500 DA / 15 500 DA | ✅ Conforme |
| 5 | Jean Paul Gaultier Divine Couture EDP 100ml | `jean-paul-gaultier-divine-couture` | **29 000 DA** | 29 000 DA / 29 000 DA / 29 000 DA | 29 000 DA / 29 000 DA / 29 000 DA | ✅ Conforme |
| 6 | Valentino Born in Roma EDP 100ml (femme) | `valentino-donna-born-in-roma` | **28 500 DA** | 28 500 DA / 28 500 DA / 28 500 DA | 28 500 DA / 28 500 DA / 28 500 DA | ✅ Conforme |
| 7 | Valentino Born in Roma Intense EDP 100ml (femme) | `valentino-donna-born-in-roma-intense` | **29 900 DA** | 29 900 DA / 29 900 DA / 29 900 DA | 29 900 DA / 29 900 DA / 29 900 DA | ✅ Conforme |
| 8 | D&G Devotion EDP 100ml (femme) | `dolce-gabbana-devotion-femme` | **27 000 DA** | 27 000 DA / 27 000 DA / 27 000 DA | 27 000 DA / 27 000 DA / 27 000 DA | ✅ Conforme |
| 9 | Givenchy L'Interdit Rouge 80ml | `givenchy-l-interdit-rouge` | **27 000 DA** | 27 000 DA / 27 000 DA / 27 000 DA | 27 000 DA / 27 000 DA / 27 000 DA | ✅ Conforme |
| 10 | Givenchy L'Interdit Rouge Ultime 80ml | `givenchy-l-interdit-rouge-ultime` | **28 500 DA** | 28 500 DA / 28 500 DA / 28 500 DA | 28 500 DA / 28 500 DA / 28 500 DA | ✅ Conforme |
| 11 | L'Instant de Guerlain Femme 75ml | `guerlain-l-instant-de-guerlain-femme` | **21 000 DA** | 21 000 DA / 21 000 DA / 21 000 DA | 21 000 DA / 21 000 DA / 21 000 DA | ✅ Conforme |
| 12 | Dior J'adore Intense Parfum 100ml | `christian-dior-dior-j-adore-intense-2` | **38 000 DA** | 38 000 DA / 38 000 DA / 38 000 DA | 38 000 DA / 38 000 DA / 38 000 DA | ✅ Conforme |
| 13 | Rabanne Fame In Love Elixir 80ml | `paco-rabanne-rabanne-fame-in-love` | **30 000 DA** | 30 000 DA / 30 000 DA / 30 000 DA | 30 000 DA / 30 000 DA / 30 000 DA | ✅ Conforme |
| 14 | Lancôme Idôle Peach & Rose 100ml | `lancome-idole-peach-rose` | **30 000 DA** | 30 000 DA / 30 000 DA / 30 000 DA | 30 000 DA / 30 000 DA / 30 000 DA | ✅ Conforme |
| 15 | D&G L'Impératrice EDT 100ml | `dolce-gabbana-l-imperatrice` | **12 500 DA** | 12 500 DA / 12 500 DA / 12 500 DA | 12 500 DA / 12 500 DA / 12 500 DA | ✅ Conforme |
| 16 | Rochas Audace EDP (100ml en catalogue) | `rochas-audace` | **18 000 DA** | 18 000 DA / 18 000 DA / 18 000 DA | 18 000 DA / 18 000 DA / 18 000 DA | ✅ Conforme |
| 17 | D&G King EDP 200ml | `dolce-gabbana-k-king-200ml-eau-de-parfum` | **25 000 DA** | 25 000 DA / 25 000 DA / 25 000 DA | 25 000 DA / 25 000 DA / 25 000 DA | ✅ Conforme |
| 18 | D&G The One EDP Intense 100ml | `dolce-gabbana-the-one-eau-de-parfum-intense` | **21 000 DA** | 21 000 DA / 21 000 DA / 21 000 DA | 21 000 DA / 21 000 DA / 21 000 DA | ✅ Conforme |
| 19 | Azzaro Wanted by Night EDP 100ml | `azzaro-wanted-by-night` | **19 500 DA** | 19 500 DA / 19 500 DA / 19 500 DA | 19 500 DA / 19 500 DA / 19 500 DA | ✅ Conforme |
| 20 | Valentino Uomo Born in Roma 100ml | `valentino-uomo-born-in-roma-extra-dose` | **27 800 DA** | 27 800 DA / 27 800 DA / 27 800 DA | 27 800 DA / 27 800 DA / 27 800 DA | ✅ Conforme |
| 21 | Paco Rabanne Invictus Victory Elixir 100ml | `paco-rabanne-invictus-victory-elixir` | **25 000 DA** | 25 000 DA / 25 000 DA / 25 000 DA | 25 000 DA / 25 000 DA / 25 000 DA | ✅ Conforme |
| 22 | YSL MYSLF Le Parfum 100ml | `yves-saint-laurent-myslf-le-parfum` | **29 800 DA** | 29 800 DA / 29 800 DA / 29 800 DA | 29 800 DA / 29 800 DA / 29 800 DA | ✅ Conforme |
| 23 | YSL MYSLF EDP 100ml | `yves-saint-laurent-myslf-eau-de-parfum` | **24 800 DA** | 24 800 DA / 24 800 DA / 24 800 DA | 24 800 DA / 24 800 DA / 24 800 DA | ✅ Conforme |
| 24 | YSL La Nuit de L'Homme EDP | `yves-saint-laurent-la-nuit-de-l-homme-eau-de-parfum` | **26 000 DA** | 26 000 DA / 26 000 DA / 26 000 DA | 26 000 DA / 26 000 DA / 26 000 DA | ✅ Conforme |
| 25 | Givenchy Gentleman EDP 100ml | `givenchy-gentleman-eau-de-parfum` | **20 500 DA** | 20 500 DA / 20 500 DA / 20 500 DA | 20 500 DA / 20 500 DA / 20 500 DA | ✅ Conforme |
| 26 | Givenchy Gentleman Society Ambrée EDP 100ml | `givenchy-gentleman-society-ambree` | **27 500 DA** | 27 500 DA / 27 500 DA / 27 500 DA | 27 500 DA / 27 500 DA / 27 500 DA | ✅ Conforme |
| 27 | Emporio Armani Stronger With You Powerfully EDP | `giorgio-armani-emporio-armani-stronger-with-you-you-powerfully` | **26 800 DA** | 26 800 DA / 26 800 DA / 26 800 DA | 26 800 DA / 26 800 DA / 26 800 DA | ✅ Conforme |
| 28 | Giorgio Armani Acqua Di Giò EDP | `giorgio-armani-acqua-di-gio-eau-de-parfum` | **25 000 DA** | 25 000 DA / 25 000 DA / 25 000 DA | 25 000 DA / 25 000 DA / 25 000 DA | ✅ Conforme |
| 29 | Hermès Terre d'Hermès EDP Intense 100ml | `hermes-terre-d-hermes-intense` | **25 800 DA** | 25 800 DA / 25 800 DA / 25 800 DA | 25 800 DA / 25 800 DA / 25 800 DA | ✅ Conforme |
| 30 | JPG Scandal Intense 150ml | `jean-paul-gaultier-scandal-intense-150ml` | **29 000 DA** | 29 000 DA / 29 000 DA / 29 000 DA | 29 000 DA / 29 000 DA / 29 000 DA | ✅ Conforme |
| 31 | JPG Scandal Elixir 100ml | `jean-paul-gaultier-scandal-pour-homme-elixir` | **31 000 DA** | 31 000 DA / 31 000 DA / 31 000 DA | 31 000 DA / 31 000 DA / 31 000 DA | ✅ Conforme |
| 32 | Lacoste Booster EDT 125ml | `lacoste-booster` | **13 000 DA** | 13 000 DA / 13 000 DA / 13 000 DA | 13 000 DA / 13 000 DA / 13 000 DA | ✅ Conforme |
| 33 | Hugo Man EDT 200ml | `hugo-boss-hugo-man-eau-de-toilette-200ml` | **17 000 DA** | 17 000 DA / 17 000 DA / 17 000 DA | 17 000 DA / 17 000 DA / 17 000 DA | ✅ Conforme |
| 34 | Boss Man EDT 100ml | `hugo-boss-boss-man-eau-de-toilette` | **14 000 DA** | 14 000 DA / 14 000 DA / 14 000 DA | 14 000 DA / 14 000 DA / 14 000 DA | ✅ Conforme |
| 35 | Hugo Just Different EDT 75ml | `hugo-boss-hugo-just-different` | **10 800 DA** | 10 800 DA / 10 800 DA / 10 800 DA | 10 800 DA / 10 800 DA / 10 800 DA | ✅ Conforme |
| 36 | Hugo Energise EDT 75ml | `hugo-boss-hugo-energise` | **10 800 DA** | 10 800 DA / 10 800 DA / 10 800 DA | 10 800 DA / 10 800 DA / 10 800 DA | ✅ Conforme |
| 37 | Hugo Dark Blue EDT 75ml | `hugo-boss-hugo-dark-blue` | **10 000 DA** | 10 000 DA / 10 000 DA / 10 000 DA | 10 000 DA / 10 000 DA / 10 000 DA | ✅ Conforme |
| 38 | Boss Bottled Absolu Parfum Intense 100ml | `hugo-boss-boss-bottled-absolu-parfum-intense` | **25 000 DA** | 25 000 DA / 25 000 DA / 25 000 DA | 25 000 DA / 25 000 DA / 25 000 DA | ✅ Conforme |
| 39 | Boss Bottled Triumph Elixir Parfum Intense 100ml | `hugo-boss-boss-bottled-triumph-elixir-parfum-intense` | **25 000 DA** | 25 000 DA / 25 000 DA / 25 000 DA | 25 000 DA / 25 000 DA / 25 000 DA | ✅ Conforme |
| 40 | Montblanc Legend Elixir Parfum 100ml | `montblanc-legend-elixir-parfum` | **16 800 DA** | 16 800 DA / 16 800 DA / 16 800 DA | 16 800 DA / 16 800 DA / 16 800 DA | ✅ Conforme |
| 41 | Dior Sauvage Le Parfum 100ml | `christian-dior-dior-sauvage-le-parfum` | **31 000 DA** | 31 000 DA / 31 000 DA / 31 000 DA | 31 000 DA / 31 000 DA / 31 000 DA | ✅ Conforme |
| 42 | Dior Sauvage Elixir 100ml | `christian-dior-dior-sauvage-elixir-100ml` | **32 500 DA** | 32 500 DA / 32 500 DA / 32 500 DA | 32 500 DA / 32 500 DA / 32 500 DA | ✅ Conforme |
| 43 | Guerlain Oud Essentiel EDP 125ml | `guerlain-oud-essentiel-eau-de-parfum` | **30 000 DA** | 30 000 DA / 30 000 DA / 30 000 DA | 30 000 DA / 30 000 DA / 30 000 DA | ✅ Conforme |
| 44 | Kenzo Homme Indigo EDP 110ml | `kenzo-homme-indigo-santal-marin` | **22 000 DA** | 22 000 DA / 22 000 DA / 22 000 DA | 22 000 DA / 22 000 DA / 22 000 DA | ✅ Conforme |
