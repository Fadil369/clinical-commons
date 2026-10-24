import { AbsoluteFill, Audio, interpolate, staticFile } from "remotion";
import { TransitionSeries, linearTiming, type TransitionPresentation } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { wipe } from "@remotion/transitions/wipe";
import { flip } from "@remotion/transitions/flip";
import { clockWipe } from "@remotion/transitions/clock-wipe";
import { Background, Camera, ChapterBar } from "./common";
import { Hook } from "./v2/Hook";
import { Problem } from "./v2/Problem";
import { Idea } from "./v2/Idea";
import { Decision } from "./v2/Decision";
import { Safeguards } from "./v2/Safeguards";
import { Pilot } from "./v2/Pilot";
import { Toolkit } from "./v2/Toolkit";
import { Prove } from "./v2/Prove";
import { ReadQR } from "./v2/ReadQR";

const SCENES = [
  { C: Hook, d: 180 },
  { C: Problem, d: 330, ar: "المشكلة", en: "The problem" },
  { C: Idea, d: 360, ar: "الفكرة", en: "The idea" },
  { C: Decision, d: 360, ar: "القرار", en: "Decisions" },
  { C: Safeguards, d: 330, ar: "الضمانات", en: "Safeguards" },
  { C: Pilot, d: 360, ar: "البداية", en: "Starting small" },
  { C: Toolkit, d: 300, ar: "الأدوات", en: "The toolkit" },
  { C: Prove, d: 270, ar: "الهدف", en: "The goal" },
  { C: ReadQR, d: 300, ar: "اقرأ", en: "Read it" },
];
const T = 20; // frames per transition
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- a mixed list of presentation types
const PRESENT: TransitionPresentation<any>[] = [
  slide({ direction: "from-bottom" }),
  wipe({ direction: "from-right" }),
  flip({ direction: "from-right" }),
  clockWipe({ width: 1080, height: 1920 }),
  fade(),
  slide({ direction: "from-right" }),
  wipe({ direction: "from-top" }),
  fade(),
];
const STARTS = SCENES.map((_, i) => SCENES.slice(0, i).reduce((s, x) => s + x.d, 0) - i * T);
export const TOTAL_FRAMES = STARTS[STARTS.length - 1] + SCENES[SCENES.length - 1].d;
const CHAPTERS = SCENES.flatMap((s, i) => (s.ar ? [{ ar: s.ar, en: s.en!, start: STARTS[i] + T / 2 }] : []));

export const Video: React.FC = () => (
  <AbsoluteFill>
    <Background />
    <TransitionSeries>
      {SCENES.flatMap(({ C, d }, i) => [
        <TransitionSeries.Sequence key={`s${i}`} durationInFrames={d}><Camera dur={d} drift={i % 2 ? -1 : 1}><C /></Camera></TransitionSeries.Sequence>,
        ...(i < SCENES.length - 1 ? [<TransitionSeries.Transition key={`t${i}`} timing={linearTiming({ durationInFrames: T })} presentation={PRESENT[i]} />] : []),
      ])}
    </TransitionSeries>
    <ChapterBar chapters={CHAPTERS} total={TOTAL_FRAMES} />
    {/* Original ambient bed (tools/ambient.py); kept low under the visuals and faded out with the final card. */}
    <Audio src={staticFile("ambient.wav")} volume={(f) => interpolate(f, [0, 45, TOTAL_FRAMES - 75, TOTAL_FRAMES], [0, 0.55, 0.55, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })} />
  </AbsoluteFill>
);
