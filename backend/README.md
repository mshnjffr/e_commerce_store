# 🚀 Laptop Store Backend - Java Spring Boot

A modern Spring Boot backend for the Laptop Store e-commerce platform. This API supports laptop products with JWT authentication and order management.

## ✨ Features

### 🛍️ E-commerce Core
- **Product Management**: 
  - Complete laptop catalog (10 latest 2024-2025 models)
  - Individual product detail endpoints
  - Stock quantity tracking and management
- **🔐 User Authentication**:
  - JWT token-based authentication with Spring Security
  - Secure password hashing with BCrypt
  - User registration and login endpoints
  - Token-based session management
- **🛒 Order System**:
  - Laptop order creation and management
  - Order history per user
  - Basic order status (PENDING)
- **📊 RESTful API**:
  - Clean REST endpoint design
  - Request/response validation with Jakarta Bean Validation
  - Comprehensive error handling and responses

### 🏗️ Architecture & Design
- **🎯 Clean Architecture**: Layered architecture with clear separation of concerns
- **🔄 Service Layer Pattern**: Business logic abstraction from controllers
- **🛡️ Security First**: Spring Security integration with JWT, CORS configuration
- **📝 Well Documented**: Comprehensive code documentation

## 🛠️ Tech Stack

- **⚡ Spring Boot 3.2.0** - Modern Java framework with auto-configuration
- **🗃️ Spring Data JPA** - Data persistence with Hibernate
- **🔐 Spring Security** - Authentication and authorization
- **📘 Jakarta Bean Validation** - Request/response validation
- **🗄️ H2 Database** - In-memory database for development
- **🔑 JJWT** - JSON Web Token implementation
- **🔒 BCrypt** - Secure password hashing
- **☕ Java 17** - Latest LTS Java version
- **📦 Maven** - Dependency management and build tool

## 📁 Project Structure

```
backend/
├── src/main/java/com/example/laptopstore/
│   ├── LaptopStoreApplication.java    # Spring Boot main class
│   ├── controller/                    # REST controllers
│   │   ├── AuthController.java        # Authentication endpoints
│   │   ├── LaptopController.java      # Laptop CRUD operations
│   │   ├── OrderController.java       # Order management
│   │   └── HealthController.java      # Health check endpoints
│   ├── service/                       # Business logic layer
│   │   ├── UserService.java           # User management
│   │   ├── LaptopService.java         # Laptop operations
│   │   └── OrderService.java          # Order processing
│   ├── repository/                    # Data access layer
│   │   ├── UserRepository.java        # User data operations
│   │   ├── LaptopRepository.java      # Laptop queries
│   │   ├── OrderRepository.java       # Order data access
│   │   └── OrderItemRepository.java   # Order item operations
│   ├── entity/                        # JPA entities
│   │   ├── User.java                  # User entity
│   │   ├── Laptop.java                # Laptop product entity
│   │   ├── Order.java                 # Order entity
│   │   └── OrderItem.java             # Order item entity
│   ├── dto/                           # Data Transfer Objects
│   │   ├── UserCreateDto.java         # User registration request
│   │   ├── UserLoginDto.java          # Login request
│   │   ├── JwtResponseDto.java        # JWT token response
│   │   ├── OrderCreateDto.java        # Order creation request
│   │   ├── OrderItemCreateDto.java    # Order item request
│   │   ├── OrderResponseDto.java      # Order response
│   │   ├── OrderItemResponseDto.java  # Order item response
│   │   ├── UserResponseDto.java       # User response
│   │   └── MessageResponseDto.java    # Generic message response
│   ├── exception/                     # Exception handling
│   │   └── GlobalExceptionHandler.java # Global error handler
│   └── security/                      # Security configuration
│       ├── SecurityConfig.java        # Spring Security config
│       ├── JwtTokenProvider.java      # JWT token utilities
│       ├── JwtAuthenticationFilter.java # JWT filter
│       ├── UserPrincipal.java         # Security user details
│       └── CurrentUser.java           # Current user annotation
├── src/main/resources/
│   ├── application.properties         # Application configuration
│   └── data.sql                      # Sample data initialization
├── pom.xml                           # Maven dependencies
└── README.md                         # This documentation
```

## 🚀 Quick Start

### Prerequisites
- **Java 17+** with JAVA_HOME configured
- **Maven 3.6+** for build management
- **IDE** (IntelliJ IDEA, Eclipse, or VS Code with Java extensions)

### Installation & Setup

1. **Navigate to backend directory**:
```bash
cd backend
```

2. **Install dependencies and compile**:
```bash
mvn clean compile
```

3. **Run the application**:
```bash
mvn spring-boot:run
```

Alternatively, you can run the JAR file:
```bash
mvn clean package
java -jar target/laptop-store-backend-1.0.0.jar
```

The API will be available at `http://localhost:8000`

### 🔍 Explore the API
- **🏥 Health Check**: http://localhost:8000/health
- **🗄️ H2 Console**: http://localhost:8000/h2-console (dev only)
  - JDBC URL: `jdbc:h2:mem:laptopstore`
  - Username: `sa`
  - Password: (empty)

