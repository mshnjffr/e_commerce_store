# 🐳 Docker Setup for Laptop Store

Complete Docker setup for the Laptop Store application, solving dependency issues and providing a consistent development environment across all platforms.

## 🚀 Quick Start

### Option 1: Use the Setup Script (Recommended)
```bash
# Make script executable and run
chmod +x scripts/docker-setup.sh
./scripts/docker-setup.sh
```

### Option 2: Manual Docker Commands

#### Production Build (Optimized)
```bash
# Build and start all services
docker-compose up --build -d

# Access the application
# Frontend: http://localhost:3000
# Backend: http://localhost:8000
# API Docs: http://localhost:8000/docs
```

#### Development Build (Hot Reload)
```bash
# Start with hot reload for development
docker-compose -f docker-compose.dev.yml up --build
```

## 📋 Prerequisites

- **Docker Desktop** (macOS/Windows) or **Docker Engine** (Linux)
- **Docker Compose** (usually included with Docker Desktop)

### Install Docker

#### macOS
```bash
# Download from official site
# https://docker.com/products/docker-desktop

# Or use Homebrew
brew install --cask docker
```

#### Linux (Ubuntu/Debian)
```bash
sudo apt update
sudo apt install docker.io docker-compose
sudo usermod -aG docker $USER
# Log out and back in
```

#### Windows
Download Docker Desktop from https://docker.com/products/docker-desktop

## 🏗️ Architecture

### Services
- **Backend**: FastAPI application (Python 3.11)
- **Frontend**: React application served by Nginx
- **Network**: Custom bridge network for service communication
- **Volumes**: Persistent storage for database

### Ports
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs

## 🔧 Docker Commands

### Basic Operations
```bash
# Start services (detached)
docker-compose up -d

# Start with rebuild
docker-compose up --build

# Stop services
docker-compose down

# View logs
docker-compose logs -f

# View logs for specific service
docker-compose logs -f backend
docker-compose logs -f frontend
```

### Development Commands
```bash
# Start development environment
docker-compose -f docker-compose.dev.yml up

# Run tests in backend
docker-compose exec backend pytest

# Access backend shell
docker-compose exec backend bash

# Access frontend shell
docker-compose exec frontend sh
```

### Maintenance Commands
```bash
# Remove containers and volumes
docker-compose down -v

# Clean up everything
docker system prune -a

# Rebuild specific service
docker-compose build backend
docker-compose build frontend
```

## 📂 File Structure

```
laptop-store/
├── docker-compose.yml          # Production configuration
├── docker-compose.dev.yml      # Development configuration
├── scripts/
│   └── docker-setup.sh         # Setup automation script
├── backend/
│   ├── Dockerfile              # Production backend image
│   ├── Dockerfile.dev          # Development backend image
│   └── .dockerignore           # Backend ignore patterns
└── frontend/
    ├── Dockerfile              # Production frontend image
    ├── Dockerfile.dev          # Development frontend image
    ├── nginx.conf              # Nginx configuration
    └── .dockerignore           # Frontend ignore patterns
```

## 🔍 Troubleshooting

### Common Issues

#### Port Already in Use
```bash
# Check what's using the port
lsof -i :3000
lsof -i :8000

# Kill the process or use different ports
docker-compose down
```

#### Permission Denied (Linux)
```bash
# Add user to docker group
sudo usermod -aG docker $USER
# Log out and back in
```

#### Out of Disk Space
```bash
# Clean up Docker
docker system prune -a --volumes
```

#### Build Failures
```bash
# Clear Docker cache and rebuild
docker-compose build --no-cache
```

### Service-Specific Issues

#### Backend Won't Start
```bash
# Check backend logs
docker-compose logs backend

# Access backend container
docker-compose exec backend bash
```

#### Frontend Build Fails
```bash
# Check frontend logs
docker-compose logs frontend

# Clear node_modules and rebuild
docker-compose build --no-cache frontend
```

## 🎯 Development Workflow

### 1. Initial Setup
```bash
git clone <repository>
cd laptop-store
./scripts/docker-setup.sh
```

### 2. Development
```bash
# Start development environment
docker-compose -f docker-compose.dev.yml up

# Make code changes (hot reload will update automatically)
# Backend: Changes in backend/ trigger auto-reload
# Frontend: Changes in frontend/src trigger hot reload
```

### 3. Testing
```bash
# Run backend tests
docker-compose exec backend pytest

# Run frontend tests
docker-compose exec frontend npm test
```

### 4. Production Build
```bash
# Build production images
docker-compose build

# Start production services
docker-compose up -d
```

## 🌟 Benefits for Students

### ✅ Solved Problems
- **No Dependency Issues**: All dependencies are containerized
- **Consistent Environment**: Same setup on macOS, Windows, Linux
- **No Python/Node Version Conflicts**: Isolated environments
- **Easy Setup**: One command to start everything
- **Hot Reload**: Development-friendly with auto-refresh

### 🎓 Learning Benefits
- **Docker Skills**: Learn containerization
- **Production Setup**: See how apps are deployed
- **Microservices**: Understand service communication
- **DevOps Practices**: Docker Compose, networking, volumes

## 📝 Environment Variables

### Production
```bash
# In docker-compose.yml
REACT_APP_API_BASE_URL=http://localhost:8000
DATABASE_URL=laptop_store.db
```

### Development
```bash
# In docker-compose.dev.yml
CHOKIDAR_USEPOLLING=true  # For hot reload
RELOAD=true               # Backend auto-reload
```

## 🚀 Deployment

### Production Deployment
```bash
# Build production images
docker-compose build

# Push to registry (if needed)
docker tag laptop-store_backend your-registry/laptop-store-backend
docker tag laptop-store_frontend your-registry/laptop-store-frontend

# Deploy to production server
scp docker-compose.yml user@server:/app/
ssh user@server "cd /app && docker-compose up -d"
```

## 💡 Tips

1. **Use Development Compose** for coding with hot reload
2. **Use Production Compose** for testing final build
3. **Check Logs** if services don't start: `docker-compose logs`
4. **Clean Up Regularly** to save disk space: `docker system prune`
5. **Backup Database** volume before major changes

## 🆘 Getting Help

If you encounter issues:

1. **Check logs**: `docker-compose logs -f`
2. **Restart services**: `docker-compose restart`
3. **Clean rebuild**: `docker-compose build --no-cache`
4. **Check Docker status**: `docker ps` and `docker images`

---

**Happy Dockerizing! 🐳**
