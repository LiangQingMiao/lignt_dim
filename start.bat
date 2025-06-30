@echo off
echo 正在启动智能助手服务器...
echo.

REM 检查Node.js是否安装
node --version >nul 2>&1
if errorlevel 1 (
    echo 错误：未找到Node.js，请先安装Node.js
    echo 下载地址：https://nodejs.org/
    pause
    exit /b 1
)

REM 检查依赖是否安装
if not exist "node_modules" (
    echo 正在安装依赖...
    npm install
    if errorlevel 1 (
        echo 错误：依赖安装失败
        pause
        exit /b 1
    )
)

echo 启动WebSocket服务器...
echo 服务器地址：ws://192.168.5.12:8765
echo 按 Ctrl+C 停止服务器
echo.

npm start

pause 