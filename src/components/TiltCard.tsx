"use client";

import { useRef, type ReactNode } from "react";

/**
 * Inclina o cartão em perspectiva conforme o ponteiro. É 3D por CSS, de
 * propósito: um Canvas por cartão significaria vários contextos WebGL na
 * mesma página, e o custo não se paga para um efeito de hover.
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

  const apply = (rotateX: number, rotateY: number) => {
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      const element = ref.current;
      if (!element) return;
      element.style.transform = `perspective(1100px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
  };

  const handleMove = (event: React.PointerEvent<HTMLDivElement>) => {
    // Ponteiro grosso (toque) não tem hover: inclinar ali só atrapalha.
    if (event.pointerType !== "mouse") return;
    const element = ref.current;
    if (!element) return;
    const rect = element.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    apply(-y * 7, x * 7);
  };

  const reset = () => apply(0, 0);

  return (
    <div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      className={`transition-transform duration-300 ease-out will-change-transform motion-reduce:transform-none! ${className}`}
    >
      {children}
    </div>
  );
}
