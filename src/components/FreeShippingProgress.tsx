import React from 'react';
import { Truck, CheckCircle } from 'lucide-react';

interface FreeShippingProgressProps {
  currentTotal: number;
  threshold?: number;
  className?: string;
}

const FreeShippingProgress: React.FC<FreeShippingProgressProps> = ({ 
  currentTotal, 
  threshold = 60,
  className = '' 
}) => {
  const progress = Math.min((currentTotal / threshold) * 100, 100);
  const remaining = Math.max(threshold - currentTotal, 0);
  const hasUnlockedFreeShipping = currentTotal >= threshold;

  return (
    <div className={`bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl p-4 border border-emerald-100 ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          {hasUnlockedFreeShipping ? (
            <CheckCircle className="h-5 w-5 text-emerald-600" />
          ) : (
            <Truck className="h-5 w-5 text-emerald-600" />
          )}
          <span className="font-semibold text-gray-900">
            {hasUnlockedFreeShipping ? 'Free Shipping Unlocked!' : 'Free Shipping'}
          </span>
        </div>
        <span className="text-sm font-medium text-gray-600">
          €{threshold}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="relative w-full bg-gray-200 rounded-full h-2 mb-3 overflow-hidden">
        <div 
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-emerald-500 to-green-500 rounded-full transition-all duration-700 ease-out"
          style={{ width: `${progress}%` }}
        />
        {/* Shimmer effect when not complete */}
        {!hasUnlockedFreeShipping && (
          <div 
            className="absolute top-0 left-0 h-full w-8 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"
            style={{ left: `${Math.max(progress - 8, 0)}%` }}
          />
        )}
      </div>

      {/* Message */}
      <div className="text-center">
        {hasUnlockedFreeShipping ? (
          <p className="text-sm font-medium text-emerald-700 flex items-center justify-center space-x-1">
            <CheckCircle className="h-4 w-4" />
            <span>You've unlocked FREE shipping!</span>
          </p>
        ) : (
          <p className="text-sm text-gray-600">
            Add <span className="font-bold text-emerald-600">€{remaining.toFixed(2)}</span> more for free shipping!
          </p>
        )}
      </div>
    </div>
  );
};

export default FreeShippingProgress;