// App-wide constants - Now using dynamic configuration
import { 
  getGlobalConfig, 
  getProducts, 
  getServices, 
  getTestimonials,
  getCompanyInfo,
  getNavigationItems 
} from '../config';

// Routes
export const ROUTES = {
  HOME_V1: '/',
  HOME_V2: '/home-v2',
  HOME_V3: '/home-v3',
  HOME_DEMO: '/home-demo',
  ABOUT: '/about',
  CONTACT: '/contact',
  PRODUCTS: '/products',
  PRODUCT_DETAIL: '/products/:id',
  SERVICES: '/services',
  TESTIMONIALS: '/testimonials',
} as const;

// Dynamic constants from configuration
export const APP_NAME = getGlobalConfig().app.name;
export const APP_DESCRIPTION = getGlobalConfig().app.description;

// Navigation items from configuration
export const NAVIGATION_ITEMS = getNavigationItems();

// Color scheme variations for home pages - Now from configuration
export const HOME_PAGE_THEMES = getGlobalConfig().themes;

// Dynamic data from configuration
export const SPICE_PRODUCTS = getProducts();
export const SERVICES_DATA = getServices();
export const TESTIMONIALS_DATA = getTestimonials();
export const COMPANY_INFO = getCompanyInfo();
