import { createPose, type Layout, type Pose } from './choreography';

/**
 * L'état partagé de la scène. Ce sont des objets MUTABLES, lus dans
 * `useFrame` : aucun setState à haute fréquence, aucun rendu React pendant le
 * défilement.
 */

/** Ce que la timeline maîtresse écrit. Un seul nombre. */
export interface ScrollRig {
  /** Progression de la timeline, 0 → CHAPTER_COUNT. */
  p: number;
}

export function createRig(initial = 0): ScrollRig {
  return { p: initial };
}

/** Micro-mouvements ambiants, additifs — jamais écrits par le défilement. */
export interface IdleState {
  bobY: number;
  yaw: number;
  rx: number;
  rz: number;
  camX: number;
  camY: number;
  camZ: number;
  fov: number;
  lightAngle: number;
  /** Pointeur lissé, -1 → 1. Nul sur tactile. */
  mx: number;
  my: number;
}

/**
 * La RÉVÉLATION d'ouverture, pilotée par le temps (pas par le défilement) :
 * noir → contre-jour sur les arêtes → lumière principale → le logo s'allume →
 * l'air se charge de brume. Chaque valeur va de 0 à 1 ; elles se chevauchent.
 */
export interface RevealState {
  rim: number;
  key: number;
  logo: number;
  air: number;
  /** Angle d'entrée (radians) : le flacon finit de se tourner vers l'objectif. */
  yaw: number;
}

/** Ce que les contrôleurs lisent à chaque image. */
export interface FrameState {
  /** Horloge de scène au moment où le canvas est prêt (null : pas encore). */
  t0: number | null;
  reveal: RevealState;
  /** Pose issue du défilement (échantillonnée une fois par image). */
  pose: Pose;
  idle: IdleState;
}

export function createFrameState(): FrameState {
  return {
    t0: null,
    reveal: { rim: 0, key: 0, logo: 0, air: 0, yaw: -0.9 },
    pose: createPose(),
    idle: {
      bobY: 0, yaw: 0, rx: 0, rz: 0,
      camX: 0, camY: 0, camZ: 0, fov: 0, lightAngle: 0,
      mx: 0, my: 0,
    },
  };
}

/** Réglages de qualité par format : on ne rétrécit pas le bureau, on en compose un autre. */
export interface Quality {
  layout: Layout;
  dpr: [number, number];
  /** Verre réfractif (coûteux) ou verre « reflet seul » (mobile). */
  transmission: boolean;
  postfx: boolean;
  mist: number;
  /** Nombre de nappes de brume, de faisceaux et de bokehs en arrière-plan. */
  depth: { haze: number; rays: number; bokeh: number };
  lathe: number;
  envSize: number;
  /** Intensité de la réaction au pointeur (0 = désactivée). */
  pointer: number;
}

export function qualityFor(layout: Layout): Quality {
  switch (layout) {
    case 'desktop':
      return { layout, dpr: [1, 1.75], transmission: true, postfx: true, mist: 120, depth: { haze: 4, rays: 3, bokeh: 9 }, lathe: 128, envSize: 256, pointer: 1 };
    case 'tablet':
      return { layout, dpr: [1, 1.5], transmission: true, postfx: false, mist: 64, depth: { haze: 3, rays: 2, bokeh: 6 }, lathe: 96, envSize: 128, pointer: 0 };
    case 'mobile':
      return { layout, dpr: [1, 1.25], transmission: false, postfx: false, mist: 40, depth: { haze: 2, rays: 2, bokeh: 4 }, lathe: 72, envSize: 128, pointer: 0 };
  }
}
