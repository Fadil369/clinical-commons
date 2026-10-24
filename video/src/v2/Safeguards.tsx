import { EyeOff, Megaphone, Siren, Stethoscope } from "lucide-react";
import { interpolate } from "remotion";
import { AR, C, EN } from "../theme";
import { Badge, Bi, Frame, useEnter } from "../common";

// Four promises to patients as a 2×2 grid of tiles that pop in one by one.
const TILES = [
  { icon: Stethoscope, ar: "قرار علاجك يبقى بيد طبيبك", en: "Your treatment stays with your clinician" },
  { icon: EyeOff, ar: "ممثلو المجتمع لا يرون ملفك الطبي", en: "Community members never see your medical record" },
  { icon: Siren, ar: "الطوارئ لا تنتظر أي لجنة", en: "Emergencies never wait for a committee" },
  { icon: Megaphone, ar: "القرارات وأسبابها تُنشر خلال 10 أيام عمل", en: "Decisions and reasons are published within 10 working days" },
];

export const Safeguards: React.FC = () => (
  <Frame>
    <Bi ar="ضمانات تحمي المريض" en="Safeguards that protect patients" size={66} />
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 30, direction: "rtl" }}>
      {TILES.map((t, i) => <Tile key={i} {...t} delay={30 + i * 22} />)}
    </div>
  </Frame>
);

const Tile: React.FC<{ icon: typeof Siren; ar: string; en: string; delay: number }> = ({ icon, ar, en, delay }) => {
  const v = useEnter(delay, 14);
  return (
    <div style={{ padding: "40px 30px", borderRadius: 32, background: C.glass, border: `1.5px solid ${C.line}`, display: "flex", flexDirection: "column", gap: 24,
      alignItems: "flex-start", opacity: v, transform: `scale(${interpolate(v, [0, 1], [0.85, 1])})`, minHeight: 470 }}>
      <Badge icon={icon} delay={delay} size={120} />
      <div dir="rtl" style={{ fontFamily: AR, fontWeight: 600, fontSize: 40, color: C.ink, lineHeight: 1.45, textAlign: "right" }}>{ar}</div>
      <div dir="ltr" style={{ fontFamily: EN, fontSize: 28, color: C.pale, lineHeight: 1.35, textAlign: "right", width: "100%" }}>{en}</div>
    </div>
  );
};