## 📊 Database Schema

### Core Tables

#### Users Table
```sql
CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### Laptops Table
```sql
CREATE TABLE laptops (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    brand VARCHAR(255) NOT NULL,
    model VARCHAR(255) NOT NULL,
    processor VARCHAR(255) NOT NULL,
    ram_gb INTEGER NOT NULL,
    storage_gb INTEGER NOT NULL,
    graphics VARCHAR(255) NOT NULL,
    screen_size DOUBLE NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### Orders & Order Items Tables
```sql
CREATE TABLE orders (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    status VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id)
);

CREATE TABLE order_items (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    order_id BIGINT NOT NULL,
    laptop_id BIGINT NOT NULL,
    quantity INTEGER NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders (id),
    FOREIGN KEY (laptop_id) REFERENCES laptops (id)
);
```

## 🔗 API Endpoints

### Public Endpoints

#### Health & Status
```http
GET /                           # API health check
GET /health                     # Health status
```

#### Products
```http
GET /api/v1/laptops            # Get all laptops
GET /api/v1/laptops/{id}       # Get laptop by ID
```

#### Authentication
```http
POST /api/v1/auth/register     # Register new user
POST /api/v1/auth/login        # User login (returns JWT)
```

### Protected Endpoints (Require JWT)

#### Orders
```http
GET /api/v1/orders             # Get user's orders
POST /api/v1/orders            # Create new order
```

## 📋 Request/Response Examples

### Authentication

#### Register User
```http
POST /api/v1/auth/register
Content-Type: application/json

{
    "username": "newuser",
    "email": "user@example.com",
    "password": "securepass123"
}
```

#### Login
```http
POST /api/v1/auth/login
Content-Type: application/json

{
    "username": "john_doe",
    "password": "password123"
}

# Response:
{
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "tokenType": "Bearer",
    "userId": 1,
    "username": "john_doe"
}
```

### Products

#### Get Laptops
```http
GET /api/v1/laptops

# Response:
[
    {
        "id": 1,
        "brand": "Apple",
        "model": "MacBook Pro 16-inch M4",
        "processor": "Apple M4 Pro",
        "ramGb": 32,
        "storageGb": 1024,
        "graphics": "Apple M4 Pro GPU",
        "screenSize": 16.2,
        "price": 2999.99,
        "stockQuantity": 15,
        "createdAt": "2024-01-15T10:30:00"
    }
    // ... more laptops
]
```

### Orders

#### Create Order
```http
POST /api/v1/orders
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
    "items": [
        {
            "laptopId": 1,
            "quantity": 1,
            "unitPrice": 2999.99
        },
        {
            "laptopId": 5,
            "quantity": 2,
            "unitPrice": 3199.99
        }
    ]
}
```

## 🛡️ Security Features

### Authentication & Authorization
- **JWT Tokens**: Stateless authentication with configurable expiration
- **BCrypt Password Hashing**: Secure password storage with salt
- **Spring Security Integration**: Method-level security annotations
- **CORS Configuration**: Configurable cross-origin resource sharing

### Input Validation
- **Jakarta Bean Validation**: Automatic request validation
- **Custom Validation**: Business rule validation in service layer
- **Error Handling**: Comprehensive exception handling and responses

## 🧪 Testing

### Running Tests
```bash
# Run all tests
mvn test

# Run specific test class
mvn test -Dtest=UserServiceTest
```

## ⚙️ Configuration

### Environment Variables
```bash
# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRATION=86400000

# Database Configuration (for production)
SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/laptopstore
SPRING_DATASOURCE_USERNAME=your_username
SPRING_DATASOURCE_PASSWORD=your_password

# Server Configuration
SERVER_PORT=8000
```

### Application Profiles
```yaml
# application-prod.properties
spring.datasource.url=jdbc:postgresql://localhost:5432/laptopstore
spring.jpa.hibernate.ddl-auto=validate
spring.jpa.show-sql=false
logging.level.com.example.laptopstore=INFO
```

## 🚀 Production Deployment

### Building for Production
```bash
# Create production JAR
mvn clean package

# Run the JAR
java -jar target/laptop-store-backend-1.0.0.jar
```

### Production Considerations
- **Change JWT Secret**: Use secure, random secret key
- **Database Migration**: Move to PostgreSQL or MySQL
- **Environment Variables**: Externalize all configuration
- **HTTPS Configuration**: SSL/TLS encryption

## 🔧 Development Tools

### Code Quality
```bash
# Compile the project
mvn compile

# Run tests
mvn test
```

## 🤝 Contributing

### Development Workflow
1. **Setup Environment**: Java 17, Maven, IDE
2. **Code Style**: Follow Java conventions and Spring Boot best practices
3. **Testing**: Write tests for new features
4. **Documentation**: Update JavaDoc and README
5. **Security**: Ensure no security vulnerabilities

## 📄 License

This Spring Boot backend is designed for educational purposes and demonstrates API development practices with modern Java frameworks.

---

**Build amazing APIs with Spring Boot! 🚀**
