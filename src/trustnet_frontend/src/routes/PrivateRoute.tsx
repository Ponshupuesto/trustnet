// routes/PrivateRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import LoadingSpinner from '../components/common/LoadingSpinner';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoggingIn } = useAuth();
  
  // Mientras se verifica la autenticación, mostrar loading
  if (isLoggingIn) {
    return <LoadingSpinner />;
  }
  
  // Si no está autenticado, redirigir a landing
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  // Si está autenticado, mostrar el contenido
  return <>{children}</>;
};

export default PrivateRoute;