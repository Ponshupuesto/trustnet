import React, { useState, useRef } from 'react';
import { 
  User, 
  Camera, 
  Mail, 
  Phone, 
  Globe, 
  MapPin, 
  Linkedin, 
  Github,
  Shield,
  Save,
  X,
  Check,
  Copy,
  Upload,
  Twitter
} from 'lucide-react';

interface ProfileData {
  displayName: string;
  bio: string;
  location: string;
  email: string;
  phone: string;
  website: string;
  twitter: string;
  linkedin: string;
  github: string;
  showEmail: boolean;
  showPhone: boolean;
  allowMessages: boolean;
  photoUrl?: string;
}

const ProfileEdit: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showSaved, setShowSaved] = useState(false);
  const [copiedPrincipal, setCopiedPrincipal] = useState(false);
  
  const [profileData, setProfileData] = useState<ProfileData>({
    displayName: '',
    bio: '',
    location: '',
    email: '',
    phone: '',
    website: '',
    twitter: '',
    linkedin: '',
    github: '',
    showEmail: false,
    showPhone: false,
    allowMessages: true,
    photoUrl: undefined
  });
  
  const [tempPhoto, setTempPhoto] = useState<string | undefined>(undefined);
  
  // Simulamos el principal ID para la demo
  const principalId = 'rrkah-fqaaa-aaaaa-aaaaq-cai-7uv5f-kaaaa-aaaap-kahma-ceaaa-aaaaa-a';
  const shortPrincipal = `${principalId.slice(0, 8)}...${principalId.slice(-8)}`;
  
  const handleCopyPrincipal = async () => {
    await navigator.clipboard.writeText(principalId);
    setCopiedPrincipal(true);
    setTimeout(() => setCopiedPrincipal(false), 2000);
  };
  
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleSave = async () => {
    setIsSaving(true);
    // Simulamos guardado
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setProfileData({
      ...profileData,
      photoUrl: tempPhoto || profileData.photoUrl
    });
    
    setIsSaving(false);
    setIsEditing(false);
    setShowSaved(true);
    setTimeout(() => setShowSaved(false), 3000);
  };
  
  const handleCancel = () => {
    setIsEditing(false);
    setTempPhoto(profileData.photoUrl);
  };
  
  if (!isEditing) {
    // Vista de perfil
    return (
      <div className="max-w-4xl mx-auto space-y-8 p-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 rounded-2xl p-8 backdrop-blur-sm border border-white/10">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Profile Photo */}
            <div className="relative group">
              <div className="w-32 h-32 rounded-full overflow-hidden bg-gradient-to-br from-purple-500 to-blue-500 p-1">
                <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center">
                  {profileData.photoUrl ? (
                    <img src={profileData.photoUrl} alt="Profile" className="w-full h-full object-cover rounded-full" />
                  ) : (
                    <User className="w-16 h-16 text-gray-400" />
                  )}
                </div>
              </div>
            </div>
            
            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold mb-2 text-white">
                {profileData.displayName || 'Usuario de Trustnet'}
              </h1>
              {profileData.bio && (
                <p className="text-gray-300 mb-4 max-w-2xl">{profileData.bio}</p>
              )}
              {profileData.location && (
                <div className="flex items-center gap-2 text-gray-400 justify-center md:justify-start">
                  <MapPin className="w-4 h-4" />
                  <span>{profileData.location}</span>
                </div>
              )}
            </div>
            
            {/* Edit Button */}
            <button
              onClick={() => setIsEditing(true)}
              className="px-6 py-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full hover:shadow-lg hover:shadow-purple-500/25 transition-all text-white"
            >
              Editar Perfil
            </button>
          </div>
        </div>
        
        {/* Principal ID */}
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Principal ID</h3>
              <p className="text-lg font-mono mt-1">{shortPrincipal}</p>
            </div>
            <button
              onClick={handleCopyPrincipal}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors group"
            >
              {copiedPrincipal ? (
                <Check className="w-5 h-5 text-green-500" />
              ) : (
                <Copy className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
              )}
            </button>
          </div>
        </div>
        
        {/* Contact & Social */}
        {(profileData.email || profileData.phone || profileData.website || 
          profileData.twitter || profileData.linkedin || profileData.github) && (
          <div className="grid md:grid-cols-2 gap-6">
            {/* Contact Info */}
            {(profileData.email || profileData.phone || profileData.website) && (
              <div className="bg-white rounded-xl p-6 shadow-sm border">
                <h3 className="text-lg font-semibold mb-4">Contacto</h3>
                <div className="space-y-3">
                  {profileData.email && profileData.showEmail && (
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-gray-400" />
                      <a href={`mailto:${profileData.email}`} className="text-blue-600 hover:underline">
                        {profileData.email}
                      </a>
                    </div>
                  )}
                  {profileData.phone && profileData.showPhone && (
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-gray-400" />
                      <a href={`tel:${profileData.phone}`} className="text-blue-600 hover:underline">
                        {profileData.phone}
                      </a>
                    </div>
                  )}
                  {profileData.website && (
                    <div className="flex items-center gap-3">
                      <Globe className="w-5 h-5 text-gray-400" />
                      <a href={profileData.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        {profileData.website}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {/* Social Networks */}
            {(profileData.twitter || profileData.linkedin || profileData.github) && (
              <div className="bg-white rounded-xl p-6 shadow-sm border">
                <h3 className="text-lg font-semibold mb-4">Redes Sociales</h3>
                <div className="space-y-3">
                  {profileData.twitter && (
                    <div className="flex items-center gap-3">
                      <Twitter className="w-5 h-5 text-gray-400" />
                      <a href={`https://twitter.com/${profileData.twitter.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        {profileData.twitter}
                      </a>
                    </div>
                  )}
                  {profileData.linkedin && (
                    <div className="flex items-center gap-3">
                      <Linkedin className="w-5 h-5 text-gray-400" />
                      <a href={`https://${profileData.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        {profileData.linkedin}
                      </a>
                    </div>
                  )}
                  {profileData.github && (
                    <div className="flex items-center gap-3">
                      <Github className="w-5 h-5 text-gray-400" />
                      <a href={`https://github.com/${profileData.github}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        {profileData.github}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
  
  // Vista de edición
  return (
    <div className="max-w-4xl mx-auto space-y-6 p-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Editar Perfil</h1>
        <p className="text-gray-600 mt-2">Personaliza tu información y cómo otros te ven en la red</p>
      </div>
      
      {/* Success Message */}
      {showSaved && (
        <div className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
          <Check className="w-5 h-5" />
          <span>¡Cambios guardados!</span>
        </div>
      )}
      
      {/* Principal ID Card */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-gray-600">Principal ID</h3>
            <p className="text-lg font-mono mt-1">{shortPrincipal}</p>
            <p className="text-sm text-gray-500 mt-1">Tu identidad única en Internet Computer</p>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-8 h-8 text-purple-500" />
            <button
              onClick={handleCopyPrincipal}
              className="p-2 hover:bg-white/50 rounded-lg transition-colors"
            >
              {copiedPrincipal ? (
                <Check className="w-5 h-5 text-green-500" />
              ) : (
                <Copy className="w-5 h-5 text-gray-600" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Profile Photo */}
      <div className="bg-white rounded-xl p-6 shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">Foto de Perfil</h3>
        <div className="flex items-center gap-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-gradient-to-br from-purple-500 to-blue-500 p-1">
              <div className="w-full h-full rounded-full bg-gray-100 flex items-center justify-center">
                {(tempPhoto || profileData.photoUrl) ? (
                  <img 
                    src={tempPhoto || profileData.photoUrl} 
                    alt="Profile" 
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <User className="w-12 h-12 text-gray-400" />
                )}
              </div>
            </div>
            {(tempPhoto || profileData.photoUrl) && (
              <button
                onClick={() => {
                  setTempPhoto(undefined);
                  setProfileData({ ...profileData, photoUrl: undefined });
                }}
                className="absolute -top-2 -right-2 p-1 bg-red-500 rounded-full text-white hover:bg-red-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          
          <div className="flex-1">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors"
            >
              <Upload className="w-4 h-4" />
              {(tempPhoto || profileData.photoUrl) ? 'Cambiar Foto' : 'Subir Foto'}
            </button>
            <p className="text-sm text-gray-500 mt-2">Recomendado: Imagen cuadrada, mínimo 200x200px</p>
          </div>
        </div>
      </div>
      
      {/* Personal Information */}
      <div className="bg-white rounded-xl p-6 shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">Información Personal</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre para mostrar
            </label>
            <input
              type="text"
              value={profileData.displayName}
              onChange={(e) => setProfileData({ ...profileData, displayName: e.target.value })}
              placeholder="¿Cómo quieres que te llamen?"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Biografía
            </label>
            <textarea
              value={profileData.bio}
              onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
              placeholder="Cuéntanos un poco sobre ti..."
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ubicación
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={profileData.location}
                onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                placeholder="Ciudad, País"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Contact Information */}
      <div className="bg-white rounded-xl p-6 shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">Información de Contacto</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Correo Electrónico
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                value={profileData.email}
                onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                placeholder="tu@email.com"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Teléfono
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="tel"
                value={profileData.phone}
                onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                placeholder="+52 55 1234 5678"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sitio Web
            </label>
            <div className="relative">
              <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="url"
                value={profileData.website}
                onChange={(e) => setProfileData({ ...profileData, website: e.target.value })}
                placeholder="https://tu-sitio.com"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Social Networks */}
      <div className="bg-white rounded-xl p-6 shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">Redes Sociales</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Twitter
            </label>
            <div className="relative">
              <Twitter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={profileData.twitter}
                onChange={(e) => setProfileData({ ...profileData, twitter: e.target.value })}
                placeholder="@usuario"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              LinkedIn
            </label>
            <div className="relative">
              <Linkedin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={profileData.linkedin}
                onChange={(e) => setProfileData({ ...profileData, linkedin: e.target.value })}
                placeholder="linkedin.com/in/usuario"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              GitHub
            </label>
            <div className="relative">
              <Github className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={profileData.github}
                onChange={(e) => setProfileData({ ...profileData, github: e.target.value })}
                placeholder="github.com/usuario"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Privacy Settings */}
      <div className="bg-white rounded-xl p-6 shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">Privacidad</h3>
        <div className="space-y-3">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={profileData.showEmail}
              onChange={(e) => setProfileData({ ...profileData, showEmail: e.target.checked })}
              className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
            />
            <span className="text-sm text-gray-700">Mostrar email públicamente</span>
          </label>
          
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={profileData.showPhone}
              onChange={(e) => setProfileData({ ...profileData, showPhone: e.target.checked })}
              className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
            />
            <span className="text-sm text-gray-700">Mostrar teléfono públicamente</span>
          </label>
          
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={profileData.allowMessages}
              onChange={(e) => setProfileData({ ...profileData, allowMessages: e.target.checked })}
              className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
            />
            <span className="text-sm text-gray-700">Permitir mensajes de otros usuarios</span>
          </label>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="flex justify-end gap-4 pb-6">
        <button
          onClick={handleCancel}
          className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Cancelar
        </button>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="px-6 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:shadow-lg hover:shadow-purple-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isSaving ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Guardando...
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              Guardar Cambios
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ProfileEdit;