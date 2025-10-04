import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Icon } from '../common';

export const ContactHeader: React.FC = () => {
  const { t } = useLanguage();

  const handleWhatsAppClick = () => {
    const phoneNumber = t('contact.contactInfo.phone.value').replace(/\s/g, '');
    const message = encodeURIComponent(t('contact.form.defaultWhatsAppMessage'));
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <div className="bg-gradient-to-r from-orange-600 via-orange-500 to-red-500 text-white py-1 px-4 shadow-lg">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-3 lg:gap-6">
          {/* Contact Details */}
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-5 text-sm">
            {/* Phone */}
            <div 
              className="flex items-center gap-2 hover:text-orange-200 transition-all duration-200 cursor-pointer group"
              onClick={handleWhatsAppClick}
            >
              <div className="bg-white/25 p-2 rounded-lg group-hover:bg-white/35 transition-colors duration-200">
                <Icon name="phone" size="sm" color="white" />
              </div>
              <span className="font-semibold group-hover:underline">{t('contact.contactInfo.phone.value')}</span>
            </div>
            
            {/* Email */}
            <div className="flex items-center gap-2 hover:text-orange-200 transition-all duration-200 group">
              <div className="bg-white/25 p-2 rounded-lg group-hover:bg-white/35 transition-colors duration-200">
                <Icon name="email" size="sm" color="white" />
              </div>
              <span className="font-semibold">{t('contact.contactInfo.email.value')}</span>
            </div>
            
            {/* Location */}
            <div className="flex items-center gap-2 hover:text-orange-200 transition-all duration-200 group">
              <div className="bg-white/25 p-2 rounded-lg group-hover:bg-white/35 transition-colors duration-200">
                <Icon name="location_on" size="sm" color="white" />
              </div>
              <span className="font-semibold">{t('contact.contactInfo.address.value')}</span>
            </div>
          </div>

          {/* Slogan */}
          <div className="text-right">
            <div className="text-lg font-bold text-white/95 tracking-wide">
              Taste the world with us
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
