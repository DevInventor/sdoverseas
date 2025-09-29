import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Globe } from 'lucide-react';

export const LanguageToggle: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'eng' ? 'grm' : 'eng');
  };

  const getLanguageLabel = () => {
    return language === 'eng' ? 'DE' : 'EN';
  };

  const getLanguageName = () => {
    return language === 'eng' ? 'German' : 'English';
  };

  return (
    <button
      onClick={toggleLanguage}
      className={`inline-flex items-center justify-center p-2 rounded-lg bg-accent-light dark:bg-accent-dark text-text-light dark:text-text-dark hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors ${className}`}
      aria-label={`Switch to ${getLanguageName()} language`}
      title={`Switch to ${getLanguageName()}`}
    >
      <Globe className="h-4 w-4 mr-1" />
      <span className="text-sm font-medium">{getLanguageLabel()}</span>
    </button>
  );
};
