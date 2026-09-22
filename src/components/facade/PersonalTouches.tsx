/**
 * Marcas pessoais na fachada: a bola encostada na árvore, o fone pendurado
 * num prego da parede e um coração riscado no tronco.
 *
 * É o que diferencia esta fachada de uma fachada qualquer — sem elas, a cena
 * seria só uma parede com uma porta.
 */
export function PersonalTouches() {
  const ink = "var(--ink)";
  const soft = "var(--ink-soft)";
  const paper = "var(--paper)";

  return (
    <g strokeLinecap="round">
      {/* Bola de basquete encostada no pé da árvore */}
      <g stroke={ink} strokeWidth={2.2} fill="none">
        <circle cx={286} cy={664} r={36} fill={paper} />
        <path d="M 250 664 L 322 664" stroke={soft} strokeWidth={1.8} />
        <path d="M 286 628 L 286 700" stroke={soft} strokeWidth={1.8} />
        <path
          d="M 260 638 C 278 654 278 674 260 690"
          stroke={soft}
          strokeWidth={1.8}
        />
        <path
          d="M 312 638 C 294 654 294 674 312 690"
          stroke={soft}
          strokeWidth={1.8}
        />
      </g>

      {/* Fone pendurado num prego, à direita da porta */}
      <g stroke={ink} strokeWidth={2.2} fill="none">
        <circle cx={932} cy={384} r={3} fill={ink} />
        <path d="M 932 388 C 900 400 896 440 912 460" />
        <path d="M 906 452 L 906 486 C 906 498 924 498 924 486 L 924 452 Z" fill={paper} />
        <path d="M 948 426 C 962 440 960 468 948 478" />
        <path d="M 944 452 L 944 486 C 944 498 962 498 962 486 L 962 452 Z" fill={paper} />
      </g>

      {/* Coração riscado no tronco */}
      <path
        d="M 198 560 C 186 546 192 534 198 540 C 204 534 210 546 198 560 Z"
        stroke={soft}
        strokeWidth={1.8}
        fill="none"
      />
    </g>
  );
}
