import axios from 'axios';

// Ensure that you have set BACKEND_API_URL in your .env file
const api = axios.create({
  baseURL: process.env.BACKEND_API_URL || "type base url here", // Use the URL from the .env file
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 60000
});

export default api;

