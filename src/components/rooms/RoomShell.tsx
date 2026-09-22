import type { ReactNode } from "react";

/**
 * Estrutura comum a todas as salas: parede ao fundo, piso, rodapé, luminária
 * pendurada e a porta por onde se entrou.
 *
 * Os adereços de cada assunto ficam nas laterais, porque o miolo é ocupado
 * pela folha de conteúdo. A parede recebe um banho da cor do assunto: é o que
 * faz a troca de ambiente ser percebida no primeiro olhar, antes de ler
 * qualquer coisa.
 */
export function RoomShell({
  tint,
  children,
}: {
  tint: string;
  children: ReactNode;
}) {
  return (
    <svg
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      className="size-full"
      aria-hidden
    >
      <defs>
        <filter id="room-rough" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.015"
            numOctaves={3}
            seed={19}
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale={3.5}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>

        <radialGradient id="lamp-glow" cx="50%" cy="0%" r="70%">
          <stop offset="0%" stopColor={tint} stopOpacity={0.5} />
          <stop offset="100%" stopColor={tint} stopOpacity={0} />
        </radialGradient>
      </defs>

      <rect width={1440} height={900} fill="var(--paper)" />
      {/* Banho de cor da sala */}
      <rect width={1440} height={900} fill={tint} opacity={0.07} />

      <g filter="url(#room-rough)">
        {/* Encontro da parede com o piso */}
        <path
          d="M -10 706 L 1450 702"
          stroke="var(--ink)"
          strokeWidth={2.6}
          fill="none"
        />
        <path
          d="M -10 682 L 1450 678"
          stroke="var(--rule)"
          strokeWidth={2}
          fill="none"
        />
        {/* Tábuas do piso, abrindo em perspectiva */}
        <g stroke="var(--rule)" strokeWidth={1.4} fill="none">
          <path d="M 300 706 L 120 900" />
          <path d="M 560 706 L 480 900" />
          <path d="M 860 706 L 940 900" />
          <path d="M 1120 706 L 1310 900" />
          <path d="M -10 790 L 1450 786" />
        </g>
      </g>

      {/* Luz da luminária, por baixo dos adereços */}
      <ellipse cx={720} cy={40} rx={520} ry={420} fill="url(#lamp-glow)" />

      <g filter="url(#room-rough)">
        {/* Fio e lâmpada */}
        <path
          d="M 720 -10 L 720 96"
          stroke="var(--ink)"
          strokeWidth={2}
          fill="none"
        />
        <path
          d="M 700 96 L 740 96 L 736 116 L 704 116 Z"
          fill="var(--paper)"
          stroke="var(--ink)"
          strokeWidth={2}
        />
        <path
          d="M 704 116 C 690 140 696 166 720 166 C 744 166 750 140 736 116"
          fill="var(--paper)"
          stroke="var(--ink)"
          strokeWidth={2.2}
        />
        <path
          d="M 710 138 L 716 150 L 722 136 L 728 150"
          stroke={tint}
          strokeWidth={2}
          fill="none"
        />
      </g>

      {/* A porta por onde se entrou, ao fundo à esquerda */}
      <g filter="url(#room-rough)">
        <rect
          x={48}
          y={318}
          width={104}
          height={388}
          rx={3}
          fill="var(--paper)"
          stroke="var(--ink)"
          strokeWidth={2.6}
        />
        <rect
          x={62}
          y={334}
          width={76}
          height={160}
          rx={2}
          fill="none"
          stroke="var(--rule)"
          strokeWidth={1.6}
        />
        <rect
          x={62}
          y={514}
          width={76}
          height={172}
          rx={2}
          fill="none"
          stroke="var(--rule)"
          strokeWidth={1.6}
        />
        <circle cx={132} cy={512} r={4} fill="var(--ink)" />
      </g>

      <g filter="url(#room-rough)">{children}</g>
    </svg>
  );
}
