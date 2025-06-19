# 📚 **Exercise 4: Computer Mice Implementation - Modern AI-Assisted Frontend Development**

## 🎯 **Learning Objectives**
By completing this exercise, you'll master:
- **Advanced AI Prompting**: Chain-of-thought, role-based, and few-shot prompting techniques
- **API Integration**: Connect frontend with Java Spring Boot backend endpoints
- **Component Patterns**: Reuse and adapt existing React patterns for new features
- **TypeScript Mastery**: Define accurate types matching backend entity structure
- **Full-Stack Thinking**: Understand backend-frontend data flow and integration

## 🔍 **Backend Verification Results**

### ✅ **Confirmed API Endpoints**
Your Java Spring Boot backend (running on **port 8000**) provides these mice endpoints:

```bash
# Verified working endpoints:
GET /api/v1/mice              # All mice (12 products available)
GET /api/v1/mice/{id}         # Single mouse by ID
GET /api/v1/mice/available    # Only in-stock mice
GET /api/v1/mice/search?q=    # Search mice by query
GET /api/v1/mice/brand/{brand}  # Filter by brand
GET /api/v1/mice/type/{type}    # Filter by mouse type
```

### 🐭 **Actual Mouse Entity Structure**
Based on the Java `Mouse.java` entity, here's the **exact TypeScript interface** you'll need:

```typescript
interface Mouse {
  id: number;
  brand: string;
  model: string;
  mouse_type: string;        // Note: snake_case (Gaming, Productivity)
  connectivity: string;      // Wired, Wireless, Bluetooth
  dpi: number;
  buttons: number;
  rgb_lighting: boolean;     // Note: snake_case
  weight_grams: number;      // Note: snake_case
  price: number;
  stock_quantity: number;    // Note: snake_case
  created_at: string;        // Note: snake_case, ISO date string
}
```

### 🛒 **Cart System Compatibility**
✅ **Confirmed**: Your existing cart system fully supports mice:
- OrderService.java handles both laptops and mice
- Cart accepts `addToCart(mouse, 'mice', quantity)`
- Order system validates mixed product types

## 🤖 **Modern AI Prompting Methodology**

### **1. Senior Developer Mentoring Approach**
Use this role-based prompt framework:

```
**Prompt Template:**
"Act as a senior React developer with 8+ years experience mentoring a junior developer on modern full-stack development.

I need to add computer mice functionality to my laptop e-commerce store. I already have:
- ✅ Working laptop functionality 
- ✅ Java Spring Boot backend with mice endpoints
- ✅ Existing cart system that supports mice

Guide me through implementing mice pages using modern React patterns, explaining:
- Why we structure components this way
- How to reuse existing patterns effectively
- Best practices for TypeScript API integration
- Proper error handling and loading states

Here's my current laptop implementation: [paste LaptopCard.tsx]

Walk me through this step-by-step like you're teaching a junior developer."
```

### **2. Chain-of-Thought Planning**
Structure your development process:

```
**Prompt Template:**
"I need to implement mice functionality. Let me think through this systematically:

1. **Type Definition**: Define Mouse interface matching backend exactly
2. **API Service**: Create mice service methods following laptop patterns  
3. **Components**: Build MouseCard, MouseList following laptop component patterns
4. **Page Component**: Create Mice page with search, filters, and cart integration
5. **Navigation**: Add mice link to header navigation
6. **Routing**: Configure mice routes in App.tsx
7. **Integration**: Ensure cart system works with mice

For each step, show me:
- The exact code implementation
- Why this approach follows React best practices  
- How it integrates with existing architecture

Current laptop implementation: [paste relevant files]"
```

### **3. Few-Shot Pattern Recognition**
Leverage your existing code patterns:

```
**Prompt Template:**
"I want to implement mice functionality by following the exact same patterns as my laptop implementation:

**Laptop Patterns to Follow:**
- LaptopCard.tsx: Product card with image, details, add to cart
- LaptopList.tsx: Grid layout with loading states
- Laptops.tsx: Page with search, filtering, sorting
- api.ts: Service methods for CRUD operations

**Mice Implementation Goal:**
Create identical functionality but for mice, following the same:
- Component structure and naming conventions
- State management patterns
- Error handling approaches
- TypeScript type definitions
- CSS class naming

Here are my current files:
[paste LaptopCard.tsx, Laptops.tsx, api.ts]

Show me the mice implementation following these exact patterns."
```

## 🛠️ **Step-by-Step Implementation Guide**

### **Step 1: Define Accurate TypeScript Types**

