/**
 * Geometria do corredor, num módulo só.
 *
 * O corredor e os objetos que o povoam precisam concordar sobre onde ficam as
 * paredes e o piso; com as medidas duplicadas, um quadro acaba flutuando fora
 * da parede quando só um dos lados é ajustado.
 */
export const PERSPECTIVE = 900;
export const WIDTH = 980; // vão entre as paredes
export const HEIGHT = 800; // pé-direito
export const LENGTH = 6400; // até onde o corredor vai
export const BEHIND = 500; // quanto das paredes fica atrás da câmera

export const DOOR_W = 340;
export const DOOR_H = 700;
export const FIRST_DOOR = 900;
export const SPACING = 1000; // entre portas do mesmo lado
export const STAND_OFF = 520; // onde a câmera para ao encarar uma porta

export const PLANE_LENGTH = LENGTH + BEHIND;
export const PLANE_CENTER = (BEHIND - LENGTH) / 2;

/** Profundidade de cada porta: alternam entre esquerda e direita. */
export function doorDepth(index: number) {
  return FIRST_DOOR + Math.floor(index / 2) * SPACING + (index % 2) * (SPACING / 2);
}

/**
 * Prende um objeto a uma das paredes, virado para o miolo do corredor.
 *
 * À direita o `rotateY` negativo deixa o conteúdo espelhado; o `scaleX(-1)`
 * desfaz isso.
 */
export function onWall(side: "left" | "right", depth: number, y = 0) {
  const left = side === "left";
  const x = left ? -WIDTH / 2 + 14 : WIDTH / 2 - 14;
  return `translate(-50%, -50%) translate3d(${x}px, ${y}px, ${-depth}px) rotateY(${
    left ? 90 : -90
  }deg)${left ? "" : " scaleX(-1)"}`;
}

/** Prende um objeto ao piso, de frente para a câmera. */
export function onFloor(x: number, depth: number, height: number) {
  return `translate(-50%, -50%) translate3d(${x}px, ${HEIGHT / 2 - height / 2}px, ${-depth}px)`;
}

/** Pendura um objeto no teto. */
export function onCeiling(depth: number, drop: number) {
  return `translate(-50%, -50%) translate3d(0px, ${-HEIGHT / 2 + drop / 2}px, ${-depth}px)`;
}
