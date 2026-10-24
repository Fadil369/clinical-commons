import { interpolate, useCurrentFrame } from "remotion";
import QRCode from "qrcode";
import { AR, C, DISPLAY, EN } from "../theme";
import { Bi, Frame, useEnter } from "../common";

const URL = "https://doi.org/10.5281/zenodo.23604174";
const QR = QRCode.create(URL, { errorCorrectionLevel: "M" }).modules;

// Closing card with a scannable QR code for the study.
export const ReadQR: React.FC = () => {
  const f = useCurrentFrame();
  const card = useEnter(30, 14);
  const foot = useEnter(90);
  const n = QR.size, cell = 520 / n;
  const glow = 0.5 + 0.5 * Math.sin(f / 14);
  return (
    <Frame>
      <Bi ar="اقرأ الدراسة كاملة" en="Read the full study" size={92} display />
      <Bi ar="مجانًا، بالعربية والإنجليزية" en="Free, in Arabic and English" size={48} delay={12} color={C.pale} />
      <div style={{ margin: "0 auto", padding: 36, borderRadius: 36, background: "#ffffff", opacity: card, transform: `scale(${interpolate(card, [0, 1], [0.8, 1])})`,
        boxShadow: `0 0 ${50 + glow * 50}px rgba(56,189,248,${0.3 + glow * 0.25})` }}>
        <svg width={520} height={520} shapeRendering="crispEdges">
          {Array.from({ length: n * n }, (_, k) => (QR.data[k] ? <rect key={k} x={(k % n) * cell} y={Math.floor(k / n) * cell} width={cell + 0.5} height={cell + 0.5} fill={C.navy} /> : null))}
        </svg>
      </div>
      <div style={{ textAlign: "center", opacity: card }}>
        <div dir="rtl" style={{ fontFamily: AR, fontSize: 34, color: C.pale }}>امسح الرمز أو زر</div>
        <div style={{ fontFamily: EN, fontWeight: 600, fontSize: 40, color: C.ink, marginTop: 6 }}>doi.org/10.5281/zenodo.23604174</div>
      </div>
      <div style={{ opacity: foot, textAlign: "center", display: "flex", flexDirection: "column", gap: 10 }}>
        <div dir="rtl" style={{ fontFamily: AR, fontSize: 30, color: C.muted }}>تصميم مقترح للنقاش، وليس برنامجًا معتمدًا · د. محمد الفاضل</div>
        <div style={{ fontFamily: EN, fontSize: 25, color: C.muted }}>A proposed design for discussion, not an approved programme · Dr. Mohamed El Fadil</div>
        <div style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: 54, color: C.ink, marginTop: 24 }}>BrainSAIT.de</div>
      </div>
    </Frame>
  );
};
