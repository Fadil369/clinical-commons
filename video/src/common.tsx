import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { noise2D } from "@remotion/noise";
import { AR, C, DISPLAY, EN } from "./theme";

// Cover gradient with three soft light pools drifting on noise, plus a faint dot field.
export const Background: React.FC = () => {
  const f = useCurrentFrame();
  const pools = [
    { seed: "a", x: 0.2, y: 0.25, r: 900, color: "rgba(56, 189, 248, 0.20)" },
    { seed: "b", x: 0.85, y: 0.55, r: 1100, color: "rgba(29, 74, 138, 0.55)" },
    { seed: "c", x: 0.4, y: 0.9, r: 800, color: "rgba(207, 227, 247, 0.10)" },
  ];
  return (
    <AbsoluteFill style={{ background: `linear-gradient(160deg, ${C.navy} 0%, ${C.deep} 55%, ${C.blue} 100%)`, overflow: "hidden" }}>
      {pools.map((p) => {
        const dx = noise2D(p.seed, f / 240, 0) * 160;
        const dy = noise2D(p.seed, 0, f / 240) * 160;
        return (
          <div key={p.seed} style={{ position: "absolute", width: p.r, height: p.r, left: p.x * 1080 - p.r / 2 + dx, top: p.y * 1920 - p.r / 2 + dy,
            borderRadius: "50%", background: `radial-gradient(circle, ${p.color} 0%, transparent 70%)` }} />
        );
      })}
      <AbsoluteFill style={{ backgroundImage: `radial-gradient(${C.line} 1.2px, transparent 1.2px)`, backgroundSize: "48px 48px",
        opacity: 0.35, maskImage: "linear-gradient(180deg, transparent, black 30%, black 70%, transparent)" }} />
    </AbsoluteFill>
  );
};

// 0 → 1 entrance driven by a soft spring, starting at `delay` frames into the scene.
export const useEnter = (delay = 0, damping = 18) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({ frame: f - delay, fps, config: { damping, mass: 0.9 } });
};

// Arabic line first (right-to-left), English under it.
export const Bi: React.FC<{ ar: string; en: string; size?: number; delay?: number; align?: "center" | "right"; display?: boolean; color?: string }> = ({
  ar, en, size = 64, delay = 0, align = "center", display = false, color = C.ink,
}) => {
  const a = useEnter(delay);
  const b = useEnter(delay + 6);
  const rise = (v: number) => ({ opacity: v, transform: `translateY(${interpolate(v, [0, 1], [28, 0])}px)` });
  return (
    <div style={{ textAlign: align, display: "flex", flexDirection: "column", gap: size * 0.28 }}>
      <div dir="rtl" lang="ar" style={{ fontFamily: AR, fontWeight: 600, fontSize: size, lineHeight: 1.45, color, ...rise(a) }}>{ar}</div>
      <div lang="en" style={{ fontFamily: display ? DISPLAY : EN, fontWeight: display ? 700 : 500, fontSize: display ? size * 0.92 : size * 0.6,
        lineHeight: 1.3, color: display ? color : C.pale, letterSpacing: display ? "0.01em" : "0", ...rise(b) }}>{en}</div>
    </div>
  );
};

export const Kicker: React.FC<{ ar: string; en: string; delay?: number }> = ({ ar, en, delay = 0 }) => {
  const v = useEnter(delay);
  return (
    <div style={{ opacity: v, display: "flex", justifyContent: "center", gap: 18, alignItems: "center", color: C.cyan, fontSize: 30, letterSpacing: "0.18em" }}>
      <span style={{ fontFamily: EN, fontWeight: 600, textTransform: "uppercase" }}>{en}</span>
      <span style={{ width: 8, height: 8, borderRadius: 4, background: C.cyan }} />
      <span dir="rtl" style={{ fontFamily: AR, fontWeight: 600, letterSpacing: 0 }}>{ar}</span>
    </div>
  );
};

export const Frame: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <AbsoluteFill style={{ padding: "180px 90px", display: "flex", flexDirection: "column", justifyContent: "center", gap: 70 }}>{children}</AbsoluteFill>
);

// ---- v2 additions: camera drift, chapter bar, icon badges, animated rows ----

// Slow push-in and drift, so every chapter feels filmed rather than static.
export const Camera: React.FC<{ children: React.ReactNode; dur: number; drift?: number }> = ({ children, dur, drift = 1 }) => {
  const f = useCurrentFrame();
  const p = interpolate(f, [0, dur], [0, 1], { extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ transform: `scale(${1.045 - 0.045 * p}) translateY(${(1 - p) * 18 * drift}px)` }}>{children}</AbsoluteFill>
  );
};

