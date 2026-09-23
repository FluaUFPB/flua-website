import type { Metadata } from "next";
import { FaqList } from "@/components/sections/FaqSection";
import { PageHero } from "@/components/sections/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { faq } from "@/content/site";

export const metadata: Metadata = {
  title: "Perguntas frequentes",
  description: "Dúvidas comuns sobre o FLUA, a gagueira e a teoria da fluência.",
};

export default function FaqPage() {
  return (
    <>
      <PageHero eyebrow={faq.eyebrow} title="Perguntas frequentes." lead="O que as famílias, estudantes e profissionais mais perguntam sobre o FLUA e sobre a gagueira." />
      <section className="container-flua py-12 md:py-16">
        <Reveal className="mx-auto max-w-4xl">
          <FaqList items={faq.items} />
        </Reveal>
      </section>
    </>
  );
}
