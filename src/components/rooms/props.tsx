/**
 * Adereços de cada sala, construídos em torno do que o Kauan gosta:
 * basquete, música, amor e programação.
 *
 * Todos ficam nas faixas laterais — à esquerda depois da porta de entrada, e à
 * direita — porque o miolo da tela é ocupado pela folha de conteúdo.
 */

const ink = "var(--ink)";
const soft = "var(--ink-soft)";
const paper = "var(--paper)";

const line = { stroke: ink, strokeWidth: 2.2, fill: "none" } as const;
const thin = { stroke: soft, strokeWidth: 1.8, fill: "none" } as const;

/* ---------- peças reaproveitadas entre as salas ---------- */

/** Bola de basquete: círculo com as costuras características. */
function Basketball({ cx, cy, r }: { cx: number; cy: number; r: number }) {
  return (
    <g {...line}>
      <circle cx={cx} cy={cy} r={r} fill={paper} />
      <path d={`M ${cx - r} ${cy} L ${cx + r} ${cy}`} {...thin} />
      <path d={`M ${cx} ${cy - r} L ${cx} ${cy + r}`} {...thin} />
      <path
        d={`M ${cx - r * 0.72} ${cy - r * 0.72} C ${cx - r * 0.2} ${cy - r * 0.1}
            ${cx - r * 0.2} ${cy + r * 0.1} ${cx - r * 0.72} ${cy + r * 0.72}`}
        {...thin}
      />
      <path
        d={`M ${cx + r * 0.72} ${cy - r * 0.72} C ${cx + r * 0.2} ${cy - r * 0.1}
            ${cx + r * 0.2} ${cy + r * 0.1} ${cx + r * 0.72} ${cy + r * 0.72}`}
        {...thin}
      />
    </g>
  );
}

/** Coração desenhado a traço. */
function Heart({
  cx,
  cy,
  size,
  filled = false,
}: {
  cx: number;
  cy: number;
  size: number;
  filled?: boolean;
}) {
  const s = size;
  return (
    <path
      d={`M ${cx} ${cy + s * 0.7}
          C ${cx - s * 1.4} ${cy - s * 0.3} ${cx - s * 0.6} ${cy - s * 1.1} ${cx} ${cy - s * 0.3}
          C ${cx + s * 0.6} ${cy - s * 1.1} ${cx + s * 1.4} ${cy - s * 0.3} ${cx} ${cy + s * 0.7} Z`}
      stroke={ink}
      strokeWidth={1.8}
      fill={filled ? ink : paper}
    />
  );
}

