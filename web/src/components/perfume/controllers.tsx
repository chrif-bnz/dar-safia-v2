'use client';

/* Les contrôleurs écrivent dans des objets MUTABLES (pose, idle, caméra, scène)
   depuis `useFrame` : c'est le principe de la scène — aucun setState à haute
   fréquence. La règle d'immutabilité vise le rendu React, pas cette boucle. */
/* eslint-disable react-hooks/immutability */

import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import {
  Color,
  FogExp2,
  MathUtils,
  Object3D,
  SRGBColorSpace,
  Vector3,
  type DirectionalLight,
  type HemisphereLight,
  type PerspectiveCamera,
  type PointLight,
  type SpotLight,
} from 'three';

import { sampleChoreography } from './choreography';
import type { FrameState, Quality, ScrollRig } from './runtime';

/**
 * ══════════════════════════════════════════════════════════════
 *   CONTRÔLEURS — chacun lit `frame`, aucun ne touche au défilement
 * ══════════════════════════════════════════════════════════════
 *
 * Ordre d'exécution par priorité de `useFrame` :
 *   -20  ScrollAnimationController   défilement  → frame.pose
 *   -19  IdleAnimationController     horloge + pointeur → frame.idle
 *    0   PerfumeModel / CameraController / LightingController / Atmosphere
 *        (lisent pose + idle, les ADDITIONNENT — jamais d'écriture croisée)
 *
 * Le défilement et l'ambiant ne se disputent donc jamais une valeur : la
 * timeline écrit `rig.p`, l'échantillonneur en tire une pose, l'ambiant n'est
 * qu'un décalage par-dessus.
 */

/** Échantillonne la chorégraphie pour la progression courante. */
export function ScrollAnimationController({
  rig,
  frame,
  quality,
}: {
  rig: ScrollRig;
  frame: FrameState;
  quality: Quality;
}) {
  useFrame(() => {
    sampleChoreography(quality.layout, rig.p, frame.pose);
  }, -20);
  return null;
}

/**
 * Micro-mouvements : flottement, lacet, respiration de caméra, course de la
 * lumière, et pointeur (lissé, bureau seulement). Extrêmement discret, et
 * coupé sous `prefers-reduced-motion`.
 */
export function IdleAnimationController({
  frame,
  quality,
  reduced,
}: {
  frame: FrameState;
  quality: Quality;
  reduced: boolean;
}) {
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (quality.pointer === 0 || reduced) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [quality.pointer, reduced]);

  useFrame((state, delta) => {
    const idle = frame.idle;
    const r = frame.reveal;
    if (reduced) {
      r.rim = r.key = r.logo = r.air = 1;
      r.yaw = 0;
      return;
    }
    // Révélation : démarre quand le canvas est prêt, dure ~5 s, par phases.
    const rt = frame.t0 === null ? 0 : state.clock.elapsedTime - frame.t0;
    const ss = (a: number, b: number) => {
      const x = Math.min(Math.max((rt - a) / (b - a), 0), 1);
      return x * x * (3 - 2 * x);
    };
    r.rim = ss(0.3, 2.0);
    r.key = ss(1.2, 3.6);
    r.logo = ss(2.6, 4.8);
    r.air = ss(1.0, 5.2);
    r.yaw = -0.9 * (1 - ss(0.6, 4.8));

    const t = state.clock.elapsedTime;
    idle.bobY = Math.sin(t * 0.62) * 0.05;
    idle.yaw = Math.sin(t * 0.23) * 0.045 + t * 0.0;
    idle.rx = Math.sin(t * 0.41) * 0.008;
    idle.rz = Math.cos(t * 0.33) * 0.008;
    idle.camX = Math.sin(t * 0.17) * 0.09;
    idle.camY = Math.sin(t * 0.23 + 1.3) * 0.05;
    idle.camZ = Math.sin(t * 0.13) * 0.11;
    idle.fov = Math.sin(t * 0.2) * 0.22;
    idle.lightAngle = Math.sin(t * 0.15) * 0.6;
    // Pointeur : critique amorti, lent. Il suit, il ne pilote pas.
    idle.mx = MathUtils.damp(idle.mx, pointer.current.x * quality.pointer, 2.2, delta);
    idle.my = MathUtils.damp(idle.my, pointer.current.y * quality.pointer, 2.2, delta);
  }, -19);

  return null;
}

/** Le chef opérateur : position, cible, focale. */
export function CameraController({ frame }: { frame: FrameState }) {
  const camera = useThree((s) => s.camera) as PerspectiveCamera;
  const look = useMemo(() => new Vector3(), []);

  useFrame(() => {
    const { pose, idle } = frame;
    // Le pointeur décale la caméra et sa cible en sens inverse : un parallaxe
    // de quelques centimètres, pas un mouvement.
    camera.position.set(
      pose.cx + idle.camX + idle.mx * 0.32,
      pose.cy + idle.camY + idle.my * 0.18,
      pose.cz + idle.camZ
    );
    look.set(pose.tx - idle.mx * 0.08, pose.ty - idle.my * 0.05, pose.tz);
    camera.lookAt(look);

    const fov = pose.fov + idle.fov;
    if (Math.abs(camera.fov - fov) > 0.002) {
      camera.fov = fov;
      camera.updateProjectionMatrix();
    }
  });
  return null;
}

