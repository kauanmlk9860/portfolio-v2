/**
 * Porta de assunto, usada no corredor. Cada uma tem placa com o nome e um
 * adesivo próprio, para as portas não virarem seis retângulos iguais.
 */
export function TopicDoor({
  label,
  badge,
  color,
  opening,
}: {
  label: string;
  badge: string;
  color: string;
  opening: boolean;
}) {
  const leafTransition = "transform 850ms cubic-bezier(0.65, 0, 0.35, 1)";

  return (
    <svg viewBox="0 0 200 420" className="h-full w-auto" aria-hidden>
      {/* Placa acima da porta */}
      <g>
        <path
          d="M 18 14 L 182 10 L 184 58 L 20 62 Z"
          fill="var(--paper)"
          stroke="var(--ink)"
          strokeWidth={2.4}
        />
        <text
          x={100}
          y={44}
          textAnchor="middle"
          fill="var(--ink)"
          fontSize={22}
          fontFamily="var(--font-caveat), cursive"
          fontWeight={700}
        >
          {label}
        </text>
      </g>

      {/* Vão escuro atrás da folha */}
      <rect x={30} y={78} width={140} height={330} fill="var(--ink)" />

      {/* Folha única, dobradiça à esquerda */}
      <g
        style={{
          transformOrigin: "32px 240px",
          transform: opening ? "scaleX(0.07)" : "scaleX(1)",
          transition: leafTransition,
        }}
      >
        <rect
          x={32}
          y={80}
          width={136}
          height={326}
          rx={3}
          fill="var(--paper)"
          stroke="var(--ink)"
          strokeWidth={2.6}
        />
        <rect
          x={46}
          y={96}
          width={108}
          height={124}
          rx={2}
          fill="none"
          stroke="var(--rule)"
          strokeWidth={1.6}
        />
        <rect
          x={46}
          y={244}
          width={108}
          height={146}
          rx={2}
          fill="none"
          stroke="var(--rule)"
          strokeWidth={1.6}
        />

        {/* Adesivo */}
        <g transform="translate(100 158) rotate(-5)">
          <rect
            x={-40}
            y={-17}
            width={80}
            height={34}
            rx={8}
            fill={color}
            stroke="var(--ink)"
            strokeWidth={1.6}
          />
          <text
            x={0}
            y={6}
            textAnchor="middle"
            fill="#fff"
            fontSize={15}
            fontWeight={700}
            fontFamily="var(--font-inter), sans-serif"
          >
            {badge}
          </text>
        </g>

        <circle cx={152} cy={244} r={4.5} fill="var(--ink)" />
      </g>

      {/* Batente */}
      <rect
        x={24}
        y={72}
        width={152}
        height={340}
        rx={3}
        fill="none"
        stroke="var(--ink)"
        strokeWidth={3}
      />
    </svg>
  );
}
