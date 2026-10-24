import { interpolate, useCurrentFrame } from "remotion";
import { AR, C, DISPLAY, EN } from "../theme";
import { Frame, useEnter } from "../common";

// Opens on a question, word by word in Arabic, then English, then the follow-up.
const WORDS = ["من", "يقرر", "داخل", "المستشفى؟"];

export const Hook: React.FC = () => {
  const f = useCurrentFrame();
  const en = useEnter(52);
  const q2 = useEnter(95);
  const mark = interpolate(f, [0, 60], [0.6, 1], { extrapolateRight: "clamp" });
  return (
    <Frame>
      <div style={{ textAlign: "center", fontFamily: DISPLAY, fontWeight: 700, fontSize: 360, lineHeight: 0.8, color: C.cyan, opacity: 0.9,
        transform: `scale(${mark}) rotate(${interpolate(f, [0, 180], [-8, 4])}deg)` }}>?</div>
      <div dir="rtl" style={{ textAlign: "center", fontFamily: AR, fontWeight: 700, fontSize: 96, lineHeight: 1.35, color: C.ink }}>
        {WORDS.map((w, i) => {
          const v = interpolate(f, [8 + i * 9, 20 + i * 9], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          return <span key={i} style={{ display: "inline-block", opacity: v, transform: `translateY(${(1 - v) * 30}px)`, marginInline: 12 }}>{w}</span>;
        })}
      </div>
      <div style={{ textAlign: "center", fontFamily: EN, fontWeight: 500, fontSize: 52, color: C.pale, opacity: en }}>Who makes the decisions in a hospital?</div>
      <div style={{ textAlign: "center", opacity: q2, marginTop: 30 }}>
        <div dir="rtl" style={{ fontFamily: AR, fontWeight: 600, fontSize: 54, color: C.ink }}>ومن المسؤول عن كل قرار؟</div>
        <div style={{ fontFamily: EN, fontSize: 36, color: C.pale, marginTop: 8 }}>And who answers for each one?</div>
      </div>
    </Frame>
  );
};
