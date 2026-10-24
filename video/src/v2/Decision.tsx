import { interpolate, useCurrentFrame } from "remotion";
import { CircleCheck, Coins, FileText, Stethoscope, Users } from "lucide-react";
import { AR, C, EN } from "../theme";
import { Bi, Frame, useEnter } from "../common";

// A proposal card travels down through two gates, inside a frame of community commitments.
// The gates are opaque checkpoint bars painted above the card, so the card reads as
// passing *through* them rather than sliding over their wording.
export const Decision: React.FC = () => {
  const f = useCurrentFrame();
  const y = interpolate(f, [40, 120, 150, 230], [0, 270, 270, 640], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const frame = useEnter(15);
  const rule = useEnter(250);
  return (
    <Frame>
      <Bi ar="كيف يُتخذ قرار كبير؟" en="How does a big decision get made?" size={64} />
      <div style={{ position: "relative", height: 900, borderRadius: 40, border: `2.5px dashed ${C.cyan}`, opacity: frame, padding: "60px 50px" }}>
        <div style={{ position: "absolute", top: -26, right: 40, zIndex: 4, padding: "4px 18px", background: C.deep, display: "flex", gap: 12, alignItems: "center", color: C.cyan }}>
          <span style={{ fontFamily: EN, fontSize: 24 }}>Within the community&apos;s commitments</span>
          <span dir="rtl" style={{ fontFamily: AR, fontSize: 30, fontWeight: 600 }}>ضمن التزامات المجتمع</span>
          <Users size={30} color={C.cyan} />
        </div>
        <Gate top={160} icon={Stethoscope} ar="البوابة 1: هل هو مفيد للمرضى؟" en="Gate 1: is it right for patients?" pass={f > 115} />
        <Gate top={480} icon={Coins} ar="البوابة 2: هل نستطيع تحمّل كلفته؟" en="Gate 2: can we afford it?" pass={f > 225} />
        <div style={{ position: "absolute", left: "50%", top: 40 + y, zIndex: 1, transform: "translateX(-50%)", width: 520, padding: "22px 28px", borderRadius: 22,
          background: "#ffffff", color: C.navy, display: "flex", flexDirection: "row-reverse", gap: 18, alignItems: "center", boxShadow: "0 20px 60px rgba(0,0,0,0.35)" }}>
          <FileText size={52} color={C.blue} />
          <div style={{ textAlign: "right" }}>
            <div dir="rtl" style={{ fontFamily: AR, fontWeight: 700, fontSize: 36 }}>مقترح خدمة جديدة</div>
            <div style={{ fontFamily: EN, fontSize: 24, color: C.blue }}>A new service proposal</div>
          </div>
        </div>
      </div>
      <div style={{ opacity: rule, textAlign: "center" }}>
        <div dir="rtl" style={{ fontFamily: AR, fontWeight: 700, fontSize: 50, color: C.ink }}>لا جهة تُلغي قرار جهة أخرى بصمت</div>
        <div style={{ fontFamily: EN, fontSize: 34, color: C.pale }}>No one can quietly overrule another</div>
      </div>
    </Frame>
  );
};

const Gate: React.FC<{ top: number; icon: typeof Coins; ar: string; en: string; pass: boolean }> = ({ top, icon: Icon, ar, en, pass }) => (
  <div style={{ position: "absolute", left: 40, right: 40, top, zIndex: 3, display: "flex", flexDirection: "row-reverse", alignItems: "center", gap: 20,
    background: "rgba(12, 30, 64, 0.94)", borderTop: `3px solid ${pass ? "#4ade80" : C.line}`, paddingTop: 20, paddingBottom: 16 }}>
    <Icon size={50} color={pass ? "#4ade80" : C.pale} />
    <div style={{ flex: 1, textAlign: "right" }}>
      <div dir="rtl" style={{ fontFamily: AR, fontWeight: 600, fontSize: 38, color: C.ink }}>{ar}</div>
      <div style={{ fontFamily: EN, fontSize: 27, color: C.pale }}>{en}</div>
    </div>
    <CircleCheck size={54} color="#4ade80" style={{ opacity: pass ? 1 : 0.15 }} />
  </div>
);
