// pages/Dashboard.tsx con i18n
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks/useAuth';
import { Network, Users, Vote, Activity } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { t } = useTranslation(['dashboard', 'common']);
  const { identity } = useAuth();
  
  const stats = [
    { icon: Network, label: t('dashboard:stats.activeNetworks'), value: '0' },
    { icon: Users, label: t('dashboard:stats.members'), value: '0' },
    { icon: Vote, label: t('dashboard:stats.proposals'), value: '0' },
    { icon: Activity, label: t('dashboard:stats.activity'), value: '0%' }
  ];
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{t('dashboard:title')}</h1>
        <p className="text-gray-600 mt-2">
          {t('dashboard:welcome')}, {identity?.getPrincipal().toString().slice(0, 10)}...
        </p>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                </div>
                <Icon className="w-8 h-8 text-purple-500" />
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <h2 className="text-xl font-semibold mb-4">{t('dashboard:quickActions.title')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:shadow-lg transition-shadow">
            {t('dashboard:quickActions.createNetwork')}
          </button>
          <button className="p-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
            {t('dashboard:quickActions.joinNetwork')}
          </button>
          <button className="p-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
            {t('dashboard:quickActions.viewInvitations')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;