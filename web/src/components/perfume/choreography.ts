/**
 * ══════════════════════════════════════════════════════════════
 *   CHORÉGRAPHIE — TOUT CE QUI SE RÈGLE EST ICI
 * ══════════════════════════════════════════════════════════════
 *
 * Le défilement ne déplace rien directement : il avance un seul nombre, `p`
 * (0 → CHAPTER_COUNT), porté par la timeline maîtresse GSAP. À chaque image,
 * `sampleChoreography(p)` lit ce nombre et en déduit TOUT : flacon, caméra,
 * cible, lumières, environnement, particules, profondeur de champ.
 *
 * Les valeurs ne sont pas interpolées segment par segment (le mouvement
 * s'arrêterait à chaque frontière de chapitre) mais par une spline d'Hermite :
 * la vitesse est continue à travers les poses-clés, donc la rotation du
 * chapitre 1 se PROLONGE dans le chapitre 2, comme une caméra qui ne s'arrête
 * pas de filmer.
 *
 * Les poses sont posées au CENTRE de chaque chapitre (là où le texte est
 * pleinement lisible) ; `p = 0` et `p = CHAPTER_COUNT` sont les deux bornes.
 *
 * Repère : le flacon est centré sur l'origine (~3,5 unités de haut). Le sol est
 * à y = FLOOR_Y. La caméra regarde `target`.
 */

export const CHAPTER_COUNT = 5;

/** Défilement (en hauteurs d'écran) consacré à un chapitre, par format. */
export const CHAPTER_SCROLL_VH = { desktop: 135, tablet: 120, mobile: 105 } as const;

/** Lissage de `scrub` : secondes de retard pour rattraper la molette. */
export const SCRUB = 1;

/** Hauteur du sol (le bas du flacon repose dessus). */
export const FLOOR_Y = -1.74;

export type Layout = 'desktop' | 'tablet' | 'mobile';

/** Une pose : toutes les chaînes que la timeline pilote. */
export interface Pose {
  /** Flacon : position (centre), lacet (Y, radians — DÉRIVÉ de REL + azimut caméra), tangage, roulis, échelle. */
  bx: number; by: number; bz: number;
  yaw: number; rx: number; rz: number; scale: number;
  /** Caméra : position, cible regardée, champ vertical (degrés). */
  cx: number; cy: number; cz: number;
  tx: number; ty: number; tz: number;
  fov: number;
  /** Lumières (intensités relatives) et température : 0 = blanc froid, 1 = ambre. */
  key: number; rim: number; fill: number; warm: number;
  /** Environnement : intensité des reflets et rotation (radians) — les filets glissent sur le verre. */
  env: number; envRot: number;
  /** Halo derrière le flacon, brume de particules (0-1), flou d'arrière-plan (échelle bokeh). */
  glow: number; mist: number; dof: number;
  /** Fond et brouillard (RVB 0-1). */
  bgR: number; bgG: number; bgB: number;
  /**
   * DÉRIVÉ (jamais une clé de spline) : cosinus de l'angle entre le logo et la
   * caméra. 1 = le logo fait face à l'objectif, ≤ 0 = on voit l'autre côté.
   */
  logo: number;
}

export type PoseKey = keyof Pose;
export const POSE_KEYS: PoseKey[] = [
  'bx', 'by', 'bz', 'rx', 'rz', 'scale',
  'cx', 'cy', 'cz', 'tx', 'ty', 'tz', 'fov',
  'key', 'rim', 'fill', 'warm', 'env', 'envRot', 'glow', 'mist', 'dof',
  'bgR', 'bgG', 'bgB',
];

