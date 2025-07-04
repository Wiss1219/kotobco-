
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/Layout/Header';
import { Footer } from '@/components/Layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useStore } from '@/store/useStore';
import { useTranslation } from '@/hooks/useTranslation';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const Checkout = () => {
  const { t, isRTL, language } = useTranslation();
  const { cart, getCartTotal, clearCart, createOrder } = useStore();
  const navigate = useNavigate();
  
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
  });
  
  const [isLoading, setIsLoading] = useState(false);
  
  const handleInputChange = (field: string, value: string) => {
    setCustomerInfo(prev => ({ ...prev, [field]: value }));
  };
  
  const handlePlaceOrder = async () => {
    if (!customerInfo.name || !customerInfo.phone || !customerInfo.address || !customerInfo.city) {
      toast({
        title: isRTL ? "خطأ" : "Error",
        description: isRTL ? "يرجى ملء جميع الحقول" : "Please fill all fields",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Create order in database
      const orderId = await createOrder(customerInfo, cart);
      
      // Send WhatsApp notification
      const orderDetails = cart.map(item => {
        const title = language === 'ar' ? item.product.titleAr : 
                     language === 'fr' ? item.product.titleFr : 
                     item.product.title;
        return `${title} x${item.quantity} - ${(item.product.price * item.quantity).toFixed(2)} د.ت`;
      }).join('\n');
      
      const whatsappMessage = encodeURIComponent(
        `🛒 طلب جديد من كتوب كوم\n\n` +
        `رقم الطلب: ${orderId}\n` +
        `العميل: ${customerInfo.name}\n` +
        `الهاتف: ${customerInfo.phone}\n` +
        `العنوان: ${customerInfo.address}, ${customerInfo.city}\n\n` +
        `تفاصيل الطلب:\n${orderDetails}\n\n` +
        `المجموع: ${getCartTotal().toFixed(2)} د.ت\n` +
        `طريقة الدفع: الدفع عند الاستلام`
      );
      
      // Open WhatsApp
      window.open(`https://wa.me/21629381882?text=${whatsappMessage}`, '_blank');
      
      clearCart();
      navigate(`/order-confirmation/${orderId}`);
      
    } catch (error) {
      console.error('Error placing order:', error);
      toast({
        title: isRTL ? "خطأ" : "Error",
        description: isRTL ? "حدث خطأ أثناء إرسال الطلب" : "Error placing order",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }
  
  return (
    <div className={cn("min-h-screen", isRTL && "rtl")}>
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">{t('checkout')}</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Customer Information */}
          <Card>
            <CardHeader>
              <CardTitle>{t('customerInfo')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">{t('name')} *</Label>
                <Input
                  id="name"
                  value={customerInfo.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder={isRTL ? "أدخل اسمك الكامل" : "Enter your full name"}
                />
              </div>
              
              <div>
                <Label htmlFor="phone">{t('phone')} *</Label>
                <Input
                  id="phone"
                  value={customerInfo.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="+216 XX XXX XXX"
                />
              </div>
              
              <div>
                <Label htmlFor="address">{t('address')} *</Label>
                <Input
                  id="address"
                  value={customerInfo.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder={isRTL ? "أدخل عنوانك الكامل" : "Enter your full address"}
                />
              </div>
              
              <div>
                <Label htmlFor="city">{t('city')} *</Label>
                <Input
                  id="city"
                  value={customerInfo.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  placeholder={isRTL ? "المدينة" : "City"}
                />
              </div>
            </CardContent>
          </Card>
          
          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle>{isRTL ? "ملخص الطلب" : "Order Summary"}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 mb-6">
                {cart.map((item) => {
                  const title = language === 'ar' ? item.product.titleAr : 
                               language === 'fr' ? item.product.titleFr : 
                               item.product.title;
                  
                  return (
                    <div key={item.product.id} className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{title}</p>
                        <p className="text-sm text-muted-foreground">
                          {item.quantity} x {item.product.price.toFixed(2)} د.ت
                        </p>
                      </div>
                      <span className="font-medium">
                        {(item.product.price * item.quantity).toFixed(2)} د.ت
                      </span>
                    </div>
                  );
                })}
              </div>
              
              <hr className="my-4" />
              
              <div className="space-y-2 mb-6">
                <div className="flex justify-between">
                  <span>{isRTL ? "المجموع الفرعي" : "Subtotal"}</span>
                  <span>{getCartTotal().toFixed(2)} د.ت</span>
                </div>
                <div className="flex justify-between">
                  <span>{isRTL ? "الشحن" : "Shipping"}</span>
                  <span>{isRTL ? "مجاني" : "Free"}</span>
                </div>
                <div className="flex justify-between font-bold text-lg">
                  <span>{t('total')}</span>
                  <span>{getCartTotal().toFixed(2)} د.ت</span>
                </div>
              </div>
              
              <div className="mb-6">
                <Label>{t('paymentMethod')}</Label>
                <div className="mt-2 p-3 border rounded-lg bg-muted">
                  <span className="font-medium">{t('cashOnDelivery')}</span>
                </div>
              </div>
              
              <Button 
                className="w-full" 
                size="lg"
                onClick={handlePlaceOrder}
                disabled={isLoading}
              >
                {isLoading 
                  ? (isRTL ? "جاري الإرسال..." : "Placing Order...")
                  : t('placeOrder')
                }
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Checkout;
