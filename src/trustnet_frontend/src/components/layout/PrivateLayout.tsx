import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Users, LogOut, User, LayoutDashboard } from 'lucide-react';

const PrivateLayout: React.FC = () => {
  const { logout, identity } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout(); // clear no es async según tu ejemplo
    navigate('/');
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/dashboard" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">Trustnet</span>
            </Link>
            
            {/* Navigation Links */}
            <div className="flex items-center space-x-6">
              <Link 
                to="/dashboard" 
                className="flex items-center space-x-1 text-gray-700 hover:text-purple-600 transition-colors"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Dashboard</span>
              </Link>
              <Link 
                to="/profile" 
                className="flex items-center space-x-1 text-gray-700 hover:text-purple-600 transition-colors"
              >
                <User className="w-4 h-4" />
                <span>Perfil</span>
              </Link>
            </div>
            
            {/* User Info & Logout */}
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                {identity?.getPrincipal().toString().slice(0, 10)}...
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-1 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Salir</span>
              </button>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default PrivateLayout;