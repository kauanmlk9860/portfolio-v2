import { Reveal } from "../Reveal";

/**
 * Seção do caderno: rótulo em caixa alta ladeado por um fio, como divisória
 * de página. É a mesma marcação que a referência repete em toda a página.
 */
export function PaperSection({
  id,
  label,
  note,
  children,
}: {
  id?: string;
  label: string;
  note?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mx-auto w-full max-w-3xl px-6 py-16 sm:py-20">
      <Reveal className="flex items-baseline gap-4">
        <h2 className="text-xs font-bold tracking-[0.2em] text-ink uppercase">
          {label}
        </h2>
        <span className="h-px flex-1 bg-rule" />
        {note && <span className="hand text-xl text-ink-soft">{note}</span>}
      </Reveal>
      <div className="mt-8">{children}</div>
    </section>
  );
}
