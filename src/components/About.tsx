import { profile, quickFacts } from "@/data/profile";
import { Section } from "./Section";

export function About() {
  return (
    <Section id="sobre" title="Sobre mim" subtitle={profile.bio[0]}>
      <div className="mx-auto mt-12 max-w-2xl space-y-5 text-center text-lg leading-relaxed text-muted">
        {profile.bio.slice(1).map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      <dl className="mx-auto mt-14 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {quickFacts.map((fact) => (
          <div
            key={fact.label}
            className="rounded-3xl border border-border bg-card px-6 py-8 text-center"
          >
            <dt className="text-xs tracking-wide text-muted uppercase">
              {fact.label}
            </dt>
            <dd className="mt-3 text-base font-medium">{fact.value}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
