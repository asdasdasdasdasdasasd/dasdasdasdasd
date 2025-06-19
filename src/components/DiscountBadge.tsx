import React from 'react';
import { Percent, Flame } from 'lucide-react';

interface DiscountBadgeProps {
  originalPrice: number;
  currentPrice: number;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'percentage' | 'amount' | 'hot';
}

const DiscountBadge: React.FC<DiscountBadgeProps> = ({ 
  originalPrice, 
  currentPrice, 
  className = '',
  size = 'md',
  variant = 'percentage'
}) => {
  const discountAmount = originalPrice - currentPrice;
  const discountPercentage = Math.round((discountAmount / originalPrice) * 100);

  if (discountAmount <= 0) return null;

  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1.5',
    lg: 'text-base px-4 py-2'
  };

  const iconSizes = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5'
  };

  if (variant === 'hot') {
    return (
      <div className={`inline-flex items-center bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full font-bold animate-pulse ${sizeClasses[size]} ${className}`}>
        <Flame className={`${iconSizes[size]} mr-1`} />
        HOT DEAL
      </div>
    );
  }

  if (variant === 'amount') {
    return (
      <div className={`inline-flex items-center bg-green-600 text-white rounded-full font-bold ${sizeClasses[size]} ${className}`}>
        Save €{discountAmount.toFixed(2)}
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center bg-red-600 text-white rounded-full font-bold ${sizeClasses[size]} ${className}`}>
      <Percent className={`${iconSizes[size]} mr-1`} />
      {discountPercentage}% OFF
    </div>
  );
};

export default DiscountBadge;