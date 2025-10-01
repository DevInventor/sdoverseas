import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { MainLayout } from './components/layout/MainLayout';
import { PageContainer } from './components/layout/PageContainer';
import { PageTransitionLoader } from './components/ui/PageTransitionLoader';
import { ROUTES } from './constants';
import { useScrollToTop } from './hooks/useScrollToTop';

// Import page components
import { HomeFinal } from './pages/HomeFinal';
import { About } from './pages/About';
import { Products } from './pages/Products';
import { ProductDetail } from './pages/ProductDetail';
import { Services } from './pages/Services';
import { Contact } from './pages/Contact';


const Testimonials = () => (
  <PageContainer>
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">Testimonials</h1>
      <p>Testimonials page coming soon...</p>
    </div>
  </PageContainer>
);

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Router basename="/sdoverseas">
          <AppContent />
        </Router>
      </LanguageProvider>
    </ThemeProvider>
  );
}

function AppContent() {
  // Automatically scroll to top on route changes
  useScrollToTop();

  return (
    <>
      <PageTransitionLoader />
      <MainLayout>
        <Routes>
          {/* Main Pages */}
          <Route path="/" element={<HomeFinal />} />
          <Route path={ROUTES.ABOUT} element={<About />} />
          <Route path={ROUTES.PRODUCTS} element={<Products />} />
          <Route path={ROUTES.PRODUCT_DETAIL} element={<ProductDetail />} />
          <Route path={ROUTES.SERVICES} element={<Services />} />
          <Route path={ROUTES.CONTACT} element={<Contact />} />
          <Route path={ROUTES.TESTIMONIALS} element={<Testimonials />} />
          
          
          {/* Catch all route */}
          <Route path="*" element={<HomeFinal />} />
        </Routes>
      </MainLayout>
    </>
  );
}

export default App;
