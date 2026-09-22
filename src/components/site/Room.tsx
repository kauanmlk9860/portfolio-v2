"use client";

import { useEffect, useState, type ReactNode } from "react";

/**
 * Sala de um assunto: o conteúdo pregado na parede, depois de atravessar a
 * porta. Entra com uma leve aproximação, como quem acaba de passar pelo vão.
 */
export function Room({
  label,
  children,
  onBack,
}: {
  label: string;
  children: ReactNode;
  onBack: () => void;
}) {
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    const id = window.requestAnimationFrame(() => setSettled(true));
    return () => window.cancelAnimationFrame(id);
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
      <div
        style={{
          transform: settled ? "scale(1)" : "scale(1.14)",
          opacity: settled ? 1 : 0,
          transition:
            "transform 700ms cubic-bezier(0.22, 1, 0.36, 1), opacity 500ms ease-out",
        }}
      >
        <div className="mx-auto w-full max-w-3xl px-4 pt-10 pb-24 sm:px-6">
          {/* Placa da sala, pendurada como a da fachada */}
          <div className="flex justify-center">
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

          <article className="inked mt-6 bg-paper px-2 py-2 shadow-[6px_6px_0_var(--rule)] sm:px-4">
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
