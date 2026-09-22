import { Shell } from "@/components/Shell";
import { About } from "@/components/site/About";
import { Contact } from "@/components/site/Contact";
import { Experience } from "@/components/site/Experience";
import { Footer } from "@/components/site/Footer";
import { Masthead } from "@/components/site/Masthead";
import { Projects } from "@/components/site/Projects";
import { Skills } from "@/components/site/Skills";

export default function Home() {
  return (
    <Shell>
      <Masthead />
      <main>
        <About />
        <Projects />
        <Experience />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </Shell>
  );
}
