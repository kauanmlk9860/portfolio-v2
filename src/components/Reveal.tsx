"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

/**
 * Revela o conteúdo quando ele entra na viewport.
 *
 * O threshold é 0 de propósito: com uma fração exigida, um bloco alto parado
 * no rodapé da tela nunca a alcança e fica preso invisível até o visitante
 * rolar. O <noscript> no layout cobre quem não executa JS.
 */
export function Reveal({
  children,
  as: Tag = "div",
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  as?: ElementType;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (typeof IntersectionObserver === "undefined") {
      element.dataset.reveal = "shown";
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          element.dataset.reveal = "shown";
          observer.disconnect();
        }
      },
      { threshold: 0, rootMargin: "0px 0px -60px 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  // Com `as` dinâmico o TS tenta unir as props de todo elemento possível e
  // chega em `never`. Fixar aqui as props que de fato passamos resolve isso
  // sem abrir mão da checagem na chamada.
  const Component = Tag as React.ComponentType<{
    ref?: React.Ref<HTMLElement>;
    "data-reveal"?: string;
    style?: React.CSSProperties;
    className?: string;
    children?: ReactNode;
  }>;

  return (
    <Component
      ref={ref}
      data-reveal="hidden"
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={className}
    >
      {children}
    </Component>
  );
}
