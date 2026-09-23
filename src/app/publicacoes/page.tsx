import type { Metadata } from "next";
import { ComingSoon } from "@/components/sections/ComingSoon";

export const metadata: Metadata = {
  title: "Publicações",
  description: "Artigos e publicações científicas do FLUA sobre fluência e gagueira.",
};

// O nome da seção ainda está em definição com o FLUA (não pode ser "blog" nem "informações").
export default function PublicacoesPage() {
  return (
    <ComingSoon
      eyebrow="Publicações"
      title="A pesquisa do FLUA, aberta a quem quiser ler."
      lead="Artigos, trabalhos e produções científicas do projeto sobre fluência e gagueira, reunidos em um só lugar."
      items={["Artigos publicados pela equipe", "Trabalhos de conclusão e pesquisas da extensão", "Materiais de divulgação científica"]}
    />
  );
}
