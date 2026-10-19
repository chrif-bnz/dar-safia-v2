'use client';

/* Mutations impératives depuis `useFrame` : le principe de la scène (voir controllers.tsx). */
/* eslint-disable react-hooks/immutability */

import { useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import {
  CanvasTexture,
  Color,
  DoubleSide,
  AdditiveBlending,
  Float32BufferAttribute,
  LatheGeometry,
  SRGBColorSpace,
  Vector2,
  Vector3,
  type Group,
  type Mesh,
  type MeshBasicMaterial,
} from 'three';

import { FLOOR_Y } from './choreography';
import type { FrameState, Quality } from './runtime';

/**
 * ══════════════════════════════════════════════════════════════
 *   LE FLACON
 * ══════════════════════════════════════════════════════════════
 *
 * Verre épais (profil tourné, dessiné à la main : épaule pleine, col étroit),
 * jus ambré à l'intérieur, collier et plaque d'or, bouchon laqué bordeaux.
 *
 * Le jus n'est PAS transmissif : un matériau transmissif n'apparaît pas dans
 * la passe de réfraction d'un autre — le jus disparaîtrait derrière le verre.
 * Opaque, il est vu À TRAVERS le verre, qui le réfracte.
 *
 * Mobile : la réfraction (un rendu supplémentaire de la scène) est remplacée
 * par un verre translucide à reflets — même silhouette, coût divisé.
 */

/** Profil du verre (x = rayon, y = hauteur). */
const GLASS_PROFILE: [number, number][] = [
  [0.0, 0.0], [0.6, 0.0], [0.73, 0.02], [0.8, 0.08], [0.845, 0.19], [0.9, 0.44],
  [0.96, 0.78], [1.0, 1.08], [1.02, 1.38], [1.02, 1.64], [0.99, 1.9], [0.93, 2.12],
  [0.84, 2.32], [0.72, 2.5], [0.58, 2.65], [0.46, 2.76], [0.38, 2.85], [0.34, 2.94],
  [0.33, 3.04], [0.33, 3.16], [0.365, 3.2], [0.365, 3.27], [0.3, 3.29], [0.0, 3.29],
];

/** Le jus : même galbe, rentré dans l'épaisseur du verre. */
const LIQUID_PROFILE: [number, number][] = [
  [0.0, 0.2], [0.5, 0.2], [0.66, 0.24], [0.74, 0.31], [0.79, 0.44], [0.84, 0.58],
  [0.89, 0.8], [0.93, 1.1], [0.95, 1.4], [0.95, 1.66], [0.925, 1.9], [0.885, 2.06],
  [0.82, 2.24], [0.74, 2.4], [0.62, 2.54],
];
const LIQUID_LEVEL = 2.2;

/** Bouchon : léger évasement, épaulement net, dessus plan. */
const CAP_PROFILE: [number, number][] = [
  [0.0, 3.24], [0.41, 3.24], [0.49, 3.3], [0.55, 3.46], [0.575, 3.82], [0.565, 4.2],
  [0.52, 4.32], [0.0, 4.34],
];

/** Hauteur totale (bouchon compris) et centre : le flacon pivote autour de son milieu. */
const TOTAL_H = 4.34;
export const MODEL_SCALE = 0.8;
const CENTER_Y = (TOTAL_H / 2) * MODEL_SCALE;

const v2 = (pts: [number, number][]) => pts.map(([x, y]) => new Vector2(x, y));

function liquidPoints(): Vector2[] {
  const pts = LIQUID_PROFILE.filter(([, y]) => y <= LIQUID_LEVEL);
  // Rayon exact au niveau, puis la surface plane.
  let r = 0;
  for (let i = 0; i < LIQUID_PROFILE.length - 1; i++) {
    const [x0, y0] = LIQUID_PROFILE[i];
    const [x1, y1] = LIQUID_PROFILE[i + 1];
    if (LIQUID_LEVEL >= y0 && LIQUID_LEVEL <= y1) {
      r = x0 + ((x1 - x0) * (LIQUID_LEVEL - y0)) / (y1 - y0);
    }
  }
  return v2([...pts, [r, LIQUID_LEVEL], [0, LIQUID_LEVEL]]);
}

/** Dégradé vertical du jus : ambre profond en bas, plus clair sous la surface. */
function paintLiquid(geo: LatheGeometry) {
  const pos = geo.attributes.position;
  const deep = new Color('#5e1c0a');
  const light = new Color('#d08425');
  const c = new Color();
  const colors: number[] = [];
  for (let i = 0; i < pos.count; i++) {
    const t = Math.min(Math.max(pos.getY(i) / LIQUID_LEVEL, 0), 1);
    c.copy(deep).lerp(light, Math.pow(t, 1.4));
    colors.push(c.r, c.g, c.b);
  }
  geo.setAttribute('color', new Float32BufferAttribute(colors, 3));
}

/** Plaque gravée. Le texte suit la police de la maison quand elle est chargée. */
function makePlaqueTexture(lines: string[], size = 66): { texture: CanvasTexture; redraw: () => void } {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;
  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  texture.anisotropy = 8;

  const draw = () => {
    const family =
      getComputedStyle(document.documentElement).getPropertyValue('--font-cinzel').trim() ||
      'Georgia, serif';
    const g = ctx.createLinearGradient(0, 0, 512, 512);
    g.addColorStop(0, '#d3a54a');
    g.addColorStop(0.5, '#b8862b');
    g.addColorStop(1, '#8a6420');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 512, 512);

    ctx.strokeStyle = 'rgba(61,15,20,0.85)';
    ctx.lineWidth = 3;
    ctx.strokeRect(34, 34, 444, 444);
    ctx.lineWidth = 1;
    ctx.strokeRect(46, 46, 420, 420);

    ctx.fillStyle = '#3d0f14';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `600 ${size}px ${family}`;
    if (lines.length === 2) {
      ctx.fillText(lines[0], 256, 222);
      ctx.fillText(lines[1], 256, 298);
      ctx.fillRect(196, 352, 120, 2);
    } else {
      ctx.fillText(lines[0], 256, 240);
      ctx.fillRect(206, 320, 100, 2);
    }
    texture.needsUpdate = true;
  };
  draw();
  return { texture, redraw: draw };
}

