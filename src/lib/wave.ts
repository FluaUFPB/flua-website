/**
 * A onda do FLUA: uma soma de senos usada por todo o site (Remotion e UI),
 * para que "O Fio" seja sempre a mesma linha, em qualquer lugar em que apareça.
 *
 * y(x, t) = Σ amplitude · sin(2π · x / wavelength + speed · t + phase)
 */

export type WaveHarmonic = {
  /** Amplitude em px */
  amplitude: number;
  /** Comprimento de onda em px */
  wavelength: number;
  /** Radianos por unidade de tempo (segundos na UI, frames/fps no Remotion) */
  speed: number;
  phase?: number;
};

/**
 * A onda do FLUA: orgânica, mas sem "tremido". Três componentes longos com razões irregulares
 * (a forma não se repete de modo simétrico na tela) e velocidades próximas, então ela desliza
 * e respira devagar, sem se deformar de forma nervosa. Nada abaixo de ~500px de comprimento.
 */
export const FLUA_WAVE: readonly WaveHarmonic[] = [
  { amplitude: 15, wavelength: 880, speed: 0.5 },
  { amplitude: 8, wavelength: 530, speed: 0.62, phase: 1.3 },
  { amplitude: 9, wavelength: 1450, speed: 0.34, phase: 2.2 },
];

export type RibbonLine = {
  harmonics: WaveHarmonic[];
  /** Deslocamento vertical em relação à linha de base */
  dy: number;
  opacity: number;
};

/** Variações fixas (não aleatórias a cada render) para os fios não ficarem paralelos demais. */
const RIBBON_VARIATION = [
  { dy: 0, amp: 1, phase: 0, opacity: 1 },
  { dy: -1.1, amp: 0.78, phase: 0.55, opacity: 0.7 },
  { dy: 1.5, amp: 1.18, phase: -0.4, opacity: 0.6 },
  { dy: -2.3, amp: 0.62, phase: 1.1, opacity: 0.4 },
  { dy: 2.6, amp: 0.9, phase: -1.0, opacity: 0.35 },
];

/**
 * A "fita": fios finos que se aproximam, se cruzam e se afastam, como seda. Cada fio tem
 * amplitude, fase e distância próprias; o primeiro é o fio principal.
 */
export function ribbon(
  count = 4,
  spread = 7,
  base: readonly WaveHarmonic[] = FLUA_WAVE,
): RibbonLine[] {
  return RIBBON_VARIATION.slice(0, count).map((v) => ({
    harmonics: base.map((h, j) => ({
      ...h,
      amplitude: h.amplitude * v.amp,
      phase: (h.phase ?? 0) + v.phase * (1 + j * 0.35),
    })),
    dy: v.dy * spread,
    opacity: v.opacity,
  }));
}

export function waveY(
  x: number,
  t: number,
  harmonics: readonly WaveHarmonic[] = FLUA_WAVE,
  scale = 1,
): number {
  let y = 0;
  for (const h of harmonics) {
    y +=
      h.amplitude *
      scale *
      Math.sin(((2 * Math.PI) / h.wavelength) * x + h.speed * t + (h.phase ?? 0));
  }
  return y;
}

type WavePathOptions = {
  width: number;
  /** Linha de base vertical da onda */
  baseline: number;
  t: number;
  harmonics?: readonly WaveHarmonic[];
  /** Multiplica todas as amplitudes */
  scale?: number;
  /** Distância entre amostras em px (menor = mais suave) */
  step?: number;
  /** Envelope 0..1 aplicado à amplitude ao longo de x (0..1) */
  envelope?: (u: number) => number;
  /** Fecha o path até esta coordenada y, para preencher (ex.: borda do rodapé) */
  closeTo?: number;
};

/**
 * Gera o atributo `d` de um path SVG com a onda. Usa curvas quadráticas suaves
 * passando pelos pontos médios para não ter "quinas" entre amostras.
 */
export function wavePath({
  width,
  baseline,
  t,
  harmonics = FLUA_WAVE,
  scale = 1,
  step = 12,
  envelope,
  closeTo,
}: WavePathOptions): string {
  const pts: [number, number][] = [];
  const n = Math.max(2, Math.ceil(width / step));
  for (let i = 0; i <= n; i++) {
    const x = (i / n) * width;
    const env = envelope ? envelope(x / width) : 1;
    pts.push([x, baseline + waveY(x, t, harmonics, scale * env)]);
  }

  let d = `M${r(pts[0][0])} ${r(pts[0][1])}`;
  for (let i = 1; i < pts.length - 1; i++) {
    const [x, y] = pts[i];
    const [nx, ny] = pts[i + 1];
    d += `Q${r(x)} ${r(y)} ${r((x + nx) / 2)} ${r((y + ny) / 2)}`;
  }
  const last = pts[pts.length - 1];
  d += `L${r(last[0])} ${r(last[1])}`;

  if (closeTo !== undefined) {
    d += `L${r(width)} ${r(closeTo)}L0 ${r(closeTo)}Z`;
  }
  return d;
}

/**
 * Ajusta as velocidades para múltiplos inteiros de 2π/period, de modo que a onda
 * em t e em t + period seja idêntica. Necessário para loops sem costura no Remotion.
 * Preserva a razão entre as velocidades (a forma continua deslizando sem se deformar).
 */
export function loopable(
  harmonics: readonly WaveHarmonic[],
  period: number,
): WaveHarmonic[] {
  const base = (2 * Math.PI) / period;
  const ref = Math.abs(harmonics[0]?.speed || 1);
  const factor = (Math.max(1, Math.round(ref / base)) * base) / ref;
  return harmonics.map((h) => ({
    ...h,
    speed: Math.round((h.speed * factor) / base) * base,
  }));
}

/** Envelope que zera a amplitude nas pontas (a onda "nasce" e "morre" suave). */
export const taperEnds = (u: number) => Math.sin(Math.PI * Math.min(1, Math.max(0, u)));

function r(v: number) {
  return Math.round(v * 100) / 100;
}
