#!/usr/bin/env python3
"""Cut out buses from their backgrounds using rembg with the small u2netp model."""
import os
from pathlib import Path
from PIL import Image

from rembg import remove, new_session

session = new_session("u2netp")

ROOT = Path("/home/z/my-project")
SRC = ROOT / "buses"
DST = ROOT / "buses-cut"
DST.mkdir(exist_ok=True)

for src_file in sorted(SRC.glob("bus-*.png")):
    dst_file = DST / src_file.name
    print(f"Processing {src_file.name}...", end=" ", flush=True)
    try:
        inp = Image.open(src_file).convert("RGB")
        out = remove(inp, session=session, alpha_matting=True,
                     alpha_matting_foreground_threshold=240,
                     alpha_matting_background_threshold=10,
                     alpha_matting_erode_size=10)
        out.save(dst_file, "PNG", optimize=True)
        print(f"OK ({out.mode}, {out.size})")
    except Exception as e:
        print(f"FAIL: {e}")

print("\nDone. Verifying...")
for f in sorted(DST.glob("*.png")):
    img = Image.open(f)
    if img.mode == "RGBA":
        a = img.getchannel("A").getextrema()
        print(f"  {f.name}: mode={img.mode} size={img.size} alpha={a}")
    else:
        print(f"  {f.name}: mode={img.mode} size={img.size} NO_ALPHA")
