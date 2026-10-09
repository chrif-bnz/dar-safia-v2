import { describe, expect, it } from 'vitest';

import { CHAPTERS, KEYFRAMES, sampleTimeline } from './about-timeline';

const STEPS = 2000;
const samples = Array.from({ length: STEPS + 1 }, (_, i) => sampleTimeline(i / STEPS));

describe('about timeline', () => {
  it('est déterministe : même progression, même état', () => {
    expect(sampleTimeline(0.437)).toEqual(sampleTimeline(0.437));
  });

  it('passe exactement par chaque plan-clé', () => {
    for (const k of KEYFRAMES) {
      const s = sampleTimeline(k.t);
      expect(s.yaw).toBeCloseTo(k.yaw, 6);
      expect(s.az).toBeCloseTo(k.az, 6);
      expect(s.d).toBeCloseTo(k.d, 6);
    }
  });

  it('fait un tour complet et se termine étiquette de face', () => {
    const end = sampleTimeline(1);
    expect(end.yaw).toBeCloseTo(-Math.PI * 2, 6);
    expect(end.az).toBeCloseTo(0, 6);
    // Rotation continue : jamais ramenée modulo 2π, donc aucun saut de 360°.
    for (let i = 1; i < samples.length; i++) {
      expect(Math.abs(samples[i].yaw - samples[i - 1].yaw)).toBeLessThan(0.05);
    }
  });

  it("ne regarde le dos du flacon qu'un court instant", () => {
    // Angle relatif flacon / caméra : le dos est à ±π (mod 2π), ±55° autour.
    const backWindow = 0.96;
    let back = 0;
    for (const s of samples) {
      const rel = (((s.yaw - s.az) % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
      if (Math.abs(rel - Math.PI) < backWindow) back++;
    }
    expect(back / samples.length).toBeLessThan(0.1);
  });

  it("garde l'étiquette lisible à chaque fin de chapitre", () => {
    for (const c of CHAPTERS) {
      const s = sampleTimeline(c.end);
      const TAU = Math.PI * 2;
      const rel = Math.abs((((s.yaw - s.az + Math.PI) % TAU) + TAU) % TAU - Math.PI);
      expect(rel).toBeLessThan(Math.PI - 1.0);
    }
  });

  it('garde la caméra hors du flacon (rayon ~1) et dans une plage de champ sûre', () => {
    for (const s of samples) {
      expect(s.d).toBeGreaterThan(4);
      expect(s.fov).toBeGreaterThan(18);
      expect(s.fov).toBeLessThan(40);
    }
  });

  it('range les chapitres dans l’ordre sans chevauchement', () => {
    for (let i = 1; i < CHAPTERS.length; i++) {
      expect(CHAPTERS[i].start).toBeGreaterThanOrEqual(CHAPTERS[i - 1].end);
    }
  });
});
