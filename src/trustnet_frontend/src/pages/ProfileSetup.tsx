// pages/ProfileSetup.tsx
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks/useAuth';
import ProfileCard from '../components/profile/ProfileCard';
import ContactInfoCard from '../components/profile/ContactInfoCard';
import SocialNetworksCard from '../components/profile/SocialNetworksCard';
import PrivacySettingsCard from '../components/profile/PrivacySettingsCard';
import { Save, ArrowLeft, ArrowRight, Check, User, Mail, Users, Shield } from 'lucide-react';

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

interface ProfileSetupProps {
  onComplete: () => void;
}

const ProfileSetup: React.FC<ProfileSetupProps> = ({ onComplete }) => {
  const { t } = useTranslation(['profileSetup', 'common']);
  const { identity } = useAuth();
  const [isSaving, setIsSaving] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [tempPhoto, setTempPhoto] = useState<string | undefined>(undefined);
  
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
  
  const [errors, setErrors] = useState({
    displayName: ''
  });
  
  const steps = [
    { 
      id: 1, 
      title: t('steps.basic.title'), 
      icon: User, 
      required: true 
    },
    { 
      id: 2, 
      title: t('steps.contact.title'), 
      icon: Mail, 
      required: false 
    },
    { 
      id: 3, 
      title: t('steps.social.title'), 
      icon: Users, 
      required: false 
    },
    { 
      id: 4, 
      title: t('steps.privacy.title'), 
      icon: Shield, 
      required: false 
    }
  ];
  
  const handleUpdateField = (field: string, value: any) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
    
    if (field === 'displayName' && value) {
      setErrors(prev => ({ ...prev, displayName: '' }));
    }
  };
  
  const handlePhotoChange = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setTempPhoto(reader.result as string);
    };
    reader.readAsDataURL(file);
  };
  
  const validateCurrentStep = () => {
    if (currentStep === 1 && !profileData.displayName.trim()) {
      setErrors({ displayName: t('validation.nameRequired') });
      return false;
    }
    return true;
  };
  
  const handleNext = () => {
    if (validateCurrentStep()) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length));
    }
  };
  
  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };
  
  const handleSkipToEnd = () => {
    if (validateCurrentStep()) {
      handleSave();
    }
  };
  
  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Aquí guardarías en tu backend
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const profileKey = `profile_${identity?.getPrincipal().toString()}`;
      localStorage.setItem(profileKey, JSON.stringify({
        ...profileData,
        photoUrl: tempPhoto
      }));
      
      onComplete();
    } catch (error) {
      console.error('Error saving profile:', error);
    } finally {
      setIsSaving(false);
    }
  };
  
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-2">{t('steps.basic.title')}</h2>
              <p className="text-gray-600">{t('steps.basic.subtitle')}</p>
            </div>
            
            <ProfileCard
              profileData={profileData}
              editingData={profileData}
              isEditing={true}
              onUpdateField={handleUpdateField}
              onPhotoChange={handlePhotoChange}
              tempPhoto={tempPhoto}
            />
            
            {errors.displayName && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 text-sm">{errors.displayName}</p>
              </div>
            )}
          </>
        );
        
      case 2:
        return (
          <>
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-2">{t('steps.contact.title')}</h2>
              <p className="text-gray-600">{t('steps.contact.subtitle')}</p>
            </div>
            
            <ContactInfoCard
              contactData={{
                email: profileData.email,
                phone: profileData.phone,
                website: profileData.website,
                showEmail: profileData.showEmail,
                showPhone: profileData.showPhone,
                showWebsite: profileData.showWebsite
              }}
              isEditing={true}
              onUpdateField={handleUpdateField}
            />
            
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-blue-700 text-sm">
                💡 {t('steps.contact.tip')}
              </p>
            </div>
          </>
        );
        
      case 3:
        return (
          <>
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-2">{t('steps.social.title')}</h2>
              <p className="text-gray-600">{t('steps.social.subtitle')}</p>
            </div>
            
            <SocialNetworksCard
              socialData={{
                twitter: profileData.twitter,
                linkedin: profileData.linkedin,
                github: profileData.github,
                showTwitter: profileData.showTwitter,
                showLinkedin: profileData.showLinkedin,
                showGithub: profileData.showGithub
              }}
              isEditing={true}
              onUpdateField={handleUpdateField}
            />
          </>
        );
        
      case 4:
        return (
          <>
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-2">{t('steps.privacy.title')}</h2>
              <p className="text-gray-600">{t('steps.privacy.subtitle')}</p>
            </div>
            
            <PrivacySettingsCard
              privacyData={{
                showLocation: profileData.showLocation,
                allowMessages: profileData.allowMessages
              }}
              onUpdateField={handleUpdateField}
            />
            
            <div className="mt-6 p-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border border-purple-200">
              <h3 className="font-semibold text-gray-900 mb-2">{t('steps.privacy.almostDone.title')}</h3>
              <p className="text-gray-700">
                {t('steps.privacy.almostDone.description')}
              </p>
            </div>
          </>
        );
        
      default:
        return null;
    }
  };
  
  const progress = (currentStep / steps.length) * 100;
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        {/* Progress Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center flex-1">
                <div className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                    currentStep > step.id 
                      ? 'bg-green-500 text-white' 
                      : currentStep === step.id 
                        ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white' 
                        : 'bg-gray-300 text-gray-600'
                  }`}>
                    {currentStep > step.id ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <step.icon className="w-5 h-5" />
                    )}
                  </div>
                  <div className={`ml-3 ${index < steps.length - 1 ? 'hidden sm:block' : ''}`}>
                    <p className={`text-sm font-medium ${
                      currentStep >= step.id ? 'text-gray-900' : 'text-gray-500'
                    }`}>
                      {step.title}
                    </p>
                    {step.required && (
                      <p className="text-xs text-gray-500">{t('steps.basic.required')}</p>
                    )}
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className="flex-1 h-1 bg-gray-200 mx-4 hidden sm:block">
                    <div 
                      className="h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-300"
                      style={{ width: currentStep > step.id ? '100%' : '0%' }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {/* Mobile Progress Bar */}
          <div className="sm:hidden">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>{t('progress.step', { current: currentStep, total: steps.length })}</span>
              <span>{t('progress.percentage', { percent: Math.round(progress) })}</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
        
        {/* Step Content */}
        <div className="mb-8">
          {renderStepContent()}
        </div>
        
        {/* Actions */}
        <div className="flex justify-between items-center">
          <button
            onClick={currentStep === 1 ? () => window.history.back() : handlePrevious}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {currentStep === 1 ? t('actions.cancel') : t('actions.previous')}
          </button>
          
          <div className="flex gap-3">
            {currentStep < steps.length && (
              <button
                onClick={handleSkipToEnd}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                {t('actions.skip')}
              </button>
            )}
            
            {currentStep < steps.length ? (
              <button
                onClick={handleNext}
                disabled={currentStep === 1 && !profileData.displayName}
                className="px-6 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {t('actions.next')}
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="px-6 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isSaving ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    {t('actions.saving')}
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    {t('actions.complete')}
                  </>
                )}
              </button>
            )}
          </div>
        </div>
        
        {/* Tips Section - Solo en el primer paso */}
        {currentStep === 1 && (
          <div className="bg-white rounded-xl p-6 shadow-md mt-8">
            <h3 className="font-semibold text-gray-900 mb-4">{t('tips.title')}</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• {t('tips.items.name')}</li>
              <li>• {t('tips.items.photo')}</li>
              <li>• {t('tips.items.edit')}</li>
              <li>• {t('tips.items.principal')}</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileSetup;