import { SectionWave } from "@/components/brand/SectionWave";
import { About } from "@/components/sections/About";
import { Alumni } from "@/components/sections/Alumni";
import { Doors } from "@/components/sections/Doors";
import { FaqSection } from "@/components/sections/FaqSection";
import { FluencySection } from "@/components/sections/FluencySection";
import { Games } from "@/components/sections/Games";
import { Hero } from "@/components/sections/Hero";
import { Journey } from "@/components/sections/Journey";
import { Pillars } from "@/components/sections/Pillars";
import { Team } from "@/components/sections/Team";
import { Testimonials } from "@/components/sections/Testimonials";

/** As trocas de cor entre seções são sempre ondas em camadas (a linguagem do rodapé). */
export default function Home() {
  return (
    <>
      <Hero />
      <SectionWave from="white" to="mint" seed={0} />
      <Doors />
      <SectionWave from="mint" to="white" seed={1} />
      <About />
      <SectionWave from="white" to="mint" seed={2} />
      <Pillars />
      <SectionWave from="mint" to="white" seed={3} />
      <Journey />
      <SectionWave from="white" to="seaweed" seed={4} />
      <FluencySection />
      <SectionWave from="seaweed" to="white" seed={5} />
      <Team />
      <Alumni />
      <SectionWave from="white" to="mint" seed={6} />
      <Testimonials />
      <SectionWave from="mint" to="white" seed={7} />
      <Games />
      <FaqSection />
    </>
  );
}
