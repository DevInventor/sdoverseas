import React from 'react';
import { Link } from 'react-router-dom';
import { COMPANY_INFO, ROUTES } from '../../constants';
import { Facebook, Twitter, Linkedin, Instagram, MessageCircle } from 'lucide-react';

const footerLinks = [
  { name: 'Home', href: '/' },
  { name: 'About Us', href: ROUTES.ABOUT },
  { name: 'Products', href: ROUTES.PRODUCTS },
  { name: 'Services', href: ROUTES.SERVICES },
];

const supportLinks = [
  { name: 'Contact Us', href: ROUTES.CONTACT },
  { name: 'FAQs', href: '/faq' },
  { name: 'Privacy Policy', href: '/privacy' },
  { name: 'Terms of Service', href: '/terms' },
];

export const Footer: React.FC = () => {
  // Format phone number for WhatsApp (remove all non-digits)
  const whatsappNumber = COMPANY_INFO.contact.whatsapp.replace(/\D/g, '');
  
  return (
    <footer className="bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 bg-primary rounded-lg flex items-center justify-center">
                <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" />
                  <path d="M2 17L12 22L22 17" />
                  <path d="M2 12L12 17L22 12" />
                </svg>
              </div>
              <span className="text-2xl font-bold text-slate-900 dark:text-white">
                {COMPANY_INFO.name}
              </span>
            </Link>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6 max-w-md">
              Your trusted partner in the global spice trade. Delivering quality and flavor worldwide with premium Indian spices.
            </p>
            
            {/* Social Media Icons */}
            <div className="flex gap-3">
              <a 
                href={COMPANY_INFO.social.facebook} 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Follow us on Facebook"
                className="h-10 w-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-primary/10 hover:text-primary dark:hover:bg-primary/20 transition-all duration-200 hover:scale-110"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href={COMPANY_INFO.social.twitter} 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Follow us on Twitter"
                className="h-10 w-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-primary/10 hover:text-primary dark:hover:bg-primary/20 transition-all duration-200 hover:scale-110"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href={COMPANY_INFO.social.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Connect with us on LinkedIn"
                className="h-10 w-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-primary/10 hover:text-primary dark:hover:bg-primary/20 transition-all duration-200 hover:scale-110"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a 
                href={COMPANY_INFO.social.instagram} 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Follow us on Instagram"
                className="h-10 w-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-primary/10 hover:text-primary dark:hover:bg-primary/20 transition-all duration-200 hover:scale-110"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-slate-600 hover:text-primary dark:text-slate-400 dark:hover:text-primary transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Support</h3>
            <ul className="space-y-3 text-sm">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-slate-600 hover:text-primary dark:text-slate-400 dark:hover:text-primary transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Get in Touch</h3>
            <div className="space-y-4">
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat with us on WhatsApp"
                className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[#25D366] text-white font-semibold hover:bg-[#20BA5A] focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2 transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <MessageCircle className="h-5 w-5" />
                <span>Chat on WhatsApp</span>
              </a>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                <p className="mb-1">
                  <span className="font-medium">Email:</span> {COMPANY_INFO.contact.email}
                </p>
                <p>
                  <span className="font-medium">Phone:</span> {COMPANY_INFO.contact.phone}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
          <div className="text-center text-sm text-slate-500 dark:text-slate-400">
            <p>© {new Date().getFullYear()} {COMPANY_INFO.name}. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
