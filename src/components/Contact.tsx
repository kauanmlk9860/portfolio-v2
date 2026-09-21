import { profile } from "@/data/profile";
import { CTALink } from "./CTALink";
import { Section } from "./Section";
import { Reveal } from "./Reveal";

export function Contact() {
  return (
    <Section
      id="contato"
      title="Vamos conversar"
      subtitle="Tem um projeto em mente, uma vaga ou quer trocar uma ideia sobre código?"
    >
      <Reveal className="mt-10 flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
        <CTALink href={`mailto:${profile.email}`}>Enviar e-mail</CTALink>
        <CTALink href={profile.linkedin} external>
          LinkedIn
        </CTALink>
        <CTALink href={profile.github} external>
          GitHub
        </CTALink>
      </Reveal>

      <p className="mt-8 text-center text-sm break-all text-muted">
        {profile.email}
      </p>
    </Section>
  );
}
