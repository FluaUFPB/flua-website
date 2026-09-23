import { createNoise2D, createNoise3D } from "simplex-noise";

/** PRNG determinístico (mulberry32): o mesmo frame gera sempre a mesma onda. */
function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Ruído simplex 2D com semente fixa. Substitui o @remotion/noise, que importa o pacote
 * `remotion` inteiro (com React context) e por isso não roda em Server Components.
 */
export const noise2D = createNoise2D(mulberry32(0xf1a));

/** Ruído simplex 3D com semente fixa (usado pela fita do rodapé, com o tempo andando em círculo). */
export const noise3D = createNoise3D(mulberry32(0x5eda));
