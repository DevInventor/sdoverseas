import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './Button';
import { scrollToTop } from '../../hooks/useScrollToTop';
import { Icon } from './Icon';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    description: string;
    image: string;
    category: string;
    origin?: string;
    specifications?: Record<string, string | undefined>;
  };
  showLearnMore?: boolean;
  className?: string;
  onClick?: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  showLearnMore = true,
  className = '',
  onClick
}) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(`/products/${product.id}`);
      scrollToTop();
    }
  };

  const handleLearnMoreClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/products/${product.id}`);
    scrollToTop();
  };

  return (
    <div
      className={`group flex flex-col bg-surface-light dark:bg-surface-dark rounded-3xl overflow-hidden border-2 border-border-light dark:border-border-dark transition-all duration-500 hover:shadow-2xl dark:hover:shadow-2xl hover:-translate-y-3 cursor-pointer hover:border-primary/30 dark:hover:border-primary/30 hover:bg-accent-light/50 dark:hover:bg-accent-dark/50 ${className}`}
      onClick={handleCardClick}
    >
      {/* Image Container with Enhanced Effects */}
      <div className="relative overflow-hidden">
        <div 
          className="w-full bg-center bg-no-repeat aspect-square bg-cover transition-transform duration-700 group-hover:scale-110"
          style={{ backgroundImage: `url("${product.image}")` }}
        />
        
        {/* Gradient Overlay - Enhanced for dark mode */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent dark:from-black/90 dark:via-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Category Badge - Enhanced dark mode styling */}
        <div className="absolute top-4 left-4">
          <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-surface-light/95 dark:bg-surface-dark/95 text-primary dark:text-primary-300 border border-primary/30 dark:border-primary-400/40 backdrop-blur-sm shadow-sm dark:shadow-gray-900/50">
            {product.category}
          </span>
        </div>
        
        {/* Hover Overlay with Action Button - Enhanced for dark mode */}
        <div className="absolute inset-0 bg-black/60 dark:bg-black/70 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
          <div className="transform translate-y-6 group-hover:translate-y-0 transition-transform duration-300">
            <button className="inline-flex items-center gap-2 rounded-full bg-primary dark:bg-primary-500 text-white px-8 py-3.5 text-sm font-bold shadow-xl dark:shadow-primary-500/25 hover:shadow-2xl dark:hover:shadow-primary-500/40 transition-all duration-200 hover:scale-110 border-2 border-white/20 dark:border-primary-300/30">
              <Icon name="visibility" size="sm" color="white" />
              View Details
            </button>
          </div>
        </div>
        
        {/* Spice Icon Overlay - Enhanced for dark mode */}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-10 h-10 bg-white/30 dark:bg-surface-dark/50 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30 dark:border-gray-500/50 shadow-sm dark:shadow-gray-900/50">
            <span className="text-xl filter drop-shadow-sm">🌶️</span>
          </div>
        </div>
      </div>
      
      {/* Content Container - Enhanced dark mode */}
      <div className="p-6 flex-grow flex flex-col bg-gradient-to-b from-transparent to-accent-light/30 dark:to-accent-dark/20">
        {/* Product Name - Enhanced dark mode */}
        <h3 className="text-xl font-bold text-text-light dark:text-text-dark leading-tight mb-3 group-hover:text-primary dark:group-hover:text-primary-300 transition-colors duration-200">
          {product.name}
        </h3>
        
        {/* Description - Enhanced dark mode */}
        <p className="text-subtle-light dark:text-subtle-dark text-sm leading-relaxed flex-grow mb-6 line-clamp-3">
          {product.description}
        </p>
        
        {/* Learn More Button - Enhanced dark mode */}
        {showLearnMore && (
          <Button
            variant="outline"
            size="sm"
            className="w-full text-sm font-bold border-2 border-primary/50 dark:border-primary-400/60 text-primary dark:text-primary-300 hover:bg-primary dark:hover:bg-primary-500 hover:text-white hover:border-primary dark:hover:border-primary-500 transition-all duration-300 hover:scale-[1.03] group/btn rounded-xl py-3 shadow-sm dark:shadow-gray-900/20 hover:shadow-md dark:hover:shadow-primary-500/20"
            onClick={handleLearnMoreClick}
          >
            <span className="flex items-center justify-center gap-2">
              Learn More
              <Icon name="arrow_forward" size="sm" color="primary" className="group-hover/btn:translate-x-1 transition-transform duration-200" />
            </span>
          </Button>
        )}
      </div>
      
      {/* Bottom Accent Line - Enhanced for dark mode */}
      <div className="h-1.5 bg-gradient-to-r from-primary via-primary-500 to-primary dark:from-primary-400 dark:via-primary-500 dark:to-primary-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
};
