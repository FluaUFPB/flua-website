/**
 * Todo o texto do site mora aqui, para trocar com facilidade quando o FLUA enviar o material.
 * `pending: true` (ou o marcador PENDENTE) indica conteúdo provisório que precisa ser validado
 * pela equipe do FLUA. Ver seção 8 do relatório de reunião (31/07/2026).
 */

export const PENDENTE = "[A CONFIRMAR]";

export const site = {
  name: "FLUA",
  tagline: "Atuação Fonoaudiológica em Fluência",
  /** No briefing aparece como "Laboratório de Estudos Integrados em Fluência". Confirmar qual usar. */
  institution: "Universidade Federal da Paraíba",
  department: "Departamento de Fonoaudiologia · Centro de Ciências da Saúde",
  since: 2016,
  url: "https://flua.ufpb.br", // PENDENTE: domínio definitivo
  description:
    "O FLUA é um projeto de extensão, ensino e pesquisa da UFPB dedicado à fluência da fala e à gagueira: informação confiável para famílias, formação para estudantes e ferramentas para fonoaudiólogos.",
  contact: {
    address: [
      "Clínica Escola de Fonoaudiologia",
      "Cidade Universitária, Campus I",
      "João Pessoa – PB, 58051-900",
    ],
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Cl%C3%ADnica+Escola+de+Fonoaudiologia+UFPB",
    phone: "+55 (83) 3216-7926",
    email: null as string | null, // PENDENTE: e-mail oficial
    whatsapp: null as string | null, // PENDENTE: WhatsApp oficial
    instagram: { handle: "@flua.ufpb", url: "https://www.instagram.com/flua.ufpb/" },
  },
} as const;

export const nav = [
  { label: "Institucional", href: "/institucional" },
  { label: "Fluência", href: "/fluencia" },
  { label: "Cursos", href: "/cursos" },
  { label: "Publicações", href: "/publicacoes" },
  { label: "Jogos", href: "/jogos" },
] as const;

export const areaProfissional = { label: "Área do fonoaudiólogo", href: "/area-do-fonoaudiologo" };

export const hero = {
  eyebrow: "Projeto de extensão · UFPB · desde 2016",
  /** Frase de abertura: entregável da equipe de dev, a validar com a Dra. Débora. */
  title: "Cada fala no seu tempo.",
  lead: "Ciência, acolhimento e formação em fluência. Um lugar para famílias entenderem a gagueira, para estudantes aprenderem com a UFPB e para fonoaudiólogos trabalharem melhor.",
  links: [
    { label: "Conheça o FLUA", href: "#sobre" },
    { label: "Entenda a gagueira", href: "/fluencia" },
  ],
};

export type DoorId = "pais" | "estudantes" | "fonoaudiologos";

export const doors: {
  id: DoorId;
  eyebrow: string;
  title: string;
  text: string;
  cta: string;
  href: string;
}[] = [
  {
    id: "pais",
    eyebrow: "Para famílias",
    title: "Pais e responsáveis",
    text: "O que é gagueira, por que ela aparece na infância e como apoiar a criança no dia a dia, com informação confiável.",
    cta: "Ler orientações",
    href: "/fluencia#para-pais",
  },
  {
    id: "estudantes",
    eyebrow: "Para quem aprende",
    title: "Estudantes",
    text: "A teoria de fluência estudada na UFPB, que é o diferencial do FLUA, além de cursos, eventos e a vivência da extensão.",
    cta: "Conhecer a teoria",
    href: "/fluencia#teoria",
  },
  {
    id: "fonoaudiologos",
    eyebrow: "Para profissionais",
    title: "Fonoaudiólogos",
    text: "Um espaço de trabalho com anamnese, triagem, avaliação de fala e análise de vídeo apoiada por inteligência artificial.",
    cta: "Área do fonoaudiólogo",
    href: "/area-do-fonoaudiologo",
  },
];

export type Stat = {
  value: number | null;
  label: string;
  suffix?: string;
  format?: "year";
  pending?: boolean;
};

