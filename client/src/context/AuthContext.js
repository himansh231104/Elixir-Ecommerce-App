import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the authentication context
const AuthContext = createContext(null);

// Custom hook for using the auth context
export const useAuth = () => useContext(AuthContext);

// Provider component
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing user on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  // Login function
  const login = (userData) => {
    // Store user in state and localStorage
    setCurrentUser(userData);
    localStorage.setItem('currentUser', JSON.stringify(userData));
    return true;
  };

  // Signup function
  const signup = (userData) => {
    // In a real app, you would send this to your backend first
    // Then store the user data after successful registration
    setCurrentUser(userData);
    localStorage.setItem('currentUser', JSON.stringify(userData));
    return true;
  };

  // Logout function
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  // Value object that will be shared
  const value = {
    currentUser,
    isLoading,
    login,
    signup,
    logout,
    isAuthenticated: !!currentUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};