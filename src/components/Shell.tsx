"use client";

import { useState, type ReactNode } from "react";
import { Facade } from "./facade/Facade";

/**
 * Decide entre a fachada e o site.
 *
 * O conteúdo só entra no DOM depois da entrada: renderizado atrás da fachada,
 * o IntersectionObserver já teria revelado tudo que está na primeira dobra, e
 * as animações de scroll chegariam gastas. O CSS em [data-site] cuida disso, e
 * o <noscript> do layout devolve o site a quem não executa JavaScript.
 */
export function Shell({ children }: { children: ReactNode }) {
  const [entered, setEntered] = useState(false);

  return (
    <>
      {!entered && <Facade onEnter={() => setEntered(true)} />}

      <div data-site data-entered={String(entered)}>
        {children}
      </div>

      {entered && (
        <button
          type="button"
          onClick={() => setEntered(false)}
          className="hand fixed right-5 bottom-5 z-40 rounded-full border border-ink bg-paper px-4 py-2 text-lg shadow-[3px_3px_0_var(--ink)] transition-transform hover:-translate-y-0.5"
        >
          voltar à fachada
        </button>
      )}
    </>
  );
}
