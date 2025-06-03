# 🛒 Laptop Store - Complete E-commerce Platform

A full-stack e-commerce application featuring a FastAPI backend and React TypeScript frontend, designed specifically for teaching developers how to effectively use AI coding assistants like Cody. This comprehensive laptop store includes both laptops and computer mice, with advanced features like mixed cart functionality, order management, and authentication.

## 🎯 Project Purpose

This project serves as a **practical training platform** for developers learning to work with Cody. It provides real-world scenarios and comprehensive exercises that teach:

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

### Prerequisites
- **Python 3.8+** with pip
- **Node.js 16+** with npm
- **Git** for version control

### 1. Clone and Setup Backend
```bash
# Clone the repository
git clone <repository-url>
cd laptop-store

# Setup backend
cd backend
pip install -r requirements.txt

# Run backend server
python main.py
```
Backend will be available at `http://localhost:8000`

### 2. Setup Frontend
```bash
# In a new terminal, setup frontend
cd frontend
npm install

# Start development server
npm start
```
Frontend will be available at `http://localhost:3000`

### 3. Access the Application
- **Main App**: http://localhost:3000
- **Exercises**: http://localhost:3000/exercises
- **API Docs**: http://localhost:8000/docs
- **Backend Health**: http://localhost:8000

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

**Test Coverage**:
- ✅ Authentication endpoints
- ✅ Product endpoints (laptops & mice)
- ✅ Order management (create, read, update, delete)
- ✅ Mixed product order functionality
- ✅ Error handling and validation
- ✅ JWT token authentication

### Frontend Testing
```bash
cd frontend
npm test                 # Run tests in watch mode
npm run test:coverage    # Run with coverage report
```

## 🔧 Key Technical Features

### Advanced Cart System
- **Mixed Products**: Single cart supports both laptops and mice
- **Persistent State**: Cart survives browser refreshes and sessions
- **Smart Validation**: Stock quantity checking and quantity limits
- **Unified Checkout**: Single checkout flow for mixed product orders

### Authentication & Security
- **JWT Tokens**: Secure authentication with automatic refresh
- **Protected Routes**: Route-level security with redirect handling
- **Password Security**: bcrypt hashing with salt
- **Input Validation**: Comprehensive Pydantic validation on backend

### Modern React Patterns
- **TypeScript**: Full type safety throughout frontend
- **Context API**: Global state management for auth and cart
- **Custom Hooks**: Reusable logic extraction
- **Error Boundaries**: Graceful error handling
- **Responsive Design**: Mobile-first CSS with modern layouts

### FastAPI Best Practices
- **SOLID Principles**: Clean architecture with separation of concerns
- **Service Layer**: Business logic abstraction
- **Dependency Injection**: FastAPI DI for authentication
- **Auto-documentation**: OpenAPI/Swagger integration
- **Error Handling**: Consistent HTTP error responses

## 🌟 Sample Data

### Pre-configured Users
```
Username: john_doe     | Password: password123
Username: jane_smith   | Password: securepass456
```

### Sample Products
- **10 Latest Laptops**: MacBook Pro M4, Dell XPS 13, ThinkPad X1, etc.
- **12 Modern Mice**: MX Master 3S, DeathAdder V3, Rival 650, etc.
- **Realistic Pricing**: Market-accurate prices and specifications
- **Stock Management**: Varied stock quantities for testing
