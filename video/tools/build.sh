#!/usr/bin/env bash
# Build the Clinical Commons v2 video and poster from source.
#
#   1. generate the deterministic ambient bed (tools/ambient.py, seed 369)
#   2. render the video composition (Remotion)
#   3. render the poster composition (Remotion)
#   4. mix the un-attenuated ambient bed and mux it over the rendered video
#
# Output: out/the-clinical-commons.mp4 and out/the-clinical-commons-poster.jpg
set -euo pipefail
cd "$(dirname "$0")/.."

VIDEO_ID="${VIDEO_ID:-ClinicalCommons}"
POSTER_ID="${POSTER_ID:-Poster}"
OUT="${OUT:-out}"
AUDIO_SECONDS="${AUDIO_SECONDS:-90}"
GL="${GL:-swangle}"

mkdir -p "$OUT" public

echo "==> [1/4] generating ambient bed (${AUDIO_SECONDS}s, deterministic seed 369)"
python3 tools/ambient.py "$AUDIO_SECONDS" public/ambient.wav

echo "==> [2/4] rendering video: $VIDEO_ID"
npx remotion render "$VIDEO_ID" "$OUT/the-clinical-commons.mp4" --gl="$GL"

echo "==> [3/4] rendering poster: $POSTER_ID"
npx remotion still "$POSTER_ID" "$OUT/the-clinical-commons-poster.jpg" --frame=0 --gl="$GL"

echo "==> [4/4] mixing un-attenuated ambient bed and muxing"
python3 tools/loud_audio.py public/ambient.wav "$OUT/ambient_loud.wav"
FFM="node_modules/@remotion/compositor-linux-x64-gnu/ffmpeg"
if [ ! -x "$FFM" ]; then
  echo "bundled ffmpeg not found at $FFM" >&2
  exit 1
fi
"$FFM" -y -i "$OUT/the-clinical-commons.mp4" -i "$OUT/ambient_loud.wav" \
  -c:v copy -c:a aac -b:a 192k -ar 48000 -movflags +faststart \
  "$OUT/the-clinical-commons-loud.mp4"
mv "$OUT/the-clinical-commons-loud.mp4" "$OUT/the-clinical-commons.mp4"

ls -l "$OUT/the-clinical-commons.mp4" "$OUT/the-clinical-commons-poster.jpg"
