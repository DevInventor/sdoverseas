import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Facebook, Instagram, Linkedin, Twitter, Youtube, Mail, MessageCircle } from 'lucide-react';

export const TopbarBanner: React.FC = () => {
  const { t } = useLanguage();

  // Get social media links from config (similar to HomeFinal.tsx approach)
  const socialMediaData = Array.isArray(t('social-media.socialMedia')) 
    ? t('social-media.socialMedia') as any[]
    : [];
  
  // Icon mapping for dynamic icon rendering
  const iconMap: Record<string, any> = {
    facebook: Facebook,
    instagram: Instagram,
    linkedin: Linkedin,
    twitter: Twitter,
    youtube: Youtube,
  };

  const handleEmailClick = () => {
    window.location.href = `mailto:${t('contact.contactInfo.email.value')}`;
  };

  const handleWhatsAppClick = () => {
    const phoneNumber = t('contact.contactInfo.whatsapp.value').replace(/\D/g, '');
    const message = encodeURIComponent(t('contact.form.defaultWhatsAppMessage'));
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <div className="bg-slate-900 text-white py-2 px-4 text-xs">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          {/* Left: Social Media Icons */}
          <div className="flex items-center gap-3">
            {socialMediaData.map((social: any) => {
              const IconComponent = iconMap[social.icon];
              if (!IconComponent) return null;
              
              return (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.ariaLabel}
                  className="w-6 h-6 flex items-center justify-center text-white/80 hover:text-white hover:scale-110 transition-all duration-200"
                >
                  <IconComponent className="w-4 h-4" />
                </a>
              );
            })}
          </div>

          {/* Center: Company Tagline */}
          <div className="hidden sm:block flex-1 text-center px-4">
            <p className="text-white/90 font-medium tracking-wide">
              {t('contact.topbar.tagline')}
            </p>
          </div>

          {/* Right: Contact Email + Working Hours */}
          <div className="flex items-center gap-4">
            {/* Email */}
            <button
              onClick={handleEmailClick}
              className="flex items-center gap-1 text-white/90 hover:text-white transition-colors duration-200 group"
              aria-label={`Send email to ${t('contact.contactInfo.email.value')}`}
            >
              <Mail className="w-3 h-3 group-hover:scale-110 transition-transform duration-200" />
              <span className="hidden md:inline">{t('contact.contactInfo.email.value')}</span>
              <span className="md:hidden">Email</span>
            </button>

            {/* Separator */}
            <div className="hidden lg:block w-px h-4 bg-white/30"></div>

            {/* WhatsApp Number */}
            <button
              onClick={handleWhatsAppClick}
              className="flex items-center gap-1 text-white/90 hover:text-white transition-colors duration-200 group"
              aria-label={`Chat on WhatsApp: ${t('contact.contactInfo.whatsapp.value')}`}
            >
              <MessageCircle className="w-3 h-3 group-hover:scale-110 transition-transform duration-200" />
              <span className="hidden md:inline">{t('contact.contactInfo.whatsapp.value')}</span>
              <span className="md:hidden">WhatsApp</span>
            </button>
          </div>
        </div>

        {/* Mobile: Tagline below main content */}
        <div className="sm:hidden mt-2 text-center">
          <p className="text-white/80 font-medium text-xs tracking-wide">
            {t('contact.topbar.tagline')}
          </p>
        </div>
      </div>
    </div>
  );
};
