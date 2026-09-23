import type { Metadata } from "next";
import { ComingSoon } from "@/components/sections/ComingSoon";

export const metadata: Metadata = {
  title: "Cursos",
  description: "Cursos e formação em fluência oferecidos pelo FLUA, projeto de extensão da UFPB.",
};

export default function CursosPage() {
  return (
    <ComingSoon
      eyebrow="Cursos"
      title="Formação em fluência, com a experiência da UFPB."
      lead="Um espaço para estudantes e profissionais aprenderem a teoria de fluência estudada no FLUA, com inscrições online."
      items={["Cursos e oficinas com inscrição", "Conteúdo institucional para estudantes", "Caminho para uma futura especialização em fluência"]}
      note="Os cursos serão divulgados aqui e no Instagram do FLUA."
    />
  );
}
