export const C = {
  white: "#FFFFFF",
  caribbean: "#03DDB3",
  meadow: "#00B894",
  seaweed: "#007E8D",
  seaweedDeep: "#006470",
  mint: "#E8FBF6",
  ink: "#17292C",
  inkSoft: "#4A5D60",
} as const;

/** No site, usa a Poppins carregada pelo next/font; no Studio, cai para a Poppins instalada ou sans-serif. */
export const FONT = "var(--font-poppins), Poppins, ui-sans-serif, system-ui, sans-serif";

export const FPS = 30;

/** Curva de easing da marca (a mesma do CSS: --ease-flua) */
export const EASE_FLUA = [0.16, 1, 0.3, 1] as const;
