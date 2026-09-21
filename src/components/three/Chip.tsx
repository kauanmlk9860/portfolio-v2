"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import type { Group } from "three";

const ACCENT = "#a855f7";
const REST_TILT = -0.12;

/**
 * Chip de silício: encapsulamento metálico escuro, die espelhado no centro e
 * trilhas emissivas finas. Gira sozinho, adianta a volta conforme o scroll e
 * inclina de leve com o ponteiro — o vocabulário das páginas de produto da
 * Apple, onde a peça flutua e responde ao movimento.
 *
 * O brilho fica restrito às trilhas: quando a face inteira emite, o objeto
 * perde o relevo e vira uma placa chapada.
 */
export function Chip({
  scrollRef,
  pointerRef,
  reducedMotion,
}: {
  scrollRef: React.RefObject<number>;
  pointerRef: React.RefObject<{ x: number; y: number }>;
  reducedMotion: boolean;
}) {
  const group = useRef<Group>(null);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;

    if (reducedMotion) {
      g.rotation.set(REST_TILT, 0.6, 0);
      g.position.y = 0;
      return;
    }

    g.rotation.y += delta * 0.25;
    g.rotation.y += scrollRef.current * 0.015;

    const targetX = REST_TILT + pointerRef.current.y * 0.2;
    const targetZ = pointerRef.current.x * -0.12;
    g.rotation.x += (targetX - g.rotation.x) * Math.min(1, delta * 3);
    g.rotation.z += (targetZ - g.rotation.z) * Math.min(1, delta * 3);

    g.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.07;
  });

  return (
    <group ref={group} rotation={[REST_TILT, 0.6, 0]}>
      {/* Encapsulamento */}
      <RoundedBox args={[3, 0.22, 3]} radius={0.05} smoothness={4}>
        <meshStandardMaterial
          color="#1a1424"
          metalness={0.85}
          roughness={0.32}
        />
      </RoundedBox>

      {/* Borda acesa que aparece como um fio em volta do die */}
      <RoundedBox
        args={[1.94, 0.08, 1.94]}
        radius={0.02}
        smoothness={4}
        position={[0, 0.12, 0]}
      >
        <meshStandardMaterial
          color={ACCENT}
          emissive={ACCENT}
          emissiveIntensity={1.6}
          toneMapped={false}
        />
      </RoundedBox>

      {/* Die espelhado */}
      <RoundedBox
        args={[1.8, 0.1, 1.8]}
        radius={0.015}
        smoothness={4}
        position={[0, 0.17, 0]}
      >
        <meshStandardMaterial
          color="#cdc6dc"
          metalness={0.7}
          roughness={0.22}
        />
      </RoundedBox>

      <Traces />
      <Pins />
    </group>
  );
}

/** Trilhas curtas ligando o die às bordas do encapsulamento. */
function Traces() {
  const traces = [];
  const offsets = [-0.62, -0.2, 0.22, 0.64];

  for (const offset of offsets) {
    traces.push(
      <mesh key={`n${offset}`} position={[offset, 0.115, 1.22]}>
        <boxGeometry args={[0.05, 0.02, 0.44]} />
        <meshStandardMaterial
          color={ACCENT}
          emissive={ACCENT}
          emissiveIntensity={1.1}
          toneMapped={false}
        />
      </mesh>,
      <mesh key={`s${offset}`} position={[offset, 0.115, -1.22]}>
        <boxGeometry args={[0.05, 0.02, 0.44]} />
        <meshStandardMaterial
          color={ACCENT}
          emissive={ACCENT}
          emissiveIntensity={1.1}
          toneMapped={false}
        />
      </mesh>,
      <mesh key={`e${offset}`} position={[1.22, 0.115, offset]}>
        <boxGeometry args={[0.44, 0.02, 0.05]} />
        <meshStandardMaterial
          color={ACCENT}
          emissive={ACCENT}
          emissiveIntensity={1.1}
          toneMapped={false}
        />
      </mesh>,
      <mesh key={`w${offset}`} position={[-1.22, 0.115, offset]}>
        <boxGeometry args={[0.44, 0.02, 0.05]} />
        <meshStandardMaterial
          color={ACCENT}
          emissive={ACCENT}
          emissiveIntensity={1.1}
          toneMapped={false}
        />
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
