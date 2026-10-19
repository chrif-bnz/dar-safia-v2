# Dar Safia — film de marque (75 s) : narration et storyboard

Voix : Kokoro-82M (ONNX, local), voix `ff_siwis`, français. Musique : partition
synthétisée localement (`film/assets/music/score.wav`, script
`film/tools/score.py`). Aucune voix ni musique externe, aucun échantillon tiers
hors effets sonores Kenney du bundle `/brag`.

Tout le texte parlé et affiché vient du site (dictionnaire FR, pages La maison,
accueil, diagnostic, commande). Aucun chiffre ni fait inventé : « quarante-cinq
créations » et « cinquante-huit wilayas » sont ceux du catalogue et du site.

## Narration chronométrée

| Début | Fin | Phrase |
|---|---|---|
| 1.80 | 4.00 | Un parfum ne se décrit pas. |
| 4.45 | 6.10 | Il se reconnaît. |
| 7.00 | 10.90 | Chaque année, il se crée plus de fragrances qu'une vie n'en peut porter. |
| 11.35 | 13.52 | La plupart se ressemblent. |
| 13.97 | 20.10 | Notre travail commence là : lire, sentir, comparer. Et ne garder que ce qui tient sur la durée. |
| 21.10 | 23.68 | Dar Safia ne vend pas des parfums. |
| 24.13 | 25.68 | Elle en retient. |
| 26.13 | 31.43 | Une maison de haute parfumerie, en Algérie. Et aujourd'hui, un lieu pour la rencontrer. |
| 32.43 | 37.21 | Quarante-cinq créations, à parcourir par famille, par note, par intensité. |
| 37.66 | 42.88 | Chaque fiche déploie sa pyramide olfactive : des notes de tête, de cœur, de fond. |
| 43.33 | 47.91 | Et si vous hésitez, quatre questions suffisent pour trouver votre signature. |
| 48.36 | 53.81 | Une commande, en quelques champs. La conciergerie confirme. Vous réglez à la livraison. |
| 54.81 | 61.34 | Trois exigences, à chaque flacon : la pureté des accords, la tenue sur la peau, une provenance vérifiée. |
| 61.79 | 65.79 | Des univers entiers, livrés dans les cinquante-huit wilayas. |
| 66.79 | 69.02 | Votre signature vous attend. |
| 69.47 | 72.35 | Dar Safia. L'Élégance pour Tous. |

## Storyboard

1. **L'accroche — 0 à 6,5 s.** Noir, poussière dorée, un faisceau de lumière.
   « Un parfum ne se décrit pas. » se compose mot à mot, puis « Il se
   reconnaît. » en or. Le film du hero (coffret et flacon à la bougie) se lève
   derrière. Source : `hero.statement` du site.
2. **Le problème — 6,5 à 20,6 s.** Mosaïque de 24 flacons du catalogue en noir
   et blanc : « Plus de fragrances qu'une vie n'en peut porter. » Les tuiles
   deviennent toutes la même image (« la plupart se ressemblent »), puis
   s'effacent pour « lire, sentir, comparer. » et « ne garder que ce qui tient
   sur la durée ». Source : page La maison (`about.stanceBody`).
3. **La maison — 20,6 à 31,9 s.** Fond bordeaux. Le nom DAR SAFIA se révèle
   lettre à lettre avec le monogramme, se range en haut à gauche ; « vend » est
   biffé, « Elle en retient. » apparaît avec le flacon retenu dans une arche
   (Prada Paradoxe, vrai produit du catalogue). Le site s'élève ensuite
   depuis le bas du cadre.
4. **Le produit — 31,9 à 54,3 s.** Vrai site, caméra qui pousse et recadre :
   catalogue et filtres (famille, notes, intensité), pyramide olfactive (les
   trois étages s'allument avec la voix), diagnostic en 4 questions jusqu'au
   résultat, formulaire de commande, puis la page de remerciement et ses trois
   étapes. Légendes courtes en bas.
5. **Vue d'ensemble — 54,3 à 66,3 s.** Bande de photos de produits en
   défilement (floral, ambré, gourmand, frais, boisé), les trois exigences de
   la maison, puis 58 points qui s'allument en anneau autour du compteur
   « 58 — Wilayas livrées ».
6. **Final — 66,3 à 75 s.** Monogramme qui s'écrit, « Votre signature vous
   attend. », puis DAR SAFIA, filet or, « L'Élégance pour Tous », fondu au noir.

## Sons

- Voix au premier plan (≈ −20 dB moyen), musique ≈ 6 dB plus bas.
- Effets : un impact doux sur la révélation du nom, tintements doux sur les
  trois étages de la pyramide et les trois exigences, clics sur les écrans du
  diagnostic et le bouton Commander, impact grave sur la résolution finale.
- Mesure du rendu : −17,9 LUFS intégrés, crête −1,6 dBTP.

## Régénérer

```bash
# Voix (npm : kokoro-js + ephone pour les phonèmes français)
node film/tools/gen-voice.mjs film/assets/vo
# Partition
python film/tools/score.py film/assets/music/score.wav 76
# Contrôle + rendu
cd film && npx hyperframes check && npx hyperframes render --quality high --output ../film.mp4
```
