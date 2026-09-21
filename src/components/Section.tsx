import { Reveal } from "./Reveal";

/**
 * Bloco de seção padrão: título e subtítulo centralizados, com muito respiro
 * em volta. A Apple repete essa mesma estrutura em cada produto da home.
 */
export function Section({
  id,
  title,
  subtitle,
  children,
  className = "",
}: {
  id?: string;
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`px-6 py-24 sm:py-32 ${className}`}>
      <Reveal className="mx-auto max-w-3xl text-center">
        <h2 className="headline text-4xl sm:text-5xl">{title}</h2>
        {subtitle && (
          <p className="subhead mx-auto mt-4 max-w-2xl text-xl sm:text-2xl">
            {subtitle}
          </p>
        )}
      </Reveal>
      {children}
    </section>
  );
}
