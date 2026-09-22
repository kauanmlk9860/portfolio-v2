/**
 * Adereços de cada sala, construídos em torno do que o Kauan gosta:
 * basquete, música, amor e programação.
 *
 * A porta de entrada ocupa a faixa dos 110 aos 214, então os objetos da
 * esquerda começam depois dos 240. O miolo da tela é coberto pela folha de
 * conteúdo, e por isso nada importante fica entre os 470 e os 1000.
 */

const ink = "var(--ink)";
const soft = "var(--ink-soft)";
const rule = "var(--rule)";
const paper = "var(--paper)";

const line = { stroke: ink, strokeWidth: 2.2, fill: "none" } as const;
const thin = { stroke: soft, strokeWidth: 1.8, fill: "none" } as const;
const hair = { stroke: rule, strokeWidth: 1.4, fill: "none" } as const;

/* ---------- peças reaproveitadas ---------- */

/** Sombra macia, para os objetos assentarem no chão em vez de flutuarem. */
function Shadow({ cx, cy, rx }: { cx: number; cy: number; rx: number }) {
  return <ellipse cx={cx} cy={cy} rx={rx} ry={rx * 0.22} fill={ink} opacity={0.08} />;
}

/** Bola de basquete: círculo com as costuras características. */
function Basketball({ cx, cy, r }: { cx: number; cy: number; r: number }) {
  return (
    <g>
      <Shadow cx={cx} cy={cy + r} rx={r * 0.95} />
      <g {...line}>
        <circle cx={cx} cy={cy} r={r} fill={paper} />
        <path d={`M ${cx - r} ${cy} L ${cx + r} ${cy}`} {...thin} />
        <path d={`M ${cx} ${cy - r} L ${cx} ${cy + r}`} {...thin} />
        <path
          d={`M ${cx - r * 0.72} ${cy - r * 0.72} C ${cx - r * 0.2} ${cy - r * 0.1} ${cx - r * 0.2} ${cy + r * 0.1} ${cx - r * 0.72} ${cy + r * 0.72}`}
          {...thin}
        />
        <path
          d={`M ${cx + r * 0.72} ${cy - r * 0.72} C ${cx + r * 0.2} ${cy - r * 0.1} ${cx + r * 0.2} ${cy + r * 0.1} ${cx + r * 0.72} ${cy + r * 0.72}`}
          {...thin}
        />
      </g>
    </g>
  );
}

