import React from 'react';
import './Exercises.css';

const Exercises: React.FC = () => {
  return (
    <div className="exercises-page">
      <div className="container">
        <div className="page-header">
          <h1>Cody Exercises - Java Spring Boot Edition</h1>
          <p>AI-assisted development exercises with specific file guidance for Cody users</p>
        </div>

        <div className="exercises-content">
          <div className="exercise-section">
            <h2 className="section-title">🚀 Getting Started</h2>
            
            <div className="exercise-item">
              <div className="exercise-number">1</div>
              <div className="exercise-content">
                <h3>Understanding the Codebase with Advanced Prompting</h3>
                <p className="exercise-description">
                  Master codebase comprehension using modern prompting techniques including chain-of-thought reasoning, role-based prompting, and metacognitive analysis.
                </p>
                <div className="exercise-tasks">
                  <h4>🧠 Modern Prompting Techniques to Learn:</h4>
                  <p>✅ Chain-of-Thought • Role-Based Prompting • Few-Shot Examples • Self-Consistency • Metacognitive Reasoning</p>
                  
                  <h4>Tasks to complete with Advanced Prompts:</h4>
                  <ul>
                    <li><strong>Step 1: Frontend Architecture Analysis</strong>
                      <br />📁 <code>frontend/src/App.tsx</code>, <code>frontend/src/components/Layout/Header.tsx</code>, <code>frontend/src/contexts/CartContext.tsx</code>, <code>frontend/src/contexts/AuthContext.tsx</code>, <code>frontend/src/pages/Laptops.tsx</code>, <code>frontend/src/services/api.ts</code>
                      <br />💡 <strong>Chain-of-Thought Prompt:</strong> "Walk me through the React frontend architecture step by step. First, explain the overall folder structure based on these files, then describe how routing works in App.tsx, followed by component organization in Layout/, and finally explain the state management approach used in CartContext.tsx."
                    </li>
                    
                    <li><strong>Step 2: Java Spring Boot Backend Analysis</strong>
                      <br />📁 <code>backend/pom.xml</code>, <code>backend/src/main/java/com/example/laptopstore/LaptopStoreApplication.java</code>, <code>backend/src/main/java/com/example/laptopstore/controller/LaptopController.java</code>, <code>backend/src/main/java/com/example/laptopstore/service/LaptopService.java</code>, <code>backend/src/main/java/com/example/laptopstore/repository/LaptopRepository.java</code>, <code>backend/src/main/java/com/example/laptopstore/entity/Laptop.java</code>, <code>backend/src/main/java/com/example/laptopstore/security/SecurityConfig.java</code>
                      <br />💡 <strong>Role-Based Prompt:</strong> "Act as a Java Spring Boot expert. Analyze this backend structure. Explain: 1) The layered architecture pattern (Controller → Service → Repository), 2) How JPA entities are structured, 3) Spring Security configuration for JWT authentication, 4) Maven dependencies and their purposes."
                    </li>
                    
                    <li><strong>Step 3: Authentication Flow Deep Dive</strong>
                      <br />📁 <code>frontend/src/pages/Login.tsx</code>, <code>frontend/src/contexts/AuthContext.tsx</code>, <code>frontend/src/services/api.ts</code>, <code>backend/src/main/java/com/example/laptopstore/controller/AuthController.java</code>, <code>backend/src/main/java/com/example/laptopstore/security/JwtUtil.java</code>, <code>backend/src/main/java/com/example/laptopstore/security/JwtAuthenticationFilter.java</code>
                      <br />💡 <strong>Few-Shot Prompting:</strong> "Help me understand the authentication flow by showing examples. First, trace what happens when a user logs in: Frontend: Login form → API call, Backend: JWT generation, Frontend: Token storage. Then show how protected routes work when accessing `/api/v1/orders`."
                    </li>
                    
                    <li><strong>Step 4: Shopping Cart Implementation</strong>
                      <br />📁 <code>frontend/src/contexts/CartContext.tsx</code>, <code>frontend/src/pages/Cart.tsx</code>, <code>frontend/src/components/Laptop/LaptopCard.tsx</code>, <code>frontend/src/components/Layout/Header.tsx</code>
                      <br />💡 <strong>Self-Consistency Prompt:</strong> "Explain the shopping cart from three perspectives: 1) User Experience: How does adding/removing work from UI? 2) State Management: How is cart state managed (Context, localStorage)? 3) Data Flow: How does cart data flow to backend during checkout?"
                    </li>
                    
                    <li><strong>Step 5: Database Schema & Relationships</strong>
                      <br />📁 <code>backend/src/main/java/com/example/laptopstore/entity/User.java</code>, <code>backend/src/main/java/com/example/laptopstore/entity/Laptop.java</code>, <code>backend/src/main/java/com/example/laptopstore/entity/Mouse.java</code>, <code>backend/src/main/java/com/example/laptopstore/entity/Order.java</code>, <code>backend/src/main/java/com/example/laptopstore/entity/OrderItem.java</code>, <code>backend/src/main/resources/application.properties</code>, <code>backend/src/main/resources/data.sql</code>
                      <br />💡 <strong>Metacognitive Prompting:</strong> "I want to understand the database design. First, explain your reasoning process: How would you approach analyzing this schema? Then walk through: H2 configuration, JPA entity relationships (User, Laptop, Order, OrderItem), foreign key connections, and design decisions."
                    </li>
                  </ul>
                </div>
                <div className="difficulty-level junior">🎓 Advanced Analysis</div>
              </div>
            </div>

            <div className="exercise-item">
              <div className="exercise-number">2</div>
              <div className="exercise-content">
                <h3>Critical Bug Fix: Login Error Crash with AI Debugging</h3>
                <p className="exercise-description">
                  Master AI-assisted debugging using chain-of-thought reasoning to fix a critical TypeScript runtime error in the login system.
                </p>
                <div className="exercise-tasks">
                  <h4>🚨 Critical Issue to Solve:</h4>
                  <p>💥 The application crashes with TypeScript error when users enter wrong login credentials. Users see a blank page or error boundary instead of proper error message.</p>
                  
                  <h4>How to Reproduce:</h4>
                  <ol>
                    <li>Open browser Developer Tools (F12) → Console tab</li>
                    <li>Go to <code>/login</code> page</li>
                    <li>Enter wrong credentials (e.g., username: "wrong", password: "wrong")</li>
                    <li>Click "Sign In"</li>
                    <li>Page crashes → Check console for TypeScript error</li>
                  </ol>
                  
                  <h4>Expected Error in Console:</h4>
                  <div className="error-message">
                    <code>TypeError: Cannot read properties of undefined (reading 'toUpperCase')</code><br/>
                    <code>TS2339: Property 'message' does not exist on type 'string | &#123; message: string; timestamp: number &#125;'</code>
                  </div>
                  
                  <h4>🧠 AI-Assisted Debugging Tasks:</h4>
                  <ul>
                    <li><strong>Step 1: Root Cause Analysis</strong>
                    <br />📁 <code>frontend/src/pages/Login.tsx</code>, <code>frontend/src/types/api.ts</code>
                    <br />💡 <strong>Chain-of-Thought Prompt:</strong> "Act as a TypeScript debugging expert. Let's trace this error step by step: 1) What is the exact error on line 119? 2) What type does `errors.general` have? 3) Why does `.message.toUpperCase()` fail? 4) What are the possible values of `errors.general`?"
                    </li>
                    
                    <li><strong>Step 2: Type System Understanding</strong>
                    <br />📁 <code>frontend/src/contexts/AuthContext.tsx</code>, <code>frontend/src/services/api.ts</code>
                    <br />💡 <strong>Self-Consistency Prompt:</strong> "Explain the type mismatch from three angles: 1) Backend perspective: What does `/api/v1/auth/login` return? 2) AuthContext perspective: How are errors processed? 3) Component perspective: What type does Login.tsx expect?"
                    </li>
                    
                    <li><strong>Step 3: Defensive Programming Solution</strong>
                    <br />💡 <strong>Role-Based Prompt:</strong> "As a senior React developer, show me three different ways to safely handle this error type: 1) Type guards approach, 2) Helper function approach, 3) Simplified error handling approach. Explain pros/cons of each."
                    </li>
                    
                    <li><strong>Step 4: Implementation & Testing</strong>
                    <br />💡 <strong>Few-Shot Prompting:</strong> "Show me before/after code examples for fixing this. Before: `errors.general.message.toUpperCase()` (crashes). After: Safe version that handles both string and object types. Include test scenarios for invalid credentials and valid login."
                    </li>
                  </ul>
                  
                </div>
                <div className="difficulty-level senior">💥 Critical Bug Fix</div>
              </div>
            </div>

            <div className="exercise-item">
              <div className="exercise-number">3</div>
              <div className="exercise-content">
                <h3>Feature Development: Product Favorites with Modern Prompting</h3>
                <p className="exercise-description">
                  Learn React development using AI mentorship with step-by-step guidance, role-based prompting, and comprehensive feature implementation.
                </p>
                <div className="exercise-tasks">
                  <h4>🎯 Modern Prompting Techniques:</h4>
                  <p>✅ Step-by-Step Mentoring • Role-Based Learning • Pattern Recognition • Progressive Enhancement</p>
                  
                  <h4>Tasks with AI Mentorship:</h4>
                  <ul>
                    <li><strong>Step 1: Component Analysis & Planning</strong>
                      <br />📁 <code>frontend/src/components/Laptop/LaptopCard.tsx</code>, <code>frontend/src/components/Laptop/LaptopCard.css</code>, <code>frontend/src/contexts/CartContext.tsx</code>
                      <br />💡 <strong>Mentor Prompt:</strong> "Act as a React mentor for beginners. Analyze this LaptopCard component and explain: 1) Current structure and props, 2) Where I should add a favorite heart icon, 3) What React concepts I'll need (useState, event handlers, conditional rendering), 4) How localStorage integration works."
                    </li>
                    
                    <li><strong>Step 2: Context Development</strong>
                      <br />📁 <code>frontend/src/contexts/CartContext.tsx</code>
                      <br />💡 <strong>Pattern-Based Prompt:</strong> "Show me how to create a `FavoritesContext.tsx` following React best practices like CartContext. Include: 1) FavoritesProvider component, 2) useState for favorites array, 3) useEffect for localStorage sync, 4) addFavorite, removeFavorite, and isFavorite functions. Explain each part."
                    </li>
                    
                    <li><strong>Step 3: UI Implementation with Guidance</strong>
                      <br />📁 <code>frontend/src/components/Laptop/LaptopCard.tsx</code>, your custom FavoritesContext from Step 2
                      <br />💡 <strong>Step-by-Step Prompt:</strong> "Guide me through adding the heart icon step by step: 1) Import useFavorites hook, 2) Add heart icon (🤍/❤️) with absolute positioning, 3) Add click handler with event.stopPropagation(), 4) Show me the exact JSX and explain each part."
                    </li>
                    
                    <li><strong>Step 4: Styling with Best Practices</strong>
                      <br />📁 <code>frontend/src/components/Laptop/LaptopCard.css</code>
                      <br />💡 <strong>Design-Focused Prompt:</strong> "As a UI/UX designer, help me style the favorite heart: 1) Position absolutely in top-right corner, 2) Add hover effects and transitions, 3) Ensure accessibility (focus states), 4) Make it responsive. Provide complete CSS with explanations."
                    </li>
                    
                    <li><strong>Step 5: Favorites Page Creation</strong>
                      <br />📁 <code>frontend/src/pages/Laptops.tsx</code>, <code>frontend/src/App.tsx</code>, <code>frontend/src/components/Layout/Header.tsx</code>
                      <br />💡 <strong>Architecture Prompt:</strong> "Now let's create a Favorites page. Show me: 1) How to create Favorites.tsx component, 2) Filter laptops by favorites, 3) Handle empty state, 4) Add navigation link, 5) Update App.tsx routing. Follow the existing patterns in Laptops.tsx."
                    </li>
                  </ul>
                  
                  <div className="tips-box">
                    <h4>💡 Modern AI Learning Techniques:</h4>
                    <ul>
                      <li><strong>Role-Based Learning:</strong> Ask AI to act as mentor, designer, QA tester for different perspectives</li>
                      <li><strong>Step-by-Step Guidance:</strong> Break complex tasks into smaller, manageable steps</li>
                      <li><strong>Pattern Recognition:</strong> Learn by following existing patterns in the codebase</li>
                      <li><strong>Progressive Enhancement:</strong> Start with basic functionality, then enhance</li>
                      <li><strong>Validation Loops:</strong> Always ask "What could go wrong?" and "How do I test this?"</li>
                    </ul>
                  </div>
                  
                </div>
                <div className="difficulty-level junior">❤️ Feature Development</div>
              </div>
            </div>

            <div className="exercise-item">
              <div className="exercise-number">4</div>
              <div className="exercise-content">
                <h3>Full-Stack Integration: Adding Computer Mice with Modern API Patterns</h3>
                <p className="exercise-description">
                  Master full-stack development using pattern-based learning and systematic API integration with our Java Spring Boot backend.
                </p>
                <div className="exercise-tasks">
                  <h4>✅ Backend Verified - Ready to Use!</h4>
                  <p><strong>Available Endpoints:</strong> <code>GET /api/v1/mice</code> • <code>GET /api/v1/mice/&#123;id&#125;</code> (Port 8000)</p>
                  <p><strong>Sample Data:</strong> 12 mice with realistic gaming/productivity specifications</p>
                  
                  <h4>🚀 Modern Full-Stack Development Tasks:</h4>
                  <ul>
                    <li><strong>Step 1: API Analysis & Pattern Recognition</strong>
                      <br />📁 <code>frontend/src/types/api.ts</code>, <code>frontend/src/services/api.ts</code>, <code>frontend/src/components/Laptop/LaptopCard.tsx</code>, <code>frontend/src/pages/Laptops.tsx</code>
                      <br />💡 <strong>Pattern-Based Prompt:</strong> "Analyze the laptop implementation pattern. Explain: 1) TypeScript interface structure, 2) API service methods, 3) Component architecture, 4) Cart integration. Then outline the exact steps to replicate this for mice."
                    </li>
                    
                    <li><strong>Step 2: Type-Safe API Integration</strong>
                      <br />💡 <strong>TypeScript Expert Prompt:</strong> "Act as a TypeScript expert. Create the Mouse interface with these fields: id, brand, model, mouse_type, connectivity, dpi, buttons, rgb_lighting, weight_grams, price, stock_quantity, created_at. Explain each field's purpose and type reasoning."
                    </li>
                    
                    <li><strong>Step 3: Service Layer Implementation</strong>
                      <br />📁 <code>frontend/src/services/api.ts</code>, your Mouse interface from Step 2
                      <br />💡 <strong>Systematic Prompt:</strong> "Following the laptop service pattern, add getMice() and getMouseById() methods. Include: 1) Proper error handling, 2) Type annotations, 3) Authentication headers, 4) Consistent naming conventions. Show before/after code."
                    </li>
                    
                    <li><strong>Step 4: Component Development</strong>
                      <br />📁 <code>frontend/src/components/Laptop/LaptopCard.tsx</code>, <code>frontend/src/components/Laptop/LaptopCard.css</code>, your Mouse interface and API methods from previous steps
                      <br />💡 <strong>Component Architecture Prompt:</strong> "Create MouseCard component by adapting LaptopCard. Focus on: 1) Mouse-specific specs display (DPI, connectivity, RGB), 2) Cart integration with 'mice' type, 3) Styling consistency, 4) Responsive design. Explain key differences from laptop cards."
                    </li>
                    
                    <li><strong>Step 5: Page Implementation & Routing</strong>
                      <br />📁 <code>frontend/src/pages/Laptops.tsx</code>, <code>frontend/src/App.tsx</code>, <code>frontend/src/components/Layout/Header.tsx</code>, your MouseCard component from Step 4
                      <br />💡 <strong>Architecture Prompt:</strong> "Create complete Mice page following Laptops.tsx pattern: 1) State management, 2) Loading states, 3) Error handling, 4) Search/filter functionality, 5) Routing setup. Maintain architectural consistency."
                    </li>
                  </ul>
                  
                  <div className="api-reference">
                    <h4>📚 Backend API Reference:</h4>
                    <div className="api-endpoint">
                      <strong>GET /api/v1/mice</strong>
                      <ul>
                        <li><strong>Response:</strong> Array of Mouse objects</li>
                        <li><strong>Fields:</strong> snake_case JSON (mouse_type, rgb_lighting, etc.)</li>
                        <li><strong>Sample:</strong> 12 realistic mice with gaming/productivity specs</li>
                      </ul>
                    </div>
                  </div>
                  
                </div>
                <div className="difficulty-level intermediate">🖱️ Full-Stack Integration</div>
              </div>
            </div>

            <div className="exercise-item">
              <div className="exercise-number">5</div>
              <div className="exercise-content">
                <h3>Advanced API Integration: Order Cancellation with Error Handling</h3>
                <p className="exercise-description">
                  Master complex API integration using systematic debugging, comprehensive error handling, and user experience optimization.
                </p>
                <div className="exercise-tasks">
                  <h4>✅ Backend API Verified & Ready!</h4>
                  <p><strong>Endpoint:</strong> <code>DELETE /api/v1/orders/&#123;orderId&#125;</code></p>
                  <p><strong>Features:</strong> JWT auth required • Only PENDING orders • Inventory restoration</p>
                  
                  <h4>🔧 Advanced Integration Tasks:</h4>
                  <ul>
                    <li><strong>Step 1: API Integration Analysis</strong>
                      <br />📁 <code>frontend/src/pages/Orders.tsx</code>, <code>frontend/src/services/api.ts</code>, <code>frontend/src/contexts/AuthContext.tsx</code>
                      <br />💡 <strong>API Expert Prompt:</strong> "Act as an API integration specialist. Analyze the current order system and plan the cancellation feature: 1) Current order display structure, 2) Authentication requirements, 3) Error handling patterns, 4) State management approach."
                    </li>
                    
                    <li><strong>Step 2: Service Layer Implementation</strong>
                      <br />📁 <code>frontend/src/services/api.ts</code>, <code>frontend/src/types/api.ts</code>
                      <br />💡 <strong>Chain-of-Thought Prompt:</strong> "Let's build the deleteOrder service method step by step: 1) What HTTP method and endpoint? 2) What headers are needed? 3) What response format to expect? 4) How to handle different error status codes? Show the complete implementation."
                    </li>
                    
                    <li><strong>Step 3: Comprehensive Error Handling</strong>
                      <br />💡 <strong>Error Handling Expert Prompt:</strong> "Design error handling for all scenarios: 1) 200: Success, 2) 401: Unauthorized, 3) 404: Order not found, 4) 400: Cannot cancel (not pending), 5) Network errors. Create user-friendly error messages for each case."
                    </li>
                    
                    <li><strong>Step 4: UI/UX Implementation</strong>
                      <br />📁 <code>frontend/src/pages/Orders.tsx</code>, your deleteOrder service method from Step 2, <code>frontend/src/components/Laptop/LaptopCard.tsx</code>
                      <br />💡 <strong>UX Designer Prompt:</strong> "Design the cancellation UX: 1) When to show cancel button (only pending), 2) Confirmation dialog design, 3) Loading states, 4) Success/error feedback, 5) Optimistic updates. Focus on preventing user mistakes."
                    </li>
                  </ul>
                  
                  <div className="api-reference">
                    <h4>📚 Verified API Specification:</h4>
                    <div className="api-endpoint">
                      <strong>DELETE /api/v1/orders/&#123;orderId&#125;</strong>
                      <ul>
                        <li><strong>Auth:</strong> JWT Bearer token required</li>
                        <li><strong>Permissions:</strong> Users can only cancel own orders</li>
                        <li><strong>Business Rule:</strong> Only PENDING status orders can be cancelled</li>
                        <li><strong>Success Response:</strong> <code>&#123;"message": "Order deleted successfully"&#125;</code></li>
                        <li><strong>Side Effects:</strong> Automatically restores inventory to stock</li>
                        <li><strong>Error Codes:</strong> 401 (auth), 404 (not found), 400 (cannot cancel)</li>
                      </ul>
                    </div>
                  </div>
                  
                </div>
                <div className="difficulty-level intermediate">🔗 Advanced API Integration</div>
              </div>
            </div>

          </div>

          <div className="tips-section">
            <h2>🧠 Modern AI Prompting Techniques Reference</h2>
            <div className="tips-grid">
              <div className="tip-card">
                <h4>🔗 Chain-of-Thought</h4>
                <p>Ask AI to explain its reasoning step-by-step: "Walk me through this step by step..."</p>
              </div>
              <div className="tip-card">
                <h4>🎭 Role-Based Prompting</h4>
                <p>Ask AI to act as an expert: "Act as a senior React developer..." or "As a TypeScript expert..."</p>
              </div>
              <div className="tip-card">
                <h4>📋 Few-Shot Learning</h4>
                <p>Provide examples: "Show me before/after examples..." or "Give me 3 different approaches..."</p>
              </div>
              <div className="tip-card">
                <h4>🔄 Self-Consistency</h4>
                <p>Ask for multiple perspectives: "Explain this from 3 different angles..." to verify understanding</p>
              </div>
              <div className="tip-card">
                <h4>🧠 Metacognitive</h4>
                <p>Ask AI to explain its thinking: "First explain your approach, then solve the problem..."</p>
              </div>
              <div className="tip-card">
                <h4>🔍 Systematic Analysis</h4>
                <p>Break down complex problems: "Analyze this systematically: 1) Current state, 2) Desired state, 3) Steps to get there"</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Exercises;
