import { interpolate, useCurrentFrame } from "remotion";
import { ShieldCheck, Smile, UserRound } from "lucide-react";
import { AR, C, EN } from "../theme";
import { Badge, Bi, Frame, useEnter } from "../common";

// Two things should rise while safety and finances hold steady; the honest caveat comes last.
export const Prove: React.FC = () => {
  const f = useCurrentFrame();
  const rise = interpolate(f, [40, 110], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const steady = useEnter(110);
  const note = useEnter(160);
  return (
    <Frame>
      <Bi ar="ماذا نريد أن نثبت؟" en="What do we want to prove?" size={70} />
      <div style={{ display: "flex", flexDirection: "row-reverse", gap: 40, justifyContent: "center", alignItems: "flex-end", height: 560 }}>
        <Bar icon={UserRound} h={460 * rise} ar="وصول أسهل للمرضى" en="Easier access for patients" />
        <Bar icon={Smile} h={400 * rise} ar="عمل أفضل للفرق الصحية" en="A better working life for care teams" />
      </div>
      <div style={{ display: "flex", flexDirection: "row-reverse", gap: 24, alignItems: "center", justifyContent: "center", opacity: steady }}>
        <Badge icon={ShieldCheck} delay={110} size={110} color="#4ade80" />
        <div style={{ textAlign: "right" }}>
          <div dir="rtl" style={{ fontFamily: AR, fontWeight: 600, fontSize: 42, color: C.ink }}>دون المساس بالسلامة أو الاستدامة المالية</div>
          <div style={{ fontFamily: EN, fontSize: 29, color: C.pale }}>without harming safety or the hospital's finances</div>
        </div>
      </div>
      <div style={{ opacity: note, margin: "0 auto", padding: "22px 40px", borderRadius: 999, border: `2px solid ${C.cyan}`, textAlign: "center" }}>
        <div dir="rtl" style={{ fontFamily: AR, fontWeight: 700, fontSize: 40, color: C.ink }}>لم يُثبت بعد… ولهذا نختبره</div>
        <div style={{ fontFamily: EN, fontSize: 29, color: C.pale }}>It isn't proven yet. That's why we test it.</div>
      </div>
    </Frame>
  );
};

const Bar: React.FC<{ icon: typeof Smile; h: number; ar: string; en: string }> = ({ icon: Icon, h, ar, en }) => (
  <div style={{ width: 380, display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}>
    <div style={{ textAlign: "center", opacity: h > 40 ? 1 : 0 }}>
      <div dir="rtl" style={{ fontFamily: AR, fontWeight: 600, fontSize: 38, color: C.ink, lineHeight: 1.35 }}>{ar}</div>
      <div style={{ fontFamily: EN, fontSize: 26, color: C.pale }}>{en}</div>
    </div>
    <div style={{ width: 200, height: Math.max(h - 120, 0), borderRadius: "28px 28px 8px 8px", background: `linear-gradient(${C.cyan}, rgba(56,189,248,0.15))`,
      display: "flex", justifyContent: "center", paddingTop: 24 }}>
      {h > 160 && <Icon size={72} color={C.navy} strokeWidth={2} />}
    </div>
  </div>
);
