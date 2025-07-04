
export interface Product {
  id: string;
  title: string;
  titleAr: string;
  titleFr: string;
  description: string;
  descriptionAr: string;
  descriptionFr: string;
  price: number;
  image: string;
  category: 'general' | 'religious';
  author?: string;
  authorAr?: string;
  authorFr?: string;
  inStock: boolean;
  featured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  customerInfo: {
    name: string;
    phone: string;
    address: string;
    city: string;
  };
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  createdAt: Date;
}

export type Language = 'ar' | 'fr' | 'en';
