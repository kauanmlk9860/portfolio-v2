/** Adesivos colados na porta — a única cor da cena, como na referência. */
const stickers = [
  { label: "HTML", x: 626, y: 378, bg: "#e34f26", fg: "#fff", rotate: -7 },
  { label: "JS", x: 632, y: 452, bg: "#f7df1e", fg: "#1b1915", rotate: 5 },
  { label: "TS", x: 624, y: 526, bg: "#3178c6", fg: "#fff", rotate: -4 },
  { label: "React", x: 752, y: 382, bg: "#61dafb", fg: "#1b1915", rotate: 6 },
  { label: "Node", x: 748, y: 456, bg: "#539e43", fg: "#fff", rotate: -5 },
  { label: "CSS", x: 756, y: 530, bg: "#264de4", fg: "#fff", rotate: 4 },
];

function Sticker({
  label,
  x,
  y,
  bg,
  fg,
  rotate,
}: (typeof stickers)[number]) {
  const width = label.length > 3 ? 62 : 48;
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate})`}>
      <rect
        x={-width / 2}
        y={-16}
        width={width}
        height={32}
        rx={7}
        fill={bg}
        stroke="var(--ink)"
        strokeWidth={1.6}
      />
      <text
        x={0}
        y={6}
        textAnchor="middle"
        fill={fg}
        fontSize={15}
        fontWeight={700}
        fontFamily="var(--font-inter), sans-serif"
      >
        {label}
      </text>
    </g>
  );
}

/**
 * Porta dupla. Abrir é feito por escala horizontal a partir de cada dobradiça:
 * em SVG não há rotação em perspectiva, e encolher a folha na direção do batente
 * lê como uma porta girando.
 */
export function Door({ opening }: { opening: boolean }) {
  const leafTransition = "transform 900ms cubic-bezier(0.65, 0, 0.35, 1)";

  return (
    <g>
      {/* Vão escuro atrás das folhas */}
      <rect x={598} y={338} width={244} height={364} rx={4} fill="var(--ink)" />

      {/* Folha esquerda — dobradiça no batente esquerdo */}
      <g
        style={{
          transformOrigin: "600px 520px",
          transform: opening ? "scaleX(0.08)" : "scaleX(1)",
          transition: leafTransition,
        }}
      >
        <rect
          x={600}
          y={340}
          width={118}
          height={360}
          rx={3}
          fill="var(--paper)"
          stroke="var(--ink)"
          strokeWidth={2.6}
        />
        <rect
          x={612}
          y={356}
          width={94}
          height={150}
          rx={2}
          fill="none"
          stroke="var(--rule)"
          strokeWidth={1.6}
        />
        <rect
          x={612}
          y={524}
          width={94}
          height={160}
          rx={2}
          fill="none"
          stroke="var(--rule)"
          strokeWidth={1.6}
        />
        {stickers.slice(0, 3).map((sticker) => (
          <Sticker key={sticker.label} {...sticker} />
        ))}
        <path
          d="M 700 528 L 712 528"
          stroke="var(--ink)"
          strokeWidth={4}
          strokeLinecap="round"
        />
      </g>

      {/* Folha direita — dobradiça no batente direito */}
      <g
        style={{
          transformOrigin: "840px 520px",
          transform: opening ? "scaleX(0.08)" : "scaleX(1)",
          transition: leafTransition,
        }}
      >
        <rect
          x={722}
          y={340}
          width={118}
          height={360}
          rx={3}
          fill="var(--paper)"
          stroke="var(--ink)"
          strokeWidth={2.6}
        />
        <rect
          x={734}
          y={356}
          width={94}
          height={150}
          rx={2}
          fill="none"
          stroke="var(--rule)"
          strokeWidth={1.6}
        />
        <rect
          x={734}
          y={524}
          width={94}
          height={160}
          rx={2}
          fill="none"
          stroke="var(--rule)"
          strokeWidth={1.6}
        />
        {stickers.slice(3).map((sticker) => (
          <Sticker key={sticker.label} {...sticker} />
        ))}
        <path
          d="M 728 528 L 740 528"
          stroke="var(--ink)"
          strokeWidth={4}
          strokeLinecap="round"
        />
      </g>

      {/* Batente por cima das folhas */}
      <rect
        x={590}
        y={330}
        width={260}
        height={380}
        rx={4}
        fill="none"
        stroke="var(--ink)"
        strokeWidth={3}
      />
    </g>
  );
}
