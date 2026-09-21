"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer } from "@react-three/drei";
import { Chip, type DragState } from "./Chip";


/**
 * Afasta a câmera quando a tela é estreita.
 *
 * O FOV do three é vertical: num celular em pé, a mesma distância mostra bem
 * menos largura de mundo e o chip sai cortado pelos lados. A distância mínima
 * aqui é a que garante a largura da peça em quadro, e a altura e a mira
 * acompanham para o enquadramento não mudar de forma.
 */
function CameraRig() {
  const camera = useThree((state) => state.camera);
  const size = useThree((state) => state.size);

  useEffect(() => {
    const aspect = size.width / Math.max(1, size.height);
    const distance = Math.max(8.4, 6.5 / aspect);
    const ratio = distance / 8.4;
    camera.position.set(0, 4.4 * ratio, distance);
    camera.lookAt(0, 1.2 * ratio, 0);
    camera.updateProjectionMatrix();
  }, [camera, size.width, size.height]);

  return null;
}

export default function HeroScene({
  progressRef,
}: {
  progressRef: React.RefObject<number>;
}) {
  const wrapper = useRef<HTMLDivElement>(null);
  const scroll = useRef(0);
  const pointer = useRef({ x: 0, y: 0 });
  const drag = useRef<DragState>({ x: 0, y: 0, vx: 0, vy: 0, active: false });
  const last = useRef({ x: 0, y: 0 });
  const [reducedMotion, setReducedMotion] = useState(false);
  const [dragging, setDragging] = useState(false);
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

  const startDrag = (event: React.PointerEvent) => {
    drag.current.active = true;
    drag.current.vx = 0;
    drag.current.vy = 0;
    last.current = { x: event.clientX, y: event.clientY };
    setDragging(true);
    (event.target as Element).setPointerCapture?.(event.pointerId);
  };

  const moveDrag = (event: React.PointerEvent) => {
    if (!drag.current.active) return;
    const dx = (event.clientX - last.current.x) / 180;
    const dy = (event.clientY - last.current.y) / 260;
    last.current = { x: event.clientX, y: event.clientY };
    drag.current.x += dx;
    // A inclinação é limitada para o chip não capotar de cabeça para baixo.
    drag.current.y = Math.max(-0.5, Math.min(0.5, drag.current.y + dy));
    drag.current.vx = dx;
    drag.current.vy = dy;
  };

  const endDrag = () => {
    drag.current.active = false;
    setDragging(false);
  };

  return (
    <div
      ref={wrapper}
      onPointerDown={startDrag}
      onPointerMove={moveDrag}
      onPointerUp={endDrag}
      onPointerLeave={endDrag}
      onPointerCancel={endDrag}
      className={`h-full w-full touch-pan-y ${dragging ? "cursor-grabbing" : "cursor-grab"}`}
    >
      <Canvas
        // O FOV vertical é fixo, então o canvas ocupando a viewport inteira
        // renderiza o chip mais que o dobro do tamanho de antes: a distância
        // da câmera acompanha essa proporção.
        camera={{ position: [0, 4.4, 8.4], fov: 38 }}
        dpr={[1, 2]}
        frameloop={active ? "always" : "never"}
        gl={{ antialias: true }}
        fallback={
          <div className="flex h-full items-center justify-center">
            <p className="text-sm text-muted">
              Seu navegador não suporta WebGL.
            </p>
          </div>
        }
      >
        <CameraRig />
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
          progressRef={progressRef}
          pointerRef={pointer}
          dragRef={drag}
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
