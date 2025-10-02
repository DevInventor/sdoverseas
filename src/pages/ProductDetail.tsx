import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button, ProductCard } from '../components/common';
import { Input, Textarea } from '../components/forms';
import { PageContainer } from '../components/layout/PageContainer';
import { scrollToTop } from '../hooks/useScrollToTop';
import { useLanguage } from '../contexts/LanguageContext';

export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useLanguage();
  
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitMessage(t('product-detail.form.successMessage'));
      setFormData({ name: '', email: '', quantity: '', message: '' });
    }, 2000);
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
            <div className="bg-background-light dark:bg-background-dark p-8 rounded-xl shadow-lg border border-black/5 dark:border-white/5">
              <h3 className="text-xl font-bold font-display text-text-light dark:text-text-dark mb-6">
                {t('product-detail.form.title')}
              </h3>
              
              {submitMessage && (
                <div className="mb-6 p-4 bg-green-100 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                  <p className="text-green-800 dark:text-green-200 text-sm">{submitMessage}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Input
                    name="name"
                    label={t('product-detail.form.fields.name.label')}
                    placeholder={t('product-detail.form.fields.name.placeholder')}
                    value={formData.name}
                    onChange={handleInputChange}
                    required={true}
                    fullWidth
                  />
                </div>
                
                <div>
                  <Input
                    name="email"
                    type="email"
                    label={t('product-detail.form.fields.email.label')}
                    placeholder={t('product-detail.form.fields.email.placeholder')}
                    value={formData.email}
                    onChange={handleInputChange}
                    required={true}
                    fullWidth
                  />
                </div>
                
                <div>
                  <Input
                    name="quantity"
                    type="number"
                    label={t('product-detail.form.fields.quantity.label')}
                    placeholder={t('product-detail.form.fields.quantity.placeholder')}
                    value={formData.quantity}
                    onChange={handleInputChange}
                    required={true}
                    fullWidth
                  />
                </div>
                
                <div>
                  <Textarea
                    name="message"
                    label={t('product-detail.form.fields.message.label')}
                    placeholder={t('product-detail.form.fields.message.placeholder')}
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    fullWidth
                  />
                </div>
                
                <div>
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    fullWidth
                    loading={isSubmitting}
                    loadingText="Submitting..."
                  >
                    {t('product-detail.form.submitText')}
                  </Button>
                </div>
              </form>
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
