import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

interface Context {
  isAuth: boolean;
}

export default function ProtectedRoute({ children }) {
  const { isAuth } = useContext<Context>(AuthContext);

  return isAuth ? children : <Navigate to='/login' replace />;
}
