# Validation et Résolution des Cas Particuliers — Dar Safia v2

Ce document consigne l'analyse, les hypothèses et la résolution des cas particuliers de la liste des 19 parfums intégrés.

---

## 1. Résolution du Cas Ambigu : n° 7 « Givenchy pour homme bleu la belle ET » — 16 500 DA

### Analyse et Enquête
L'intitulé source « Givenchy pour homme bleu la belle ET » présentait une ambiguïté apparente en juxtaposant les termes *Givenchy*, *bleu*, *la belle* et *ET* (Eau de Toilette).

L'analyse du référentiel d'images du projet a levé formellement le doute :
- Dans le dossier autorisé `perfumes/Photos site web/photos designer homme/Givenchy pour homme bleu la belle ET/`, le fichier master `Givenchy pour homme bleu la belle ET.jfif` montre **sans aucune équivoque le flacon bleu officiel de Givenchy pour Homme Blue Label**, posé sur tranche de bois avec agrumes (bergamote, pamplemousse) et lavande.
- **Origine du libellé :** Il s'agit d'un artefact de dictée vocale / transcription phonétique : « *Blue Label EDT* » a été transcrit en « *bleu la belle ET* ».
- À côté de ce dossier existe le dossier jumeau `Givenchy pour homme ET 100/` contenant le flacon rouge original de Givenchy pour Homme.

### Décision appliquée
Le produit a été créé sous l'intitulé officiel **Givenchy pour Homme Blue Label Eau de Toilette 100ml** à **16 500 DA**, avec le slug `givenchy-pour-homme-blue-label-eau-de-toilette-100ml` et le visuel master authentique du dossier `Givenchy pour homme bleu la belle ET/`.

---

## 2. Résolution des Parfums 2, 18 et 19 (Dossier autorisé `missing-perfumes`)

Conformément aux directives autorisant exclusivement les dossiers `Designer`, `photos designer homme` et `missing-perfumes` :

1. **n° 2 — Paco Rabanne Olympéa Flora Eau de Parfum Intense 80 ml (23 000 DA)**
   - Master : `perfumes/Photos site web/missing-perfumes/Olympea Flora paco rabanne E.P intense 80ml.png`
   - Slug : `paco-rabanne-olympea-flora-eau-de-parfum-intense-80ml`
   - Statut : Créé, publié et vérifié.

2. **n° 18 — Christian Louboutin Hiristan Eau de Parfum 100 ml (45 000 DA)**
   - Analyse : Contenance standard de 100 ml retenue. « Hiristan » correspond à la transcription phonétique / transcription arabe de Christian Louboutin.
   - Master : `perfumes/Photos site web/missing-perfumes/Louboutin Hiristan 100ml.png`
   - Slug : `christian-louboutin-hiristan-eau-de-parfum-100ml`
   - Statut : Créé, publié et vérifié.

3. **n° 19 — Xerjoff Casamorati 1888 Italica Eau de Parfum 100 ml (50 000 DA)**
   - Pyramide olfactive officielle Casamorati (Amande, Safran, Toffee, Vanille bourbon, Santal, Musc blanc).
   - Master : `perfumes/Photos site web/missing-perfumes/Xerjoff Casamorati 1888 Italica 100ml.png`
   - Slug : `xerjoff-casamorati-1888-italica-eau-de-parfum-100ml`
   - Statut : Créé, publié et vérifié.
