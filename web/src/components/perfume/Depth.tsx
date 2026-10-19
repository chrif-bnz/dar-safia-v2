'use client';

/* Mutations impératives depuis `useFrame` : le principe de la scène (voir controllers.tsx). */
/* eslint-disable react-hooks/immutability */

import { useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import {
  AdditiveBlending,
  CanvasTexture,
  Color,
  RepeatWrapping,
  SRGBColorSpace,
  type Group,
  type Mesh,
  type MeshBasicMaterial,
} from 'three';

import type { FrameState, Quality } from './runtime';

/**
 * ══════════════════════════════════════════════════════════════
 *   PROFONDEUR — l'environnement DANS lequel le flacon est posé
 * ══════════════════════════════════════════════════════════════
 *
 *   ARRIÈRE-PLAN   un voile bordeaux plus clair au centre, qui éteint les coins
 *   PLAN MOYEN     nappes de brume, faisceaux de lumière, bokehs abstraits
 *   PREMIER PLAN   le flacon (et, très discrètes, les poussières d'Atmosphere)
 *
 * Tout est peint (textures procédurales, aucun fichier), additif et faible :
 * on doit sentir de l'air et de la lumière, pas voir des objets. Les calques
 * sont à des distances différentes : quand la caméra orbite, ils défilent à
 * des vitesses différentes — c'est ce parallaxe qui creuse l'espace.
 *
 * Tout monte avec `reveal.air` : au début, il n'y a que le noir.
 */

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Bruit de valeur lissé, sommé en octaves : une brume sans motif reconnaissable. */
function hazeTexture(seed: number): CanvasTexture {
  const N = 192;
  const rand = mulberry32(seed);
  const grid = (n: number) => Array.from({ length: n * n }, () => rand());
  const octaves = [
    { n: 4, w: 0.55, g: grid(4) },
    { n: 8, w: 0.3, g: grid(8) },
    { n: 16, w: 0.15, g: grid(16) },
  ];
  const sample = (o: (typeof octaves)[number], x: number, y: number) => {
    const fx = x * o.n;
    const fy = y * o.n;
    const x0 = Math.floor(fx);
    const y0 = Math.floor(fy);
    const tx = fx - x0;
    const ty = fy - y0;
    const sx = tx * tx * (3 - 2 * tx);
    const sy = ty * ty * (3 - 2 * ty);
    // Tuilable : les indices bouclent.
    const at = (i: number, j: number) => o.g[(((j % o.n) + o.n) % o.n) * o.n + (((i % o.n) + o.n) % o.n)];
    const a = at(x0, y0) * (1 - sx) + at(x0 + 1, y0) * sx;
    const b = at(x0, y0 + 1) * (1 - sx) + at(x0 + 1, y0 + 1) * sx;
    return a * (1 - sy) + b * sy;
  };

  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = N;
  const ctx = canvas.getContext('2d')!;
  const img = ctx.createImageData(N, N);
  for (let j = 0; j < N; j++) {
    for (let i = 0; i < N; i++) {
      let v = 0;
      for (const o of octaves) v += sample(o, i / N, j / N) * o.w;
      // Contraste : des nappes, pas un voile uniforme.
      v = Math.min(Math.max((v - 0.32) * 2.1, 0), 1);
      const k = (j * N + i) * 4;
      img.data[k] = img.data[k + 1] = img.data[k + 2] = 255;
      img.data[k + 3] = Math.round(v * 255);
    }
  }
  ctx.putImageData(img, 0, 0);
  const t = new CanvasTexture(canvas);
  t.wrapS = t.wrapT = RepeatWrapping;
  t.colorSpace = SRGBColorSpace;
  return t;
}

/** Faisceau : dégradé longitudinal (clair en haut, éteint en bas) et bords doux. */
function rayTexture(): CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;
  const img = ctx.createImageData(64, 256);
  for (let j = 0; j < 256; j++) {
    for (let i = 0; i < 64; i++) {
      const u = Math.abs(i / 63 - 0.5) * 2;
      const side = Math.pow(1 - u, 2.2);
      const along = Math.pow(1 - j / 255, 1.3) * Math.min(j / 18, 1);
      const k = (j * 64 + i) * 4;
      img.data[k] = img.data[k + 1] = img.data[k + 2] = 255;
      img.data[k + 3] = Math.round(255 * side * along);
    }
  }
  ctx.putImageData(img, 0, 0);
  const t = new CanvasTexture(canvas);
  t.colorSpace = SRGBColorSpace;
  return t;
}

