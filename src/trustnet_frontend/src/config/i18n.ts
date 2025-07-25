// config/i18n.ts - Actualizar para incluir los nuevos archivos
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Importar traducciones existentes
import esCommon from '../locales/es/common.json';
import esLanding from '../locales/es/landing.json';
import esDashboard from '../locales/es/dashboard.json';
import esProfile from '../locales/es/profile.json';
import esWelcome from '../locales/es/welcome.json';
import esProfileSetup from '../locales/es/profileSetup.json';

import enCommon from '../locales/en/common.json';
import enLanding from '../locales/en/landing.json';
import enDashboard from '../locales/en/dashboard.json';
import enProfile from '../locales/en/profile.json';
import enWelcome from '../locales/en/welcome.json';
import enProfileSetup from '../locales/en/profileSetup.json';

const resources = {
  es: {
    common: esCommon,
    landing: esLanding,
    dashboard: esDashboard,
    profile: esProfile,
    welcome: esWelcome,
    profileSetup: esProfileSetup
  },
  en: {
    common: enCommon,
    landing: enLanding,
    dashboard: enDashboard,
    profile: enProfile,
    welcome: enWelcome,
    profileSetup: enProfileSetup
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'es',
    debug: false,
    
    ns: ['common', 'landing', 'dashboard', 'profile', 'welcome', 'profileSetup'],
    defaultNS: 'common',
    
    interpolation: {
      escapeValue: false
    },
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage']
    }
  });

export default i18n;