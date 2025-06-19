import React, { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import HomePage from './components/HomePage';
import ProductPage from './components/ProductPage';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import SuccessPage from './components/SuccessPage';
import Cart from './components/Cart';
import EmailCapturePopup from './components/EmailCapturePopup';
import { CartProvider } from './context/CartContext';
import { Product } from './types';
import { products } from './data/products';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showEmailPopup, setShowEmailPopup] = useState(false);
  const [hasSeenEmailPopup, setHasSeenEmailPopup] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [discountApplied, setDiscountApplied] = useState(false);

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    setSelectedProduct(null);
  };

  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentPage('product');
  };

  const handleBackFromProduct = () => {
    setSelectedProduct(null);
    setCurrentPage('home');
  };

  const handleContinueShopping = () => {
    setCurrentPage('home');
  };

  // Email popup logic - show after 25-40 seconds if not seen before
  useEffect(() => {
    const hasSeenBefore = localStorage.getItem('symora-email-popup-seen');
    const savedEmail = localStorage.getItem('symora-user-email');
    const savedDiscount = localStorage.getItem('symora-discount-applied');
    
    if (savedEmail) {
      setUserEmail(savedEmail);
    }
    
    if (savedDiscount) {
      setDiscountApplied(true);
    }
    
    if (!hasSeenBefore && !savedEmail) {
      // Random delay between 25-40 seconds
      const delay = Math.random() * 15000 + 25000;
      const timer = setTimeout(() => {
        setShowEmailPopup(true);
      }, delay);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleEmailSubmit = (email: string) => {
    setUserEmail(email);
    setHasSeenEmailPopup(true);
    setDiscountApplied(true);
    localStorage.setItem('symora-email-popup-seen', 'true');
    localStorage.setItem('symora-user-email', email);
    localStorage.setItem('symora-discount-code', 'SAVE10');
    localStorage.setItem('symora-discount-applied', 'true');
    
    // Show success toast
    import('react-hot-toast').then(({ default: toast }) => {
      toast.success('🎉 Success! Your 10% discount code SAVE10 is ready to use!', {
        duration: 5000,
        position: 'top-center',
        style: {
          background: '#059669',
          color: 'white',
          fontWeight: 'bold',
          padding: '16px',
          borderRadius: '12px',
        },
      });
    });
  };

  const handleCloseEmailPopup = () => {
    setShowEmailPopup(false);
    setHasSeenEmailPopup(true);
    localStorage.setItem('symora-email-popup-seen', 'true');
  };

  // Listen for success page navigation
  useEffect(() => {
    const handleNavigateToSuccess = () => {
      setCurrentPage('success');
    };

    window.addEventListener('navigate-to-success', handleNavigateToSuccess);
    
    return () => {
      window.removeEventListener('navigate-to-success', handleNavigateToSuccess);
    };
  }, []);

  const renderCurrentPage = () => {
    if (currentPage === 'success') {
      return <SuccessPage onContinueShopping={handleContinueShopping} />;
    }

    if (currentPage === 'product' && selectedProduct) {
      return <ProductPage product={selectedProduct} onBack={handleBackFromProduct} />;
    }

    if (currentPage === 'products') {
      return (
        <div className="min-h-screen bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 animate-fadeInUp">
              <h1 className="text-5xl font-bold text-gray-900 mb-6">Our Products</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Discover our complete range of posture correction and wellness products
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {products.map((product, index) => (
                <div
                  key={product.id}
                  className="animate-fadeInUp cursor-pointer"
                  style={{ animationDelay: `${index * 150}ms` }}
                  onClick={() => handleViewProduct(product)}
                >
                  <div className="group">
                    <div className="relative overflow-hidden rounded-lg bg-gray-50 aspect-square mb-4">
                      {/* Product badges */}
                      <div className="absolute top-2 left-2 z-10 flex flex-col space-y-1">
                        {product.originalPrice && product.originalPrice > product.price && (
                          <div className="bg-slate-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                            {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                          </div>
                        )}
                        {product.isBestSeller && (
                          <div className="bg-amber-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                            BEST SELLER
                          </div>
                        )}
                      </div>

                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      
                      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                      
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="text-white text-sm font-medium bg-black bg-opacity-50 px-4 py-2 rounded-full">
                          View Product
                        </span>
                      </div>
                    </div>

                    <div className="text-center space-y-2">
                      <h3 className="text-lg font-medium text-gray-900 group-hover:text-gray-700 transition-colors duration-200">
                        {product.name}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-2">{product.description}</p>
                      <div className="flex items-center justify-center space-x-2">
                        {product.originalPrice && product.originalPrice > product.price && (
                          <span className="text-sm text-gray-500 line-through">€{product.originalPrice.toFixed(2)}</span>
                        )}
                        <span className="text-xl font-semibold text-gray-900">€{product.price.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    switch (currentPage) {
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      default:
        return <HomePage onViewProduct={handleViewProduct} />;
    }
  };

  return (
    <CartProvider>
      <div className="min-h-screen bg-white">
        <Toaster />
        <Header currentPage={currentPage} onNavigate={handleNavigate} />
        <main className="w-full">{renderCurrentPage()}</main>
        <Cart />
        
        {/* Email Capture Popup */}
        <EmailCapturePopup
          isOpen={showEmailPopup}
          onClose={handleCloseEmailPopup}
          onEmailSubmit={handleEmailSubmit}
        />
      </div>
    </CartProvider>
  );
}

export default App;