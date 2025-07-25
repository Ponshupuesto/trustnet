// pages/Landing.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown, Users, Vote, Calendar, Shield, Globe, Zap, ArrowRight, Menu, X, CheckCircle, Link2, Wallet, Eye } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import LanguageSelector from '../components/common/LanguageSelector';

const Landing: React.FC = () => {
  const { t } = useTranslation(['landing', 'common']);
  const { login, isLoggingIn } = useAuth();

  const features = [
    { icon: Users, key: 'createNetwork' },
    { icon: Vote, key: 'proposals' },
    { icon: Wallet, key: 'funds' },
    { icon: Calendar, key: 'calendar' },
    { icon: Link2, key: 'connect' },
    { icon: Eye, key: 'transparent' }
  ];

  const benefits = [
    { icon: Shield, titleKey: 'secure.title', descKey: 'secure.desc' },
    { icon: Eye, titleKey: 'transparent.title', descKey: 'transparent.desc' },
    { icon: Users, titleKey: 'governance.title', descKey: 'governance.desc' },
    { icon: Globe, titleKey: 'scale.title', descKey: 'scale.desc' }
  ];

  const useCases = [
    { key: 'local', gradient: 'from-amber-400 to-orange-500' },
    { key: 'student', gradient: 'from-blue-400 to-indigo-500' },
    { key: 'professional', gradient: 'from-green-400 to-teal-500' },
    { key: 'dao', gradient: 'from-purple-400 to-pink-500' }
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-lg">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <span className="text-2xl font-bold">Trustnet</span>
          </div>
          <div className="flex items-center gap-4">
            <LanguageSelector />
            <button
              onClick={login}
              disabled={isLoggingIn}
              className="px-6 py-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full hover:shadow-lg hover:shadow-purple-500/25 transition-all"
            >
              {isLoggingIn ? t('common:loading.connecting') : t('common:nav.login')}
            </button>
          </div>
        </div>
      </nav>

      <section className="min-h-screen flex flex-col items-center justify-center px-6 pt-32 text-center space-y-8">
        <h1 className="text-5xl md:text-7xl font-bold">
          <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            {t('landing:hero.title')}
          </span>
          <br />
          <span className="text-white">{t('landing:hero.subtitle')}</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 max-w-3xl">
          {t('landing:hero.description')}
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <button className="group px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full text-lg font-semibold hover:shadow-xl hover:shadow-purple-500/25 transition-all transform hover:scale-105 flex items-center gap-2">
            {t('landing:hero.cta.primary')} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="px-8 py-4 border border-white/20 rounded-full text-lg hover:bg-white/10 transition-all">
            {t('landing:hero.cta.secondary')}
          </button>
        </div>
        <ChevronDown className="w-8 h-8 animate-bounce" />
      </section>

      <section id="features" className="py-20 px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          {t('landing:features.title')}
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map(({ icon: Icon, key }, index) => (
            <div key={index} className="p-6 bg-white/5 rounded-2xl border border-white/10 hover:border-white/30 backdrop-blur-sm transition-all">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <CheckCircle className="w-5 h-5 text-green-400 mb-2" />
                  <p className="text-lg">{t(`landing:features.items.${key}`)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="benefits" className="relative py-20 px-6 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent">
        <div className="container mx-auto max-w-6xl relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {t('landing:benefits.title')}
            </span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map(({ icon: Icon, titleKey, descKey }, index) => (
              <div key={index} className="text-center space-y-4 group">
                <div className="relative inline-block">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
                  <div className="relative p-6 bg-black rounded-full border border-white/20">
                    <Icon className="w-12 h-12" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold">{t(`landing:benefits.${titleKey}`)}</h3>
                <p className="text-gray-400">{t(`landing:benefits.${descKey}`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="use-cases" className="py-20 px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          {t('landing:useCases.title')}
        </h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {useCases.map(({ key, gradient }, index) => (
            <div key={index} className={`relative p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-white/30 backdrop-blur-sm overflow-hidden group`}>
              <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-20 transition-opacity`} />
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-3">{t(`landing:useCases.${key}.title`)}</h3>
                <p className="text-gray-300">{t(`landing:useCases.${key}.desc`)}</p>
              </div>
              <Zap className="absolute bottom-4 right-4 w-8 h-8 text-white/10 group-hover:text-white/30 transition-colors" />
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto p-12 rounded-3xl bg-gradient-to-br from-purple-900/50 to-blue-900/50 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t('landing:cta.title')}<br />
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              {t('landing:cta.highlight')}
            </span>
          </h2>
          <p className="text-xl text-gray-300 mb-8">{t('landing:cta.subtitle')}</p>
          <button className="group px-10 py-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full text-lg font-semibold hover:shadow-xl transition-all flex items-center gap-3 mx-auto">
            {t('landing:cta.button')}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      <footer className="py-12 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold">Trustnet</span>
          </div>
          <p className="text-gray-400 text-sm">{t('landing:footer.copyright')}</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;