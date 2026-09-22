import { channels, press } from "@/data/extras";
import { Reveal } from "../Reveal";
import { PaperSection } from "./PaperSection";
import { ExternalLinkIcon } from "../icons";

/**
 * Equivalente ao "The Studio (Content)" da referência: onde o trabalho
 * aparece. Enquanto não houver publicação sobre os projetos, a seção mostra
 * os canais onde ele mesmo publica — que é o que existe de verdade.
 */
export function Content() {
  return (
    <PaperSection id="conteudo" label="Conteúdo" note="onde eu publico">
      {press.length > 0 && (
        <ul className="mb-10 divide-y divide-rule border-y border-rule">
          {press.map((item, index) => (
            <Reveal as="li" key={item.href} delay={60 * index} className="py-5">
              <a
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="pen-underline title text-xl"
              >
                {item.title}
              </a>
              <p className="mt-1 text-sm text-ink-soft">
                {item.source} · {item.year}
              </p>
            </Reveal>
          ))}
        </ul>
      )}

      <ul className="grid gap-4 sm:grid-cols-2">
        {channels.map((channel, index) => (
          <Reveal
            as="li"
            key={channel.label}
            delay={80 * index}
            className="inked-soft p-5"
          >
            <a
              href={channel.href}
              target="_blank"
              rel="noreferrer"
              className="pen-underline inline-flex items-center gap-2 font-medium"
            >
              {channel.label}
              <ExternalLinkIcon className="size-3.5" />
            </a>
            <p className="mt-1 text-sm text-ink-soft">{channel.handle}</p>
            <p className="hand mt-2 text-lg text-ink-soft">{channel.note}</p>
          </Reveal>
        ))}
      </ul>
    </PaperSection>
  );
}