function makeShadowTexture(): CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 256;
  const ctx = canvas.getContext('2d')!;
  const g = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
  g.addColorStop(0, 'rgba(0,0,0,0.85)');
  g.addColorStop(0.35, 'rgba(0,0,0,0.5)');
  g.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 256, 256);
  const t = new CanvasTexture(canvas);
  t.colorSpace = SRGBColorSpace;
  return t;
}

/** Rayon du jus au niveau de la surface. */
const LEVEL_RADIUS = (() => {
  for (let i = 0; i < LIQUID_PROFILE.length - 1; i++) {
    const [x0, y0] = LIQUID_PROFILE[i];
    const [x1, y1] = LIQUID_PROFILE[i + 1];
    if (LIQUID_LEVEL >= y0 && LIQUID_LEVEL <= y1) return x0 + ((x1 - x0) * (LIQUID_LEVEL - y0)) / (y1 - y0);
  }
  return 0.84;
})();

/** Filets d'or autour du corps : [hauteur, rayon du verre à cette hauteur + épaisseur du filet]. */
const RINGS: [number, number][] = [
  [0.55, 0.928],
  [2.06, 0.955],
];

/** Le jus s'éclaire au centre (la lumière le traverse) et s'assombrit vers les bords. */
function liquidShader(shader: { fragmentShader: string }) {
  shader.fragmentShader = shader.fragmentShader
    .replace(
      '#include <normal_fragment_maps>',
      `#include <normal_fragment_maps>
      float ndv = clamp(abs(dot(normalize(normal), normalize(vViewPosition))), 0.0, 1.0);
      diffuseColor.rgb *= mix(0.3, 0.85, pow(ndv, 0.9));`
    )
    .replace(
      '#include <emissivemap_fragment>',
      `#include <emissivemap_fragment>
      totalEmissiveRadiance *= 0.2 + 0.85 * ndv * ndv;`
    );
}

const RIM_VERT = /* glsl */ `
  varying vec3 vN;
  varying vec3 vV;
  varying vec3 vWN;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vN = normalize(normalMatrix * normal);
    vV = normalize(-mv.xyz);
    vWN = normalize(mat3(modelMatrix) * normal);
    gl_Position = projectionMatrix * mv;
  }
`;
/* Fresnel de silhouette, modulé par la direction de la lumière principale :
   les arêtes côté lumière brillent, l'autre côté reste sombre → contraste. */
const RIM_FRAG = /* glsl */ `
  uniform vec3 uKeyDir;
  uniform vec3 uColor;
  uniform float uIntensity;
  varying vec3 vN;
  varying vec3 vV;
  varying vec3 vWN;
  void main() {
    float f = pow(1.0 - clamp(dot(normalize(vN), normalize(vV)), 0.0, 1.0), 3.2);
    float side = smoothstep(-0.35, 0.85, dot(normalize(vWN), normalize(uKeyDir)));
    float a = f * (0.22 + 0.78 * side) * uIntensity;
    gl_FragColor = vec4(uColor * a, a);
  }
`;

const RIM_GOLD = new Color('#ffbf7a');

