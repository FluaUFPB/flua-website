import { noise3D } from "./noise";

/**
 * Fita de fios que se entrelaçam (usada na crista da onda do rodapé).
 *
 * - A linha central é guiada por ruído simplex (forma orgânica, sem repetição e sem tremido).
 * - Um segundo campo de ruído controla a abertura: os fios se afastam, se juntam e, onde o
 *   campo troca de sinal, cruzam de lado, como uma fita que torce.
 * - O tempo anda em um círculo dentro do espaço do ruído: t e t + period são idênticos.
 */

export type SilkOptions = {
  width: number;
  /** Linha de base vertical, em px */
  baseline: number;
  /** Tempo em segundos */
  t: number;
  /** Duração de um ciclo completo, em segundos */
  period?: number;
  /** Número de fios */
  count?: number;
  /** Amplitude da linha central, em px */
  amplitude?: number;
  /** Abertura máxima entre fios vizinhos, em px */
  spacing?: number;
  /** Comprimento aproximado de uma ondulação, em px */
  wavelength?: number;
  /** Desloca o trecho do ruído */
  seed?: number;
  /** Distância entre amostras, em px */
  step?: number;
  /** Afina a fita nas pontas (0 = sem afinar) */
  taper?: number;
};

export type SilkLine = { d: string };

const TAU = Math.PI * 2;

export function silkLines({
  width,
  baseline,
  t,
  period = 16,
  count = 3,
  amplitude = 26,
  spacing = 4,
  wavelength = 720,
  seed = 0,
  step = 14,
  taper = 0.55,
}: SilkOptions): SilkLine[] {
  const theta = (TAU * t) / period;
  const rho = 0.55;
  const cz = Math.cos(theta) * rho;
  const sz = Math.sin(theta) * rho;
  const f = 1 / wavelength;
  const n = Math.max(2, Math.ceil(width / step));
  const mid = (count - 1) / 2;

  const center: number[] = [];
  const spread: number[] = [];
  const xs: number[] = [];
  for (let k = 0; k <= n; k++) {
    const x = (k / n) * width;
    const u = x / width;
    const env = 1 - taper * (1 - Math.sin(Math.PI * u));
    xs.push(x);
    center.push(
      amplitude *
        env *
        (0.72 * noise3D(x * f + seed, cz, sz) + 0.28 * noise3D(x * f * 2.1 + seed + 31, cz * 1.6, sz * 1.6)),
    );
    spread.push(spacing * env * noise3D(x * f * 0.8 + seed + 97, cz + 3.1, sz + 3.1) * 1.6);
  }

  return Array.from({ length: count }, (_, i) => {
    const k = i - mid;
    const pts = xs.map((x, j) => [x, baseline + center[j] + k * spread[j]] as const);
    let d = `M${r(pts[0][0])} ${r(pts[0][1])}`;
    for (let j = 1; j < pts.length - 1; j++) {
      const [x, y] = pts[j];
      const [nx, ny] = pts[j + 1];
      d += `Q${r(x)} ${r(y)} ${r((x + nx) / 2)} ${r((y + ny) / 2)}`;
    }
    const last = pts[pts.length - 1];
    d += `L${r(last[0])} ${r(last[1])}`;
    return { d };
  });
}

function r(v: number) {
  return Math.round(v * 10) / 10;
}
