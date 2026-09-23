import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { faq, type Faq } from "@/content/site";

export function FaqList({ items }: { items: Faq[] }) {
  return (
    <div className="divide-y divide-mint-strong border-y border-mint-strong">
      {items.map((item) => (
        <details key={item.q} className="group py-2 [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 rounded-xl py-5 text-lg font-semibold md:text-xl">
            {item.q}
            {/* "+" feito com o traço do módulo base; gira e vira "−" */}
            <span className="relative grid size-10 shrink-0 place-items-center rounded-full bg-mint text-seaweed transition-colors group-open:bg-seaweed group-open:text-white">
              <svg viewBox="0 0 20 20" className="size-4 transition-transform duration-500 ease-[var(--ease-flua)] group-open:rotate-180" aria-hidden>
                <path d="M2 10H18" stroke="currentColor" strokeWidth="3" />
                <path d="M10 2V18" stroke="currentColor" strokeWidth="3" className="origin-center transition-transform duration-500 group-open:scale-y-0" />
              </svg>
            </span>
          </summary>
          <p className="max-w-3xl pb-6 leading-relaxed text-ink-soft">
            {item.pending ? <span className="pending">{item.a}</span> : item.a}
          </p>
        </details>
      ))}
    </div>
  );
}

export function FaqSection() {
  return (
    <section aria-labelledby="faq-title" className="py-20 md:py-28">
      <div className="container-flua grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHeading id="faq-title" eyebrow={faq.eyebrow} title={faq.title} />
          <Reveal delay={0.1}>
            <Link href="/faq" className="mt-6 inline-block font-semibold text-seaweed underline-offset-4 hover:underline">
              Ver todas as perguntas →
            </Link>
          </Reveal>
        </div>
        <Reveal delay={0.1} className="lg:col-span-8">
          <FaqList items={faq.items.slice(0, 4)} />
        </Reveal>
      </div>
    </section>
  );
}
