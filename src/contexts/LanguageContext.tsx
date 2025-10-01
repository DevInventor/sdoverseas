import React, { createContext, useContext, useEffect, useState } from 'react';

export type Language = 'eng' | 'ger';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string, fallback?: string) => any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: React.ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  // Initialize language from localStorage or default to English
  const getInitialLanguage = (): Language => {
    if (typeof window === 'undefined') return 'eng';
    
    const savedLanguage = localStorage.getItem('language') as Language | null;
    if (savedLanguage && ['eng', 'ger'].includes(savedLanguage)) {
      return savedLanguage;
    }
    
    return 'eng';
  };

  const [language, setLanguageState] = useState<Language>(getInitialLanguage);
  const [translations, setTranslations] = useState<Record<string, any>>({});

  // Load translations for the current language
  useEffect(() => {
    const loadTranslations = async () => {
      try {
        // For English (default), use the eng folder
        const langFolder = language === 'eng' ? 'eng' : language;
        
        const globalConfig = await import(`../config/${langFolder}/global.json`);
        const homeConfig = await import(`../config/${langFolder}/home-final.json`);
        const aboutConfig = await import(`../config/${langFolder}/about.json`);
        const productsConfig = await import(`../config/${langFolder}/products.json`);
        const servicesConfig = await import(`../config/${langFolder}/services.json`);
        const contactConfig = await import(`../config/${langFolder}/contact.json`);
        const productDetailConfig = await import(`../config/${langFolder}/product-detail.json`);
        
        setTranslations({
          global: globalConfig.default,
          'home-final': homeConfig.default,
          about: aboutConfig.default,
          products: productsConfig.default,
          services: servicesConfig.default,
          contact: contactConfig.default,
          'product-detail': productDetailConfig.default,
        });
      } catch (error) {
        console.error(`Failed to load translations for language: ${language}`, error);
        // Fallback to English if language files don't exist
        if (language !== 'eng') {
          setLanguageState('eng');
        }
      }
    };

    loadTranslations();
  }, [language]);

  // Update localStorage when language changes
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
  };

  // Translation function
  const t = (key: string, fallback?: any): any => {
    const keys = key.split('.');
    let value = translations;
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return fallback || key;
      }
    }
    
    return value !== undefined ? value : (fallback || key);
  };

  const value = {
    language,
    setLanguage,
    t,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
