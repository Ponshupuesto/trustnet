// components/profile/PrivacySettingsCard.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Shield } from 'lucide-react';

interface PrivacySettingsCardProps {
  privacyData: {
    showLocation: boolean;
    allowMessages: boolean;
  };
  onUpdateField: (field: string, value: any) => void;
}

const PrivacySettingsCard: React.FC<PrivacySettingsCardProps> = ({
  privacyData,
  onUpdateField
}) => {
  const { t } = useTranslation('profile');
  
  return (
    <div className="bg-white rounded-xl p-6 shadow-md">
      <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <Shield className="w-5 h-5 text-gray-400" />
        {t('edit.privacy.title')}
      </h3>
      <div className="space-y-3">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={privacyData.showLocation}
            onChange={(e) => onUpdateField('showLocation', e.target.checked)}
            className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
          />
          <span className="text-sm text-gray-700">{t('edit.privacy.showLocation')}</span>
        </label>
        
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={privacyData.allowMessages}
            onChange={(e) => onUpdateField('allowMessages', e.target.checked)}
            className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
          />
          <span className="text-sm text-gray-700">{t('edit.privacy.allowMessages')}</span>
        </label>
      </div>
    </div>
  );
};

export default PrivacySettingsCard;