import { useCurrentFrame, useVideoConfig } from "remotion";
import { HeroFrame } from "./HeroElo.frame";

/** Composição do hero (o desenho de cada frame está em HeroElo.frame.tsx). */
export const HeroElo: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  return <HeroFrame frame={frame} width={width} height={height} />;
};

export default HeroElo;
