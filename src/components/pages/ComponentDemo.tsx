import React, { useState } from 'react';
import { 
  Button, 
  PrimaryButton, 
  SecondaryButton, 
  OutlineButton,
  Card,
  CardContent,
  ProductCard,
  ServiceCard,
  TestimonialCard,
  LoadingSpinner,
  DotsLoading,
  Skeleton,
  Icon,
  ThemeToggle
} from '../common';
import { Input, Textarea, Select } from '../forms';
import { TESTIMONIALS_DATA, SPICE_PRODUCTS, SERVICES_DATA } from '../../constants';

export const ComponentDemo: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: '',
    message: '',
  });

  const handleSubmit = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => setLoading(false), 2000);
  };

  const selectOptions = [
    { value: 'turmeric', label: 'Turmeric' },
    { value: 'cumin', label: 'Cumin Seeds' },
    { value: 'chilli', label: 'Chilli Powder' },
    { value: 'cardamom', label: 'Cardamom' },
  ];

  return (
    <div className="container-fluid py-16 space-y-16">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Component Library Demo
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Demonstration of all reusable components in the SD Overseas design system
        </p>
      </div>

      {/* Button Components */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Button Components</h2>
        <Card variant="default" hover="none">
          <CardContent>
            <div className="space-y-6">
              <div className="flex flex-wrap gap-4">
                <PrimaryButton>Primary Button</PrimaryButton>
                <SecondaryButton>Secondary Button</SecondaryButton>
                <OutlineButton>Outline Button</OutlineButton>
                <Button variant="ghost">Ghost Button</Button>
                <Button variant="danger">Danger Button</Button>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <Button size="sm">Small Button</Button>
                <Button size="md">Medium Button</Button>
                <Button size="lg">Large Button</Button>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <Button 
                  icon={<Icon name="add" />}
                  iconPosition="left"
                >
                  With Left Icon
                </Button>
                <Button 
                  endIcon={<Icon name="arrow_forward" />}
                >
                  With Right Icon
                </Button>
                <Button loading={loading} onClick={handleSubmit}>
                  Loading Button
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Form Components */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Form Components</h2>
        <Card variant="default" hover="none">
          <CardContent>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
                <Input
                  label="Email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              
              <Select
                label="Spice Category"
                placeholder="Select a spice category"
                options={selectOptions}
                value={formData.category}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFormData({ ...formData, category: e.target.value })}
              />
              
              <Textarea
                label="Message"
                placeholder="Enter your message"
                rows={4}
                value={formData.message}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData({ ...formData, message: e.target.value })}
                resize="vertical"
              />
              
              <div className="flex justify-end">
                <PrimaryButton type="submit">Submit Form</PrimaryButton>
              </div>
            </form>
          </CardContent>
        </Card>
      </section>

      {/* Card Components */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Card Components</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Product Card */}
          <ProductCard
            image={SPICE_PRODUCTS[0].image}
            title={SPICE_PRODUCTS[0].name}
            description={SPICE_PRODUCTS[0].description}
            category={SPICE_PRODUCTS[0].category}
          />
          
          {/* Service Card */}
          <ServiceCard
            icon={<Icon name={SERVICES_DATA[0].icon} size="xl" />}
            title={SERVICES_DATA[0].title}
            description={SERVICES_DATA[0].description}
          />
          
          {/* Testimonial Card */}
          <TestimonialCard
            image={TESTIMONIALS_DATA[0].image}
            name={TESTIMONIALS_DATA[0].name}
            title={TESTIMONIALS_DATA[0].title}
            company={TESTIMONIALS_DATA[0].company}
            content={TESTIMONIALS_DATA[0].content}
            rating={TESTIMONIALS_DATA[0].rating}
          />
        </div>
      </section>

      {/* Loading Components */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Loading Components</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          <Card variant="default" hover="none">
            <CardContent>
              <div className="space-y-4 text-center">
                <h3 className="text-lg font-semibold">Loading Spinner</h3>
                <div className="flex justify-center">
                  <LoadingSpinner size="lg" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card variant="default" hover="none">
            <CardContent>
              <div className="space-y-4 text-center">
                <h3 className="text-lg font-semibold">Dots Loading</h3>
                <div className="flex justify-center">
                  <DotsLoading size="lg" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card variant="default" hover="none">
            <CardContent>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-center">Skeleton Components</h3>
                <div className="space-y-2">
                  <Skeleton height="20px" width="100%" />
                  <Skeleton height="16px" width="80%" />
                  <Skeleton height="16px" width="60%" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Icon System */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Icon System</h2>
        <Card variant="default" hover="none">
          <CardContent>
            <div className="grid grid-cols-8 gap-4 text-center">
              <Icon name="spa" size="lg" />
              <Icon name="local_shipping" size="lg" />
              <Icon name="verified" size="lg" />
              <Icon name="support_agent" size="lg" />
              <Icon name="star" size="lg" />
              <Icon name="search" size="lg" />
              <Icon name="mail" size="lg" />
              <Icon name="phone" size="lg" />
              <Icon name="location_on" size="lg" />
              <Icon name="check" size="lg" />
              <Icon name="error" size="lg" />
              <Icon name="warning" size="lg" />
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Theme Toggle */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Theme System</h2>
        <Card variant="default" hover="none">
          <CardContent>
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-4">Switch between Light and Dark modes</h3>
              <ThemeToggle className="mx-auto" />
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};
