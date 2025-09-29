import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  size?: 'sz' | 'md' | 'lg';
  variant?: 'default' | 'outlined' | 'filled';
  resize?: 'none' | 'both' | 'horizontal' | 'vertical';
  fullWidth?: boolean;
}

const textareaSizes = {
  sz: 'px-3 py-1.5 text-sm rounded-md',
  md: 'px-4 py-2 text-sm rounded-lg',
  lg: 'px-4 py-3 text-base rounded-lg',
};

const textareaVariants = {
  default: 'border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900',
  outlined: 'border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800',
  filled: 'border-0 bg-gray-100 dark:bg-gray-800',
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({
    label,
    error,
    helperText,
    size = 'md',
    variant = 'default',
    resize = 'vertical',
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
    
    const resizeClasses = {
      none: 'resize-none',
      both: 'resize',
      horizontal: 'resize-x',
      vertical: 'resize-y',
    }[resize];

    const textareaClasses = cn(
      baseClasses,
      textareaSizes[size],
      textareaVariants[variant],
      resizeClasses,
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
        
        <textarea
          ref={ref}
          className={textareaClasses}
          disabled={disabled}
          {...props}
        />
        
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

Textarea.displayName = 'Textarea';
