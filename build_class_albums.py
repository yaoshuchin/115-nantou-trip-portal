# -*- coding: utf-8 -*-
"""
build_class_albums.py
掃描並建立 301 ~ 309 全校 9 個班級畢旅專屬相簿資料 (共 908 張現場相片)
包含尺寸、長寬比、EXIF 時間、導師與車次關聯、Padlet 雲端相簿連結
"""
import os
import sys
import re

if sys.stdout.encoding != 'utf-8':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass
from PIL import Image
from PIL.ExifTags import TAGS

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

CLASSES_CONFIG = [
    {
        "classId": "301",
        "className": "301 班",
        "folder": "s301",
        "mentor": "吳OO 導師",
        "bus": 2,
        "studentsCount": 19,
        "detail": "男 11 · 女 8 (共 19 人)",
        "padletUrl": "https://padlet.com/qianyikeji1/301-s024ojlda9hk5xe7np2t",
        "description": "南投國中 115 學年度 301 班畢業旅行精選相簿，記錄全班三日二夜的知性參訪、同儕歡笑與珍貴時光。"
    },
    {
        "classId": "302",
        "className": "302 班",
        "folder": "s302",
        "mentor": "黃OO 導師",
        "bus": 2,
        "studentsCount": 19,
        "detail": "男 8 · 女 11 (共 19 人)",
        "padletUrl": "https://padlet.com/qianyikeji1/302-s024okmini4rgymbs9yw",
        "description": "南投國中 115 學年度 302 班畢業旅行精選相簿，捕捉陽光墾丁、義大樂園與青春活力的每一刻。"
    },
    {
        "classId": "303",
        "className": "303 班",
        "folder": "s303",
        "mentor": "陳OO 導師",
        "bus": 3,
        "studentsCount": 23,
        "detail": "男 11 · 女 12 (共 23 人)",
        "padletUrl": "https://padlet.com/qianyikeji1/303-s024okmwsdwvjgadya4k",
        "description": "南投國中 115 學年度 303 班畢業旅行精選相簿，定格海生館海底隧道、踏浪歡笑與班級凝聚力。"
    },
    {
        "classId": "304",
        "className": "304 班",
        "folder": "s304",
        "mentor": "蔡OO 導師",
        "bus": 1,
        "studentsCount": 19,
        "detail": "男 10 · 女 9 (共 19 人)",
        "padletUrl": "https://padlet.com/qianyikeji1/304-s024oknt94p6yo7etau4",
        "description": "南投國中 115 學年度 304 班畢業旅行精選相簿，跟隨第一車領隊導航，記錄充滿熱情與探索的南台灣旅程。"
    },
    {
        "classId": "305",
        "className": "305 班",
        "folder": "s305",
        "mentor": "施OO 導師",
        "bus": 4,
        "studentsCount": 21,
        "detail": "男 11 · 女 10 (共 21 人)",
        "padletUrl": "https://padlet.com/qianyikeji1/305-s024oo9ogma3cyhep5cm",
        "description": "南投國中 115 學年度 305 班畢業旅行精選相簿，記錄田寮月世界地質考察、墾丁夜市與義大歡樂身影。"
    },
    {
        "classId": "306",
        "className": "306 班",
        "folder": "s306",
        "mentor": "石OO 導師",
        "bus": 5,
        "studentsCount": 24,
        "detail": "男 13 · 女 11 (共 24 人)",
        "padletUrl": "https://padlet.com/qianyikeji1/306-s024oo9zjhfilzg9gncp",
        "description": "南投國中 115 學年度 306 班畢業旅行精選相簿，定格第五車熱情奔放的同窗默契與青春印記。"
    },
    {
        "classId": "307",
        "className": "307 班",
        "folder": "s307",
        "mentor": "孫OO 導師",
        "bus": 6,
        "studentsCount": 22,
        "detail": "男 11 · 女 11 (共 22 人)",
        "padletUrl": "https://padlet.com/qianyikeji1/307-s024oo9oyvf8h7964ydm",
        "description": "南投國中 115 學年度 307 班畢業旅行精選相簿，記錄第六車熱鬧非凡的乘車時光與三日豐富景點踏查。"
    },
    {
        "classId": "308",
        "className": "308 班",
        "folder": "s308",
        "mentor": "李OO 導師",
        "bus": 6,
        "studentsCount": 9,
        "detail": "男 6 · 女 3 (共 9 人)",
        "padletUrl": "https://padlet.com/qianyikeji1/308-s024oo961fnycpk4lm5u",
        "description": "南投國中 115 學年度 308 班畢業旅行精選相簿，捕捉溫馨精緻的班級情感與難忘的國中回憶。"
    },
    {
        "classId": "309",
        "className": "309 班",
        "folder": "s309",
        "mentor": "黃OO 導師",
        "bus": 7,
        "studentsCount": 22,
        "detail": "男 10 · 女 12 (共 22 人)",
        "padletUrl": "https://padlet.com/qianyikeji1/309-s024oo9qzxaowa80fjlz",
        "description": "南投國中 115 學年度 309 班畢業旅行精選相簿，第七車齊心協力，記錄最璀璨熱血的畢業旅行紀實。"
    }
]

