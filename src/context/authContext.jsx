import { createContext, useState } from 'react';
import { useNavigate } from 'react-router';
import { loginUser, registerUser } from '../utils/API';

export const AuthContext = createContext();

function useAuth() {
  const user = localStorage.getItem('user');
  const [isAuth, setIsAuth] = useState(user ? true : false);
  const nav = useNavigate();

  async function register(registerData) {
    try {
      const userData = await registerUser(registerData);
      localStorage.setItem('user', JSON.stringify(userData));
      setIsAuth(true);
    } catch (err) {
      console.log(`useAuth register: ${err}`);
      throw err;
    }
  }

  async function login(loginData) {
    try {
      const userData = await loginUser(loginData);
      localStorage.setItem('user', JSON.stringify(userData));
      setIsAuth(true);
    } catch (err) {
      console.log(`useAuth login: ${err}`);
      throw err;
    }
  }

  function logout() {
    localStorage.removeItem('user');
    setIsAuth(false);
    nav('/');
  }

  return { isAuth, register, login, logout };
}

export function AuthProvider({ children }) {
  const auth = useAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}
