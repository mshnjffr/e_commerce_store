# 🖥️ Laptop Store Frontend

A modern React TypeScript frontend for the comprehensive Laptop Store e-commerce platform. This application serves as both a fully functional online store and a training platform for developers learning to effectively use AI coding assistants like Cody.

## 🎯 Purpose & Features

### 🛍️ E-commerce Functionality
- **🏠 Modern Homepage**: Hero section with featured products and intuitive navigation
- **💻 Product Catalogs**: 
  - Browse 10 latest laptop models (2024-2025)
  - Explore 12 modern computer mice for gaming and productivity
  - Advanced search, filtering, and sorting capabilities
- **🛒 Advanced Shopping Cart**:
  - Mixed product support (laptops + mice in same cart)
  - Persistent cart state across browser sessions
  - Real-time quantity management with stock validation
  - Live cart count in navigation header
- **🔐 Secure Authentication**:
  - JWT-based user authentication
  - Protected routes with automatic redirect handling
  - Persistent login state with localStorage
- **📦 Complete Order Management**:
  - View order history with expandable details
  - Track order status progression
  - Cancel pending orders with confirmation
  - Support for mixed product orders


## 🛠️ Tech Stack

- **⚛️ React 18** - Latest React with Concurrent Features
- **📘 TypeScript** - Full type safety and developer experience
- **🚦 React Router v6** - Modern client-side routing
- **📡 Axios** - Promise-based HTTP client
- **🔄 Context API** - Global state management
- **🎨 Modern CSS** - Flexbox, Grid, and custom properties
- **🧪 Testing Ready** - Jest and React Testing Library setup

## 📁 Project Structure

```
frontend/
├── public/                     # Static assets and index.html
├── src/
│   ├── components/             # Reusable UI components
│   │   ├── Layout/
│   │   │   ├── Header.tsx      # Navigation with cart count
│   │   │   ├── Footer.tsx      # Site footer
│   │   │   └── Layout.tsx      # Main layout wrapper
│   │   ├── Laptop/
│   │   │   ├── LaptopCard.tsx  # Product card component
│   │   │   └── LaptopCard.css  # Card styling
│   │   └── ProtectedRoute.tsx  # Route protection wrapper
│   ├── contexts/               # React Context providers
│   │   ├── AuthContext.tsx     # Authentication state management
│   │   └── CartContext.tsx     # Shopping cart state management
│   ├── pages/                  # Page-level components
│   │   ├── Home.tsx           # Landing page with hero section
│   │   ├── Laptops.tsx        # Laptop catalog with filters
│   │   ├── Mice.tsx           # Computer mice catalog
│   │   ├── Cart.tsx           # Shopping cart and checkout
│   │   ├── Orders.tsx         # Order history and management
│   │   ├── Login.tsx          # User login form
│   │   ├── Register.tsx       # User registration form
│   │   └── Exercises.tsx      # AI assistant training exercises
│   ├── services/              # API integration layer
│   │   └── api.ts             # Axios-based API client
│   ├── types/                 # TypeScript type definitions
│   │   └── api.ts             # API response and request types
│   ├── utils/                 # Utility functions
│   │   ├── format.ts          # Price and date formatting
│   │   └── validation.ts      # Form validation helpers
│   ├── App.tsx                # Main application component
│   ├── App.css                # Global styles and CSS variables
│   └── index.tsx              # Application entry point
├── package.json               # Dependencies and scripts
├── tsconfig.json              # TypeScript configuration
└── README.md                  # This file
```

## 🚀 Getting Started

### Prerequisites
- **Node.js 16+** - JavaScript runtime
- **npm or yarn** - Package manager
- **Backend API** - Running on `http://localhost:8000`

### Installation

1. **Install dependencies**:
```bash
cd frontend
npm install
```

2. **Environment configuration** (optional):
Create `.env` file:
```env
REACT_APP_API_BASE_URL=http://localhost:8000
REACT_APP_APP_NAME=Laptop Store
```

3. **Start development server**:
```bash
npm start
```
Application opens at `http://localhost:3000`

### Available Scripts

```bash
npm start          # Development server with hot reload
npm test           # Run test suite in watch mode
npm run build      # Production build
```

## 🎓 Cody Training Exercises

Access comprehensive Cody training at `/exercises`:

### 1. 🔍 **Understanding the Codebase** (Beginner)
**Skills**: Code exploration, architecture analysis
- Explore React application structure
- Understand Context API implementation
- Analyze authentication flow
- Study shopping cart state management

### 2. 🐛 **Critical Bug Fix: Login Error Crash**
**Skills**: TypeScript debugging, error handling
- **Current Issue**: Runtime crash on login error
- **Error**: Type mismatch in error display logic
- **Impact**: App becomes unusable for authentication errors
- **Learning**: Defensive programming, type safety

### 3. ❤️ **Simple Feature: Product Favorites** 
**Skills**: React basics, state management
- Add heart icon toggle to laptop cards
- Implement localStorage persistence
- Create custom hooks for favorites
- Build favorites page with filtering

### 4. 🖱️ **Frontend Implementation: Computer Mice** 
**Skills**: Component patterns, API integration
- Create TypeScript types for mice products
- Build MouseCard component following laptop patterns
- Implement Mice catalog page
- Integrate with existing cart system

### 5. 🔗 **API Integration: Order Cancellation** 
**Skills**: API integration, UX patterns
- Add deleteOrder API service method
- Implement confirmation modals
- Handle loading states and errors
- Conditional rendering based on order status

## 🏗️ Architecture Deep Dive

### State Management Strategy

#### Global State (Context API)
```typescript
// AuthContext - User authentication
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (credentials) => Promise<void>;
  logout: () => void;
  register: (userData) => Promise<void>;
}

// CartContext - Shopping cart
interface CartState {
  items: CartItem[];
  totalItems: number;
  totalAmount: number;
  addToCart: (product, type, quantity) => void;
  updateQuantity: (itemId, quantity) => void;
  removeFromCart: (itemId) => void;
  checkout: () => Promise<CheckoutResult>;
}
```

#### Local State (useState/useReducer)
- Component-specific form state
- Loading and error states
- UI interaction state (modals, dropdowns)
- Temporary data (search queries, filters)

### Component Architecture

#### Smart vs Presentational Components
- **Smart Components**: Pages and context providers
- **Presentational Components**: UI components with props
- **Layout Components**: Header, Footer, Layout wrappers
- **Utility Components**: ProtectedRoute, ErrorBoundary

#### Props and Type Safety
```typescript
interface LaptopCardProps {
  laptop: Laptop;
  onAddToCart: (laptop: Laptop) => void;
  showFavorite?: boolean;
}

interface CartItem {
  id: string;
  product: Laptop | Mouse;
  type: 'laptop' | 'mice';
  quantity: number;
}
```

### API Integration

#### Service Layer Pattern
```typescript
// Centralized API configuration
const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  timeout: 10000,
});

// Authentication interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Error handling interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle authentication errors
      localStorage.removeItem('access_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
```

#### API Methods
```typescript
export const apiService = {
  // Authentication
  login: (credentials: LoginRequest): Promise<AuthResponse>
  register: (userData: RegisterRequest): Promise<AuthResponse>
  
  // Products
  getLaptops: (): Promise<Laptop[]>
  getLaptopById: (id: number): Promise<Laptop>
  getMice: (): Promise<Mouse[]>
  getMouseById: (id: number): Promise<Mouse>
  
  // Orders
  createOrder: (orderData: CreateOrderRequest): Promise<Order>
  getOrders: (): Promise<Order[]>
  getOrderById: (id: number): Promise<Order>
  deleteOrder: (id: number): Promise<void>
};
```

## 🎨 Styling Architecture

### CSS Organization
- **Global Styles**: `App.css` with CSS custom properties
- **Component Styles**: Co-located CSS files with components
- **Responsive Design**: Mobile-first approach with breakpoints
- **Utility Classes**: Common patterns and helpers

### Design System
```css
:root {
  /* Colors */
  --primary-color: #007bff;
  --secondary-color: #6c757d;
  --success-color: #28a745;
  --danger-color: #dc3545;
  --warning-color: #ffc107;
  
  /* Spacing */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 3rem;
  
  /* Typography */
  --font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;
}
```

### Responsive Breakpoints
```css
/* Mobile First */
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

/* Tablet */
@media (min-width: 768px) {
  .container {
    padding: 0 2rem;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .container {
    padding: 0 3rem;
  }
}
```

## 🔐 Security Implementation