/** Nota musical solta. */
function Note({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`} {...line}>
      <ellipse cx={0} cy={18} rx={9} ry={7} transform="rotate(-20 0 18)" fill={ink} />
      <path d="M 8 16 L 8 -18" />
      <path d="M 8 -18 C 20 -14 22 -4 16 2" />
    </g>
  );
}

/* ---------- salas ---------- */

/** Sobre mim — a sala pessoal: escrivaninha, fone, retrato e a bola no chão. */
export function DeskProps() {
  return (
    <g strokeLinecap="round">
      {/* Retrato com um coração no canto */}
      <g {...line}>
        <rect x={206} y={344} width={124} height={104} rx={2} fill={paper} />
        <rect x={220} y={358} width={96} height={76} rx={2} {...thin} />
        <circle cx={250} cy={386} r={9} {...thin} />
        <circle cx={286} cy={386} r={9} {...thin} />
        <path d="M 240 414 C 256 428 280 428 296 414" {...thin} />
      </g>
      <Heart cx={330} cy={344} size={13} filled />

      {/* Escrivaninha com notebook mostrando código */}
      <g {...line}>
        <path d="M 1092 560 L 1396 554 L 1398 576 L 1094 582 Z" fill={paper} />
        <path d="M 1112 582 L 1116 706 M 1372 578 L 1376 702" />
        <path d="M 1176 560 L 1188 500 L 1296 496 L 1292 558 Z" fill={paper} />
        <path d="M 1160 560 L 1312 556" />
      </g>
      <text
        x={1240}
        y={534}
        textAnchor="middle"
        fill={soft}
        fontSize={26}
        fontFamily="var(--font-inter), monospace"
        fontWeight={700}
      >
        &lt;/&gt;
      </text>

      {/* Fone de ouvido pendurado na quina da mesa */}
      <g {...line}>
        <path d="M 1332 556 C 1326 520 1362 508 1378 528" />
        <path d="M 1326 556 L 1326 580 C 1326 590 1340 590 1340 580 L 1340 556 Z" fill={paper} />
        <path d="M 1372 532 L 1372 556 C 1372 566 1386 566 1386 556 L 1386 532 Z" fill={paper} />
      </g>

      {/* Caneca */}
      <g {...line}>
        <path d="M 1122 560 L 1124 532 L 1158 530 L 1158 558 Z" fill={paper} />
        <path d="M 1158 538 C 1172 536 1174 552 1160 554" {...thin} />
      </g>

      <Basketball cx={438} cy={664} r={40} />
    </g>
  );
}

/** Projetos — mural de recados sob a cesta de basquete. */
export function BoardProps() {
  const cards = [
    { x: 1122, y: 372, w: 92, h: 72, r: -4 },
    { x: 1244, y: 360, w: 86, h: 80, r: 3 },
    { x: 1134, y: 472, w: 96, h: 66, r: 2 },
    { x: 1256, y: 466, w: 84, h: 74, r: -3 },
  ];

  return (
    <g strokeLinecap="round">
      <g {...line}>
        <rect x={1096} y={336} width={288} height={232} rx={4} fill={paper} />
        <rect x={1108} y={348} width={264} height={208} rx={2} {...thin} />
      </g>
      {cards.map((card) => (
        <g
          key={`${card.x}-${card.y}`}
          transform={`rotate(${card.r} ${card.x} ${card.y})`}
        >
          <rect
            x={card.x}
            y={card.y}
            width={card.w}
            height={card.h}
            fill={paper}
            stroke={ink}
            strokeWidth={1.8}
          />
          <path
            d={`M ${card.x + 12} ${card.y + 24} L ${card.x + card.w - 14} ${card.y + 24}`}
            {...thin}
          />
          <path
            d={`M ${card.x + 12} ${card.y + 42} L ${card.x + card.w - 28} ${card.y + 42}`}
            {...thin}
          />
          <circle cx={card.x + card.w / 2} cy={card.y + 8} r={4} fill={ink} />
        </g>
      ))}

      {/* Cesta na parede: tabela, aro e rede */}
      <g {...line}>
        <rect x={206} y={264} width={168} height={118} rx={3} fill={paper} />
        <rect x={252} y={308} width={76} height={62} rx={2} {...thin} />
        <ellipse cx={290} cy={392} rx={44} ry={11} fill={paper} />
        <path d="M 250 396 L 262 442 M 272 398 L 278 446 M 308 398 L 302 446 M 330 396 L 318 442" {...thin} />
        <path d="M 262 442 L 278 446 L 302 446 L 318 442" {...thin} />
      </g>

      <Basketball cx={290} cy={640} r={38} />
    </g>
  );
}

/** Trajetória — o mapa da rota, o tênis e a bola de sempre. */
export function MapProps() {
  return (
    <g strokeLinecap="round">
      <g {...line}>
        <rect x={1096} y={300} width={296} height={220} rx={3} fill={paper} />
        <path
          d="M 1120 470 C 1180 430 1150 380 1210 356 C 1260 336 1300 380 1356 352"
          strokeDasharray="7 9"
        />
        <circle cx={1120} cy={470} r={7} fill={paper} />
        <circle cx={1210} cy={356} r={7} fill={paper} />
        <circle cx={1356} cy={352} r={7} fill={ink} />
      </g>

      {/* Par de tênis no chão */}
      <g {...line}>
        <path d="M 202 662 C 206 630 232 628 238 644 C 246 664 276 664 282 678 C 286 690 270 700 240 700 L 208 700 Z" fill={paper} />
        <path d="M 212 678 L 276 676" {...thin} />
        <path d="M 224 646 L 232 658 M 236 640 L 244 652" {...thin} />
        <path d="M 296 666 C 300 636 326 634 332 650 C 340 670 370 670 376 684 C 380 696 364 704 334 704 L 302 704 Z" fill={paper} />
        <path d="M 306 684 L 370 682" {...thin} />
      </g>

      <Basketball cx={438} cy={660} r={36} />
    </g>
  );
}

/** Habilidades — potes rotulados com símbolos de código e a guitarra encostada. */
export function ShelfProps() {
  const jars = [
    { x: 1116, label: "{ }" },
    { x: 1178, label: "</>" },
    { x: 1240, label: "( )" },
    { x: 1302, label: "[ ]" },
  ];

  return (
    <g strokeLinecap="round">
      <g {...line}>
        <path d="M 1096 404 L 1392 398 M 1096 546 L 1392 540" />
        {jars.map((jar) => (
          <path
            key={jar.x}
            d={`M ${jar.x} 404 L ${jar.x + 2} 344 L ${jar.x + 46} 342 L ${jar.x + 46} 402 Z`}
            fill={paper}
          />
        ))}
        <path d="M 1120 546 L 1122 508 L 1300 502 L 1302 542 Z" fill={paper} />
        <path
          d="M 1166 506 L 1168 544 M 1214 504 L 1216 542 M 1258 503 L 1260 541"
          {...thin}
        />
      </g>
      {jars.map((jar) => (
        <text
          key={jar.label}
          x={jar.x + 23}
          y={380}
          textAnchor="middle"
          fill={soft}
          fontSize={17}
          fontFamily="var(--font-inter), monospace"
          fontWeight={700}
        >
          {jar.label}
        </text>
      ))}

      {/* Guitarra encostada na parede */}
      <g {...line} transform="rotate(-8 280 560)">
        <path d="M 246 700 C 214 700 208 664 232 650 C 214 636 222 606 250 606 C 276 606 292 626 288 650 C 300 668 282 700 246 700 Z" fill={paper} />
        <circle cx={256} cy={650} r={16} {...thin} />
        <path d="M 262 606 L 268 470" />
        <path d="M 250 606 L 256 470" />
        <path d="M 252 470 L 278 466 L 282 434 L 248 438 Z" fill={paper} />
        <path d="M 256 446 L 262 446 M 268 444 L 274 444" {...thin} />
      </g>
    </g>
  );
}

/** Certificados — os quadros na parede e o troféu de quadra. */
export function FrameProps() {
  const frames = [
    { x: 1104, y: 312, w: 128, h: 96 },
    { x: 1252, y: 306, w: 132, h: 100 },
    { x: 1150, y: 434, w: 140, h: 102 },
  ];

  return (
    <g strokeLinecap="round">
      {frames.map((f) => (
        <g key={f.x} {...line}>
          <rect x={f.x} y={f.y} width={f.w} height={f.h} rx={2} fill={paper} />
          <rect
            x={f.x + 10}
            y={f.y + 10}
            width={f.w - 20}
            height={f.h - 20}
            rx={1}
            {...thin}
          />
          <path
            d={`M ${f.x + 24} ${f.y + 36} L ${f.x + f.w - 26} ${f.y + 36}`}
            {...thin}
          />
          <path
            d={`M ${f.x + 24} ${f.y + 54} L ${f.x + f.w - 42} ${f.y + 54}`}
            {...thin}
          />
          <path
            d={`M ${f.x + 24} ${f.y + 72} L ${f.x + f.w - 58} ${f.y + 72}`}
            {...thin}
          />
        </g>
      ))}

      {/* Troféu com uma bola no topo, sobre o banquinho */}
      <g {...line}>
        <path d="M 232 618 L 310 616 L 314 700 L 236 702 Z" fill={paper} />
        <path d="M 254 616 L 256 578 L 292 576 L 292 614 Z" fill={paper} />
        <path d="M 256 586 C 240 584 240 560 258 562" />
        <path d="M 292 584 C 308 582 308 558 290 560" />
        <path d="M 258 562 L 256 546 L 292 544 L 292 560" />
      </g>
      <Basketball cx={274} cy={524} r={20} />
    </g>
  );
}

/** Conteúdo — a tela, os discos e o som. */
export function ScreenProps() {
  return (
    <g strokeLinecap="round">
      <g {...line}>
        <rect x={1100} y={330} width={288} height={186} rx={5} fill={paper} />
        <rect x={1114} y={344} width={260} height={158} rx={3} {...thin} />
        <path d="M 1216 392 L 1272 422 L 1216 452 Z" fill={paper} />
        <path d="M 1244 516 L 1244 558 M 1196 560 L 1292 556" />
      </g>

      {/* Caixa de som e discos encostados */}
      <g {...line}>
        <path d="M 198 540 L 306 536 L 310 702 L 202 706 Z" fill={paper} />
        <circle cx={254} cy={588} r={30} {...thin} />
        <circle cx={254} cy={588} r={7} fill={ink} />
        <circle cx={256} cy={660} r={18} {...thin} />
        <circle cx={368} cy={646} r={54} fill={paper} />
        <circle cx={368} cy={646} r={18} {...thin} />
        <circle cx={368} cy={646} r={5} fill={ink} />
      </g>

      <Note x={330} y={430} scale={1.1} />
      <Note x={392} y={378} scale={0.85} />
    </g>
  );
}

/** Perguntas — balões na parede e o balcão com a campainha. */
export function AskProps() {
  return (
    <g strokeLinecap="round">
      <g {...line}>
        <path
          d="M 1112 330 C 1112 306 1140 296 1178 296 C 1218 296 1244 308 1244 332
             C 1244 356 1218 368 1178 368 L 1146 388 L 1152 366
             C 1126 360 1112 348 1112 330 Z"
          fill={paper}
        />
        <path
          d="M 1252 430 C 1252 408 1278 398 1314 398 C 1352 398 1376 410 1376 432
             C 1376 454 1352 464 1314 464 L 1344 486 L 1310 464
             C 1274 462 1252 452 1252 430 Z"
          fill={paper}
        />
      </g>
      <text
        x={1178}
        y={346}
        textAnchor="middle"
        fill={ink}
        fontSize={34}
        fontFamily="var(--font-caveat), cursive"
        fontWeight={700}
      >
        ?
      </text>
      <Note x={1306} y={418} scale={0.75} />

      {/* Balcão com campainha */}
      <g {...line}>
        <path d="M 196 574 L 348 570 L 352 706 L 200 710 Z" fill={paper} />
        <path d="M 196 606 L 350 602" {...thin} />
        <path d="M 252 570 C 252 548 296 548 296 570 Z" fill={paper} />
        <path d="M 274 548 L 274 538" />
      </g>
    </g>
  );
}

/** Contato — o telefone de parede e a carta selada com coração. */
export function MailProps() {
  return (
    <g strokeLinecap="round">
      <g {...line}>
        <rect x={1188} y={318} width={116} height={158} rx={6} fill={paper} />
        <path d="M 1206 344 L 1286 342" {...thin} />
        <circle cx={1246} cy={400} r={30} {...thin} />
        <circle cx={1246} cy={400} r={7} fill={ink} />
        <path d="M 1160 350 C 1146 350 1146 372 1160 372 L 1160 404 C 1146 404 1146 426 1160 426" />
      </g>

      <g {...line}>
        <path d="M 210 540 L 340 536 L 344 640 L 214 644 Z" fill={paper} />
        <path d="M 210 540 C 214 512 340 508 340 536" fill={paper} />
        <path d="M 240 592 L 314 590" strokeWidth={3} />
        <path d="M 276 644 L 278 706" />
        {/* Carta saindo, lacrada */}
        <path d="M 316 532 L 380 514 L 392 550 L 328 568 Z" fill={paper} />
        <path d="M 316 532 L 352 546 L 392 550" {...thin} />
      </g>
      <Heart cx={354} cy={540} size={11} filled />
    </g>
  );
}

export const roomProps = {
  sobre: DeskProps,
  projetos: BoardProps,
  trajetoria: MapProps,
  habilidades: ShelfProps,
  certificados: FrameProps,
  conteudo: ScreenProps,
  faq: AskProps,
  contato: MailProps,
} as const;

export type RoomKey = keyof typeof roomProps;
