@echo off
setlocal enabledelayedexpansion

REM E-commerce Store Development Startup Script (Windows)
REM This script starts both backend and frontend servers with logging

echo 🚀 Starting E-commerce Store Development Environment...

REM Create logs directory
if not exist "logs" (
    mkdir logs
    echo 📁 Created logs directory
)

REM Get current timestamp for log files
for /f "tokens=2 delims==" %%a in ('wmic OS Get localdatetime /value') do set "dt=%%a"
set "TIMESTAMP=%dt:~0,4%%dt:~4,2%%dt:~6,2%_%dt:~8,2%%dt:~10,2%%dt:~12,2%"

REM Check if backend directory exists
if not exist "backend" (
    echo ❌ Backend directory not found. Make sure you're running this from the project root.
    pause
    exit /b 1
)

REM Check if frontend directory exists
if not exist "frontend" (
    echo ❌ Frontend directory not found. Make sure you're running this from the project root.
    pause
    exit /b 1
)

REM Start backend server
echo 🔧 Starting backend server (Spring Boot)...
start "Backend Server" /D backend cmd /c "mvn spring-boot:run > ../logs/backend_%TIMESTAMP%.log 2>&1"
echo ✅ Backend server started - logs: logs/backend_%TIMESTAMP%.log

REM Wait a moment for backend to initialize
timeout /t 5 /nobreak > nul

REM Start frontend server
echo 🎨 Starting frontend server (React)...
start "Frontend Server" /D frontend cmd /c "npm start > ../logs/frontend_%TIMESTAMP%.log 2>&1"
echo ✅ Frontend server started - logs: logs/frontend_%TIMESTAMP%.log

echo.
echo 🌟 Development environment is running!
echo 📱 Frontend: http://localhost:3000
echo 🔌 Backend API: http://localhost:8000
echo 📊 H2 Database Console: http://localhost:8000/h2-console
echo 📝 Logs directory: logs/
echo.
echo Both servers are running in separate windows.
echo Close the terminal windows to stop the servers.
echo.
pause
