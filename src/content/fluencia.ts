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
          text: "A fluência é a capacidade de falar de forma contínua, clara e com ritmo adequado. Ela depende da integração entre linguagem, cérebro, músculos da fala e pensamento.",
        },
        {
          type: "p",
          text: "Quando a fluência está alterada, podem surgir interrupções na fala, como acontece na gagueira e na taquifemia.",
        },
      ],
    },
    {
      id: "gagueira",
      title: "O que é gagueira",
      blocks: [
        {
          type: "p",
          text: "A gagueira é um transtorno da fluência caracterizado por interrupções involuntárias na fala. A pessoa não consegue controlar essas interrupções apenas pela vontade.",
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
          type: "p",
          text: "Sua causa é multifatorial, envolvendo fatores genéticos e diferenças no funcionamento do cérebro. A gagueira pode surgir na infância (gagueira do desenvolvimento) ou, mais raramente, após lesões neurológicas ou pelo uso de alguns medicamentos.",
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
      title: "A Teoria Integrada da Fluência",
      blocks: [
        {
          type: "p",
          text: "O trabalho do FLUA é fundamentado na Teoria Integrada da Fluência, abordagem estudada e ensinada na UFPB e um dos diferenciais do projeto na formação de novos fonoaudiólogos.",
        },
        { type: "pending", text: "Texto da Dra. Débora Vasconcelos Correia sobre a Teoria Integrada da Fluência (a receber)." },
      ],
    },
  ] satisfies Chapter[],
};
