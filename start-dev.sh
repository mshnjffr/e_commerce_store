#!/usr/bin/env bash

# E-commerce Store Development Startup Script (Mac/Linux)
# This script starts both backend and frontend servers with logging

set -euo pipefail

# Ensure script runs from project root
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

echo "🚀 Starting E-commerce Store Development Environment..."

# Check prerequisites
check_prerequisites() {
    echo "🔍 Checking prerequisites..."
    
    # Check Node.js
    if ! command -v node &> /dev/null; then
        echo "❌ Node.js not found. Please install Node.js 16+ from https://nodejs.org/"
        exit 1
    fi
    
    # Check npm
    if ! command -v npm &> /dev/null; then
        echo "❌ npm not found. Please install npm"
        exit 1
    fi
    
    # Check Maven
    if ! command -v mvn &> /dev/null; then
        echo "❌ Maven not found. Please install Maven from https://maven.apache.org/"
        exit 1
    fi
    
    echo "✅ All prerequisites found"
}

# Install frontend dependencies
install_frontend_deps() {
    echo "📦 Installing frontend dependencies..."
    cd frontend
    
    if [ ! -d "node_modules" ]; then
        echo "🔄 Running npm install..."
        npm install
    elif [ -f "package-lock.json" ]; then
        echo "🔄 Running npm ci (faster with lockfile)..."
        npm ci
    else
        echo "✅ Dependencies already installed"
    fi
    
    cd ..
}

# Run prerequisite checks
check_prerequisites

# Create logs directory with absolute path
LOGS_DIR="$SCRIPT_DIR/logs"
if [ ! -d "$LOGS_DIR" ]; then
    mkdir "$LOGS_DIR"
    echo "📁 Created logs directory"
fi

# Get current timestamp for log files
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")

# Function to cleanup processes on exit
cleanup() {
    echo "🛑 Shutting down servers..."
    if [ ! -z "${BACKEND_PID:-}" ]; then
        kill -TERM -- -"${BACKEND_PID}" 2>/dev/null || true
    fi
    if [ ! -z "${FRONTEND_PID:-}" ]; then
        kill -TERM -- -"${FRONTEND_PID}" 2>/dev/null || true
    fi
}

# Set trap to cleanup on script exit
trap cleanup SIGINT SIGTERM EXIT

# Check if backend directory exists
if [ ! -d "backend" ]; then
    echo "❌ Backend directory not found. Make sure you're running this from the project root."
    exit 1
fi

# Check if frontend directory exists
if [ ! -d "frontend" ]; then
    echo "❌ Frontend directory not found. Make sure you're running this from the project root."
    exit 1
fi

# Install frontend dependencies
install_frontend_deps

# Start backend server
echo "🔧 Starting backend server (Spring Boot)..."
cd backend
mvn spring-boot:run -Dspring-boot.run.arguments="--server.port=8000" > "$LOGS_DIR/backend_$TIMESTAMP.log" 2>&1 &
BACKEND_PID=$!
cd ..
echo "✅ Backend server started (PID: $BACKEND_PID) - logs: $LOGS_DIR/backend_$TIMESTAMP.log"

# Wait a moment for backend to initialize
sleep 3

# Start frontend server
echo "🎨 Starting frontend server (React)..."
cd frontend

# Start frontend with better error handling
npm start > "$LOGS_DIR/frontend_$TIMESTAMP.log" 2>&1 &
FRONTEND_PID=$!

# Check if npm start command started successfully
if [ $? -ne 0 ]; then
    echo "❌ Failed to start frontend server"
    echo "📝 Check logs: $LOGS_DIR/frontend_$TIMESTAMP.log"
    echo "🔍 Last 10 lines of frontend log:"
    tail -n 10 "$LOGS_DIR/frontend_$TIMESTAMP.log" || echo "No log file found"
    exit 1
fi
cd ..
echo "✅ Frontend server started (PID: $FRONTEND_PID) - logs: $LOGS_DIR/frontend_$TIMESTAMP.log"

# Wait a moment and check if processes are still running
sleep 2
if ! kill -0 "$FRONTEND_PID" 2>/dev/null; then
    echo "❌ Frontend server failed to start"
    echo "📝 Check logs: $LOGS_DIR/frontend_$TIMESTAMP.log"
    echo "🔍 Last 10 lines of frontend log:"
    tail -n 10 "$LOGS_DIR/frontend_$TIMESTAMP.log" || echo "No log file found"
    exit 1
fi

if ! kill -0 "$BACKEND_PID" 2>/dev/null; then
    echo "❌ Backend server failed to start"
    echo "📝 Check logs: $LOGS_DIR/backend_$TIMESTAMP.log"
    echo "🔍 Last 10 lines of backend log:"
    tail -n 10 "$LOGS_DIR/backend_$TIMESTAMP.log" || echo "No log file found"
    exit 1
fi

echo ""
echo "🌟 Development environment is running!"
echo "📱 Frontend: http://localhost:3000"
echo "🔌 Backend API: http://localhost:8000"
echo "📊 H2 Database Console: http://localhost:8000/h2-console"
echo "📝 Logs directory: $LOGS_DIR/"
echo ""
echo "Press Ctrl+C to stop both servers"

# Keep script running and wait for processes
wait "$BACKEND_PID" "$FRONTEND_PID"
