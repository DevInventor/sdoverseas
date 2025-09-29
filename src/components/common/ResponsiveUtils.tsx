import React, { useState, useEffect } from 'react';
import { cn } from '../../utils/cn';

// Responsive Container Component
interface ResponsiveContainerProps {
  children: React.ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  padding?: boolean;
  className?: string;
}

export const ResponsiveContainer: React.FC<ResponsiveContainerProps> = ({
  children,
  maxWidth = 'xl',
  padding = true,
  className,
}) => {
  const maxWidthClasses = {
    xs: 'max-w-xs mx-auto',
    sm: 'max-w-sm mx-auto',
    md: 'max-w-md mx-auto',
    lg: 'max-w-lg mx-auto',
    xl: 'max-w-xl mx-auto',
    '2xl': 'max-w-2xl mx-auto',
    full: 'w-full',
  };

  const classes = cn(
    maxWidthClasses[maxWidth],
    padding && 'px-4 sm:px-6 lg:px-8',
    className
  );

  return <div className={classes}>{children}</div>;
};

// Responsive Grid Component
interface ResponsiveGridProps {
  children: React.ReactNode;
  columns?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  gap?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const ResponsiveGrid: React.FC<ResponsiveGridProps> = ({
  children,
  columns = {
    xs: 1,
    sm: 2,
    md: 3,
    lg: 4,
    xl: 5,
  },
  gap = 'md',
  className,
}) => {
  const buildGridClasses = () => {
    const classes = ['grid'];
    
    // Responsive columns
    if (columns.xs) classes.push(`grid-cols-${columns.xs}`);
    if (columns.sm) classes.push(`sm:grid-cols-${columns.sm}`);
    if (columns.md) classes.push(`md:grid-cols-${columns.md}`);
    if (columns.lg) classes.push(`lg:grid-cols-${columns.lg}`);
    if (columns.xl) classes.push(`xl:grid-cols-${columns.xl}`);
    
    // Gap
    const gapClasses = {
      sm: 'gap-2',
      md: 'gap-4',
      lg: 'gap-6',
      xl: 'gap-8',
    };
    
    classes.push(gapClasses[gap]);
    
    return classes;
  };

  return (
    <div className={cn(buildGridClasses(), className)}>
      {children}
    </div>
  );
};

// Responsive Stack Component
interface ResponsiveStackProps {
  children: React.ReactNode;
  direction?: {
    xs?: 'row' | 'column';
    sm?: 'row' | 'column';
    md?: 'row' | 'column';
    lg?: 'row' | 'column';
    xl?: 'row' | 'column';
  };
  spacing?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  alignItems?: 'start' | 'center' | 'end' | 'stretch';
  justifyContent?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  wrap?: boolean;
  className?: string;
}

export const ResponsiveStack: React.FC<ResponsiveStackProps> = ({
  children,
  direction = {
    xs: 'column',
    sm: 'row',
  },
  spacing = 'md',
  alignItems = 'start',
  justifyContent = 'start',
  wrap = false,
  className,
}) => {
  const buildStackClasses = () => {
    const classes = ['flex'];
    
    // Direction classes
    if (direction.xs) classes.push(`flex-${direction.xs}`);
    
    // Responsive directions
    Object.entries(direction).forEach(([breakpoint, dir]) => {
      if (breakpoint !== 'xs') {
        classes.push(`${breakpoint}:flex-${dir}`);
      }
    });
    
    // Spacing classes
    const spacingClasses = {
      xs: 'gap-1',
      sm: 'gap-2',
      md: 'gap-4',
      lg: 'gap-6',
      xl: 'gap-8',
    };
    classes.push(spacingClasses[spacing]);
    
    // Alignment classes
    const alignClasses = {
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
      stretch: 'items-stretch',
    };
    classes.push(alignClasses[alignItems]);
    
    // Justify classes
    const justifyClasses = {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
      between: 'justify-between',
      around: 'justify-around',
      evenly: 'justify-evenly',
    };
    classes.push(justifyClasses[justifyContent]);
    
    if (wrap) classes.push('flex-wrap');
    
    return classes;
  };

  return (
    <div className={cn(buildStackClasses(), className)}>
      {children}
    </div>
  );
};

// Breakpoint Hook
export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export const useBreakpoint = () => {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>('lg');

  useEffect(() => {
    const breakpoints = {
      xs: 640,
      sm: 768,
      md: 1024,
      lg: 1280,
      xl: 1536,
      '2xl': 1920,
    };

    const updateBreakpoint = () => {
      const width = window.innerWidth;
      
      if (width < breakpoints.sm) {
        setBreakpoint('xs');
      } else if (width < breakpoints.md) {
        setBreakpoint('sm');
      } else if (width < breakpoints.lg) {
        setBreakpoint('md');
      } else if (width < breakpoints.xl) {
        setBreakpoint('lg');
      } else if (width < breakpoints['2xl']) {
        setBreakpoint('xl');
      } else {
        setBreakpoint('2xl');
      }
    };

    updateBreakpoint();
    window.addEventListener('resize', updateBreakpoint);

    return () => window.removeEventListener('resize', updateBreakpoint);
  }, []);

  return breakpoint;
};

// Responsive Visibility Component
interface ResponsiveVisibilityProps {
  children: React.ReactNode;
  show?: {
    xs?: boolean;
    sm?: boolean;
    md?: boolean;
    lg?: boolean;
    xl?: boolean;
    '2xl'?: boolean;
  };
  hide?: {
    xs?: boolean;
    sm?: boolean;
    md?: boolean;
    lg?: boolean;
    xl?: boolean;
    '2xl'?: boolean;
  };
}

export const ResponsiveVisibility: React.FC<ResponsiveVisibilityProps> = ({
  children,
  show,
  hide,
}) => {
  const buildVisibilityClasses = () => {
    const classes: string[] = [];
    
    if (show) {
      Object.entries(show).forEach(([breakpoint, visible]) => {
        if (visible) {
          classes.push(`${breakpoint}:block`);
        } else {
          classes.push(`${breakpoint}:hidden`);
        }
      });
    }
    
    if (hide) {
      Object.entries(hide).forEach(([breakpoint, hidden]) => {
        if (hidden) {
          classes.push(`${breakpoint}:hidden`);
        }
      });
    }
    
    return classes;
  };

  return (
    <div className={cn(buildVisibilityClasses())}>
      {children}
    </div>
  );
};

// Responsive Typography Component
interface ResponsiveTypographyProps {
  children: React.ReactNode;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body' | 'caption' | 'small';
  responsive?: boolean;
  className?: string;
}

export const ResponsiveTypography: React.FC<ResponsiveTypographyProps> = ({
  children,
  variant = 'body',
  responsive = true,
  className,
}) => {
  const typographyClasses = {
    h1: responsive ? 'text-3xl sm:text-4xl lg:text-5xl font-bold' : 'text-5xl font-bold',
    h2: responsive ? 'text-2xl sm:text-3xl lg:text-4xl font-bold' : 'text-4xl font-bold',
    h3: responsive ? 'text-xl sm:text-2xl lg:text-3xl font-semibold' : 'text-3xl font-semibold',
    h4: responsive ? 'text-lg sm:text-xl lg:text-2xl font-semibold' : 'text-2xl font-semibold',
    h5: responsive ? 'text-base sm:text-lg font-medium' : 'text-lg font-medium',
    h6: responsive ? 'text-sm sm:text-base font-medium' : 'text-base font-medium',
    body: responsive ? 'text-sm sm:text-base' : 'text-base',
    caption: 'text-sm',
    small: 'text-xs',
  };

  const Tag = variant.startsWith('h') ? variant as keyof JSX.IntrinsicElements : 'p';

  return (
    <Tag className={cn(typographyClasses[variant], className)}>
      {children}
    </Tag>
  );
};

// Responsive Image Component
interface ResponsiveImageProps {
  src: string;
  alt: string;
  aspectRatio?: 'square' | 'video' | 'portrait' | 'landscape' | 'auto';
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  className?: string;
  sizes?: string;
  priority?: boolean;
}

export const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  src,
  alt,
  aspectRatio = 'auto',
  objectFit = 'cover',
}) => {
  const aspectRatioClasses = {
    square: 'aspect-square',
    video: 'aspect-video',
    portrait: 'aspect-[3/4]',
    landscape: 'aspect-[4/3]',
    auto: '',
  };

  const objectFitClasses = {
    contain: 'object-contain',
    cover: 'object-cover',
    fill: 'object-fill',
    none: 'object-none',
    'scale-down': 'object-scale-down',
  };

  return (
    <img
      src={src}
      alt={alt}
      className={`w-full ${aspectRatioClasses[aspectRatio]} ${objectFitClasses[objectFit]} rounded-lg`}
    />
  );
};

