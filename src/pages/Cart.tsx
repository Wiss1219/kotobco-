
import { Link } from 'react-router-dom';
import { Minus, Plus, X } from 'lucide-react';
import { Header } from '@/components/Layout/Header';
import { Footer } from '@/components/Layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useStore } from '@/store/useStore';
import { useTranslation } from '@/hooks/useTranslation';
import { cn } from '@/lib/utils';

const Cart = () => {
  const { t, isRTL, language } = useTranslation();
  const { cart, updateQuantity, removeFromCart, getCartTotal } = useStore();
  
  const getLocalizedText = (ar: string, fr: string, en: string) => {
    switch (language) {
      case 'ar': return ar;
      case 'fr': return fr;
      case 'en': return en;
      default: return ar;
    }
  };
  
  if (cart.length === 0) {
    return (
      <div className={cn("min-h-screen", isRTL && "rtl")}>
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold mb-8">{t('cart')}</h1>
          <p className="text-muted-foreground mb-8">
            {isRTL ? "السلة فارغة" : "Your cart is empty"}
          </p>
          <Link to="/">
            <Button>
              {isRTL ? "تابع التسوق" : "Continue Shopping"}
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className={cn("min-h-screen", isRTL && "rtl")}>
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">{t('cart')}</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => {
              const title = getLocalizedText(
                item.product.titleAr, 
                item.product.titleFr, 
                item.product.title
              );
              
              return (
                <Card key={item.product.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.product.image}
                        alt={title}
                        className="w-20 h-28 object-cover rounded-lg"
                      />
                      
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-2">{title}</h3>
                        <p className="text-primary font-bold text-lg">
                          {item.product.price.toFixed(2)} د.ت
                        </p>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        
                        <span className="w-8 text-center">{item.quantity}</span>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          
          {/* Order Summary */}
          <div>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4">
                  {isRTL ? "ملخص الطلب" : "Order Summary"}
                </h3>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span>{isRTL ? "المجموع الفرعي" : "Subtotal"}</span>
                    <span>{getCartTotal().toFixed(2)} د.ت</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{isRTL ? "الشحن" : "Shipping"}</span>
                    <span>{isRTL ? "مجاني" : "Free"}</span>
                  </div>
                  <hr />
                  <div className="flex justify-between font-bold text-lg">
                    <span>{t('total')}</span>
                    <span>{getCartTotal().toFixed(2)} د.ت</span>
                  </div>
                </div>
                
                <Link to="/checkout">
                  <Button className="w-full" size="lg">
                    {t('checkout')}
                  </Button>
                </Link>
                
                <Link to="/" className="block mt-4">
                  <Button variant="outline" className="w-full">
                    {isRTL ? "تابع التسوق" : "Continue Shopping"}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Cart;
