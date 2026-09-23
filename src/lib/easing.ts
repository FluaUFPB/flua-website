/**
 * Easings sem dependência de React, para os frames das composições poderem rodar
 * também em Server Components (posters). Mesma matemática do CSS cubic-bezier().
 */
export function bezier(x1: number, y1: number, x2: number, y2: number) {
  const cx = 3 * x1;
  const bx = 3 * (x2 - x1) - cx;
  const ax = 1 - cx - bx;
  const cy = 3 * y1;
  const by = 3 * (y2 - y1) - cy;
  const ay = 1 - cy - by;
  const sx = (t: number) => ((ax * t + bx) * t + cx) * t;
  const sy = (t: number) => ((ay * t + by) * t + cy) * t;
  const dx = (t: number) => (3 * ax * t + 2 * bx) * t + cx;

  const solveX = (x: number) => {
    let t = x;
    for (let i = 0; i < 8; i++) {
      const err = sx(t) - x;
      if (Math.abs(err) < 1e-6) return t;
      const d = dx(t);
      if (Math.abs(d) < 1e-6) break;
      t -= err / d;
    }
    // Bisseção como fallback
    let lo = 0;
    let hi = 1;
    t = x;
    while (lo < hi) {
      const v = sx(t);
      if (Math.abs(v - x) < 1e-6) return t;
      if (x > v) lo = t;
      else hi = t;
      t = (lo + hi) / 2;
      if (hi - lo < 1e-7) break;
    }
    return t;
  };

  return (x: number) => (x <= 0 ? 0 : x >= 1 ? 1 : sy(solveX(x)));
}

/** A curva da marca: cubic-bezier(0.16, 1, 0.3, 1) */
export const easeFlua = bezier(0.16, 1, 0.3, 1);

export const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
