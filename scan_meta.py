# -*- coding: utf-8 -*-
"""
Script to scan 14 multimedia folders and build unified metadata for the website.
"""
import os
import re
import json

def natural_sort_key(s):
    return [int(text) if text.isdigit() else text.lower() for text in re.split(r'(\d+)', s)]

base_dir = r"C:\antigravity\1151026投中畢旅"

UNIT_CONFIG = [
    {
        "id": "unit-01",
        "folder": "1151020-投襅旅行前會",
        "tabName": "行前說明解析",
        "title": "單元 01 · 1151020 畢旅大作戰：南投國中官方行前解析",
        "tag": "行前整備",
        "date": "115/10/20",
        "icon": "clipboard-list",
        "description": "行前全方位說明：日程規劃、出發集合、隨身必備物品、環保減塑無提供一次性備品政策與校外安全規範總整理。"
    },
    {
        "id": "unit-02",
        "folder": "1151021-08-投中畢旅大客車逃指南",
        "tabName": "大客車安全",
        "title": "單元 02 · 1151021-08 大客車逃生：黃金60秒保命指南",
        "tag": "交通安全",
        "date": "115/10/21 08:00",
        "icon": "bus",
        "description": "行車安全第一課：大客車逃生門位置、車窗擊破器四角敲擊法、滅火器使用要領（拉瞄壓掃）與車內黃金 60 秒疏散指引。"
    },
    {
        "id": "unit-03",
        "folder": "1151021-09-投中畢旅-月世界",
        "tabName": "田寮月世界",
        "title": "單元 03 · 1151021-09 高雄月世界的泥土為何能「養」羊？",
        "tag": "自然地質",
        "date": "115/10/21 10:00",
        "icon": "mountain",
        "description": "田寮月世界泥岩惡地成因剖析、青灰岩高鹽鹼環境特性、在地植被適應與歷史人文背景深度導覽。"
    },
    {
        "id": "unit-04",
        "folder": "1151021-13-投襅旅墾丁畢旅終極生存指南",
        "tabName": "墾丁生存指南",
        "title": "單元 04 · 1151021-13 墾丁畢旅終極生存指南：地景與生態",
        "tag": "生態探索",
        "date": "115/10/21 13:30",
        "icon": "compass",
        "description": "解密國立海洋生物博物館三大展館、恆春半島落山風與珊瑚礁裙礁地形，以及南台灣防曬抗熱終極裝備心法。"
    },
    {
        "id": "unit-05",
        "folder": "1151021-16-投襅旅-墾丁畢旅探索日誌",
        "tabName": "墾丁探索日誌",
        "title": "單元 05 · 1151021-16 墾丁畢旅探索日誌：貓鼻頭與大街夜巡",
        "tag": "海洋與文化",
        "date": "115/10/21 16:20",
        "icon": "water",
        "description": "貓鼻頭崩崖海蝕地形觀察、巴士海峽與台灣海峽界標、墾丁大街夜間巡禮消費避坑與隊伍集結要點。"
    },
    {
        "id": "unit-06",
        "folder": "1151021-18-投中畢旅E-墾丁度假入住與安全指南3",
        "tabName": "墾丁福華入住",
        "title": "單元 06 · 1151021-18 墾丁福華渡假大飯店入住與安全指南",
        "tag": "住宿公約",
        "date": "115/10/21 19:20",
        "icon": "hotel",
        "description": "第一晚入住墾丁福華大飯店公約：房卡保管、水電消防避難動線、晚點名程序、嚴禁擅自夜間外出與水域安全規定。"
    },
    {
        "id": "unit-07",
        "folder": "1151021-21-投襅旅-檢討會",
        "tabName": "第一天檢討",
        "title": "單元 07 · 1151021-21 畢旅第一天檢討會：明日行程與注意事項",
        "tag": "團務檢討",
        "date": "115/10/21 21:30",
        "icon": "comments",
        "description": "首日行程回顧與各班狀況檢討；第二天沙灘趣味競賽、前往義大世界動線規劃、體力調配與早晨集合出發重點。"
    },
    {
        "id": "unit-08",
        "folder": "1151022-09-畢旅超強攻略",
        "tabName": "墾丁夜市",
        "title": "單元 08 · 墾丁夜市探索：美食巡禮與夜間常規全攻略",
        "tag": "夜市探訪",
        "date": "115/10/21 18:30",
        "icon": "shopping-bag",
        "description": "南台灣最熱鬧南洋風情夜市：同學分組結伴品嚐在地美食、體驗街頭氛圍、辨識合理物價與定點集合守時紀律。"
    },
    {
        "id": "unit-09",
        "folder": "1151022-10-投中畢旅墾丁畢旅生存指南best",
        "tabName": "百人團餐篩選",
        "title": "單元 09 · 1151022-10 揭秘百人旅行團的餐廳篩選漏斗",
        "tag": "飲食安全",
        "date": "115/10/22 10:00",
        "icon": "utensils",
        "description": "大型學校團體餐飲安全幕後流程：衛福部食品安全認證、產銷履歷、出餐速度動線規劃、餐桌禮儀與廚餘減量。"
    },
    {
        "id": "unit-10",
        "folder": "1151022-11-投中畢旅-義大世界畢旅最強攻略3best",
        "tabName": "義大最強攻略",
        "title": "單元 10 · 1151022-11 義大遊樂世界最強全攻略：隱藏路線與設施",
        "tag": "樂園玩樂",
        "date": "115/10/22 11:30",
        "icon": "gamepad",
        "description": "義大三大園區（衛城、聖托里尼山城、特洛伊城堡）高效排隊秘訣、天旋地轉/極限挑戰攻略與拍照打卡最佳機位。"
    },
    {
        "id": "unit-11",
        "folder": "1151022-16-畢旅防颱應變懶人包義大畢旅生存指南",
        "tabName": "義大總體規劃",
        "title": "單元 11 · 1151022-16 義大世界畢旅混亂背後的完美總體規劃",
        "tag": "園區統籌",
        "date": "115/10/22 16:00",
        "icon": "map",
        "description": "樂園人流管制與安全應變手冊、夜間購物中心集結、高空摩天輪安全搭乘指引與天悅飯店入住查房準備。"
    },
    {
        "id": "unit-12",
        "folder": "1151022-18-畢旅颱風天賢急會議",
        "tabName": "防颱緊急應變",
        "title": "單元 12 · 1151022-18 防颱應變懶人包：危機處理與行政統籌",
        "tag": "應變機制",
        "date": "115/10/22 18:00",
        "icon": "shield-alt",
        "description": "校外教學颱風/豪雨天候突發應變機制、師生安全第一原則、室內備案行程啟動演練與校方行政協調硬實力剖析（含4部專題影音）。"
    },
    {
        "id": "unit-13",
        "folder": "1151023-10-畢旅終點站領隊真心話",
        "tabName": "領隊真心話",
        "title": "單元 13 · 1151023-10 畢旅終點站：領隊看不見的面貌與最後一課",
        "tag": "生命教育",
        "date": "115/10/23 10:00",
        "icon": "heart",
        "description": "隨團領隊小鹿與師長們 24 小時守護的幕後點滴、感恩隨隊工作人員、同儕互助與即將邁向國三衝刺的成長期許。"
    },
    {
        "id": "unit-14",
        "folder": "1151023-線上-奇美博物館參訪攻略",
        "tabName": "奇美博物館",
        "title": "單元 14 · 1151023 奇美博物館與法老特展參訪全攻略",
        "tag": "藝術美育",
        "date": "115/10/23 13:30",
        "icon": "landmark",
        "description": "奇美博物館阿波羅噴泉、西洋兵器/樂器/雕塑常設展廳導覽、古埃及法老特展精選展品賞析與名間親子生態園區大合影指南。"
    }
]

