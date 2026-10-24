import { interpolate, useCurrentFrame } from "remotion";
import { Coins, HeartPulse, Landmark, Stethoscope } from "lucide-react";
import { AR, C, EN } from "../theme";
import { Badge, Bi, Frame, useEnter } from "../common";

// Three decisions in three separate lanes; lines converge on the patient who feels all of them.
const LANES = [
  { icon: Stethoscope, ar: "العلاج", en: "Treatment", by: "الأطباء", byEn: "Clinicians" },
  { icon: Coins, ar: "المال", en: "Money", by: "الإدارة", byEn: "Managers" },
  { icon: Landmark, ar: "الالتزامات العامة", en: "Public duties", by: "جهات أخرى", byEn: "Elsewhere" },
];

export const Problem: React.FC = () => {
  const f = useCurrentFrame();
  const conv = interpolate(f, [110, 170], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <Frame>
      <Bi ar="ثلاثة قرارات… في ثلاثة أماكن مختلفة" en="Three kinds of decisions, made in three separate places" size={60} />
      <div style={{ display: "flex", flexDirection: "row-reverse", justifyContent: "space-between" }}>
        {LANES.map((l, i) => <Lane key={i} {...l} delay={30 + i * 18} />)}
      </div>
      <svg width={900} height={170} style={{ margin: "-30px auto -40px", overflow: "visible" }}>
        {[750, 450, 150].map((x, i) => (
          <line key={i} x1={x} y1={0} x2={x + (450 - x) * conv} y2={150 * conv} stroke={C.cyan} strokeWidth={3} strokeDasharray="10 12" opacity={conv} />
        ))}
      </svg>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 18, opacity: conv }}>
        <Badge icon={HeartPulse} delay={130} size={150} color="#f9a8d4" />
        <Bi ar="…والمريض يعيش نتيجتها كلها معًا" en="…and the patient lives with all three at once" size={56} delay={150} />
      </div>
    </Frame>
  );
};

const Lane: React.FC<{ icon: typeof Coins; ar: string; en: string; by: string; byEn: string; delay: number }> = ({ icon, ar, en, by, byEn, delay }) => {
  const v = useEnter(delay + 10);
  return (
    <div style={{ width: 270, display: "flex", flexDirection: "column", alignItems: "center", gap: 14, textAlign: "center" }}>
      <Badge icon={icon} delay={delay} size={130} />
      <div style={{ opacity: v }}>
        <div dir="rtl" style={{ fontFamily: AR, fontWeight: 600, fontSize: 40, color: C.ink, lineHeight: 1.3 }}>{ar}</div>
        <div style={{ fontFamily: EN, fontSize: 27, color: C.pale }}>{en}</div>
        <div dir="rtl" style={{ fontFamily: AR, fontSize: 30, color: C.muted, marginTop: 10 }}>يقررها: {by}</div>
        <div style={{ fontFamily: EN, fontSize: 23, color: C.muted }}>decided by: {byEn}</div>
      </div>
    </div>
  );
};
