import React from 'react';
import { PageContainer } from '../components/layout/PageContainer';
import { 
  Card, 
  CardContent, 
  ResponsiveGrid, 
  Button, 
  Icon,
  FloatingActionButton
} from '../components/common';
import { SERVICES_DATA } from '../constants';

export const Services: React.FC = () => {
  const serviceProcessSteps = [
    {
      step: 1,
      title: 'Consultation',
      description: 'We understand your needs and requirements',
      icon: 'support_agent',
      status: 'completed'
    },
    {
      step: 2,
      title: 'Sourcing',
      description: 'Direct sourcing from trusted farms',
      icon: 'agriculture',
      status: 'completed'
    },
    {
      step: 3,
      title: 'Quality Check',
      description: 'Rigorous testing and quality assurance',
      icon: 'verified',
      status: 'current'
    },
    {
      step: 4,
      title: 'Packaging',
      description: 'Secure packaging for long-distance shipping',
      icon: 'inventory_2',
      status: 'upcoming'
    },
    {
      step: 5,
      title: 'Delivery',
      description: 'Safe and timely delivery to your doorstep',
      icon: 'local_shipping',
      status: 'upcoming'
    }
  ];

  const testimonials = [
    {
      name: "Marcus Johnson",
      role: "Chef",
      restaurant: "Spice Garden Bistro",
      rating: 5,
      comment: "SD Overseas has transformed our kitchen operations with their consistent quality and excellent logistics."
    },
    {
      name: "Emily Chen",
      role: "Import Manager",
      company: "Global Food Distributors",
      rating: 5,
      comment: "Working with SD Overseas has significantly improved our supply chain efficiency."
    },
    {
      name: "Ahmed Hassan",
      role: "Owner",
      restaurant: "Middle Eastern Delights",
      rating: 5,
      comment: "The authenticity and freshness of spices from SD Overseas is unmatched."
    }
  ];

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <PageContainer>
        {/* Hero Section */}
        <section className="py-16 sm:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl font-bold text-text-light dark:text-text-dark mb-6">
                Comprehensive Spice Trading Services
              </h1>
              <p className="text-xl text-subtle-light dark:text-subtle-dark mb-8 leading-relaxed">
                From sourcing to delivery, we provide end-to-end solutions for your spice trading needs. 
                Our comprehensive services ensure quality, compliance, and customer satisfaction.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="primary" size="lg" href="/contact">
                  Get Started Today
                </Button>
                <Button variant="outline" size="lg" href="/contact">
                  View Pricing
                </Button>
              </div>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1587302912306-cf1ed9c33146?q=80&w=2070&auto=format&fit=crop"
                alt="Spice warehouse operations"
                className="w-full h-80 object-cover rounded-xl shadow-lg"
              />
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text-light dark:text-text-dark mb-4">
              Our Core Services
            </h2>
            <p className="text-subtle-light dark:text-subtle-dark max-w-2xl mx-auto">
              Everything you need for successful spice trading operations
            </p>
          </div>

          <ResponsiveGrid 
            columns={{ xs: 1, md: 2, lg: 3 }}
            gap="lg"
          >
            {SERVICES_DATA.map((service, index) => (
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
              Our Service Process
            </h2>
            <p className="text-subtle-light dark:text-subtle-dark max-w-2xl mx-auto">
              A streamlined process ensures efficiency and quality at every step
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row items-stretch gap-3 md:gap-1">
              {serviceProcessSteps.map((process, index) => (
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
                  {index < serviceProcessSteps.length - 1 && (
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
              Client Success Stories
            </h2>
            <p className="text-subtle-light dark:text-subtle-dark max-w-2xl mx-auto">
              See how we've helped businesses worldwide with their spice trading needs
            </p>
          </div>

          <ResponsiveGrid 
            columns={{ xs: 1, md: 2, lg: 3 }}
            gap="lg"
          >
            {testimonials.map((testimonial, index) => (
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
                        {testimonial.role}, {testimonial.restaurant || testimonial.company}
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
                Ready to Enhance Your Spice Business?
              </h2>
              <p className="text-subtle-light dark:text-subtle-dark mb-8 max-w-2xl mx-auto">
                Let SD Overseas be your trusted partner in the global spice trade. 
                Contact us today to discuss your requirements and start your journey with us.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="primary" size="lg" href="/contact">
                  Request Quote
                </Button>
                <Button variant="outline" size="lg" href="/contact">
                  Schedule Consultation
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Floating Action Button for Contact */}
        <FloatingActionButton
          icon="phone"
          onClick={() => window.location.href = `/contact?ref=services&action=call`}
          variant="primary"
          size="lg"
          label="Call Now"
        />
      </PageContainer>
    </div>
  );
};
