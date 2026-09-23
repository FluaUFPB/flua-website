import Link from "next/link";
import { arcPath } from "@/components/brand/Arc";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { games } from "@/content/site";

/** Ilustrações abstratas, todas montadas com o módulo base (um jogo, uma composição de arcos). */
const ART: { bg: string; arcs: [number, number, number, number, number, string, number][] }[] = [
  { bg: "bg-caribbean", arcs: [[50, 60, 26, 180, 360, "#FFFFFF", 9], [50, 60, 12, 180, 360, "#007E8D", 9]] },
  { bg: "bg-seaweed", arcs: [[36, 50, 16, 90, 270, "#03DDB3", 7], [58, 50, 16, -90, 90, "#FFFFFF", 7]] },
  { bg: "bg-meadow", arcs: [[50, 40, 20, 0, 180, "#FFFFFF", 8], [50, 64, 12, 180, 360, "#007E8D", 8]] },
  { bg: "bg-mint", arcs: [[34, 50, 8, 90, 270, "#007E8D", 6], [48, 50, 14, 90, 270, "#00B894", 7], [66, 50, 20, 90, 270, "#03DDB3", 8]] },
  { bg: "bg-seaweed", arcs: [[50, 50, 24, -90, 180, "#03DDB3", 9], [50, 50, 10, 90, 360, "#FFFFFF", 7]] },
];

export function Games() {
  return (
    <section aria-labelledby="jogos-title" className="py-20 md:py-28">
      <div className="container-flua">
        <SectionHeading id="jogos-title" eyebrow={games.eyebrow} title={games.title} lead={games.lead} />
        <ul className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-5">
          {games.items.map((name, i) => {
            const art = ART[i % ART.length];
            return (
              <Reveal as="li" key={name} delay={i * 0.07} className="group">
                  <div className={`relative aspect-square overflow-hidden rounded-card ${art.bg}`}>
                    <svg
                      viewBox="0 0 100 100"
                      className="size-full transition-transform duration-700 ease-[var(--ease-flua)] group-hover:scale-110 group-hover:rotate-12"
                      aria-hidden
                    >
                      {art.arcs.map(([cx, cy, r, a0, a1, c, w], j) => (
                        <path key={j} d={arcPath(cx, cy, r, a0, a1)} fill="none" stroke={c} strokeWidth={w} />
                      ))}
                    </svg>
                    <span className="absolute top-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-seaweed">
                      {games.status}
                    </span>
                  </div>
                  <p className="mt-3 font-semibold">
                    <span className="pending">{name}</span>
                  </p>
              </Reveal>
            );
          })}
        </ul>
        <Reveal className="mt-10">
          <Link href="/jogos" className="font-semibold text-seaweed underline-offset-4 hover:underline">
            Saiba mais sobre os jogos →
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
