import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../auth/index.jsx';
import { isTokenExpired } from '../isTokenValid';

export const ProtectRoutes = () => {
  const { cookies, logout } = useAuth();
  const token = cookies.token;

  if (!token || isTokenExpired(token)) {
    // If the token is expired or not present, log out and redirect to the home page
    logout();
    return <Navigate to='/' />;
  }

  // If the token is valid, render the child routes
  return <Outlet />;
};
