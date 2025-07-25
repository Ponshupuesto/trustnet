// components/profile/SocialNetworksCard.tsx
import React from 'react';
import { Users, Twitter, Linkedin, Github, Eye, EyeOff } from 'lucide-react';

interface SocialNetworksCardProps {
  socialData: {
    twitter: string;
    linkedin: string;
    github: string;
    showTwitter: boolean;
    showLinkedin: boolean;
    showGithub: boolean;
  };
  isEditing: boolean;
  onUpdateField: (field: string, value: any) => void;
}

const SocialNetworksCard: React.FC<SocialNetworksCardProps> = ({
  socialData,
  isEditing,
  onUpdateField
}) => {
  const visibleCount = [
    socialData.showTwitter && socialData.twitter,
    socialData.showLinkedin && socialData.linkedin,
    socialData.showGithub && socialData.github
  ].filter(Boolean).length;
  
  if (!isEditing && visibleCount === 0) {
    return null;
  }
  
  return (
    <div className="bg-white rounded-xl p-6 shadow-md">
      <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <Users className="w-5 h-5 text-gray-400" />
        Redes Sociales
      </h3>
      <div className="space-y-4">
        {/* Twitter */}
        {(socialData.showTwitter && socialData.twitter) || isEditing ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1">
              <Twitter className="w-5 h-5 text-gray-400" />
              {isEditing ? (
                <input
                  type="text"
                  value={socialData.twitter}
                  onChange={(e) => onUpdateField('twitter', e.target.value)}
                  placeholder="@usuario"
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent flex-1 bg-white"
                />
              ) : (
                <a 
                  href={`https://twitter.com/${socialData.twitter.replace('@', '')}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-blue-600 hover:underline"
                >
                  {socialData.twitter}
                </a>
              )}
            </div>
            {isEditing && (
              <button
                onClick={() => onUpdateField('showTwitter', !socialData.showTwitter)}
                className="p-1 hover:bg-gray-100 rounded ml-2"
              >
                {socialData.showTwitter ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </button>
            )}
          </div>
        ) : null}
        
        {/* LinkedIn */}
        {(socialData.showLinkedin && socialData.linkedin) || isEditing ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1">
              <Linkedin className="w-5 h-5 text-gray-400" />
              {isEditing ? (
                <input
                  type="text"
                  value={socialData.linkedin}
                  onChange={(e) => onUpdateField('linkedin', e.target.value)}
                  placeholder="linkedin.com/in/usuario"
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent flex-1 bg-white"
                />
              ) : (
                <a 
                  href={`https://${socialData.linkedin}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-blue-600 hover:underline"
                >
                  {socialData.linkedin}
                </a>
              )}
            </div>
            {isEditing && (
              <button
                onClick={() => onUpdateField('showLinkedin', !socialData.showLinkedin)}
                className="p-1 hover:bg-gray-100 rounded ml-2"
              >
                {socialData.showLinkedin ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </button>
            )}
          </div>
        ) : null}
        
        {/* GitHub */}
        {(socialData.showGithub && socialData.github) || isEditing ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1">
              <Github className="w-5 h-5 text-gray-400" />
              {isEditing ? (
                <input
                  type="text"
                  value={socialData.github}
                  onChange={(e) => onUpdateField('github', e.target.value)}
                  placeholder="github.com/usuario"
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent flex-1 bg-white"
                />
              ) : (
                <a 
                  href={`https://github.com/${socialData.github}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-blue-600 hover:underline"
                >
                  {socialData.github}
                </a>
              )}
            </div>
            {isEditing && (
              <button
                onClick={() => onUpdateField('showGithub', !socialData.showGithub)}
                className="p-1 hover:bg-gray-100 rounded ml-2"
              >
                {socialData.showGithub ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </button>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default SocialNetworksCard;