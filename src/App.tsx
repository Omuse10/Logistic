import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import TrackingPage from './pages/TrackingPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

// Page transition wrapper
const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <AnimatePresence mode="wait">
      {children}
    </AnimatePresence>
  );
};

// ScrollToTop component
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Layout component
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  );
};

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingComplete, setLoadingComplete] = useState(false);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const handleLoadingComplete = () => {
    setLoadingComplete(true);
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && !loadingComplete && (
          <LoadingScreen onComplete={handleLoadingComplete} />
        )}
      </AnimatePresence>

      <BrowserRouter>
        <ScrollToTop />
        <Layout>
          <PageWrapper>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/tracking" element={<TrackingPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </PageWrapper>
        </Layout>
      </BrowserRouter>
    </>
  );
}

export default App;
