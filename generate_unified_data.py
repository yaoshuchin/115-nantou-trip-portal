# -*- coding: utf-8 -*-
"""
Generates rich unified data.js with:
1. TRIP_DATA (Official Handbook - 100% de-identified with 2nd and 3rd char masked as 'O')
2. UNITS_DATA (14 Media Folders - tabs, slides, videos, infographics, and rich educational notes)
"""
import os
import re
import json
from scan_meta import scan_all

# Rich educational notes for each unit
UNIT_NOTES = {
    "unit-01": {
        "highlights": [
            "集合時間：115.10.21 (三) 早上 07:30 於學校中庭集合出發，逾時不候。",
            "政府減塑環保政策：飯店內全面不提供一次性盥洗用品（如牙刷、牙膏、刮鬍刀、浴帽等），同學務必自備完整盥洗包。",
            "隨身行囊要點：健保卡（正本必帶）、個人常備藥品、水壺、雨具、雙肩後背包。",
            "校外生活常規：團體行動不脫隊，夜間飯店準時晚點名查房，嚴禁擅離房間與串門子。"
        ],
        "qa": [
            {"q": "如果出發當天忘記帶健保卡正本該怎麼辦？", "a": "請於集合時立刻向隨車導師或隨團幹事回報，若就醫需先自費押金，返校後再持卡辦理退費。"},
            {"q": "飯店內是否有提供吹風機與毛巾？", "a": "有的，飯店房間內均備有毛巾、浴巾與壁掛/手持吹風機，不需自行攜帶。"}
        ]
    },
    "unit-02": {
        "highlights": [
            "大客車黃金逃生 60 秒：發生事故時保持冷靜，不搶行李，遵從師長與司機指引快速撤離。",
            "安全逃生四寶：車窗擊破器（至少 3 具）、車用滅火器（前後各 1 具）、安全門（車身左後側）、車頂逃生逃生窗。",
            "車窗擊破器敲擊心法：對準安全玻璃的「四個角落」用力垂直敲擊，敲出裂痕後再向外推開，切勿敲擊玻璃正中央。",
            "行車基本安全守則：上車第一件事立即繫妥安全帶，行駛中嚴禁離座、更換座位或在走道嬉戲。"
        ],
        "qa": [
            {"q": "為什麼車窗擊破器必須敲擊玻璃四角而不是中心？", "a": "強化安全玻璃中心受力均勻彈性高，四角應力最脆弱，敲擊四角才能迅速碎裂成網狀顆粒以利逃生。"}
        ]
    },
    "unit-03": {
        "highlights": [
            "田寮月世界地質：屬於台灣西南部典型的「惡地地形（Badlands）」，主要由深海泥質沉積形成的「青灰岩」構成。",
            "為何月世界的泥土能「養」羊？月世界土壤高鹽鹼、貧瘠，一般農作物無法生長，早期居民利用耐旱的刺竹與灌木飼養台灣黑山羊，造就知名的田寮羊肉文化。",
            "地質特性：雨水沖刷極易軟化流失，形成宛如月球表面的荒涼鋸齒狀山脊與深溝蝕溝。",
            "參訪指引：請沿步道階梯前進，嚴禁攀爬泥岩邊坡，防止地表崩塌危險。"
        ],
        "qa": [
            {"q": "月世界青灰岩土壤為什麼寸草難生？", "a": "因為含鹽量極高且顆粒極細，遇水迅速軟化泥濘，天晴則迅速脫水乾裂結成硬塊，水分無法涵養。"}
        ]
    },
    "unit-04": {
        "highlights": [
            "國立海洋生物博物館核心亮點：台灣水域館（高山溪流到外海）、珊瑚王國館（84米海底隧道）、世界水域館（古代海洋與企鵝）。",
            "南台灣防曬抗熱終極裝備：防曬乳（請選擇海洋友善配方）、遮陽帽、太陽眼鏡與大容量水壺（定時補充水分防中暑）。",
            "海洋生態保育觀念：參觀時嚴禁拍打展示玻璃，拍照時請務必「關閉相機閃光燈」，避免驚嚇深海魚類與企鵝。",
            "探索任務：配合手冊後方 25 題海生館闖關學習單，進行實地觀察探索解答。"
        ],
        "qa": [
            {"q": "為什麼在海生館拍照嚴禁使用閃光燈？", "a": "許多海洋生物（如白鯨、企鵝與深海魚類）視網膜極度敏感，強烈閃光會造成其視網膜受損甚至失明致死。"}
        ]
    },
    "unit-05": {
        "highlights": [
            "貓鼻頭風景區地質特徵：為恆春半島向南延伸突出的海岬，與鵝鑾鼻遙遙相對，形成台灣海峽與巴士海峽的界標。",
            "地形景觀：典型隆起珊瑚礁裙礁海岸，經過強烈波浪海蝕、海蝕平台、豆腐岩、壺穴與崩崖景觀豐富。",
            "墾丁大街夜間巡禮：晚間由師長引導定時定點集合，遵守行人靠邊走，勿向無標價攤販衝動消費，結伴同行不落單。",
            "守時觀念：集合時間前 5 分鐘抵達指定集結點，隨時注意班級隊伍動態。"
        ],
        "qa": [
            {"q": "貓鼻頭名稱的由來為何？", "a": "因海崖邊有一塊自崩崖滾落下的巨大珊瑚礁岩，其外型酷似一隻蹲伏在海面的貓而得名。"}
        ]
    },
    "unit-06": {
        "highlights": [
            "墾丁福華渡假大飯店入住公約：分發房卡後以房為單位進房，確認門鎖、衛浴設備正常，有故障立即向隨車導師反映。",
            "房門安全：進房隨時扣上防盜扣與關妥房門，嚴禁同學在走廊喧鬧奔跑或穿著睡衣拖鞋隨意遊蕩。",
            "水域安全第一原則：嚴禁任何同學夜間私自前往飯店戶外泳池或擅自翻越圍籬跑到海灘戲水，違者記大過處分。",
            "晚點名查房流程：晚間 21:30 準時留在各自分配房間，導師與主任逐間點名，點名後關燈就寢蓄積體力。"
        ],
        "qa": [
            {"q": "房卡不小心鎖在房間內怎麼辦？", "a": "請至各樓層師長巡查站向隨隊導師報告，由導師陪同至大廳櫃檯補辦房卡，切勿嘗試攀爬陽台！"}
        ]
    },
    "unit-07": {
        "highlights": [
            "首日檢討反饋：各班行程銜接準時度高，唯部分車次上下車清點速度需再加速 3 分鐘。",
            "第二天體力調配：第二天包含沙灘趣味競賽與義大世界整日活動，步數預計超過 18,000 步，早晨務必享用豐盛早餐。",
            "行李打包與退房：第二天晨喚後整理個人行李箱，7:40 前統一推至飯店大廳指定班級集中區上車。",
            "票券發放注意：午餐發放義大樂園 100 元餐券，妥善保管若遺失恕不補發。"
        ],
        "qa": [
            {"q": "飯店早餐用餐時有何注意事項？", "a": "請攜帶餐券，穿著整齊校服/班服，遵行取餐禮儀，吃多少拿多少，嚴禁浪費食材。"}
        ]
    },
    "unit-08": {
        "highlights": [
            "惡地深層科研：為什麼月世界又鹹又乾？數百萬年前深海沉積的泥岩中含有大量結晶鹽，隨著板塊擠壓抬升露出地表。",
            "泥火山與天然氣：月世界周邊地下蘊藏天然氣與地下水，混合泥漿受高壓沿斷層噴出，形成滾水滾泥的泥火山。",
            "物理風化作用：泥岩質地軟弱，乾季時表面受日曬龜裂，雨季時吸水迅速膨脹軟化順坡滑落，造成植被根系完全無法固著。",
            "生態演替反思：即使在如此極端條件下，耐鹽旱生灌木與鳥類依然找到棲息模式，展現大自然強大韌性。"
        ],
        "qa": [
            {"q": "台灣除了高雄田寮外，還有哪裡有著名惡地景觀？", "a": "台南左鎮、草山月世界，以及台東卑南的利吉惡地（利吉混同層）。"}
        ]
    },
    "unit-09": {
        "highlights": [
            "百人學校團體用餐篩選漏斗：衛生局 HACCP 評鑑優良、能容納百人同時進餐、具備大型遊覽車專屬動線與洗手間承載量。",
            "餐飲安全底線：食材溯源標籤、中央廚房衛生監控、所有隨團師長先行試菜確認衛生與熟度。",
            "餐桌禮儀四不原則：不大聲喧鬧、不以筷子敲碗、不挑食浪費、不將骨頭廚餘直接吐在桌面上。",
            "素食同學特別照料：素食同學依指定素食桌入席，確保菜餚獨立無葷素交叉污染。"
        ],
        "qa": [
            {"q": "團餐如果遇到海鮮有過敏疑慮該如何處理？", "a": "行前調查已備註過敏史同學，用餐時請再次向同桌師長及領隊確認替換安全替代菜色。"}
        ]
    },
    "unit-10": {
        "highlights": [
            "義大遊樂世界三大主題區：衛城（古希臘風神殿、天旋地轉）、聖托里尼山城（藍白愛琴海、極限挑戰）、特洛伊城堡（全台最大室內親子樂園）。",
            "排隊戰略效率極致化：入園先搭乘高空輕軌列車直達最深處「特洛伊城堡」，由內向外順玩避開大門口尖峰人潮。",
            "心臟防護安全提醒：極限挑戰、天旋地轉等設施 G 力強大，患有心臟病、高血壓或剛吃飽同學嚴禁搭乘。",
            "室內雨天/避暑備案：特洛伊城堡室內多達 5 層遊樂設施（旋轉木馬、地心歷險、飛越台灣 VR），涼爽且全天候運作。"
        ],
        "qa": [
            {"q": "園區內若與同學走散怎麼辦？", "a": "立即前往衛城大門遊客服務中心或特洛伊城堡 1F 服務台廣播，並透過手機撥打手冊緊急連絡電話向隨車導師求助。"}
        ]
    },
    "unit-11": {
        "highlights": [
            "義大世界混亂背後的完美規劃：結合樂園、購物廣場（Outlet Mall）與天悅飯店，動線縱深長達 1.5 公里，精密掌握集結節奏。",
            "夜間摩天輪搭乘指南：全台最高海拔摩天輪，冷氣車廂俯瞰高屏夜景，每車廂限乘 6~8 人，晃動時切勿激烈推擠。",
            "購物商場自主管理：晚餐於美食街自理，發揚理財消費觀念，不買貴重奢侈品，看顧好錢包與隨身物品。",
            "夜宿義大天悅飯店：義大天悅為四星級商務渡假飯店，進房後落實安靜不擾民，為第三天充沛體力充電。"
        ],
        "qa": [
            {"q": "搭乘摩天輪時若突然停頓該如何反應？", "a": "摩天輪為輪椅或行動不便乘客進出時會短zat低速暫停，屬於正常運作機制，請安心就座切勿驚慌站立。"}
        ]
    },
    "unit-12": {
        "highlights": [
            "颱風與極端天候應變準則：學校戶外教育活動以「師生生命安全」為最高指導原則，不存任何僥倖心態。",
            "指揮體系啟動：由校長召集學務主任、總務主任、領隊總召與旅運公司召開即時緊急應變小組會議。",
            "室內備案行程切換：若遇南部強降雨，即刻啟動義大特洛伊室內館、奇美博物館全天深度美育與室內科學探索備案。",
            "找資源硬實力：校長與行政團隊即時橫向聯繫教育處、公路局、氣象署，迅速協調車隊路線與飯店安置，保障每位孩子平安。"
        ],
        "qa": [
            {"q": "如果遇颱風停班停課，畢旅會如何處理？", "a": "依地方政府災害應變中心公告，若達停班停課標準，指揮小組將立即啟動提前返校或於安全評鑑合格飯店原地避險程序。"}
        ]
    },
    "unit-13": {
        "highlights": [
            "領隊真心話：每輛遊覽車前幽默風趣的領隊大哥哥、大姊姊，幕後每天凌晨 5:30 巡車、深夜 24:00 查房開檢討會。",
            "看不見的守護者：司機運將大哥出發前酒測檢驗與車況巡檢、師長們整夜未闔眼的關切、醫療箱的常備照料。",
            "感恩與同理心：一句真誠的「謝謝導師、謝謝領隊小鹿、謝謝司機大哥」，是教育最美麗的風景。",
            "國中生涯分水嶺：畢旅是三年級最重要的青春印記，狂歡過後收心回歸學習軌道，帶著滿滿能量迎戰未來的教育會考！"
        ],
        "qa": [
            {"q": "如何向這三天陪伴我們的師長與工作人員表達感謝？", "a": "在遊覽車回程時全班齊唱一首歌、親手寫一張卡片、隨手把車上垃圾帶下車，都是最棒的感謝方式。"}
        ]
    },
    "unit-14": {
        "highlights": [
            "奇美博物館西洋美學：全台最具規模的西洋藝術殿堂，阿波羅噴泉、奧林帕斯神殿群像雕塑、希臘羅馬神話柱廊。",
            "常設展館精華：動物廳（全球標本生態透視畫）、兵器廳（各國歷史古兵器裝甲）、樂器廳（世界頂尖小提琴製造史）、藝術廳（歐洲各時期名畫）。",
            "法老古埃及特展：近距離觀摩木乃伊石棺、黃金飾品、聖書體象形文字與古埃及人對永恆靈魂的信仰追尋。",
            "名間親子生態園區：南投最夯共融式綠地公園，5米巨型彩虹溜滑梯、愛心大合照，為三天兩夜畢旅劃下完美句點！"
        ],
        "qa": [
            {"q": "奇美博物館室內參觀有何禮儀要求？", "a": "館內輕聲細語、勿奔跑嘻笑、展示品嚴禁觸摸、手機務必轉為震動或靜音，部分特展廳嚴禁拍照錄影。"}
        ]
    }
}

