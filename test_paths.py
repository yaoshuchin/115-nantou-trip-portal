# -*- coding: utf-8 -*-
"""
Verification script to ensure all referenced media paths in data.js exist on disk.
"""
import os
import json
import re

with open("data.js", "r", encoding="utf-8") as f:
    text = f.read()

m = re.search(r"const\s+UNITS_DATA\s*=\s*(\[[\s\S]*?\]);\s*\n", text)
if not m:
    print("Could not find UNITS_DATA")
    exit(1)

units = json.loads(m.group(1))

total_slides = 0
total_infos = 0
total_videos = 0
missing = []

for u in units:
    for s in u["slides"]:
        total_slides += 1
        if not os.path.exists(s):
            missing.append(f"Missing slide: {s}")
            
    for img in u["infographics"]:
        total_infos += 1
        if not os.path.exists(img):
            missing.append(f"Missing infographic: {img}")
            
    for v in u["videos"]:
        total_videos += 1
        if not os.path.exists(v["path"]):
            missing.append(f"Missing video: {v['path']}")

print(f"Total verified: {total_slides} slides, {total_infos} infographics, {total_videos} videos.")
if missing:
    print(f"ERROR: {len(missing)} files missing!")
    for m in missing[:10]:
        print(m)
else:
    print("SUCCESS: 100% of referenced files exist on disk! No broken links!")
