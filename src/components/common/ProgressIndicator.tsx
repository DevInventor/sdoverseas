import React from 'react';
import { cn } from '../../utils/cn';

// Progress Bar Component
interface ProgressBarProps {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'success' | 'warning' | 'info' | 'danger';
  showPercentage?: boolean;
  label?: string;
  className?: string;
  animated?: boolean;
}

const progressSizes = {
  sm: 'h-2',
  md: 'h-4',
  lg: 'h-6',
};

const progressVariants = {
  primary: 'bg-primary',
  success: 'bg-green-500',
  warning: 'bg-yellow-500',
  info: 'bg-blue-500',
  danger: 'bg-red-500',
};

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  size = 'md',
  variant = 'primary',
  showPercentage = false,
  label,
  className,
  animated = false,
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className={cn('w-full space-y-2', className)}>
      {(label || showPercentage) && (
        <div className="flex justify-between items-center">
          {label && (
            <span className="text-sm font-medium text-text-light dark:text-text-dark">
              {label}
            </span>
          )}
          {showPercentage && (
            <span className="text-sm text-subtle-light dark:text-subtle-dark">
              {percentage.toFixed(0)}%
            </span>
          )}
        </div>
      )}
      
      <div className={cn(
        'w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden',
        progressSizes[size]
      )}>
        <div
          className={cn(
            'h-full rounded-full transition-all duration-300 ease-in-out',
            progressVariants[variant],
            animated && 'animate-pulse'
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

// Circular Progress Component
interface CircularProgressProps {
  value: number;
  size?: number;
  strokeWidth?: number;
  variant?: 'primary' | 'success' | 'warning' | 'info' | 'danger';
  showPercentage?: boolean;
  label?: string;
  className?: string;
  animated?: boolean;
}

export const CircularProgress: React.FC<CircularProgressProps> = ({
  value,
  size = 120,
  strokeWidth = 8,
  variant = 'primary',
  showPercentage = false,
  label,
  className,
  animated = false,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const percentage = Math.min(Math.max(value, 0), 100);
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const variantColors = {
    primary: 'stroke-primary',
    success: 'stroke-green-500',
    warning: 'stroke-yellow-500',
    info: 'stroke-blue-500',
    danger: 'stroke-red-500',
  };

  return (
    <div className={cn('flex flex-col items-center space-y-3', className)}>
      <div className="relative">
        <svg
          width={size}
          height={size}
          className="transform -rotate-90"
        >
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="none"
            className="text-gray-200 dark:text-gray-700"
          />
          
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className={cn(
              'transition-all duration-300 ease-in-out',
              variantColors[variant],
              animated && 'animate-pulse'
            )}
          />
        </svg>
        
        {showPercentage && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm font-semibold text-text-light dark:text-text-dark">
              {percentage.toFixed(0)}%
            </span>
          </div>
        )}
      </div>
      
      {label && (
        <span className="text-sm font-medium text-text-light dark:text-text-dark">
          {label}
        </span>
      )}
    </div>
  );
};

// Stepper Component
interface StepperProps {
  steps: string[];
  currentStep: number;
  variant?: 'horizontal' | 'vertical';
  showLabels?: boolean;
  className?: string;
}

export const Stepper: React.FC<StepperProps> = ({
  steps,
  currentStep,
  variant = 'horizontal',
  showLabels = true,
  className,
}) => {
  const isCompleted = (index: number) => index < currentStep;
  const isCurrent = (index: number) => index === currentStep;
  const isUpcoming = (index: number) => index > currentStep;

  if (variant === 'vertical') {
    return (
      <div className={cn('flex flex-col space-y-4', className)}>
        {steps.map((step, index) => (
          <div key={index} className="flex items-start space-x-3">
            <div
              className={cn(
                'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold border-2 transition-all',
                isCompleted(index) && 'bg-primary text-white border-primary',
                isCurrent(index) && 'bg-primary text-white border-primary ring-4 ring-primary/20',
                isUpcoming(index) && 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 border-gray-300 dark:border-gray-600'
              )}
            >
              {index + 1}
            </div>
            <div className="flex-1 min-w-0">
              {showLabels && (
                <p className={cn(
                  'text-sm font-medium',
                  isCurrent(index) && 'text-primary',
                  isCompleted(index) && 'text-text-light dark:text-text-dark',
                  isUpcoming(index) && 'text-gray-400 dark:text-gray-600'
                )}>
                  {step}
                </p>
              )}
            </div>
            {index < steps.length - 1 && variant === 'vertical' && (
              <div className="absolute left-4 mt-8 w-0.5 h-8 bg-gray-200 dark:bg-gray-700" />
            )}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={cn('flex items-center justify-between relative', className)}>
      {/* Background line */}
      <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-200 dark:bg-gray-700" />
      
      {steps.map((step, index) => (
        <div key={index} className="relative flex flex-col items-center space-y-2">
          <div
            className={cn(
              'relative w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold border-2 transition-all bg-white dark:bg-gray-900 z-10',
              isCompleted(index) && 'bg-primary text-white border-primary',
              isCurrent(index) && 'bg-primary text-white border-primary ring-4 ring-primary/20',
              isUpcoming(index) && 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 border-gray-300 dark:border-gray-600'
            )}
          >
            {index + 1}
          </div>
          {showLabels && (
            <span className={cn(
              'text-xs text-center whitespace-nowrap',
              isCurrent(index) && 'text-primary font-medium',
              isCompleted(index) && 'text-text-light dark:text-text-dark',
              isUpcoming(index) && 'text-gray-400 dark:text-gray-600'
            )}>
              {step}
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

// Upload Progress Component
interface UploadProgressProps {
  files: Array<{ name: string; progress: number; status: 'uploading' | 'completed' | 'error' }>;
  className?: string;
}

export const UploadProgress: React.FC<UploadProgressProps> = ({
  files,
  className,
}) => (
  <div className={cn('space-y-4', className)}>
    <h3 className="text-lg font-semibold text-text-light dark:text-text-dark">
      Upload Progress
    </h3>
    {files.map((file, index) => (
      <div key={index} className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-text-light dark:text-text-dark truncate">
            {file.name}
          </span>
          <span className={cn(
            'text-sm',
            file.status === 'completed' && 'text-green-600 dark:text-green-400',
            file.status === 'error' && 'text-red-600 dark:text-red-400',
            file.status === 'uploading' && 'text-text-light dark:text-text-dark'
          )}>
            {file.status === 'completed' && 'Completed'}
            {file.status === 'error' && 'Error'}
            {file.status === 'uploading' && `${file.progress}%`}
          </span>
        </div>
        
        <ProgressBar
          value={file.progress}
          size="sm"
          variant={
            file.status === 'completed' ? 'success' :
            file.status === 'error' ? 'danger' : 'primary'
          }
          animated={file.status === 'uploading'}
        />
      </div>
    ))}
  </div>
);

// Loading States Component
interface LoadingStateProps {
  state: 'initial' | 'loading' | 'success' | 'error' | 'empty';
  message?: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  state,
  message,
  icon,
  children,
  className,
}) => {
  const stateStyles = {
    initial: 'text-gray-500 dark:text-gray-400',
    loading: 'text-primary animate-pulse',
    success: 'text-green-600 dark:text-green-400',
    error: 'text-red-600 dark:text-red-400',
    empty: 'text-gray-400 dark:text-gray-500',
  };

  const defaultMessages = {
    initial: 'Ready to start',
    loading: 'Loading...',
    success: 'Success!',
    error: 'Something went wrong',
    empty: 'No data available',
  };

  return (
    <div className={cn('flex flex-col items-center justify-center p-8 text-center', className)}>
      {icon && <div className="mb-4">{icon}</div>}
      <p className={cn('text-lg font-medium', stateStyles[state])}>
        {message || defaultMessages[state]}
      </p>
      {children}
    </div>
  );
};
