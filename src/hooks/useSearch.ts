import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProducts, getServices, getSearchConfig } from '../config';

export interface SearchResult {
  type: 'product' | 'service';
  id: string;
  name: string;
  description: string;
  category?: string;
  href: string;
  relevanceScore: number;
}

export interface SearchConfig {
  minQueryLength: number;
  maxResults: number;
  fuzzyThreshold: number;
  exactMatchBonus: number;
  categoryMatchBonus: number;
}

// Get default config from search.json
const defaultSearchConfig = getSearchConfig().searchConfig;

/**
 * Calculate similarity between two strings using Levenshtein distance
 */
const calculateSimilarity = (str1: string, str2: string): number => {
  const longer = str1.length > str2.length ? str1 : str2;
  const shorter = str1.length > str2.length ? str2 : str1;
  
  if (longer.length === 0) return 1.0;
  
  const distance = levenshteinDistance(longer, shorter);
  return (longer.length - distance) / longer.length;
};

/**
 * Calculate Levenshtein distance between two strings
 */
const levenshteinDistance = (str1: string, str2: string): number => {
  const matrix = Array(str2.length + 1).fill(null).map(() => Array(str1.length + 1).fill(null));
  
  for (let i = 0; i <= str1.length; i++) matrix[0][i] = i;
  for (let j = 0; j <= str2.length; j++) matrix[j][0] = j;
  
  for (let j = 1; j <= str2.length; j++) {
    for (let i = 1; i <= str1.length; i++) {
      const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
      matrix[j][i] = Math.min(
        matrix[j][i - 1] + 1,
        matrix[j - 1][i] + 1,
        matrix[j - 1][i - 1] + indicator
      );
    }
  }
  
  return matrix[str2.length][str1.length];
};

/**
 * Normalize search query for better matching
 */
const normalizeQuery = (query: string): string => {
  return query
    .toLowerCase()
    .trim()
    .replace(/[^\w\s]/g, '') // Remove special characters
    .replace(/\s+/g, ' '); // Normalize whitespace
};

/**
 * Check if query matches any word in the text
 */
const hasWordMatch = (query: string, text: string): boolean => {
  const queryWords = normalizeQuery(query).split(' ');
  const textWords = normalizeQuery(text).split(' ');
  
  return queryWords.some(queryWord => 
    textWords.some(textWord => 
      textWord.includes(queryWord) || queryWord.includes(textWord)
    )
  );
};

/**
 * Check if query contains any part of the text (partial matching)
 */
const hasPartialMatch = (query: string, text: string): boolean => {
  const normalizedQuery = normalizeQuery(query);
  const normalizedText = normalizeQuery(text);
  
  // Check if query is contained in text or vice versa
  return normalizedText.includes(normalizedQuery) || normalizedQuery.includes(normalizedText);
};

/**
 * Check if query matches any term in alias terms (partial matching)
 */
const hasAliasPartialMatch = (query: string, aliasTerms: string[]): boolean => {
  const normalizedQuery = normalizeQuery(query);
  
  return aliasTerms.some(term => {
    const normalizedTerm = normalizeQuery(term);
    return normalizedTerm.includes(normalizedQuery) || normalizedQuery.includes(normalizedTerm);
  });
};

/**
 * Custom hook for search functionality
 */
