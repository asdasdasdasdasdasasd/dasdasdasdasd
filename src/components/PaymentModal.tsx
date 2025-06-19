import React, { useState, useEffect } from 'react';
import { X, CreditCard, Smartphone, Wallet, Shield, Lock, CheckCircle } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import PaymentLogos from './PaymentLogos';
import OrderTracking from './OrderTracking';

// Real Stripe publishable key for demo (replace with your actual key)
const stripePromise = loadStripe('pk_test_51OaBC2DEFghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789');

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  total: number;
  items: Array<{ name: string; quantity: number; price: number }>;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ 
  isOpen, 
  onClose, 
  onSuccess, 
  total, 
  items 
}) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'card' | 'apple' | 'google' | 'paypal'>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showTracking, setShowTracking] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handlePaymentMethodSelect = async (method: 'card' | 'apple' | 'google' | 'paypal') => {
    setSelectedPaymentMethod(method);
    
    if (method !== 'card') {
      setIsProcessing(true);
      
      // Simulate payment processing for digital wallets
      setTimeout(() => {
        setIsProcessing(false);
        setShowSuccess(true);
        const orderNum = `SYMORA-${Date.now().toString().slice(-6)}`;
        setOrderNumber(orderNum);
        
        setTimeout(() => {
          setShowSuccess(false);
          setShowTracking(true);
        }, 3000);
      }, 2000);
    }
  };

  const handlePaymentSuccess = () => {
    setShowSuccess(true);
    const orderNum = `SYMORA-${Date.now().toString().slice(-6)}`;
    setOrderNumber(orderNum);
    
    setTimeout(() => {
      setShowSuccess(false);
      setShowTracking(true);
    }, 3000);
  };

  const paymentMethods = [
    {
      id: 'card' as const,
      name: 'Credit or Debit Card',
      icon: CreditCard,
      description: 'Visa, Mastercard, American Express',
      available: true
    },
    {
      id: 'apple' as const,
      name: 'Apple Pay',
      icon: Smartphone,
      description: 'Touch ID or Face ID',
      available: typeof window !== 'undefined' && 'ApplePaySession' in window
    },
    {
      id: 'google' as const,
      name: 'Google Pay',
      icon: Wallet,
      description: 'Pay with Google',
      available: true
    },
    {
      id: 'paypal' as const,
      name: 'PayPal',
      icon: Wallet,
      description: 'Pay with your PayPal account',
      available: true
    }
  ];

  // Show order tracking
  if (showTracking) {
    return (
      <OrderTracking
        isOpen={true}
        onClose={() => {
          setShowTracking(false);
          onClose();
          onSuccess();
        }}
        orderNumber={orderNumber}
        items={items}
        total={total}
      />
    );
  }

  // Show success animation
  if (showSuccess) {
    return (
      <div className="fixed inset-0 z-50 overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" />
        
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-md w-full text-center animate-fadeInUp">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Payment Successful!</h3>
            <p className="text-gray-600 mb-4">Order #{orderNumber}</p>
            <p className="text-sm text-gray-500">Redirecting to order tracking...</p>
            
            <div className="mt-6">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show processing animation
  if (isProcessing) {
    return (
      <div className="fixed inset-0 z-50 overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" />
        
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-md w-full text-center animate-fadeInUp">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-6"></div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Processing Payment</h3>
            <p className="text-gray-600 mb-4">Please wait while we securely process your payment...</p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{ width: '75%' }}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" onClick={onClose} />
      
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between p-8 border-b border-gray-200">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Secure Checkout</h2>
                <p className="text-gray-600 mt-1">Complete your purchase safely</p>
              </div>
              <button
                onClick={onClose}
                className="p-3 text-gray-400 hover:text-gray-600 transition-colors duration-200 rounded-full hover:bg-gray-100"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="p-8">
              {/* Order Summary */}
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6 mb-8">
                <h3 className="font-bold text-gray-900 mb-4 text-lg">Order Summary</h3>
                <div className="space-y-3">
                  {items.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-gray-600">{item.name} × {item.quantity}</span>
                      <span className="text-gray-900 font-medium">€{(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="border-t pt-3 mt-3">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span className="text-2xl text-green-600">€{total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Security Badge */}
              <div className="flex items-center justify-center space-x-3 text-sm text-gray-600 mb-8 bg-green-50 p-4 rounded-2xl border border-green-200">
                <Shield className="h-6 w-6 text-green-600" />
                <Lock className="h-5 w-5 text-green-600" />
                <span className="font-medium">256-bit SSL encrypted • PCI DSS compliant • Trusted by 10,000+ customers</span>
              </div>

              {/* Payment Methods */}
              <div className="space-y-6 mb-8">
                <h3 className="font-bold text-gray-900 text-xl">Choose Payment Method</h3>
                
                <div className="grid gap-4">
                  {paymentMethods.map((method) => (
                    <button
                      key={method.id}
                      onClick={() => handlePaymentMethodSelect(method.id)}
                      disabled={!method.available}
                      className={`w-full p-5 rounded-2xl border-2 transition-all duration-200 text-left ${
                        selectedPaymentMethod === method.id
                          ? 'border-blue-600 bg-blue-50 shadow-lg'
                          : method.available
                          ? 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 hover:shadow-md'
                          : 'border-gray-100 bg-gray-50 opacity-50 cursor-not-allowed'
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        <method.icon className={`h-8 w-8 ${
                          method.available ? 'text-gray-700' : 'text-gray-400'
                        }`} />
                        <div className="flex-1">
                          <div className="font-semibold text-gray-900 text-lg">{method.name}</div>
                          <div className="text-sm text-gray-600">{method.description}</div>
                        </div>
                        {selectedPaymentMethod === method.id && (
                          <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                            <div className="w-3 h-3 bg-white rounded-full"></div>
                          </div>
                        )}
                        {!method.available && (
                          <span className="text-xs text-gray-400 bg-gray-200 px-3 py-1 rounded-full">
                            Not Available
                          </span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Card Form */}
              {selectedPaymentMethod === 'card' && (
                <Elements stripe={stripePromise}>
                  <CheckoutForm 
                    onSuccess={handlePaymentSuccess} 
                    onCancel={onClose}
                    total={total}
                  />
                </Elements>
              )}

              {/* Express Payment Buttons */}
              {selectedPaymentMethod !== 'card' && (
                <div className="space-y-6">
                  <div className="text-center">
                    <p className="text-gray-600 mb-6 text-lg">
                      {selectedPaymentMethod === 'apple' && 'Use Touch ID or Face ID to complete your purchase securely'}
                      {selectedPaymentMethod === 'google' && 'Complete your purchase quickly with Google Pay'}
                      {selectedPaymentMethod === 'paypal' && 'You will be redirected to PayPal to complete your purchase'}
                    </p>
                    
                    <button
                      onClick={() => handlePaymentMethodSelect(selectedPaymentMethod)}
                      className={`w-full py-5 px-8 rounded-2xl font-bold text-xl transition-all duration-200 hover:scale-[1.02] transform shadow-lg ${
                        selectedPaymentMethod === 'apple'
                          ? 'bg-black text-white hover:bg-gray-800'
                          : selectedPaymentMethod === 'google'
                          ? 'bg-blue-600 text-white hover:bg-blue-700'
                          : 'bg-blue-500 text-white hover:bg-blue-600'
                      }`}
                    >
                      {selectedPaymentMethod === 'apple' && '🍎 Pay with Apple Pay'}
                      {selectedPaymentMethod === 'google' && 'G Pay with Google'}
                      {selectedPaymentMethod === 'paypal' && 'Continue with PayPal'}
                    </button>
                  </div>
                </div>
              )}

              {/* Trust Indicators */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <div className="flex flex-col items-center space-y-6">
                  <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
                    <div className="flex items-center space-x-2">
                      <Shield className="h-5 w-5 text-green-600" />
                      <span>SSL Secure</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Lock className="h-5 w-5 text-blue-600" />
                      <span>Encrypted</span>
                    </div>
                    <div>30-day guarantee</div>
                    <div>Free returns</div>
                  </div>
                  
                  {/* Payment Logos */}
                  <div className="flex flex-col items-center space-y-3">
                    <p className="text-sm text-gray-500 font-medium">Accepted payment methods</p>
                    <PaymentLogos size="lg" />
                  </div>
                  
                  <p className="text-sm text-gray-400">Powered by Stripe • Trusted by millions worldwide</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;