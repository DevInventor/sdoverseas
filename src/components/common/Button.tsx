import React from 'react';
import { cn } from '../../utils/cn';
import { LoadingSpinner, DotsLoading, PulseLoading } from './LoadingSpinner';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success' | 'warning' | 'info';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type ButtonIconPosition = 'left' | 'right' | 'none';
export type ButtonLoadingType = 'spinner' | 'dots' | 'pulse';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  iconPosition?: ButtonIconPosition;
  endIcon?: React.ReactNode;
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  loading?: boolean;
  loadingText?: string;
  loadingType?: ButtonLoadingType;
  fullWidth?: boolean;
  rounded?: boolean;
  gradient?: boolean;
  shadow?: boolean;
  className?: string;
  href?: string; // For link buttons
  target?: string;
  'aria-label'?: string;
  'aria-describedby'?: string;
}

const buttonVariants = {
  primary: 'bg-primary text-white hover:bg-primary/90 focus:ring-primary',
  secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700',
  outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800',
  ghost: 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800',
  danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500',
  success: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500',
  warning: 'bg-yellow-600 text-white hover:bg-yellow-700 focus:ring-yellow-500',
  info: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
};

const buttonSizes = {
  xs: 'px-2 py-1 text-xs font-medium rounded-md',
  sm: 'px-3 py-1.5 text-sm font-medium rounded-md',
  md: 'px-4 py-2 text-sm font-semibold rounded-lg',
  lg: 'px-6 py-3 text-base font-semibold rounded-lg',
  xl: 'px-8 py-4 text-lg font-semibold rounded-xl',
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'none',
  endIcon,
  children,
  onClick,
  disabled = false,
  loading = false,
  loadingText,
  loadingType = 'spinner',
  fullWidth = false,
  rounded = false,
  gradient = false,
  shadow = false,
  className = '',
  href,
  target,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedby,
  type = 'button',
  ...props
}) => {
  const baseClasses = [
    'inline-flex items-center justify-center gap-2 transition-all duration-200',
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    'transform hover:scale-105 active:scale-95',
  ];

  const variantClasses = buttonVariants[variant];
  const sizeClasses = buttonSizes[size];
  
  const renderLoadingComponent = () => {
    switch (loadingType) {
      case 'dots':
        return <DotsLoading size="sm" color="white" />;
      case 'pulse':
        return <PulseLoading className="h-4 w-4" />;
      default:
        return <LoadingSpinner size="sm" color="white" />;
    }
  };

  // Handle link buttons
  if (href) {
    const linkClasses = cn(
      baseClasses,
      buttonVariants[variant],
      buttonSizes[size],
      rounded && 'rounded-full',
      gradient && 'bg-gradient-to-r from-primary/90 to-primary hover:from-primary to-primary/90',
      shadow && 'shadow-lg hover:shadow-xl',
      fullWidth && 'w-full',
      className
    );

    return (
      <a
        href={href}
        target={target}
        className={linkClasses}
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedby}
      >
        {loading && renderLoadingComponent()}
        {icon && iconPosition === 'left' && <span className="flex-shrink-0">{icon}</span>}
        <span>{loading && loadingText ? loadingText : children}</span>
        {icon && iconPosition === 'right' && <span className="flex-shrink-0">{icon}</span>}
        {endIcon && iconPosition !== 'right' && <span className="flex-shrink-0">{endIcon}</span>}
      </a>
    );
  }

  const classes = cn(
    baseClasses,
    variantClasses,
    sizeClasses,
    rounded && 'rounded-full',
    gradient && 'bg-gradient-to-r from-primary/90 to-primary hover:from-primary to-primary/90',
    shadow && 'shadow-lg hover:shadow-xl',
    fullWidth && 'w-full',
    className
  );

  const content = loading ? (
    <>
      {renderLoadingComponent()}
      <span>{loadingText || children}</span>
    </>
  ) : (
    <>
      {icon && iconPosition === 'left' && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className="flex-shrink-0">{icon}</span>}
      {endIcon && iconPosition !== 'right' && <span className="flex-shrink-0">{endIcon}</span>}
    </>
  );

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={classes}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedby}
      {...props}
    >
      {content}
    </button>
  );
};

// Specialized button components for common use cases
export const PrimaryButton: React.FC<Omit<ButtonProps, 'variant'>> = (props) => (
  <Button {...props} variant="primary" />
);

export const SecondaryButton: React.FC<Omit<ButtonProps, 'variant'>> = (props) => (
  <Button {...props} variant="secondary" />
);

export const OutlineButton: React.FC<Omit<ButtonProps, 'variant'>> = (props) => (
  <Button {...props} variant="outline" />
);

export const GhostButton: React.FC<Omit<ButtonProps, 'variant'>> = (props) => (
  <Button {...props} variant="ghost" />
);

export const DangerButton: React.FC<Omit<ButtonProps, 'variant'>> = (props) => (
  <Button {...props} variant="danger" />
);
