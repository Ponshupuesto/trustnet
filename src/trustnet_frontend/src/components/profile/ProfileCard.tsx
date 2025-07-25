// components/profile/ProfileCard.tsx
import React, { useRef } from 'react';
import { User, MapPin, Camera, Network, Users, Shield } from 'lucide-react';

interface ProfileCardProps {
  profileData: {
    displayName: string;
    bio: string;
    location: string;
    showLocation: boolean;
    photoUrl?: string;
  };
  editingData?: {
    displayName: string;
    bio: string;
    location: string;
    showLocation: boolean;
    photoUrl?: string;
  };
  isEditing: boolean;
  onUpdateField: (field: string, value: any) => void;
  onPhotoChange: (file: File) => void;
  tempPhoto?: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  profileData,
  editingData,
  isEditing,
  onUpdateField,
  onPhotoChange,
  tempPhoto
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const currentData = isEditing && editingData ? editingData : profileData;
  
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onPhotoChange(file);
    }
  };
  
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Cover Background */}
      <div className="h-32 bg-gradient-to-r from-purple-600 to-blue-600"></div>
      
      {/* Profile Content */}
      <div className="px-8 pb-8">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between -mt-16 space-y-4 lg:space-y-0">
          {/* Left Side - Photo & Info */}
          <div className="flex flex-col sm:flex-row items-center sm:items-end space-y-4 sm:space-y-0 sm:space-x-6">
            {/* Profile Photo */}
            <div className="relative">
              <div className="w-32 h-32 rounded-full overflow-hidden bg-gradient-to-br from-purple-500 to-blue-500 p-1 shadow-xl">
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                  {tempPhoto || currentData.photoUrl ? (
                    <img 
                      src={tempPhoto || currentData.photoUrl} 
                      alt="Profile" 
                      className="w-full h-full object-cover rounded-full" 
                    />
                  ) : (
                    <User className="w-16 h-16 text-gray-400" />
                  )}
                </div>
              </div>
              {isEditing && (
                <>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="hidden"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute bottom-0 right-0 p-2 bg-purple-500 rounded-full text-white hover:bg-purple-600 transition-colors shadow-lg"
                  >
                    <Camera className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>
            
            {/* Basic Info */}
            <div className="text-center sm:text-left sm:pb-2">
              {isEditing ? (
                <div className="space-y-3">
                  <input
                    type="text"
                    value={currentData.displayName}
                    onChange={(e) => onUpdateField('displayName', e.target.value)}
                    placeholder="Tu nombre"
                    className="text-2xl font-bold px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent w-full sm:w-auto bg-white text-gray-900"
                  />
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={currentData.location}
                      onChange={(e) => onUpdateField('location', e.target.value)}
                      placeholder="Ciudad, País"
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm flex-1 bg-white"
                    />
                  </div>
                </div>
              ) : (
                <>
                  <h1 className="text-2xl font-bold text-gray-900">{currentData.displayName}</h1>
                  {currentData.showLocation && currentData.location && (
                    <div className="flex items-center gap-2 text-gray-600 mt-2 justify-center sm:justify-start">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{currentData.location}</span>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
        
        {/* Bio */}
        {(currentData.bio || isEditing) && (
          <div className="mt-6">
            {isEditing ? (
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Biografía</label>
                <textarea
                  value={currentData.bio}
                  onChange={(e) => onUpdateField('bio', e.target.value)}
                  placeholder="Cuéntanos sobre ti..."
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none bg-white"
                />
              </div>
            ) : (
              <p className="text-gray-700">{currentData.bio}</p>
            )}
          </div>
        )}
        
        {/* Stats */}
        <div className="flex flex-wrap gap-6 mt-6 pt-6 border-t border-gray-200">
          <div className="flex items-center gap-2">
            <Network className="w-5 h-5 text-purple-500" />
            <span className="text-gray-600">
              <span className="font-semibold text-gray-900">3</span> Redes
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-500" />
            <span className="text-gray-600">
              <span className="font-semibold text-gray-900">127</span> Conexiones
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-green-500" />
            <span className="text-gray-600">Verificado</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;