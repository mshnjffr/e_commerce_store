# 🛒 Laptop Store - Complete E-commerce Platform

A full-stack e-commerce application featuring a FastAPI backend and React TypeScript frontend, designed specifically for teaching developers how to effectively use AI coding assistants like Cody. This comprehensive laptop store includes both laptops and computer mice, with advanced features like mixed cart functionality, order management, and authentication.

## 🎯 Project Purpose

This project serves as a **practical training platform** for developers learning to work with Cody. It provides real-world scenarios.

## ✨ Features

### 🛍️ E-commerce Core
- **🏠 Homepage**: Hero section with featured products and navigation
- **💻 Product Catalog**: Browse laptops and computer mice with search, filtering, and sorting
- **🛒 Smart Shopping Cart**: 
  - Mixed product types (laptops + mice) in single cart
  - Quantity management with stock validation
  - Persistent cart state across sessions
  - Real-time cart count in navigation
- **🔐 User Authentication**: 
  - JWT-based secure authentication
  - User registration and login
  - Protected routes and automatic redirects
- **📦 Order Management**: 
  - Complete order history
  - Mixed product orders (laptops + mice)
  - Order status tracking
  - Order cancellation for pending orders

### 🎓 Learning Features
- **📚 Built-in Exercises**: 5 comprehensive Cody training exercises
- **🐛 Intentional Bugs**: Realistic debugging scenarios for learning
- **🎯 Progressive Difficulty**: From beginner React concepts to advanced API integration
- **💡 Best Practices**: Code demonstrates industry-standard patterns and practices

## 🏗️ Architecture

### Backend (FastAPI)
```
backend/
├── main.py              # FastAPI application with all endpoints
├── models.py            # Pydantic models for validation
├── services.py          # Business logic services
├── database.py          # Database management and sample data
├── auth.py              # JWT authentication utilities
├── config.py            # Application configuration
└── test_main.py         # Comprehensive test suite
```

### Frontend (React TypeScript)
```
frontend/
├── src/
│   ├── components/      # Reusable components
│   │   ├── Layout/      # Header, Footer, Layout
│   │   └── Laptop/      # LaptopCard, LaptopList
│   ├── contexts/        # React Context providers
│   │   ├── AuthContext.tsx    # Authentication state management
│   │   └── CartContext.tsx    # Shopping cart state management
│   ├── pages/           # Page components
│   │   ├── Home.tsx     # Landing page
│   │   ├── Laptops.tsx  # Laptop catalog
│   │   ├── Mice.tsx     # Computer mice catalog
│   │   ├── Cart.tsx     # Shopping cart and checkout
│   │   ├── Orders.tsx   # Order history
│   │   ├── Login.tsx    # Authentication forms
│   │   ├── Register.tsx
│   │   └── Exercises.tsx # AI assistant training exercises
│   ├── services/        # API integration
│   │   └── api.ts       # Axios-based API client
│   ├── types/           # TypeScript definitions
│   │   └── api.ts       # API response types
│   └── utils/           # Helper functions
│       └── format.ts    # Price formatting utilities
```

## 🚀 Quick Start

### 🐳 Option 1: Docker (Recommended - Solves All Dependency Issues)

**Prerequisites**: Docker Desktop installed

```bash
# Clone the repository
git clone <repository-url>
cd laptop-store

# Start the application with Docker
./scripts/docker-setup.sh
# Choose option 1 for production or option 2 for development

# Or manually:
docker-compose up --build -d
```

**Access the application**:
- **Main App**: http://localhost:3000
- **Exercises**: http://localhost:3000/exercises  
- **API Docs**: http://localhost:8000/docs
- **Backend Health**: http://localhost:8000

📖 **Detailed Docker Guide**: See [DOCKER.md](DOCKER.md) for complete setup instructions

### 🛠️ Option 2: Local Development

**Prerequisites**: Python 3.8+, Node.js 16+, Git

#### Backend Setup
```bash
cd backend

# Create virtual environment
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run backend server
python main.py
```

#### Frontend Setup
```bash
# In a new terminal
cd frontend
npm install
npm start
```

**Access the application**:
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:8000

## 🎓 AI Assistant Training Exercises

Navigate to `/exercises` to access 5 comprehensive training exercises:

### 1. 🔍 **Understanding the Codebase** (Beginner)
Learn to explore and understand application architecture using Cody
- Frontend React application structure
- FastAPI backend components
- Authentication flow analysis
- Shopping cart implementation
- Database schema exploration

### 2. 🐛 **Critical Bug Fix: Login Error Crash**
Debug and fix a realistic TypeScript runtime error
- **Current Issue**: App crashes when users enter wrong credentials
- **Error**: `Property 'message' does not exist on type 'string | {message: string}'`
- **Skills**: TypeScript debugging, type safety, defensive programming
- **Real Impact**: Breaks user experience and requires immediate fix

### 3. ❤️ **Simple Feature: Product Favorites** 
Add heart icon toggle functionality for saving favorite laptops
- React useState hook usage
- Event handlers and conditional rendering
- localStorage persistence
- Custom hooks creation
- Basic CSS positioning and styling

### 4. 🖱️ **Frontend Implementation: Computer Mice** 
Add complete computer mice functionality following laptop patterns
- TypeScript type definitions
- API service integration
- Component creation and reuse
- Page routing and navigation
- Shopping cart integration

### 5. 🔗 **API Integration: Order Cancellation** 
Implement order cancellation using existing DELETE endpoint
- API service method creation
- Confirmation modals and UX
- Error handling and loading states
- Conditional rendering based on order status

## 📊 Database Schema

### Products
- **Laptops**: 10 latest models (2024-2025) from major brands
  - Apple MacBook Pro M4, Dell XPS, Lenovo ThinkPad, HP Spectre, etc.
- **Mice**: 12 modern gaming and productivity mice
  - Logitech MX Master 3S, Razer DeathAdder V3, SteelSeries Rival, etc.

### Core Tables
- **users**: Authentication and user management
- **laptops**: Laptop product catalog
- **mice**: Computer mice product catalog  
- **orders**: Order tracking and management
- **order_items**: Mixed product order items (laptops + mice)

## 🔗 API Endpoints

### Public Endpoints
```
GET /                           # Health check
GET /api/v1/laptops            # All laptops
GET /api/v1/laptops/{id}       # Laptop details
GET /api/v1/mice               # All mice
GET /api/v1/mice/{id}          # Mouse details
POST /api/v1/users/register    # User registration
POST /api/v1/users/login       # User login
```

### Protected Endpoints (Requires JWT)
```
GET /api/v1/orders             # User's orders
POST /api/v1/orders            # Create order
GET /api/v1/orders/{id}        # Order details
PUT /api/v1/orders/{id}        # Update order
DELETE /api/v1/orders/{id}     # Cancel order (pending only)
```

## 🧪 Testing

### Backend Testing
```bash
cd backend
pytest                    # Run all tests
pytest --cov=.           # Run with coverage
pytest -v               # Verbose output
```


### Frontend Testing
```bash
cd frontend
npm test                 # Run tests in watch mode
npm run test:coverage    # Run with coverage report
```

## 🌟 Sample Data

### Pre-configured Users
```
Username: john_doe     | Password: password123
Username: jane_smith   | Password: securepass456
```


