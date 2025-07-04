
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from '@/hooks/useTranslation';
import { useStore } from '@/store/useStore';
import { Product } from '@/types';
import { ShoppingCart, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ProductCardProps {
  product: Product;
  onClick?: () => void;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { t, isRTL } = useTranslation();
  const { addToCart } = useStore();
  const { toast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addToCart(product);
    toast({
      title: isRTL ? "تم إضافة المنتج" : "Product Added",
      description: isRTL ? `تم إضافة ${product.titleAr} إلى السلة` : `${product.title} added to cart`,
    });
  };

  const title = isRTL ? product.titleAr : product.title;
  const author = isRTL ? product.authorAr : product.author;

  return (
    <Link to={`/product/${product.id}`}>
      <Card className="group cursor-pointer overflow-hidden hover-lift h-full flex flex-col">
        <div className="aspect-[3/4] overflow-hidden">
          <img
            src={product.image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        
        <CardContent className="p-4 flex-1">
          <div className="space-y-2">
            <Badge variant="secondary" className="text-xs">
              {product.category === 'religious' ? (isRTL ? "ديني" : "Religious") : (isRTL ? "عام" : "General")}
            </Badge>
            
            <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors">
              {title}
            </h3>
            
            {author && (
              <p className="text-xs text-muted-foreground line-clamp-1">
                {isRTL ? "المؤلف: " : "By "}{author}
              </p>
            )}
            
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              ))}
              <span className="text-xs text-muted-foreground ml-1">(4.8)</span>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="p-4 pt-0 flex items-center justify-between">
          <div className="font-bold text-primary">
            {product.price.toFixed(2)} {isRTL ? "د.ت" : "TND"}
          </div>
          
          <Button 
            size="sm" 
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="flex items-center gap-1"
          >
            <ShoppingCart className="h-3 w-3" />
            {product.inStock 
              ? (isRTL ? "أضف" : "Add")
              : (isRTL ? "نفد" : "Out")
            }
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
};
