import { wobble } from "./wobble";

/**
 * Árvore: tronco fechado que afina para cima, galhos que terminam dentro da
 * copa e a copa como um contorno de bolhas. Sem marcas internas — arcos soltos
 * dentro da copa leem como rosto, não como folhagem.
 */
export function Tree() {
  return (
    <g stroke="var(--ink-soft)" strokeLinecap="round" fill="none">
      {/* Tronco: duas margens que se aproximam, com a raiz alargando na base */}
      <path
        d="M 174 700 C 180 626 186 520 190 388
           L 210 388 C 214 520 216 626 222 700"
        strokeWidth={2.4}
      />
      <path d="M 174 700 C 162 694 154 690 144 688" strokeWidth={2.2} />
      <path d="M 222 700 C 234 694 242 690 252 688" strokeWidth={2.2} />

      {/* Galhos, terminando dentro da copa */}
      <path d="M 188 520 C 162 500 140 470 126 440" strokeWidth={2.2} />
      <path d="M 210 486 C 236 466 258 436 272 406" strokeWidth={2.2} />
      <path d="M 190 566 C 168 556 150 542 136 522" strokeWidth={2} />
      <path d="M 126 440 L 110 416 M 126 440 L 108 452" strokeWidth={1.8} />
      <path d="M 272 406 L 292 384 M 272 406 L 290 420" strokeWidth={1.8} />

      {/* Copa: bolhas encadeadas num contorno fechado */}
      <path
        d="M 72 344
           A 46 46 0 0 1 108 276
           A 50 50 0 0 1 168 242
           A 54 54 0 0 1 240 248
           A 50 50 0 0 1 296 288
           A 46 46 0 0 1 320 352
           A 44 44 0 0 1 262 396
           A 50 50 0 0 1 190 404
           A 48 48 0 0 1 122 392
           A 44 44 0 0 1 72 344 Z"
        strokeWidth={2.4}
      />
    </g>
  );
}

/** Janela à direita, com caixilho em cruz. */
export function Window() {
  return (
    <g stroke="var(--ink)" strokeWidth={2.4} strokeLinecap="round" fill="none">
      <rect x={1004} y={360} width={212} height={172} rx={3} />
      <rect x={1018} y={374} width={184} height={144} rx={2} strokeWidth={1.8} />
      <path d="M 1110 374 L 1110 518" strokeWidth={1.8} />
      <path d="M 1018 446 L 1202 446" strokeWidth={1.8} />
      <path
        d="M 1032 430 L 1076 388 M 1050 434 L 1090 394"
        stroke="var(--rule)"
        strokeWidth={1.6}
      />
    </g>
  );
}

/** Floreira sob a janela: plantinhas de duas folhas e um patinho de borracha. */
export function Planter() {
  const plants = [];
  for (let i = 0; i < 6; i++) {
    const x = 1026 + i * 30 + wobble(i + 40, 2.5);
    const h = 28 + wobble(i + 70, 5);
    const leaf = (dir: number, at: number, size: number) =>
      `M ${x} ${624 - at} Q ${x + dir * size} ${624 - at - size * 0.5} ${x + dir * size * 0.5} ${624 - at - size}
       Q ${x + dir * size * 0.1} ${624 - at - size * 0.5} ${x} ${624 - at}`;
    plants.push(
      <g key={i}>
        <path d={`M ${x} 624 L ${x} ${624 - h}`} />
        <path d={leaf(-1, h * 0.45, 14)} />
        <path d={leaf(1, h * 0.75, 12)} />
      </g>,
    );
  }

  return (
    <g stroke="var(--ink)" strokeWidth={2} strokeLinecap="round" fill="none">
      <g stroke="var(--ink-soft)" strokeWidth={1.8}>
        {plants}
      </g>
      <path d="M 1000 624 L 1220 624 L 1206 678 L 1014 678 Z" />
      <path d="M 1006 642 L 1214 642" strokeWidth={1.4} stroke="var(--rule)" />
      {/* Patinho: corpo, cabeça, bico */}
      <g stroke="var(--ink)" strokeWidth={1.8}>
        <path d="M 1130 618 C 1120 618 1114 610 1120 602 C 1128 594 1146 594 1152 602 C 1158 610 1150 618 1130 618 Z" />
        <path d="M 1146 602 C 1140 590 1146 580 1156 580 C 1166 580 1170 590 1164 598" />
        <path d="M 1164 586 L 1176 588 L 1164 592" />
        <circle cx={1156} cy={586} r={1.5} fill="var(--ink)" />
      </g>
    </g>
  );
}

/**
 * Caminho de pedras saindo da porta. As fiadas se sobrepõem de propósito: um
 * leque de pedras separadas lê como cascalho espalhado, não como caminho.
 */
export function StonePath() {
  const stones = [];
  let seed = 90;

  for (let row = 0; row < 4; row++) {
    const y = 714 + row * 34;
    const spread = 56 + row * 20;
    const count = 3 + Math.floor(row / 2);
    for (let i = 0; i < count; i++) {
      const t = count === 1 ? 0.5 : i / (count - 1);
      const x = 720 - spread + t * spread * 2 + wobble(seed++, 5);
      const rx = 30 + wobble(seed++, 4);
      const ry = 14 + wobble(seed++, 2);
      stones.push(
        <path
          key={`${row}-${i}`}
          d={`M ${x - rx} ${y} Q ${x - rx * 0.6} ${y - ry} ${x} ${y - ry * 0.9}
              Q ${x + rx * 0.7} ${y - ry} ${x + rx} ${y}
              Q ${x + rx * 0.6} ${y + ry} ${x} ${y + ry * 0.9}
              Q ${x - rx * 0.7} ${y + ry} ${x - rx} ${y} Z`}
        />,
      );
    }
  }

  return (
    <g stroke="var(--ink-soft)" strokeWidth={1.8} fill="none" strokeLinecap="round">
      {stones}
    </g>
  );
}
