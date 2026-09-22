"use client";

import { useEffect, useRef, useState } from "react";
import { TopicDoor } from "./TopicDoor";

export type Topic = {
  id: string;
  label: string;
  badge: string;
  color: string;
};

/*
 * Geometria do corredor, em pixels do espaço 3D.
 *
 * Cada porta carrega a própria posição em Z, em vez de ser filha do plano da
 * parede: dentro de uma parede já rotacionada, o eixo local vira profundidade
 * e a conta deixa de ser óbvia — foi onde a primeira versão errou. Assim
 * `depth` é literalmente a distância até a boca do corredor, e o tamanho na
 * tela é PERSPECTIVE / (PERSPECTIVE + depth − câmera).
 */
const PERSPECTIVE = 900;
const WIDTH = 980; // vão entre as paredes
const HEIGHT = 800; // pé-direito
const LENGTH = 6400; // até onde o corredor vai
const BEHIND = 500; // quanto das paredes fica atrás da câmera
const DOOR_W = 340;
const DOOR_H = 700;
const FIRST_DOOR = 900;
const SPACING = 1000; // entre portas do mesmo lado
const STAND_OFF = 520; // onde a câmera para ao encarar uma porta

const PLANE_LENGTH = LENGTH + BEHIND;
const PLANE_CENTER = (BEHIND - LENGTH) / 2;

/** Profundidade de cada porta: alternam entre esquerda e direita. */
function doorDepth(index: number) {
  return FIRST_DOOR + Math.floor(index / 2) * SPACING + (index % 2) * (SPACING / 2);
}

