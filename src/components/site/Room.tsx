"use client";

import { useEffect, useState, type ReactNode } from "react";
import { RoomShell } from "../rooms/RoomShell";
import { roomProps, type RoomKey } from "../rooms/props";

/**
 * Sala de um assunto.
 *
 * O cenário fica fixo ao fundo e a folha de conteúdo rola por cima: entrar
 * mostra primeiro o ambiente, e só depois o texto sobe sobre ele. A sala entra
 * com uma leve aproximação, como quem acabou de atravessar o vão.
 */
export function Room({
  id,
  label,
  tint,
  children,
  onBack,
}: {
  id: string;
  label: string;
  tint: string;
  children: ReactNode;
  onBack: () => void;
}) {
  const [settled, setSettled] = useState(false);
  const Props = roomProps[id as RoomKey];

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setSettled(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  // A sala rola por conta própria; o corpo continua travado atrás dela.
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  return (
    <div className="fixed inset-0 z-40 overflow-y-auto bg-paper">
      {/* Cenário: fixo, para o conteúdo passar por cima dele ao rolar */}
      <div
        className="pointer-events-none fixed inset-0"
        style={{
          transform: settled ? "scale(1)" : "scale(1.16)",
          opacity: settled ? 1 : 0,
          transition:
            "transform 800ms cubic-bezier(0.22, 1, 0.36, 1), opacity 500ms ease-out",
        }}
      >
        <RoomShell tint={tint}>{Props ? <Props /> : null}</RoomShell>
      </div>

      <div
        className="relative"
        style={{
          transform: settled ? "translateY(0)" : "translateY(28px)",
          opacity: settled ? 1 : 0,
          transition:
            "transform 800ms cubic-bezier(0.22, 1, 0.36, 1) 120ms, opacity 600ms ease-out 120ms",
        }}
      >
        {/* Placa da sala, pendurada como a da fachada */}
        <div className="flex justify-center pt-8">
          <svg viewBox="0 0 420 110" className="h-24 w-auto" aria-hidden>
            <path
              d="M 120 8 L 126 34 M 300 8 L 294 34"
              stroke="var(--ink)"
              strokeWidth={2}
              fill="none"
            />
            <path
              d="M 40 34 L 382 30 L 386 96 L 44 100 Z"
              fill="var(--paper)"
              stroke="var(--ink)"
              strokeWidth={2.6}
            />
            <text
              x={212}
              y={78}
              textAnchor="middle"
              fill="var(--ink)"
              fontSize={38}
              fontFamily="var(--font-caveat), cursive"
              fontWeight={700}
            >
              {label}
            </text>
          </svg>
        </div>

        <p className="hand mt-[26vh] text-center text-xl text-ink-soft">
          role para ler ↓
        </p>

        <div className="mx-auto w-full max-w-2xl px-4 pt-10 pb-28 sm:px-6">
          <article className="inked bg-paper px-2 py-2 shadow-[6px_6px_0_var(--rule)] sm:px-4">
            {children}
          </article>
        </div>
      </div>

      <button
        type="button"
        onClick={onBack}
        className="hand fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-full border border-ink bg-paper px-5 py-2 text-lg shadow-[3px_3px_0_var(--ink)] transition-transform hover:-translate-y-0.5"
      >
        ← voltar ao corredor
      </button>
    </div>
  );
}
