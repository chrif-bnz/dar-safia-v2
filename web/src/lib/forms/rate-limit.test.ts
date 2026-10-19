import { describe, expect, it } from 'vitest';

import { createRateLimiter } from './rate-limit';

describe('createRateLimiter', () => {
  it('laisse passer jusqu’à la limite puis bloque', () => {
    const allow = createRateLimiter(3, 1000);
    expect([1, 2, 3, 4].map(() => allow('a', 0))).toEqual([true, true, true, false]);
  });

  it('compte chaque clé séparément', () => {
    const allow = createRateLimiter(1, 1000);
    expect(allow('a', 0)).toBe(true);
    expect(allow('b', 0)).toBe(true);
    expect(allow('a', 1)).toBe(false);
  });

  it('réouvre une fois la fenêtre écoulée', () => {
    const allow = createRateLimiter(1, 1000);
    expect(allow('a', 0)).toBe(true);
    expect(allow('a', 999)).toBe(false);
    expect(allow('a', 1000)).toBe(true);
  });
});
