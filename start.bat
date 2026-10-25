@echo off
chcp 65001 >nul
echo ============================================================
echo   南投縣立南投國民中學 115學年度 畢業旅行行動多媒體導覽入口網
echo   100%% 本機離線支援 · 14 大單元投影片與影音全集
echo ============================================================
echo.
echo 正在啟動本機伺服器 http://localhost:8080 ...
start "" "http://localhost:8080"
python -m http.server 8080
if %ERRORLEVEL% NEQ 0 (
  echo Python 未安裝或啟動失敗，直接使用預設瀏覽器開啟 index.html...
  start "" "index.html"
)
pause
