# Rapport Final — Remplacement Couleur Principale Marron → Bordeaux #3D0F14

Date : 19 octobre 2026  
Branche : `couleur-bordeaux`  
Commit : `style: couleur principale marron → bordeaux #3D0F14`

---

## 1. Tableau de correspondance des couleurs (Ancien → Nouveau)

| Rôle | Ancien (Marron) | Nouveau (Bordeaux) | Justification & Métriques |
| :--- | :--- | :--- | :--- |
| **Fond principal (`--color-noir`)** | `#1a120f`<br>`rgb(26, 18, 15)` | **`#3D0F14`**<br>`rgb(61, 15, 20)` | Fond principal imposé par le cahier des charges (Hue ≈ 353°, L = 14.9%) |
| **Surfaces intermédiaires (`--color-noir-2`)** | `#241915`<br>`rgb(36, 25, 21)` | **`#4C181E`**<br>`rgb(76, 24, 30)` | Surface niveau 1 (cartes, tiroir panier, filtres, footer, pyramide). Maintien du delta de luminance (+4.6%, Hue 353°) |
| **Surfaces surélevées (`--color-noir-3`)** | `#2f221c`<br>`rgb(47, 34, 28)` | **`#5D2028`**<br>`rgb(93, 32, 40)` | Surface niveau 2 (cases à cocher, chips olfactives). Maintien de l'élévation (+5.0%, Hue 353°) |
| **Scrim dégradé vidéo (Hero / Teaser)** | `rgba(16, 11, 9, 0.92)`<br>`rgba(16, 11, 9, 0.5)`<br>`rgba(16, 11, 9, 0.45)`<br>`rgba(16, 11, 9, 0.9)` | `rgba(61, 15, 20, 0.92)`<br>`rgba(61, 15, 20, 0.5)`<br>`rgba(61, 15, 20, 0.45)`<br>`rgba(61, 15, 20, 0.9)` | Fondu progressif des vidéos hero et teaser dans le fond de page bordeaux `#3D0F14` |
| **Dégradé menu mobile (`.ds-menu-sheet`)** | `rgba(36, 25, 21, 0.97)` →<br>`rgba(26, 18, 15, 0.985)` | `rgba(76, 24, 30, 0.97)` →<br>`rgba(61, 15, 20, 0.985)` | Dégradé surface → fond bordeaux pour le volet mobile |
| **Dégradé texte Signature (`SignatureStage`)** | `rgba(26, 18, 15, 0.95)` →<br>`rgba(26, 18, 15, 0.3)` | `rgba(61, 15, 20, 0.95)` →<br>`rgba(61, 15, 20, 0.3)` | Voile textuel de lecture fondu sur le fond bordeaux |
| **Dégradé Manifeste (`Manifesto`)** | `rgba(36, 25, 21, 0.55)` / `0.5` | `rgba(76, 24, 30, 0.55)` / `0.5` | Ombres douces d'extrémité de la section Manifeste |
| **Cartes de confirmation (`.ds-thanks__card`)** | `rgba(36, 25, 21, 0.55)` | `rgba(76, 24, 30, 0.55)` | Fond semi-transparent des cartes récapitulatives |
| **Dégradé Maison Chiffres (`.ds-figs`)** | `#1a100e` → `#2a1612` | `#3D0F14` → `#4C181E` | Dégradé vertical fond bordeaux vers bordeaux surélevé |
| **Dégradé Panier (`.ds-cartp`)** | `#1a100e` → `#241512` → `#1a100e` | `#3D0F14` → `#4C181E` → `#3D0F14` | Dégradé de la page panier |
| **Récapitulatif Panier (`.ds-cartp__summary`)** | `rgba(36, 25, 21, 0.72)` | `rgba(76, 24, 30, 0.72)` | Surface semi-transparente du récapitulatif de commande |
| **Meta navigateur & viewport** | *(absent)* | `#3D0F14` | Balise `<meta name="theme-color" content="#3D0F14">` et export `viewport` |

---

## 2. Liste des fichiers modifiés

1. `design-system/tokens.json` : mise à jour des tokens de couleur `noir` (`base: #3d0f14`, `2: #4c181e`, `3: #5d2028`) et de la documentation.
2. `web/src/app/globals.css` : redéfinition des tokens `@theme`, scrims vidéo, dégradés de menu, fallbacks CSS et dégradés des sections Chiffres et Panier.
3. `web/src/app/[locale]/layout.tsx` : ajout de l'export `viewport` Next.js (`themeColor: '#3D0F14'`) et de la balise `<meta name="theme-color" content="#3D0F14">`.
4. `web/src/components/home/TeaserFilm.tsx` : mise à jour des dégradés vidéo d'estompage vers `rgba(61, 15, 20, ...)`.
5. `web/src/components/home/SignatureStage.tsx` : mise à jour du masque dégradé de texte vers `rgba(61, 15, 20, ...)`.
6. `web/src/components/home/Manifesto.tsx` : mise à jour du dégradé vertical vers `rgba(76, 24, 30, ...)`.
7. `scripts/import-report/couleurs-audit.md` : rapport d'audit initial.
8. `scripts/import-report/couleurs-final.md` : présent rapport de synthèse.

---

## 3. Analyse des contrastes WCAG & Conflits visuels

- **Lisibilité du texte Ivoire (`#F2EDE3`)** :
  - Ratio de contraste avec `#3D0F14` : **14.10:1** (Largement supérieur au seuil WCAG AAA de 7.0:1).
- **Accents Or antique (`#B8862B`)** :
  - Ratio de contraste avec `#3D0F14` : **5.08:1** (Supérieur au seuil WCAG AA de 4.5:1 pour texte normal, et 3.0:1 pour grands textes / bordures).
- **Accents Or clair (`#D6AB5A`)** :
  - Ratio de contraste avec `#3D0F14` : **7.70:1** (Conforme WCAG AAA).
- **Boutons d'action et états rouges existants** :
  - Les boutons principaux (`.ds-btn`, « Commander », etc.) utilisent le bordeaux avec une bordure dorée (`border-gold` / `border-gold-light`). Grâce à ce cerclage doré d'accent, les boutons restent immédiatement repérables et délimités sans aucun conflit visuel.
  - La bannière d'alerte (`PlaceholderPhoneBanner`) utilise `#7A2E1E` (alerte brique/terracotta) et texte ivoire `#FBEDE6`, restant distincte et clairement identifiable.

---

## 4. Validation technique

- `eslint` : 0 erreur, 0 avertissement.
- `next build` : 730 pages statiques générées avec succès sans aucune erreur.
- Tests HTTP locaux : codes 200 OK sur toutes les routes clés (`/fr`, `/fr/parfums`, `/fr/parfums/givenchy-irresistible`, `/fr/la-maison`, `/fr/trouver`, `/fr/contact`, `/fr/panier`).
