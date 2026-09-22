import { Shell } from "@/components/Shell";
import { About } from "@/components/site/About";
import { Contact } from "@/components/site/Contact";
import { Content } from "@/components/site/Content";
import { Credentials } from "@/components/site/Credentials";
import { Experience } from "@/components/site/Experience";
import { Faq } from "@/components/site/Faq";
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
        <Content />
        <Experience />
        <Skills />
        <Credentials />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </Shell>
  );
}
