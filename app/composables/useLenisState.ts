import type Lenis from 'lenis';

export const useLenisState = () => {
  return useState<Lenis | undefined>('lenis', () => undefined);
};