/**
 * Corredor em primeira pessoa: rolar o mouse anda para a frente.
 *
 * A perspectiva é CSS 3D, não WebGL — piso, teto e as duas paredes montados
 * com `preserve-3d`, e a câmera avança deslocando a cena em Z. O corredor fica
 * em DOM, então as portas continuam sendo botões de verdade, acessíveis por
 * teclado, o que um canvas não entrega de graça.
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
  const [progress, setProgress] = useState(0);
  const scene = useRef<HTMLDivElement>(null);
  const target = useRef(0);
  const current = useRef(0);
  const maxDepth = doorDepth(topics.length - 1) - STAND_OFF + 420;

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  // Laço de câmera: a posição persegue o alvo, o que dá o deslize em vez de
  // saltos a cada entalhe da roda do mouse.
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;

    const tick = () => {
      const delta = target.current - current.current;
      current.current += reduced ? delta : delta * 0.085;
      if (scene.current) {
        scene.current.style.transform = `translateZ(${current.current}px)`;
      }
      setProgress(Math.min(1, Math.max(0, current.current / maxDepth)));
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [maxDepth]);

  const advance = (amount: number) => {
    target.current = Math.min(maxDepth, Math.max(0, target.current + amount));
  };

  const goTo = (depth: number) => {
    target.current = Math.min(maxDepth, Math.max(0, depth - STAND_OFF));
  };

  const lastTouch = useRef<number | null>(null);

  const open = (id: string) => {
    if (openingId) return;
    setOpeningId(id);
    window.setTimeout(() => onOpen(id), 1200);
  };

  return (
    <div
      className="fixed inset-0 z-40 overflow-hidden bg-paper"
      onWheel={(event) => advance(event.deltaY * 1.2)}
      onTouchStart={(event) => {
        lastTouch.current = event.touches[0].clientY;
      }}
      onTouchMove={(event) => {
        if (lastTouch.current === null) return;
        const y = event.touches[0].clientY;
        advance((lastTouch.current - y) * 3.4);
        lastTouch.current = y;
      }}
      onTouchEnd={() => {
        lastTouch.current = null;
      }}
      onKeyDown={(event) => {
        if (event.key === "ArrowDown" || event.key === "PageDown") advance(520);
        if (event.key === "ArrowUp" || event.key === "PageUp") advance(-520);
      }}
      tabIndex={-1}
      style={{ perspective: `${PERSPECTIVE}px`, perspectiveOrigin: "50% 47%" }}
    >
      <div
        ref={scene}
        className="absolute inset-0"
        style={{
          transformStyle: "preserve-3d",
          opacity: openingId ? 0 : 1,
          transition: "opacity 500ms ease-in 600ms",
          // Este div cobre a viewport no plano da câmera, à frente de toda a
          // cena: sem isto, ele captura os cliques e nenhuma porta abre.
          pointerEvents: "none",
        }}
      >
        <Plane
          width={WIDTH}
          height={PLANE_LENGTH}
          transform={`translate3d(0px, ${HEIGHT / 2}px, ${PLANE_CENTER}px) rotateX(90deg)`}
          className="hall-floor"
        />
        <Plane
          width={WIDTH}
          height={PLANE_LENGTH}
          transform={`translate3d(0px, ${-HEIGHT / 2}px, ${PLANE_CENTER}px) rotateX(-90deg)`}
          className="hall-ceiling"
        />
        <Plane
          width={PLANE_LENGTH}
          height={HEIGHT}
          transform={`translate3d(${-WIDTH / 2}px, 0px, ${PLANE_CENTER}px) rotateY(90deg)`}
          className="hall-wall"
        />
        <Plane
          width={PLANE_LENGTH}
          height={HEIGHT}
          transform={`translate3d(${WIDTH / 2}px, 0px, ${PLANE_CENTER}px) rotateY(-90deg)`}
          className="hall-wall"
        />

        {topics.map((topic, index) => {
          const left = index % 2 === 0;
          const depth = doorDepth(index);
          return (
            <button
              key={topic.id}
              type="button"
              onClick={() => open(topic.id)}
              onFocus={() => goTo(depth)}
              className="pointer-events-auto absolute top-1/2 left-1/2 cursor-pointer focus-visible:outline-4 focus-visible:outline-offset-8 focus-visible:outline-accent"
              style={{
                width: DOOR_W,
                height: DOOR_H,
                // Fica um pouco à frente da parede, assenta no piso e gira
                // para encarar o miolo do corredor. Coplanar com a parede, o
                // navegador resolvia o clique a favor do plano e a porta não
                // abria. À direita, o rotateY negativo deixa o texto
                // espelhado, e o scaleX(-1) desfaz isso.
                transform: `translate(-50%, -50%) translate3d(${
                  left ? -WIDTH / 2 + 14 : WIDTH / 2 - 14
                }px, ${HEIGHT / 2 - DOOR_H / 2}px, ${-depth}px) rotateY(${
                  left ? 90 : -90
                }deg)${left ? "" : " scaleX(-1)"}`,
              }}
            >
              <span className="sr-only">Abrir {topic.label}</span>
              <TopicDoor
                label={topic.label}
                badge={topic.badge}
                color={topic.color}
                opening={openingId === topic.id}
              />
            </button>
          );
        })}

        {/* Luz no fim do corredor */}
        <div
          aria-hidden
          className="absolute top-1/2 left-1/2 rounded-full"
          style={{
            width: WIDTH * 1.2,
            height: HEIGHT * 1.2,
            transform: `translate(-50%, -50%) translate3d(0px, 0px, ${-LENGTH + 60}px)`,
            background:
              "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,255,255,0.88) 44%, rgba(255,255,255,0) 72%)",
          }}
        />
      </div>

      <header
        className="pointer-events-none absolute inset-x-0 top-0 z-10 px-6 pt-8 text-center"
        style={{ opacity: openingId ? 0 : 1, transition: "opacity 300ms ease" }}
      >
        <p className="hand text-3xl text-ink">escolha uma porta</p>
        <p className="mt-1 text-xs text-ink-soft">
          role o mouse para andar pelo corredor
        </p>
      </header>

      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 z-10 h-1 bg-rule/40"
        style={{ opacity: openingId ? 0 : 1, transition: "opacity 300ms ease" }}
      >
        <div
          className="h-full origin-left bg-accent"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>

      <button
        type="button"
        onClick={onBack}
        className="hand absolute bottom-6 left-5 z-20 rounded-full border border-ink bg-paper px-4 py-2 text-lg shadow-[3px_3px_0_var(--ink)] transition-transform hover:-translate-y-0.5"
        style={{ opacity: openingId ? 0 : 1, transition: "opacity 300ms ease" }}
      >
        ← sair
      </button>
    </div>
  );
}

/** Plano do corredor, já centrado e posicionado em 3D. */
function Plane({
  width,
  height,
  transform,
  className,
}: {
  width: number;
  height: number;
  transform: string;
  className: string;
}) {
  return (
    <div
      className={`pointer-events-none absolute top-1/2 left-1/2 ${className}`}
      style={{
        width,
        height,
        transform: `translate(-50%, -50%) ${transform}`,
      }}
    />
  );
}