const COOL_KEY = new Color('#fff3e8');
const WARM_KEY = new Color('#ffb877');
const COOL_RIM = new Color('#ffe7d6');
const GOLD_RIM = new Color('#ff9f48');

/**
 * Éclairage « photographie de parfum » : une grande source douce à 45° (key),
 * un contre-jour (rim) qui trace les arêtes du verre, une lueur bordeaux
 * basse, un remplissage à peine perceptible — plus l'environnement, qui fait
 * l'essentiel des reflets. Tout est piloté par la pose : la lumière raconte.
 */
export function LightingController({ frame }: { frame: FrameState }) {
  const scene = useThree((s) => s.scene);
  const camera = useThree((s) => s.camera);
  const spot = useRef<SpotLight>(null);
  const rim = useRef<DirectionalLight>(null);
  const rim2 = useRef<DirectionalLight>(null);
  const wine = useRef<PointLight>(null);
  const fill = useRef<HemisphereLight>(null);
  const logoLight = useRef<SpotLight>(null);

  const keyTarget = useMemo(() => new Object3D(), []);
  const rimTarget = useMemo(() => new Object3D(), []);
  const logoTarget = useMemo(() => new Object3D(), []);
  const bg = useMemo(() => new Color(), []);

  useEffect(() => {
    if (!(scene.fog instanceof FogExp2)) scene.fog = new FogExp2('#1d0a0d', 0.028);
    return () => {
      scene.fog = null;
    };
  }, [scene]);

  useFrame(() => {
    const { pose, idle, reveal } = frame;

    // Décor : le fond et le brouillard évoluent ensemble.
    bg.setRGB(pose.bgR, pose.bgG, pose.bgB, SRGBColorSpace);
    if (scene.background instanceof Color) scene.background.copy(bg);
    else scene.background = bg.clone();
    if (scene.fog) scene.fog.color.copy(bg);

    // Les reflets naissent avec la lumière principale : à l'ouverture, le
    // verre n'a presque rien à refléter — seules les arêtes accrochent.
    scene.environmentIntensity = pose.env * (0.18 + 0.82 * reveal.key);
    scene.environmentRotation.y = pose.envRot + idle.lightAngle * 0.5 + idle.mx * 0.14;

    const bx = pose.bx;
    const by = pose.by;
    keyTarget.position.set(bx, by, pose.bz);
    rimTarget.position.set(bx, by, pose.bz);
    logoTarget.position.set(bx, by - 0.45, pose.bz);

    if (spot.current) {
      const a = idle.lightAngle * 0.5 - idle.mx * 0.25;
      spot.current.position.set(bx - 4.6 + Math.sin(a) * 1.4, by + 6.4, pose.bz + 6.6);
      spot.current.intensity = pose.key * 240 * reveal.key;
      spot.current.color.copy(COOL_KEY).lerp(WARM_KEY, pose.warm);
    }
    // Contre-jours des deux côtés : ce sont eux qui dessinent la silhouette.
    if (rim.current) {
      rim.current.position.set(bx + 4.2 + idle.lightAngle, by + 3.2, pose.bz - 6.5);
      rim.current.intensity = pose.rim * 3.6 * reveal.rim;
      rim.current.color.copy(COOL_RIM).lerp(GOLD_RIM, pose.warm);
    }
    if (rim2.current) {
      rim2.current.position.set(bx - 5.2, by + 1.5, pose.bz - 5.5);
      rim2.current.intensity = pose.rim * 2.2 * reveal.rim;
    }
    if (wine.current) {
      wine.current.position.set(bx - 4.4, by + 2.2, pose.bz - 3.8);
      wine.current.intensity = pose.rim * 8 * reveal.rim;
    }
    // Lumière du logo : un projecteur étroit posé contre la caméra, qui ne
    // s'allume que lorsque le logo fait face à l'objectif (pose.logo).
    if (logoLight.current) {
      logoLight.current.position.copy(camera.position);
      logoLight.current.position.x -= 1.6;
      logoLight.current.position.y += 1.8;
      const facing = Math.max(pose.logo, 0);
      logoLight.current.intensity = (30 + 150 * facing * facing) * reveal.logo;
    }
    // Remplissage réduit : on veut des zones sombres, donc du contraste.
    if (fill.current) fill.current.intensity = pose.fill * 0.75 * (0.3 + 0.7 * reveal.key);
  });

  return (
    <>
      <primitive object={keyTarget} />
      <primitive object={rimTarget} />
      <primitive object={logoTarget} />
      <spotLight ref={spot} angle={0.52} penumbra={1} decay={2} target={keyTarget} />
      <spotLight ref={logoLight} angle={0.2} penumbra={1} decay={2} color="#fff1dc" target={logoTarget} />
      <directionalLight ref={rim} target={rimTarget} />
      <directionalLight ref={rim2} color="#ffd9c0" target={rimTarget} />
      <pointLight ref={wine} color="#b5424f" decay={2} />
      <hemisphereLight ref={fill} args={['#ffe3d0', '#3d0f14', 1]} />
    </>
  );
}
