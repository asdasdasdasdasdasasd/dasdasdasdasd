import React, { useState, useEffect } from 'react';
import { ShoppingBag, X, MapPin } from 'lucide-react';

interface SalesData {
  name: string;
  location: string;
  product: string;
  timeAgo: string;
}

const SalesNotification: React.FC = () => {
  const [currentSale, setCurrentSale] = useState<SalesData | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const salesData: SalesData[] = [
    { name: 'Emma', location: 'Amsterdam, NL', product: 'SYMORA Posture Corrector Pro', timeAgo: '2 minutes ago' },
    { name: 'Lucas', location: 'Berlin, DE', product: 'SYMORA Neck Stretcher Elite', timeAgo: '5 minutes ago' },
    { name: 'Sophie', location: 'Paris, FR', product: 'SYMORA Recovery Massage Tool', timeAgo: '8 minutes ago' },
    { name: 'Marco', location: 'Rome, IT', product: 'SYMORA Alignment Support', timeAgo: '12 minutes ago' },
    { name: 'Anna', location: 'Vienna, AT', product: 'SYMORA Posture Corrector Pro', timeAgo: '15 minutes ago' },
    { name: 'David', location: 'Brussels, BE', product: 'SYMORA Neck Stretcher Elite', timeAgo: '18 minutes ago' },
    { name: 'Maria', location: 'Madrid, ES', product: 'SYMORA Recovery Massage Tool', timeAgo: '22 minutes ago' },
    { name: 'Thomas', location: 'Munich, DE', product: 'SYMORA Alignment Support', timeAgo: '25 minutes ago' },
  ];

  useEffect(() => {
    const showNotification = () => {
      const randomSale = salesData[Math.floor(Math.random() * salesData.length)];
      setCurrentSale(randomSale);
      setIsAnimating(true);
      
      // Smooth fade in
      setTimeout(() => {
        setIsVisible(true);
      }, 50);

      // Smooth fade out after 5 seconds
      setTimeout(() => {
        setIsVisible(false);
        // Wait for fade out animation to complete before hiding
        setTimeout(() => {
          setIsAnimating(false);
          setCurrentSale(null);
        }, 500);
      }, 5000);
    };

    // Show first notification after 3 seconds
    const initialTimer = setTimeout(showNotification, 3000);

    // Then show every 15-25 seconds
    const interval = setInterval(() => {
      const randomDelay = Math.random() * 10000 + 15000; // 15-25 seconds
      setTimeout(showNotification, randomDelay);
    }, 25000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      setIsAnimating(false);
      setCurrentSale(null);
    }, 500);
  };

  if (!currentSale || !isAnimating) return null;

  return (
    <div className={`fixed bottom-6 left-6 z-50 max-w-sm transition-all duration-500 ease-out transform ${
      isVisible 
        ? 'translate-y-0 opacity-100 scale-100' 
        : 'translate-y-8 opacity-0 scale-95'
    }`}>
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 backdrop-blur-sm">
        <div className="flex items-start space-x-3">
          <div className="w-10 h-10 bg-emerald-50 rounded-full flex items-center justify-center flex-shrink-0">
            <ShoppingBag className="h-5 w-5 text-emerald-600" />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <p className="text-sm font-semibold text-gray-900">{currentSale.name} just purchased</p>
              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200 p-1 hover:bg-gray-100 rounded-full"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            
            <p className="text-sm text-gray-600 mb-2 line-clamp-1">{currentSale.product}</p>
            
            <div className="flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center space-x-1">
                <MapPin className="h-3 w-3" />
                <span>{currentSale.location}</span>
              </div>
              <span>{currentSale.timeAgo}</span>
            </div>
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="mt-3 w-full bg-gray-100 rounded-full h-1">
          <div className="bg-emerald-500 h-1 rounded-full transition-all duration-1000 ease-out" style={{ width: '75%' }}></div>
        </div>
      </div>
    </div>
  );
};

export default SalesNotification;