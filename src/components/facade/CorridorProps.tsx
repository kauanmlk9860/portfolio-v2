import { HEIGHT, LENGTH, PLANE_CENTER, WIDTH, onCeiling, onFloor, onWall } from "./corridor";

const INK = "var(--ink)";
const SOFT = "var(--ink-soft)";
const RULE = "var(--rule)";
const PAPER = "var(--paper)";

const line = { stroke: INK, strokeWidth: 3, fill: "none" } as const;
const thin = { stroke: SOFT, strokeWidth: 2.4, fill: "none" } as const;

/** Desenhos dos quadros: os assuntos dele, em traço. */
const artworks = {
  cesta: (
    <g {...line} strokeLinecap="round">
      <rect x={42} y={30} width={116} height={78} rx={2} fill={PAPER} />
      <rect x={72} y={56} width={54} height={40} {...thin} />
      <ellipse cx={100} cy={116} rx={30} ry={8} fill={PAPER} />
      <path d="M 74 120 L 82 150 M 92 122 L 96 152 M 112 122 L 108 152 M 126 120 L 118 150" {...thin} />
      <path d="M 82 150 L 96 152 L 108 152 L 118 150" {...thin} />
    </g>
  ),
  disco: (
    <g {...line} strokeLinecap="round">
      <circle cx={100} cy={96} r={58} fill={PAPER} />
      <circle cx={100} cy={96} r={22} {...thin} />
      <circle cx={100} cy={96} r={6} fill={INK} />
      <circle cx={100} cy={96} r={40} {...thin} />
    </g>
  ),
  codigo: (
    <g {...line} strokeLinecap="round">
      <path d="M 66 62 L 36 96 L 66 130" />
      <path d="M 134 62 L 164 96 L 134 130" />
      <path d="M 114 52 L 86 140" {...thin} />
    </g>
  ),
  coracao: (
    <g strokeLinecap="round">
      <path
        d="M 100 142 C 20 84 56 34 100 74 C 144 34 180 84 100 142 Z"
        stroke={INK}
        strokeWidth={3}
        fill={PAPER}
      />
      <path d="M 78 74 C 66 80 64 94 70 104" {...thin} />
    </g>
  ),
  cidade: (
    <g {...line} strokeLinecap="round">
      <path d="M 26 142 L 26 92 L 58 92 L 58 142" fill={PAPER} />
      <path d="M 58 142 L 58 60 L 96 60 L 96 142" fill={PAPER} />
      <path d="M 96 142 L 96 104 L 128 104 L 128 142" fill={PAPER} />
      <path d="M 128 142 L 128 74 L 168 74 L 168 142" fill={PAPER} />
      <path d="M 36 106 L 48 106 M 68 76 L 86 76 M 68 98 L 86 98 M 138 90 L 158 90" {...thin} />
      <path d="M 14 142 L 182 142" />
    </g>
  ),
} as const;

export type ArtKey = keyof typeof artworks;

/** Quadro pendurado na parede. */
export function WallFrame({
  side,
  depth,
  art,
  caption,
}: {
  side: "left" | "right";
  depth: number;
  art: ArtKey;
  caption: string;
}) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute top-1/2 left-1/2"
      style={{ width: 280, height: 260, transform: onWall(side, depth, -70) }}
    >
      <svg viewBox="0 0 200 186" className="size-full">
        <rect x={6} y={6} width={188} height={174} fill={PAPER} stroke={INK} strokeWidth={5} />
        <rect x={18} y={18} width={164} height={150} fill="none" stroke={RULE} strokeWidth={2.4} />
        {artworks[art]}
        <text
          x={100}
          y={174}
          textAnchor="middle"
          fill={SOFT}
          fontSize={13}
          fontFamily="var(--font-caveat), cursive"
          fontWeight={700}
        >
          {caption}
        </text>
      </svg>
    </div>
  );
}

/** Arandela de parede. */
export function Sconce({ side, depth }: { side: "left" | "right"; depth: number }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute top-1/2 left-1/2"
      style={{ width: 90, height: 120, transform: onWall(side, depth, -180) }}
    >
      <svg viewBox="0 0 90 120" className="size-full">
        <path d="M 45 10 L 45 40" stroke={INK} strokeWidth={3} fill="none" />
        <path d="M 20 40 L 70 40 L 60 84 L 30 84 Z" fill={PAPER} stroke={INK} strokeWidth={3} />
        <ellipse cx={45} cy={92} rx={26} ry={9} fill="#fff8d8" opacity={0.85} />
      </svg>
    </div>
  );
}

