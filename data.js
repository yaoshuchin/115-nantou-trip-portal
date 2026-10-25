// 南投縣立南投國民中學 115學年度 畢業旅行官方手冊與14大單元多媒體教材全集
// 本資料庫全數個人資訊均已完成嚴格去識別化處理（第二與第三字元遮罩為 O），符合個人資料保護法規

const TRIP_DATA = {
  info: {
    school: "南投縣立南投國民中學",
    title: "115學年度 畢業旅行行動手冊",
    subtitle: "南台灣三日知性與歡樂之旅",
    dates: "115.10.21 (三) ～ 115.10.23 (五)",
    duration: "三天二夜",
    assembly: {
      time: "07:30",
      location: "學校中庭集合出發",
      note: "各班班長確實掌握人數，上車前先上洗手間，繫妥安全帶"
    },
    hotels: [
      {
        day: "第一晚 (10/21 三)",
        name: "墾丁福華渡假大飯店",
        phone: "08-8862324",
        telLink: "tel:088862324",
        address: "屏東縣恆春鎮墾丁路 2 號",
        mapUrl: "https://maps.google.com/?q=墾丁福華渡假大飯店",
        notice: "依政府環保政策，飯店內不再提供一次性盥洗用品（請自備牙刷、牙膏、梳子、刮鬍刀等）。"
      },
      {
        day: "第二晚 (10/22 四)",
        name: "高雄義大天悅飯店",
        phone: "07-6568000",
        telLink: "tel:076568000",
        address: "高雄市大樹區三和里義大八街 100 號",
        mapUrl: "https://maps.google.com/?q=高雄義大天悅飯店",
        notice: "依政府環保政策，飯店內不再提供一次性盥洗用品（請自備牙刷、牙膏、梳子、刮鬍刀等）。"
      }
    ],
    stats: {
      studentsTotal: 178,
      maleStudents: 91,
      femaleStudents: 87,
      teachersTotal: 12,
      vegetarianStudents: 2,
      busCount: 7
    }
  },

  itinerary: [
    {
      day: 1,
      date: "115/10/21 (星期三)",
      title: "南下探索・惡地奇景與國境之南",
      hotel: "墾丁福華渡假大飯店",
      meals: { breakfast: "自理", lunch: "美味合菜午餐", dinner: "美味合菜晚餐", night: "墾丁大街自理" },
      timeline: [
        { time: "07:30", title: "學校中庭集合出發", desc: "各班班長清點人數回報，準時上車出發，行車安全教育", icon: "school" },
        { time: "08:00~10:00", title: "國道風光與車上活動", desc: "國道南下奔馳，聆聽領隊行前解說與車上育樂", icon: "bus" },
        { time: "10:00~11:30", title: "田寮月世界", desc: "欣賞如月球表面般的惡地地質與泥岩特殊景觀、漫步攬月樓步道", icon: "mountain" },
        { time: "11:45~12:45", title: "享用美味午餐", desc: "依分配桌次迅速就坐入席，補充足夠體力", icon: "utensils" },
        { time: "13:30~16:00", title: "國立海洋生物博物館 (海生館)", desc: "走訪台灣水域館（高山到海洋小水滴的旅行）、珊瑚王國海底隧道、世界水域館、觀察小白鯨與企鵝", icon: "fish" },
        { time: "16:20~17:30", title: "貓鼻頭風景區", desc: "巴士海峽與台灣海峽的分界點，欣賞典型裙礁海岸侵蝕地形", icon: "camera" },
        { time: "18:00~19:00", title: "美味豐盛晚餐", desc: "抵達餐廳享用合菜晚宴，各桌收拾桌面保持禮貌", icon: "utensils" },
        { time: "19:20~21:00", title: "夜宿墾丁福華渡假大飯店 ＆ 墾丁大街夜巡", desc: "辦理入住、分配房間放置行李；導師領隊帶領夜探熱鬧墾丁大街", icon: "hotel" },
        { time: "21:30", title: "晚點名與查房", desc: "回房休息、洗漱就寢，嚴禁擅離房間與大聲喧嘩", icon: "moon" }
      ]
    },
    {
      day: 2,
      date: "115/10/22 (星期四)",
      title: "沙灘淨灘・踏浪歡樂＆義大冒險狂歡",
      hotel: "高雄義大天悅飯店",
      meals: { breakfast: "飯店內享用美味早餐", lunch: "義大園區餐券100元", dinner: "義大世界美食街自理", night: "-" },
      timeline: [
        { time: "07:00~08:00", title: "晨喚・享用美味早餐", desc: "起床盥洗，在墾丁福華渡假大飯店享用豐盛自助早餐", icon: "sun" },
        { time: "08:20~09:50", title: "飯店沙灘趣味競賽 (淨灘 / 踏浪)", desc: "感受國境之南海風沙灘，分組環保淨灘活動與歡樂踏浪（未經許可嚴禁深水戲水）", icon: "umbrella-beach" },
        { time: "10:10~12:00", title: "前往高雄義大世界", desc: "整理行李裝備搭乘專車，沿途欣賞南部風光與合唱交流", icon: "bus" },
        { time: "12:00~17:30", title: "義大遊樂世界", desc: "全台唯一希臘情境主題樂園！【特洛伊城】木馬屠城記、室內雲霄飛車、飛越台灣模擬飛行、極限挑戰（午餐使用100元餐券）", icon: "roller-coaster" },
        { time: "17:30~20:00", title: "義大世界購物廣場 ＆ 搭乘夜間摩天輪", desc: "逛逛全台最大名品Outlet購物廣場，登上直徑80公尺高空摩天輪俯瞰絕美夜景（晚餐美食街自理）", icon: "shopping-bag" },
        { time: "20:30", title: "夜宿高雄義大天悅飯店", desc: "分配房間入住，洗滌一日疲憊，整理行李收穫", icon: "hotel" },
        { time: "21:30", title: "晚點名查房與就寢", desc: "各班確實晚點名，安靜休息儲備第三天活力", icon: "moon" }
      ]
    },
    {
      day: 3,
      date: "115/10/23 (星期五)",
      title: "旗津海港采風・古典美學奇美殿堂・賦歸",
      hotel: "溫暖可愛的家",
      meals: { breakfast: "飯店內享用美味早餐", lunch: "美味合菜午餐", dinner: "回到可愛的家", night: "-" },
      timeline: [
        { time: "07:00~08:00", title: "晨喚・天悅飯店自助早餐", desc: "整理好所有行李退房，享用營養活力早餐", icon: "sun" },
        { time: "08:20~11:00", title: "旗津風景區采風巡禮", desc: "參訪旗津海岸公園、漫步夢幻星空隧道、登旗後砲台俯瞰高雄港、拜訪古老旗後天后宮與品味旗津老街", icon: "ship" },
        { time: "11:30~12:30", title: "港都美味午餐", desc: "享用美味午宴，各班整齊就座", icon: "utensils" },
        { time: "13:30~16:00", title: "奇美博物館", desc: "參觀創辦人許文龍先生畢生心血之私立博物館瑰寶，走訪奧林帕斯橋、阿波羅噴泉、西洋藝術品與動物標本常設展", icon: "landmark" },
        { time: "16:30~17:30", title: "名間親子生態園區", desc: "走訪南投最大 2.6 公頃全齡共融生態公園，暢玩 5 米高彩虹滑梯、大草坪歡樂合影", icon: "camera" },
        { time: "17:30~18:00", title: "快樂賦歸！平安返抵南投國中", desc: "專車安全返校，清點個人物品與行李，依序互道珍重、回家與家人分享美好回憶！", icon: "home" }
      ]
    }
  ],

  buses: [
    {
      busNo: 1,
      title: "1 車",
      classes: "904 (全部)",
      countDetail: "904: 男10 女9 (19人)",
      totalStudents: 19,
      chaperones: [
        { role: "學務主任", name: "董O遠" },
        { role: "904 導師", name: "蔡O秀", note: "素食・眷屬隨行" }
      ],
      vegCount: 1
    },
    {
      busNo: 2,
      title: "2 車",
      classes: "901 (全部) + 902 (部分)",
      countDetail: "901: 男11 女8 (19人) | 902: 男4 女7 (11人)",
      totalStudents: 30,
      chaperones: [
        { role: "901 導師", name: "吳O萱" },
        { role: "902 導師", name: "黃O英" }
      ],
      vegCount: 0
    },
    {
      busNo: 3,
      title: "3 車",
      classes: "903 (全部) + 902 (部分)",
      countDetail: "903: 男11 女12 (23人) | 902: 男4 女4 (8人)",
      totalStudents: 31,
      chaperones: [
        { role: "903 導師", name: "陳O綸" }
      ],
      vegCount: 0
    },
    {
      busNo: 4,
      title: "4 車 (丁車)",
      classes: "905 (全部)",
      countDetail: "905: 男11 女10 (21人)",
      totalStudents: 21,
      chaperones: [
        { role: "905 導師", name: "施O婷" }
      ],
      vegCount: 0
    },
    {
      busNo: 5,
      title: "5 車",
      classes: "906 (全部)",
      countDetail: "906: 男13 女11 (24人)",
      totalStudents: 24,
      chaperones: [
        { role: "906 導師", name: "石O洋" }
      ],
      vegCount: 0
    },
    {
      busNo: 6,
      title: "6 車",
      classes: "907 (全部) + 908 (全部)",
      countDetail: "907: 男11 女11 (22人) | 908: 男6 女3 (9人)",
      totalStudents: 31,
      chaperones: [
        { role: "907 導師", name: "孫O惠" },
        { role: "908 導師", name: "李O嘉" }
      ],
      vegCount: 0
    },
    {
      busNo: 7,
      title: "7 車",
      classes: "909 (全部)",
      countDetail: "909: 男10 女12 (22人)",
      totalStudents: 22,
      chaperones: [
        { role: "訓育組長", name: "姚O勤" },
        { role: "909 導師", name: "黃O姿" }
      ],
      vegCount: 1
    }
  ],

  teachers: [
    { role: "校長", name: "劉O彥", bus: "公務安排", roomDay1: "－", roomDay2: "746 (單/雙人)", note: "10/22 進駐天悅" },
    { role: "學務主任", name: "董O遠", bus: 1, roomDay1: "4056 (福華)", roomDay2: "747 (天悅)", note: "隨車 1 車" },
    { role: "902 導師", name: "黃O英", bus: 2, roomDay1: "4058 (福華)", roomDay2: "748 (天悅)", note: "隨車 2 車" },
    { role: "908 導師", name: "李O嘉", bus: 6, roomDay1: "4060 (福華)", roomDay2: "750 (天悅)", note: "隨車 6 車" },
    { role: "訓育組長", name: "姚O勤", bus: 7, roomDay1: "3058 (福華)", roomDay2: "740 (天悅)", note: "隨車 7 車（與蔡O秀老師同房）" },
    { role: "904 導師", name: "蔡O秀", bus: 1, roomDay1: "3058 (福華)", roomDay2: "740 (天悅)", note: "隨車 1 車（素食、眷屬同房）" },
    { role: "907 導師", name: "孫O惠", bus: 6, roomDay1: "3060 (福華)", roomDay2: "742 (天悅)", note: "隨車 6 車（與黃O姿老師同房）" },
    { role: "909 導師", name: "黃O姿", bus: 7, roomDay1: "3060 (福華)", roomDay2: "742 (天悅)", note: "隨車 7 車" },
    { role: "906 導師", name: "石O洋", bus: 5, roomDay1: "3062 (福華)", roomDay2: "752 (天悅)", note: "隨車 5 車（與施O婷老師同房區）" },
    { role: "905 導師", name: "施O婷", bus: 4, roomDay1: "3062 (福華)", roomDay2: "752 (天悅)", note: "隨車 4 車" },
    { role: "901 導師", name: "吳O萱", bus: 2, roomDay1: "3064 (福華)", roomDay2: "756 (天悅)", note: "隨車 2 車（與陳O綸老師同房區）" },
    { role: "903 導師", name: "陳O綸", bus: 3, roomDay1: "3064 (福華)", roomDay2: "756 (天悅)", note: "隨車 3 車" }
  ],

  // 178名學生名冊
  students: [
    // 901
    { name: "簡O翔", class: "901", gender: "男", bus: 2, room1: "2141", table1: "1", room2: "501", note: "" },
    { name: "簡O錤", class: "901", gender: "男", bus: 2, room1: "2141", table1: "2", room2: "501", note: "" },
    { name: "賴O育", class: "901", gender: "男", bus: 2, room1: "2141", table1: "1", room2: "501", note: "" },
    { name: "楊O翰", class: "901", gender: "男", bus: 2, room1: "2141", table1: "1", room2: "503", note: "" },
    { name: "鄒O陞", class: "901", gender: "男", bus: 2, room1: "2141", table1: "1", room2: "501", note: "" },
    { name: "廖O豪", class: "901", gender: "男", bus: 2, room1: "2141", table1: "1", room2: "503", note: "" },
    { name: "吳O成", class: "901", gender: "男", bus: 2, room1: "2142", table1: "2", room2: "502", note: "" },
    { name: "林O紘", class: "901", gender: "男", bus: 2, room1: "2142", table1: "2", room2: "502", note: "" },
    { name: "陳O潾", class: "901", gender: "男", bus: 2, room1: "2142", table1: "2", room2: "502", note: "" },
    { name: "陳O宥", class: "901", gender: "男", bus: 2, room1: "2142", table1: "2", room2: "503", note: "" },
    { name: "黃O榤", class: "901", gender: "男", bus: 2, room1: "2142", table1: "1", room2: "502", note: "" },
    { name: "林O汝", class: "901", gender: "女", bus: 2, room1: "3082", table1: "1", room2: "546", note: "" },
    { name: "賴O羽", class: "901", gender: "女", bus: 2, room1: "3082", table1: "1", room2: "546", note: "" },
    { name: "劉O妤", class: "901", gender: "女", bus: 2, room1: "3082", table1: "1", room2: "546", note: "" },
    { name: "鄧O云", class: "901", gender: "女", bus: 2, room1: "3082", table1: "1", room2: "546", note: "" },
    { name: "田O羽", class: "901", gender: "女", bus: 2, room1: "3084", table1: "2", room2: "547", note: "" },
    { name: "朱O融", class: "901", gender: "女", bus: 2, room1: "3084", table1: "2", room2: "547", note: "" },
    { name: "陳O涵", class: "901", gender: "女", bus: 2, room1: "3084", table1: "2", room2: "547", note: "" },
    { name: "陳O妡", class: "901", gender: "女", bus: 2, room1: "3084", table1: "2", room2: "547", note: "" },

    // 902
    { name: "古O弘", class: "902", gender: "男", bus: 2, room1: "2122", table1: "3", room2: "509", note: "" },
    { name: "黃O翊", class: "902", gender: "男", bus: 2, room1: "2122", table1: "3", room2: "511", note: "" },
    { name: "楊O正", class: "902", gender: "男", bus: 2, room1: "2122", table1: "3", room2: "511", note: "" },
    { name: "楊O傑", class: "902", gender: "男", bus: 2, room1: "2122", table1: "3", room2: "509", note: "" },
    { name: "吳O億", class: "902", gender: "男", bus: 3, room1: "2123", table1: "3", room2: "509", note: "" },
    { name: "王O群", class: "902", gender: "男", bus: 3, room1: "2123", table1: "3", room2: "511", note: "" },
    { name: "陳O祺", class: "902", gender: "男", bus: 3, room1: "2123", table1: "3", room2: "511", note: "" },
    { name: "楊O諺", class: "902", gender: "男", bus: 3, room1: "2123", table1: "3", room2: "509", note: "" },
    { name: "吳O霏", class: "902", gender: "女", bus: 2, room1: "3031", table1: "4", room2: "548", note: "" },
    { name: "沈O語", class: "902", gender: "女", bus: 2, room1: "3031", table1: "4", room2: "548", note: "" },
    { name: "林O安", class: "902", gender: "女", bus: 2, room1: "3031", table1: "4", room2: "548", note: "" },
    { name: "張O瑄", class: "902", gender: "女", bus: 2, room1: "3031", table1: "4", room2: "548", note: "" },
    { name: "陳O蒨", class: "902", gender: "女", bus: 2, room1: "3033", table1: "4", room2: "549", note: "" },
    { name: "陳O潔", class: "902", gender: "女", bus: 2, room1: "3033", table1: "4", room2: "549", note: "" },
    { name: "鄒O璇", class: "902", gender: "女", bus: 2, room1: "3033", table1: "4", room2: "549", note: "" },
    { name: "歐O臻", class: "902", gender: "女", bus: 3, room1: "3033", table1: "4", room2: "549", note: "" },
    { name: "王O恩", class: "902", gender: "女", bus: 3, room1: "3035", table1: "3", room2: "550", note: "" },
    { name: "劉O圻", class: "902", gender: "女", bus: 3, room1: "3035", table1: "4", room2: "550", note: "" },
    { name: "蔡O喬", class: "902", gender: "女", bus: 3, room1: "3035", table1: "4", room2: "550", note: "" },

    // 903
    { name: "施O佑", class: "903", gender: "男", bus: 3, room1: "2137", table1: "6", room2: "516", note: "" },
    { name: "陳O侑", class: "903", gender: "男", bus: 3, room1: "2137", table1: "6", room2: "516", note: "" },
    { name: "廖O鈞", class: "903", gender: "男", bus: 3, room1: "2137", table1: "6", room2: "516", note: "" },
    { name: "蔡O君", class: "903", gender: "男", bus: 3, room1: "2124", table1: "7", room2: "512", note: "" },
    { name: "張O煒", class: "903", gender: "男", bus: 3, room1: "2124", table1: "6", room2: "512", note: "" },
    { name: "陳O潣", class: "903", gender: "男", bus: 3, room1: "2124", table1: "6", room2: "512", note: "" },
    { name: "黃O鈞", class: "903", gender: "男", bus: 3, room1: "2124", table1: "7", room2: "512", note: "" },
    { name: "簡O霖", class: "903", gender: "男", bus: 3, room1: "2125", table1: "5", room2: "515", note: "" },
    { name: "曾O智", class: "903", gender: "男", bus: 3, room1: "2125", table1: "5", room2: "515", note: "" },
    { name: "施O圻", class: "903", gender: "男", bus: 3, room1: "2125", table1: "5", room2: "515", note: "" },
    { name: "洪O彬", class: "903", gender: "男", bus: 3, room1: "2125", table1: "5", room2: "515", note: "" },
    { name: "林O儒", class: "903", gender: "女", bus: 3, room1: "3056", table1: "5", room2: "540", note: "" },
    { name: "張O禎", class: "903", gender: "女", bus: 3, room1: "3056", table1: "5", room2: "540", note: "" },
    { name: "楊O頵", class: "903", gender: "女", bus: 3, room1: "3056", table1: "5", room2: "540", note: "" },
    { name: "蕭O瑩", class: "903", gender: "女", bus: 3, room1: "3056", table1: "5", room2: "540", note: "" },
    { name: "朱O芯", class: "903", gender: "女", bus: 3, room1: "3068", table1: "6", room2: "542", note: "" },
    { name: "賴O如", class: "903", gender: "女", bus: 3, room1: "3068", table1: "6", room2: "542", note: "" },
    { name: "廖O霓", class: "903", gender: "女", bus: 3, room1: "3068", table1: "6", room2: "542", note: "" },
    { name: "彭O璇", class: "903", gender: "女", bus: 3, room1: "3068", table1: "6", room2: "542", note: "" },
    { name: "林O玫", class: "903", gender: "女", bus: 3, room1: "3070", table1: "5", room2: "543", note: "" },
    { name: "簡O鎣", class: "903", gender: "女", bus: 3, room1: "3070", table1: "6", room2: "543", note: "" },
    { name: "程O玹", class: "903", gender: "女", bus: 3, room1: "3070", table1: "5", room2: "543", note: "" },
    { name: "葉O瑄", class: "903", gender: "女", bus: 3, room1: "3070", table1: "6", room2: "543", note: "" },

    // 904
    { name: "王O億", class: "904", gender: "男", bus: 1, room1: "2135", table1: "8", room2: "517", note: "" },
    { name: "石O愷", class: "904", gender: "男", bus: 1, room1: "2135", table1: "8", room2: "517", note: "" },
    { name: "林O羽", class: "904", gender: "男", bus: 1, room1: "2135", table1: "7", room2: "518", note: "" },
    { name: "姚O城", class: "904", gender: "男", bus: 1, room1: "2135", table1: "素", room2: "516", note: "素食" },
    { name: "羅O鈞", class: "904", gender: "男", bus: 1, room1: "2135", table1: "8", room2: "517", note: "" },
    { name: "王O", class: "904", gender: "男", bus: 1, room1: "2135", table1: "8", room2: "517", note: "" },
    { name: "許O崴", class: "904", gender: "男", bus: 1, room1: "2126", table1: "7", room2: "518", note: "" },
    { name: "蔡O緯", class: "904", gender: "男", bus: 1, room1: "2126", table1: "7", room2: "518", note: "" },
    { name: "鄧O康", class: "904", gender: "男", bus: 1, room1: "2126", table1: "8", room2: "519", note: "" },
    { name: "鍾O洧", class: "904", gender: "男", bus: 1, room1: "2126", table1: "7", room2: "518", note: "" },
    { name: "王O茹", class: "904", gender: "女", bus: 1, room1: "3072", table1: "8", room2: "561", note: "" },
    { name: "翁O涵", class: "904", gender: "女", bus: 1, room1: "3072", table1: "8", room2: "561", note: "" },
    { name: "黃O芳", class: "904", gender: "女", bus: 1, room1: "3072", table1: "7", room2: "561", note: "" },
    { name: "胡O紜", class: "904", gender: "女", bus: 1, room1: "3072", table1: "7", room2: "561", note: "" },
    { name: "林O妮", class: "904", gender: "女", bus: 1, room1: "3074", table1: "8", room2: "562", note: "" },
    { name: "蔡O霏", class: "904", gender: "女", bus: 1, room1: "3074", table1: "7", room2: "562", note: "" },
    { name: "謝O倢", class: "904", gender: "女", bus: 1, room1: "3074", table1: "7", room2: "562", note: "" },
    { name: "藍O媗", class: "904", gender: "女", bus: 1, room1: "3074", table1: "8", room2: "562", note: "" },
    { name: "黎O蓉", class: "904", gender: "女", bus: 1, room1: "3076", table1: "8", room2: "560", note: "" },

    // 905
    { name: "湯O綸", class: "905", gender: "男", bus: 4, room1: "2137", table1: "10", room2: "519", note: "" },
    { name: "蕭O均", class: "905", gender: "男", bus: 4, room1: "2137", table1: "10", room2: "519", note: "" },
    { name: "簡O鈞", class: "905", gender: "男", bus: 4, room1: "2137", table1: "10", room2: "519", note: "" },
    { name: "熊O捷", class: "905", gender: "男", bus: 4, room1: "2127", table1: "9", room2: "520", note: "" },
    { name: "林O穎", class: "905", gender: "男", bus: 4, room1: "2127", table1: "9", room2: "520", note: "" },
    { name: "林O弘", class: "905", gender: "男", bus: 4, room1: "2127", table1: "9", room2: "520", note: "" },
    { name: "羅O惟", class: "905", gender: "男", bus: 4, room1: "2127", table1: "10", room2: "520", note: "" },
    { name: "陳O璋", class: "905", gender: "男", bus: 4, room1: "2128", table1: "9", room2: "521", note: "" },
    { name: "陳O佑", class: "905", gender: "男", bus: 4, room1: "2128", table1: "9", room2: "521", note: "" },
    { name: "楊O樺", class: "905", gender: "男", bus: 4, room1: "2128", table1: "10", room2: "521", note: "" },
    { name: "葉O修", class: "905", gender: "男", bus: 4, room1: "2128", table1: "10", room2: "521", note: "" },
    { name: "林O婕", class: "905", gender: "女", bus: 4, room1: "3041", table1: "9", room2: "553", note: "" },
    { name: "林O慧", class: "905", gender: "女", bus: 4, room1: "3041", table1: "9", room2: "553", note: "" },
    { name: "廖O玉", class: "905", gender: "女", bus: 4, room1: "3043", table1: "10", room2: "555", note: "" },
    { name: "張O涵", class: "905", gender: "女", bus: 4, room1: "3043", table1: "10", room2: "555", note: "" },
    { name: "張O潼", class: "905", gender: "女", bus: 4, room1: "3043", table1: "10", room2: "555", note: "" },
    { name: "曾O瑜", class: "905", gender: "女", bus: 4, room1: "3043", table1: "10", room2: "555", note: "" },
    { name: "谷O愛", class: "905", gender: "女", bus: 4, room1: "3045", table1: "9", room2: "556", note: "" },
    { name: "林O渝", class: "905", gender: "女", bus: 4, room1: "3045", table1: "9", room2: "556", note: "" },
    { name: "黃O蓉", class: "905", gender: "女", bus: 4, room1: "3045", table1: "9", room2: "556", note: "" },
    { name: "廖O涵", class: "905", gender: "女", bus: 4, room1: "3045", table1: "9", room2: "556", note: "" },

    // 906
    { name: "王O倫", class: "906", gender: "男", bus: 5, room1: "2138", table1: "18", room2: "523", note: "" },
    { name: "吳O彥", class: "906", gender: "男", bus: 5, room1: "2138", table1: "11", room2: "525", note: "" },
    { name: "張O昕", class: "906", gender: "男", bus: 5, room1: "2138", table1: "11", room2: "525", note: "" },
    { name: "張O璽", class: "906", gender: "男", bus: 5, room1: "2138", table1: "11", room2: "525", note: "" },
    { name: "黃O翰", class: "906", gender: "男", bus: 5, room1: "2138", table1: "11", room2: "525", note: "" },
    { name: "黃O程", class: "906", gender: "男", bus: 5, room1: "2138", table1: "18", room2: "523", note: "" },
    { name: "黃O揚", class: "906", gender: "男", bus: 5, room1: "2139", table1: "11", room2: "526", note: "" },
    { name: "陳O聖", class: "906", gender: "男", bus: 5, room1: "2139", table1: "18", room2: "523", note: "" },
    { name: "邱O辰", class: "906", gender: "男", bus: 5, room1: "2139", table1: "18", room2: "523", note: "" },
    { name: "陳O廷", class: "906", gender: "男", bus: 5, room1: "2129", table1: "12", room2: "522", note: "" },
    { name: "蔡O哲", class: "906", gender: "男", bus: 5, room1: "2129", table1: "12", room2: "522", note: "" },
    { name: "蕭O堯", class: "906", gender: "男", bus: 5, room1: "2129", table1: "12", room2: "522", note: "" },
    { name: "鄒O丞", class: "906", gender: "男", bus: 5, room1: "2129", table1: "12", room2: "522", note: "" },
    { name: "張O芸", class: "906", gender: "女", bus: 5, room1: "3035", table1: "11", room2: "550", note: "" },
    { name: "張O卉", class: "906", gender: "女", bus: 5, room1: "3037", table1: "11", room2: "551", note: "" },
    { name: "郭O瑄", class: "906", gender: "女", bus: 5, room1: "3037", table1: "11", room2: "551", note: "" },
    { name: "黃O誼", class: "906", gender: "女", bus: 5, room1: "3037", table1: "11", room2: "551", note: "" },
    { name: "黃O貽", class: "906", gender: "女", bus: 5, room1: "3037", table1: "11", room2: "551", note: "" },
    { name: "簡O涵", class: "906", gender: "女", bus: 5, room1: "3039", table1: "12", room2: "552", note: "" },
    { name: "許O慈", class: "906", gender: "女", bus: 5, room1: "3039", table1: "12", room2: "552", note: "" },
    { name: "陳O樂", class: "906", gender: "女", bus: 5, room1: "3039", table1: "12", room2: "553", note: "" },
    { name: "王O文", class: "906", gender: "女", bus: 5, room1: "3039", table1: "12", room2: "552", note: "" },
    { name: "簡O霓", class: "906", gender: "女", bus: 5, room1: "3041", table1: "12", room2: "553", note: "" },
    { name: "林O甄", class: "906", gender: "女", bus: 5, room1: "3041", table1: "12", room2: "552", note: "" },

    // 907
    { name: "金O賢", class: "907", gender: "男", bus: 6, room1: "2139", table1: "14", room2: "526", note: "" },
    { name: "張O二", class: "907", gender: "男", bus: 6, room1: "2139", table1: "14", room2: "526", note: "" },
    { name: "廖O豐", class: "907", gender: "男", bus: 6, room1: "2139", table1: "14", room2: "526", note: "" },
    { name: "莊O瑄", class: "907", gender: "男", bus: 6, room1: "2130", table1: "13", room2: "527", note: "" },
    { name: "張O湋", class: "907", gender: "男", bus: 6, room1: "2130", table1: "13", room2: "527", note: "" },
    { name: "陳O劭", class: "907", gender: "男", bus: 6, room1: "2130", table1: "14", room2: "527", note: "" },
    { name: "王O豐", class: "907", gender: "男", bus: 6, room1: "2130", table1: "14", room2: "527", note: "" },
    { name: "松O樂", class: "907", gender: "男", bus: 6, room1: "2131", table1: "14", room2: "529", note: "" },
    { name: "陳O陞", class: "907", gender: "男", bus: 6, room1: "2131", table1: "13", room2: "529", note: "" },
    { name: "蔡O璟", class: "907", gender: "男", bus: 6, room1: "2131", table1: "13", room2: "529", note: "" },
    { name: "謝O佑", class: "907", gender: "男", bus: 6, room1: "2131", table1: "13", room2: "529", note: "" },
    { name: "楊O沛", class: "907", gender: "女", bus: 6, room1: "3076", table1: "13", room2: "560", note: "" },
    { name: "林O琪", class: "907", gender: "女", bus: 6, room1: "3076", table1: "13", room2: "560", note: "" },
    { name: "侯O晴", class: "907", gender: "女", bus: 6, room1: "3076", table1: "14", room2: "560", note: "" },
    { name: "林O妤", class: "907", gender: "女", bus: 6, room1: "3078", table1: "13", room2: "557", note: "" },
    { name: "胡O愛", class: "907", gender: "女", bus: 6, room1: "3078", table1: "13", room2: "557", note: "" },
    { name: "張O穎", class: "907", gender: "女", bus: 6, room1: "3078", table1: "13", room2: "557", note: "" },
    { name: "曾O婕", class: "907", gender: "女", bus: 6, room1: "3078", table1: "13", room2: "557", note: "" },
    { name: "徐O禕", class: "907", gender: "女", bus: 6, room1: "3080", table1: "14", room2: "559", note: "" },
    { name: "許O萱", class: "907", gender: "女", bus: 6, room1: "3080", table1: "14", room2: "559", note: "" },
    { name: "劉O芹", class: "907", gender: "女", bus: 6, room1: "3080", table1: "14", room2: "559", note: "" },
    { name: "林O鈺", class: "907", gender: "女", bus: 6, room1: "3080", table1: "14", room2: "559", note: "" },

    // 908
    { name: "王O陞", class: "908", gender: "男", bus: 6, room1: "2140", table1: "15", room2: "506", note: "" },
    { name: "楊O旭", class: "908", gender: "男", bus: 6, room1: "2140", table1: "15", room2: "505", note: "" },
    { name: "陳O霈", class: "908", gender: "男", bus: 6, room1: "2140", table1: "15", room2: "506", note: "" },
    { name: "陳O霆", class: "908", gender: "男", bus: 6, room1: "2140", table1: "15", room2: "505", note: "" },
    { name: "林O鋮", class: "908", gender: "男", bus: 6, room1: "2140", table1: "15", room2: "505", note: "" },
    { name: "林O稷", class: "908", gender: "男", bus: 6, room1: "2140", table1: "15", room2: "505", note: "" },
    { name: "阮O雲", class: "908", gender: "女", bus: 6, room1: "4084", table1: "15", room2: "545", note: "" },
    { name: "連O瑆", class: "908", gender: "女", bus: 6, room1: "4084", table1: "15", room2: "545", note: "" },
    { name: "曾O淯", class: "908", gender: "女", bus: 6, room1: "4084", table1: "15", room2: "545", note: "" },

    // 909
    { name: "簡O辰", class: "909", gender: "男", bus: 7, room1: "2133", table1: "16", room2: "508", note: "" },
    { name: "王O恩", class: "909", gender: "男", bus: 7, room1: "2133", table1: "17", room2: "506", note: "" },
    { name: "李O逸", class: "909", gender: "男", bus: 7, room1: "2133", table1: "16", room2: "506", note: "" },
    { name: "林O德", class: "909", gender: "男", bus: 7, room1: "2133", table1: "素", room2: "508", note: "素食" },
    { name: "陳O儒", class: "909", gender: "男", bus: 7, room1: "2133", table1: "16", room2: "508", note: "" },
    { name: "張O峻", class: "909", gender: "男", bus: 7, room1: "2133", table1: "16", room2: "508", note: "" },
    { name: "吳O浩", class: "909", gender: "男", bus: 7, room1: "2132", table1: "17", room2: "507", note: "" },
    { name: "吳O漳", class: "909", gender: "男", bus: 7, room1: "2132", table1: "17", room2: "507", note: "" },
    { name: "李O諺", class: "909", gender: "男", bus: 7, room1: "2132", table1: "17", room2: "507", note: "" },
    { name: "林O翔", class: "909", gender: "男", bus: 7, room1: "2132", table1: "17", room2: "507", note: "" },
    { name: "姚O慈", class: "909", gender: "女", bus: 7, room1: "2085", table1: "16", room2: "563", note: "" },
    { name: "張O軒", class: "909", gender: "女", bus: 7, room1: "2085", table1: "16", room2: "563", note: "" },
    { name: "許O羽", class: "909", gender: "女", bus: 7, room1: "2085", table1: "16", room2: "563", note: "" },
    { name: "藍O琳", class: "909", gender: "女", bus: 7, room1: "2085", table1: "17", room2: "563", note: "" },
    { name: "林O琪", class: "909", gender: "女", bus: 7, room1: "2086", table1: "17", room2: "565", note: "" },
    { name: "張O寗", class: "909", gender: "女", bus: 7, room1: "2086", table1: "18", room2: "565", note: "" },
    { name: "陳O彤", class: "909", gender: "女", bus: 7, room1: "2086", table1: "16", room2: "565", note: "" },
    { name: "蔡O妍", class: "909", gender: "女", bus: 7, room1: "2086", table1: "16", room2: "565", note: "" },
    { name: "何O瑜", class: "909", gender: "女", bus: 7, room1: "2120", table1: "17", room2: "566", note: "" },
    { name: "林O萱", class: "909", gender: "女", bus: 7, room1: "2120", table1: "16", room2: "566", note: "" },
    { name: "林O褕", class: "909", gender: "女", bus: 7, room1: "2120", table1: "17", room2: "566", note: "" },
    { name: "林O婕", class: "909", gender: "女", bus: 7, room1: "2120", table1: "17", room2: "566", note: "" }
  ],

  attractions: [
  {
    "id": "moon-world",
    "name": "田寮月世界",
    "tag": "Day 1 地質奧秘",
    "subtitle": "如月球表面般的荒涼崎嶇惡地奇觀",
    "googleMapUrl": "https://maps.google.com/?q=田寮月世界地質公園",
    "desc": "月世界在地理學上稱為『惡地』，係雨水與河水在質地軟弱、色呈青灰且略含鹽質的泥岩區，經年累月強烈侵蝕而成的荒涼崎嶇地形。泥岩顆粒細小、膠結鬆散，透水性低，遇雨即順坡流瀉，植物極難生長，因而形成寸草不生的光禿鋸齒狀山脊。民國70年於此地建造中國涼亭式建築『攬月樓』，登上平台可遠眺宛如月球般的蒼茫絕景。",
    "images": [
      "assets/img/moon_world_1.jpg",
      "assets/img/moon_world_2.jpg",
      "assets/img/moon_world_3.jpg"
    ],
    "webLinks": [
      {
        "title": "高雄旅遊網｜田寮月世界地質公園官方介紹",
        "url": "https://khh.travel/zh-tw/attractions/detail/205"
      }
    ],
    "videoLinks": [
      {
        "title": "【空拍奇觀】田寮月世界惡地全貌導覽",
        "url": "https://www.youtube.com/results?search_query=田寮月世界+空拍"
      },
      {
        "title": "【台灣地質驚奇】漫步月世界嫦娥奔月步道",
        "url": "https://www.youtube.com/results?search_query=田寮月世界+步道導覽"
      },
      {
        "title": "【自然教育】泥岩惡地地形是如何形成的？",
        "url": "https://www.youtube.com/results?search_query=田寮月世界+地質形成"
      }
    ]
  },
  {
    "id": "nmmba",
    "name": "國立海洋生物博物館 (海生館)",
    "tag": "Day 1 生態殿堂",
    "subtitle": "亞洲知名水族博物館・三大常設主題展館",
    "googleMapUrl": "https://maps.google.com/?q=國立海洋生物博物館",
    "desc": "國立海洋生物博物館位於屏東縣車城鄉，海生館的館魚為『燕魚』。全館分為三大主題展館：\n1. 【台灣水域館】：取景谷關龍谷瀑布為起點，引領參觀者從小水滴的旅行展開冒險，歷經高山溪流、水庫、牡蠣養殖、河口，終至壯麗的大洋池（仿台灣東部大洋生態）。\n2. 【珊瑚王國館】：以熱帶雨林之姿展現絢麗活珊瑚礁頂、礁壁與80公尺長的海底隧道，近距離與小白鯨相遇。\n3. 【世界水域館】：全球首創3D虛擬實境之無水水族館，涵蓋古代海洋、海藻森林、深海水域與極地水域（可愛企鵝家族）。",
    "images": [
      "assets/img/nmmba_cover_1.jpg",
      "assets/img/nmmba_cover_2.jpg",
      "assets/img/nmmba_taiwan.png",
      "assets/img/nmmba_coral.png",
      "assets/img/nmmba_world.jpg"
    ],
    "webLinks": [
      {
        "title": "國立海洋生物博物館官方網站",
        "url": "https://www.nmmba.gov.tw/"
      }
    ],
    "videoLinks": [
      {
        "title": "【海生館三大展館完整開箱】大洋池餵食秀直擊",
        "url": "https://www.youtube.com/results?search_query=國立海洋生物博物館+完整導覽"
      },
      {
        "title": "【小白鯨海中金絲雀】珊瑚王國海底隧道特寫",
        "url": "https://www.youtube.com/results?search_query=海生館+小白鯨+海底隧道"
      },
      {
        "title": "【極地企鵝與巨藻森林】世界水域館沉浸體驗",
        "url": "https://www.youtube.com/results?search_query=海生館+企鵝餵食+巨藻森林"
      }
    ]
  },
  {
    "id": "maobitou",
    "name": "貓鼻頭風景區",
    "tag": "Day 1 國境之南",
    "subtitle": "台灣海峽與巴士海峽的分界指標",
    "googleMapUrl": "https://maps.google.com/?q=貓鼻頭風景區",
    "desc": "貓鼻頭位於恆春半島西南頂端，向巴士海峽延伸而出，與東側的鵝鑾鼻形成臺灣最南的兩端，更是臺灣海峽與巴士海峽的天然分界點。長時間受強烈海蝕與海流沖刷，形成了崩崖、壺穴、礁柱、海蝕溝等奇特地形，屬於典型的隆起珊瑚礁海岸（裙礁）。遠眺海面波瀾壯闊，海風徐徐，是認識海洋地質的天然教室。",
    "images": [
      "assets/img/maobitou_1.jpg",
      "assets/img/maobitou_2.jpg"
    ],
    "webLinks": [
      {
        "title": "墾丁國家公園管理處｜貓鼻頭遊憩區導覽",
        "url": "https://www.ktnp.gov.tw/News_Content.aspx?n=855&s=2541"
      }
    ],
    "videoLinks": [
      {
        "title": "【雙海交界壯闊空拍】走訪貓鼻頭裙礁崩崖海岸",
        "url": "https://www.youtube.com/results?search_query=貓鼻頭+空拍+海蝕地形"
      },
      {
        "title": "【大自然鬼斧神工】認識貓鼻頭地質壺穴與礁柱",
        "url": "https://www.youtube.com/results?search_query=貓鼻頭+地質解說"
      },
      {
        "title": "【恆春半島南端采風】貓鼻頭落日與海風步道",
        "url": "https://www.youtube.com/results?search_query=貓鼻頭風景區+導覽"
      }
    ]
  },
  {
    "id": "kenting-street",
    "name": "墾丁大街夜巡",
    "tag": "Day 1 熱鬧夜巡",
    "subtitle": "國境之南最熱鬧不夜城・山海交織的美食盛宴",
    "googleMapUrl": "https://maps.google.com/?q=墾丁大街",
    "desc": "墾丁大街位於屏東縣恆春鎮墾丁路，是恆春半島最知名的觀光夜市與休閒核心。入夜後，街道兩側林立特色攤商、異國酒吧與文創小舖，洋溢著熱帶島嶼的渡假風情。\n\n【墾丁大街必吃排隊名店與特色小吃 20 選】：\n1. 勇伯脆皮大腸包小腸：炭烤香氣四溢、多種特調醬料與酸菜搭配\n2. 墾丁Q蛋奶：黑糖慢熬香濃珍珠，搭配濃郁鮮奶\n3. 一品滷味：獨門中藥滷汁，特製斷魂辣椒醬香麻開胃\n4. 吳師傅魯味：招牌蛇辣醬辛香帶勁，食材種類豐富多元\n5. 巷子內十碗麵：隱密巷弄排隊名店，紅燒軟嫩牛肉與特製醬汁\n6. 酥炸脆皮鮮奶：外皮金黃酥脆、內餡如卡士達般溫熱爆漿\n7. 烤飛魚卵香腸：逼波作響的飛魚卵融合原民黑毛豬肉\n8. 炙燒火焰骰子牛：噴槍高溫炙烤，撒上玫瑰鹽與黑胡椒汁多鮮嫩\n9. 炭烤大魷魚：整隻新鮮鮮魷刷上海鮮醬汁炭烤，肉質Q彈爽脆\n10. 泰式香蕉煎餅：金黃酥脆餅皮包裹新鮮香蕉片，淋上煉乳與巧克力醬\n11. 墾丁酥炸豆乳雞：特製豆腐乳醃漬入味，外皮酥脆香氣迷人\n12. 拔絲地瓜與芋頭：現炸裹上晶瑩糖衣，過冰水脆口拉絲\n13. 港口茶香冰淇淋：恆春半島特產港口茶研磨，微苦回甘茶韻十足\n14. 酥脆炸蛋蔥油餅：半熟蛋爆漿結合香脆蔥油餅皮，老饕最愛\n15. 現打屏東枋山愛文芒果冰沙：在地盛產愛文芒果，濃郁香甜消暑解渴\n16. 焗烤生蠔與海鮮燒烤：屏東枋寮與恆春直送鮮美海味，鮮甜多汁\n17. 原住民石板烤肉：石板炙燒五花肉佐洋蔥蒜片，油香脆嫩\n18. 鹽酥大蝦與海鮮炸物：產地現撈白蝦酥炸，椒鹽酥香下酒解饞\n19. 恆春古早味綠豆蒜：去皮綠豆熬煮稠香甜湯，搭配桂圓粉條古早味十足\n20. 烤青蛙下蛋與檸檬愛玉：天然愛玉子手搓愛玉凍，酸甜沁涼解膩最佳拍檔",
    "images": [
      "assets/img/kenting_street_1.jpg",
      "assets/img/kenting_street_2.jpg",
      "assets/img/kenting_street_3.jpg"
    ],
    "webLinks": [
      {
        "title": "墾丁國家公園管理處官方網站",
        "url": "https://www.ktnp.gov.tw/"
      }
    ],
    "videoLinks": [
      {
        "title": "【墾丁大街美食全攻略】2026最狂排隊小吃實測",
        "url": "https://www.youtube.com/results?search_query=墾丁大街+美食攻略"
      },
      {
        "title": "【夜遊國境之南】墾丁大街夜巡熱鬧街景開箱",
        "url": "https://www.youtube.com/results?search_query=墾丁大街+夜市導覽"
      },
      {
        "title": "【恆春傳統美味】墾丁大街必吃小吃巡禮",
        "url": "https://www.youtube.com/results?search_query=墾丁大街+必吃小吃"
      }
    ]
  },
  {
    "id": "kenting-howard",
    "name": "墾丁福華渡假大飯店",
    "tag": "Day 1 渡假住宿",
    "subtitle": "國境之南五星級濱海渡假勝地・眺望小灣絕美海景與大尖山",
    "googleMapUrl": "https://maps.google.com/?q=墾丁福華渡假大飯店",
    "desc": "墾丁福華渡假大飯店坐落於恆春半島南端，背依大尖山、前臨巴士海峽，坐擁小灣碧海藍天的絕佳景致。飯店採典雅的西班牙紅瓦白牆南歐渡假莊園風格建造，擁有近 400 間寬敞舒適客房。飯店內設有大坪數休閒中心、戶外標準游泳池、健身房，並建有全台首創的『私密專屬小灣隧道』，步行數分鐘即可直達小灣金黃沙灘與湛藍海濱。鄰近熱鬧的墾丁大街，步行即可感受南島夜市的歡樂熱情，是國境之南最具代表性的五星級渡假地標。\n\n【住宿特別叮嚀】：響應政府環保減塑政策，飯店客房全面不提供一次性備品（牙刷、牙膏、梳子、刮鬍刀等），請全體師生務必自備個人盥洗用具；夜間活動時請遵守飯店安寧秩序與晚點名規定。",
    "images": [
      "assets/img/howard_1.jpg",
      "assets/img/howard_2.jpg",
      "assets/img/howard_3.jpg",
      "assets/img/howard_4.jpg"
    ],
    "webLinks": [
      {
        "title": "墾丁福華渡假大飯店官方網站",
        "url": "https://www.howard-hotels.com.tw/zh_TW/HotelBusiness/98"
      }
    ],
    "videoLinks": [
      {
        "title": "【墾丁福華渡假大飯店開箱】五星級海景客房與專屬小灣海灘通道",
        "url": "https://www.youtube.com/results?search_query=墾丁福華渡假大飯店+開箱"
      },
      {
        "title": "【國境之南海島渡假】墾丁福華麗香苑自助百匯早餐與休閒設施",
        "url": "https://www.youtube.com/results?search_query=墾丁福華+麗香苑+早餐"
      },
      {
        "title": "【墾丁福華夜間漫遊】鄰近墾丁大街與小灣星空導覽",
        "url": "https://www.youtube.com/results?search_query=墾丁福華+夜間+小灣"
      }
    ]
  },
  {
    "id": "eda-theme-park",
    "name": "義大遊樂世界",
    "tag": "Day 2 狂歡冒險",
    "subtitle": "全台唯一希臘情境主題樂園・47項遊樂設施獨冠全台",
    "googleMapUrl": "https://maps.google.com/?q=義大遊樂世界",
    "desc": "坐落於高雄大樹區觀音山麓，以希臘神話與愛琴海風情打造：\n• 【衛城】：古希臘神殿建築，設有大型劇院與演藝秀。\n• 【聖托里尼山城】：重現藍白相間愛琴海浪漫海島風情，戶外設有高達55公尺的『天旋地轉』、落差33公尺的『飛越愛情海』、以及亞洲唯一U型滑板『極限挑戰』。\n• 【特洛伊城】：重現木馬屠城記歷史場景，占地15000坪全台最大室內主題館，無畏烈日或風雨！熱門設施包含萬聖屋、飛越台灣模擬飛行、地心歷險暗室雲霄飛車等。",
    "images": [
      "assets/img/eda_1.jpg",
      "assets/img/eda_2.jpg",
      "assets/img/eda_trojan_1.jpg",
      "assets/img/eda_trojan_2.jpg"
    ],
    "webLinks": [
      {
        "title": "義大遊樂世界官方網站",
        "url": "http://www.edathemepark.com.tw/"
      }
    ],
    "videoLinks": [
      {
        "title": "【義大遊樂世界全攻略】特洛伊城堡室內設施實測",
        "url": "https://www.youtube.com/results?search_query=義大遊樂世界+特洛伊城堡+攻略"
      },
      {
        "title": "【高空尖叫極限】天旋地轉與飛越愛情海實拍",
        "url": "https://www.youtube.com/results?search_query=義大+天旋地轉+實拍"
      },
      {
        "title": "【飛越台灣模擬飛行】身歷其境震撼飛行劇場",
        "url": "https://www.youtube.com/results?search_query=義大+飛越台灣+開箱"
      }
    ]
  },
  {
    "id": "eda-mall",
    "name": "義大世界購物廣場 ＆ 摩天輪",
    "tag": "Day 2 時尚休閒",
    "subtitle": "海拔215公尺南台灣最高摩天輪・璀璨夜景名品商場",
    "googleMapUrl": "https://maps.google.com/?q=義大世界購物廣場",
    "desc": "全台灣首創大型名品Outlet商場，佔地58000坪，擁有羅馬天幕造景與豐富的美食天地。最著名的地標為直徑80公尺、座落於海拔215公尺頂樓的巨型摩天輪，是南台灣最高的景觀摩天輪。當夜幕低垂，128種炫麗炫彩燈光秀啟動，坐在車廂內可飽覽高屏山景、佛光山與義大夜景，為畢旅留下最璀璨的夜間記憶。",
    "images": [
      "assets/img/eda_mall_1.jpg",
      "assets/img/eda_ferris_wheel.jpg"
    ],
    "webLinks": [
      {
        "title": "義大世界購物廣場官方網站",
        "url": "http://www.edamall.com.tw/"
      }
    ],
    "videoLinks": [
      {
        "title": "【義大摩天輪夜景實拍】海拔215公尺俯瞰高屏夜景",
        "url": "https://www.youtube.com/results?search_query=義大摩天輪+夜景"
      },
      {
        "title": "【全台最大Outlet商場開箱】羅馬天幕與美食街巡禮",
        "url": "https://www.youtube.com/results?search_query=義大世界購物廣場+導覽"
      },
      {
        "title": "【128種璀璨燈光秀】義大夜間縮時攝影景觀",
        "url": "https://www.youtube.com/results?search_query=義大摩天輪+燈光秀+縮時"
      }
    ]
  },
  {
    "id": "eda-skylark",
    "name": "高雄義大天悅飯店",
    "tag": "Day 2 璀璨住宿",
    "subtitle": "義大世界核心英式新古典飯店・漫步摩天輪與購物商場",
    "googleMapUrl": "https://maps.google.com/?q=高雄義大天悅飯店",
    "desc": "高雄義大天悅飯店座落於高雄大樹區義大世界園區核心，外觀融合典雅氣派的英式新古典建築風貌。飯店擁有各型寬敞舒適客房與百匯自助餐廳，室內空間挑高宏偉、氛圍溫馨怡人。天悅飯店地理位置得天獨厚，緊鄰直徑 80 公尺的海拔 215 公尺璀璨巨型摩天輪、義大世界購物廣場 Outlet 與義大遊樂世界，透過人行景觀天橋即可輕鬆漫步穿梭。夜晚窗外即可飽覽絢爛浪漫的摩天輪燈光秀與歐風山城夜景，讓畢旅第二晚洋溢著時尚休閒與浪漫回憶。\n\n【住宿特別叮嚀】：響應政府環保減塑政策，客房內不提供一次性盥洗用品（牙膏、牙刷、刮鬍刀等），敬請隨身自備；入夜後請依規定就寢查房，切勿喧嘩奔跑，維持良好作息以迎接第三天精彩行程。",
    "images": [
      "assets/img/skylark_1.jpg",
      "assets/img/skylark_2.jpg",
      "assets/img/skylark_3.jpg",
      "assets/img/skylark_4.jpg"
    ],
    "webLinks": [
      {
        "title": "高雄義大天悅飯店官方網站",
        "url": "https://www.edaskylark.com.tw/"
      }
    ],
    "videoLinks": [
      {
        "title": "【高雄義大天悅飯店開箱】英式新古典典雅客房與百匯晨喚早餐",
        "url": "https://www.youtube.com/results?search_query=義大天悅飯店+開箱"
      },
      {
        "title": "【義大世界渡假園區】天悅飯店直通義大Outlet摩天輪夜景",
        "url": "https://www.youtube.com/results?search_query=義大天悅飯店+摩天輪+夜景"
      },
      {
        "title": "【義大百匯自助餐廳】百種豐盛中西式料理活力晨喚直擊",
        "url": "https://www.youtube.com/results?search_query=義大天悅飯店+早餐+百匯"
      }
    ]
  },
  {
    "id": "cijin",
    "name": "旗津風景區（砲台・天后宮・星空隧道）",
    "tag": "Day 3 港都史蹟",
    "subtitle": "高雄發祥地・古砲台、媽祖廟與十二星座浪漫海隧",
    "googleMapUrl": "https://maps.google.com/?q=旗津星空隧道",
    "desc": "旗津（舊稱旗後）是高雄市最早開墾繁榮之地，原為平埔馬卡道族居住地：\n• 【旗後砲台】：清代扼守打狗港門戶之海防要塞，營門上方題有『威震天南』，磚砌字牆隱含傳統建築美學。\n• 【旗後天后宮】：建於清康熙12年（1673年），是高雄市歷史最悠久的媽祖廟，香火鼎盛，庇佑討海捕魚子民數百年。\n• 【星空隧道】：原為貫穿旗後山的軍事隧道，市府改造為木棧自行車道，隧道壁面彩繪夜光十二星座與蓄光石，出隧道即見壯闊的台灣海峽與防波堤浪花。",
    "images": [
      "assets/img/cijin_fort_1.jpg",
      "assets/img/cijin_fort_2.jpg",
      "assets/img/cijin_temple.jpg",
      "assets/img/cijin_tunnel_1.jpg",
      "assets/img/cijin_tunnel_2.jpg"
    ],
    "webLinks": [
      {
        "title": "高雄旅遊網｜旗津老街與星空隧道巡禮",
        "url": "https://khh.travel/zh-tw/attractions/detail/207"
      }
    ],
    "videoLinks": [
      {
        "title": "【旗津深度漫遊】星空隧道、旗後砲台俯瞰大高雄港",
        "url": "https://www.youtube.com/results?search_query=旗津+星空隧道+旗後砲台"
      },
      {
        "title": "【威震天南歷史古蹟】旗後砲台建築美學與海防歷史",
        "url": "https://www.youtube.com/results?search_query=旗後砲台+介紹"
      },
      {
        "title": "【旗津老街美食巡禮】走訪百年媽祖天后宮",
        "url": "https://www.youtube.com/results?search_query=旗津老街+天后宮"
      }
    ]
  },
  {
    "id": "chimei-museum",
    "name": "奇美博物館",
    "tag": "Day 3 文藝瑰寶",
    "subtitle": "實業家許文龍先生畢生心血・共享大眾的西洋美學聖殿",
    "googleMapUrl": "https://maps.google.com/?q=奇美博物館",
    "desc": "奇美博物館始於1992年，由奇美實業創辦人許文龍先生捐資興建。許創辦人幼年受到博物館薰陶，立志創建一座『屬於大眾共享共賞的博物館』，秉持『這些文物是世界文化的珍寶，我們只是暫時的保管者，未來還要代代相傳下去』之宏願。\n園區外圍座落著阿波羅噴泉廣場、奧林帕斯神像橋；館內常設展涵蓋西洋繪畫雕塑、全球動物標本自然史、名琴樂器收藏與古代兵器兵工藝，宏偉的希臘羅馬古典廊柱讓人彷彿置身歐洲藝術殿堂。",
    "images": [
      "assets/img/chimei_1.jpg",
      "assets/img/chimei_2.jpg",
      "assets/img/chimei_3.jpg"
    ],
    "webLinks": [
      {
        "title": "奇美博物館官方網站",
        "url": "https://www.chimeimuseum.org/"
      }
    ],
    "videoLinks": [
      {
        "title": "【奇美博物館全展區開箱】阿波羅噴泉與歐洲古典名畫",
        "url": "https://www.youtube.com/results?search_query=奇美博物館+完整導覽"
      },
      {
        "title": "【許文龍創辦理念】大眾共享的世界文化寶藏",
        "url": "https://www.youtube.com/results?search_query=許文龍+奇美博物館+理念"
      },
      {
        "title": "【走進歐洲童話殿堂】奧林帕斯橋與阿波羅水舞實拍",
        "url": "https://www.youtube.com/results?search_query=奇美博物館+阿波羅噴泉+水舞"
      }
    ]
  },
  {
    "id": "mingjian-park",
    "name": "名間親子生態園區",
    "tag": "Day 3 生態樂園",
    "subtitle": "全台最受矚目 2.6 公頃全齡共融生態公園・5米巨無霸彩虹溜滑梯",
    "googleMapUrl": "https://maps.google.com/?q=名間親子生態園區",
    "desc": "名間親子生態園區位於南投縣名間鄉，占地達 2.6 公頃，為南投縣政府斥資近 6,000 萬元打造的大型全齡共融式生態休閒公園。園區地標為高達 5 公尺、擁有兩道各長達 15 公尺的巨無霸彩虹磨石子溜滑梯與愛心草皮景觀，並配置全遮陽波浪天幕防曬。園區內還規劃有天空環狀步道、攀爬設施、多元共融鞦韆、大型磨石子滑梯沙坑區以及噴水池生態親水區；草木扶疏並結合生態水池，是返抵南投國中前舒展身心、合影留念的最佳休閒亮點。",
    "images": [
      "assets/img/mingjian_1.jpg",
      "assets/img/mingjian_2.jpg",
      "assets/img/mingjian_3.jpg"
    ],
    "webLinks": [
      {
        "title": "南投旅遊網｜名間親子生態園區官方介紹",
        "url": "https://travel.nantou.gov.tw/spot/%E5%90%8D%E9%96%93%E8%A6%AA%E5%AD%90%E7%94%9F%E6%85%8B%E5%9C%92%E5%8D%80/"
      }
    ],
    "videoLinks": [
      {
        "title": "【名間親子生態園區完整導覽】南投最新2.6公頃放電樂園",
        "url": "https://www.youtube.com/results?search_query=名間親子生態園區+導覽"
      },
      {
        "title": "【5米巨無霸彩虹滑梯】兩道15公尺磨石子極速體驗",
        "url": "https://www.youtube.com/results?search_query=名間親子生態園區+彩虹溜滑梯"
      },
      {
        "title": "【天空環狀步道與攀爬設施】南投全齡共融遊具大公開",
        "url": "https://www.youtube.com/results?search_query=名間親子生態園區+遊具"
      }
    ]
  }
],

  quiz: {
    trueFalse: [
      {
        id: "tf1",
        question: "01. 小丑魚和海葵有合作的行為嗎？",
        answer: true,
        answerText: "是",
        explanation: "小丑魚與海葵是典型的互利共生關係！海葵的有毒觸手能保護小丑魚免受天敵攻擊，小丑魚則能替海葵清理觸手雜質、死屑，並以游動吸引其他小魚成為海葵的食物。"
      },
      {
        id: "tf2",
        question: "02. 海馬是否為魚類？",
        answer: true,
        answerText: "是",
        explanation: "海馬雖然外形奇特且直立游泳，但牠們擁有鰓、背鰭，身體由骨質環片包覆，在分類學上屬於輻鰭魚綱海龍魚科，是百分之百的硬骨魚類！"
      },
      {
        id: "tf3",
        question: "03. 魚有舌骨，請問魚是否有舌頭呢？",
        answer: true,
        answerText: "是",
        explanation: "魚類確實有舌頭！只是魚的舌頭構造相對簡單（多為基舌或初級舌），由舌骨支撐，表面覆有黏膜或齒狀突起，主要用來固定與吞嚥獵物，無法像人類舌頭般靈活伸縮伸出。"
      }
    ],
    qa: [
      {
        num: "01",
        q: "請問蛤蜊的生殖方式為何？另『珍珠』是如何形成的？",
        a: "公貝及母貝同時放出精、卵於水中。受精卵在水中懸浮數日，發育成仔貝再沈至底部。\n【珍珠形成】：為防止進入殼內之異物（如砂粒或寄生蟲）使軟體組織發炎，蚌貝會分泌碳酸鈣之珍珠質層層包裹此異物，經過數年累積沉澱後形成圓潤光澤的珍珠。"
      },
      {
        num: "02",
        q: "魷魚和花枝該怎麼分阿？",
        a: "• 魷魚（鎖管、小管）：鰭葉僅在尾部，身體呈長錐形，體內具有透明針形的幾丁質內殼，常見曬製成魷魚乾。\n• 花枝（烏賊）：鰭葉分布在身體周圍兩側，體態較圓胖，體內具有一塊大而白色鈣質的長菱形烏賊骨（海螵蛸）。"
      },
      {
        num: "03",
        q: "為何養的水母越來越小？",
        a: "一般人水族館飼養的多為白色半透明的『海月水母』，牠們需要攝食浮游動物。若未適當進食，水母會消耗自身體內的組織與水分來取得游動生存所需之能量，導致體積愈變愈小。"
      },
      {
        num: "04",
        q: "魚的年齡如何判斷？",
        a: "如同樹木看年輪一樣！可以透過將魚的脊椎骨磨平觀察其同心圓輪紋；硬骨魚類的平衡器官（內耳）內有『內耳石（耳石）』，橫切磨光後可在顯微鏡下看到如同年輪般的明暗生長輪（需配合魚種生活史推估）。"
      },
      {
        num: "05",
        q: "何處為亞洲最大水族博物館？",
        a: "國立海洋生物博物館（台灣屏東車城）。"
      },
      {
        num: "06",
        q: "國立海洋生物博物館位於哪一縣？哪一鄉？",
        a: "屏東縣車城鄉。"
      },
      {
        num: "07",
        q: "海生館的館魚為何？共分哪幾個參觀館？",
        a: "館魚是『燕魚』。全館分為三大主要常設展示館：台灣水域館、珊瑚王國館、世界水域館。"
      },
      {
        num: "08",
        q: "鯨魚親水廣場中有幾種鯨魚？展示大廳上的魚模型為何都面向海洋呢？",
        a: "親水廣場有兩種鯨魚：大翅鯨（座頭鯨）與抹香鯨。\n展示大廳的模型魚全部頭朝向海洋方向，象徵『回歸海洋、飲水思源』的生態保育精神。"
      },
      {
        num: "09",
        q: "您知道魟魚的胸鰭、腹鰭、背鰭及尾鰭在哪裡嗎？",
        a: "• 胸鰭：身體兩側擴展成寬大波浪狀如翅膀的部位。\n• 腹鰭：在身體後下方、排泄孔兩側較小的鰭片。\n• 背鰭：位於細長尾巴基部上方的小鰭。\n• 尾鰭：位於尾巴最末端。"
      },
      {
        num: "10",
        q: "台灣水域館的主題是？高山溪流區中，櫻花鉤吻鮭的同種魚類是？",
        a: "主題是『從高山到海洋小水滴的旅行』。\n高山溪流區中櫻花鉤吻鮭的同科冷水性魚類夥伴如『高山鯝魚（苦花）』。"
      },
      {
        num: "11",
        q: "比比看：河流上游與中游的不同？",
        a: "• 水流比較急、流速大的是上游（落差大）；水流量較大的是下游。\n• 石頭比較大、稜角分明的是上游（因剛從岩壁崩落）；被水流長途沖刷圓潤細小的是下游與出海口。"
      },
      {
        num: "12",
        q: "海生館大洋池餵魚秀的主角為何種魚類？大洋池裡的生態是仿照哪一個海域的？",
        a: "主角包含鯨鯊、魟魚、大型石斑等。\n大洋池生態仿照的是『台灣東部太平洋大洋區』。"
      },
      {
        num: "13",
        q: "白鯨喜歡唱歌，所以又被稱為什麼？",
        a: "『海中金絲雀』。白鯨能發出多達數十種多變口哨聲、唧唧聲與鳥鳴般的音調進行回聲定位與社交溝通。"
      },
      {
        num: "14",
        q: "鯊魚用什麼構造偵測微弱的電流與獵物？",
        a: "一種稱為『羅倫氏壺腹（Ampullae of Lorenzini）』的電感受器器官，分布在鯊魚吻部周圍，能感應百萬分之一伏特的微弱生物電流。"
      },
      {
        num: "15",
        q: "地球歷史上體型最大的動物是誰？",
        a: "藍鯨（Blue Whale，長度可達30公尺以上，體重超過150公噸，遠超過任何已知恐龍）。"
      },
      {
        num: "16",
        q: "海生館展示大廳上的懸掛大烏賊為何？側邊扁平圓盤狀的大魚為何？",
        a: "深海巨大頭足類『大王烏賊』；側邊扁平無尾柄的圓形大魚為『曼波魚（翻車魚）』。"
      },
      {
        num: "17",
        q: "“珊瑚礁”依照地質形態主要分為哪三大類呢？",
        a: "1. 堡礁（Barrier Reef，如澳洲大堡礁）\n2. 環礁（Atoll，如南海東沙環礁）\n3. 裙礁（Fringing Reef，如台灣恆春墾丁海岸、貓鼻頭）。"
      },
      {
        num: "18",
        q: "影響珊瑚礁毀壞的重要因素是什麼？珊瑚礁每年的產卵期在幾月？",
        a: "• 毀壞因素：海水溫度異常升高、水質混濁沉積物覆蓋、人為踩踏與廢水污染、過度捕撈。\n• 產卵盛期：每年農曆 3～4 月（約國曆四、五月媽祖生日前後），常出現大規模夜間同步釋卵壯觀景象。"
      },
      {
        num: "19",
        q: "珊瑚行光合作用需要的生物為何？珊瑚白化的原因有哪些？",
        a: "• 必備生物：共生於珊瑚體內的單細胞藻類『共生藻（蟲黃藻）』。\n• 白化原因：當海水水溫超過耐受極限（>30℃）或環境惡化時，共生藻離開或死亡，導致珊瑚失去色彩，露出內部白色碳酸鈣骨骼，若持續過久珊瑚便會飢餓死亡。"
      },
      {
        num: "20",
        q: "珊瑚穴是礁岩動物的休息區，糯鰻（海鰻）為何在銳利的珊瑚礁中穿梭不會割傷？",
        a: "糯鰻表皮無硬鱗，但表面覆蓋著一層非常厚而滑溜的黏膜分泌物，能有效減少摩擦阻力並隔絕尖銳珊瑚礁石的割傷。"
      },
      {
        num: "21",
        q: "獅子魚的學名屬名為何？",
        a: "獅子魚學名為『蓑鮋（Pterois）』，魚鰭棘條發達如羽翼，棘條基部具有毒腺。"
      },
      {
        num: "22",
        q: "世界上體型最大的雙殼貝類是誰？它的閉殼肌是宴席上常吃到的何種食材？",
        a: "『巨硨磲蛤（大硨磲）』，長度可達1.2公尺以上。\n其肥厚發達的閉殼肌曬乾加工後即為名貴食材『干貝』。"
      },
      {
        num: "23",
        q: "珊瑚王國館的主題是什麼？館內明星小白鯨的原生故鄉在哪裡？",
        a: "主題是『海洋中的熱帶雨林』。\n小白鯨的原生棲地是冷冽的北極與亞北極海域（俄羅斯、加拿大、阿拉斯加周邊）。"
      },
      {
        num: "24",
        q: "台灣與澎湖傳統漁民口訣中，最令人聞風喪膽的『四大毒魚』為何？",
        a: "口訣：『一魟、二虎、三沙毛、四臭肚』。\n1. 魟魚（尾刺劇毒） 2. 獅子魚（虎鮋，背棘劇毒） 3. 沙毛（鰻鯰，胸背棘有毒） 4. 臭肚（象魚/藍子魚，背鰭刺毒）。"
      },
      {
        num: "25",
        q: "海生館設立水下工作站的目的為何？海底隧道的長度總共約為幾公尺？",
        a: "1. 目的：為了不驚擾海洋生物，直接長時觀測、紀錄與研究珊瑚礁與魚群的自然生態。\n2. 海底隧道長度：長達 84 公尺，為全台最具代表性的海底沉浸式景觀。"
      }
    ]
  },

  notices: {
    briefing: {
      date: "10/20（二）",
      speaker: "董O遠學務主任",
      title: "10/20（二）董O遠主任 畢旅行前說明會重點宣導",
      items: [
        {
          num: "一",
          title: "違禁品查驗",
          content: "<strong style=\"color:#dc2626;\">出發前再檢查一次</strong>！嚴禁攜帶<strong style=\"color:#dc2626;\">菸酒檳榔、刀械…</strong>等任何危險違禁品。"
        },
        {
          num: "二",
          title: "個人物品準備",
          content: "<strong style=\"color:#dc2626;\">健保卡</strong>、個人醫藥必備，零用錢<strong style=\"color:#dc2626;\">限2000元以內</strong>；<strong style=\"color:#dc2626;\">體育服晚上穿</strong>；<strong style=\"color:#dc2626;\">不要帶任天堂 Switch 等電玩主機…</strong>。"
        },
        {
          num: "三",
          title: "服裝儀容規範",
          content: "著合宜便服。女生<strong style=\"color:#dc2626;\">不要穿小可愛、熱褲、短裙！褲子至少一個拳頭高度</strong>；全程穿著<strong style=\"color:#dc2626;\">布鞋</strong>（拖鞋僅限沙灘踏浪活動使用）。"
        },
        {
          num: "四",
          title: "五星飯店公物愛護",
          content: "飯店都是五星級飯店，<strong style=\"color:#dc2626;\">地毯很貴、偷抽菸引發灑水設施極為昂貴</strong>，嚴禁抽菸嬉鬧，違者照價賠償！"
        },
        {
          num: "五",
          title: "義大設施安全",
          content: "<strong style=\"color:#dc2626;\">適合自己的遊戲去玩就好！</strong>有<strong style=\"color:#dc2626;\">心臟病或氣喘絕對不要玩刺激的遊戲！</strong>最恐怖的設施不要跟我搶…安全第一！"
        },
        {
          num: "六",
          title: "校規紀律與機動車處置",
          content: "隨隊配置<strong style=\"color:#dc2626;\">機動車巡查</strong>！違犯校規之<strong style=\"color:#dc2626;\">打架、抽菸、喝酒、吃檳榔等（下車再檢查），一律即刻送回學校，家長帶回家管教！記大過！</strong>"
        }
      ]
    },
    personal: [
      "【守時至上】『守時』是活動順利進行的不二法門，請準時抵達指定集合地點。各班班長確實掌握人數，上、下車清點人數後向隨隊人員、導師回報。",
      "【行車安全】上車前先上洗手間，會暈車的同學請開車前半小時服用暈車藥。同學必須全程繫安全帶，行車間嚴禁任意走動，頭手不可伸出車外。",
      "【過馬路安全】上下車或休息站上洗手間時需過馬路應特別注意安全，休息站車輛頻繁務必左右張望。",
      "【團隊禮儀】參訪活動期間遇友校學生應互相禮讓、避免言語衝突，注意言行舉止。車內、餐廳、飯店、景點均應主動維護環境整潔。",
      "【嚴禁脫隊】活動全程一律團隊帶隊，嚴禁私自個別行動，行動中務必三五成群，切勿落單進入無人高危險區域。",
      "【牢記電話】請同學記住自己的車號及吃飯桌次，並牢記導師電話；若不慎脫隊立即聯絡導師或領隊。",
      "【違禁品嚴禁】嚴禁攜帶菸酒、檳榔、麻將、不良書刊等違禁品，若有違反校規者一律從嚴議處。",
      "【量力而為】請愛惜身體，若具心臟病、心血管疾病或經醫師指示不能從事劇烈活動者，切勿搭乘刺激遊樂設施。遇有不適立刻告知老師。",
      "【安全第一】行程中若未經學校專業規劃安排，絕對禁止擅自游泳戲水！下車或離開飯店時，隨身貴重物品請自行保管。",
      "【尊重領隊】嚴禁私下聯絡領隊，禁止私加領隊 LINE、FB、IG 等任何社群媒體以維護公私分際。",
      "【愛護公物】嚴禁在飯店內使用染髮劑或指甲油，如有弄髒毛巾地毯或損害物品，必須依飯店價目全額賠償！"
    ],
    hotel: [
      "大家共同維護房客住宿品質，走廊及各區域走動時請放輕腳步、輕聲細語。",
      "夜間需按規定時間就寢。晚點名時務必在自己房間內，不得私自調換房間或到其他房間聊天喧嘩。",
      "保護自身安全，請千萬不要在彈簧床上彈跳，避免床架斷裂受傷。",
      "電視螢幕機體沉重，若需微調角度請洽領隊或飯店人員，切勿自行大力搬動摔落。",
      "客房內使用後的濕毛巾請放回浴室毛巾架，切勿丟在床上造成棉被潮濕孳生黴菌。",
      "進入飯店房間後，第一件事請先查看門後逃生避難路線圖、緊急安全門位置及窗戶景況。",
      "若遇緊急災害火災時：遵從服務人員引導，以濕毛巾捂口鼻放低身段往安全梯逃生，下樓千萬不可搭乘電梯！出房門前先手背摸門板測溫。"
    ],
    motionSickness: [
      {
        tip: "行前睡眠充裕",
        desc: "出發前一晚避免通宵熬夜打電動，充足精神是抗暈第一步。"
      },
      {
        tip: "乘車飲食節制",
        desc: "乘車前三小時請勿吃太飽，避免大量乳製品、豆漿、油炸油膩及辛辣食物。"
      },
      {
        tip: "坐前排靠窗通風",
        desc: "易暈車同學盡量乘坐前座位置，將冷氣出風口對準臉部保持空氣流通。"
      },
      {
        tip: "轉移焦點減少晃動",
        desc: "乘車時頭部盡量貼靠椅背，凝視遠方地平線風景或閉目入睡，切勿在車上低頭滑手機或看書。"
      }
    ],
    acupoints: [
      {
        name: "合谷穴",
        effect: "緩解頭痛、提神醒腦",
        method: "手心向下，拇指食指併攏時虎口肌肉隆起最高處，以另一手拇指指腹垂直深壓5秒放鬆，持續按壓數次。"
      },
      {
        name: "內關穴",
        effect: "止嘔吐、平復胃部逆流、安神",
        method: "手心向上，從手腕橫紋正中往手臂方向量取『三橫指（食指中指無名指併攏寬度）』，兩條大筋中間凹陷處即為內關穴。"
      },
      {
        name: "足三里穴",
        effect: "消除噁心反胃、調節腸胃氣機",
        method: "膝蓋外側凹陷（外膝眼）直下四指橫寬、脛骨旁開一橫指處，揉按會有微酸脹感。"
      }
    ],
    firstAid: [
      {
        title: "流鼻血急救處置",
        steps: "讓患者坐正並『頭部稍微前傾』（切勿仰頭避免血液倒流嗆入氣管！），用手指捏緊鼻翼兩側軟骨壓迫約10分鐘，並在鼻樑或額頭敷冷毛巾促使血管收縮。"
      },
      {
        title: "熱傷害與中暑預防",
        steps: "炎熱戶外應穿著寬鬆透氣衣物並戴帽防曬。若出現頭暈、面色蒼白、大量出汗不適，應立刻移至陰涼通風處，鬆開衣物，補充微量淡鹽水，並以濕毛巾或冰袋敷於頸部與腋下降溫。"
      }
    ]
  },

  packingChecklist: [
    {
      category: "必備重要證件與金錢",
      items: [
        { id: "p1", name: "個人健保 IC 卡", tip: "就醫必備，請妥善放置隨身包內夾層" },
        { id: "p2", name: "適量零錢與零用金", tip: "買飲料、紀念品、第二晚晚餐及緊急用途" },
        { id: "p3", name: "家裡大門鑰匙", tip: "回程返家使用，請妥善收納防遺失" },
        { id: "p4", name: "紙、筆、手冊或手機", tip: "筆記學習單、聯絡通訊" }
      ]
    },
    {
      category: "衣物與生活盥洗 (環保自備)",
      items: [
        { id: "p5", name: "換洗衣物 2~3 套", tip: "吸汗排汗衫、休閒長短褲、內衣褲、襪子" },
        { id: "p6", name: "個人牙刷、牙膏", tip: "重要！兩家飯店依法不主動提供一次性盥洗用品" },
        { id: "p7", name: "梳子、浴帽、個人毛巾", tip: "個人衛生清潔用品自備" },
        { id: "p8", name: "輕便薄外套", tip: "遊覽車內空調冷氣較強或海邊早晚防風" },
        { id: "p9", name: "乾淨塑膠袋數個", tip: "裝換下來的髒衣物、鞋子或沙灘濕物" },
        { id: "p10", name: "大型行李箱或旅行袋", tip: "放置換洗衣物與大件物品，置於車底行李艙" }
      ]
    },
    {
      category: "個人隨身與防護常備品",
      items: [
        { id: "p11", name: "個人雙肩隨身背包", tip: "下車參訪時背負水壺、雨具、證件" },
        { id: "p12", name: "個人常備藥物", tip: "個人慢性病、氣喘吸入劑、暈車藥、腸胃藥、止痛藥" },
        { id: "p13", name: "個人隨身水壺 / 環保杯", tip: "隨時補充水分，戶外防中暑" },
        { id: "p14", name: "遮陽帽、太陽眼鏡", tip: "南台灣恆春陽光強烈防紫外線曬傷" },
        { id: "p15", name: "防曬乳、防蚊液", tip: "戶外活動與草地海邊防護" },
        { id: "p16", name: "輕便雨衣或折疊傘", tip: "應對突發陣雨與遮陽兩用" },
        { id: "p17", name: "備用口罩 4~6 個", tip: "進出公眾密閉場所與預防感冒" },
        { id: "p18", name: "行動電源與充電線", tip: "保持手機電力，隨時保持通訊安全" }
      ]
    }
  ]
,

  // 9. 班級相片上傳區 (Padlet 雲端相簿)
  photoUploads: [
    { classId: "301", className: "301 班", mentor: "吳O萱 導師", bus: 2, padletUrl: "https://padlet.com/qianyikeji1/301-s024ojlda9hk5xe7np2t" },
    { classId: "302", className: "302 班", mentor: "黃O英 導師", bus: 2, padletUrl: "https://padlet.com/qianyikeji1/302-s024okmini4rgymbs9yw" },
    { classId: "303", className: "303 班", mentor: "陳O綸 導師", bus: 3, padletUrl: "https://padlet.com/qianyikeji1/303-s024okmwsdwvjgadya4k" },
    { classId: "304", className: "304 班", mentor: "蔡O秀 導師", bus: 1, padletUrl: "https://padlet.com/qianyikeji1/304-s024oknt94p6yo7etau4" },
    { classId: "305", className: "305 班", mentor: "施O婷 導師", bus: 4, padletUrl: "https://padlet.com/qianyikeji1/305-s024oo9ogma3cyhep5cm" },
    { classId: "306", className: "306 班", mentor: "石O洋 導師", bus: 5, padletUrl: "https://padlet.com/qianyikeji1/306-s024oo9zjhfilzg9gncp" },
    { classId: "307", className: "307 班", mentor: "孫O惠 導師", bus: 6, padletUrl: "https://padlet.com/qianyikeji1/307-s024oo9oyvf8h7964ydm" },
    { classId: "308", className: "308 班", mentor: "李O嘉 導師", bus: 6, padletUrl: "https://padlet.com/qianyikeji1/308-s024oo961fnycpk4lm5u" },
    { classId: "309", className: "309 班", mentor: "黃O姿 導師", bus: 7, padletUrl: "https://padlet.com/qianyikeji1/309-s024oo9qzxaowa80fjlz" }
  ]
};

