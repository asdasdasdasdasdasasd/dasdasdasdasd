import React from 'react';

interface PaymentLogosProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const PaymentLogos: React.FC<PaymentLogosProps> = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'h-5',
    md: 'h-6',
    lg: 'h-8'
  };

  const containerClasses = {
    sm: 'p-1.5',
    md: 'p-2',
    lg: 'p-2.5'
  };

  const logos = [
    {
      name: 'Visa',
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png',
      alt: 'Visa'
    },
    {
      name: 'Mastercard',
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png',
      alt: 'Mastercard'
    },
    {
      name: 'American Express',
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/American_Express_logo_%282018%29.svg/1200px-American_Express_logo_%282018%29.svg.png',
      alt: 'American Express'
    },
    {
      name: 'PayPal',
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/1280px-PayPal.svg.png',
      alt: 'PayPal'
    },
    {
      name: 'Apple Pay',
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Apple_Pay_logo.svg/1280px-Apple_Pay_logo.svg.png',
      alt: 'Apple Pay'
    },
    {
      name: 'Google Pay',
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Google_Pay_Logo.svg/1280px-Google_Pay_Logo.svg.png',
      alt: 'Google Pay'
    }
  ];

  return (
    <div className={`flex items-center justify-center flex-wrap gap-2 ${className}`}>
      {logos.map((logo, index) => (
        <div 
          key={logo.name} 
          className={`flex-shrink-0 opacity-80 hover:opacity-100 transition-opacity duration-200 bg-white rounded-lg shadow-sm border border-gray-100 ${containerClasses[size]} flex items-center justify-center`}
          style={{ minWidth: size === 'sm' ? '32px' : size === 'md' ? '40px' : '48px' }}
        >
          <img
            src={logo.url}
            alt={logo.alt}
            className={`${sizeClasses[size]} w-auto object-contain max-w-full`}
            loading="lazy"
            onError={(e) => {
              // Fallback to text if image fails to load
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const parent = target.parentElement;
              if (parent) {
                parent.innerHTML = `<span class="text-xs font-medium text-gray-600 px-1">${logo.name}</span>`;
              }
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default PaymentLogos;