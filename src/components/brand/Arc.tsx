/**
 * O módulo base do FLUA: um arco de traço grosso com pontas retas (stroke-linecap: butt).
 * Ângulos em graus, sentido horário, 0° = direita, 90° = baixo (coordenadas SVG).
 */
export function arcPath(cx: number, cy: number, r: number, start: number, end: number): string {
  const rad = (a: number) => (a * Math.PI) / 180;
  const sweep = end > start ? 1 : 0;
  const span = Math.abs(end - start);
  // Arcos ≥ 360° não são representáveis com um único comando A: divide em dois.
  if (span >= 359.99) {
    const mid = start + (end - start) / 2;
    return arcPath(cx, cy, r, start, mid) + arcPath(cx, cy, r, mid, end).replace(/^M[^A]+/, "");
  }
  const x1 = cx + r * Math.cos(rad(start));
  const y1 = cy + r * Math.sin(rad(start));
  const x2 = cx + r * Math.cos(rad(end));
  const y2 = cy + r * Math.sin(rad(end));
  const large = span > 180 ? 1 : 0;
  return `M${f(x1)} ${f(y1)}A${f(r)} ${f(r)} 0 ${large} ${sweep} ${f(x2)} ${f(y2)}`;
}

const f = (n: number) => Math.round(n * 100) / 100;

type ArcProps = {
  size?: number;
  start?: number;
  end?: number;
  /** Espessura relativa ao raio (o logo usa ~0,26 do raio) */
  thickness?: number;
  color?: string;
  className?: string;
};

/** Um arco isolado do módulo base, útil como ornamento. */
export function Arc({
  size = 100,
  start = 180,
  end = 360,
  thickness = 0.26,
  color = "currentColor",
  className,
}: ArcProps) {
  const sw = (size / 2) * thickness;
  const r = size / 2 - sw / 2;
  return (
    <svg viewBox={`0 0 ${size} ${size}`} className={className} aria-hidden="true">
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
