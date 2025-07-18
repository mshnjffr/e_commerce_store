#!/bin/bash

# E-commerce Store Frontend-Only Startup Script (Mac/Linux)
# This script starts only the frontend server - useful for frontend development

set -e

echo "🎨 Starting Frontend Development Environment..."

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
    
    echo "✅ All prerequisites found"
}

# Function to cleanup processes on exit
cleanup() {
    echo "🛑 Shutting down frontend server..."
    exit 0
}

# Set trap to cleanup on script exit
trap cleanup SIGINT SIGTERM EXIT

# Run prerequisite checks
check_prerequisites

# Check if frontend directory exists
if [ ! -d "frontend" ]; then
    echo "❌ Frontend directory not found. Make sure you're running this from the project root."
    exit 1
fi

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd frontend

if [ ! -d "node_modules" ] || [ ! -f "package-lock.json" ]; then
    echo "🔄 Running npm install..."
    npm install
else
    echo "✅ Dependencies already installed"
fi

# Start frontend server
echo "🎨 Starting React development server..."
npm start

echo ""
echo "🌟 Frontend development server is running!"
echo "📱 Frontend: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop the server"
