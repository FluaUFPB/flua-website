"use client";

import { getLength, getPointAtLength } from "@remotion/paths";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { journey } from "@/content/site";
import { FLUA_WAVE, waveY, wavePath } from "@/lib/wave";

const W = 1200;
const H = 120;
const BASE = H / 2;
const T = 0.6;
const HARM = FLUA_WAVE.map((h) => ({ ...h, amplitude: h.amplitude * 1.3 }));
const PATH = wavePath({ width: W, baseline: BASE, t: T, harmonics: HARM, step: 8 });
const LEN = getLength(PATH);
const NODES_X = journey.steps.map((_, i) => ((i + 0.5) / journey.steps.length) * W);

// Tabela da posição ao longo do fio (progresso → ponto), para a cabeça e os nós
// usarem exatamente o mesmo avanço do traço.
const SAMPLES = 240;
const TABLE = Array.from(
  { length: SAMPLES + 1 },
  (_, i) => getPointAtLength(PATH, (i / SAMPLES) * LEN) ?? { x: 0, y: BASE },
);
const pointAt = (p: number) => TABLE[Math.round(Math.min(1, Math.max(0, p)) * SAMPLES)];

/** Suaviza o "acender" de um nó quando a cabeça do fio chega nele (em px). */
const litFrom = (headX: number, nodeX: number) => Math.min(1, Math.max(0, (headX - (nodeX - 36)) / 36));

/**
 * O Fio atravessa a seção guiado pelo scroll. Uma cabeça luminosa marca a ponta da linha,
 * e cada etapa acende exatamente quando o fio passa por ela.
 */
export function Journey() {
  const reduced = useReducedMotion();

  return (
    <section aria-labelledby="acolhimento-title" className="relative overflow-hidden py-20 md:py-32">
      <div className="container-flua">
        <SectionHeading id="acolhimento-title" eyebrow={journey.eyebrow} title={journey.title} lead={journey.lead} />
      </div>
      <div className="container-flua mt-16 hidden md:block">
        <DesktopLine reduced={!!reduced} />
      </div>
      <div className="container-flua mt-12 md:hidden">
        <MobileLine reduced={!!reduced} />
      </div>
    </section>
  );
}

function useLineProgress(target: React.RefObject<HTMLElement | null>, reduced: boolean) {
  const { scrollYProgress } = useScroll({ target, offset: ["start 85%", "end 40%"] });
  // Spring firme: tira o "degrau" da roda do mouse sem atrasar em relação ao scroll
  const smooth = useSpring(scrollYProgress, { stiffness: 260, damping: 40, mass: 0.3 });
  return reduced ? null : smooth;
}

function DesktopLine({ reduced }: { reduced: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const progress = useLineProgress(ref, reduced);
  const fallback = useTransform(() => 1);
  const p = progress ?? fallback;
  const headX = useTransform(p, (v) => pointAt(v).x);
  const headY = useTransform(p, (v) => pointAt(v).y);
  const headOpacity = useTransform(p, [0, 0.02, 0.98, 1], [0, 1, 1, 0]);

  return (
    <div ref={ref}>
      <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full overflow-visible" aria-hidden>
        <path d={PATH} fill="none" stroke="#C9F5EA" strokeWidth={2} strokeLinecap="round" />
        <motion.path
          d={PATH}
          fill="none"
          stroke="#03DDB3"
          strokeWidth={3}
          strokeLinecap="round"
          style={{ pathLength: p }}
        />
        {NODES_X.map((x, i) => (
          <Node key={i} x={x} y={BASE + waveY(x, T, HARM)} headX={headX} />
        ))}
        {!reduced && (
          <motion.g style={{ opacity: headOpacity }}>
            <motion.circle cx={headX} cy={headY} r={12} fill="#03DDB3" opacity={0.25} />
            <motion.circle cx={headX} cy={headY} r={5} fill="#03DDB3" />
          </motion.g>
        )}
      </svg>
      <ol className="mt-8 grid grid-cols-4 gap-8">
        {journey.steps.map((step, i) => (
          <Step key={step.title} index={i} title={step.title} text={step.text} nodeX={NODES_X[i]} headX={headX} />
        ))}
      </ol>
    </div>
  );
}

function Node({ x, y, headX }: { x: number; y: number; headX: MotionValue<number> }) {
  const lit = useTransform(headX, (hx) => litFrom(hx, x));
  const scale = useTransform(lit, [0, 1], [0.7, 1]);
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r={16} fill="#FFFFFF" stroke="#C9F5EA" strokeWidth={2} />
      <motion.circle r={16} fill="#FFFFFF" stroke="#007E8D" strokeWidth={3} style={{ opacity: lit, scale }} />
      <motion.circle r={6} fill="#03DDB3" style={{ opacity: lit, scale }} />
    </g>
  );
}

