# Rapport de Vérification & Audit Brut Strapi (`maj-prix-strapi-v2`)

**Date :** 2026-11-01T16:03:50.116Z
**URL Strapi :** https://cms-dar.blu-path.com
**Total évaluations (44 produits × 3 locales) :** 132
**Résultat brut :** 132 OK / 0 KO

## 1. Explication du compte et des écarts (78 vs 132)

- Il y a **44 produits** au catalogue.
- Strapi gère **3 locales** : `fr` (Français), `en` (Anglais), `ar` (Arabe). Soit 44 × 3 = **132 configurations uniques** (brouillon + publié).
- Lors du premier run, seules les 39 entrées de la locale par défaut (`fr`) avaient été modifiées (5 étaient déjà conformes : n° 1, 2, 12, 33, 43).
- Lors du second run ciblant les autres langues, exactement **78 entrées locales** ont été mises à jour (39 produits × 2 locales `en` et `ar`).
- **Cas particulier Gucci Bloom Ambrosia d'Or (n° 2) :** Son slug en `fr` dans Strapi est `gucci-bloom-ambrosia-d-0-r-o` (au lieu de `gucci-bloom-ambrosia-di-fiori` en `en` et `ar`). Le produit existe bien dans les 3 langues sous le même `documentId: siikfwjoy1wb08mgdeyjnp7w` et au bon prix (26 500 DA).

## 2. Tableau Brut (44 produits × 3 locales × draft & published)

