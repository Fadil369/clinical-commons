# The Clinical Commons — video (v2)

An 88-second vertical (1080×1920, 30 fps, 2630 frames) bilingual explainer of
*The Clinical Commons* v1.2 (DOI [10.5281/zenodo.23604174](https://doi.org/10.5281/zenodo.23604174)),
made with Remotion 4.0.534. Arabic leads each line, English follows. Every statement is
taken from the study's own summary.

| Chapter | Content |
| --- | --- |
| Hook | Who makes the decisions in a hospital — and who answers for each one? |
| Problem | Care is split across teams; no one owns the whole trajectory |
| Idea | A shared commons: clinical teams, an accountable board, community oversight |
| Decision | How a decision actually travels — proposal, checkpoint gates, accountable sign-off |
| Safeguards | Equity ring-fencing, unfunded-need protocol, continuity plan, independent review |
| Pilot | 90-day design and shadow operation → 9-month conditional live pilot → expand only after independent evaluation |
| Toolkit | Delegation charter, ring-fenced equity funding, continuity plan |
| Prove | What independent evaluation would have to show |
| ReadQR | Scannable DOI and open access in both languages |

## Layout

```
src/Video.tsx        scene timeline, durations, transitions, audio mix
src/v2/*.tsx         the nine chapters
src/Poster.tsx       static title card (composition "Poster")
src/common.tsx       shared primitives (Background, Frame, Bi, useEnter, ...)
src/theme.ts         palette and fonts (Cormorant, Inter, IBM Plex Sans Arabic)
tools/ambient.py     deterministic ambient soundtrack generator (seed 369)
tools/loud_audio.py  fades the bed to the exact video length at unity gain
tools/build.sh       full build: ambient -> render -> poster -> mix
```

## Build

```bash
npm ci
python3 -m pip install numpy
bash tools/build.sh
```

`tools/build.sh` produces `out/the-clinical-commons.mp4` (video muxed with the
un-attenuated ambient bed) and `out/the-clinical-commons-poster.jpg`.

The soundtrack is generated, not licensed: `tools/ambient.py` synthesises a 90-second
ambient bed with a fixed seed, so the audio is byte-reproducible. The Remotion mix
attenuates it to 0.55; `tools/loud_audio.py` rebuilds it at unity gain with 1.5 s
fade-in and 2.5 s fade-out and it is muxed over the rendered video.

Rendering needs Remotion's Chrome Headless Shell (`npx remotion browser ensure`); on
headless Linux CI use `--gl=swangle` (software rendering, no GPU). `tools/build.sh`
already passes it.

## Commands

```bash
npm run studio   # live preview at http://localhost:3000 (from a laptop: ssh -L 3000:localhost:3000 brainsait)
npm run render   # out/the-clinical-commons.mp4
npx remotion still Poster out/poster.jpg --frame=0
```

## Licence note

Remotion is free for individuals and companies of up to three people; larger companies
need a Remotion company licence (remotion.pro).
