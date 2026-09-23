"use client";

import { Wave, type WaveLayer } from "./Wave";
import { FLUA_WAVE } from "@/lib/wave";

const COLORS = {
  white: "#FFFFFF",
  mint: "#E8FBF6",
  seaweed: "#007E8D",
} as const;

type Tone = keyof typeof COLORS;

const shifted = (phase: number, amp = 1) =>
  FLUA_WAVE.map((h) => ({ ...h, amplitude: h.amplitude * amp, phase: (h.phase ?? 0) + phase }));

/**
 * Transição entre seções em camadas preenchidas (a mesma linguagem do rodapé): a cor de cima
 * se dissolve na de baixo em ondas translúcidas que se movem devagar. Os layers são memoizados
 * por combinação de cores (o Wave reinicia a animação se o array mudar).
 */
const cache = new Map<string, WaveLayer[]>();
function layersFor(to: Tone, seed: number): WaveLayer[] {
  const key = `${to}-${seed}`;
  const hit = cache.get(key);
  if (hit) return hit;
  const target = COLORS[to];
  // Sobre ou rumo ao seaweed, a primeira camada é um véu caribbean, como no rodapé
  const veil = to === "seaweed" ? "#03DDB3" : target;
  const layers: WaveLayer[] = [
    { color: veil, mode: "fill", opacity: to === "seaweed" ? 0.2 : 0.45, baseline: 0.34, harmonics: shifted(seed, 1.1) },
    { color: target, mode: "fill", opacity: 0.6, baseline: 0.52, harmonics: shifted(seed + 1.7, 0.9) },
    { color: target, mode: "fill", baseline: 0.7, harmonics: shifted(seed + 3.1, 0.7) },
  ];
  cache.set(key, layers);
  return layers;
}

export function SectionWave({
  from,
  to,
  seed = 0,
  height = 96,
}: {
  from: Tone;
  to: Tone;
  seed?: number;
  height?: number;
}) {
  return (
    <div aria-hidden style={{ background: COLORS[from] }} className="relative -my-px">
      <Wave layers={layersFor(to, seed)} height={height} speed={0.3} />
    </div>
  );
}
