"use client";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LivePattern } from "@/components/brand/LivePattern";
import { Logo } from "@/components/brand/Logo";
import { PILLAR_STROKES, PILLAR_STROKE_WIDTH } from "@/components/brand/strokes";
import { areaProfissional, nav } from "@/content/site";

const EASE = [0.16, 1, 0.3, 1] as const;
const SMILE = PILLAR_STROKES.contentamento[0];

/**
 * Cabeçalho em cápsula flutuante, sempre visível. No topo da página ele é leve e transparente;
 * ao rolar, vira uma cápsula de vidro.
 */
export function Header() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const isHome = pathname === "/";

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  // Fecha o menu ao navegar (ajuste de estado durante o render, sem effect)
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  // Trava o scroll enquanto o menu está aberto; Esc fecha
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Na home, o logo do header só aparece depois do hero (que já mostra o logo grande)
  const showLogo = !isHome || scrolled || open;
  const glass = scrolled && !open;
  const activeHref = nav.find((item) => pathname.startsWith(item.href))?.href ?? null;
  const pill = hovered ?? activeHref;

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-5 md:pt-4">
        <div
          className={`relative mx-auto flex h-16 items-center justify-between gap-4 rounded-full pr-2 pl-5 transition-[max-width,background-color,box-shadow] duration-500 md:h-[4.25rem] md:pl-7 ${
            glass
              ? "max-w-6xl bg-white/75 shadow-[0_18px_50px_-24px_rgba(0,126,141,0.45)] ring-1 ring-seaweed/10 backdrop-blur-xl backdrop-saturate-150"
              : "max-w-[76rem] bg-transparent"
          }`}
        >
          <Link
            href="/"
            aria-label="FLUA: página inicial"
            className="relative z-10 block shrink-0 transition-all duration-500"
            style={{ opacity: showLogo ? 1 : 0, translate: showLogo ? "0 0" : "0 -6px" }}
            tabIndex={showLogo ? 0 : -1}
          >
            <Logo orientation="horizontal" tone={open ? "white" : "color"} className="h-7 w-auto md:h-8" />
          </Link>

          <nav
            aria-label="Principal"
            className="absolute left-1/2 hidden -translate-x-1/2 items-center lg:flex"
            onMouseLeave={() => setHovered(null)}
          >
            {nav.map((item) => {
              const active = item.href === activeHref;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  onMouseEnter={() => setHovered(item.href)}
                  onFocus={() => setHovered(item.href)}
                  onBlur={() => setHovered(null)}
                  className={`relative rounded-full px-4 py-2 text-[0.92rem] font-semibold transition-colors duration-300 ${
                    active ? "text-seaweed" : "text-ink/80 hover:text-ink"
                  }`}
                >
                  {pill === item.href && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-mint"
                      transition={{ type: "spring", stiffness: 420, damping: 36 }}
                    />
                  )}
                  {item.label}
                  {active && (
                    <span aria-hidden className="absolute inset-x-0 -bottom-0.5 mx-auto block h-1.5 w-6">
                      <svg viewBox="28 36 39 26" className="size-full">
                        <path d={SMILE.d} fill="none" stroke="#03DDB3" strokeWidth={PILLAR_STROKE_WIDTH * 1.6} />
                      </svg>
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="relative z-10 flex items-center gap-2">
            <Link
              href={areaProfissional.href}
              className="group hidden items-center gap-2.5 rounded-full bg-seaweed py-2.5 pr-5 pl-3 text-sm font-semibold text-white shadow-[0_10px_24px_-12px_rgba(0,126,141,0.8)] transition-colors duration-300 hover:bg-seaweed-deep sm:inline-flex"
            >
              <span className="grid size-7 place-items-center rounded-full bg-white/15 transition-transform duration-500 group-hover:rotate-[360deg]">
                <svg viewBox="28 36 39 26" className="w-3.5" aria-hidden>
                  <path d={SMILE.d} fill="none" stroke="#03DDB3" strokeWidth={PILLAR_STROKE_WIDTH * 1.4} />
                </svg>
              </span>
              {areaProfissional.label}
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="menu-mobile"
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              className={`grid size-12 place-items-center rounded-full transition-colors lg:hidden ${
                open ? "bg-white/15 text-white" : "bg-mint text-seaweed"
              }`}
            >
              <svg viewBox="0 0 32 32" className="size-6" aria-hidden>
                <motion.path
                  d="M6 12H26"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  animate={open ? { d: "M9 9L23 23" } : { d: "M6 12H26" }}
                  transition={{ duration: 0.35, ease: EASE }}
                />
                <motion.path
                  d="M6 20H19"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  animate={open ? { d: "M9 23L23 9" } : { d: "M6 20H19" }}
                  transition={{ duration: 0.35, ease: EASE }}
                />
              </svg>
            </button>
          </div>

        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-mobile"
            className="fixed inset-0 z-40 overflow-hidden bg-seaweed lg:hidden"
            initial={{ clipPath: "circle(0% at calc(100% - 48px) 48px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 48px) 48px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 48px) 48px)" }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <LivePattern
              tone="seaweed"
              cols={10}
              rows={24}
              minOpacity={0.12}
              className="absolute inset-0 h-full w-full opacity-25"
            />
            <nav aria-label="Menu" className="container-flua relative flex h-full flex-col justify-center gap-2 pt-16">
              {[...nav, areaProfissional].map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.06, duration: 0.6, ease: EASE }}
                >
                  <Link
                    href={item.href}
                    className="block py-2 text-4xl font-bold tracking-tight text-white transition-colors hover:text-caribbean"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
