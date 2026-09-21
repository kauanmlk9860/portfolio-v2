import { skills } from "@/data/profile";
import { Section } from "./Section";

export function Skills() {
  return (
    <Section
      id="habilidades"
      title="Habilidades"
      subtitle="As tecnologias que uso entre projetos pessoais, o estágio e a faculdade."
    >
      <div className="mx-auto mt-14 grid max-w-5xl gap-4 sm:grid-cols-2">
        {skills.map((group) => (
          <div
            key={group.category}
            className="rounded-3xl border border-border bg-card px-8 py-10 text-center"
          >
            <h3 className="headline text-xl">{group.category}</h3>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-border px-3.5 py-1.5 text-sm text-muted"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
