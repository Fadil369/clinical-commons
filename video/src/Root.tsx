import { Composition } from "remotion";
import { Video, TOTAL_FRAMES } from "./Video";
import { Poster } from "./Poster";

export const Root: React.FC = () => (
  <>
    <Composition id="ClinicalCommons" component={Video} durationInFrames={TOTAL_FRAMES} fps={30} width={1080} height={1920} />
    <Composition id="Poster" component={Poster} durationInFrames={1} fps={30} width={1080} height={1920} />
  </>
);
