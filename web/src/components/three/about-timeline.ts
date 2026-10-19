/**
 * ══════════════════════════════════════════════════════════════
 *   « LA MAISON » — CHORÉGRAPHIE DU DÉFILEMENT
 * ══════════════════════════════════════════════════════════════
 *
 * Un seul tableau de plans-clés pilote tout : caméra, flacon, lumières.
 * `t` est la progression de la piste de défilement (0 → 1) ; entre deux
 * plans-clés, chaque canal est interpolé par une cubique d'Hermite MONOTONE
 * (Fritsch–Carlson) : la vitesse est continue d'un plan à l'autre — pas de
 * à-coup au passage d'un chapitre — et un canal ne dépasse jamais ses plans-clés
 * (le flacon ne « rebondit » pas au-delà de sa pose).
 *
 * Fonction pure : une position de défilement donne toujours le même état de
 * scène, dans les deux sens.
 *
 * ── Régler la chorégraphie ──
 * - `CHAPTERS` : la fenêtre de chaque chapitre (texte HTML + repères).
 * - `KEYFRAMES` : un plan par ligne. Pour décaler un moment, changer son `t`.
 *
 * ── Repère du flacon ──
 * L'étiquette est centrée sur +Z : `yaw = 0` montre l'étiquette à une caméra
 * d'azimut 0. Le flacon fait UN tour complet au chapitre III (yaw : -1,9 →
 * -6,28 = -2π). L'angle RELATIF `yaw - az` est ce que voit le spectateur :
 *   |rel| < 1,0   étiquette lisible        (face / trois quarts)
 *   |rel| ≈ π     dos du flacon            (traversé en ~6 % de la piste)
 * La caméra contre-tourne pendant le tour, ce qui accélère le passage du dos.
 */

export interface Keyframe {
  /** Progression de la piste, 0 → 1. */
  t: number;
  /** Azimut de la caméra autour du flacon (rad). 0 = face à l'étiquette. */
  az: number;
  /** Hauteur de la caméra. */
  h: number;
  /** Distance horizontale caméra → axe du flacon. */
  d: number;
  /** Point visé (x = décalage de composition, en unités monde, bureau). */
  look: [number, number, number];
  fov: number;
  /** Rotation du flacon (rad) — continue, jamais ramenée modulo 2π. */
  yaw: number;
  /** Multiplicateurs de lumière. */
  key: number;
  rim: number;
  /** 0 = lumière neutre-chaude, 1 = ambre atmosphérique. */
  warm: number;
  /** Éclat propre de l'étiquette (le monogramme), 0 → 1. */
  logo: number;
  /** Exposition relative. */
  exposure: number;
  /** Recul supplémentaire de la caméra sur mobile (le cadre étroit, le texte plus haut). */
  md: number;
}

const TAU = Math.PI * 2;

export const KEYFRAMES: Keyframe[] = [
  // ── I · L'arrivée : étiquette de face, légère poussée de caméra ──
  { t: 0.0, az: 0.0, h: 2.1, d: 11.5, look: [-0.95, 1.72, 0], fov: 32, yaw: 0.0, key: 1.0, rim: 1.0, warm: 0.0, logo: 0.5, exposure: 1.0, md: 0 },
  { t: 0.12, az: -0.06, h: 2.2, d: 10.6, look: [-0.95, 1.72, 0], fov: 31, yaw: -0.1, key: 1.05, rim: 1.0, warm: 0.0, logo: 0.6, exposure: 1.0, md: 0 },

  // ── II · Le flacon : il passe à gauche, la caméra orbite, trois quarts → profil ──
  { t: 0.24, az: -0.5, h: 2.8, d: 11.0, look: [1.2, 1.66, 0], fov: 30, yaw: -1.0, key: 1.15, rim: 1.25, warm: 0.1, logo: 0.5, exposure: 1.0, md: 1.4 },
  { t: 0.36, az: -0.85, h: 3.0, d: 11.4, look: [2.3, 1.6, 0], fov: 29, yaw: -1.7, key: 1.2, rim: 1.5, warm: 0.2, logo: 0.35, exposure: 1.0, md: 1.4 },

  // ── III · L'essence : un tour complet, vu d'en haut, qui traverse le dos vite ──
  { t: 0.42, az: -0.85, h: 3.8, d: 12.4, look: [-1.9, 1.5, 0], fov: 29, yaw: -2.2, key: 1.1, rim: 1.2, warm: 0.45, logo: 0.3, exposure: 0.98, md: 3.2 },
  { t: 0.5, az: -0.35, h: 4.5, d: 13.2, look: [-2.1, 1.4, 0], fov: 29, yaw: -3.9, key: 1.0, rim: 1.0, warm: 0.8, logo: 0.2, exposure: 0.95, md: 3.2 },
  { t: 0.58, az: 0.2, h: 3.7, d: 12.0, look: [-2.2, 1.4, 0], fov: 29, yaw: -5.6, key: 1.1, rim: 1.2, warm: 1.0, logo: 0.45, exposure: 0.98, md: 3.2 },
  { t: 0.64, az: 0.05, h: 2.7, d: 10.8, look: [-2.0, 1.55, 0], fov: 28, yaw: -TAU + 0.02, key: 1.15, rim: 1.2, warm: 0.9, logo: 0.7, exposure: 1.0, md: 3.2 },

  // ── IV · Le gros plan : dolly serrée, orbite, le monogramme s'allume ──
  { t: 0.72, az: 0.22, h: 2.3, d: 7.8, look: [1.25, 1.5, 0], fov: 25, yaw: -TAU - 0.15, key: 1.3, rim: 1.4, warm: 0.6, logo: 1.0, exposure: 1.02, md: 0 },
  { t: 0.8, az: -0.28, h: 3.0, d: 7.4, look: [1.25, 2.05, 0], fov: 23, yaw: -TAU - 0.5, key: 1.35, rim: 1.6, warm: 0.4, logo: 0.85, exposure: 1.02, md: 0 },
  { t: 0.86, az: -0.05, h: 2.5, d: 8.6, look: [0.4, 1.7, 0], fov: 27, yaw: -TAU - 0.12, key: 1.2, rim: 1.2, warm: 0.2, logo: 0.7, exposure: 1.0, md: 0 },

  // ── V · Le produit : de face, centré, lumière commerciale équilibrée ──
  { t: 0.94, az: 0.0, h: 2.0, d: 13.6, look: [0, 0.8, 0], fov: 30, yaw: -TAU, key: 1.1, rim: 1.0, warm: 0.0, logo: 1.0, exposure: 1.08, md: 0 },
  { t: 1.0, az: 0.0, h: 2.0, d: 13.3, look: [0, 0.8, 0], fov: 30, yaw: -TAU, key: 1.1, rim: 1.0, warm: 0.0, logo: 1.0, exposure: 1.08, md: 0 },
];

