import { credentials } from "@/data/extras";
import { Reveal } from "../Reveal";
import { PaperSection } from "./PaperSection";

/** Formação e certificados, com o estado de cada um. */
export function Credentials() {
  return (
    <PaperSection id="certificados" label="Certificados" note="o que está no papel">
      <ul className="divide-y divide-rule border-y border-rule">
        {credentials.map((item, index) => (
          <Reveal
            as="li"
            key={item.title}
            delay={70 * index}
            className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-5"
          >
            <div>
              <h3 className="title text-xl">{item.title}</h3>
              <p className="text-sm text-ink-soft">{item.issuer}</p>
            </div>
            <span
              className={`hand text-lg ${
                item.status === "Concluído" ? "text-accent" : "text-ink-soft"
              }`}
            >
              {item.period}
            </span>
          </Reveal>
        ))}
      </ul>
    </PaperSection>
  );
}
