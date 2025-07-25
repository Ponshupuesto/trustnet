// hooks/useAuth.tsx
import { useInternetIdentity } from "ic-use-internet-identity";

export const useAuth = () => {
  const { identity, login, clear, isLoggingIn } = useInternetIdentity();
  
  return {
    identity,
    login,
    logout: clear, // clear es el método para cerrar sesión
    isLoggingIn,
    isAuthenticated: !!identity // si existe identity, está autenticado
  };
};