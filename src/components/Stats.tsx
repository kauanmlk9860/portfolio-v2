import { stats } from "@/data/profile";
import { Counter } from "./Counter";
import { Reveal } from "./Reveal";

/** Faixa de números que contam do zero quando entram na tela. */
export function Stats() {
  return (
    <section className="border-y border-border px-6 py-20">
      <dl className="mx-auto grid max-w-4xl gap-12 text-center sm:grid-cols-3">
        {stats.map((stat, index) => (
          <Reveal key={stat.label} delay={100 * index}>
            <dd className="headline text-5xl text-accent sm:text-6xl">
              <Counter value={stat.value} />
            </dd>
            <dt className="mt-3 text-sm text-muted">{stat.label}</dt>
          </Reveal>
        ))}
      </dl>
    </section>
  );
}
