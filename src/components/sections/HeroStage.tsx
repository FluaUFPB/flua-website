"use client";

import { LayoutGroup, motion } from "motion/react";
import Link from "next/link";
import { useCallback, useEffect, useState, type ReactNode } from "react";
import { HeroPlayer } from "@/components/remotion/players";
import { hero } from "@/content/site";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { HERO_INTRO } from "@/remotion/HeroElo.meta";
import { FPS } from "@/remotion/theme";

const EASE = [0.16, 1, 0.3, 1] as const;
/** Se o Player nunca começar (rede lenta, erro), o texto aparece mesmo assim depois disso */
const NEVER_STARTED_MS = 9000;
/** Depois que a animação começa, margem além da duração da intro */
const AFTER_START_MS = (HERO_INTRO / FPS) * 1000 + 1500;

/**
 * Abertura do hero: primeiro só o logo se formando, centralizado na tela. Quando a animação
 * termina, a frase e os botões entram e empurram o logo suavemente para cima (layout animado).
 * O texto está no HTML desde o início (SEO e leitores de tela); só fica invisível na abertura.
 */
export function HeroStage({
  posterDesktop,
  posterMobile,
}: {
  posterDesktop: ReactNode;
  posterMobile: ReactNode;
}) {
  const reduced = useReducedMotion();
  const [ended, setEnded] = useState(false);
  const [started, setStarted] = useState(false);
  const show = ended || reduced;
  const onEnded = useCallback(() => setEnded(true), []);
  const onStart = useCallback(() => setStarted(true), []);

  // Rede de segurança e respeito a quem já quer rolar: nunca prende o conteúdo
  useEffect(() => {
    if (show) return;
    const timer = setTimeout(() => setEnded(true), started ? AFTER_START_MS : NEVER_STARTED_MS);
    const onScroll = () => window.scrollY > 40 && setEnded(true);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, [show, started]);

  const item = (i: number) => ({
    initial: false as const,
    animate: show ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 },
    transition: { duration: 0.9, delay: show ? 0.35 + i * 0.1 : 0, ease: EASE },
  });

  return (
    <LayoutGroup>
      <motion.div layout transition={{ duration: 1.1, ease: EASE }} className="relative mx-auto w-full max-w-[100rem]">
        <HeroPlayer posterDesktop={posterDesktop} posterMobile={posterMobile} onEnded={onEnded} onStart={onStart} />
      </motion.div>

      <motion.div
        layout
        transition={{ duration: 1.1, ease: EASE }}
        className={`container-flua text-center ${show ? "relative mt-4 md:mt-2" : "pointer-events-none absolute inset-x-0 top-full"}`}
      >
        <motion.p className="eyebrow" {...item(0)}>
          {hero.eyebrow}
        </motion.p>
        <motion.h1 id="hero-title" className="display mx-auto mt-5 max-w-4xl text-ink" {...item(1)}>
          {hero.title}
        </motion.h1>
        <motion.p className="lead mx-auto mt-6 max-w-2xl" {...item(2)}>
          {hero.lead}
        </motion.p>
        <motion.div className="mt-10 flex flex-wrap items-center justify-center gap-3" {...item(3)}>
          <Link
            href={hero.links[0].href}
            tabIndex={show ? undefined : -1}
            className="inline-flex items-center gap-2 rounded-full bg-seaweed px-7 py-3.5 font-semibold text-white shadow-[0_12px_30px_-12px_rgba(0,126,141,0.6)] transition-transform duration-300 hover:-translate-y-0.5"
          >
            {hero.links[0].label}
          </Link>
          <Link
            href={hero.links[1].href}
            tabIndex={show ? undefined : -1}
            className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-semibold text-seaweed transition-colors hover:bg-mint"
          >
            {hero.links[1].label}
            <span aria-hidden>→</span>
          </Link>
        </motion.div>
      </motion.div>

      {/* convite para rolar: o sorriso do pilar "contentamento", só depois da abertura */}
      <motion.a
        href="#portas"
        aria-label="Rolar para o conteúdo"
        className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 text-caribbean md:block"
        initial={false}
        animate={{ opacity: show ? 1 : 0 }}
        transition={{ duration: 0.8, delay: show ? 1 : 0 }}
      >
        <svg viewBox="0 0 40 24" className="h-6 w-10 animate-bounce" aria-hidden>
          <path d="M6 4A14 14 0 0 0 34 4" fill="none" stroke="currentColor" strokeWidth="4" />
        </svg>
      </motion.a>
    </LayoutGroup>
  );
}
