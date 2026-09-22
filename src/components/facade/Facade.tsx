"use client";

import { useEffect, useState } from "react";
import { BrickWall } from "./BrickWall";
import { Door } from "./Door";
import { Planter, StonePath, Tree, Window } from "./Scenery";
import { Sign } from "./Sign";

const WALL_HEIGHT = 700;

/**
 * Tela de entrada: a fachada ilustrada. Clicar na porta abre as folhas,
 * aproxima o vão e entrega o site.
 *
 * O SVG nasce no HTML do servidor, então o <noscript> do layout esconde esta
 * camada — sem JavaScript ela ficaria travada por cima do conteúdo.
 */
export function Facade({ onEnter }: { onEnter: () => void }) {
  const [opening, setOpening] = useState(false);
  const [hovered, setHovered] = useState(false);

  // Enquanto a fachada está na frente, o site atrás não deve rolar.
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  const enter = () => {
    if (opening) return;
    setOpening(true);
    // As folhas levam 900ms; a aproximação começa antes e termina junto.
    window.setTimeout(onEnter, 1400);
  };

  return (
    <div
      data-facade
      className="fixed inset-0 z-50 overflow-hidden bg-paper"
      style={{
        opacity: opening ? 0 : 1,
        transition: "opacity 600ms ease-in 600ms",
      }}
    >
      <div
        className="size-full"
        style={{
          // Aproxima o vão da porta, que fica em 50% / 58% da cena.
          transformOrigin: "50% 58%",
          transform: opening ? "scale(5.5)" : "scale(1)",
          transition: "transform 1300ms cubic-bezier(0.6, 0, 0.3, 1)",
        }}
      >
        <svg
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
          className="size-full"
          aria-hidden
        >
          <defs>
            {/*
              Turbulência + deslocamento entortam as linhas vetoriais e é o
              que faz o traço parecer feito à mão. Fica só no cenário: aplicar
              nos adesivos e nos textos borraria as letras.
            */}
            <filter id="ink-rough" x="-5%" y="-5%" width="110%" height="110%">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.014"
                numOctaves={3}
                seed={7}
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

            <filter id="paper-grain">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.9"
                numOctaves={4}
                stitchTiles="stitch"
              />
              <feColorMatrix type="saturate" values="0" />
            </filter>
          </defs>

          <rect width={1440} height={900} fill="var(--paper)" />

          <g filter="url(#ink-rough)">
            <BrickWall width={1440} height={WALL_HEIGHT} />

            {/* Chão */}
            <path
              d="M -10 702 L 1450 698"
              stroke="var(--ink)"
              strokeWidth={2.4}
              fill="none"
            />

            <Tree />
            <Window />
            <Planter />
            <StonePath />
          </g>

          <g filter="url(#ink-rough)">
            <Sign />
          </g>

          {/* A porta fica fora do filtro para os adesivos saírem legíveis. */}
          <g
            style={{
              transformOrigin: "720px 520px",
              transform: hovered && !opening ? "scale(1.012)" : "scale(1)",
              transition: "transform 400ms cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          >
            <Door opening={opening} />
          </g>

          {/* Grão de papel por cima de tudo */}
          <rect
            width={1440}
            height={900}
            filter="url(#paper-grain)"
            opacity={0.12}
            style={{ mixBlendMode: "multiply" }}
          />
        </svg>
      </div>

      {/* Alvo real de clique e foco, sobre a porta. */}
      <button
        type="button"
        onClick={enter}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
        className="absolute left-1/2 h-[41%] w-[18%] max-w-[260px] -translate-x-1/2 cursor-pointer rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        style={{ top: "37%" }}
      >
        <span className="sr-only">Entrar no portfólio de Kauan Rodrigues</span>
      </button>

      {/* Bilhete de papel: sobre as pedras, o texto solto ficava ilegível. */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-8 flex justify-center px-6"
        style={{
          opacity: opening ? 0 : 1,
          transition: "opacity 300ms ease",
        }}
      >
        <div className="inked bg-paper px-7 py-3 text-center shadow-[4px_4px_0_var(--rule)]">
          <p className="hand text-2xl text-ink">
            {hovered ? "é só empurrar" : "clique na porta para entrar"}
          </p>
          <p className="mt-0.5 text-xs text-ink-soft">
            Kauan Rodrigues · Desenvolvedor Full Stack
          </p>
        </div>
      </div>
    </div>
  );
}
