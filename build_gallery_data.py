# -*- coding: utf-8 -*-
"""
Builds complete photo gallery metadata with per-photo titles and descriptions for all 392 photos.
"""
import os
import sys
from PIL import Image
from PIL.ExifTags import TAGS

base_dir = r"C:\antigravity\1151026投中畢旅"

STATIONS_DEF = [
    {
        "id": "station-01",
        "folder": "s1151020畢旅行前會",
        "name": "行前說明會",
        "tag": "行前宣導",
        "day": "Day 0",
        "date": "115/10/20",
        "unitId": "unit-01",
        "unitTitle": "單元 01 · 官方行前解析",
        "description": "行前全方位整備說明會：手冊發放、日程規劃確認、隨身必備物品、環保減塑政策與校外生活常規宣導。"
    },
    {
        "id": "station-02",
        "folder": "s1151021-1-畢旅-出發",
        "name": "出發啟程",
        "tag": "啟程出發",
        "day": "Day 1",
        "date": "115/10/21",
        "unitId": "unit-02",
        "unitTitle": "單元 02 · 大客車逃生指南",
        "description": "南投國中中庭晨間集結、隨車領隊幹部介紹、團務編組行李登車與大客車黃金60秒逃生指引。"
    },
    {
        "id": "station-03",
        "folder": "s1151021-2-畢旅-月世界",
        "name": "田寮月世界",
        "tag": "地質科研",
        "day": "Day 1",
        "date": "115/10/21",
        "unitId": "unit-03",
        "unitTitle": "單元 03 · 高雄月世界地質",
        "description": "高雄田寮惡地地形考察：青灰岩鋸齒脊、泥岩高鹽鹼高透水特性探秘與環湖步道漫步探索。"
    },
    {
        "id": "station-04",
        "folder": "s1151021-3-畢旅-午餐",
        "name": "第一天午餐",
        "tag": "百人合菜",
        "day": "Day 1",
        "date": "115/10/21",
        "unitId": "unit-09",
        "unitTitle": "單元 09 · 百人團餐篩選",
        "description": "南下第一站風味合菜午餐：全校師生依桌次入座，品嚐在地熱騰騰料理，補充下午海生館豐沛體能。"
    },
    {
        "id": "station-05",
        "folder": "s1151021-4-畢旅-海生館",
        "name": "國立海洋生物博物館",
        "tag": "海洋生態",
        "day": "Day 1",
        "date": "115/10/21",
        "unitId": "unit-04",
        "unitTitle": "單元 04 · 墾丁生存指南",
        "description": "探索台灣水域館與珊瑚王國：走入 84 米海底隧道、世界水域館古代海洋、企鵝與巨鯨之路地標。"
    },
    {
        "id": "station-06",
        "folder": "s1151021--5-畢旅-貓鼻頭",
        "name": "貓鼻頭風景區",
        "tag": "海岸地景",
        "day": "Day 1",
        "date": "115/10/21",
        "unitId": "unit-05",
        "unitTitle": "單元 05 · 墾丁探索日誌",
        "description": "恆春半島南端地景界標：眺望巴士海峽與台灣海峽交匯、崩崖豆腐岩海蝕裙礁與班級壯闊大合影。"
    },
    {
        "id": "station-07",
        "folder": "s1151021-6-畢旅-晚餐",
        "name": "第一天晚餐",
        "tag": "在地風味",
        "day": "Day 1",
        "date": "115/10/21",
        "unitId": "unit-07",
        "unitTitle": "單元 07 · 第一天檢討會",
        "description": "恆春合菜晚宴饗宴：各班同學圍桌共享豐富菜色，補充首日充沛體力，聆聽晚間墾丁大街行前叮嚀。"
    },
    {
        "id": "station-08",
        "folder": "s1151021-7-畢旅-墾丁大街",
        "name": "墾丁大街夜間巡禮",
        "tag": "在地夜市",
        "day": "Day 1",
        "date": "115/10/21",
        "unitId": "unit-08",
        "unitTitle": "單元 08 · 墾丁夜市攻略",
        "description": "南台灣最熱鬧南洋風情夜市：同學分組結伴品嚐在地美食、體驗街頭氛圍與定點集合守時紀律。"
    },
    {
        "id": "station-09",
        "folder": "s1151021-8-畢旅-福華-查房",
        "name": "墾丁福華夜間查房",
        "tag": "飯店住宿",
        "day": "Day 1",
        "date": "115/10/21",
        "unitId": "unit-06",
        "unitTitle": "單元 06 · 墾丁福華入住",
        "description": "首晚入住墾丁福華渡假大飯店：隨團主任與各班導師逐房點名、檢查門禁水電安全與次日行程準備。"
    },
    {
        "id": "station-10",
        "folder": "s1151022-1-畢旅-義大世界白天",
        "name": "義大遊樂世界暢玩",
        "tag": "主題樂園",
        "day": "Day 2",
        "date": "115/10/22",
        "unitId": "unit-10",
        "unitTitle": "單元 10 · 義大世界攻略",
        "description": "高雄義大世界暢快狂歡：特洛伊城堡木馬前合影、聖托里尼希臘山城漫步與挑戰各項極限遊樂設施。"
    },
    {
        "id": "station-11",
        "folder": "s1151022-2-畢旅-義大世界夜間廣場",
        "name": "義大世界夜間廣場",
        "tag": "夜間散策",
        "day": "Day 2",
        "date": "115/10/22",
        "unitId": "unit-11",
        "unitTitle": "單元 11 · 義大防颱避雨總體規劃",
        "description": "歐風購物廣場與天悅飯店夜景：天幕廊道散步、大廳迎賓服務機器人互動與搭乘義大浪漫高空摩天輪。"
    },
    {
        "id": "station-12",
        "folder": "s1151022-3-畢旅夜間查房",
        "name": "義大天悅夜間查房",
        "tag": "晚點名安全",
        "day": "Day 2",
        "date": "115/10/22",
        "unitId": "unit-12",
        "unitTitle": "單元 12 · 颱風天防颱緊急會議",
        "description": "義大天悅飯店第二晚查房：校長與隨團師長手持名冊巡查客房走廊，關心同學身心狀況並確認門鎖安全。"
    },
    {
        "id": "station-13",
        "folder": "s1151023-1-畢旅投中回程",
        "name": "回程行車歡樂風光",
        "tag": "賦歸行車",
        "day": "Day 3",
        "date": "115/10/23",
        "unitId": "unit-13",
        "unitTitle": "單元 13 · 領隊真心話",
        "description": "第三日晨光賦歸：天悅飯店前整裝登車、國道北上車廂歡唱、心得分享交流與隨隊領隊真心感恩致詞。"
    },
    {
        "id": "station-14",
        "folder": "s1151023-2-畢旅投中解散",
        "name": "平安返校圓滿解散",
        "tag": "圓滿落幕",
        "day": "Day 3",
        "date": "115/10/23",
        "unitId": "unit-14",
        "unitTitle": "單元 14 · 奇美參訪與平安賦歸",
        "description": "車隊平安返抵南投國中：校門口交管指揮、同學依序提領行囊、隨團師長與花翎旅遊領隊群校門大合影。"
    }
]

