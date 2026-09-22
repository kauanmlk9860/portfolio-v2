import { Shell } from "@/components/Shell";
import type { Topic } from "@/components/facade/Hallway";
import { About } from "@/components/site/About";
import { Contact } from "@/components/site/Contact";
import { Content } from "@/components/site/Content";
import { Credentials } from "@/components/site/Credentials";
import { Experience } from "@/components/site/Experience";
import { Faq } from "@/components/site/Faq";
import { Masthead } from "@/components/site/Masthead";
import { Projects } from "@/components/site/Projects";
import { Skills } from "@/components/site/Skills";

/** Uma porta por assunto, na ordem em que aparecem no corredor. */
const topics: Topic[] = [
  { id: "sobre", label: "Sobre mim", badge: "quem", color: "#7c3aed" },
  { id: "projetos", label: "Projetos", badge: "obra", color: "#0f766e" },
  { id: "trajetoria", label: "Trajetória", badge: "rota", color: "#b45309" },
  { id: "habilidades", label: "Habilidades", badge: "stack", color: "#1d4ed8" },
  { id: "certificados", label: "Certificados", badge: "papel", color: "#9d174d" },
  { id: "conteudo", label: "Conteúdo", badge: "links", color: "#4d7c0f" },
  { id: "faq", label: "Perguntas", badge: "faq", color: "#a21caf" },
  { id: "contato", label: "Contato", badge: "oi", color: "#c2410c" },
];

export default function Home() {
  const rooms = {
    sobre: (
      <>
        <Masthead />
        <About />
      </>
    ),
    projetos: <Projects />,
    trajetoria: <Experience />,
    habilidades: <Skills />,
    certificados: <Credentials />,
    conteudo: <Content />,
    faq: <Faq />,
    contato: <Contact />,
  };

  return <Shell topics={topics} rooms={rooms} />;
}
