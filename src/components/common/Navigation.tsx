import React, { useState } from 'react';
import { cn } from '../../utils/cn';
import { Icon } from './Icon';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

// Breadcrumb Component
interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: string;
  current?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: string | React.ReactNode;
  className?: string;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  separator = '/',
  className,
}) => {
  return (
    <nav aria-label="Breadcrumb" className={cn('flex', className)}>
      <ol className="flex items-center space-x-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && (
              <span className="mx-2 text-gray-400 dark:text-gray-600">
                {separator}
              </span>
            )}
            <a
              href={item.href || '#'}
              className={cn(
                'flex items-center gap-1 text-sm hover:text-primary transition-colors',
                item.current && 'text-primary font-medium'
              )}
            >
              {item.icon && <Icon name={item.icon} size="sm" />}
              <span>{item.label}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
};

// Pagination Component
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
  showNumbers?: boolean;
  maxVisible?: number;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className,
  showNumbers = true,
  maxVisible = 5,
}) => {
  const generatePageNumbers = () => {
    const pages = [];
    const start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    const end = Math.min(totalPages, start + maxVisible - 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  return (
    <nav className={cn('flex items-center justify-center', className)} aria-label="Pagination">
      <div className="flex items-center space-x-1">
        {/* Previous Button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={!isFirstPage}
          className={cn(
            'px-3 py-2 rounded-md text-sm font-medium transition-colors',
            isFirstPage && 'text-gray-400 dark:text-gray-600 cursor-not-allowed',
            !isFirstPage && 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
          )}
        >
          <Icon name="chevron_left" size="sm" />
        </button>

        {/* Page Numbers */}
        {showNumbers && (
          <>
            {generatePageNumbers().map((page) => (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={cn(
                  'px-3 py-2 rounded-md text-sm font-medium transition-colors',
                  page === currentPage
                    ? 'bg-primary text-white'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                )}
              >
                {page}
              </button>
            ))}
          </>
        )}

        {/* Next Button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={isLastPage}
          className={cn(
            'px-3 py-2 rounded-md text-sm font-medium transition-colors',
            isLastPage && 'text-gray-400 dark:text-gray-600 cursor-not-allowed',
            !isLastPage && 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
          )}
        >
          <Icon name="chevron_right" size="sm" />
        </button>
      </div>
    </nav>
  );
};

// Tabs Component
interface TabItem {
  id: string;
  label: string;
  icon?: string;
  badge?: number;
  disabled?: boolean;
}

interface TabsProps {
  items: TabItem[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  variant?: 'default' | 'pills' | 'underline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  items,
  activeTab,
  onTabChange,
  variant = 'default',
  size = 'md',
  className,
}) => {
  const tabVariants = {
    default: 'border-b border-gray-200 dark:border-gray-700',
    pills: 'bg-gray-100 dark:bg-gray-800 rounded-lg p-1',
    underline: 'border-b border-gray-200 dark:border-gray-700',
  };

  const tabSizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-sm',
    lg: 'px-6 py-4 text-base',
  };

  const getTabClasses = (tab: TabItem) => {
    const isActive = tab.id === activeTab;
    
    if (variant === 'pills') {
      return cn(
        tabSizes[size],
        'flex items-center gap-2 font-medium rounded-md transition-all',
        isActive
          ? 'bg-white dark:bg-gray-900 text-primary shadow-sm'
          : 'text-gray-600 dark:text-gray-400 hover:text-primary hover:bg-white/50 dark:hover:bg-gray-900/50',
        tab.disabled && 'opacity-50 cursor-not-allowed'
      );
    }

    return cn(
      tabSizes[size],
      'flex items-center gap-2 font-medium border-b-2 transition-colors',
      isActive
        ? 'border-primary text-primary'
        : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-primary hover:border-gray-300 dark:hover:border-gray-600',
      tab.disabled && 'opacity-50 cursor-not-allowed'
    );
  };

  return (
    <div className={cn('w-full', className)}>
      <div className={cn(tabVariants[variant])}>
        <nav className="flex space-x-0" aria-label="Tabs">
          {items.map((tab) => (
            <button
              key={tab.id}
              onClick={() => !tab.disabled && onTabChange(tab.id)}
              disabled={tab.disabled}
              className={getTabClasses(tab)}
            >
              {tab.icon && <Icon name={tab.icon} size="sm" />}
              <span>{tab.label}</span>
              {tab.badge && tab.badge > 0 && (
                <span className="ml-2 px-2 py-1 text-xs bg-primary text-white rounded-full">
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

// Sidebar Navigation Component
interface SidebarItem {
  id: string;
  label: string;
  icon?: string;
  href?: string;
  badge?: number;
  children?: SidebarItem[];
  disabled?: boolean;
}

interface SidebarProps {
  items: SidebarItem[];
  activeItem?: string;
  onItemClick?: (item: SidebarItem) => void;
  variant?: 'default' | 'minimal' | 'compact';
  className?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  items,
  activeItem,
  onItemClick,
  variant = 'default',
  className,
}) => {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const variants = {
    default: 'w-64 p-4',
    minimal: 'w-16 p-2',
    compact: 'w-48 p-3',
  };

  const renderItem = (item: SidebarItem, level = 0) => {
    const isActive = item.id === activeItem;
    const isExpanded = expandedItems.includes(item.id);
    
    const itemClasses = cn(
      'flex items-center gap-3 px-3 py-2 rounded-lg transition-colors group',
      variant === 'minimal' && 'justify-center',
      isActive
        ? 'bg-primary text-white'
        : 'text-gray-600 dark:text-gray-400 hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-800',
      item.disabled && 'opacity-50 cursor-not-allowed',
      level > 0 && 'ml-6 text-sm'
    );

    return (
      <div key={item.id} className="space-y-1">
        <a
          href={item.href || '#'}
          onClick={(e) => {
            if (item.children) {
              e.preventDefault();
              toggleExpanded(item.id);
            }
            onItemClick?.(item);
          }}
          className={itemClasses}
        >
          {item.icon && (
            <Icon 
              name={item.icon} 
              size={variant === 'minimal' ? 'md' : 'sm'} 
              color={isActive ? 'inherit' : 'secondary'}
            />
          )}
          {variant !== 'minimal' && (
            <>
              <span className="flex-1">{item.label}</span>
              {item.badge && item.badge > 0 && (
                <span className="px-2 py-1 text-xs bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full">
                  {item.badge}
                </span>
              )}
              {item.children && (
                <Icon 
                  name={isExpanded ? 'expand_less' : 'expand_more'} 
                  size="sm"
                />
              )}
            </>
          )}
        </a>

        {item.children && isExpanded && (
          <div className="mt-1 space-y-1">
            {item.children.map(child => renderItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={cn('bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700', variants[variant], className)}>
      <nav className="space-y-2">
        {items.map(item => renderItem(item))}
      </nav>
    </div>
  );
};

// Floating Action Button Component
interface FABProps {
  icon: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'extended';
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  className?: string;
}

export const FloatingActionButton: React.FC<FABProps> = ({
  icon,
  onClick,
  variant = 'primary',
  size = 'md',
  label,
  position = 'bottom-right',
  className,
}) => {
  const sizes = {
    sm: 'w-12 h-12',
    md: 'w-14 h-14',
    lg: 'w-16 h-16',
  };

  const variants = {
    primary: 'bg-primary text-white hover:bg-primary/90 shadow-lg',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700 shadow-lg',
    extended: 'bg-primary text-white hover:bg-primary/90 px-6 shadow-lg',
  };

  const positions = {
    'bottom-right': 'fixed bottom-6 right-6',
    'bottom-left': 'fixed bottom-6 left-6',
    'top-right': 'fixed top-6 right-6',
    'top-left': 'fixed top-6 left-6',
  };

  const classes = cn(
    'relative z-50 rounded-full transition-all duration-200 hover:scale-105 active:scale-95',
    'flex items-center justify-center font-medium',
    variants[variant],
    sizes[size],
    positions[position],
    className
  );

  return (
    <button
      onClick={onClick}
      className={classes}
      aria-label={label || 'Action button'}
    >
      <Icon name={icon} size={size} />
      {variant === 'extended' && (
        <span className="ml-2 text-sm font-medium">{label}</span>
      )}
    </button>
  );
};
