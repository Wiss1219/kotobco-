
import { useParams, Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { Header } from '@/components/Layout/Header';
import { Footer } from '@/components/Layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useStore } from '@/store/useStore';
import { useTranslation } from '@/hooks/useTranslation';
import { cn } from '@/lib/utils';

const OrderConfirmation = () => {
  const { orderId } = useParams();
  const { t, isRTL } = useTranslation();
  const { orders } = useStore();
  
  const order = orders.find(o => o.id === orderId);
  
  if (!order) {
    return (
      <div className={cn("min-h-screen", isRTL && "rtl")}>
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">
            {isRTL ? "الطلب غير موجود" : "Order Not Found"}
          </h1>
          <Link to="/">
            <Button>{isRTL ? "العودة للرئيسية" : "Go Home"}</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className={cn("min-h-screen", isRTL && "rtl")}>
      <Header />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
          
          <h1 className="text-3xl font-bold mb-4">
            {isRTL ? "تم تأكيد طلبك!" : "Order Confirmed!"}
          </h1>
          
          <p className="text-muted-foreground mb-8">
            {isRTL 
              ? "شكراً لك! تم استلام طلبك وسيتم التواصل معك قريباً."
              : "Thank you! Your order has been received and we'll contact you soon."
            }
          </p>
          
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="space-y-4 text-left">
                <div>
                  <h3 className="font-semibold mb-2">
                    {isRTL ? "تفاصيل الطلب" : "Order Details"}
                  </h3>
                  <p><strong>{isRTL ? "رقم الطلب:" : "Order ID:"}</strong> {order.id}</p>
                  <p><strong>{t('total')}:</strong> {order.total.toFixed(2)} د.ت</p>
                  <p><strong>{isRTL ? "الحالة:" : "Status:"}</strong> {t(order.status)}</p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">
                    {isRTL ? "معلومات التوصيل" : "Delivery Information"}
                  </h3>
                  <p><strong>{t('name')}:</strong> {order.customerInfo.name}</p>
                  <p><strong>{t('phone')}:</strong> {order.customerInfo.phone}</p>
                  <p><strong>{t('address')}:</strong> {order.customerInfo.address}, {order.customerInfo.city}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/track-order">
              <Button variant="outline">
                {t('trackOrder')}
              </Button>
            </Link>
            
            <Link to="/">
              <Button>
                {isRTL ? "متابعة التسوق" : "Continue Shopping"}
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default OrderConfirmation;
