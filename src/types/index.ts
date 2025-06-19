export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  images: string[];
  description: string;
  benefits: string[];
  category: string;
  isOnSale?: boolean;
  isBestSeller?: boolean;
  isNew?: boolean;
  isLimitedTime?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  isOpen: boolean;
  total: number;
}

export interface DiscountCode {
  code: string;
  percentage: number;
  isActive: boolean;
  expiresAt?: Date;
}