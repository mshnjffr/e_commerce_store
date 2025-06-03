// API Types for the Laptop Store

export interface User {
  id: number;
  username: string;
  email: string;
  created_at: string;
}

export interface UserCreate {
  username: string;
  email: string;
  password: string;
}

export interface UserLogin {
  username: string;
  password: string;
}

export interface Token {
  access_token: string;
  token_type: string;
}

export interface Laptop {
  id: number;
  brand: string;
  model: string;
  processor: string;
  ram_gb: number;
  storage_gb: number;
  graphics: string;
  screen_size: number;
  price: number;
  stock_quantity: number;
  created_at: string;
}


// Product types for cart - unified interface
export type Product = Laptop;

export interface CartItem {
  id: string; // unique identifier for cart item (e.g., "laptop-1" or "mice-1")
  type: 'laptop' | 'mice';
  product: Product;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  totalItems: number;
  totalAmount: number;
}

// Backend order types (supports both laptops and mice)
export interface OrderItem {
  laptop_id?: number;
  quantity: number;
}

export interface OrderCreate {
  items: OrderItem[];
}

export interface OrderItemResponse {
  id: number;
  order_id: number;
  laptop_id?: number;
  quantity: number;
  unit_price: number;
  laptop?: Laptop;
}

export interface Order {
  id: number;
  user_id: number;
  total_amount: number;
  status: string;
  items: OrderItemResponse[];
  created_at: string;
  updated_at: string;
}

export interface OrderUpdate {
  items: OrderItem[];
}

export interface ApiError {
  detail: string;
}
