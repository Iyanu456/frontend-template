import { createContext, useContext, useMemo, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { isTokenExpired } from '../isTokenValid';
//import { useMemo } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const navigate = useNavigate();
  const [cookies, setCookies, removeCookie] = useCookies();

  useEffect(() => {
    const token = cookies.token;
    if (token && isTokenExpired(token)) {
      logout();
    }
  }, [cookies]);

  const login = async ({ email, password }) => {
    try {
      const res = await api.post('/login', { email, password });
      setCookies('token', res.data.token);
      setCookies('name', res.data.name);
      navigate('/dashboard/user');
      return res.data;
    } catch (error) {
      console.error('Login Error:', error);
      if (error.response && error.response.data) {
        return error.response.data;
      } else {
        return { error: 'An unknown error occurred.' };
      }
    }
  };

  const signup = async ({ email, password, role }) => {
    try {
      const res = await api.post('/signup', { email, password, role });
      setCookies('token', res.data.token);
      setCookies('name', res.data.name);
      navigate('/dashboard/user');
      return res.data;
    } catch (error) {
      console.error('Signup Error:', error);
      if (error.response && error.response.data) {
        return error.response.data;
      } else {
        return { error: 'An unknown error occurred.' };
      }
    }
  };

  const logout = () => {
    ['token', 'name'].forEach(obj => removeCookie(obj));
    navigate('/');
  };

  const value = useMemo(() => ({ cookies, login, signup, logout }), [cookies]);

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export const useAuth = () => useContext(UserContext);

