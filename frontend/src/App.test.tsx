import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

// Mock the api service to avoid network calls in tests
jest.mock('./services/api', () => ({
  apiService: {
    getLaptops: jest.fn(() => Promise.resolve([])),
    getMice: jest.fn(() => Promise.resolve([])),
    login: jest.fn(() => Promise.resolve({ access_token: 'fake-token', user_id: 1 })),
    register: jest.fn(() => Promise.resolve({ access_token: 'fake-token', user_id: 1 })),
    getOrders: jest.fn(() => Promise.resolve([])),
    createOrder: jest.fn(() => Promise.resolve({ id: 1, total_amount: 100 })),
  }
}));

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock as any;

describe('App Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null);
    
    // Suppress console.error for tests since we're expecting API failures
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('renders app without crashing', async () => {
    render(<App />);
    
    // Wait for the component to render and check for the header
    await waitFor(() => {
      expect(screen.getByRole('banner')).toBeInTheDocument();
    });
  });

  test('renders navigation links', async () => {
    render(<App />);
    
    await waitFor(() => {
      // Look for navigation links specifically
      const nav = screen.getByRole('navigation');
      expect(nav).toBeInTheDocument();
      
      // Check for specific navigation links
      expect(screen.getAllByText(/home/i)[0]).toBeInTheDocument();
      expect(screen.getAllByText(/laptops/i)[0]).toBeInTheDocument();
      expect(screen.getByText(/exercises/i)).toBeInTheDocument();
    });
  });

  test('shows login and register links when not authenticated', async () => {
    render(<App />);
    
    await waitFor(() => {
      expect(screen.getByText(/login/i)).toBeInTheDocument();
      expect(screen.getByText(/register/i)).toBeInTheDocument();
    });
  });

  test('shows cart link in navigation', async () => {
    render(<App />);
    
    await waitFor(() => {
      // Look for cart specifically in the navigation
      expect(screen.getByText(/🛒 cart/i)).toBeInTheDocument();
    });
  });
});