def format_exif_time(t_str):
    if not t_str:
        return ""
    try:
        parts = t_str.split(" ")
        d_parts = parts[0].split(":")
        year = int(d_parts[0]) - 1911
        month = d_parts[1]
        day = d_parts[2]
        time_part = parts[1][:5] if len(parts) > 1 else ""
        return f"{year}/{month}/{day} {time_part}".strip()
    except Exception:
        return t_str

def natural_sort_key(s):
    return [int(text) if text.isdigit() else text.lower() for text in re.split(r'(\d+)', s)]

def build_class_albums():
    class_albums = []
    all_class_photos = []
    global_counter = 1

    print("=== 開始掃描 301 ~ 309 各班畢旅相簿 ===")

    for cfg in CLASSES_CONFIG:
        folder_path = os.path.join(BASE_DIR, cfg["folder"])
        if not os.path.exists(folder_path):
            print(f"警告：找不到資料夾 {cfg['folder']}")
            continue

        raw_files = [f for f in os.listdir(folder_path) if f.lower().endswith(('.jpg', '.jpeg', '.png', '.webp'))]
        raw_files.sort(key=natural_sort_key)

        photos = []
        times = []

        for idx, fname in enumerate(raw_files, start=1):
            full_path = os.path.join(folder_path, fname)
            rel_src = f"{cfg['folder']}/{fname}".replace("\\", "/")
            w, h = 800, 600
            exif_time = None

            try:
                with Image.open(full_path) as im:
                    w, h = im.size
                    ex = im._getexif()
                    if ex:
                        for k, v in ex.items():
                            if TAGS.get(k, k) == 'DateTimeOriginal':
                                exif_time = str(v).strip()
                                break
            except Exception as e:
                pass

            if exif_time:
                times.append(exif_time)

            formatted_time = format_exif_time(exif_time)
            photo_num_match = re.search(r'(\d+)\.(?:jpg|jpeg|png)', fname, re.IGNORECASE)
            p_num_str = photo_num_match.group(1) if photo_num_match else f"{idx:03d}"

            title = f"{cfg['className']} 現場紀實 #{p_num_str}"
            caption = f"南投國中 115 學年度 {cfg['className']}（隨車第 {cfg['bus']} 車 · {cfg['mentor']}）畢業旅行現場精彩紀實相片。"
            if formatted_time:
                caption += f" 拍攝時間：{formatted_time}。"

            photo_obj = {
                "id": f"cp-{cfg['classId']}-{idx:03d}",
                "globalIndex": global_counter,
                "classId": cfg["classId"],
                "className": cfg["className"],
                "mentor": cfg["mentor"],
                "bus": cfg["bus"],
                "folder": cfg["folder"],
                "fileName": fname,
                "src": rel_src,
                "width": w,
                "height": h,
                "aspectRatio": round(w / h, 2) if h > 0 else 1.33,
                "time": formatted_time,
                "rawTime": exif_time or "",
                "title": title,
                "caption": caption
            }

            photos.append(photo_obj)
            all_class_photos.append(photo_obj)
            global_counter += 1

        album_obj = {
            "classId": cfg["classId"],
            "className": cfg["className"],
            "folder": cfg["folder"],
            "mentor": cfg["mentor"],
            "bus": cfg["bus"],
            "studentsCount": cfg["studentsCount"],
            "detail": cfg["detail"],
            "padletUrl": cfg["padletUrl"],
            "description": cfg["description"],
            "photoCount": len(photos),
            "coverPhoto": photos[0]["src"] if photos else "",
            "photos": photos
        }
        class_albums.append(album_obj)
        print(f"✅ {cfg['className']}: 讀取 {len(photos)} 張相片 (首張: {album_obj['coverPhoto']})")

    print(f"\n🎉 班級相簿建置完成！共 {len(class_albums)} 個班級，{len(all_class_photos)} 張相片。\n")
    return class_albums, all_class_photos

if __name__ == "__main__":
    albums, photos = build_class_albums()
