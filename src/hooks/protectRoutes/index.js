iimport { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../auth';
import { isTokenExpired } from '../isTokenValid';

export const ProtectRoutes = () => {
    const { cookies, logout } = useAuth();
    const token = cookies.token;

    if (!token || isTokenExpired(token)) {
        //if (isTokenExpired(token)) console.log("token expired")
        logout();
        return <Navigate to='/' />;
      }

      return <Outlet />;
};
