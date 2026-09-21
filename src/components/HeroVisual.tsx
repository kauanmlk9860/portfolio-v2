"use client";

import dynamic from "next/dynamic";

/*
 * O Canvas depende de WebGL, que não existe durante a renderização no
 * servidor. O ssr: false precisa morar num Client Component — em Server
 * Components o Next 16 rejeita a opção.
 */
const HeroScene = dynamic(() => import("./three/HeroScene"), {
  ssr: false,
  loading: () => <ChipPlaceholder />,
});

/** Mancha de luz que ocupa o espaço enquanto a cena carrega. */
function ChipPlaceholder() {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="size-48 animate-pulse rounded-3xl bg-accent/10 blur-2xl" />
    </div>
  );
}

export function HeroVisual() {
  return (
    <div className="h-[46vh] min-h-[320px] w-full sm:h-[54vh]">
      <HeroScene />
    </div>
  );
}