function Step({
  index,
  title,
  text,
  nodeX,
  headX,
}: {
  index: number;
  title: string;
  text: string;
  nodeX: number;
  headX: MotionValue<number>;
}) {
  const lit = useTransform(headX, (hx) => litFrom(hx, nodeX));
  const opacity = useTransform(lit, [0, 1], [0.35, 1]);
  const y = useTransform(lit, [0, 1], [10, 0]);
  return (
    <motion.li className="text-center" style={{ opacity, y }}>
      <p className="text-xs font-bold tracking-[0.3em] text-seaweed uppercase">Etapa {index + 1}</p>
      <h3 className="mt-2 text-xl font-bold">{title}</h3>
      <p className="mt-3 leading-relaxed text-ink-soft">{text}</p>
    </motion.li>
  );
}

/** No mobile, O Fio desce na vertical; cada etapa acende quando a ponta chega ao seu marcador. */
function MobileLine({ reduced }: { reduced: boolean }) {
  const ref = useRef<HTMLOListElement>(null);
  const progress = useLineProgress(ref, reduced);
  const fallback = useTransform(() => 1);
  const p = progress ?? fallback;
  const [tops, setTops] = useState<number[]>([]);
  // Altura lida pelo transformer do scroll: ref, para não capturar um valor antigo
  const height = useRef(1);

  // Mede onde fica cada marcador dentro da lista
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => {
      height.current = el.offsetHeight;
      setTops(Array.from(el.querySelectorAll<HTMLElement>(":scope > li")).map((li) => li.offsetTop + 18));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const headY = useTransform(p, (v) => v * height.current);

  return (
    <ol ref={ref} className="relative grid gap-10 pl-12">
      <span aria-hidden className="absolute top-0 bottom-0 left-[15px] w-0.5 rounded-full bg-mint-strong" />
      <motion.span
        aria-hidden
        className="absolute top-0 bottom-0 left-[15px] w-0.5 origin-top rounded-full bg-caribbean"
        style={{ scaleY: p }}
      />
      {journey.steps.map((step, i) => (
        <MobileStep key={step.title} index={i} title={step.title} text={step.text} top={tops[i] ?? 0} headY={headY} />
      ))}
    </ol>
  );
}

function MobileStep({
  index,
  title,
  text,
  top,
  headY,
}: {
  index: number;
  title: string;
  text: string;
  top: number;
  headY: MotionValue<number>;
}) {
  const lit = useTransform(headY, (hy) => Math.min(1, Math.max(0, (hy - (top - 24)) / 24)));
  const opacity = useTransform(lit, [0, 1], [0.4, 1]);
  return (
    <motion.li className="relative" style={{ opacity }}>
      <span
        className="absolute top-0.5 -left-12 grid size-8 place-items-center rounded-full border-2 border-mint-strong bg-white text-xs font-bold text-seaweed"
      >
        <motion.span
          aria-hidden
          className="absolute inset-[-2px] rounded-full border-2 border-caribbean"
          style={{ opacity: lit }}
        />
        {index + 1}
      </span>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="mt-2 leading-relaxed text-ink-soft">{text}</p>
    </motion.li>
  );
}
