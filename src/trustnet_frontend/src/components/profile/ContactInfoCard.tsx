// components/profile/ContactInfoCard.tsx
import React from 'react';
import { Mail, Phone, Globe, Eye, EyeOff } from 'lucide-react';

interface ContactInfoCardProps {
  contactData: {
    email: string;
    phone: string;
    website: string;
    showEmail: boolean;
    showPhone: boolean;
    showWebsite: boolean;
  };
  isEditing: boolean;
  onUpdateField: (field: string, value: any) => void;
}

const ContactInfoCard: React.FC<ContactInfoCardProps> = ({
  contactData,
  isEditing,
  onUpdateField
}) => {
  const visibleCount = [
    contactData.showEmail && contactData.email,
    contactData.showPhone && contactData.phone,
    contactData.showWebsite && contactData.website
  ].filter(Boolean).length;
  
  if (!isEditing && visibleCount === 0) {
    return null;
  }
  
  return (
    <div className="bg-white rounded-xl p-6 shadow-md">
      <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <Mail className="w-5 h-5 text-gray-400" />
        Información de Contacto
      </h3>
      <div className="space-y-4">
        {/* Email */}
        {(contactData.showEmail && contactData.email) || isEditing ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1">
              <Mail className="w-5 h-5 text-gray-400" />
              {isEditing ? (
                <input
                  type="email"
                  value={contactData.email}
                  onChange={(e) => onUpdateField('email', e.target.value)}
                  placeholder="tu@email.com"
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent flex-1 bg-white"
                />
              ) : (
                <a href={`mailto:${contactData.email}`} className="text-blue-600 hover:underline">
                  {contactData.email}
                </a>
              )}
            </div>
            {isEditing && (
              <button
                onClick={() => onUpdateField('showEmail', !contactData.showEmail)}
                className="p-1 hover:bg-gray-100 rounded ml-2"
              >
                {contactData.showEmail ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </button>
            )}
          </div>
        ) : null}
        
        {/* Phone */}
        {(contactData.showPhone && contactData.phone) || isEditing ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1">
              <Phone className="w-5 h-5 text-gray-400" />
              {isEditing ? (
                <input
                  type="tel"
                  value={contactData.phone}
                  onChange={(e) => onUpdateField('phone', e.target.value)}
                  placeholder="+52 55 1234 5678"
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent flex-1 bg-white"
                />
              ) : (
                <a href={`tel:${contactData.phone}`} className="text-blue-600 hover:underline">
                  {contactData.phone}
                </a>
              )}
            </div>
            {isEditing && (
              <button
                onClick={() => onUpdateField('showPhone', !contactData.showPhone)}
                className="p-1 hover:bg-gray-100 rounded ml-2"
              >
                {contactData.showPhone ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </button>
            )}
          </div>
        ) : null}
        
        {/* Website */}
        {(contactData.showWebsite && contactData.website) || isEditing ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1">
              <Globe className="w-5 h-5 text-gray-400" />
              {isEditing ? (
                <input
                  type="url"
                  value={contactData.website}
                  onChange={(e) => onUpdateField('website', e.target.value)}
                  placeholder="https://tu-sitio.com"
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent flex-1 bg-white"
                />
              ) : (
                <a href={contactData.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  {contactData.website.replace(/^https?:\/\//, '')}
                </a>
              )}
            </div>
            {isEditing && (
              <button
                onClick={() => onUpdateField('showWebsite', !contactData.showWebsite)}
                className="p-1 hover:bg-gray-100 rounded ml-2"
              >
                {contactData.showWebsite ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </button>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ContactInfoCard;