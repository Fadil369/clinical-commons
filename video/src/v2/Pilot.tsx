import { interpolate, useCurrentFrame } from "remotion";
import { Calendar, Hourglass, Scale } from "lucide-react";
import { AR, C, DISPLAY, EN } from "../theme";
import { Badge, Bi, Frame, useEnter } from "../common";

// A winding road; the view travels down it as each stop arrives.
const STOPS = [
  { icon: Calendar, big: "90", ar: "يومًا", en: "days", tAr: "تشغيل تجريبي موازٍ للعمل المعتاد، لتنسيق إحالات العيادات", tEn: "A practice run alongside normal work, for coordinating clinic referrals" },
  { icon: Hourglass, big: "9", ar: "أشهر", en: "months", tAr: "تجربة حقيقية بشروط واضحة، بإشراف مجلس المستشفى وقادته المرخّصين", tEn: "A real pilot with clear conditions, under the hospital's board and licensed leaders" },
  { icon: Scale, big: "", ar: "تقييم مستقل", en: "Independent evaluation", tAr: "هو الذي يقرر: نتوسع أو نتراجع", tEn: "decides whether to expand, or roll back" },
];

export const Pilot: React.FC = () => {
  const f = useCurrentFrame();
  const pan = interpolate(f, [120, 260], [0, -230], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const road = interpolate(f, [20, 280], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <Frame>
      <Bi ar="نبدأ صغيرًا… ونتوسع بالدليل" en="We start small, and grow only on evidence" size={62} />
      <div style={{ position: "relative", height: 1020, overflow: "hidden", maskImage: "linear-gradient(180deg, transparent, black 8%, black 88%, transparent)" }}>
        <div style={{ transform: `translateY(${pan}px)`, position: "relative", height: 1300 }}>
          <svg width={900} height={1300} style={{ position: "absolute", inset: 0 }}>
            <path d="M 820 40 C 820 260, 820 300, 820 420 S 820 700, 820 820 S 820 1100, 820 1240" stroke={C.line} strokeWidth={8} fill="none" />
            <path d="M 820 40 C 820 260, 820 300, 820 420 S 820 700, 820 820 S 820 1100, 820 1240" stroke={C.cyan} strokeWidth={8} fill="none"
              strokeDasharray={1200} strokeDashoffset={1200 * (1 - road)} />
          </svg>
          {STOPS.map((s, i) => <Stop key={i} {...s} top={40 + i * 400} delay={25 + i * 85} />)}
        </div>
      </div>
    </Frame>
  );
};

const Stop: React.FC<(typeof STOPS)[number] & { top: number; delay: number }> = ({ icon, big, ar, en, tAr, tEn, top, delay }) => {
  const v = useEnter(delay);
  return (
    <div style={{ position: "absolute", top, right: 0, left: 0, display: "flex", flexDirection: "row-reverse", gap: 34, opacity: v,
      transform: `translateX(${interpolate(v, [0, 1], [-60, 0])}px)` }}>
      <Badge icon={icon} delay={delay} size={150} />
      <div style={{ flex: 1, textAlign: "right" }}>
        <div style={{ display: "flex", flexDirection: "row-reverse", alignItems: "baseline", gap: 16 }}>
          {big && <span style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: 130, color: C.ink, lineHeight: 0.95, fontVariantNumeric: "lining-nums" }}>{big}</span>}
          <span dir="rtl" style={{ fontFamily: AR, fontWeight: 700, fontSize: big ? 48 : 56, color: C.cyan }}>{ar}</span>
          <span style={{ fontFamily: EN, fontSize: 30, color: C.muted }}>{en}</span>
        </div>
        <div dir="rtl" style={{ fontFamily: AR, fontWeight: 600, fontSize: 40, color: C.ink, lineHeight: 1.45, marginTop: 10 }}>{tAr}</div>
        <div style={{ fontFamily: EN, fontSize: 28, color: C.pale, lineHeight: 1.35 }}>{tEn}</div>
      </div>
    </div>
  );
};
