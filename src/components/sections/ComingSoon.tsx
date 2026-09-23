import Link from "next/link";
import { LivePattern } from "@/components/brand/LivePattern";
import { Reveal } from "@/components/ui/Reveal";
import { PageHero } from "./PageHero";

type ComingSoonProps = {
  eyebrow: string;
  title: string;
  lead: string;
  items?: string[];
  note?: string;
};

/** Páginas da Fase 2/3: já existem na navegação, com a identidade e uma explicação do que vem. */
export function ComingSoon({ eyebrow, title, lead, items, note }: ComingSoonProps) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} lead={lead} />
      <section className="container-flua py-12 md:py-16">
        <Reveal>
          <div className="relative overflow-hidden rounded-frame bg-seaweed p-8 text-white md:p-14">
            <LivePattern
              tone="seaweed"
              cols={18}
              rows={8}
              minOpacity={0.15}
              className="absolute inset-0 h-full w-full opacity-30"
            />
            <div className="relative max-w-2xl">
              <span className="inline-flex rounded-full bg-white/15 px-4 py-1.5 text-sm font-semibold text-caribbean">
                Em breve
              </span>
              {items && (
                <ul className="mt-8 grid gap-4 text-lg">
                  {items.map((it) => (
                    <li key={it} className="flex items-start gap-4">
                      <svg viewBox="0 0 24 24" className="mt-1 size-5 shrink-0" aria-hidden>
                        <path d="M4 8A8 8 0 0 0 20 8" fill="none" stroke="#03DDB3" strokeWidth="4" />
                      </svg>
                      {it}
                    </li>
                  ))}
                </ul>
              )}
              {note && <p className="mt-8 font-light text-white/80">{note}</p>}
              <Link
                href="/"
                className="mt-10 inline-flex rounded-full bg-white px-6 py-3 font-semibold text-seaweed transition-transform hover:-translate-y-0.5"
              >
                Voltar para o início
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
