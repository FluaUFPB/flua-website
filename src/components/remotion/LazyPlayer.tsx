"use client";

import type { PlayerRef } from "@remotion/player";
import { useEffect, useRef, useState, type ComponentType, type ReactNode } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

type PlayerModule = typeof import("@remotion/player");

type LazyPlayerProps = {
  /** Import dinâmico da composição (só baixa quando o Player chega perto da tela) */
  load: () => Promise<{ default: ComponentType<Record<string, unknown>> }>;
  durationInFrames: number;
  fps: number;
  width: number;
  height: number;
  /** Arte estática renderizada no servidor: aparece antes do Player e com reduced-motion */
  poster: ReactNode;
  /** Toca uma vez e fica no último frame (sem loop) */
  once?: boolean;
  /** Chamado quando a composição chega ao fim (só no modo `once`) */
  onEnded?: () => void;
  /** Chamado quando o Player assume o lugar do poster e começa a tocar */
  onStart?: () => void;
  inputProps?: Record<string, unknown>;
  className?: string;
};

/**
 * Wrapper do @remotion/player para o site: sem controles, mudo, em loop, pausa fora da tela
 * e respeita prefers-reduced-motion (fica só o poster).
 */
export function LazyPlayer({
  load,
  durationInFrames,
  fps,
  width,
  height,
  poster,
  once = false,
  onEnded,
  onStart,
  inputProps,
  className,
}: LazyPlayerProps) {
  const box = useRef<HTMLDivElement>(null);
  const player = useRef<PlayerRef>(null);
  const [mod, setMod] = useState<PlayerModule | null>(null);
  const [ready, setReady] = useState(false);
  const reduced = useReducedMotion();

  // Baixa o Player quando estiver a ~300px de aparecer
  useEffect(() => {
    if (reduced || mod) return;
    const el = box.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          io.disconnect();
          import("@remotion/player").then(setMod);
        }
      },
      { rootMargin: "300px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced, mod]);

  // Toca só quando visível
  useEffect(() => {
    const el = box.current;
    if (!mod || !el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        const p = player.current;
        if (!p) return;
        // No modo "once", depois do fim não recomeça ao voltar para a tela
        const ended = once && p.getCurrentFrame() >= durationInFrames - 1;
        if (entry.isIntersecting && !ended) p.play();
        else p.pause();
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [mod, ready, once, durationInFrames]);

  // Avisa quem estiver esperando o fim (ex.: o hero revela o texto)
  useEffect(() => {
    const p = player.current;
    if (!p || !onEnded) return;
    p.addEventListener("ended", onEnded);
    return () => p.removeEventListener("ended", onEnded);
  }, [ready, onEnded]);

  const Player = mod?.Player;

  return (
    <div ref={box} className={`relative ${className ?? ""}`} aria-hidden="true">
      <div
        className="transition-opacity duration-500"
        style={{ opacity: ready ? 0 : 1, position: ready ? "absolute" : "relative", inset: 0 }}
      >
        {poster}
      </div>
      {Player && !reduced && (
        <Player
          ref={(r) => {
            player.current = r;
            if (r && !ready)
              requestAnimationFrame(() => {
                setReady(true);
                onStart?.();
              });
          }}
          lazyComponent={load}
          inputProps={inputProps ?? {}}
          durationInFrames={durationInFrames}
          fps={fps}
          compositionWidth={width}
          compositionHeight={height}
          style={{
            width: "100%",
            aspectRatio: `${width} / ${height}`,
            opacity: ready ? 1 : 0,
            position: ready ? "relative" : "absolute",
            inset: 0,
          }}
          autoPlay
          initiallyMuted
          loop={!once}
          moveToBeginningWhenEnded={!once}
          controls={false}
          clickToPlay={false}
          spaceKeyToPlayOrPause={false}
          doubleClickToFullscreen={false}
          acknowledgeRemotionLicense
        />
      )}
    </div>
  );
}
