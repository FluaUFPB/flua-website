"use client";

import { useRef } from "react";
import { PILLAR_STROKES, PILLAR_STROKE_WIDTH } from "@/components/brand/strokes";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { testimonials } from "@/content/site";

/** As aspas dos relatos são o sorriso do pilar "contentamento". */
function Smile({ className }: { className?: string }) {
  const s = PILLAR_STROKES.contentamento[0];
  return (
    <svg viewBox="26 34 43 30" className={className} aria-hidden>
      <path d={s.d} fill="none" stroke="currentColor" strokeWidth={PILLAR_STROKE_WIDTH} />
    </svg>
  );
}

export function Testimonials() {
  const track = useRef<HTMLUListElement>(null);
  const scrollBy = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector("li");
    el.scrollBy({ left: dir * ((card?.clientWidth ?? 400) + 20), behavior: "smooth" });
  };

  return (
    <section aria-labelledby="relatos-title" className="bg-mint py-14 md:py-20">
      <div className="container-flua">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading id="relatos-title" eyebrow={testimonials.eyebrow} title={testimonials.title} />
          <div className="flex gap-3">
            {([-1, 1] as const).map((dir) => (
              <button
                key={dir}
                type="button"
                onClick={() => scrollBy(dir)}
                aria-label={dir < 0 ? "Relato anterior" : "Próximo relato"}
                className="grid size-12 place-items-center rounded-full border-2 border-seaweed text-seaweed transition-colors hover:bg-seaweed hover:text-white"
              >
                <span aria-hidden>{dir < 0 ? "←" : "→"}</span>
              </button>
            ))}
          </div>
        </div>

        <ul
          ref={track}
          className="mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {testimonials.items.map((t, i) => (
            <li
              key={i}
              className="w-[85%] shrink-0 snap-start rounded-card bg-white p-8 shadow-[0_24px_60px_-40px_rgba(0,126,141,0.5)] md:w-[calc(50%-10px)] md:p-10 lg:w-[calc(33.333%-14px)]"
            >
              <figure className="flex h-full flex-col">
                <div className="flex items-center justify-between">
                  <Smile className="h-7 w-10 text-caribbean" />
                  {t.pending && (
                    <span className="rounded-full bg-mint px-3 py-1 text-xs font-semibold text-seaweed">Texto provisório</span>
                  )}
                </div>
                <blockquote className="mt-6 flex-1 text-lg leading-relaxed font-light text-ink">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-8 border-t border-mint-strong pt-5">
                  <span className="block font-semibold">{t.name}</span>
                  <span className="text-sm text-ink-soft">{t.context}</span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
