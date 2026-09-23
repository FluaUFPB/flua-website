import { useCurrentFrame, useVideoConfig } from "remotion";
import { FluencyFrame } from "./FluencyWave.frame";

/** Composição "A fala que flui" (o desenho de cada frame está em FluencyWave.frame.tsx). */
export const FluencyWave: React.FC<{ background?: string }> = ({ background }) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  return <FluencyFrame frame={frame} width={width} height={height} background={background} />;
};

export default FluencyWave;
