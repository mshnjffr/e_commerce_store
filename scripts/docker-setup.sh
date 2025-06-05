#!/bin/bash

# Docker Setup Script for Laptop Store Application
# This script helps students get started with Docker quickly

set -e  # Exit on any error

echo "🐳 Setting up Laptop Store with Docker..."
echo ""

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first:"
    echo "   macOS: Download from https://docker.com/products/docker-desktop"
    echo "   Linux: sudo apt-get install docker.io docker-compose"
    exit 1
fi

# Check if Docker Compose is available
if ! command -v docker-compose &> /dev/null && ! docker compose version &> /dev/null; then
    echo "❌ Docker Compose is not available. Please install Docker Compose."
    exit 1
fi

# Function to check if using docker compose or docker-compose
get_compose_cmd() {
    if docker compose version &> /dev/null; then
        echo "docker compose"
    else
        echo "docker-compose"
    fi
}

COMPOSE_CMD=$(get_compose_cmd)

echo "✅ Docker and Docker Compose are installed"
echo ""

# Ask user what they want to do
echo "What would you like to do?"
echo "1) Start production build (optimized)"
echo "2) Start development build (with hot reload)"
echo "3) Stop all containers"
echo "4) Reset everything (remove containers and volumes)"
echo "5) View logs"
echo ""
read -p "Enter your choice (1-5): " choice

case $choice in
    1)
        echo "🚀 Starting production build..."
        $COMPOSE_CMD -f docker-compose.yml up --build -d
        echo ""
        echo "✅ Application started!"
        echo "   Frontend: http://localhost:3000"
        echo "   Backend API: http://localhost:8000"
        echo "   API Docs: http://localhost:8000/docs"
        ;;
    2)
        echo "🔧 Starting development build..."
        $COMPOSE_CMD -f docker-compose.dev.yml up --build
        ;;
    3)
        echo "🛑 Stopping all containers..."
        $COMPOSE_CMD -f docker-compose.yml down
        $COMPOSE_CMD -f docker-compose.dev.yml down
        echo "✅ All containers stopped"
        ;;
    4)
        echo "🗑️  Removing all containers and volumes..."
        $COMPOSE_CMD -f docker-compose.yml down -v --remove-orphans
        $COMPOSE_CMD -f docker-compose.dev.yml down -v --remove-orphans
        docker system prune -f
        echo "✅ Everything cleaned up"
        ;;
    5)
        echo "📋 Container logs:"
        $COMPOSE_CMD -f docker-compose.yml logs -f
        ;;
    *)
        echo "❌ Invalid choice. Please run the script again."
        exit 1
        ;;
esac

echo ""
echo "💡 Useful commands:"
echo "   View logs: $COMPOSE_CMD logs -f"
echo "   Stop: $COMPOSE_CMD down"
echo "   Restart: $COMPOSE_CMD restart"
echo "   Access backend shell: $COMPOSE_CMD exec backend bash"
echo "   Run tests: $COMPOSE_CMD exec backend pytest"
