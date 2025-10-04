import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { PageContainer } from '../components/layout/PageContainer';
import { 
  Card, 
  CardContent, 
  Button, 
  Icon,
  ResponsiveGrid,
  ProductCard
} from '../components/common';
import { useLanguage } from '../contexts/LanguageContext';
import { scrollToTop } from '../hooks/useScrollToTop';

export const Products: React.FC = () => {
  const { t } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSubCategory, setSelectedSubCategory] = useState('all');
  const [displayedProducts, setDisplayedProducts] = useState(8); // Show 8 products initially
  const productsPerLoad = 8; // Load 8 more products each time

  // Get language-specific products with error handling
  const SPICE_PRODUCTS = Array.isArray(t('products-data.products')) 
    ? t('products-data.products') as any[]
    : [];

  // Get product categories from config
  const productCategories = Array.isArray(t('contact.productCategories.categories')) 
    ? t('contact.productCategories.categories') as any[]
    : [];

  // Sub-categories configuration
  const subCategories: Record<string, Array<{id: string, label: string, keywords: string[]}>> = {
    'spices': [
      { id: 'whole-spices', label: 'Whole Spices', keywords: ['whole', 'seeds', 'whole spices'] },
      { id: 'ground-spices', label: 'Ground Spices', keywords: ['ground', 'powder', 'ground spices'] },
      { id: 'spice-blends', label: 'Spice Blends', keywords: ['blend', 'mixture', 'spice blends'] }
    ],
    'super-foods': [
      { id: 'nuts-seeds', label: 'Nuts & Seeds', keywords: ['nuts', 'seeds', 'almonds', 'walnuts'] },
      { id: 'dried-fruits', label: 'Dried Fruits', keywords: ['dried', 'fruits', 'raisins', 'dates'] },
      { id: 'health-supplements', label: 'Health Supplements', keywords: ['supplement', 'health', 'nutritional'] }
    ],
    'pulses-lentils': [
      { id: 'lentils', label: 'Lentils', keywords: ['lentils', 'dal', 'masoor'] },
      { id: 'chickpeas', label: 'Chickpeas', keywords: ['chickpeas', 'chana', 'garbanzo'] },
      { id: 'beans', label: 'Beans', keywords: ['beans', 'rajma', 'kidney beans'] }
    ],
    'agro-products': [
      { id: 'flour', label: 'Flour', keywords: ['flour', 'atta', 'wheat flour'] },
      { id: 'grains', label: 'Grains', keywords: ['grains', 'rice', 'wheat', 'barley'] },
      { id: 'oilseeds', label: 'Oilseeds', keywords: ['oilseeds', 'mustard', 'sesame', 'sunflower'] }
    ]
  };

  // Handle URL parameter for category filtering
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    const subCategoryParam = searchParams.get('subcategory');
    
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
    if (subCategoryParam) {
      setSelectedSubCategory(subCategoryParam);
    }
  }, [searchParams]);

  // Filter products by category and sub-category
  const filteredProducts = SPICE_PRODUCTS.filter((product: any) => {
    // If no category selected, show all products
    if (selectedCategory === 'all') {
      return true;
    }

    // First filter by main category
    const categoryMapping: Record<string, string[]> = {
      'spices': ['whole spices', 'ground spices', 'spice blends'],
      'super-foods': ['super foods', 'health supplements'],
      'pulses-lentils': ['pulses', 'lentils', 'legumes'],
      'agro-products': ['flour', 'grains', 'agricultural products']
    };
    
    const mappedCategories = categoryMapping[selectedCategory] || [selectedCategory];
    const matchesMainCategory = mappedCategories.some(cat => 
      product.category.toLowerCase().includes(cat.toLowerCase())
    );

    if (!matchesMainCategory) {
      return false;
    }

    // If sub-category is selected, filter further
    if (selectedSubCategory !== 'all' && subCategories[selectedCategory]) {
      const subCategory = subCategories[selectedCategory].find(sub => sub.id === selectedSubCategory);
      if (subCategory) {
        return subCategory.keywords.some(keyword => 
          product.category.toLowerCase().includes(keyword.toLowerCase()) ||
          product.name.toLowerCase().includes(keyword.toLowerCase())
        );
      }
    }

    return true;
  });

  // Get products to display
  const displayedProductsList = filteredProducts.slice(0, displayedProducts);
  const hasMoreProducts = displayedProducts < filteredProducts.length;

  // Categories for tabs - using the new product range categories with specific icons
  const categories = [
    { id: 'all', label: 'All Products', icon: 'inventory_2' },
    ...productCategories.map((category: any) => {
      // Map category slugs to specific, meaningful icons that clearly represent each category
      const iconMapping: Record<string, string> = {
        'spices': 'restaurant_menu', // Mortar & pestle/cooking icon for spices
        'super-foods': 'eco', // Leaf/eco icon for healthy superfoods
        'pulses-lentils': 'agriculture', // Agriculture/plant icon for pulses/lentils
        'agro-products': 'grass' // Grass/crop icon for agricultural products
      };
      
      return {
        id: category.slug,
        label: category.name,
        icon: iconMapping[category.slug] || 'category'
      };
    })
  ];

  // Handle category change
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setSelectedSubCategory('all'); // Reset sub-category when main category changes
    setDisplayedProducts(8); // Reset to initial count when category changes
    
    // Update URL parameters
    const newSearchParams = new URLSearchParams(searchParams);
    if (category === 'all') {
      newSearchParams.delete('category');
      newSearchParams.delete('subcategory');
    } else {
      newSearchParams.set('category', category);
      newSearchParams.delete('subcategory'); // Reset sub-category in URL
    }
    setSearchParams(newSearchParams);
  };

  // Handle sub-category change
  const handleSubCategoryChange = (subCategory: string) => {
    setSelectedSubCategory(subCategory);
    setDisplayedProducts(8); // Reset to initial count when sub-category changes
    
    // Update URL parameters
    const newSearchParams = new URLSearchParams(searchParams);
    if (subCategory === 'all') {
      newSearchParams.delete('subcategory');
    } else {
      newSearchParams.set('subcategory', subCategory);
    }
    setSearchParams(newSearchParams);
  };

  // Handle load more products
  const handleLoadMore = () => {
    setDisplayedProducts(prev => Math.min(prev + productsPerLoad, filteredProducts.length));
  };


  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <PageContainer>
        {/* Header */}
        <section className="py-16 sm:py-24">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-text-light dark:text-text-dark mb-4">
              {t('products.hero.title')}
            </h1>
            <p className="max-w-3xl mx-auto text-subtle-light dark:text-subtle-dark">
              {t('products.hero.subtitle')}
            </p>
          </div>
        </section>

        {/* Product Categories */}
        <section className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-text-light dark:text-text-dark mb-2">
              Browse by Category
            </h2>
            <p className="text-subtle-light dark:text-subtle-dark">
              Select a category to explore our product range
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 max-w-6xl mx-auto">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`group relative p-6 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
                  selectedCategory === category.id
                    ? 'border-primary bg-primary text-white shadow-lg shadow-primary/25'
                    : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-text-light dark:text-text-dark hover:border-primary/50 hover:shadow-md'
                }`}
              >
                <div className="text-center">
                  <div className={`w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-white/20'
                      : 'bg-primary/10 group-hover:bg-primary/20'
                  }`}>
                    <Icon name={category.icon} size="lg" color={selectedCategory === category.id ? 'white' : 'primary'} />
                  </div>
                  <h3 className={`font-semibold text-sm transition-colors ${
                    selectedCategory === category.id
                      ? 'text-white'
                      : 'text-text-light dark:text-text-dark group-hover:text-primary'
                  }`}>
                    {category.label}
                  </h3>
                </div>
                
                {/* Active indicator */}
                {selectedCategory === category.id && (
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                    <Icon name="check" size="sm" color="white" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </section>

        {/* Sub-Categories */}
        {selectedCategory !== 'all' && subCategories[selectedCategory] && (
          <section className="mb-12">
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold text-text-light dark:text-text-dark mb-2">
                Refine by Type
              </h3>
              <p className="text-subtle-light dark:text-subtle-dark text-sm">
                Further filter products within {categories.find(c => c.id === selectedCategory)?.label}
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
              <button
                onClick={() => handleSubCategoryChange('all')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedSubCategory === 'all'
                    ? 'bg-secondary text-white shadow-md'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-secondary/10 hover:text-secondary border border-gray-200 dark:border-gray-600'
                }`}
              >
                All Types
              </button>
              {subCategories[selectedCategory].map((subCategory) => (
                <button
                  key={subCategory.id}
                  onClick={() => handleSubCategoryChange(subCategory.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105 ${
                    selectedSubCategory === subCategory.id
                      ? 'bg-secondary text-white shadow-md'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-secondary/10 hover:text-secondary border border-gray-200 dark:border-gray-600'
                  }`}
                >
                  {subCategory.label}
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Products Grid */}
        <section className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {displayedProductsList.map((product: any) => (
              <ProductCard
                key={product.id}
                product={product}
                showLearnMore={true}
              />
            ))}
          </div>

          {displayedProductsList.length === 0 && (
            <Card className="p-12 text-center">
              <CardContent>
                <Icon name="search_off" size="3xl" color="secondary" className="mb-4" />
                <h3 className="text-xl font-bold text-text-light dark:text-text-dark mb-2">
                  {t('products.noProductsFound')}
                </h3>
                <p className="text-subtle-light dark:text-subtle-dark mb-6">
                  {t('products.noProductsDescription')}
                </p>
                <Button 
                  variant="outline"
                  onClick={() => handleCategoryChange('all')}
                >
                  {t('products.resetFilters')}
                </Button>
              </CardContent>
            </Card>
          )}
        </section>

        {/* Load More Button */}
        {hasMoreProducts && (
          <div className="flex justify-center mt-16">
            <Button
              variant="primary"
              size="lg"
              onClick={handleLoadMore}
              className="flex items-center justify-center rounded-lg h-12 px-8 bg-primary text-white text-base font-bold tracking-wide hover:bg-primary/90 transition-colors"
            >
              {t('products.loadMore')}
            </Button>
          </div>
        )}

        {/* Product Features */}
        <section className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text-light dark:text-text-dark mb-4">
              {t('products.whyChoose.title')}
            </h2>
            <p className="text-subtle-light dark:text-subtle-dark max-w-2xl mx-auto">
              {t('products.whyChoose.subtitle')}
            </p>
          </div>

          <ResponsiveGrid 
            columns={{ xs: 1, md: 2, lg: 4 }}
            gap="md"
          >
            {[0, 1, 2, 3].map((index) => (
              <Card key={index} className={`text-center p-6 ${index % 2 === 0 ? 'bg-primary/5 dark:bg-primary/10' : 'bg-secondary/5 dark:bg-secondary/10'} hover:shadow-lg transition-shadow`}>
                <CardContent>
                  <div className={`w-16 h-16 ${t(`products.whyChoose.items.${index}.color`) === 'green' ? 'bg-green-100 dark:bg-green-900/20' : t(`products.whyChoose.items.${index}.color`) === 'blue' ? 'bg-blue-100 dark:bg-blue-900/20' : t(`products.whyChoose.items.${index}.color`) === 'purple' ? 'bg-purple-100 dark:bg-purple-900/20' : 'bg-orange-100 dark:bg-orange-900/20'} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <Icon name={t(`products.whyChoose.items.${index}.icon`)} size="xl" color={t(`products.whyChoose.items.${index}.color`)} />
                  </div>
                  <h3 className="text-lg font-bold text-text-light dark:text-text-dark mb-2">
                    {t(`products.whyChoose.items.${index}.title`)}
                  </h3>
                  <p className="text-subtle-light dark:text-subtle-dark text-sm">
                    {t(`products.whyChoose.items.${index}.description`)}
                  </p>
                </CardContent>
              </Card>
            ))}
          </ResponsiveGrid>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <Card className="text-center p-12 bg-primary/5 dark:bg-primary/10">
            <CardContent>
              <h2 className="text-3xl font-bold text-text-light dark:text-text-dark mb-4">
                {t('products.cta.title')}
              </h2>
              <p className="text-subtle-light dark:text-subtle-dark mb-8 max-w-2xl mx-auto">
                {t('products.cta.subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to={t('products.cta.primaryButton.href')} onClick={scrollToTop}>
                  <Button variant="primary" size="lg">
                    {t('products.cta.primaryButton.text')}
                  </Button>
                </Link>
                <Link to={t('products.cta.secondaryButton.href')} onClick={scrollToTop}>
                  <Button variant="outline" size="lg">
                    {t('products.cta.secondaryButton.text')}
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </section>
      </PageContainer>
    </div>
  );
};
