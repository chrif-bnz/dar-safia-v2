'use client';

import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import {
  AdditiveBlending,
  BufferGeometry,
  CanvasTexture,
  Color,
  Float32BufferAttribute,
  SRGBColorSpace,
  Vector3,
  type Group,
  type Mesh,
  type MeshBasicMaterial,
  type Points,
  type PointsMaterial,
} from 'three';

import { FLOOR_Y } from './choreography';
import type { FrameState, Quality } from './runtime';

/**
 * Halo et brume. Le halo est un disque de lumière chaude derrière le flacon,
 * toujours face caméra : il détache la silhouette du fond sans « bloom ». La
 * brume est une poignée de particules dorées, lentes, qui ne montent qu'avec
 * l'histoire (chapitres 3-4) — jamais une neige de confettis.
 */

function radialTexture(stops: [number, string][]): CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 128;
  const ctx = canvas.getContext('2d')!;
  const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  for (const [o, c] of stops) g.addColorStop(o, c);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 128, 128);
  const t = new CanvasTexture(canvas);
  t.colorSpace = SRGBColorSpace;
  return t;
}

/** PRNG déterministe : la brume est la même à chaque rendu (et le rendu reste pur). */
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const SPREAD = { x: 7, y: 4.2, z: 5 };

export function Atmosphere({ frame, quality }: { frame: FrameState; quality: Quality }) {
  const camera = useThree((s) => s.camera);
  const glow = useRef<Mesh>(null);
  const cloud = useRef<Group>(null);
  const points = useRef<Points>(null);

  const glowTexture = useMemo(
    () => radialTexture([[0, 'rgba(255,255,255,1)'], [0.25, 'rgba(255,255,255,0.3)'], [0.6, 'rgba(255,255,255,0.06)'], [1, 'rgba(255,255,255,0)']]),
    []
  );
  const dotTexture = useMemo(
    () => radialTexture([[0, 'rgba(255,255,255,1)'], [0.4, 'rgba(255,255,255,0.4)'], [1, 'rgba(255,255,255,0)']]),
    []
  );

  const { geometry, speeds } = useMemo(() => {
    const n = quality.mist;
    const rand = mulberry32(1847);
    const pos = new Float32Array(n * 3);
    const sp = new Float32Array(n);
    for (let i = 0; i < n; i++) {
      pos[i * 3] = (rand() * 2 - 1) * SPREAD.x;
      pos[i * 3 + 1] = FLOOR_Y + rand() * SPREAD.y * 2;
      pos[i * 3 + 2] = (rand() * 2 - 1) * SPREAD.z;
      sp[i] = 0.05 + rand() * 0.12;
    }
    const geo = new BufferGeometry();
    geo.setAttribute('position', new Float32BufferAttribute(pos, 3));
    return { geometry: geo, speeds: sp };
  }, [quality.mist]);

  useEffect(
    () => () => {
      geometry.dispose();
      glowTexture.dispose();
      dotTexture.dispose();
    },
    [geometry, glowTexture, dotTexture]
  );

  const bottle = useMemo(() => new Vector3(), []);
  const tint = useMemo(() => new Color(), []);
  const cool = useMemo(() => new Color('#d9966b'), []);
  const warm = useMemo(() => new Color('#ffc46b'), []);

  useFrame((_, delta) => {
    const { pose } = frame;

    const g = glow.current;
    if (g) {
      // Derrière le flacon, sur l'axe caméra → flacon.
      bottle.set(pose.bx, pose.by, pose.bz);
      g.position.copy(bottle).sub(camera.position).normalize().multiplyScalar(5.5).add(bottle);
      g.quaternion.copy(camera.quaternion);
      const mat = g.material as MeshBasicMaterial;
      mat.opacity = pose.glow * 0.3 * frame.reveal.air;
      tint.copy(cool).lerp(warm, pose.warm);
      mat.color.copy(tint);
    }

    const pts = points.current;
    if (pts) {
      const mat = pts.material as PointsMaterial;
      mat.opacity = pose.mist * 0.55 * frame.reveal.air;
      pts.visible = pose.mist > 0.01;
      if (pts.visible) {
        const attr = geometry.getAttribute('position');
        const a = attr.array as Float32Array;
        const top = FLOOR_Y + SPREAD.y * 2;
        for (let i = 0; i < speeds.length; i++) {
          let y = a[i * 3 + 1] + speeds[i] * delta;
          if (y > top) y = FLOOR_Y;
          a[i * 3 + 1] = y;
        }
        attr.needsUpdate = true;
      }
    }
    if (cloud.current) {
      cloud.current.position.x = pose.bx * 0.6;
      cloud.current.rotation.y += delta * 0.012;
    }
  });

  return (
    <>
      <mesh ref={glow} renderOrder={-1}>
        <planeGeometry args={[11, 11]} />
        <meshBasicMaterial
          map={glowTexture}
          transparent
          depthWrite={false}
          blending={AdditiveBlending}
          fog={false}
          toneMapped={false}
          opacity={0.2}
        />
      </mesh>
      <group ref={cloud}>
        <points ref={points} geometry={geometry} frustumCulled={false}>
          <pointsMaterial
            map={dotTexture}
            size={0.09}
            sizeAttenuation
            transparent
            depthWrite={false}
            blending={AdditiveBlending}
            color="#ffd9a0"
            opacity={0}
          />
        </points>
      </group>
    </>
  );
}
