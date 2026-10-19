# Audit des Couleurs — dar-safia-v2

Date : 19 octobre 2026  
Branche : `couleur-bordeaux`  
Objectif : Remplacement du marron actuel par le bordeaux sombre `#3D0F14` (RGB 61, 15, 20).

---

## 1. Localisation des définitions de couleurs

1. **Tokens & Système de design** :
   - `web/src/app/globals.css` : Configuration `@theme` Tailwind CSS v4, variables CSS de marque (`--color-noir`, `--color-noir-2`, `--color-noir-3`, `--color-burgundy`, etc.), styles de base, dégradés, surfaces et composants.
   - `design-system/tokens.json` : Source de vérité du design system contenant l'échelle de couleurs `noir`, `burgundy`, `gold`, `ivory`, etc.
2. **Configuration Tailwind** :
   - Tailwind CSS v4 est utilisé (`@import "tailwindcss";` avec `@theme` directement dans `web/src/app/globals.css`), aucun fichier `tailwind.config.js` distinct.
3. **Composants et Pages avec couleurs en dur (RGB/RGBA/Hex)** :
   - `web/src/components/home/TeaserFilm.tsx` (dégradés et masques sombres sur vidéo)
   - `web/src/components/home/SignatureStage.tsx` (dégradé latéral d'estompage)
   - `web/src/components/home/Manifesto.tsx` (dégradé de fond vertical)
   - `web/src/components/PlaceholderPhoneBanner.tsx` (bannière d'alerte statut)
   - `web/src/components/three/FlaconScene.tsx` (toile de fond 3D WebGL / Canvas)
   - `web/src/app/[locale]/layout.tsx` (balise meta `theme-color` / barre navigateur)
4. **CMS (`cms/`)** :
   - Application Strapi indépendante sans tokens de couleur frontend exposés.

---

## 2. Inventaire des teintes de marron identifiées

| Couleur actuelle | Format / Valeur | Rôle dans l'interface | Fichiers concernés |
| :--- | :--- | :--- | :--- |
| **Marron fond principal** | `#1a120f`<br>`rgb(26, 18, 15)` | Token `--color-noir`, fond principal (`body`), arborescence des pages, en-tête (`SiteHeader`), transitions de page | `web/src/app/globals.css`<br>`design-system/tokens.json`<br>`web/src/components/home/HeroFilm.tsx` |
| **Marron surface niveau 1 (espresso)** | `#241915`<br>`rgb(36, 25, 21)` | Token `--color-noir-2`, cartes produit (`ProductCard`), formulaires de commande (`ProductOrderForm`), bloc pyramide olfactive (`.ds-pyramid-tier`), pied de page (`SiteFooter`), filtres catalogue (`FilterSidebar`), tiroir panier (`CartDrawer`), sélecteur de langue | `web/src/app/globals.css`<br>`design-system/tokens.json`<br>`web/src/components/ProductCard.tsx`<br>`web/src/components/ProductOrderForm.tsx`<br>`web/src/components/SiteFooter.tsx`<br>`web/src/app/[locale]/parfums/FilterSidebar.tsx` |
| **Marron surface niveau 2 (surélevé)** | `#2f221c`<br>`rgb(47, 34, 28)` | Token `--color-noir-3`, cases à cocher filtres (`.ds-checkbox-box`), chips pyramide olfactive (`.ds-pyramid-chip`), surfaces surélevées | `web/src/app/globals.css`<br>`design-system/tokens.json` |
| **Scrim dégradé vidéo (très sombre)** | `rgba(16, 11, 9, 0.92)`<br>`rgba(16, 11, 9, 0.5)`<br>`rgba(16, 11, 9, 0.45)`<br>`rgba(16, 11, 9, 0.9)` | Dégradé d'estompage du film d'accueil (`.hero-film__scrim`) et du teaser vidéo pour fondre la vidéo dans le fond du site | `web/src/app/globals.css`<br>`web/src/components/home/TeaserFilm.tsx` |
| **Dégradé feuille menu mobile** | `rgba(36, 25, 21, 0.97)` → `rgba(26, 18, 15, 0.985)` | Fond dégradé du menu mobile déroulant (`.ds-menu-sheet`) | `web/src/app/globals.css` |
| **Dégradé estompage Signature** | `rgba(26, 18, 15, 0.95)` → `rgba(26, 18, 15, 0.3)` | Voile latéral de transition entre visuel et contenu (`SignatureStage`) | `web/src/components/home/SignatureStage.tsx` |
| **Dégradé Manifesto** | `rgba(36, 25, 21, 0.55)` / `0.5` | Dégradé vertical haut/bas de la section Manifeste | `web/src/components/home/Manifesto.tsx` |
| **Fond cartes remerciement** | `rgba(36, 25, 21, 0.55)` | Cartes récapitulatives de commande (`.ds-thanks__card`, `.ds-thanks__steps`) | `web/src/app/globals.css` |
| **Dégradé Maison (Chiffres)** | `#1a100e` → `#2a1612` | Fond de la section chiffres clés (`.ds-figs`) | `web/src/app/globals.css` |
| **Dégradé Page Panier** | `#1a100e` → `#241512` → `#1a100e` | Fond de la page panier (`.ds-cartp`) | `web/src/app/globals.css` |
| **Fond récapitulatif panier** | `rgba(36, 25, 21, 0.72)` | Bloc récapitulatif de commande panier (`.ds-cartp__summary`) | `web/src/app/globals.css` |
| **Fallbacks en dur dans globals.css** | `#1a120f`, `#241915`, `#2f221c` | Valeurs de secours dans `var(--color-noir, ...)`, `.ds-btn-slide:hover`, `.ds-checkbox-box`, `.ds-pyramid-tier`, `.ds-pyramid-chip` | `web/src/app/globals.css` |

---

## 3. Éléments exclus (conservés à l'identique)

- **Dorés (accents, prix, bordures, badges)** :
  - `--color-gold: #b8862b`
  - `--color-gold-light: #d6ab5a`
  - `--color-gold-dark: #85601d`
  - `rgba(184, 134, 43, ...)` et `rgba(214, 171, 90, ...)`
- **Texte clair / ivoire** :
  - `--color-ivory: #f2ede3`
  - `--color-ivory-2: #e3dac8`
- **Atmosphères de familles olfactives** :
  - Floral (`#e892a2`), Amber (`#e5a93c`), Woody (`#d4af37`), Fresh (`#00b4d8`), Gourmand (`#e63946`), Spicy (`#2a9d8f`).
- **Couleurs de statut sémantiques** :
  - Succès (`#6fae7f`), Avertissement (`#d6a24a`), Danger (`#d9695f`).
- **Bannière alerte téléphone** :
  - `PlaceholderPhoneBanner` utilise `#7A2E1E` (alerte de configuration) et texte `#FBEDE6`.

---

## 4. Analyse des contrastes WCAG sur le nouveau fond bordeaux `#3D0F14`

- **Luminance de `#3D0F14`** : 0.0138
- **Texte Ivoire `#F2EDE3` sur `#3D0F14`** :
  - Ratio de contraste : **14.10:1** (dépasse largement l'exigence WCAG AAA ≥ 7.0:1).
- **Accents Or `#B8862B` sur `#3D0F14`** :
  - Ratio de contraste : **5.08:1** (conforme WCAG AA ≥ 4.5:1 pour texte normal, et ≥ 3.0:1 pour éléments d'interface/titres).
- **Accents Or clair `#D6AB5A` sur `#3D0F14`** :
  - Ratio de contraste : **7.70:1** (conforme WCAG AAA ≥ 7.0:1).

### Remarque sur les boutons d'action
- Les boutons d'action principaux (`.ds-btn`, boutons d'ajout au panier / commande) utilisent déjà `--color-burgundy: #3d0f14` ou bordeaux avec bordure dorée.
- Comme le fond de page devient `#3D0F14`, les boutons avec fond bordeaux et bordure dorée restent parfaitement délimités grâce à leur bordure dorée `#B8862B` / `#D6AB5A`. Aucun conflit bloquant n'est constaté, le contraste de bordure et de texte est optimal.
