import type { PillarId } from "./paths";

/**
 * Versão "em traço" do logo e dos símbolos: a linha central de cada forma oficial
 * (derivada dos paths de `paths.ts`). Com `stroke-width` igual à espessura original
 * e `stroke-linecap="butt"`, o resultado é idêntico ao preenchido, mas permite
 * animar o desenho (evolvePath / pathLength), como se a marca fosse escrita.
 */

export type Stroke = { d: string; color?: string; width?: number };

/** Espessura do traço do logo (em unidades do LOGO_VERTICAL). */
export const LOGO_STROKE = 4.94;

/** Letras no sistema de coordenadas do LOGO_VERTICAL (mesma posição dos paths). */
export const LOGO_LETTER_STROKES: readonly (readonly Stroke[])[] = [
  // F
  [
    { d: "M32.04 2.47A19.06 19.06 0 0 0 12.98 21.53L12.98 38.02" },
    { d: "M15.46 22.25L22.35 22.25" },
  ],
  // L
  [{ d: "M47.62 0L47.62 16.5A19.06 19.06 0 0 0 66.68 35.56" }],
  // U
  [
    {
      d: "M78.67 0L78.67 16.5A19.06 19.06 0 0 0 97.73 35.56A19.06 19.06 0 0 0 116.79 16.5L116.79 0",
    },
  ],
  // A
  [
    {
      d: "M132.36 38.02L132.36 21.53A19.06 19.06 0 0 1 151.42 2.47A19.06 19.06 0 0 1 170.48 21.53L170.48 38.02",
    },
    { d: "M134.83 22.25L168 22.25" },
  ],
];

/** Centro geométrico das letras do logo (para compor o "elo" antes de virar FLUA). */
export const LOGO_LETTERS_BOX = { x: 10.52, y: 0, width: 162.42, height: 38.02 };

const PILLAR_STROKE = 3.94;

/** Símbolos dos pilares, no sistema de coordenadas do círculo (94.92 × 94.92). */
export const PILLAR_STROKES: Record<PillarId, readonly Stroke[]> = {
  equipe: [
    { d: "M62.64 25.21A15.18 15.18 0 0 0 47.46 40.39", color: "#007E8D" },
    { d: "M47.46 40.39L47.46 45.88", color: "#FFFFFF" },
    { d: "M47.46 49.04L47.46 54.53", color: "#007E8D" },
    { d: "M47.46 54.53A15.18 15.18 0 0 1 32.28 69.71", color: "#FFFFFF" },
  ],
  contentamento: [
    {
      d: "M32.28 42.97A15.18 15.18 0 0 0 47.46 58.15A15.18 15.18 0 0 0 62.64 42.97",
      color: "#FFFFFF",
    },
  ],
  crescimento: [
    {
      d: "M33.48 38.45A9.01 9.01 0 0 0 24.47 47.46A9.01 9.01 0 0 0 33.48 56.47",
      color: "#FFFFFF",
      width: 2.34,
    },
    {
      d: "M50.55 35.82A11.64 11.64 0 0 0 38.91 47.46A11.64 11.64 0 0 0 50.55 59.1",
      color: "#00B894",
      width: 3.02,
    },
    {
      d: "M71.62 32.28A15.18 15.18 0 0 0 56.44 47.46A15.18 15.18 0 0 0 71.62 62.64",
      color: "#03DDB3",
    },
  ],
};

export const PILLAR_STROKE_WIDTH = PILLAR_STROKE;
