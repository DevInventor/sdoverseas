import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageContainer } from '../components/layout/PageContainer';
import { 
  Card, 
  CardContent, 
  Button, 
  Icon,
  ResponsiveGrid
} from '../components/common';
import { SPICE_PRODUCTS } from '../constants';
import { scrollToTop } from '../hooks/useScrollToTop';
import { useLanguage } from '../contexts/LanguageContext';

export const Products: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [displayedProducts, setDisplayedProducts] = useState(8); // Show 8 products initially
  const productsPerLoad = 8; // Load 8 more products each time

  // Filter products by category
  const filteredProducts = selectedCategory === 'all' 
    ? SPICE_PRODUCTS 
    : SPICE_PRODUCTS.filter(product => 
        product.category.toLowerCase().includes(selectedCategory.toLowerCase())
      );

  // Get products to display
  const displayedProductsList = filteredProducts.slice(0, displayedProducts);
  const hasMoreProducts = displayedProducts < filteredProducts.length;

  // Categories for tabs
  const categories = [
    { id: 'all', label: t('products.categories.0.label'), icon: 'inventory_2' },
    { id: 'whole', label: t('products.categories.1.label'), icon: 'circle' },
    { id: 'ground', label: t('products.categories.2.label'), icon: 'spa' },
    { id: 'blends', label: t('products.categories.3.label'), icon: 'blender' },
  ];

  // Handle category change
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setDisplayedProducts(8); // Reset to initial count when category changes
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
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-primary text-white'
                    : 'bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark border border-text-light/10 dark:border-text-dark/20 hover:bg-primary/10 dark:hover:bg-primary/20'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </section>

        {/* Products Grid */}
        <section className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {displayedProductsList.map((product) => (
              <div
                key={product.id}
                className="group flex flex-col bg-background-light dark:bg-background-dark rounded-lg overflow-hidden border border-text-light/10 dark:border-text-dark/10 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
                onClick={() => {
                  navigate(`/products/${product.id}`);
                  scrollToTop();
                }}
              >
                <div className="relative">
                  <div 
                    className="w-full bg-center bg-no-repeat aspect-square bg-cover"
                    style={{ backgroundImage: `url("${product.image}")` }}
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button className="rounded-full bg-primary text-white px-4 py-2 text-sm font-bold">
                      {t('products.viewDetails')}
                    </button>
                  </div>
                </div>
                <div className="p-4 flex-grow flex flex-col">
                  <h3 className="text-text-light dark:text-text-dark text-base font-bold leading-tight mb-2">
                    {product.name}
                  </h3>
                  <p className="text-subtle-light dark:text-subtle-dark text-sm font-normal flex-grow mb-3">
                    {product.description}
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-xs font-medium border-primary/30 text-primary hover:bg-primary hover:text-white transition-all duration-200"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/products/${product.id}`);
                      scrollToTop();
                    }}
                  >
                    Learn More
                  </Button>
                </div>
              </div>
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
                <Button variant="primary" size="lg" href={t('products.cta.primaryButton.href')}>
                  {t('products.cta.primaryButton.text')}
                </Button>
                <Button variant="outline" size="lg" href={t('products.cta.secondaryButton.href')}>
                  {t('products.cta.secondaryButton.text')}
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </PageContainer>
    </div>
  );
};
