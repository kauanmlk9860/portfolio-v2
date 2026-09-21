import { profile } from "@/data/profile";
import { CTALink } from "./CTALink";
import { Section } from "./Section";

export function Contact() {
  return (
    <Section
      id="contato"
      title="Vamos conversar"
      subtitle="Tem um projeto em mente, uma vaga ou quer trocar uma ideia sobre código?"
    >
      <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
        <CTALink href={`mailto:${profile.email}`}>Enviar e-mail</CTALink>
        <CTALink href={profile.linkedin} external>
          LinkedIn
        </CTALink>
        <CTALink href={profile.github} external>
          GitHub
        </CTALink>
      </div>

      <p className="mt-8 text-center text-sm break-all text-muted">
        {profile.email}
      </p>
    </Section>
  );
}