/** Luminária pendurada no teto. */
export function CeilingLamp({ depth }: { depth: number }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute top-1/2 left-1/2"
      style={{ width: 200, height: 260, transform: onCeiling(depth, 260) }}
    >
      <svg viewBox="0 0 200 260" className="size-full">
        <path d="M 100 0 L 100 92" stroke={INK} strokeWidth={3} fill="none" />
        <path d="M 52 92 L 148 92 L 126 150 L 74 150 Z" fill={PAPER} stroke={INK} strokeWidth={4} />
        <ellipse cx={100} cy={160} rx={34} ry={13} fill="#fff8d8" />
        <ellipse cx={100} cy={196} rx={70} ry={26} fill="#fff8d8" opacity={0.45} />
      </svg>
    </div>
  );
}

/** Passadeira no meio do corredor, indo até o fundo. */
export function FloorRunner() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute top-1/2 left-1/2"
      style={{
        width: WIDTH * 0.46,
        height: LENGTH + 300,
        transform: `translate(-50%, -50%) translate3d(0px, ${HEIGHT / 2 - 1}px, ${PLANE_CENTER}px) rotateX(90deg)`,
        border: `3px solid ${SOFT}`,
        background: `repeating-linear-gradient(0deg, transparent 0 62px, ${RULE} 62px 64px)`,
      }}
    />
  );
}

/** Banco encostado na parede, assentado no piso. */
export function Bench({ side, depth }: { side: "left" | "right"; depth: number }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute top-1/2 left-1/2"
      style={{ width: 260, height: 190, transform: onWall(side, depth, HEIGHT / 2 - 95) }}
    >
      <svg viewBox="0 0 260 190" className="size-full">
        <path d="M 14 62 L 246 58 L 248 82 L 16 86 Z" fill={PAPER} stroke={INK} strokeWidth={3.5} />
        <path d="M 36 86 L 40 182 M 222 82 L 226 178" stroke={INK} strokeWidth={3.5} fill="none" />
        <path d="M 30 120 L 230 116" stroke={RULE} strokeWidth={2.4} fill="none" />
      </svg>
    </div>
  );
}

/** Bola de basquete no canto do corredor. */
export function CorridorBall({ x, depth }: { x: number; depth: number }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute top-1/2 left-1/2"
      style={{ width: 150, height: 150, transform: onFloor(x, depth, 150) }}
    >
      <svg viewBox="0 0 150 150" className="size-full">
        <circle cx={75} cy={75} r={62} fill={PAPER} stroke={INK} strokeWidth={3.5} />
        <path d="M 13 75 L 137 75 M 75 13 L 75 137" {...thin} />
        <path d="M 31 31 C 62 56 62 94 31 119" {...thin} />
        <path d="M 119 31 C 88 56 88 94 119 119" {...thin} />
        <ellipse cx={75} cy={140} rx={56} ry={10} fill={INK} opacity={0.09} />
      </svg>
    </div>
  );
}

/** Vaso de planta no chão. */
export function CorridorPlant({ x, depth }: { x: number; depth: number }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute top-1/2 left-1/2"
      style={{ width: 200, height: 280, transform: onFloor(x, depth, 280) }}
    >
      <svg viewBox="0 0 200 280" className="size-full">
        <path d="M 64 190 L 136 190 L 124 272 L 76 272 Z" fill={PAPER} stroke={INK} strokeWidth={3.5} />
        <path d="M 68 212 L 132 212" stroke={RULE} strokeWidth={2.4} fill="none" />
        <path d="M 100 190 L 100 96" {...thin} />
        <path d="M 100 150 C 52 138 42 74 84 66 C 102 62 100 108 100 130" {...thin} />
        <path d="M 100 128 C 148 116 158 52 116 44 C 98 40 100 86 100 108" {...thin} />
        <ellipse cx={100} cy={276} rx={54} ry={9} fill={INK} opacity={0.09} />
      </svg>
    </div>
  );
}
