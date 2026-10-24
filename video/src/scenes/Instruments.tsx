import { interpolate } from "remotion";
import { AR, C, DISPLAY, EN } from "../theme";
import { Bi, Frame, useEnter } from "../common";

const ITEMS = [
  ["ميثاق التفويض", "Delegation charter"],
  ["سياسة تمويل مخصص للإنصاف", "Ring-fenced equity funding policy"],
  ["بروتوكول الاحتياج غير المموّل", "Unfunded need protocol"],
  ["ميثاق المراجعة المستقلة", "Independent review charter"],
  ["خطة استمرارية الرعاية", "Continuity plan"],
];

export const Instruments: React.FC = () => (
  <Frame>
    <Bi ar="خمس أدوات للتطبيق الأول" en="Five instruments for the first implementation" size={64} />
    <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
      {ITEMS.map(([ar, en], i) => {
        const v = useEnter(30 + i * 18);
        return (
          <div key={i} style={{ display: "flex", flexDirection: "row-reverse", alignItems: "center", gap: 30, padding: "26px 34px", borderRadius: 26,
            background: C.glass, border: `1.5px solid ${C.line}`, opacity: v, transform: `translateX(${interpolate(v, [0, 1], [-80, 0])}px)` }}>
            <span style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: 72, color: C.cyan, width: 60, textAlign: "center", lineHeight: 1, fontVariantNumeric: "lining-nums" }}>{i + 1}</span>
            <div style={{ textAlign: "right", flex: 1 }}>
              <div dir="rtl" style={{ fontFamily: AR, fontWeight: 600, fontSize: 42, color: C.ink, lineHeight: 1.4 }}>{ar}</div>
              <div style={{ fontFamily: EN, fontSize: 29, color: C.pale }}>{en}</div>
            </div>
          </div>
        );
      })}
    </div>
  </Frame>
);
