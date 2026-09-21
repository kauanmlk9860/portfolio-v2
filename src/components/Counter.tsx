"use client";

import { useEffect, useRef, useState } from "react";

/** Separa "45+" em número e sufixo para não perder o "+" durante a contagem. */
function parse(value: string) {
  const match = value.match(/^(\d+)(.*)$/);
  return match
    ? { target: Number(match[1]), suffix: match[2], numeric: true }
    : { target: 0, suffix: "", numeric: false };
}

/**
 * Conta de zero até o valor quando entra na tela.
 *
 * As dependências do efeito são só primitivos de propósito: passar o array do
 * match reinicia o efeito a cada render — e como cada quadro chama setState,
 * o efeito se cancelaria sozinho e a contagem nunca sairia do lugar.
 */
export function Counter({
  value,
  duration = 1400,
}: {
  value: string;
  duration?: number;
}) {
  const { target, suffix, numeric } = parse(value);
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element || !numeric) return;

    let frame = 0;
    let start = 0;

    const step = (now: number) => {
      if (!start) start = now;
      const t = Math.min(1, (now - start) / duration);
      // easeOutExpo: acelera na largada e assenta no fim.
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      setDisplay(Math.round(target * eased));
      if (t < 1) frame = requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        observer.disconnect();
        // Quem pediu menos movimento recebe o número final, sem contagem.
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          setDisplay(target);
          return;
        }
        frame = requestAnimationFrame(step);
      },
      { threshold: 0 },
    );

    observer.observe(element);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [target, duration, numeric]);

  return <span ref={ref}>{numeric ? `${display}${suffix}` : value}</span>;
}
