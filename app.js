/**
 * 南投國中 115 學年度畢業旅行 行動多媒體導覽入口網
 * 核心應用腳本 (app.js)
 * 嚴格去個資合規保證：任何學生或師長姓名第2與第3個字均強制遮罩為 'O'
 */

// 去個資遮罩防護函式 (Requirement 6)
function sanitizeName(name) {
  if (!name || typeof name !== 'string') return '';
  const trimmed = name.trim();
  if (trimmed.length <= 1) return trimmed;
  // Whitelist non-person strings
  if (trimmed.includes('飯店') || trimmed.includes('中學') || trimmed.includes('穴')) return trimmed;
  
  // 若為 2 字：吳成 -> 吳O
  if (trimmed.length === 2) {
    return trimmed[0] + 'O';
  }
  // 若為 3 字：簡OX 或 簡XX -> 簡OO
  if (trimmed.length === 3) {
    return trimmed[0] + 'OO';
  }
  // 若為 4 字以上：歐陽XX -> 歐OOO
  return trimmed[0] + 'OO' + 'O'.repeat(trimmed.length - 3);
}

// 根據隱私模式動態格式化顯示名稱
function formatDisplayName(name, idx = 0, className = null, role = null) {
  if (AppState.privacyMode === 'anonymous') {
    if (className) {
      const numStr = String(idx + 1).padStart(2, '0');
      return `${className}班 #${numStr}`;
    } else if (role) {
      return `${role}`;
    } else {
      return `成員 #${idx + 1}`;
    }
  }
  return sanitizeName(name);
}

// 狀態管理物件
const AppState = {
  currentTab: 'tab-handbook',
  theme: localStorage.getItem('ntjh_theme') || 'light',
  privacyMode: localStorage.getItem('ntjh_privacy_mode') || 'masked', // 'masked' 或 'anonymous'
  currentClass: '901',
  activeDetailUnit: 'unit-01',
  classAlbumFilter: '301',
  classGalleryView: 'masonry', // 'masonry' 或 'grid'
  unitsState: {}, // 紀錄各單元簡報當前投影片頁碼 { 'unit-01': 0, ... }
  packingState: JSON.parse(localStorage.getItem('ntjh_packing') || '{}'),
  galleryFilter: 'all', // 'all' 或 station-01 ~ station-14
  galleryView: 'masonry', // 'masonry' 或 'grid'
  slideshowPlaying: false,
  slideshowTimer: null,
  slideshowSpeed: 3500,
  activePhotoList: [],
  activePhotoIndex: 0
};

// 隱私模式切換
window.setPrivacyMode = function(mode) {
  AppState.privacyMode = mode;
  localStorage.setItem('ntjh_privacy_mode', mode);
  
  const btnMasked = document.getElementById('btn-privacy-masked');
  const btnAnon = document.getElementById('btn-privacy-anon');
  if (btnMasked && btnAnon) {
    if (mode === 'masked') {
      btnMasked.classList.add('active');
      btnAnon.classList.remove('active');
    } else {
      btnMasked.classList.remove('active');
      btnAnon.classList.add('active');
    }
  }
  
  renderHandbook();
  const searchInput = document.getElementById('global-search-input');
  if (searchInput && searchInput.value.trim()) {
    searchInput.dispatchEvent(new Event('input'));
  }
};

// 初始化各單元狀態
if (typeof UNITS_DATA !== 'undefined') {
  UNITS_DATA.forEach(u => {
    AppState.unitsState[u.id] = {
      currentSlide: 0,
      viewMode: 'stage', // 'stage' 或 'grid'
      activeVideo: 0
    };
  });
}

// DOM 加載完成後執行主邏輯
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  renderTabsNavigation();
  renderHandbook();
  renderDetailsSection();
  renderGalleryTab();
  renderClassAlbumsSection();
  renderPhotoDownloadSection();
  initSearch();
  initPackingList();
  initLightbox();
  initGlobalKeyboard();
  handleUrlHash();
});

/* ==========================================================================
   主題切換 Theme Switcher
   ========================================================================== */
function initTheme() {
  document.documentElement.setAttribute('data-theme', AppState.theme);
  const themeBtn = document.getElementById('theme-toggle-btn');
  if (themeBtn) {
    updateThemeIcon(themeBtn);
    themeBtn.addEventListener('click', () => {
      AppState.theme = AppState.theme === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', AppState.theme);
      localStorage.setItem('ntjh_theme', AppState.theme);
      updateThemeIcon(themeBtn);
    });
  }

  // 隱私按鈕狀態同步
  const btnMasked = document.getElementById('btn-privacy-masked');
  const btnAnon = document.getElementById('btn-privacy-anon');
  if (btnMasked && btnAnon) {
    if (AppState.privacyMode === 'masked') {
      btnMasked.classList.add('active');
      btnAnon.classList.remove('active');
    } else {
      btnMasked.classList.remove('active');
      btnAnon.classList.add('active');
    }
  }
}

function updateThemeIcon(btn) {
  btn.innerHTML = AppState.theme === 'dark' 
    ? `<svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/></svg>`
    : `<svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg>`;
  btn.setAttribute('title', AppState.theme === 'dark' ? '切換淺色模式' : '切換深色模式');
}

/* ==========================================================================
   標籤列渲染與切換 Tabs Controller
   ========================================================================== */
function renderTabsNavigation() {
  const tabsScroll = document.getElementById('tabs-scroll-container');
  if (!tabsScroll) return;

  const totalPhotosCount = typeof GALLERY_PHOTOS !== 'undefined' ? GALLERY_PHOTOS.length : 392;
  const totalClassPhotosCount = typeof CLASS_PHOTOS !== 'undefined' ? CLASS_PHOTOS.length : 908;

  let html = `
    <button class="tab-btn ${AppState.currentTab === 'tab-handbook' ? 'active' : ''}" data-tab="tab-handbook">
      <span>🏠 手冊核心</span>
    </button>
    <a href="https://yaoshuchin.github.io/ntjh-trip-handbook-2026/app.html" target="_blank" rel="noopener noreferrer" class="tab-btn tab-link-btn" title="在新分頁開啟電子手冊 PWA 網頁版">
      <span>📖 電子手冊 ↗</span>
    </a>
    <button class="tab-btn ${AppState.currentTab === 'tab-details' ? 'active' : ''}" data-tab="tab-details">
      <span>🗺️ 詳細行程</span>
    </button>
    <button class="tab-btn ${AppState.currentTab === 'tab-gallery' ? 'active' : ''}" data-tab="tab-gallery">
      <span>📸 實境時光廊</span>
    </button>
    <button class="tab-btn ${AppState.currentTab === 'tab-class-albums' ? 'active' : ''}" data-tab="tab-class-albums">
      <span>🎓 班級相簿</span>
    </button>
    <button class="tab-btn ${AppState.currentTab === 'tab-photo-download' ? 'active' : ''}" data-tab="tab-photo-download">
      <span>📥 真實相片下載</span>
    </button>
  `;

  tabsScroll.innerHTML = html;

  // 綁定點擊切換事件
  tabsScroll.querySelectorAll('.tab-btn[data-tab]').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');
      switchTab(targetTab);
    });
  });
}

