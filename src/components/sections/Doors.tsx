import Link from "next/link";
import type { PillarId } from "@/components/brand/paths";
import { PillarSymbol } from "@/components/brand/PillarSymbol";
import { Reveal } from "@/components/ui/Reveal";
import { doors, type DoorId } from "@/content/site";

/**
 * Cada porta usa um símbolo oficial de pilar do manual (seção 1.2):
 * família → pais; crescer/evoluir → estudantes; satisfação no trabalho → fonoaudiólogos.
 */
const DOOR_PILLAR: Record<DoorId, PillarId> = {
  pais: "equipe",
  estudantes: "crescimento",
  fonoaudiologos: "contentamento",
};

const STYLES = {
  pais: {
    card: "bg-white text-ink shadow-[0_24px_60px_-40px_rgba(0,126,141,0.45)]",
    ring: "#007E8D",
    eyebrow: "text-seaweed",
    text: "text-ink-soft",
    cta: "text-seaweed",
  },
  estudantes: {
    card: "bg-white text-ink shadow-[0_24px_60px_-40px_rgba(0,126,141,0.45)]",
    ring: "#03DDB3",
    eyebrow: "text-seaweed",
    text: "text-ink-soft",
    cta: "text-seaweed",
  },
  fonoaudiologos: {
    card: "bg-seaweed text-white",
    ring: "#03DDB3",
    eyebrow: "text-caribbean",
    text: "text-white/85",
    cta: "text-caribbean",
  },
} as const;

/** Circunferência do anel fino (r = 38) que se fecha no hover, virando o elo */
const C = 2 * Math.PI * 38;

export function Doors() {
  return (
    <section id="portas" aria-label="Para quem é o FLUA" className="relative scroll-mt-24 bg-mint py-14 md:py-20">
      <div className="container-flua">
        <Reveal className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
          <p className="eyebrow">Um guarda-chuva, três caminhos</p>
          <h2 className="title mt-4">Por onde você quer começar?</h2>
        </Reveal>
        <div className="grid gap-5 md:grid-cols-3">
          {doors.map((door, i) => {
            const s = STYLES[door.id];
            return (
              <Reveal key={door.id} delay={i * 0.1}>
                <Link
                  href={door.href}
                  className={`group relative flex h-full flex-col overflow-hidden rounded-card p-8 transition-transform duration-500 hover:-translate-y-1.5 md:p-10 ${s.card}`}
                >
                  {/* símbolo oficial do pilar; no hover, um anel fino se fecha em volta: o elo */}
                  <span className="relative grid size-20 place-items-center">
                    <svg viewBox="0 0 80 80" className="absolute inset-0 -rotate-90" aria-hidden>
                      <circle
                        cx="40"
                        cy="40"
                        r="38"
                        fill="none"
                        stroke={s.ring}
                        strokeWidth="1.5"
                        strokeDasharray={C}
                        className="[stroke-dashoffset:var(--o)] transition-[stroke-dashoffset] duration-700 ease-[var(--ease-flua)] group-hover:[stroke-dashoffset:0]"
                        style={{ ["--o" as string]: C }}
                      />
                    </svg>
                    <PillarSymbol id={DOOR_PILLAR[door.id]} delay={i * 0.12} className="size-16" />
                  </span>
                  <p className={`mt-8 text-xs font-bold tracking-[0.3em] uppercase ${s.eyebrow}`}>{door.eyebrow}</p>
                  <h3 className="mt-3 text-2xl font-bold tracking-tight md:text-[1.75rem]">{door.title}</h3>
                  <p className={`mt-4 flex-1 leading-relaxed ${s.text}`}>{door.text}</p>
                  <span className={`mt-8 inline-flex items-center gap-2 font-semibold ${s.cta}`}>
                    {door.cta}
                    <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
