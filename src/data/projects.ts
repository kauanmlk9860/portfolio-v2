export type Project = {
  name: string;
  description: string;
  stack: string[];
  github: string;
  demo?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    name: "Racha",
    description:
      "App para conectar jogadores de basquete de bairro: encontre quadras próximas e marque presença em jogos organizados por você ou por outros jogadores.",
    stack: ["TypeScript", "Node.js", "Express", "React Native", "Expo"],
    github: "https://github.com/kauanmlk9860/racha",
    demo: "https://racha-kappa.vercel.app",
    featured: true,
  },
  {
    name: "Nova — Bot de Vendas WhatsApp",
    description:
      "Assistente virtual para automação de orçamentos e atendimento comercial via WhatsApp, com respostas geradas por IA.",
    stack: ["Node.js", "Baileys", "Groq AI"],
    github: "https://github.com/kauanmlk9860/ChatBot-Whatsaap",
    featured: true,
  },
  {
    name: "DoeVida (TCC)",
    description:
      "Aplicação para conectar doadores de sangue a quem precisa, desenvolvida como Trabalho de Conclusão de Curso no SENAI Jandira.",
    stack: ["JavaScript", "HTML", "CSS"],
    github: "https://github.com/kauanmlk9860/front-tcc-doevida",
    featured: true,
  },
  {
    name: "LionsBook — Backend",
    description:
      "API REST para gerenciamento de biblioteca: cadastro de livros, usuários e empréstimos.",
    stack: ["Node.js", "Express", "Prisma", "MySQL"],
    github: "https://github.com/kauanmlk9860/BackEnd-LionsBook",
  },
  {
    name: "API de Assinatura de Documentos",
    description:
      "Serviço para assinatura digital de documentos Word, com substituição automática de placeholder e conversão para PDF.",
    stack: ["Node.js", "docx", "PDF"],
    github: "https://github.com/kauanmlk9860/projeto-yokogawa-api",
  },
  {
    name: "ClienteApp Mobile",
    description: "Aplicativo Android para cadastro e gestão de clientes.",
    stack: ["Kotlin", "Android Studio"],
    github: "https://github.com/kauanmlk9860/ClienteApp2k25_v2",
  },
  {
    name: "API de Cadastro de Clientes",
    description:
      "API CRUD de clientes com testes automatizados, usando Prisma como ORM e MySQL como banco de dados.",
    stack: ["Node.js", "Express", "Prisma", "MySQL", "Jest", "Supertest"],
    github: "https://github.com/kauanmlk9860/Jest2k25",
  },
];
