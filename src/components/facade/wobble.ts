/**
 * Ruído determinístico para desalinhar o traço.
 *
 * Precisa ser determinístico: com Math.random o servidor e o cliente
 * desenhariam paredes diferentes e o React acusaria divergência de
 * hidratação. A mesma semente sempre devolve o mesmo desvio.
 */
export function wobble(seed: number, amplitude = 2) {
  const value = Math.sin(seed * 12.9898) * 43758.5453;
  return (value - Math.floor(value) - 0.5) * 2 * amplitude;
}
