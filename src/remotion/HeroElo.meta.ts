import { FPS } from "./theme";

export const HERO_INTRO = Math.round(4.9 * FPS);
// Depois da intro o logo fica parado: um frame extra basta (o Player para no último frame)
export const HERO_DURATION = HERO_INTRO + 1;

export const HERO_SIZES = {
  desktop: { width: 1600, height: 380 },
  mobile: { width: 900, height: 360 },
} as const;
