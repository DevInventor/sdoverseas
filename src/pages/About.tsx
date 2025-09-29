import React from "react";
import { PageContainer } from "../components/layout/PageContainer";
import {
  Card,
  CardContent,
  ResponsiveGrid,
  ResponsiveStack,
  Button,
  Icon,
} from "../components/common";
import { SERVICES_DATA } from "../constants";
import { useLanguage } from "../contexts/LanguageContext";

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

        {/* CTA Section */}
        <section className="py-16">
            <Card className="text-center p-12 bg-primary/5 dark:bg-primary/10">
              <CardContent>
                <h2 className="text-3xl font-bold text-text-light dark:text-text-dark mb-4">
                  {t('about.sections.cta.title')}
                </h2>
                <p className="text-subtle-light dark:text-subtle-dark mb-8 max-w-2xl mx-auto">
                  {t('about.sections.cta.subtitle')}
                </p>
                <ResponsiveStack
                  direction={{ xs: "column", sm: "row" }}
                  spacing="md"
                  justifyContent="center"
                >
                  <Button variant="primary" size="lg" href={t('about.sections.cta.primaryButton.href')}>
                    {t('about.sections.cta.primaryButton.text')}
                  </Button>
                  <Button variant="outline" size="lg" href={t('about.sections.cta.secondaryButton.href')}>
                    {t('about.sections.cta.secondaryButton.text')}
                  </Button>
                </ResponsiveStack>
              </CardContent>
            </Card>
        </section>
      </PageContainer>
    </div>
  );
};
