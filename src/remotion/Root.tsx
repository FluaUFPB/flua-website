import { loadFont } from "@remotion/google-fonts/Poppins";
import { Composition, Folder } from "remotion";
import { FluencyWave } from "./FluencyWave";
import { FLUENCY_DURATION, FLUENCY_SIZE } from "./FluencyWave.meta";
import { HeroElo } from "./HeroElo";
import { HERO_DURATION, HERO_SIZES } from "./HeroElo.meta";
import { IaTranscript } from "./IaTranscript";
import { IA_DURATION, IA_SIZE } from "./IaTranscript.meta";
import { C, FPS } from "./theme";

// Só no Studio: no site, a Poppins vem do next/font.
const { fontFamily } = loadFont("normal", {
  weights: ["300", "400", "600", "700"],
  subsets: ["latin", "latin-ext"],
});
if (typeof document !== "undefined") {
  document.documentElement.style.setProperty("--font-poppins", fontFamily);
}

/** Registro das composições para o Remotion Studio (`npm run remotion`). O site usa o Player. */
export const RemotionRoot: React.FC = () => (
  <Folder name="FLUA">
    <Composition id="HeroDesktop" component={HeroElo} durationInFrames={HERO_DURATION} fps={FPS} {...HERO_SIZES.desktop} />
    <Composition id="HeroMobile" component={HeroElo} durationInFrames={HERO_DURATION} fps={FPS} {...HERO_SIZES.mobile} />
    <Composition
      id="FluencyWave"
      component={FluencyWave}
      durationInFrames={FLUENCY_DURATION}
      fps={FPS}
      {...FLUENCY_SIZE}
      defaultProps={{ background: C.seaweed }}
    />
    <Composition id="IaTranscript" component={IaTranscript} durationInFrames={IA_DURATION} fps={FPS} {...IA_SIZE} />
  </Folder>
);
