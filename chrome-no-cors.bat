@echo off
echo Chrome을 CORS 비활성화 모드로 실행합니다...
echo 이 창을 닫지 마세요!
echo.
start chrome.exe --user-data-dir="C:/Chrome dev session" --disable-web-security --disable-site-isolation-trials "http://127.0.0.1:8081/test-exchange-api.html"
