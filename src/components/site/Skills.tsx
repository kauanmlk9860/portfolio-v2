import { skills } from "@/data/profile";
import { Reveal } from "../Reveal";
import { PaperSection } from "./PaperSection";

export function Skills() {
  return (
    <PaperSection id="habilidades" label="Habilidades" note="a caixa de ferramentas">
      <div className="space-y-7">
        {skills.map((group, index) => (
          <Reveal
            key={group.category}
            delay={80 * index}
            className="grid gap-2 sm:grid-cols-[10rem_1fr]"
          >
            <h3 className="hand text-xl text-ink-soft">{group.category}</h3>
            <p className="leading-relaxed">{group.items.join(" · ")}</p>
          </Reveal>
        ))}
      </div>
    </PaperSection>
  );
}