/** #rrggbb → [r, g, b] (0-1, déjà en sRGB : converti par le fond de scène). */
const hex = (h: string): [number, number, number] => {
  const n = parseInt(h.slice(1), 16);
  return [(n >> 16) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
};

interface KeySpec extends Partial<Pose> {
  /** Position sur l'axe p. */
  at: number;
  bg?: string;
}

/** Valeurs de départ communes : une pose n'écrit que ce qui change. */
const BASE: Pose = {
  bx: 0, by: 0, bz: 0, yaw: 0, rx: 0, rz: 0, scale: 1,
  cx: 0, cy: 0, cz: 11, tx: 0, ty: 0, tz: 0, fov: 32,
  key: 1, rim: 1, fill: 0.25, warm: 0.1,
  env: 1, envRot: 0, glow: 0.3, mist: 0, dof: 0,
  bgR: 0, bgG: 0, bgB: 0, logo: 1,
};

/**
 * Bordeaux de la maison (#3D0F14) : fond du chapitre 2 et de la scène finale.
 * Les autres fonds en sont des variantes — plus sombre (gros plan), plus
 * chaude (essence).
 */
const WINE = '#3d0f14';

/**
 * Poses de bureau. Mobile et tablette en sont DÉRIVÉES (`adapt`) puis
 * retouchées : jamais un simple rétrécissement — voir `LAYOUT_ADAPT`.
 */
const DESKTOP: KeySpec[] = [
  // p = 0 — ARRIVÉE. Flacon centré, grand, caméra légèrement décalée.
  {
    at: 0, cx: 0.7, cy: 0.35, cz: 9.9, ty: -0.1, fov: 32,
    key: 0.9, rim: 0.7, warm: 0.05, env: 0.85, glow: 0.34, mist: 0.4, bg: '#1d0a0d',
  },
  // p = 0.5 — centre du chapitre 1 : la caméra approche, à peine.
  {
    at: 0.5, by: 0.06, cx: 0.35, cy: 0.3, cz: 9.0, ty: -0.05, fov: 31,
    key: 1, rim: 0.85, warm: 0.08, env: 0.9, envRot: 0.25, glow: 0.38, mist: 0.4, bg: '#230b0f',
  },
  // p = 1.5 — LE FLACON. À droite, la caméra le contourne par la gauche.
  {
    at: 1.5, bx: 1.85, by: -0.02, rx: 0.03, rz: -0.02,
    cx: -2.6, cy: 0.75, cz: 9.4, tx: -0.15, ty: 0, fov: 30,
    key: 0.95, rim: 1.7, warm: 0.12, env: 1, envRot: 0.9, glow: 0.42, bg: WINE,
  },
  // p = 2.5 — L'ESSENCE. Le flacon traverse vers la gauche, l'orbite se creuse.
  {
    at: 2.5, bx: -1.6, by: 0.12, rx: -0.04, rz: 0.03,
    cx: 3.3, cy: 1.05, cz: 8.7, tx: 0.25, ty: 0.12, fov: 30,
    key: 0.85, rim: 1.25, fill: 0.3, warm: 0.78, env: 0.95, envRot: 1.7,
    glow: 0.55, mist: 1, dof: 0.6, bg: '#4a1810',
  },
  // p = 3.5 — GROS PLAN. Très près, épaule et bouchon, profondeur de champ.
  {
    at: 3.5, bx: 0.15, by: 0.3, rx: 0.06, rz: 0.01,
    cx: 1.2, cy: 0.9, cz: 6.1, tx: 0, ty: 0.4, fov: 26,
    key: 1.35, rim: 2.3, fill: 0.1, warm: 0.4, env: 1.2, envRot: 2.5,
    glow: 0.22, mist: 0.55, dof: 2.6, bg: '#120607',
  },
  // p = 4.5 — LE PRODUIT. Le flacon revient au centre, haut dans le cadre.
  {
    at: 4.5, by: 0.18, cx: 0, cy: 0.4, cz: 11.3, ty: -0.3, fov: 32,
    key: 1.1, rim: 0.75, fill: 0.38, warm: 0.04, env: 1, envRot: 3.05,
    glow: 0.4, mist: 0.15, dof: 0, bg: WINE,
  },
  // p = 5 — la caméra se pose.
  {
    at: 5, by: 0.14, cx: 0, cy: 0.38, cz: 11.0, ty: -0.28, fov: 32,
    key: 1.1, rim: 0.75, fill: 0.38, warm: 0.04, env: 1, envRot: 3.15,
    glow: 0.4, mist: 0.1, dof: 0, bg: WINE,
  },
];

/**
 * Adaptations par format. `dist` éloigne la caméra (un portrait étroit doit
 * reculer pour garder le flacon entier), `spread` resserre les déplacements
 * latéraux, `ty` remonte le flacon dans le cadre pour laisser la place au
 * texte, posé en bas.
 */
const LAYOUT_ADAPT: Record<Layout, { dist: number; spread: number; fov: number; ty: number; close: number; fx: number }> = {
  desktop: { dist: 1, spread: 1, fov: 0, ty: 0, close: 1, fx: 1 },
  tablet: { dist: 1.12, spread: 0.6, fov: 1, ty: -0.45, close: 1.15, fx: 0.7 },
  mobile: { dist: 1.32, spread: 0.3, fov: 5, ty: -1.0, close: 1.45, fx: 0.4 },
};

function adapt(spec: KeySpec[], layout: Layout): KeySpec[] {
  const a = LAYOUT_ADAPT[layout];
  if (layout === 'desktop') return spec;
  return spec.map((k) => {
    const isClose = (k.cz ?? BASE.cz) < 7;
    const dist = isClose ? a.close : a.dist;
    const isFinal = k.at >= 4.5;
    return {
      ...k,
      bx: (k.bx ?? 0) * a.spread,
      cx: (k.cx ?? 0) * (isClose ? 0.7 : layout === 'mobile' ? 0.15 : a.spread * 1.4),
      cz: (k.cz ?? BASE.cz) * dist,
      // Le texte occupe le bas : on remonte le point regardé (donc le flacon
      // descend dans le cadre si on le baisse — ty négatif = flacon plus haut).
      ty: (k.ty ?? 0) + (isClose ? a.ty * 0.25 : a.ty) + (isFinal ? a.ty * 0.2 : 0),
      fov: (k.fov ?? BASE.fov) + (isClose ? a.fov * 0.6 : a.fov),
      dof: (k.dof ?? 0) * a.fx,
    };
  });
}

/** Séquences résolues, pose par pose, prêtes pour l'échantillonnage. */
interface Track {
  times: number[];
  /** Une chaîne par clé de pose : valeurs et tangentes d'Hermite. */
  values: Record<PoseKey, number[]>;
  tangents: Record<PoseKey, number[]>;
}

function buildTrack(spec: KeySpec[]): Track {
  const times = spec.map((k) => k.at);
  const values = {} as Record<PoseKey, number[]>;
  const tangents = {} as Record<PoseKey, number[]>;

  const resolved: Pose[] = spec.map((k) => {
    const [bgR, bgG, bgB] = hex(k.bg ?? '#1d0a0d');
    return { ...BASE, ...k, bgR, bgG, bgB };
  });

  for (const key of POSE_KEYS) {
    const v = resolved.map((p) => p[key]);
    const m = v.map((_, i) => {
      // Extrémités à tangente nulle : le mouvement naît et se pose en douceur.
      if (i === 0 || i === v.length - 1) return 0;
      return (v[i + 1] - v[i - 1]) / (times[i + 1] - times[i - 1]);
    });
    values[key] = v;
    tangents[key] = m;
  }
  return { times, values, tangents };
}

const TRACKS: Record<Layout, Track> = {
  desktop: buildTrack(adapt(DESKTOP, 'desktop')),
  tablet: buildTrack(adapt(DESKTOP, 'tablet')),
  mobile: buildTrack(adapt(DESKTOP, 'mobile')),
};

/**
 * ── LE RÉCIT DE LA ROTATION ──
 * `rel` = angle du flacon PAR RAPPORT À LA CAMÉRA (0 = le logo fait face à
 * l'objectif ; 2π = un tour complet, le logo revient). Le lacet réel est
 * `rel + azimut de la caméra` : quand la caméra orbite, le flacon la suit, et
 * c'est la combinaison des deux qu'on règle ici — jamais un lacet « absolu »
 * qui finirait, selon l'orbite, par montrer le dos.
 *
 *   0      arrivée : logo de face
 *   1      trois-quarts : le flacon s'ouvre, le logo est encore lisible
 *   1.5–2  profil, puis le dos (monogramme DS) : le tour a commencé
 *   2.5    l'autre flanc, traversée de l'essence
 *   3–3.5  le tour s'achève : le logo REVIENT, plein cadre, pour le gros plan
 *   4.5–5  logo de face, posé
 *
 * La rotation est monotone (jamais de retour en arrière ni de « reset ») et
 * la vitesse est continue : c'est une spline d'Hermite, comme le reste.
 */
const REL: [number, number][] = [
  [0, 0.05],
  [0.5, 0.32],
  [1, 0.95],
  [1.5, 1.95],
  [2, 3.35],
  [2.5, 4.4],
  [3, 5.55],
  [3.5, Math.PI * 2 - 0.12],
  [4, Math.PI * 2 + 0.1],
  [4.5, Math.PI * 2],
  [5, Math.PI * 2],
];

const REL_TIMES = REL.map(([t]) => t);
const REL_VALUES = REL.map(([, v]) => v);
const REL_TANGENTS = REL_VALUES.map((_, i) => {
  if (i === 0 || i === REL_VALUES.length - 1) return 0;
  return (REL_VALUES[i + 1] - REL_VALUES[i - 1]) / (REL_TIMES[i + 1] - REL_TIMES[i - 1]);
});

function hermite(times: number[], values: number[], tangents: number[], p: number): number {
  const last = times.length - 1;
  const t = Math.min(Math.max(p, times[0]), times[last]);
  let i = 0;
  while (i < last - 1 && t > times[i + 1]) i++;
  const dt = times[i + 1] - times[i];
  const s = (t - times[i]) / dt;
  const s2 = s * s;
  const s3 = s2 * s;
  return (
    (2 * s3 - 3 * s2 + 1) * values[i] +
    (s3 - 2 * s2 + s) * dt * tangents[i] +
    (-2 * s3 + 3 * s2) * values[i + 1] +
    (s3 - s2) * dt * tangents[i + 1]
  );
}

/** Une pose échantillonnée réutilisable (aucune allocation par image). */
export function createPose(): Pose {
  return { ...BASE };
}

/**
 * Échantillonne la spline d'Hermite cubique à la position `p`, dans `out`.
 * Pure fonction de `p` : défiler vite, revenir en arrière ou sauter à un
 * chapitre donne exactement le même résultat — c'est ce qui rend l'ensemble
 * stable.
 */
export function sampleChoreography(layout: Layout, p: number, out: Pose): Pose {
  const { times, values, tangents } = TRACKS[layout];
  for (const key of POSE_KEYS) {
    out[key] = hermite(times, values[key], tangents[key], p);
  }

  // Lacet = angle relatif voulu + azimut de la caméra autour du flacon.
  const azimuth = Math.atan2(out.cx - out.bx, out.cz - out.bz);
  const rel = hermite(REL_TIMES, REL_VALUES, REL_TANGENTS, p);
  out.yaw = rel + azimuth;
  out.logo = Math.cos(rel);
  return out;
}

/**
 * Fenêtre de texte de chaque chapitre, sur l'axe p. Le texte entre un peu après
 * le début du chapitre et sort avant la fin : les deux se chevauchent avec le
 * chapitre voisin, il n'y a jamais d'écran vide ni de saut sec.
 */
export const TEXT_IN = 0.14;
export const TEXT_OUT = 0.8;
