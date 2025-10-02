import React, { useState } from 'react';
import { Input, Textarea } from '../components/forms';
import { useLanguage } from '../contexts/LanguageContext';

export const Contact = () => {
  const { t } = useLanguage();
  // Format phone number for WhatsApp (remove all non-digits)
  const whatsappNumber = t('contact.contactInfo.whatsapp.value').replace(/\D/g, '');

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  // Validation state
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Validation functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
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

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!validatePhone(formData.phone.trim())) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input changes
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


  // Generate WhatsApp message with form data
  const generateWhatsAppMessage = () => {
    const message = `Hello! I'm interested in your spice trading services.

Name: ${formData.name || 'Not provided'}
Email: ${formData.email || 'Not provided'}
Phone: ${formData.phone || 'Not provided'}

Message: ${formData.message || 'No message provided'}

Please contact me for more information. Thank you!`;
    
    return encodeURIComponent(message);
  };

  // Handle WhatsApp click with validation
  const handleWhatsAppClick = () => {
    if (!validateForm()) {
      return;
    }

    const message = generateWhatsAppMessage();
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      {/* Hero Section */}
      <section 
        className="relative h-[50vh] min-h-[300px] bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.6) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuDhY0KXGaThTbNvxoFgnAx-Ki70XXUfOPrsr9pYtILZh60JdJ2h35aV85VnikRwyslnvfW_s77TkYhUiHo3EBL_J3HIdV_9VWWx365nFwLvafxh_rEHJQCJ2V_cknuPJSt4t_cu4RLv5hHk_2TkwebRA-dxhSFTXvHq4DFX_pdOcGtVvZ_XJ5etPp69faH8R33hre21TcCIPA2F0Ph6enJsAcJxJ5sk98KAx3u8dzlM7rfNDYyLLP6ENT-sIo6Nd3FG6yRXjkm2IQ")`
        }}
      >
        <div className="text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">{t('contact.hero.title')}</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-white/90">
            {t('contact.hero.subtitle')}
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-5 gap-16 items-start">
            {/* Contact Form */}
            <div className="lg:col-span-3 bg-surface-light dark:bg-surface-dark p-8 sm:p-12 rounded-xl shadow-2xl border border-border-light dark:border-border-dark">
                  <div className="space-y-8">
                    <h2 className="text-4xl font-bold text-text-light dark:text-text-dark">{t('contact.form.title')}</h2>
                

                <div className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-text-light dark:text-text-dark mb-2" htmlFor="name">
                        {t('contact.form.fields.name.label')} <span className="text-red-500">*</span>
                      </label>
                      <div className="mt-1">
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder={t('contact.form.fields.name.placeholder')}
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
                        {t('contact.form.fields.email.label')} <span className="text-red-500">*</span>
                      </label>
                      <div className="mt-1">
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder={t('contact.form.fields.email.placeholder')}
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
                  </div>
                  
                    <div>
                      <label className="block text-sm font-medium text-text-light dark:text-text-dark mb-2" htmlFor="phone">
                        {t('contact.form.fields.phone.label')} <span className="text-red-500">*</span>
                      </label>
                      <div className="mt-1">
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder={t('contact.form.fields.phone.placeholder')}
                          className={`w-full rounded-lg border transition duration-150 ease-in-out text-lg py-3 px-4 text-text-light dark:text-text-dark bg-surface-light dark:bg-surface-dark focus:ring-primary focus:border-primary ${
                            errors.phone 
                              ? 'border-red-500 dark:border-red-400 focus:ring-red-500 focus:border-red-500' 
                              : 'border-border-light dark:border-border-dark'
                          }`}
                          required
                        />
                        {errors.phone && (
                          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.phone}</p>
                        )}
                      </div>
                    </div>
                  
                    <div>
                      <label className="block text-sm font-medium text-text-light dark:text-text-dark mb-2" htmlFor="message">
                        {t('contact.form.fields.message.label')}
                      </label>
                      <div className="mt-1">
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          placeholder={t('contact.form.fields.message.placeholder')}
                          rows={5}
                          className="w-full rounded-lg border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark focus:ring-primary focus:border-primary transition duration-150 ease-in-out text-lg py-3 px-4 text-text-light dark:text-text-dark"
                        />
                      </div>
                    </div>
                  
                  <div className="flex justify-center pt-4">
                    <button
                      type="button"
                      onClick={handleWhatsAppClick}
                      className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-lg text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-surface-light dark:focus:ring-offset-surface-dark focus:ring-green-500 dark:bg-green-900/50 dark:text-green-300 dark:hover:bg-green-900/80 transition-all"
                    >
                      <svg className="mr-3" fill="currentColor" height="24" viewBox="0 0 256 256" width="24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M187.58,144.84l-32-16a8,8,0,0,0-8,.5l-14.69,9.8a40.55,40.55,0,0,1-16-16l9.8-14.69a8,8,0,0,0,.5-8l-16-32A8,8,0,0,0,104,64a40,40,0,0,0-40,40,88.1,88.1,0,0,0,88,88,40,40,0,0,0,40-40A8,8,0,0,0,187.58,144.84ZM152,176a72.08,72.08,0,0,1-72-72A24,24,0,0,1,99.29,80.46l11.48,23L101,118a8,8,0,0,0-.73,7.51,56.47,56.47,0,0,0,30.15,30.15A8,8,0,0,0,138,155l14.61-9.74,23,11.48A24,24,0,0,1,152,176ZM128,24A104,104,0,0,0,36.18,176.88L24.83,210.93a16,16,0,0,0,20.24,20.24l34.05-11.35A104,104,0,1,0,128,24Zm0,192a87.87,87.87,0,0,1-44.06-11.81,8,8,0,0,0-6.54-.67L40,216,52.47,178.6a8,8,0,0,0-.66-6.54A88,88,0,1,1,128,216Z"></path>
                      </svg>
                      {t('contact.form.whatsappText')}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information */}
                <div className="space-y-8 lg:col-span-2">
                  <h2 className="text-3xl font-bold text-text-light dark:text-text-dark">{t('contact.contactInfo.title')}</h2>
              
              {/* Map */}
              <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden shadow-lg">
                <div 
                  className="w-full h-full bg-center bg-no-repeat bg-cover"
                  style={{
                    backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuA9prhw4wvpYVg0tpBkFsyUVjW5AfduHCSytr2qBFxByynYXfVCG2TGSbU7t_P7kuZTz5V65SgZ2ki-uSoMNNJ0PzyD0WbSWqjkuRpLxNgCnVCZVhdOu-iRqm90GvVXS0226Ho1KwG0UuwXCuUFK1NefpCuT3h3vesPkzpGGoJMhnm31je0r23t9D7N5O2-KuevWmX95l1YwgqBys8tjZdZeZu-ZRARtjfJEshertvniikaYq1gT1WdvtLVRikrVNYGBDOFpO2JXA")`
                  }}
                />
              </div>
              
              {/* Contact Details */}
              <div className="space-y-6 text-subtle-light dark:text-subtle-dark">
                    <div className="flex items-start gap-4">
                      <span className="material-symbols-outlined text-primary mt-1 text-2xl">location_on</span>
                      <div>
                        <h3 className="font-semibold text-text-light dark:text-text-dark text-lg">{t('contact.contactInfo.address.title')}</h3>
                        <p className="text-lg">{t('contact.contactInfo.address.value')}</p>
                      </div>
                    </div>
                
                    <div className="flex items-start gap-4">
                      <span className="material-symbols-outlined text-primary mt-1 text-2xl">email</span>
                      <div>
                        <h3 className="font-semibold text-text-light dark:text-text-dark text-lg">{t('contact.contactInfo.email.title')}</h3>
                    <a 
                      href={`mailto:${t('contact.contactInfo.email.value')}`}
                      className="hover:text-primary transition-colors text-lg"
                    >
                      {t('contact.contactInfo.email.value')}
                    </a>
                  </div>
                </div>
                
                    <div className="flex items-start gap-4">
                      <span className="material-symbols-outlined text-primary mt-1 text-2xl">call</span>
                      <div>
                        <h3 className="font-semibold text-text-light dark:text-text-dark text-lg">{t('contact.contactInfo.phone.title')}</h3>
                    <a 
                      href={`tel:${t('contact.contactInfo.phone.value')}`}
                      className="hover:text-primary transition-colors text-lg"
                    >
                      {t('contact.contactInfo.phone.value')}
                    </a>
                  </div>
                </div>
                
                    <div className="flex items-start gap-4">
                      <span className="material-symbols-outlined text-primary mt-1 text-2xl">chat</span>
                      <div>
                        <h3 className="font-semibold text-text-light dark:text-text-dark text-lg">{t('contact.contactInfo.whatsapp.title')}</h3>
                    <button 
                      onClick={handleWhatsAppClick}
                      className="hover:text-primary transition-colors text-lg text-left"
                    >
                      {t('contact.contactInfo.whatsapp.value')}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};