**🎯 Prompting Strategy:**
```
"Based on my Java Spring Boot backend Mouse entity, help me create the exact TypeScript interface.

Here's the JSON response from /api/v1/mice/1:
{
  "id": 1,
  "brand": "Logitech",
  "model": "MX Master 3S", 
  "mouse_type": "Productivity",
  "connectivity": "Wireless",
  "dpi": 8000,
  "buttons": 7,
  "rgb_lighting": false,
  "weight_grams": 141,
  "price": 99.99,
  "stock_quantity": 25,
  "created_at": "2024-01-15T10:30:00"
}

Create the TypeScript interface matching this structure exactly. Also show me how to handle the snake_case to camelCase conversion if needed."
```

**Expected Output Location:** `frontend/src/types/api.ts`

### **Step 2: Implement API Service Methods**

**🎯 Prompting Strategy:**
```
"Looking at my existing laptop API service methods, create identical mice service methods:

Current laptop services:
- fetchLaptops()
- fetchLaptopById(id)
- searchLaptops(query)

I need mice equivalents that call these backend endpoints:
- GET /api/v1/mice
- GET /api/v1/mice/{id}  
- GET /api/v1/mice/search?q={query}
- GET /api/v1/mice/brand/{brand}
- GET /api/v1/mice/type/{type}

Here's my current api.ts file: [paste api.ts]

Follow the exact same patterns, error handling, and TypeScript types."
```

**Expected Output Location:** `frontend/src/services/api.ts`

### **Step 3: Create MouseCard Component**

**🎯 Prompting Strategy:**
```
"Create a MouseCard component following the exact structure of my LaptopCard:

Requirements:
- Display mouse image, brand, model, price
- Show mouse-specific details: DPI, buttons, connectivity, weight
- Include RGB lighting indicator
- Add to cart functionality with 'mice' type
- Stock validation and loading states
- Responsive design matching laptop cards

Current LaptopCard implementation: [paste LaptopCard.tsx]
Current LaptopCard styles: [paste LaptopCard.css]

Create MouseCard.tsx and MouseCard.css following identical patterns but adapted for mouse properties."
```

**Expected Output Locations:** 
- `frontend/src/components/Mouse/MouseCard.tsx`
- `frontend/src/components/Mouse/MouseCard.css`

### **Step 4: Build MouseList Component**

**🎯 Prompting Strategy:**
```
"Create MouseList component following my LaptopList pattern:

Features needed:
- Grid layout for mouse cards
- Loading skeleton states
- Empty state handling
- Responsive grid system
- Error boundary integration

Here's my LaptopList: [paste LaptopList.tsx]

Create MouseList.tsx following the same structure and patterns."
```

**Expected Output Location:** `frontend/src/components/Mouse/MouseList.tsx`

### **Step 5: Implement Mice Page**

**🎯 Prompting Strategy:**
```
"Create a comprehensive Mice page following my Laptops page architecture:

Features to implement:
- Search functionality (query backend search endpoint)
- Brand filtering (Logitech, Razer, SteelSeries, etc.)
- Mouse type filtering (Gaming, Productivity)
- Connectivity filtering (Wired, Wireless, Bluetooth)
- Price range filtering
- Sorting options (price, name, DPI)
- Pagination for large result sets

Current Laptops page: [paste Laptops.tsx]

Adapt this for mice with mouse-specific filters and properties."
```

**Expected Output Location:** `frontend/src/pages/Mice.tsx`

### **Step 6: Update Navigation and Routing**

**🎯 Prompting Strategy:**
```
"Update my navigation to include mice:

1. Add 'Mice' link to Header.tsx navigation menu
2. Configure route in App.tsx for /mice path  
3. Ensure consistent styling with existing navigation
4. Add mouse icon (🖱️) to the navigation

Current files:
Header.tsx: [paste Header.tsx]
App.tsx: [paste App.tsx]

Show me exactly what to add while maintaining current patterns."
```

## 🎨 **Advanced Implementation Prompts**

### **Mouse-Specific UI Enhancements**

**Gaming vs Productivity Visual Distinction:**
```
"Create visual distinction between Gaming and Productivity mice:
- Gaming mice: Dark theme, RGB indicator, performance badges
- Productivity mice: Clean theme, ergonomic focus, battery life
- Different color schemes and iconography

How should I style these categories differently?"
```

**DPI and Weight Display:**
```
"Design effective ways to display mouse-specific specs:
- DPI range (100-30000) with visual indicators
- Weight in grams with lightweight badges
- Button count with visual representation
- Connectivity type with wireless/wired icons

Show me component designs for these features."
```

