// src/utils/auth.js
import { jwtDecode } from "jwt-decode";

export function isTokenExpired(token) {
  if (!token) return true;
  try {
    const { exp } = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds since epoch
    console.log(currentTime) 
    return exp < currentTime; // true if token is expired
  } catch (error) {
    console.error("Error decoding token:", error);
    return true; // Consider token expired if decoding fails
  }
}

