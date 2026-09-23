"use client";

import { useEffect, useId, useRef, useState } from "react";
import { silkLines, type SilkOptions } from "@/lib/silk";
import { useReducedMotion } from "@/lib/useReducedMotion";

export type Strand = { color: string; width: number; opacity?: number };

type SilkProps = Omit<SilkOptions, "width" | "baseline" | "t" | "count"> & {
  height: number;
  /** Fios com cor e espessura próprias; a ordem segue a posição no feixe */
  strands: Strand[];
  /** Velocidade do tempo (1 = tempo real) */
  speed?: number;
  className?: string;
};

/**
 * Fios que se entrelaçam em tempo real (crista da onda do rodapé).
 * Atualiza os paths direto no DOM, pausa fora da tela e fica estático com reduced-motion.
 */
export function Silk({ height, strands, speed = 1, className, ...opts }: SilkProps) {
  const ref = useRef<SVGSVGElement>(null);
  const [width, setWidth] = useState(1440);
  const reduced = useReducedMotion();
  const id = `silk-${useId().replace(/:/g, "")}`;
  const baseline = height / 2;
  const count = strands.length;
  const optsKey = JSON.stringify({ ...opts, count });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setWidth(Math.max(320, e.contentRect.width)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;
    let raf = 0;
    let visible = false;
    let last = 0;
    let t = 0;
    const paths = Array.from(el.querySelectorAll<SVGPathElement>("path[data-silk]"));
    const o = JSON.parse(optsKey) as SilkOptions;
    const loop = (now: number) => {
      t += ((now - last) / 1000) * speed;
      last = now;
      silkLines({ ...o, width, baseline, t }).forEach((l, i) => paths[i]?.setAttribute("d", l.d));
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
  }, [reduced, speed, width, baseline, optsKey]);

  const lines = silkLines({ ...opts, count, width, baseline, t: 0 });

  return (
    <svg
      ref={ref}
      className={className}
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      aria-hidden="true"
      style={{ display: "block", width: "100%", height }}
    >
      <defs>
        <linearGradient id={`${id}-f`} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.12" stopColor="#fff" stopOpacity="1" />
          <stop offset="0.88" stopColor="#fff" stopOpacity="1" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <mask id={`${id}-m`} maskContentUnits="objectBoundingBox">
          <rect width="1" height="1" fill={`url(#${id}-f)`} />
        </mask>
      </defs>
      <g mask={`url(#${id}-m)`} fill="none" strokeLinecap="round">
        {lines.map((l, i) => (
          <path
            key={i}
            data-silk
            d={l.d}
            stroke={strands[i].color}
            opacity={strands[i].opacity ?? 1}
            strokeWidth={strands[i].width}
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </g>
    </svg>
  );
}
