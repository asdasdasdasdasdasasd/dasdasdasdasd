import React from 'react';
import { Package, Star, ArrowRight } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface BundleOfferProps {
  product: Product;
  onViewProduct: (product: Product) => void;
}

const BundleOffer: React.FC<BundleOfferProps> = ({ product }) => {
  const { addToCart } = useCart();
  
  const bundlePrice = product.price * 2 * 0.85; // 15% discount for 2 items
  const savings = (product.price * 2) - bundlePrice;
  const savingsPercentage = Math.round((savings / (product.price * 2)) * 100);

  const handleAddBundle = () => {
    addToCart(product, 2);
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 to-gray-50 rounded-2xl p-6 border border-slate-200 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-slate-100/30 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
      
      {/* Bundle deal badge */}
      <div className="absolute top-4 right-4 bg-slate-700 text-white px-3 py-1 rounded-full text-xs font-medium">
        <Package className="h-3 w-3 inline mr-1" />
        BUNDLE DEAL
      </div>

      <div className="relative z-10">
        <div className="flex items-start space-x-4 mb-4">
          <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center">
            <Package className="h-6 w-6 text-slate-600" />
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
            
            <ArrowRight className="h-5 w-5 text-slate-600" />
            
            <div className="text-center">
              <div className="w-16 h-16 bg-slate-600 rounded-lg shadow-sm mb-2 flex items-center justify-center">
                <span className="text-white font-bold text-lg">{savingsPercentage}%</span>
              </div>
              <span className="text-xs text-slate-600 font-medium">OFF</span>
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
            <div className="flex items-center justify-between text-emerald-600 font-medium">
              <span>You save:</span>
              <span>€{savings.toFixed(2)} ({savingsPercentage}%)</span>
            </div>
          </div>

          {/* Benefits */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Star className="h-4 w-4 text-amber-500" />
              <span>Perfect for couples or as a backup</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Star className="h-4 w-4 text-amber-500" />
              <span>Free shipping on bundle orders</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Star className="h-4 w-4 text-amber-500" />
              <span>30-day money-back guarantee</span>
            </div>
          </div>

          {/* Action button */}
          <div className="pt-2">
            <button
              onClick={handleAddBundle}
              className="w-full bg-slate-700 text-white py-3 px-4 rounded-lg font-medium hover:bg-slate-800 transition-all duration-200 hover:scale-[1.02] transform flex items-center justify-center space-x-2"
            >
              <Package className="h-4 w-4" />
              <span>Add Bundle to Cart</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BundleOffer;