export type Chapter = { ar: string; en: string; start: number };

// Thin segmented progress bar with the current chapter's name; hidden during the opening hook.
export const ChapterBar: React.FC<{ chapters: Chapter[]; total: number }> = ({ chapters, total }) => {
  const f = useCurrentFrame();
  const cur = chapters.reduce((k, c, i) => (f >= c.start ? i : k), -1);
  const show = interpolate(f, [chapters[0].start - 10, chapters[0].start + 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  if (cur < 0) return null;
  const c = chapters[Math.max(cur, 0)];
  const end = cur + 1 < chapters.length ? chapters[cur + 1].start : total;
  const fill = interpolate(f, [c.start, end], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ opacity: show, padding: "70px 90px 0", flexDirection: "column", gap: 22 }}>
      <div style={{ display: "flex", flexDirection: "row-reverse", gap: 10 }}>
        {chapters.map((_, i) => (
          <div key={i} style={{ flex: 1, height: 6, borderRadius: 3, background: C.line, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${i < cur ? 100 : i === cur ? fill * 100 : 0}%`, background: C.cyan, marginInlineStart: "auto" }} />
          </div>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", color: C.pale }}>
        <span style={{ fontFamily: EN, fontSize: 26, fontWeight: 500, letterSpacing: "0.08em" }}>{String(Math.max(cur, 0) + 1).padStart(2, "0")} · {c.en}</span>
        <span dir="rtl" style={{ fontFamily: AR, fontSize: 30, fontWeight: 600 }}>{c.ar}</span>
      </div>
    </AbsoluteFill>
  );
};

// Round icon badge that pops in.
export const Badge: React.FC<{ icon: React.ComponentType<{ size?: number; color?: string; strokeWidth?: number }>; delay?: number; size?: number; color?: string; ring?: boolean }> = ({
  icon: Icon, delay = 0, size = 120, color = C.cyan, ring = true,
}) => {
  const v = useEnter(delay, 12);
  return (
    <div style={{ width: size, height: size, borderRadius: size / 2, display: "grid", placeItems: "center", flex: "none",
      background: ring ? "rgba(56,189,248,0.10)" : "transparent", border: ring ? `2px solid ${color}` : "none",
      transform: `scale(${interpolate(v, [0, 1], [0.4, 1])})`, opacity: Math.min(1, v * 1.4) }}>
      <Icon size={size * 0.5} color={color} strokeWidth={1.6} />
    </div>
  );
};

// One animated row: icon on the reading-start side (right), Arabic title, English under it, optional detail lines.
export const Row: React.FC<{ icon?: React.ComponentType<{ size?: number; color?: string; strokeWidth?: number }>; ar: string; en: string; arSub?: string; enSub?: string;
  delay?: number; from?: "side" | "below"; size?: number; card?: boolean }> = ({ icon, ar, en, arSub, enSub, delay = 0, from = "side", size = 42, card = false }) => {
  const v = useEnter(delay);
  const move = from === "side" ? `translateX(${interpolate(v, [0, 1], [-70, 0])}px)` : `translateY(${interpolate(v, [0, 1], [50, 0])}px)`;
  return (
    <div style={{ display: "flex", flexDirection: "row-reverse", gap: 28, alignItems: "center", opacity: v, transform: move,
      ...(card ? { padding: "24px 30px", borderRadius: 26, background: C.glass, border: `1.5px solid ${C.line}` } : {}) }}>
      {icon && <Badge icon={icon} delay={delay} size={size * 2.2} />}
      <div style={{ textAlign: "right", flex: 1, minWidth: 0 }}>
        <div dir="rtl" style={{ fontFamily: AR, fontWeight: 600, fontSize: size, color: C.ink, lineHeight: 1.4 }}>{ar}</div>
        {arSub && <div dir="rtl" style={{ fontFamily: AR, fontWeight: 400, fontSize: size * 0.78, color: C.pale, lineHeight: 1.45 }}>{arSub}</div>}
        <div style={{ fontFamily: EN, fontWeight: 600, fontSize: size * 0.66, color: C.pale, lineHeight: 1.35, marginTop: 4 }}>{en}</div>
        {enSub && <div style={{ fontFamily: EN, fontSize: size * 0.6, color: C.muted, lineHeight: 1.35 }}>{enSub}</div>}
      </div>
    </div>
  );
};
