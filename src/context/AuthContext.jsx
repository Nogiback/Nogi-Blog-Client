import { createContext, useState } from 'react';
import { useNavigate } from 'react-router';
import { loginUser, registerUser } from '../utils/API';

export const AuthContext = createContext();

function useAuth() {
  const user = localStorage.getItem('user');
  const [isAuth, setIsAuth] = useState(user ? true : false);
  const [isAuthor, setIsAuthor] = useState(
    user ? JSON.parse(user).user.isAuthor : false,
  );
  const [currentUser, setCurrentUser] = useState(
    user ? JSON.parse(user).user._id : '',
  );
  const nav = useNavigate();

  async function register(registerData) {
    try {
      await registerUser(registerData);
    } catch (err) {
      console.log(`useAuth Register: ${err}`);
      throw err;
    }
  }

  async function login(loginData) {
    try {
      const userData = await loginUser(loginData);
      localStorage.setItem('user', JSON.stringify(userData));
      setIsAuth(true);
      if (userData.user.isAuthor) {
        setIsAuthor(true);
      } else {
        setIsAuthor(false);
      }
      if (userData) {
        setCurrentUser(userData.user._id);
      } else {
        setCurrentUser('');
      }
    } catch (err) {
      console.log(`useAuth Login: ${err}`);
      throw err;
    }
  }

  function logout() {
    localStorage.removeItem('user');
    setIsAuth(false);
    setIsAuthor(false);
    nav('/');
  }

  return { isAuth, isAuthor, currentUser, register, login, logout };
}

export function AuthProvider({ children }) {
  const auth = useAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}
