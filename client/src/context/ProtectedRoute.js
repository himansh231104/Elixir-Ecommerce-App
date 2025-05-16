import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

// Component to protect routes that require authentication
export const ProtectedRoute = ({ children }) => {
  const { currentUser, isLoading } = useAuth();
  
  // Show loading state while checking authentication
  if (isLoading) {
    return <div className="loading-screen">Loading...</div>;
  }
  
  // Redirect to login if not authenticated
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  
  // Render the protected component if authenticated
  return children;
};

// Component to redirect authenticated users away from login/signup
export const AuthRedirect = ({ children }) => {
  const { currentUser, isLoading } = useAuth();
  
  // Show loading state while checking authentication
  if (isLoading) {
    return <div className="loading-screen">Loading...</div>;
  }
  
  // Redirect to home if already authenticated
  if (currentUser) {
    return <Navigate to="/" />;
  }
  
  // Render the login/signup component if not authenticated
  return children;
};