// Responsive Modal/Drawer Component
interface ResponsiveModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  variant?: 'modal' | 'drawer';
}

export const ResponsiveModal: React.FC<ResponsiveModalProps> = ({
  children,
  isOpen,
  onClose,
  title,
  variant,
}) => {
  const breakpoint = useBreakpoint();
  const useDrawer = variant === 'drawer' || breakpoint === 'xs' || breakpoint === 'sm';

  if (!isOpen) return null;

  const modalClasses = cn(
    'fixed inset-0 z-50 overflow-hidden',
    'flex items-center justify-center',
    'bg-black/50 dark:bg-black/75'
  );

  const drawerClasses = cn(
    'fixed inset-0 z-50 overflow-hidden',
    'bg-black/50 dark:bg-black/75'
  );

  const contentClasses = useDrawer
    ? cn(
        'fixed inset-y-0 right-0 w-full max-w-md',
        'bg-white dark:bg-gray-900',
        'transform transition-transform duration-300',
        'flex flex-col'
      )
    : cn(
        'relative bg-white dark:bg-gray-900 rounded-xl p-6',
        'w-full max-w-lg max-h-[80vh] overflow-y-auto',
        'transform transition-all duration-300'
      );

  return (
    <div className={useDrawer ? drawerClasses : modalClasses}>
      <div className="absolute inset-0" onClick={onClose} />
      
      <div className={contentClasses}>
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            ✕
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4">
          {children}
        </div>
      </div>
    </div>
  );
};
