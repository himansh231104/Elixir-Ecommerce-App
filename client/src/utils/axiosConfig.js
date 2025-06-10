import axios from 'axios';

const API = axios.create({
  // baseURL: `${process.env.REACT_APP_API_URL}/api`, 
  baseURL: `http://localhost:5000/api`, 
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach token to headers if present in localStorage
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default API;
