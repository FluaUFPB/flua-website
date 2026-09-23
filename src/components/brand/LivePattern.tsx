import type { CSSProperties } from "react";
import { arcPath } from "./Arc";

type Tone = "light" | "caribbean" | "seaweed";

const PALETTE: Record<Tone, [string, string]> = {
  light: ["#03DDB3", "#007E8D"],
  caribbean: ["#007E8D", "#FFFFFF"],
  seaweed: ["#03DDB3", "#FFFFFF"],
};

type LivePatternProps = {
  cols?: number;
  rows?: number;
  tone?: Tone;
  /** Anima a onda que percorre a grade (desligada com prefers-reduced-motion) */
  animated?: boolean;
  className?: string;
  /** Opacidade mínima dos arcos durante a "respiração" */
  minOpacity?: number;
};

const CELL_W = 44;
const CELL_H = 34;

/**
 * Pattern do manual (seção 6): pares de arcos "))" e "((" alternando a direção por linha.
 * Animado, cada par gira com um atraso proporcional à posição: parece uma onda passando pelo padrão.
 */
export function LivePattern({
  cols = 16,
  rows = 6,
  tone = "light",
  animated = true,
  className,
  minOpacity = 0.35,
}: LivePatternProps) {
  const [a, b] = PALETTE[tone];
  const cells = [];
  for (let r = 0; r < rows; r++) {
    const right = r % 2 === 0; // "))" nas linhas pares, "((" nas ímpares
    for (let c = 0; c < cols; c++) {
      const x = c * CELL_W + CELL_W / 2;
      const y = r * CELL_H + CELL_H / 2;
      const [s, e] = right ? [-70, 70] : [110, 250];
      const style = animated
        ? ({
            animationDelay: `${((c + r * 0.6) * 0.14).toFixed(2)}s`,
            transformBox: "fill-box",
            transformOrigin: "center",
          } as CSSProperties)
        : undefined;
      cells.push(
        <g key={`${r}-${c}`} className={animated ? "animate-arc-breathe" : undefined} style={style}>
          <path
            d={arcPath(x + (right ? -9 : 9), y, 6, s, e)}
            stroke={right ? a : b}
            strokeWidth={2.6}
          />
          <path
            d={arcPath(x + (right ? -9 : 9), y, 12, s, e)}
            stroke={right ? b : a}
            strokeWidth={3.4}
          />
        </g>,
      );
    }
  }
  return (
    <svg
      viewBox={`0 0 ${cols * CELL_W} ${rows * CELL_H}`}
      className={className}
      aria-hidden="true"
      fill="none"
      strokeLinecap="butt"
      preserveAspectRatio="xMidYMid slice"
      style={{ ["--arc-min-opacity" as string]: minOpacity }}
    >
      {cells}
    </svg>
  );
}
