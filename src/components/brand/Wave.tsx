"use client";

import { useEffect, useId, useRef, useState } from "react";
import { FLUA_WAVE, wavePath, type WaveHarmonic } from "@/lib/wave";
import { useReducedMotion } from "@/lib/useReducedMotion";

export type WaveLayer = {
  color: string;
  /** Traço (linha) ou preenchimento até a base (faixa) */
  mode?: "stroke" | "fill";
  strokeWidth?: number;
  opacity?: number;
  /** Deslocamento de tempo, para as camadas não andarem juntas */
  offset?: number;
  scale?: number;
  /** 0..1: posição vertical da linha de base dentro da altura */
  baseline?: number;
  /** Deslocamento extra da linha de base, em px */
  dy?: number;
  harmonics?: readonly WaveHarmonic[];
};

type WaveProps = {
  layers: WaveLayer[];
  height: number;
  className?: string;
  /** Esmaece os fios nas pontas (só afeta camadas de traço) */
  fadeEnds?: boolean;
  speed?: number;
};

/**
 * O Fio: a onda do FLUA, desenhada em tempo real com a mesma função das composições Remotion.
 * Atualiza o atributo `d` direto no DOM (sem re-render), pausa fora da tela e fica estática
 * com prefers-reduced-motion.
 */
export function Wave({ layers, height, className, fadeEnds = false, speed = 1 }: WaveProps) {
  const ref = useRef<SVGSVGElement>(null);
  const [width, setWidth] = useState(1440);
  const reduced = useReducedMotion();
  const maskId = `fade-${useId().replace(/:/g, "")}`;

  const buildPath = (l: WaveLayer, t: number, w: number) =>
    wavePath({
      width: w,
      baseline: height * (l.baseline ?? 0.5) + (l.dy ?? 0),
      t: t + (l.offset ?? 0),
      harmonics: l.harmonics ?? FLUA_WAVE,
      scale: l.scale ?? 1,
      step: 16,
      closeTo: (l.mode ?? "stroke") === "fill" ? height : undefined,
    });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setWidth(Math.max(320, entry.contentRect.width)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;
    let raf = 0;
    let visible = false;
    let last = performance.now();
    let t = 0;
    const paths = Array.from(el.querySelectorAll<SVGPathElement>("path[data-wave]"));
    const loop = (now: number) => {
      t += ((now - last) / 1000) * speed;
      last = now;
      layers.forEach((l, i) => paths[i]?.setAttribute("d", buildPath(l, t, width)));
      raf = requestAnimationFrame(loop);
    };
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !visible) {
        visible = true;
        last = performance.now();
        raf = requestAnimationFrame(loop);
      } else if (!entry.isIntersecting && visible) {
        visible = false;
        cancelAnimationFrame(raf);
      }
    });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
    // buildPath depende só de props já listadas aqui
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced, speed, width, layers, height]);

  return (
    <svg
      ref={ref}
      className={className}
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      aria-hidden="true"
      style={{ display: "block", width: "100%", height }}
    >
      {fadeEnds && (
        <defs>
          <linearGradient id={`${maskId}-g`} x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="#fff" stopOpacity="0" />
            <stop offset="0.14" stopColor="#fff" stopOpacity="1" />
            <stop offset="0.86" stopColor="#fff" stopOpacity="1" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <mask id={maskId} maskContentUnits="objectBoundingBox">
            <rect width="1" height="1" fill={`url(#${maskId}-g)`} />
          </mask>
        </defs>
      )}
      <g mask={fadeEnds ? `url(#${maskId})` : undefined}>
        {layers.map((l, i) => {
          const d = buildPath(l, 0, width);
          return (l.mode ?? "stroke") === "fill" ? (
            <path key={i} data-wave d={d} fill={l.color} opacity={l.opacity ?? 1} />
          ) : (
            <path
              key={i}
              data-wave
              d={d}
              fill="none"
              stroke={l.color}
              strokeWidth={l.strokeWidth ?? 1.5}
              strokeLinecap="round"
              opacity={l.opacity ?? 1}
              vectorEffect="non-scaling-stroke"
            />
          );
        })}
      </g>
    </svg>
  );
}
