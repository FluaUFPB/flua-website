import { LOGO_HORIZONTAL, LOGO_VERTICAL } from "./paths";

type LogoProps = {
  /** Vertical é a assinatura preferencial do manual; horizontal para espaços estreitos (header). */
  orientation?: "vertical" | "horizontal";
  /** Variações permitidas pelo manual (seção 4). */
  tone?: "color" | "white" | "black";
  className?: string;
  title?: string;
};

const TONES = {
  color: { letters: "#03DDB3", tagline: "#007E8D" },
  white: { letters: "#FFFFFF", tagline: "#FFFFFF" },
  black: { letters: "#000000", tagline: "#000000" },
} as const;

/**
 * Logotipo oficial com tagline. O manual proíbe usar o logo sem a tagline,
 * trocar cores, distorcer ou inverter a ordem, então este componente não expõe essas opções.
 */
export function Logo({
  orientation = "vertical",
  tone = "color",
  className,
  title = "FLUA: Atuação Fonoaudiológica em Fluência",
}: LogoProps) {
  const g = orientation === "vertical" ? LOGO_VERTICAL : LOGO_HORIZONTAL;
  const c = TONES[tone];
  return (
    <svg
      viewBox={`0 0 ${g.width} ${g.height}`}
      className={className}
      role="img"
      aria-label={title}
      preserveAspectRatio="xMidYMid meet"
    >
      <g fill={c.letters}>
        {g.letters.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </g>
      <path fill={c.tagline} d={g.tagline} />
    </svg>
  );
}