def format_exif_time(t_str):
    if not t_str: return ""
    try:
        # e.g. "2026:10:21 07:37:22" -> "115/10/21 07:37"
        parts = t_str.split(" ")
        d_parts = parts[0].split(":")
        year = int(d_parts[0]) - 1911
        month = d_parts[1]
        day = d_parts[2]
        time_part = parts[1][:5] if len(parts) > 1 else ""
        return f"{year}/{month}/{day} {time_part}".strip()
    except:
        return t_str

# Pre-defined descriptive mapping templates for each station based on real scene sequence
def get_photo_caption(st_idx, photo_idx, total_photos, filename, exif_time):
    st_id = STATIONS_DEF[st_idx]["id"]
    time_display = format_exif_time(exif_time)
    
    # 1. 行前會 (7 photos)
    if st_id == "station-01":
        captions = [
            ("官方行動手冊實體書封面", "南投國中 115 學年度三年級戶外教育活動官方手冊封面，由花翎旅遊承辦印製，收錄完整日程與生活規範。"),
            ("國三全體同學中庭階梯集結", "國三全體 178 位同學於學校中庭石階席地就座，精神抖擻聆聽即將出發的畢業旅行重點叮嚀。"),
            ("師長逐項宣導行程與住宿紀律", "學務處師長手持麥克風與行程表，向全體同學宣導校外生活公約、分房守則與安全第一核心觀念。"),
            ("同學認真閱讀手冊確認分組與行程", "同學們人手一本官方活動手冊，專注翻閱核對所屬車次、墾丁福華與高雄天悅飯店分房及桌次安排。"),
            ("導師團隊強調環保減塑與隨身必備品", "隨團導師特別叮嚀減塑環保政策（飯店不提供一次性備品）、健保卡正本必帶及常備藥品整備要點。"),
            ("花翎旅遊領隊幹部向師生致意說明", "專業帶隊領隊團隊向全體師生自我介紹，詳細說明三日行程服務機制、緊急聯絡管道與集合默契。"),
            ("學務主任最後行前叮嚀與準時出發守則", "主任於行前會尾聲再次叮嚀出發日早晨 07:30 準時集合，勉勵大家展現投中優質常規，收穫珍貴回憶。")
        ]
        return captions[photo_idx] if photo_idx < len(captions) else ("行前說明宣導紀實", "國三全體師生於學校中庭進行行前說明會，齊心做好萬全行前準備。")
    
    # 2. 出發啟程 (19 photos)
    elif st_id == "station-02":
        if photo_idx == 0 or photo_idx == 1:
            return ("清晨中庭集結與師長早安致詞", "10/21 清晨 07:30，全體國三師生齊聚南投國中中庭，隨團主任與師長發表出發前祝福與動員勉勵。")
        elif photo_idx == 2 or photo_idx == 3:
            return ("隨團輔導員與領隊團隊就位", "花翎旅遊專業隨車領隊人員於司令台前就位，各車隨車導師核對同學名冊與出勤狀況。")
        elif photo_idx == 4 or photo_idx == 5:
            return ("畢旅官方識別團服正式亮相", "隨團幹部於台上展示本次戶外教學專屬活動團服與識別標籤，提醒同學穿著整齊隨身佩掛。")
        elif photo_idx in [6, 7]:
            return ("出發前隨車名冊最後確認", "隨團師長手持點名板，逐一確認全體 178 位同學均已到齊，準備依車次順序前往中庭走廊登車。")
        elif photo_idx in [8, 9, 10]:
            return ("各班整隊依序領取行李出發", "901 至 909 各班同學在導師帶領下整齊列隊，手拉行李箱依序步出中庭前往大客車停靠區。")
        elif photo_idx in [11, 12, 13]:
            return ("走廊整隊登車秩序井然", "各班排成長龍，大家神采奕奕推著行李箱穿越校園穿堂，展現南投國中高度紀律與秩序。")
        elif photo_idx in [14, 15, 16]:
            return ("排隊將行李箱送入大客車行李艙", "同學依序排隊，由司機大哥與領隊協助將大型行李妥善置入大客車下層行李廂，準備啟程。")
        elif photo_idx in [17, 18]:
            return ("全體同學依序上車繫妥安全帶", "全體上車就座，隨車領隊第一時間督促每位同學依規定繫好安全帶，維護行車生命安全。")
        else:
            return ("大客車黃金60秒安全逃生宣導影片", "大客車車載螢幕播映乘車安全影片，重點解析車用滅火器、車窗擊破器敲擊四角與安全門開啟要領。")
            
    # 3. 田寮月世界 (35 photos)
    elif st_id == "station-03":
        if photo_idx < 5:
            return (f"抵達田寮月世界遊客中心 (景點步道 #{photo_idx+1})", "大客車車隊順利抵達高雄田寮月世界地質公園，師生在晴朗陽光下整隊進入園區入口廣場。")
        elif photo_idx < 12:
            return (f"領隊導覽解說月世界青灰岩成因 #{photo_idx-4}", "隨隊導覽領隊帶領同學至地質解說牌前，生動解析惡地青灰岩如何由深海沉積泥質抬升演變而成。")
        elif photo_idx < 20:
            return (f"漫步月世界環狀木棧步道 #{photo_idx-11}", "同學們漫步於環狀步道，兩側盡是宛如月球表面般的裸露泥岩山脊，鋸齒狀侵蝕溝紋令人嘆為觀止。")
        elif photo_idx < 28:
            return (f"駐足眺望惡地奇景與山羊綠雕 #{photo_idx-19}", "同學在景觀台前合影留念，並認識早期田寮居民利用寸草難生的高鹽鹼地形飼養黑山羊的在地文化。")
        else:
            return (f"月世界地質步道探索與集合 #{photo_idx-27}", "完成惡地地質考察後，全體同學沿林蔭步道返回集合廣場，前往遊覽車準備出發享用午餐。")
            
    # 4. 第一天午餐 (21 photos)
    elif st_id == "station-04":
        if photo_idx < 5:
            return (f"車隊抵達南台灣特色餐廳大門 #{photo_idx+1}", "7 輛大客車依序停妥於寬敞停車場，同學精神奕奕下車，在領隊指引下列隊步入宴會廳。")
        elif photo_idx < 12:
            return (f"百人團體宴會廳依桌次入座 #{photo_idx-4}", "全校近兩百位師生依手冊桌次名單迅速對號入座，粉紅餐巾與喜氣圓桌展現熱絡氛圍。")
        elif photo_idx < 18:
            return (f"豐盛桌菜熱騰騰上桌共享美食 #{photo_idx-11}", "一道道美味海陸佳餚熱騰騰送上桌，同學互助盛飯夾菜，歡笑聲中補足滿滿體力。")
        else:
            return (f"隨團師長巡桌關心與用餐完畢整隊 #{photo_idx-17}", "校長與導師巡視各桌關心同學胃口，用餐完畢後各班發揮公德心整理桌面，準備前往海生館。")

    # 5. 海生館 (48 photos)
    elif st_id == "station-05":
        if photo_idx < 8:
            return (f"抵達國立海洋生物博物館大門廣場 #{photo_idx+1}", "南台灣艷陽高照，車隊抵達車城海生館，全體師生步入波浪造型的宏偉入口建築。")
        elif photo_idx < 16:
            return (f"漫步鯨魚親水廣場與世界水域館步道 #{photo_idx-7}", "穿過著名的巨型豆腐鯊親水噴泉，同學沿著迎風步道前往壯觀的世界水域館。")
        elif photo_idx < 24:
            return (f"巨鯨之路公共藝術與大王魷魚地標 #{photo_idx-15}", "佇立於世界水域館前的「巨鯨之路」大王魷魚金屬雕塑，成為各班熱門拍照打卡熱點。")
        elif photo_idx < 34:
            return (f"海底隧道探索與珊瑚王國奇幻光影 #{photo_idx-23}", "漫步於 84 米長透明海底隧道，魟魚、鯊魚與色彩斑斕的珊瑚礁魚群自頭頂悠游掠過。")
        elif photo_idx < 42:
            return (f"巨藻森林與極地水域企鵝互動觀察 #{photo_idx-33}", "參觀高達三層樓的巨大加州海藻林與極地企鵝館，同學紛紛拿出手機記錄生態奇景。")
        else:
            return (f"完成海洋問答學習單與園區集合集結 #{photo_idx-41}", "結合手冊中的 25 題海生館闖關學習單進行現場對照觀察，滿載豐富海洋知識準時集合。")

    # 6. 貓鼻頭 (56 photos)
    elif st_id == "station-06":
        if photo_idx < 8:
            return (f"車隊抵達貓鼻頭公園海崖停車場 #{photo_idx+1}", "大客車依序停靠貓鼻頭，碧海藍天映襯下，同學們頂著和煦海風整隊前往展望步道。")
        elif photo_idx < 18:
            return (f"步上觀景步道眺望裙礁與豆腐岩海岸 #{photo_idx-7}", "沿著地質步道前行，下方正是著名的典型珊瑚礁崩崖、海蝕溝與海蝕平台地貌。")
        elif photo_idx < 32:
            return (f"各班同學於海岬觀景台前歡樂合影 #{photo_idx-17}", "全班同學以巴士海峽與台灣海峽分界線為壯闊背景，迎著落山風綻放最青春燦爛的笑容。")
        elif photo_idx < 45:
            return (f"俯瞰如貓伏臥海面的巨型珊瑚礁岩 #{photo_idx-31}", "師長向同學解說貓鼻頭命名的由來——那塊從海崖滾落、外型酷似貓伏臥海上的珊瑚巨石。")
        else:
            return (f"夕陽斜照海面與步道回程整隊 #{photo_idx-44}", "金黃夕照灑在恆春半島海面，師生帶著滿滿的蔚藍海景回憶步行返回停車場。")

    # 7. 第一天晚餐 (17 photos)
    elif st_id == "station-07":
        if photo_idx < 5:
            return (f"恆春風味晚宴大廳入座整隊 #{photo_idx+1}", "傍晚抵達恆春特色宴會餐廳，歷經一整天充實地景探索，大家都期待豐盛的在地晚餐。")
        elif photo_idx < 11:
            return (f"品嚐南台灣海陸佳餚熱絡交流 #{photo_idx-4}", "餐桌上熱氣騰騰，在地時令時蔬與海味鮮美上桌，同桌好友邊吃邊聊分享海生館所見所聞。")
        else:
            return (f"師長說明墾丁大街夜間巡禮集結要領 #{photo_idx-10}", "用餐尾聲，學務主任與隨隊領隊向全體強調夜巡行人安全、小組結伴同行與集合時間。")

    # 8. 墾丁大街 (48 photos)
    elif st_id == "station-08":
        if photo_idx < 8:
            return (f"車隊抵達墾丁路與行前集結清點 #{photo_idx+1}", "遊覽車停靠於指定下車點，隨車導師逐班清點人數，發放集結識別卡並再三叮嚀安全。")
        elif photo_idx < 20:
            return (f"漫步南洋風情墾丁大街品嚐美食 #{photo_idx-7}", "大街兩側燈火輝煌，骰子牛、石板烤肉、熱帶水果冰品香氣四溢，同學結伴自由選購。")
        elif photo_idx < 36:
            return (f"特色紀念品攤位挑選與班級同窗同遊 #{photo_idx-19}", "各組同學在紀念品小鋪前挑選貝殼飾品與南台灣紀念品，留下難忘的國三畢旅夜市回憶。")
        else:
            return (f"指定集合點全員準時到齊整隊上車 #{photo_idx-35}", "全體同學嚴格遵守時間紀律，提早抵達集合地清點人數，帶著滿滿戰利品準時返車。")

    # 9. 墾丁福華查房 (15 photos)
    elif st_id == "station-09":
        if photo_idx < 4:
            return (f"隨團師長巡視福華渡假飯店客房長廊 #{photo_idx+1}", "晚間 21:30 查房時間，隨團主任與各班導師手持房號名冊，於福華飯店客房迴廊巡查。")
        elif photo_idx < 9:
            return (f"逐間敲門點名確認同學安全在房 #{photo_idx-3}", "師長逐一核對各房同學是否全員到齊，檢查房門防盜扣鎖閉情況，宣導夜間嚴禁串門子。")
        elif photo_idx < 12:
            return (f"關心同學體能與次日沙灘活動叮嚀 #{photo_idx-8}", "導師親切關懷每位同學身體是否有不適，提醒多喝水、早點就寢以儲備明日義大體力。")
        else:
            return (f"翌日清晨福華飯店晨景與行李上車 #{photo_idx-11}", "晨光透過天井灑入大廳，同學整理個人行囊推至大廳集合上車，迎接第二天義大行程。")

    # 10. 義大遊樂世界白天 (71 photos)
    elif st_id == "station-10":
        if photo_idx < 10:
            return (f"車隊抵達義大世界並整隊領取門票 #{photo_idx+1}", "7 輛大客車抵達義大遊樂世界，同學精神振奮下車整隊，領取樂園入園手環與 100 元餐券。")
        elif photo_idx < 22:
            return (f"特洛伊城堡巨型木馬前大合照 #{photo_idx-9}", "佇立於特洛伊城堡前的雄偉木馬地標，同學們紛紛以各種創意 pose 留下珍貴青春剪影。")
        elif photo_idx < 38:
            return (f"聖托里尼山城希臘風情漫步散策 #{photo_idx-21}", "藍白相間的希臘愛琴海浪漫建築群，宛如置身歐洲地中海，是同學最愛的自拍與合影打卡點。")
        elif photo_idx < 55:
            return (f"極限設施挑戰天旋地轉與海盜船 #{photo_idx-37}", "尖叫聲連連！同學成群結隊挑戰驚險刺激的天旋地轉、極限挑戰與飛天神戟，膽量大考驗。")
        else:
            return (f"戶外特技大秀觀賞與園區紀念品挑選 #{photo_idx-54}", "觀賞精彩的街頭默劇與特技遊行，並於紀念品專賣店選購義大犀牛吉祥物紀念品。")

    # 11. 義大夜間廣場 (21 photos)
    elif st_id == "station-11":
        if photo_idx < 6:
            return (f"義大世界購物廣場大廳與迎賓機器人 #{photo_idx+1}", "晚間漫步至義大購物廣場大廳，同學開心地與智慧型迎賓服務機器人進行趣味互動。")
        elif photo_idx < 12:
            return (f"漫步歐式羅馬拱頂天幕長廊 #{photo_idx-5}", "抬頭仰望彩繪變幻雲彩的室內羅馬天幕長廊，華麗噴泉與精品街區營造浪漫異國情調。")
        else:
            return (f"搭乘義大高空摩天輪俯瞰大高雄璀璨夜景 #{photo_idx-11}", "車廂緩緩升至百米高空，全體同學遠眺大高雄萬家燈火與璀璨摩天輪霓虹，沉醉在美好夜色中。")

    # 12. 義大天悅夜間查房 (10 photos)
    elif st_id == "station-12":
        if photo_idx < 3:
            return (f"校長與隨團師長手持名冊巡查客房走廊 #{photo_idx+1}", "夜間 21:30，校長、學務主任與各班導師親自前往高雄義大天悅飯店各樓層逐一查房。")
        elif photo_idx < 7:
            return (f"逐房晚點名與檢查門禁防盜鎖 #{photo_idx-2}", "師長敲門進房確認每間寢室人數，實地檢查房門門鎖、防盜鏈扣鎖及窗戶安全無虞。")
        else:
            return (f"親切關懷同學身心與明晨退房交代 #{photo_idx-6}", "叮嚀同學洗完澡後準時關燈就寢，提醒將大型行李箱打包妥當，明天準時退房返程。")

    # 13. 回程行車風光 (13 photos)
    elif st_id == "station-13":
        if photo_idx < 4:
            return (f"義大天悅飯店晨曦與摩天輪藍天晨景 #{photo_idx+1}", "第三天清晨，蔚藍天空中義大摩天輪格外耀眼，師生享用完豐盛自助早餐後整隊登車。")
        elif photo_idx < 9:
            return (f"大客車國道北上行車車景與窗外風光 #{photo_idx-3}", "車隊行駛於國道一號與三號公路，沿途藍天白雲相伴，車廂內歌聲與歡笑聲此起彼落。")
        else:
            return (f"隨車領隊真心話感性分享與同學致謝 #{photo_idx-8}", "隨隊領隊手持麥克風發表真心話，感謝全體同學三天的配合與懂事，全車熱烈鼓掌致意。")

    # 14. 平安返校解散 (11 photos)
    else:
        if photo_idx < 4:
            return (f"大客車平安返抵南投國中校門口 #{photo_idx+1}", "中午時分，7 輛大客車在隨隊工作人員與教官指揮交通下，安全駛抵南投國中大門。")
        elif photo_idx < 8:
            return (f"同學依序下車從大客車行李艙領取行李箱 #{photo_idx-3}", "同學們精神飽滿地下車，從行李廂取出隨身大行李，與同班好友開心分享這三天的美好收穫。")
        else:
            return (f"花翎旅遊專業領隊團隊與隨團師長校門口大合影 #{photo_idx-7}", "三天兩夜畢業旅行圓滿順利落幕！辛苦付出的隨團師長與花翎旅遊領隊群於校門口留下成功大合影。")

