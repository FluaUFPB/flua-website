"use client";

import { useEffect, useState } from "react";

/** Sumário fixo que acompanha a leitura: o item ativo ganha o arco do módulo base. */
export function Toc({ items }: { items: { id: string; title: string }[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -70% 0px" },
    );
    items.forEach((it) => {
      const el = document.getElementById(it.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [items]);

  return (
    <nav aria-label="Nesta página" className="lg:sticky lg:top-28">
      <p className="eyebrow">Nesta página</p>
      <ol className="mt-5 grid gap-1 border-l-2 border-mint-strong">
        {items.map((it) => {
          const on = it.id === active;
          return (
            <li key={it.id}>
              <a
                href={`#${it.id}`}
                aria-current={on ? "location" : undefined}
                className={`-ml-0.5 block border-l-2 py-2 pl-4 transition-colors ${
                  on ? "border-caribbean font-semibold text-seaweed" : "border-transparent text-ink-soft hover:text-seaweed"
                }`}
              >
                {it.title}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
