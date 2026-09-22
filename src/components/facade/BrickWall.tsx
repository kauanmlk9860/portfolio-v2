import { wobble } from "./wobble";

const ROW_HEIGHT = 34;
const BRICK_WIDTH = 116;

/** Parede de tijolos: fiadas horizontais com juntas alternadas. */
export function BrickWall({
  width,
  height,
}: {
  width: number;
  height: number;
}) {
  const rows = [];
  let seed = 1;

  for (let y = 0; y <= height; y += ROW_HEIGHT) {
    const drift = wobble(seed++, 1.6);
    rows.push(
      <path
        key={`h${y}`}
        d={`M -10 ${y + drift} Q ${width / 2} ${y + wobble(seed++, 2.4)} ${width + 10} ${y + wobble(seed++, 1.6)}`}
        fill="none"
      />,
    );

    // Junta vertical deslocada meio tijolo a cada fiada.
    const offset = (y / ROW_HEIGHT) % 2 === 0 ? 0 : BRICK_WIDTH / 2;
    for (let x = offset; x <= width; x += BRICK_WIDTH) {
      const dx = wobble(seed++, 1.8);
      rows.push(
        <path
          key={`v${y}-${x}`}
          d={`M ${x + dx} ${y} L ${x + dx + wobble(seed++, 1.4)} ${y + ROW_HEIGHT}`}
          fill="none"
        />,
      );
    }
  }

  return (
    <g stroke="var(--rule)" strokeWidth={1.4} strokeLinecap="round">
      {rows}
    </g>
  );
}