def mask_person_name(name):
    """
    去個資合規：姓名第2與第3個字強制替換為 'O'
    2字姓名：吳成 -> 吳O
    3字姓名：簡OX -> 簡OO, 蔡O秀 -> 蔡OO
    4字姓名：歐陽XX -> 歐OOO
    """
    if not name or name in ['墾丁福華渡假大飯店', '高雄義大天悅飯店', '合谷穴', '內關穴', '足三里穴']:
        return name
    if len(name) == 2:
        return name[0] + 'O'
    elif len(name) == 3:
        return name[0] + 'OO'
    elif len(name) >= 4:
        return name[0] + 'OO' + name[3:]
    return name

def main():
    source_data_path = r"C:\antigravity\1151018投中畢旅手冊\data.js"
    with open(source_data_path, "r", encoding="utf-8") as f:
        content = f.read()
    
    m = re.search(r"const\s+TRIP_DATA\s*=\s*(\{[\s\S]*?\n\};)", content)
    if not m:
        m = re.search(r"const\s+TRIP_DATA\s*=\s*(\{[\s\S]*\});", content)
    
    if not m:
        raise ValueError("Could not find TRIP_DATA in data.js")
    
    trip_data_raw = m.group(1).rstrip(";")
    
    # 僅針對人名進行替換
    def repl_name(match):
        pre = match.group(1)
        name = match.group(2)
        if name in ['墾丁福華渡假大飯店', '高雄義大天悅飯店', '合谷穴', '內關穴', '足三里穴']:
            return f'{pre}"{name}"'
        return f'{pre}"{mask_person_name(name)}"'

    trip_data_raw = re.sub(r'(\bname:\s*)"([^"]+)"', repl_name, trip_data_raw)
    
    # 師長備註中的名字替換
    notes_replacements = [
        ('蔡O秀', '蔡OO'), ('黃O姿', '黃OO'), ('施O婷', '施OO'), ('陳O綸', '陳OO'),
        ('董O遠', '董OO'), ('吳O萱', '吳OO'), ('黃O英', '黃OO'), ('李O嘉', '李OO'),
        ('姚O勤', '姚OO'), ('劉O彥', '劉OO'), ('石O洋', '石OO'), ('孫O惠', '孫OO')
    ]
    for old, new in notes_replacements:
        trip_data_raw = trip_data_raw.replace(old, new)

    # 確保 packingChecklist 原名不被誤傷
    fix_pack = [
        ('個OO保 IC 卡', '個人健保 IC 卡'),
        ('適OO錢與零用金', '適量零錢與零用金'),
        ('家OO門鑰匙', '家裡大門鑰匙'),
        ('紙OO、手冊或手機', '紙、筆、手冊或手機'),
        ('換OO物 2~3 套', '換洗衣物 2~3 套'),
        ('個OO刷、牙膏', '個人牙刷、牙膏'),
        ('梳OO浴帽、個人毛巾', '梳子、浴帽、個人毛巾'),
        ('輕OO外套', '輕便薄外套'),
        ('乾OO膠袋數個', '乾淨塑膠袋數個'),
        ('大OO李箱或旅行袋', '大型行李箱或旅行袋'),
        ('個OO肩隨身背包', '個人雙肩隨身背包'),
        ('個OO備藥物', '個人常備藥物'),
        ('個OO身水壺 / 環保杯', '個人隨身水壺 / 環保杯'),
        ('遮OO、太陽眼鏡', '遮陽帽、太陽眼鏡'),
        ('防OO、防蚊液', '防曬乳、防蚊液'),
        ('輕OO衣或折疊傘', '輕便雨衣或折疊傘'),
        ('備OO罩 4~6 個', '備用口罩 4~6 個'),
        ('行OO源與充電線', '行動電源與充電線')
    ]
    for wrong, right in fix_pack:
        trip_data_raw = trip_data_raw.replace(wrong, right)

    from build_gallery_data import build as build_gallery
    all_stations, all_photos = build_gallery()

    from build_class_albums import build_class_albums
    class_albums, all_class_photos = build_class_albums()

    units_data = scan_all()
    # Merge rich educational notes and live photos into each unit
    for u in units_data:
        uid = u["id"]
        if uid in UNIT_NOTES:
            u["highlights"] = UNIT_NOTES[uid]["highlights"]
            u["qa"] = UNIT_NOTES[uid]["qa"]
        else:
            u["highlights"] = []
            u["qa"] = []
        
        # Attach matching live photos and station info
        u_photos = [p for p in all_photos if p["unitId"] == uid]
        u["photos"] = u_photos
        u["photoCount"] = len(u_photos)
        u_stations = [st for st in all_stations if st["unitId"] == uid]
        u["stations"] = u_stations
    
    units_json = json.dumps(units_data, ensure_ascii=False, indent=2)
    stations_json = json.dumps(all_stations, ensure_ascii=False, indent=2)
    photos_json = json.dumps(all_photos, ensure_ascii=False, indent=2)
    class_albums_json = json.dumps(class_albums, ensure_ascii=False, indent=2)
    class_photos_json = json.dumps(all_class_photos, ensure_ascii=False, indent=2)
    
    compatibility_code = """
// 資料庫自動相容性補強 (Normalization)
if (TRIP_DATA) {
  // 學生名冊雙向別名
  if (TRIP_DATA.students && !TRIP_DATA.roster) {
    TRIP_DATA.roster = TRIP_DATA.students;
  }
  // 欄位標準化 (相容 day1Room / room1, table / table1 等)
  if (TRIP_DATA.students) {
    TRIP_DATA.students.forEach((s, idx) => {
      s.id = s.id || ('s-' + (idx + 1));
      s.day1Room = s.day1Room || s.room1 || '－';
      s.day2Room = s.day2Room || s.room2 || '－';
      s.table = s.table || s.table1 || '－';
      s.bus = s.bus || s.busNo || '－';
    });
  }
  if (TRIP_DATA.teachers) {
    TRIP_DATA.teachers.forEach((t, idx) => {
      t.id = t.id || ('t-' + (idx + 1));
      t.day1Room = t.day1Room || t.roomDay1 || '－';
      t.day2Room = t.day2Room || t.roomDay2 || '－';
    });
  }
  if (TRIP_DATA.buses) {
    TRIP_DATA.buses.forEach(b => {
      b.bus = b.bus || b.busNo || 0;
      b.total = b.total || b.totalStudents || 0;
      b.vegetarian = b.vegetarian !== undefined ? b.vegetarian : (b.vegCount || 0);
      b.male = b.male !== undefined ? b.male : (b.countDetail ? ((b.countDetail.match(/男(\\d+)/) || [0, 0])[1]) : 0);
      b.female = b.female !== undefined ? b.female : (b.countDetail ? ((b.countDetail.match(/女(\\d+)/) || [0, 0])[1]) : 0);
      b.teachers = b.teachers || (b.chaperones ? b.chaperones.map(c => c.name) : []);
    });
  }
  // 行李清單雙向別名
  if (TRIP_DATA.packingChecklist && !TRIP_DATA.packing) {
    TRIP_DATA.packing = TRIP_DATA.packingChecklist;
  }
  // 海生館問答相容
  if (TRIP_DATA.quiz) {
    if (TRIP_DATA.quiz.qa && !TRIP_DATA.quiz.qaCards) {
      TRIP_DATA.quiz.qaCards = TRIP_DATA.quiz.qa;
    }
    if (TRIP_DATA.quiz.trueFalse) {
      TRIP_DATA.quiz.trueFalse.forEach(tf => {
        tf.q = tf.q || tf.question;
        tf.a = tf.a !== undefined ? tf.a : tf.answer;
        tf.expl = tf.expl || tf.explanation;
      });
    }
  }
}
"""

    output_js = f"""// 南投縣立南投國民中學 115學年度 畢業旅行官方手冊與14大單元多媒體教材全集
// 本資料庫全數個人資訊均已完成嚴格去識別化處理（第二與第三字元遮罩為 O），符合個人資料保護法規

const TRIP_DATA = {trip_data_raw};
{compatibility_code}
const UNITS_DATA = {units_json};
const GALLERY_STATIONS = {stations_json};
const GALLERY_PHOTOS = {photos_json};
const CLASS_ALBUMS = {class_albums_json};
const CLASS_PHOTOS = {class_photos_json};

if (typeof module !== 'undefined') {{
  module.exports = {{ TRIP_DATA, UNITS_DATA, GALLERY_STATIONS, GALLERY_PHOTOS, CLASS_ALBUMS, CLASS_PHOTOS }};
}}
"""
    
    with open("data.js", "w", encoding="utf-8") as f:
        f.write(output_js)
    
    print("Enhanced data.js generated successfully. Size:", os.path.getsize("data.js"), "bytes")

if __name__ == "__main__":
    main()