/** Bokeh : disque à bord légèrement plus marqué, comme un diaphragme flou. */
function bokehTexture(): CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 128;
  const ctx = canvas.getContext('2d')!;
  const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 62);
  g.addColorStop(0, 'rgba(255,255,255,0.35)');
  g.addColorStop(0.7, 'rgba(255,255,255,0.5)');
  g.addColorStop(0.9, 'rgba(255,255,255,0.75)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 128, 128);
  const t = new CanvasTexture(canvas);
  t.colorSpace = SRGBColorSpace;
  return t;
}

/** Voile de fond : lumière bordeaux au centre, éteinte sur les bords. */
function backdropTexture(): CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 256;
  const ctx = canvas.getContext('2d')!;
  const g = ctx.createRadialGradient(128, 118, 0, 128, 128, 128);
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(0.45, 'rgba(255,255,255,0.35)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 256, 256);
  const t = new CanvasTexture(canvas);
  t.colorSpace = SRGBColorSpace;
  return t;
}

const HAZE_LAYERS = [
  { z: -6, w: 34, h: 18, y: 0.6, speed: 0.006, opacity: 0.16, color: '#8a3844' },
  { z: -10, w: 44, h: 24, y: 1.6, speed: -0.004, opacity: 0.14, color: '#a8563c' },
  { z: -15, w: 58, h: 30, y: 0.2, speed: 0.003, opacity: 0.12, color: '#6d2230' },
  { z: -21, w: 76, h: 40, y: 2.4, speed: -0.002, opacity: 0.1, color: '#b06a48' },
];

