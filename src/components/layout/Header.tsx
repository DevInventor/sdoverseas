import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NAVIGATION_ITEMS, COMPANY_INFO } from '../../constants';
import { ThemeToggle } from '../common/ThemeToggle';
import { LanguageToggle } from '../common/LanguageToggle';
import { Button, Icon, SearchDropdown } from '../common';
import { Menu, X } from 'lucide-react';
import { useSearch, SearchResult } from '../../hooks/useSearch';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({ className = '' }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { handleSearch, isSearching } = useSearch();

  const isActiveRoute = (href: string) => {
    return location.pathname === href;
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      handleSearch(searchQuery.trim());
      setSearchQuery('');
      setShowSearchDropdown(false);
    }
  };

  const handleSearchKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearchSubmit(e);
    }
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    setShowSearchDropdown(value.length >= 2);
  };

  const handleSearchResultSelect = (result: SearchResult) => {
    // Navigate directly to the result's href instead of searching again
    navigate(result.href);
    setSearchQuery('');
    setShowSearchDropdown(false);
  };

  const handleSearchDropdownClose = () => {
    setShowSearchDropdown(false);
  };

  const handleSearchFocus = () => {
    setIsSearchFocused(true);
    if (searchQuery.length >= 2) {
      setShowSearchDropdown(true);
    }
  };

  const handleSearchBlur = () => {
    // Delay blur to allow dropdown clicks
    setTimeout(() => {
      setIsSearchFocused(false);
      setShowSearchDropdown(false);
    }, 200);
  };

  return (
    <header className={`sticky top-0 z-50 bg-header-light/95 dark:bg-header-dark/95 backdrop-blur-md border-b border-border-light/20 dark:border-border-dark/20 ${className}`}>
      <div className="container-fluid">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="text-primary">
              <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 6L38 18H10L6 6Z" fill="#F97316" />
                <path d="M12 20V42H36V20H12Z" fill="#F97316" />
                <path d="M18 26H22V36H18V26Z" fill="#FDEBD0" />
                <path d="M26 26H30V36H26V26Z" fill="#FDEBD0" />
              </svg>
            </div>
            <h2 className="text-xl font-bold font-display text-gray-900 dark:text-white">
              {COMPANY_INFO.name}
            </h2>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {NAVIGATION_ITEMS.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActiveRoute(item.href)
                    ? 'text-primary font-semibold'
                    : 'text-gray-600 dark:text-gray-300'
                }`}
              >
                {item.name}
              </Link>
            ))}
            
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
              {/* Search Bar */}
              <div className={`relative hidden sm:block transition-all duration-300 ${
                isSearchFocused ? 'w-80 lg:w-96' : 'w-64'
              }`}>
                <form onSubmit={handleSearchSubmit} className="relative">
                  <input 
                    className={`w-full rounded-full border-primary/30 bg-primary/10 dark:bg-primary/20 focus:ring-primary focus:border-primary pl-10 pr-4 py-2 text-sm text-slate-800 dark:text-slate-200 placeholder:text-slate-500 dark:placeholder:text-slate-400 transition-all duration-300 ${
                      isSearchFocused ? 'shadow-lg' : ''
                    }`}
                    placeholder="Search spices, services..." 
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                    onKeyPress={handleSearchKeyPress}
                    onFocus={handleSearchFocus}
                    onBlur={handleSearchBlur}
                    disabled={isSearching}
                    autoComplete="off"
                  />
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500 dark:text-slate-400">
                    <Icon name="search" size="sm" />
                  </div>
                  {isSearching && (
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                    </div>
                  )}
                </form>
                
                {/* Search Dropdown */}
                <SearchDropdown
                  query={searchQuery}
                  isVisible={showSearchDropdown}
                  onSelect={handleSearchResultSelect}
                  onClose={handleSearchDropdownClose}
                />
              </div>
            
                {/* Language Toggle */}
                <LanguageToggle className="hidden sm:flex" />
                
                {/* Theme Toggle */}
                <ThemeToggle className="hidden sm:flex" />
                
                {/* Get Quote Button */}
            <Button 
              variant="primary" 
              size="sm"
              href="/contact"
              className="hidden sm:flex"
            >
              Get a Quote
            </Button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-col space-y-4">
              {NAVIGATION_ITEMS.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-sm font-medium px-3 py-2 rounded-lg transition-colors ${
                    isActiveRoute(item.href)
                      ? 'text-primary bg-primary/10 font-semibold'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              {/* Additional Mobile Links */}
              <div className="px-3 py-2 border-t border-gray-200 dark:border-gray-700">
                <Link
                  to="/demo"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-sm text-gray-600 dark:text-gray-300 hover:text-primary"
                >
                  Component Demo
                </Link>
              </div>
              
              <div className="flex items-center justify-between px-3 py-2">
                <Link
                  to="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="inline-flex items-center justify-center px-4 py-2 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Get a Quote
                </Link>
                <div className="flex items-center gap-2">
                  <LanguageToggle />
                  <ThemeToggle />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
