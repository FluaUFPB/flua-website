/**
 * Conteúdo da página "Fluência e gagueira".
 * Rascunho da equipe de dev, baseado no consenso clínico geral sobre gagueira.
 * PRECISA DE REVISÃO da Dra. Débora antes de publicar. A seção "teoria" aguarda o texto dela.
 */

export type Block =
  | { type: "p"; text: string }
  | { type: "list"; items: { title?: string; text: string }[] }
  | { type: "callout"; text: string }
  | { type: "pending"; text: string };

export type Chapter = { id: string; title: string; blocks: Block[] };

export const fluenciaPage = {
  eyebrow: "Fluência e gagueira",
  title: "Entender a fala para acolher quem fala.",
  lead: "Informação confiável sobre fluência e gagueira para famílias, estudantes e qualquer pessoa curiosa, organizada pela equipe do FLUA.",
  reviewNote: "Texto em revisão pela coordenação do FLUA.",
  chapters: [
    {
      id: "fluencia",
      title: "O que é fluência",
      blocks: [
        {
          type: "p",
          text: "Fluência é o fluxo contínuo e suave da fala: a forma como sons, sílabas e palavras se encadeiam no tempo. Ninguém fala de forma perfeitamente contínua. Pausas, hesitações e pequenas repetições fazem parte da fala de todas as pessoas.",
        },
        {
          type: "p",
          text: "Quando essas interrupções são frequentes, involuntárias e vêm acompanhadas de esforço ou tensão, podemos estar diante de um distúrbio da fluência, e o mais conhecido deles é a gagueira.",
        },
      ],
    },
    {
      id: "gagueira",
      title: "O que é gagueira",
      blocks: [
        {
          type: "p",
          text: "A gagueira é um distúrbio da fluência da fala de origem neurobiológica, em que o fluxo da fala é interrompido de forma involuntária. A pessoa sabe exatamente o que quer dizer, mas a fala não sai da forma como ela gostaria.",
        },
        {
          type: "list",
          items: [
            { title: "Repetições", text: "de sons, sílabas ou palavras inteiras (“ca-ca-casa”)." },
            { title: "Prolongamentos", text: "de sons (“sssssol”)." },
            { title: "Bloqueios", text: "pausas tensas em que o som não sai." },
          ],
        },
        {
          type: "callout",
          text: "A gagueira não tem relação com inteligência, capacidade ou caráter. Ela também não é causada pelos pais, e ansiedade e nervosismo não são a sua origem, embora possam influenciar o quanto ela aparece.",
        },
      ],
    },
    {
      id: "infantil",
      title: "Gagueira na infância",
      blocks: [
        {
          type: "p",
          text: "A gagueira costuma começar entre os 2 e os 5 anos, fase de grande desenvolvimento da linguagem. Muitas crianças passam por um período de disfluência nessa idade, e boa parte delas deixa de gaguejar com o tempo.",
        },
        {
          type: "p",
          text: "Não é possível saber de antemão quais crianças vão superar a gagueira sozinhas. Por isso, a avaliação fonoaudiológica precoce é importante: ela ajuda a família a entender o que está acontecendo e a decidir o melhor caminho.",
        },
      ],
    },
    {
      id: "para-pais",
      title: "Para pais e responsáveis",
      blocks: [
        { type: "p", text: "Algumas atitudes simples ajudam muito no dia a dia:" },
        {
          type: "list",
          items: [
            { text: "Dê tempo para a criança terminar de falar, sem completar as palavras por ela." },
            { text: "Mantenha o contato visual e mostre que você está interessado no que ela diz, e não no jeito como diz." },
            { text: "Evite pedir que ela “fale devagar”, “respire” ou “comece de novo”. Mesmo com boa intenção, isso aumenta a pressão." },
            { text: "Fale você mesmo de forma calma e sem pressa: o seu ritmo é um modelo." },
            { text: "Reserve momentos tranquilos de conversa, sem telas e sem interrupções." },
          ],
        },
        { type: "p", text: "Vale procurar um fonoaudiólogo quando:" },
        {
          type: "list",
          items: [
            { text: "as disfluências duram mais de seis meses;" },
            { text: "aparecem tensão no rosto, piscadas ou movimentos associados à fala;" },
            { text: "a criança demonstra incômodo, frustração ou evita falar;" },
            { text: "há casos de gagueira na família." },
          ],
        },
      ],
    },
    {
      id: "teoria",
      title: "A teoria da fluência na UFPB",
      blocks: [
        {
          type: "p",
          text: "O FLUA estuda e ensina uma abordagem de fluência própria da UFPB, diferente das abordagens usadas em outras universidades do Brasil. Esse é um dos diferenciais do projeto na formação de novos fonoaudiólogos.",
        },
        { type: "pending", text: "Texto da Dra. Débora Vasconcelos Correia sobre a teoria de fluência (a receber)." },
      ],
    },
  ] satisfies Chapter[],
};
