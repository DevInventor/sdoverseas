import React from 'react';
import { cn } from '../../utils/cn';

export type CardVariant = 'default' | 'elevated' | 'outlined' | 'glass' | 'gradient' | 'minimal' | 'neumorphic';
export type CardHoverEffect = 'lift' | 'glow' | 'scale' | 'rotate' | 'slide-up' | 'none';
export type CardPadding = 'none' | 'sm' | 'md' | 'lg' | 'xl';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  hover?: CardHoverEffect;
  padding?: CardPadding;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  gradient?: 'primary' | 'success' | 'warning' | 'info' | 'danger';
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
}

const cardVariants = {
  default: 'bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark',
  elevated: 'bg-surface-light dark:bg-surface-dark shadow-sm border-0',
  outlined: 'bg-transparent border-2 border-border-light dark:border-border-dark',
  glass: 'bg-surface-light/80 dark:bg-surface-dark/80 backdrop-blur-sm border border-surface-light/20 dark:border-surface-dark/50',
  gradient: 'bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20',
  minimal: 'bg-transparent border-0 shadow-none',
  neumorphic: 'bg-accent-light dark:bg-accent-dark shadow-[5px_5px_10px_rgba(0,0,0,0.1)] dark:shadow-[5px_5px_10px_rgba(0,0,0,0.3)]',
};

const hoverEffects = {
  lift: 'hover:-translate-y-2 hover:shadow-lg transition-all duration-300',
  glow: 'hover:shadow-primary/25 hover:shadow-2xl transition-all duration-300',
  scale: 'hover:scale-105 transition-all duration-300',
  rotate: 'hover:rotate-1 transition-all duration-300',
  'slide-up': 'hover:-translate-y-4 hover:bg-gradient-to-t hover:from-primary/5 transition-all duration-300',
  none: '',
};

const paddingVariants = {
  none: '',
  sm: 'p-3',
  md: 'p-6',
  lg: 'p-8',
  xl: 'p-12',
};

const shadowVariants = {
  none: '',
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
  xl: 'shadow-2xl',
};

export const Card: React.FC<CardProps> = ({
  variant = 'default',
  hover = 'lift',
  padding = 'md',
  children,
  className = '',
  onClick,
  disabled = false,
  loading = false,
  gradient,
  shadow,
  ...props
}) => {
  const baseClasses = 'rounded-xl overflow-hidden';
  const interactiveClasses = onClick ? 'cursor-pointer' : '';
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : '';
  const loadingClasses = loading ? 'animate-pulse' : '';
  
  const classes = cn(
    baseClasses,
    cardVariants[variant],
    hoverEffects[hover],
    paddingVariants[padding],
    shadow ? shadowVariants[shadow] : '',
    gradient ? `bg-gradient-to-br from-${gradient}-50 to-${gradient}-100 dark:from-${gradient}-900 dark:to-${gradient}-800` : '',
    interactiveClasses,
    disabledClasses,
    loadingClasses,
    className
  );

  return (
    <div className={classes} onClick={disabled ? undefined : onClick} {...props}>
      {loading ? (
        <div className="space-y-4">
          <div className="animate-pulse bg-neutral-300 dark:bg-neutral-700 h-32 rounded" />
          <div className="space-y-2">
            <div className="animate-pulse bg-neutral-300 dark:bg-neutral-700 h-4 rounded w-3/4" />
            <div className="animate-pulse bg-neutral-300 dark:bg-neutral-700 h-4 rounded w-1/2" />
          </div>
        </div>
      ) : (
        children
      )}
    </div>
  );
};

// Card Header Component
interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ children, className = '' }) => {
  return (
    <div className={cn('p-6 pb-4', className)}>
      {children}
    </div>
  );
};

// Card Content Component
interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export const CardContent: React.FC<CardContentProps> = ({ children, className = '' }) => {
  return (
    <div className={cn('p-6 pt-0', className)}>
      {children}
    </div>
  );
};

// Card Footer Component
interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export const CardFooter: React.FC<CardFooterProps> = ({ children, className = '' }) => {
  return (
    <div className={cn('p-6 pt-4 border-t border-gray-200 dark:border-gray-700', className)}>
      {children}
    </div>
  );
};

// Specialized Card Components

// Product Card
interface ProductCardProps {
  image: string;
  title: string;
  description: string;
  category?: string;
  onClick?: () => void;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  image,
  title,
  description,
  category,
  onClick,
  className = '',
}) => {
  return (
    <Card hover="lift" onClick={onClick} className={cn('group', className)}>
      <div className="relative aspect-square overflow-hidden">
        <div
          className="h-full w-full bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
          style={{ backgroundImage: `url("${image}")` }}
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Card onClick={undefined} hover="none" className="bg-surface-light/90 dark:bg-surface-dark/90">
              <span className="px-4 py-2 text-sm font-semibold text-text-light dark:text-text-dark">
                View Details
              </span>
            </Card>
          </div>
        </div>
      </div>
      <CardContent>
        {category && (
          <span className="text-sm font-medium text-primary mb-2 inline-block">
            {category}
          </span>
        )}
        <h3 className="text-lg font-semibold text-text-light dark:text-text-dark mb-2">
          {title}
        </h3>
        <p className="text-sm text-subtle-light dark:text-subtle-dark">
          {description}
        </p>
      </CardContent>
    </Card>
  );
};

// Service Card
interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  icon,
  title,
  description,
  className = '',
}) => {
  return (
    <Card variant="elevated" hover="lift" className={cn('group p-8 text-center', className)}>
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-text-light dark:text-text-dark mb-2">{title}</h3>
      <p className="text-subtle-light dark:text-subtle-dark">{description}</p>
    </Card>
  );
};

// Testimonial Card
interface TestimonialCardProps {
  image: string;
  name: string;
  title?: string;
  company?: string;
  content: string;
  rating?: number;
  className?: string;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({
  image,
  name,
  title,
  company,
  content,
  rating,
  className = '',
}) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={cn(
          'text-lg',
          i < rating ? 'text-primary' : 'text-gray-300 dark:text-gray-600'
        )}
      >
        ★
      </span>
    ));
  };

  return (
    <Card variant="default" hover="lift" className={className}>
      <CardContent>
        <div className="flex items-center gap-4 mb-4">
          <img
            src={image}
            alt={name}
            className="h-12 w-12 rounded-full object-cover"
          />
          <div>
            <h4 className="font-semibold text-text-light dark:text-text-dark">{name}</h4>
            {title && company && (
              <p className="text-sm text-subtle-light dark:text-subtle-dark">
                {title}, {company}
              </p>
            )}
            {rating && (
              <div className="flex">{renderStars(rating)}</div>
            )}
          </div>
        </div>
        <blockquote className="text-subtle-light dark:text-subtle-dark italic">
          "{content}"
        </blockquote>
      </CardContent>
    </Card>
  );
};
