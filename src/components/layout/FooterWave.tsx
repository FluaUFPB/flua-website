"use client";

import { Silk } from "@/components/brand/Silk";
import { Wave, type WaveLayer } from "@/components/brand/Wave";
import { FLUA_WAVE } from "@/lib/wave";

const shifted = (phase: number, amp = 1) =>
  FLUA_WAVE.map((h) => ({ ...h, amplitude: h.amplitude * amp, phase: (h.phase ?? 0) + phase }));

// Camadas definidas fora do componente: o Wave reinicia a animação se o array mudar.
const LAYERS: WaveLayer[] = [
  { color: "#03DDB3", mode: "fill", opacity: 0.18, baseline: 0.5, harmonics: shifted(0, 0.8) },
  { color: "#007E8D", mode: "fill", baseline: 0.68, harmonics: shifted(1.6, 0.6) },
];

/** Borda superior do rodapé: a onda se encontrando com o verde-azulado, com fios de seda na crista. */
export function FooterWave() {
  return (
    <div className="relative -mb-px">
      <Wave layers={LAYERS} height={90} speed={0.3} />
      <Silk
        height={70}
        strands={[
          { color: "#03DDB3", width: 2, opacity: 0.9 },
          { color: "#FFFFFF", width: 1.25, opacity: 0.45 },
        ]}
        amplitude={14}
        spacing={8}
        wavelength={700}
        seed={21}
        period={24}
        className="pointer-events-none absolute inset-x-0 top-3"
      />
    </div>
  );
}
