'use client';

import { useEffect, useRef, useState } from 'react';
// `three` n'est chargé qu'à l'exécution (import dynamique) : le binding runtime
// s'appelle THREE, celui-ci ne sert qu'aux annotations de type.
import type * as Three from 'three';

import { LoadingMark } from '@/components/LoadingMark';
import { usePrefersReducedMotion } from '@/components/motion/usePrefersReducedMotion';

import { CHAPTERS, sampleTimeline, type SceneState } from './about-timeline';

/**
 * ══════════════════════════════════════════════════════════════
 *   LE FLACON — SCÈNE 3D « STUDIO »
 * ══════════════════════════════════════════════════════════════
 *
 * Une photo de campagne, pas une démo. Direction artistique :
 *
 * ▸ LE PRODUIT D'ABORD. Le flacon est un bloc de verre épais à arêtes
 *   biseautées (extrusion d'un rectangle arrondi, avec de vrais chanfreins) :
 *   ce sont les chanfreins qui accrochent la lumière, pas un halo. La face
 *   avant est PLANE — le monogramme DS et « DAR SAFIA » s'y impriment net, à
 *   l'or, sans la déformation d'un cylindre. Le jus (champagne ambré, retenu)
 *   occupe une cavité intérieure, avec un culot de verre épais. Le bouchon est
 *   un bloc de laiton doré brossé, sur une bague.
 *
 * ▸ LE VERRE NE BRILLE PAS, IL RÉFLÉCHIT. Environnement de studio « champ
 *   sombre » : un noir chaud, trois bandes verticales étroites (deux de face,
 *   une de contre-jour) et un grand plafonnier doux. Sur des faces planes, un
 *   environnement sombre ne renvoie presque rien — le verre reste transparent ;
 *   seules les arêtes biseautées captent les bandes, en filets fins. Aucune
 *   barre lumineuse dans la scène, aucun bloom pour fabriquer l'éclat.
 *
 * ▸ UN DÉCOR QUI SE TAIT. Un mur bordeaux / espresso, une seule nappe de
 *   lumière douce derrière le flacon, un socle de pierre polie, un sol qui
 *   fond dans le mur. Pas de flacons annexes, pas de particules, pas de
 *   colonnes. La lumière du décor suit les chapitres (ambre au chapitre III,
 *   gros plan plus contrasté, final neutre et commercial).
 *
 * ▸ L'IMAGE. ACES, exposition mesurée, bloom très bas (seuil haut), grain fin
 *   et léger étalonnage chaud dans les ombres, une vignette. Rien d'autre.
 *
 * Au défilement, UNE timeline maîtresse GSAP (ScrollTrigger `scrub`, donc calée
 * sur Lenis) pilote cinq chapitres — caméra (orbite, dolly, champ), pose du
 * flacon, lumières, atmosphère du mur et blocs de texte HTML
 * (`[data-chapter]`). Les plans-clés vivent dans `about-timeline.ts`. Le
 * canvas est tenu par un parent collant. Budget : `three` et le
 * post-traitement sont chargés à la demande, le rendu passe par `gsap.ticker`
 * (une seule boucle rAF), se coupe hors écran, et un gouverneur abaisse la
 * résolution si la machine ne tient pas. Sous `prefers-reduced-motion`, une
 * seule image fixe et aucune boucle ; sans WebGL, une affiche statique.
 */

// ── Dimensions du flacon (unités scène, base posée à y = 0) ──
const W = 1.72; // largeur (face avant)
const D = 1.12; // profondeur
const BODY_H = 2.3;
const WALL = 0.15; // épaisseur de paroi
const BASE = 0.46; // culot de verre plein
const FILL_TOP = 2.04; // niveau du jus
const COLLAR_H = 0.2;
const CAP_H = 0.9;
const PLINTH_H = 0.36;

