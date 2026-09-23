import { noise2D } from "@/lib/noise";
import { interpolate } from "remotion/no-react";
import { easeFlua, easeInOutCubic } from "@/lib/easing";
import { FLUENCY_SCENE } from "./FluencyWave.meta";
import { C, FONT, FPS } from "./theme";

/**
 * "A fala que flui": a fala desenhada como onda. Um cursor percorre a linha como o tempo
 * de uma frase; em cada cena, o envelope da onda mostra um tipo de disfluência.
 * Tom neutro e sem estigma: a disfluência aparece como variação do ritmo, não como erro.
 */

const SCENE = FLUENCY_SCENE;

type Scene = {
  title: string;
  example: string;
  caption: string;
  /** Envelope 0..1 da amplitude ao longo da frase (u = 0..1) */
  envelope: (u: number, frame: number) => number;
  /** Trecho em destaque [início, fim] em u */
  highlight?: [number, number];
};

const packet = (u: number, c: number, w: number) => Math.exp(-(((u - c) / w) ** 2));
const smooth = (e0: number, e1: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - e0) / (e1 - e0)));
  return t * t * (3 - 2 * t);
};

const SCENES: Scene[] = [
  {
    title: "Fala fluente",
    example: "“vamos brincar?”",
    caption: "Toda fala tem pequenas pausas e variações de ritmo.",
    envelope: (u) =>
      [0.14, 0.27, 0.4, 0.55, 0.68, 0.83].reduce(
        (a, c, i) => a + [0.8, 1, 0.75, 0.95, 0.85, 0.6][i] * packet(u, c, 0.055),
        0,
      ),
  },
  {
    title: "Repetição",
    example: "“ca-ca-casa”",
    caption: "Sons, sílabas ou palavras que se repetem antes de a fala seguir.",
    envelope: (u) =>
      [0.14, 0.23, 0.32].reduce((a, c) => a + 0.8 * packet(u, c, 0.028), 0) +
      packet(u, 0.46, 0.05) +
      0.8 * packet(u, 0.58, 0.05) +
      0.7 * packet(u, 0.76, 0.05),
    highlight: [0.09, 0.37],
  },
  {
    title: "Prolongamento",
    example: "“sssssol”",
    caption: "Um som que se estende por mais tempo do que o esperado.",
    envelope: (u) =>
      0.55 * smooth(0.1, 0.14, u) * (1 - smooth(0.44, 0.48, u)) +
      packet(u, 0.56, 0.05) +
      0.75 * packet(u, 0.72, 0.05),
    highlight: [0.1, 0.48],
  },
  {
    title: "Bloqueio",
    example: "“… bola”",
    caption: "Uma pausa tensa em que o som não sai, mesmo sabendo o que dizer.",
    envelope: (u, frame) =>
      0.5 * packet(u, 0.12, 0.03) +
      // tremor quase imperceptível: a tensão do bloqueio
      0.05 * smooth(0.16, 0.2, u) * (1 - smooth(0.46, 0.5, u)) * (0.6 + 0.4 * Math.sin(frame * 1.7)) +
      1.1 * packet(u, 0.58, 0.045) +
      0.85 * packet(u, 0.72, 0.05),
    highlight: [0.16, 0.5],
  },
];

const ease = easeFlua;
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

