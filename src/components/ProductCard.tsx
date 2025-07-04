import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from '@/hooks/useTranslation';
import { useStore } from '@/store/useStore';
import { Product } from '@/types';
import { ShoppingCart, Star, Heart, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
  onClick?: () => void;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { t, isRTL } = useTranslation();
  const { addToCart } = useStore();
  const { toast } = useToast();
  const [isHovered, setIsHovered] = useState(false);

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
      <Card 
        className="group cursor-pointer overflow-hidden card-premium h-full flex flex-col relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Product Image */}
        <div className="aspect-[3/4] overflow-hidden relative">
          <img
            src={product.image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          
          {/* Overlay with actions */}
          <div className={`absolute inset-0 bg-black/40 flex items-center justify-center gap-2 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
            <Button
              size="icon"
              variant="secondary"
              className="bg-white/90 hover:bg-white text-gray-800 shadow-lg"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              <Heart className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="secondary"
              className="bg-white/90 hover:bg-white text-gray-800 shadow-lg"
            >
              <Eye className="h-4 w-4" />
            </Button>
          </div>

          {/* Featured badge */}
          {product.featured && (
            <div className="absolute top-3 left-3">
              <Badge className="bg-yellow-500 text-yellow-900 font-semibold">
                <Star className="h-3 w-3 mr-1" />
                {isRTL ? 'مميز' : 'Featured'}
              </Badge>
            </div>
          )}

          {/* Stock status */}
          <div className="absolute top-3 right-3">
            <Badge 
              variant={product.inStock ? "default" : "destructive"}
              className={product.inStock ? "bg-green-500" : ""}
            >
              {product.inStock 
                ? (isRTL ? "متوفر" : "In Stock")
                : (isRTL ? "نفد" : "Out of Stock")
              }
            </Badge>
          </div>
        </div>
        
        <CardContent className="p-6 flex-1">
          <div className="space-y-3">
            <Badge variant="outline" className="text-xs border-red-200 text-red-600">
              {product.category === 'religious' ? (isRTL ? "ديني" : "Religious") : (isRTL ? "عام" : "General")}
            </Badge>
            
            <h3 className="font-bold text-lg line-clamp-2 group-hover:text-red-600 transition-colors leading-tight">
              {title}
            </h3>
            
            {author && (
              <p className="text-sm text-muted-foreground line-clamp-1">
                {isRTL ? "المؤلف: " : "By "}{author}
              </p>
            )}
            
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              ))}
              <span className="text-xs text-muted-foreground ml-2">(4.8)</span>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="p-6 pt-0 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-red-600">
              {product.price.toFixed(2)}
            </span>
            <span className="text-xs text-muted-foreground">
              {isRTL ? "د.ت" : "TND"}
            </span>
          </div>
          
          <Button 
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="btn-premium text-white flex items-center gap-2 px-6"
            size="sm"
          >
            <ShoppingCart className="h-4 w-4" />
            {product.inStock 
              ? (isRTL ? "أضف للسلة" : "Add to Cart")
              : (isRTL ? "غير متوفر" : "Unavailable")
            }
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
};