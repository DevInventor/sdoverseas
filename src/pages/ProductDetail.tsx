import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ProductCard } from '../components/common';
import { Input, Textarea } from '../components/forms';
import { PageContainer } from '../components/layout/PageContainer';
import { scrollToTop } from '../hooks/useScrollToTop';
import { useLanguage } from '../contexts/LanguageContext';

export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useLanguage();
  
  // Format phone number for WhatsApp (remove all non-digits)
  const whatsappNumber = t('contact.contactInfo.whatsapp.value').replace(/\D/g, '');
  
  // Get language-specific products with error handling
  const products = Array.isArray(t('products-data.products')) 
    ? t('products-data.products') as any[]
    : [];
  
  // Find the product by ID
  const product = products.find((p: any) => p.id === id);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    quantity: '',
    message: ''
  });
  
  // Validation state
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitMessage, setSubmitMessage] = useState('');

  // Validation functions (copied from Contact.tsx)
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Quantity validation
    if (!formData.quantity.trim()) {
      newErrors.quantity = 'Quantity is required';
    } else if (isNaN(Number(formData.quantity)) || Number(formData.quantity) <= 0) {
      newErrors.quantity = 'Please enter a valid quantity';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Generate WhatsApp message with form data and product info
  const generateProductQuoteMessage = () => {
    const baseMessage = t('contact.form.defaultWhatsAppMessage');
    const message = `${baseMessage}

**Quote Request Details:**
Product: ${product?.name || 'N/A'}
Name: ${formData.name || 'Not provided'}
Email: ${formData.email || 'Not provided'}
Quantity Required: ${formData.quantity || 'Not specified'} units

**Additional Requirements:**
${formData.message || 'No additional requirements'}

Please contact me for more information and pricing. Thank you!`;
    
    return encodeURIComponent(message);
  };

  // Handle WhatsApp submission instead of traditional form submission
  const handleWhatsAppSubmit = () => {
    if (!validateForm()) {
      return;
    }

    const message = generateProductQuoteMessage();
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
    
    // Show success message
    setSubmitMessage(t('product-detail.form.successMessage'));
    setFormData({ name: '', email: '', quantity: '', message: '' });
  };

  if (!product) {
    return (
      <PageContainer>
        <div className="text-center py-16">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{t('product-detail.productNotFound')}</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">{t('product-detail.productNotFoundDescription')}</p>
          <Link to="/products" className="text-primary hover:underline" onClick={scrollToTop}>
            ← {t('product-detail.backButton')}
          </Link>
        </div>
      </PageContainer>
    );
  }

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <PageContainer>
        {/* Breadcrumb */}
        <div className="text-sm font-medium text-text-light/60 dark:text-text-dark/60 mb-6">
          <Link to="/" className="hover:text-primary" onClick={scrollToTop}>
            {t('product-detail.breadcrumb.home')}
          </Link>
          <span> / </span>
          <Link to="/products" className="hover:text-primary" onClick={scrollToTop}>
            {t('product-detail.breadcrumb.products')}
          </Link>
          <span> / </span>
          <span className="text-text-light dark:text-text-dark font-medium">{t('product-detail.breadcrumb.current')}</span>
        </div>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div>
            <div className="aspect-[4/3] w-full overflow-hidden rounded-xl shadow-lg">
              <div 
                className="h-full w-full bg-cover bg-center"
                style={{ backgroundImage: `url("${product.image}")` }}
              />
            </div>
          </div>

          {/* Product Info */}
          <div>
            <p className="text-sm font-medium text-primary mb-2">Category: {product.category}</p>
            <h1 className="text-3xl lg:text-4xl font-bold font-display text-text-light dark:text-text-dark mb-6">
              {product.name}
            </h1>

            {/* Key Specifications */}
            <div className="border-t border-black/10 dark:border-white/10 pt-6">
              <h3 className="text-lg font-bold font-display text-text-light dark:text-text-dark mb-4">
                {t('product-detail.keySpecifications')}
              </h3>
              <div className="space-y-4 text-sm">
                <div className="grid grid-cols-2 gap-4">
                  <span className="text-text-light/60 dark:text-text-dark/60">Origin</span>
                  <span className="text-text-light dark:text-text-dark font-medium">{product.origin}</span>
                </div>
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="grid grid-cols-2 gap-4">
                    <span className="text-text-light/60 dark:text-text-dark/60 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                    <span className="text-text-light dark:text-text-dark font-medium">{String(value || '')}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Product Description */}
            <div className="border-t border-black/10 dark:border-white/10 pt-6 mt-8">
              <h3 className="text-lg font-bold font-display text-text-light dark:text-text-dark mb-4">
                {t('product-detail.productDescription')}
              </h3>
              <p className="text-base text-text-light/80 dark:text-text-dark/80 leading-relaxed">
                {product.description}
              </p>
            </div>
          </div>
        </div>

        {/* Quote Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-16">
          <div className="lg:col-start-2">
            <div className="bg-surface-light dark:bg-surface-dark p-8 rounded-xl shadow-lg border border-border-light dark:border-border-dark">
              <h3 className="text-2xl font-bold font-display text-text-light dark:text-text-dark mb-6">
                {t('product-detail.form.title')}
              </h3>
              
              {submitMessage && (
                <div className="mb-6 p-4 bg-green-100 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                  <p className="text-green-800 dark:text-green-200 text-sm">{submitMessage}</p>
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-text-light dark:text-text-dark mb-2" htmlFor="name">
                    {t('product-detail.form.fields.name.label')} <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1">
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder={t('product-detail.form.fields.name.placeholder')}
                      className={`w-full rounded-lg border transition duration-150 ease-in-out text-lg py-3 px-4 text-text-light dark:text-text-dark bg-surface-light dark:bg-surface-dark focus:ring-primary focus:border-primary ${
                        errors.name 
                          ? 'border-red-500 dark:border-red-400 focus:ring-red-500 focus:border-red-500' 
                          : 'border-border-light dark:border-border-dark'
                      }`}
                      required
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>
                    )}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-text-light dark:text-text-dark mb-2" htmlFor="email">
                    {t('product-detail.form.fields.email.label')} <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1">
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder={t('product-detail.form.fields.email.placeholder')}
                      className={`w-full rounded-lg border transition duration-150 ease-in-out text-lg py-3 px-4 text-text-light dark:text-text-dark bg-surface-light dark:bg-surface-dark focus:ring-primary focus:border-primary ${
                        errors.email 
                          ? 'border-red-500 dark:border-red-400 focus:ring-red-500 focus:border-red-500' 
                          : 'border-border-light dark:border-border-dark'
                      }`}
                      required
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>
                    )}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-text-light dark:text-text-dark mb-2" htmlFor="quantity">
                    {t('product-detail.form.fields.quantity.label')} <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1">
                    <Input
                      id="quantity"
                      name="quantity"
                      type="number"
                      value={formData.quantity}
                      onChange={handleInputChange}
                      placeholder={t('product-detail.form.fields.quantity.placeholder')}
                      className={`w-full rounded-lg border transition duration-150 ease-in-out text-lg py-3 px-4 text-text-light dark:text-text-dark bg-surface-light dark:bg-surface-dark focus:ring-primary focus:border-primary ${
                        errors.quantity 
                          ? 'border-red-500 dark:border-red-400 focus:ring-red-500 focus:border-red-500' 
                          : 'border-border-light dark:border-border-dark'
                        }`}
                      required
                    />
                    {errors.quantity && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.quantity}</p>
                    )}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-text-light dark:text-text-dark mb-2" htmlFor="message">
                    {t('product-detail.form.fields.message.label')}
                  </label>
                  <div className="mt-1">
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder={t('product-detail.form.fields.message.placeholder')}
                      rows={4}
                      className="w-full rounded-lg border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark focus:ring-primary focus:border-primary transition duration-150 ease-in-out text-lg py-3 px-4 text-text-light dark:text-text-dark"
                    />
                  </div>
                </div>
                
                <div className="flex justify-center pt-4">
                  <button
                    type="button"
                    onClick={handleWhatsAppSubmit}
                    className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-lg text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-surface-light dark:focus:ring-offset-surface-dark focus:ring-green-500 dark:bg-green-900/50 dark:text-green-300 dark:hover:bg-green-900/80 transition-all"
                  >
                    <svg className="mr-3" fill="currentColor" height="24" viewBox="0 0 256 256" width="24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M187.58,144.84l-32-16a8,8,0,0,0-8,.5l-14.69,9.8a40.55,40.55,0,0,1-16-16l9.8-14.69a8,8,0,0,0,.5-8l-16-32A8,8,0,0,0,104,64a40,40,0,0,0-40,40,88.1,88.1,0,0,0,88,88,40,40,0,0,0,40-40A8,8,0,0,0,187.58,144.84ZM152,176a72.08,72.08,0,0,1-72-72A24,24,0,0,1,99.29,80.46l11.48,23L101,118a8,8,0,0,0-.73,7.51,56.47,56.47,0,0,0,30.15,30.15A8,8,0,0,0,138,155l14.61-9.74,23,11.48A24,24,0,0,1,152,176ZM128,24A104,104,0,0,0,36.18,176.88L24.83,210.93a16,16,0,0,0,20.24,20.24l34.05-11.35A104,104,0,1,0,128,24Zm0,192a87.87,87.87,0,0,1-44.06-11.81,8,8,0,0,0-6.54-.67L40,216,52.47,178.6a8,8,0,0,0-.66-6.54A88,88,0,1,1,128,216Z"></path>
                    </svg>
                    {t('product-detail.form.submitText')} - WhatsApp
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold font-display text-text-light dark:text-text-dark mb-8 text-center">
            {t('product-detail.relatedProducts.title')}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products
              .filter((relatedProduct: any) => relatedProduct.id !== product.id)
              .slice(0, 3)
              .map((relatedProduct: any) => (
                <ProductCard
                  key={relatedProduct.id}
                  product={relatedProduct}
                  showLearnMore={true}
                />
              ))}
          </div>
        </div>
      </PageContainer>
    </div>
  );
};
