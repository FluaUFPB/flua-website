import { PillarSymbol } from "@/components/brand/PillarSymbol";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { pillars } from "@/content/site";

export function Pillars() {
  return (
    <section aria-labelledby="pilares-title" className="relative bg-mint py-14 md:py-20">
      <div className="container-flua">
        <SectionHeading id="pilares-title" eyebrow={pillars.eyebrow} title={pillars.title} lead={pillars.lead} align="center" />
        <div className="mt-16 grid gap-14 md:mt-20 md:grid-cols-3 md:gap-8">
          {pillars.items.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.12} className="flex flex-col items-center text-center">
              <PillarSymbol id={p.id} delay={i * 0.18} className="size-40 md:size-44" />
              <h3 className="mt-8 text-2xl font-bold tracking-tight">{p.title}</h3>
              <ul className="mt-3 flex flex-wrap justify-center gap-2" aria-label="Palavras-chave">
                {p.words.map((w) => (
                  <li key={w} className="rounded-full bg-white px-3 py-1 text-sm font-semibold text-seaweed">
                    {w}
                  </li>
                ))}
              </ul>
              <p className="mt-5 max-w-xs leading-relaxed text-ink-soft">{p.text}</p>
            </Reveal>
          ))}
        </div>
        <p className="mt-14 text-center text-sm text-ink-soft/80">
          <span className="pending">Missão, valores e o terceiro pilar oficial serão atualizados com o material do FLUA.</span>
        </p>
      </div>
    </section>
  );
}