export const about: { eyebrow: string; title: string; paragraphs: string[]; stats: Stat[] } = {
  eyebrow: "O que é o FLUA",
  title: "Um elo entre universidade, famílias e profissionais.",
  paragraphs: [
    "O FLUA é um projeto de extensão, ensino e pesquisa do Departamento de Fonoaudiologia da Universidade Federal da Paraíba. Desde 2016, oferece avaliação, diagnóstico, terapia e orientação para pessoas com distúrbios da fluência, como a gagueira.",
    "Ao mesmo tempo, forma estudantes de Fonoaudiologia na prática clínica e na pesquisa, conectando o que se aprende em sala com o cuidado de pessoas reais.",
  ],
  stats: [
    { value: 2016, label: "ano de fundação", format: "year" },
    { value: 10, suffix: " anos", label: "de extensão em fluência" },
    { value: null, label: "extensionistas formados", pending: true },
    { value: null, label: "pessoas atendidas", pending: true },
  ],
};

export const pillars = {
  eyebrow: "Pilares",
  title: "O que nos move.",
  lead: "Cada pilar tem um símbolo desenhado a partir do mesmo arco que forma o logotipo: tudo no FLUA nasce do mesmo elo.",
  /** Os pilares oficiais (missão, valores e um terceiro) virão em slide do FLUA. Por ora, os do manual. */
  items: [
    {
      id: "equipe" as const,
      title: "Trabalho em equipe",
      words: ["família", "compromisso"],
      text: "Professores, estudantes e famílias caminhando juntos, com responsabilidade e vínculo.",
    },
    {
      id: "contentamento" as const,
      title: "Contentamento",
      words: ["satisfação", "alegria"],
      text: "Acolher com leveza: cada conquista na comunicação merece ser celebrada.",
    },
    {
      id: "crescimento" as const,
      title: "Crescimento",
      words: ["crescer", "evoluir", "fluir"],
      text: "Evoluir no próprio ritmo, na clínica, na pesquisa e na formação de novos profissionais.",
    },
  ],
};

export const journey = {
  eyebrow: "Como acolhemos",
  title: "Um caminho feito junto, sem pressa.",
  lead: "Em linhas gerais, é assim que o FLUA acompanha cada pessoa que chega até nós.",
  steps: [
    {
      title: "Acolhimento",
      text: "Uma escuta atenta da história de quem chega e das expectativas da família.",
    },
    {
      title: "Avaliação",
      text: "Uma avaliação fonoaudiológica cuidadosa, para entender a fala de cada pessoa.",
    },
    {
      title: "Terapia",
      text: "Um acompanhamento individualizado, conduzido por estudantes sob supervisão docente.",
    },
    {
      title: "Orientação",
      text: "Uma parceria com a família e a escola, para que a comunicação flua também fora da clínica.",
    },
  ],
};

export const fluency = {
  eyebrow: "A fala que flui",
  title: "Toda fala tem ritmo. Algumas têm ritmos diferentes.",
  lead: "A gagueira é um distúrbio da fluência: o fluxo da fala é interrompido de forma involuntária. Ela não tem relação com inteligência nem com capacidade, e é mais comum do que parece.",
  kinds: [
    {
      title: "Repetições",
      example: "“ca-ca-casa”",
      text: "Sons, sílabas ou palavras que se repetem antes de a fala seguir.",
    },
    {
      title: "Prolongamentos",
      example: "“sssssol”",
      text: "Um som que se estende por mais tempo do que o esperado.",
    },
    {
      title: "Bloqueios",
      example: "“… bola”",
      text: "Uma pausa tensa em que o som não sai, mesmo que a pessoa saiba o que quer dizer.",
    },
  ],
  cta: { label: "Entender a gagueira", href: "/fluencia" },
  ctaSecondary: { label: "Para pais e responsáveis", href: "/fluencia#para-pais" },
};

export type Member = { name: string; role: string; photo?: string; pending?: boolean };

export const team: { eyebrow: string; title: string; lead: string; members: Member[] } = {
  eyebrow: "Equipe",
  title: "Pessoas que fazem o FLUA fluir.",
  lead: "Docentes e estudantes de Fonoaudiologia da UFPB. Fotos e nomes da equipe atual a receber.",
  members: [
    { name: "Profa. Débora Vasconcelos Correia", role: "Coordenação" },
    { name: "Integrante", role: "Extensionista", pending: true },
    { name: "Integrante", role: "Extensionista", pending: true },
    { name: "Integrante", role: "Extensionista", pending: true },
    { name: "Integrante", role: "Extensionista", pending: true },
    { name: "Integrante", role: "Extensionista", pending: true },
  ],
};

