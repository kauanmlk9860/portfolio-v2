"use client";

import { useRef, type ReactNode } from "react";

/**
 * Inclina o cartão em perspectiva e acende um halo sob o ponteiro.
 *
 * O 3D aqui é CSS de propósito: um Canvas por cartão significaria vários
 * contextos WebGL na mesma página, e o custo não se paga para um hover.
 */
export function TiltCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef(0);

  const handleMove = (event: React.PointerEvent<HTMLDivElement>) => {
    // Ponteiro grosso (toque) não tem hover: inclinar ali só atrapalha.
    if (event.pointerType !== "mouse") return;
    const element = ref.current;
    if (!element) return;
    const rect = element.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;

    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      element.style.transform = `perspective(1100px) rotateX(${(0.5 - py) * 8}deg) rotateY(${(px - 0.5) * 8}deg) scale(1.015)`;
      element.style.setProperty("--spot-x", `${px * 100}%`);
      element.style.setProperty("--spot-y", `${py * 100}%`);
      element.style.setProperty("--spot-opacity", "1");
    });
  };

  const reset = () => {
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      const element = ref.current;
      if (!element) return;
      element.style.transform = "";
      element.style.setProperty("--spot-opacity", "0");
    });
  };

  return (
    <div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      className={`spotlight relative transition-transform duration-300 ease-out will-change-transform motion-reduce:transform-none! ${className}`}
    >
      {children}
    </div>
  );
}
