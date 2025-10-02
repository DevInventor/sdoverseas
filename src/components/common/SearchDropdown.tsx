import React, { useState, useEffect, useRef } from 'react';
import { useSearch, SearchResult } from '../../hooks/useSearch';
import { Icon } from './Icon';
import { getProducts } from '../../config';

interface SearchDropdownProps {
  query: string;
  isVisible: boolean;
  onSelect: (result: SearchResult) => void;
  onClose: () => void;
  className?: string;
}

export const SearchDropdown: React.FC<SearchDropdownProps> = ({
  query,
  isVisible,
  onSelect,
  onClose,
  className = ''
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { search } = useSearch();
  
  const results = query.length >= 2 ? search(query) : [];

  // Reset selected index when query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isVisible || results.length === 0) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex(prev => (prev + 1) % results.length);
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex(prev => (prev - 1 + results.length) % results.length);
          break;
        case 'Enter':
          e.preventDefault();
          if (results[selectedIndex]) {
            onSelect(results[selectedIndex]);
          }
          break;
        case 'Escape':
          e.preventDefault();
          onClose();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isVisible, results, selectedIndex, onSelect, onClose]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isVisible) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isVisible, onClose]);

  if (!isVisible || query.length < 2) {
    return null;
  }

  return (
    <div
      ref={dropdownRef}
      className={`absolute top-full left-0 right-0 mt-2 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border border-gray-200/50 dark:border-gray-700/50 rounded-xl shadow-2xl z-50 max-h-96 overflow-y-auto w-full min-w-80 ${className}`}
    >
      {results.length > 0 ? (
        <div className="py-2">
          {results.map((result, index) => (
            <div
              key={`${result.type}-${result.id}`}
              className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-all duration-200 rounded-lg mx-2 ${
                index === selectedIndex
                  ? 'bg-primary/10 dark:bg-primary/20 border border-primary/20 dark:border-primary/30 shadow-sm'
                  : 'hover:bg-gray-50/80 dark:hover:bg-gray-700/80 hover:shadow-sm'
              }`}
              onClick={() => onSelect(result)}
            >
              {/* Product/Service Image */}
              <div className="flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 shadow-sm">
                {result.type === 'product' ? (
                  <img
                    src={getProductImage(result.id)}
                    alt={result.name}
                    className="w-full h-full object-cover transition-transform duration-200 hover:scale-105"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Icon 
                      name={getServiceIcon(result.id)} 
                      size="md" 
                      color="primary" 
                    />
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-base font-medium text-gray-900 dark:text-white truncate">
                    {result.name}
                  </h4>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full border ${
                    result.type === 'product'
                      ? 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800'
                      : 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800'
                  }`}>
                    {result.type === 'product' ? 'Product' : 'Service'}
                  </span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-1">
                  {result.description}
                </p>
                {result.category && (
                  <p className="text-xs text-gray-400 dark:text-gray-500 font-medium">
                    {result.category}
                  </p>
                )}
              </div>

              {/* Arrow Icon */}
              <div className="flex-shrink-0">
                <Icon 
                  name="arrow_forward" 
                  size="sm" 
                  color="gray" 
                  className="transition-transform duration-200 group-hover:translate-x-1" 
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="px-4 py-8 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
            <Icon name="search_off" size="lg" color="gray" />
          </div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
            No results found for "{query}"
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Try searching for spices, services, or product names
          </p>
        </div>
      )}

      {/* Footer with search tips */}
      {results.length > 0 && (
        <div className="border-t border-gray-200/50 dark:border-gray-700/50 px-4 py-3 bg-gray-50/50 dark:bg-gray-800/50 rounded-b-xl">
          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1">
              <Icon name="keyboard" size="xs" color="gray" />
              Use ↑↓ to navigate, Enter to select
            </span>
            <span className="font-medium">
              {results.length} result{results.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper function to get product image from products.json
const getProductImage = (productId: string): string => {
  const products = getProducts();
  const product = products.find(p => p.id === productId);
  
  if (product && product.image) {
    return product.image;
  }
  
  // Fallback image if product not found or no image
  return 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136';
};

// Helper function to get service icon
const getServiceIcon = (serviceId: string): string => {
  const serviceIcons: Record<string, string> = {
    'sourcing': 'public',
    'logistics': 'local_shipping',
    'quality': 'verified',
    'customs': 'assignment',
    'packaging': 'inventory_2',
    'support': 'support_agent',
  };
  
  return serviceIcons[serviceId] || 'help';
};
