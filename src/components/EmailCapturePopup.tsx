import React, { useState, useEffect } from 'react';
import { X, Mail, Gift, Star, Clock } from 'lucide-react';

interface EmailCapturePopupProps {
  isOpen: boolean;
  onClose: () => void;
  onEmailSubmit: (email: string) => void;
}

const EmailCapturePopup: React.FC<EmailCapturePopupProps> = ({ isOpen, onClose, onEmailSubmit }) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds

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
      <div className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm transition-opacity duration-300" />
      
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="relative w-full max-w-md transform transition-all duration-300 scale-100">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute -top-4 -right-4 z-10 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors duration-200 hover:scale-110 transform"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-slate-800 to-gray-800 text-white p-6 text-center relative overflow-hidden">
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/20 to-transparent"></div>
              </div>
              
              <div className="relative z-10">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Gift className="h-8 w-8 text-white" />
                </div>
                
                <h2 className="text-2xl font-bold mb-2">Exclusive Offer!</h2>
                <p className="text-white/90 text-lg">Get 10% OFF your first order</p>
                
                {/* Timer */}
                <div className="mt-4 inline-flex items-center bg-slate-700 text-white px-4 py-2 rounded-full text-sm font-medium">
                  <Clock className="h-4 w-4 mr-2" />
                  Limited time: {formatTime(timeLeft)}
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="text-center mb-6">
                <div className="flex items-center justify-center space-x-4 mb-4">
                  <div className="flex items-center space-x-1 text-emerald-600">
                    <Gift className="h-4 w-4" />
                    <span className="text-sm font-medium">10% Discount</span>
                  </div>
                  <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                  <div className="flex items-center space-x-1 text-slate-600">
                    <Star className="h-4 w-4" />
                    <span className="text-sm font-medium">Free Shipping</span>
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm leading-relaxed">
                  Join thousands of satisfied customers and save on your first SYMORA purchase. 
                  Plus get exclusive access to new products and wellness tips!
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all duration-200 text-sm"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !email}
                  className={`w-full bg-slate-800 text-white py-3 px-6 rounded-lg font-medium transition-all duration-200 ${
                    isSubmitting || !email
                      ? 'opacity-50 cursor-not-allowed'
                      : 'hover:bg-slate-700 hover:scale-[1.02] transform'
                  }`}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Getting your discount...
                    </div>
                  ) : (
                    'Claim My 10% Discount'
                  )}
                </button>
              </form>

              <div className="mt-4 text-center">
                <p className="text-xs text-gray-500">
                  By signing up, you agree to receive marketing emails. Unsubscribe anytime.
                </p>
              </div>

              {/* Trust indicators */}
              <div className="mt-4 flex items-center justify-center space-x-4 text-xs text-gray-400">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  <span>No spam</span>
                </div>
                <div>•</div>
                <div>Instant discount</div>
                <div>•</div>
                <div>10,000+ subscribers</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailCapturePopup;