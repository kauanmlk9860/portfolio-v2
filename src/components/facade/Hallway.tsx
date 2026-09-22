"use client";

import { useEffect, useRef, useState } from "react";
import { BrickWall } from "./BrickWall";
import { TopicDoor } from "./TopicDoor";

export type Topic = {
  id: string;
  label: string;
  badge: string;
  color: string;
};

/**
 * Corredor: uma porta por assunto.
 *
 * A faixa rola na horizontal com overflow nativo, e não com arraste próprio —
 * assim funciona de imediato com trackpad, toque, barra de rolagem e teclado,
 * sem reimplementar nenhum desses.
 */
export function Hallway({
  topics,
  onOpen,
  onBack,
}: {
  topics: Topic[];
  onOpen: (id: string) => void;
  onBack: () => void;
}) {
  const [openingId, setOpeningId] = useState<string | null>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  const open = (id: string) => {
    if (openingId) return;
    setOpeningId(id);
    window.setTimeout(() => onOpen(id), 1250);
  };

  return (
    <div className="fixed inset-0 z-40 overflow-hidden bg-paper">
      <div
        className="size-full"
        style={{
          // Ao abrir, a cena avança para dentro do vão.
          transform: openingId ? "scale(2.6)" : "scale(1)",
          opacity: openingId ? 0 : 1,
          transition:
            "transform 1200ms cubic-bezier(0.6, 0, 0.3, 1), opacity 500ms ease-in 700ms",
        }}
      >
        {/* Parede ao fundo */}
        <svg
          className="absolute inset-0 size-full"
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden
        >
          <defs>
            <filter id="hall-rough" x="-5%" y="-5%" width="110%" height="110%">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.014"
                numOctaves={3}
                seed={11}
                result="noise"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="noise"
                scale={4}
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>
          </defs>
          <rect width={1440} height={900} fill="var(--paper)" />
          <g filter="url(#hall-rough)">
            <BrickWall width={1440} height={760} />
            <path
              d="M -10 762 L 1450 758"
              stroke="var(--ink)"
              strokeWidth={2.6}
              fill="none"
            />
            {/* Rodapé do corredor */}
            <path
              d="M -10 738 L 1450 734"
              stroke="var(--rule)"
              strokeWidth={2}
              fill="none"
            />
          </g>
        </svg>

        <header className="pointer-events-none absolute inset-x-0 top-0 z-10 px-6 pt-8 text-center">
          <p className="hand text-3xl text-ink">escolha uma porta</p>
          <p className="mt-1 text-xs text-ink-soft">
            role para o lado para ver todas
          </p>
        </header>

        {/* Faixa de portas */}
        <div
          ref={track}
          className="absolute inset-x-0 bottom-[11%] z-10 flex snap-x gap-6 overflow-x-auto scroll-smooth px-8 pb-4 sm:gap-12 sm:px-16"
        >
          {topics.map((topic) => (
            <button
              key={topic.id}
              type="button"
              onClick={() => open(topic.id)}
              className="h-[52vh] max-h-[460px] min-h-[280px] shrink-0 snap-start cursor-pointer transition-transform duration-300 hover:-translate-y-1.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              <span className="sr-only">Abrir {topic.label}</span>
              <TopicDoor
                label={topic.label}
                badge={topic.badge}
                color={topic.color}
                opening={openingId === topic.id}
              />
            </button>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={onBack}
        className="hand absolute bottom-5 left-5 z-20 rounded-full border border-ink bg-paper px-4 py-2 text-lg shadow-[3px_3px_0_var(--ink)] transition-transform hover:-translate-y-0.5"
        style={{ opacity: openingId ? 0 : 1, transition: "opacity 300ms ease" }}
      >
        ← sair
      </button>
    </div>
  );
}
