"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { useRef } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { history } from "@/content/site";

/** Linha do tempo: O Fio desce na vertical e se desenha com o scroll, ligando os marcos. */
export function History() {
  const ref = useRef<HTMLOListElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 55%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 });

  return (
    <section aria-labelledby="historia-title" className="py-20 md:py-28">
      <div className="container-flua">
        <SectionHeading id="historia-title" eyebrow={history.eyebrow} title={history.title} />
        <ol ref={ref} className="relative mt-16 grid gap-14 md:gap-20">
          {/* trilho e fio */}
          <span aria-hidden className="absolute top-0 bottom-0 left-[19px] w-1 rounded-full bg-mint-strong md:left-1/2 md:-ml-0.5" />
          <motion.span
            aria-hidden
            className="absolute top-0 bottom-0 left-[19px] w-1 origin-top rounded-full bg-caribbean md:left-1/2 md:-ml-0.5"
            style={{ scaleY: reduced ? 1 : scaleY }}
          />
          {history.events.map((ev, i) => {
            const right = i % 2 === 1;
            return (
              <li key={i} className="relative grid pl-16 md:grid-cols-2 md:pl-0">
                {/* nó: o elo */}
                <span
                  aria-hidden
                  className="absolute top-1 left-0 grid size-10 place-items-center rounded-full border-[6px] border-seaweed bg-white md:left-1/2 md:-ml-5"
                >
                  <span className="size-2.5 rounded-full bg-caribbean" />
                </span>
                <Reveal
                  className={right ? "md:col-start-2 md:pl-16" : "md:pr-16 md:text-right"}
                  y={20}
                >
                  <p className={`text-5xl font-bold tracking-tight md:text-6xl ${ev.pending ? "text-ink-soft/40" : "text-caribbean"}`}>
                    {ev.year}
                  </p>
                  <h3 className="mt-3 text-2xl font-bold">{ev.title}</h3>
                  <p className="mt-3 leading-relaxed text-ink-soft">
                    {ev.pending ? <span className="pending">{ev.text}</span> : ev.text}
                  </p>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
