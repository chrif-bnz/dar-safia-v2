'use client';

/* Mutations impératives depuis `useFrame` : le principe de la scène (voir controllers.tsx). */
/* eslint-disable react-hooks/immutability */

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Lightformer } from '@react-three/drei';
import {
  Bloom,
  DepthOfField,
  EffectComposer,
  ToneMapping,
  Vignette,
} from '@react-three/postprocessing';
import { ToneMappingMode } from 'postprocessing';
import { useMemo, useRef } from 'react';
import { CanvasTexture, Vector3 } from 'three';

import { Atmosphere } from './Atmosphere';
import { Depth } from './Depth';
import {
  CameraController,
  IdleAnimationController,
  LightingController,
  ScrollAnimationController,
} from './controllers';
import { FLOOR_Y } from './choreography';
import { PerfumeModel } from './PerfumeModel';
import type { FrameState, Quality, ScrollRig } from './runtime';

/**
 * Le studio : un sol noir poli, un fond bordeaux brumeux, et un environnement
 * de PHOTOGRAPHE — trois boîtes à lumière (haut, deux bandes verticales), un
 * anneau de contre-jour et un rebond bordeaux. Ce sont elles qu'on lit dans le
 * verre : des filets nets sur les arêtes, pas un « HDRI » générique. Cuit une
 * fois (`frames={1}`) puis simplement TOURNÉ par le contrôleur de lumière.
 */
function Studio({ quality }: { quality: Quality }) {
  return (
    <Environment resolution={quality.envSize} frames={1} environmentIntensity={1}>
      <color attach="background" args={['#050203']} />
      {/* Grande boîte douce, au-dessus et légèrement devant : la key light. */}
      <Lightformer form="rect" intensity={2.8} position={[0, 6.5, 3]} scale={[11, 4.5, 1]} rotation-x={Math.PI / 2.4} />
      {/* Grande boîte frontale-gauche, plus basse : elle modèle le corps et le logo. */}
      <Lightformer form="rect" intensity={1.5} position={[-5.5, 0.5, 6]} rotation-y={Math.PI / 4} scale={[5, 6, 1]} />
      {/* Bandes verticales étroites de chaque côté : les filets nets qui
          dessinent les arêtes du verre (c'est elles qu'on lit dans la silhouette). */}
      <Lightformer form="rect" intensity={6} position={[-6.2, 1.2, 0.5]} rotation-y={Math.PI / 2.1} scale={[0.7, 9, 1]} />
      <Lightformer form="rect" intensity={5} position={[6.4, 0.6, -0.5]} rotation-y={-Math.PI / 2.1} scale={[0.6, 9, 1]} />
      {/* Bande de contre-jour haute, chaude : le galbe de l'épaule et du bouchon. */}
      <Lightformer form="rect" intensity={3.2} color="#ffd6a0" position={[0.5, 4.5, -7]} scale={[7, 0.9, 1]} />
      <Lightformer form="ring" intensity={1.6} color="#ffcf98" position={[0, 3, -9]} scale={6} />
      {/* Rebond bordeaux bas : la teinte de la maison dans les reflets. */}
      <Lightformer form="rect" intensity={1.2} color="#a13745" position={[-3, -3, 4]} rotation-x={-Math.PI / 2.2} scale={[9, 3, 1]} />
      {/* Petit point franc : le scintillement sur l'arête du bouchon. */}
      <Lightformer form="circle" intensity={7} color="#fff0e0" position={[3.5, 3.2, 5]} scale={0.5} />
    </Environment>
  );
}

