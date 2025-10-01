import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './Button';
import { scrollToTop } from '../../hooks/useScrollToTop';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    description: string;
    image: string;
    category?: string;
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
      className={`group flex flex-col bg-background-light dark:bg-background-dark rounded-lg overflow-hidden border border-text-light/10 dark:border-text-dark/10 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer ${className}`}
      onClick={handleCardClick}
    >
      <div className="relative">
        <div 
          className="w-full bg-center bg-no-repeat aspect-square bg-cover"
          style={{ backgroundImage: `url("${product.image}")` }}
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <button className="rounded-full bg-primary text-white px-4 py-2 text-sm font-bold">
            View Details
          </button>
        </div>
      </div>
      <div className="p-4 flex-grow flex flex-col">
        {product.category && (
          <p className="text-xs font-medium text-primary mb-1 uppercase tracking-wide">
            {product.category}
          </p>
        )}
        <h3 className="text-text-light dark:text-text-dark text-base font-bold leading-tight mb-2">
          {product.name}
        </h3>
        <p className="text-subtle-light dark:text-subtle-dark text-sm font-normal flex-grow mb-3">
          {product.description}
        </p>
        {showLearnMore && (
          <Button
            variant="outline"
            size="sm"
            className="w-full text-xs font-medium border-primary/30 text-primary hover:bg-primary hover:text-white transition-all duration-200"
            onClick={handleLearnMoreClick}
          >
            Learn More
          </Button>
        )}
      </div>
    </div>
  );
};