export function FlaconScene({ className }: { className?: string }) {
  const mountRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  /** WebGL indisponible ou rendu en échec : on montre l'affiche statique. */
  const [noGL, setNoGL] = useState(false);
  /** Faux jusqu'à la première image rendue : le temps de compiler les shaders, on montre le monogramme. */
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let disposed = false;
    let teardown: (() => void) | null = null;

    void (async () => {
      const [THREE, { gsap }, { ScrollTrigger }] = await Promise.all([
        import('three'),
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ]);
      if (disposed || !mountRef.current) return;
      gsap.registerPlugin(ScrollTrigger);

      // Le repère de défilement n'est pas le canvas — qui est collant et donc
      // immobile — mais la SECTION qui lui sert de piste.
      const track = (mount.closest('[data-scene-track]') as HTMLElement | null) ?? mount;

      // ── Timeline maîtresse ──────────────────────────────────
      // Un seul ScrollTrigger (`scrub: true` : Lenis lisse déjà la position)
      // pilote l'état de scène échantillonné ET l'entrée / la sortie des blocs
      // de texte. Le `gsap.context` rend les styles en ligne à la destruction.
      const sceneState: SceneState = sampleTimeline(0);
      const driver = { t: 0 };
      const master = reduced
        ? null
        : gsap.context(() => {
            const tl = gsap.timeline({
              defaults: { ease: 'none' },
              scrollTrigger: {
                trigger: track,
                start: 'top top',
                end: 'bottom bottom',
                // Lissage GSAP PAR-DESSUS Lenis : la scène rattrape la position de
                // défilement en ~1,2 s au lieu de la suivre image par image, ce
                // qui efface les à-coups d'une molette crantée ou d'un fling
                // tactile. Le texte des chapitres suit la même piste, donc reste
                // synchrone avec le flacon.
                scrub: 1.2,
                invalidateOnRefresh: true,
              },
            });
            tl.to(
              driver,
              { t: 1, duration: 1, onUpdate: () => sampleTimeline(driver.t, sceneState) },
              0
            );
            CHAPTERS.forEach((c, i) => {
              const el = track.querySelector<HTMLElement>(`[data-chapter="${c.id}"]`);
              if (!el) return;
              if (i > 0) {
                tl.fromTo(
                  el,
                  { autoAlpha: 0, y: 28 },
                  { autoAlpha: 1, y: 0, duration: 0.04, ease: 'power2.out' },
                  c.start
                );
              } else {
                gsap.set(el, { autoAlpha: 1 });
              }
              if (i < CHAPTERS.length - 1) {
                tl.to(
                  el,
                  { autoAlpha: 0, y: -22, duration: 0.035, ease: 'power2.in' },
                  c.end - 0.035
                );
              }
            });
          }, track);
      teardown = () => master?.revert();

      // WebGL absent (vieux appareil, GPU bloqué) : affiche statique, et le
      // texte des chapitres, piloté plus haut, continue de défiler.
      const probe = document.createElement('canvas');
      if (!probe.getContext('webgl2') && !probe.getContext('webgl')) {
        setNoGL(true);
        return;
      }

      const coarse = window.matchMedia('(pointer: coarse)').matches;
      const wide = window.matchMedia('(min-width: 768px)').matches;
      /** Palier riche : post-traitement, plus de segments, réfraction plus fine. */
      const rich = !coarse && wide;

      const width = mount.clientWidth || 1;
      const height = mount.clientHeight || 1;

      const trash: { dispose: () => void }[] = [];
      const keep = <T extends { dispose: () => void }>(o: T) => {
        trash.push(o);
        return o;
      };

      // ── Rendu ───────────────────────────────────────────────
      let renderer: Three.WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({
          antialias: !rich, // en mode riche, le composer multi-échantillonne
          alpha: true,
          powerPreference: 'high-performance',
        });
      } catch {
        // Contexte refusé (GPU bloqué, trop de contextes ouverts).
        setNoGL(true);
        return;
      }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, rich ? 1.5 : 1.25));
      renderer.setSize(width, height);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      // Exposition mesurée : le luxe est dans l'ombre, les hautes lumières
      // restent des filets et gardent leur détail.
      renderer.toneMappingExposure = 0.92;
      // Réfraction : assez fine pour que le jus et l'impression restent nets à
      // travers la paroi, sans coûter une passe pleine résolution.
      renderer.transmissionResolutionScale = rich ? 0.7 : 0.5;
      const canvas = renderer.domElement;
      canvas.setAttribute('aria-hidden', 'true');
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      canvas.style.display = 'block';
      mount.appendChild(canvas);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(32, width / height, 0.1, 80);
      camera.position.set(0, 2.1, 11.5);

      // ── Textures peintes au vol ─────────────────────────────
      const paintTexture = (
        w: number,
        h: number,
        paint: (ctx: CanvasRenderingContext2D, w: number, h: number) => void,
        srgb = true
      ) => {
        const c = document.createElement('canvas');
        c.width = w;
        c.height = h;
        const ctx = c.getContext('2d');
        if (ctx) paint(ctx, w, h);
        const t = new THREE.CanvasTexture(c);
        if (srgb) t.colorSpace = THREE.SRGBColorSpace;
        return keep(t);
      };

      /** Bruit de ±0,8/255 : brise les bandes d'un dégradé sombre en 8 bits. */
      const dither = (ctx: CanvasRenderingContext2D, w: number, h: number) => {
        const img = ctx.getImageData(0, 0, w, h);
        const d = img.data;
        for (let i = 0; i < d.length; i += 4) {
          const n = (Math.random() - 0.5) * 1.1;
          d[i] += n;
          d[i + 1] += n;
          d[i + 2] += n;
        }
        ctx.putImageData(img, 0, 0);
      };

      // ── Studio d'environnement (champ sombre) ───────────────
      // Ce qui fait lire le verre n'est pas la lumière directe mais ce qu'il
      // REFLÈTE. Un noir chaud, et quelques sources très choisies :
      //   · deux bandes verticales de face, étroites → filets sur les arêtes
      //   · une bande de contre-jour → sépare la silhouette du mur
      //   · un grand plafonnier doux → épaule du verre, plateau du bouchon
      // Valeurs > 1 : le PMREM travaille en HDR, ce sont de vraies sources.
      const pmrem = keep(new THREE.PMREMGenerator(renderer));
      const envScene = new THREE.Scene();
      const envParts: Three.Mesh[] = [];

      envParts.push(
        new THREE.Mesh(
          new THREE.SphereGeometry(30, 32, 20),
          new THREE.ShaderMaterial({
            side: THREE.BackSide,
            uniforms: {
              hi: { value: new THREE.Color(0.055, 0.04, 0.035) },
              lo: { value: new THREE.Color(0.008, 0.006, 0.006) },
            },
            vertexShader:
              'varying vec3 vp; void main(){ vp = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }',
            fragmentShader:
              'varying vec3 vp; uniform vec3 hi; uniform vec3 lo; void main(){ float h = clamp(normalize(vp).y*0.5+0.5,0.0,1.0); gl_FragColor = vec4(mix(lo,hi,pow(h,1.6)),1.0); }',
          })
        )
      );
      const panel = (w: number, h: number, c: [number, number, number], p: [number, number, number]) => {
        const m = new THREE.Mesh(
          new THREE.PlaneGeometry(w, h),
          new THREE.MeshBasicMaterial({ color: new THREE.Color(...c), side: THREE.DoubleSide })
        );
        m.position.set(...p);
        m.lookAt(0, 1.8, 0);
        envParts.push(m);
      };
      panel(0.9, 9, [3.0, 2.7, 2.35], [-5.2, 2.2, 5.6]); // bande de face, gauche
      panel(0.55, 8, [2.0, 1.85, 1.6], [5.6, 2.0, 4.4]); // bande de face, droite
      panel(0.7, 8, [2.6, 2.3, 1.9], [-3.4, 2.4, -6.2]); // contre-jour gauche
      panel(0.5, 8, [1.7, 1.45, 1.15], [4.0, 2.4, -6.0]); // contre-jour droit
      panel(7, 5, [1.15, 1.02, 0.9], [0, 8, 1.5]); // plafonnier doux
      panel(14, 6, [0.07, 0.055, 0.045], [0, 0.5, 9]); // façade : à peine un voile
      envParts.forEach((m) => envScene.add(m));
      const envRT = keep(pmrem.fromScene(envScene, 0.02));
      scene.environment = envRT.texture;
      envParts.forEach((m) => {
        keep(m.geometry);
        keep(m.material as Three.Material);
      });

      // ── Le mur ──────────────────────────────────────────────
      // Bordeaux profond vers espresso, et UNE nappe douce derrière le flacon :
      // la profondeur vient du fondu, pas d'objets. Un voile de teinte,
      // piloté par la timeline, le fait respirer d'un chapitre à l'autre.
      const wallTex = paintTexture(1024, 640, (ctx, w, h) => {
        const g = ctx.createLinearGradient(0, 0, 0, h);
        g.addColorStop(0, '#120908');
        g.addColorStop(0.55, '#1f0d0e');
        g.addColorStop(1, '#0b0606');
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);
        const r = ctx.createRadialGradient(w * 0.5, h * 0.5, 0, w * 0.5, h * 0.5, w * 0.42);
        r.addColorStop(0, 'rgba(98,30,34,0.85)');
        r.addColorStop(0.45, 'rgba(61,15,20,0.55)');
        r.addColorStop(1, 'rgba(61,15,20,0)');
        ctx.fillStyle = r;
        ctx.fillRect(0, 0, w, h);
        dither(ctx, w, h);
      });
      const wallMat = keep(new THREE.MeshBasicMaterial({ map: wallTex, depthWrite: false }));
      const wall = new THREE.Mesh(keep(new THREE.PlaneGeometry(64, 40)), wallMat);
      wall.position.set(0, 4.2, -15);
      scene.add(wall);

      // Lumière d'atelier sur le mur : un seul aplat très doux, oblique, comme
      // une fenêtre hors champ. Il se déplace lentement avec les chapitres.
      const washTex = paintTexture(256, 512, (ctx, w, h) => {
        ctx.filter = 'blur(26px)';
        const g = ctx.createLinearGradient(0, 0, 0, h);
        g.addColorStop(0, 'rgba(255,214,160,0)');
        g.addColorStop(0.5, 'rgba(255,214,160,0.55)');
        g.addColorStop(1, 'rgba(255,214,160,0)');
        ctx.fillStyle = g;
        ctx.fillRect(w * 0.3, 0, w * 0.4, h);
      });
      const wash = new THREE.Mesh(
        keep(new THREE.PlaneGeometry(9, 22)),
        keep(
          new THREE.MeshBasicMaterial({
            map: washTex,
            transparent: true,
            opacity: 0.07,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
          })
        )
      );
      wash.position.set(-5.5, 3.5, -14.5);
      wash.rotation.z = -0.22;
      scene.add(wash);

      // ── Sol et socle ────────────────────────────────────────
      // Le sol est une nappe qui s'évanouit dans le mur (carte alpha radiale) :
      // pas de ligne d'horizon. Le socle est un bloc de pierre sombre polie aux
      // arêtes chanfreinées — les bandes du studio y dessinent des filets.
      const fadeTex = paintTexture(
        256,
        256,
        (ctx, w) => {
          const g = ctx.createRadialGradient(w / 2, w / 2, 0, w / 2, w / 2, w / 2);
          g.addColorStop(0, '#fff');
          g.addColorStop(0.35, '#bbb');
          g.addColorStop(1, '#000');
          ctx.fillStyle = g;
          ctx.fillRect(0, 0, w, w);
        },
        false
      );
      const floor = new THREE.Mesh(
        keep(new THREE.PlaneGeometry(46, 46)),
        keep(
          new THREE.MeshStandardMaterial({
            color: 0x0a0605,
            roughness: 0.5,
            metalness: 0.45,
            envMapIntensity: 0.28,
            alphaMap: fadeTex,
            transparent: true,
            depthWrite: false,
          })
        )
      );
      floor.rotation.x = -Math.PI / 2;
      floor.position.y = -PLINTH_H - 0.002;
      scene.add(floor);

      /** Bloc à arêtes biseautées : rectangle arrondi extrudé sur Y, base à y = 0. */
      const slab = (
        w: number,
        d: number,
        radius: number,
        h: number,
        bevel: number,
        bevelSegments = 6
      ) => {
        const rw = w / 2 - bevel;
        const rd = d / 2 - bevel;
        const r = Math.max(0.001, Math.min(radius - bevel, rw, rd));
        const s = new THREE.Shape();
        s.moveTo(-rw + r, -rd);
        s.lineTo(rw - r, -rd);
        s.absarc(rw - r, -rd + r, r, -Math.PI / 2, 0, false);
        s.lineTo(rw, rd - r);
        s.absarc(rw - r, rd - r, r, 0, Math.PI / 2, false);
        s.lineTo(-rw + r, rd);
        s.absarc(-rw + r, rd - r, r, Math.PI / 2, Math.PI, false);
        s.lineTo(-rw, -rd + r);
        s.absarc(-rw + r, -rd + r, r, Math.PI, Math.PI * 1.5, false);
        const g = new THREE.ExtrudeGeometry(s, {
          depth: Math.max(0.001, h - 2 * bevel),
          bevelEnabled: true,
          bevelThickness: bevel,
          bevelSize: bevel,
          bevelSegments,
          curveSegments: rich ? 18 : 10,
        });
        g.rotateX(-Math.PI / 2); // l'extrusion monte sur Y
        g.translate(0, bevel, 0);
        return keep(g);
      };

      const plinth = new THREE.Mesh(
        slab(3.3, 2.4, 0.3, PLINTH_H, 0.05, 4),
        keep(
          new THREE.MeshPhysicalMaterial({
            color: 0x120b0a,
            roughness: 0.34,
            metalness: 0.3,
            envMapIntensity: 0.4,
            clearcoat: 0.25,
            clearcoatRoughness: 0.3,
          })
        )
      );
      plinth.position.y = -PLINTH_H;
      scene.add(plinth);

      // Ombre de contact : peinte, de l'empreinte du flacon. Un shadow map
      // poserait une tache opaque sous du verre — faux.
      const shadowTex = paintTexture(256, 256, (ctx, w) => {
        ctx.filter = 'blur(14px)';
        ctx.fillStyle = 'rgba(0,0,0,0.9)';
        const rw = w * 0.52;
        const rh = w * 0.34;
        ctx.beginPath();
        ctx.roundRect((w - rw) / 2, (w - rh) / 2, rw, rh, 22);
        ctx.fill();
      });
      const contact = new THREE.Mesh(
        keep(new THREE.PlaneGeometry(4.0, 4.0)),
        keep(new THREE.MeshBasicMaterial({ map: shadowTex, transparent: true, depthWrite: false }))
      );
      contact.rotation.x = -Math.PI / 2;
      contact.position.y = 0.004;
      scene.add(contact);

      // ── Le flacon ───────────────────────────────────────────
      const bottle = new THREE.Group();
      scene.add(bottle);

      // Verre : épais, légèrement teinté dans la masse (vert d'eau très
      // discret, comme le verre réel vu par la tranche), poli. Transmission
      // pleine, `thickness` qui donne le volume ; aucun clearcoat (il
      // refermerait le verre en blanc laiteux). Les filets viennent des
      // chanfreins et de l'environnement, pas de l'intensité.
      const glassMat = keep(
        new THREE.MeshPhysicalMaterial({
          color: 0xffffff,
          metalness: 0,
          roughness: 0.035,
          transmission: 1,
          thickness: 1.25,
          ior: 1.5,
          attenuationColor: new THREE.Color(0xcfe0d6),
          attenuationDistance: 3.2,
          specularIntensity: 1,
          envMapIntensity: 0.85,
        })
      );

      const bodyGeo = slab(W, D, 0.3, BODY_H, 0.1, rich ? 8 : 5);
      const glass = new THREE.Mesh(bodyGeo, glassMat);
      bottle.add(glass);

      // Jus : opaque (la réfraction du verre ne voit que les objets opaques —
      // c'est ce qui le fait courber DERRIÈRE la paroi). Champagne ambré,
      // plus dense au culot, plus clair sous la surface. Restreint : pas
      // d'émission, pas de verni.
      const liquidMat = keep(
        new THREE.MeshPhysicalMaterial({
          color: 0x9a6a2e,
          roughness: 0.3,
          metalness: 0,
          clearcoat: 0.25,
          clearcoatRoughness: 0.2,
          envMapIntensity: 0.6,
          emissive: new THREE.Color(0x4a2a12),
          emissiveIntensity: 0.7,
        })
      );
      liquidMat.onBeforeCompile = (shader) => {
        shader.vertexShader = shader.vertexShader
          .replace('#include <common>', '#include <common>\nvarying vec3 vLiq;')
          .replace('#include <begin_vertex>', '#include <begin_vertex>\nvLiq = position;');
        shader.fragmentShader = shader.fragmentShader
          .replace('#include <common>', '#include <common>\nvarying vec3 vLiq;')
          .replace(
            '#include <color_fragment>',
            // Dense au culot, clair sous la surface ; et les flancs s'assombrissent
            // vers les arêtes : le liquide prend du volume derrière la paroi plate.
            '#include <color_fragment>\n' +
              'float liqEdge = smoothstep(0.78, 0.32, abs(vLiq.x));\n' +
              'diffuseColor.rgb *= mix(0.32, 1.18, smoothstep(0.0, 1.55, vLiq.y)) * mix(0.55, 1.0, liqEdge);\n' +
              // Lumière qui traverse : un filet clair et doux, et une ligne fine au ménisque.
              'diffuseColor.rgb += vec3(0.16, 0.09, 0.03) * smoothstep(0.16, 0.0, abs(vLiq.x + 0.42)) * smoothstep(0.1, 0.9, vLiq.y);\n' +
              'diffuseColor.rgb += vec3(0.22, 0.14, 0.06) * smoothstep(0.05, 0.0, abs(vLiq.y - 1.56));'
          );
      };
      liquidMat.customProgramCacheKey = () => 'dar-safia-liquid-v3';
      const liquidH = FILL_TOP - BASE;
      const liquid = new THREE.Mesh(
        slab(W - 2 * WALL, D - 2 * WALL, 0.16, liquidH, 0.045, 4),
        liquidMat
      );
      liquid.position.y = BASE;
      bottle.add(liquid);

      // Or : la bague et le bouchon. Deux finitions — poli sur la bague (elle
      // porte les filets), brossé sur le bouchon (il porte la masse).
      const goldPolished = keep(
        new THREE.MeshPhysicalMaterial({
          color: 0xc29a45,
          metalness: 1,
          roughness: 0.2,
          envMapIntensity: 1.1,
        })
      );
      const goldBrushed = keep(
        new THREE.MeshPhysicalMaterial({
          color: 0xb88c3e,
          metalness: 1,
          roughness: 0.36,
          envMapIntensity: 1.3,
          // Un pan de métal qui ne regarde rien de clair tombe au noir : un
          // plancher chaud, très bas, garde la face lisible.
          emissive: new THREE.Color(0x3a2808),
          emissiveIntensity: 0.55,
          clearcoat: 0.25,
          clearcoatRoughness: 0.35,
        })
      );

      const collar = new THREE.Mesh(
        keep(new THREE.CylinderGeometry(0.4, 0.42, COLLAR_H, rich ? 56 : 32)),
        goldPolished
      );
      collar.position.y = BODY_H + COLLAR_H / 2 - 0.03;
      bottle.add(collar);

      const cap = new THREE.Mesh(slab(1.06, 0.72, 0.17, CAP_H, 0.055, 5), goldBrushed);
      cap.position.y = BODY_H + COLLAR_H - 0.04;
      bottle.add(cap);

      // Jonc sombre entre bague et bouchon : la ligne d'ombre d'un vrai assemblage.
      const seam = new THREE.Mesh(
        keep(new THREE.CylinderGeometry(0.41, 0.41, 0.03, 40)),
        keep(new THREE.MeshStandardMaterial({ color: 0x1a120c, roughness: 0.6, metalness: 0.4 }))
      );
      seam.position.y = BODY_H + COLLAR_H - 0.03;
      bottle.add(seam);

      // ── Impression : le vrai monogramme DS, doré, sur la face plane ──
      const LABEL_W = rich ? 1536 : 1024;
      const LABEL_H = rich ? 1280 : 854;
      const logoImg = new Image();
      let logoReady = false;
      const gold = '#dcb36a';
      // Étiquette fidèle à la vraie : papier bordeaux, double filet d'or, monogramme
      // DS et la mention. Deux calques : le papier (mat, opaque) et la dorure
      // (métallique, qui s'allume au gros plan).
      const drawPaper = (ctx: CanvasRenderingContext2D, w: number, h: number) => {
        ctx.fillStyle = '#3d0f14';
        ctx.fillRect(0, 0, w, h);
        // Grain du papier : très fin, pour ne pas lire un aplat numérique.
        const img = ctx.getImageData(0, 0, w, h);
        const d = img.data;
        for (let i = 0; i < d.length; i += 4) {
          const n = (Math.random() - 0.5) * 16;
          d[i] += n;
          d[i + 1] += n * 0.6;
          d[i + 2] += n * 0.6;
        }
        ctx.putImageData(img, 0, 0);
      };
      const drawFront = (ctx: CanvasRenderingContext2D, w: number, h: number) => {
        ctx.clearRect(0, 0, w, h);
        ctx.textAlign = 'center';
        ctx.strokeStyle = gold;
        ctx.lineWidth = Math.max(2, h * 0.004);
        const m1 = w * 0.05;
        ctx.strokeRect(m1, m1, w - 2 * m1, h - 2 * m1);
        ctx.lineWidth = Math.max(1, h * 0.002);
        const m2 = w * 0.075;
        ctx.strokeRect(m2, m2, w - 2 * m2, h - 2 * m2);
        if (logoReady) {
          const size = Math.min(w * 0.78, h * 0.66);
          const tint = document.createElement('canvas');
          tint.width = tint.height = Math.round(size);
          const t = tint.getContext('2d');
          if (t) {
            t.drawImage(logoImg, 0, 0, tint.width, tint.height);
            t.globalCompositeOperation = 'source-in';
            t.fillStyle = gold;
            t.fillRect(0, 0, tint.width, tint.height);
            ctx.drawImage(tint, (w - size) / 2, h * 0.1, size, size);
          }
        }
        ctx.fillStyle = gold;
        ctx.font = `500 ${Math.round(h * 0.052)}px "Cinzel", Georgia, serif`;
        ctx.letterSpacing = `${Math.round(h * 0.012)}px`;
        ctx.fillText('EAU DE PARFUM', w / 2, h * 0.9);
      };
      const drawBack = (ctx: CanvasRenderingContext2D, w: number, h: number) => {
        ctx.clearRect(0, 0, w, h);
        ctx.textAlign = 'center';
        ctx.fillStyle = gold;
        ctx.font = `500 ${Math.round(h * 0.09)}px "Cinzel", Georgia, serif`;
        ctx.letterSpacing = `${Math.round(h * 0.012)}px`;
        ctx.fillText('DAR SAFIA', w / 2, h * 0.52);
        ctx.strokeStyle = 'rgba(230,194,122,0.6)';
        ctx.lineWidth = Math.max(1, h * 0.003);
        ctx.beginPath();
        ctx.moveTo(w * 0.38, h * 0.6);
        ctx.lineTo(w * 0.62, h * 0.6);
        ctx.stroke();
        ctx.font = `400 ${Math.round(h * 0.042)}px "Montserrat", system-ui, sans-serif`;
        ctx.fillStyle = 'rgba(230,194,122,0.8)';
        ctx.letterSpacing = `${Math.round(h * 0.018)}px`;
        ctx.fillText('EAU DE PARFUM', w / 2, h * 0.7);
      };
      const printTexture = (
        draw: (c: CanvasRenderingContext2D, w: number, h: number) => void,
        cw: number,
        ch: number,
        srgb = true
      ) => {
        const c = document.createElement('canvas');
        c.width = cw;
        c.height = ch;
        const ctx = c.getContext('2d');
        const tex = keep(new THREE.CanvasTexture(c));
        if (srgb) tex.colorSpace = THREE.SRGBColorSpace;
        tex.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
        const repaint = () => {
          if (disposed || !ctx) return;
          draw(ctx, cw, ch);
          tex.needsUpdate = true;
        };
        repaint();
        return { tex, repaint };
      };
      // Étiquette de face : portrait, comme la vraie. Le dos reste au format paysage.
      const FRONT_W = rich ? 1024 : 768;
      const FRONT_H = rich ? 1280 : 960;
      const paper = printTexture(drawPaper, FRONT_W, FRONT_H);
      const front = printTexture(drawFront, FRONT_W, FRONT_H);
      const back = printTexture(drawBack, LABEL_W, LABEL_H);
      logoImg.onload = () => {
        logoReady = true;
        front.repaint();
      };
      logoImg.src = '/img/logo/LOGO%20WEBP3.webp';
      void document.fonts?.ready
        .then(() => {
          front.repaint();
          back.repaint();
        })
        .catch(() => {});

      // Foil : un or imprimé, un peu métallique, d'une émission discrète que la
      // timeline fait monter au gros plan (le monogramme « s'allume »).
      const printMat = (tex: Three.Texture) =>
        keep(
          new THREE.MeshStandardMaterial({
            map: tex,
            transparent: true,
            metalness: 0.55,
            roughness: 0.35,
            envMapIntensity: 0.9,
            emissive: new THREE.Color(0xe6c27a),
            emissiveMap: tex,
            emissiveIntensity: 0.25,
            depthWrite: false,
            polygonOffset: true,
            polygonOffsetFactor: -2,
          })
        );
      const frontMat = printMat(front.tex);
      const backMat = printMat(back.tex);
      const PRINT_W = 1.2;
      const PRINT_H = (PRINT_W * LABEL_H) / LABEL_W;
      // Papier : opaque et mat (il porte la couleur de la maison), un peu
      // sous la dorure pour que les filets ne sortent pas du plan.
      const LABEL_PLANE_W = 0.96;
      const LABEL_PLANE_H = (LABEL_PLANE_W * FRONT_H) / FRONT_W;
      const paperMesh = new THREE.Mesh(
        keep(new THREE.PlaneGeometry(LABEL_PLANE_W, LABEL_PLANE_H)),
        keep(
          new THREE.MeshStandardMaterial({
            map: paper.tex,
            roughness: 0.78,
            metalness: 0,
            envMapIntensity: 0.35,
            polygonOffset: true,
            polygonOffsetFactor: -1,
          })
        )
      );
      paperMesh.position.set(0, 1.2, D / 2 + 0.004);
      bottle.add(paperMesh);
      const frontPrint = new THREE.Mesh(
        keep(new THREE.PlaneGeometry(LABEL_PLANE_W, LABEL_PLANE_H)),
        frontMat
      );
      frontPrint.position.set(0, 1.2, D / 2 + 0.007);
      frontPrint.renderOrder = 2;
      bottle.add(frontPrint);
      const backPrint = new THREE.Mesh(keep(new THREE.PlaneGeometry(PRINT_W * 0.7, PRINT_H * 0.7)), backMat);
      backPrint.position.set(0, 1.2, -D / 2 - 0.004);
      backPrint.rotation.y = Math.PI;
      backPrint.renderOrder = 2;
      bottle.add(backPrint);

      // ── Lumières directes ───────────────────────────────────
      // Elles ne font pas le verre (c'est l'environnement) : elles modèlent l'or,
      // le jus, la pierre. Clé large et chaude, contre-jour discret.
      const key = new THREE.DirectionalLight(0xffe2bd, 0.9);
      key.position.set(4.5, 7, 5);
      const rim = new THREE.PointLight(0xc89a52, 6, 24, 2);
      rim.position.set(-3, 2.6, -3.5);
      const fill = new THREE.DirectionalLight(0x8a5a5c, 0.22);
      fill.position.set(-5, 0.5, 4);
      scene.add(key, rim, fill);


      // ── Atmosphère : poussière, faisceaux, caustique ────────
      // Ce qui fait croire à un volume d'air et de lumière, pas à un objet
      // posé dans le vide. Tout est additif, sans écriture de profondeur,
      // et monte avec le dévoilement.
      const softSprite = paintTexture(64, 64, (ctx, w) => {
        const g = ctx.createRadialGradient(w / 2, w / 2, 0, w / 2, w / 2, w / 2);
        g.addColorStop(0, 'rgba(255,236,200,1)');
        g.addColorStop(0.35, 'rgba(255,214,150,0.45)');
        g.addColorStop(1, 'rgba(255,200,120,0)');
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, w);
      });
      const DUST = rich ? 170 : 64;
      const dustBase = new Float32Array(DUST * 3);
      const dustPhase = new Float32Array(DUST);
      const dustPos = new Float32Array(DUST * 3);
      for (let i = 0; i < DUST; i++) {
        dustBase[i * 3] = (Math.random() - 0.5) * 11;
        dustBase[i * 3 + 1] = Math.random() * 6.5 - 0.3;
        dustBase[i * 3 + 2] = (Math.random() - 0.5) * 8 - 1;
        dustPhase[i] = Math.random() * Math.PI * 2;
      }
      const dustGeo = keep(new THREE.BufferGeometry());
      dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
      const dustMat = keep(
        new THREE.PointsMaterial({
          map: softSprite,
          size: rich ? 0.1 : 0.13,
          sizeAttenuation: true,
          transparent: true,
          opacity: 0,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
          color: 0xffd9a0,
        })
      );
      const dust = new THREE.Points(dustGeo, dustMat);
      dust.frustumCulled = false;
      scene.add(dust);

      const beamTex = paintTexture(128, 256, (ctx, w, h) => {
        const g = ctx.createLinearGradient(0, 0, w, 0);
        g.addColorStop(0, 'rgba(255,214,150,0)');
        g.addColorStop(0.5, 'rgba(255,214,150,1)');
        g.addColorStop(1, 'rgba(255,214,150,0)');
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);
        ctx.globalCompositeOperation = 'destination-in';
        const v = ctx.createLinearGradient(0, 0, 0, h);
        v.addColorStop(0, 'rgba(0,0,0,1)');
        v.addColorStop(0.7, 'rgba(0,0,0,0.35)');
        v.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = v;
        ctx.fillRect(0, 0, w, h);
      });
      const makeBeam = (x: number, z: number, rz: number, w: number) => {
        const m = new THREE.Mesh(
          keep(new THREE.PlaneGeometry(w, 11)),
          keep(
            new THREE.MeshBasicMaterial({
              map: beamTex,
              transparent: true,
              opacity: 0,
              depthWrite: false,
              blending: THREE.AdditiveBlending,
              side: THREE.DoubleSide,
            })
          )
        );
        m.position.set(x, 4.2, z);
        m.rotation.z = rz;
        scene.add(m);
        return m;
      };
      const beams = [makeBeam(3.4, -3.2, 0.42, 2.6), makeBeam(5.2, -4.6, 0.55, 1.5)];

      const causticTex = paintTexture(256, 256, (ctx, w) => {
        const g = ctx.createRadialGradient(w / 2, w / 2, 0, w / 2, w / 2, w / 2);
        g.addColorStop(0, 'rgba(255,190,110,0.9)');
        g.addColorStop(0.45, 'rgba(255,160,70,0.28)');
        g.addColorStop(1, 'rgba(255,140,50,0)');
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, w);
        ctx.globalCompositeOperation = 'lighter';
        ctx.strokeStyle = 'rgba(255,225,170,0.35)';
        ctx.lineWidth = 2;
        for (let i = 0; i < 7; i++) {
          ctx.beginPath();
          const y = w * (0.3 + i * 0.07);
          ctx.moveTo(w * 0.25, y);
          ctx.bezierCurveTo(w * 0.4, y - 18, w * 0.6, y + 18, w * 0.75, y);
          ctx.stroke();
        }
      });
      const caustic = new THREE.Mesh(
        keep(new THREE.PlaneGeometry(3.6, 3.6)),
        keep(
          new THREE.MeshBasicMaterial({
            map: causticTex,
            transparent: true,
            opacity: 0,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
          })
        )
      );
      caustic.rotation.x = -Math.PI / 2;
      caustic.position.set(-0.9, 0.008, -0.7);
      scene.add(caustic);

      // ── Post-traitement (palier riche) ──────────────────────
      let composer: { render: () => void; setSize: (w: number, h: number) => void } | null = null;
      let bloomPass: { strength: number; setSize: (w: number, h: number) => void } | null = null;
      let gradeUniforms: { time: { value: number } } | null = null;
      if (rich) {
        const [{ EffectComposer }, { RenderPass }, { UnrealBloomPass }, { ShaderPass }, { OutputPass }] =
          await Promise.all([
            import('three/examples/jsm/postprocessing/EffectComposer.js'),
            import('three/examples/jsm/postprocessing/RenderPass.js'),
            import('three/examples/jsm/postprocessing/UnrealBloomPass.js'),
            import('three/examples/jsm/postprocessing/ShaderPass.js'),
            import('three/examples/jsm/postprocessing/OutputPass.js'),
          ]);
        if (disposed) return;
        const target = keep(
          new THREE.WebGLRenderTarget(width, height, { type: THREE.HalfFloatType, samples: 2 })
        );
        const c = new EffectComposer(renderer, target);
        c.addPass(new RenderPass(scene, camera));
        // Bloom presque nul, seuil haut : seules les spéculaires les plus vives
        // débordent d'un souffle. Il ne FABRIQUE aucun éclat.
        const bloom = new UnrealBloomPass(new THREE.Vector2(width * 0.5, height * 0.5), 0.07, 0.4, 1.15);
        c.addPass(bloom);
        bloomPass = bloom;
        // Étalonnage : grain fin et léger voile chaud dans les ombres, en
        // linéaire, avant le tone mapping.
        const grade = new ShaderPass({
          uniforms: { tDiffuse: { value: null }, time: { value: 0 } },
          vertexShader:
            'varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }',
          fragmentShader: `
            uniform sampler2D tDiffuse; uniform float time; varying vec2 vUv;
            float rnd(vec2 p){ vec3 q = fract(vec3(p.xyx) * 0.1031); q += dot(q, q.yzx + 33.33); return fract((q.x + q.y) * q.z); }
            void main(){
              vec4 c = texture2D(tDiffuse, vUv);
              float l = dot(c.rgb, vec3(0.2126, 0.7152, 0.0722));
              c.rgb += vec3(0.010, 0.004, 0.002) * (1.0 - smoothstep(0.0, 0.25, l));
              c.rgb += (rnd(gl_FragCoord.xy + time * 61.0) - 0.5) * 0.008;
              gl_FragColor = c;
            }`,
        });
        gradeUniforms = grade.uniforms as { time: { value: number } };
        c.addPass(grade);
        c.addPass(new OutputPass()); // applique le tone mapping, une seule fois
        composer = c;
        trash.push({ dispose: () => c.dispose() });
      }

      // ── État piloté par le pointeur ─────────────────────────
      const s = {
        px: 0,
        py: 0,
        cpx: 0,
        cpy: 0,
        spin: 0,
        /** 0 → 1 : le dévoilement, au premier passage à l'écran. */
        intro: reduced ? 1 : 0,
        hover: 0,
        hovering: false,
        dragging: false,
        dragYaw: 0,
        dragVel: 0,
        dragAccum: 0,
        lastX: 0,
        clientX: 0,
        clientY: 0,
        pointerDirty: false,
      };

      const clamp = (v: number) => Math.max(-1, Math.min(1, v));
      const onPointer = (e: PointerEvent) => {
        const r = mount.getBoundingClientRect();
        s.px = clamp(((e.clientX - r.left) / r.width - 0.5) * 2);
        s.py = clamp(((e.clientY - r.top) / r.height - 0.5) * 2);
        s.clientX = e.clientX;
        s.clientY = e.clientY;
        // Le lancer de rayon n'est fait qu'une fois par image, dans la boucle.
        s.pointerDirty = true;
        if (s.dragging) {
          s.dragAccum += (e.clientX - s.lastX) * 0.011;
          s.lastX = e.clientX;
        }
      };

      // ── Prise en main ──
      // Le canvas est sous du texte et un bloc `pointer-events: none` : on
      // écoute la fenêtre et on décide par lancer de rayon si le geste vise le
      // flacon. Un lien ou un champ gardent toujours la priorité.
      const raycaster = new THREE.Raycaster();
      const ndc = new THREE.Vector2();
      const hitsBottle = (clientX: number, clientY: number) => {
        const r = mount.getBoundingClientRect();
        if (clientX < r.left || clientX > r.right || clientY < r.top || clientY > r.bottom) {
          return false;
        }
        ndc.set(((clientX - r.left) / r.width) * 2 - 1, -((clientY - r.top) / r.height) * 2 + 1);
        camera.updateMatrixWorld();
        raycaster.setFromCamera(ndc, camera);
        return raycaster.intersectObjects([glass, cap], false).length > 0;
      };
      const interactive = (t: EventTarget | null) =>
        t instanceof Element && !!t.closest('a, button, input, textarea, select, label');

      const onDown = (e: PointerEvent) => {
        if (e.button !== 0 || interactive(e.target)) return;
        if (!hitsBottle(e.clientX, e.clientY)) return;
        if (e.pointerType === 'mouse' || e.pointerType === 'pen') {
          s.dragging = true;
          s.lastX = e.clientX;
          s.dragVel = 0;
          track.style.cursor = 'grabbing';
          e.preventDefault();
        } else {
          // Au doigt, un glisser défilerait la page : un toucher lance le
          // flacon, sans empêcher le défilement.
          s.dragVel += 3.4;
        }
      };
      const onUp = () => {
        if (!s.dragging) return;
        s.dragging = false;
        track.style.cursor = s.hovering ? 'grab' : '';
      };
      window.addEventListener('pointerdown', onDown);
      window.addEventListener('pointerup', onUp);
      window.addEventListener('pointercancel', onUp);
      const onLeave = () => {
        s.px = 0;
        s.py = 0;
        s.hovering = false;
        onUp();
        track.style.cursor = '';
      };
      if (!coarse) {
        window.addEventListener('pointermove', onPointer, { passive: true });
        document.addEventListener('pointerleave', onLeave);
      }

      const ro = new ResizeObserver(() => {
        const w = mount.clientWidth;
        const h = mount.clientHeight;
        if (!w || !h) return;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
        composer?.setSize(w, h);
        // `EffectComposer.setSize` repasse la floraison en pleine résolution.
        bloomPass?.setSize(w * 0.5, h * 0.5);
      });
      ro.observe(mount);

      // ── Dévoilement ─────────────────────────────────────────
      // La scène se lève : exposition et lumières montent depuis le noir, la
      // caméra recule puis se pose. Déclenché à la première intersection.
      let onScreen = true;
      let introStarted = reduced;
      const io = new IntersectionObserver(([e]) => {
        onScreen = e.isIntersecting;
        if (e.isIntersecting && !introStarted) {
          introStarted = true;
          gsap.to(s, { intro: 1, duration: 2.8, ease: 'power2.out' });
        }
      });
      io.observe(mount);

      // ── Boucle ──────────────────────────────────────────────
      const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
      // Sur large écran, la cible glisse à l'opposé du texte (décalage porté
      // par les plans-clés, en unités monde). En arabe la colonne de texte
      // passe à droite — on miroite.
      const rtl = document.documentElement.dir === 'rtl';
      const lookSign = wide ? (rtl ? -1 : 1) : 0;
      // Sur mobile il n'y a pas de colonne libre : composition CENTRÉE, on
      // recule, et on vise plus bas pour remonter le flacon dans le tiers haut.
      const distBoost = wide ? 0 : 3.6;
      const lookRise = wide ? 0 : -1.05;

      const keyBase = new THREE.Vector3(4.5, 7, 5);
      const rimBase = new THREE.Vector3(-3, 2.6, -3.5);
      const keyCool = new THREE.Color(0xffe2bd);
      const keyAmber = new THREE.Color(0xffc080);
      const wallNeutral = new THREE.Color(1, 1, 1);
      const wallAmber = new THREE.Color(1.28, 1.02, 0.84);
      const yAxis = new THREE.Vector3(0, 1, 0);

      // ── Gouverneur de qualité ──
      // La machine cible est inconnue : on MESURE les premières secondes. Si le
      // budget n'est pas tenu, la résolution baisse d'un cran — un seul.
      const basePixelRatio = renderer.getPixelRatio();
      let sampled = 0;
      let sampledTime = 0;
      let governed = false;

      let readyFlag = false;
      let last = 0;
      const draw = (time: number) => {
        const t = reduced ? 0 : time * 0.001;
        const intro = s.intro;

        // Amortissement indépendant de la fréquence d'images.
        const dt = last ? Math.min(0.1, (time - last) * 0.001) : 1 / 60;
        last = time;
        const damp = (rate: number) => 1 - Math.pow(1 - rate, dt * 60);
        const kPointer = damp(0.085);
        const kSlow = damp(0.06);

        if (!governed && intro >= 1 && dt < 0.05) {
          sampled++;
          sampledTime += dt;
          if (sampled >= 120) {
            governed = true;
            if (sampledTime / sampled > 0.024) {
              const w = mount.clientWidth;
              const h = mount.clientHeight;
              renderer.setPixelRatio(Math.max(1, basePixelRatio * 0.75));
              renderer.setSize(w, h);
              composer?.setSize(w, h);
              bloomPass?.setSize(w * 0.5, h * 0.5);
            }
          }
        }

        // Sur écran tactile, une dérive lente très ample remplace le pointeur.
        if (coarse && !reduced) {
          s.px = Math.sin(t * 0.17) * 0.5;
          s.py = Math.cos(t * 0.12) * 0.25;
        }
        s.cpx = lerp(s.cpx, s.px, kPointer);
        s.cpy = lerp(s.cpy, s.py, kPointer);

        // ── Caméra : plan-clé échantillonné + parallaxe au pointeur ──
        const k = sceneState;
        // Mobile : les plans serrés reculent davantage, le cadre étroit
        // rognerait le flacon.
        const dist = k.d + distBoost + (wide ? 0 : Math.max(0, 10 - k.d) * 0.7 + k.md);
        camera.position.set(
          Math.sin(k.az) * dist + s.cpx * 0.5,
          k.h - s.cpy * 0.3 + Math.sin(t * 0.34) * 0.04,
          // Le recul du dévoilement : la caméra arrive de loin et se pose.
          Math.cos(k.az) * dist + (1 - intro) * 3.2
        );
        camera.lookAt(
          k.look[0] * lookSign + s.cpx * 0.12,
          k.look[1] + (wide ? 0 : lookRise + Math.max(0, 1.7 - k.look[1]) * 0.9) - s.cpy * 0.05,
          k.look[2]
        );
        if (Math.abs(camera.fov - k.fov) > 0.001) {
          camera.fov = k.fov;
          camera.updateProjectionMatrix();
        }

        // ── Lumières et atmosphère : elles suivent l'orbite et les chapitres ──
        key.position.copy(keyBase).applyAxisAngle(yAxis, k.az * 0.7);
        rim.position.copy(rimBase).applyAxisAngle(yAxis, k.az);
        key.intensity = 0.9 * k.key * intro;
        rim.intensity = 6 * k.rim * intro;
        key.color.copy(keyCool).lerp(keyAmber, k.warm);
        wallMat.color.copy(wallNeutral).lerp(wallAmber, k.warm * 0.55).multiplyScalar(0.25 + 0.75 * intro);
        // L'aplat de lumière glisse très lentement le long du défilement.
        wash.position.x = -5.5 + k.az * -3.2;
        (wash.material as Three.MeshBasicMaterial).opacity = (0.05 + k.warm * 0.05) * intro;
        frontMat.emissiveIntensity = (0.1 + k.logo * 0.45) * (0.4 + 0.6 * intro);
        backMat.emissiveIntensity = 0.18;

        // ── Atmosphère : la poussière dérive, les faisceaux respirent ──
        for (let i = 0; i < DUST; i++) {
          const ph = dustPhase[i];
          dustPos[i * 3] = dustBase[i * 3] + Math.sin(t * 0.13 + ph) * 0.45;
          dustPos[i * 3 + 1] = ((dustBase[i * 3 + 1] + t * (0.05 + (ph % 1) * 0.06) + 0.3) % 6.8) - 0.3;
          dustPos[i * 3 + 2] = dustBase[i * 3 + 2] + Math.cos(t * 0.11 + ph) * 0.4;
        }
        dustGeo.attributes.position.needsUpdate = true;
        dust.rotation.y = k.az * 0.35;
        dustMat.opacity = (0.35 + k.warm * 0.3) * intro;
        beams[0].material.opacity = (0.035 + k.warm * 0.05) * k.key * intro * (0.85 + 0.15 * Math.sin(t * 0.4));
        beams[1].material.opacity = (0.02 + k.warm * 0.035) * k.rim * intro * (0.85 + 0.15 * Math.sin(t * 0.31 + 1.7));
        beams.forEach((b, i) => { b.rotation.y = k.az * (0.6 + i * 0.2); });
        caustic.material.opacity = (0.1 + k.logo * 0.12 + k.warm * 0.08) * intro;
        caustic.rotation.z = k.yaw * 0.12;

        // ── Survol : un lancer de rayon par image au plus ──
        if (s.pointerDirty && !coarse) {
          s.pointerDirty = false;
          const over = hitsBottle(s.clientX, s.clientY);
          if (over !== s.hovering) {
            s.hovering = over;
            if (!s.dragging) track.style.cursor = over ? 'grab' : '';
          }
        }
        s.hover = lerp(s.hover, s.hovering || s.dragging ? 1 : 0, kSlow);

        // ── Rotation à la main, avec inertie ──
        if (s.dragging) {
          const step = s.dragAccum;
          s.dragAccum = 0;
          s.dragYaw += step;
          s.dragVel = step / Math.max(dt, 1 / 120);
        } else {
          s.dragYaw += s.dragVel * dt;
          s.dragVel *= Math.pow(0.06, dt);
          // Lâché et presque arrêté, le flacon revient face à nous par le tour
          // le plus court : la pose finit toujours juste.
          if (Math.abs(s.dragVel) < 0.35) {
            const home = Math.round(s.dragYaw / (Math.PI * 2)) * Math.PI * 2;
            s.dragYaw = lerp(s.dragYaw, home, damp(0.035));
          }
        }

        // ── Le flacon : la pose du plan-clé, plus une réponse bornée au pointeur
        // et une respiration presque imperceptible. L'angle est appliqué
        // DIRECTEMENT : ScrollTrigger (`scrub`, donc Lenis) amortit déjà.
        s.spin = lerp(s.spin, s.cpx * 0.2, kSlow);
        bottle.rotation.y =
          k.yaw + s.spin + s.dragYaw + (reduced ? 0 : Math.sin(t * 0.26) * 0.018) - (1 - intro) * 0.5;
        bottle.rotation.x = lerp(bottle.rotation.x, -s.cpy * 0.035, kSlow);
        bottle.position.y = (reduced ? 0 : Math.sin(t * 0.5) * 0.015) + s.hover * 0.05;

        // ── Image : exposition qui monte avec le dévoilement ──
        renderer.toneMappingExposure = 0.92 * k.exposure * (0.05 + 0.95 * intro);
        if (bloomPass) bloomPass.strength = 0.095 * intro;
        if (gradeUniforms) gradeUniforms.time.value = reduced ? 0 : (time * 0.001) % 100;

        if (composer) composer.render();
        else renderer.render(scene, camera);
        if (!readyFlag) {
          readyFlag = true;
          setReady(true);
        }
      };

      const disposeAll = () => {
        master?.revert();
        ro.disconnect();
        io.disconnect();
        gsap.killTweensOf(s);
        if (!coarse) {
          window.removeEventListener('pointermove', onPointer);
          document.removeEventListener('pointerleave', onLeave);
        }
        window.removeEventListener('pointerdown', onDown);
        window.removeEventListener('pointerup', onUp);
        window.removeEventListener('pointercancel', onUp);
        track.style.cursor = '';
        trash.forEach((d) => d.dispose());
        renderer.dispose();
        canvas.remove();
      };

      if (reduced) {
        // Une image, posée sur le premier plan. Aucune boucle.
        draw(0);
        teardown = disposeAll;
        return;
      }

      const tick = () => {
        if (onScreen && !document.hidden) draw(performance.now());
      };
      gsap.ticker.add(tick);
      teardown = () => {
        gsap.ticker.remove(tick);
        disposeAll();
      };
    })();

    return () => {
      disposed = true;
      teardown?.();
    };
  }, [reduced]);

  return (
    <div ref={mountRef} className={className} aria-hidden="true">
      {/* Affiche statique : seulement si WebGL manque ou échoue. */}
      {noGL && (
        // eslint-disable-next-line @next/next/no-img-element -- décor de repli, une seule image
        <img
          src="/poster/maison-flacon.webp"
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-[70%_50%]"
        />
      )}
      {/* Chargement : le temps de compiler les shaders, le monogramme respire. */}
      {!noGL && (
        <div
          className={`pointer-events-none absolute inset-0 z-10 flex items-center justify-center bg-noir transition-opacity duration-1000 ease-out ${ready ? 'opacity-0' : 'opacity-100'}`}
        >
          <LoadingMark compact />
        </div>
      )}
      {/* Vignette : un assombrissement des bords, qui rend la scène photographique. */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 95% at 50% 46%, transparent 55%, rgba(10,5,5,0.55) 100%)',
        }}
      />
    </div>
  );
}
