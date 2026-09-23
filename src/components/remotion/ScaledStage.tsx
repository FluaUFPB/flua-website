"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Mostra um frame de composição (desenhado em px no tamanho original) escalado para a largura
 * disponível, exatamente como o Player faz. Usado nos posters estáticos.
 */
export function ScaledStage({
  width,
  height,
  children,
}: {
  width: number;
  height: number;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setScale(entry.contentRect.width / width));
    ro.observe(el);
    return () => ro.disconnect();
  }, [width]);

  return (
    <div ref={ref} className="relative w-full overflow-hidden" style={{ aspectRatio: `${width} / ${height}` }}>
      <div
        className="absolute top-0 left-0 origin-top-left"
        style={{ width, height, scale: scale ?? 0, opacity: scale === null ? 0 : 1 }}
      >
        {children}
      </div>
    </div>
  );
}
