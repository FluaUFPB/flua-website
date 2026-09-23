import type { Metadata } from "next";
import { ComingSoon } from "@/components/sections/ComingSoon";

export const metadata: Metadata = {
  title: "Área do fonoaudiólogo",
  description: "Espaço de trabalho do fonoaudiólogo: anamnese, triagem, avaliação de fala e análise de vídeo com IA.",
  robots: { index: false },
};

export default function AreaFonoPage() {
  return (
    <ComingSoon
      eyebrow="Área do fonoaudiólogo"
      title="Seu espaço de trabalho, com as ferramentas do FLUA."
      lead="Uma área com acesso restrito, com login criado pela equipe do FLUA, reunindo as etapas do atendimento em fluência."
      items={[
        "Anamnese e triagem",
        "Avaliação de fala e versão de leitura",
        "Envio de vídeo para análise automática das disfluências",
        "Relatório com o tipo e a porcentagem de cada disfluência",
      ]}
      note="O acesso será liberado pela coordenação do FLUA. Os dados de pacientes serão tratados como dados sensíveis de saúde, conforme a LGPD."
    />
  );
}
