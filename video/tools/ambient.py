#!/usr/bin/env python3
"""Original ambient bed for the video: slow pad chords, sparse bell notes, a soft echo, fades.
Writes public/ambient.wav (44.1 kHz stereo, 16-bit). Deterministic (fixed seed)."""
import sys, wave
import numpy as np

SR, DUR = 44100, float(sys.argv[1]) if len(sys.argv) > 1 else 90.0
t = np.arange(int(SR * DUR)) / SR
rng = np.random.default_rng(369)
hz = lambda m: 440.0 * 2 ** ((m - 69) / 12)

# A minor 9 → F maj7 → C add9 → G6, 10 s each, looping; voiced low and wide.
chords = [[45, 57, 60, 64, 71], [41, 53, 57, 60, 64], [48, 55, 60, 62, 67], [43, 55, 59, 62, 64]]
SEG = 10.0
pad = np.zeros((len(t), 2))
for k in range(int(np.ceil(DUR / SEG)) + 1):
    start = k * SEG - 2.0
    idx = (t >= start) & (t < start + SEG + 4.0)
    if not idx.any():
        continue
    tt = t[idx] - start
    env = np.clip(tt / 3.0, 0, 1) * np.clip((SEG + 4.0 - tt) / 3.0, 0, 1)  # 3 s swell in and out
    for j, m in enumerate(chords[k % 4]):
        f = hz(m)
        lfo = 1 + 0.003 * np.sin(2 * np.pi * (0.07 + 0.01 * j) * tt)
        tone = np.sin(2 * np.pi * f * lfo * tt) + 0.25 * np.sin(2 * np.pi * 2 * f * tt) + 0.08 * np.sin(2 * np.pi * 3 * f * tt)
        amp = (0.16 if m < 50 else 0.09) * env
        pan = 0.5 + 0.35 * np.sin(j * 1.7)
        pad[idx, 0] += tone * amp * (1 - pan)
        pad[idx, 1] += tone * amp * pan

# Sparse bell notes from the A minor pentatonic, every 2.5–5 s.
bells = np.zeros_like(pad)
scale = [69, 72, 74, 76, 79, 81, 84]
s = 4.0
while s < DUR - 4:
    m = scale[rng.integers(len(scale))]
    n = int(SR * 4.0); i0 = int(SR * s)
    tt = np.arange(min(n, len(t) - i0)) / SR
    tone = (np.sin(2 * np.pi * hz(m) * tt) + 0.3 * np.sin(2 * np.pi * hz(m) * 2.01 * tt)) * np.exp(-tt * 1.4) * 0.07
    p = rng.uniform(0.25, 0.75)
    bells[i0:i0 + len(tt), 0] += tone * (1 - p)
    bells[i0:i0 + len(tt), 1] += tone * p
    s += rng.uniform(2.5, 5.0)

mix = pad + bells
# Gentle low-pass (one pole) to keep it warm, then a stereo ping-pong echo for space.
a = np.exp(-2 * np.pi * 2800 / SR)
for ch in range(2):
    y = np.empty(len(mix)); acc = 0.0
    for i, x in enumerate(mix[:, ch]):
        acc = (1 - a) * x + a * acc
        y[i] = acc
    mix[:, ch] = y
d = int(SR * 0.42)
out = mix.copy()
for rep, g in enumerate([0.32, 0.2, 0.12, 0.07]):
    sh = d * (rep + 1)
    src = mix[:-sh] * g
    out[sh:, (rep + 1) % 2] += src[:, rep % 2]
fade = np.clip(t / 2.5, 0, 1) * np.clip((DUR - t) / 4.0, 0, 1)
out *= fade[:, None]
out *= 0.5 / np.max(np.abs(out))  # peak at -6 dBFS
pcm = (out * 32767).astype('<i2')
with wave.open(sys.argv[2] if len(sys.argv) > 2 else 'public/ambient.wav', 'wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(pcm.tobytes())
print(f'wrote {DUR:.0f}s ambient bed')
