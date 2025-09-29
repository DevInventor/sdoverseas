import React, { useState, useEffect, useRef } from 'react';
import { useSearch, SearchResult } from '../../hooks/useSearch';
import { Icon } from './Icon';

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
      className={`absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto w-full min-w-80 ${className}`}
    >
      {results.length > 0 ? (
        <div className="py-2">
          {results.map((result, index) => (
            <div
              key={`${result.type}-${result.id}`}
              className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors ${
                index === selectedIndex
                  ? 'bg-primary/10 dark:bg-primary/20'
                  : 'hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
              onClick={() => onSelect(result)}
            >
              {/* Product/Service Image */}
              <div className="flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
                {result.type === 'product' ? (
                  <img
                    src={getProductImage(result.id)}
                    alt={result.name}
                    className="w-full h-full object-cover"
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
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    result.type === 'product'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'
                      : 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300'
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
                <Icon name="arrow_forward" size="sm" color="gray" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="px-4 py-6 text-center">
          <Icon name="search_off" size="lg" color="gray" className="mx-auto mb-2" />
          <p className="text-sm text-gray-500 dark:text-gray-400">
            No results found for "{query}"
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
            Try searching for spices, services, or product names
          </p>
        </div>
      )}

      {/* Footer with search tips */}
      {results.length > 0 && (
        <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-2">
          <div className="flex items-center justify-between text-xs text-gray-400 dark:text-gray-500">
            <span>Use ↑↓ to navigate, Enter to select</span>
            <span>{results.length} result{results.length !== 1 ? 's' : ''}</span>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper function to get product image
const getProductImage = (productId: string): string => {
  const productImages: Record<string, string> = {
    'turmeric': 'https://images.unsplash.com/photo-1615485500834-bc10199bc727?q=80&w=580&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'cumin': 'https://plus.unsplash.com/premium_photo-1723874683717-006f24c93975?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'chilli': 'https://images.unsplash.com/photo-1607672632458-9eb56696346b?q=80&w=1257&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'cardamom': 'https://images.unsplash.com/photo-1642255521852-7e7c742ac58f?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'cinnamon': 'https://images.unsplash.com/photo-1587411767714-d355c1f847ea?ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'garam-masala': 'https://images.unsplash.com/photo-1603122612817-2fe0e0631a93?ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'black-pepper': 'https://images.unsplash.com/photo-1649952052743-5e8f37c348c5',
    'coriander-powder': 'https://images.unsplash.com/photo-1608797179072-4268dd68eff2',
    'fenugreek-seeds': 'https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    'mustard-seeds': 'https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    'cloves': 'https://images.unsplash.com/photo-1609501676725-7186f3a0f0b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    'bay-leaves': 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    'star-anise': 'https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    'curry-powder': 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    'paprika': 'https://images.unsplash.com/photo-1560472355-536de3962603?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    'nutmeg': 'https://images.unsplash.com/photo-1609501676725-7186f3a0f0b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    'mace': 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
  };
  
  return productImages[productId] || 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80';
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
