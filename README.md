# 🛒 Laptop Store - Complete E-commerce Platform

A full-stack e-commerce application featuring a Java Spring Boot backend and React TypeScript frontend, designed specifically for teaching developers how to effectively use AI coding assistants like Cody. This comprehensive laptop store includes both laptops and computer mice, with advanced features like mixed cart functionality, order management, and authentication.

## 🎯 Project Purpose

This project serves as a **practical training platform** for developers learning to work with AI coding assistants. It provides real-world scenarios and comprehensive exercises that teach:

- 🤖 **AI Assistant Integration**: How to effectively use modern AI coding assistants with advanced prompting techniques
- 🔧 **Hands-on Exercises**: 5 progressive exercises covering beginner to advanced scenarios
- 🏗️ **Production-ready Patterns**: Best practices for full-stack development with React TypeScript and Spring Boot
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
- **📚 Built-in Exercises**: 5 comprehensive AI assistant training exercises with modern prompting techniques
- **🐛 Intentional Bugs**: Realistic debugging scenarios for learning
- **🎯 Progressive Difficulty**: From beginner React concepts to advanced Spring Boot API integration
- **💡 Best Practices**: Code demonstrates industry-standard patterns and practices

## 🏗️ Architecture

## 🚀 Java Spring Boot Backend

### Architecture Overview
This application uses a **layered architecture** following Spring Boot best practices:

- **Controller Layer**: REST API endpoints handling HTTP requests
- **Service Layer**: Business logic and data processing
- **Repository Layer**: Data access using Spring Data JPA
- **Entity Layer**: JPA entities representing database tables
- **Security Layer**: JWT authentication and authorization

### Key Technologies
- **Spring Boot 3.2.0**: Main framework with auto-configuration
- **Spring Data JPA**: Database abstraction with Hibernate
- **Spring Security**: JWT-based authentication and authorization
- **H2 Database**: In-memory database for development and testing
- **Maven**: Dependency management and build tool
- **Jackson**: JSON serialization with snake_case mapping

### Configuration Highlights
- **Port 8000**: Backend server running on http://localhost:8000
- **CORS Enabled**: Frontend at localhost:3000 allowed
- **JWT Security**: All order endpoints require valid Bearer tokens
- **Mixed Product Support**: Single orders can contain both laptops and mice
- **Automatic Stock Management**: Inventory updates on order creation/cancellation

### Backend (Java Spring Boot)
```
backend/
├── pom.xml                                          # Maven dependencies and configuration
├── src/main/java/com/example/laptopstore/
│   ├── LaptopStoreApplication.java                 # Spring Boot main application
│   ├── controller/                                 # REST API controllers
│   │   ├── AuthController.java                     # Authentication endpoints
│   │   ├── LaptopController.java                   # Laptop CRUD operations
│   │   ├── MouseController.java                    # Mouse CRUD operations
│   │   └── OrderController.java                    # Order management
│   ├── entity/                                     # JPA entity classes
│   │   ├── User.java                               # User entity with authentication
│   │   ├── Laptop.java                             # Laptop product entity
│   │   ├── Mouse.java                              # Mouse product entity
│   │   ├── Order.java                              # Order entity with relationships
│   │   └── OrderItem.java                          # Order items (mixed products)
│   ├── repository/                                 # Spring Data JPA repositories
│   │   ├── UserRepository.java                     # User data access
│   │   ├── LaptopRepository.java                   # Laptop data access
│   │   ├── MouseRepository.java                    # Mouse data access
│   │   └── OrderRepository.java                    # Order data access
│   ├── service/                                    # Business logic services
│   │   ├── AuthService.java                        # Authentication service
│   │   ├── LaptopService.java                      # Laptop business logic
│   │   ├── MouseService.java                       # Mouse business logic
│   │   └── OrderService.java                       # Order business logic
│   ├── security/                                   # Spring Security configuration
│   │   ├── JwtAuthenticationFilter.java            # JWT filter for requests
│   │   ├── JwtUtil.java                            # JWT token utilities
│   │   └── SecurityConfig.java                     # Security configuration
│   └── dto/                                        # Data Transfer Objects
│       ├── LoginRequest.java                       # Login request DTO
│       ├── RegisterRequest.java                    # Registration request DTO
│       └── OrderRequest.java                       # Order creation DTO
├── src/main/resources/
│   ├── application.properties                      # Spring Boot configuration
│   └── data.sql                                    # Sample data initialization
└── target/                                         # Maven build output
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

## 🚀 System Requirements & Setup

### 📋 Prerequisites

#### Required Software & Versions
- **☕ Java Development Kit (JDK)**
  - **Version**: Java 17 or higher (Java 21 recommended)
  - **Download**: [Oracle JDK](https://www.oracle.com/java/technologies/downloads/) or [OpenJDK](https://openjdk.org/install/)
  - **Verify**: `java -version` and `javac -version`

- **📦 Apache Maven**
  - **Version**: Maven 3.6.0 or higher
  - **Download**: [Maven Downloads](https://maven.apache.org/download.cgi)
  - **Verify**: `mvn -version`

- **🟢 Node.js & npm**
  - **Version**: Node.js 16.x or higher (Node.js 18.x+ recommended)
  - **npm**: Version 8.x or higher (comes with Node.js)
  - **Download**: [Node.js Official](https://nodejs.org/)
  - **Verify**: `node -v` and `npm -v`


### 🚀 Quick Start Guide

#### Option 1: Automated Setup (Recommended)
```bash
# Clone the repository
git clone https://github.com/mshnjffr/e_commerce_store.git
cd e_commerce_store

