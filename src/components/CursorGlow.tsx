"use client";

import { useEffect, useRef } from "react";

/**
 * Halo que segue o ponteiro. Só aparece em ponteiro fino — num toque não há
 * cursor para seguir, e a mancha ficaria parada no meio da tela.
 */
export function CursorGlow() {
  const glow = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const element = glow.current;
    if (!element) return;
    element.style.opacity = "1";

    let frame = 0;
    const move = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        element.style.transform = `translate3d(${event.clientX - 250}px, ${event.clientY - 250}px, 0)`;
      });
    };

    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      aria-hidden
      ref={glow}
      style={{ opacity: 0 }}
      className="pointer-events-none fixed top-0 left-0 z-0 size-[500px] rounded-full bg-accent/8 blur-[100px] transition-opacity duration-700"
    />
  );
}