function switchTab(tabId) {
  // 相容舊的 tab-unit-01 ~ tab-unit-14 連結，自動切換至詳細行程並鎖定該單元
  if (tabId && tabId.startsWith('tab-unit-')) {
    const unitId = tabId.replace('tab-', '');
    switchTab('tab-details');
    selectDetailUnit(unitId);
    return;
  }

  AppState.currentTab = tabId;

  // 更新標籤按鈕狀態
  document.querySelectorAll('.tab-btn[data-tab]').forEach(btn => {
    if (btn.getAttribute('data-tab') === tabId) {
      btn.classList.add('active');
      btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    } else {
      btn.classList.remove('active');
    }
  });

  // 更新內容面板狀態
  document.querySelectorAll('.tab-panel').forEach(panel => {
    if (panel.id === tabId) {
      panel.classList.add('active');
    } else {
      panel.classList.remove('active');
    }
  });

  // 更新 URL Hash (避免畫面跳動)
  history.replaceState(null, null, `#${tabId.replace('tab-', '')}`);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function handleUrlHash() {
  const hash = window.location.hash.replace('#', '');
  if (!hash) return;
  const targetId = `tab-${hash}`;
  const targetPanel = document.getElementById(targetId);
  if (targetPanel) {
    switchTab(targetId);
  } else if (hash.startsWith('unit-')) {
    switchTab('tab-details');
    selectDetailUnit(hash);
  } else if (hash.startsWith('30') || hash.startsWith('s30')) {
    const cid = hash.replace('s', '');
    switchToClassAlbum(cid);
  }
}

/* ==========================================================================
   手冊核心渲染 Handbook Renderer
   ========================================================================== */
function renderHandbook() {
  if (typeof TRIP_DATA === 'undefined') return;

  // 1. 渲染統計卡片
  const statsWrap = document.getElementById('handbook-stats-cards');
  if (statsWrap) {
    const s = TRIP_DATA.info.stats;
    statsWrap.innerHTML = `
      <div class="stat-box">
        <div class="stat-icon">🎓</div>
        <div>
          <div class="stat-val">${s.studentsTotal}</div>
          <div class="stat-label">應屆畢業生總人數 (男${s.maleStudents}/女${s.femaleStudents})</div>
        </div>
      </div>
      <div class="stat-box">
        <div class="stat-icon">👨‍🏫</div>
        <div>
          <div class="stat-val">${s.teachersTotal}</div>
          <div class="stat-label">隨團帶隊師長與行政主管</div>
        </div>
      </div>
      <div class="stat-box">
        <div class="stat-icon">🚌</div>
        <div>
          <div class="stat-val">${s.busCount}</div>
          <div class="stat-label">大型豪華遊覽車隊編組</div>
        </div>
      </div>
      <div class="stat-box">
        <div class="stat-icon">🏨</div>
        <div>
          <div class="stat-val">2 晚</div>
          <div class="stat-label">墾丁福華渡假 ＆ 高雄天悅飯店</div>
        </div>
      </div>
    `;
  }

  // 2. 渲染三天行程時間軸
  renderItineraryTimeline(1);

  // 3. 渲染車次與隨車師長表
  const busesTableBody = document.getElementById('buses-table-body');
  if (busesTableBody && TRIP_DATA.buses) {
    busesTableBody.innerHTML = TRIP_DATA.buses.map(b => {
      const teacherNames = (b.teachers || []).map((tName, i) => formatDisplayName(tName, i, null, '隨車師長')).join('、');
      return `
        <tr>
          <td><strong>第 ${b.bus} 車</strong></td>
          <td><span class="badge-tag">${b.classes}</span></td>
          <td>${b.male}</td>
          <td>${b.female}</td>
          <td><strong>${b.total}</strong></td>
          <td>${b.vegetarian > 0 ? `<span style="color:var(--success); font-weight:700;">🌱 ${b.vegetarian}</span>` : '0'}</td>
          <td><strong>${teacherNames}</strong></td>
        </tr>
      `;
    }).join('');
  }

  // 4. 渲染師長分房表
  const teachersTableBody = document.getElementById('teachers-table-body');
  if (teachersTableBody && TRIP_DATA.teachers) {
    teachersTableBody.innerHTML = TRIP_DATA.teachers.map((t, idx) => `
      <tr>
        <td><span class="badge-tag">${t.role}</span></td>
        <td><strong>${formatDisplayName(t.name, idx, null, t.role)}</strong></td>
        <td><strong style="color:var(--primary);">${t.day1Room || t.roomDay1 || '－'}</strong></td>
        <td><strong style="color:var(--secondary);">${t.day2Room || t.roomDay2 || '－'}</strong></td>
        <td>第 ${t.bus} 車</td>
        <td style="color:var(--text-muted); font-size:0.82rem;">${t.note || '－'}</td>
      </tr>
    `).join('');
  }

  // 5. 渲染班級名冊分籤
  renderClassRosterNav();
  renderClassRoster(AppState.currentClass || '901');

  // 6. 渲染海生館問答闖關
  renderOceanQuiz();

  // 7. 渲染班級相片雲端相簿
  renderPhotoUploads();
}

// 行程時間軸渲染
function renderItineraryTimeline(dayNum) {
  const container = document.getElementById('itinerary-timeline-content');
  if (!container || !TRIP_DATA.itinerary) return;

  const dayData = TRIP_DATA.itinerary.find(d => d.day === dayNum);
  if (!dayData) return;

  // 更新天數按鈕
  document.querySelectorAll('.timeline-day-btn').forEach(btn => {
    if (parseInt(btn.getAttribute('data-day')) === dayNum) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  const meals = dayData.meals;
  let html = `
    <div style="background:var(--bg-card-subtle); padding:12px 18px; border-radius:var(--radius-md); margin-bottom:20px; font-size:0.9rem;">
      <strong>🍱 三餐安排：</strong> 早餐：${meals.breakfast} ｜ 午餐：${meals.lunch} ｜ 晚餐：${meals.dinner}
      <br><strong>🏨 夜宿地點：</strong> <span style="color:var(--primary); font-weight:700;">${dayData.hotel}</span>
    </div>
    <div class="timeline-items-wrap">
  `;

  dayData.timeline.forEach(item => {
    html += `
      <div class="timeline-item">
        <div class="timeline-dot"></div>
        <div class="timeline-time">${item.time}</div>
        <div class="timeline-title">${item.title}</div>
        <div class="timeline-desc">${item.desc}</div>
      </div>
    `;
  });

  html += `</div>`;
  container.innerHTML = html;
}

// 班級名冊標籤
function renderClassRosterNav() {
  const nav = document.getElementById('roster-class-nav');
  if (!nav) return;
  const classes = ['901', '902', '903', '904', '905', '906', '907', '908', '909'];
  nav.innerHTML = classes.map(c => `
    <button class="class-btn ${c === AppState.currentClass ? 'active' : ''}" data-class="${c}">
      ${c} 班
    </button>
  `).join('');

  nav.querySelectorAll('.class-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const cls = btn.getAttribute('data-class');
      AppState.currentClass = cls;
      nav.querySelectorAll('.class-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderClassRoster(cls);
    });
  });
}

function renderClassRoster(className) {
  AppState.currentClass = className;
  const tbody = document.getElementById('roster-table-body');
  const rosterList = TRIP_DATA.roster || TRIP_DATA.students;
  if (!tbody || !rosterList) return;

  const students = rosterList.filter(s => s.class === className);
  tbody.innerHTML = students.map((s, idx) => `
    <tr>
      <td>${idx + 1}</td>
      <td><strong>${s.class}</strong></td>
      <td><strong>${formatDisplayName(s.name, idx, s.class)}</strong></td>
      <td>${s.gender === '男' ? '<span style="color:var(--primary);">👦 男</span>' : '<span style="color:var(--danger);">👧 女</span>'}</td>
      <td><strong style="color:var(--primary);">${s.day1Room || s.room1 || '－'}</strong></td>
      <td><strong style="color:var(--secondary);">${s.day2Room || s.room2 || '－'}</strong></td>
      <td>第 ${s.table || s.table1 || '－'} 桌</td>
      <td>第 ${s.bus || s.busNo || '－'} 車</td>
    </tr>
  `).join('');
}

// 海生館互動問答
function renderOceanQuiz() {
  const wrap = document.getElementById('ocean-quiz-cards');
  if (!wrap || !TRIP_DATA.quiz) return;

  const tfList = TRIP_DATA.quiz.trueFalse || [];
  const qaList = TRIP_DATA.quiz.qa || TRIP_DATA.quiz.qaCards || [];

  let html = `
    <h4 style="margin:20px 0 10px; color:var(--primary); font-size:1.05rem;">🎯 是非觀念即時挑戰（點擊選項驗證）</h4>
    <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:12px; margin-bottom:24px;">
  `;

  tfList.forEach((tf, i) => {
    const qText = tf.question || tf.q;
    const aVal = tf.answer !== undefined ? tf.answer : tf.a;
    const expl = tf.explanation || tf.expl;

    html += `
      <div class="qa-item" id="tf-box-${i}">
        <div style="font-weight:700; font-size:0.92rem; margin-bottom:8px;">${qText}</div>
        <div style="display:flex; gap:10px;">
          <button class="btn-deck" onclick="checkTF(${i}, true, ${aVal})">⭕ 是</button>
          <button class="btn-deck" onclick="checkTF(${i}, false, ${aVal})">❌ 否</button>
        </div>
        <div id="tf-feedback-${i}" style="margin-top:8px; font-size:0.85rem; display:none;"></div>
      </div>
    `;
  });

  html += `
    </div>
    <h4 style="margin:24px 0 10px; color:var(--secondary); font-size:1.05rem;">🐟 海洋生物 25 題知識卡（點擊翻開解答）</h4>
    <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(280px, 1fr)); gap:12px;">
  `;

  qaList.forEach((card, idx) => {
    html += `
      <div class="qa-item" style="cursor:pointer;" onclick="toggleQACard(this)">
        <div class="qa-q">${card.num || (idx + 1)}. ${card.q}</div>
        <div class="qa-a" style="display:none; color:var(--text-main); font-weight:600; margin-top:6px; border-top:1px dashed var(--border-color); padding-top:6px; white-space:pre-line;">
          💡 解答：${card.a}
        </div>
      </div>
    `;
  });

  html += `</div>`;
  wrap.innerHTML = html;
}

window.checkTF = function(idx, userPick, correctAnswer) {
  const fb = document.getElementById(`tf-feedback-${idx}`);
  if (!fb) return;
  fb.style.display = 'block';
  const tf = (TRIP_DATA.quiz.trueFalse || [])[idx];
  const expl = tf ? (tf.explanation || tf.expl || '') : '';
  if (userPick === correctAnswer) {
    fb.innerHTML = `<span style="color:var(--success); font-weight:700;">🎉 答對了！</span> ${expl}`;
  } else {
    fb.innerHTML = `<span style="color:var(--danger); font-weight:700;">❌ 答錯囉！</span> ${expl}`;
  }
};

window.toggleQACard = function(el) {
  const ans = el.querySelector('.qa-a');
  if (ans) {
    ans.style.display = ans.style.display === 'none' ? 'block' : 'none';
  }
};

// 班級相片雲端相簿
function renderPhotoUploads() {
  const container = document.getElementById('photo-uploads-grid');
  if (!container || !TRIP_DATA.photoUploads) return;

  container.innerHTML = TRIP_DATA.photoUploads.map((p, idx) => {
    const mentorName = formatDisplayName(p.mentor.replace(' 導師', ''), idx, null, p.className + '導師');
    return `
      <div class="photo-upload-card">
        <div>
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
            <h4 style="margin:0; font-size:1.05rem; color:var(--primary); font-weight:800;">${p.className}</h4>
            <span class="badge-tag">隨車 第 ${p.bus} 車</span>
          </div>
          <p style="font-size:0.88rem; color:var(--text-muted); margin:0 0 14px 0;">
            隨車導師：<strong style="color:var(--text-main);">${mentorName} 導師</strong>
          </p>
        </div>
        <div style="display:flex; flex-direction:column; gap:8px;">
          <button class="btn-deck" onclick="switchToClassAlbum('${p.classId}')" style="width:100%; text-align:center; background:linear-gradient(135deg, #f59e0b, #ea580c); color:#ffffff; border:none; font-weight:700; padding:8px 12px; border-radius:8px; cursor:pointer;">
            🎓 在本站瀏覽 ${p.className} 相簿
          </button>
          <a href="${p.padletUrl}" target="_blank" rel="noopener noreferrer" class="btn-deck" style="text-align:center; text-decoration:none; display:block; background:rgba(37, 99, 235, 0.08); color:var(--primary); font-weight:700; border:1px solid rgba(37, 99, 235, 0.25); padding:8px 12px; border-radius:8px;">
            📥 前往 Padlet 下載原圖 / 上傳 ↗
          </a>
        </div>
      </div>
    `;
  }).join('');
}

/* ==========================================================================
   即時速查搜尋引擎 Live Search
   ========================================================================== */
function initSearch() {
  const input = document.getElementById('global-search-input');
  const resultsBox = document.getElementById('search-results-content');
  if (!input || !resultsBox || typeof TRIP_DATA === 'undefined') return;

  input.addEventListener('input', (e) => {
    const q = e.target.value.trim().toLowerCase();
    if (!q) {
      resultsBox.innerHTML = `<div style="text-align:center; padding:20px; color:var(--text-muted);">請在上方輸入姓名、房號（如 2141、501）、班級（如 901）或桌次車次即時查詢</div>`;
      return;
    }

    const rosterList = TRIP_DATA.roster || TRIP_DATA.students || [];
    const matchedStudents = rosterList.filter((s, idx) => {
      const masked = sanitizeName(s.name).toLowerCase();
      const raw = (s.name || '').toLowerCase();
      const room1 = String(s.day1Room || s.room1 || '').toLowerCase();
      const room2 = String(s.day2Room || s.room2 || '').toLowerCase();
      const cls = String(s.class || '').toLowerCase();
      const tbl = String(s.table || s.table1 || '').toLowerCase();
      const bus = String(s.bus || s.busNo || '').toLowerCase();
      const anonTag = `${cls}班 #${String(idx+1).padStart(2,'0')}`.toLowerCase();
      
      return masked.includes(q) || raw.includes(q) || room1.includes(q) || room2.includes(q) ||
             cls.includes(q) || tbl === q || tbl.includes(q) || bus === q || bus.includes(q) || anonTag.includes(q);
    });

    const matchedTeachers = (TRIP_DATA.teachers || []).filter(t => {
      const masked = sanitizeName(t.name).toLowerCase();
      const raw = (t.name || '').toLowerCase();
      const role = String(t.role || '').toLowerCase();
      const r1 = String(t.day1Room || t.roomDay1 || '').toLowerCase();
      const r2 = String(t.day2Room || t.roomDay2 || '').toLowerCase();
      const bus = String(t.bus || '').toLowerCase();
      return masked.includes(q) || raw.includes(q) || role.includes(q) || r1.includes(q) || r2.includes(q) || bus === q;
    });

    if (matchedStudents.length === 0 && matchedTeachers.length === 0) {
      resultsBox.innerHTML = `<div style="text-align:center; padding:30px; color:var(--text-muted);">查無相符資料，請嘗試其他關鍵字（如：901、2141、501、董OO）</div>`;
      return;
    }

    let html = `<div class="result-cards-grid">`;

    matchedTeachers.forEach((t, idx) => {
      const dispName = formatDisplayName(t.name, idx, null, t.role);
      html += `
        <div class="student-card" style="border-left:4px solid var(--accent-purple);">
          <div class="student-card-header">
            <span class="student-name">👨‍🏫 ${dispName}</span>
            <span class="student-class-badge" style="background:rgba(139, 92, 246, 0.15); color:var(--accent-purple);">${t.role}</span>
          </div>
          <div class="student-card-grid">
            <div>10/21 福華：<strong>${t.day1Room || t.roomDay1 || '－'}</strong></div>
            <div>10/22 天悅：<strong>${t.day2Room || t.roomDay2 || '－'}</strong></div>
            <div>隨車車次：<strong>第 ${t.bus} 車</strong></div>
            <div>備註：<strong>${t.note || '－'}</strong></div>
          </div>
        </div>
      `;
    });

    matchedStudents.forEach((s, idx) => {
      const dispName = formatDisplayName(s.name, idx, s.class);
      html += `
        <div class="student-card" style="border-left:4px solid ${s.gender === '男' ? 'var(--primary)' : 'var(--danger)'};">
          <div class="student-card-header">
            <span class="student-name">${s.gender === '男' ? '👦' : '👧'} ${dispName}</span>
            <span class="student-class-badge">${s.class} 班</span>
          </div>
          <div class="student-card-grid">
            <div>10/21 福華：<strong>${s.day1Room || s.room1 || '－'}</strong></div>
            <div>10/22 天悅：<strong>${s.day2Room || s.room2 || '－'}</strong></div>
            <div>桌次：<strong>第 ${s.table || s.table1 || '－'} 桌</strong></div>
            <div>隨車：<strong>第 ${s.bus || s.busNo || '－'} 車</strong></div>
          </div>
        </div>
      `;
    });

    html += `</div>`;
    resultsBox.innerHTML = html;
  });
}

/* ==========================================================================
   行李打包清單 Packing Checklist
   ========================================================================== */
function initPackingList() {
  const container = document.getElementById('packing-checklist-container');
  const items = TRIP_DATA.packingChecklist || TRIP_DATA.packing;
  if (!container || !items) return;

  let html = '';

  items.forEach(cat => {
    html += `
      <div style="margin-bottom:20px;">
        <h5 style="font-size:0.95rem; font-weight:700; color:var(--text-main); margin-bottom:10px;">📋 ${cat.category}</h5>
        <div class="checklist-grid">
    `;
    cat.items.forEach(item => {
      const isChecked = !!AppState.packingState[item.id];
      html += `
        <label class="check-item ${isChecked ? 'done' : ''}" data-item-id="${item.id}">
          <input type="checkbox" ${isChecked ? 'checked' : ''} onchange="togglePackItem('${item.id}', this)">
          <div>
            <div style="font-weight:600;">${item.name || item.text}</div>
            ${item.tip ? `<div style="font-size:0.75rem; color:var(--text-muted); margin-top:2px;">${item.tip}</div>` : ''}
          </div>
        </label>
      `;
    });
    html += `</div></div>`;
  });

  container.innerHTML = html;
  updatePackingProgress();
}

window.togglePackItem = function(id, checkbox) {
  AppState.packingState[id] = checkbox.checked;
  localStorage.setItem('ntjh_packing', JSON.stringify(AppState.packingState));
  const parent = checkbox.closest('.check-item');
  if (parent) {
    if (checkbox.checked) {
      parent.classList.add('done');
    } else {
      parent.classList.remove('done');
    }
  }
  updatePackingProgress();
};

function updatePackingProgress() {
  const items = TRIP_DATA.packingChecklist || TRIP_DATA.packing;
  if (!items) return;
  let total = 0;
  let checked = 0;
  items.forEach(cat => {
    cat.items.forEach(item => {
      total++;
      if (AppState.packingState[item.id]) checked++;
    });
  });

  const percent = total > 0 ? Math.round((checked / total) * 100) : 0;
  const bar = document.getElementById('packing-progress-bar');
  const text = document.getElementById('packing-progress-text');
  if (bar) bar.style.width = `${percent}%`;
  if (text) text.innerText = `完成進度：${checked} / ${total} 項 (${percent}%)`;
}

/* ==========================================================================
   詳細行程：14 個主題單元整合渲染 Details & Units Combined Section
   ========================================================================== */
function renderDetailsSection() {
  const navContainer = document.getElementById('details-units-nav');
  if (!navContainer || typeof UNITS_DATA === 'undefined') return;

  const currentUnitId = AppState.activeDetailUnit || 'unit-01';

  // 渲染 14 單元快速選單按鈕
  navContainer.innerHTML = UNITS_DATA.map((u, idx) => {
    const num = String(idx + 1).padStart(2, '0');
    const isActive = u.id === currentUnitId;
    const badgeParts = [];
    if (u.videoCount > 0) badgeParts.push('🎬');
    if (u.photoCount > 0) badgeParts.push(`${u.photoCount}照`);
    const badgeText = badgeParts.join(' ');
    return `
      <button class="unit-nav-btn ${isActive ? 'active' : ''}" onclick="selectDetailUnit('${u.id}')">
        <span>${num}. ${u.tabName}</span>
        ${badgeText ? `<span class="unit-nav-badge">${badgeText}</span>` : ''}
      </button>
    `;
  }).join('');

  renderActiveDetailUnitContent(currentUnitId);
}

window.selectDetailUnit = function(unitId) {
  AppState.activeDetailUnit = unitId;

  // 更新選單按鈕樣式
  const navContainer = document.getElementById('details-units-nav');
  if (navContainer) {
    navContainer.querySelectorAll('.unit-nav-btn').forEach((btn, idx) => {
      const u = UNITS_DATA[idx];
      if (u && u.id === unitId) {
        btn.classList.add('active');
        btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      } else {
        btn.classList.remove('active');
      }
    });
  }

  // 渲染當前單元內容
  renderActiveDetailUnitContent(unitId);
};

function renderActiveDetailUnitContent(unitId) {
  const container = document.getElementById('details-unit-content-wrapper');
  const countIndicator = document.getElementById('details-unit-count-indicator');
  if (!container || typeof UNITS_DATA === 'undefined') return;

  const unit = UNITS_DATA.find(u => u.id === unitId) || UNITS_DATA[0];
  if (!unit) return;

  if (countIndicator) {
    countIndicator.innerText = `當前：${unit.title}`;
  }

  container.innerHTML = `
    <!-- 單元橫幅 -->
    <div class="unit-hero">
      <div class="unit-meta-bar">
        <span class="badge-tag">${unit.tag}</span>
        <span class="badge-date">🕒 ${unit.date}</span>
        <span class="badge-date">📑 21 頁完整簡報</span>
        ${unit.videoCount > 0 ? `<span class="badge-date" style="color:var(--primary); font-weight:700;">🎬 ${unit.videoCount} 部影音導覽</span>` : ''}
        ${unit.photoCount > 0 ? `<span class="badge-date" style="color:var(--secondary); font-weight:700;">📸 ${unit.photoCount} 張實境相片</span>` : ''}
      </div>
      <h2>${unit.title}</h2>
      <p>${unit.description}</p>
    </div>

    <!-- 影音播放區 (若有影片) -->
    ${renderUnitVideoSection(unit)}

    <!-- 21 頁全套簡報投影片輪播器 -->
    ${renderUnitDeckSection(unit)}

    <!-- 高清資訊圖表專區 -->
    ${renderUnitInfographicsSection(unit)}

    <!-- 現場實境精彩相片 (整合對應站點相片) -->
    ${renderUnitPhotosSection(unit)}

    <!-- 單元重點講義與互動問答 -->
    ${renderUnitNotesSection(unit)}
  `;

  // 綁定投影片互動事件
  bindDeckEvents(unit.id);
}

function renderAllUnits() {
  renderDetailsSection();
}

// 渲染單元影片區塊
function renderUnitVideoSection(unit) {
  if (unit.videoCount === 0) return '';

  const firstVideo = unit.videos[0];
  const hasMultiple = unit.videoCount > 1;

  return `
    <div class="unit-section-title">
      <h3><span>🎬</span> 單元專題影音導覽</h3>
      <span class="section-indicator">${unit.videoCount} 部影音檔案</span>
    </div>
    <div class="video-card" id="video-card-${unit.id}">
      <div class="video-player-box">
        <video id="video-player-${unit.id}" controls preload="metadata" poster="${unit.infographics[0] || ''}">
          <source src="${firstVideo.path}" type="video/mp4">
          您的瀏覽器不支援 HTML5 影片播放。
        </video>
      </div>
      <div class="video-info-bar">
        <div class="video-title">
          <span>📽️</span>
          <span id="video-name-${unit.id}">${firstVideo.name.replace('.mp4', '')}</span>
        </div>
        <div class="video-meta">
          <span id="video-size-${unit.id}">檔案大小：${firstVideo.size_mb} MB</span>
        </div>
      </div>
      ${hasMultiple ? `
        <div class="video-playlist">
          ${unit.videos.map((v, i) => `
            <button class="playlist-btn ${i === 0 ? 'active' : ''}" onclick="switchUnitVideo('${unit.id}', ${i})">
              影片 ${i + 1}：${v.name.slice(0, 22)}...
            </button>
          `).join('')}
        </div>
      ` : ''}
    </div>
  `;
}

window.switchUnitVideo = function(unitId, videoIndex) {
  const unit = UNITS_DATA.find(u => u.id === unitId);
  if (!unit || !unit.videos[videoIndex]) return;

  const player = document.getElementById(`video-player-${unitId}`);
  const nameSpan = document.getElementById(`video-name-${unitId}`);
  const sizeSpan = document.getElementById(`video-size-${unitId}`);
  const playlistBtns = document.querySelectorAll(`#video-card-${unitId} .playlist-btn`);

  const v = unit.videos[videoIndex];
  if (player) {
    player.src = v.path;
    player.play().catch(() => {});
  }
  if (nameSpan) nameSpan.innerText = v.name.replace('.mp4', '');
  if (sizeSpan) sizeSpan.innerText = `檔案大小：${v.size_mb} MB`;

  playlistBtns.forEach((btn, idx) => {
    if (idx === videoIndex) btn.classList.add('active');
    else btn.classList.remove('active');
  });
};

// 渲染單元 21 頁簡報輪播器
function renderUnitDeckSection(unit) {
  const slides = unit.slides;
  const firstSlide = slides[0] || '';

  return `
    <div class="unit-section-title">
      <h3><span>📑</span> 21 頁主題投影片簡報</h3>
      <span class="section-indicator">第 <span id="deck-cur-text-${unit.id}">1</span> / 21 頁</span>
    </div>
    <div class="deck-card" id="deck-card-${unit.id}">
      <div class="deck-toolbar">
        <div class="deck-counter" id="deck-counter-${unit.id}">
          投影片 01 / 21
        </div>
        <div class="deck-actions">
          <button class="btn-deck" onclick="toggleDeckViewMode('${unit.id}')" id="deck-view-btn-${unit.id}">
            <span>⊞</span> 平鋪 21 頁檢視
          </button>
          <button class="btn-deck" onclick="fullscreenDeck('${unit.id}')">
            <span>⛶</span> 全螢幕播放
          </button>
        </div>
      </div>

      <!-- 舞台展示模式 -->
      <div class="deck-stage" id="deck-stage-${unit.id}">
        <button class="deck-nav-prev" onclick="prevSlide('${unit.id}')" title="上一頁 (←)">‹</button>
        <img id="deck-main-img-${unit.id}" src="${firstSlide}" alt="投影片 1" onclick="openLightboxFromDeck('${unit.id}')">
        <button class="deck-nav-next" onclick="nextSlide('${unit.id}')" title="下一頁 (→)">›</button>
      </div>

      <!-- 底部 21 張縮圖滾動條 -->
      <div class="deck-thumbs" id="deck-thumbs-${unit.id}">
        ${slides.map((s, idx) => `
          <div class="thumb-item ${idx === 0 ? 'active' : ''}" onclick="goToSlide('${unit.id}', ${idx})">
            <img src="${s}" alt="縮圖 ${idx + 1}" loading="lazy">
            <span class="thumb-number">${idx + 1}</span>
          </div>
        `).join('')}
      </div>

      <!-- 平鋪 21 頁網格模式 -->
      <div class="deck-grid-view" id="deck-grid-${unit.id}">
        ${slides.map((s, idx) => `
          <div class="grid-slide-card" onclick="selectGridSlide('${unit.id}', ${idx})">
            <img src="${s}" alt="投影片 ${idx + 1}" loading="lazy">
            <div class="grid-slide-footer">
              <span>投影片 ${idx + 1}</span>
              <span>點擊檢視</span>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// 投影片翻頁控制
window.goToSlide = function(unitId, slideIndex) {
  const unit = UNITS_DATA.find(u => u.id === unitId);
  if (!unit || !unit.slides[slideIndex]) return;

  AppState.unitsState[unitId].currentSlide = slideIndex;

  const mainImg = document.getElementById(`deck-main-img-${unitId}`);
  const counter = document.getElementById(`deck-counter-${unitId}`);
  const curText = document.getElementById(`deck-cur-text-${unitId}`);
  const thumbs = document.querySelectorAll(`#deck-thumbs-${unitId} .thumb-item`);

  if (mainImg) {
    mainImg.style.opacity = '0.5';
    mainImg.src = unit.slides[slideIndex];
    setTimeout(() => { mainImg.style.opacity = '1'; }, 100);
  }

  const numStr = String(slideIndex + 1).padStart(2, '0');
  if (counter) counter.innerText = `投影片 ${numStr} / 21`;
  if (curText) curText.innerText = slideIndex + 1;

  thumbs.forEach((th, idx) => {
    if (idx === slideIndex) {
      th.classList.add('active');
      th.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    } else {
      th.classList.remove('active');
    }
  });
};

window.prevSlide = function(unitId) {
  const cur = AppState.unitsState[unitId].currentSlide;
  if (cur > 0) {
    goToSlide(unitId, cur - 1);
  } else {
    // 循環至最後一頁
    goToSlide(unitId, 20);
  }
};

window.nextSlide = function(unitId) {
  const cur = AppState.unitsState[unitId].currentSlide;
  if (cur < 20) {
    goToSlide(unitId, cur + 1);
  } else {
    // 循環至第一頁
    goToSlide(unitId, 0);
  }
};

window.toggleDeckViewMode = function(unitId) {
  const stage = document.getElementById(`deck-stage-${unitId}`);
  const thumbs = document.getElementById(`deck-thumbs-${unitId}`);
  const grid = document.getElementById(`deck-grid-${unitId}`);
  const btn = document.getElementById(`deck-view-btn-${unitId}`);

  if (AppState.unitsState[unitId].viewMode === 'stage') {
    AppState.unitsState[unitId].viewMode = 'grid';
    if (stage) stage.style.display = 'none';
    if (thumbs) thumbs.style.display = 'none';
    if (grid) grid.classList.add('active');
    if (btn) btn.innerHTML = `<span>📽️</span> 切換單頁投影模式`;
  } else {
    AppState.unitsState[unitId].viewMode = 'stage';
    if (stage) stage.style.display = 'flex';
    if (thumbs) thumbs.style.display = 'flex';
    if (grid) grid.classList.remove('active');
    if (btn) btn.innerHTML = `<span>⊞</span> 平鋪 21 頁檢視`;
  }
};

window.selectGridSlide = function(unitId, index) {
  toggleDeckViewMode(unitId);
  goToSlide(unitId, index);
};

window.fullscreenDeck = function(unitId) {
  const stage = document.getElementById(`deck-stage-${unitId}`);
  if (!stage) return;
  if (!document.fullscreenElement) {
    stage.requestFullscreen().catch(() => {});
  } else {
    document.exitFullscreen().catch(() => {});
  }
};

function bindDeckEvents(unitId) {
  // 支援滑動手勢
  const stage = document.getElementById(`deck-stage-${unitId}`);
  if (!stage) return;

  let startX = 0;
  stage.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  }, { passive: true });

  stage.addEventListener('touchend', (e) => {
    const endX = e.changedTouches[0].clientX;
    const diff = endX - startX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) prevSlide(unitId);
      else nextSlide(unitId);
    }
  }, { passive: true });
}

