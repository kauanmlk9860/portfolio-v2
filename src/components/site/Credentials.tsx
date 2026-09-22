import { credentials } from "@/data/extras";
import { Reveal } from "../Reveal";
import { PaperSection } from "./PaperSection";

/** Formação e cursos, separados — um diploma e um curso de 4 h não pesam igual. */
export function Credentials() {
  const grupos = [
    { kind: "Formação" as const, note: "escola e faculdade" },
    { kind: "Curso" as const, note: "carga extra" },
  ];

  return (
    <PaperSection
      id="certificados"
      label="Certificados"
      note={`${credentials.length} no total`}
    >
      {grupos.map((grupo) => {
        const itens = credentials.filter((c) => c.kind === grupo.kind);
        if (itens.length === 0) return null;

        return (
          <div key={grupo.kind} className="mb-10 last:mb-0">
            <Reveal className="flex items-baseline gap-3">
              <h3 className="hand text-xl text-ink">{grupo.kind}</h3>
              <span className="h-px flex-1 bg-rule" />
              <span className="text-xs text-ink-soft">{grupo.note}</span>
            </Reveal>

            <ul className="mt-4 divide-y divide-rule border-y border-rule">
              {itens.map((item, index) => (
                <Reveal
                  as="li"
                  key={item.title}
                  delay={60 * index}
                  className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-4"
                >
                  <div className="min-w-0">
                    <h4 className="title text-lg sm:text-xl">{item.title}</h4>
                    <p className="text-sm text-ink-soft">{item.issuer}</p>
                  </div>
                  <span
                    className={`hand shrink-0 text-lg ${
                      item.status === "Em andamento"
                        ? "text-ink-soft"
                        : "text-accent"
                    }`}
                  >
                    {item.detail}
                  </span>
                </Reveal>
              ))}
            </ul>
          </div>
        );
      })}
    </PaperSection>
  );
}
