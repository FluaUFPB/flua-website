import { evolvePath, getLength, getPointAtLength } from "@remotion/paths";
import { interpolate } from "remotion/no-react";
import { arcPath } from "@/components/brand/Arc";
import { LOGO_VERTICAL } from "@/components/brand/paths";
import { LOGO_STROKE } from "@/components/brand/strokes";
import { bezier, easeFlua } from "@/lib/easing";
import { C } from "./theme";

/**
 * Hero: o elo (círculo) é desenhado girando, com uma ponta luminosa e o traço ganhando peso;
 * ao se fechar ele "respira" e solta dois anéis, como ondas de voz. Então se abre em quatro partes, e cada parte desliza e se
 * transforma, de forma contínua, no arco de uma letra: F, L, U e A. Depois as hastes crescem
 * a partir das pontas dos arcos e a tagline aparece. O resultado final é exatamente o logo.
 */

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const glide = bezier(0.55, 0, 0.25, 1);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

// Elo, no sistema do LOGO_VERTICAL (centro das letras)
const ELO = { cx: 91.73, cy: 19.01, r: 28 };
const R = 19.06; // raio da linha central dos arcos das letras

/**
 * Cada quarto do elo vira o arco de uma letra. Os quartos foram escolhidos pelo ângulo
 * mais próximo do arco de destino, para o movimento ser mínimo e natural.
 * Ângulos em graus, sentido horário, 0° = direita.
 */
const PIECES = [
  { from: [180, 270], to: { cx: 32.04, cy: 21.53, a: [180, 270] } }, // F
  { from: [90, 180], to: { cx: 66.68, cy: 16.5, a: [90, 180] } }, // L
  { from: [0, 90], to: { cx: 97.73, cy: 16.5, a: [0, 180] } }, // U
  { from: [270, 360], to: { cx: 151.42, cy: 21.53, a: [180, 360] } }, // A
] as const;

/** Hastes e barras que crescem a partir das pontas dos arcos, por letra. */
const STEMS: string[][] = [
  ["M12.98 21.53L12.98 38.02", "M15.46 22.25L22.35 22.25"],
  ["M47.62 16.5L47.62 0"],
  ["M78.67 16.5L78.67 0", "M116.79 16.5L116.79 0"],
  ["M132.36 21.53L132.36 38.02", "M170.48 21.53L170.48 38.02", "M134.83 22.25L168 22.25"],
];

const DRAW_END = 32; // o elo termina de se desenhar
const MORPH_START = 44; // pausa curta para o pulso e as ondas de voz
const ELO_PATH = arcPath(ELO.cx, ELO.cy, ELO.r, -90, 270);
const ELO_LEN = getLength(ELO_PATH);
/** Ondas de voz: dois anéis que nascem quando o elo se fecha */
const RIPPLES = [
  { start: DRAW_END - 2, color: C.caribbean },
  { start: DRAW_END + 6, color: C.meadow },
];
const MORPH_LEN = 40;
const STAGGER = 5;

type FrameProps = { frame: number; width: number; height: number };

