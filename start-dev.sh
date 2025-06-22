#!/bin/bash

# E-commerce Store Development Startup Script (Mac/Linux)
# This script starts both backend and frontend servers with logging

set -e

echo "🚀 Starting E-commerce Store Development Environment..."

# Create logs directory
LOGS_DIR="logs"
if [ ! -d "$LOGS_DIR" ]; then
    mkdir "$LOGS_DIR"
    echo "📁 Created logs directory"
fi

# Get current timestamp for log files
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")

# Function to cleanup processes on exit
cleanup() {
    echo "🛑 Shutting down servers..."
    if [ ! -z "$BACKEND_PID" ]; then
        kill $BACKEND_PID 2>/dev/null || true
    fi
    if [ ! -z "$FRONTEND_PID" ]; then
        kill $FRONTEND_PID 2>/dev/null || true
    fi
    exit 0
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

# Start backend server
echo "🔧 Starting backend server (Spring Boot)..."
cd backend
mvn spring-boot:run > "../$LOGS_DIR/backend_$TIMESTAMP.log" 2>&1 &
BACKEND_PID=$!
cd ..
echo "✅ Backend server started (PID: $BACKEND_PID) - logs: $LOGS_DIR/backend_$TIMESTAMP.log"

# Wait a moment for backend to initialize
sleep 3

# Start frontend server
echo "🎨 Starting frontend server (React)..."
cd frontend
npm start > "../$LOGS_DIR/frontend_$TIMESTAMP.log" 2>&1 &
FRONTEND_PID=$!
cd ..
echo "✅ Frontend server started (PID: $FRONTEND_PID) - logs: $LOGS_DIR/frontend_$TIMESTAMP.log"

echo ""
echo "🌟 Development environment is running!"
echo "📱 Frontend: http://localhost:3000"
echo "🔌 Backend API: http://localhost:8000"
echo "📊 H2 Database Console: http://localhost:8000/h2-console"
echo "📝 Logs directory: $LOGS_DIR/"
echo ""
echo "Press Ctrl+C to stop both servers"

# Keep script running and wait for processes
wait $BACKEND_PID $FRONTEND_PID