# Start both backend and frontend automatically
# For Mac/Linux:
./start-dev.sh

# For Windows:
start-dev.bat

# Or use npm scripts:
npm run dev              # Start both backend and frontend
npm run dev:frontend     # Start only frontend (for frontend development)
```

#### Option 2: Manual Setup

##### 1. Clone and Setup Backend
```bash
# Clone the repository
git clone https://github.com/mshnjffr/e_commerce_store.git
cd e_commerce_store

# Setup and run Java Spring Boot backend
cd backend
mvn clean install    # Download dependencies and build
mvn spring-boot:run   # Start the server
```
Backend will be available at `http://localhost:8000`

##### 2. Setup Frontend (New Terminal)
```bash
# Navigate to frontend directory
cd e_commerce_store/frontend

# Install dependencies
npm install

# Start development server
npm start
```
Frontend will be available at `http://localhost:3000`

### 🌐 Access Points
- **🏠 Main Application**: http://localhost:3000
- **📚 Training Exercises**: http://localhost:3000/exercises
- **🔌 Backend API**: http://localhost:8000
- **🗄️ H2 Database Console**: http://localhost:8000/h2-console
  - **JDBC URL**: `jdbc:h2:mem:laptopstore`
  - **Username**: `sa`
  - **Password**: *(leave empty)*

### 🔍 Verification Commands

#### Backend Health Check
```bash
# Test backend is running
curl http://localhost:8000/api/v1/laptops

# Test authentication endpoint
curl -X POST -H "Content-Type: application/json" \
  -d '{"username":"john_doe","password":"password123"}' \
  http://localhost:8000/api/v1/auth/login
```

#### Frontend Build Check
```bash
cd frontend
npm run build    # Verify TypeScript compilation
npm test         # Run test suite
```

### 🛠️ Available Scripts

The project now includes convenient npm scripts for development:

```bash
# Development
npm run dev              # Start both backend and frontend servers
npm run dev:frontend     # Start only frontend (for frontend development)

# Frontend Management
npm run install:frontend # Install frontend dependencies
npm run build:frontend   # Build frontend for production
npm run test:frontend    # Run frontend tests
```

### ✨ Improved Startup Scripts

The startup scripts have been enhanced with:
- ✅ **Automatic prerequisite checks** for Node.js, npm, and Maven
- ✅ **Automatic dependency installation** for frontend packages
- ✅ **Better error handling** with immediate feedback
- ✅ **Process health checks** to ensure servers start successfully
- ✅ **Detailed logging** and troubleshooting information

### ⚠️ Troubleshooting Common Issues

#### Java Issues
```bash
# Check Java version
java -version
# Should show Java 17+ (e.g., "openjdk version 17.0.x")

# If Java not found or wrong version:
# - Install/update Java JDK 17+
# - Set JAVA_HOME environment variable
# - Add Java to PATH
```

#### Maven Issues
```bash
# Check Maven version
mvn -version
# Should show Maven 3.6.0+

# If Maven not found:
# - Download and install Maven
# - Set M2_HOME environment variable
# - Add Maven bin directory to PATH
```

#### Node.js/npm Issues
```bash
# Check Node.js version
node -v
# Should show v16.x.x or higher

# Check npm version
npm -v
# Should show 8.x.x or higher

# If Node.js not found or outdated:
# - Install/update Node.js from nodejs.org
# - npm will be included automatically
```

#### Port Conflicts
```bash
# If port 8000 is in use:
lsof -ti:8000 | xargs kill -9  # Kill process on port 8000

# If port 3000 is in use:
lsof -ti:3000 | xargs kill -9  # Kill process on port 3000

# Alternative: Use different ports
# Backend: mvn spring-boot:run -Dspring-boot.run.arguments=--server.port=8001
# Frontend: PORT=3001 npm start
```

#### Permission Issues (Unix/macOS)
```bash
# Make startup script executable
chmod +x start-dev.sh

# If npm permission errors:
npm config set prefix ~/.npm-global
export PATH=~/.npm-global/bin:$PATH
```

### 🏗️ Development Tools (Optional but Recommended)

#### IDEs & Editors
- **Java Development**: IntelliJ IDEA, Eclipse, VS Code with Java extensions
- **Frontend Development**: VS Code, WebStorm, Sublime Text
- **Database**: DBeaver, TablePlus (for H2 database inspection)

#### Useful Extensions/Plugins
- **VS Code**: Java Extension Pack, ES7+ React/Redux/React-Native snippets
- **Browser**: React Developer Tools, Redux DevTools

