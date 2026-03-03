import { describe, it, expect } from 'vitest';
import { serviceIcons } from './constants';

describe('serviceIcons', () => {
  it('contains exactly 8 icons', () => {
    expect(serviceIcons).toHaveLength(8);
  });

  it('every icon follows the mdi: prefix convention', () => {
    serviceIcons.forEach((icon) => {
      expect(icon).toMatch(/^mdi:/);
    });
  });

  it('contains no duplicate icons', () => {
    const unique = new Set(serviceIcons);
    expect(unique.size).toBe(serviceIcons.length);
  });
});
