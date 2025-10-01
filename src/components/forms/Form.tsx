import React, { FormEvent } from 'react';
import { cn } from '../../utils/cn';
import { ValidationSchema } from '../../utils/validation';

interface FormProps {
  children: React.ReactNode;
  onSubmit?: (values: Record<string, any>) => void;
  onSubmitError?: (errors: Record<string, string>) => void;
  validation?: ValidationSchema;
  loading?: boolean;
  onReset?: () => void;
  classNames?: {
    form?: string;
    section?: string;
    actions?: string;
  };
}

export const Form: React.FC<FormProps> = ({
  children,
  onSubmit,
  // onSubmitError,
  validation,
  loading = false,
  onReset,
  classNames,
}) => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    if (loading) return;

    const formData = new FormData(event.currentTarget);
    const values: Record<string, any> = {};
    
    // Extract form values
    for (const [key, value] of formData.entries()) {
      values[key] = value;
    }

    if (validation) {
      // Basic validation check - would need proper implementation
      console.log('Validation would be handled here', values, validation);
    }

    onSubmit?.(values);
  };

  // const handleReset = () => {
  //   onReset?.();
  // };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn('w-full', classNames?.form)}
      noValidate
    >
      <div className={cn('space-y-6', classNames?.section)}>
        {children}
      </div>
      
      {(onSubmit || onReset) && (
        <div className={cn('flex gap-4 pt-6', classNames?.actions)}>
          <FormActions onSubmit={onSubmit} onReset={onReset} loading={loading} />
        </div>
      )}
    </form>
  );
};

// Typography components for forms
export const FormHeading: React.FC<{ children: React.ReactNode; level?: 1 | 2 | 3 | 4 }> = ({ 
  children, 
  level = 2 
}) => {
  const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;
  
  return (
    <HeadingTag className={cn(
      'text-text-light dark:text-text-dark font-semibold',
      level === 1 && 'text-3xl',
      level === 2 && 'text-2xl',
      level === 3 && 'text-xl',
      level === 4 && 'text-lg'
    )}>
      {children}
    </HeadingTag>
  );
};

export const FormDescription: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="text-subtle-light dark:text-subtle-dark mt-1">
    {children}
  </p>
);

// Form layout components
interface FormSectionProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  className?: string;
  required?: boolean;
}

export const FormSection: React.FC<FormSectionProps> = ({
  children,
  title,
  description,
  className,
  required = false,
}) => (
  <div className={cn('space-y-4', className)}>
    <div className="space-y-2">
      {title && (
        <div className="flex items-center gap-2">
          <FormHeading level={3}>{title}</FormHeading>
          {required && <span className="text-red-500">*</span>}
        </div>
      )}
      {description && <FormDescription>{description}</FormDescription>}
    </div>
    <div className="space-y-4">{children}</div>
  </div>
);

interface FormRowProps {
  children: React.ReactNode;
  className?: string;
}

export const FormRow: React.FC<FormRowProps> = ({ children, className }) => (
  <div className={cn('grid gap-4', className)}>
    {children}
  </div>
);

interface FormGroupProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  className?: string;
}

export const FormGroup: React.FC<FormGroupProps> = ({
  children,
  title,
  description,
  className,
}) => (
  <div className={cn('space-y-2', className)}>
    {title && (
      <label className="text-sm font-medium text-text-light dark:text-text-dark">
        {title}
      </label>
    )}
    {description && (
      <p className="text-xs text-subtle-light dark:text-subtle-dark">
        {description}
      </p>
    )}
    {children}
  </div>
);

// Form actions component
interface FormActionsProps {
  onSubmit?: (values: Record<string, any>) => void;
  onReset?: () => void;
  loading?: boolean;
  submitText?: string;
  resetText?: string;
  variant?: 'default' | 'compact' | 'full-width';
}

export const FormActions: React.FC<FormActionsProps> = ({
  onSubmit,
  onReset,
  loading = false,
  submitText = 'Submit',
  resetText = 'Reset',
  variant = 'default',
}) => {
  const containerClasses = cn(
    'flex gap-3',
    variant === 'compact' && 'gap-2',
    variant === 'full-width' && 'w-full space-x-0 [&>*]:flex-1'
  );

  return (
    <div className={containerClasses}>
      {onReset && (
        <button
          type="button"
          onClick={onReset}
          disabled={loading}
          className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {resetText}
        </button>
      )}
      
      {onSubmit && (
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary/90 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
        >
          {loading && (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          )}
          {submitText}
        </button>
      )}
    </div>
  );
};

// Re-export form components for convenience
export * from './Input';
export * from './Select';
export * from './Textarea';