// 渲染資訊圖表區塊
function renderUnitInfographicsSection(unit) {
  if (unit.infoCount === 0) return '';

  return `
    <div class="unit-section-title">
      <h3><span>🖼️</span> 高清資訊圖表與宣傳海報</h3>
      <span class="section-indicator">共 ${unit.infoCount} 張圖表（點擊放大燈箱）</span>
    </div>
    <div class="infographics-grid">
      ${unit.infographics.map((img, i) => {
        const basename = img.split('/').pop().replace('.png', '');
        return `
          <div class="info-card" onclick="openLightboxSingle('${img}', '${basename}')">
            <div class="info-img-box">
              <img src="${img}" alt="${basename}" loading="lazy">
              <div class="info-zoom-hint">🔍 點擊高清放大</div>
            </div>
            <div class="info-card-body">
              <div class="info-card-title">${basename}</div>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

// 渲染單元重點整理與問答
function renderUnitNotesSection(unit) {
  if (!unit.highlights || unit.highlights.length === 0) return '';

  return `
    <div class="unit-section-title">
      <h3><span>💡</span> 單元核心精華與互動探究</h3>
    </div>
    <div class="unit-notes-grid">
      <div class="notes-card">
        <h4><span>✦</span> 核心重點整理</h4>
        <ul class="notes-list">
          ${unit.highlights.map(h => `<li>${h}</li>`).join('')}
        </ul>
      </div>
      <div class="notes-card">
        <h4><span>❓</span> 思考探究與隨堂測驗</h4>
        ${unit.qa.map(qa => `
          <div class="qa-item">
            <div class="qa-q">Q: ${qa.q}</div>
            <div class="qa-a">A: ${qa.a}</div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// 渲染單元內對應站點的實境相片專區
function renderUnitPhotosSection(unit) {
  if (!unit.photos || unit.photos.length === 0) return '';
  const st = unit.stations && unit.stations[0] ? unit.stations[0] : null;
  const stName = st ? st.name : '本站現場紀實';
  const timeRange = st ? st.timeRange : '';

  return `
    <div class="unit-section-title">
      <h3><span>📸</span> 現場實境精彩紀實 · ${stName}</h3>
      <span class="section-indicator">共 ${unit.photos.length} 張現場實拍相片 ${timeRange ? `(${timeRange})` : ''}</span>
    </div>
    <div class="deck-toolbar" style="margin-bottom:16px;">
      <div class="deck-counter" style="color:var(--text-main); font-weight:700;">
        <span>📍 ${st ? st.name : unit.tabName}</span>
        <span style="color:var(--text-muted); font-size:0.85rem; margin-left:8px;">${st ? st.description : ''}</span>
      </div>
      <div class="deck-actions">
        <button class="btn-deck" onclick="startUnitSlideshow('${unit.id}')">
          <span>▶️</span> 輪播本站實境相片 (${unit.photos.length})
        </button>
        <button class="btn-deck" onclick="viewStationInGallery('${st ? st.id : ''}')">
          <span>🧭</span> 在實境時光廊檢視 ↗
        </button>
      </div>
    </div>
    <div class="unit-photos-grid">
      ${unit.photos.map((p, idx) => `
        <div class="photo-card" onclick="openLightboxFromList('${unit.id}', ${idx})">
          <div class="photo-img-wrap">
            <img src="${p.src}" alt="${p.title}" loading="lazy">
            <div class="photo-badge-bar">
              <span class="badge-photo-station">${p.stationName}</span>
              <span class="badge-photo-time">${p.time}</span>
            </div>
          </div>
          <div class="photo-card-body">
            <div class="photo-card-title">
              <span>${p.title}</span>
              <span style="font-size:0.75rem; color:var(--text-light); font-family:var(--font-mono);">#${idx+1}</span>
            </div>
            <p class="photo-card-desc">${p.caption}</p>
            <div class="photo-card-footer">
              <span>${p.fileName}</span>
              <span class="photo-zoom-hint">🔍 點擊高清放大</span>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

/* ==========================================================================
   實境時光廊 Photo Gallery 模組
   ========================================================================== */
function renderGalleryTab() {
  if (typeof GALLERY_STATIONS === 'undefined' || typeof GALLERY_PHOTOS === 'undefined') return;

  renderStationFilterButtons();
  renderStationBanner();
  renderGalleryPhotos();
}

function renderStationFilterButtons() {
  const container = document.getElementById('gallery-stations-filter');
  if (!container || typeof GALLERY_STATIONS === 'undefined') return;

  // Group stations by Day
  const dayGroups = {
    '全部': [{ id: 'all', name: '全部站點', count: GALLERY_PHOTOS.length, icon: '🌟' }],
    'Day 0 行前整備': [],
    'Day 1 田寮與墾丁': [],
    'Day 2 義大世界': [],
    'Day 3 賦歸返校': []
  };

  GALLERY_STATIONS.forEach(st => {
    if (st.day === 'Day 0') dayGroups['Day 0 行前整備'].push(st);
    else if (st.day === 'Day 1') dayGroups['Day 1 田寮與墾丁'].push(st);
    else if (st.day === 'Day 2') dayGroups['Day 2 義大世界'].push(st);
    else if (st.day === 'Day 3') dayGroups['Day 3 賦歸返校'].push(st);
  });

  let html = '';
  for (const [groupName, stations] of Object.entries(dayGroups)) {
    if (stations.length === 0) continue;
    html += `
      <div class="filter-day-group">
        <span class="filter-day-label">${groupName}</span>
        ${stations.map(st => {
          const isActive = AppState.galleryFilter === st.id;
          const count = st.photoCount !== undefined ? st.photoCount : st.count;
          const label = st.id === 'all' ? st.name : `${st.stationIndex ? `站 ${String(st.stationIndex).padStart(2,'0')} · ` : ''}${st.name}`;
          return `
            <button class="btn-station-filter ${isActive ? 'active' : ''}" onclick="setGalleryFilter('${st.id}')">
              <span>${st.icon || '📍'}</span>
              <span>${label}</span>
              <span class="btn-station-badge">${count}</span>
            </button>
          `;
        }).join('')}
      </div>
    `;
  }

  container.innerHTML = html;
}

function renderStationBanner() {
  const banner = document.getElementById('gallery-station-banner');
  const countIndicator = document.getElementById('gallery-current-count-indicator');
  if (!banner || typeof GALLERY_STATIONS === 'undefined') return;

  if (AppState.galleryFilter === 'all') {
    if (countIndicator) countIndicator.innerText = `共 ${GALLERY_PHOTOS.length} 張現場相片 · 14 個分站全集`;
    banner.innerHTML = `
      <div class="station-banner-info">
        <h3><span>🌟</span> 畢旅三天二夜 14 站現場紀實相簿總覽</h3>
        <p>
          從 10/20 行前會、10/21 出發、田寮惡地、海生館、貓鼻頭、墾丁大街夜市、福華大飯店，到 10/22 義大遊樂世界、天悅飯店夜巡，以及 10/23 回程平安解散，全歷程 392 張現場寫真完整展現！
        </p>
        <div class="station-banner-meta">
          <span class="badge-date">🕒 115.10.20 ～ 10.23</span>
          <span class="badge-tag">全校 178 位同學與師長</span>
          <span class="badge-date" style="color:var(--primary); font-weight:700;">📸 392 張相片</span>
        </div>
      </div>
      <div class="station-banner-actions">
        <button class="btn-deck btn-gallery-primary" onclick="startGlobalSlideshow()">
          <span>▶️</span> 輪播全部 392 張相片
        </button>
      </div>
    `;
  } else {
    const st = GALLERY_STATIONS.find(s => s.id === AppState.galleryFilter);
    if (!st) return;

    if (countIndicator) countIndicator.innerText = `站點 ${st.stationIndex}：${st.name} · 共 ${st.photoCount} 張相片`;
    banner.innerHTML = `
      <div class="station-banner-info">
        <h3>
          <span>📍</span>
          <span>第 ${String(st.stationIndex).padStart(2, '0')} 站 · ${st.name}</span>
          <span class="badge-tag" style="font-size:0.75rem;">${st.day} · ${st.tag}</span>
        </h3>
        <p>${st.description}</p>
        <div class="station-banner-meta">
          <span class="badge-date">📅 日期：${st.date}</span>
          <span class="badge-date">🕒 現場時間：${st.timeRange || '實錄'}</span>
          <span class="badge-date" style="color:var(--secondary); font-weight:700;">📸 ${st.photoCount} 張實拍照片</span>
          <span class="badge-tag" style="cursor:pointer;" onclick="switchTab('tab-${st.unitId}')">📖 對應：${st.unitTitle} ↗</span>
        </div>
      </div>
      <div class="station-banner-actions">
        <button class="btn-deck btn-gallery-primary" onclick="startSlideshowByStation('${st.id}')">
          <span>▶️</span> 輪播本站相片 (${st.photoCount})
        </button>
        <button class="btn-deck" onclick="switchTab('tab-${st.unitId}')">
          <span>📑</span> 查看單元教材 ↗
        </button>
      </div>
    `;
  }
}

function renderGalleryPhotos() {
  const container = document.getElementById('gallery-photos-container');
  if (!container || typeof GALLERY_PHOTOS === 'undefined') return;

  const filtered = AppState.galleryFilter === 'all'
    ? GALLERY_PHOTOS
    : GALLERY_PHOTOS.filter(p => p.stationId === AppState.galleryFilter);

  // Apply layout mode
  if (AppState.galleryView === 'grid') {
    container.classList.add('view-grid');
  } else {
    container.classList.remove('view-grid');
  }

  container.innerHTML = filtered.map((p, idx) => `
    <div class="photo-card" onclick="openLightboxFromGallery(${idx})">
      <div class="photo-img-wrap">
        <img src="${p.src}" alt="${p.title}" loading="lazy">
        <div class="photo-badge-bar">
          <span class="badge-photo-station">${p.stationName}</span>
          <span class="badge-photo-time">${p.time}</span>
        </div>
      </div>
      <div class="photo-card-body">
        <div class="photo-card-title">
          <span>${p.title}</span>
          <span style="font-size:0.75rem; color:var(--text-light); font-family:var(--font-mono);">#${p.fileName.match(/\\d+/)?.[0] || (idx+1)}</span>
        </div>
        <p class="photo-card-desc">${p.caption}</p>
        <div class="photo-card-footer">
          <span>${p.fileName}</span>
          <span class="photo-zoom-hint">🔍 點擊高清放大</span>
        </div>
      </div>
    </div>
  `).join('');
}

window.setGalleryFilter = function(filterId) {
  AppState.galleryFilter = filterId;
  renderStationFilterButtons();
  renderStationBanner();
  renderGalleryPhotos();
};

window.setGalleryViewMode = function(mode) {
  AppState.galleryView = mode;
  const btnMasonry = document.getElementById('btn-view-masonry');
  const btnGrid = document.getElementById('btn-view-grid');
  if (btnMasonry && btnGrid) {
    if (mode === 'masonry') {
      btnMasonry.classList.add('active');
      btnGrid.classList.remove('active');
    } else {
      btnMasonry.classList.remove('active');
      btnGrid.classList.add('active');
    }
  }
  renderGalleryPhotos();
};

window.viewStationInGallery = function(stationId) {
  switchTab('tab-gallery');
  if (stationId) {
    setGalleryFilter(stationId);
  }
  setTimeout(() => {
    const banner = document.getElementById('gallery-station-banner');
    if (banner) banner.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 100);
};

window.startGlobalSlideshow = function() {
  if (typeof GALLERY_PHOTOS === 'undefined' || GALLERY_PHOTOS.length === 0) return;
  startSlideshow(GALLERY_PHOTOS, 0);
};

window.startSlideshowByStation = function(stationId) {
  const filtered = GALLERY_PHOTOS.filter(p => p.stationId === stationId);
  if (filtered.length > 0) {
    startSlideshow(filtered, 0);
  }
};

window.startUnitSlideshow = function(unitId) {
  const unit = UNITS_DATA.find(u => u.id === unitId);
  if (unit && unit.photos && unit.photos.length > 0) {
    startSlideshow(unit.photos, 0);
  }
};

window.playRandomPhoto = function() {
  if (typeof GALLERY_PHOTOS === 'undefined' || GALLERY_PHOTOS.length === 0) return;
  const rnd = Math.floor(Math.random() * GALLERY_PHOTOS.length);
  openLightboxPhoto(GALLERY_PHOTOS, rnd);
};

window.openLightboxFromGallery = function(index) {
  const filtered = AppState.galleryFilter === 'all'
    ? GALLERY_PHOTOS
    : GALLERY_PHOTOS.filter(p => p.stationId === AppState.galleryFilter);
  openLightboxPhoto(filtered, index);
};

window.openLightboxFromList = function(unitId, index) {
  const unit = UNITS_DATA.find(u => u.id === unitId);
  if (unit && unit.photos && unit.photos.length > 0) {
    openLightboxPhoto(unit.photos, index);
  }
};

/* ==========================================================================
   班級相簿渲染 Class Albums Section (301 ~ 309 全校 9 班 · 908 張相片)
   ========================================================================== */
function renderClassAlbumsSection() {
  if (typeof CLASS_ALBUMS === 'undefined') return;

  renderClassFilterButtons();
  renderCurrentClassAlbum();
}

function renderClassFilterButtons() {
  const filterContainer = document.getElementById('class-albums-filter');
  if (!filterContainer || typeof CLASS_ALBUMS === 'undefined') return;

  const curClassId = AppState.classAlbumFilter || '301';

  filterContainer.innerHTML = CLASS_ALBUMS.map(album => {
    const isActive = album.classId === curClassId;
    return `
      <button class="class-filter-btn ${isActive ? 'active' : ''}" onclick="selectClassAlbum('${album.classId}')">
        <span>🏫 ${album.className}</span>
        <span class="class-count-badge">${album.photoCount} 張</span>
      </button>
    `;
  }).join('');
}

window.selectClassAlbum = function(classId) {
  AppState.classAlbumFilter = classId;
  renderClassFilterButtons();
  renderCurrentClassAlbum();
};

function renderCurrentClassAlbum() {
  const banner = document.getElementById('class-album-banner');
  const photosContainer = document.getElementById('class-photos-container');
  const countIndicator = document.getElementById('class-albums-count-indicator');
  if (!banner || !photosContainer || typeof CLASS_ALBUMS === 'undefined') return;

  const curClassId = AppState.classAlbumFilter || '301';
  const album = CLASS_ALBUMS.find(a => a.classId === curClassId) || CLASS_ALBUMS[0];
  if (!album) return;

  if (countIndicator) {
    countIndicator.innerText = `${album.className} · 共 ${album.photoCount} 張相片`;
  }

  // 渲染班級橫幅資訊
  banner.innerHTML = `
    <div class="class-album-banner-header">
      <div>
        <h3 class="class-album-banner-title">
          <span>🎓</span> ${album.className} 畢旅相簿
        </h3>
        <div class="class-meta-tags-row">
          <span class="badge-tag">隨車 第 ${album.bus} 車</span>
          <span class="badge-tag" style="background:rgba(37, 99, 235, 0.1); color:var(--primary);">👨‍🏫 隨車導師：${album.mentor}</span>
          <span class="badge-date">👥 學生編制：${album.detail}</span>
          <span class="badge-date" style="color:var(--secondary); font-weight:700;">📸 收錄相片：${album.photoCount} 張</span>
        </div>
      </div>
      <div class="class-banner-actions">
        <a href="${album.padletUrl}" target="_blank" rel="noopener noreferrer" class="btn-deck" style="text-decoration:none; background:rgba(37, 99, 235, 0.08); color:var(--primary); font-weight:700; border:1px solid rgba(37, 99, 235, 0.25); padding:8px 14px; border-radius:8px;">
          📥 前往 Padlet 下載高畫質原檔 / 上傳 ↗
        </a>
      </div>
    </div>
    <p class="class-album-desc-text">${album.description}</p>
  `;

  // 設置視圖模式 (masonry 或 grid)
  const isGrid = AppState.classGalleryView === 'grid';
  photosContainer.className = isGrid ? 'photos-masonry-grid view-grid-mode' : 'photos-masonry-grid';

  // 渲染相片網格
  photosContainer.innerHTML = album.photos.map((p, idx) => `
    <div class="photo-card" onclick="openLightboxFromClass(${idx})">
      <div class="photo-img-wrap" style="aspect-ratio: ${p.aspectRatio};">
        <img src="${p.src}" alt="${p.title}" loading="lazy">
        <span class="photo-card-badge">${p.className}</span>
        ${p.time ? `<span class="photo-time-pill">${p.time.split(' ')[-1]}</span>` : ''}
      </div>
      <div class="photo-info-body">
        <div class="photo-card-title">${p.title}</div>
        <div class="photo-card-desc">${p.caption}</div>
      </div>
    </div>
  `).join('');
}

window.openLightboxFromClass = function(index) {
  if (typeof CLASS_ALBUMS === 'undefined') return;
  const curClassId = AppState.classAlbumFilter || '301';
  const album = CLASS_ALBUMS.find(a => a.classId === curClassId);
  if (album && album.photos && album.photos.length > 0) {
    openLightboxPhoto(album.photos, index);
  }
};

window.startClassSlideshow = function() {
  if (typeof CLASS_ALBUMS === 'undefined') return;
  const curClassId = AppState.classAlbumFilter || '301';
  const album = CLASS_ALBUMS.find(a => a.classId === curClassId);
  if (album && album.photos && album.photos.length > 0) {
    startSlideshow(album.photos, 0);
  }
};

window.playRandomClassPhoto = function() {
  if (typeof CLASS_ALBUMS === 'undefined') return;
  const curClassId = AppState.classAlbumFilter || '301';
  const album = CLASS_ALBUMS.find(a => a.classId === curClassId);
  if (album && album.photos && album.photos.length > 0) {
    const rnd = Math.floor(Math.random() * album.photos.length);
    openLightboxPhoto(album.photos, rnd);
  }
};

window.setClassGalleryViewMode = function(mode) {
  AppState.classGalleryView = mode;
  const btnMasonry = document.getElementById('btn-class-view-masonry');
  const btnGrid = document.getElementById('btn-class-view-grid');
  if (btnMasonry && btnGrid) {
    if (mode === 'masonry') {
      btnMasonry.classList.add('active');
      btnGrid.classList.remove('active');
    } else {
      btnMasonry.classList.remove('active');
      btnGrid.classList.add('active');
    }
  }
  renderCurrentClassAlbum();
};

window.switchToClassAlbum = function(classId) {
  switchTab('tab-class-albums');
  selectClassAlbum(classId);
};

/* ==========================================================================
   真實相片下載專區渲染 Photo Download Section (Padlet Full 9 Classes)
   ========================================================================== */
function renderPhotoDownloadSection() {
  const container = document.getElementById('photo-downloads-full-grid');
  if (!container || typeof CLASS_ALBUMS === 'undefined') return;

  container.innerHTML = CLASS_ALBUMS.map((album, idx) => {
    return `
      <div class="download-full-card">
        <div>
          <div class="download-card-header">
            <h4 class="download-card-title">
              <span>🏫</span> ${album.className}
            </h4>
            <span class="badge-tag">隨車 第 ${album.bus} 車</span>
          </div>
          <div class="download-card-meta">
            <div>👨‍🏫 隨車導師：<strong style="color:var(--text-main);">${album.mentor}</strong></div>
            <div>👥 班級編制：${album.detail}</div>
            <div>📸 站內相片：<strong>${album.photoCount} 張</strong></div>
          </div>
          <p style="font-size:0.85rem; color:var(--text-muted); margin: 0 0 16px 0; line-height: 1.5;">
            ${album.description}
          </p>
        </div>
        <div class="download-card-actions">
          <a href="${album.padletUrl}" target="_blank" rel="noopener noreferrer" class="btn-deck" style="text-align:center; text-decoration:none; display:block; background:var(--primary); color:#ffffff; font-weight:700; border:none; padding:10px 14px; border-radius:8px; box-shadow:0 2px 8px rgba(37,99,235,0.25);">
            📥 前往 ${album.className} Padlet 下載原圖 / 上傳 ↗
          </a>
          <button class="btn-deck" onclick="switchToClassAlbum('${album.classId}')" style="width:100%; text-align:center; background:linear-gradient(135deg, #f59e0b, #ea580c); color:#ffffff; border:none; font-weight:700; padding:10px 14px; border-radius:8px; cursor:pointer;">
            🎓 在本站直接瀏覽 ${album.className} 相簿 (${album.photoCount}張)
          </button>
        </div>
      </div>
    `;
  }).join('');
}

/* ==========================================================================
   升級版大圖燈箱與全螢幕自動輪播器 (Lightbox & Slideshow Engine)
   ========================================================================== */
function initLightbox() {
  const modal = document.getElementById('lightbox-modal');
  if (!modal) return;

  modal.addEventListener('click', (e) => {
    // 點擊空白背景關閉 (避免點擊 controls/img 時關閉)
    if (e.target === modal || e.target.id === 'lightbox-img-wrap') {
      closeLightbox();
    }
  });
}

window.openLightboxPhoto = function(photoList, index) {
  if (!photoList || photoList.length === 0) return;

  AppState.activePhotoList = photoList;
  AppState.activePhotoIndex = Math.max(0, Math.min(index, photoList.length - 1));

  updateLightboxUI();

  const modal = document.getElementById('lightbox-modal');
  if (modal) modal.classList.add('active');
};

function updateLightboxUI() {
  const list = AppState.activePhotoList;
  const idx = AppState.activePhotoIndex;
  if (!list || list.length === 0 || !list[idx]) return;

  const p = list[idx];

  const img = document.getElementById('lightbox-img');
  const tag = document.getElementById('lightbox-station-tag');
  const title = document.getElementById('lightbox-photo-title');
  const counter = document.getElementById('lightbox-counter');
  const timeText = document.getElementById('lightbox-time-text');
  const stationText = document.getElementById('lightbox-station-text');
  const captionText = document.getElementById('lightbox-caption-text');
  const prevBtn = document.getElementById('lightbox-btn-prev');
  const nextBtn = document.getElementById('lightbox-btn-next');

  if (img) {
    img.style.opacity = '0.4';
    img.src = p.src;
    img.onload = () => { img.style.opacity = '1'; };
  }

  if (tag) tag.innerText = p.stationName || p.className || '實境紀實';
  if (title) title.innerText = p.title || p.fileName;
  if (counter) counter.innerText = `${idx + 1} / ${list.length}`;
  if (timeText) timeText.innerText = p.time ? `🕒 拍攝時間：${p.time}` : '🕒 拍攝時間：畢業旅行實況';
  if (stationText) {
    if (p.stationName) {
      stationText.innerText = `📍 所屬行程：${p.stationName} (${p.day || ''})`;
    } else if (p.className) {
      stationText.innerText = `🎓 所屬班級：${p.className}（隨車 第 ${p.bus} 車 · ${p.mentor || ''}）`;
    } else {
      stationText.innerText = '📍 畢業旅行紀實相片';
    }
  }
  if (captionText) captionText.innerText = p.caption || '';

  // 顯示或隱藏前後按鈕 (單張時隱藏)
  const isMultiple = list.length > 1;
  if (prevBtn) prevBtn.style.display = isMultiple ? 'flex' : 'none';
  if (nextBtn) nextBtn.style.display = isMultiple ? 'flex' : 'none';

  renderLightboxThumbsStrip();
}

function renderLightboxThumbsStrip() {
  const strip = document.getElementById('lightbox-thumbs-strip');
  const list = AppState.activePhotoList;
  const curIdx = AppState.activePhotoIndex;
  if (!strip || !list || list.length <= 1) {
    if (strip) strip.style.display = 'none';
    return;
  }

  strip.style.display = 'flex';
  strip.innerHTML = list.map((item, i) => `
    <div class="lightbox-thumb-item ${i === curIdx ? 'active' : ''}" onclick="jumpLightboxPhoto(${i})" title="${item.title}">
      <img src="${item.src}" alt="${item.title}" loading="lazy">
    </div>
  `).join('');

  // 自動捲動讓 active 縮圖居中
  const activeThumb = strip.children[curIdx];
  if (activeThumb) {
    activeThumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }
}

window.jumpLightboxPhoto = function(index) {
  AppState.activePhotoIndex = index;
  updateLightboxUI();
  if (AppState.slideshowPlaying) {
    restartSlideshowTimer();
  }
};

window.prevLightboxPhoto = function() {
  const list = AppState.activePhotoList;
  if (!list || list.length <= 1) return;
  AppState.activePhotoIndex = (AppState.activePhotoIndex - 1 + list.length) % list.length;
  updateLightboxUI();
  if (AppState.slideshowPlaying) {
    restartSlideshowTimer();
  }
};

window.nextLightboxPhoto = function() {
  const list = AppState.activePhotoList;
  if (!list || list.length <= 1) return;
  AppState.activePhotoIndex = (AppState.activePhotoIndex + 1) % list.length;
  updateLightboxUI();
  if (AppState.slideshowPlaying) {
    restartSlideshowTimer();
  }
};

window.startSlideshow = function(photoList, startIndex = 0) {
  if (photoList && photoList.length > 0) {
    AppState.activePhotoList = photoList;
    AppState.activePhotoIndex = startIndex;
  }
  AppState.slideshowPlaying = true;
  updateLightboxUI();

  const modal = document.getElementById('lightbox-modal');
  if (modal) modal.classList.add('active');

  updateSlideshowButtonState();
  restartSlideshowTimer();
};

window.stopSlideshow = function() {
  AppState.slideshowPlaying = false;
  if (AppState.slideshowTimer) {
    clearTimeout(AppState.slideshowTimer);
    AppState.slideshowTimer = null;
  }
  updateSlideshowButtonState();
  resetProgressBar();
};

window.toggleSlideshowPlay = function() {
  if (AppState.slideshowPlaying) {
    stopSlideshow();
  } else {
    startSlideshow(AppState.activePhotoList, AppState.activePhotoIndex);
  }
};

function updateSlideshowButtonState() {
  const icon = document.getElementById('lightbox-play-icon');
  const text = document.getElementById('lightbox-play-text');
  if (icon && text) {
    if (AppState.slideshowPlaying) {
      icon.innerText = '⏸️';
      text.innerText = '暫停輪播';
    } else {
      icon.innerText = '▶️';
      text.innerText = '自動輪播';
    }
  }
}

function restartSlideshowTimer() {
  if (AppState.slideshowTimer) clearTimeout(AppState.slideshowTimer);
  resetProgressBar();

  // 觸發進度條平滑動畫
  const bar = document.getElementById('lightbox-progress-bar');
  if (bar) {
    bar.style.transition = `width ${AppState.slideshowSpeed}ms linear`;
    requestAnimationFrame(() => {
      bar.style.width = '100%';
    });
  }

  AppState.slideshowTimer = setTimeout(() => {
    if (AppState.slideshowPlaying) {
      nextLightboxPhoto();
    }
  }, AppState.slideshowSpeed);
}

function resetProgressBar() {
  const bar = document.getElementById('lightbox-progress-bar');
  if (bar) {
    bar.style.transition = 'none';
    bar.style.width = '0%';
  }
}

window.setSlideshowSpeed = function(speedMs) {
  AppState.slideshowSpeed = parseInt(speedMs) || 3500;
  if (AppState.slideshowPlaying) {
    restartSlideshowTimer();
  }
};

window.toggleLightboxFullscreen = function() {
  const modal = document.getElementById('lightbox-modal');
  if (!modal) return;

  if (!document.fullscreenElement) {
    if (modal.requestFullscreen) modal.requestFullscreen().catch(() => {});
    else if (modal.webkitRequestFullscreen) modal.webkitRequestFullscreen().catch(() => {});
  } else {
    if (document.exitFullscreen) document.exitFullscreen().catch(() => {});
  }
};

window.closeLightbox = function() {
  stopSlideshow();
  const modal = document.getElementById('lightbox-modal');
  if (modal) modal.classList.remove('active');
  if (document.fullscreenElement) {
    document.exitFullscreen().catch(() => {});
  }
};

// 相容舊函式
window.openLightboxSingle = function(imgSrc, caption) {
  const singlePhoto = [{
    src: imgSrc,
    title: caption || '資訊圖表',
    stationName: '資訊圖表',
    time: '官方教材',
    day: '',
    caption: caption || ''
  }];
  openLightboxPhoto(singlePhoto, 0);
};

window.openLightboxFromDeck = function(unitId) {
  const unit = UNITS_DATA.find(u => u.id === unitId);
  if (!unit) return;
  const cur = AppState.unitsState[unitId].currentSlide;
  const deckList = unit.slides.map((s, i) => ({
    src: s,
    title: `${unit.title} · 投影片 ${i + 1} / 21`,
    stationName: unit.tabName,
    time: unit.date,
    day: '',
    caption: `第 ${i + 1} 頁教學簡報投影片內容。`
  }));
  openLightboxPhoto(deckList, cur);
};

/* ==========================================================================
   全域鍵盤導航 Global Keyboard Navigation
   ========================================================================== */
function initGlobalKeyboard() {
  document.addEventListener('keydown', (e) => {
    const modal = document.getElementById('lightbox-modal');
    const isLightboxActive = modal && modal.classList.contains('active');

    // ESC 關閉燈箱
    if (e.key === 'Escape') {
      if (isLightboxActive) {
        closeLightbox();
        return;
      }
    }

    // 若燈箱開啟，方向鍵切換照片，空白鍵暫停/播放，F 全螢幕
    if (isLightboxActive) {
      if (e.key === 'ArrowLeft') {
        prevLightboxPhoto();
        e.preventDefault();
      } else if (e.key === 'ArrowRight') {
        nextLightboxPhoto();
        e.preventDefault();
      } else if (e.key === ' ') {
        toggleSlideshowPlay();
        e.preventDefault();
      } else if (e.key === 'f' || e.key === 'F') {
        toggleLightboxFullscreen();
        e.preventDefault();
      }
      return;
    }

    // 若在單元頁面，支援方向鍵翻投影片
    if (AppState.currentTab.startsWith('tab-unit-')) {
      const unitId = AppState.currentTab.replace('tab-', '');
      if (e.key === 'ArrowLeft') {
        prevSlide(unitId);
      } else if (e.key === 'ArrowRight' || e.key === ' ') {
        nextSlide(unitId);
      }
    }
  });
}
