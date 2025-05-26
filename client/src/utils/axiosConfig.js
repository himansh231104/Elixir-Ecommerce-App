import axios from 'axios';

const API = axios.create({
  // baseURL: `${process.env.REACT_APP_API_URL}/api`, // Change this to your backend base URL
  baseURL: `http://localhost:5000/api`, // Change this to your backend base URL
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
