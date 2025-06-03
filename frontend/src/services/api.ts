import axios, { AxiosResponse } from 'axios';
import type { 
  User, 
  UserCreate, 
  UserLogin, 
  Token, 
  Laptop, 
  Order, 
  OrderCreate,
  OrderUpdate,
  ApiError 
} from '../types/api';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

class ApiService {
  // Health check
  async healthCheck(): Promise<{ message: string }> {
    const response = await api.get('/');
    return response.data;
  }

  // Auth methods
  async register(userData: UserCreate): Promise<User> {
    const response = await api.post('/api/v1/users/register', userData);
    return response.data;
  }

  async login(credentials: UserLogin): Promise<Token> {
    const response = await api.post('/api/v1/users/login', credentials);
    return response.data;
  }

  // Laptop methods
  async getLaptops(): Promise<Laptop[]> {
    const response = await api.get('/api/v1/laptops');
    return response.data;
  }

  async getLaptop(id: number): Promise<Laptop> {
    const response = await api.get(`/api/v1/laptops/${id}`);
    return response.data;
  }

  // Order methods
  async createOrder(order: OrderCreate): Promise<Order> {
    const response = await api.post('/api/v1/orders', order);
    return response.data;
  }

  async getOrders(): Promise<Order[]> {
    const response = await api.get('/api/v1/orders');
    return response.data;
  }

  async getOrder(id: number): Promise<Order> {
    const response = await api.get(`/api/v1/orders/${id}`);
    return response.data;
  }

  async updateOrder(id: number, order: OrderUpdate): Promise<Order> {
    const response = await api.put(`/api/v1/orders/${id}`, order);
    return response.data;
  }

}

export const apiService = new ApiService();
export default apiService;