export function FluencyFrame({
  frame,
  width,
  height,
  background = "transparent",
}: {
  frame: number;
  width: number;
  height: number;
  background?: string;
}) {
  const idx = Math.min(SCENES.length - 1, Math.floor(frame / SCENE));
  const next = (idx + 1) % SCENES.length;
  const local = frame - idx * SCENE;
  const scene = SCENES[idx];
  // mistura com a próxima cena nos últimos 0,6 s
  const mix = interpolate(local, [SCENE - 0.6 * FPS, SCENE], [0, 1], { ...clamp, easing: ease });
  const head = interpolate(local, [0.35 * FPS, 3.1 * FPS], [0, 1], { ...clamp, easing: easeInOutCubic });
  const textIn = interpolate(local, [0, 0.5 * FPS], [0, 1], { ...clamp, easing: ease });
  const textOut = interpolate(local, [SCENE - 0.45 * FPS, SCENE], [1, 0], clamp);
  const textO = Math.min(textIn, textOut);

  const padX = 96;
  const lineW = width - padX * 2;
  const base = height * 0.6;
  const A = 120;
  const steps = 360;

  const sample = (u: number) => {
    const env =
      scene.envelope(u, frame) * (1 - mix) + SCENES[next].envelope(u, frame) * mix;
    const carrier =
      Math.sin(u * 150 + frame * 0.35) * 0.75 +
      0.25 * noise2D(u * 18, frame * 0.02);
    return base + A * Math.min(1.15, env) * carrier;
  };

  let played = "";
  let ahead = "";
  const headIdx = Math.round(head * steps);
  for (let i = 0; i <= steps; i++) {
    const u = i / steps;
    const pt = `${(padX + u * lineW).toFixed(1)} ${sample(u).toFixed(1)}`;
    if (i <= headIdx) played += `${i === 0 ? "M" : "L"}${pt}`;
    if (i >= headIdx) ahead += `${i === headIdx ? "M" : "L"}${pt}`;
  }
  const hx = padX + head * lineW;
  const hy = sample(head);

  const hl = scene.highlight;
  const hlO = hl ? interpolate(head, [hl[0], hl[0] + 0.04], [0, 1], clamp) * textO : 0;

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: FONT, color: C.white, background }}>
      <svg viewBox={`0 0 ${width} ${height}`} width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
        {/* trecho em destaque: um arco que abraça a disfluência */}
        {hl && (
          <g opacity={hlO}>
            <rect
              x={padX + hl[0] * lineW}
              y={base - A * 1.35}
              width={(hl[1] - hl[0]) * lineW}
              height={A * 2.7}
              rx={36}
              fill={C.white}
              opacity={0.07}
            />
            <path
              d={`M${padX + hl[0] * lineW} ${base + A * 1.5}Q${padX + ((hl[0] + hl[1]) / 2) * lineW} ${base + A * 1.95} ${padX + hl[1] * lineW} ${base + A * 1.5}`}
              fill="none"
              stroke={C.caribbean}
              strokeWidth={6}
              strokeLinecap="butt"
            />
          </g>
        )}
        <line x1={padX} x2={width - padX} y1={base} y2={base} stroke={C.white} strokeOpacity={0.12} strokeWidth={2} />
        <path d={ahead} fill="none" stroke={C.white} strokeOpacity={0.28} strokeWidth={3} />
        <path d={played} fill="none" stroke={C.caribbean} strokeWidth={4.5} strokeLinejoin="round" />
        <circle cx={hx} cy={hy} r={11} fill={C.white} />
        <circle cx={hx} cy={hy} r={22} fill="none" stroke={C.white} strokeOpacity={0.35} strokeWidth={3} />
      </svg>

      <div style={{ position: "absolute", left: padX, top: 64, opacity: textO, translate: `0 ${(1 - textIn) * 16}px` }}>
        <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase", color: C.caribbean }}>
          {String(idx + 1).padStart(2, "0")} / {String(SCENES.length).padStart(2, "0")}
        </div>
        <div style={{ fontSize: 60, fontWeight: 700, letterSpacing: "-0.03em", marginTop: 10 }}>{scene.title}</div>
      </div>
      <div
        style={{
          position: "absolute",
          right: padX,
          top: 78,
          fontSize: 44,
          fontWeight: 300,
          color: C.caribbean,
          opacity: textO,
        }}
      >
        {scene.example}
      </div>
      <div
        style={{
          position: "absolute",
          left: padX,
          right: padX,
          bottom: 56,
          fontSize: 26,
          fontWeight: 300,
          color: "rgba(255,255,255,.82)",
          opacity: textO,
        }}
      >
        {scene.caption}
      </div>
    </div>
  );
}
