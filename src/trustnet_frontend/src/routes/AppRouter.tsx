// routes/AppRouter.tsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import PrivateRoute from './PrivateRoute';

// Pages
import Landing from '../pages/LandingPage';
import WelcomeScreen from '../pages/WelcomeScreen';
import ProfileSetup from '../pages/ProfileSetup';
import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';

// Layouts
import Layout from '../components/layout/Layout';
import PrivateLayout from '../components/layout/PrivateLayout';

// Hook para verificar si el usuario tiene perfil
const useUserProfile = () => {
  const { identity } = useAuth();
  const [hasProfile, setHasProfile] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const checkProfile = async () => {
      if (!identity) {
        setIsLoading(false);
        return;
      }
      
      try {
        // Aquí llamarías a tu backend para verificar si existe el perfil
        // Por ejemplo:
        // const profile = await actor.getProfile(identity.getPrincipal());
        // setHasProfile(!!profile);
        
        // Por ahora, simulamos con localStorage
        const profileKey = `profile_${identity.getPrincipal().toString()}`;
        const savedProfile = localStorage.getItem(profileKey);
        setHasProfile(!!savedProfile);
      } catch (error) {
        console.error('Error checking profile:', error);
        setHasProfile(false);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkProfile();
  }, [identity]);
  
  return { hasProfile, isLoading };
};

const AppRouter: React.FC = () => {
  const { isAuthenticated, identity } = useAuth();
  const { hasProfile, isLoading } = useUserProfile();
  const [showWelcome, setShowWelcome] = useState(true);
  
  // Si está cargando, mostrar loading
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin mx-auto"></div>
          <p className="text-white mt-4">Cargando...</p>
        </div>
      </div>
    );
  }
  
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas Públicas */}
        <Route path="/" element={<Layout />}>
          <Route 
            index 
            element={
              isAuthenticated ? (
                hasProfile ? (
                  <Navigate to="/dashboard" replace />
                ) : (
                  <Navigate to="/welcome" replace />
                )
              ) : (
                <Landing />
              )
            } 
          />
        </Route>
        
        {/* Ruta de Bienvenida - Solo para usuarios autenticados sin perfil */}
        <Route
          path="/welcome"
          element={
            <PrivateRoute>
              {hasProfile ? (
                <Navigate to="/dashboard" replace />
              ) : showWelcome ? (
                <WelcomeScreen 
                  principalId={identity?.getPrincipal().toString() || ''}
                  onContinue={() => setShowWelcome(false)}
                />
              ) : (
                <Navigate to="/profile/setup" replace />
              )}
            </PrivateRoute>
          }
        />
        
        {/* Ruta de Configuración de Perfil */}
        <Route
          path="/profile/setup"
          element={
            <PrivateRoute>
              {hasProfile ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <ProfileSetup 
                  onComplete={() => {
                    // Marcar que el perfil fue creado
                    const profileKey = `profile_${identity?.getPrincipal().toString()}`;
                    localStorage.setItem(profileKey, 'true');
                    window.location.href = '/dashboard'; // Forzar recarga para actualizar hasProfile
                  }}
                />
              )}
            </PrivateRoute>
          }
        />
        
        {/* Rutas Privadas - Solo para usuarios con perfil completo */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              {!hasProfile ? (
                <Navigate to="/welcome" replace />
              ) : (
                <PrivateLayout />
              )}
            </PrivateRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          {/* Más rutas privadas */}
        </Route>
        
        {/* Ruta 404 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;