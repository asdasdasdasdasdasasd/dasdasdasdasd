import React, { useState, useEffect } from 'react';
import { X, Mail, Percent, Gift, Star, Clock, Sparkles } from 'lucide-react';

interface CouponPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onEmailSubmit: (email: string) => void;
}

const CouponPopup: React.FC<CouponPopupProps> = ({ isOpen, onClose, onEmailSubmit }) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes in seconds

  useEffect(() => {
    if (!isOpen) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      onEmailSubmit(email);
      setIsSubmitting(false);
      onClose();
    }, 1000);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm animate-fadeIn" />
      
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="relative w-full max-w-lg">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute -top-4 -right-4 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors duration-200 hover:scale-110 transform"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden animate-fadeInUp">
            {/* Header with gradient and sparkles */}
            <div className="bg-gradient-to-br from-purple-600 via-pink-600 to-red-600 text-white p-8 text-center relative overflow-hidden">
              {/* Animated background elements */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-4 left-4 animate-bounce">
                  <Sparkles className="h-6 w-6" />
                </div>
                <div className="absolute top-8 right-8 animate-bounce animation-delay-300">
                  <Star className="h-4 w-4" />
                </div>
                <div className="absolute bottom-6 left-8 animate-bounce animation-delay-500">
                  <Gift className="h-5 w-5" />
                </div>
                <div className="absolute bottom-4 right-6 animate-bounce animation-delay-700">
                  <Percent className="h-4 w-4" />
                </div>
              </div>
              
              <div className="relative z-10">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                  <Gift className="h-10 w-10 text-white" />
                </div>
                
                <h2 className="text-3xl font-bold mb-2">🎉 EXCLUSIVE OFFER!</h2>
                <div className="text-5xl font-black mb-2 text-yellow-300">10% OFF</div>
                <p className="text-white/90 text-lg mb-4">Your First SYMORA Purchase</p>
                
                {/* Timer with pulsing effect */}
                <div className="inline-flex items-center bg-red-600 text-white px-6 py-3 rounded-full text-lg font-bold animate-pulse shadow-lg">
                  <Clock className="h-5 w-5 mr-2" />
                  Expires in: {formatTime(timeLeft)}
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Don't Miss Out! 🔥
                </h3>
                
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 bg-green-50 rounded-xl">
                    <Percent className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <div className="text-sm font-semibold text-green-800">10% Discount</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-xl">
                    <Star className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <div className="text-sm font-semibold text-blue-800">Free Shipping</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-xl">
                    <Gift className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                    <div className="text-sm font-semibold text-purple-800">Exclusive Access</div>
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm leading-relaxed">
                  Join <span className="font-bold text-purple-600">12,847</span> happy customers who've already 
                  improved their posture with SYMORA. Get instant access to your discount code!
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email for instant 10% OFF"
                    required
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-lg"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !email}
                  className={`w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 px-6 rounded-xl font-bold text-lg transition-all duration-200 shadow-lg ${
                    isSubmitting || !email
                      ? 'opacity-50 cursor-not-allowed'
                      : 'hover:from-purple-700 hover:to-pink-700 hover:scale-[1.02] transform hover:shadow-xl'
                  }`}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Getting your discount...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <Gift className="h-5 w-5 mr-2" />
                      CLAIM MY 10% DISCOUNT NOW!
                    </div>
                  )}
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-xs text-gray-500 mb-4">
                  By signing up, you agree to receive exclusive offers. Unsubscribe anytime.
                </p>
                
                {/* Social proof */}
                <div className="flex items-center justify-center space-x-6 text-xs text-gray-400">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span>No spam ever</span>
                  </div>
                  <div>•</div>
                  <div>Instant delivery</div>
                  <div>•</div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-3 w-3 text-yellow-500" />
                    <span>12,847 subscribers</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CouponPopup;