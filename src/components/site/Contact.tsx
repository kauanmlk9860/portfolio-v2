import { profile } from "@/data/profile";
import { Reveal } from "../Reveal";
import { PaperSection } from "./PaperSection";

export function Contact() {
  return (
    <PaperSection id="contato" label="Contato" note="bora conversar">
      <Reveal>
        <p className="text-lg leading-relaxed text-ink-soft">
          Tem um projeto em mente, uma vaga ou só quer trocar uma ideia sobre
          código? O e-mail e o LinkedIn são os canais mais rápidos.
        </p>
      </Reveal>

      <Reveal delay={120} className="mt-8">
        <a
          href={`mailto:${profile.email}`}
          className="title pen-underline text-3xl break-all sm:text-4xl"
        >
          {profile.email}
        </a>
      </Reveal>
    </PaperSection>
  );
}
