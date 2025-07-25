// pages/Profile.tsx
import React, { useState } from 'react';
import { Edit2, Save, Check } from 'lucide-react';
import ProfileCard from '../components/profile/ProfileCard';
import AccountCard from '../components/profile/AccountCard';
import ContactInfoCard from '../components/profile/ContactInfoCard';
import SocialNetworksCard from '../components/profile/SocialNetworksCard';
import PrivacySettingsCard from '../components/profile/PrivacySettingsCard';
import { useAuth } from '../hooks/useAuth';
import { useWallet } from '../hooks/useWallet';
//import {icp_ledger_canister} from '../../../declarations/icp_ledger_canister/'

// Importa estos componentes desde sus archivos correspondientes:
// import ProfileCard from '../components/profile/ProfileCard';
// import AccountCard from '../components/profile/AccountCard';
// import ContactInfoCard from '../components/profile/ContactInfoCard';
// import SocialNetworksCard from '../components/profile/SocialNetworksCard';
// import PrivacySettingsCard from '../components/profile/PrivacySettingsCard';

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
  showLocation: boolean;
  showWebsite: boolean;
  showTwitter: boolean;
  showLinkedin: boolean;
  showGithub: boolean;
  allowMessages: boolean;
  photoUrl?: string;
}

const Profile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showSaved, setShowSaved] = useState(false);
  const [tempPhoto, setTempPhoto] = useState<string | undefined>(undefined);
  
  const [profileData, setProfileData] = useState<ProfileData>({
    displayName: 'María González',
    bio: 'Emprendedora social apasionada por la tecnología descentralizada y la construcción de comunidades.',
    location: 'Ciudad de México, México',
    email: 'maria@example.com',
    phone: '+52 55 1234 5678',
    website: 'https://mariagonzalez.com',
    twitter: '@mariagmx',
    linkedin: 'linkedin.com/in/mariagonzalez',
    github: 'mariagmx',
    showEmail: true,
    showPhone: false,
    showLocation: true,
    showWebsite: true,
    showTwitter: true,
    showLinkedin: true,
    showGithub: false,
    allowMessages: true,
    photoUrl: undefined
  });
  
  const [editingData, setEditingData] = useState<ProfileData>(profileData);
  
  // Principal ID 
  const {identity} = useAuth(); 
  const principalId = identity?.getPrincipal().toString() || "Error";
  const principal = identity?.getPrincipal();

   const {
    balance,
    isLoadingBalance,
    refreshBalance,
    accountIdentifierHex,
    estimateFee
  } = useWallet({
    principal,
    autoRefreshInterval: 30000 // Actualizar cada 30 segundos
  });
  
  const handleUpdateField = (field: string, value: any) => {
    setEditingData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const handlePhotoChange = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setTempPhoto(reader.result as string);
    };
    reader.readAsDataURL(file);
  };
  
  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setProfileData({
      ...editingData,
      photoUrl: tempPhoto || editingData.photoUrl
    });
    
    setIsSaving(false);
    setIsEditing(false);
    setShowSaved(true);
    setTimeout(() => setShowSaved(false), 3000);
  };
  
  const handleCancel = () => {
    setIsEditing(false);
    setEditingData(profileData);
    setTempPhoto(profileData.photoUrl);
  };
  
  const handleEdit = () => {
    setIsEditing(true);
    setEditingData(profileData);
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-6 space-y-6">
        {/* Success Message */}
        {showSaved && (
          <div className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
            <Check className="w-5 h-5" />
            <span>¡Cambios guardados exitosamente!</span>
          </div>
        )}
        
        {/* Header with Actions */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Mi Perfil</h1>
          <div>
            {isEditing ? (
              <div className="flex gap-3">
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-50 flex items-center gap-2"
                >
                  {isSaving ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Guardando...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Guardar
                    </>
                  )}
                </button>
              </div>
            ) : (
              <button
                onClick={handleEdit}
                className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2"
              >
                <Edit2 className="w-4 h-4" />
                Editar Perfil
              </button>
            )}
          </div>
        </div>
        
        {/* Profile Card */}
        <ProfileCard
          profileData={profileData}
          editingData={editingData}
          isEditing={isEditing}
          onUpdateField={handleUpdateField}
          onPhotoChange={handlePhotoChange}
          tempPhoto={tempPhoto}
        />
        
        {/* Account Card */}
        <AccountCard 
        principal={principal!}
        accountId={accountIdentifierHex}
        balance={balance}
        isLoadingBalance={isLoadingBalance}
        onRefreshBalance={refreshBalance}
      />
        
        {/* Contact & Social Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Contact Information */}
          <ContactInfoCard
            contactData={{
              email: isEditing ? editingData.email : profileData.email,
              phone: isEditing ? editingData.phone : profileData.phone,
              website: isEditing ? editingData.website : profileData.website,
              showEmail: isEditing ? editingData.showEmail : profileData.showEmail,
              showPhone: isEditing ? editingData.showPhone : profileData.showPhone,
              showWebsite: isEditing ? editingData.showWebsite : profileData.showWebsite
            }}
            isEditing={isEditing}
            onUpdateField={handleUpdateField}
          />
          
          {/* Social Networks */}
          <SocialNetworksCard
            socialData={{
              twitter: isEditing ? editingData.twitter : profileData.twitter,
              linkedin: isEditing ? editingData.linkedin : profileData.linkedin,
              github: isEditing ? editingData.github : profileData.github,
              showTwitter: isEditing ? editingData.showTwitter : profileData.showTwitter,
              showLinkedin: isEditing ? editingData.showLinkedin : profileData.showLinkedin,
              showGithub: isEditing ? editingData.showGithub : profileData.showGithub
            }}
            isEditing={isEditing}
            onUpdateField={handleUpdateField}
          />
        </div>
        
        {/* Privacy Settings - Solo visible en modo edición */}
        {isEditing && (
          <PrivacySettingsCard
            privacyData={{
              showLocation: editingData.showLocation,
              allowMessages: editingData.allowMessages
            }}
            onUpdateField={handleUpdateField}
          />
        )}
      </div>
    </div>
  );
};

export default Profile; 