export const alumni = {
  eyebrow: "Quem já fluiu por aqui",
  title: "Dez anos de turmas.",
  /** Fotos de turmas anteriores (uso livre, segundo o FLUA). A receber. */
  years: [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026],
};

export type Testimonial = { quote: string; name: string; context: string; pending?: boolean };

export const testimonials: { eyebrow: string; title: string; items: Testimonial[] } = {
  eyebrow: "Relatos",
  title: "Histórias que fluíram.",
  // Até 10 relatos (pacientes: só texto e primeiro nome, com autorização; ex-integrantes: com foto).
  items: [
    {
      quote:
        "Espaço reservado para o relato de uma família atendida pelo FLUA. O texto definitivo será enviado pela equipe, com autorização.",
      name: "Nome",
      context: "Mãe de paciente",
      pending: true,
    },
    {
      quote:
        "Espaço reservado para o relato de um ex-integrante sobre o que a extensão representou na sua formação.",
      name: "Nome",
      context: "Ex-extensionista",
      pending: true,
    },
    {
      quote:
        "Espaço reservado para o relato de um adulto que gagueja e passou pelo acompanhamento do FLUA.",
      name: "Nome",
      context: "Paciente",
      pending: true,
    },
  ],
};

export const games = {
  eyebrow: "Jogos",
  title: "Aprender sobre fluência também pode ser brincadeira.",
  lead: "Jogos educativos sobre a teoria da fluência, abertos a qualquer pessoa. Eles não são terapêuticos: servem para aprender e conversar sobre o tema.",
  status: "Em breve",
  // 5 protótipos em finalização pela Dra. Débora. Nomes provisórios.
  items: ["Jogo 1", "Jogo 2", "Jogo 3", "Jogo 4", "Jogo 5"],
};

export type Faq = { q: string; a: string; pending?: boolean };

export const faq: { eyebrow: string; title: string; items: Faq[] } = {
  eyebrow: "Perguntas frequentes",
  title: "Dúvidas comuns.",
  items: [
    {
      q: "O que é o FLUA?",
      a: "É um projeto de extensão, ensino e pesquisa do Departamento de Fonoaudiologia da UFPB, dedicado aos distúrbios da fluência, como a gagueira. Atua desde 2016 na Clínica Escola de Fonoaudiologia, em João Pessoa.",
    },
    {
      q: "O que é gagueira?",
      a: "É um distúrbio da fluência da fala, em que o fluxo é interrompido de forma involuntária por repetições, prolongamentos ou bloqueios. Costuma começar na infância e não tem relação com inteligência. Com acompanhamento fonoaudiológico, a pessoa pode se comunicar com mais conforto e confiança.",
    },
    {
      q: "Meu filho gagueja. Isso vai passar?",
      a: "Muitas crianças passam por um período de disfluência entre os 2 e os 5 anos, e boa parte delas deixa de gaguejar. Se as disfluências duram mais de seis meses, vêm acompanhadas de tensão ou incomodam a criança, ou se há casos de gagueira na família, vale procurar um fonoaudiólogo.",
    },
    {
      q: "O que é a teoria da fluência estudada na UFPB?",
      a: "Resumo a receber da Dra. Débora Vasconcelos Correia.",
      pending: true,
    },
    {
      q: "O FLUA está recebendo novos pacientes?",
      a: "Por enquanto, este site tem caráter informativo. Informações sobre atendimento serão divulgadas pelos canais oficiais do FLUA.",
      pending: true,
    },
  ],
};

export const history = {
  eyebrow: "Nossa história",
  title: "Dez anos de fio contínuo.",
  // Material com a Dra. Débora. Marcos provisórios, só com o que já é conhecido.
  events: [
    {
      year: "2016",
      title: "O início",
      text: "O FLUA nasce no Departamento de Fonoaudiologia da UFPB, integrando extensão, ensino e pesquisa em fluência.",
    },
    {
      year: "2021",
      title: "Uma nova marca",
      text: "A identidade visual é redesenhada a partir da ideia de elo: vínculo, unidade e continuidade.",
    },
    {
      year: "—",
      title: "Marcos a incluir",
      text: "Pesquisas, eventos, turmas e conquistas do projeto (material a receber).",
      pending: true,
    },
    {
      year: "2026",
      title: "Dez anos",
      text: "O FLUA completa uma década e ganha um novo site, com ferramentas para profissionais e conteúdo aberto ao público.",
    },
  ],
};
