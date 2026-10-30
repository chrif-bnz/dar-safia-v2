"""Partition synthétisée localement : nappes, pulsation douce, arpèges, montée et résolution.
Aucune échantillon externe. Sortie : WAV 48 kHz stéréo."""
import sys
import numpy as np
import wave

SR = 48000
DUR = float(sys.argv[2]) if len(sys.argv) > 2 else 76.0
OUT = sys.argv[1]
rng = np.random.default_rng(7)
N = int(SR * DUR)
t_all = np.arange(N) / SR


def hz(note):  # MIDI -> Hz
    return 440.0 * 2 ** ((note - 69) / 12)


def env_adsr(n, a, d, s, r):
    e = np.ones(n)
    na, nd, nr = int(a * SR), int(d * SR), int(r * SR)
    na = max(1, min(na, n))
    e[:na] = np.linspace(0, 1, na)
    nd = min(nd, n - na)
    if nd > 0:
        e[na:na + nd] = np.linspace(1, s, nd)
        e[na + nd:] = s
    nr = min(nr, n)
    if nr > 0:
        e[-nr:] *= np.linspace(1, 0, nr)
    return e


def add(buf, start, sig, pan=0.0, gain=1.0):
    i = int(start * SR)
    if i >= buf.shape[1]:
        return
    j = min(buf.shape[1], i + sig.shape[0])
    sig = sig[: j - i] * gain
    l = np.cos((pan + 1) * np.pi / 4)
    r = np.sin((pan + 1) * np.pi / 4)
    buf[0, i:j] += sig * l
    buf[1, i:j] += sig * r


def pad(freq, dur, bright=0.5, detune=0.004, a=2.5, r=3.0, partials=10):
    n = int(dur * SR)
    t = np.arange(n) / SR
    sig = np.zeros(n)
    for dt in (-detune, 0.0, detune):
        f = freq * (1 + dt)
        ph = rng.uniform(0, 2 * np.pi)
        for k in range(1, partials + 1):
            amp = (1.0 / k) * (bright ** (k - 1))
            sig += amp * np.sin(2 * np.pi * f * k * t + ph * k)
    sig *= env_adsr(n, a, 1.0, 0.85, r)
    # lent mouvement d'amplitude
    sig *= 0.85 + 0.15 * np.sin(2 * np.pi * rng.uniform(0.05, 0.12) * t + rng.uniform(0, 6))
    return sig / 3.0


def pluck(freq, dur=2.2, bell=True):
    n = int(dur * SR)
    t = np.arange(n) / SR
    sig = np.sin(2 * np.pi * freq * t) * np.exp(-t * 2.4)
    sig += 0.45 * np.sin(2 * np.pi * freq * 2 * t) * np.exp(-t * 3.2)
    if bell:
        sig += 0.22 * np.sin(2 * np.pi * freq * 3.01 * t) * np.exp(-t * 5.0)
        sig += 0.12 * np.sin(2 * np.pi * freq * 5.4 * t) * np.exp(-t * 7.0)
    sig *= np.minimum(1, t / 0.004)
    return sig * 0.5


def sub_hit(freq=46.0, dur=3.0):
    n = int(dur * SR)
    t = np.arange(n) / SR
    f = freq * (1 + 1.2 * np.exp(-t * 7))
    ph = 2 * np.pi * np.cumsum(f) / SR
    return np.sin(ph) * np.exp(-t * 1.3) * 0.9


def heartbeat(dur=0.5):
    n = int(dur * SR)
    t = np.arange(n) / SR
    f = 48 * (1 + 0.8 * np.exp(-t * 18))
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 9) * 0.55


def riser(dur, f0=300, f1=5200):
    n = int(dur * SR)
    t = np.arange(n) / SR
    noise = rng.standard_normal(n)
    # filtre passe-bande glissant approché : bruit modulé par sinus balayé
    f = f0 * (f1 / f0) ** (t / dur)
    ph = 2 * np.pi * np.cumsum(f) / SR
    shimmer = np.sin(ph) * 0.5 + noise * 0.25
    # lissage simple pour retirer le sifflement dur
    k = 24
    shimmer = np.convolve(shimmer, np.ones(k) / k, mode="same")
    env = (t / dur) ** 2.2
    return shimmer * env * 0.9


L = np.zeros((2, N))
D = np.zeros((2, N))  # voie « sèche » (accents)

S = {"hook": 0.0, "problem": 6.5, "brand": 20.6, "product": 31.9, "big": 54.3, "final": 66.3}

# ── Nappe : harmonie par sections ─────────────────────────────────────────
A = 33  # A1
def chord(notes, start, dur, bright=0.5, gain=1.0, a=2.5, r=3.0):
    for i, n in enumerate(notes):
        sig = pad(hz(n), dur, bright=bright, a=a, r=r)
        add(L, start, sig, pan=(-0.5 + i * 0.35) % 1.0 - 0.5, gain=gain * (0.9 if i else 1.0))