## ✅ **Self-Consistency Validation Prompts**

### **Code Review Checklist**
```
"Review my mice implementation against these criteria:

**TypeScript Safety:**
- [ ] All Mouse types match backend exactly
- [ ] Proper error handling types
- [ ] No 'any' types used

**React Best Practices:**
- [ ] Proper hooks usage (useState, useEffect)
- [ ] Component composition patterns
- [ ] Performance optimization (useMemo, useCallback)

**Integration Quality:**
- [ ] Cart system works with mice
- [ ] API endpoints called correctly
- [ ] Loading states handled properly
- [ ] Error boundaries in place

**User Experience:**
- [ ] Responsive design on all devices
- [ ] Proper loading indicators
- [ ] Meaningful error messages
- [ ] Accessible components

Rate my implementation and suggest improvements."
```

### **Testing Strategy**
```
"Create comprehensive test scenarios for mice functionality:

**Unit Tests:**
- MouseCard component rendering
- API service methods
- Type validation

**Integration Tests:**
- Mice page functionality
- Cart integration with mice
- Search and filtering

**E2E Tests:**
- Browse mice → add to cart → checkout
- Mixed cart (laptops + mice)
- Error handling flows

What testing frameworks and strategies do you recommend?"
```

## 🚀 **Success Criteria & Validation**

### **Functional Requirements**
- ✅ `/mice` page displays all available mice
- ✅ Individual mouse cards show all relevant specs
- ✅ Search functionality works with backend endpoint
- ✅ Brand and type filtering operational
- ✅ Add to cart works for mice products
- ✅ Mixed cart (laptops + mice) functions correctly
- ✅ Responsive design on mobile/tablet/desktop

### **Technical Requirements**
- ✅ TypeScript interfaces match backend exactly
- ✅ No TypeScript compilation errors
- ✅ API integration uses proper error handling
- ✅ Components follow existing patterns
- ✅ CSS styling consistent with laptop components
- ✅ Performance optimized (lazy loading, memoization)

### **Validation Commands**
```bash
# Type checking
cd frontend && npx tsc --noEmit

# Build verification  
npm run build

# Test mice endpoints
curl http://localhost:8000/api/v1/mice
curl http://localhost:8000/api/v1/mice/1

# Start development server
npm start

# Manual testing checklist:
# 1. Navigate to /mice
# 2. Search for "gaming mouse"
# 3. Filter by brand (Razer, Logitech)
# 4. Add mice to cart
# 5. Verify mixed cart (laptops + mice)
# 6. Complete checkout process
```

## 🎓 **Learning Outcomes**

### **Advanced AI Prompting Mastery**
- **Chain-of-Thought**: Breaking complex features into logical steps
- **Role-Based Prompting**: Leveraging expertise simulation for better guidance
- **Few-Shot Learning**: Using existing patterns to generate similar functionality
- **Self-Consistency**: Validating implementations through systematic review

### **Full-Stack Integration Skills**
- **Backend-Frontend Alignment**: Ensuring type safety across stack boundaries
- **API Design Understanding**: Working with RESTful endpoints effectively
- **Data Flow Mastery**: Managing state from API to UI components
- **Error Handling**: Graceful degradation and user feedback

### **React Architecture Patterns**
- **Component Reusability**: Adapting existing patterns for new features
- **Type Safety**: Comprehensive TypeScript usage
- **Performance**: Optimizing rendering and API calls
- **Maintainability**: Code organization and pattern consistency

**Next Exercise:** Proceed to Exercise 5 to implement order cancellation functionality with advanced state management patterns.

---

## 📝 **Quick Reference**

### **Backend Endpoints (Port 8000)**
```
GET /api/v1/mice              # All mice (12 products)
GET /api/v1/mice/{id}         # Single mouse
GET /api/v1/mice/search?q=    # Search mice
GET /api/v1/mice/brand/{brand}  # Filter by brand  
GET /api/v1/mice/type/{type}    # Filter by type
```

### **Mouse Brands Available**
- Logitech, Razer, SteelSeries, Corsair
- Apple, Microsoft, Hyperx, Glorious
- Zowie, Roccat, Finalmouse, Endgame Gear

### **Mouse Types**
- **Gaming**: High DPI, RGB lighting, lightweight
- **Productivity**: Ergonomic, battery life, precision

### **Cart Integration**
```typescript
// Add mouse to cart
addToCart(mouse, 'mice', quantity);

// Mixed cart support
{ laptops: [...], mice: [...] }
```
