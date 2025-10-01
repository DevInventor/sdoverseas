import React from 'react';
import { Link } from 'react-router-dom';
import { PageContainer } from '../components/layout/PageContainer';
import { 
  Card, 
  CardContent, 
  ResponsiveGrid, 
  Button, 
  Icon,
  FloatingActionButton
} from '../components/common';
import { scrollToTop } from '../hooks/useScrollToTop';
import { useLanguage } from '../contexts/LanguageContext';
import { SERVICES_DATA } from '../constants';

export const Services: React.FC = () => {
  const { t } = useLanguage();

  // Check if translations are loaded
  const isTranslationsLoaded = t('services.services.title') !== 'services.services.title';

  if (!isTranslationsLoaded) {
    return (
      <div className="min-h-screen bg-background-light dark:bg-background-dark flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-subtle-light dark:text-subtle-dark">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <PageContainer>
        {/* Hero Section */}
        <section className="py-16 sm:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[500px]">
            <div>
              <h1 className="text-4xl font-bold text-text-light dark:text-text-dark mb-6">
                {t('services.hero.title')}
              </h1>
              <p className="text-xl text-subtle-light dark:text-subtle-dark mb-8 leading-relaxed">
                {t('services.hero.subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to={t('services.cta.primaryButton.href')} onClick={scrollToTop}>
                  <Button variant="primary" size="lg">
                    {t('services.cta.primaryButton.text')}
                  </Button>
                </Link>
                <Link to={t('services.cta.secondaryButton.href')} onClick={scrollToTop}>
                  <Button variant="outline" size="lg">
                    {t('services.cta.secondaryButton.text')}
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative flex items-center justify-center">
              <div className="w-full max-w-lg">
                <img
                  src={t('services.hero.image')}
                  alt={t('services.hero.imageAlt')}
                  className="w-full h-auto object-contain rounded-xl shadow-lg bg-white/5 dark:bg-white/5 p-4 border border-primary/10"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text-light dark:text-text-dark mb-4">
              {t('services.services.title')}
            </h2>
            <p className="text-subtle-light dark:text-subtle-dark max-w-2xl mx-auto">
              {t('services.services.subtitle')}
            </p>
          </div>

          <ResponsiveGrid 
            columns={{ xs: 1, md: 2, lg: 3 }}
            gap="lg"
          >
            {SERVICES_DATA.map((service: any, index: number) => (
              <Card 
                key={index} 
                className={`p-6 hover:shadow-xl transition-all transform hover:-translate-y-2 ${
                  index % 2 === 0 
                    ? 'bg-primary/5 dark:bg-primary/10' 
                    : 'bg-secondary/5 dark:bg-secondary/10'
                }`}
              >
                <CardContent>
                  <div className="flex items-start gap-4 mb-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-primary/10 dark:bg-primary/20 rounded-xl flex items-center justify-center">
                        <Icon name={service.icon} size="xl" color="primary" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-text-light dark:text-text-dark mb-2">
                        {service.title}
                      </h3>
                      <p className="text-subtle-light dark:text-subtle-dark leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </div>
                  
                </CardContent>
              </Card>
            ))}
          </ResponsiveGrid>
        </section>

        {/* Process Flow */}
        <section className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text-light dark:text-text-dark mb-4">
              {t('services.process.title')}
            </h2>
            <p className="text-subtle-light dark:text-subtle-dark max-w-2xl mx-auto">
              {t('services.process.subtitle')}
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row items-stretch gap-3 md:gap-1">
              {(t('services.process.steps') || []).map((process: any, index: number) => (
                <React.Fragment key={index}>
                  <Card 
                    className={`text-center p-4 flex-1 flex flex-col ${
                      index % 2 === 0 
                        ? 'bg-primary/5 dark:bg-primary/10' 
                        : 'bg-secondary/5 dark:bg-secondary/10'
                    }`}
                  >
                    <CardContent className="py-2 flex flex-col h-full">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 ${
                        process.status === 'completed' ? 'bg-green-100 dark:bg-green-900/20 text-green-600' :
                        process.status === 'current' ? 'bg-primary/10 dark:bg-primary/20 text-primary' :
                        'bg-gray-100 dark:bg-gray-800 text-gray-400'
                      }`}>
                        <Icon name={process.icon} size="md" />
                      </div>
                      <h3 className="text-sm font-bold text-text-light dark:text-text-dark mb-2">
                        {process.title}
                      </h3>
                      <p className="text-xs text-subtle-light dark:text-subtle-dark leading-tight flex-grow">
                        {process.description}
                      </p>
                    </CardContent>
                  </Card>
                  
                  {/* Arrow between cards */}
                  {index < (t('services.process.steps') || []).length - 1 && (
                    <div className="hidden md:flex items-center justify-center text-primary/50 dark:text-primary/30 px-1">
                      <Icon name="arrow_forward" size="md" />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </section>


        {/* Client Testimonials */}
        <section className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text-light dark:text-text-dark mb-4">
              {t('services.testimonials.title')}
            </h2>
            <p className="text-subtle-light dark:text-subtle-dark max-w-2xl mx-auto">
              {t('services.testimonials.subtitle')}
            </p>
          </div>

          <ResponsiveGrid 
            columns={{ xs: 1, md: 2, lg: 3 }}
            gap="lg"
          >
            {(t('services.testimonials.items') || []).map((testimonial: any, index: number) => (
              <Card 
                key={index} 
                className={`p-6 ${
                  index % 2 === 0 
                    ? 'bg-primary/5 dark:bg-primary/10' 
                    : 'bg-secondary/5 dark:bg-secondary/10'
                }`}
              >
                <CardContent>
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Icon key={i} name="star" size="sm" color="warning" />
                    ))}
                  </div>
                  <p className="text-subtle-light dark:text-subtle-dark mb-6 italic leading-relaxed">
                    "{testimonial.comment}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center">
                      <Icon name="person" size="md" color="primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-text-light dark:text-text-dark">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-subtle-light dark:text-subtle-dark">
                        {testimonial.company}
                      </p>
                    </div>
                  </div>
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
                {t('services.cta.title')}
              </h2>
              <p className="text-subtle-light dark:text-subtle-dark mb-8 max-w-2xl mx-auto">
                {t('services.cta.subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to={t('services.cta.primaryButton.href')} onClick={scrollToTop}>
                  <Button variant="primary" size="lg">
                    {t('services.cta.primaryButton.text')}
                  </Button>
                </Link>
                <Link to={t('services.cta.secondaryButton.href')} onClick={scrollToTop}>
                  <Button variant="outline" size="lg">
                    {t('services.cta.secondaryButton.text')}
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Floating Action Button for Contact */}
        <FloatingActionButton
          icon="phone"
          onClick={() => {
            scrollToTop();
            window.location.href = `/contact?ref=services&action=call`;
          }}
          variant="primary"
          size="lg"
          label="Call Now"
        />
      </PageContainer>
    </div>
  );
};
