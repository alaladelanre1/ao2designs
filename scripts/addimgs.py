#!/usr/bin/env python3
"""Download Figma raw images and append IMG records to a case-study dump.

usage: addimgs.py SLUG "UUID UUID ..." "y,x,w,h[,alt];y,x,w,h[,alt];..."
Small assets (< 300px wide, e.g. logos) are skipped. Each slot gets the downloaded image whose
aspect ratio fits best, preferring images that haven't been used yet.
"""
import subprocess, sys, os, re, math
slug, ids, nodes = sys.argv[1], sys.argv[2].split(), sys.argv[3]
out = f"public/img/{slug}"; os.makedirs(out, exist_ok=True)
def dims(f):
    t = subprocess.run(["sips", "-g", "pixelWidth", "-g", "pixelHeight", "-g", "format", f], capture_output=True, text=True).stdout
    return int(re.search(r"pixelWidth: (\d+)", t).group(1)), int(re.search(r"pixelHeight: (\d+)", t).group(1)), re.search(r"format: (\w+)", t).group(1)
imgs = []
for i, u in enumerate(ids, 1):
    tmp = f"{out}/tmp{i:02d}"
    subprocess.run(["curl", "-sfL", "-o", tmp, f"https://www.figma.com/api/mcp/asset/{u}"], check=True)
    w, h, fmt = dims(tmp)
    if w < 300: os.remove(tmp); continue
    ext = "jpg" if fmt == "jpeg" else "png"
    f = f"{out}/{i:02d}.{ext}"; os.replace(tmp, f)
    imgs.append((os.path.basename(f), w / h, 0))
used = {}
lines = []
for n in filter(None, nodes.split(";")):
    p = n.split(",", 4); y, x, w, h = p[:4]; alt = p[4] if len(p) > 4 else "App screen"
    r = int(w) / int(h)
    best = min(imgs, key=lambda m: abs(math.log(r / m[1])) + 0.25 * used.get(m[0], 0))
    used[best[0]] = used.get(best[0], 0) + 1
    lines.append(f"IMG|{y}|{x}|{w}|{h}|/img/{slug}/{best[0]}|{alt}")
open(f"src/data/projects/dumps/{slug}.txt", "a").write("\n".join(lines) + "\n")
print(len(imgs), "images kept;", len(lines), "slots;", len(used), "distinct used")
