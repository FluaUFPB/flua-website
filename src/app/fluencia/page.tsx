import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { Toc } from "@/components/ui/Toc";
import { fluenciaPage, type Block } from "@/content/fluencia";

export const metadata: Metadata = {
  title: "Fluência e gagueira",
  description:
    "O que é fluência, o que é gagueira, como ela aparece na infância e como apoiar a criança: informação confiável do FLUA/UFPB.",
};

function Bullet() {
  return (
    <svg viewBox="0 0 20 20" className="mt-1.5 size-4 shrink-0" aria-hidden>
      <path d="M3 6A7 7 0 0 0 17 6" fill="none" stroke="#03DDB3" strokeWidth="4" />
    </svg>
  );
}

function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case "p":
      return <p>{block.text}</p>;
    case "list":
      return (
        <ul>
          {block.items.map((it, i) => (
            <li key={i} className="flex gap-3">
              <Bullet />
              <span>
                {it.title && <strong>{it.title}</strong>} {it.text}
              </span>
            </li>
          ))}
        </ul>
      );
    case "callout":
      return (
        <p className="!mt-8 rounded-card border-l-[6px] border-caribbean bg-mint p-6 text-ink md:p-8">{block.text}</p>
      );
    case "pending":
      return (
        <p className="!mt-6">
          <span className="pending">{block.text}</span>
        </p>
      );
  }
}

export default function FluenciaPage() {
  const { chapters } = fluenciaPage;
  return (
    <>
      <PageHero eyebrow={fluenciaPage.eyebrow} title={fluenciaPage.title} lead={fluenciaPage.lead} />
      <div className="container-flua grid gap-12 py-12 md:py-16 lg:grid-cols-12">
        <aside className="lg:col-span-3">
          <Toc items={chapters.map((c) => ({ id: c.id, title: c.title }))} />
        </aside>
        <article className="prose-flua lg:col-span-8 lg:col-start-5">
          <p className="!mt-0 text-sm">
            <span className="pending">{fluenciaPage.reviewNote}</span>
          </p>
          {chapters.map((c) => (
            <section key={c.id} aria-labelledby={c.id}>
              <h2 id={c.id}>{c.title}</h2>
              {c.blocks.map((b, i) => (
                <BlockView key={i} block={b} />
              ))}
            </section>
          ))}
          <div className="mt-16 flex flex-wrap gap-3">
            <Link href="/faq" className="rounded-full bg-seaweed px-6 py-3 font-semibold text-white">
              Perguntas frequentes
            </Link>
            <Link href="/institucional" className="rounded-full px-6 py-3 font-semibold text-seaweed ring-2 ring-mint-strong">
              Conheça o FLUA
            </Link>
          </div>
        </article>
      </div>
    </>
  );
}
