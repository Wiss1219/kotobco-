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
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addToCart(product);
    toast({
      title: isRTL ? "تم إضافة المنتج" : "Product Added",
      description: isRTL ? `تم إضافة ${product.titleAr} إلى السلة` : `${product.title} added to cart`,
    });
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
    toast({
      title: isWishlisted 
        ? (isRTL ? "تم الحذف من المفضلة" : "Removed from Wishlist")
        : (isRTL ? "تم الإضافة للمفضلة" : "Added to Wishlist"),
    });
  };

  const title = isRTL ? product.titleAr : product.title;
  const author = isRTL ? product.authorAr : product.author;

  return (
    <Link to={`/product/${product.id}`}>
      <Card 
        className="group cursor-pointer overflow-hidden card-luxury h-full flex flex-col relative transition-all duration-300"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Product Image Container */}
        <div className="aspect-[3/4] overflow-hidden relative">
          <img
            src={product.image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          
          {/* Overlay Actions */}
          <div className={`absolute inset-0 bg-black/40 flex items-center justify-center gap-2 transition-all duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
            <Button
              size="sm"
              variant="secondary"
              className="bg-white/90 hover:bg-white text-gray-800 shadow-lg"
              onClick={handleWishlist}
            >
              <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
            </Button>
            <Button
              size="sm"
              variant="secondary"
              className="bg-white/90 hover:bg-white text-gray-800 shadow-lg"
            >
              <Eye className="h-4 w-4" />
            </Button>
          </div>

          {/* Top Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1">
            {product.featured && (
              <Badge className="bg-red-500 text-white text-xs font-medium">
                <Star className="h-3 w-3 mr-1" />
                {isRTL ? 'مميز' : 'Featured'}
              </Badge>
            )}
            {!product.inStock && (
              <Badge variant="destructive" className="text-xs font-medium">
                {isRTL ? "نفد المخزون" : "Out of Stock"}
              </Badge>
            )}
          </div>

          {/* Category Badge */}
          <div className="absolute top-3 right-3">
            <Badge 
              variant="outline" 
              className="bg-white/90 border-gray-200 text-gray-700 text-xs"
            >
              {product.category === 'religious' ? (isRTL ? "ديني" : "Religious") : (isRTL ? "عام" : "General")}
            </Badge>
          </div>
        </div>
        
        {/* Product Info */}
        <CardContent className="p-4 flex-1">
          <div className="space-y-3">
            <div>
              <h3 className="font-semibold text-base line-clamp-2 group-hover:text-primary transition-colors leading-tight mb-1">
                {title}
              </h3>
              
              {author && (
                <p className="text-sm text-muted-foreground line-clamp-1">
                  {isRTL ? "المؤلف: " : "By "}{author}
                </p>
              )}
            </div>
            
            {/* Rating */}
            <div className="flex items-center gap-1">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">(4.8)</span>
            </div>

            {/* Stock Status */}
            <div className="flex items-center justify-between">
              <Badge 
                variant={product.inStock ? "default" : "destructive"}
                className={`text-xs ${product.inStock ? "bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-300" : ""}`}
              >
                {product.inStock 
                  ? (isRTL ? "متوفر" : "In Stock")
                  : (isRTL ? "نفد" : "Out of Stock")
                }
              </Badge>
              {product.inStock && (
                <span className="text-xs text-green-600 font-medium">
                  {isRTL ? "توصيل مجاني" : "Free Delivery"}
                </span>
              )}
            </div>
          </div>
        </CardContent>
        
        {/* Product Footer */}
        <CardFooter className="p-4 pt-0 flex items-center justify-between border-t border-border/50">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-primary">
                {product.price.toFixed(2)}
              </span>
              <span className="text-sm text-muted-foreground">
                {isRTL ? "د.ت" : "TND"}
              </span>
            </div>
            <span className="text-xs text-green-600 font-medium">
              {isRTL ? "أفضل سعر" : "Best Price"}
            </span>
          </div>
          
          <Button 
            onClick={handleAddToCart}
            disabled={!product.inStock}
            size="sm"
            className="hover-glow"
          >
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
};