import { LivePattern } from "@/components/brand/LivePattern";
import { Counter } from "@/components/ui/Counter";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { about } from "@/content/site";

export function About() {
  return (
    <section id="sobre" aria-labelledby="sobre-title" className="relative scroll-mt-24 py-16 md:py-28">
      <div className="container-flua grid items-center gap-14 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <SectionHeading id="sobre-title" eyebrow={about.eyebrow} title={about.title} />
          {about.paragraphs.map((p, i) => (
            <Reveal key={i} delay={0.1 + i * 0.08}>
              <p className="prose-flua mt-6">{p}</p>
            </Reveal>
          ))}
        </div>

        {/* Moldura no estilo dos templates do manual: canto arredondado com borda verde. */}
        <Reveal delay={0.15} className="lg:col-span-6">
          <figure className="relative">
            <div className="absolute -top-4 -right-4 h-2/3 w-2/3 rounded-tr-[3rem] border-t-[10px] border-r-[10px] border-caribbean" />
            <div className="relative aspect-[4/3] overflow-hidden rounded-frame bg-gradient-to-br from-seaweed via-seaweed to-meadow">
              <LivePattern
                tone="seaweed"
                cols={12}
                rows={9}
                minOpacity={0.2}
                className="absolute inset-0 h-full w-full opacity-40"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-seaweed-deep/90 to-transparent p-6 pt-24 text-white md:p-8">
                <p className="text-xs font-bold tracking-[0.3em] text-caribbean uppercase">Foto a receber</p>
                <p className="mt-2 max-w-sm text-sm font-light text-white/85">
                  Equipe do FLUA no campus da UFPB (a referência de estética &ldquo;cidade universitária&rdquo; do
                  briefing).
                </p>
              </div>
            </div>
            <div className="absolute -bottom-5 -left-5 -z-10 size-28 rounded-full border-[10px] border-seaweed" />
          </figure>
        </Reveal>
      </div>

      <div className="container-flua mt-20">
        <dl className="grid grid-cols-2 gap-y-10 border-t border-mint-strong pt-10 md:grid-cols-4">
          {about.stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} className="flex flex-col">
              <dt className="order-2 mt-2 text-sm text-ink-soft">{s.label}</dt>
              <dd className="order-1 text-4xl font-bold tracking-tight text-seaweed md:text-5xl">
                {s.value === null ? (
                  <span className="pending text-ink-soft/60" title="A confirmar com o FLUA">
                    —
                  </span>
                ) : s.format === "year" ? (
                  <Counter from={s.value - 10} to={s.value} />
                ) : (
                  <Counter to={s.value} suffix={s.suffix} />
                )}
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
