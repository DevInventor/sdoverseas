/**
 * Utility functions for handling image paths in both development and production environments
 */

// Import Vite environment types
/// <reference types="vite/client" />

// Get the base path for current environment
const getBasePath = (): string => {
  // Check if we're in production (GitHub Pages)
  if (window.location.hostname.includes('github.io') || import.meta.env.PROD) {
    return '/sdoverseas';
  }
  
  // For development, return empty string
  return '';
};

/**
 * Resolves image paths correctly for both development and production
 * @param relativePath - The relative path from public directory (e.g., '/service-hero.png')
 * @returns The correct absolute path for the current environment
 */
export const resolveImagePath = (relativePath: string): string => {
  const basePath = getBasePath();
  
  // If no base path needed, just return the original path
  if (!basePath) {
    return relativePath;
  }
  
  // Remove leading slash if present and add base path
  const cleanPath = relativePath.startsWith('/') ? relativePath.slice(1) : relativePath;
  return `${basePath}/${cleanPath}`;
};

/**
 * Hook for reactive image path resolution
 */
export const useImagePath = () => {
  return {
    resolve: resolveImagePath,
    basePath: getBasePath(),
  };
};
