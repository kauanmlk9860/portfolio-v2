/** Placa de madeira pendurada por correntes, balançando devagar. */
export function Sign() {
  return (
    <g>
      {/* Viga presa à parede */}
      <path
        d="M 596 196 L 900 190 L 902 218 L 598 224 Z"
        fill="var(--paper)"
        stroke="var(--ink)"
        strokeWidth={2.4}
      />
      <path
        d="M 620 206 Q 700 200 780 202"
        fill="none"
        stroke="var(--rule)"
        strokeWidth={1.4}
      />

      <g className="sway" style={{ transformOrigin: "720px 210px" }}>
        {/* Correntes */}
        <path
          d="M 646 214 L 640 250 M 640 250 L 646 262"
          stroke="var(--ink)"
          strokeWidth={2}
          fill="none"
        />
        <path
          d="M 796 210 L 802 248 M 802 248 L 796 260"
          stroke="var(--ink)"
          strokeWidth={2}
          fill="none"
        />

        {/* Tábua */}
        <path
          d="M 578 262 L 862 258 L 866 336 L 582 340 Z"
          fill="var(--paper)"
          stroke="var(--ink)"
          strokeWidth={2.6}
        />
        <path
          d="M 592 272 L 852 268"
          fill="none"
          stroke="var(--rule)"
          strokeWidth={1.4}
        />
        <text
          x={722}
          y={314}
          textAnchor="middle"
          fill="var(--ink)"
          fontSize={46}
          letterSpacing="4"
          fontFamily="var(--font-caveat), cursive"
          fontWeight={700}
        >
          PORTFÓLIO
        </text>
      </g>
    </g>
  );
}
