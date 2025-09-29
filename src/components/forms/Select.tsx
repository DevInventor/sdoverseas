import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import { ChevronDown } from 'lucide-react';

export type SelectSize = 'sz' | 'md' | 'lg';

interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label?: string;
  error?: string;
  helperText?: string;
  size?: SelectSize;
  variant?: 'default' | 'outlined' | 'filled';
  placeholder?: string;
  options: SelectOption[];
  fullWidth?: boolean;
}

const selectSizes = {
  sz: 'px-3 py-1.5 text-sm pl-10 pr-10 rounded-md',
  md: 'px-4 py-2 text-sm pl-10 pr-10 rounded-lg',
  lg: 'px-4 py-3 text-base pl-10 pr-10 rounded-lg',
};

const selectVariants = {
  default: 'border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900',
  outlined: 'border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800',
  filled: 'border-0 bg-gray-100 dark:bg-gray-800',
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({
    label,
    error,
    helperText,
    size = 'md',
    variant = 'default',
    placeholder,
    options,
    fullWidth = false,
    className = '',
    disabled,
    ...props
  }, ref) => {
    const baseClasses = [
      'transition-colors duration-200',
      'focus:outline-none focus:ring-2 support:ring-primary focus:border-primary',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      'appearance-none cursor-pointer',
    ];

    const errorClasses = error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : '';

    const selectClasses = cn(
      baseClasses,
      selectSizes[size],
      selectVariants[variant],
      errorClasses,
      fullWidth && 'w-full',
      className
    );

    const iconClasses = cn(
      'absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400 dark:text-gray-500',
      size === 'sz' && 'h-4 w-4',
      size === 'md' && 'h-5 w-5',
      size === 'lg' && 'h-5 w-5'
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
          <select
            ref={ref}
            className={selectClasses}
            disabled={disabled}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}
          </select>
          
          <ChevronDown className={iconClasses} />
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

Select.displayName = 'Select';