| n° | Locale | documentId | Slug | Variante | Prix Draft | Prix Published | Prix Attendu | Statut |
|---|---|---|---|---|---|---|---|---|
| 1 | fr | `g5wwcm72xrcwd6ywxcz44j76` | `elie-saab-le-parfum` | id:406, 90ml | 22900 DA | 22900 DA | 22900 DA | ✅ OK |
| 1 | en | `g5wwcm72xrcwd6ywxcz44j76` | `elie-saab-le-parfum` | id:408, 90ml | 22900 DA | 22900 DA | 22900 DA | ✅ OK |
| 1 | ar | `g5wwcm72xrcwd6ywxcz44j76` | `elie-saab-le-parfum` | id:411, 90ml | 22900 DA | 22900 DA | 22900 DA | ✅ OK |
| 2 | fr | `siikfwjoy1wb08mgdeyjnp7w` | `gucci-bloom-ambrosia-d-0-r-o` | id:2274, 100ml | 26500 DA | 26500 DA | 26500 DA | ✅ OK |
| 2 | en | `siikfwjoy1wb08mgdeyjnp7w` | `gucci-bloom-ambrosia-di-fiori` | id:2113, 100ml | 26500 DA | 26500 DA | 26500 DA | ✅ OK |
| 2 | ar | `siikfwjoy1wb08mgdeyjnp7w` | `gucci-bloom-ambrosia-di-fiori` | id:2112, 100ml | 26500 DA | 26500 DA | 26500 DA | ✅ OK |
| 3 | fr | `ozd49yc5ovdxkh6mwhmh8xzz` | `burberry-my-burberry-blush` | id:2114, 90ml | 21000 DA | 21000 DA | 21000 DA | ✅ OK |
| 3 | en | `ozd49yc5ovdxkh6mwhmh8xzz` | `burberry-my-burberry-blush` | id:2278, 90ml | 21000 DA | 21000 DA | 21000 DA | ✅ OK |
| 3 | ar | `ozd49yc5ovdxkh6mwhmh8xzz` | `burberry-my-burberry-blush` | id:2282, 90ml | 21000 DA | 21000 DA | 21000 DA | ✅ OK |
| 4 | fr | `er84k5q8nyvnqiv9nz0pbuus` | `rochas-mademoiselle-rochas` | id:2118, 90ml | 15500 DA | 15500 DA | 15500 DA | ✅ OK |
| 4 | en | `er84k5q8nyvnqiv9nz0pbuus` | `rochas-mademoiselle-rochas` | id:2284, 90ml | 15500 DA | 15500 DA | 15500 DA | ✅ OK |
| 4 | ar | `er84k5q8nyvnqiv9nz0pbuus` | `rochas-mademoiselle-rochas` | id:2288, 90ml | 15500 DA | 15500 DA | 15500 DA | ✅ OK |
| 5 | fr | `jnok7r1r08zd8p5jyrithv7q` | `jean-paul-gaultier-divine-couture` | id:2122, 100ml | 29000 DA | 29000 DA | 29000 DA | ✅ OK |
| 5 | en | `jnok7r1r08zd8p5jyrithv7q` | `jean-paul-gaultier-divine-couture` | id:2290, 100ml | 29000 DA | 29000 DA | 29000 DA | ✅ OK |
| 5 | ar | `jnok7r1r08zd8p5jyrithv7q` | `jean-paul-gaultier-divine-couture` | id:2294, 100ml | 29000 DA | 29000 DA | 29000 DA | ✅ OK |
| 6 | fr | `wnaagtpole93kwkktor55063` | `valentino-donna-born-in-roma` | id:2126, 100ml | 28500 DA | 28500 DA | 28500 DA | ✅ OK |
| 6 | en | `wnaagtpole93kwkktor55063` | `valentino-donna-born-in-roma` | id:2296, 100ml | 28500 DA | 28500 DA | 28500 DA | ✅ OK |
| 6 | ar | `wnaagtpole93kwkktor55063` | `valentino-donna-born-in-roma` | id:2300, 100ml | 28500 DA | 28500 DA | 28500 DA | ✅ OK |
| 7 | fr | `fhbw38v7aogvdrj8fhc3q5ce` | `valentino-donna-born-in-roma-intense` | id:2130, 100ml | 29900 DA | 29900 DA | 29900 DA | ✅ OK |
| 7 | en | `fhbw38v7aogvdrj8fhc3q5ce` | `valentino-donna-born-in-roma-intense` | id:2302, 100ml | 29900 DA | 29900 DA | 29900 DA | ✅ OK |
| 7 | ar | `fhbw38v7aogvdrj8fhc3q5ce` | `valentino-donna-born-in-roma-intense` | id:2306, 100ml | 29900 DA | 29900 DA | 29900 DA | ✅ OK |
| 8 | fr | `dkjd15s0h3k2wwc0xdepsy7x` | `dolce-gabbana-devotion-femme` | id:2134, 100ml | 27000 DA | 27000 DA | 27000 DA | ✅ OK |
| 8 | en | `dkjd15s0h3k2wwc0xdepsy7x` | `dolce-gabbana-devotion-femme` | id:2308, 100ml | 27000 DA | 27000 DA | 27000 DA | ✅ OK |
| 8 | ar | `dkjd15s0h3k2wwc0xdepsy7x` | `dolce-gabbana-devotion-femme` | id:2312, 100ml | 27000 DA | 27000 DA | 27000 DA | ✅ OK |
| 9 | fr | `xrnxylu9fsuztb1hz0cqn2z8` | `givenchy-l-interdit-rouge` | id:2138, 80ml | 27000 DA | 27000 DA | 27000 DA | ✅ OK |
| 9 | en | `xrnxylu9fsuztb1hz0cqn2z8` | `givenchy-l-interdit-rouge` | id:2314, 80ml | 27000 DA | 27000 DA | 27000 DA | ✅ OK |
| 9 | ar | `xrnxylu9fsuztb1hz0cqn2z8` | `givenchy-l-interdit-rouge` | id:2318, 80ml | 27000 DA | 27000 DA | 27000 DA | ✅ OK |
| 10 | fr | `rgyyq3mup3j3zwoyw3k9ccsn` | `givenchy-l-interdit-rouge-ultime` | id:2142, 80ml | 28500 DA | 28500 DA | 28500 DA | ✅ OK |
| 10 | en | `rgyyq3mup3j3zwoyw3k9ccsn` | `givenchy-l-interdit-rouge-ultime` | id:2320, 80ml | 28500 DA | 28500 DA | 28500 DA | ✅ OK |
| 10 | ar | `rgyyq3mup3j3zwoyw3k9ccsn` | `givenchy-l-interdit-rouge-ultime` | id:2324, 80ml | 28500 DA | 28500 DA | 28500 DA | ✅ OK |
| 11 | fr | `emnm45fwuok58pgwm7wmsdmt` | `guerlain-l-instant-de-guerlain-femme` | id:2146, 75ml | 21000 DA | 21000 DA | 21000 DA | ✅ OK |
| 11 | en | `emnm45fwuok58pgwm7wmsdmt` | `guerlain-l-instant-de-guerlain-femme` | id:2326, 75ml | 21000 DA | 21000 DA | 21000 DA | ✅ OK |
| 11 | ar | `emnm45fwuok58pgwm7wmsdmt` | `guerlain-l-instant-de-guerlain-femme` | id:2330, 75ml | 21000 DA | 21000 DA | 21000 DA | ✅ OK |
| 12 | fr | `zcrrgmcjok00sx26ogfpnzbz` | `christian-dior-dior-j-adore-intense-2` | id:811, 100ml | 38000 DA | 38000 DA | 38000 DA | ✅ OK |
| 12 | en | `zcrrgmcjok00sx26ogfpnzbz` | `christian-dior-dior-j-adore-intense-2` | id:813, 100ml | 38000 DA | 38000 DA | 38000 DA | ✅ OK |
| 12 | ar | `zcrrgmcjok00sx26ogfpnzbz` | `christian-dior-dior-j-adore-intense-2` | id:816, 100ml | 38000 DA | 38000 DA | 38000 DA | ✅ OK |
| 13 | fr | `hytc1zoy7yw0c2svvu8sr29g` | `paco-rabanne-rabanne-fame-in-love` | id:2150, 80ml | 30000 DA | 30000 DA | 30000 DA | ✅ OK |
| 13 | en | `hytc1zoy7yw0c2svvu8sr29g` | `paco-rabanne-rabanne-fame-in-love` | id:2332, 80ml | 30000 DA | 30000 DA | 30000 DA | ✅ OK |
| 13 | ar | `hytc1zoy7yw0c2svvu8sr29g` | `paco-rabanne-rabanne-fame-in-love` | id:2336, 80ml | 30000 DA | 30000 DA | 30000 DA | ✅ OK |
| 14 | fr | `g1d4cwlobd8pwo7rtl2x37mi` | `lancome-idole-peach-rose` | id:2154, 100ml | 30000 DA | 30000 DA | 30000 DA | ✅ OK |
| 14 | en | `g1d4cwlobd8pwo7rtl2x37mi` | `lancome-idole-peach-rose` | id:2338, 100ml | 30000 DA | 30000 DA | 30000 DA | ✅ OK |
| 14 | ar | `g1d4cwlobd8pwo7rtl2x37mi` | `lancome-idole-peach-rose` | id:2342, 100ml | 30000 DA | 30000 DA | 30000 DA | ✅ OK |
| 15 | fr | `cdpfxafiigu8iylfw2dz8oli` | `dolce-gabbana-l-imperatrice` | id:2158, 100ml | 12500 DA | 12500 DA | 12500 DA | ✅ OK |
| 15 | en | `cdpfxafiigu8iylfw2dz8oli` | `dolce-gabbana-l-imperatrice` | id:2344, 100ml | 12500 DA | 12500 DA | 12500 DA | ✅ OK |
| 15 | ar | `cdpfxafiigu8iylfw2dz8oli` | `dolce-gabbana-l-imperatrice` | id:2348, 100ml | 12500 DA | 12500 DA | 12500 DA | ✅ OK |
| 16 | fr | `yqs322rdtb7t2rdr2qx5o12d` | `rochas-audace` | id:2162, 100ml | 18000 DA | 18000 DA | 18000 DA | ✅ OK |
| 16 | en | `yqs322rdtb7t2rdr2qx5o12d` | `rochas-audace` | id:2350, 100ml | 18000 DA | 18000 DA | 18000 DA | ✅ OK |
| 16 | ar | `yqs322rdtb7t2rdr2qx5o12d` | `rochas-audace` | id:2354, 100ml | 18000 DA | 18000 DA | 18000 DA | ✅ OK |
| 17 | fr | `w9jn7t0kthfssr2riqvpetlw` | `dolce-gabbana-k-king-200ml-eau-de-parfum` | id:2166, 200ml | 25000 DA | 25000 DA | 25000 DA | ✅ OK |
| 17 | en | `w9jn7t0kthfssr2riqvpetlw` | `dolce-gabbana-k-king-200ml-eau-de-parfum` | id:2356, 200ml | 25000 DA | 25000 DA | 25000 DA | ✅ OK |
| 17 | ar | `w9jn7t0kthfssr2riqvpetlw` | `dolce-gabbana-k-king-200ml-eau-de-parfum` | id:2360, 200ml | 25000 DA | 25000 DA | 25000 DA | ✅ OK |
| 18 | fr | `zpb4lqetmg2eruk5xdklsnen` | `dolce-gabbana-the-one-eau-de-parfum-intense` | id:2170, 100ml | 21000 DA | 21000 DA | 21000 DA | ✅ OK |
| 18 | en | `zpb4lqetmg2eruk5xdklsnen` | `dolce-gabbana-the-one-eau-de-parfum-intense` | id:2362, 100ml | 21000 DA | 21000 DA | 21000 DA | ✅ OK |
| 18 | ar | `zpb4lqetmg2eruk5xdklsnen` | `dolce-gabbana-the-one-eau-de-parfum-intense` | id:2366, 100ml | 21000 DA | 21000 DA | 21000 DA | ✅ OK |
| 19 | fr | `dyry3px4ytqlur5giq2jfb6p` | `azzaro-wanted-by-night` | id:2174, 100ml | 19500 DA | 19500 DA | 19500 DA | ✅ OK |
| 19 | en | `dyry3px4ytqlur5giq2jfb6p` | `azzaro-wanted-by-night` | id:2368, 100ml | 19500 DA | 19500 DA | 19500 DA | ✅ OK |
| 19 | ar | `dyry3px4ytqlur5giq2jfb6p` | `azzaro-wanted-by-night` | id:2372, 100ml | 19500 DA | 19500 DA | 19500 DA | ✅ OK |
| 20 | fr | `v60tvccnmjlsuiw4u2038263` | `valentino-uomo-born-in-roma-extra-dose` | id:2178, 100ml | 27800 DA | 27800 DA | 27800 DA | ✅ OK |
| 20 | en | `v60tvccnmjlsuiw4u2038263` | `valentino-uomo-born-in-roma-extra-dose` | id:2374, 100ml | 27800 DA | 27800 DA | 27800 DA | ✅ OK |
| 20 | ar | `v60tvccnmjlsuiw4u2038263` | `valentino-uomo-born-in-roma-extra-dose` | id:2378, 100ml | 27800 DA | 27800 DA | 27800 DA | ✅ OK |
| 21 | fr | `volx8h086xfnoz0eckp5qnzv` | `paco-rabanne-invictus-victory-elixir` | id:2182, 100ml | 25000 DA | 25000 DA | 25000 DA | ✅ OK |
| 21 | en | `volx8h086xfnoz0eckp5qnzv` | `paco-rabanne-invictus-victory-elixir` | id:2380, 100ml | 25000 DA | 25000 DA | 25000 DA | ✅ OK |
| 21 | ar | `volx8h086xfnoz0eckp5qnzv` | `paco-rabanne-invictus-victory-elixir` | id:2384, 100ml | 25000 DA | 25000 DA | 25000 DA | ✅ OK |
| 22 | fr | `qr20bd99fgnmuxichbcu29na` | `yves-saint-laurent-myslf-le-parfum` | id:2186, 100ml | 29800 DA | 29800 DA | 29800 DA | ✅ OK |
| 22 | en | `qr20bd99fgnmuxichbcu29na` | `yves-saint-laurent-myslf-le-parfum` | id:2386, 100ml | 29800 DA | 29800 DA | 29800 DA | ✅ OK |
| 22 | ar | `qr20bd99fgnmuxichbcu29na` | `yves-saint-laurent-myslf-le-parfum` | id:2390, 100ml | 29800 DA | 29800 DA | 29800 DA | ✅ OK |
| 23 | fr | `lon4l6j5caj9k4s9piv9eoio` | `yves-saint-laurent-myslf-eau-de-parfum` | id:2190, 100ml | 24800 DA | 24800 DA | 24800 DA | ✅ OK |
| 23 | en | `lon4l6j5caj9k4s9piv9eoio` | `yves-saint-laurent-myslf-eau-de-parfum` | id:2392, 100ml | 24800 DA | 24800 DA | 24800 DA | ✅ OK |
| 23 | ar | `lon4l6j5caj9k4s9piv9eoio` | `yves-saint-laurent-myslf-eau-de-parfum` | id:2396, 100ml | 24800 DA | 24800 DA | 24800 DA | ✅ OK |
| 24 | fr | `chfkkomv5sjz5u7n1m6c7792` | `yves-saint-laurent-la-nuit-de-l-homme-eau-de-parfum` | id:2194, 100ml | 26000 DA | 26000 DA | 26000 DA | ✅ OK |
| 24 | en | `chfkkomv5sjz5u7n1m6c7792` | `yves-saint-laurent-la-nuit-de-l-homme-eau-de-parfum` | id:2398, 100ml | 26000 DA | 26000 DA | 26000 DA | ✅ OK |
| 24 | ar | `chfkkomv5sjz5u7n1m6c7792` | `yves-saint-laurent-la-nuit-de-l-homme-eau-de-parfum` | id:2402, 100ml | 26000 DA | 26000 DA | 26000 DA | ✅ OK |
| 25 | fr | `xnwhpckw5dylqlyvrxbob5w3` | `givenchy-gentleman-eau-de-parfum` | id:2198, 100ml | 20500 DA | 20500 DA | 20500 DA | ✅ OK |
| 25 | en | `xnwhpckw5dylqlyvrxbob5w3` | `givenchy-gentleman-eau-de-parfum` | id:2404, 100ml | 20500 DA | 20500 DA | 20500 DA | ✅ OK |
| 25 | ar | `xnwhpckw5dylqlyvrxbob5w3` | `givenchy-gentleman-eau-de-parfum` | id:2408, 100ml | 20500 DA | 20500 DA | 20500 DA | ✅ OK |
| 26 | fr | `oqh692rlnx9tto00th26q2oa` | `givenchy-gentleman-society-ambree` | id:2202, 100ml | 27500 DA | 27500 DA | 27500 DA | ✅ OK |
| 26 | en | `oqh692rlnx9tto00th26q2oa` | `givenchy-gentleman-society-ambree` | id:2410, 100ml | 27500 DA | 27500 DA | 27500 DA | ✅ OK |
| 26 | ar | `oqh692rlnx9tto00th26q2oa` | `givenchy-gentleman-society-ambree` | id:2414, 100ml | 27500 DA | 27500 DA | 27500 DA | ✅ OK |
| 27 | fr | `ss07tblhj6jq3npl11xmys27` | `giorgio-armani-emporio-armani-stronger-with-you-you-powerfully` | id:2206, 100ml | 26800 DA | 26800 DA | 26800 DA | ✅ OK |
| 27 | en | `ss07tblhj6jq3npl11xmys27` | `giorgio-armani-emporio-armani-stronger-with-you-you-powerfully` | id:2416, 100ml | 26800 DA | 26800 DA | 26800 DA | ✅ OK |
| 27 | ar | `ss07tblhj6jq3npl11xmys27` | `giorgio-armani-emporio-armani-stronger-with-you-you-powerfully` | id:2420, 100ml | 26800 DA | 26800 DA | 26800 DA | ✅ OK |
| 28 | fr | `z18oadf4isq3ztxht4odibq2` | `giorgio-armani-acqua-di-gio-eau-de-parfum` | id:2210, 100ml | 25000 DA | 25000 DA | 25000 DA | ✅ OK |
| 28 | en | `z18oadf4isq3ztxht4odibq2` | `giorgio-armani-acqua-di-gio-eau-de-parfum` | id:2422, 100ml | 25000 DA | 25000 DA | 25000 DA | ✅ OK |
| 28 | ar | `z18oadf4isq3ztxht4odibq2` | `giorgio-armani-acqua-di-gio-eau-de-parfum` | id:2426, 100ml | 25000 DA | 25000 DA | 25000 DA | ✅ OK |
| 29 | fr | `arrdl88eciqjjbh9oi72zo18` | `hermes-terre-d-hermes-intense` | id:2214, 100ml | 25800 DA | 25800 DA | 25800 DA | ✅ OK |
| 29 | en | `arrdl88eciqjjbh9oi72zo18` | `hermes-terre-d-hermes-intense` | id:2428, 100ml | 25800 DA | 25800 DA | 25800 DA | ✅ OK |
| 29 | ar | `arrdl88eciqjjbh9oi72zo18` | `hermes-terre-d-hermes-intense` | id:2432, 100ml | 25800 DA | 25800 DA | 25800 DA | ✅ OK |
| 30 | fr | `eqqp2tx7h33fatb5eg910qh9` | `jean-paul-gaultier-scandal-intense-150ml` | id:2218, 150ml | 29000 DA | 29000 DA | 29000 DA | ✅ OK |
| 30 | en | `eqqp2tx7h33fatb5eg910qh9` | `jean-paul-gaultier-scandal-intense-150ml` | id:2434, 150ml | 29000 DA | 29000 DA | 29000 DA | ✅ OK |
| 30 | ar | `eqqp2tx7h33fatb5eg910qh9` | `jean-paul-gaultier-scandal-intense-150ml` | id:2438, 150ml | 29000 DA | 29000 DA | 29000 DA | ✅ OK |
| 31 | fr | `by2y8fzh5lukvv1qdhzfjfi3` | `jean-paul-gaultier-scandal-pour-homme-elixir` | id:2222, 100ml | 31000 DA | 31000 DA | 31000 DA | ✅ OK |
| 31 | en | `by2y8fzh5lukvv1qdhzfjfi3` | `jean-paul-gaultier-scandal-pour-homme-elixir` | id:2440, 100ml | 31000 DA | 31000 DA | 31000 DA | ✅ OK |
| 31 | ar | `by2y8fzh5lukvv1qdhzfjfi3` | `jean-paul-gaultier-scandal-pour-homme-elixir` | id:2444, 100ml | 31000 DA | 31000 DA | 31000 DA | ✅ OK |
| 32 | fr | `t96pm6p7r4lpa4z5iyergsv1` | `lacoste-booster` | id:2226, 125ml | 13000 DA | 13000 DA | 13000 DA | ✅ OK |
| 32 | en | `t96pm6p7r4lpa4z5iyergsv1` | `lacoste-booster` | id:2446, 125ml | 13000 DA | 13000 DA | 13000 DA | ✅ OK |
| 32 | ar | `t96pm6p7r4lpa4z5iyergsv1` | `lacoste-booster` | id:2450, 125ml | 13000 DA | 13000 DA | 13000 DA | ✅ OK |
| 33 | fr | `ug40kgv1e1if1sgz0vgqebmb` | `hugo-boss-hugo-man-eau-de-toilette-200ml` | id:1486, 200ml | 17000 DA | 17000 DA | 17000 DA | ✅ OK |
| 33 | en | `ug40kgv1e1if1sgz0vgqebmb` | `hugo-boss-hugo-man-eau-de-toilette-200ml` | id:2108, 200ml | 17000 DA | 17000 DA | 17000 DA | ✅ OK |
| 33 | ar | `ug40kgv1e1if1sgz0vgqebmb` | `hugo-boss-hugo-man-eau-de-toilette-200ml` | id:2107, 200ml | 17000 DA | 17000 DA | 17000 DA | ✅ OK |
| 34 | fr | `nnjksuqpcm4mc3ua546cr3py` | `hugo-boss-boss-man-eau-de-toilette` | id:2230, 100ml | 14000 DA | 14000 DA | 14000 DA | ✅ OK |
| 34 | en | `nnjksuqpcm4mc3ua546cr3py` | `hugo-boss-boss-man-eau-de-toilette` | id:2452, 100ml | 14000 DA | 14000 DA | 14000 DA | ✅ OK |
| 34 | ar | `nnjksuqpcm4mc3ua546cr3py` | `hugo-boss-boss-man-eau-de-toilette` | id:2456, 100ml | 14000 DA | 14000 DA | 14000 DA | ✅ OK |
| 35 | fr | `ge1lw8ni39ysgp84jq6wrm5y` | `hugo-boss-hugo-just-different` | id:2234, 75ml | 10800 DA | 10800 DA | 10800 DA | ✅ OK |
| 35 | en | `ge1lw8ni39ysgp84jq6wrm5y` | `hugo-boss-hugo-just-different` | id:2458, 75ml | 10800 DA | 10800 DA | 10800 DA | ✅ OK |
| 35 | ar | `ge1lw8ni39ysgp84jq6wrm5y` | `hugo-boss-hugo-just-different` | id:2462, 75ml | 10800 DA | 10800 DA | 10800 DA | ✅ OK |
| 36 | fr | `k1r91ozek3pqntg7jbx9ympj` | `hugo-boss-hugo-energise` | id:2238, 75ml | 10800 DA | 10800 DA | 10800 DA | ✅ OK |
| 36 | en | `k1r91ozek3pqntg7jbx9ympj` | `hugo-boss-hugo-energise` | id:2464, 75ml | 10800 DA | 10800 DA | 10800 DA | ✅ OK |
| 36 | ar | `k1r91ozek3pqntg7jbx9ympj` | `hugo-boss-hugo-energise` | id:2468, 75ml | 10800 DA | 10800 DA | 10800 DA | ✅ OK |
| 37 | fr | `vh7c57r6ovtn9vl1katfr2fk` | `hugo-boss-hugo-dark-blue` | id:2242, 75ml | 10000 DA | 10000 DA | 10000 DA | ✅ OK |
| 37 | en | `vh7c57r6ovtn9vl1katfr2fk` | `hugo-boss-hugo-dark-blue` | id:2470, 75ml | 10000 DA | 10000 DA | 10000 DA | ✅ OK |
| 37 | ar | `vh7c57r6ovtn9vl1katfr2fk` | `hugo-boss-hugo-dark-blue` | id:2474, 75ml | 10000 DA | 10000 DA | 10000 DA | ✅ OK |
| 38 | fr | `ymo95mee5h8ra1kxjt1ckgl1` | `hugo-boss-boss-bottled-absolu-parfum-intense` | id:2246, 100ml | 25000 DA | 25000 DA | 25000 DA | ✅ OK |
| 38 | en | `ymo95mee5h8ra1kxjt1ckgl1` | `hugo-boss-boss-bottled-absolu-parfum-intense` | id:2476, 100ml | 25000 DA | 25000 DA | 25000 DA | ✅ OK |
| 38 | ar | `ymo95mee5h8ra1kxjt1ckgl1` | `hugo-boss-boss-bottled-absolu-parfum-intense` | id:2480, 100ml | 25000 DA | 25000 DA | 25000 DA | ✅ OK |
| 39 | fr | `i5y6r4wwt3aej798rwaee81p` | `hugo-boss-boss-bottled-triumph-elixir-parfum-intense` | id:2250, 100ml | 25000 DA | 25000 DA | 25000 DA | ✅ OK |
| 39 | en | `i5y6r4wwt3aej798rwaee81p` | `hugo-boss-boss-bottled-triumph-elixir-parfum-intense` | id:2482, 100ml | 25000 DA | 25000 DA | 25000 DA | ✅ OK |
| 39 | ar | `i5y6r4wwt3aej798rwaee81p` | `hugo-boss-boss-bottled-triumph-elixir-parfum-intense` | id:2486, 100ml | 25000 DA | 25000 DA | 25000 DA | ✅ OK |
| 40 | fr | `z3ioo3fc27satm6tec8pvze0` | `montblanc-legend-elixir-parfum` | id:2254, 100ml | 16800 DA | 16800 DA | 16800 DA | ✅ OK |
| 40 | en | `z3ioo3fc27satm6tec8pvze0` | `montblanc-legend-elixir-parfum` | id:2488, 100ml | 16800 DA | 16800 DA | 16800 DA | ✅ OK |
| 40 | ar | `z3ioo3fc27satm6tec8pvze0` | `montblanc-legend-elixir-parfum` | id:2492, 100ml | 16800 DA | 16800 DA | 16800 DA | ✅ OK |
| 41 | fr | `a1uap4givptuawxkrwa3jjtp` | `christian-dior-dior-sauvage-le-parfum` | id:2258, 100ml | 31000 DA | 31000 DA | 31000 DA | ✅ OK |
| 41 | en | `a1uap4givptuawxkrwa3jjtp` | `christian-dior-dior-sauvage-le-parfum` | id:2494, 100ml | 31000 DA | 31000 DA | 31000 DA | ✅ OK |
| 41 | ar | `a1uap4givptuawxkrwa3jjtp` | `christian-dior-dior-sauvage-le-parfum` | id:2498, 100ml | 31000 DA | 31000 DA | 31000 DA | ✅ OK |
| 42 | fr | `bo4isxf5wjdle1dt9743xewt` | `christian-dior-dior-sauvage-elixir-100ml` | id:2262, 100ml | 32500 DA | 32500 DA | 32500 DA | ✅ OK |
| 42 | en | `bo4isxf5wjdle1dt9743xewt` | `christian-dior-dior-sauvage-elixir-100ml` | id:2270, 100ml | 32500 DA | 32500 DA | 32500 DA | ✅ OK |
| 42 | ar | `bo4isxf5wjdle1dt9743xewt` | `christian-dior-dior-sauvage-elixir-100ml` | id:2500, 100ml | 32500 DA | 32500 DA | 32500 DA | ✅ OK |
| 43 | fr | `sd71k0ojfvhq5cdqnh195myy` | `guerlain-oud-essentiel-eau-de-parfum` | id:1756, 125ml | 30000 DA | 30000 DA | 30000 DA | ✅ OK |
| 43 | en | `sd71k0ojfvhq5cdqnh195myy` | `guerlain-oud-essentiel-eau-de-parfum` | id:1758, 125ml | 30000 DA | 30000 DA | 30000 DA | ✅ OK |
| 43 | ar | `sd71k0ojfvhq5cdqnh195myy` | `guerlain-oud-essentiel-eau-de-parfum` | id:1761, 125ml | 30000 DA | 30000 DA | 30000 DA | ✅ OK |
| 44 | fr | `pm9bzi441tkfc869pismgvng` | `kenzo-homme-indigo-santal-marin` | id:2266, 110ml | 22000 DA | 22000 DA | 22000 DA | ✅ OK |
| 44 | en | `pm9bzi441tkfc869pismgvng` | `kenzo-homme-indigo-santal-marin` | id:2502, 110ml | 22000 DA | 22000 DA | 22000 DA | ✅ OK |
| 44 | ar | `pm9bzi441tkfc869pismgvng` | `kenzo-homme-indigo-santal-marin` | id:2506, 110ml | 22000 DA | 22000 DA | 22000 DA | ✅ OK |