### Authentication Flow
1. **Login Process**:
   - User submits credentials
   - API validates and returns JWT token
   - Token stored in localStorage
   - AuthContext updates global state
   - Protected routes become accessible

2. **Route Protection**:
   - ProtectedRoute component checks authentication
   - Redirects to login with return path
   - Preserves intended destination

3. **Token Management**:
   - Automatic token inclusion in API requests
   - Token validation on app initialization
   - Automatic logout on token expiration

### Input Validation
```typescript
// Client-side validation
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePassword = (password: string): string[] => {
  const errors = [];
  if (password.length < 8) errors.push('Password must be at least 8 characters');
  if (!/(?=.*[a-z])/.test(password)) errors.push('Must contain lowercase letter');
  if (!/(?=.*[A-Z])/.test(password)) errors.push('Must contain uppercase letter');
  if (!/(?=.*\d)/.test(password)) errors.push('Must contain number');
  return errors;
};
```

## 🧪 Testing Strategy

### Testing Philosophy
- **Unit Tests**: Individual component testing
- **Integration Tests**: Component interaction testing
- **User Flow Tests**: Complete user journey testing
- **API Mock Tests**: Isolated frontend testing

### Test Structure
```typescript
// Component testing example
describe('LaptopCard', () => {
  const mockLaptop = {
    id: 1,
    brand: 'Apple',
    model: 'MacBook Pro',
    price: 2499.99,
    // ... other properties
  };

  it('displays laptop information correctly', () => {
    render(<LaptopCard laptop={mockLaptop} onAddToCart={mockFn} />);
    expect(screen.getByText('Apple MacBook Pro')).toBeInTheDocument();
    expect(screen.getByText('$2,499.99')).toBeInTheDocument();
  });

  it('calls onAddToCart when button is clicked', () => {
    const mockAddToCart = jest.fn();
    render(<LaptopCard laptop={mockLaptop} onAddToCart={mockAddToCart} />);
    fireEvent.click(screen.getByText('Add to Cart'));
    expect(mockAddToCart).toHaveBeenCalledWith(mockLaptop);
  });
});
```

## 🚀 Performance Optimizations

### React Performance
- **Component Memoization**: React.memo for expensive renders
- **Callback Memoization**: useCallback for stable references
- **Value Memoization**: useMemo for expensive calculations
- **Context Optimization**: Separate contexts to prevent unnecessary re-renders

### Bundle Optimization
- **Code Splitting**: Route-based lazy loading
- **Tree Shaking**: Eliminate unused code
- **Asset Optimization**: Image compression and lazy loading
- **Bundle Analysis**: webpack-bundle-analyzer for optimization

### Runtime Performance
- **Virtual Scrolling**: For large product lists
- **Debounced Search**: Prevent excessive API calls
- **Request Caching**: Avoid duplicate API requests
- **Error Boundaries**: Graceful error handling

## 🐛 Known Issues (Intentional for Training)

### 1. Login Error Crash (Exercise 2)
**Location**: `src/pages/Login.tsx:118`
```typescript
// Current problematic code:
<div className="general-error">
  {(errors.general as any).message.toUpperCase()}
</div>

// Issue: errors.general can be string | {message: string}
// Crashes when it's a string and trying to access .message
```

**Impact**: App crashes with TypeScript error when wrong credentials entered
**Learning Objective**: Type safety, defensive programming, error handling

## 🔮 Future Enhancements

### Planned Features
- [ ] **Product Reviews**: Rating and review system
- [ ] **Wishlist**: Save items for later
- [ ] **Product Comparison**: Side-by-side comparison tool
- [ ] **Advanced Filtering**: Price ranges, specs, availability
- [ ] **User Profile**: Account management and preferences

### Technical Improvements
- [ ] **Progressive Web App**: Offline functionality
- [ ] **Performance Monitoring**: Real user metrics
- [ ] **Accessibility**: WCAG 2.1 AA compliance
- [ ] **Internationalization**: Multi-language support
- [ ] **Dark Mode**: Theme switching capability

## 📚 Learning Resources

### React Best Practices
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Router Documentation](https://reactrouter.com/)

### Testing Resources
- [Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Jest Documentation](https://jestjs.io/docs/getting-started)

### Performance Optimization
- [React Performance](https://react.dev/learn/render-and-commit)
- [Web Vitals](https://web.dev/vitals/)


