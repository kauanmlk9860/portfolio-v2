const INK = "var(--ink)";
const RULE = "var(--rule)";
const PAPER = "var(--paper)";

/**
 * Porta de assunto do corredor.
 *
 * A folha é um elemento próprio, girando em `rotateY` a partir da dobradiça —
 * uma porta abrindo de verdade, que só é possível porque a cena inteira está
 * em CSS 3D. Antes ela era achatada em `scaleX`, que de perto entrega o truque.
 *
 * O vão atrás é escuro para a folha ter para onde abrir; sem ele a porta gira
 * revelando a própria parede.
 */
export function TopicDoor({
  label,
  badge,
  color,
  opening,
  mirrored = false,
}: {
  label: string;
  badge: string;
  color: string;
  opening: boolean;
  /**
   * Portas da parede direita são vistas espelhadas. O desespelhamento é feito
   * aqui dentro, nos SVGs: no botão, um scaleX(-1) briga com o preserve-3d que
   * a folha precisa para girar, e o texto volta invertido.
   */
  mirrored?: boolean;
}) {
  const flip = mirrored ? { transform: "scaleX(-1)" } : undefined;
  return (
    <div
      className="relative size-full"
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Vão */}
      <div
        className="absolute"
        style={{
          left: "7.6%",
          top: "11.4%",
          width: "84.8%",
          height: "88.6%",
          background: INK,
        }}
      />

      {/* Folha, presa pela dobradiça esquerda */}
      <div
        className="absolute"
        style={{
          left: "7.6%",
          top: "11.4%",
          width: "84.8%",
          height: "88.6%",
          transformOrigin: "left center",
          transformStyle: "preserve-3d",
          transform: opening ? "rotateY(-76deg)" : "rotateY(0deg)",
          transition: "transform 900ms cubic-bezier(0.45, 0, 0.2, 1)",
        }}
      >
        <svg viewBox="0 0 288 620" className="size-full" style={flip} aria-hidden>
          <rect
            x={2}
            y={2}
            width={284}
            height={616}
            fill={PAPER}
            stroke={INK}
            strokeWidth={4}
          />
          <rect
            x={28}
            y={30}
            width={232}
            height={232}
            fill="none"
            stroke={RULE}
            strokeWidth={3}
          />
          <rect
            x={28}
            y={318}
            width={232}
            height={272}
            fill="none"
            stroke={RULE}
            strokeWidth={3}
          />
          {/* Adesivo */}
          <g transform="translate(144 146) rotate(-5)">
            <rect
              x={-68}
              y={-29}
              width={136}
              height={58}
              rx={13}
              fill={color}
              stroke={INK}
              strokeWidth={3}
            />
            <text
              x={0}
              y={11}
              textAnchor="middle"
              fill="#fff"
              fontSize={27}
              fontWeight={700}
              fontFamily="var(--font-inter), sans-serif"
            >
              {badge}
            </text>
          </g>
          <circle cx={248} cy={300} r={9} fill={INK} />
        </svg>
      </div>

      {/* Batente e placa, por cima da folha */}
      <svg
        viewBox="0 0 340 700"
        className="pointer-events-none absolute inset-0 size-full"
        style={flip}
        aria-hidden
      >
        <path
          d="M 34 8 L 306 4 L 309 66 L 37 70 Z"
          fill={PAPER}
          stroke={INK}
          strokeWidth={3}
        />
        <text
          x={172}
          y={50}
          textAnchor="middle"
          fill={INK}
          fontSize={30}
          fontFamily="var(--font-caveat), cursive"
          fontWeight={700}
        >
          {label}
        </text>
        <rect
          x={18}
          y={72}
          width={304}
          height={626}
          fill="none"
          stroke={INK}
          strokeWidth={5}
        />
      </svg>
    </div>
  );
}