export const useSearch = (config: Partial<SearchConfig> = {}) => {
  const navigate = useNavigate();
  const [isSearching, setIsSearching] = useState(false);
  const searchConfig = { ...defaultSearchConfig, ...config };
  const searchAliases = getSearchConfig().searchAliases;
  const quickRedirects = getSearchConfig().quickRedirects;

  /**
   * Search products and services
   */
  const search = useCallback((query: string): SearchResult[] => {
    if (query.length < searchConfig.minQueryLength) {
      return [];
    }

    const normalizedQuery = normalizeQuery(query);
    const results: SearchResult[] = [];

    // Check for quick redirects first
    if (quickRedirects[normalizedQuery]) {
      return [{
        type: 'service',
        id: 'redirect',
        name: `Go to ${normalizedQuery}`,
        description: `Redirect to ${normalizedQuery} page`,
        href: quickRedirects[normalizedQuery],
        relevanceScore: 1.0,
      }];
    }

    // Check for aliases and expand search terms
    const searchTerms = [normalizedQuery];
    
    // Check if the query matches any alias key
    if (searchAliases[normalizedQuery]) {
      const alias = searchAliases[normalizedQuery];
      if (typeof alias === 'object' && 'terms' in alias) {
        searchTerms.push(...alias.terms.map((term: string) => normalizeQuery(term)));
      } else if (Array.isArray(alias)) {
        // Backward compatibility for old format
        searchTerms.push(...alias.map((term: string) => normalizeQuery(term)));
      }
    }
    
    // Also check if the query appears in any alias terms (exact and partial match)
    Object.entries(searchAliases).forEach(([key, alias]) => {
      if (typeof alias === 'object' && 'terms' in alias) {
        // Exact match
        if (alias.terms.some(term => normalizeQuery(term) === normalizedQuery)) {
          searchTerms.push(normalizeQuery(key));
          searchTerms.push(...alias.terms.map((term: string) => normalizeQuery(term)));
        }
        // Partial match
        else if (hasAliasPartialMatch(normalizedQuery, alias.terms)) {
          searchTerms.push(normalizeQuery(key));
          searchTerms.push(...alias.terms.map((term: string) => normalizeQuery(term)));
        }
      } else if (Array.isArray(alias)) {
        // Exact match
        if (alias.some(term => normalizeQuery(term) === normalizedQuery)) {
          searchTerms.push(normalizeQuery(key));
          searchTerms.push(...alias.map((term: string) => normalizeQuery(term)));
        }
        // Partial match
        else if (hasAliasPartialMatch(normalizedQuery, alias)) {
          searchTerms.push(normalizeQuery(key));
          searchTerms.push(...alias.map((term: string) => normalizeQuery(term)));
        }
      }
    });
    
    // Remove duplicates
    const uniqueSearchTerms = [...new Set(searchTerms)];

    // Search products
    const products = getProducts();
    products.forEach(product => {
      let relevanceScore = 0;
      let hasAnyMatch = false;

      // Check against all search terms (including aliases)
      for (const searchTerm of uniqueSearchTerms) {
        // Exact name match (highest priority)
        if (normalizeQuery(product.name) === searchTerm) {
          relevanceScore += 10.0; // Very high score for exact name match
          hasAnyMatch = true;
        }

        // Exact alias match for this specific product
        const aliasConfig = searchAliases[searchTerm];
        if (typeof aliasConfig === 'object' && 'productId' in aliasConfig && aliasConfig.productId === product.id) {
          relevanceScore += 8.0; // High score for exact alias match
          hasAnyMatch = true;
        }

        // Name similarity (fuzzy match)
        const nameSimilarity = calculateSimilarity(searchTerm, normalizeQuery(product.name));
        if (nameSimilarity >= searchConfig.fuzzyThreshold) {
          relevanceScore += nameSimilarity * 3.0; // Boost fuzzy matches
          hasAnyMatch = true;
        }

        // Word match in name
        if (hasWordMatch(searchTerm, product.name)) {
          relevanceScore += 2.0;
          hasAnyMatch = true;
        }

        // Partial match in name (lower score for partial matches)
        if (hasPartialMatch(searchTerm, product.name)) {
          relevanceScore += 1.0;
          hasAnyMatch = true;
        }

        // Category match
        if (hasWordMatch(searchTerm, product.category)) {
          relevanceScore += 0.5;
          hasAnyMatch = true;
        }

        // Partial match in category
        if (hasPartialMatch(searchTerm, product.category)) {
          relevanceScore += 0.3;
          hasAnyMatch = true;
        }

        // Description match (lowest priority)
        if (hasWordMatch(searchTerm, product.description)) {
          relevanceScore += 0.2;
          hasAnyMatch = true;
        }

        // Partial match in description
        if (hasPartialMatch(searchTerm, product.description)) {
          relevanceScore += 0.1;
          hasAnyMatch = true;
        }
      }

      // Only include products that have at least one match
      if (hasAnyMatch && relevanceScore > 0) {
        results.push({
          type: 'product',
          id: product.id,
          name: product.name,
          description: product.description,
          category: product.category,
          href: `/products/${product.id}`,
          relevanceScore,
        });
      }
    });

    // Search services
    const services = getServices();
    services.forEach(service => {
      let relevanceScore = 0;
      let hasAnyMatch = false;

      // Check against all search terms (including aliases)
      for (const searchTerm of uniqueSearchTerms) {
        // Exact name match (highest priority)
        if (normalizeQuery(service.title) === searchTerm) {
          relevanceScore += 10.0; // Very high score for exact name match
          hasAnyMatch = true;
        }

        // Exact alias match for this specific service
        const aliasConfig = searchAliases[searchTerm];
        if (typeof aliasConfig === 'object' && 'serviceId' in aliasConfig && aliasConfig.serviceId === service.id) {
          relevanceScore += 8.0; // High score for exact alias match
          hasAnyMatch = true;
        }

        // Name similarity (fuzzy match)
        const nameSimilarity = calculateSimilarity(searchTerm, normalizeQuery(service.title));
        if (nameSimilarity >= searchConfig.fuzzyThreshold) {
          relevanceScore += nameSimilarity * 3.0; // Boost fuzzy matches
          hasAnyMatch = true;
        }

        // Word match in title
        if (hasWordMatch(searchTerm, service.title)) {
          relevanceScore += 2.0;
          hasAnyMatch = true;
        }

        // Partial match in title
        if (hasPartialMatch(searchTerm, service.title)) {
          relevanceScore += 1.0;
          hasAnyMatch = true;
        }

        // Description match
        if (hasWordMatch(searchTerm, service.description)) {
          relevanceScore += 0.3;
          hasAnyMatch = true;
        }

        // Partial match in description
        if (hasPartialMatch(searchTerm, service.description)) {
          relevanceScore += 0.15;
          hasAnyMatch = true;
        }
      }

      // Only include services that have at least one match
      if (hasAnyMatch && relevanceScore > 0) {
        results.push({
          type: 'service',
          id: service.id,
          name: service.title,
          description: service.description,
          href: '/services',
          relevanceScore,
        });
      }
    });

    // Sort by relevance score and limit results
    return results
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, searchConfig.maxResults);
  }, [searchConfig]);

  /**
   * Handle search with navigation
   */
  const handleSearch = useCallback(async (query: string) => {
    if (query.length < searchConfig.minQueryLength) {
      return;
    }

    setIsSearching(true);
    
    try {
      const results = search(query);
      
      if (results.length > 0) {
        const bestMatch = results[0];
        
        // Navigate to the best match
        navigate(bestMatch.href);
      } else {
        // No results found - could show a "no results" message
        console.log('No search results found for:', query);
      }
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsSearching(false);
    }
  }, [search, navigate, searchConfig.minQueryLength]);

  /**
   * Get search suggestions (for autocomplete)
   */
  const getSuggestions = useCallback((query: string): string[] => {
    if (query.length < searchConfig.minQueryLength) {
      return [];
    }

    const results = search(query);
    return results.map(result => result.name);
  }, [search, searchConfig.minQueryLength]);

  return {
    search,
    handleSearch,
    getSuggestions,
    isSearching,
  };
};
