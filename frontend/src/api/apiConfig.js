// src/api/apiConfig.js
import axios from 'axios';

const apiBaseUrl = window.location.hostname === 'localhost'
  ? 'http://127.0.0.1:8000/api'
  : 'https://jobs-backend-uuqf.onrender.com/api';

const API = axios.create({
  baseURL: apiBaseUrl,
});

// Automatically attach token to all requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
