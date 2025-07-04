
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Header } from '@/components/Layout/Header';
import { Footer } from '@/components/Layout/Footer';
import { useTranslation } from '@/hooks/useTranslation';
import { useStore } from '@/store/useStore';
import { cn } from '@/lib/utils';
import { ArrowLeft, ShoppingCart, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, isRTL } = useTranslation();
  const { products, addToCart } = useStore();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);

  const product = products.find(p => p.id === id);

  useEffect(() => {
    if (!product && products.length > 0) {
      navigate('/404');
    }
  }, [product, products, navigate]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    toast({
      title: isRTL ? "تم إضافة المنتج" : "Product Added",
      description: isRTL ? `تم إضافة ${quantity} من ${product.titleAr} إلى السلة` : `Added ${quantity} ${product.title} to cart`,
    });
  };

  const title = isRTL ? product.titleAr : product.title;
  const description = isRTL ? product.descriptionAr : product.description;
  const author = isRTL ? product.authorAr : product.author;

  return (
    <div className={cn("min-h-screen", isRTL && "rtl")}>
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          {isRTL ? "العودة" : "Back"}
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Product Image */}
          <div className="aspect-[3/4] overflow-hidden rounded-lg">
            <img
              src={product.image}
              alt={title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="mb-2">
                {product.category === 'religious' ? (isRTL ? "كتب دينية" : "Religious Books") : (isRTL ? "كتب عامة" : "General Books")}
              </Badge>
              <h1 className="text-3xl font-bold mb-2">{title}</h1>
              {author && (
                <p className="text-lg text-muted-foreground mb-4">
                  {isRTL ? "المؤلف: " : "By "}{author}
                </p>
              )}
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">(4.8/5)</span>
            </div>

            <div className="text-3xl font-bold text-primary">
              {product.price.toFixed(2)} {isRTL ? "د.ت" : "TND"}
            </div>

            {description && (
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2">{isRTL ? "الوصف" : "Description"}</h3>
                  <p className="text-muted-foreground leading-relaxed">{description}</p>
                </CardContent>
              </Card>
            )}

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <label className="font-medium">{isRTL ? "الكمية:" : "Quantity:"}</label>
                <div className="flex items-center border rounded-md">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    -
                  </Button>
                  <span className="px-4 py-2 min-w-[3rem] text-center">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </Button>
                </div>
              </div>

              <Button 
                onClick={handleAddToCart}
                className="w-full flex items-center gap-2"
                size="lg"
                disabled={!product.inStock}
              >
                <ShoppingCart className="h-5 w-5" />
                {product.inStock 
                  ? (isRTL ? "إضافة إلى السلة" : "Add to Cart")
                  : (isRTL ? "غير متوفر" : "Out of Stock")
                }
              </Button>

              {product.inStock && (
                <Badge variant="outline" className="text-green-600">
                  {isRTL ? "متوفر في المخزون" : "In Stock"}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetail;
