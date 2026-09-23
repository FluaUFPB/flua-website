import { LivePattern } from "@/components/brand/LivePattern";
import { Reveal } from "@/components/ui/Reveal";
import { alumni } from "@/content/site";

const TONES = ["from-caribbean to-meadow", "from-seaweed to-meadow", "from-meadow to-caribbean"] as const;

function Frame({ year, i }: { year: number; i: number }) {
  return (
    <li
      className={`relative h-56 w-72 shrink-0 overflow-hidden rounded-card bg-gradient-to-br md:h-64 md:w-80 ${TONES[i % TONES.length]}`}
    >
      <LivePattern
        tone={i % 3 === 1 ? "seaweed" : "caribbean"}
        cols={8}
        rows={8}
        animated={false}
        className="absolute inset-0 h-full w-full opacity-25"
      />
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6 text-white">
        <span className="text-5xl font-bold tracking-tight">{year}</span>
        <span className="text-xs font-bold tracking-[0.3em] uppercase opacity-80">Turma</span>
      </div>
    </li>
  );
}

/** Faixa em movimento contínuo com as turmas. As fotos entram no lugar dos quadros quando chegarem. */
export function Alumni() {
  const items = alumni.years;
  return (
    <section aria-labelledby="turmas-title" className="overflow-hidden py-16 md:py-24">
      <div className="container-flua flex flex-wrap items-end justify-between gap-6">
        <Reveal>
          <p className="eyebrow">{alumni.eyebrow}</p>
          <h2 id="turmas-title" className="title mt-4">
            {alumni.title}
          </h2>
        </Reveal>
        <p className="text-sm text-ink-soft">
          <span className="pending">Fotos das turmas a receber</span>
        </p>
      </div>

      <div
        className="group mt-12 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]"
        aria-label="Turmas de 2016 a hoje"
      >
        <ul className="flex w-max animate-marquee gap-5 group-hover:[animation-play-state:paused]" style={{ ["--marquee-duration" as string]: "70s" }}>
          {[...items, ...items].map((y, i) => (
            <Frame key={i} year={y} i={i} />
          ))}
        </ul>
      </div>
    </section>
  );
}
