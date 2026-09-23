import { interpolate } from "remotion/no-react";
import { easeFlua } from "@/lib/easing";
import { arcPath } from "@/components/brand/Arc";
import { FLUA_WAVE, wavePath } from "@/lib/wave";
import { IA_DURATION } from "./IaTranscript.meta";
import { C, FONT, FPS } from "./theme";

/**
 * Explicação da ferramenta de IA: um vídeo (representado só pela onda do áudio, sem imagem de paciente)
 * é analisado, a fala é transcrita, as disfluências ganham destaque e o relatório mostra as porcentagens.
 * Exemplo 100% ilustrativo.
 */

type Kind = "rep" | "pro" | "blk";
const KIND_COLOR: Record<Kind, string> = { rep: C.caribbean, pro: C.meadow, blk: C.seaweed };
const KIND_LABEL: Record<Kind, string> = { rep: "Repetições", pro: "Prolongamentos", blk: "Bloqueios" };

const TOKENS: { text: string; kind?: Kind }[] = [
  { text: "Eu eu eu", kind: "rep" },
  { text: " queria contar que no fim de semana a gente foi pra " },
  { text: "▮", kind: "blk" },
  { text: " praia, e o " },
  { text: "mmmmar", kind: "pro" },
  { text: " tava lindo. A " },
  { text: "mi-mi-minha", kind: "rep" },
  { text: " irmã também foi." },
];
/** Posição [início, fim) de cada token no texto digitado */
const SPANS = TOKENS.map((_, i) => {
  const start = TOKENS.slice(0, i).reduce((a, t) => a + t.text.length, 0);
  return [start, start + TOKENS[i].text.length] as const;
});
const TOTAL_CHARS = SPANS[SPANS.length - 1][1];

const BARS: { kind: Kind; value: number }[] = [
  { kind: "rep", value: 50 },
  { kind: "pro", value: 25 },
  { kind: "blk", value: 25 },
];

const ease = easeFlua;
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

