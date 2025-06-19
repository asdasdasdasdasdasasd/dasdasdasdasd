import React, { useState, useEffect } from 'react';
import { X, Package, Truck, CheckCircle, Clock, MapPin, Phone, Mail } from 'lucide-react';

interface OrderTrackingProps {
  isOpen: boolean;
  onClose: () => void;
  orderNumber: string;
  items: Array<{ name: string; quantity: number; price: number }>;
  total: number;
}

interface TrackingStep {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  status: 'completed' | 'current' | 'upcoming';
  timestamp?: string;
}

const OrderTracking: React.FC<OrderTrackingProps> = ({ 
  isOpen, 
  onClose, 
  orderNumber, 
  items, 
  total 
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [estimatedDelivery] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() + 3);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  });

  const trackingSteps: TrackingStep[] = [
    {
      id: 'confirmed',
      title: 'Order Confirmed',
      description: 'Your payment has been processed successfully',
      icon: CheckCircle,
      status: 'completed',
      timestamp: new Date().toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    },
    {
      id: 'processing',
      title: 'Processing Order',
      description: 'We\'re carefully preparing your items',
      icon: Package,
      status: 'current',
      timestamp: undefined
    },
    {
      id: 'shipped',
      title: 'Shipped',
      description: 'Your order is on its way to you',
      icon: Truck,
      status: 'upcoming',
      timestamp: undefined
    },
    {
      id: 'delivered',
      title: 'Delivered',
      description: 'Enjoy your SYMORA products!',
      icon: CheckCircle,
      status: 'upcoming',
      timestamp: undefined
    }
  ];

  useEffect(() => {
    if (!isOpen) return;

    // Simulate order progression
    const timer = setTimeout(() => {
      setCurrentStep(1);
    }, 2000);

    return () => clearTimeout(timer);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" />
      
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between p-8 border-b border-gray-200 bg-gradient-to-r from-green-50 to-blue-50">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Order Tracking</h2>
                <p className="text-gray-600 mt-1">Order #{orderNumber}</p>
              </div>
              <button
                onClick={onClose}
                className="p-3 text-gray-400 hover:text-gray-600 transition-colors duration-200 rounded-full hover:bg-white"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="p-8">
              {/* Order Status */}
              <div className="bg-white rounded-2xl border-2 border-gray-100 p-8 mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Order Status</h3>
                
                <div className="relative">
                  {/* Progress Line */}
                  <div className="absolute top-8 left-8 right-8 h-1 bg-gray-200 rounded-full">
                    <div 
                      className="h-full bg-gradient-to-r from-green-500 to-blue-500 rounded-full transition-all duration-1000"
                      style={{ width: `${((currentStep + 1) / trackingSteps.length) * 100}%` }}
                    ></div>
                  </div>
                  
                  {/* Steps */}
                  <div className="relative grid grid-cols-1 md:grid-cols-4 gap-8">
                    {trackingSteps.map((step, index) => (
                      <div key={step.id} className="text-center">
                        <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-500 ${
                          index <= currentStep
                            ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg' 
                            : index === currentStep + 1
                            ? 'bg-blue-100 text-blue-600 animate-pulse'
                            : 'bg-gray-200 text-gray-400'
                        }`}>
                          <step.icon className="h-8 w-8" />
                        </div>
                        
                        <h4 className={`font-bold mb-2 ${
                          index <= currentStep
                            ? 'text-gray-900'
                            : index === currentStep + 1
                            ? 'text-blue-600'
                            : 'text-gray-400'
                        }`}>
                          {step.title}
                        </h4>
                        
                        <p className={`text-sm mb-2 ${
                          index <= currentStep
                            ? 'text-gray-600'
                            : index === currentStep + 1
                            ? 'text-blue-600'
                            : 'text-gray-400'
                        }`}>
                          {step.description}
                        </p>
                        
                        {step.timestamp && (
                          <p className="text-xs text-gray-500">{step.timestamp}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Order Details */}
                <div className="bg-gray-50 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Order Details</h3>
                  <div className="space-y-3">
                    {items.map((item, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <div>
                          <p className="font-medium text-gray-900">{item.name}</p>
                          <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                        </div>
                        <p className="font-bold text-gray-900">€{(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}
                    <div className="border-t pt-3 mt-3">
                      <div className="flex justify-between items-center font-bold text-lg">
                        <span>Total</span>
                        <span className="text-green-600">€{total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Shipping Info */}
                <div className="bg-blue-50 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Shipping Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Clock className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="font-medium text-gray-900">Estimated Delivery</p>
                        <p className="text-sm text-gray-600">{estimatedDelivery}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Truck className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="font-medium text-gray-900">Shipping Method</p>
                        <p className="text-sm text-gray-600">Free Standard Shipping</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <MapPin className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="font-medium text-gray-900">Tracking Number</p>
                        <p className="text-sm text-blue-600 font-mono">Available once shipped</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Support Section */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Need Help?</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                      <Mail className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Email Support</p>
                      <p className="text-sm text-gray-600">support@symora.com</p>
                      <p className="text-xs text-gray-500">Response within 24 hours</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                      <Phone className="h-6 w-6 text-pink-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Phone Support</p>
                      <p className="text-sm text-gray-600">+31 20 123 4567</p>
                      <p className="text-xs text-gray-500">Mon-Fri, 9AM-6PM CET</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="text-center mt-8">
                <button
                  onClick={onClose}
                  className="bg-gradient-to-r from-gray-900 to-gray-700 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:from-gray-800 hover:to-gray-600 transition-all duration-200 hover:scale-[1.02] transform shadow-lg"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;