def scan_all():
    results = []
    for cfg in UNIT_CONFIG:
        folder_name = cfg["folder"]
        folder_path = os.path.join(base_dir, folder_name)
        if not os.path.exists(folder_path):
            print(f"Warning: {folder_path} not found")
            continue
        
        jpgs = []
        pngs = []
        mp4s = []
        
        for root, dirs, files in os.walk(folder_path):
            for f in files:
                rel = os.path.relpath(os.path.join(root, f), base_dir).replace("\\", "/")
                if f.lower().endswith(".jpg"):
                    jpgs.append(rel)
                elif f.lower().endswith(".png"):
                    pngs.append(rel)
                elif f.lower().endswith(".mp4"):
                    sz = round(os.path.getsize(os.path.join(root, f)) / (1024 * 1024), 2)
                    mp4s.append({
                        "name": f,
                        "path": rel,
                        "size_mb": sz
                    })
        
        jpgs.sort(key=natural_sort_key)
        pngs.sort(key=natural_sort_key)
        mp4s.sort(key=lambda x: natural_sort_key(x["name"]))
        
        item = dict(cfg)
        item["slides"] = jpgs
        item["slideCount"] = len(jpgs)
        item["infographics"] = pngs
        item["infoCount"] = len(pngs)
        item["videos"] = mp4s
        item["videoCount"] = len(mp4s)
        results.append(item)
    
    return results

if __name__ == "__main__":
    data = scan_all()
    print(f"Scanned {len(data)} units successfully.")
    for d in data:
        print(f"[{d['id']}] {d['tabName']}: {d['slideCount']} slides, {d['infoCount']} PNGs, {d['videoCount']} MP4s")
