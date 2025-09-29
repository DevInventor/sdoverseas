import React from 'react';
import { cn } from '../../utils/cn';

export type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface LoadingSpinnerProps {
  size?: SpinnerSize;
  color?: 'primary' | 'white' | 'gray';
  className?: string;
}

const spinnerSizes = {
  xs: 'h-3 w-3',
  sm: 'h-4 w-4',
  md: 'h-6 w-6',
  lg: 'h-8 w-8',
  xl: 'h-12 w-12',
};

const spinnerColors = {
  primary: 'text-primary',
  white: 'text-white',
  gray: 'text-gray-500 dark:text-gray-400',
};

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  color = 'primary',
  className = '',
}) => {
  const spinnerClasses = cn(
    'animate-spin',
    spinnerSizes[size],
    spinnerColors[color],
    className
  );

  return (
    <svg className={spinnerClasses} fill="none" viewBox="0 0 24 24">
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
};

// Dots Loading Animation
interface DotsLoadingProps {
  size?: SpinnerSize;
  color?: 'primary' | 'white' | 'gray';
  className?: string;
}

export const DotsLoading: React.FC<DotsLoadingProps> = ({
  size = 'md',
  color = 'primary',
  className = '',
}) => {
  const dotSizes = {
    xs: 'h-1 w-1',
    sm: 'h-1.5 w-1.5',
    md: 'h-2 w-2',
    lg: 'h-3 w-3',
    xl: 'h-4 w-4',
  };

  const dotClasses = cn(
    dotSizes[size],
    spinnerColors[color],
    'rounded-full animate-bounce'
  );

  return (
    <div className={cn('flex space-x-1', className)}>
      <div className={cn(dotClasses, 'animation-delay-0')} />
      <div className={cn(dotClasses, 'animation-delay-75')} />
      <div className={cn(dotClasses, 'animation-delay-150')} />
    </div>
  );
};

// Pulse Loading Animation
interface PulseLoadingProps {
  className?: string;
}

export const PulseLoading: React.FC<PulseLoadingProps> = ({ className = '' }) => {
  return (
    <div className={cn('animate-pulse bg-gray-300 dark:bg-gray-600 rounded', className)} />
  );
};

// Skeleton Components
interface SkeletonProps {
  className?: string;
  height?: string;
  width?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  height,
  width,
}) => {
  return (
    <div
      className={cn('animate-pulse bg-gray-300 dark:bg-gray-600 rounded', className)}
      style={{ height, width }}
    />
  );
};

// Card Skeleton
export const CardSkeleton: React.FC = () => {
  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-6">
      <Skeleton height="200px" className="mb-4 rounded-lg" />
      <Skeleton height="20px" className="mb-2" />
      <Skeleton height="16px" width="80%" className="mb-2" />
      <Skeleton height="16px" width="60%" />
    </div>
  );
};

// Product Card Skeleton
export const ProductCardSkeleton: React.FC = () => {
  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
      <Skeleton height="200px" />
      <div className="p-4">
        <Skeleton height="18px" className="mb-2" />
        <Skeleton height="14px" width="90%" className="mb-1" />
        <Skeleton height="14px" width="70%" />
      </div>
    </div>
  );
};

// Text Skeleton
export const TextSkeleton: React.FC<{ lines?: number; className?: string }> = ({
  lines = 1,
  className = '',
}) => {
  return (
    <div className={cn('space-y-2', className)}>
      {Array.from({ length: lines }, (_, i) => (
        <Skeleton
          key={i}
          height="16px"
          width={i === lines - 1 ? '60%' : '100%'}
        />
      ))}
    </div>
  );
};
