import { experience } from "@/data/profile";
import { Reveal } from "../Reveal";
import { PaperSection } from "./PaperSection";

export function Experience() {
  return (
    <PaperSection id="trajetoria" label="Trajetória" note="onde passei">
      <ol className="space-y-8">
        {experience.map((item, index) => (
          <Reveal as="li" key={item.title} delay={80 * index}>
            <p className="hand text-lg text-accent">{item.period}</p>
            <h3 className="title mt-1 text-2xl">{item.title}</h3>
            <p className="text-sm text-ink-soft">{item.place}</p>
            <p className="mt-2 max-w-xl leading-relaxed text-ink-soft">
              {item.description}
            </p>
          </Reveal>
        ))}
      </ol>
    </PaperSection>
  );
}
