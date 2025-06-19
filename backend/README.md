# 🚀 Laptop Store Backend - Java Spring Boot

A modern, production-ready Spring Boot backend for the Laptop Store e-commerce platform. This API supports both laptops and computer mice products with advanced features like mixed cart functionality, JWT authentication, and comprehensive order management.

## ✨ Features

### 🛍️ E-commerce Core
- **Product Management**: 
  - Complete laptop catalog (10 latest 2024-2025 models)
  - Computer mice collection (12 modern gaming/productivity mice)
  - Individual product detail endpoints with search functionality
  - Stock quantity tracking and management
- **🔐 User Authentication**:
  - JWT token-based authentication with Spring Security
  - Secure password hashing with BCrypt
  - User registration and login endpoints
  - Token-based session management
- **🛒 Advanced Order System**:
  - Mixed product orders (laptops + mice in single order)
  - Order status management (PENDING → PROCESSING → SHIPPED → DELIVERED → CANCELLED)
  - Order cancellation for pending orders
  - Complete order history per user
- **📊 RESTful API**:
  - Clean REST endpoint design
  - Automatic OpenAPI/Swagger documentation
  - Request/response validation with Jakarta Bean Validation
  - Comprehensive error handling and responses

### 🏗️ Architecture & Design
- **🎯 Clean Architecture**: Layered architecture with clear separation of concerns
- **🔄 Service Layer Pattern**: Business logic abstraction from controllers
- **🛡️ Security First**: Spring Security integration with JWT, CORS configuration
- **📝 Well Documented**: Comprehensive code documentation and API specs
- **🧪 Test Ready**: Structured for comprehensive testing with Spring Boot Test

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
│   │   ├── MouseController.java       # Mouse CRUD operations
│   │   ├── OrderController.java       # Order management
│   │   └── HealthController.java      # Health check endpoints
│   ├── service/                       # Business logic layer
│   │   ├── UserService.java           # User management
│   │   ├── LaptopService.java         # Laptop operations
│   │   ├── MouseService.java          # Mouse operations
│   │   └── OrderService.java          # Order processing
│   ├── repository/                    # Data access layer
│   │   ├── UserRepository.java        # User data operations
│   │   ├── LaptopRepository.java      # Laptop queries
│   │   ├── MouseRepository.java       # Mouse queries
│   │   ├── OrderRepository.java       # Order data access
│   │   └── OrderItemRepository.java   # Order item operations
│   ├── entity/                        # JPA entities
│   │   ├── User.java                  # User entity
│   │   ├── Laptop.java                # Laptop product entity
│   │   ├── Mouse.java                 # Mouse product entity
│   │   ├── Order.java                 # Order entity
│   │   └── OrderItem.java             # Order item entity
│   ├── dto/                           # Data Transfer Objects
│   │   ├── UserCreateDto.java         # User registration request
│   │   ├── UserLoginDto.java          # Login request
│   │   ├── JwtResponseDto.java        # JWT token response
│   │   ├── OrderCreateDto.java        # Order creation request
│   │   └── MessageResponseDto.java    # Generic message response
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

The API will be available at `http://localhost:8080`

### 🔍 Explore the API
- **📖 Swagger UI**: http://localhost:8080/swagger-ui.html (when configured)
- **🏥 Health Check**: http://localhost:8080/health
- **🗄️ H2 Console**: http://localhost:8080/h2-console (dev only)
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
    laptop_id BIGINT NULL,
    mouse_id BIGINT NULL,
    quantity INTEGER NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders (id),
    FOREIGN KEY (laptop_id) REFERENCES laptops (id),
    FOREIGN KEY (mouse_id) REFERENCES mice (id)
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
GET /api/v1/laptops/available  # Get available laptops
GET /api/v1/laptops/search?q=  # Search laptops
GET /api/v1/mice               # Get all mice
GET /api/v1/mice/{id}          # Get mouse by ID
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
GET /api/v1/orders/{id}        # Get specific order
DELETE /api/v1/orders/{id}     # Cancel order (pending only)
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

#### Create Mixed Order
```http
POST /api/v1/orders
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
    "items": [
        {
            "laptopId": 1,
            "mouseId": null,
            "quantity": 1,
            "unitPrice": 2999.99
        },
        {
            "laptopId": null,
            "mouseId": 5,
            "quantity": 2,
            "unitPrice": 149.99
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

# Run with coverage
mvn test jacoco:report

# Run specific test class
mvn test -Dtest=UserServiceTest
```

### Test Structure
- **Unit Tests**: Service layer business logic testing
- **Integration Tests**: Full application context testing
- **Security Tests**: Authentication and authorization testing

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
SERVER_PORT=8080
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
mvn clean package -Pprod

# Build Docker image (when Dockerfile is added)
docker build -t laptop-store-backend .
```

### Production Checklist
- [ ] **Change JWT Secret**: Use secure, random secret key
- [ ] **Database Migration**: Move to PostgreSQL or MySQL
- [ ] **Environment Variables**: Externalize all configuration
- [ ] **HTTPS Configuration**: SSL/TLS encryption
- [ ] **Monitoring**: Add application monitoring (Actuator, Micrometer)
- [ ] **Logging**: Configure structured logging
- [ ] **Health Checks**: Configure health check endpoints
- [ ] **Security Headers**: Add security headers middleware

## 🔧 Development Tools

### Code Quality
```bash
# Format code (when configured)
mvn spotless:apply

# Static analysis
mvn spotbugs:check

# Dependency check
mvn dependency-check:check
```

### Database Tools
```bash
# Generate JPA metamodel
mvn compile

# Validate database schema
mvn flyway:validate
```

## 📚 API Documentation

### Swagger/OpenAPI Integration
To add Swagger documentation, include in `pom.xml`:
```xml
<dependency>
    <groupId>org.springdoc</groupId>
    <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
    <version>2.2.0</version>
</dependency>
```

## 🤝 Contributing

### Development Workflow
1. **Setup Environment**: Java 17, Maven, IDE
2. **Code Style**: Follow Java conventions and Spring Boot best practices
3. **Testing**: Write comprehensive tests for new features
4. **Documentation**: Update JavaDoc and README
5. **Security**: Ensure no security vulnerabilities

### Code Review Checklist
- [ ] **Functionality**: Feature works as expected
- [ ] **Testing**: Adequate test coverage
- [ ] **Security**: No security vulnerabilities
- [ ] **Performance**: Efficient implementation
- [ ] **Documentation**: Clear code and API documentation

## 📄 License

This Spring Boot backend is designed for educational purposes and demonstrates production-ready API development practices with modern Java frameworks.

---

**Build amazing APIs with Spring Boot! 🚀**
