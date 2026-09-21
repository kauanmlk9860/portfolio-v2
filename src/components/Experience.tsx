import { experience } from "@/data/profile";
import { Section } from "./Section";

export function Experience() {
  return (
    <Section
      id="experiencia"
      title="Experiência"
      subtitle="Onde estudei, onde trabalho e o que construí no caminho."
    >
      <div className="mx-auto mt-14 grid max-w-5xl gap-4 lg:grid-cols-3">
        {experience.map((item) => (
          <article
            key={item.title}
            className="flex flex-col rounded-3xl border border-border bg-card px-8 py-10 text-center"
          >
            <p className="text-sm text-accent">{item.period}</p>
            <h3 className="headline mt-3 text-xl">{item.title}</h3>
            <p className="mt-1 text-sm text-muted">{item.place}</p>
            <p className="mt-5 text-base leading-relaxed text-muted">
              {item.description}
            </p>
          </article>
        ))}
      </div>
    </Section>
  );
}
