import React from 'react';
import { Package, Star, ArrowRight, Gift } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface BundleOfferProps {
  product: Product;
  onViewProduct: (product: Product) => void;
}

const BundleOffer: React.FC<BundleOfferProps> = ({ product, onViewProduct }) => {
  const { addToCart } = useCart();
  
  const bundlePrice = product.price * 2 * 0.85; // 15% discount for 2 items
  const savings = (product.price * 2) - bundlePrice;
  const savingsPercentage = Math.round((savings / (product.price * 2)) * 100);

  const handleAddBundle = () => {
    addToCart(product, 2);
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border-2 border-blue-200 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-200/30 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
      
      {/* Hot deal badge */}
      <div className="absolute top-4 right-4 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">
        <Gift className="h-3 w-3 inline mr-1" />
        BUNDLE DEAL
      </div>

      <div className="relative z-10">
        <div className="flex items-start space-x-4 mb-4">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
            <Package className="h-6 w-6 text-blue-600" />
          </div>
          
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-1">Buy 2, Save More!</h3>
            <p className="text-gray-600 text-sm">Perfect for couples or backup</p>
          </div>
        </div>

        <div className="space-y-4">
          {/* Bundle visualization */}
          <div className="flex items-center justify-center space-x-4 py-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-lg shadow-sm mb-2 overflow-hidden">
                <img 
                  src={product.images[0]} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-xs text-gray-600">1x {product.name}</span>
            </div>
            
            <div className="text-2xl text-gray-400 font-bold">+</div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-lg shadow-sm mb-2 overflow-hidden">
                <img 
                  src={product.images[0]} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-xs text-gray-600">1x {product.name}</span>
            </div>
            
            <ArrowRight className="h-5 w-5 text-blue-600" />
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-sm mb-2 flex items-center justify-center">
                <span className="text-white font-bold text-lg">{savingsPercentage}%</span>
              </div>
              <span className="text-xs text-blue-600 font-medium">OFF</span>
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">Regular price (2x):</span>
              <span className="text-gray-500 line-through">€{(product.price * 2).toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">Bundle price:</span>
              <span className="text-2xl font-bold text-gray-900">€{bundlePrice.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between text-green-600 font-medium">
              <span>You save:</span>
              <span>€{savings.toFixed(2)} ({savingsPercentage}%)</span>
            </div>
          </div>

          {/* Benefits */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Star className="h-4 w-4 text-yellow-500" />
              <span>Perfect for couples or as a backup</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Star className="h-4 w-4 text-yellow-500" />
              <span>Free shipping on bundle orders</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Star className="h-4 w-4 text-yellow-500" />
              <span>30-day money-back guarantee</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex space-x-3 pt-2">
            <button
              onClick={handleAddBundle}
              className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-all duration-200 hover:scale-[1.02] transform flex items-center justify-center space-x-2"
            >
              <Package className="h-4 w-4" />
              <span>Add Bundle to Cart</span>
            </button>
            
            <button
              onClick={() => onViewProduct(product)}
              className="px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BundleOffer;