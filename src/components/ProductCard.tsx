import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from '@/hooks/useTranslation';
import { useStore } from '@/store/useStore';
import { Product } from '@/types';
import { ShoppingCart, Star, Heart, Eye, Bookmark, Zap } from 'lucide-react';
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
      description: isWishlisted 
        ? (isRTL ? "تم حذف المنتج من قائمة المفضلة" : "Product removed from wishlist")
        : (isRTL ? "تم إضافة المنتج لقائمة المفضلة" : "Product added to wishlist"),
    });
  };

  const title = isRTL ? product.titleAr : product.title;
  const author = isRTL ? product.authorAr : product.author;

  return (
    <Link to={`/product/${product.id}`}>
      <Card 
        className="group cursor-pointer overflow-hidden card-luxury h-full flex flex-col relative transition-all duration-500"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Product Image Container */}
        <div className="aspect-[3/4] overflow-hidden relative">
          <img
            src={product.image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          
          {/* Gradient Overlay */}
          <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}></div>
          
          {/* Action Buttons Overlay */}
          <div className={`absolute inset-0 flex items-center justify-center gap-3 transition-all duration-300 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <Button
              size="icon"
              variant="secondary"
              className="glass-morphism hover:bg-white/90 text-gray-800 shadow-luxury hover-glow"
              onClick={handleWishlist}
            >
              <Heart className={`h-4 w-4 transition-colors ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
            </Button>
            <Button
              size="icon"
              variant="secondary"
              className="glass-morphism hover:bg-white/90 text-gray-800 shadow-luxury hover-glow"
            >
              <Eye className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="secondary"
              className="glass-morphism hover:bg-white/90 text-gray-800 shadow-luxury hover-glow"
            >
              <Bookmark className="h-4 w-4" />
            </Button>
          </div>

          {/* Top Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {product.featured && (
              <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold shadow-luxury animate-pulse-luxury">
                <Star className="h-3 w-3 mr-1" />
                {isRTL ? 'مميز' : 'Featured'}
              </Badge>
            )}
            {!product.inStock && (
              <Badge variant="destructive" className="font-semibold shadow-luxury">
                {isRTL ? "نفد المخزون" : "Out of Stock"}
              </Badge>
            )}
          </div>

          {/* Category Badge */}
          <div className="absolute top-4 right-4">
            <Badge 
              variant="outline" 
              className="glass-morphism border-white/30 text-white font-semibold"
            >
              {product.category === 'religious' ? (isRTL ? "ديني" : "Religious") : (isRTL ? "عام" : "General")}
            </Badge>
          </div>

          {/* Quick Add Button */}
          <div className={`absolute bottom-4 left-4 right-4 transition-all duration-300 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <Button 
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="w-full btn-luxury text-white flex items-center justify-center gap-2 py-3 font-semibold"
              size="sm"
            >
              <ShoppingCart className="h-4 w-4" />
              {product.inStock 
                ? (isRTL ? "إضافة سريعة" : "Quick Add")
                : (isRTL ? "غير متوفر" : "Unavailable")
              }
            </Button>
          </div>
        </div>
        
        {/* Product Info */}
        <CardContent className="p-6 flex-1">
          <div className="space-y-4">
            <div>
              <h3 className="font-bold text-lg line-clamp-2 group-hover:text-primary transition-colors leading-tight mb-2">
                {title}
              </h3>
              
              {author && (
                <p className="text-sm text-muted-foreground line-clamp-1 mb-3">
                  {isRTL ? "المؤلف: " : "By "}{author}
                </p>
              )}
            </div>
            
            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">(4.8)</span>
              <Badge variant="outline" className="text-xs ml-auto">
                <Zap className="h-3 w-3 mr-1" />
                {isRTL ? "الأكثر مبيعاً" : "Bestseller"}
              </Badge>
            </div>

            {/* Stock Status */}
            <div className="flex items-center justify-between">
              <Badge 
                variant={product.inStock ? "default" : "destructive"}
                className={`text-xs ${product.inStock ? "bg-green-100 text-green-800 hover:bg-green-200" : ""}`}
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
        <CardFooter className="p-6 pt-0 flex items-center justify-between border-t border-border/50">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-gradient-primary">
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
            variant="outline"
            className="border-primary/20 hover:bg-primary hover:text-white transition-all duration-300 hover-glow"
            size="sm"
          >
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </CardFooter>

        {/* Hover Glow Effect */}
        <div className={`absolute inset-0 rounded-lg transition-opacity duration-300 pointer-events-none ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <div className="absolute inset-0 rounded-lg shadow-luxury-lg"></div>
        </div>
      </Card>
    </Link>
  );
};