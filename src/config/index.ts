// Configuration loader for dynamic content management
// Default language files (English)
import globalConfig from './eng/global.json';
import homeFinalConfig from './eng/home-final.json';
import aboutConfig from './eng/about.json';
import productsConfig from './eng/products.json';
import productDetailConfig from './eng/product-detail.json';
import servicesConfig from './eng/services.json';
import contactConfig from './eng/contact.json';
import dataConfig from './data.json';
import searchConfig from './search.json';
import themeConfig from './theme.json';

// Type definitions for configuration
export interface GlobalConfig {
  app: {
    name: string;
    description: string;
    tagline: string;
  };
  company: {
    name: string;
    description: string;
    address: {
      street: string;
      city: string;
      state: string;
      country: string;
      postalCode: string;
    };
    contact: {
      email: string;
      phone: string;
      whatsapp: string;
    };
    social: {
      linkedin: string;
      twitter: string;
      facebook: string;
      instagram: string;
    };
    businessHours: {
      weekdays: string;
      saturday: string;
      sunday: string;
    };
  };
  navigation: {
    items: Array<{ name: string; href: string }>;
    homeVariants: Array<{ name: string; href: string }>;
  };
  themes: {
    home: Array<{
      name: string;
      href: string;
      description: string;
    }>;
  };
}

export interface PageConfig {
  hero?: {
    title: string;
    subtitle: string;
    backgroundImage?: string;
    cta?: {
      text: string;
      href?: string;
      action?: string;
    };
    buttons?: Array<{
      text: string;
      href?: string;
      action?: string;
      variant?: string;
    }>;
    image?: string;
  };
  sections?: Record<string, any>;
  [key: string]: any; // Allow additional properties
}

export interface DataConfig {
  products: Array<{
    id: string;
    name: string;
    category: string;
    origin: string;
    description: string;
    image: string;
    specifications: Record<string, string>;
  }>;
  services: Array<{
    id: string;
    title: string;
    description: string;
    icon: string;
  }>;
  testimonials: Array<{
    id: number;
    name: string;
    title: string;
    company: string;
    content: string;
    rating: number;
    image: string;
    date: string;
  }>;
}

export interface SearchConfig {
  searchConfig: {
    minQueryLength: number;
    maxResults: number;
    fuzzyThreshold: number;
    exactMatchBonus: number;
    categoryMatchBonus: number;
  };
  searchAliases: Record<string, {
    terms: string[];
    productId?: string;
    serviceId?: string;
  } | string[]>; // Support both new object format and old array format
  quickRedirects: Record<string, string>;
}

export interface ThemeConfig {
  colors: {
    background: {
      light: string;
      dark: string;
    };
    surface: {
      light: string;
      dark: string;
    };
    header: {
      light: string;
      dark: string;
    };
    text: {
      light: string;
      dark: string;
    };
    subtle: {
      light: string;
      dark: string;
    };
    border: {
      light: string;
      dark: string;
    };
    accent: {
      light: string;
      dark: string;
    };
    primary: Record<string, string>;
    neutral: Record<string, string>;
    slate: Record<string, string>;
    zinc: Record<string, string>;
    success: Record<string, string>;
    warning: Record<string, string>;
    error: Record<string, string>;
  };
  opacity: {
    header: string;
    card: string;
    cardHover: string;
    overlay: string;
  };
  shadows: {
    light: string;
    medium: string;
    large: string;
    dark: string;
  };
  description: string;
}

// Configuration getter functions
export const getGlobalConfig = (): GlobalConfig => globalConfig as GlobalConfig;

export const getPageConfig = (page: string): PageConfig => {
  const configs: Record<string, any> = {
    'home-final': homeFinalConfig,
    'about': aboutConfig,
    'products': productsConfig,
    'product-detail': productDetailConfig,
    'services': servicesConfig,
    'contact': contactConfig,
  };
  
  return configs[page] || {};
};

export const getDataConfig = (): DataConfig => dataConfig as any;
export const getSearchConfig = (): SearchConfig => searchConfig as SearchConfig;
export const getThemeConfig = (): ThemeConfig => themeConfig as ThemeConfig;

// Helper functions for specific data
export const getProducts = () => getDataConfig().products;
export const getServices = () => getDataConfig().services;
export const getTestimonials = () => getDataConfig().testimonials;
export const getCompanyInfo = () => getGlobalConfig().company;
export const getNavigationItems = () => getGlobalConfig().navigation.items;
export const getHomeVariants = () => getGlobalConfig().navigation.homeVariants;

// Configuration validation
export const validateConfig = (config: any): boolean => {
  try {
    // Basic validation - check if required fields exist
    if (!config || typeof config !== 'object') return false;
    return true;
  } catch (error) {
    console.error('Configuration validation error:', error);
    return false;
  }
};

// Export all configurations for direct access if needed
export {
  globalConfig,
  homeFinalConfig,
  aboutConfig,
  productsConfig,
  productDetailConfig,
  servicesConfig,
  contactConfig,
  dataConfig,
  searchConfig,
};