def build():
    sys.stdout.reconfigure(encoding='utf-8')
    all_stations = []
    all_photos = []
    
    global_p_idx = 0
    
    for st_idx, st in enumerate(STATIONS_DEF):
        folder_name = st["folder"]
        folder_path = os.path.join(base_dir, folder_name)
        if not os.path.exists(folder_path):
            print(f"Warning: folder missing: {folder_path}")
            continue
            
        file_list = sorted([f for f in os.listdir(folder_path) if f.lower().endswith(('.jpg', '.jpeg', '.png'))])
        st_photos = []
        times = []
        
        for p_idx, fname in enumerate(file_list):
            full_path = os.path.join(folder_path, fname)
            rel_src = f"{folder_name}/{fname}".replace("\\", "/")
            w, h = 800, 450
            exif_time = ""
            try:
                with Image.open(full_path) as im:
                    w, h = im.size
                    ex = im._getexif()
                    if ex:
                        for k, v in ex.items():
                            if TAGS.get(k, k) == 'DateTimeOriginal':
                                exif_time = v
                                break
            except: pass
            
            if exif_time:
                times.append(exif_time)
                
            title, caption = get_photo_caption(st_idx, p_idx, len(file_list), fname, exif_time)
            
            photo_obj = {
                "id": f"p-{st_idx+1:02d}-{p_idx+1:02d}",
                "globalIndex": global_p_idx,
                "stationId": st["id"],
                "stationName": st["name"],
                "stationTag": st["tag"],
                "day": st["day"],
                "date": st["date"],
                "unitId": st["unitId"],
                "unitTitle": st["unitTitle"],
                "folder": folder_name,
                "fileName": fname,
                "src": rel_src,
                "width": w,
                "height": h,
                "aspectRatio": round(w / h, 2) if h > 0 else 1.78,
                "time": format_exif_time(exif_time),
                "rawTime": exif_time,
                "title": title,
                "caption": caption
            }
            st_photos.append(photo_obj)
            all_photos.append(photo_obj)
            global_p_idx += 1
            
        start_time_fmt = format_exif_time(times[0]) if times else ""
        end_time_fmt = format_exif_time(times[-1]) if times else ""
        time_range = f"{start_time_fmt.split(' ')[-1]} ~ {end_time_fmt.split(' ')[-1]}" if (start_time_fmt and end_time_fmt) else ""
        
        st_obj = {
            "id": st["id"],
            "stationIndex": st_idx + 1,
            "folder": folder_name,
            "name": st["name"],
            "tag": st["tag"],
            "day": st["day"],
            "date": st["date"],
            "timeRange": time_range,
            "startTime": start_time_fmt,
            "endTime": end_time_fmt,
            "unitId": st["unitId"],
            "unitTitle": st["unitTitle"],
            "photoCount": len(st_photos),
            "coverPhoto": st_photos[0]["src"] if st_photos else "",
            "description": st["description"],
            "photos": st_photos
        }
        all_stations.append(st_obj)
        print(f"Station {st_idx+1:02d}: {st['name']} -> {len(st_photos)} photos ({time_range})")
        
    print(f"\nTotal Processed Stations: {len(all_stations)}, Total Photos: {len(all_photos)}")
    return all_stations, all_photos

if __name__ == "__main__":
    stations, photos = build()
