import { interpolate, useCurrentFrame } from "remotion";
import { AR, C, DISPLAY, EN } from "../theme";
import { Bi, Frame, useEnter } from "../common";

const STOPS = [
  { from: 30, n: 90, ar: "يومًا", en: "days", tAr: "تصميم وتشغيل محاكٍ لتنسيق إحالات العيادات الخارجية", tEn: "Design and shadow operation for outpatient referral coordination" },
  { from: 95, n: 9, ar: "أشهر", en: "months", tAr: "تجربة فعلية مشروطة ضمن مجلس المستشفى وقيادته السريرية المرخّصة", tEn: "A conditional live pilot under the hospital's board and licensed clinical leadership" },
  { from: 160, n: 0, ar: "ثم", en: "then", tAr: "التوسع فقط بعد تقييم مستقل", tEn: "Expand only after independent evaluation" },
];

export const Timeline: React.FC = () => {
  const f = useCurrentFrame();
  const grow = interpolate(f, [25, 190], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <Frame>
      <Bi ar="ابدأ صغيرًا، وتوسّع بالدليل" en="Start small. Expand on evidence." size={66} />
      <div style={{ position: "relative", paddingRight: 70 }}>
        <div style={{ position: "absolute", right: 22, top: 20, width: 4, height: `${grow * 92}%`, background: `linear-gradient(${C.cyan}, ${C.pale})`, borderRadius: 2 }} />
        <div style={{ display: "flex", flexDirection: "column", gap: 70 }}>
          {STOPS.map((s, i) => {
            const v = useEnter(s.from);
            const count = Math.round(interpolate(f, [s.from, s.from + 30], [0, s.n], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
            return (
              <div key={i} style={{ position: "relative", opacity: v, transform: `translateY(${interpolate(v, [0, 1], [30, 0])}px)`, textAlign: "right" }}>
                <span style={{ position: "absolute", right: -62, top: 18, width: 30, height: 30, borderRadius: 15, background: C.navy, border: `4px solid ${C.cyan}` }} />
                <div style={{ display: "flex", flexDirection: "row-reverse", alignItems: "baseline", gap: 18 }}>
                  {s.n > 0 && <span style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: 120, color: C.ink, lineHeight: 1 }}>{count}</span>}
                  <span dir="rtl" style={{ fontFamily: AR, fontWeight: 600, fontSize: 44, color: C.cyan }}>{s.ar}</span>
                  <span style={{ fontFamily: EN, fontSize: 30, color: C.muted }}>{s.en}</span>
                </div>
                <div dir="rtl" style={{ fontFamily: AR, fontWeight: 600, fontSize: 40, color: C.ink, lineHeight: 1.45, marginTop: 8 }}>{s.tAr}</div>
                <div style={{ fontFamily: EN, fontSize: 28, color: C.pale, lineHeight: 1.35 }}>{s.tEn}</div>
              </div>
            );
          })}
        </div>
      </div>
    </Frame>
  );
};
