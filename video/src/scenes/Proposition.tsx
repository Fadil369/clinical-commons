import { interpolate, useCurrentFrame } from "remotion";
import { AR, C, EN } from "../theme";
import { Bi, Frame, Kicker, useEnter } from "../common";

export const Proposition: React.FC = () => {
  const f = useCurrentFrame();
  const mark = interpolate(f, [40, 80], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const note = useEnter(110);
  return (
    <Frame>
      <Kicker ar="فرضية قابلة للاختبار" en="A testable proposition" />
      <div style={{ position: "relative" }}>
        <Bi ar="تحسين الوصول وتجربة العاملين" en="Better access and workforce experience" size={78} delay={10} />
        <div style={{ height: 6, width: `${mark * 70}%`, margin: "26px auto 0", borderRadius: 3, background: C.cyan }} />
      </div>
      <Bi ar="دون تدهور غير مقبول في السلامة أو الاستدامة المالية" en="without unacceptable deterioration in safety or financial sustainability" size={50} delay={60} color={C.pale} />
      <div style={{ opacity: note, margin: "0 auto", padding: "22px 36px", borderRadius: 999, border: `2px solid ${C.cyan}`, textAlign: "center" }}>
        <div dir="rtl" style={{ fontFamily: AR, fontWeight: 600, fontSize: 36, color: C.ink }}>النموذج المتكامل غير مثبت بعد</div>
        <div style={{ fontFamily: EN, fontSize: 27, color: C.pale }}>The combined model is not yet proven</div>
      </div>
    </Frame>
  );
};
