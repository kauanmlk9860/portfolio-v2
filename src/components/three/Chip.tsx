"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import type { Group, MeshStandardMaterial } from "three";

const ACCENT = "#a855f7";
const REST_TILT = -0.12;

export type DragState = { x: number; y: number; vx: number; vy: number; active: boolean };

/**
 * Chip de silício que se desmonta conforme o scroll.
 *
 * Em repouso ele gira devagar e flutua. Ao avançar pela seção fixada, o die
 * sobe e contra-gira, as trilhas acendem e a peça se abre — o mesmo recurso
 * das páginas dos chips da Apple, onde rolar desmonta o produto em camadas.
 * Arrastar gira na mão, com inércia e retorno suave ao soltar.
 */
export function Chip({
  scrollRef,
  progressRef,
  pointerRef,
  dragRef,
  reducedMotion,
}: {
  scrollRef: React.RefObject<number>;
  progressRef: React.RefObject<number>;
  pointerRef: React.RefObject<{ x: number; y: number }>;
  dragRef: React.RefObject<DragState>;
  reducedMotion: boolean;
}) {
  const group = useRef<Group>(null);
  const die = useRef<Group>(null);
  const traces = useRef<Group>(null);
  const spin = useRef(0.6);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;

    const p = progressRef.current;
    const drag = dragRef.current;

    if (reducedMotion) {
      g.rotation.set(REST_TILT, 0.6, 0);
      g.position.y = 0;
      g.scale.setScalar(1 - p * 0.24);
      if (die.current) die.current.position.y = 0.17 + p * 0.85;
      return;
    }

    // Giro próprio + avanço do scroll + o que o visitante arrastou.
    if (!drag.active) {
      spin.current += delta * 0.25;
      // Inércia: a velocidade do arraste continua e vai morrendo.
      spin.current += drag.vx;
      drag.vx *= 0.94;
      drag.vy *= 0.94;
    }
    g.rotation.y = spin.current + drag.x + scrollRef.current * 0.015;

    const targetX =
      REST_TILT + pointerRef.current.y * 0.18 + drag.y + p * 0.18;
    const targetZ = pointerRef.current.x * -0.1;
    g.rotation.x += (targetX - g.rotation.x) * Math.min(1, delta * 4);
    g.rotation.z += (targetZ - g.rotation.z) * Math.min(1, delta * 4);

    g.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.07;
    g.scale.setScalar(1 - p * 0.24);

    // Separação das camadas conforme a seção fixada avança.
    if (die.current) {
      die.current.position.y = 0.17 + p * 0.85;
      die.current.rotation.y = -p * 1.2;
    }
    if (traces.current) {
      traces.current.position.y = p * 0.3;
      for (const child of traces.current.children) {
        const material = (child as unknown as { material: MeshStandardMaterial })
          .material;
        if (material) material.emissiveIntensity = 1.1 + p * 2.4;
      }
    }
  });

  return (
    <group ref={group} rotation={[REST_TILT, 0.6, 0]}>
      {/* Encapsulamento */}
      <RoundedBox args={[3, 0.22, 3]} radius={0.05} smoothness={4}>
        <meshStandardMaterial color="#1a1424" metalness={0.85} roughness={0.32} />
      </RoundedBox>

      <group ref={die}>
        {/* Borda acesa que aparece como um fio em volta do die */}
        <RoundedBox
          args={[1.94, 0.08, 1.94]}
          radius={0.02}
          smoothness={4}
          position={[0, -0.05, 0]}
        >
          <meshStandardMaterial
            color={ACCENT}
            emissive={ACCENT}
            emissiveIntensity={1.6}
            toneMapped={false}
          />
        </RoundedBox>

        {/* Die espelhado */}
        <RoundedBox args={[1.8, 0.1, 1.8]} radius={0.015} smoothness={4}>
          <meshStandardMaterial color="#cdc6dc" metalness={0.7} roughness={0.22} />
        </RoundedBox>
      </group>

      <group ref={traces}>
        <Traces />
      </group>
      <Pins />
    </group>
  );
}

/** Trilhas curtas ligando o die às bordas do encapsulamento. */
function Traces() {
  const traces = [];
  const offsets = [-0.62, -0.2, 0.22, 0.64];

  for (const offset of offsets) {
    const material = (
      <meshStandardMaterial
        color={ACCENT}
        emissive={ACCENT}
        emissiveIntensity={1.1}
        toneMapped={false}
      />
    );
    traces.push(
      <mesh key={`n${offset}`} position={[offset, 0.115, 1.22]}>
        <boxGeometry args={[0.05, 0.02, 0.44]} />
        {material}
      </mesh>,
      <mesh key={`s${offset}`} position={[offset, 0.115, -1.22]}>
        <boxGeometry args={[0.05, 0.02, 0.44]} />
        {material}
      </mesh>,
      <mesh key={`e${offset}`} position={[1.22, 0.115, offset]}>
        <boxGeometry args={[0.44, 0.02, 0.05]} />
        {material}
      </mesh>,
      <mesh key={`w${offset}`} position={[-1.22, 0.115, offset]}>
        <boxGeometry args={[0.44, 0.02, 0.05]} />
        {material}
      </mesh>,
    );
  }

  return <>{traces}</>;
}

/** Fileiras de contatos nas quatro laterais. */
function Pins() {
  const count = 11;
  const step = 2.4 / (count - 1);
  const pins = [];

  for (let i = 0; i < count; i++) {
    const offset = -1.2 + i * step;
    pins.push(
      <mesh key={`n${i}`} position={[offset, -0.02, 1.54]}>
        <boxGeometry args={[0.1, 0.06, 0.16]} />
        <meshStandardMaterial color="#bdb5cc" metalness={0.75} roughness={0.3} />
      </mesh>,
      <mesh key={`s${i}`} position={[offset, -0.02, -1.54]}>
        <boxGeometry args={[0.1, 0.06, 0.16]} />
        <meshStandardMaterial color="#bdb5cc" metalness={0.75} roughness={0.3} />
      </mesh>,
      <mesh key={`e${i}`} position={[1.54, -0.02, offset]}>
        <boxGeometry args={[0.16, 0.06, 0.1]} />
        <meshStandardMaterial color="#bdb5cc" metalness={0.75} roughness={0.3} />
      </mesh>,
      <mesh key={`w${i}`} position={[-1.54, -0.02, offset]}>
        <boxGeometry args={[0.16, 0.06, 0.1]} />
        <meshStandardMaterial color="#bdb5cc" metalness={0.75} roughness={0.3} />
      </mesh>,
    );
  }

  return <>{pins}</>;
}
