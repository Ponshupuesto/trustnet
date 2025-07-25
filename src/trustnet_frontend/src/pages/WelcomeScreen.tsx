// pages/WelcomeScreen.tsx
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Users,
  Shield,
  Network,
  ArrowRight,
  Sparkles,
  User,
  CheckCircle,
  Copy
} from 'lucide-react';

interface WelcomeScreenProps {
  principalId: string;
  onContinue: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ principalId, onContinue }) => {
  const { t } = useTranslation('welcome');
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(principalId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Error copying:', err);
    }
  };

  const features = [
    {
      icon: Network,
      titleKey: 'features.create.title',
      descriptionKey: 'features.create.description'
    },
    {
      icon: Users,
      titleKey: 'features.connect.title',
      descriptionKey: 'features.connect.description'
    },
    {
      icon: Shield,
      titleKey: 'features.transparent.title',
      descriptionKey: 'features.transparent.description'
    }
  ];

  return (
    <div className="bg-gradient-to-br from-purple-900 via-black to-blue-900 p-6 relative min-h-screen overflow-y-auto flex flex-col md:flex-row md:items-center md:justify-center">
      {/* Background animation */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/5 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 300 + 50}px`,
              height: `${Math.random() * 300 + 50}px`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 10 + 10}s`
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-white/20">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center p-3 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl mb-6">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {t('title')}
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              {t('subtitle')}
            </p>
          </div>

          {/* Principal ID section */}
          <div className="bg-white/5 rounded-2xl p-6 mb-8 border border-white/10">
            <div className="flex items-start md:items-center gap-4 flex-col md:flex-row">
              <div className="p-3 bg-purple-500/20 rounded-xl">
                <Shield className="w-6 h-6 text-purple-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-400">{t('identity.label')}</p>
                <p className="font-mono text-white break-all">{principalId}</p>
              </div>
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 text-sm text-white bg-purple-600 hover:bg-purple-700 px-3 py-1 rounded-md transition"
              >
                {copied ? (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    Copiado
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copiar
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Features */}
          <div className="mb-10">
            <h2 className="text-2xl font-semibold text-white mb-6 text-center">
              {t('features.title')}
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={index}
                    className="bg-white/5 rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all"
                  >
                    <div className="mb-4 flex items-center justify-center">
                      <div className="p-3 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-lg flex items-center justify-center">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2 text-center">
                      {t(feature.titleKey)}
                    </h3>
                    <p className="text-gray-400 text-sm text-center">
                      {t(feature.descriptionKey)}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Call to action */}
          <div className="text-center">
            <p className="text-gray-400 mb-6">{t('cta.subtitle')}</p>
            <button
              onClick={onContinue}
              className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full text-white font-semibold text-lg hover:shadow-2xl hover:shadow-purple-500/25 transition-all transform hover:scale-105"
            >
              <User className="w-5 h-5" />
              {t('cta.button')}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="text-xs text-gray-500 mt-4">
              {t('cta.note')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