function Floor() {
  // Le sol n'a pas de bord : un disque poli dont l'opacité s'éteint vers la
  // périphérie (alphaMap radial). Pas d'horizon, le fond bordeaux reprend.
  const alpha = useMemo(() => {
    const c = document.createElement('canvas');
    c.width = c.height = 256;
    const ctx = c.getContext('2d')!;
    const g = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
    g.addColorStop(0, '#fff');
    g.addColorStop(0.35, '#b0b0b0');
    g.addColorStop(0.75, '#2a2a2a');
    g.addColorStop(1, '#000');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 256, 256);
    return new CanvasTexture(c);
  }, []);
  return (
    <mesh rotation-x={-Math.PI / 2} position={[0, FLOOR_Y, 0]}>
      <circleGeometry args={[16, 64]} />
      <meshStandardMaterial
        color="#0a0405"
        roughness={0.55}
        metalness={0.3}
        envMapIntensity={0.12}
        transparent
        alphaMap={alpha}
        depthWrite={false}
      />
    </mesh>
  );
}

/**
 * Profondeur de champ pilotée par la pose : nulle presque partout, elle monte
 * au gros plan. La mise au point suit le flacon, à la distance réelle de la
 * caméra.
 */
function Focus({ frame }: { frame: FrameState }) {
  const dof = useRef<{
    bokehScale: number;
    circleOfConfusionMaterial: { worldFocusDistance: number; worldFocusRange: number };
  } | null>(null);
  const camera = useThree((s) => s.camera);
  const bottle = useMemo(() => new Vector3(), []);

  useFrame(() => {
    const d = dof.current;
    if (!d) return;
    const { pose } = frame;
    bottle.set(pose.bx, pose.by + 0.4, pose.bz);
    d.bokehScale = pose.dof;
    d.circleOfConfusionMaterial.worldFocusDistance = camera.position.distanceTo(bottle);
    d.circleOfConfusionMaterial.worldFocusRange = 2.6;
  });

  return (
    <DepthOfField
      ref={dof as never}
      focalLength={0.06}
      bokehScale={0}
      resolutionScale={0.5}
    />
  );
}

/** Deux images plus tard le canvas est prêt : on le dévoile. */
function Ready({ onReady, frame }: { onReady: () => void; frame: FrameState }) {
  const done = useRef(false);
  const count = useRef(0);
  const invalidate = useThree((s) => s.invalidate);
  useFrame((state) => {
    if (done.current) return;
    if (++count.current > 2) {
      done.current = true;
      frame.t0 = state.clock.elapsedTime;
      onReady();
    } else {
      invalidate(); // boucle « à la demande » (mouvement réduit)
    }
  });
  return null;
}

export default function PerfumeScene({
  rig,
  frame,
  quality,
  reduced,
  active,
  onReady,
}: {
  rig: ScrollRig;
  frame: FrameState;
  quality: Quality;
  reduced: boolean;
  /** Hors écran : la boucle s'arrête. */
  active: boolean;
  onReady: () => void;
}) {
  return (
    <Canvas
      // Sous prefers-reduced-motion : une image, sans boucle.
      frameloop={reduced ? 'demand' : active ? 'always' : 'never'}
      dpr={quality.dpr}
      camera={{ position: [0, 0, 11], fov: 32, near: 0.5, far: 60 }}
      gl={{ antialias: !quality.postfx, powerPreference: 'high-performance', alpha: false }}
      aria-hidden="true"
    >
      <ScrollAnimationController rig={rig} frame={frame} quality={quality} />
      <IdleAnimationController frame={frame} quality={quality} reduced={reduced} />

      <Studio quality={quality} />
      <LightingController frame={frame} />
      <CameraController frame={frame} />

      <Floor />
      <PerfumeModel frame={frame} quality={quality} />
      <Depth frame={frame} quality={quality} />
      <Atmosphere frame={frame} quality={quality} />

      {quality.postfx && (
        <EffectComposer multisampling={4} enableNormalPass={false}>
          <Focus frame={frame} />
          <Bloom intensity={0.16} luminanceThreshold={0.9} luminanceSmoothing={0.3} mipmapBlur />
          <Vignette offset={0.32} darkness={0.62} />
          <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
        </EffectComposer>
      )}
      <Ready onReady={onReady} frame={frame} />
    </Canvas>
  );
}
