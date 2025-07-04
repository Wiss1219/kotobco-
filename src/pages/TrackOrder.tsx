import { useState } from 'react';
import { Header } from '@/components/Layout/Header';
import { Footer } from '@/components/Layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from '@/hooks/useTranslation';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { CheckCircle, Clock, Package, Truck } from 'lucide-react';

const TrackOrder = () => {
  const { t, isRTL } = useTranslation();
  const [orderNumber, setOrderNumber] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [orderData, setOrderData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTrackOrder = async () => {
    if (!orderNumber.trim() || !phoneNumber.trim()) {
      setError(isRTL ? "يرجى إدخال رقم الطلب ورقم الهاتف" : "Please enter both order number and phone number");
      return;
    }

    setIsLoading(true);
    setError('');
    setOrderData(null);
    
    try {
      const { data, error: supabaseError } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (
            *,
            products (*)
          )
        `)
        .eq('order_number', orderNumber.trim())
        .eq('customer_phone', phoneNumber.trim())
        .single();

      if (supabaseError) {
        if (supabaseError.code === 'PGRST116') {
          setError(isRTL ? "الطلب غير موجود أو المعلومات غير صحيحة" : "Order not found or details are incorrect");
        } else {
          throw supabaseError;
        }
      } else {
        setOrderData(data);
      }
    } catch (err) {
      console.error('Error tracking order:', err);
      setError(isRTL ? "حدث خطأ أثناء البحث" : "An error occurred while searching");
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-5 w-5" />;
      case 'processing':
        return <Package className="h-5 w-5" />;
      case 'shipped':
        return <Truck className="h-5 w-5" />;
      case 'delivered':
        return <CheckCircle className="h-5 w-5" />;
      default:
        return <Clock className="h-5 w-5" />;
    }
  };

  const getStatusText = (status: string) => {
    const statusMap: { [key: string]: { ar: string; en: string; fr: string } } = {
      pending: { ar: 'في الانتظار', en: 'Pending', fr: 'En attente' },
      processing: { ar: 'قيد المعالجة', en: 'Processing', fr: 'En cours' },
      shipped: { ar: 'تم الشحن', en: 'Shipped', fr: 'Expédié' },
      delivered: { ar: 'تم التسليم', en: 'Delivered', fr: 'Livré' }
    };
    
    return statusMap[status]?.[isRTL ? 'ar' : 'en'] || status;
  };

  return (
    <div className={cn("min-h-screen", isRTL && "rtl")}>
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center">
            {isRTL ? "تتبع الطلب" : "Track Your Order"}
          </h1>
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>
                {isRTL ? "أدخل معلومات طلبك" : "Enter Your Order Information"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="orderNumber">
                    {isRTL ? "رقم الطلب" : "Order Number"}
                  </Label>
                  <Input
                    id="orderNumber"
                    value={orderNumber}
                    onChange={(e) => setOrderNumber(e.target.value)}
                    placeholder={isRTL ? "مثال: KTC-12345" : "e.g., KTC-12345"}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="phoneNumber">
                    {isRTL ? "رقم الهاتف" : "Phone Number"}
                  </Label>
                  <Input
                    id="phoneNumber"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder={isRTL ? "مثال: 21234567" : "e.g., 21234567"}
                    className="mt-1"
                  />
                </div>
                
                <Button 
                  onClick={handleTrackOrder}
                  disabled={isLoading}
                  className="w-full"
                >
                  {isLoading 
                    ? (isRTL ? "جاري البحث..." : "Searching...")
                    : (isRTL ? "تتبع الطلب" : "Track Order")
                  }
                </Button>
                
                {error && (
                  <p className="text-destructive text-sm mt-2">{error}</p>
                )}
              </div>
            </CardContent>
          </Card>

          {orderData && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{isRTL ? "تفاصيل الطلب" : "Order Details"}</span>
                  <Badge variant="secondary" className="flex items-center gap-2">
                    {getStatusIcon(orderData.status)}
                    {getStatusText(orderData.status)}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold mb-2">
                      {isRTL ? "معلومات الطلب" : "Order Information"}
                    </h3>
                    <p><strong>{isRTL ? "رقم الطلب:" : "Order ID:"}</strong> {orderData.order_number}</p>
                    <p><strong>{isRTL ? "التاريخ:" : "Date:"}</strong> {new Date(orderData.created_at).toLocaleDateString()}</p>
                    <p><strong>{isRTL ? "المجموع:" : "Total:"}</strong> {Number(orderData.total_amount).toFixed(2)} د.ت</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">
                      {isRTL ? "معلومات التوصيل" : "Delivery Information"}
                    </h3>
                    <p><strong>{isRTL ? "الاسم:" : "Name:"}</strong> {orderData.customer_name}</p>
                    <p><strong>{isRTL ? "الهاتف:" : "Phone:"}</strong> {orderData.customer_phone}</p>
                    <p><strong>{isRTL ? "العنوان:" : "Address:"}</strong> {orderData.customer_address}, {orderData.customer_city}</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-4">
                    {isRTL ? "المنتجات" : "Products"}
                  </h3>
                  <div className="space-y-2">
                    {orderData.order_items?.map((item: any) => (
                      <div key={item.id} className="flex justify-between items-center p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">
                            {isRTL ? item.products.title_ar : item.products.title}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {isRTL ? "الكمية:" : "Quantity:"} {item.quantity}
                          </p>
                        </div>
                        <span className="font-medium">
                          {(Number(item.price) * item.quantity).toFixed(2)} د.ت
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default TrackOrder;
