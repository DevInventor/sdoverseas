import React from "react";
import { Link } from "react-router-dom";
import { PageContainer } from "../components/layout/PageContainer";
import {
  Card,
  CardContent,
  ResponsiveGrid,
  Button,
  Icon,
} from "../components/common";
import { SERVICES_DATA } from "../constants";
import { useLanguage } from "../contexts/LanguageContext";
import GlobalPresenceMap from "../components/ui/GlobalPresenceMap";
import { scrollToTop } from "../hooks/useScrollToTop";

export const About: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <PageContainer>
        {/* Hero Section */}
        <section className="py-16 sm:py-24">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-text-light dark:text-text-dark mb-6">
              {t('about.hero.title')}
            </h1>
            <p className="text-xl text-subtle-light dark:text-subtle-dark max-w-3xl mx-auto">
              {t('about.hero.subtitle')}
            </p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <Card className="p-8 bg-primary/5 dark:bg-primary/10">
              <CardContent>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                      <Icon name="flag" size="xl" color="white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-text-light dark:text-text-dark mb-4">
                      {t('about.sections.missionVision.mission.title')}
                    </h3>
                    <p className="text-subtle-light dark:text-subtle-dark leading-relaxed">
                      {t('about.sections.missionVision.mission.description')}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="p-8 bg-secondary/5 dark:bg-secondary/10">
              <CardContent>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                      <Icon name="visibility" size="xl" color="white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-text-light dark:text-text-dark mb-4">
                      {t('about.sections.missionVision.vision.title')}
                    </h3>
                    <p className="text-subtle-light dark:text-subtle-dark leading-relaxed">
                      {t('about.sections.missionVision.vision.description')}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="flex-1">
                  <h2 className="text-3xl font-bold text-text-light dark:text-text-dark mb-6">
                    {t('about.sections.story.title')}
                  </h2>
                  <div className="space-y-6 text-subtle-light dark:text-subtle-dark">
                    {[0, 1, 2].map((index) => (
                      <p key={index}>
                        {t(`about.sections.story.content.${index}`)}
                      </p>
                    ))}
                  </div>
            </div>
            <div className="flex-1">
              <img
                src={t('about.sections.story.image')}
                alt={t('about.sections.story.imageAlt')}
                className="w-full h-80 object-cover rounded-xl shadow-lg"
              />
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-text-light dark:text-text-dark mb-4">
                  {t('about.sections.values.title')}
                </h2>
                <p className="text-subtle-light dark:text-subtle-dark max-w-2xl mx-auto">
                  {t('about.sections.values.subtitle')}
                </p>
              </div>

          <ResponsiveGrid columns={{ xs: 1, sm: 2, lg: 4 }} gap="lg">
            {[0, 1, 2, 3].map((index) => (
              <Card key={index} className={`text-center p-6 ${index % 2 === 0 ? 'bg-primary/5 dark:bg-primary/10' : 'bg-secondary/5 dark:bg-secondary/10'} hover:shadow-lg transition-shadow`}>
                <CardContent>
                  <div className="w-16 h-16 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name={t(`about.sections.values.items.${index}.icon`)} size="xl" color="primary" />
                  </div>
                  <h3 className="text-xl font-bold text-text-light dark:text-text-dark mb-3">
                    {t(`about.sections.values.items.${index}.title`)}
                  </h3>
                  <p className="text-subtle-light dark:text-subtle-dark">
                    {t(`about.sections.values.items.${index}.description`)}
                  </p>
                </CardContent>
              </Card>
            ))}
          </ResponsiveGrid>
        </section>

        {/* Services Overview */}
        <section className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text-light dark:text-text-dark mb-4">
              {t('about.sections.services.title')}
            </h2>
            <p className="text-subtle-light dark:text-subtle-dark max-w-2xl mx-auto">
              {t('about.sections.services.subtitle')}
            </p>
          </div>

          <ResponsiveGrid columns={{ xs: 1, md: 2, lg: 3 }} gap="md">
            {SERVICES_DATA.map((service, index) => (
              <Card
                key={index}
                className={`p-6 hover:shadow-lg transition-shadow ${
                  index % 2 === 0 
                    ? 'bg-primary/5 dark:bg-primary/10' 
                    : 'bg-secondary/5 dark:bg-secondary/10'
                }`}
              >
                <CardContent>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-primary/10 dark:bg-primary/20 rounded-lg flex items-center justify-center">
                        <Icon name={service.icon} size="lg" color="primary" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-text-light dark:text-text-dark mb-2">
                        {service.title}
                      </h3>
                      <p className="text-subtle-light dark:text-subtle-dark text-sm">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </ResponsiveGrid>
        </section>

        {/* Global Presence Map */}
        <GlobalPresenceMap 
          title={t('about.sections.globalPresence.title')}
          subtitle={t('about.sections.globalPresence.subtitle')}
        />

        {/* CTA Section */}
        <section className="py-20">
          <div className="relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-secondary/10 dark:from-primary/20 dark:via-primary/10 dark:to-secondary/20"></div>
            <div className="absolute inset-0 opacity-30" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f97316' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}></div>
            
            <div className="relative">
              <Card className="text-center p-16 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-0 shadow-2xl">
                <CardContent>
                  {/* Icon */}
                  <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
                    <Icon name="handshake" size="2xl" color="white" />
                  </div>
                  
                  {/* Title */}
                  <h2 className="text-4xl md:text-5xl font-bold text-text-light dark:text-text-dark mb-6">
                    {t('about.sections.cta.title')}
                  </h2>
                  
                  {/* Subtitle */}
                  <p className="text-lg text-subtle-light dark:text-subtle-dark mb-12 max-w-3xl mx-auto leading-relaxed">
                    {t('about.sections.cta.subtitle')}
                  </p>
                  
                  {/* Benefits Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="flex flex-col items-center p-6 bg-primary/5 dark:bg-primary/10 rounded-xl">
                      <div className="w-12 h-12 bg-primary/20 dark:bg-primary/30 rounded-lg flex items-center justify-center mb-4">
                        <Icon name="verified" size="lg" color="primary" />
                      </div>
                      <h3 className="font-semibold text-text-light dark:text-text-dark mb-2">
                        {t('about.sections.cta.benefits.quality.title')}
                      </h3>
                      <p className="text-sm text-subtle-light dark:text-subtle-dark text-center">
                        {t('about.sections.cta.benefits.quality.description')}
                      </p>
                    </div>
                    
                    <div className="flex flex-col items-center p-6 bg-primary/5 dark:bg-primary/10 rounded-xl">
                      <div className="w-12 h-12 bg-primary/20 dark:bg-primary/30 rounded-lg flex items-center justify-center mb-4">
                        <Icon name="local_shipping" size="lg" color="primary" />
                      </div>
                      <h3 className="font-semibold text-text-light dark:text-text-dark mb-2">
                        {t('about.sections.cta.benefits.shipping.title')}
                      </h3>
                      <p className="text-sm text-subtle-light dark:text-subtle-dark text-center">
                        {t('about.sections.cta.benefits.shipping.description')}
                      </p>
                    </div>
                    
                    <div className="flex flex-col items-center p-6 bg-primary/5 dark:bg-primary/10 rounded-xl">
                      <div className="w-12 h-12 bg-primary/20 dark:bg-primary/30 rounded-lg flex items-center justify-center mb-4">
                        <Icon name="support_agent" size="lg" color="primary" />
                      </div>
                      <h3 className="font-semibold text-text-light dark:text-text-dark mb-2">
                        {t('about.sections.cta.benefits.support.title')}
                      </h3>
                      <p className="text-sm text-subtle-light dark:text-subtle-dark text-center">
                        {t('about.sections.cta.benefits.support.description')}
                      </p>
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
                    <Link to={t('about.sections.cta.primaryButton.href')} onClick={scrollToTop}>
                      <Button 
                        variant="primary" 
                        size="lg" 
                        className="w-full sm:w-auto px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                        icon={<Icon name="email" size="md" color="white" />}
                        iconPosition="left"
                      >
                        {t('about.sections.cta.primaryButton.text')}
                      </Button>
                    </Link>
                    <Link to={t('about.sections.cta.secondaryButton.href')} onClick={scrollToTop}>
                      <Button 
                        variant="outline" 
                        size="lg" 
                        className="w-full sm:w-auto px-8 py-4 text-lg font-semibold border-2 hover:bg-primary hover:text-white transition-all duration-300 transform hover:scale-105"
                        icon={<Icon name="inventory" size="md" color="primary" />}
                        iconPosition="left"
                      >
                        {t('about.sections.cta.secondaryButton.text')}
                      </Button>
                    </Link>
                  </div>
                  
                  {/* Trust Indicators */}
                  <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-sm text-subtle-light dark:text-subtle-dark mb-4">
                      {t('about.sections.cta.trustText')}
                    </p>
                    <div className="flex flex-wrap justify-center items-center gap-6 text-xs text-subtle-light dark:text-subtle-dark">
                      <div className="flex items-center gap-2">
                        <Icon name="verified" size="sm" color="primary" />
                        <span>{t('about.sections.cta.trustItems.certified')}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Icon name="public" size="sm" color="primary" />
                        <span>{t('about.sections.cta.trustItems.global')}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Icon name="schedule" size="sm" color="primary" />
                        <span>{t('about.sections.cta.trustItems.reliable')}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </PageContainer>
    </div>
  );
};
