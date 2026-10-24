// Palette and type taken from the study's own cover: deep navy into blue, white text, pale-blue and cyan accents.
import { loadFont as loadArabic } from "@remotion/google-fonts/IBMPlexSansArabic";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { loadFont as loadCormorant } from "@remotion/google-fonts/Cormorant";

export const AR = loadArabic("normal", { weights: ["400", "600", "700"], subsets: ["arabic", "latin"] }).fontFamily;
export const EN = loadInter("normal", { weights: ["400", "500", "600"], subsets: ["latin"] }).fontFamily;
export const DISPLAY = loadCormorant("normal", { weights: ["600", "700"], subsets: ["latin"] }).fontFamily;

export const C = {
  navy: "#0a152f",
  deep: "#0f2550",
  blue: "#1d4a8a",
  ink: "#ffffff",
  pale: "#cfe3f7",
  cyan: "#38bdf8",
  muted: "rgba(207, 227, 247, 0.72)",
  line: "rgba(207, 227, 247, 0.28)",
  glass: "rgba(255, 255, 255, 0.06)",
};
