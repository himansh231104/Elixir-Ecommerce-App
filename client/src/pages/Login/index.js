import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './style.css';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  const { login, signup } = useAuth();

  useEffect(() => {
    // Animation effect when component mounts
    const loginContainer = document.querySelector('.login-page .container');
    if (loginContainer) {
      loginContainer.classList.add('active');
    }
    
    // Set the minimum height based on the window height
    const setMinHeight = () => {
      const loginPage = document.querySelector('.login-page');
      if (loginPage) {
        loginPage.style.minHeight = window.innerHeight + 'px';
      }
    };
    
    // Initial set and event listener for resize
    setMinHeight();
    window.addEventListener('resize', setMinHeight);
    
    return () => {
      window.removeEventListener('resize', setMinHeight);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      // Basic validation
      if (isSignUp && password !== confirmPassword) {
        throw new Error('Passwords do not match');
      }
      
      // Create a user object with form data
      const userData = {
        email,
        password,
      };
      
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (isSignUp) {
        // Handle signup
        signup(userData);
      } else {
        // Handle login
        login(userData);
      }
      
      // Redirect to home page after successful authentication
      navigate('/');
      
    } catch (err) {
      setError(err.message || 'Authentication failed');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleForm = () => {
    const formContainer = document.querySelector('.login-page .form-container');
    formContainer.classList.add('flip');
    
    // Reset form fields and errors
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setError('');
    
    setTimeout(() => {
      setIsSignUp(!isSignUp);
      formContainer.classList.remove('flip');
    }, 600);
  };

  return (
    <div className="login-page">
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      
      <div className="container">
        <div className="brand">
          <div className="logo">
            <span className="logo-text">Elixir</span>
            <span className="logo-dot"></span>
          </div>
          <p className="tagline">Discover the magic of shopping</p>
        </div>
        
        <div className="form-container">
          <h2>{isSignUp ? 'Create Account' : 'Welcome Back'}</h2>
          <p className="form-subtitle">
            {isSignUp 
              ? 'Join the Elixir community today' 
              : 'Sign in to access your account'}
          </p>
          
          {error && <div className="error-message">{error}</div>}
          
          <form onSubmit={handleSubmit}>
            {isSignUp && (
              <div className="input-group">
                <input
                  type="text"
                  name="fullName"
                  required
                  placeholder="Full Name"
                />
                <span className="highlight"></span>
              </div>
            )}
            
            <div className="input-group">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Email"
              />
              <span className="highlight"></span>
            </div>
            
            <div className="input-group">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Password"
                minLength="6"
              />
              <span className="highlight"></span>
            </div>
            
            {isSignUp && (
              <div className="input-group">
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  placeholder="Confirm Password"
                  minLength="6"
                />
                <span className="highlight"></span>
              </div>
            )}
            
            {!isSignUp && (
              <div className="remember-forgot">
                <label className="remember">
                  <input type="checkbox" />
                  <span className="checkmark"></span>
                  Remember me
                </label>
                <a href="/#" className="forgot">Forgot password?</a>
              </div>
            )}
            
            <button 
              type="submit" 
              className={`submit-btn ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="loader"></span>
              ) : (
                isSignUp ? 'Create Account' : 'Sign In'
              )}
            </button>
          </form>
          
          <div className="divider">
            <span>or</span>
          </div>
          
          <div className="social-login">
            <button className="social-btn google" type="button">
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Continue with Google
            </button>
            <button className="social-btn facebook" type="button">
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" fill="#1877F2" />
              </svg>
              Continue with Facebook
            </button>
          </div>
          
          <p className="toggle-form">
            {isSignUp 
              ? 'Already have an account? ' 
              : 'Don\'t have an account? '}
            <button type="button" onClick={toggleForm}>
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </button>
          </p>
        </div>
        
        <div className="footer">
          <p>Developed & Designed by CrimsonX (Himanshu Raj) | &copy; 2025 Elixir</p>
        </div>
      </div>
    </div>
  );
};