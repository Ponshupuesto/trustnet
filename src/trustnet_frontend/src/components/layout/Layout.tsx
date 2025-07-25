// components/layout/Layout.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Aquí puedes agregar header/footer públicos si lo necesitas */}
      <Outlet />
    </div>
  );
};

export default Layout;