export function HeroFrame({ frame, width, height }: FrameProps) {
  // A composição mobile é mais estreita (900 px); a desktop tem 1600 px
  const mobile = width < 1200;
  const logoW = mobile ? width * 0.86 : Math.min(width * 0.42, 680);
  const s = logoW / LOGO_VERTICAL.width;
  const logoX = (width - logoW) / 2;
  const logoY = (height - LOGO_VERTICAL.height * s) / 2;

  // 1. O elo se desenha a partir do topo, girando e ganhando peso, como uma pincelada
  const draw = interpolate(frame, [0, DRAW_END], [0, 1], { ...clamp, easing: glide });
  const spin = lerp(-140, 0, draw);
  const weight = LOGO_STROKE * lerp(0.35, 1, draw);
  const head = getPointAtLength(ELO_PATH, Math.max(0.01, draw * ELO_LEN));
  const headO = interpolate(frame, [2, 6, DRAW_END - 4, DRAW_END + 2], [0, 1, 1, 0], clamp);

  // 2. Ao se fechar, o elo "respira" (um pulso leve) e solta as ondas de voz
  const breath = interpolate(frame, [DRAW_END - 4, DRAW_END + 5, MORPH_START], [0, 1, 0], {
    ...clamp,
    easing: easeFlua,
  });
  const pulse = `translate(${ELO.cx} ${ELO.cy}) scale(${1 + 0.07 * breath}) translate(${-ELO.cx} ${-ELO.cy})`;

  // 3. O elo se abre levemente (as quatro partes ficam visíveis) antes de fluir
  const open = interpolate(frame, [DRAW_END + 4, MORPH_START + 6], [0, 1], { ...clamp, easing: easeFlua });

  const tag = interpolate(frame, [104, 132], [0, 1], { ...clamp, easing: easeFlua });
  const lastLand = MORPH_START + 3 * STAGGER + MORPH_LEN;
  const settled = interpolate(frame, [lastLand + 16, lastLand + 20], [0, 1], clamp);

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width="100%"
      height="100%"
      style={{ display: "block", overflow: "visible" }}
      aria-hidden="true"
    >
      <g transform={`translate(${logoX} ${logoY}) scale(${s})`}>
        {/* ondas de voz */}
        {RIPPLES.map((rp, i) => {
          const p = interpolate(frame, [rp.start, rp.start + 30], [0, 1], { ...clamp, easing: easeFlua });
          if (p <= 0 || p >= 1) return null;
          return (
            <circle
              key={`rp-${i}`}
              cx={ELO.cx}
              cy={ELO.cy}
              r={ELO.r + p * 18}
              fill="none"
              stroke={rp.color}
              strokeWidth={LOGO_STROKE * 0.32 * (1 - p * 0.5)}
              opacity={0.5 * Math.pow(1 - p, 1.3)}
            />
          );
        })}

        {frame < DRAW_END ? (
          <g transform={`${pulse} rotate(${spin} ${ELO.cx} ${ELO.cy})`}>
            <path
              d={ELO_PATH}
              fill="none"
              stroke={C.caribbean}
              strokeWidth={weight}
              strokeLinecap="butt"
              {...evolvePath(draw, ELO_PATH)}
            />
            {head && headO > 0 && (
              <g opacity={headO}>
                <circle cx={head.x} cy={head.y} r={5.5} fill={C.caribbean} opacity={0.18} />
                <circle cx={head.x} cy={head.y} r={2.6} fill={C.caribbean} opacity={0.45} />
              </g>
            )}
          </g>
        ) : (
          PIECES.map((piece, i) => {
            const m = interpolate(
              frame,
              [MORPH_START + i * STAGGER, MORPH_START + i * STAGGER + MORPH_LEN],
              [0, 1],
              { ...clamp, easing: glide },
            );
            // folga entre as partes: abre no início e se fecha ao chegar na letra
            const gap = 5 * open * (1 - m);
            const cx = lerp(ELO.cx, piece.to.cx, m);
            // leve arco no trajeto: sobe um pouco no meio do caminho, como se flutuasse
            const cy = lerp(ELO.cy, piece.to.cy, m) - Math.sin(Math.PI * m) * 7;
            const r = lerp(ELO.r, R, m);
            const a0 = lerp(piece.from[0] + gap, piece.to.a[0], m);
            const a1 = lerp(piece.from[1] - gap, piece.to.a[1], m);
            return (
              <path
                key={i}
                d={arcPath(cx, cy, r, a0, a1)}
                transform={m === 0 ? pulse : undefined}
                fill="none"
                stroke={C.caribbean}
                strokeWidth={LOGO_STROKE}
                strokeLinecap="butt"
              />
            );
          })
        )}

        {/* 3. As hastes crescem das pontas dos arcos, logo depois que cada arco pousa */}
        {STEMS.map((stems, i) => {
          const land = MORPH_START + i * STAGGER + MORPH_LEN;
          return stems.map((d, j) => {
            const p = interpolate(frame, [land - 8 + j * 3, land + 12 + j * 3], [0, 1], {
              ...clamp,
              easing: easeFlua,
            });
            if (p <= 0) return null;
            return (
              <path
                key={`${i}-${j}`}
                d={d}
                fill="none"
                stroke={C.caribbean}
                strokeWidth={LOGO_STROKE}
                strokeLinecap="butt"
                {...evolvePath(p, d)}
              />
            );
          });
        })}

        {/* Ao final, as letras oficiais preenchidas cobrem as emendas de antialiasing entre arco e haste */}
        <g fill={C.caribbean} opacity={settled}>
          {LOGO_VERTICAL.letters.map((d, i) => (
            <path key={`f-${i}`} d={d} />
          ))}
        </g>

        {/* tagline */}
        <path
          d={LOGO_VERTICAL.tagline}
          fill={C.seaweed}
          opacity={tag}
          transform={`translate(0 ${interpolate(tag, [0, 1], [5, 0])})`}
        />
      </g>
    </svg>
  );
}

