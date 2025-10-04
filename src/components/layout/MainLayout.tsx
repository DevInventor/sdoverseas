import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { WhatsAppFloatingButton } from './WhatsAppFloatingButton';
import { TopbarBanner } from './TopbarBanner';

interface MainLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children, className = '' }) => {
  return (
    <div className={`min-h-screen flex flex-col bg-background-light dark:bg-background-dark ${className}`}>
      <TopbarBanner />
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <WhatsAppFloatingButton />
    </div>
  );
};
