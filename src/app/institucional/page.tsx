import type { Metadata } from "next";
import { SectionWave } from "@/components/brand/SectionWave";
import { About } from "@/components/sections/About";
import { Alumni } from "@/components/sections/Alumni";
import { History } from "@/components/sections/History";
import { PageHero } from "@/components/sections/PageHero";
import { Pillars } from "@/components/sections/Pillars";
import { Team } from "@/components/sections/Team";

export const metadata: Metadata = {
  title: "Institucional",
  description: "A história, os pilares e a equipe do FLUA, projeto de extensão em fluência da UFPB desde 2016.",
};

export default function InstitucionalPage() {
  return (
    <>
      <PageHero
        eyebrow="Institucional"
        title="Dez anos cuidando da fala, juntos."
        lead="Conheça a história, os pilares e as pessoas por trás do FLUA, o projeto de extensão, ensino e pesquisa em fluência da Universidade Federal da Paraíba."
      />
      <About />
      <History />
      <SectionWave from="white" to="mint" seed={2} />
      <Pillars />
      <SectionWave from="mint" to="white" seed={3} />
      <Team />
      <Alumni />
    </>
  );
}