## 3. Données Brutes JSON — Dior Sauvage Elixir 100 ml (FR)

### Version DRAFT (locale: fr)
```json
{
  "documentId": "bo4isxf5wjdle1dt9743xewt",
  "name": "Dior Sauvage Elixir 100ml",
  "locale": "fr",
  "publishedAt": null,
  "variants": [
    {
      "id": 2262,
      "sku": "39-default",
      "volumeMl": 100,
      "stock": 0,
      "price": {
        "id": 2262,
        "amount": 32500,
        "currency": "DZD"
      }
    }
  ]
}
```

### Version PUBLISHED (locale: fr)
```json
{
  "documentId": "bo4isxf5wjdle1dt9743xewt",
  "name": "Dior Sauvage Elixir 100ml",
  "locale": "fr",
  "publishedAt": "2026-11-01T15:31:32.859Z",
  "variants": [
    {
      "id": 2273,
      "sku": "39-default",
      "volumeMl": 100,
      "stock": 0,
      "price": {
        "id": 2273,
        "amount": 32500,
        "currency": "DZD"
      }
    }
  ]
}
```

## 4. Vérification Visuelle (Admin Strapi)

| Produit | Locale | Statut Admin | Prix Draft constaté | Prix Published constaté |
|---|---|---|---|---|
| Dior Sauvage Elixir 100 ml | FR / EN / AR | Published (non modifié) | 32 500 DA | 32 500 DA |
| Kenzo Homme Indigo 110 ml | FR / EN / AR | Published (non modifié) | 22 000 DA | 22 000 DA |
| Hugo Dark Blue 75 ml | FR / EN / AR | Published (non modifié) | 10 000 DA | 10 000 DA |
