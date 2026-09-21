"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { profile } from "@/data/profile";
import { CTALink } from "./CTALink";

/*
 * O Canvas depende de WebGL, que não existe na renderização do servidor. O
 * ssr: false só é aceito dentro de um Client Component — por isso a cena
 * entra a partir daqui, e não da página.
 */
const HeroScene = dynamic(() => import("./three/HeroScene"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center">
      <div className="size-48 animate-pulse rounded-3xl bg-accent/10 blur-2xl" />
    </div>
  ),
});

/** Os três momentos da seção fixada, na ordem em que o scroll os revela. */
const stages = [
  {
    eyebrow: profile.role,
    title: profile.name,
    body: profile.tagline,
  },
  {
    eyebrow: "Front-end",
    title: "Interfaces que respondem",
    body: "React, React Native e Tailwind — telas que funcionam no navegador e no celular.",
  },
  {
    eyebrow: "Back-end",
    title: "A lógica por baixo",
    body: "Node.js, Express, Prisma e MySQL — APIs, banco de dados e testes automatizados.",
  },
];

export function HeroStage() {
  const track = useRef<HTMLElement>(null);
  const progress = useRef(0);
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const update = () => {
      const element = track.current;
      if (!element) return;
      const rect = element.getBoundingClientRect();
      // Quanto do trilho já passou pelo topo, de 0 a 1.
      const total = Math.max(1, rect.height - window.innerHeight);
      const value = Math.min(1, Math.max(0, -rect.top / total));
      progress.current = value;

      // O estado muda só na virada de etapa; a cena 3D lê a ref a cada
      // quadro, então não há re-render por pixel rolado.
      const next = value < 0.34 ? 0 : value < 0.67 ? 1 : 2;
      setStage((current) => (current === next ? current : next));
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <section id="top" ref={track} className="relative h-[240svh]">
      <div className="sticky top-0 h-svh overflow-hidden">
        <div className="absolute inset-0">
          <HeroScene progressRef={progress} />
        </div>

        {/*
          A cópia flutua sobre o canvas, então precisa ser transparente ao
          ponteiro — senão engoliria o arraste que gira o chip. Só os links
          voltam a receber eventos.
        */}
        <div className="pointer-events-none relative z-10 flex h-full flex-col items-center px-6 pt-16 text-center sm:pt-20">
          <div className="relative w-full max-w-3xl">
            {stages.map((item, index) => (
              <div
                key={item.eyebrow}
                aria-hidden={stage !== index}
                className={`transition-all duration-500 ease-out ${
                  index === 0 ? "" : "absolute inset-x-0 top-0"
                } ${
                  stage === index
                    ? "translate-y-0 opacity-100"
                    : "pointer-events-none translate-y-3 opacity-0"
                }`}
              >
                <p className="text-lg text-accent sm:text-xl">{item.eyebrow}</p>
                <h1 className="headline-xl mx-auto mt-3 text-5xl sm:text-7xl">
                  {item.title}
                </h1>
                <p className="subhead mx-auto mt-5 max-w-2xl text-xl sm:text-2xl">
                  {item.body}
                </p>
              </div>
            ))}
          </div>

          <div
            className={`mt-7 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 transition-opacity duration-500 ${
              stage === 0 ? "opacity-100" : "opacity-0"
            }`}
          >
            <span className="pointer-events-auto">
              <CTALink href="#sobre">Conhecer meu trabalho</CTALink>
            </span>
            <span className="pointer-events-auto">
              <CTALink href={profile.github} external>
                GitHub
              </CTALink>
            </span>
          </div>
        </div>

        <p className="pointer-events-none absolute inset-x-0 bottom-6 z-10 text-center text-xs text-muted">
          Arraste o chip para girar · role para desmontar
        </p>
      </div>
    </section>
  );
}
