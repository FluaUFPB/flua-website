import Link from "next/link";
import { LivePattern } from "@/components/brand/LivePattern";
import { Logo } from "@/components/brand/Logo";
import { FooterWave } from "@/components/layout/FooterWave";
import { areaProfissional, nav, site } from "@/content/site";

/**
 * Halo da cor do rodapé atrás de cada bloco de texto: o pattern vivo some onde há algo
 * para ler e aparece nos espaços vazios.
 */
function Halo() {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute -inset-x-10 -inset-y-8 -z-10 rounded-[3rem] bg-seaweed blur-2xl"
    />
  );
}

export function Footer() {
  const { contact } = site;
  return (
    <footer className="relative mt-24 text-white">
      <FooterWave />
      <div className="relative overflow-hidden bg-seaweed">
        {/* pattern vivo no rodapé inteiro, em degradê de cima (quase invisível) para baixo */}
        <LivePattern
          tone="seaweed"
          cols={36}
          rows={10}
          minOpacity={0.25}
          className="pointer-events-none absolute inset-0 h-full w-full opacity-40 [mask-image:linear-gradient(180deg,transparent_0%,rgba(0,0,0,0.25)_30%,rgba(0,0,0,0.7)_70%,#000_100%)]"
        />
        <div className="container-flua relative grid gap-14 pt-10 pb-16 md:grid-cols-12">
          <div className="relative isolate self-start md:col-span-5">
            <Halo />
            <Logo tone="white" className="h-auto w-56" />
            <p className="mt-6 max-w-sm leading-relaxed font-light text-white/85">
              Projeto de extensão, ensino e pesquisa do {site.department.split(" · ")[0]} da{" "}
              {site.institution}.
            </p>
          </div>

          <nav aria-label="Rodapé" className="relative isolate self-start md:col-span-3">
            <Halo />
            <p className="text-xs font-bold tracking-[0.3em] text-caribbean uppercase">Navegue</p>
            <ul className="mt-5 grid gap-2.5">
              {[...nav, areaProfissional].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-white/90 transition-colors hover:text-caribbean">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="relative isolate self-start md:col-span-4">
            <Halo />
            <p className="text-xs font-bold tracking-[0.3em] text-caribbean uppercase">Onde estamos</p>
            <address className="mt-5 leading-relaxed text-white/90 not-italic">
              {contact.address.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
            <a
              href={contact.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-block font-semibold text-caribbean underline-offset-4 hover:underline"
            >
              Ver no mapa
            </a>

            <p className="mt-8 text-xs font-bold tracking-[0.3em] text-caribbean uppercase">Contato</p>
            <ul className="mt-5 grid gap-2.5 text-white/90">
              <li>
                <a href={`tel:${contact.phone.replace(/\D/g, "")}`} className="hover:text-caribbean">
                  {contact.phone}
                </a>
              </li>
              <li>
                <a href={contact.instagram.url} target="_blank" rel="noreferrer" className="hover:text-caribbean">
                  Instagram {contact.instagram.handle}
                </a>
              </li>
              <li className="text-white/60">
                E-mail e WhatsApp: <span className="pending text-white/80">a confirmar</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="container-flua relative">
          <div className="flex flex-col gap-2 border-t border-white/15 py-6 text-sm text-white/70 md:flex-row md:justify-between">
            <p className="relative isolate">
              <Halo />© {new Date().getFullYear()} {site.name} · {site.institution}
            </p>
            <p className="relative isolate">
              <Halo />
              Fluindo desde {site.since}.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
