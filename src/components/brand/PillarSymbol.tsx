"use client";

import { motion, useReducedMotion } from "motion/react";
import { PILLARS, type PillarId } from "./paths";
import { PILLAR_STROKES, PILLAR_STROKE_WIDTH } from "./strokes";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Símbolo de pilar do manual (seção 1.2). Ao entrar na tela, o círculo se forma
 * e os arcos são desenhados na ordem, com os traços oficiais.
 */
export function PillarSymbol({
  id,
  className,
  delay = 0,
}: {
  id: PillarId;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  const g = PILLARS[id];
  const strokes = PILLAR_STROKES[id];
  const half = g.size / 2;

  return (
    <motion.svg
      viewBox={`0 0 ${g.size} ${g.size}`}
      className={className}
      aria-hidden="true"
      initial={reduced ? false : "hidden"}
      whileInView="shown"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
    >
      <motion.circle
        cx={half}
        cy={half}
        r={half}
        fill={g.background}
        style={{ transformOrigin: "center", transformBox: "fill-box" }}
        variants={{
          hidden: { scale: 0.6, opacity: 0 },
          shown: { scale: 1, opacity: 1, transition: { duration: 0.9, delay, ease: EASE } },
        }}
      />
      {strokes.map((s, i) => (
        <motion.path
          key={i}
          d={s.d}
          fill="none"
          stroke={s.color}
          strokeWidth={s.width ?? PILLAR_STROKE_WIDTH}
          strokeLinecap="butt"
          variants={{
            hidden: { pathLength: 0, opacity: 0 },
            shown: {
              pathLength: 1,
              opacity: 1,
              transition: {
                pathLength: { duration: 0.8, delay: delay + 0.45 + i * 0.22, ease: EASE },
                opacity: { duration: 0.01, delay: delay + 0.45 + i * 0.22 },
              },
            },
          }}
        />
      ))}
    </motion.svg>
  );
}
