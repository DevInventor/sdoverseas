import React from 'react';
import { cn } from '../../utils/cn';

export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
export type IconVariant = 'outlined' | 'filled' | 'rounded' | 'sharp';
export type IconColor = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'inherit';

interface IconProps {
  name: string;
  size?: IconSize;
  variant?: IconVariant;
  color?: IconColor | string;
  className?: string;
  spin?: boolean;
  pulse?: boolean;
  bounce?: boolean;
}

const iconSizes = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl',
};

const materialIconSizes = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-lg',
  lg: 'text-2xl',
  xl: 'text-4xl',
  '2xl': 'text-5xl',
  '3xl': 'text-6xl',
};

const iconVariants = {
  outlined: '',
  filled: '[font-variation-settings:\'FILL\'1]',
  rounded: '[font-variation-settings:\'GRAD\'200]',
  sharp: '[font-variation-settings:\'GRAD\'0]',
};

const iconColors = {
  primary: 'text-primary',
  secondary: 'text-gray-600 dark:text-gray-400',
  success: 'text-green-600 dark:text-green-400',
  warning: 'text-yellow-600 dark:text-yellow-400',
  danger: 'text-red-600 dark:text-red-400',
  info: 'text-blue-600 dark:text-blue-400',
  inherit: 'text-current',
};

export const Icon: React.FC<IconProps> = ({
  name,
  size = 'md',
  variant = 'outlined',
  color = 'inherit',
  className = '',
  spin = false,
  pulse = false,
  bounce = false,
}) => {
  const materialIconClasses = cn(
    'inline-flex items-center justify-center',
    'material-symbols-outlined',
    materialIconSizes[size],
    iconVariants[variant],
    typeof color === 'string' && iconColors[color] ? iconColors[color] : '',
    spin && 'animate-spin',
    pulse && 'animate-pulse',
    bounce && 'animate-bounce',
    className
  );

  const style = typeof color === 'string' && !iconColors[color] ? { color } : undefined;

  return (
    <span className={materialIconClasses} style={style}>
      {name}
    </span>
  );
};

// Specialized Icon Components for Common Use Cases
export const SpiceIcon: React.FC<{ size?: IconSize; className?: string }> = ({
  size = 'md',
  className = '',
}) => (
  <Icon name="spa" size={size} className={className} />
);

export const ShippingIcon: React.FC<{ size?: IconSize; className?: string }> = ({
  size = 'md',
  className = '',
}) => (
  <Icon name="local_shipping" size={size} className={className} />
);

export const QualityIcon: React.FC<{ size?: IconSize; className?: string }> = ({
  size = 'md',
  className = '',
}) => (
  <Icon name="verified" size={size} className={className} />
);

export const SupportIcon: React.FC<{ size?: IconSize; className?: string }> = ({
  size = 'md',
  className = '',
}) => (
  <Icon name="support_agent" size={size} className={className} />
);

export const SearchIcon: React.FC<{ size?: IconSize; className?: string }> = ({
  size = 'md',
  className = '',
}) => (
  <Icon name="search" size={size} className={className} />
);

export const MenuIcon: React.FC<{ size?: IconSize; className?: string }> = ({
  size = 'md',
  className = '',
}) => (
  <Icon name="menu" size={size} className={className} />
);

export const CloseIcon: React.FC<{ size?: IconSize; className?: string }> = ({
  size = 'md',
  className = '',
}) => (
  <Icon name="close" size={size} className={className} />
);

export const EmailIcon: React.FC<{ size?: IconSize; className?: string }> = ({
  size = 'md',
  className = '',
}) => (
  <Icon name="mail" size={size} className={className} />
);

export const PhoneIcon: React.FC<{ size?: IconSize; className?: string }> = ({
  size = 'md',
  className = '',
}) => (
  <Icon name="phone" size={size} className={className} />
);

export const LocationIcon: React.FC<{ size?: IconSize; className?: string }> = ({
  size = 'md',
  className = '',
}) => (
  <Icon name="location_on" size={size} className={className} />
);

export const StarIcon: React.FC<{ 
  size?: IconSize; 
  className?: string;
  filled?: boolean;
}> = ({
  size = 'md',
  className = '',
  filled = true,
}) => (
  <Icon 
    name={filled ? "star" : "star_border"} 
    size={size} 
    className={cn(
      filled ? 'text-yellow-500' : 'text-gray-300 dark:text-gray-600',
      className
    )} 
  />
);

export const CheckIcon: React.FC<{ size?: IconSize; className?: string }> = ({
  size = 'md',
  className = '',
}) => (
  <Icon name="check" size={size} className={cn('text-green-500', className)} />
);

export const ErrorIcon: React.FC<{ size?: IconSize; className?: string }> = ({
  size = 'md',
  className = '',
}) => (
  <Icon name="error" size={size} className={cn('text-red-500', className)} />
);

export const WarningIcon: React.FC<{ size?: IconSize; className?: string }> = ({
  size = 'md',
  className = '',
}) => (
  <Icon name="warning" size={size} className={cn('text-yellow-500', className)} />
);

export const InfoIcon: React.FC<{ size?: IconSize; className?: string }> = ({
  size = 'md',
  className = '',
}) => (
  <Icon name="info" size={size} className={cn('text-blue-500', className)} />
);
