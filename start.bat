@echo off
title Aetheris Server
echo.
echo  =====================================================
echo    Aetheris Stalker Pro 2.0  -  http://localhost:3000
echo  =====================================================
echo.
taskkill /f /im node.exe >nul 2>&1
cd /d "%~dp0"
node node_modules/tsx/dist/cli.mjs server.ts
pause
