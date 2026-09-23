import Link from "next/link";
import { CornerArc } from "@/components/brand/CornerArcs";
import { FluencyPlayer } from "@/components/remotion/players";
import { ScaledStage } from "@/components/remotion/ScaledStage";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fluency } from "@/content/site";
import { FluencyFrame } from "@/remotion/FluencyWave.frame";
import { FLUENCY_SCENE, FLUENCY_SIZE } from "@/remotion/FluencyWave.meta";

export function FluencySection() {
  return (
    <section aria-labelledby="fala-title" className="relative overflow-hidden bg-seaweed py-14 text-white md:py-24">
      <CornerArc corner="right" top="16%" color="#03DDB3" size={420} thickness={0.12} className="opacity-80" />
      <CornerArc corner="left" top="82%" color="#00B894" size={340} thickness={0.12} className="opacity-60" />

      <div className="container-flua relative">
        <SectionHeading id="fala-title" eyebrow={fluency.eyebrow} title={fluency.title} lead={fluency.lead} tone="dark" />

        <Reveal delay={0.1} className="mt-14">
          <div className="overflow-hidden rounded-frame bg-seaweed-deep shadow-[0_40px_80px_-40px_rgba(0,0,0,0.45)] ring-1 ring-white/10">
            <FluencyPlayer
              poster={
                <ScaledStage {...FLUENCY_SIZE}>
                  <FluencyFrame frame={FLUENCY_SCENE + Math.round(FLUENCY_SCENE * 0.8)} {...FLUENCY_SIZE} />
                </ScaledStage>
              }
            />
          </div>
        </Reveal>

        <ul className="mt-12 grid gap-5 md:grid-cols-3">
          {fluency.kinds.map((k, i) => (
            <Reveal as="li" key={k.title} delay={i * 0.1} className="h-full rounded-card bg-white/[0.07] p-7 ring-1 ring-white/10">
                <p className="text-2xl font-light text-caribbean">{k.example}</p>
                <h3 className="mt-3 text-xl font-bold">{k.title}</h3>
                <p className="mt-2 leading-relaxed text-white/80">{k.text}</p>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={0.2} className="mt-12 flex flex-wrap gap-3">
          <Link
            href={fluency.cta.href}
            className="rounded-full bg-caribbean px-7 py-3.5 font-semibold text-ink transition-transform duration-300 hover:-translate-y-0.5"
          >
            {fluency.cta.label}
          </Link>
          <Link
            href={fluency.ctaSecondary.href}
            className="rounded-full px-7 py-3.5 font-semibold text-white ring-2 ring-white/30 transition-colors hover:bg-white/10"
          >
            {fluency.ctaSecondary.label}
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
