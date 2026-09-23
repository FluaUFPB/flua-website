import { CornerArc } from "@/components/brand/CornerArcs";
import { SectionWave } from "@/components/brand/SectionWave";
import { Reveal } from "@/components/ui/Reveal";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  lead?: string;
  children?: React.ReactNode;
};

/** Topo das páginas internas: fundo mint com arco de canto, que se dissolve em ondas no branco. */
export function PageHero({ eyebrow, title, lead, children }: PageHeroProps) {
  return (
    <section className="relative">
      <div className="relative overflow-hidden bg-mint pt-36 pb-10 md:pt-44 md:pb-14">
        <CornerArc corner="top-right" color="#03DDB3" size={440} thickness={0.13} className="opacity-90" />
        <div className="container-flua relative">
          <Reveal>
            <p className="eyebrow">{eyebrow}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="display mt-5 max-w-4xl">{title}</h1>
          </Reveal>
          {lead && (
            <Reveal delay={0.2}>
              <p className="lead mt-6 max-w-2xl">{lead}</p>
            </Reveal>
          )}
          {children}
        </div>
      </div>
      <SectionWave from="mint" to="white" seed={2.4} />
    </section>
  );
}
