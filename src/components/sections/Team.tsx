import { arcPath } from "@/components/brand/Arc";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { team, type Member } from "@/content/site";

const RING_COLORS = ["#03DDB3", "#00B894", "#007E8D"];

function initials(name: string) {
  return name
    .replace(/^(Profa?\.|Dra?\.)\s*/i, "")
    .split(/\s+/)
    .filter((w) => w.length > 2)
    .slice(0, 2)
    .map((w) => w[0])
    .join("");
}

function Avatar({ member, index }: { member: Member; index: number }) {
  const color = RING_COLORS[index % RING_COLORS.length];
  return (
    <div className="group relative mx-auto aspect-square w-full max-w-44">
      {/* anel em arco (módulo base) que gira no hover */}
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 transition-transform duration-[1.2s] ease-[var(--ease-flua)] group-hover:rotate-[200deg]"
        aria-hidden
      >
        <path d={arcPath(50, 50, 46, 200, 340)} fill="none" stroke={color} strokeWidth={6} />
        <path d={arcPath(50, 50, 46, 20, 80)} fill="none" stroke={color} strokeWidth={6} opacity={0.4} />
      </svg>
      <div className="absolute inset-[12%] grid place-items-center overflow-hidden rounded-full bg-mint">
        {member.photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={member.photo} alt="" className="size-full object-cover" />
        ) : (
          <span className="text-3xl font-bold text-seaweed/70">{member.pending ? "" : initials(member.name)}</span>
        )}
      </div>
    </div>
  );
}

export function Team() {
  return (
    <section aria-labelledby="equipe-title" className="py-20 md:py-28">
      <div className="container-flua">
        <SectionHeading id="equipe-title" eyebrow={team.eyebrow} title={team.title} lead={team.lead} />
        <ul className="mt-14 grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 lg:grid-cols-6">
          {team.members.map((m, i) => (
            <Reveal as="li" key={i} delay={(i % 6) * 0.06} className="text-center">
                <Avatar member={m} index={i} />
                <p className={`mt-5 font-semibold ${m.pending ? "text-ink-soft/60" : ""}`}>
                  {m.pending ? <span className="pending">{m.name}</span> : m.name}
                </p>
                <p className="mt-1 text-sm text-ink-soft">{m.role}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
