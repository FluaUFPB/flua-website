import type { CSSProperties } from "react";
import { arcPath } from "./Arc";

type Corner = "top-left" | "top-right" | "bottom-left" | "bottom-right";
type Side = "left" | "right";

/** Parte visível do círculo em cada posição (graus, sentido horário, 0° = direita). */
const VISIBLE: Record<Corner | Side, [number, number]> = {
  "top-left": [0, 90],
  "top-right": [90, 180],
  "bottom-left": [270, 360],
  "bottom-right": [180, 270],
  left: [-90, 90],
  right: [90, 270],
};

type CornerArcProps = {
  /**
   * Canto: o centro do elo fica no canto (quarto visível).
   * Lateral ("left"/"right"): o centro fica na borda, na altura `top`, e só a borda da tela
   * corta o elo (meio elo visível). Use a lateral quando a borda de baixo da seção não é
   * visível (seção seguinte da mesma cor), para o recorte nunca parecer acidental.
   */
  corner: Corner | Side;
  color?: string;
  /** Diâmetro do elo em px */
  size?: number;
  /** Espessura relativa ao diâmetro */
  thickness?: number;
  /** Só para as laterais: posição vertical do centro (ex.: "60%") */
  top?: string;
  className?: string;
  style?: CSSProperties;
};

/**
 * Elo cortado pela borda, como na capa do manual. O pai precisa de `relative overflow-hidden`.
 */
export function CornerArc({
  corner,
  color = "#03DDB3",
  size = 420,
  thickness = 0.14,
  top = "50%",
  className = "",
  style,
}: CornerArcProps) {
  const sw = size * thickness;
  const r = size / 2 - sw / 2;
  const [start, end] = VISIBLE[corner];
  const position: CSSProperties =
    corner === "left" || corner === "right"
      ? { [corner]: -size / 2, top: `calc(${top} - ${size / 2}px)` }
      : (() => {
          const [v, h] = corner.split("-") as ["top" | "bottom", Side];
          return { [v]: -size / 2, [h]: -size / 2 };
        })();
  return (
    <svg
      aria-hidden="true"
      viewBox={`0 0 ${size} ${size}`}
      width={size}
      height={size}
      className={`pointer-events-none absolute max-w-none ${className}`}
      style={{ ...position, ...style }}
    >
      <path
        d={arcPath(size / 2, size / 2, r, start, end)}
        fill="none"
        stroke={color}
        strokeWidth={sw}
        strokeLinecap="butt"
      />
    </svg>
  );
}