export function IaFrame({ frame, width, height }: { frame: number; width: number; height: number }) {
  const intro = interpolate(frame, [0, 18], [0, 1], { ...clamp, easing: ease });
  const outro = interpolate(frame, [IA_DURATION - 20, IA_DURATION - 2], [1, 0], clamp);
  const o = Math.min(intro, outro);

  const scan = interpolate(frame, [20, 7 * FPS], [0, 1], clamp);
  const typed = Math.floor(interpolate(frame, [24, 7 * FPS], [0, TOTAL_CHARS], clamp));
  const barsIn = (i: number) =>
    interpolate(frame, [7.3 * FPS + i * 8, 8.6 * FPS + i * 8], [0, 1], { ...clamp, easing: ease });
  const done = interpolate(frame, [8.8 * FPS, 9.2 * FPS], [0, 1], clamp);

  const card = { x: 60, y: 50, w: width - 120, h: height - 100 };
  const waveBox = { x: card.x + 48, y: card.y + 120, w: card.w - 96, h: 110 };

  const rendered = TOKENS.map((tk, i) => {
    const [start, count] = SPANS[i];
    const visible = tk.text.slice(0, Math.max(0, Math.min(tk.text.length, typed - start)));
    if (!visible) return null;
    const complete = typed >= count;
    const k = tk.kind;
    const mark = k && complete ? interpolate(typed - count, [0, 6], [0, 1], clamp) : 0;
    return (
      <span
        key={i}
        style={
          k
            ? {
                color: C.ink,
                fontWeight: 600,
                background: `color-mix(in srgb, ${KIND_COLOR[k]} ${Math.round(mark * 28)}%, transparent)`,
                borderBottom: `4px solid color-mix(in srgb, ${KIND_COLOR[k]} ${Math.round(mark * 100)}%, transparent)`,
                borderRadius: 8,
                padding: "0 6px",
              }
            : undefined
        }
      >
        {visible}
      </span>
    );
  });

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: FONT, background: C.mint, opacity: 1 }}>
      <div
        style={{
          position: "absolute",
          left: card.x,
          top: card.y,
          width: card.w,
          height: card.h,
          background: C.white,
          borderRadius: 36,
          boxShadow: "0 30px 80px -30px rgba(0,126,141,.35)",
          opacity: o,
          translate: `0 ${(1 - intro) * 24}px`,
          overflow: "hidden",
        }}
      >
        {/* barra superior */}
        <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "30px 48px 0" }}>
          <svg width="34" height="34" viewBox="0 0 34 34">
            <path d={arcPath(17, 17, 12, -90, 270)} fill="none" stroke={C.caribbean} strokeWidth={5} />
          </svg>
          <div style={{ fontSize: 26, fontWeight: 700, color: C.ink }}>Relatório de fluência</div>
          <div
            style={{
              marginLeft: "auto",
              fontSize: 16,
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: C.seaweed,
              border: `2px solid ${C.seaweed}`,
              borderRadius: 999,
              padding: "6px 16px",
            }}
          >
            Exemplo ilustrativo
          </div>
        </div>

        {/* áudio do vídeo + cabeça de leitura */}
        <svg
          style={{ position: "absolute", left: waveBox.x - card.x, top: waveBox.y - card.y }}
          width={waveBox.w}
          height={waveBox.h}
          viewBox={`0 0 ${waveBox.w} ${waveBox.h}`}
        >
          <rect width={waveBox.w} height={waveBox.h} rx={22} fill={C.mint} />
          {[0, 1].map((layer) => (
            <path
              key={layer}
              d={wavePath({
                width: waveBox.w,
                baseline: waveBox.h / 2,
                t: layer * 2 + 0.3,
                harmonics: FLUA_WAVE.map((h) => ({ ...h, wavelength: h.wavelength / 3.2 })),
                scale: layer ? 1.2 : 1.6,
                envelope: (u) => 0.25 + 0.75 * Math.abs(Math.sin(u * 23 + layer)),
                step: 4,
              })}
              fill="none"
              stroke={layer ? C.seaweed : C.caribbean}
              strokeOpacity={layer ? 0.5 : 1}
              strokeWidth={3}
            />
          ))}
          <rect width={scan * waveBox.w} height={waveBox.h} fill={C.seaweed} opacity={0.08} />
          <rect x={scan * waveBox.w - 2} width={4} height={waveBox.h} fill={C.seaweed} />
        </svg>
        <div
          style={{
            position: "absolute",
            left: 48,
            top: waveBox.y - card.y + waveBox.h + 14,
            fontSize: 17,
            color: C.inkSoft,
            fontWeight: 400,
          }}
        >
          sessao_video.mp4 · analisando {Math.round(scan * 100)}%
        </div>

        {/* transcrição */}
        <div
          style={{
            position: "absolute",
            left: 48,
            right: 48,
            top: 330,
            fontSize: 30,
            lineHeight: 1.7,
            fontWeight: 300,
            color: C.inkSoft,
            minHeight: 160,
          }}
        >
          {rendered}
          {typed < TOTAL_CHARS && (
            <span style={{ display: "inline-block", width: 3, height: 34, background: C.seaweed, marginLeft: 3, translate: "0 6px" }} />
          )}
        </div>

        {/* relatório */}
        <div style={{ position: "absolute", left: 48, right: 48, bottom: 40, display: "flex", gap: 28 }}>
          {BARS.map((b, i) => {
            const p = barsIn(i);
            return (
              <div key={b.kind} style={{ flex: 1, opacity: p }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 19, color: C.ink, fontWeight: 600 }}>
                  <span>{KIND_LABEL[b.kind]}</span>
                  <span style={{ color: C.seaweed }}>{Math.round(b.value * p)}%</span>
                </div>
                <div style={{ height: 14, borderRadius: 999, background: C.mint, marginTop: 10, overflow: "hidden" }}>
                  <div style={{ width: `${b.value * p}%`, height: "100%", background: KIND_COLOR[b.kind], borderRadius: 999 }} />
                </div>
              </div>
            );
          })}
        </div>

        {/* selo de concluído */}
        <div
          style={{
            position: "absolute",
            right: 48,
            top: 330 - 56,
            fontSize: 18,
            fontWeight: 600,
            color: C.seaweed,
            opacity: done * o,
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <svg width="26" height="26" viewBox="0 0 26 26">
            <path d={arcPath(13, 9, 8, 160, 20)} fill="none" stroke={C.caribbean} strokeWidth={4} />
          </svg>
          4 disfluências identificadas
        </div>
      </div>
    </div>
  );
}
