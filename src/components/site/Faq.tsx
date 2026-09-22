import { faq } from "@/data/extras";
import { Reveal } from "../Reveal";
import { PaperSection } from "./PaperSection";

/**
 * Perguntas frequentes em <details>: abrir e fechar é comportamento nativo do
 * navegador, então funciona com teclado, com leitor de tela e sem JavaScript.
 */
export function Faq() {
  return (
    <PaperSection id="faq" label="Perguntas frequentes" note="o que sempre perguntam">
      <div className="divide-y divide-rule border-y border-rule">
        {faq.map((item, index) => (
          <Reveal key={item.question} delay={50 * index}>
            <details className="faq group py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-medium">
                {item.question}
                <span className="hand shrink-0 text-2xl text-accent transition-transform duration-300 group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 max-w-xl leading-relaxed text-ink-soft">
                {item.answer}
              </p>
            </details>
          </Reveal>
        ))}
      </div>
    </PaperSection>
  );
}
