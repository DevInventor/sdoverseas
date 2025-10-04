import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { Icon } from '../components/common';
import { resolveImagePath } from '../utils/imageUtils';

export const HomeFinal: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  
  // Get product categories data from config
  const productCategories = Array.isArray(t('contact.productCategories.categories')) 
    ? t('contact.productCategories.categories') as any[]
    : [];

  // Handle category click navigation
  const handleCategoryClick = (categorySlug: string) => {
    navigate(`/products?category=${categorySlug}`);
  };

  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section 
        className="relative h-[600px] flex items-center justify-center text-center text-white bg-gradient-to-br from-primary/90 to-primary"
        style={{
          backgroundImage: `url("${resolveImagePath(t('home-final.hero.backgroundImage'))}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundBlendMode: 'overlay'
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 max-w-3xl px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            {t('home-final.hero.title')}
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto">
            {t('home-final.hero.subtitle')}
          </p>
          <Link
            to={t('home-final.hero.cta.href') || '/products'}
            className="mt-8 inline-block px-8 py-3 rounded-full bg-primary text-white font-bold text-lg hover:bg-opacity-90 transition-transform transform hover:scale-105"
          >
            {t('home-final.hero.cta.text')}
          </Link>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {/* Services Section */}
        <section>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white text-center">
            {t('home-final.sections.services.title')}
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 text-center max-w-2xl mx-auto">
            {t('home-final.sections.services.subtitle')}
          </p>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[0, 1, 2].map((index: number) => (
              <div 
                key={index}
                className="p-8 rounded-xl bg-primary/10 dark:bg-primary/20 border border-primary/20 dark:border-primary/30 flex flex-col items-center text-center"
              >
                <div className="rounded-full bg-primary p-4 text-white">
                  <Icon name={t(`home-final.sections.services.items.${index}.icon`)} size="xl" color="white" />
                </div>
                <h3 className="mt-6 text-xl font-bold text-slate-900 dark:text-white">
                  {t(`home-final.sections.services.items.${index}.title`)}
                </h3>
                <p className="mt-2 text-slate-600 dark:text-slate-400">
                  {t(`home-final.sections.services.items.${index}.description`)}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="mt-24">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white text-center">
            {t('home-final.sections.whyChooseUs.title')}
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 text-center max-w-2xl mx-auto">
            {t('home-final.sections.whyChooseUs.subtitle')}
          </p>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[0, 1, 2].map((index: number) => (
              <div 
                key={index}
                className="p-8 rounded-xl bg-primary/10 dark:bg-primary/20 border border-primary/20 dark:border-primary/30 flex flex-col items-center text-center"
              >
                <div className="rounded-full bg-primary p-4 text-white">
                  <Icon name={t(`home-final.sections.whyChooseUs.items.${index}.icon`)} size="xl" color="white" />
                </div>
                <h3 className="mt-6 text-xl font-bold text-slate-900 dark:text-white">
                  {t(`home-final.sections.whyChooseUs.items.${index}.title`)}
                </h3>
                <p className="mt-2 text-slate-600 dark:text-slate-400">
                  {t(`home-final.sections.whyChooseUs.items.${index}.description`)}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Product Categories Section */}
        <section className="mt-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              {t('contact.productCategories.title')}
            </h2>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              {t('contact.productCategories.subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {productCategories.map((category: any) => (
              <div
                key={category.slug}
                onClick={() => handleCategoryClick(category.slug)}
                className="group cursor-pointer bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden border border-gray-200 dark:border-gray-700"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleCategoryClick(category.slug);
                  }
                }}
                aria-label={`Browse ${category.name} products`}
              >
                {/* Category Image */}
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3';
                    }}
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                {/* Category Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors duration-200">
                    {category.name}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                    {category.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};