# Accroche : bourdon A1+E2, quasi sans harmonique
chord([33, 40], 0.0, 8.5, bright=0.35, gain=0.9, a=3.5, r=2.5)
# Problème : Am -> F -> Am -> Dm (tension)
chord([45, 52, 57, 60], 6.5, 7.5, bright=0.42, gain=0.55, a=2.2)       # Am
chord([41, 48, 53, 57], 13.5, 7.5, bright=0.42, gain=0.55, a=2.0)      # F
# Révélation : A majeur ouvert (se lève)
chord([33, 45, 52, 57, 61, 64], 20.6, 11.6, bright=0.55, gain=0.7, a=0.15, r=3.5)
# Produit : Amaj9 -> F#m7 -> D -> E
chord([45, 52, 56, 59, 64], 31.9, 6.0, bright=0.5, gain=0.5, a=1.2)    # A add9ish
chord([42, 49, 52, 57, 61], 37.9, 6.0, bright=0.5, gain=0.5, a=1.2)    # F#m7
chord([38, 45, 50, 54, 57], 43.9, 5.5, bright=0.5, gain=0.5, a=1.2)    # D
chord([40, 47, 52, 56, 59], 49.4, 5.0, bright=0.5, gain=0.5, a=1.2)    # E
# Grand tableau : montée (D -> E -> F#m -> E sus)
chord([38, 45, 50, 57, 62], 54.3, 4.0, bright=0.6, gain=0.6, a=0.8)
chord([40, 47, 52, 59, 64], 58.3, 4.0, bright=0.62, gain=0.65, a=0.8)
chord([42, 49, 54, 61, 66], 62.3, 4.0, bright=0.65, gain=0.7, a=0.8)
# Final : résolution A majeur add9, longue
chord([33, 45, 52, 57, 61, 64, 71], 66.3, DUR - 66.3 + 1.0, bright=0.55, gain=0.85, a=0.4, r=6.0)

# ── Cloches éparses (accroche) ───────────────────────────────────────────
for tt, n, pn in [(1.9, 81, -0.4), (3.5, 76, 0.4), (4.45, 88, 0.0), (5.4, 84, 0.3)]:
    add(L, tt, pluck(hz(n), 3.5), pan=pn, gain=0.22)

# ── Pulsation douce (problème et grand tableau) ──────────────────────────
for tt in np.arange(S["problem"] + 1.0, S["brand"] - 1.5, 1.1):
    add(D, tt, heartbeat(), gain=0.5 + 0.25 * (tt - S["problem"]) / (S["brand"] - S["problem"]))
for tt in np.arange(S["big"], S["final"] - 0.5, 0.9):
    add(D, tt, heartbeat(), gain=0.5)

# ── Montée -> impact de la révélation ────────────────────────────────────
add(D, 16.2, riser(S["brand"] - 0.25 - 16.2), gain=0.6)
add(D, S["brand"] - 0.25, sub_hit(), gain=0.9)
add(D, S["brand"] - 0.25, pluck(hz(93), 4.0), gain=0.14)

# ── Arpèges (produit) : pentatonique A majeur, croches à 90 bpm ──────────
pent = [69, 73, 76, 78, 81, 85, 88]  # A C# E F# A C# E (hautes)
step = 60 / 90 / 2
i = 0
tt = S["product"] + 0.4
while tt < S["big"] - 1.0:
    n = pent[(i * 3 + (i // 4)) % len(pent)]
    if i % 2 == 0:
        add(L, tt, pluck(hz(n), 2.0), pan=(-0.6 if i % 4 == 0 else 0.6), gain=0.17)
    tt += step * 2
    i += 1

# ── Grand tableau : arpèges plus larges + montée ────────────────────────
tt = S["big"] + 0.2
j = 0
while tt < S["final"] - 0.3:
    n = [66, 69, 73, 76, 78, 81][j % 6]
    add(L, tt, pluck(hz(n + 12 if j % 5 == 0 else n), 2.0), pan=(-0.5 if j % 2 else 0.5), gain=0.2)
    tt += 0.45
    j += 1
add(D, S["final"] - 2.6, riser(2.35, 500, 7000), gain=0.5)

# ── Final : impact doux + cloche haute ───────────────────────────────────
add(D, S["final"] + 0.45, sub_hit(44.0, 4.0), gain=0.75)
for dt, n in [(0.5, 93), (1.6, 88), (2.8, 81), (4.4, 100)]:
    add(L, S["final"] + dt, pluck(hz(n), 4.5), pan=0.0, gain=0.16)

# ── Réverbération (réponse impulsionnelle synthétique) ───────────────────
def reverb(sig, secs=3.4, wet=0.42):
    n = int(secs * SR)
    t = np.arange(n) / SR
    ir = rng.standard_normal(n) * np.exp(-t * 1.9)
    ir = np.convolve(ir, np.ones(6) / 6, mode="same")
    ir[0] = 0
    m = 1 << int(np.ceil(np.log2(sig.shape[0] + n)))
    out = np.fft.irfft(np.fft.rfft(sig, m) * np.fft.rfft(ir, m), m)[: sig.shape[0]]
    out /= np.max(np.abs(out)) + 1e-9
    return sig * (1 - wet) + out * wet * np.max(np.abs(sig))

for c in (0, 1):
    L[c] = reverb(L[c], 3.4, 0.5)
    D[c] = reverb(D[c], 1.8, 0.22) * 1.0

mix = L + D
# filtre passe-bas doux global (moyenne glissante) : retire l'aspect numérique
k = 3
for c in (0, 1):
    mix[c] = np.convolve(mix[c], np.ones(k) / k, mode="same")

# Enveloppe globale : entrée lente, sortie nette
g = np.ones(N)
g *= np.minimum(1, t_all / 2.5)
g *= np.minimum(1, np.maximum(0, (DUR - t_all) / 2.8))
mix *= g
peak = np.max(np.abs(mix))
mix = mix / peak * 0.72

pcm = (np.clip(mix.T, -1, 1) * 32767).astype("<i2")
with wave.open(OUT, "wb") as w:
    w.setnchannels(2)
    w.setsampwidth(2)
    w.setframerate(SR)
    w.writeframes(pcm.tobytes())
print("ok", OUT, DUR)
