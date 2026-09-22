import { profile, quickFacts, stats } from "@/data/profile";
import { Counter } from "../Counter";
import { Reveal } from "../Reveal";
import { PaperSection } from "./PaperSection";

export function About() {
  return (
    <PaperSection id="sobre" label="Sobre mim" note="um resumo">
      <div className="space-y-5 text-lg leading-relaxed">
        {profile.bio.map((paragraph, index) => (
          <Reveal key={paragraph} delay={90 * index}>
            <p className={index === 0 ? "text-ink" : "text-ink-soft"}>
              {paragraph}
            </p>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-10">
        <dl className="inked grid gap-5 p-6 sm:grid-cols-2">
          {quickFacts.map((fact) => (
            <div key={fact.label}>
              <dt className="hand text-lg text-ink-soft">{fact.label}</dt>
              <dd className="mt-0.5 font-medium">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </Reveal>

      <dl className="mt-10 grid gap-8 sm:grid-cols-3">
        {stats.map((stat, index) => (
          <Reveal key={stat.label} delay={90 * index}>
            <dd className="title text-5xl text-accent">
              <Counter value={stat.value} />
            </dd>
            <dt className="mt-1 text-sm text-ink-soft">{stat.label}</dt>
          </Reveal>
        ))}
      </dl>
    </PaperSection>
  );
}
