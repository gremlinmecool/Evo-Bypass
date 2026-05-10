@echo off
echo ========================================
echo EVO BYPASS - 24/7 Launcher
echo ========================================
echo.

echo [1/4] Checking PM2...
where pm2 >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo PM2 not found. Installing...
    call npm install -g pm2
    call npm install -g pm2-windows-startup
    call pm2-startup install
) else (
    echo PM2 is already installed!
)

echo.
echo [2/4] Building backend...
cd backend
call npm run build
cd ..

echo.
echo [3/4] Starting with PM2...
call pm2 delete evo-bypass 2>nul
call pm2 start backend/dist/server.js --name evo-bypass
call pm2 save

echo.
echo [4/4] Done!
echo.
echo ========================================
echo Your app is now running 24/7!
echo ========================================
echo.
echo Backend: http://localhost:4000
echo Website: Open website/index.html
echo.
echo Commands:
echo   pm2 status          - Check status
echo   pm2 logs evo-bypass - View logs
echo   pm2 restart evo-bypass - Restart
echo   pm2 stop evo-bypass - Stop
echo.
pause
