import { AbsoluteFill } from "remotion";
import { Background } from "./common";
import { AR, C, DISPLAY, EN } from "./theme";

// Static title card for the study: full-bleed gradient, bilingual identity block.
export const Poster: React.FC = () => (
  <AbsoluteFill>
    <Background />
    <AbsoluteFill style={{ padding: "140px 90px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <span style={{ fontFamily: EN, fontSize: 23, fontWeight: 500, letterSpacing: "0.3em", color: C.muted, textTransform: "uppercase" }}>BrainSAIT</span>
        <span style={{ fontFamily: EN, fontSize: 23, color: C.muted, opacity: 0.45 }}>·</span>
        <span style={{ fontFamily: EN, fontSize: 23, fontWeight: 500, letterSpacing: "0.3em", color: C.muted, textTransform: "uppercase" }}>Study</span>
        <span style={{ fontFamily: EN, fontSize: 23, color: C.muted, opacity: 0.45 }}>·</span>
        <span style={{ fontFamily: AR, fontSize: 25, fontWeight: 500, color: C.muted }}>دراسة</span>
      </div>

      <div style={{ width: 120, height: 3, margin: "54px 0 60px", borderRadius: 3, background: C.cyan, opacity: 0.9 }} />

      <div style={{ fontFamily: AR, fontSize: 104, fontWeight: 700, color: C.ink, lineHeight: 1.3 }}>المشاع السريري</div>

      <div style={{ fontFamily: DISPLAY, fontSize: 84, fontWeight: 700, color: C.ink, lineHeight: 1.1, marginTop: 10, letterSpacing: "-0.01em" }}>The Clinical Commons</div>

      <div style={{ width: 72, height: 1, margin: "56px 0", background: C.line }} />

      <div style={{ fontFamily: AR, fontSize: 46, fontWeight: 400, color: C.pale, lineHeight: 1.6 }}>نموذج مقترح لحوكمة المستشفيات</div>

      <div style={{ fontFamily: EN, fontSize: 30, fontWeight: 400, color: C.muted, lineHeight: 1.5, marginTop: 16 }}>
        A proposed model for hospital governance
      </div>

      <div style={{ marginTop: 96, display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
        <div style={{ fontFamily: AR, fontSize: 40, fontWeight: 600, color: C.ink }}>د. محمد الفاضل</div>
        <div style={{ fontFamily: EN, fontSize: 28, fontWeight: 400, color: C.muted, letterSpacing: "0.02em" }}>Dr. Mohamed El Fadil</div>
        <div style={{ fontFamily: EN, fontSize: 24, fontWeight: 400, color: C.cyan, letterSpacing: "0.06em", marginTop: 14 }}>
          doi.org/10.5281/zenodo.23604174
        </div>
      </div>
    </AbsoluteFill>
  </AbsoluteFill>
);
