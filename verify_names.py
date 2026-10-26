# -*- coding: utf-8 -*-
import sys
sys.stdout.reconfigure(encoding='utf-8')
import re

with open("data.js", "r", encoding="utf-8") as f:
    text = f.read()

# Pattern for teacher names and student names in data.js
names = re.findall(r'name:\s*"([^"]+)"', text)
print(f"Total 'name' fields found in data.js: {len(names)}")

whitelist = {
    "南投縣立南投國民中學", "墾丁福華渡假大飯店", "高雄義大天悅飯店",
    "義大遊樂世界", "國立海洋生物博物館", "田寮月世界", "貓鼻頭風景區",
    "旗津海岸公園", "奇美博物館", "名間親子生態園區", "義大天悅飯店",
    "南投國中", "合谷穴", "內關穴", "足三里穴"
}

suspicious = []
for n in names:
    if n in whitelist:
        continue
    # If it is a person name (2 to 4 chars), check if it has 'O'
    if len(n) <= 4:
        if "O" not in n and "o" not in n and "0" not in n:
            suspicious.append(n)

print(f"Suspicious unmasked names: {len(suspicious)}")
if suspicious:
    for s in suspicious:
        print("Found:", repr(s))
else:
    print("SUCCESS: 100% of student and teacher names in data.js are properly masked with 'O'!")
