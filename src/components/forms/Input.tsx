import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';

export type InputSize = 'sm' | 'md' | 'lg' | 'xl';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  helperText?: string;
  size?: InputSize;
  variant?: 'default' | 'outlined' | 'filled' | 'floating' | 'minimal';
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  fullWidth?: boolean;
  loading?: boolean;
  clearable?: boolean;
  password?: boolean;
  debounceMs?: number;
}

const inputSizes = {
  sm: 'px-3 py-1.5 text-sm rounded-md',
  md: 'px-4 py-2 text-sm rounded-lg',
  lg: 'px-4 py-3 text-base rounded-lg',
  xl: 'px-6 py-4 text-lg rounded-xl',
};

const inputVariants = {
  default: 'border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900',
  outlined: 'border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800',
  filled: 'border-0 bg-gray-100 dark:bg-gray-800',
  floating: 'border-0 border-b-2 border-gray-300 dark:border-gray-600 bg-transparent rounded-none focus:border-primary',
  minimal: 'border-0 bg-transparent focus:bg-white/10 dark:focus:bg-gray-900/10',
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({
    label,
    error,
    helperText,
    size = 'md',
    variant = 'default',
    startIcon,
    endIcon,
    fullWidth = false,
    className = '',
    disabled,
    ...props
  }, ref) => {
    const baseClasses = [
      'transition-colors duration-200',
      'focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      'placeholder:text-gray-400 dark:placeholder:text-gray-500',
    ];

    const errorClasses = error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : '';
    const iconClasses = startIcon ? 'pl-10' : 'pl-4';
    const endIconClasses = endIcon ? 'pr-10' : 'pr-4';

    const inputClasses = cn(
      baseClasses,
      inputSizes[size],
      inputVariants[variant],
      iconClasses,
      endIconClasses,
      errorClasses,
      fullWidth && 'w-full',
      className
    );

    return (
      <div className={cn('w-full', !fullWidth && 'inline-block')}>
        {label && (
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        
        <div className="relative">
          {startIcon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500">
              {startIcon}
            </div>
          )}
          
          <input
            ref={ref}
            className={inputClasses}
            disabled={disabled}
            {...props}
          />
          
          {endIcon && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500">
              {endIcon}
            </div>
          )}
        </div>
        
        {error && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">
            {error}
          </p>
        )}
        
        {helperText && !error && (
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