/** Coração a traço. */
function Heart({ cx, cy, size }: { cx: number; cy: number; size: number }) {
  const s = size;
  return (
    <path
      d={`M ${cx} ${cy + s * 0.7}
          C ${cx - s * 1.4} ${cy - s * 0.3} ${cx - s * 0.6} ${cy - s * 1.1} ${cx} ${cy - s * 0.3}
          C ${cx + s * 0.6} ${cy - s * 1.1} ${cx + s * 1.4} ${cy - s * 0.3} ${cx} ${cy + s * 0.7} Z`}
      stroke={ink}
      strokeWidth={1.8}
      fill={ink}
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

/** Vaso com folhas. */
function Plant({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <Shadow cx={0} cy={44} rx={36} />
      <g {...line}>
        <path d="M -28 -4 L 28 -4 L 20 44 L -20 44 Z" fill={paper} />
        <path d="M -26 8 L 26 8" {...hair} />
        <path d="M 0 -4 L 0 -52" {...thin} />
        <path d="M 0 -20 C -26 -26 -32 -50 -12 -54 C -2 -56 0 -40 0 -30" {...thin} />
        <path d="M 0 -32 C 24 -38 32 -62 12 -68 C 2 -70 0 -52 0 -42" {...thin} />
      </g>
    </g>
  );
}

/** Relógio de parede. */
function Clock({ cx, cy, r }: { cx: number; cy: number; r: number }) {
  return (
    <g {...line}>
      <circle cx={cx} cy={cy} r={r} fill={paper} />
      <circle cx={cx} cy={cy} r={r - 8} {...hair} />
      <path d={`M ${cx} ${cy} L ${cx} ${cy - r * 0.55}`} />
      <path d={`M ${cx} ${cy} L ${cx + r * 0.4} ${cy + r * 0.28}`} />
      <circle cx={cx} cy={cy} r={3} fill={ink} />
    </g>
  );
}

/** Quadro genérico com linhas, para compor parede. */
function Poster({
  x,
  y,
  w,
  h,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
}) {
  return (
    <g {...line}>
      <rect x={x} y={y} width={w} height={h} rx={2} fill={paper} />
      <rect x={x + 8} y={y + 8} width={w - 16} height={h - 16} rx={1} {...hair} />
      <path d={`M ${x + 20} ${y + h - 30} L ${x + w * 0.42} ${y + h * 0.42} L ${x + w * 0.66} ${y + h - 46} L ${x + w - 20} ${y + h - 30}`} {...thin} />
      <circle cx={x + w * 0.3} cy={y + h * 0.3} r={7} {...thin} />
    </g>
  );
}

/* ---------- salas ---------- */

/** Sobre mim — a sala pessoal: mesa, fone, retrato, bola e mochila. */
export function DeskProps() {
  return (
    <g strokeLinecap="round">
      {/* Prateleira com livros e planta, acima do retrato */}
      <g {...line}>
        <path d="M 250 300 L 452 296" />
        <path d="M 264 296 L 266 252 L 292 251 L 292 295 Z" fill={paper} />
        <path d="M 296 295 L 298 258 L 320 257 L 320 294 Z" fill={paper} />
        <path d="M 324 294 L 326 246 L 350 245 L 350 293 Z" fill={paper} />
      </g>
      <Plant x={412} y={252} scale={0.52} />

      {/* Retrato com coração ao lado */}
      <g {...line}>
        <rect x={262} y={348} width={124} height={104} rx={2} fill={paper} />
        <rect x={276} y={362} width={96} height={76} rx={2} {...hair} />
        <circle cx={306} cy={390} r={9} {...thin} />
        <circle cx={342} cy={390} r={9} {...thin} />
        <path d="M 296 418 C 312 432 336 432 352 418" {...thin} />
      </g>
      <Heart cx={404} cy={352} size={13} />

      {/* Escrivaninha com notebook, caneca, fone e luminária */}
      <g {...line}>
        <path d="M 1024 560 L 1348 554 L 1350 578 L 1026 584 Z" fill={paper} />
        <path d="M 1046 584 L 1050 706 M 1324 580 L 1328 702" />
        <path d="M 1046 636 L 1326 632" {...hair} />
        <path d="M 1128 560 L 1140 498 L 1256 494 L 1252 558 Z" fill={paper} />
        <path d="M 1110 560 L 1272 556" />
      </g>
      <text
        x={1196}
        y={534}
        textAnchor="middle"
        fill={soft}
        fontSize={26}
        fontFamily="var(--font-inter), monospace"
        fontWeight={700}
      >
        &lt;/&gt;
      </text>
      <g {...line}>
        {/* Fone pendurado na quina */}
        <path d="M 1290 556 C 1284 520 1320 508 1336 528" />
        <path d="M 1284 556 L 1284 582 C 1284 592 1298 592 1298 582 L 1298 556 Z" fill={paper} />
        <path d="M 1330 532 L 1330 558 C 1330 568 1344 568 1344 558 L 1344 532 Z" fill={paper} />
        {/* Caneca */}
        <path d="M 1056 560 L 1058 532 L 1092 530 L 1092 558 Z" fill={paper} />
        <path d="M 1092 538 C 1106 536 1108 552 1094 554" {...thin} />
        {/* Luminária de mesa */}
        <path d="M 1310 554 L 1312 494 L 1338 466" />
        <path d="M 1324 462 L 1358 448 L 1366 474 L 1332 486 Z" fill={paper} />
      </g>

      {/* Cadeira */}
      <g {...line}>
        <Shadow cx={1180} cy={790} rx={62} />
        <path d="M 1130 700 L 1238 696 L 1242 724 L 1134 728 Z" fill={paper} />
        <path d="M 1142 728 L 1150 790 M 1230 724 L 1238 786" />
        <path d="M 1134 700 L 1130 610 L 1160 608 L 1166 698" fill={paper} />
      </g>

      <Basketball cx={318} cy={640} r={40} />
      {/* Mochila encostada */}
      <g {...line}>
        <Shadow cx={424} cy={706} rx={48} />
        <path d="M 386 704 C 380 640 398 614 424 614 C 450 614 468 640 462 704 Z" fill={paper} />
        <path d="M 392 662 L 456 660" {...thin} />
        <path d="M 410 614 C 412 596 436 596 438 614" {...thin} />
      </g>
    </g>
  );
}

/** Projetos — a cesta, o mural e a mesinha de trabalho. */
export function BoardProps() {
  const cards = [
    { x: 1040, y: 320, w: 92, h: 72, r: -4 },
    { x: 1162, y: 308, w: 86, h: 80, r: 3 },
    { x: 1052, y: 420, w: 96, h: 66, r: 2 },
    { x: 1174, y: 414, w: 84, h: 74, r: -3 },
  ];

  return (
    <g strokeLinecap="round">
      {/* Cesta: tabela, aro e rede */}
      <g {...line}>
        <rect x={266} y={258} width={172} height={120} rx={3} fill={paper} />
        <rect x={314} y={302} width={76} height={62} rx={2} {...hair} />
        <ellipse cx={352} cy={388} rx={44} ry={11} fill={paper} />
        <path d="M 312 392 L 324 440 M 334 394 L 340 444 M 370 394 L 364 444 M 392 392 L 380 440" {...thin} />
        <path d="M 324 440 L 340 444 L 364 444 L 380 440" {...thin} />
      </g>

      {/* Mural com recados */}
      <g {...line}>
        <rect x={1014} y={284} width={288} height={232} rx={4} fill={paper} />
        <rect x={1026} y={296} width={264} height={208} rx={2} {...hair} />
      </g>
      {cards.map((card) => (
        <g key={`${card.x}-${card.y}`} transform={`rotate(${card.r} ${card.x} ${card.y})`}>
          <rect x={card.x} y={card.y} width={card.w} height={card.h} fill={paper} stroke={ink} strokeWidth={1.8} />
          <path d={`M ${card.x + 12} ${card.y + 24} L ${card.x + card.w - 14} ${card.y + 24}`} {...thin} />
          <path d={`M ${card.x + 12} ${card.y + 42} L ${card.x + card.w - 28} ${card.y + 42}`} {...thin} />
          <circle cx={card.x + card.w / 2} cy={card.y + 8} r={4} fill={ink} />
        </g>
      ))}

      {/* Mesinha com notebook fechado e papéis */}
      <g {...line}>
        <path d="M 1046 588 L 1330 582 L 1332 606 L 1048 612 Z" fill={paper} />
        <path d="M 1066 612 L 1070 706 M 1310 608 L 1314 702" />
        <path d="M 1120 588 L 1124 562 L 1264 558 L 1262 586 Z" fill={paper} />
        <path d="M 1130 572 L 1252 568" {...hair} />
        <path d="M 1278 588 L 1280 566 L 1320 564 L 1320 586 Z" fill={paper} />
      </g>

      <Plant x={1370} y={650} scale={0.8} />
      <Basketball cx={430} cy={648} r={38} />
    </g>
  );
}

/** Trajetória — o mapa da rota, o relógio, o tênis e a mala. */
export function MapProps() {
  return (
    <g strokeLinecap="round">
      <Clock cx={318} cy={320} r={48} />
      <Poster x={266} y={412} w={112} h={92} />

      {/* Mapa com a rota */}
      <g {...line}>
        <rect x={1014} y={280} width={302} height={226} rx={3} fill={paper} />
        <path
          d="M 1040 456 C 1102 414 1072 362 1132 338 C 1184 316 1224 362 1282 332"
          strokeDasharray="7 9"
        />
        <circle cx={1040} cy={456} r={7} fill={paper} />
        <circle cx={1132} cy={338} r={7} fill={paper} />
        <circle cx={1282} cy={332} r={7} fill={ink} />
        <path d="M 1032 306 L 1082 302 M 1032 324 L 1064 321" {...hair} />
      </g>

      {/* Mala em pé */}
      <g {...line}>
        <Shadow cx={1180} cy={712} rx={78} />
        <path d="M 1110 596 L 1252 592 L 1256 708 L 1114 712 Z" fill={paper} />
        <path d="M 1154 592 C 1158 566 1208 564 1212 590" />
        <path d="M 1114 634 L 1256 630" {...thin} />
        <path d="M 1144 662 L 1176 660 M 1200 658 L 1232 656" {...thin} />
      </g>

      {/* Par de tênis */}
      <g {...line}>
        <Shadow cx={330} cy={702} rx={54} />
        <path d="M 268 664 C 272 632 298 630 304 646 C 312 666 342 666 348 680 C 352 692 336 702 306 702 L 274 702 Z" fill={paper} />
        <path d="M 278 680 L 342 678" {...thin} />
        <path d="M 290 648 L 298 660 M 302 642 L 310 654" {...thin} />
        <path d="M 362 668 C 366 638 392 636 398 652 C 406 672 436 672 442 686 C 446 698 430 706 400 706 L 368 706 Z" fill={paper} />
        <path d="M 372 686 L 436 684" {...thin} />
      </g>

      <Basketball cx={1360} cy={664} r={34} />
    </g>
  );
}

/** Habilidades — potes de código, livros, guitarra e amplificador. */
export function ShelfProps() {
  const jars = [
    { x: 1026, label: "{ }" },
    { x: 1092, label: "</>" },
    { x: 1158, label: "( )" },
    { x: 1224, label: "[ ]" },
    { x: 1290, label: "=>" },
  ];

  return (
    <g strokeLinecap="round">
      {/* Duas prateleiras */}
      <g {...line}>
        <path d="M 1010 398 L 1350 392 M 1010 544 L 1350 538" />
        <path d="M 1018 398 L 1018 424 M 1342 392 L 1342 418" {...hair} />
        {jars.map((jar) => (
          <path
            key={jar.x}
            d={`M ${jar.x} 398 L ${jar.x + 2} 336 L ${jar.x + 48} 334 L ${jar.x + 48} 396 Z`}
            fill={paper}
          />
        ))}
        <path d="M 1034 544 L 1036 500 L 1226 494 L 1228 540 Z" fill={paper} />
        <path d="M 1084 498 L 1086 542 M 1134 496 L 1136 540 M 1180 495 L 1182 539" {...thin} />
        {/* Caixa de ferramentas na prateleira de baixo */}
        <path d="M 1246 544 L 1248 506 L 1340 502 L 1342 540 Z" fill={paper} />
        <path d="M 1272 506 C 1276 488 1312 486 1316 504" {...thin} />
      </g>
      {jars.map((jar) => (
        <text
          key={jar.label}
          x={jar.x + 24}
          y={372}
          textAnchor="middle"
          fill={soft}
          fontSize={17}
          fontFamily="var(--font-inter), monospace"
          fontWeight={700}
        >
          {jar.label}
        </text>
      ))}

      {/* Guitarra encostada */}
      <g {...line} transform="rotate(-8 340 560)">
        <path d="M 306 700 C 274 700 268 664 292 650 C 274 636 282 606 310 606 C 336 606 352 626 348 650 C 360 668 342 700 306 700 Z" fill={paper} />
        <circle cx={316} cy={650} r={16} {...hair} />
        <path d="M 322 606 L 328 470" />
        <path d="M 310 606 L 316 470" />
        <path d="M 312 470 L 338 466 L 342 434 L 308 438 Z" fill={paper} />
        <path d="M 316 446 L 322 446 M 328 444 L 334 444" {...hair} />
      </g>

      {/* Amplificador */}
      <g {...line}>
        <Shadow cx={424} cy={712} rx={54} />
        <path d="M 372 602 L 476 598 L 480 708 L 376 712 Z" fill={paper} />
        <circle cx={426} cy={660} r={30} {...hair} />
        <path d="M 382 618 L 470 615" {...hair} />
        <circle cx={396} cy={626} r={4} fill={ink} />
        <circle cx={414} cy={625} r={4} fill={ink} />
      </g>
    </g>
  );
}

/** Certificados — a parede de quadros, a estante de medalhas e o troféu. */
export function FrameProps() {
  const frames = [
    { x: 1014, y: 272, w: 128, h: 96 },
    { x: 1166, y: 266, w: 132, h: 100 },
    { x: 1016, y: 392, w: 140, h: 102 },
    { x: 1180, y: 388, w: 118, h: 106 },
  ];

  return (
    <g strokeLinecap="round">
      {frames.map((f) => (
        <g key={f.x + f.y} {...line}>
          <rect x={f.x} y={f.y} width={f.w} height={f.h} rx={2} fill={paper} />
          <rect x={f.x + 10} y={f.y + 10} width={f.w - 20} height={f.h - 20} rx={1} {...hair} />
          <path d={`M ${f.x + 24} ${f.y + 36} L ${f.x + f.w - 26} ${f.y + 36}`} {...thin} />
          <path d={`M ${f.x + 24} ${f.y + 54} L ${f.x + f.w - 42} ${f.y + 54}`} {...thin} />
          <path d={`M ${f.x + 24} ${f.y + 72} L ${f.x + f.w - 58} ${f.y + 72}`} {...thin} />
        </g>
      ))}

      {/* Prateleira com medalhas penduradas */}
      <g {...line}>
        <path d="M 1014 566 L 1310 560" />
        {[1060, 1132, 1204, 1268].map((x) => (
          <g key={x}>
            <path d={`M ${x} 560 L ${x - 10} 516 L ${x + 12} 515 L ${x + 2} 559`} {...thin} />
            <circle cx={x + 1} cy={572} r={13} fill={paper} />
            <circle cx={x + 1} cy={572} r={6} {...hair} />
          </g>
        ))}
      </g>

      {/* Troféu de basquete sobre o banquinho */}
      <g {...line}>
        <Shadow cx={330} cy={706} rx={56} />
        <path d="M 288 618 L 366 616 L 370 702 L 292 706 Z" fill={paper} />
        <path d="M 296 646 L 366 644" {...hair} />
        <path d="M 310 616 L 312 578 L 348 576 L 348 614 Z" fill={paper} />
        <path d="M 312 586 C 296 584 296 560 314 562" />
        <path d="M 348 584 C 364 582 364 558 346 560" />
        <path d="M 314 562 L 312 546 L 348 544 L 348 560" />
      </g>
      <Basketball cx={330} cy={524} r={20} />
      <Plant x={442} y={640} scale={0.72} />
    </g>
  );
}

/** Conteúdo — a tela, o microfone, a caixa de som e os discos. */
export function ScreenProps() {
  return (
    <g strokeLinecap="round">
      <g {...line}>
        <rect x={1014} y={306} width={292} height={190} rx={5} fill={paper} />
        <rect x={1028} y={320} width={264} height={162} rx={3} {...hair} />
        <path d="M 1132 370 L 1190 400 L 1132 430 Z" fill={paper} />
        <path d="M 1160 496 L 1160 540 M 1112 542 L 1208 538" />
      </g>

      {/* Microfone em haste */}
      <g {...line}>
        <Shadow cx={1300} cy={706} rx={44} />
        <path d="M 1300 706 L 1300 530" />
        <path d="M 1266 706 L 1334 704" />
        <path d="M 1300 540 L 1300 512 L 1244 500" />
        <path d="M 1244 500 C 1228 496 1220 474 1236 466 C 1252 458 1264 476 1252 490" fill={paper} />
        <circle cx={1240} cy={480} r={13} fill={paper} />
      </g>

      {/* Caixa de som e discos */}
      <g {...line}>
        <Shadow cx={306} cy={710} rx={64} />
        <path d="M 250 538 L 362 534 L 366 706 L 254 710 Z" fill={paper} />
        <circle cx={306} cy={588} r={30} {...hair} />
        <circle cx={306} cy={588} r={7} fill={ink} />
        <circle cx={308} cy={662} r={18} {...hair} />
        <circle cx={428} cy={646} r={54} fill={paper} />
        <circle cx={428} cy={646} r={18} {...hair} />
        <circle cx={428} cy={646} r={5} fill={ink} />
      </g>

      <Note x={392} y={420} scale={1.1} />
      <Note x={450} y={368} scale={0.85} />
      <Note x={344} y={352} scale={0.7} />
    </g>
  );
}

/** Perguntas — o balcão com campainha, os balões e o relógio. */
export function AskProps() {
  return (
    <g strokeLinecap="round">
      <g {...line}>
        <path
          d="M 1024 322 C 1024 298 1052 288 1090 288 C 1130 288 1156 300 1156 324
             C 1156 348 1130 360 1090 360 L 1058 380 L 1064 358
             C 1038 352 1024 340 1024 322 Z"
          fill={paper}
        />
        <path
          d="M 1176 424 C 1176 402 1202 392 1238 392 C 1276 392 1300 404 1300 426
             C 1300 448 1276 458 1238 458 L 1268 480 L 1234 458
             C 1198 456 1176 446 1176 424 Z"
          fill={paper}
        />
      </g>
      <text
        x={1090}
        y={338}
        textAnchor="middle"
        fill={ink}
        fontSize={34}
        fontFamily="var(--font-caveat), cursive"
        fontWeight={700}
      >
        ?
      </text>
      <Note x={1230} y={412} scale={0.75} />
      <Clock cx={1330} cy={320} r={42} />

      {/* Balcão com campainha e papéis */}
      <g {...line}>
        <Shadow cx={362} cy={716} rx={96} />
        <path d="M 262 566 L 452 562 L 456 710 L 266 714 Z" fill={paper} />
        <path d="M 262 600 L 454 596" {...hair} />
        <path d="M 266 660 L 456 656" {...hair} />
        <path d="M 330 562 C 330 540 374 540 374 562 Z" fill={paper} />
        <path d="M 352 540 L 352 530" />
        <path d="M 392 562 L 394 544 L 442 542 L 442 560 Z" fill={paper} />
      </g>
      <Plant x={1376} y={648} scale={0.74} />
    </g>
  );
}

/** Contato — a caixa de correio, o telefone e os cartões-postais. */
export function MailProps() {
  return (
    <g strokeLinecap="round">
      {/* Telefone de parede */}
      <g {...line}>
        <rect x={1046} y={300} width={118} height={162} rx={6} fill={paper} />
        <path d="M 1064 326 L 1146 324" {...hair} />
        <circle cx={1105} cy={384} r={30} {...hair} />
        <circle cx={1105} cy={384} r={7} fill={ink} />
        <path d="M 1018 332 C 1004 332 1004 354 1018 354 L 1018 386 C 1004 386 1004 408 1018 408" />
      </g>

      {/* Quadro de cartões-postais */}
      <g {...line}>
        <rect x={1194} y={292} width={158} height={196} rx={3} fill={paper} />
        {[
          { x: 1212, y: 312, r: -4 },
          { x: 1284, y: 306, r: 5 },
          { x: 1216, y: 396, r: 3 },
          { x: 1286, y: 392, r: -3 },
        ].map((c) => (
          <g key={`${c.x}-${c.y}`} transform={`rotate(${c.r} ${c.x} ${c.y})`}>
            <rect x={c.x} y={c.y} width={56} height={70} fill={paper} stroke={ink} strokeWidth={1.6} />
            <path d={`M ${c.x + 8} ${c.y + 50} L ${c.x + 24} ${c.y + 30} L ${c.x + 38} ${c.y + 46} L ${c.x + 48} ${c.y + 38}`} {...thin} />
            <circle cx={c.x + 16} cy={c.y + 18} r={5} {...thin} />
          </g>
        ))}
      </g>

      {/* Caixa de correio com a carta lacrada */}
      <g {...line}>
        <Shadow cx={330} cy={712} rx={52} />
        <path d="M 266 540 L 396 536 L 400 640 L 270 644 Z" fill={paper} />
        <path d="M 266 540 C 270 512 396 508 396 536" fill={paper} />
        <path d="M 296 592 L 370 590" strokeWidth={3} />
        <path d="M 332 644 L 334 712" />
        <path d="M 372 532 L 436 514 L 448 550 L 384 568 Z" fill={paper} />
        <path d="M 372 532 L 408 546 L 448 550" {...thin} />
      </g>
      <Heart cx={410} cy={540} size={11} />
      <Plant x={1390} y={656} scale={0.76} />
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
