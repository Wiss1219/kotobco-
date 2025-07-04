import { useStore } from '@/store/useStore';
import { Language } from '@/types';

const translations = {
  ar: {
    // Navigation
    home: 'الرئيسية',
    generalBooks: 'الكتب العامة',
    religiousBooks: 'الكتب الدينية',
    cart: 'السلة',
    contact: 'اتصل بنا',
    
    // Actions
    addToCart: 'أضف إلى السلة',
    buyNow: 'اشتري الآن',
    checkout: 'الدفع',
    placeOrder: 'تأكيد الطلب',
    trackOrder: 'تتبع الطلب',
    
    // Product details
    price: 'السعر',
    author: 'المؤلف',
    inStock: 'متوفر',
    outOfStock: 'غير متوفر',
    
    // Checkout
    customerInfo: 'معلومات العميل',
    name: 'الاسم',
    phone: 'رقم الهاتف',
    address: 'العنوان',
    city: 'المدينة',
    paymentMethod: 'طريقة الدفع',
    cashOnDelivery: 'الدفع عند الاستلام',
    
    // Order status
    pending: 'في الانتظار',
    processing: 'قيد المعالجة',
    shipped: 'تم الشحن',
    delivered: 'تم التسليم',
    
    // Common
    total: 'المجموع',
    quantity: 'الكمية',
    remove: 'حذف',
    continue: 'متابعة',
    back: 'رجوع',
    
    // Hero section
    heroTitle: 'مكتبة كتبكم',
    heroSubtitle: 'أفضل الكتب العامة والدينية في تونس',
    shopNow: 'تسوق الآن',
    
    // Categories
    featuredBooks: 'الكتب المميزة',
    newArrivals: 'وصل حديثاً',
    bestSellers: 'الأكثر مبيعاً',
  },
  fr: {
    // Navigation
    home: 'Accueil',
    generalBooks: 'Livres Généraux',
    religiousBooks: 'Livres Religieux',
    cart: 'Panier',
    contact: 'Contact',
    
    // Actions
    addToCart: 'Ajouter au panier',
    buyNow: 'Acheter maintenant',
    checkout: 'Commander',
    placeOrder: 'Confirmer la commande',
    trackOrder: 'Suivre la commande',
    
    // Product details
    price: 'Prix',
    author: 'Auteur',
    inStock: 'En stock',
    outOfStock: 'Rupture de stock',
    
    // Checkout
    customerInfo: 'Informations client',
    name: 'Nom',
    phone: 'Téléphone',
    address: 'Adresse',
    city: 'Ville',
    paymentMethod: 'Mode de paiement',
    cashOnDelivery: 'Paiement à la livraison',
    
    // Order status
    pending: 'En attente',
    processing: 'En traitement',
    shipped: 'Expédié',
    delivered: 'Livré',
    
    // Common
    total: 'Total',
    quantity: 'Quantité',
    remove: 'Supprimer',
    continue: 'Continuer',
    back: 'Retour',
    
    // Hero section
    heroTitle: 'Librairie Kotobcom',
    heroSubtitle: 'Les meilleurs livres généraux et religieux en Tunisie',
    shopNow: 'Acheter maintenant',
    
    // Categories
    featuredBooks: 'Livres en vedette',
    newArrivals: 'Nouveautés',
    bestSellers: 'Meilleures ventes',
  },
  en: {
    // Navigation
    home: 'Home',
    generalBooks: 'General Books',
    religiousBooks: 'Religious Books',
    cart: 'Cart',
    contact: 'Contact',
    
    // Actions
    addToCart: 'Add to Cart',
    buyNow: 'Buy Now',
    checkout: 'Checkout',
    placeOrder: 'Place Order',
    trackOrder: 'Track Order',
    
    // Product details
    price: 'Price',
    author: 'Author',
    inStock: 'In Stock',
    outOfStock: 'Out of Stock',
    
    // Checkout
    customerInfo: 'Customer Information',
    name: 'Name',
    phone: 'Phone',
    address: 'Address',
    city: 'City',
    paymentMethod: 'Payment Method',
    cashOnDelivery: 'Cash on Delivery',
    
    // Order status
    pending: 'Pending',
    processing: 'Processing',
    shipped: 'Shipped',
    delivered: 'Delivered',
    
    // Common
    total: 'Total',
    quantity: 'Quantity',
    remove: 'Remove',
    continue: 'Continue',
    back: 'Back',
    
    // Hero section
    heroTitle: 'Kotobcom Bookstore',
    heroSubtitle: 'The best general and religious books in Tunisia',
    shopNow: 'Shop Now',
    
    // Categories
    featuredBooks: 'Featured Books',
    newArrivals: 'New Arrivals',
    bestSellers: 'Best Sellers',
  },
};

export const useTranslation = () => {
  const { language } = useStore();
  
  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };
  
  const isRTL = language === 'ar';
  
  return { t, language, isRTL };
};
