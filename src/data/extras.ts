/**
 * Conteúdo das seções extras.
 *
 * `press` nasce vazio de propósito: menção de imprensa é credencial, e
 * inventar uma seria mentir no currículo. Quando sair a primeira, é só
 * adicionar aqui que a seção passa a listá-la.
 */
export type PressEntry = {
  title: string;
  source: string;
  href: string;
  year: string;
};

export const press: PressEntry[] = [];

/** Onde ele de fato publica o que produz. */
export const channels = [
  {
    label: "GitHub",
    handle: "@kauanmlk9860",
    href: "https://github.com/kauanmlk9860",
    note: "código dos projetos, aberto",
  },
  {
    label: "LinkedIn",
    handle: "in/kauan-rodrigues",
    href: "https://www.linkedin.com/in/kauan-rodrigues-1bba3a31b/",
    note: "trajetória e atualizações",
  },
];

export type Credential = {
  title: string;
  issuer: string;
  period: string;
  status: "Concluído" | "Em andamento";
};

export const credentials: Credential[] = [
  {
    title: "Técnico em Desenvolvimento de Sistemas",
    issuer: "SENAI Jandira",
    period: "Concluído",
    status: "Concluído",
  },
  {
    title: "Sistemas de Informação",
    issuer: "Uninove Memorial",
    period: "2º semestre",
    status: "Em andamento",
  },
];

export type FaqEntry = { question: string; answer: string };

export const faq: FaqEntry[] = [
  {
    question: "Você está disponível para trabalhar?",
    answer:
      "Sim. Hoje sou estagiário no suporte técnico e comercial da Inova Tecnologia, e estou aberto a oportunidades como desenvolvedor — estágio ou júnior.",
  },
  {
    question: "Onde você está?",
    answer:
      "Osasco, São Paulo. Trabalho presencial na região e remoto sem problema.",
  },
  {
    question: "Com que tecnologias você trabalha?",
    answer:
      "No front-end, React, React Native e Tailwind. No back-end, Node.js com Express, Prisma e MySQL. Escrevo em JavaScript e TypeScript, e já entreguei projetos em Python, Kotlin e C#.",
  },
  {
    question: "Você ainda está estudando?",
    answer:
      "Estou no 2º semestre de Sistemas de Informação na Uninove Memorial. Antes disso me formei técnico em Desenvolvimento de Sistemas pelo SENAI Jandira.",
  },
  {
    question: "Qual projeto você mostraria primeiro?",
    answer:
      "O Racha, um app para organizar jogos de basquete de bairro — tem front em React Native e API própria em Node. Se o interesse for back-end, o LionsBook e a API de cadastro de clientes, essa última com testes em Jest e Supertest.",
  },
  {
    question: "Como falo com você?",
    answer:
      "E-mail e LinkedIn são os canais mais rápidos. Os links estão no topo e no fim desta página.",
  },
];