### 📦 Project Dependencies

#### Backend Dependencies (Java/Maven)
```xml
<!-- Core Framework -->
Spring Boot 3.2.0                    <!-- Main framework -->
Spring Data JPA                      <!-- Database ORM -->
Spring Security 6.2.0                <!-- Authentication & authorization -->
Spring Web                           <!-- REST API support -->

<!-- Database -->
H2 Database 2.2.224                  <!-- In-memory database -->
Hibernate 6.3.1                      <!-- JPA implementation -->

<!-- Security & JWT -->
JJWT 0.12.3                          <!-- JWT token handling -->
BCrypt                               <!-- Password hashing -->

<!-- Validation & Utilities -->
Jakarta Validation API               <!-- Request validation -->
Jackson 2.15.3                       <!-- JSON serialization -->
```

#### Frontend Dependencies (Node.js/npm)
```json
{
  "dependencies": {
    "react": "^19.1.0",               // React framework
    "react-dom": "^19.1.0",          // React DOM rendering
    "react-router-dom": "^6.8.0",    // Client-side routing
    "typescript": "^4.9.5",          // TypeScript support
    "axios": "^1.6.0",               // HTTP client for API calls
    "@types/react": "^19.1.6",       // React TypeScript types
    "@types/react-dom": "^19.1.5",   // React DOM TypeScript types
    "react-scripts": "5.0.1",        // Build tools and dev server
    "web-vitals": "^2.1.4"           // Performance monitoring
  },
  "devDependencies": {
    "@testing-library/react": "^16.3.0",  // React testing utilities
    "@testing-library/jest-dom": "^6.6.3", // Jest DOM matchers
    "@testing-library/user-event": "^13.5.0" // User interaction testing
  }
}
```

#### Runtime Requirements Summary
- **Java**: OpenJDK/Oracle JDK 17+ (backend compilation & runtime)
- **Maven**: 3.6.0+ (dependency management & build)
- **Node.js**: 16.x+ (frontend development & build)
- **npm**: 8.x+ (package management)
- **Browser**: Modern browser with ES6+ support

## 🎓Training Exercises

Navigate to `/exercises` to access 5 comprehensive training exercises:

### 1. 🔍 **Understanding the Codebase** (Beginner)
Learn to explore and understand application architecture using modern AI prompting
- Frontend React TypeScript application structure
- Java Spring Boot backend layered architecture
- JWT authentication flow analysis
- Shopping cart implementation
- H2 database schema and JPA entities

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

## 📊 Database Schema (H2 In-Memory)

### Products
- **Laptops**: 10 latest models (2024-2025) from major brands
  - Apple MacBook Pro M4, Dell XPS, Lenovo ThinkPad, HP Spectre, etc.
- **Mice**: 12 modern gaming and productivity mice
  - Logitech MX Master 3S, Razer DeathAdder V3, SteelSeries Rival, etc.

### JPA Entity Relationships
- **User**: Authentication and user management with BCrypt password hashing
- **Laptop**: Laptop product catalog with stock management
- **Mouse**: Computer mice product catalog with gaming/productivity specs
- **Order**: Order tracking with user relationships and mixed product support
- **OrderItem**: Mixed product order items (laptops + mice) with quantity and pricing

### Key Features
- **H2 In-Memory Database**: Fast startup with pre-loaded sample data
- **JPA Relationships**: Proper foreign key constraints and cascading
- **JSON Serialization**: snake_case JSON output for frontend compatibility
- **Stock Management**: Automatic inventory updates on order creation/cancellation

## 🔗 API Endpoints

### Public Endpoints
```
GET /                           # Health check
GET /api/v1/laptops            # All laptops
GET /api/v1/laptops/{id}       # Laptop details
GET /api/v1/mice               # All mice
GET /api/v1/mice/{id}          # Mouse details
POST /api/v1/auth/register     # User registration
POST /api/v1/auth/login        # User login
```

### Protected Endpoints (Requires JWT Bearer Token)
```
GET /api/v1/orders             # User's orders
POST /api/v1/orders            # Create order (mixed laptop/mice items)
GET /api/v1/orders/{id}        # Order details
PUT /api/v1/orders/{id}        # Update order
DELETE /api/v1/orders/{id}     # Cancel order (pending only)
```

## 🧪 Testing

### Backend Testing
```bash
cd backend
mvn test                  # Run all tests
mvn test -Dtest=AuthControllerTest  # Run specific test class
mvn verify               # Run tests with integration tests
```

**Test Coverage** (To be implemented):
- 🔲 Authentication endpoints
- 🔲 Product endpoints (laptops & mice)
- 🔲 Order management (create, read, update, delete)
- 🔲 Mixed product order functionality
- 🔲 Error handling and validation
- 🔲 JWT token authentication

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

**Login Instructions:**
1. Navigate to http://localhost:3000/login  
2. Use credentials: `john_doe` / `password123` or `jane_smith` / `securepass456`
3. Successfully authenticated users can access cart and order features

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
- ✅ Java Spring Boot backend running on port 8000

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
