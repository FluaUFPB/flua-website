import { useCurrentFrame, useVideoConfig } from "remotion";
import { IaFrame } from "./IaTranscript.frame";

/** Composição da ferramenta de IA (o desenho de cada frame está em IaTranscript.frame.tsx). */
export const IaTranscript: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  return <IaFrame frame={frame} width={width} height={height} />;
};

export default IaTranscript;