const UNITS_DATA = [
  {
    "id": "unit-01",
    "folder": "1151020-投襅旅行前會",
    "tabName": "行前說明解析",
    "title": "單元 01 · 1151020 畢旅大作戰：南投國中官方行前解析",
    "tag": "行前整備",
    "date": "115/10/20",
    "icon": "clipboard-list",
    "description": "行前全方位說明：日程規劃、出發集合、隨身必備物品、環保減塑無提供一次性備品政策與校外安全規範總整理。",
    "slides": [
      "1151020-投襅旅行前會/1151020畢旅大作戰：南投國中官方行前解析3/投影片1.JPG",
      "1151020-投襅旅行前會/1151020畢旅大作戰：南投國中官方行前解析3/投影片2.JPG",
      "1151020-投襅旅行前會/1151020畢旅大作戰：南投國中官方行前解析3/投影片3.JPG",
      "1151020-投襅旅行前會/1151020畢旅大作戰：南投國中官方行前解析3/投影片4.JPG",
      "1151020-投襅旅行前會/1151020畢旅大作戰：南投國中官方行前解析3/投影片5.JPG",
      "1151020-投襅旅行前會/1151020畢旅大作戰：南投國中官方行前解析3/投影片6.JPG",
      "1151020-投襅旅行前會/1151020畢旅大作戰：南投國中官方行前解析3/投影片7.JPG",
      "1151020-投襅旅行前會/1151020畢旅大作戰：南投國中官方行前解析3/投影片8.JPG",
      "1151020-投襅旅行前會/1151020畢旅大作戰：南投國中官方行前解析3/投影片9.JPG",
      "1151020-投襅旅行前會/1151020畢旅大作戰：南投國中官方行前解析3/投影片10.JPG",
      "1151020-投襅旅行前會/1151020畢旅大作戰：南投國中官方行前解析3/投影片11.JPG",
      "1151020-投襅旅行前會/1151020畢旅大作戰：南投國中官方行前解析3/投影片12.JPG",
      "1151020-投襅旅行前會/1151020畢旅大作戰：南投國中官方行前解析3/投影片13.JPG",
      "1151020-投襅旅行前會/1151020畢旅大作戰：南投國中官方行前解析3/投影片14.JPG",
      "1151020-投襅旅行前會/1151020畢旅大作戰：南投國中官方行前解析3/投影片15.JPG",
      "1151020-投襅旅行前會/1151020畢旅大作戰：南投國中官方行前解析3/投影片16.JPG",
      "1151020-投襅旅行前會/1151020畢旅大作戰：南投國中官方行前解析3/投影片17.JPG",
      "1151020-投襅旅行前會/1151020畢旅大作戰：南投國中官方行前解析3/投影片18.JPG",
      "1151020-投襅旅行前會/1151020畢旅大作戰：南投國中官方行前解析3/投影片19.JPG",
      "1151020-投襅旅行前會/1151020畢旅大作戰：南投國中官方行前解析3/投影片20.JPG",
      "1151020-投襅旅行前會/1151020畢旅大作戰：南投國中官方行前解析3/投影片21.JPG"
    ],
    "slideCount": 21,
    "infographics": [
      "1151020-投襅旅行前會/1151020畢旅大作戰：南投國中官方行前解析1.png"
    ],
    "infoCount": 1,
    "videos": [
      {
        "name": "1151020畢旅大作戰：南投國中官方行前解析1.mp4",
        "path": "1151020-投襅旅行前會/1151020畢旅大作戰：南投國中官方行前解析1.mp4",
        "size_mb": 42.64
      }
    ],
    "videoCount": 1,
    "highlights": [
      "集合時間：115.10.21 (三) 早上 07:30 於學校中庭集合出發，逾時不候。",
      "政府減塑環保政策：飯店內全面不提供一次性盥洗用品（如牙刷、牙膏、刮鬍刀、浴帽等），同學務必自備完整盥洗包。",
      "隨身行囊要點：健保卡（正本必帶）、個人常備藥品、水壺、雨具、雙肩後背包。",
      "校外生活常規：團體行動不脫隊，夜間飯店準時晚點名查房，嚴禁擅離房間與串門子。"
    ],
    "qa": [
      {
        "q": "如果出發當天忘記帶健保卡正本該怎麼辦？",
        "a": "請於集合時立刻向隨車導師或隨團幹事回報，若就醫需先自費押金，返校後再持卡辦理退費。"
      },
      {
        "q": "飯店內是否有提供吹風機與毛巾？",
        "a": "有的，飯店房間內均備有毛巾、浴巾與壁掛/手持吹風機，不需自行攜帶。"
      }
    ]
  },
  {
    "id": "unit-02",
    "folder": "1151021-08-投中畢旅大客車逃指南",
    "tabName": "大客車安全",
    "title": "單元 02 · 1151021-08 大客車逃生：黃金60秒保命指南",
    "tag": "交通安全",
    "date": "115/10/21 08:00",
    "icon": "bus",
    "description": "行車安全第一課：大客車逃生門位置、車窗擊破器四角敲擊法、滅火器使用要領（拉瞄壓掃）與車內黃金 60 秒疏散指引。",
    "slides": [
      "1151021-08-投中畢旅大客車逃指南/投影片1.JPG",
      "1151021-08-投中畢旅大客車逃指南/投影片2.JPG",
      "1151021-08-投中畢旅大客車逃指南/投影片3.JPG",
      "1151021-08-投中畢旅大客車逃指南/投影片4.JPG",
      "1151021-08-投中畢旅大客車逃指南/投影片5.JPG",
      "1151021-08-投中畢旅大客車逃指南/投影片6.JPG",
      "1151021-08-投中畢旅大客車逃指南/投影片7.JPG",
      "1151021-08-投中畢旅大客車逃指南/投影片8.JPG",
      "1151021-08-投中畢旅大客車逃指南/投影片9.JPG",
      "1151021-08-投中畢旅大客車逃指南/投影片10.JPG",
      "1151021-08-投中畢旅大客車逃指南/投影片11.JPG",
      "1151021-08-投中畢旅大客車逃指南/投影片12.JPG",
      "1151021-08-投中畢旅大客車逃指南/投影片13.JPG",
      "1151021-08-投中畢旅大客車逃指南/投影片14.JPG",
      "1151021-08-投中畢旅大客車逃指南/投影片15.JPG",
      "1151021-08-投中畢旅大客車逃指南/投影片16.JPG",
      "1151021-08-投中畢旅大客車逃指南/投影片17.JPG",
      "1151021-08-投中畢旅大客車逃指南/投影片18.JPG",
      "1151021-08-投中畢旅大客車逃指南/投影片19.JPG",
      "1151021-08-投中畢旅大客車逃指南/投影片20.JPG",
      "1151021-08-投中畢旅大客車逃指南/投影片21.JPG"
    ],
    "slideCount": 21,
    "infographics": [
      "1151021-08-投中畢旅大客車逃指南/1151021-08-投襅旅2.png",
      "1151021-08-投中畢旅大客車逃指南/1151021-08-投襅旅.png"
    ],
    "infoCount": 2,
    "videos": [
      {
        "name": "1151021-08-投中畢旅大客車逃生：黃金60秒保命指南.mp4",
        "path": "1151021-08-投中畢旅大客車逃指南/1151021-08-投中畢旅大客車逃生：黃金60秒保命指南.mp4",
        "size_mb": 7.23
      }
    ],
    "videoCount": 1,
    "highlights": [
      "大客車黃金逃生 60 秒：發生事故時保持冷靜，不搶行李，遵從師長與司機指引快速撤離。",
      "安全逃生四寶：車窗擊破器（至少 3 具）、車用滅火器（前後各 1 具）、安全門（車身左後側）、車頂逃生逃生窗。",
      "車窗擊破器敲擊心法：對準安全玻璃的「四個角落」用力垂直敲擊，敲出裂痕後再向外推開，切勿敲擊玻璃正中央。",
      "行車基本安全守則：上車第一件事立即繫妥安全帶，行駛中嚴禁離座、更換座位或在走道嬉戲。"
    ],
    "qa": [
      {
        "q": "為什麼車窗擊破器必須敲擊玻璃四角而不是中心？",
        "a": "強化安全玻璃中心受力均勻彈性高，四角應力最脆弱，敲擊四角才能迅速碎裂成網狀顆粒以利逃生。"
      }
    ]
  },
  {
    "id": "unit-03",
    "folder": "1151021-09-投中畢旅-月世界",
    "tabName": "田寮月世界",
    "title": "單元 03 · 1151021-09 高雄月世界的泥土為何能「養」羊？",
    "tag": "自然地質",
    "date": "115/10/21 10:00",
    "icon": "mountain",
    "description": "田寮月世界泥岩惡地成因剖析、青灰岩高鹽鹼環境特性、在地植被適應與歷史人文背景深度導覽。",
    "slides": [
      "1151021-09-投中畢旅-月世界/投影片1.JPG",
      "1151021-09-投中畢旅-月世界/投影片2.JPG",
      "1151021-09-投中畢旅-月世界/投影片3.JPG",
      "1151021-09-投中畢旅-月世界/投影片4.JPG",
      "1151021-09-投中畢旅-月世界/投影片5.JPG",
      "1151021-09-投中畢旅-月世界/投影片6.JPG",
      "1151021-09-投中畢旅-月世界/投影片7.JPG",
      "1151021-09-投中畢旅-月世界/投影片8.JPG",
      "1151021-09-投中畢旅-月世界/投影片9.JPG",
      "1151021-09-投中畢旅-月世界/投影片10.JPG",
      "1151021-09-投中畢旅-月世界/投影片11.JPG",
      "1151021-09-投中畢旅-月世界/投影片12.JPG",
      "1151021-09-投中畢旅-月世界/投影片13.JPG",
      "1151021-09-投中畢旅-月世界/投影片14.JPG",
      "1151021-09-投中畢旅-月世界/投影片15.JPG",
      "1151021-09-投中畢旅-月世界/投影片16.JPG",
      "1151021-09-投中畢旅-月世界/投影片17.JPG",
      "1151021-09-投中畢旅-月世界/投影片18.JPG",
      "1151021-09-投中畢旅-月世界/投影片19.JPG",
      "1151021-09-投中畢旅-月世界/投影片20.JPG",
      "1151021-09-投中畢旅-月世界/投影片21.JPG"
    ],
    "slideCount": 21,
    "infographics": [
      "1151021-09-投中畢旅-月世界/1151021-投襅旅B-畢業旅行自然與安全指南.png"
    ],
    "infoCount": 1,
    "videos": [
      {
        "name": "1151021-09-投中畢旅高雄月世界的泥土为何能“养”羊？.mp4",
        "path": "1151021-09-投中畢旅-月世界/1151021-09-投中畢旅高雄月世界的泥土为何能“养”羊？.mp4",
        "size_mb": 8.48
      }
    ],
    "videoCount": 1,
    "highlights": [
      "田寮月世界地質：屬於台灣西南部典型的「惡地地形（Badlands）」，主要由深海泥質沉積形成的「青灰岩」構成。",
      "為何月世界的泥土能「養」羊？月世界土壤高鹽鹼、貧瘠，一般農作物無法生長，早期居民利用耐旱的刺竹與灌木飼養台灣黑山羊，造就知名的田寮羊肉文化。",
      "地質特性：雨水沖刷極易軟化流失，形成宛如月球表面的荒涼鋸齒狀山脊與深溝蝕溝。",
      "參訪指引：請沿步道階梯前進，嚴禁攀爬泥岩邊坡，防止地表崩塌危險。"
    ],
    "qa": [
      {
        "q": "月世界青灰岩土壤為什麼寸草難生？",
        "a": "因為含鹽量極高且顆粒極細，遇水迅速軟化泥濘，天晴則迅速脫水乾裂結成硬塊，水分無法涵養。"
      }
    ]
  },
  {
    "id": "unit-04",
    "folder": "1151021-13-投襅旅墾丁畢旅終極生存指南",
    "tabName": "墾丁生存指南",
    "title": "單元 04 · 1151021-13 墾丁畢旅終極生存指南：地景與生態",
    "tag": "生態探索",
    "date": "115/10/21 13:30",
    "icon": "compass",
    "description": "解密國立海洋生物博物館三大展館、恆春半島落山風與珊瑚礁裙礁地形，以及南台灣防曬抗熱終極裝備心法。",
    "slides": [
      "1151021-13-投襅旅墾丁畢旅終極生存指南/投影片1.JPG",
      "1151021-13-投襅旅墾丁畢旅終極生存指南/投影片2.JPG",
      "1151021-13-投襅旅墾丁畢旅終極生存指南/投影片3.JPG",
      "1151021-13-投襅旅墾丁畢旅終極生存指南/投影片4.JPG",
      "1151021-13-投襅旅墾丁畢旅終極生存指南/投影片5.JPG",
      "1151021-13-投襅旅墾丁畢旅終極生存指南/投影片6.JPG",
      "1151021-13-投襅旅墾丁畢旅終極生存指南/投影片7.JPG",
      "1151021-13-投襅旅墾丁畢旅終極生存指南/投影片8.JPG",
      "1151021-13-投襅旅墾丁畢旅終極生存指南/投影片9.JPG",
      "1151021-13-投襅旅墾丁畢旅終極生存指南/投影片10.JPG",
      "1151021-13-投襅旅墾丁畢旅終極生存指南/投影片11.JPG",
      "1151021-13-投襅旅墾丁畢旅終極生存指南/投影片12.JPG",
      "1151021-13-投襅旅墾丁畢旅終極生存指南/投影片13.JPG",
      "1151021-13-投襅旅墾丁畢旅終極生存指南/投影片14.JPG",
      "1151021-13-投襅旅墾丁畢旅終極生存指南/投影片15.JPG",
      "1151021-13-投襅旅墾丁畢旅終極生存指南/投影片16.JPG",
      "1151021-13-投襅旅墾丁畢旅終極生存指南/投影片17.JPG",
      "1151021-13-投襅旅墾丁畢旅終極生存指南/投影片18.JPG",
      "1151021-13-投襅旅墾丁畢旅終極生存指南/投影片19.JPG",
      "1151021-13-投襅旅墾丁畢旅終極生存指南/投影片20.JPG",
      "1151021-13-投襅旅墾丁畢旅終極生存指南/投影片21.JPG"
    ],
    "slideCount": 21,
    "infographics": [
      "1151021-13-投襅旅墾丁畢旅終極生存指南/1151021-投襅旅C-墾丁畢旅安全指南1.png"
    ],
    "infoCount": 1,
    "videos": [
      {
        "name": "1151021-16-投中畢旅揭開墾丁奇特地景與生態的隱藏秘密.mp4",
        "path": "1151021-13-投襅旅墾丁畢旅終極生存指南/1151021-16-投中畢旅揭開墾丁奇特地景與生態的隱藏秘密.mp4",
        "size_mb": 11.85
      }
    ],
    "videoCount": 1,
    "highlights": [
      "國立海洋生物博物館核心亮點：台灣水域館（高山溪流到外海）、珊瑚王國館（84米海底隧道）、世界水域館（古代海洋與企鵝）。",
      "南台灣防曬抗熱終極裝備：防曬乳（請選擇海洋友善配方）、遮陽帽、太陽眼鏡與大容量水壺（定時補充水分防中暑）。",
      "海洋生態保育觀念：參觀時嚴禁拍打展示玻璃，拍照時請務必「關閉相機閃光燈」，避免驚嚇深海魚類與企鵝。",
      "探索任務：配合手冊後方 25 題海生館闖關學習單，進行實地觀察探索解答。"
    ],
    "qa": [
      {
        "q": "為什麼在海生館拍照嚴禁使用閃光燈？",
        "a": "許多海洋生物（如白鯨、企鵝與深海魚類）視網膜極度敏感，強烈閃光會造成其視網膜受損甚至失明致死。"
      }
    ]
  },
  {
    "id": "unit-05",
    "folder": "1151021-16-投襅旅-墾丁畢旅探索日誌",
    "tabName": "墾丁探索日誌",
    "title": "單元 05 · 1151021-16 墾丁畢旅探索日誌：貓鼻頭與大街夜巡",
    "tag": "海洋與文化",
    "date": "115/10/21 16:20",
    "icon": "water",
    "description": "貓鼻頭崩崖海蝕地形觀察、巴士海峽與台灣海峽界標、墾丁大街夜間巡禮消費避坑與隊伍集結要點。",
    "slides": [
      "1151021-16-投襅旅-墾丁畢旅探索日誌/投影片1.JPG",
      "1151021-16-投襅旅-墾丁畢旅探索日誌/投影片2.JPG",
      "1151021-16-投襅旅-墾丁畢旅探索日誌/投影片3.JPG",
      "1151021-16-投襅旅-墾丁畢旅探索日誌/投影片4.JPG",
      "1151021-16-投襅旅-墾丁畢旅探索日誌/投影片5.JPG",
      "1151021-16-投襅旅-墾丁畢旅探索日誌/投影片6.JPG",
      "1151021-16-投襅旅-墾丁畢旅探索日誌/投影片7.JPG",
      "1151021-16-投襅旅-墾丁畢旅探索日誌/投影片8.JPG",
      "1151021-16-投襅旅-墾丁畢旅探索日誌/投影片9.JPG",
      "1151021-16-投襅旅-墾丁畢旅探索日誌/投影片10.JPG",
      "1151021-16-投襅旅-墾丁畢旅探索日誌/投影片11.JPG",
      "1151021-16-投襅旅-墾丁畢旅探索日誌/投影片12.JPG",
      "1151021-16-投襅旅-墾丁畢旅探索日誌/投影片13.JPG",
      "1151021-16-投襅旅-墾丁畢旅探索日誌/投影片14.JPG",
      "1151021-16-投襅旅-墾丁畢旅探索日誌/投影片15.JPG",
      "1151021-16-投襅旅-墾丁畢旅探索日誌/投影片16.JPG",
      "1151021-16-投襅旅-墾丁畢旅探索日誌/投影片17.JPG",
      "1151021-16-投襅旅-墾丁畢旅探索日誌/投影片18.JPG",
      "1151021-16-投襅旅-墾丁畢旅探索日誌/投影片19.JPG",
      "1151021-16-投襅旅-墾丁畢旅探索日誌/投影片20.JPG",
      "1151021-16-投襅旅-墾丁畢旅探索日誌/投影片21.JPG"
    ],
    "slideCount": 21,
    "infographics": [
      "1151021-16-投襅旅-墾丁畢旅探索日誌/1151021-投襅旅D-墾丁畢旅探索指南.png"
    ],
    "infoCount": 1,
    "videos": [
      {
        "name": "1151021-16-投中畢旅揭開墾丁奇特地景與生態的隱藏秘密.mp4",
        "path": "1151021-16-投襅旅-墾丁畢旅探索日誌/1151021-16-投中畢旅揭開墾丁奇特地景與生態的隱藏秘密.mp4",
        "size_mb": 11.85
      },
      {
        "name": "1151021-16-終極高中畢業旅行完全解析.mp4",
        "path": "1151021-16-投襅旅-墾丁畢旅探索日誌/1151021-16-終極高中畢業旅行完全解析.mp4",
        "size_mb": 35.71
      }
    ],
    "videoCount": 2,
    "highlights": [
      "貓鼻頭風景區地質特徵：為恆春半島向南延伸突出的海岬，與鵝鑾鼻遙遙相對，形成台灣海峽與巴士海峽的界標。",
      "地形景觀：典型隆起珊瑚礁裙礁海岸，經過強烈波浪海蝕、海蝕平台、豆腐岩、壺穴與崩崖景觀豐富。",
      "墾丁大街夜間巡禮：晚間由師長引導定時定點集合，遵守行人靠邊走，勿向無標價攤販衝動消費，結伴同行不落單。",
      "守時觀念：集合時間前 5 分鐘抵達指定集結點，隨時注意班級隊伍動態。"
    ],
    "qa": [
      {
        "q": "貓鼻頭名稱的由來為何？",
        "a": "因海崖邊有一塊自崩崖滾落下的巨大珊瑚礁岩，其外型酷似一隻蹲伏在海面的貓而得名。"
      }
    ]
  },
  {
    "id": "unit-06",
    "folder": "1151021-18-投中畢旅E-墾丁度假入住與安全指南3",
    "tabName": "墾丁福華入住",
    "title": "單元 06 · 1151021-18 墾丁福華渡假大飯店入住與安全指南",
    "tag": "住宿公約",
    "date": "115/10/21 19:20",
    "icon": "hotel",
    "description": "第一晚入住墾丁福華大飯店公約：房卡保管、水電消防避難動線、晚點名程序、嚴禁擅自夜間外出與水域安全規定。",
    "slides": [
      "1151021-18-投中畢旅E-墾丁度假入住與安全指南3/投影片1.JPG",
      "1151021-18-投中畢旅E-墾丁度假入住與安全指南3/投影片2.JPG",
      "1151021-18-投中畢旅E-墾丁度假入住與安全指南3/投影片3.JPG",
      "1151021-18-投中畢旅E-墾丁度假入住與安全指南3/投影片4.JPG",
      "1151021-18-投中畢旅E-墾丁度假入住與安全指南3/投影片5.JPG",
      "1151021-18-投中畢旅E-墾丁度假入住與安全指南3/投影片6.JPG",
      "1151021-18-投中畢旅E-墾丁度假入住與安全指南3/投影片7.JPG",
      "1151021-18-投中畢旅E-墾丁度假入住與安全指南3/投影片8.JPG",
      "1151021-18-投中畢旅E-墾丁度假入住與安全指南3/投影片9.JPG",
      "1151021-18-投中畢旅E-墾丁度假入住與安全指南3/投影片10.JPG",
      "1151021-18-投中畢旅E-墾丁度假入住與安全指南3/投影片11.JPG",
      "1151021-18-投中畢旅E-墾丁度假入住與安全指南3/投影片12.JPG",
      "1151021-18-投中畢旅E-墾丁度假入住與安全指南3/投影片13.JPG",
      "1151021-18-投中畢旅E-墾丁度假入住與安全指南3/投影片14.JPG",
      "1151021-18-投中畢旅E-墾丁度假入住與安全指南3/投影片15.JPG",
      "1151021-18-投中畢旅E-墾丁度假入住與安全指南3/投影片16.JPG",
      "1151021-18-投中畢旅E-墾丁度假入住與安全指南3/投影片17.JPG",
      "1151021-18-投中畢旅E-墾丁度假入住與安全指南3/投影片18.JPG",
      "1151021-18-投中畢旅E-墾丁度假入住與安全指南3/投影片19.JPG",
      "1151021-18-投中畢旅E-墾丁度假入住與安全指南3/投影片20.JPG",
      "1151021-18-投中畢旅E-墾丁度假入住與安全指南3/投影片21.JPG"
    ],
    "slideCount": 21,
    "infographics": [
      "1151021-18-投中畢旅E-墾丁度假入住與安全指南3/1151021-投中畢旅E-墾丁度假入住與安全指南2.png"
    ],
    "infoCount": 1,
    "videos": [
      {
        "name": "1151021-18終極高中畢業旅行完全解析.mp4",
        "path": "1151021-18-投中畢旅E-墾丁度假入住與安全指南3/1151021-18終極高中畢業旅行完全解析.mp4",
        "size_mb": 35.71
      }
    ],
    "videoCount": 1,
    "highlights": [
      "墾丁福華渡假大飯店入住公約：分發房卡後以房為單位進房，確認門鎖、衛浴設備正常，有故障立即向隨車導師反映。",
      "房門安全：進房隨時扣上防盜扣與關妥房門，嚴禁同學在走廊喧鬧奔跑或穿著睡衣拖鞋隨意遊蕩。",
      "水域安全第一原則：嚴禁任何同學夜間私自前往飯店戶外泳池或擅自翻越圍籬跑到海灘戲水，違者記大過處分。",
      "晚點名查房流程：晚間 21:30 準時留在各自分配房間，導師與主任逐間點名，點名後關燈就寢蓄積體力。"
    ],
    "qa": [
      {
        "q": "房卡不小心鎖在房間內怎麼辦？",
        "a": "請至各樓層師長巡查站向隨隊導師報告，由導師陪同至大廳櫃檯補辦房卡，切勿嘗試攀爬陽台！"
      }
    ]
  },
  {
    "id": "unit-07",
    "folder": "1151021-21-投襅旅-檢討會",
    "tabName": "第一天檢討",
    "title": "單元 07 · 1151021-21 畢旅第一天檢討會：明日行程與注意事項",
    "tag": "團務檢討",
    "date": "115/10/21 21:30",
    "icon": "comments",
    "description": "首日行程回顧與各班狀況檢討；第二天沙灘趣味競賽、前往義大世界動線規劃、體力調配與早晨集合出發重點。",
    "slides": [
      "1151021-21-投襅旅-檢討會/投影片1.JPG",
      "1151021-21-投襅旅-檢討會/投影片2.JPG",
      "1151021-21-投襅旅-檢討會/投影片3.JPG",
      "1151021-21-投襅旅-檢討會/投影片4.JPG",
      "1151021-21-投襅旅-檢討會/投影片5.JPG",
      "1151021-21-投襅旅-檢討會/投影片6.JPG",
      "1151021-21-投襅旅-檢討會/投影片7.JPG",
      "1151021-21-投襅旅-檢討會/投影片8.JPG",
      "1151021-21-投襅旅-檢討會/投影片9.JPG",
      "1151021-21-投襅旅-檢討會/投影片10.JPG",
      "1151021-21-投襅旅-檢討會/投影片11.JPG",
      "1151021-21-投襅旅-檢討會/投影片12.JPG",
      "1151021-21-投襅旅-檢討會/投影片13.JPG",
      "1151021-21-投襅旅-檢討會/投影片14.JPG",
      "1151021-21-投襅旅-檢討會/投影片15.JPG",
      "1151021-21-投襅旅-檢討會/投影片16.JPG",
      "1151021-21-投襅旅-檢討會/投影片17.JPG",
      "1151021-21-投襅旅-檢討會/投影片18.JPG",
      "1151021-21-投襅旅-檢討會/投影片19.JPG",
      "1151021-21-投襅旅-檢討會/投影片20.JPG",
      "1151021-21-投襅旅-檢討會/投影片21.JPG"
    ],
    "slideCount": 21,
    "infographics": [
      "1151021-21-投襅旅-檢討會/1151021-投襅旅G-第二天行程與注意事項.png"
    ],
    "infoCount": 1,
    "videos": [
      {
        "name": "1151021-21-墾丁大街生存指南.mp4",
        "path": "1151021-21-投襅旅-檢討會/1151021-21-墾丁大街生存指南.mp4",
        "size_mb": 62.32
      }
    ],
    "videoCount": 1,
    "highlights": [
      "首日檢討反饋：各班行程銜接準時度高，唯部分車次上下車清點速度需再加速 3 分鐘。",
      "第二天體力調配：第二天包含沙灘趣味競賽與義大世界整日活動，步數預計超過 18,000 步，早晨務必享用豐盛早餐。",
      "行李打包與退房：第二天晨喚後整理個人行李箱，7:40 前統一推至飯店大廳指定班級集中區上車。",
      "票券發放注意：午餐發放義大樂園 100 元餐券，妥善保管若遺失恕不補發。"
    ],
    "qa": [
      {
        "q": "飯店早餐用餐時有何注意事項？",
        "a": "請攜帶餐券，穿著整齊校服/班服，遵行取餐禮儀，吃多少拿多少，嚴禁浪費食材。"
      }
    ]
  },
  {
    "id": "unit-08",
    "folder": "1151022-09-畢旅超強攻略",
    "tabName": "惡地深層揭秘",
    "title": "單元 08 · 1151022-09 月世界深層揭秘：為何這裡又鹹又乾？",
    "tag": "地質科研",
    "date": "115/10/22 08:30",
    "icon": "flask",
    "description": "台灣惡地地質成因再深化：古代深海沉積泥質、造山運動擠壓、泥火山噴發與地質環境如何形塑南部地理面貌。",
    "slides": [
      "1151022-09-畢旅超強攻略/投影片1.JPG",
      "1151022-09-畢旅超強攻略/投影片2.JPG",
      "1151022-09-畢旅超強攻略/投影片3.JPG",
      "1151022-09-畢旅超強攻略/投影片4.JPG",
      "1151022-09-畢旅超強攻略/投影片5.JPG",
      "1151022-09-畢旅超強攻略/投影片6.JPG",
      "1151022-09-畢旅超強攻略/投影片7.JPG",
      "1151022-09-畢旅超強攻略/投影片8.JPG",
      "1151022-09-畢旅超強攻略/投影片9.JPG",
      "1151022-09-畢旅超強攻略/投影片10.JPG",
      "1151022-09-畢旅超強攻略/投影片11.JPG",
      "1151022-09-畢旅超強攻略/投影片12.JPG",
      "1151022-09-畢旅超強攻略/投影片13.JPG",
      "1151022-09-畢旅超強攻略/投影片14.JPG",
      "1151022-09-畢旅超強攻略/投影片15.JPG",
      "1151022-09-畢旅超強攻略/投影片16.JPG",
      "1151022-09-畢旅超強攻略/投影片17.JPG",
      "1151022-09-畢旅超強攻略/投影片18.JPG",
      "1151022-09-畢旅超強攻略/投影片19.JPG",
      "1151022-09-畢旅超強攻略/投影片20.JPG",
      "1151022-09-畢旅超強攻略/投影片21.JPG"
    ],
    "slideCount": 21,
    "infographics": [
      "1151022-09-畢旅超強攻略/1151022-09-投中畢旅畢旅隨行與安全指南1.png",
      "1151022-09-畢旅超強攻略/1151022-09-投中畢旅畢旅隨行與安全指南.png"
    ],
    "infoCount": 2,
    "videos": [
      {
        "name": "1151022-09-投中畢旅揭秘月世界：为何这里又咸又干？.mp4",
        "path": "1151022-09-畢旅超強攻略/1151022-09-投中畢旅揭秘月世界：为何这里又咸又干？.mp4",
        "size_mb": 8.27
      }
    ],
    "videoCount": 1,
    "highlights": [
      "惡地深層科研：為什麼月世界又鹹又乾？數百萬年前深海沉積的泥岩中含有大量結晶鹽，隨著板塊擠壓抬升露出地表。",
      "泥火山與天然氣：月世界周邊地下蘊藏天然氣與地下水，混合泥漿受高壓沿斷層噴出，形成滾水滾泥的泥火山。",
      "物理風化作用：泥岩質地軟弱，乾季時表面受日曬龜裂，雨季時吸水迅速膨脹軟化順坡滑落，造成植被根系完全無法固著。",
      "生態演替反思：即使在如此極端條件下，耐鹽旱生灌木與鳥類依然找到棲息模式，展現大自然強大韌性。"
    ],
    "qa": [
      {
        "q": "台灣除了高雄田寮外，還有哪裡有著名惡地景觀？",
        "a": "台南左鎮、草山月世界，以及台東卑南的利吉惡地（利吉混同層）。"
      }
    ]
  },
  {
    "id": "unit-09",
    "folder": "1151022-10-投中畢旅墾丁畢旅生存指南best",
    "tabName": "百人團餐篩選",
    "title": "單元 09 · 1151022-10 揭秘百人旅行團的餐廳篩選漏斗",
    "tag": "飲食安全",
    "date": "115/10/22 10:00",
    "icon": "utensils",
    "description": "大型學校團體餐飲安全幕後流程：衛福部食品安全認證、產銷履歷、出餐速度動線規劃、餐桌禮儀與廚餘減量。",
    "slides": [
      "1151022-10-投中畢旅墾丁畢旅生存指南best/投影片1.JPG",
      "1151022-10-投中畢旅墾丁畢旅生存指南best/投影片2.JPG",
      "1151022-10-投中畢旅墾丁畢旅生存指南best/投影片3.JPG",
      "1151022-10-投中畢旅墾丁畢旅生存指南best/投影片4.JPG",
      "1151022-10-投中畢旅墾丁畢旅生存指南best/投影片5.JPG",
      "1151022-10-投中畢旅墾丁畢旅生存指南best/投影片6.JPG",
      "1151022-10-投中畢旅墾丁畢旅生存指南best/投影片7.JPG",
      "1151022-10-投中畢旅墾丁畢旅生存指南best/投影片8.JPG",
      "1151022-10-投中畢旅墾丁畢旅生存指南best/投影片9.JPG",
      "1151022-10-投中畢旅墾丁畢旅生存指南best/投影片10.JPG",
      "1151022-10-投中畢旅墾丁畢旅生存指南best/投影片11.JPG",
      "1151022-10-投中畢旅墾丁畢旅生存指南best/投影片12.JPG",
      "1151022-10-投中畢旅墾丁畢旅生存指南best/投影片13.JPG",
      "1151022-10-投中畢旅墾丁畢旅生存指南best/投影片14.JPG",
      "1151022-10-投中畢旅墾丁畢旅生存指南best/投影片15.JPG",
      "1151022-10-投中畢旅墾丁畢旅生存指南best/投影片16.JPG",
      "1151022-10-投中畢旅墾丁畢旅生存指南best/投影片17.JPG",
      "1151022-10-投中畢旅墾丁畢旅生存指南best/投影片18.JPG",
      "1151022-10-投中畢旅墾丁畢旅生存指南best/投影片19.JPG",
      "1151022-10-投中畢旅墾丁畢旅生存指南best/投影片20.JPG",
      "1151022-10-投中畢旅墾丁畢旅生存指南best/投影片21.JPG"
    ],
    "slideCount": 21,
    "infographics": [
      "1151022-10-投中畢旅墾丁畢旅生存指南best/1151022-10-投中畢旅2.png",
      "1151022-10-投中畢旅墾丁畢旅生存指南best/1151022-10-投中畢旅3.png",
      "1151022-10-投中畢旅墾丁畢旅生存指南best/1151022-10-投中畢旅.png"
    ],
    "infoCount": 3,
    "videos": [
      {
        "name": "1151022-10-投中畢旅揭秘百人旅行团的餐厅筛选漏斗.mp4",
        "path": "1151022-10-投中畢旅墾丁畢旅生存指南best/1151022-10-投中畢旅揭秘百人旅行团的餐厅筛选漏斗.mp4",
        "size_mb": 5.46
      }
    ],
    "videoCount": 1,
    "highlights": [
      "百人學校團體用餐篩選漏斗：衛生局 HACCP 評鑑優良、能容納百人同時進餐、具備大型遊覽車專屬動線與洗手間承載量。",
      "餐飲安全底線：食材溯源標籤、中央廚房衛生監控、所有隨團師長先行試菜確認衛生與熟度。",
      "餐桌禮儀四不原則：不大聲喧鬧、不以筷子敲碗、不挑食浪費、不將骨頭廚餘直接吐在桌面上。",
      "素食同學特別照料：素食同學依指定素食桌入席，確保菜餚獨立無葷素交叉污染。"
    ],
    "qa": [
      {
        "q": "團餐如果遇到海鮮有過敏疑慮該如何處理？",
        "a": "行前調查已備註過敏史同學，用餐時請再次向同桌師長及領隊確認替換安全替代菜色。"
      }
    ]
  },
  {
    "id": "unit-10",
    "folder": "1151022-11-投中畢旅-義大世界畢旅最強攻略3best",
    "tabName": "義大最強攻略",
    "title": "單元 10 · 1151022-11 義大遊樂世界最強全攻略：隱藏路線與設施",
    "tag": "樂園玩樂",
    "date": "115/10/22 11:30",
    "icon": "gamepad",
    "description": "義大三大園區（衛城、聖托里尼山城、特洛伊城堡）高效排隊秘訣、天旋地轉/極限挑戰攻略與拍照打卡最佳機位。",
    "slides": [
      "1151022-11-投中畢旅-義大世界畢旅最強攻略3best/投影片1.JPG",
      "1151022-11-投中畢旅-義大世界畢旅最強攻略3best/投影片2.JPG",
      "1151022-11-投中畢旅-義大世界畢旅最強攻略3best/投影片3.JPG",
      "1151022-11-投中畢旅-義大世界畢旅最強攻略3best/投影片4.JPG",
      "1151022-11-投中畢旅-義大世界畢旅最強攻略3best/投影片5.JPG",
      "1151022-11-投中畢旅-義大世界畢旅最強攻略3best/投影片6.JPG",
      "1151022-11-投中畢旅-義大世界畢旅最強攻略3best/投影片7.JPG",
      "1151022-11-投中畢旅-義大世界畢旅最強攻略3best/投影片8.JPG",
      "1151022-11-投中畢旅-義大世界畢旅最強攻略3best/投影片9.JPG",
      "1151022-11-投中畢旅-義大世界畢旅最強攻略3best/投影片10.JPG",
      "1151022-11-投中畢旅-義大世界畢旅最強攻略3best/投影片11.JPG",
      "1151022-11-投中畢旅-義大世界畢旅最強攻略3best/投影片12.JPG",
      "1151022-11-投中畢旅-義大世界畢旅最強攻略3best/投影片13.JPG",
      "1151022-11-投中畢旅-義大世界畢旅最強攻略3best/投影片14.JPG",
      "1151022-11-投中畢旅-義大世界畢旅最強攻略3best/投影片15.JPG",
      "1151022-11-投中畢旅-義大世界畢旅最強攻略3best/投影片16.JPG",
      "1151022-11-投中畢旅-義大世界畢旅最強攻略3best/投影片17.JPG",
      "1151022-11-投中畢旅-義大世界畢旅最強攻略3best/投影片18.JPG",
      "1151022-11-投中畢旅-義大世界畢旅最強攻略3best/投影片19.JPG",
      "1151022-11-投中畢旅-義大世界畢旅最強攻略3best/投影片20.JPG",
      "1151022-11-投中畢旅-義大世界畢旅最強攻略3best/投影片21.JPG"
    ],
    "slideCount": 21,
    "infographics": [
      "1151022-11-投中畢旅-義大世界畢旅最強攻略3best/1151022-11-投中畢旅-義大世界畢旅最強攻略1.png",
      "1151022-11-投中畢旅-義大世界畢旅最強攻略3best/1151022-11-投中畢旅-義大世界畢旅最強攻略2.png",
      "1151022-11-投中畢旅-義大世界畢旅最強攻略3best/1151022-11-投中畢旅-義大世界畢旅最強攻略3.png"
    ],
    "infoCount": 3,
    "videos": [
      {
        "name": "1151022-111-投中畢旅揭秘义大世界的隐藏路线.mp4",
        "path": "1151022-11-投中畢旅-義大世界畢旅最強攻略3best/1151022-111-投中畢旅揭秘义大世界的隐藏路线.mp4",
        "size_mb": 8.33
      }
    ],
    "videoCount": 1,
    "highlights": [
      "義大遊樂世界三大主題區：衛城（古希臘風神殿、天旋地轉）、聖托里尼山城（藍白愛琴海、極限挑戰）、特洛伊城堡（全台最大室內親子樂園）。",
      "排隊戰略效率極致化：入園先搭乘高空輕軌列車直達最深處「特洛伊城堡」，由內向外順玩避開大門口尖峰人潮。",
      "心臟防護安全提醒：極限挑戰、天旋地轉等設施 G 力強大，患有心臟病、高血壓或剛吃飽同學嚴禁搭乘。",
      "室內雨天/避暑備案：特洛伊城堡室內多達 5 層遊樂設施（旋轉木馬、地心歷險、飛越台灣 VR），涼爽且全天候運作。"
    ],
    "qa": [
      {
        "q": "園區內若與同學走散怎麼辦？",
        "a": "立即前往衛城大門遊客服務中心或特洛伊城堡 1F 服務台廣播，並透過手機撥打手冊緊急連絡電話向隨車導師求助。"
      }
    ]
  },
  {
    "id": "unit-11",
    "folder": "1151022-16-畢旅防颱應變懶人包義大畢旅生存指南",
    "tabName": "義大總體規劃",
    "title": "單元 11 · 1151022-16 義大世界畢旅混亂背後的完美總體規劃",
    "tag": "園區統籌",
    "date": "115/10/22 16:00",
    "icon": "map",
    "description": "樂園人流管制與安全應變手冊、夜間購物中心集結、高空摩天輪安全搭乘指引與天悅飯店入住查房準備。",
    "slides": [
      "1151022-16-畢旅防颱應變懶人包義大畢旅生存指南/投影片1.JPG",
      "1151022-16-畢旅防颱應變懶人包義大畢旅生存指南/投影片2.JPG",
      "1151022-16-畢旅防颱應變懶人包義大畢旅生存指南/投影片3.JPG",
      "1151022-16-畢旅防颱應變懶人包義大畢旅生存指南/投影片4.JPG",
      "1151022-16-畢旅防颱應變懶人包義大畢旅生存指南/投影片5.JPG",
      "1151022-16-畢旅防颱應變懶人包義大畢旅生存指南/投影片6.JPG",
      "1151022-16-畢旅防颱應變懶人包義大畢旅生存指南/投影片7.JPG",
      "1151022-16-畢旅防颱應變懶人包義大畢旅生存指南/投影片8.JPG",
      "1151022-16-畢旅防颱應變懶人包義大畢旅生存指南/投影片9.JPG",
      "1151022-16-畢旅防颱應變懶人包義大畢旅生存指南/投影片10.JPG",
      "1151022-16-畢旅防颱應變懶人包義大畢旅生存指南/投影片11.JPG",
      "1151022-16-畢旅防颱應變懶人包義大畢旅生存指南/投影片12.JPG",
      "1151022-16-畢旅防颱應變懶人包義大畢旅生存指南/投影片13.JPG",
      "1151022-16-畢旅防颱應變懶人包義大畢旅生存指南/投影片14.JPG",
      "1151022-16-畢旅防颱應變懶人包義大畢旅生存指南/投影片15.JPG",
      "1151022-16-畢旅防颱應變懶人包義大畢旅生存指南/投影片16.JPG",
      "1151022-16-畢旅防颱應變懶人包義大畢旅生存指南/投影片17.JPG",
      "1151022-16-畢旅防颱應變懶人包義大畢旅生存指南/投影片18.JPG",
      "1151022-16-畢旅防颱應變懶人包義大畢旅生存指南/投影片19.JPG",
      "1151022-16-畢旅防颱應變懶人包義大畢旅生存指南/投影片20.JPG",
      "1151022-16-畢旅防颱應變懶人包義大畢旅生存指南/投影片21.JPG"
    ],
    "slideCount": 21,
    "infographics": [
      "1151022-16-畢旅防颱應變懶人包義大畢旅生存指南/1151022-16-投中畢旅畢業旅行與晚間行程指南2.png",
      "1151022-16-畢旅防颱應變懶人包義大畢旅生存指南/1151022-16-投中畢旅畢業旅行與晚間行程指南3.png",
      "1151022-16-畢旅防颱應變懶人包義大畢旅生存指南/1151022-16-投中畢旅畢業旅行與晚間行程指南.png"
    ],
    "infoCount": 3,
    "videos": [
      {
        "name": "1151022-16-投中畢旅義大世界：畢旅混亂背後的完美總體規劃.mp4",
        "path": "1151022-16-畢旅防颱應變懶人包義大畢旅生存指南/1151022-16-投中畢旅義大世界：畢旅混亂背後的完美總體規劃.mp4",
        "size_mb": 42.11
      }
    ],
    "videoCount": 1,
    "highlights": [
      "義大世界混亂背後的完美規劃：結合樂園、購物廣場（Outlet Mall）與天悅飯店，動線縱深長達 1.5 公里，精密掌握集結節奏。",
      "夜間摩天輪搭乘指南：全台最高海拔摩天輪，冷氣車廂俯瞰高屏夜景，每車廂限乘 6~8 人，晃動時切勿激烈推擠。",
      "購物商場自主管理：晚餐於美食街自理，發揚理財消費觀念，不買貴重奢侈品，看顧好錢包與隨身物品。",
      "夜宿義大天悅飯店：義大天悅為四星級商務渡假飯店，進房後落實安靜不擾民，為第三天充沛體力充電。"
    ],
    "qa": [
      {
        "q": "搭乘摩天輪時若突然停頓該如何反應？",
        "a": "摩天輪為輪椅或行動不便乘客進出時會短暫低速暫停，屬於正常運作機制，請安心就座切勿驚慌站立。"
      }
    ]
  },
  {
    "id": "unit-12",
    "folder": "1151022-18-畢旅颱風天賢急會議",
    "tabName": "防颱緊急應變",
    "title": "單元 12 · 1151022-18 防颱應變懶人包：危機處理與行政統籌",
    "tag": "應變機制",
    "date": "115/10/22 18:00",
    "icon": "shield-alt",
    "description": "校外教學颱風/豪雨天候突發應變機制、師生安全第一原則、室內備案行程啟動演練與校方行政協調硬實力剖析（含4部專題影音）。",
    "slides": [
      "1151022-18-畢旅颱風天賢急會議/1151022-18畢旅防颱應變指南 1/投影片1.JPG",
      "1151022-18-畢旅颱風天賢急會議/1151022-18畢旅防颱應變指南 1/投影片2.JPG",
      "1151022-18-畢旅颱風天賢急會議/1151022-18畢旅防颱應變指南 1/投影片3.JPG",
      "1151022-18-畢旅颱風天賢急會議/1151022-18畢旅防颱應變指南 1/投影片4.JPG",
      "1151022-18-畢旅颱風天賢急會議/1151022-18畢旅防颱應變指南 1/投影片5.JPG",
      "1151022-18-畢旅颱風天賢急會議/1151022-18畢旅防颱應變指南 1/投影片6.JPG",
      "1151022-18-畢旅颱風天賢急會議/1151022-18畢旅防颱應變指南 1/投影片7.JPG",
      "1151022-18-畢旅颱風天賢急會議/1151022-18畢旅防颱應變指南 1/投影片8.JPG",
      "1151022-18-畢旅颱風天賢急會議/1151022-18畢旅防颱應變指南 1/投影片9.JPG",
      "1151022-18-畢旅颱風天賢急會議/1151022-18畢旅防颱應變指南 1/投影片10.JPG",
      "1151022-18-畢旅颱風天賢急會議/1151022-18畢旅防颱應變指南 1/投影片11.JPG",
      "1151022-18-畢旅颱風天賢急會議/1151022-18畢旅防颱應變指南 1/投影片12.JPG",
      "1151022-18-畢旅颱風天賢急會議/1151022-18畢旅防颱應變指南 1/投影片13.JPG",
      "1151022-18-畢旅颱風天賢急會議/1151022-18畢旅防颱應變指南 1/投影片14.JPG",
      "1151022-18-畢旅颱風天賢急會議/1151022-18畢旅防颱應變指南 1/投影片15.JPG",
      "1151022-18-畢旅颱風天賢急會議/1151022-18畢旅防颱應變指南 1/投影片16.JPG",
      "1151022-18-畢旅颱風天賢急會議/1151022-18畢旅防颱應變指南 1/投影片17.JPG",
      "1151022-18-畢旅颱風天賢急會議/1151022-18畢旅防颱應變指南 1/投影片18.JPG",
      "1151022-18-畢旅颱風天賢急會議/1151022-18畢旅防颱應變指南 1/投影片19.JPG",
      "1151022-18-畢旅颱風天賢急會議/1151022-18畢旅防颱應變指南 1/投影片20.JPG",
      "1151022-18-畢旅颱風天賢急會議/1151022-18畢旅防颱應變指南 1/投影片21.JPG"
    ],
    "slideCount": 21,
    "infographics": [
      "1151022-18-畢旅颱風天賢急會議/1151022-18-21畢旅防颱應變懶人包.png",
      "1151022-18-畢旅颱風天賢急會議/1151022-21-投中畢旅畢業旅行颱風應變總覽1.png",
      "1151022-18-畢旅颱風天賢急會議/1151022-21-投中畢旅畢業旅行颱風應變總覽2.png"
    ],
    "infoCount": 3,
    "videos": [
      {
        "name": "1151022-18-投中畢旅當颱風撞上學校畢旅.mp4",
        "path": "1151022-18-畢旅颱風天賢急會議/1151022-18-投中畢旅當颱風撞上學校畢旅.mp4",
        "size_mb": 9.11
      },
      {
        "name": "1151022-18-投中畢旅看不見的危機處理手冊.mp4",
        "path": "1151022-18-畢旅颱風天賢急會議/1151022-18-投中畢旅看不見的危機處理手冊.mp4",
        "size_mb": 30.23
      },
      {
        "name": "1151022-21-投中畢旅-現代校長必備的找資源硬實力2.mp4",
        "path": "1151022-18-畢旅颱風天賢急會議/1151022-21-投中畢旅-現代校長必備的找資源硬實力2.mp4",
        "size_mb": 49.43
      },
      {
        "name": "1151022-21-投中畢旅-現代校長必備的找資源硬實力.mp4",
        "path": "1151022-18-畢旅颱風天賢急會議/1151022-21-投中畢旅-現代校長必備的找資源硬實力.mp4",
        "size_mb": 5.57
      }
    ],
    "videoCount": 4,
    "highlights": [
      "颱風與極端天候應變準則：學校戶外教育活動以「師生生命安全」為最高指導原則，不存任何僥倖心態。",
      "指揮體系啟動：由校長召集學務主任、總務主任、領隊總召與旅運公司召開即時緊急應變小組會議。",
      "室內備案行程切換：若遇南部強降雨，即刻啟動義大特洛伊室內館、奇美博物館全天深度美育與室內科學探索備案。",
      "找資源硬實力：校長與行政團隊即時橫向聯繫教育處、公路局、氣象署，迅速協調車隊路線與飯店安置，保障每位孩子平安。"
    ],
    "qa": [
      {
        "q": "如果遇颱風停班停課，畢旅會如何處理？",
        "a": "依地方政府災害應變中心公告，若達停班停課標準，指揮小組將立即啟動提前返校或於安全評鑑合格飯店原地避險程序。"
      }
    ]
  },
  {
    "id": "unit-13",
    "folder": "1151023-10-畢旅終點站領隊真心話",
    "tabName": "領隊真心話",
    "title": "單元 13 · 1151023-10 畢旅終點站：領隊看不見的面貌與最後一課",
    "tag": "生命教育",
    "date": "115/10/23 10:00",
    "icon": "heart",
    "description": "隨團領隊小鹿與師長們 24 小時守護的幕後點滴、感恩隨隊工作人員、同儕互助與即將邁向國三衝刺的成長期許。",
    "slides": [
      "1151023-10-畢旅終點站領隊真心話/投影片1.JPG",
      "1151023-10-畢旅終點站領隊真心話/投影片2.JPG",
      "1151023-10-畢旅終點站領隊真心話/投影片3.JPG",
      "1151023-10-畢旅終點站領隊真心話/投影片4.JPG",
      "1151023-10-畢旅終點站領隊真心話/投影片5.JPG",
      "1151023-10-畢旅終點站領隊真心話/投影片6.JPG",
      "1151023-10-畢旅終點站領隊真心話/投影片7.JPG",
      "1151023-10-畢旅終點站領隊真心話/投影片8.JPG",
      "1151023-10-畢旅終點站領隊真心話/投影片9.JPG",
      "1151023-10-畢旅終點站領隊真心話/投影片10.JPG",
      "1151023-10-畢旅終點站領隊真心話/投影片11.JPG",
      "1151023-10-畢旅終點站領隊真心話/投影片12.JPG",
      "1151023-10-畢旅終點站領隊真心話/投影片13.JPG",
      "1151023-10-畢旅終點站領隊真心話/投影片14.JPG",
      "1151023-10-畢旅終點站領隊真心話/投影片15.JPG",
      "1151023-10-畢旅終點站領隊真心話/投影片16.JPG",
      "1151023-10-畢旅終點站領隊真心話/投影片17.JPG",
      "1151023-10-畢旅終點站領隊真心話/投影片18.JPG",
      "1151023-10-畢旅終點站領隊真心話/投影片19.JPG",
      "1151023-10-畢旅終點站領隊真心話/投影片20.JPG",
      "1151023-10-畢旅終點站領隊真心話/投影片21.JPG"
    ],
    "slideCount": 21,
    "infographics": [
      "1151023-10-畢旅終點站領隊真心話/1151023-10-畢旅終點站領隊真心話3.png",
      "1151023-10-畢旅終點站領隊真心話/1151023-10-畢旅終點站領隊真心話.png",
      "1151023-10-畢旅終點站領隊真心話/1151023-10-領隊小鹿畢旅最後一課1.png",
      "1151023-10-畢旅終點站領隊真心話/1151023-10-領隊小鹿畢旅最後一課2.png"
    ],
    "infoCount": 4,
    "videos": [
      {
        "name": "1151023-投中畢旅-歡樂之外：領隊看不見的面貌.mp4",
        "path": "1151023-10-畢旅終點站領隊真心話/1151023-投中畢旅-歡樂之外：領隊看不見的面貌.mp4",
        "size_mb": 47.9
      }
    ],
    "videoCount": 1,
    "highlights": [
      "領隊真心話：每輛遊覽車前幽默風趣的領隊大哥哥、大姊姊，幕後每天凌晨 5:30 巡車、深夜 24:00 查房開檢討會。",
      "看不見的守護者：司機運將大哥出發前酒測檢驗與車況巡檢、師長們整夜未闔眼的關切、醫療箱的常備照料。",
      "感恩與同理心：一句真誠的「謝謝導師、謝謝領隊小鹿、謝謝司機大哥」，是教育最美麗的風景。",
      "國中生涯分水嶺：畢旅是三年級最重要的青春印記，狂歡過後收心回歸學習軌道，帶著滿滿能量迎戰未來的教育會考！"
    ],
    "qa": [
      {
        "q": "如何向這三天陪伴我們的師長與工作人員表達感謝？",
        "a": "在遊覽車回程時全班齊唱一首歌、親手寫一張卡片、隨手把車上垃圾帶下車，都是最棒的感謝方式。"
      }
    ]
  },
  {
    "id": "unit-14",
    "folder": "1151023-線上-奇美博物館參訪攻略",
    "tabName": "奇美博物館",
    "title": "單元 14 · 1151023 奇美博物館與法老特展參訪全攻略",
    "tag": "藝術美育",
    "date": "115/10/23 13:30",
    "icon": "landmark",
    "description": "奇美博物館阿波羅噴泉、西洋兵器/樂器/雕塑常設展廳導覽、古埃及法老特展精選展品賞析與名間親子生態園區大合影指南。",
    "slides": [
      "1151023-線上-奇美博物館參訪攻略/投影片1.JPG",
      "1151023-線上-奇美博物館參訪攻略/投影片2.JPG",
      "1151023-線上-奇美博物館參訪攻略/投影片3.JPG",
      "1151023-線上-奇美博物館參訪攻略/投影片4.JPG",
      "1151023-線上-奇美博物館參訪攻略/投影片5.JPG",
      "1151023-線上-奇美博物館參訪攻略/投影片6.JPG",
      "1151023-線上-奇美博物館參訪攻略/投影片7.JPG",
      "1151023-線上-奇美博物館參訪攻略/投影片8.JPG",
      "1151023-線上-奇美博物館參訪攻略/投影片9.JPG",
      "1151023-線上-奇美博物館參訪攻略/投影片10.JPG",
      "1151023-線上-奇美博物館參訪攻略/投影片11.JPG",
      "1151023-線上-奇美博物館參訪攻略/投影片12.JPG",
      "1151023-線上-奇美博物館參訪攻略/投影片13.JPG",
      "1151023-線上-奇美博物館參訪攻略/投影片14.JPG",
      "1151023-線上-奇美博物館參訪攻略/投影片15.JPG",
      "1151023-線上-奇美博物館參訪攻略/投影片16.JPG",
      "1151023-線上-奇美博物館參訪攻略/投影片17.JPG",
      "1151023-線上-奇美博物館參訪攻略/投影片18.JPG",
      "1151023-線上-奇美博物館參訪攻略/投影片19.JPG",
      "1151023-線上-奇美博物館參訪攻略/投影片20.JPG",
      "1151023-線上-奇美博物館參訪攻略/投影片21.JPG"
    ],
    "slideCount": 21,
    "infographics": [
      "1151023-線上-奇美博物館參訪攻略/1151023博物館特展參訪全攻略.png",
      "1151023-線上-奇美博物館參訪攻略/1151023奇美博物館與法老特展參訪攻略.png"
    ],
    "infoCount": 2,
    "videos": [],
    "videoCount": 0,
    "highlights": [
      "奇美博物館西洋美學：全台最具規模的西洋藝術殿堂，阿波羅噴泉、奧林帕斯神殿群像雕塑、希臘羅馬神話柱廊。",
      "常設展館精華：動物廳（全球標本生態透視畫）、兵器廳（各國歷史古兵器裝甲）、樂器廳（世界頂尖小提琴製造史）、藝術廳（歐洲各時期名畫）。",
      "法老古埃及特展：近距離觀摩木乃伊石棺、黃金飾品、聖書體象形文字與古埃及人對永恆靈魂的信仰追尋。",
      "名間親子生態園區：南投最夯共融式綠地公園，5米巨型彩虹溜滑梯、愛心大合照，為三天兩夜畢旅劃下完美句點！"
    ],
    "qa": [
      {
        "q": "奇美博物館室內參觀有何禮儀要求？",
        "a": "館內輕聲細語、勿奔跑嘻笑、展示品嚴禁觸摸、手機務必轉為震動或靜音，部分特展廳嚴禁拍照錄影。"
      }
    ]
  }
];

if (typeof module !== 'undefined') {
  module.exports = { TRIP_DATA, UNITS_DATA };
}
