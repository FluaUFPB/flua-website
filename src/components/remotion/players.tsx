"use client";

import { useSyncExternalStore, type ReactNode } from "react";
import { FLUENCY_DURATION, FLUENCY_SIZE } from "@/remotion/FluencyWave.meta";
import { HERO_DURATION, HERO_SIZES } from "@/remotion/HeroElo.meta";
import { FPS } from "@/remotion/theme";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { LazyPlayer } from "./LazyPlayer";

// Imports estáveis (fora dos componentes): o Player exige lazyComponent memoizado.
const loadHero = () => import("@/remotion/HeroElo");
const loadFluency = () => import("@/remotion/FluencyWave");

const MQ = "(max-width: 767px)";
function useIsMobile(): boolean | null {
  return useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia(MQ);
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => window.matchMedia(MQ).matches,
    () => null,
  );
}

export function HeroPlayer({
  posterDesktop,
  posterMobile,
  onEnded,
  onStart,
}: {
  posterDesktop: ReactNode;
  posterMobile: ReactNode;
  onEnded?: () => void;
  onStart?: () => void;
}) {
  const mobile = useIsMobile();
  const reduced = useReducedMotion();
  if (mobile === null || reduced) {
    // Antes da hidratação (ou sem animação): o logo pronto, em fade atrasado quando há movimento,
    // para não "piscar" antes de a animação começar do círculo
    return (
      <div className={reduced ? undefined : "animate-poster-late"}>
        <div className="md:hidden">{posterMobile}</div>
        <div className="hidden md:block">{posterDesktop}</div>
      </div>
    );
  }
  const size = mobile ? HERO_SIZES.mobile : HERO_SIZES.desktop;
  return (
    <LazyPlayer
      key={mobile ? "m" : "d"}
      load={loadHero}
      durationInFrames={HERO_DURATION}
      once
      onEnded={onEnded}
      onStart={onStart}
      fps={FPS}
      {...size}
      // espaço vazio do tamanho certo até a animação começar (sem o logo pronto antes da hora)
      poster={<div style={{ aspectRatio: `${size.width} / ${size.height}` }} />}
    />
  );
}

export function FluencyPlayer({ poster }: { poster: ReactNode }) {
  return (
    <LazyPlayer
      load={loadFluency}
      durationInFrames={FLUENCY_DURATION}
      fps={FPS}
      {...FLUENCY_SIZE}
      poster={poster}
    />
  );
}
