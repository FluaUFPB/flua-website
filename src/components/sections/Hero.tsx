import { CornerArc } from "@/components/brand/CornerArcs";
import { site } from "@/content/site";
import { HeroFrame } from "@/remotion/HeroElo.frame";
import { HERO_INTRO, HERO_SIZES } from "@/remotion/HeroElo.meta";
import { HeroStage } from "./HeroStage";

export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pt-24 pb-16"
    >
      {/* arcos de canto, como a capa do manual */}
      <CornerArc corner="top-left" color="#03DDB3" size={520} className="hidden opacity-90 md:block" />
      {/* ancorado na altura da tela (svh), não na da seção: a seção cresce quando o texto entra */}
      <CornerArc corner="right" top="58svh" color="#007E8D" size={340} className="hidden opacity-90 md:block" />
      <CornerArc corner="top-left" color="#03DDB3" size={190} className="md:hidden" />

      <p className="sr-only">
        {site.name}: {site.tagline}
      </p>
      <HeroStage
        posterDesktop={<HeroFrame frame={HERO_INTRO} {...HERO_SIZES.desktop} />}
        posterMobile={<HeroFrame frame={HERO_INTRO} {...HERO_SIZES.mobile} />}
      />
    </section>
  );
}
