// hooks/useLanguage.tsx
import { useTranslation } from 'react-i18next';

export const useLanguage = () => {
  const { i18n } = useTranslation();
  
  const languages = [
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'en', name: 'English', flag: '🇺🇸' }
  ];
  
  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];
  
  const changeLanguage = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
  };
  
  return {
    languages,
    currentLanguage,
    changeLanguage,
    i18n
  };
};