// components/common/LoadingSpinner.tsx
import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin"></div>
        <div className="mt-4 text-white text-center">
          <p className="text-sm text-gray-400">Verificando identidad...</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;