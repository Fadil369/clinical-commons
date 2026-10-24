import { interpolate, useCurrentFrame } from "remotion";
import { AR, C, DISPLAY, EN } from "../theme";
import { Bi, Frame, Kicker, useEnter } from "../common";

export const Title: React.FC = () => {
  const f = useCurrentFrame();
  const t = useEnter(8, 22);
  const line = interpolate(f, [30, 70], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const meta = useEnter(70);
  return (
    <Frame>
      <Kicker ar="دراسة" en="BrainSAIT · Study" />
      <div style={{ textAlign: "center", transform: `scale(${interpolate(t, [0, 1], [0.94, 1])})`, opacity: t }}>
        <div dir="rtl" style={{ fontFamily: AR, fontWeight: 700, fontSize: 128, lineHeight: 1.25, color: C.ink }}>المشاع السريري</div>
        <div style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: 132, lineHeight: 1.05, color: C.ink, marginTop: 10 }}>The Clinical Commons</div>
      </div>
      <div style={{ height: 3, width: 520 * line, margin: "0 auto", background: `linear-gradient(90deg, transparent, ${C.cyan}, transparent)` }} />
      <Bi ar="نموذج مقترح لحوكمة المستشفيات" en="A proposed model for hospital governance" size={58} delay={40} />
      <div style={{ opacity: meta, textAlign: "center", display: "flex", flexDirection: "column", gap: 10, marginTop: 30 }}>
        <div dir="rtl" style={{ fontFamily: AR, fontSize: 36, color: C.pale }}>الإصدار 1.2 · د. محمد الفاضل</div>
        <div style={{ fontFamily: EN, fontSize: 30, color: C.muted }}>Version 1.2 · Dr. Mohamed El Fadil</div>
      </div>
    </Frame>
  );
};