export function Depth({ frame, quality }: { frame: FrameState; quality: Quality }) {
  const hazeTex = useMemo(() => [hazeTexture(11), hazeTexture(29), hazeTexture(53), hazeTexture(97)], []);
  const ray = useMemo(() => rayTexture(), []);
  const bokeh = useMemo(() => bokehTexture(), []);
  const backdrop = useMemo(() => backdropTexture(), []);

  const hazeRefs = useRef<(Mesh | null)[]>([]);
  const rayGroup = useRef<Group>(null);
  const bokehRefs = useRef<(Mesh | null)[]>([]);
  const backdropRef = useRef<Mesh>(null);

  const bokehSpec = useMemo(() => {
    const rand = mulberry32(2024);
    return Array.from({ length: quality.depth.bokeh }, () => ({
      x: (rand() * 2 - 1) * 9,
      y: (rand() * 2 - 1) * 4.2 + 0.5,
      z: -5 - rand() * 9,
      s: 0.7 + rand() * 1.6,
      o: 0.05 + rand() * 0.07,
      ph: rand() * Math.PI * 2,
      sp: 0.05 + rand() * 0.08,
      warm: rand() > 0.35,
    }));
  }, [quality.depth.bokeh]);

  useEffect(
    () => () => {
      hazeTex.forEach((t) => t.dispose());
      ray.dispose();
      bokeh.dispose();
      backdrop.dispose();
    },
    [hazeTex, ray, bokeh, backdrop]
  );

  const tint = useMemo(() => new Color(), []);
  const cool = useMemo(() => new Color('#b9606c'), []);
  const warm = useMemo(() => new Color('#ffb76a'), []);

  useFrame((state, delta) => {
    const { pose, reveal } = frame;
    const air = reveal.air;
    const t = state.clock.elapsedTime;
    tint.copy(cool).lerp(warm, pose.warm);

    // Fond : le centre s'allume avec le halo, suit le flacon en douceur.
    const b = backdropRef.current;
    if (b) {
      b.position.x = pose.bx * 0.7;
      (b.material as MeshBasicMaterial).opacity = (0.05 + pose.glow * 0.16) * air;
      (b.material as MeshBasicMaterial).color.copy(tint);
    }

    for (let i = 0; i < quality.depth.haze; i++) {
      const m = hazeRefs.current[i];
      if (!m) continue;
      const layer = HAZE_LAYERS[i];
      const map = hazeTex[i];
      map.offset.x += delta * layer.speed;
      map.offset.y += delta * layer.speed * 0.35;
      // La brume se charge avec l'histoire : plus présente en essence, discrète ailleurs.
      const amount = layer.opacity * 0.22 * air * (0.7 + 0.35 * pose.mist + 0.3 * pose.glow);
      const mat = m.material as MeshBasicMaterial;
      mat.opacity = amount;
      mat.color.copy(tint).multiplyScalar(0.9 + 0.3 * i * 0.2);
      m.position.x = pose.bx * (0.15 + i * 0.05);
    }

    const rg = rayGroup.current;
    if (rg) {
      rg.position.x = pose.bx * 0.5;
      rg.children.forEach((child, i) => {
        const mat = (child as Mesh).material as MeshBasicMaterial;
        const sway = 0.8 + 0.2 * Math.sin(t * 0.21 + i * 1.7);
        // Plus présents à l'ouverture et au produit, presque éteints au gros plan.
        mat.opacity = 0.05 * air * sway * (0.4 + pose.glow) * (1 - 0.6 * Math.min(pose.dof / 2.6, 1));
        child.rotation.z = -0.42 + i * 0.16 + Math.sin(t * 0.09 + i) * 0.015;
      });
    }

    for (let i = 0; i < bokehSpec.length; i++) {
      const m = bokehRefs.current[i];
      if (!m) continue;
      const s = bokehSpec[i];
      m.position.x = s.x + Math.sin(t * s.sp + s.ph) * 0.6 + pose.bx * 0.35;
      m.position.y = s.y + Math.cos(t * s.sp * 0.8 + s.ph) * 0.35;
      (m.material as MeshBasicMaterial).opacity =
        s.o * 0.55 * air * (0.6 + 0.4 * Math.sin(t * s.sp * 2 + s.ph)) * (0.5 + pose.glow + pose.mist * 0.4);
    }
  });

  return (
    <group>
      {/* Arrière-plan : voile lumineux */}
      <mesh ref={backdropRef} position={[0, 0.8, -26]} renderOrder={-3}>
        <planeGeometry args={[90, 52]} />
        <meshBasicMaterial
          map={backdrop}
          transparent
          depthWrite={false}
          blending={AdditiveBlending}
          fog={false}
          opacity={0}
        />
      </mesh>

      {/* Plan moyen : nappes de brume */}
      {HAZE_LAYERS.slice(0, quality.depth.haze).map((l, i) => (
        <mesh
          key={i}
          ref={(el) => {
            hazeRefs.current[i] = el;
          }}
          position={[0, l.y, l.z]}
          renderOrder={-2}
        >
          <planeGeometry args={[l.w, l.h]} />
          <meshBasicMaterial
            map={hazeTex[i]}
            transparent
            depthWrite={false}
            blending={AdditiveBlending}
            fog={false}
            opacity={0}
            color={l.color}
          />
        </mesh>
      ))}

      {/* Plan moyen : faisceaux tombant du haut à gauche, en éventail */}
      <group ref={rayGroup}>
        {Array.from({ length: quality.depth.rays }, (_, i) => (
          <mesh key={i} position={[-4.5 + i * 2.2, 3.4, -7.5 - i * 1.2]} renderOrder={-2}>
            <planeGeometry args={[2.2 + i * 0.6, 17]} />
            <meshBasicMaterial
              map={ray}
              transparent
              depthWrite={false}
              blending={AdditiveBlending}
              fog={false}
              color="#ffd9a8"
              opacity={0}
            />
          </mesh>
        ))}
      </group>

      {/* Plan moyen : bokehs abstraits, très faibles */}
      {bokehSpec.map((s, i) => (
        <mesh
          key={i}
          ref={(el) => {
            bokehRefs.current[i] = el;
          }}
          position={[s.x, s.y, s.z]}
          scale={s.s}
          renderOrder={-2}
        >
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial
            map={bokeh}
            transparent
            depthWrite={false}
            blending={AdditiveBlending}
            fog={false}
            color={s.warm ? '#ffb877' : '#d06a7a'}
            opacity={0}
          />
        </mesh>
      ))}
    </group>
  );
}
