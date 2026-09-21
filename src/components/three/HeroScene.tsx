"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer } from "@react-three/drei";
import { Chip } from "./Chip";

export default function HeroScene() {
  const wrapper = useRef<HTMLDivElement>(null);
  const scroll = useRef(0);
  const pointer = useRef({ x: 0, y: 0 });
  const [reducedMotion, setReducedMotion] = useState(false);
  // Renderizar fora da tela só gasta GPU e bateria à toa.
  const [active, setActive] = useState(true);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      scroll.current = window.scrollY / Math.max(1, window.innerHeight);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onPointerMove = (event: PointerEvent) => {
      pointer.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: (event.clientY / window.innerHeight) * 2 - 1,
      };
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, []);

  useEffect(() => {
    const element = wrapper.current;
    if (!element || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={wrapper} className="h-full w-full">
      <Canvas
        camera={{ position: [0, 2.35, 4.1], fov: 38 }}
        dpr={[1, 2]}
        frameloop={active ? "always" : "never"}
        gl={{ antialias: true }}
        // O R3F aponta a câmera para -Z; sem este lookAt o chip aparece de
        // perfil, fora do enquadramento.
        onCreated={({ camera }) => camera.lookAt(0, 0, 0)}
        // Sem WebGL o Canvas troca pelo conteúdo abaixo em vez de quebrar.
        fallback={
          <div className="flex h-full items-center justify-center">
            <p className="text-sm text-muted">
              Seu navegador não suporta WebGL.
            </p>
          </div>
        }
      >
        <ambientLight intensity={0.6} />
        <spotLight
          position={[4, 6, 3]}
          angle={0.4}
          penumbra={1}
          intensity={40}
          color="#d8b4fe"
        />
        <pointLight position={[-4, -1, -3]} intensity={25} color="#a855f7" />

        <Chip
          scrollRef={scroll}
          pointerRef={pointer}
          reducedMotion={reducedMotion}
        />

        <ContactShadows
          position={[0, -1.1, 0]}
          opacity={0.55}
          scale={11}
          blur={2.6}
          far={3.5}
          color="#000000"
        />

        {/*
          Lightformers em vez de um preset: o preset baixaria um HDR de CDN,
          o que adicionaria dependência de rede a um site estático.
        */}
        <Environment resolution={256}>
          <Lightformer
            form="rect"
            intensity={3}
            position={[0, 4, -3]}
            scale={[10, 4, 1]}
            color="#c084fc"
          />
          <Lightformer
            form="rect"
            intensity={4}
            position={[0, 6, 1]}
            rotation-x={Math.PI / 2}
            scale={[9, 9, 1]}
            color="#ffffff"
          />
          <Lightformer
            form="rect"
            intensity={2}
            position={[-5, 1, 1]}
            rotation-y={Math.PI / 2}
            scale={[8, 4, 1]}
            color="#f4f2f8"
          />
          <Lightformer
            form="circle"
            intensity={2.5}
            position={[4, 2, 2]}
            scale={4}
            color="#a855f7"
          />
        </Environment>
      </Canvas>
    </div>
  );
}
