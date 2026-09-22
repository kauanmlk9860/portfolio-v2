import type { ReactNode } from "react";

/**
 * Estrutura comum a todas as salas: teto, paredes, piso, rodapé, luminária e a
 * porta por onde se entrou.
 *
 * As cunhas nas bordas e o tapete no chão existem para a cena não ler como uma
 * parede chapada — sem elas a sala parece um cenário de papel em pé. Os
 * adereços de cada assunto ficam nas faixas laterais, porque o miolo é ocupado
 * pela folha de conteúdo. A parede recebe um banho da cor do assunto: é o que
 * faz a troca de ambiente ser percebida antes de se ler qualquer coisa.
 */
export function RoomShell({
  tint,
  children,
}: {
  tint: string;
  children: ReactNode;
}) {
  const ink = "var(--ink)";
  const soft = "var(--ink-soft)";
  const rule = "var(--rule)";
  const paper = "var(--paper)";

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

        <radialGradient id="lamp-glow" cx="50%" cy="0%" r="72%">
          <stop offset="0%" stopColor={tint} stopOpacity={0.55} />
          <stop offset="100%" stopColor={tint} stopOpacity={0} />
        </radialGradient>
      </defs>

      <rect width={1440} height={900} fill={paper} />
      <rect width={1440} height={900} fill={tint} opacity={0.07} />

      {/* Cunhas de parede lateral: dão profundidade sem deslocar os adereços */}
      <g fill={tint} opacity={0.06}>
        <path d="M 0 0 L 74 64 L 74 706 L 0 796 Z" />
        <path d="M 1440 0 L 1366 64 L 1366 706 L 1440 796 Z" />
      </g>

      <g filter="url(#room-rough)">
        <g stroke={soft} strokeWidth={1.8} fill="none">
          <path d="M 0 0 L 74 64 M 74 64 L 74 706 M 0 796 L 74 706" />
          <path d="M 1440 0 L 1366 64 M 1366 64 L 1366 706 M 1440 796 L 1366 706" />
        </g>

        {/* Teto e sanca */}
        <g stroke={ink} strokeWidth={2.2} fill="none">
          <path d="M 74 64 L 1366 60" />
        </g>
        <path d="M 74 82 L 1366 78" stroke={rule} strokeWidth={1.6} fill="none" />

        {/* Trilho de quadros */}
        <path d="M 74 236 L 1366 232" stroke={rule} strokeWidth={1.6} fill="none" />

        {/* Encontro da parede com o piso, com rodapé de volume */}
        <path d="M 74 664 L 1366 660" stroke={rule} strokeWidth={1.8} fill="none" />
        <path d="M 74 706 L 1366 702" stroke={ink} strokeWidth={2.6} fill="none" />
        <g stroke={rule} strokeWidth={1.2} fill="none">
          <path d="M 240 664 L 240 706 M 600 663 L 600 705 M 980 662 L 980 704 M 1280 661 L 1280 703" />
        </g>

        {/* Tábuas do piso, abrindo em perspectiva */}
        <g stroke={rule} strokeWidth={1.4} fill="none">
          <path d="M 300 706 L 120 900" />
          <path d="M 560 706 L 480 900" />
          <path d="M 860 705 L 940 900" />
          <path d="M 1120 704 L 1310 900" />
          <path d="M 74 790 L 1366 786" />
        </g>

        {/* Tapete */}
        <g stroke={soft} strokeWidth={2} fill="none">
          <path d="M 470 742 L 980 738 L 1088 872 L 358 876 Z" />
          <path d="M 512 764 L 942 760 L 1030 850 L 420 854 Z" strokeWidth={1.5} />
          <path
            d="M 366 876 L 360 892 M 430 875 L 426 891 M 494 874 L 490 890
               M 558 874 L 554 890 M 622 873 L 618 889 M 686 872 L 682 888
               M 750 872 L 746 888 M 814 871 L 810 887 M 878 870 L 874 886
               M 942 870 L 938 886 M 1006 869 L 1002 885 M 1070 868 L 1066 884"
            strokeWidth={1.3}
          />
        </g>

        {/* Interruptor e tomada */}
        <g stroke={ink} strokeWidth={1.8} fill="none">
          <rect x={952} y={452} width={26} height={36} rx={3} fill={paper} />
          <path d="M 960 468 L 970 468" />
          <rect x={1006} y={630} width={30} height={24} rx={3} fill={paper} />
          <circle cx={1015} cy={642} r={2.4} fill={ink} />
          <circle cx={1027} cy={642} r={2.4} fill={ink} />
        </g>
      </g>

      {/* Luz da luminária, por baixo dos adereços */}
      <ellipse cx={720} cy={40} rx={540} ry={440} fill="url(#lamp-glow)" />

      {/* Fio e lâmpada, balançando devagar */}
      <g className="sway" style={{ transformOrigin: "720px 60px" }}>
        <g filter="url(#room-rough)">
          <path d="M 720 58 L 720 96" stroke={ink} strokeWidth={2} fill="none" />
          <path
            d="M 700 96 L 740 96 L 736 116 L 704 116 Z"
            fill={paper}
            stroke={ink}
            strokeWidth={2}
          />
          <path
            d="M 704 116 C 690 140 696 166 720 166 C 744 166 750 140 736 116"
            fill={paper}
            stroke={ink}
            strokeWidth={2.2}
          />
          <path
            d="M 710 138 L 716 150 L 722 136 L 728 150"
            stroke={tint}
            strokeWidth={2}
            fill="none"
          />
        </g>
      </g>

      {/* A porta por onde se entrou */}
      <g filter="url(#room-rough)">
        <rect
          x={110}
          y={318}
          width={104}
          height={388}
          rx={3}
          fill={paper}
          stroke={ink}
          strokeWidth={2.6}
        />
        <rect
          x={124}
          y={334}
          width={76}
          height={160}
          rx={2}
          fill="none"
          stroke={rule}
          strokeWidth={1.6}
        />
        <rect
          x={124}
          y={514}
          width={76}
          height={172}
          rx={2}
          fill="none"
          stroke={rule}
          strokeWidth={1.6}
        />
        <circle cx={194} cy={512} r={4} fill={ink} />
        {/* Sombra da porta no chão */}
        <path
          d="M 110 706 L 214 706 L 240 736 L 96 736 Z"
          fill={ink}
          opacity={0.06}
          stroke="none"
        />
      </g>

      <g filter="url(#room-rough)">{children}</g>
    </svg>
  );
}
