import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility function to merge Tailwind CSS classes
 * Combines clsx for conditional classes and tailwind-merge for duplicate resolution
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Utility function to create conditional class names
 */
export function conditionalClasses(
  baseClasses: string,
  conditionalClasses: Record<string, boolean>
): string {
  const classes = Object.entries(conditionalClasses)
    .filter(([, condition]) => condition)
    .map(([className]) => className);
  
  return cn(baseClasses, ...classes);
}

/**
 * Utility function to create responsive class names
 */
export function responsiveClasses(baseClasses: Record<string, string>): string {
  const classes = Object.entries(baseClasses).map(([screen, className]) => {
    if (screen === 'default') return className;
    return `${screen}:${className}`;
  });
  
  return cn(...classes);
}
