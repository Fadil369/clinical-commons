#!/usr/bin/env python3
"""Extract the ambient bed at unity gain, faded and trimmed to the exact video length.

The Remotion mix attenuates the bed to 0.55 (about -5.2 dB). This script rebuilds the
same bed without that attenuation and with explicit fades, so it can be muxed over the
rendered video as the published master.

Usage: loud_audio.py [SRC_WAV] [DST_WAV]
"""
import wave, array, math, os, sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
SRC = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, "public", "ambient.wav")
DST = sys.argv[2] if len(sys.argv) > 2 else os.path.join(ROOT, "out", "ambient_loud.wav")
TOTAL_FRAMES = 2630
FPS = 30
DUR = TOTAL_FRAMES / FPS          # 87.666...
FADE_IN = 1.5
FADE_OUT = 2.5
GAIN = 1.0                        # 0 dB -> keeps source peak -6.02, RMS -18.63

os.makedirs(os.path.dirname(os.path.abspath(DST)), exist_ok=True)

w = wave.open(SRC, "rb")
sr, ch, sw, n = w.getframerate(), w.getnchannels(), w.getsampwidth(), w.getnframes()
assert sw == 2, sw
raw = w.readframes(n)
w.close()

samples = array.array("h")
samples.frombytes(raw)
frames_in = len(samples) // ch
need = int(round(DUR * sr))
out = array.array("h", bytes(need * ch * 2))

fin = int(round(FADE_IN * sr))
fout = int(round(FADE_OUT * sr))
fout_start = need - fout

peak = 0
for i in range(need):
    if i < fin:
        env = i / fin
    elif i >= fout_start:
        env = max(0.0, (need - 1 - i) / fout)
    else:
        env = 1.0
    g = GAIN * env
    for c in range(ch):
        idx = i * ch + c
        v = samples[idx] if i < frames_in else 0
        o = int(round(v * g))
        if o > 32767: o = 32767
        elif o < -32768: o = -32768
        out[idx] = o
        if abs(o) > peak: peak = abs(o)

ow = wave.open(DST, "wb")
ow.setnchannels(ch)
ow.setsampwidth(2)
ow.setframerate(sr)
ow.writeframes(out.tobytes())
ow.close()

p = peak / 32768.0
print(f"sr={sr} ch={ch} frames={need} dur={need/sr:.3f}s peak={20*math.log10(p):.2f} dBFS -> {DST}")
