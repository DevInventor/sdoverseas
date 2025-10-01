import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { Icon } from '../components/common';
import AnimatedTestimonials from '../components/ui/AnimatedTestimonials';
import Preloader from '../components/ui/Preloader';
import { getTestimonials } from '../config';

export const HomeFinal: React.FC = () => {
  const { t } = useLanguage();
  const [showPreloader, setShowPreloader] = useState(true);
  
  // Get testimonials data and transform for animated component
  const testimonialsData = getTestimonials().map(testimonial => ({
    text: testimonial.content,
    image: testimonial.image,
    name: testimonial.name,
    role: testimonial.title,
    company: testimonial.company
  }));

  const handlePreloaderComplete = useCallback(() => {
    setShowPreloader(false);
  }, []);

  return (
    <>
      {showPreloader && <Preloader onComplete={handlePreloaderComplete} />}
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section 
        className="relative h-[600px] flex items-center justify-center text-center text-white bg-gradient-to-br from-primary/90 to-primary"
        style={{
          backgroundImage: `url("${t('home-final.hero.backgroundImage')}")`,
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

        {/* Featured Products Section */}
        <section className="mt-24">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white text-center">
            {t('home-final.sections.featuredProducts.title')}
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 text-center max-w-2xl mx-auto">
            {t('home-final.sections.featuredProducts.subtitle')}
          </p>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[0, 1, 2].map((index: number) => (
              <div key={index} className="group">
                <div className="w-full aspect-square rounded-lg overflow-hidden">
                  <div 
                    className="w-full h-full bg-center bg-cover transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundImage: `url("${t(`home-final.sections.featuredProducts.items.${index}.image`)}")` }}
                  />
                </div>
                <div className="mt-4">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                    {t(`home-final.sections.featuredProducts.items.${index}.name`)}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    {t(`home-final.sections.featuredProducts.items.${index}.description`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              to={t('home-final.sections.featuredProducts.cta.href') || '/products'}
              className="px-6 py-3 rounded-full bg-primary/20 dark:bg-primary/30 text-primary font-bold hover:bg-primary/30 dark:hover:bg-primary/40 transition-colors"
            >
              {t('home-final.sections.featuredProducts.cta.text')}
            </Link>
          </div>
        </section>

        {/* Animated Testimonials Section */}
        <AnimatedTestimonials 
          testimonials={testimonialsData}
          title={t('home-final.sections.testimonials.title')}
          subtitle={t('home-final.sections.testimonials.subtitle')}
          className="mt-24"
        />
      </div>
    </div>
    </>
  );
};
