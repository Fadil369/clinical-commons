import { interpolate, useCurrentFrame } from "remotion";
import { HeartPulse, Stethoscope, Users, Wallet } from "lucide-react";
import { C } from "../theme";
import { Badge, Bi, Frame, Row } from "../common";

// Three bodies swing into place around the patient, then each is explained.
const ORBIT = [
  { icon: Stethoscope, angle: -90 },
  { icon: Wallet, angle: 150 },
  { icon: Users, angle: 30 },
];

export const Idea: React.FC = () => {
  const f = useCurrentFrame();
  const spin = interpolate(f, [20, 90], [120, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <Frame>
      <Bi ar="الفكرة: لكل قرار صاحبٌ مسؤول" en="The idea: every decision has an accountable owner" size={60} />
      <div style={{ position: "relative", width: 560, height: 420, margin: "0 auto" }}>
        <svg width={560} height={420} style={{ position: "absolute", inset: 0 }}>
          <circle cx={280} cy={220} r={170} fill="none" stroke={C.line} strokeWidth={2} strokeDasharray="6 10" />
        </svg>
        <div style={{ position: "absolute", left: 280 - 70, top: 220 - 70 }}><Badge icon={HeartPulse} size={140} color="#f9a8d4" delay={5} /></div>
        {ORBIT.map((o, i) => {
          const a = ((o.angle + spin) * Math.PI) / 180;
          return (
            <div key={i} style={{ position: "absolute", left: 280 + Math.cos(a) * 170 - 55, top: 220 + Math.sin(a) * 170 - 55 }}>
              <Badge icon={o.icon} size={110} delay={15 + i * 8} />
            </div>
          );
        })}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>
        <Row ar="مجلس الرعاية" arSub="أطباء وممرضون ومهن صحية يضعون معايير الرعاية" en="Care Council" enSub="Doctors, nurses and allied health set care standards" delay={100} size={40} />
        <Row ar="مجلس الأمانة" arSub="يدير الميزانية والموارد بمسؤولية" en="Stewardship Board" enSub="Runs the budget and resources, accountably" delay={135} size={40} />
        <Row ar="أمانة الرسالة المجتمعية" arSub="مواطنون ومرضى، بينهم من يُختار عشوائيًا، يحمون حق الوصول إلى الرعاية" en="Community Mission Trust" enSub="Citizens and patients, some chosen at random, protect access to care" delay={170} size={40} />
      </div>
    </Frame>
  );
};
