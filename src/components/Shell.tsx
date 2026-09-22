"use client";

import { useState, type ReactNode } from "react";
import { Facade } from "./facade/Facade";
import { Hallway, type Topic } from "./facade/Hallway";
import { Room } from "./site/Room";

type View =
  | { kind: "facade" }
  | { kind: "hallway" }
  | { kind: "room"; id: string };

/**
 * Navegação do portfólio: fachada → corredor → sala do assunto.
 *
 * O conteúdo de todas as salas também é renderizado num bloco escondido. Ele
 * serve a quem não executa JavaScript — que nunca sairia da fachada — e deixa
 * o texto no HTML para os buscadores, que não vão clicar em porta nenhuma.
 */
export function Shell({
  topics,
  rooms,
}: {
  topics: Topic[];
  rooms: Record<string, ReactNode>;
}) {
  const [view, setView] = useState<View>({ kind: "facade" });

  const current =
    view.kind === "room" ? topics.find((t) => t.id === view.id) : undefined;

  return (
    <>
      {view.kind === "facade" && (
        <Facade onEnter={() => setView({ kind: "hallway" })} />
      )}

      {view.kind === "hallway" && (
        <Hallway
          topics={topics}
          onOpen={(id) => setView({ kind: "room", id })}
          onBack={() => setView({ kind: "facade" })}
        />
      )}

      {view.kind === "room" && current && (
        <Room label={current.label} onBack={() => setView({ kind: "hallway" })}>
          {rooms[current.id]}
        </Room>
      )}

      <div data-fallback className="mx-auto w-full max-w-3xl">
        {topics.map((topic) => (
          <div key={topic.id}>{rooms[topic.id]}</div>
        ))}
      </div>
    </>
  );
}
