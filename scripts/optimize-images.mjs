/**
 * ══════════════════════════════════════════════════════════════
 *   DAR SAFIA — PIPELINE D'OPTIMISATION DES IMAGES
 * ══════════════════════════════════════════════════════════════
 *
 * Les dossiers `branding images/`, `perfumes/` et `logo/` sont les MASTERS :
 * ils ne sont jamais modifiés. Ce script en dérive des versions WebP
 * responsives dans `public/img/`, qui est le seul dossier servi et publié.
 *
 * Pourquoi `public/` : les chemins absolus ('/perfumes/rose.jpg') écrits dans
 * des chaînes JavaScript ne sont pas analysables statiquement par Vite. Sans
 * dossier `public/`, ils fonctionnent en dev (Vite sert la racine) mais
 * renvoient 404 en production. Tout passe donc désormais par /img/.
 *
 * Lancement : `npm run images` (appelé automatiquement par dev et build).
 */

import { mkdir, readdir, copyFile, writeFile, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { perfumeCatalog } from '../catalog-data.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'public', 'img');

/**
 * Cibles supplémentaires recevant une copie des dérivés. Pendant la migration,
 * le site Vite et l'application Next coexistent et servent chacun leur propre
 * dossier public. Une seule commande alimente les deux.
 */
const MIRRORS = [path.join(ROOT, 'web', 'public', 'img')];

/** Qualité WebP : 78 est le seuil au-delà duquel le gain visuel est nul. */
const WEBP = { quality: 78, effort: 5 };

/**
 * Jeux de dérivés. `widths` produit `<nom>-<w>.webp` ; `base` désigne la
 * largeur servie par défaut (celle référencée sans suffixe dans le code).
 */
const JOBS = [
  {
    label: 'perfumes',
    from: 'perfumes',
    to: 'perfumes',
    widths: [400, 800, 1200],
    base: 800,
    // rose.jpg -> rose
    rename: name => path.parse(name).name.toLowerCase()
  },
  {
    label: 'branding',
    from: 'branding images',
    to: 'branding',
    widths: [1200, 1800, 2400],
    base: 1800,
    // "Dar Safia Branding_page-0004.jpg" -> "branding-04"
    rename: name => {
      const match = name.match(/page-0*(\d+)/i);
      return match ? `branding-${String(match[1]).padStart(2, '0')}` : path.parse(name).name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    }
  }
];

const isImage = f => /\.(jpe?g|png|webp)$/i.test(f);
const mb = bytes => (bytes / 1024 / 1024).toFixed(2);

async function run() {
  let sourceBytes = 0;
  let outputBytes = 0;
  const manifest = {};

  for (const job of JOBS) {
    const srcDir = path.join(ROOT, job.from);
    if (!existsSync(srcDir)) {
      console.warn(`  ! dossier absent, ignoré : ${job.from}`);
      continue;
    }

    const destDir = path.join(OUT, job.to);
    await mkdir(destDir, { recursive: true });

    const files = (await readdir(srcDir)).filter(isImage);
    console.log(`\n${job.label} — ${files.length} master(s)`);

    for (const file of files) {
      const input = path.join(srcDir, file);
      const stem = job.rename(file);
      const meta = await sharp(input).metadata();
      sourceBytes += (await stat(input)).size;

      const emitted = [];
      for (const width of job.widths) {
        // Ne jamais agrandir un master plus petit que la largeur demandée.
        if (meta.width && width > meta.width) continue;

        const outName = `${stem}-${width}.webp`;
        const outPath = path.join(destDir, outName);
        const info = await sharp(input).resize({ width, withoutEnlargement: true }).webp(WEBP).toFile(outPath);
        outputBytes += info.size;
        emitted.push({ width, file: outName, bytes: info.size });
      }

      // Version par défaut, sans suffixe : celle référencée dans le code.
      const baseWidth = emitted.find(e => e.width === job.base) ?? emitted[emitted.length - 1];
      if (baseWidth) {
        await copyFile(path.join(destDir, baseWidth.file), path.join(destDir, `${stem}.webp`));
        outputBytes += baseWidth.bytes;
      }

      manifest[`${job.to}/${stem}`] = {
        base: `/img/${job.to}/${stem}.webp`,
        srcset: emitted.map(e => `/img/${job.to}/${e.file} ${e.width}w`).join(', ')
      };

      const saved = emitted.length ? `${emitted.map(e => `${e.width}w`).join(' ')} ` : '(trop petit) ';
      console.log(`  ${file}  ->  ${stem}  ${saved}`);
    }
  }

  // Le logo est déjà en WebP et léger : simple recopie, pas de ré-encodage.
  const logoSrc = path.join(ROOT, 'logo');
  if (existsSync(logoSrc)) {
    const logoOut = path.join(OUT, 'logo');
    await mkdir(logoOut, { recursive: true });
    for (const file of await readdir(logoSrc)) {
      await copyFile(path.join(logoSrc, file), path.join(logoOut, file));
    }
    console.log(`\nlogo — ${(await readdir(logoSrc)).length} fichier(s) recopié(s) tels quels`);
  }

  await writeFile(path.join(OUT, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n', 'utf8');

  console.log(`\n✓ Dérivés écrits dans public/img/`);
  console.log(`  masters : ${mb(sourceBytes)} MB  ->  dérivés : ${mb(outputBytes)} MB`);

  // Recopie vers les cibles secondaires (application Next pendant la migration).
  for (const mirror of MIRRORS) {
    if (!existsSync(path.dirname(path.dirname(mirror)))) continue; // cible absente : on ignore
    await copyDir(OUT, mirror);
    console.log(`  copié vers ${path.relative(ROOT, mirror)}`);
  }
}

/** Copie récursive simple (évite une dépendance pour trois lignes). */
async function copyDir(from, to) {
  await mkdir(to, { recursive: true });
  for (const entry of await readdir(from, { withFileTypes: true })) {
    const src = path.join(from, entry.name);
    const dest = path.join(to, entry.name);
    if (entry.isDirectory()) await copyDir(src, dest);
    else await copyFile(src, dest);
  }
}

/**
 * ══════════════════════════════════════════════════════════════
 *   PHOTOS PRODUIT — dossier « Photos site web »
 * ══════════════════════════════════════════════════════════════
 *
 * Le catalogue référence ses photos par un chemin IMBRIQUÉ
 * (`/img/perfumes/Photos site web/<dossier>/<fichier>.png`). Le job `perfumes`
 * plus haut ne lit que le premier niveau de `perfumes/` : il ne produisait donc
 * jamais ces fichiers, et toute fiche demandait des images inexistantes (404).
 *
 * Ici, pour chaque photo RÉFÉRENCÉE par le catalogue, on cherche le master dans
 * l'un des deux emplacements possibles, puis on écrit
 * `<chemin>-400.webp` et `<chemin>-800.webp` à côté du chemin public — les
 * noms que `migrate-catalog.mjs` met dans le srcset. Une photo introuvable est
 * simplement ignorée (signalée) : la fiche affichera la plaque de la maison.
 *
 * Emplacements des masters, dans l'ordre :
 *   1. perfumes/Photos site web/        (convention du dépôt : masters à la racine)
 *   2. web/public/img/perfumes/Photos site web/   (là où les photos ont été déposées)
 *
 * Un dérivé déjà à jour (plus récent que son master) n'est pas recalculé.
 */
const PHOTOS_URL = '/img/perfumes/Photos site web/';
const PHOTO_ROOTS = [
  path.join(ROOT, 'perfumes', 'Photos site web'),
  path.join(ROOT, 'web', 'public', 'img', 'perfumes', 'Photos site web')
];
const PHOTO_WIDTHS = [400, 800];

async function runPhotos() {
  const wanted = [...new Set(perfumeCatalog.map(p => p.img).filter(u => u?.startsWith(PHOTOS_URL)))];
  if (wanted.length === 0) return;

  const publicDir = path.join(ROOT, 'web', 'public');
  let made = 0;
  let fresh = 0;
  const missing = [];

  console.log(`\nphotos produit — ${wanted.length} référencée(s)`);
  for (const url of wanted) {
    const rel = url.slice(PHOTOS_URL.length);
    const master = PHOTO_ROOTS.map(r => path.join(r, rel)).find(f => existsSync(f));
    if (!master) {
      missing.push(rel);
      continue;
    }
    const masterTime = (await stat(master)).mtimeMs;
    const meta = await sharp(master).metadata();

    for (const width of PHOTO_WIDTHS) {
      if (meta.width && width > meta.width && width !== PHOTO_WIDTHS[0]) continue;
      const out = path.join(publicDir, `${url}-${width}.webp`);
      if (existsSync(out) && (await stat(out)).mtimeMs >= masterTime) {
        fresh++;
        continue;
      }
      await mkdir(path.dirname(out), { recursive: true });
      await sharp(master).resize({ width, withoutEnlargement: true }).webp(WEBP).toFile(out);
      made++;
    }
  }
  console.log(`  ${made} dérivé(s) écrit(s), ${fresh} déjà à jour`);
  if (missing.length) {
    console.warn(`  ! ${missing.length} photo(s) introuvable(s) — ces fiches afficheront la plaque de la maison :`);
    for (const m of missing.slice(0, 5)) console.warn(`      ${m}`);
    if (missing.length > 5) console.warn(`      … et ${missing.length - 5} autre(s)`);
    console.warn('    Déposez les photos dans perfumes/Photos site web/ (puis relancez).');
  }
}

run()
  .then(runPhotos)
  .catch(err => {
    console.error('\n✗ Échec de l\'optimisation des images :', err.message);
    process.exit(1);
  });
