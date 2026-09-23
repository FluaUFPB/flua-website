import { Reveal } from "./Reveal";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  lead?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
  id?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  tone = "light",
  id,
}: SectionHeadingProps) {
  const center = align === "center";
  const dark = tone === "dark";
  return (
    <Reveal className={center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <p className={`eyebrow flex items-center gap-3 ${center ? "justify-center" : ""} ${dark ? "!text-caribbean" : ""}`}>
        <span aria-hidden className="inline-block h-[3px] w-8 bg-current" />
        {eyebrow}
      </p>
      <h2 id={id} className={`title mt-5 ${dark ? "text-white" : "text-ink"}`}>
        {title}
      </h2>
      {lead && <p className={`lead mt-5 ${dark ? "!text-white/80" : ""}`}>{lead}</p>}
    </Reveal>
  );
}
