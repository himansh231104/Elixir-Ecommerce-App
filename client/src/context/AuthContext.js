import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const login = async ({ email, password }) => {
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', {
        email,
        password,
      });

      if (response.data && response.data.token) {
        localStorage.setItem('token', response.data.token);
        setCurrentUser(response.data.user); // assuming your backend sends user object
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const signup = async (userData) => {
    try {
      const response = await axios.post('http://localhost:5000/api/users/signup', userData);
      if (response.data && response.data.token) {
        localStorage.setItem('token', response.data.token);
        setCurrentUser(response.data.user);
        return true;
      }
      return false;
    } catch (err) {
      console.error('Signup failed:', err);
      return false;
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('token');
  };

  // Restore user session from token
  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      axios.get('http://localhost:5000/api/users/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setCurrentUser(res.data);
      })
      .catch((err) => {
        console.error('Invalid or expired token:', err);
        localStorage.removeItem('token');
        setCurrentUser(null);
      })
      .finally(() => {
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }
  }, []);

  const value = {
    currentUser,
    isLoading,
    login,
    signup,
    logout,
    isAuthenticated: !!currentUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
