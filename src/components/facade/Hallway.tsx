"use client";

import { useEffect, useRef, useState } from "react";
import {
  Bench,
  CeilingLamp,
  CorridorBall,
  CorridorPlant,
  FloorRunner,
  Sconce,
  WallFrame,
} from "./CorridorProps";
import { TopicDoor } from "./TopicDoor";
import {
  DOOR_H,
  DOOR_W,
  HEIGHT,
  LENGTH,
  PERSPECTIVE,
  PLANE_CENTER,
  PLANE_LENGTH,
  STAND_OFF,
  WIDTH,
  doorDepth,
} from "./corridor";

export type Topic = {
  id: string;
  label: string;
  badge: string;
  color: string;
};

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
    window.setTimeout(() => onOpen(id), 1500);
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
          transition: "opacity 520ms ease-in 900ms",
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

        <FloorRunner />

        {/* Mobília entre as portas: sem ela o corredor é só parede e chão. */}
        {[
          { side: "left" as const, depth: 1400, art: "cesta" as const, caption: "quadra de bairro" },
          { side: "right" as const, depth: 900, art: "codigo" as const, caption: "onde tudo começa" },
          { side: "left" as const, depth: 2400, art: "disco" as const, caption: "trilha sonora" },
          { side: "right" as const, depth: 1900, art: "coracao" as const, caption: "o que move" },
          { side: "left" as const, depth: 3400, art: "cidade" as const, caption: "Osasco, SP" },
          { side: "right" as const, depth: 2900, art: "cesta" as const, caption: "jogo de domingo" },
          { side: "left" as const, depth: 4400, art: "codigo" as const, caption: "dia a dia" },
          { side: "right" as const, depth: 3900, art: "disco" as const, caption: "no repeat" },
        ].map((frame) => (
          <WallFrame key={`${frame.side}-${frame.depth}`} {...frame} />
        ))}

        {[700, 1700, 2700, 3700, 4700].map((depth) => (
          <CeilingLamp key={depth} depth={depth} />
        ))}

        {[
          { side: "left" as const, depth: 1900 },
          { side: "right" as const, depth: 2400 },
          { side: "left" as const, depth: 3900 },
        ].map((s) => (
          <Sconce key={`${s.side}-${s.depth}`} {...s} />
        ))}

        <Bench side="right" depth={3400} />
        <CorridorBall x={-310} depth={1250} />
        <CorridorPlant x={330} depth={2150} />
        <CorridorPlant x={-340} depth={3250} />

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
                // A folha da porta gira em rotateY; sem preserve-3d aqui, o
                // navegador achata esse giro e a porta abre "de papel".
                transformStyle: "preserve-3d",
                // Fica um pouco à frente da parede, assenta no piso e gira
                // para encarar o miolo do corredor. Coplanar com a parede, o
                // navegador resolvia o clique a favor do plano e a porta não
                // abria. O desespelhamento da parede direita é feito dentro da
                // porta, não aqui: aqui ele brigaria com o preserve-3d.
                transform: `translate(-50%, -50%) translate3d(${
                  left ? -WIDTH / 2 + 14 : WIDTH / 2 - 14
                }px, ${HEIGHT / 2 - DOOR_H / 2}px, ${-depth}px) rotateY(${
                  left ? 90 : -90
                }deg)`,
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
