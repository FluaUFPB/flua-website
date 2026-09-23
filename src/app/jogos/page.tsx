import type { Metadata } from "next";
import { ComingSoon } from "@/components/sections/ComingSoon";
import { games } from "@/content/site";

export const metadata: Metadata = {
  title: "Jogos",
  description: "Jogos educativos e abertos ao público sobre a teoria da fluência.",
};

export default function JogosPage() {
  return (
    <ComingSoon
      eyebrow="Jogos"
      title={games.title}
      lead={games.lead}
      items={["Cinco jogos em finalização pela equipe do FLUA", "Acesso livre, sem necessidade de login", "Para estudantes, famílias e curiosos"]}
      note="Os jogos são educativos e informativos. Eles não substituem o acompanhamento fonoaudiológico."
    />
  );
}