/** Fenêtres des chapitres : l'entrée et la sortie de chaque bloc de texte. */
export const CHAPTERS = [
  { id: 'arrival', start: 0.0, end: 0.14 },
  { id: 'bottle', start: 0.17, end: 0.37 },
  { id: 'essence', start: 0.41, end: 0.63 },
  { id: 'closeup', start: 0.67, end: 0.85 },
  { id: 'final', start: 0.89, end: 1.0 },
] as const;

type Channel = Exclude<keyof Keyframe, 't' | 'look'>;

const CHANNELS: Channel[] = [
  'az', 'h', 'd', 'fov', 'yaw', 'key', 'rim', 'warm', 'logo', 'exposure', 'md',
];

/** Tangentes monotones (Fritsch–Carlson) d'une série non uniforme. */
function tangents(ts: number[], ys: number[]): number[] {
  const n = ts.length;
  const dx: number[] = [];
  const m: number[] = [];
  for (let i = 0; i < n - 1; i++) {
    dx.push(ts[i + 1] - ts[i]);
    m.push((ys[i + 1] - ys[i]) / dx[i]);
  }
  const k = new Array<number>(n).fill(0);
  k[0] = m[0];
  k[n - 1] = m[n - 2];
  for (let i = 1; i < n - 1; i++) {
    k[i] = m[i - 1] * m[i] <= 0 ? 0 : (m[i - 1] + m[i]) / 2;
  }
  for (let i = 0; i < n - 1; i++) {
    if (m[i] === 0) {
      k[i] = 0;
      k[i + 1] = 0;
      continue;
    }
    const a = k[i] / m[i];
    const b = k[i + 1] / m[i];
    const s = a * a + b * b;
    if (s > 9) {
      const tau = 3 / Math.sqrt(s);
      k[i] = tau * a * m[i];
      k[i + 1] = tau * b * m[i];
    }
  }
  return k;
}

const TS = KEYFRAMES.map((k) => k.t);

function build(get: (k: Keyframe) => number) {
  const ys = KEYFRAMES.map(get);
  return { ys, ks: tangents(TS, ys) };
}

const SERIES: Record<string, { ys: number[]; ks: number[] }> = {};
for (const c of CHANNELS) SERIES[c] = build((k) => k[c]);
SERIES.lx = build((k) => k.look[0]);
SERIES.ly = build((k) => k.look[1]);
SERIES.lz = build((k) => k.look[2]);

function hermite(s: { ys: number[]; ks: number[] }, t: number): number {
  const n = TS.length;
  if (t <= TS[0]) return s.ys[0];
  if (t >= TS[n - 1]) return s.ys[n - 1];
  let i = 0;
  while (i < n - 2 && t > TS[i + 1]) i++;
  const h = TS[i + 1] - TS[i];
  const u = (t - TS[i]) / h;
  const u2 = u * u;
  const u3 = u2 * u;
  return (
    (2 * u3 - 3 * u2 + 1) * s.ys[i] +
    (u3 - 2 * u2 + u) * h * s.ks[i] +
    (-2 * u3 + 3 * u2) * s.ys[i + 1] +
    (u3 - u2) * h * s.ks[i + 1]
  );
}

export interface SceneState extends Omit<Keyframe, 't' | 'look'> {
  look: [number, number, number];
}

/** État de scène à la progression `t` — pur, sans effet de bord. */
export function sampleTimeline(t: number, out?: SceneState): SceneState {
  const o: SceneState =
    out ??
    ({
      az: 0, h: 0, d: 0, fov: 0, yaw: 0, key: 0, rim: 0, warm: 0, logo: 0, exposure: 0, md: 0,
      look: [0, 0, 0],
    } satisfies SceneState);
  for (const c of CHANNELS) o[c] = hermite(SERIES[c], t);
  o.look[0] = hermite(SERIES.lx, t);
  o.look[1] = hermite(SERIES.ly, t);
  o.look[2] = hermite(SERIES.lz, t);
  return o;
}
