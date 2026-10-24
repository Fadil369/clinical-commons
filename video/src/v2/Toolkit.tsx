import { interpolate } from "remotion";
import { FileSignature, Gavel, HeartPulse, LifeBuoy, PiggyBank } from "lucide-react";
import { AR, C, EN } from "../theme";
import { Badge, Bi, Frame, useEnter } from "../common";

// Five cards dealt from a tilted stack into a neat column.
const CARDS = [
  { icon: FileSignature, ar: "ميثاق التفويض", sub: "يحدد من يقرر ماذا", en: "Delegation charter", enSub: "Sets out who decides what" },
  { icon: PiggyBank, ar: "تمويل محمي للإنصاف", sub: "مال مخصص لضمان عدالة الوصول", en: "Ring-fenced equity funding", enSub: "Money protected for fair access" },
  { icon: LifeBuoy, ar: "بروتوكول الاحتياج غير المموّل", sub: "ماذا نفعل حين لا يكفي المال", en: "Unfunded need protocol", enSub: "What happens when money runs short" },
  { icon: Gavel, ar: "ميثاق المراجعة المستقلة", sub: "طرف محايد يفصل في الخلافات", en: "Independent review charter", enSub: "A neutral panel for disputes" },
  { icon: HeartPulse, ar: "خطة استمرارية الرعاية", sub: "الرعاية لا تتوقف مهما حدث", en: "Continuity plan", enSub: "Care carries on, whatever happens" },
];

export const Toolkit: React.FC = () => (
  <Frame>
    <Bi ar="خمس أدوات قبل اليوم الأول" en="Five tools in place before day one" size={62} />
    <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
      {CARDS.map((c, i) => <Card key={i} {...c} i={i} />)}
    </div>
  </Frame>
);

const Card: React.FC<(typeof CARDS)[number] & { i: number }> = ({ icon, ar, sub, en, enSub, i }) => {
  const v = useEnter(25 + i * 22, 15);
  return (
    <div style={{ display: "flex", flexDirection: "row-reverse", gap: 26, alignItems: "center", padding: "22px 30px", borderRadius: 26,
      background: C.glass, border: `1.5px solid ${C.line}`, opacity: Math.min(1, v * 1.3),
      transform: `translate(${interpolate(v, [0, 1], [260, 0])}px, ${interpolate(v, [0, 1], [-200 - i * 40, 0])}px) rotate(${interpolate(v, [0, 1], [-14 + i * 6, 0])}deg)` }}>
      <Badge icon={icon} delay={25 + i * 22} size={96} />
      <div style={{ flex: 1, textAlign: "right" }}>
        <div dir="rtl" style={{ fontFamily: AR, fontWeight: 600, fontSize: 38, color: C.ink, lineHeight: 1.35 }}>{ar}<span style={{ color: C.pale, fontWeight: 400 }}> · {sub}</span></div>
        <div style={{ fontFamily: EN, fontSize: 26, color: C.pale, lineHeight: 1.35 }}><b style={{ fontWeight: 600, color: C.ink }}>{en}</b> · {enSub}</div>
      </div>
    </div>
  );
};
