"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react";

type RevealProps = HTMLMotionProps<"div"> & {
  delay?: number;
  /** Distância do deslocamento inicial em px */
  y?: number;
  /** Renderiza como <li> para manter listas semânticas */
  as?: "div" | "li";
};

/** Entrada suave ao aparecer na tela, com a curva de easing da marca. */
export function Reveal({ delay = 0, y = 28, as = "div", children, ...rest }: RevealProps) {
  const reduced = useReducedMotion();
  const anim = {
    initial: reduced ? false : { opacity: 0, y },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "0px 0px -12% 0px" },
    transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] as const },
  } as const;
  if (as === "li") {
    return (
      <motion.li {...anim} {...(rest as HTMLMotionProps<"li">)}>
        {children}
      </motion.li>
    );
  }
  return (
    <motion.div {...anim} {...rest}>
      {children}
    </motion.div>
  );
}
