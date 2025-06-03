import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { validateUsername } from '../utils/validation';
import './Auth.css';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ username?: string; password?: string; general?: any }>({});
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Get the page user was trying to access before login
  const from = (location.state as any)?.from?.pathname || '/';

  // Check for persisted login error on component mount
  useEffect(() => {
    const persistedError = sessionStorage.getItem('login_error');
    if (persistedError) {
      // BUG: Assuming it's JSON but it's actually a string - will crash when accessing .message
      setErrors({ general: persistedError });
      sessionStorage.removeItem('login_error');
    }
  }, []);

  const validateForm = (): boolean => {
    const newErrors: { username?: string; password?: string } = {};

    // Username validation
    const usernameValidation = validateUsername(username);
    if (!usernameValidation.isValid) {
      newErrors.username = usernameValidation.error;
    }

    // Password validation
    if (!password.trim()) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      const result = await login({ username: username.trim(), password });
      
      if (result.success) {
        navigate(from, { replace: true });
      } else {
        // Store error in sessionStorage to persist across remounts
        const errorMessage = result.error || 'Login failed';
        // BUG: Setting string instead of object - will crash when trying to access .message
        sessionStorage.setItem('login_error', errorMessage);
        setErrors({ general: errorMessage });
      }
    } catch (error) {
      const errorMessage = 'An unexpected error occurred';
      // BUG: Setting string instead of object - will crash when trying to access .message
      sessionStorage.setItem('login_error', errorMessage);
      setErrors({ general: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <h1>Welcome Back</h1>
          <p>Sign in to your account to continue shopping</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form" autoComplete="off">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={errors.username ? 'error' : ''}
              placeholder="Enter your username"
              disabled={isLoading}
            />
            {errors.username && <span className="error-message">{errors.username}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={errors.password ? 'error' : ''}
              placeholder="Enter your password"
              disabled={isLoading}
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>

          {errors.general && (
            <div className="general-error">
              {(errors.general as any).message.toUpperCase()}
            </div>
          )}

          <button 
            type="submit" 
            className="auth-button"
            disabled={isLoading}
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Don't have an account?{' '}
            <Link to="/register" className="auth-link">
              Create one here
            </Link>
          </p>
        </div>

        {/* Demo Account Info */}
        <div className="demo-info">
          <h3>Demo Accounts</h3>
          <p>You can use these test accounts:</p>
          <div className="demo-accounts">
            <div className="demo-account">
              <strong>Username:</strong> john_doe<br/>
              <strong>Password:</strong> password123
            </div>
            <div className="demo-account">
              <strong>Username:</strong> jane_smith<br/>
              <strong>Password:</strong> securepass456
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
