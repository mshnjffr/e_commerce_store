# 🛒 Laptop Store - Complete E-commerce Platform

A full-stack e-commerce application featuring a Java Spring Boot backend and React TypeScript frontend, designed specifically for teaching developers how to effectively use AI coding assistants like Cody. This comprehensive laptop store includes both laptops and computer mice, with advanced features like mixed cart functionality, order management, and authentication.

## 🎯 Project Purpose

This project serves as a **practical training platform** for developers learning to work with AI coding assistants. It provides real-world scenarios and comprehensive exercises that teach:

- 🤖 **AI Assistant Integration**: How to effectively use Cody for code generation, debugging, and refactoring
- 🔧 **Hands-on Exercises**: 5 progressive exercises covering beginner to advanced scenarios
- 🏗️ **Production-ready Patterns**: Best practices for full-stack development with React and FastAPI
- 🐛 **Realistic Debugging**: Intentional bugs and challenges that mirror real development issues

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

### Backend (Java Spring Boot)
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
Add heart icon toggle functionality for saving favorite laptops using modern AI-assisted development
- React useState hook and custom hook patterns
- Event handlers and conditional rendering with TypeScript
- localStorage persistence with error handling
- Component composition and reusability
- Modern CSS positioning and interactive animations

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

---

## 📚 **Exercise 3: Product Favorites Feature - Modern AI-Assisted Development**

### 🎯 **Learning Objectives**
By completing this exercise, you'll learn to:
- Use AI assistants for systematic React development
- Apply modern prompting techniques for code generation
- Implement custom React hooks with TypeScript
- Handle localStorage with proper error handling
- Create smooth user interactions with CSS animations

### 🔍 **Current Component Analysis**

**Your Current LaptopCard Component (`frontend/src/components/Laptop/LaptopCard.tsx`)**:
- ✅ Uses modern React patterns with hooks
- ✅ Proper TypeScript interfaces
- ✅ Cart integration with `addToCart(laptop, 'laptop', 1)`
- ✅ Stock validation and loading states
- ✅ Clean component structure with separated concerns

**File Paths Verified**:
- ✅ `frontend/src/components/Laptop/LaptopCard.tsx` - Main component
- ✅ `frontend/src/components/Layout/Header.tsx` - Navigation
- ✅ `frontend/src/App.tsx` - Routing configuration
- ✅ Java Spring Boot backend running on port 8080

### 🤖 **Modern AI Prompting Techniques**

#### **1. Chain-of-Thought Development**
Use this systematic approach with your AI assistant:

```
**Prompt Template:**
"I need to add a favorites feature to my React laptop store. Let me break this down step by step:

1. First, analyze my current LaptopCard component structure
2. Then, design a custom hook for favorites management
3. Next, implement the UI with proper TypeScript types
4. Finally, add smooth animations and error handling

Here's my current component: [paste LaptopCard.tsx]

Can you help me plan the implementation step by step?"
```

#### **2. Role-Based Prompting**
Frame your AI assistant as a React mentor:

```
**Prompt Template:**
"Act as a senior React developer teaching a junior developer. I want to add favorites functionality to my laptop store. 

Here are my requirements:
- Heart icon that toggles on/off
- localStorage persistence 
- TypeScript throughout
- Smooth animations
- Proper error handling

Please explain each step and why we're doing it that way, then show me the code."
```

#### **3. Few-Shot Learning Examples**
Provide examples of similar patterns in your codebase:

```
**Prompt Template:**
"Looking at how my cart functionality works in CartContext.tsx:
- Uses localStorage for persistence
- Handles loading states
- Provides custom hook (useCart)
- Manages complex state

I want to create similar functionality for favorites. Can you follow the same patterns but for a simpler favorites system?"
```

### 🛠️ **Implementation Guide**

#### **Step 1: Create the Favorites Hook**
**Prompt for AI Assistant:**
```
"Help me create a custom hook called `useFavorites` that:
1. Manages favorite laptop IDs in localStorage
2. Provides addFavorite, removeFavorite, and isFavorite functions
3. Handles errors gracefully
4. Uses TypeScript interfaces
5. Follows the same patterns as my existing useCart hook

Here's my current useCart implementation: [paste CartContext.tsx]"
```

**Expected Output Location:** `frontend/src/hooks/useFavorites.ts`

#### **Step 2: Update LaptopCard Component**
**Prompt for AI Assistant:**
```
"Update my LaptopCard component to include a favorites heart icon:
1. Add a heart icon button to the header area
2. Use filled heart (❤️) for favorites, outline heart (🤍) for not favorites
3. Add hover effects and click animations
4. Position it in the top-right of the card
5. Integrate with the useFavorites hook

Current component: [paste LaptopCard.tsx]
CSS file: [paste LaptopCard.css]"
```

#### **Step 3: Create Favorites Page**
**Prompt for AI Assistant:**
```
"Create a new Favorites page component that:
1. Shows all favorited laptops in a grid layout
2. Reuses the existing LaptopCard component
3. Handles empty state with nice message
4. Follows the same patterns as my Laptops page

Here's my current Laptops page: [paste Laptops.tsx]"
```

**Expected Output Location:** `frontend/src/pages/Favorites.tsx`

#### **Step 4: Update Navigation**
**Prompt for AI Assistant:**
```
"Add a Favorites link to my navigation:
1. Add to Header.tsx navigation menu
2. Add route to App.tsx
3. Use heart icon (❤️) for the nav link
4. Show count of favorites if any

Current files:
Header.tsx: [paste Header.tsx]
App.tsx: [paste App.tsx]"
```

### 🎨 **Advanced Styling Prompts**

**CSS Animation Prompt:**
```
"Add smooth animations for the heart icon:
1. Scale effect on click
2. Color transition on hover  
3. Pulse effect when toggling
4. Smooth transitions between states

Current CSS: [paste LaptopCard.css]"
```

### ✅ **Self-Consistency Validation**

Use these prompts to verify your implementation:

**Code Review Prompt:**
```
"Review my favorites implementation for:
1. TypeScript type safety
2. React best practices
3. Error handling completeness
4. Performance considerations
5. Accessibility features

Code: [paste your implementation]"
```

**Testing Prompt:**
```
"Help me create test scenarios for my favorites feature:
1. Adding/removing favorites
2. localStorage persistence
3. Error handling
4. Component rendering
5. Integration with existing cart

What edge cases should I test?"
```

### 🚀 **Success Criteria**
- ✅ Heart icon appears on all laptop cards
- ✅ Clicking toggles favorite state with animation
- ✅ Favorites persist after page refresh
- ✅ Favorites page shows saved laptops
- ✅ Navigation includes favorites link with count
- ✅ No TypeScript errors
- ✅ Smooth user experience

### 🔧 **Validation Commands**
After implementation, run these commands to ensure everything works:

```bash
# Frontend type checking
cd frontend && npm run build

# Start development server
npm start

# Test the feature
# 1. Click heart icons on laptop cards
# 2. Navigate to /favorites
# 3. Refresh page and verify persistence
# 4. Check browser console for errors
```

### 🎓 **Learning Outcomes**
This exercise teaches you to:
- **Systematically approach** React development with AI assistance
- **Use modern prompting** techniques for better code generation
- **Apply TypeScript** best practices in React
- **Handle state management** with custom hooks
- **Create smooth UX** with CSS animations
- **Validate implementations** thoroughly

**Next Exercise:** Move on to Exercise 4 to implement the computer mice functionality using similar AI-assisted patterns.
