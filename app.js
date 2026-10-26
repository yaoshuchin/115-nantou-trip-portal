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
  unitsState: {}, // 紀錄各單元簡報當前投影片頁碼 { 'unit-01': 0, ... }
  packingState: JSON.parse(localStorage.getItem('ntjh_packing') || '{}'),
  lightboxImages: [],
  lightboxIndex: 0
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
  renderAllUnits();
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
  if (!tabsScroll || typeof UNITS_DATA === 'undefined') return;

  let html = `
    <button class="tab-btn active" data-tab="tab-handbook">
      <span>🏠 手冊核心</span>
      <span class="tab-badge-indicator">PDF</span>
    </button>
  `;

  UNITS_DATA.forEach((unit, idx) => {
    const num = String(idx + 1).padStart(2, '0');
    const hasVideo = unit.videoCount > 0 ? '🎬' : '';
    html += `
      <button class="tab-btn" data-tab="tab-${unit.id}">
        <span>${num}. ${unit.tabName}</span>
        ${hasVideo ? `<span class="tab-badge-indicator">${hasVideo}</span>` : ''}
      </button>
    `;
  });

  tabsScroll.innerHTML = html;

  // 綁定點擊切換事件
  tabsScroll.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');
      switchTab(targetTab);
    });
  });
}

function switchTab(tabId) {
  AppState.currentTab = tabId;

  // 更新標籤按鈕狀態
  document.querySelectorAll('.tab-btn').forEach(btn => {
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
        <a href="${p.padletUrl}" target="_blank" rel="noopener noreferrer" class="btn-deck" style="text-align:center; text-decoration:none; display:block; background:rgba(37, 99, 235, 0.08); color:var(--primary); font-weight:700; border:1px solid rgba(37, 99, 235, 0.25); padding:8px 12px; border-radius:8px;">
          📸 前往 ${p.className} 專屬 Padlet 相簿 ↗
        </a>
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
   14 個主題單元渲染 All Units Renderer
   ========================================================================== */
function renderAllUnits() {
  const panelsContainer = document.getElementById('units-panels-wrapper');
  if (!panelsContainer || typeof UNITS_DATA === 'undefined') return;

  let html = '';

  UNITS_DATA.forEach(unit => {
    html += `
      <section id="tab-${unit.id}" class="tab-panel">
        <!-- 單元橫幅 -->
        <div class="unit-hero">
          <div class="unit-meta-bar">
            <span class="badge-tag">${unit.tag}</span>
            <span class="badge-date">🕒 ${unit.date}</span>
            <span class="badge-date">📑 21 頁完整簡報</span>
            ${unit.videoCount > 0 ? `<span class="badge-date" style="color:var(--primary); font-weight:700;">🎬 ${unit.videoCount} 部影音導覽</span>` : ''}
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

        <!-- 單元重點講義與互動問答 -->
        ${renderUnitNotesSection(unit)}
      </section>
    `;
  });

  panelsContainer.innerHTML = html;

  // 綁定各單元投影片事件
  UNITS_DATA.forEach(unit => {
    bindDeckEvents(unit.id);
  });
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

/* ==========================================================================
   燈箱 Lightbox
   ========================================================================== */
function initLightbox() {
  const modal = document.getElementById('lightbox-modal');
  if (!modal) return;

  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.classList.contains('lightbox-img-wrap')) {
      closeLightbox();
    }
  });

  const closeBtn = document.getElementById('lightbox-close-btn');
  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
}

window.openLightboxSingle = function(imgSrc, caption) {
  const modal = document.getElementById('lightbox-modal');
  const img = document.getElementById('lightbox-img');
  const cap = document.getElementById('lightbox-caption');
  if (!modal || !img) return;

  img.src = imgSrc;
  if (cap) cap.innerText = caption || '';
  modal.classList.add('active');
};

window.openLightboxFromDeck = function(unitId) {
  const unit = UNITS_DATA.find(u => u.id === unitId);
  if (!unit) return;
  const cur = AppState.unitsState[unitId].currentSlide;
  openLightboxSingle(unit.slides[cur], `${unit.title} · 投影片 ${cur + 1}`);
};

function closeLightbox() {
  const modal = document.getElementById('lightbox-modal');
  if (modal) modal.classList.remove('active');
}

/* ==========================================================================
   全域鍵盤導航 Global Keyboard Navigation
   ========================================================================== */
function initGlobalKeyboard() {
  document.addEventListener('keydown', (e) => {
    // ESC 關閉燈箱
    if (e.key === 'Escape') {
      closeLightbox();
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
