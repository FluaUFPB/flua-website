import { FPS } from "./theme";

export const FLUENCY_SIZE = { width: 1280, height: 720 } as const;
export const FLUENCY_SCENE = 4 * FPS;
export const FLUENCY_SCENE_COUNT = 4;
export const FLUENCY_DURATION = FLUENCY_SCENE * FLUENCY_SCENE_COUNT;
