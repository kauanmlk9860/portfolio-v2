const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const profile = {
  name: "Kauan Rodrigues",
  role: "Desenvolvedor Full Stack",
  location: "Osasco, SP",
  avatar: `${basePath}/avatar.png`,
  tagline: "Transformo ideias em aplicações reais — do front-end ao back-end.",
  bio: [
    "Tenho 18 anos, sou de Osasco (SP) e foi no SENAI Jandira que tudo começou.",
    "Foi lá que desenvolvi minhas primeiras habilidades como programador e descobri minha paixão pela tecnologia — construí vários projetos com a mão na massa, incluindo o DoeVida, meu TCC.",
    "Hoje estou no 2º semestre de Sistemas de Informação na Uninove Memorial, sempre buscando aprimorar minhas habilidades, e trabalho como estagiário no suporte técnico e comercial da Inova Tecnologia.",
  ],
  email: "kauan.leonel.rodrigues@gmail.com",
  github: "https://github.com/kauanmlk9860",
  linkedin: "https://www.linkedin.com/in/kauan-rodrigues-1bba3a31b/",
  instagram: "https://www.instagram.com/2k.rodrigues/",
  available: true,
};

export const quickFacts = [
  { label: "Localização", value: "Osasco, SP" },
  { label: "Formação", value: "Sistemas de Informação — Uninove Memorial" },
  { label: "Atuação", value: "Suporte Técnico e Comercial — Inova Tecnologia" },
  { label: "Foco de estudo", value: "Desenvolvimento full stack" },
];

export const stats = [
  { value: "45+", label: "repositórios no GitHub" },
  { value: "4", label: "áreas de atuação" },
  { value: "18", label: "anos" },
];

export const experience = [
  {
    period: "Abril de 2026 — Atual",
    title: "Estágio em Suporte Técnico e Comercial",
    place: "Inova Tecnologia",
    description:
      "Atendimento técnico e comercial a clientes, suporte a sistemas e ponte entre o time de tecnologia e o dia a dia do negócio.",
    type: "work",
  },
  {
    period: "2º semestre",
    title: "Sistemas de Informação",
    place: "Uninove Memorial",
    description:
      "Graduação em andamento, com foco em desenvolvimento de software e fundamentos de engenharia de sistemas.",
    type: "education",
  },
  {
    period: "Concluído",
    title: "Técnico em Desenvolvimento de Sistemas",
    place: "SENAI Jandira",
    description:
      "Formação técnica com TCC próprio (DoeVida), passando por front-end, back-end e boas práticas de desenvolvimento.",
    type: "education",
  },
];

export const skills = [
  {
    category: "Linguagens",
    items: ["JavaScript", "TypeScript", "Python", "Kotlin", "C#", "HTML", "CSS"],
  },
  {
    category: "Front-end",
    items: ["React", "React Native", "Expo", "Tailwind CSS", "Bootstrap", "Figma"],
  },
  {
    category: "Back-end",
    items: ["Node.js", "Express", "Prisma", "MySQL"],
  },
  {
    category: "Ferramentas",
    items: ["Git", "GitHub", "Jest", "Postman", "Android Studio", "VS Code"],
  },
];
