import { interpolate, useCurrentFrame } from "remotion";
import { AR, C, DISPLAY, EN } from "../theme";
import { Bi, Frame, useEnter } from "../common";

export const Read: React.FC = () => {
  const f = useCurrentFrame();
  const card = useEnter(40);
  const foot = useEnter(80);
  const glow = 0.5 + 0.5 * Math.sin(f / 14);
  return (
    <Frame>
      <Bi ar="اقرأ الدراسة كاملة" en="Read the full study" size={92} display />
      <Bi ar="بالعربية والإنجليزية · مفتوحة للجميع" en="In Arabic and English · open access" size={46} delay={16} color={C.pale} />
      <div style={{ opacity: card, transform: `scale(${interpolate(card, [0, 1], [0.92, 1])})`, margin: "0 auto", padding: "40px 56px", borderRadius: 32,
        background: C.glass, border: `2px solid ${C.cyan}`, boxShadow: `0 0 ${40 + glow * 50}px rgba(56,189,248,${0.25 + glow * 0.2})`, textAlign: "center" }}>
        <div style={{ fontFamily: EN, fontWeight: 600, fontSize: 30, color: C.cyan, letterSpacing: "0.16em" }}>DOI</div>
        <div style={{ fontFamily: EN, fontWeight: 600, fontSize: 46, color: C.ink, marginTop: 10 }}>doi.org/10.5281/zenodo.23604174</div>
      </div>
      <div style={{ opacity: foot, textAlign: "center", display: "flex", flexDirection: "column", gap: 12 }}>
        <div dir="rtl" style={{ fontFamily: AR, fontSize: 32, color: C.muted }}>تصميم مقترح للنقاش، وليس برنامجًا معتمدًا</div>
        <div style={{ fontFamily: EN, fontSize: 26, color: C.muted }}>A proposed design for discussion, not an approved programme</div>
        <div style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: 56, color: C.ink, marginTop: 36 }}>BrainSAIT.de</div>
      </div>
    </Frame>
  );
};
