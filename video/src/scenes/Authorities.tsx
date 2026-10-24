import { interpolate, useCurrentFrame } from "remotion";
import { evolvePath } from "@remotion/paths";
import { AR, C, EN } from "../theme";
import { Bi, Frame, useEnter } from "../common";

const NODES = [
  { x: 360, y: 70, ar: "الفرق السريرية تتولى أمانة الرعاية", en: "Clinical teams steward care", color: C.cyan },
  { x: 90, y: 520, ar: "مجلس مسؤول يدير الموارد", en: "An accountable board manages resources", color: C.pale },
  { x: 630, y: 520, ar: "ممثلو المجتمع يراقبون الرسالة والإنصاف", en: "Community representatives oversee mission and equity", color: "#7dd3fc" },
];
const EDGES = [[0, 1], [1, 2], [2, 0]] as const;

export const Authorities: React.FC = () => {
  const f = useCurrentFrame();
  const inst = useEnter(120);
  return (
    <Frame>
      <Bi ar="ثلاث سلطات، ومؤسسة واحدة مسؤولة" en="Three authorities, one accountable institution" size={62} />
      <div style={{ position: "relative", width: 720, height: 590, margin: "0 auto" }}>
        <svg width={720} height={590} style={{ position: "absolute", inset: 0, overflow: "visible" }}>
          {EDGES.map(([a, b], i) => {
            const d = `M ${NODES[a].x} ${NODES[a].y} L ${NODES[b].x} ${NODES[b].y}`;
            const p = interpolate(f, [30 + i * 22, 70 + i * 22], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            const { strokeDasharray, strokeDashoffset } = evolvePath(p, d);
            return <path key={i} d={d} stroke={C.line} strokeWidth={3} fill="none" strokeDasharray={strokeDasharray} strokeDashoffset={strokeDashoffset} />;
          })}
          {NODES.map((n, i) => {
            const v = interpolate(f, [20 + i * 22, 40 + i * 22], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            const pulse = 1 + 0.08 * Math.sin((f - i * 10) / 9);
            return (
              <g key={i} opacity={v}>
                <circle cx={n.x} cy={n.y} r={56 * pulse} fill={n.color} opacity={0.16} />
                <circle cx={n.x} cy={n.y} r={26} fill={n.color} />
              </g>
            );
          })}
        </svg>
        <div style={{ position: "absolute", left: 0, right: 0, top: 330, textAlign: "center", opacity: inst }}>
          <div dir="rtl" style={{ fontFamily: AR, fontWeight: 600, fontSize: 34, color: C.ink }}>مؤسسة واحدة مسؤولة</div>
          <div style={{ fontFamily: EN, fontSize: 26, color: C.muted }}>One accountable institution</div>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 34 }}>
        {NODES.map((n, i) => {
          const v = useEnter(40 + i * 22);
          return (
            <div key={i} style={{ display: "flex", flexDirection: "row-reverse", gap: 26, alignItems: "center", opacity: v, transform: `translateX(${interpolate(v, [0, 1], [-40, 0])}px)` }}>
              <span style={{ width: 22, height: 22, borderRadius: 11, background: n.color, flex: "none" }} />
              <div style={{ textAlign: "right", flex: 1 }}>
                <div dir="rtl" style={{ fontFamily: AR, fontWeight: 600, fontSize: 40, color: C.ink, lineHeight: 1.4 }}>{n.ar}</div>
                <div style={{ fontFamily: EN, fontSize: 28, color: C.pale }}>{n.en}</div>
              </div>
            </div>
          );
        })}
      </div>
    </Frame>
  );
};