export function PerfumeModel({ frame, quality }: { frame: FrameState; quality: Quality }) {
  const root = useRef<Group>(null);
  const shadow = useRef<Mesh>(null);

  const geometries = useMemo(() => {
    const glass = new LatheGeometry(v2(GLASS_PROFILE), quality.lathe);
    const liquid = new LatheGeometry(liquidPoints(), quality.lathe);
    paintLiquid(liquid);
    const cap = new LatheGeometry(v2(CAP_PROFILE), quality.lathe);
    // Paroi intérieure du verre : la même silhouette, rentrée. Vue à travers
    // l'épaisseur, elle double les reflets — c'est ce qui donne un verre épais.
    const liner = new LatheGeometry(
      v2(GLASS_PROFILE.filter(([, y]) => y >= 0.12 && y <= 2.95).map(([x, y]) => [Math.max(x * 0.9 - 0.02, 0.02), y])),
      quality.lathe
    );
    return { glass, liquid, cap, liner };
  }, [quality.lathe]);

  const plaque = useMemo(() => makePlaqueTexture(['DAR', 'SAFIA']), []);
  const monogram = useMemo(() => makePlaqueTexture(['DS'], 150), []);
  const rimUniforms = useMemo(
    () => ({
      uKeyDir: { value: new Vector3(-0.5, 0.7, 0.6) },
      uColor: { value: new Color('#ffe6cc') },
      uIntensity: { value: 0 },
    }),
    []
  );
  const shadowTexture = useMemo(() => makeShadowTexture(), []);

  useEffect(() => {
    let alive = true;
    void document.fonts.ready.then(() => {
      if (!alive) return;
      plaque.redraw();
      monogram.redraw();
    });
    return () => {
      alive = false;
    };
  }, [plaque, monogram]);

  useEffect(
    () => () => {
      geometries.glass.dispose();
      geometries.liquid.dispose();
      geometries.cap.dispose();
      plaque.texture.dispose();
      monogram.texture.dispose();
      geometries.liner.dispose();
      shadowTexture.dispose();
    },
    [geometries, plaque, monogram, shadowTexture]
  );

  useFrame(() => {
    const g = root.current;
    if (!g) return;
    const { pose, idle } = frame;
    g.position.set(pose.bx, pose.by + idle.bobY, pose.bz);
    // Le pointeur incline à peine l'objet ; le lacet cumulatif vient du défilement.
    g.rotation.order = 'YXZ';
    g.rotation.set(
      pose.rx + idle.rx + idle.my * -0.025,
      pose.yaw + frame.reveal.yaw + idle.yaw + idle.mx * 0.07,
      pose.rz + idle.rz
    );
    g.scale.setScalar(pose.scale);

    // Liseré de Fresnel : naît avec le contre-jour à l'ouverture, plus fort quand la pose l'est.
    rimUniforms.uIntensity.value = (0.35 + 0.5 * pose.rim) * (0.15 + 0.85 * frame.reveal.rim);
    rimUniforms.uColor.value.set('#ffe6cc').lerp(RIM_GOLD, pose.warm);

    // Ombre de contact : suit le flacon au sol, s'adoucit quand il s'élève.
    const s = shadow.current;
    if (s) {
      const lift = pose.by + idle.bobY;
      s.position.set(pose.bx, FLOOR_Y + 0.01, pose.bz);
      const k = 1 + lift * 0.25;
      s.scale.setScalar(3.4 * k * pose.scale);
      (s.material as MeshBasicMaterial).opacity = Math.max(0.15, 0.85 - lift * 0.9);
    }
  });

  const glassMaterial = quality.transmission ? (
    <meshPhysicalMaterial
      transmission={1}
      thickness={2.4}
      ior={1.52}
      roughness={0.02}
      metalness={0}
      clearcoat={1}
      clearcoatRoughness={0.02}
      specularIntensity={1}
      attenuationColor="#f2d8c6"
      attenuationDistance={4.5}
      envMapIntensity={1.5}
      dispersion={0.04}
    />
  ) : (
    <meshPhysicalMaterial
      color="#ffffff"
      transparent
      opacity={0.1}
      roughness={0.04}
      metalness={0}
      clearcoat={1}
      envMapIntensity={1.3}
      depthWrite={false}
      side={DoubleSide}
    />
  );

  return (
    <>
      <mesh ref={shadow} rotation-x={-Math.PI / 2} renderOrder={1}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial
          map={shadowTexture}
          transparent
          depthWrite={false}
          fog={false}
          opacity={0.85}
        />
      </mesh>

      <group ref={root}>
        <group scale={MODEL_SCALE} position={[0, -CENTER_Y, 0]}>
          {/* Jus : un volume. Plus clair et lumineux face à l'œil (la lumière le
              traverse), plus profond sur les bords (plus d'épaisseur à franchir). */}
          <mesh geometry={geometries.liquid}>
            <meshPhysicalMaterial
              vertexColors
              roughness={0.05}
              metalness={0}
              clearcoat={1}
              clearcoatRoughness={0.03}
              emissive="#6a2206"
              emissiveIntensity={0.6}
              envMapIntensity={1.1}
              onBeforeCompile={liquidShader}
            />
          </mesh>
          {/* Ménisque : le filet clair où la surface touche le verre. */}
          <mesh position={[0, LIQUID_LEVEL, 0]} rotation-x={Math.PI / 2}>
            <torusGeometry args={[LEVEL_RADIUS * 0.985, 0.01, 10, 96]} />
            <meshStandardMaterial
              color="#ffd08a"
              emissive="#ffb35a"
              emissiveIntensity={0.4}
              roughness={0.2}
              toneMapped={false}
            />
          </mesh>

          {/* Paroi intérieure du verre (épaisseur) */}
          <mesh geometry={geometries.liner} renderOrder={2}>
            <meshPhysicalMaterial
              color="#ffffff"
              transparent
              opacity={quality.transmission ? 0.1 : 0.06}
              roughness={0}
              metalness={0}
              clearcoat={1}
              envMapIntensity={2.2}
              depthWrite={false}
            />
          </mesh>

          {/* Verre */}
          <mesh geometry={geometries.glass} renderOrder={2}>
            {glassMaterial}
          </mesh>

          {/* Liseré de Fresnel : la silhouette accroche la lumière, les arêtes
              se dessinent — sans bloom. Additif, côté lumière principale. */}
          <mesh geometry={geometries.glass} scale={1.006} renderOrder={4}>
            <shaderMaterial
              transparent
              depthWrite={false}
              blending={AdditiveBlending}
              uniforms={rimUniforms}
              vertexShader={RIM_VERT}
              fragmentShader={RIM_FRAG}
            />
          </mesh>

          {/* Plaque avant : le logo */}
          <mesh position={[0, 1.46, 0]}>
            <cylinderGeometry args={[1.038, 1.038, 0.92, 48, 1, true, -0.44, 0.88]} />
            <meshStandardMaterial
              map={plaque.texture}
              metalness={0.85}
              roughness={0.3}
              envMapIntensity={1.4}
              side={DoubleSide}
            />
          </mesh>
          {/* Plaque arrière : monogramme, pour que le revers ne soit jamais vide */}
          <mesh position={[0, 1.5, 0]} rotation-y={Math.PI}>
            <cylinderGeometry args={[1.038, 1.038, 0.6, 48, 1, true, -0.3, 0.6]} />
            <meshStandardMaterial
              map={monogram.texture}
              metalness={0.85}
              roughness={0.3}
              envMapIntensity={1.4}
              side={DoubleSide}
            />
          </mesh>
          {/* Filets d'or qui ceinturent le corps : ils font lire le galbe de tous côtés */}
          {RINGS.map(([y, r]) => (
            <mesh key={y} position={[0, y, 0]} rotation-x={Math.PI / 2}>
              <torusGeometry args={[r, 0.0095, 10, 128]} />
              <meshStandardMaterial color="#b8862b" metalness={1} roughness={0.18} envMapIntensity={1.6} />
            </mesh>
          ))}

          {/* Collier d'or */}
          <mesh position={[0, 3.14, 0]}>
            <cylinderGeometry args={[0.41, 0.44, 0.2, 64]} />
            <meshStandardMaterial color="#b8862b" metalness={1} roughness={0.2} envMapIntensity={1.6} />
          </mesh>

          {/* Bouchon laqué bordeaux */}
          <mesh geometry={geometries.cap}>
            <meshPhysicalMaterial
              color="#4a1218"
              roughness={0.14}
              metalness={0.25}
              clearcoat={1}
              clearcoatRoughness={0.03}
              envMapIntensity={1.6}
            />
          </mesh>
          <mesh position={[0, 3.33, 0]} rotation-x={Math.PI / 2}>
            <torusGeometry args={[0.49, 0.024, 16, 96]} />
            <meshStandardMaterial color="#b8862b" metalness={1} roughness={0.2} envMapIntensity={1.6} />
          </mesh>
          <mesh position={[0, 4.345, 0]} rotation-x={-Math.PI / 2}>
            <circleGeometry args={[0.3, 48]} />
            <meshStandardMaterial color="#b8862b" metalness={1} roughness={0.25} envMapIntensity={1.4} />
          </mesh>
        </group>
      </group>
    </>
  );
}
