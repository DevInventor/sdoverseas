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
      className={`group flex flex-col bg-white dark:bg-gray-800 rounded-3xl overflow-hidden border-2 border-gray-100 dark:border-gray-700 transition-all duration-500 hover:shadow-2xl hover:-translate-y-3 cursor-pointer hover:border-primary/30 dark:hover:border-primary/30 ${className}`}
      onClick={handleCardClick}
    >
      {/* Image Container with Enhanced Effects */}
      <div className="relative overflow-hidden">
        <div 
          className="w-full bg-center bg-no-repeat aspect-square bg-cover transition-transform duration-700 group-hover:scale-110"
          style={{ backgroundImage: `url("${product.image}")` }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-white/95 dark:bg-gray-800/95 text-primary border border-primary/30 backdrop-blur-sm shadow-sm">
            {product.category}
          </span>
        </div>
        
        {/* Hover Overlay with Action Button */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
          <div className="transform translate-y-6 group-hover:translate-y-0 transition-transform duration-300">
            <button className="inline-flex items-center gap-2 rounded-full bg-primary text-white px-8 py-3.5 text-sm font-bold shadow-xl hover:shadow-2xl transition-all duration-200 hover:scale-110 border-2 border-white/20">
              <Icon name="visibility" size="sm" color="white" />
              View Details
            </button>
          </div>
        </div>
        
        {/* Spice Icon Overlay */}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-10 h-10 bg-white/25 dark:bg-gray-800/25 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20">
            <span className="text-xl">🌶️</span>
          </div>
        </div>
      </div>
      
      {/* Content Container */}
      <div className="p-6 flex-grow flex flex-col">
        {/* Product Name */}
        <h3 className="text-xl font-bold text-gray-900 dark:text-white leading-tight mb-3 group-hover:text-primary transition-colors duration-200">
          {product.name}
        </h3>
        
        {/* Description */}
        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed flex-grow mb-6 line-clamp-3">
          {product.description}
        </p>
        
        {/* Learn More Button */}
        {showLearnMore && (
          <Button
            variant="outline"
            size="sm"
            className="w-full text-sm font-bold border-2 border-primary/40 text-primary hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 hover:scale-[1.03] group/btn rounded-xl py-3 shadow-sm hover:shadow-md"
            onClick={handleLearnMoreClick}
          >
            <span className="flex items-center justify-center gap-2">
              Learn More
              <Icon name="arrow_forward" size="sm" color="primary" className="group-hover/btn:translate-x-1 transition-transform duration-200" />
            </span>
          </Button>
        )}
      </div>
      
      {/* Bottom Accent Line */}
      <div className="h-1.5 bg-gradient-to-r from-primary via-orange-500 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
};
