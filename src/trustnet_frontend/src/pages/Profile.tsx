import React, { useState, useEffect } from 'react';
import { Edit2, Save, Check } from 'lucide-react';
import ProfileCard from '../components/profile/ProfileCard';
import AccountCard from '../components/profile/AccountCard';
import ContactInfoCard from '../components/profile/ContactInfoCard';
import SocialNetworksCard from '../components/profile/SocialNetworksCard';
import PrivacySettingsCard from '../components/profile/PrivacySettingsCard';
import { useAuth } from '../hooks/useAuth';
import { useWallet } from '../hooks/useWallet';
import { useActor } from '../components/ic/Actors';


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
  const { actor } = useActor();


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
    showLocation: true,
    showWebsite: true,
    showTwitter: true,
    showLinkedin: true,
    showGithub: true,
    allowMessages: true,
    photoUrl: undefined
  });

  const [editingData, setEditingData] = useState<ProfileData>(profileData);

  const { identity } = useAuth();
  const principalId = identity?.getPrincipal().toString() || "Error";
  const principal = identity?.getPrincipal();

  const {
    balance,
    isLoadingBalance,
    refreshBalance,
    accountIdentifierHex
  } = useWallet({
    principal,
    autoRefreshInterval: 30000
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

  useEffect(() => {
    const fetchProfile = async () => {
      if (!identity) return;
      if (!actor) return;
      try {
        const result = await actor.getProfile();
        if ("ok" in result) {
          const user = result.ok;

          let photoBase64: string | undefined = undefined;

          if (
            Array.isArray(user.photo) &&
            user.photo.length > 0 &&
            user.photo[0] instanceof Uint8Array
          ) {
            const blob = user.photo[0];
            const binary = String.fromCharCode(...Array.from(blob));
            photoBase64 = `data:image/*;base64,${btoa(binary)}`;
          }

          const mappedProfile: ProfileData = {
            displayName: user.displayName,
            bio: user.bio,
            location: user.location,
            email: user.email,
            phone: user.phone,
            website: user.website,
            twitter: user.twitter,
            linkedin: user.linkedin,
            github: user.github,
            showEmail: user.showEmail,
            showPhone: user.showPhone,
            showLocation: user.showLocation,
            showWebsite: user.showWebsite,
            showTwitter: user.showTwitter,
            showLinkedin: user.showLinkedin,
            showGithub: user.showGithub,
            allowMessages: user.allowMessages,
            photoUrl: photoBase64
          };

          setProfileData(mappedProfile);
          setEditingData(mappedProfile);
          setTempPhoto(mappedProfile.photoUrl);
        } else {
          console.error("Error al obtener perfil:", result.err);
        }
      } catch (e) {
        console.error("Error al cargar perfil:", e);
      }
    };

    fetchProfile();
  }, [identity]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-6 space-y-6">
        {showSaved && (
          <div className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
            <Check className="w-5 h-5" />
            <span>¡Cambios guardados exitosamente!</span>
          </div>
        )}

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

        <ProfileCard
          profileData={profileData}
          editingData={editingData}
          isEditing={isEditing}
          onUpdateField={handleUpdateField}
          onPhotoChange={handlePhotoChange}
          tempPhoto={tempPhoto}
        />

        <AccountCard
          principal={principal!}
          accountId={accountIdentifierHex}
          balance={balance}
          isLoadingBalance={isLoadingBalance}
          onRefreshBalance={refreshBalance}
        />

        <div className="grid lg:grid-cols-2 gap-6">
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
