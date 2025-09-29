import React from 'react';
import { Button } from '../common';

export type HeroVariant = 'centered' | 'left-aligned' | 'minimal' | 'split';

interface HeroSectionProps {
  variant?: HeroVariant;
  backgroundImage: string;
  overlay?: boolean;
  overlayOpacity?: number;
  title: string;
  subtitle?: string;
  primaryCTA?: {
    text: string;
    onClick: () => void;
  };
  secondaryCTA?: {
    text: string;
    onClick: () => void;
  };
  className?: string;
  height?: 'sm' | 'md' | 'lg' | 'xl';
}

const heroVariants = {
  centered: 'items-center justify-center text-center',
  'left-aligned': 'items-start justify-start text-left',
  minimal: 'items-center justify-center text-center py-16',
  split: 'items-center justify-center text-center lg:text-left',
};

const heroHeights = {
  sm: 'min-h-[40vh]',
  md: 'min-h-[50vh]',
  lg: 'min-h-[60vh]',
  xl: 'min-h-[75vh]',
};

export const HeroSection: React.FC<HeroSectionProps> = ({
  variant = 'centered',
  backgroundImage,
  overlay = true,
  overlayOpacity = 0.5,
  title,
  subtitle,
  primaryCTA,
  secondaryCTA,
  className = '',
  height = 'lg',
}) => {
  // Create overlay class if needed
  const overlayClass = overlay ? `before:absolute before:inset-0 before:bg-black before:opacity-${Math.round(overlayOpacity * 100)} before:z-0` : '';
  
  const heroClasses = [
    'relative flex w-full flex-col',
    `bg-[url('${backgroundImage}')]`,
    'bg-no-repeat bg-cover bg-center',
    'px-4 py-16 text-white md:px-6 lg:px-8',
    overlayClass,
    heroHeights[height],
    heroVariants[variant],
    className,
  ].join(' ');

  const containerClasses = variant === 'split' 
    ? 'flex w-full max-w-5xl flex-col gap-6 lg:flex-row lg:items-center lg:gap-12'
    : 'mx-auto flex w-full max-w-5xl flex-col items-start gap-6';

  return (
    <section className={heroClasses}>
      <div className={`${containerClasses} relative z-10`}>
        <div className={`flex-1 ${variant === 'split' ? 'lg:mr-12' : ''}`}>
          <h1 className="text-4xl font-extrabold leading-tight tracking-tighter md:text-5xl lg:text-6xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-4 max-w-2xl text-base text-slate-200 md:text-lg">
              {subtitle}
            </p>
          )}
          
          {(primaryCTA || secondaryCTA) && (
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              {primaryCTA && (
                <Button
                  variant="primary"
                  size="lg"
                  onClick={primaryCTA.onClick}
                  className="bg-primary hover:bg-primary/90"
                >
                  {primaryCTA.text}
                </Button>
              )}
              {secondaryCTA && (
                <Button
                  variant="outline"
                  size="lg"
                  onClick={secondaryCTA.onClick}
                  className="border-white text-white hover:bg-white hover:text-gray-900"
                >
                  {secondaryCTA.text}
                </Button>
              )}
            </div>
          )}
        </div>
        
        {variant === 'split' && (
          <div className="flex-shrink-0">
            <div className="relative mx-auto aspect-square w-full max-w-md">
              <img 
                src={backgroundImage}
                alt="Hero"
                className="h-full w-full rounded-xl object-cover shadow-2xl"
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/50 to-transparent" />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
